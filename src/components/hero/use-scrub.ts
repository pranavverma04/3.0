"use client";

import { useEffect } from "react";
import { scrambleTo } from "./text-fx";

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const smoothstep = (x: number, a: number, b: number) => {
  if (b <= a) return x < a ? 0 : 1;
  const t = clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
};

type Refs = {
  hero: React.RefObject<HTMLElement | null>;
  stage: React.RefObject<HTMLElement | null>;
  video: React.RefObject<HTMLVideoElement | null>;
  chapter: React.RefObject<HTMLElement | null>;
  timecode: React.RefObject<HTMLElement | null>;
};

/**
 * Drives a video's currentTime from how far the page has scrolled through a
 * tall hero, and fades caption bands in and out across that same 0..1.
 *
 * Three things make this feel like film rather than like a slider:
 *
 *  - the scroll position is chased through a lerp, so a coarse wheel notch
 *    still resolves into a smooth run of frames;
 *  - seeks are one-at-a-time. A browser drops seeks issued while it is still
 *    serving one, so without this gate fast scrolling silently stalls;
 *  - the file is fetched once into a blob. Streaming a video over range
 *    requests makes each backward seek a network round trip.
 */
export function useScrub(refs: Refs, { enabled }: { enabled: boolean }) {
  useEffect(() => {
    if (!enabled) return;
    const hero = refs.hero.current;
    const stage = refs.stage.current;
    const video = refs.video.current;
    if (!hero || !stage || !video) return;

    const bands = Array.from(stage.querySelectorAll<HTMLElement>(".band[data-a]")).map(
      (el) => ({
        el,
        a: parseFloat(el.dataset.a || "0"),
        b: parseFloat(el.dataset.b || "1"),
        op: -1,
        k: -1,
      })
    );

    let target = 0;
    let shown = 0;
    let raf: number | null = null;
    let lastTick = 0;
    let onScreen = true;
    let seekBusy = false;
    let pending: number | null = null;
    // How fast the footage is being dragged, 0..1. Drives the film treatment:
    // fast scrubbing smears and splits, the way a real transport does.
    let velocity = 0;
    let cancelScramble: (() => void) | null = null;
    let activeBand = -1;
    let objectUrl: string | null = null;
    let dead = false;

    const progress = () => {
      const range = hero.offsetHeight - window.innerHeight;
      if (range <= 0) return 0;
      return clamp(-hero.getBoundingClientRect().top / range, 0, 1);
    };

    const requestSeek = (t: number) => {
      if (!video.duration || !isFinite(t)) return;
      if (seekBusy) { pending = t; return; }
      seekBusy = true;
      video.currentTime = t;
    };

    const onSeeked = () => {
      seekBusy = false;
      if (pending !== null) { const t = pending; pending = null; requestSeek(t); }
    };
    video.addEventListener("seeked", onSeeked);

    const CHAPTERS = ["CH 01 · WELCOME", "CH 02 · THE WORK", "CH 03 · JOIN US"];
    let lastChapter = "";
    let lastTc = "";

    const paint = (p: number) => {
      for (const B of bands) {
        // Each band is solid across its own stretch and cross-fades at the
        // seams, so there is never a gap with nothing on screen.
        const feather = Math.min(0.03, (B.b - B.a) / 3);
        const isFirst = B === bands[0];
        const isLast = B === bands[bands.length - 1];
        const rise = isFirst ? 1 : smoothstep(p, B.a, B.a + feather);
        const fall = isLast ? 1 : 1 - smoothstep(p, B.b - feather, B.b);
        const op = rise * fall;
        const k = clamp((p - B.a) / Math.min(0.05, (B.b - B.a) * 0.4), 0, 1);

        if (Math.abs(op - B.op) > 0.004) { B.op = op; B.el.style.opacity = op.toFixed(3); }
        if (Math.abs(k - B.k) > 0.006) { B.k = k; B.el.style.setProperty("--k", k.toFixed(3)); }
        // Keeps a faded-out band from swallowing clicks meant for the one under it.
        if (op < 0.02) B.el.setAttribute("data-locked", "");
        else B.el.removeAttribute("data-locked");
      }

      // Read the chapter off the bands themselves. Splitting the bar into even
      // thirds instead made the label flip to CH 03 while CH 02 was still up.
      let idx = 0;
      for (let i = 0; i < bands.length; i++) if (p >= bands[i].a) idx = i;
      const ch = CHAPTERS[Math.min(CHAPTERS.length - 1, idx)];
      if (ch !== lastChapter && refs.chapter.current) {
        lastChapter = ch;
        // Decode rather than swap: the label is a readout, so it should
        // resolve like one.
        cancelScramble?.();
        cancelScramble = scrambleTo(refs.chapter.current, ch, 520);
      }

      // Re-run each band's own entrance when it becomes the live one, so the
      // words mask up again on the way back as well as the way in.
      if (idx !== activeBand) {
        activeBand = idx;
        const el = bands[idx]?.el;
        if (el) {
          el.classList.remove("band-in");
          void el.offsetWidth; // restart the CSS animation
          el.classList.add("band-in");
          const title = el.querySelector<HTMLElement>("[data-scramble]");
          if (title && title.dataset.text) {
            scrambleTo(title, title.dataset.text, 620);
          }
        }
      }
      if (refs.timecode.current && video.duration) {
        const t = p * video.duration;
        const tc = `${String(Math.floor(t / 60)).padStart(2, "0")}:${String(
          Math.floor(t % 60)
        ).padStart(2, "0")}:${String(Math.floor((t % 1) * 24)).padStart(2, "0")}`;
        if (tc !== lastTc) { lastTc = tc; refs.timecode.current.textContent = tc; }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(100, now - (lastTick || now));
      lastTick = now;
      // Frame-rate independent easing: the same feel at 60Hz and 120Hz.
      const prev = shown;
      shown += (target - shown) * (1 - Math.pow(1 - 0.16, dt / 16.667));
      // Per-second rate of travel through the clip, normalised and smoothed so
      // the treatment eases off instead of snapping back.
      const rate = Math.abs(shown - prev) / Math.max(dt, 1) * 1000;
      velocity += (Math.min(1, rate / 1.35) - velocity) * 0.2;
      stage.style.setProperty("--vel", velocity.toFixed(3));
      if (Math.abs(target - shown) < 0.0004 && velocity < 0.004) {
        shown = target;
        velocity = 0;
        stage.style.setProperty("--vel", "0");
        raf = null;
        lastTick = 0;
      } else {
        raf = requestAnimationFrame(tick);
      }
      if (video.duration) requestSeek(shown * video.duration);
      paint(shown);
    };

    const kick = () => { if (raf === null && onScreen) raf = requestAnimationFrame(tick); };
    const onScroll = () => { target = progress(); kick(); };

    const io = new IntersectionObserver((es) => {
      onScreen = es[0].isIntersecting;
      if (onScreen) { target = progress(); kick(); }
    });
    io.observe(hero);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    // Fetch once, play from memory: backward seeks then cost nothing.
    const src = video.dataset.src;
    (async () => {
      try {
        if (!src) throw new Error("no source");
        const res = await fetch(src);
        if (!res.ok) throw new Error(String(res.status));
        const blob = await res.blob();
        if (dead) return;
        objectUrl = URL.createObjectURL(blob);
        video.src = objectUrl;
        await new Promise<void>((resolve, reject) => {
          video.addEventListener("loadeddata", () => resolve(), { once: true });
          video.addEventListener("error", () => reject(new Error("decode")), { once: true });
        });
        if (dead) return;
        stage.setAttribute("data-ready", "1");
        target = progress();
        paint(target);
        shown = target;
        requestSeek(target * video.duration);
        kick();
      } catch {
        // No video: the poster stays and the bands still read. Nothing breaks.
        if (!dead) stage.setAttribute("data-failed", "1");
      }
    })();

    target = progress();
    paint(target);
    shown = target;

    return () => {
      dead = true;
      cancelScramble?.();
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      video.removeEventListener("seeked", onSeeked);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [enabled, refs]);
}

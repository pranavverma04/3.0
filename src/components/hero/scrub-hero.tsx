"use client";

import React, { useEffect, useRef, useState } from "react";
import ScrollCue from "@/components/scroll/scroll-cue";
import { useScrub } from "./use-scrub";
import { splitWords } from "./text-fx";
import "./hero.css";

const VIDEO = "/atom-scrub.mp4";
const POSTER = "/atom-poster.jpg";

/**
 * The landing hero: the club's own footage, scrubbed by the page scroll.
 *
 * The section stands several screens tall and its stage is sticky, so the
 * footage holds on screen while three chapters of type cut over it. Nothing
 * plays on a timer — every frame is the visitor's own scroll, which is what
 * makes it read as film rather than as a looping background video.
 *
 * Anyone who has asked for reduced motion, and anyone whose browser cannot
 * fetch the video, gets a single still frame with the whole message on it.
 */
export default function ScrubHero() {
  const hero = useRef<HTMLElement | null>(null);
  const stage = useRef<HTMLDivElement | null>(null);
  const video = useRef<HTMLVideoElement | null>(null);
  const chapter = useRef<HTMLElement | null>(null);
  const timecode = useRef<HTMLElement | null>(null);

  // Start static and light the engine only after the client has confirmed the
  // visitor wants motion, so the first paint is never a tall empty section.
  const [scrub, setScrub] = useState(false);

  useEffect(() => {
    // Scrub on a wide screen only. Phones get the still frame: seeking is
    // unreliable on mobile browsers, and a 7.5 MB fetch on mobile data to
    // show a background is not a trade worth making.
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    // Ask what kind of input the device has, not how wide the window is. A
    // laptop with a half-width window is still a desktop; a 900px tablet is
    // not. The old min-width:900px gate silently dropped real desktops into
    // the still-frame fallback.
    const desktop = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 700px)"
    );
    const sync = () => setScrub(!motion.matches && desktop.matches);
    sync();
    motion.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      motion.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  useScrub({ hero, stage, video, chapter, timecode }, { enabled: scrub });

  // Words are split in an effect, not in the markup, so the server still
  // renders one readable string for crawlers and for no-JS.
  useEffect(() => {
    if (!scrub || !stage.current) return;
    stage.current
      .querySelectorAll<HTMLElement>(".band-title")
      .forEach((el) => splitWords(el));
  }, [scrub]);

  const actions = (
    <div className="band-cta mt-9 flex flex-wrap items-center justify-center gap-4">
      <a
        href="https://lnk.bio/A.T.O.M"
        className="inline-flex h-12 w-[13rem] items-center justify-center rounded-full bg-[linear-gradient(to_right,#6fd0f9,#4481eb,#04befe,#3f86ed)] bg-[length:300%_100%] text-base font-semibold text-white shadow-[0_4px_20px_rgba(65,132,234,0.55)] transition-[background-position,box-shadow] duration-500 hover:bg-[position:100%_0] hover:shadow-[0_6px_28px_rgba(65,132,234,0.75)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfff]"
      >
        Contact Us
      </a>
      <a
        href="https://atom-robotics-lab.github.io/wiki/"
        className="inline-flex h-12 w-[13rem] items-center justify-center rounded-full border border-white/25 bg-white/[0.06] text-base font-semibold text-white backdrop-blur-sm transition-colors duration-300 hover:border-[#00bfff]/60 hover:bg-[#00bfff]/12 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfff]"
      >
        Selection Task
      </a>
    </div>
  );

  return (
    <section
      id="top"
      ref={hero}
      data-static={scrub ? undefined : "1"}
      className="scrub-hero"
      style={{ height: scrub ? "560svh" : undefined }}
    >
      <div ref={stage} className="scrub-stage">
        <img className="scrub-poster" src={POSTER} alt="" aria-hidden />
        <video
          ref={video}
          className="scrub-video"
          data-src={VIDEO}
          poster={POSTER}
          muted
          playsInline
          preload="none"
          aria-hidden
          tabIndex={-1}
        />

        {/* The grade. Without it the lit A.T.O.M sign in the middle of this
            shot competes with the title sitting on top of it. */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#01050f]/25" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),transparent_20%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#010516_2%,rgba(1,5,22,0.70)_26%,transparent_62%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_42%,transparent_32%,rgba(1,5,22,0.78)_100%),radial-gradient(85%_55%_at_50%_88%,rgba(0,191,255,0.12),transparent_70%)]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(96%_46%_at_50%_45%,rgba(1,5,22,0.90)_22%,rgba(1,5,22,0.60)_58%,transparent_84%)] sm:bg-[radial-gradient(64%_44%_at_50%_50%,rgba(1,5,22,0.84)_18%,rgba(1,5,22,0.48)_55%,transparent_80%)]" />

        <div aria-hidden className="fx-grain" />
        <div aria-hidden className="fx-scan" />

        <div aria-hidden className="hero-bar pointer-events-none absolute inset-x-0 top-0 z-10 bg-[#010516]" />
        <div aria-hidden className="hero-bar pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-[#010516]" />

        <div className="scrub-hud" aria-hidden>
          <span ref={chapter}>CH 01 · WELCOME</span>
          <span>
            <b>REC</b> <span ref={timecode}>00:00:00</span>
          </span>
        </div>

        <div className="bands">
          {scrub ? (
            <>
              <article className="band" data-a="0" data-b="0.38">
                <p className="band-kicker">Robotics Society of MAIT</p>
                <span className="band-rule" aria-hidden />
                <h1 className="band-title">Welcome to A.T.O.M Robotics</h1>
                <p className="band-line">Innovate. Create. Automate.</p>
              </article>

              <article className="band" data-a="0.38" data-b="0.72">
                <p className="band-kicker">What we build</p>
                <span className="band-rule" aria-hidden />
                <p className="band-title">Arms, hexapods, line followers, CNC.</p>
                <p className="band-line">
                  Designed, wired and written from scratch by students, in the lab
                  at Maharaja Agrasen Institute of Technology.
                </p>
              </article>

              <article className="band" data-a="0.72" data-b="1">
                <p className="band-kicker">Come build with us</p>
                <span className="band-rule" aria-hidden />
                <p className="band-title">Join A.T.O.M</p>
                <p className="band-line">
                  A robotics community based out of Delhi.
                </p>
                {actions}
              </article>
            </>
          ) : (
            /* The still. Reduced motion and touch devices land here, so it
               keeps the grade, the grain, the bars and the readout — none of
               which move — and only gives up the scrubbing. */
            <article className="band" data-static-show>
              <p className="band-kicker">Robotics Society of MAIT</p>
              <span className="band-rule" aria-hidden />
              <h1 className="band-title">Welcome to A.T.O.M Robotics</h1>
              <p className="band-line">
                Innovate. Create. Automate. Arms, hexapods, line followers and
                CNC, built from scratch by students in the lab at MAIT.
              </p>
              {actions}
            </article>
          )}
        </div>

        {scrub && (
          <ScrollCue
            targetId="top"
            onActivate={() =>
              window.scrollBy({
                top: window.innerHeight,
                behavior: "smooth",
              })
            }
            className="hero-cue absolute bottom-[calc(var(--hero-bar)+max(1.1rem,env(safe-area-inset-bottom)))] left-1/2 z-20 -translate-x-1/2"
          />
        )}
      </div>
    </section>
  );
}

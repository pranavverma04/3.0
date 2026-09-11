"use client";

/**
 * Text effects, written from scratch rather than pulled in with GSAP.
 *
 * nCrypt uses ScrambleTextPlugin and SplitText for its decode-style reveals.
 * Both are small enough to own outright, and owning them means no 60 KB of
 * library for two effects, and no licence questions about the Club plugins.
 */

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&/<>*+-";

/**
 * Resolves `el` to `text` one character at a time, filling the not-yet-settled
 * tail with noise. Reads as a machine decoding a transmission, which is the
 * right register for a robotics club.
 *
 * Returns a cancel function; call it if the element changes before it lands.
 */
export function scrambleTo(el: HTMLElement, text: string, ms = 700): () => void {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (reduced) {
    el.textContent = text;
    return () => {};
  }

  const start = performance.now();
  let raf = 0;
  const step = (now: number) => {
    const p = Math.min(1, (now - start) / ms);
    // Ease so the last characters settle slowly and the reveal has a tail.
    const settled = Math.floor(text.length * (1 - Math.pow(1 - p, 2.2)));
    let out = text.slice(0, settled);
    for (let i = settled; i < text.length; i++) {
      out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
    }
    el.textContent = out;
    if (p < 1) raf = requestAnimationFrame(step);
    else el.textContent = text;
  };
  raf = requestAnimationFrame(step);
  return () => cancelAnimationFrame(raf);
}

/**
 * Rewrites `el` as one span per word, each wrapped in a clipping span, so the
 * words can be masked upward independently. `--i` carries the word index for
 * the stagger; the animation itself lives in CSS.
 */
export function splitWords(el: HTMLElement) {
  if (el.dataset.split === "1") return;
  const words = (el.textContent || "").split(/\s+/).filter(Boolean);
  el.textContent = "";
  words.forEach((w, i) => {
    const clip = document.createElement("span");
    clip.className = "fx-clip";
    const inner = document.createElement("span");
    inner.className = "fx-word";
    inner.style.setProperty("--i", String(i));
    inner.textContent = w;
    clip.appendChild(inner);
    el.appendChild(clip);
    if (i < words.length - 1) el.appendChild(document.createTextNode(" "));
  });
  el.dataset.split = "1";
}

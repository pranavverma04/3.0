"use client";

import { useEffect, useState } from "react";

export type ScrollState = {
  /** 0 at the top of the document, 1 when the last pixel is on screen. */
  progress: number;
  /** True once the visitor has moved at all — used to retire the hero cue. */
  moved: boolean;
};

/**
 * Page scroll position, sampled on an animation frame rather than on every
 * scroll event, so a trackpad cannot flood the main thread.
 */
export function useScrollPosition(): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, moved: false });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      setState({
        progress: max > 0 ? Math.min(1, Math.max(0, y / max)) : 0,
        moved: y > 24,
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return state;
}

/** Scrolls an element into view, honouring a reduced-motion preference. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
}

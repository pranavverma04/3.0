"use client";

import React, { useEffect, useRef } from "react";
import type { AtomReelInstance, AtomReelSlide } from "./atom-reel";
import { REEL_SLIDES } from "./slides";
import "./atom-reel.css";
import "./theme.css";

type AtomReelProps = {
  /** Photos and captions. Defaults to the five club photos in slides.ts. */
  slides?: AtomReelSlide[];
  /**
   * 'auto' plays on a clock, like a video — the smoother of the two, and the
   * one to use unless you have a reason not to. 'scroll' pins the reel and
   * drives the cuts from the page scroll, which needs every ancestor to avoid
   * `overflow: hidden` (use `overflow: clip`) or sticky positioning breaks.
   */
  mode?: "auto" | "scroll";
  /** Milliseconds a photo rests before the next cut begins. */
  holdMs?: number;
  /** Milliseconds a cut takes. Longer = slower, more languid. */
  cutMs?: number;
  /** Pin each photo to its own `mode` instead of rotating the effects each loop. */
  cycleEffects?: boolean;
  /** Top-left caption on the frame. */
  label?: string;
  sublabel?: string;
  /** 0 strips every flourish back to a plain dissolve, 1 is full strength. */
  intensity?: number;
  className?: string;
};

/**
 * The A.T.O.M photo reel — five club photographs cut together with WebGL
 * transitions and a film grade.
 *
 * The engine underneath is framework-free and builds its own DOM, so this
 * renders an empty host element and hands it over. React never owns the
 * children, which keeps the two from fighting over the same subtree.
 */
export default function AtomReel({
  slides = REEL_SLIDES,
  mode = "auto",
  holdMs,
  cutMs,
  cycleEffects,
  label,
  sublabel,
  intensity,
  className,
}: AtomReelProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let instance: AtomReelInstance | undefined;
    let cancelled = false;

    // Imported here rather than at module scope: the engine touches `window`
    // and `document` the moment it is evaluated, so it must not run on the server.
    void import("./atom-reel.js").then(() => {
      if (cancelled || !window.AtomReel) return;
      instance = window.AtomReel.mount(host, {
        slides,
        mode,
        ...(holdMs !== undefined && { holdMs }),
        ...(cutMs !== undefined && { cutMs }),
        ...(cycleEffects !== undefined && { cycleEffects }),
        ...(label !== undefined && { label }),
        ...(sublabel !== undefined && { sublabel }),
        ...(intensity !== undefined && { intensity }),
      });
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      // destroy() empties the host but leaves the class, attribute and custom
      // property the engine stamped on it; clear just those, so a remount
      // starts clean without touching anything the caller set.
      host.classList.remove("ar-root");
      host.removeAttribute("data-ar-mode");
      host.style.removeProperty("--ar-units");
    };
  }, [slides, mode, holdMs, cutMs, cycleEffects, label, sublabel, intensity]);

  return <div ref={hostRef} className={className} />;
}

export { REEL_SLIDES };
export type { AtomReelSlide };

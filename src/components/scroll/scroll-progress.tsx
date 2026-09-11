"use client";

import React, { useEffect, useState } from "react";
import { useScrollPosition, scrollToId } from "./use-scroll-position";

export type Waypoint = { id: string; label: string };

/**
 * Two ways of saying "there is more below", for the whole page.
 *
 * A hairline at the very top reads as pure progress and works at any width.
 * On a wide screen it is joined by a rail down the left edge that names the
 * sections, marks where you are, and jumps you to any of them — so the page
 * tells you both how far you have come and what is still to come. It sits on
 * the left because the photo reel keeps its own chapter rail on the right, and
 * two rails on one edge read as one confused control.
 */
export default function ScrollProgress({ waypoints }: { waypoints: Waypoint[] }) {
  const { progress } = useScrollPosition();
  const [active, setActive] = useState(0);

  useEffect(() => {
    // The section whose heading has most recently passed the upper third is
    // the one being read; that reads more truthfully than "most pixels shown".
    const marks = waypoints
      .map((w) => document.getElementById(w.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!marks.length) return;

    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = window.innerHeight * 0.34;
      let current = 0;
      marks.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
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
  }, [waypoints]);

  return (
    <>
      {/* Sits above the fixed navbar, which claims a very high z-index. */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-[10000000] h-[2px] bg-transparent"
      >
        <div
          className="h-full origin-left bg-[linear-gradient(90deg,#00bfff,#6c63ff)] shadow-[0_0_12px_rgba(0,191,255,0.7)]"
          style={{ transform: `scaleX(${progress})` }}
        />
      </div>

      <nav
        aria-label="Page sections"
        className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-start gap-5 lg:flex"
      >
        {waypoints.map((w, i) => {
          const isActive = i === active;
          return (
            <button
              key={w.id}
              type="button"
              onClick={() => scrollToId(w.id)}
              aria-current={isActive ? "true" : undefined}
              className="group flex flex-row-reverse items-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfff]"
            >
              <span
                className={`whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.22em] transition-all duration-300 ${
                  isActive
                    ? "text-white/75"
                    : "-translate-x-1 text-white/0 group-hover:translate-x-0 group-hover:text-white/50 group-focus-visible:translate-x-0 group-focus-visible:text-white/50"
                }`}
              >
                {w.label}
              </span>
              {/* A short bar that lengthens and lights when its section is the
                  one on screen — legible at a glance without a tooltip. */}
              <span
                className={`block h-[2px] rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-7 bg-[linear-gradient(90deg,#00bfff,#6c63ff)]"
                    : "w-3.5 bg-white/25 group-hover:w-5 group-hover:bg-white/50"
                }`}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}

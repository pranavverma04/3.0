"use client";
import "./scroll.css";

import React from "react";
import { useScrollPosition, scrollToId } from "./use-scroll-position";

/**
 * The nudge at the foot of the hero. It is a real button — clicking it takes
 * you to the next section — and it retires itself the moment the visitor
 * scrolls, so it never nags someone who has already worked it out.
 */
export default function ScrollCue({
  targetId,
  label = "Scroll",
  className = "",
}: {
  targetId: string;
  label?: string;
  /** Positioning is the caller's business, so it can clear its own chrome. */
  className?: string;
}) {
  const { moved } = useScrollPosition();

  return (
    <button
      type="button"
      onClick={() => scrollToId(targetId)}
      aria-label={`Scroll to ${targetId.replace(/-/g, " ")}`}
      data-hidden={moved || undefined}
      className={`group flex flex-col items-center gap-2.5 rounded-full px-4 py-2 transition-[opacity,transform] duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00bfff] data-[hidden]:pointer-events-none data-[hidden]:translate-y-2 data-[hidden]:opacity-0 ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-white/55 transition-colors group-hover:text-white">
        {label}
      </span>
      {/*
        A line that fills downward on a loop — the gesture the visitor is being
        asked to make, rather than a bouncing arrow.
      */}
      <span className="relative block h-9 w-px overflow-hidden bg-white/15">
        <span className="absolute inset-x-0 top-0 h-1/2 animate-[cue_2s_cubic-bezier(0.65,0,0.35,1)_infinite] bg-[linear-gradient(180deg,transparent,#00bfff)] motion-reduce:animate-none motion-reduce:h-full motion-reduce:opacity-60" />
      </span>
    </button>
  );
}

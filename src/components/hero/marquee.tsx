"use client";

import React from "react";
import "./marquee.css";

/**
 * Oversized type running edge to edge, cropped by the viewport on both sides.
 *
 * Borrowed from nCrypt, where a "CLASS OF 2K24" band does the same job: it
 * reads as texture rather than as a heading, and it gives the eye somewhere to
 * land between two very different sections. The words are duplicated so the
 * loop has no seam, and the copy is marked aria-hidden so a screen reader is
 * not read the same phrase four times.
 */
export default function Marquee({
  text,
  accent,
}: {
  text: string;
  /** One word lit in the brand cyan, the way nCrypt lights a single letter. */
  accent?: string;
}) {
  const run = (
    <span className="mq-run">
      {[0, 1, 2, 3].map((i) => (
        <span className="mq-item" key={i}>
          {text} {accent && <em className="mq-accent">{accent}</em>}{" "}
          <span className="mq-dot">&middot;</span>{" "}
        </span>
      ))}
    </span>
  );

  return (
    <div className="mq" role="presentation">
      {run}
      <span aria-hidden>{run}</span>
    </div>
  );
}

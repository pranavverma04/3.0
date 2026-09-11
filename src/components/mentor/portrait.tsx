import React from "react";
import { profile } from "./profile";

/**
 * The mentor's portrait, served as WebP with a JPEG fallback at three widths.
 * Plain <picture> rather than next/image: the sizes are fixed by the layout, so
 * there is nothing for the optimiser to decide, and this keeps the page static.
 */
export default function Portrait({
  sizes,
  className = "",
  priority = false,
}: {
  /** The `sizes` attribute — what width the image occupies at each breakpoint. */
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  const widths = [400, 800, 1254];
  const srcSet = (ext: "webp" | "jpg") =>
    widths.map((w) => `${profile.photo}-${w}.${ext} ${w}w`).join(", ");

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${profile.photo}-800.jpg`}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        alt={profile.photoAlt}
        width={1254}
        height={1254}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}

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
  photo = profile.photo,
  widths = [400, 800, 1254],
  aspect = 1,
}: {
  /** The `sizes` attribute — what width the image occupies at each breakpoint. */
  sizes: string;
  className?: string;
  priority?: boolean;
  /** Base path of the image set, minus the size suffix and extension. */
  photo?: string;
  /** The widths the set was encoded at, ascending. */
  widths?: number[];
  /** Height divided by width of the source, for the intrinsic size. */
  aspect?: number;
}) {
  const largest = widths[widths.length - 1];
  const srcSet = (ext: "webp" | "jpg") =>
    widths.map((w) => `${photo}-${w}.${ext} ${w}w`).join(", ");

  return (
    <picture>
      <source type="image/webp" srcSet={srcSet("webp")} sizes={sizes} />
      <img
        src={`${photo}-${largest}.jpg`}
        srcSet={srcSet("jpg")}
        sizes={sizes}
        alt={profile.photoAlt}
        width={largest}
        height={Math.round(largest * aspect)}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={className}
      />
    </picture>
  );
}

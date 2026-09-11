"use client";

import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import ScrollCue from "@/components/scroll/scroll-cue";
import "./hero.css";

const HEADLINE = "Welcome to A.T.O.M Robotics";

/**
 * The landing hero.
 *
 * The club's own footage is the most characteristic thing they have, so the
 * job here is to let it carry the page rather than dimming it to 50% and
 * setting type on top. The grade — top and bottom scrims and a vignette —
 * buys the legibility that the dimming used to, and the letterbox bars both
 * frame the shot and echo the reel further down the page.
 *
 * The title still types, because that is how this page has always introduced
 * itself, but it types once and then rests instead of looping forever.
 */
export default function AtomHero({ scrollTargetId }: { scrollTargetId: string }) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section
      id="top"
      className="hero-stage relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-black px-5 text-center"
    >
      <video
        className="hero-video absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-[0.85]"
        src="/4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
      />

      {/* The grade. Four passes: a floor under the whole frame, a scrim under
          the navbar, a heavier one under the type, and a vignette to pull the
          eye to the middle. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[#01050f]/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.72),transparent_20%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,#010516_2%,rgba(1,5,22,0.72)_26%,transparent_62%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(125%_95%_at_50%_42%,transparent_32%,rgba(1,5,22,0.78)_100%),radial-gradient(85%_55%_at_50%_88%,rgba(0,191,255,0.12),transparent_70%)]"
      />
      {/* The lit A.T.O.M sign sits dead centre of this shot, exactly where the
          title lands. This pass sinks it behind the type so it reads as a glow
          rather than as a second, competing headline. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(96%_46%_at_50%_45%,rgba(1,5,22,0.90)_22%,rgba(1,5,22,0.60)_58%,transparent_84%)] sm:bg-[radial-gradient(62%_42%_at_50%_50%,rgba(1,5,22,0.82)_18%,rgba(1,5,22,0.45)_55%,transparent_78%)]"
      />

      {/* Cinemascope bars, the same device the photo reel below uses. */}
      <div
        aria-hidden
        className="hero-bar pointer-events-none absolute inset-x-0 top-0 z-10 bg-[#010516]"
      />
      <div
        aria-hidden
        className="hero-bar pointer-events-none absolute inset-x-0 bottom-0 z-10 bg-[#010516]"
      />

      <div className="relative z-20 flex w-full max-w-[62rem] flex-col items-center">
        <p className="hero-eyebrow text-[10px] font-semibold uppercase tracking-[0.4em] text-[#00bfff] sm:text-[11px] md:text-xs">
          Robotics Society of MAIT
        </p>

        <h1
          className="hero-title mt-6 min-h-[2.2em] text-[clamp(2rem,6.4vw,5rem)] font-bold leading-[1.08] tracking-[-0.03em] text-white [text-wrap:balance] sm:mt-7"
          style={{ textShadow: "0 2px 40px rgba(0,0,0,0.55)" }}
        >
          {reduced ? (
            HEADLINE
          ) : (
            <Typewriter
              options={{ delay: 45, cursor: "|", autoStart: false, loop: false }}
              onInit={(tw) => {
                // Waits for the bars and the eyebrow to land first.
                tw.pauseFor(1000).typeString(HEADLINE).start();
              }}
            />
          )}
        </h1>

        <p className="hero-tagline mt-4 text-[clamp(0.95rem,2.1vw,1.4rem)] font-medium tracking-[0.01em] text-white/70 sm:mt-2">
          Innovate. Create. Automate.
        </p>

        <div className="hero-actions mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12">
          {/* The site's own gradient pill stays as the primary action; the
              second becomes a quieter outline so the two stop competing. */}
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
      </div>

      <ScrollCue
        targetId={scrollTargetId}
        className="hero-cue absolute bottom-[calc(var(--hero-bar)+max(1.1rem,env(safe-area-inset-bottom)))] left-1/2 z-20 -translate-x-1/2"
      />
    </section>
  );
}

"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Poppins } from "next/font/google";
import Typewriter from "typewriter-effect";
import ScrollCue from "@/components/scroll/scroll-cue";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

/**
 * The landing hero, as it was before the rework: the club's footage loops
 * behind a single line of type that cycles between the welcome and the motto,
 * with the two calls to action directly under it.
 */
export default function AtomHero({ scrollTargetId }: { scrollTargetId: string }) {
  return (
    <Box
      id="top"
      component="section"
      sx={{
        position: "relative",
        minHeight: { md: "100vh", xs: "60vh" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 16px",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* BACKGROUND VIDEO */}
      <Box
        component="video"
        src="/4.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        tabIndex={-1}
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
          opacity: 0.85,
          pointerEvents: "none",
        }}
      />

      {/* Light grade so the type stays readable over the footage. */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* HERO HEADLINE */}
      <Typography
        variant="h2"
        component="h1"
        className={poppins.className}
        sx={{
          position: "relative",
          zIndex: 2,
          fontSize: { md: "72px", sm: "52px", xs: "36px" },
          fontWeight: "bold",
          color: "#fff",
          textAlign: "center",
          lineHeight: 1.1,
          minHeight: "1.2em",
          textShadow: "0 2px 30px rgba(0,0,0,0.6)",
          marginBottom: { xs: "0.5rem", md: "1rem" },
          "& .Typewriter__cursor": { color: "#00bfff", fontWeight: 300 },
        }}
      >
        <Typewriter
          options={{
            strings: [
              "Welcome to A.T.O.M Robotics",
              "Innovate. Create. Automate.",
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </Typography>

      {/* HERO BUTTONS */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: { xs: "0.5rem", md: "1rem" },
        }}
      >
        <Button
          className="button"
          sx={{ color: "white", borderRadius: "50px", fontWeight: "bold" }}
          href="https://lnk.bio/A.T.O.M"
        >
          Contact Us
        </Button>
        <Button
          className="button"
          sx={{ color: "white", borderRadius: "50px", fontWeight: "bold" }}
          href="https://atom-robotics-lab.github.io/wiki/"
        >
          Selection Task
        </Button>
      </Box>

      {/* The nudge that there is more below. Retires itself once the visitor
          scrolls. */}
      <ScrollCue
        targetId={scrollTargetId}
        className="absolute bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 z-[2] -translate-x-1/2"
      />
    </Box>
  );
}

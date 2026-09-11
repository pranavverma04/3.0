"use client";

import React from "react";
import { Box, Button, Typography } from "@mui/material";
import ReactPlayer from "react-player";
import { Poppins } from "next/font/google";
import AtomReel from "@/components/atom-reel";
import Typewriter from "typewriter-effect";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const Home = () => {
  // =====================================================
  // MAIN RETURN
  // =====================================================

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
    >
      {/* ================================================= */}
      {/* ================= HERO SECTION ================== */}
      {/* ================================================= */}

      <Box
        sx={{
          position: "relative",
          minHeight: {
            md: "100vh",
            xs: "60vh",
          },

          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          padding: 0,

          overflow: "hidden",
        }}
      >
        {/* BACKGROUND VIDEO */}

        <ReactPlayer
          url="/4.mp4"
          playing={true}
          loop
          muted
          playsinline
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
            opacity: 0.5,
            transform: "scale(1.2)",
            objectFit: "cover",
            pointerEvents: "none",
          }}
        />

        {/* CINEMATIC HERO OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.30) 50%, rgba(0,0,0,0.58) 100%)",
          }}
        />

        {/* HERO CONTENT */}

        <Typography
          variant="h2"
          component="h1"
          className={poppins.className}
          sx={{
            position: "relative",
            zIndex: 2,

            fontSize: {
              md: "90px",
              xs: "40px",
            },

            fontWeight: "bold",

            color: "#ffff",

            textAlign: "center",

            marginBottom: {
              xs: "1.5rem",
              sm: "2rem",
              md: "3rem",
            },
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

            gap: {
              xs: "1rem",
              sm: "1.5rem",
              md: "2rem",
            },

            marginTop: "2rem",

            flexWrap: "wrap",

            justifyContent: "center",
          }}
        >
          <Button
            className="button"
            sx={{
              color: "white",

              borderRadius: "20px",

              fontWeight: "bold",

              padding: {
                xs: "0.5rem 1rem",
                sm: "0.5rem 1.25rem",
                md: "0.5rem 1.5rem",
              },
            }}
            href="https://lnk.bio/A.T.O.M"
          >
            Contact Us
          </Button>

          <Button
            className="button"
            sx={{
              color: "white",

              borderRadius: "20px",

              fontWeight: "bold",

              padding: {
                xs: "0.5rem 1rem",
                sm: "0.5rem 1.25rem",
                md: "0.5rem 1.5rem",
              },
            }}
            href="https://atom-robotics-lab.github.io/wiki/"
          >
            Selection Task
          </Button>
        </Box>
      </Box>

      {/* ================================================= */}
      {/* ================= OUR GLIMPSES ================== */}
      {/* ================================================= */}

      <Box
        sx={{
          position: "relative",

          width: "100%",

          padding: {
            xs: "65px 15px 75px",
            sm: "80px 30px 90px",
            md: "100px 60px 110px",
          },

          background:
            "radial-gradient(circle at 50% 20%, rgba(0,191,255,0.10), transparent 35%), linear-gradient(180deg, #000810 0%, #00111f 100%)",

          overflow: "hidden",

          "&::before": {
            content: '""',

            position: "absolute",

            width: "500px",

            height: "500px",

            borderRadius: "50%",

            background: "rgba(0,191,255,0.07)",

            filter: "blur(100px)",

            top: "-250px",

            left: "50%",

            transform: "translateX(-50%)",
          },
        }}
      >
        {/* ================================================= */}
        {/* SMALL LABEL */}
        {/* ================================================= */}

        <Typography
          className={poppins.className}
          sx={{
            position: "relative",

            color: "#00bfff",

            fontSize: {
              xs: "11px",
              sm: "12px",
              md: "13px",
            },

            fontWeight: "700",

            letterSpacing: "4px",

            textAlign: "center",

            marginBottom: "10px",

            textTransform: "uppercase",
          }}
        >
          LIFE AT A.T.O.M
        </Typography>

        {/* ================================================= */}
        {/* MAIN HEADING */}
        {/* ================================================= */}

        <Typography
          className={poppins.className}
          sx={{
            position: "relative",

            color: "white",

            fontSize: {
              xs: "34px",
              sm: "45px",
              md: "55px",
            },

            fontWeight: "700",

            textAlign: "center",

            lineHeight: 1.1,

            marginBottom: "12px",
          }}
        >
          OUR{" "}
          <span
            style={{
              background:
                "linear-gradient(90deg, #00bfff, #6c63ff, #00bfff)",

              WebkitBackgroundClip: "text",

              WebkitTextFillColor: "transparent",

              backgroundSize: "200% auto",
            }}
          >
            GLIMPSES
          </span>
        </Typography>

        {/* ================================================= */}
        {/* SUBTITLE */}
        {/* ================================================= */}

        <Typography
          className={poppins.className}
          sx={{
            position: "relative",

            color: "rgba(255,255,255,0.55)",

            fontSize: {
              xs: "13px",
              sm: "14px",
              md: "16px",
            },

            textAlign: "center",

            marginBottom: {
              xs: "35px",
              md: "50px",
            },
          }}
        >
          Moments. Machines. Memories. 🤖
        </Typography>

        {/* ================================================= */}
        {/* =================== REEL ======================== */}
        {/* ================================================= */}

        <Box
          sx={{
            position: "relative",

            width: "100%",

            maxWidth: "1150px",

            height: {
              xs: "270px",
              sm: "430px",
              md: "600px",
            },

            margin: "0 auto",

            borderRadius: {
              xs: "20px",
              md: "28px",
            },

            overflow: "hidden",

            backgroundColor: "#02080d",

            border: "1px solid rgba(255,255,255,0.12)",

            boxShadow:
              "0 25px 80px rgba(0,0,0,0.65), 0 0 60px rgba(0,191,255,0.10)",
          }}
        >
          {/* Nine WebGL transitions and a film grade, cutting between the same
              five club photographs the old carousel showed. `ar-framed` keeps
              the reel inside this box rather than letting it take the viewport;
              it brings its own captions, chapter rail and progress bar, so the
              arrows, counter and dots that used to sit here are gone. */}
          <AtomReel
            className="ar-framed"
            label="A.T.O.M Robotics"
            sublabel="Robotics Society of MAIT"
            holdMs={3000}
          />
        </Box>

        {/* ================================================= */}
        {/* BOTTOM TEXT */}
        {/* ================================================= */}

        <Typography
          className={poppins.className}
          sx={{
            color:
              "rgba(255,255,255,0.3)",

            fontSize: "10px",

            textAlign: "center",

            letterSpacing: "2px",

            marginTop: "22px",

            textTransform: "uppercase",
          }}
        >
          Hover the frame &middot; chapters on the right &middot; arrow keys
        </Typography>
      </Box>

      {/* ================================================= */}
      {/* EXISTING ANIMATION STYLES */}
      {/* ================================================= */}

      <style jsx>{`
        @keyframes typing {
          from {
            width: 0;
          }

          to {
            width: 90%;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }

          50% {
            border-color: #001ea5;
          }
        }
      `}</style>
    </Box>
  );
};

export default Home;
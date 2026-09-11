"use client";

import React, { useEffect, useState } from "react";
import { Box, Button, Typography, IconButton } from "@mui/material";
import ReactPlayer from "react-player";
import { Poppins } from "next/font/google";
import Typewriter from "typewriter-effect";
import { AnimatePresence, motion } from "framer-motion";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const images = [
  "/imagespk/1.jpg",
  "/imagespk/2.jpg",
  "/imagespk/3.jpg",
  "/imagespk/4.jpg",
  "/imagespk/5.jpg",
  "/imagespk/6.jpg",
];

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(1);

  // =====================================================
  // AUTOMATIC SLIDESHOW - 3 SECONDS
  // =====================================================

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);

      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // =====================================================
  // NEXT IMAGE
  // =====================================================

  const nextImage = () => {
    setDirection(1);

    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  // =====================================================
  // PREVIOUS IMAGE
  // =====================================================

  const previousImage = () => {
    setDirection(-1);

    setCurrentImage(
      (prev) => (prev - 1 + images.length) % images.length
    );
  };

  // =====================================================
  // DIFFERENT CINEMATIC REVEAL STYLES
  // =====================================================

  const getClipPaths = (index: number) => {
    const animations = [
      {
        initial:
          "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",

        exit:
          "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
      },

      {
        initial:
          "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",

        exit:
          "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
      },

      {
        initial:
          "polygon(0% 0%, 100% 0%, 50% 50%, 0% 100%, 0% 100%)",

        exit:
          "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      },

      {
        initial:
          "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",

        exit:
          "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
      },

      {
        initial:
          "polygon(0% 0%, 0% 0%, 50% 50%, 0% 100%, 0% 100%)",

        exit:
          "polygon(100% 0%, 100% 0%, 50% 50%, 100% 100%, 100% 100%)",
      },

      {
        initial:
          "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",

        exit:
          "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      },
    ];

    return animations[index % animations.length];
  };

  const clip = getClipPaths(currentImage);

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
        {/* ================= CAROUSEL ====================== */}
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

            perspective: "1400px",

            isolation: "isolate",

            transformStyle: "preserve-3d",

            "&::before": {
              content: '""',

              position: "absolute",

              inset: 0,

              zIndex: 10,

              pointerEvents: "none",

              background:
                "linear-gradient(180deg, rgba(0,0,0,0.05) 25%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.80) 100%)",
            },

            "&::after": {
              content: '""',

              position: "absolute",

              inset: 0,

              zIndex: 11,

              pointerEvents: "none",

              background:
                "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.30) 100%)",
            },
          }}
        >
          {/* ================================================= */}
          {/* CINEMATIC IMAGE TRANSITION */}
          {/* ================================================= */}

          <AnimatePresence
            initial={false}
            mode="sync"
          >
            <motion.div
              key={currentImage}
              initial={{
                clipPath: clip.initial,

                scale: 1.18,

                rotate:
                  direction > 0
                    ? 2.8
                    : -2.8,

                filter: "blur(18px)",

                opacity: 0,
              }}
              animate={{
                clipPath:
                  "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",

                scale: 1,

                rotate: 0,

                filter: "blur(0px)",

                opacity: 1,
              }}
              exit={{
                clipPath: clip.exit,

                scale: 1.10,

                rotate:
                  direction > 0
                    ? -1.8
                    : 1.8,

                filter: "blur(12px)",

                opacity: 0,
              }}
              transition={{
                duration: 1.25,

                ease: [0.76, 0, 0.24, 1],
              }}
              style={{
                position: "absolute",

                inset: 0,

                width: "100%",

                height: "100%",

                zIndex: 0,

                transformOrigin: "center center",

                willChange:
                  "transform, clip-path, filter, opacity",
              }}
            >
              {/* IMAGE */}

              <Box
                component="img"
                src={images[currentImage]}
                alt={`A.T.O.M Robotics event ${
                  currentImage + 1
                }`}
                sx={{
                  width: "100%",

                  height: "100%",

                  objectFit: "cover",

                  display: "block",

                  transform: "scale(1.06)",

                  animation:
                    "kenBurns 3s cubic-bezier(0.22, 1, 0.36, 1) forwards",

                  "@keyframes kenBurns": {
                    "0%": {
                      transform:
                        "scale(1.08)",
                    },

                    "100%": {
                      transform:
                        "scale(1)",
                    },
                  },
                }}
              />

              {/* CINEMATIC DARK GRADIENT */}

              <Box
                sx={{
                  position: "absolute",

                  inset: 0,

                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.05) 20%, rgba(0,0,0,0.05) 45%, rgba(0,0,0,0.82) 100%)",

                  pointerEvents: "none",
                }}
              />

              {/* BLUE CINEMATIC GLOW */}

              <Box
                sx={{
                  position: "absolute",

                  inset: 0,

                  background:
                    "radial-gradient(circle at 50% 50%, transparent 35%, rgba(0,191,255,0.12) 100%)",

                  mixBlendMode: "screen",

                  pointerEvents: "none",
                }}
              />

              {/* SUBTLE EDGE VIGNETTE */}

              <Box
                sx={{
                  position: "absolute",

                  inset: 0,

                  boxShadow:
                    "inset 0 0 120px rgba(0,0,0,0.65)",

                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* ================================================= */}
          {/* TOP LEFT - LIVE TAG */}
          {/* ================================================= */}

          <Box
            sx={{
              position: "absolute",

              top: {
                xs: "15px",
                md: "22px",
              },

              left: {
                xs: "15px",
                md: "22px",
              },

              zIndex: 20,

              display: "flex",

              alignItems: "center",

              gap: "7px",

              padding: "7px 12px",

              borderRadius: "30px",

              backgroundColor:
                "rgba(0,0,0,0.40)",

              backdropFilter: "blur(16px)",

              WebkitBackdropFilter:
                "blur(16px)",

              border:
                "1px solid rgba(255,255,255,0.16)",

              color: "white",

              fontSize: "10px",

              fontWeight: "700",

              letterSpacing: "1.5px",

              boxShadow:
                "0 8px 30px rgba(0,0,0,0.25)",
            }}
          >
            <Box
              sx={{
                width: "7px",

                height: "7px",

                borderRadius: "50%",

                backgroundColor: "#00bfff",

                boxShadow:
                  "0 0 10px #00bfff",

                animation:
                  "livePulse 1.8s ease-in-out infinite",

                "@keyframes livePulse": {
                  "0%, 100%": {
                    opacity: 1,

                    transform: "scale(1)",
                  },

                  "50%": {
                    opacity: 0.4,

                    transform: "scale(0.7)",
                  },
                },
              }}
            />

            ATOM MOMENTS
          </Box>

          {/* ================================================= */}
          {/* IMAGE NUMBER */}
          {/* ================================================= */}

          <Typography
            className={poppins.className}
            sx={{
              position: "absolute",

              top: {
                xs: "15px",
                md: "22px",
              },

              right: {
                xs: "15px",
                md: "22px",
              },

              zIndex: 20,

              color: "white",

              fontSize: {
                xs: "12px",
                md: "14px",
              },

              fontWeight: "700",

              padding: "8px 12px",

              borderRadius: "30px",

              backgroundColor:
                "rgba(0,0,0,0.40)",

              backdropFilter: "blur(16px)",

              WebkitBackdropFilter:
                "blur(16px)",

              border:
                "1px solid rgba(255,255,255,0.16)",
            }}
          >
            {String(
              currentImage + 1
            ).padStart(2, "0")}{" "}
            <span
              style={{
                opacity: 0.4,
              }}
            >
              /{" "}
              {String(
                images.length
              ).padStart(2, "0")}
            </span>
          </Typography>

          {/* ================================================= */}
          {/* LEFT ARROW */}
          {/* ================================================= */}

          <IconButton
            onClick={previousImage}
            aria-label="Previous image"
            sx={{
              position: "absolute",

              left: {
                xs: "12px",
                md: "25px",
              },

              top: "50%",

              transform:
                "translateY(-50%)",

              zIndex: 25,

              color: "white",

              width: {
                xs: "42px",
                md: "54px",
              },

              height: {
                xs: "42px",
                md: "54px",
              },

              backgroundColor:
                "rgba(0,0,0,0.30)",

              backdropFilter:
                "blur(14px)",

              WebkitBackdropFilter:
                "blur(14px)",

              border:
                "1px solid rgba(255,255,255,0.25)",

              transition:
                "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",

              "&:hover": {
                backgroundColor:
                  "rgba(0,191,255,0.85)",

                transform:
                  "translateY(-50%) scale(1.12)",

                boxShadow:
                  "0 0 35px rgba(0,191,255,0.55)",

                borderColor:
                  "rgba(255,255,255,0.6)",
              },
            }}
          >
            <span
              style={{
                fontSize: "30px",

                lineHeight: 1,

                fontWeight: 300,
              }}
            >
              ‹
            </span>
          </IconButton>

          {/* ================================================= */}
          {/* RIGHT ARROW */}
          {/* ================================================= */}

          <IconButton
            onClick={nextImage}
            aria-label="Next image"
            sx={{
              position: "absolute",

              right: {
                xs: "12px",
                md: "25px",
              },

              top: "50%",

              transform:
                "translateY(-50%)",

              zIndex: 25,

              color: "white",

              width: {
                xs: "42px",
                md: "54px",
              },

              height: {
                xs: "42px",
                md: "54px",
              },

              backgroundColor:
                "rgba(0,0,0,0.30)",

              backdropFilter:
                "blur(14px)",

              WebkitBackdropFilter:
                "blur(14px)",

              border:
                "1px solid rgba(255,255,255,0.25)",

              transition:
                "all 0.45s cubic-bezier(0.22, 1, 0.36, 1)",

              "&:hover": {
                backgroundColor:
                  "rgba(0,191,255,0.85)",

                transform:
                  "translateY(-50%) scale(1.12)",

                boxShadow:
                  "0 0 35px rgba(0,191,255,0.55)",

                borderColor:
                  "rgba(255,255,255,0.6)",
              },
            }}
          >
            <span
              style={{
                fontSize: "30px",

                lineHeight: 1,

                fontWeight: 300,
              }}
            >
              ›
            </span>
          </IconButton>

          {/* ================================================= */}
          {/* BOTTOM INFO */}
          {/* ================================================= */}

          <Box
            sx={{
              position: "absolute",

              bottom: {
                xs: "18px",
                md: "25px",
              },

              left: {
                xs: "18px",
                md: "30px",
              },

              zIndex: 20,

              color: "white",
            }}
          >
            <Typography
              className={poppins.className}
              sx={{
                fontSize: {
                  xs: "14px",
                  md: "18px",
                },

                fontWeight: "700",

                letterSpacing: "0.3px",
              }}
            >
              Building the future.
            </Typography>

            <Typography
              sx={{
                fontSize: {
                  xs: "10px",
                  md: "12px",
                },

                color:
                  "rgba(255,255,255,0.65)",

                marginTop: "3px",
              }}
            >
              A.T.O.M Robotics
            </Typography>
          </Box>

          {/* ================================================= */}
          {/* PROGRESS BAR - EXACTLY 3 SECONDS */}
          {/* ================================================= */}

          <Box
            sx={{
              position: "absolute",

              bottom: 0,

              left: 0,

              width: "100%",

              height: "3px",

              backgroundColor:
                "rgba(255,255,255,0.12)",

              zIndex: 30,

              overflow: "hidden",
            }}
          >
            <Box
              key={currentImage}
              sx={{
                height: "100%",

                background:
                  "linear-gradient(90deg, #00bfff, #6c63ff, #00bfff)",

                backgroundSize: "200% 100%",

                animation:
                  "progress 3s linear forwards",

                boxShadow:
                  "0 0 15px rgba(0,191,255,0.8)",

                "@keyframes progress": {
                  "0%": {
                    width: "0%",

                    backgroundPosition:
                      "0% 50%",
                  },

                  "100%": {
                    width: "100%",

                    backgroundPosition:
                      "100% 50%",
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* ================================================= */}
        {/* ================= DOTS =========================== */}
        {/* ================================================= */}

        <Box
          sx={{
            display: "flex",

            justifyContent: "center",

            alignItems: "center",

            gap: "8px",

            marginTop: "25px",
          }}
        >
          {images.map((_, index) => (
            <Box
              key={index}
              onClick={() => {
                setDirection(
                  index > currentImage
                    ? 1
                    : -1
                );

                setCurrentImage(index);
              }}
              sx={{
                width:
                  currentImage === index
                    ? "32px"
                    : "7px",

                height: "7px",

                borderRadius: "20px",

                background:
                  currentImage === index
                    ? "linear-gradient(90deg, #00bfff, #6c63ff)"
                    : "rgba(255,255,255,0.35)",

                cursor: "pointer",

                transition:
                  "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",

                boxShadow:
                  currentImage === index
                    ? "0 0 15px rgba(0,191,255,0.45)"
                    : "none",

                "&:hover": {
                  background:
                    "linear-gradient(90deg, #00bfff, #6c63ff)",

                  transform:
                    "scale(1.4)",
                },
              }}
            />
          ))}
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
          Swipe through the moments
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
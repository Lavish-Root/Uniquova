"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue
} from "framer-motion";
import { SelectedWorkItem, DEFAULT_SELECTED_WORK } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";

export default function SelectedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [showcases, setShowcases] = useState<SelectedWorkItem[]>(DEFAULT_SELECTED_WORK);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorSide, setCursorSide] = useState<"prev" | "next">("next");

  // Fetch live showcases directly from CMS
  useEffect(() => {
    let isMounted = true;
    async function loadCMSShowcases() {
      try {
        const res = await fetch("/api/selected-work");
        if (res.ok) {
          const data = await res.json();
          if (isMounted && Array.isArray(data.items) && data.items.length > 0) {
            setShowcases(data.items);
          }
        }
      } catch {
        // Graceful fallback to default curated showcases
      }
    }
    loadCMSShowcases();
    return () => {
      isMounted = false;
    };
  }, []);

  const total = showcases.length;
  const current = showcases[currentIndex] || showcases[0] || DEFAULT_SELECTED_WORK[0];

  // Navigation callbacks
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // ====================================================================
  // EXACT REFERENCE SCROLL-UP ENTRANCE ANIMATION (Matching Reference Video)
  // When scrolling down from the landing page, the entire "Ideas brought to life"
  // container slides UP with buttery spring physics, scale elevation, and 3D tilt.
  // ====================================================================
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 10%"],
  });

  const springConfig = { stiffness: 140, damping: 22, mass: 0.3 };

  // Transforms for the entrance:
  // - Entire container slides UP from 320px down to 0px
  // - Scales from 0.88 to 1.0
  // - 3D perspective rotation (14deg -> 0deg)
  // - Smooth opacity transition
  const rawY = useTransform(scrollYProgress, [0, 1], [320, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.88, 1.0]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45], [0.3, 1.0]);

  const smoothY = useSpring(rawY, springConfig);
  const smoothScale = useSpring(rawScale, springConfig);
  const smoothRotateX = useSpring(rawRotateX, springConfig);
  const smoothOpacity = useSpring(rawOpacity, springConfig);

  // ====================================================================
  // BUTTERY-SMOOTH 3D HOVER TILT ANIMATION
  // Uses MotionValues and spring physics for GPU-accelerated motion
  // without triggering constant React re-renders on mousemove
  // ====================================================================
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const tiltSpringConfig = { stiffness: 110, damping: 18, mass: 0.15 };
  const smoothTiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4.5, -4.5]), tiltSpringConfig);
  const smoothTiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4.5, 4.5]), tiltSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Determine left or right half for cursor click navigation
    setCursorSide(x < rect.width / 2 ? "prev" : "next");

    // Normalized coordinates from -0.5 to +0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;
    mouseX.set(normX);
    mouseY.set(normY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Smoothly springs back to flat 0deg
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleCardClick = () => {
    if (cursorSide === "next") {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  // Autoplay timer set to exactly 2 seconds (2000ms) with pause-on-hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  return (
    <section
      ref={containerRef}
      id="selected-work"
      style={{ perspective: "1200px" }}
      className="relative w-full bg-[#FAF9FF] pt-8 pb-16 sm:pb-24 lg:pb-32 overflow-hidden -mt-10 sm:-mt-16 lg:-mt-20 z-20"
    >
      {/* ====================================================
          THE SCROLL-UP ENTRANCE CONTAINER
          The entire "Ideas brought to life" container slides UP
          smoothly into view as you scroll down
         ==================================================== */}
      <motion.div
        style={{
          y: smoothY,
          scale: smoothScale,
          rotateX: smoothRotateX,
          opacity: smoothOpacity,
          transformStyle: "preserve-3d",
        }}
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full will-change-transform"
      >
        {/* Sleek Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          align="left"
          maxWidth="max-w-3xl"
          className="mb-6 sm:mb-8"
          title="Ideas brought to life."
          titleClassName="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight mb-2"
          subtitle="Explore category-defining digital experiences crafted with strategy, technology, and design."
          subtitleClassName="text-sm sm:text-base text-dark-muted max-w-xl font-medium"
        />

        {/* ====================================================
            THE CINEMA SHOWCASE CARD
            - Controlled directly via CMS
            - ZERO text on the image
            - Automatic 2s shift
            - Buttery-smooth GPU spring hover tilt
            - Cursor click navigation (left = prev, right = next)
           ==================================================== */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          style={{
            rotateX: smoothTiltX,
            rotateY: smoothTiltY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full h-[64vh] sm:h-[72vh] lg:h-[78vh] min-h-[480px] max-h-[820px] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0A0910] shadow-[0_30px_90px_-20px_rgba(21,19,35,0.45)] border border-white/10 cursor-pointer select-none group will-change-transform"
        >
          {/* Active Image / Video with Cool Landing Animation */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 1.12,
                x: direction > 0 ? 70 : -70,
                filter: "brightness(1.2) blur(8px)",
              }}
              animate={{
                opacity: 1,
                scale: 1.0,
                x: 0,
                filter: "brightness(1.0) blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.94,
                x: direction > 0 ? -70 : 70,
                filter: "brightness(0.8) blur(6px)",
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute inset-0 w-full h-full"
            >
              {current.isVideo && current.videoSrc ? (
                <video
                  src={current.videoSrc}
                  poster={current.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={current.src}
                  alt={current.alt || current.title}
                  className="w-full h-full object-cover select-none pointer-events-none"
                  loading="eager"
                  decoding="async"
                />
              )}

              {/* Cool Diagonal Lens Shine Sweep on Landing */}
              <motion.div
                key={`shine-${current.id}`}
                initial={{ x: "-120%", opacity: 0.8 }}
                animate={{ x: "220%", opacity: 0 }}
                transition={{ duration: 0.95, ease: "easeOut" }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-12 pointer-events-none z-10"
              />
            </motion.div>
          </AnimatePresence>

          {/* Autoplay Progress Bar at Top (2.0s duration) */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-white/10 z-30 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: isHovered ? "100%" : "100%" }}
              transition={{
                duration: isHovered ? 0 : 2.0,
                ease: "linear",
              }}
              className="h-full bg-gradient-to-r from-primary via-purple-300 to-white shadow-[0_0_12px_rgba(117,69,245,0.8)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

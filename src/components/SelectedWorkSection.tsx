"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { SELECTED_WORK_SLIDES } from "./selectedWorkData";

export default function SelectedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const [maxScroll, setMaxScroll] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // Measure track scrollable distance
  const updateScrollRange = useCallback(() => {
    if (trackRef.current && containerRef.current) {
      const trackWidth = trackRef.current.scrollWidth;
      const viewportWidth = window.innerWidth;
      const range = Math.max(0, trackWidth - viewportWidth + 120);
      setMaxScroll(range);
    }
  }, []);

  useEffect(() => {
    updateScrollRange();
    window.addEventListener("resize", updateScrollRange);
    const timer = setTimeout(updateScrollRange, 500);
    return () => {
      window.removeEventListener("resize", updateScrollRange);
      clearTimeout(timer);
    };
  }, [updateScrollRange]);

  // Scroll-driven horizontal translation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation based on scroll progress
  const rawX = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);
  const smoothX = useSpring(rawX, {
    stiffness: 280,
    damping: 32,
    mass: 0.12,
  });

  // Track active slide based on scroll progress
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const index = Math.min(
        SELECTED_WORK_SLIDES.length - 1,
        Math.floor(progress * SELECTED_WORK_SLIDES.length)
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Navigate next / prev manually
  const handleScrollByStep = (direction: "prev" | "next") => {
    if (!containerRef.current) return;
    const currentScroll = window.scrollY;
    const rect = containerRef.current.getBoundingClientRect();
    const sectionTop = currentScroll + rect.top;
    const sectionHeight = containerRef.current.offsetHeight - window.innerHeight;
    const stepSize = sectionHeight / SELECTED_WORK_SLIDES.length;

    const targetScroll =
      direction === "next"
        ? Math.min(sectionTop + sectionHeight, currentScroll + stepSize * 1.5)
        : Math.max(sectionTop, currentScroll - stepSize * 1.5);

    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  };

  return (
    <div
      ref={containerRef}
      id="selected-work"
      data-framer-name="work-section"
      className="relative w-full bg-[#FAF9FF] h-[320vh] transition-colors"
    >
      {/* Sticky Viewport Window */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden px-3 sm:px-6 lg:px-8 py-6 select-none">
        
        {/* Top Header & Indicator */}
        <div className="w-full max-w-[1440px] flex items-center justify-between mb-3 px-2 z-20">
          <div className="framer-vroyzf flex items-center gap-2.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <h5 className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-dark/90">
              Selected work
            </h5>
            <span className="text-xs font-semibold text-dark-muted hidden sm:inline">
              — Ideas brought to life
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 text-xs font-medium text-dark-muted bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-border shadow-sm">
              <span className="text-primary font-bold">
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <span>/</span>
              <span>{String(SELECTED_WORK_SLIDES.length).padStart(2, "0")}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleScrollByStep("prev")}
                disabled={activeIndex === 0}
                aria-label="Previous Project"
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-dark shadow-sm border border-border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollByStep("next")}
                disabled={activeIndex >= SELECTED_WORK_SLIDES.length - 1}
                aria-label="Next Project"
                className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-dark shadow-sm border border-border flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:scale-105"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Slideshow Display Frame */}
        <div
          className="framer-gqnj4s-container relative w-full max-w-[1440px] h-[74vh] sm:h-[78vh] max-h-[820px] min-h-[460px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#0F0E17] shadow-[0_20px_60px_-15px_rgba(21,19,35,0.25)] border border-dark/10"
          style={{ perspective: "1200px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Framer Slideshow Axis-X Track */}
          <div className="absolute inset-0 w-full h-full overflow-hidden p-2.5 sm:p-3.5">
            <motion.ul
              ref={trackRef}
              style={{ x: smoothX }}
              className="flex flex-row items-center h-full w-max gap-2.5 sm:gap-3.5 list-none m-0 p-0 cursor-grab active:cursor-grabbing will-change-transform"
            >
              {SELECTED_WORK_SLIDES.map((slide, index) => (
                <li
                  key={slide.id}
                  className="h-full flex-shrink-0 relative rounded-[18px] sm:rounded-[24px] overflow-hidden bg-[#181622] group shadow-lg"
                  style={{
                    aspectRatio: slide.aspectRatio,
                    height: "100%",
                  }}
                >
                  {slide.isVideo && slide.videoSrc ? (
                    <video
                      src={slide.videoSrc}
                      poster={slide.posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover block rounded-[inherit] transition-transform duration-700 group-hover:scale-105"
                      aria-label={slide.alt || slide.name}
                    />
                  ) : (
                    <img
                      src={slide.src}
                      alt={slide.alt || slide.name}
                      loading={index < 4 ? "eager" : "lazy"}
                      decoding="async"
                      className="w-full h-full object-cover block rounded-[inherit] transition-transform duration-700 group-hover:scale-105 select-none pointer-events-none"
                    />
                  )}

                  {/* Subtle vignette overlay on edges */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-40 transition-opacity pointer-events-none rounded-[inherit]" />

                  {/* Clean bottom badge with slide title */}
                  <div className="absolute bottom-3.5 left-3.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-white tracking-wide border border-white/10 shadow-sm capitalize">
                      {slide.name.replace(/_/g, " ")}
                    </span>
                  </div>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Hover Controls (Framer-style slideshow prev/next navigation) */}
          <div
            className={`absolute inset-y-0 left-4 right-4 flex items-center justify-between pointer-events-none transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() => handleScrollByStep("prev")}
              disabled={activeIndex === 0}
              aria-label="Previous"
              className="pointer-events-auto w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all disabled:opacity-0 hover:scale-110 shadow-lg border border-white/15"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleScrollByStep("next")}
              disabled={activeIndex >= SELECTED_WORK_SLIDES.length - 1}
              aria-label="Next"
              className="pointer-events-auto w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md flex items-center justify-center transition-all disabled:opacity-0 hover:scale-110 shadow-lg border border-white/15"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Bottom subtle scroll progress line */}
          <div className="absolute bottom-2 left-6 right-6 h-[2px] bg-white/15 rounded-full overflow-hidden pointer-events-none">
            <motion.div
              style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
              className="h-full bg-gradient-to-r from-primary via-purple-400 to-white"
            />
          </div>
        </div>

        {/* Bottom exploration hint */}
        <div className="w-full max-w-[1440px] flex items-center justify-between mt-2.5 px-2 text-[11px] text-dark-muted font-medium">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Scroll down to glide through work showcase
          </span>
          <span className="hidden sm:inline">
            Drag, swipe or use arrows to navigate
          </span>
        </div>
      </div>
    </div>
  );
}

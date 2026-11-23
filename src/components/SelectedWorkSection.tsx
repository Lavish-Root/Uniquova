"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

// Curated showcases with high-resolution original visuals from WeGrow & UNIQOVA
export const FEATURED_SHOWCASES = [
  {
    id: "showcase-ruuster",
    title: "Ruuster AI — Manhattan Billboard Series",
    src: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_2000.webp",
    alt: "Ruuster brand identity displayed on a building billboard in New York City",
  },
  {
    id: "showcase-euroteam",
    title: "Euroteam — Global Logistics Digital Platform",
    src: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_2048.webp",
    alt: "Euroteam website homepage displayed on a laptop",
  },
  {
    id: "showcase-mark-os",
    title: "Mark OS — AI Content Review Platform",
    src: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_2560.webp",
    alt: "MarkOS website homepage design showing AI-powered content review platform",
  },
  {
    id: "showcase-megahr",
    title: "Mega HR — AI Hiring Subway Takeover",
    src: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_2048.webp",
    alt: "Mega HR brand identity posters on subway screens showing AI hiring platform",
  },
  {
    id: "showcase-credit-attorney",
    title: "The Credit Attorney — Visual Identity System",
    src: "/images/selected_work/HihuK51yaPuGKHmnXrlbzvzZM_1920.webp",
    alt: "The Credit Attorney complete brand identity system showing logo and typography",
  },
  {
    id: "showcase-tablet-ux",
    title: "Mark OS — Tablet & Mobile Application UX",
    src: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_2560.webp",
    alt: "Mark OS social media profile on a tablet showing the brand avatar and cover design",
  },
  {
    id: "showcase-delupay",
    title: "DeluPay — 3D Fintech Payments Identity",
    src: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_1504.webp",
    alt: "DeluPay 3D brand visual with metallic phone on pink-purple gradient",
  },
  {
    id: "showcase-adv",
    title: "Advimagine — Manufacturing Art Precision",
    src: "/images/selected_work/QAxA8GI2uEu8q2zketxqbeX0Rg_2560.webp",
    alt: "Website hero section on deep red background with glossy black 3D arrow",
  },
  {
    id: "showcase-twin",
    title: "TWIN Global — Digital Trade Ecosystem",
    src: "/images/selected_work/me7oqaVBqgeLO9RXw1QevAGsFlw_2048.webp",
    alt: "TWIN design system showing typography, color palette, and UI components",
  },
  {
    id: "showcase-motion",
    title: "The Credit Attorney — Motion Experience",
    src: "/images/selected_work/UxiCl5JNg31dqV7i7ez49Tvc4E_poster.webp",
    videoSrc: "/images/selected_work/UxiCl5JNg31dqV7i7ez49Tvc4E_video.mp4",
    isVideo: true,
    alt: "Animation showing medical bills and healthcare cost challenges",
  },
];

export default function SelectedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorSide, setCursorSide] = useState<"prev" | "next">("next");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const total = FEATURED_SHOWCASES.length;
  const current = FEATURED_SHOWCASES[currentIndex];

  // Navigation callbacks
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

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

  // Transforms:
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

  // Autoplay timer set to exactly 2 seconds (2000ms) with pause-on-hover
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 2000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  // Interactive Cursor tracking & 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPos({ x, y });

    // Determine left or right half for cursor click navigation
    if (x < rect.width / 2) {
      setCursorSide("prev");
    } else {
      setCursorSide("next");
    }

    // Dynamic 3D interactive tilt (-2.2deg to +2.2deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 2.2;
    const tiltY = ((x - centerX) / centerX) * 2.2;
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleCardClick = () => {
    if (cursorSide === "next") {
      nextSlide();
    } else {
      prevSlide();
    }
  };

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
        {/* Sleek Section Header (Slides up together with the showcase!) */}
        <div className="mb-6 sm:mb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>Selected Work</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight">
            Ideas brought to life.
          </h2>
          <p className="text-sm sm:text-base text-dark-muted max-w-xl mt-2 font-medium">
            Explore category-defining digital experiences crafted with strategy, technology, and design.
          </p>
        </div>

        {/* ====================================================
            THE CINEMA SHOWCASE CARD
            - ZERO text on the image
            - Automatic 2s shift
            - Interactive cursor switching with glowing arrows
            - Cool 3D landing animation with lens sweep
           ==================================================== */}
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            setTilt({ x: 0, y: 0 });
          }}
          onClick={handleCardClick}
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s ease-out",
          }}
          className="relative w-full h-[64vh] sm:h-[72vh] lg:h-[78vh] min-h-[480px] max-h-[820px] rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0A0910] shadow-[0_30px_90px_-20px_rgba(21,19,35,0.45)] border border-white/10 cursor-pointer select-none group"
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
                  alt={current.alt}
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

          {/* ====================================================
              MINIMALIST CURSOR FOLLOWER ICON (No text, pure arrow)
             ==================================================== */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.12 }}
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              className="pointer-events-none absolute z-40 hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-black/75 text-white backdrop-blur-xl border border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            >
              {cursorSide === "prev" ? (
                <ChevronLeft className="w-6 h-6 text-white stroke-[2.5]" />
              ) : (
                <ChevronRight className="w-6 h-6 text-white stroke-[2.5]" />
              )}
            </motion.div>
          )}

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

          {/* Side Indicator Arrows for Mobile / Touch devices */}
          <div className="absolute inset-y-0 left-3 right-3 flex items-center justify-between pointer-events-none md:hidden z-20">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center border border-white/10"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="pointer-events-auto w-10 h-10 rounded-full bg-black/60 text-white backdrop-blur-md flex items-center justify-center border border-white/10"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Bottom Centered Pagination Dots */}
        <div className="mt-6 flex items-center justify-center">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 max-w-full">
            {FEATURED_SHOWCASES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`group relative h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 sm:w-10 bg-primary shadow-[0_0_12px_rgba(117,69,245,0.5)]"
                    : "w-2.5 bg-dark/20 hover:bg-dark/40"
                }`}
              >
                <span className="sr-only">Slide {idx + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

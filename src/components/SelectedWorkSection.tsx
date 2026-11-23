"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  ArrowUpRight, 
  Pause, 
  Play 
} from "lucide-react";

// Curated showcases with rich metadata aligned with UNIQOVA's agency offerings
export const FEATURED_SHOWCASES = [
  {
    id: "showcase-ruuster",
    title: "Ruuster AI — Manhattan Billboard Series",
    category: "Branding & OOH Campaign",
    tagline: "High-impact visual identity displayed on New York City building billboards.",
    metric: "+240% Brand Recall",
    src: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_2000.webp",
    alt: "Ruuster brand identity displayed on a building billboard in New York City",
    accent: "#7545F5",
  },
  {
    id: "showcase-euroteam",
    title: "Euroteam — Global Logistics Digital Platform",
    category: "Website Development & UI/UX",
    tagline: "Headless responsive enterprise portal built for modern supply chain management.",
    metric: "99.98% Uptime SLA",
    src: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_2048.webp",
    alt: "Euroteam website homepage displayed on a laptop",
    accent: "#5030C7",
  },
  {
    id: "showcase-mark-os",
    title: "Mark OS — AI Content Review Platform",
    category: "SaaS Web Application",
    tagline: "AI-driven content validation & brand compliance dashboard.",
    metric: "0.4s Verification Speed",
    src: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_2560.webp",
    alt: "MarkOS website homepage design showing AI-powered content review platform",
    accent: "#8B5CF6",
  },
  {
    id: "showcase-megahr",
    title: "Mega HR — AI Hiring Subway Takeover",
    category: "Graphic Design & Creatives",
    tagline: "Massive outdoor advertising screens introducing AI-first recruitment.",
    metric: "3.2x Application Lift",
    src: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_2048.webp",
    alt: "Mega HR brand identity posters on subway screens showing AI hiring platform",
    accent: "#6366F1",
  },
  {
    id: "showcase-credit-attorney",
    title: "The Credit Attorney — Visual Identity System",
    category: "Branding & Guidelines",
    tagline: "Complete legal branding system, custom stationery, and design language.",
    metric: "Complete Legal Rebrand",
    src: "/images/selected_work/HihuK51yaPuGKHmnXrlbzvzZM_1920.webp",
    alt: "The Credit Attorney complete brand identity system showing logo and typography",
    accent: "#059669",
  },
  {
    id: "showcase-tablet-ux",
    title: "Mark OS — Tablet & Mobile Application UX",
    category: "App Development",
    tagline: "Fluid multi-device design with adaptive ergonomics for on-the-go teams.",
    metric: "4.9★ App Store Rating",
    src: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_2560.webp",
    alt: "Mark OS social media profile on a tablet showing the brand avatar and cover design",
    accent: "#7545F5",
  },
  {
    id: "showcase-delupay",
    title: "DeluPay — 3D Fintech Payments Identity",
    category: "E-Commerce & Fintech",
    tagline: "Sculpted 3D hardware renders and interactive payments interface.",
    metric: "Seamless Mobile Pay",
    src: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_1504.webp",
    alt: "DeluPay 3D brand visual with metallic phone on pink-purple gradient",
    accent: "#EC4899",
  },
  {
    id: "showcase-adv",
    title: "Advimagine — Manufacturing Art Precision",
    category: "Digital Agency & 3D Art",
    tagline: "High-contrast editorial landing page for cutting-edge composite manufacturing.",
    metric: "Awwwards Nominee",
    src: "/images/selected_work/QAxA8GI2uEu8q2zketxqbeX0Rg_2560.webp",
    alt: "Website hero section on deep red background with glossy black 3D arrow",
    accent: "#DC2626",
  },
  {
    id: "showcase-twin",
    title: "TWIN Global — Digital Trade Ecosystem",
    category: "Enterprise System & UI",
    tagline: "Comprehensive component library, visual token system, and brand collateral.",
    metric: "Global IOTA Network",
    src: "/images/selected_work/me7oqaVBqgeLO9RXw1QevAGsFlw_2048.webp",
    alt: "TWIN design system showing typography, color palette, and UI components",
    accent: "#3B82F6",
  },
  {
    id: "showcase-motion",
    title: "The Credit Attorney — Motion Experience",
    category: "Interactive Motion & Video",
    tagline: "Dynamic visual storytelling explaining complex consumer finance workflows.",
    metric: "High-Retention Video",
    src: "/images/selected_work/UxiCl5JNg31dqV7i7ez49Tvc4E_poster.webp",
    videoSrc: "/images/selected_work/UxiCl5JNg31dqV7i7ez49Tvc4E_video.mp4",
    isVideo: true,
    alt: "Animation showing medical bills and healthcare cost challenges",
    accent: "#7545F5",
  },
];

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
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

  // Scroll entrance animation: when user scrolls down from landing page,
  // this section smoothly moves up into view and scales into a cinema screen
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const sectionY = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const sectionScale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.6], [0.5, 1]);

  const smoothY = useSpring(sectionY, { stiffness: 240, damping: 28 });
  const smoothScale = useSpring(sectionScale, { stiffness: 240, damping: 28 });

  // Autoplay timer with pause-on-hover
  useEffect(() => {
    if (!isAutoPlaying || isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4200);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isHovered, nextSlide]);

  // Cursor tracking & 3D tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPos({ x, y });

    // Determine left or right side for cursor click
    if (x < rect.width / 2) {
      setCursorSide("prev");
    } else {
      setCursorSide("next");
    }

    // Subtle 3D tilt calculation (-2.5deg to +2.5deg)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = -((y - centerY) / centerY) * 2;
    const tiltY = ((x - centerX) / centerX) * 2;
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
      ref={sectionRef}
      id="selected-work"
      className="relative w-full bg-[#FAF9FF] py-12 lg:py-20 overflow-hidden"
    >
      <motion.div
        style={{
          y: smoothY,
          scale: smoothScale,
          opacity: sectionOpacity,
        }}
        className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        {/* Top Header Label & Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              <span>Selected Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Ideas brought to life.
            </h2>
            <p className="text-sm sm:text-base text-dark-muted max-w-xl mt-2 font-medium">
              Explore how design, technology and strategy merge to create category-defining digital experiences.
            </p>
          </div>

          {/* Controls: Counter + Navigation Buttons + Autoplay Toggle */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Slide Counter */}
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-border shadow-sm text-xs font-semibold text-dark">
              <span className="text-primary font-bold text-sm">
                {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <span className="text-dark-muted">/</span>
              <span className="text-dark-muted">
                {String(total).padStart(2, "0")}
              </span>
            </div>

            {/* Autoplay Pause / Play */}
            <button
              type="button"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              aria-label={isAutoPlaying ? "Pause autoplay" : "Start autoplay"}
              className="w-10 h-10 rounded-full bg-white hover:bg-primary-light text-dark hover:text-primary border border-border shadow-sm flex items-center justify-center transition-colors"
              title={isAutoPlaying ? "Pause automatic shift" : "Play automatic shift"}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous project"
                className="w-10 h-10 rounded-full bg-white hover:bg-primary text-dark hover:text-white border border-border shadow-sm flex items-center justify-center transition-all hover:scale-105"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next project"
                className="w-10 h-10 rounded-full bg-white hover:bg-primary text-dark hover:text-white border border-border shadow-sm flex items-center justify-center transition-all hover:scale-105"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ====================================================
            THE CINEMA SHOWCASE CARD
            Only ONE image is shown at a time with cursor switching
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
            transition: isHovered ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
          }}
          className="relative w-full h-[64vh] sm:h-[72vh] lg:h-[78vh] min-h-[480px] max-h-[820px] rounded-[28px] sm:rounded-[38px] overflow-hidden bg-[#0D0B14] shadow-[0_30px_90px_-20px_rgba(21,19,35,0.45)] border border-white/10 cursor-pointer select-none group"
        >
          {/* Active Image / Video with Cinematic Transition */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{
                opacity: 0,
                scale: 1.05,
                x: direction > 0 ? 80 : -80,
                filter: "blur(6px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                x: direction > 0 ? -80 : 80,
                filter: "blur(6px)",
              }}
              transition={{
                duration: 0.65,
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

              {/* Ambient lighting overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* ====================================================
              INTERACTIVE CURSOR FOLLOWER BADGE
              Appears on hover and shifts with mouse
             ==================================================== */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              style={{
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                transform: "translate(-50%, -50%)",
              }}
              className="pointer-events-none absolute z-40 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-black/85 text-white backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              {cursorSide === "prev" ? (
                <>
                  <ChevronLeft className="w-4 h-4 text-primary animate-pulse" />
                  <span className="text-xs font-bold tracking-wide uppercase">Previous</span>
                </>
              ) : (
                <>
                  <span className="text-xs font-bold tracking-wide uppercase">Next</span>
                  <ChevronRight className="w-4 h-4 text-primary animate-pulse" />
                </>
              )}
            </motion.div>
          )}

          {/* Top Left: Category Badge & Project Name */}
          <div className="absolute top-6 left-6 sm:top-8 sm:left-8 z-30 flex items-center gap-2.5">
            <span className="px-3.5 py-1.5 rounded-full bg-white/90 text-dark backdrop-blur-md text-xs font-bold tracking-wide border border-white/20 shadow-lg">
              {current.category}
            </span>
            <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full bg-black/50 text-white/90 backdrop-blur-md text-xs font-semibold border border-white/10 shadow-lg">
              {current.metric}
            </span>
          </div>

          {/* Bottom Content: Title & Tagline */}
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-10 sm:left-10 sm:right-10 z-30 flex flex-col sm:flex-row sm:items-end justify-between gap-4 pointer-events-none">
            <div className="max-w-2xl">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight drop-shadow-md">
                {current.title}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 font-medium mt-1.5 line-clamp-2 max-w-xl drop-shadow-sm">
                {current.tagline}
              </p>
            </div>

            {/* Click to Switch Indicator */}
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-lg">
              <span>Click anywhere to switch</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-primary-light" />
            </div>
          </div>

          {/* Autoplay Progress Bar at Top of Card */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-white/15 z-30 overflow-hidden">
            <motion.div
              key={currentIndex}
              initial={{ width: "0%" }}
              animate={{ width: isHovered || !isAutoPlaying ? "100%" : "100%" }}
              transition={{
                duration: isHovered || !isAutoPlaying ? 0 : 4.2,
                ease: "linear",
              }}
              className="h-full bg-gradient-to-r from-primary via-purple-400 to-white"
            />
          </div>

          {/* Side Indicator Arrows for Touch / Non-Hover */}
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

        {/* Bottom Pagination Dots & Fast Switcher */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 max-w-full">
            {FEATURED_SHOWCASES.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goToSlide(idx)}
                aria-label={`Jump to ${item.title}`}
                className={`group relative h-2.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-8 sm:w-10 bg-primary"
                    : "w-2.5 bg-dark/20 hover:bg-dark/40"
                }`}
              >
                <span className="sr-only">{item.title}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-dark-muted">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Move cursor over left/right side or click to switch images</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

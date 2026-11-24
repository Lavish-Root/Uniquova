"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";

export interface FocalShiftItem {
  id: string;
  tag?: string;
  title: string;
  desc: string;
  img: string;
  color?: string;
  link?: string;
}

interface FocalShiftRevealProps {
  items: FocalShiftItem[];
  heading?: React.ReactNode;
  subheading?: string;
  className?: string;
}

function FocalLayer({
  item,
  index,
  total,
  progress,
}: {
  item: FocalShiftItem;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const center = start + 0.5 / total;
  const end = (index + 1) / total;

  // 1. DEPTH SCALE: Starts small (far in z-space), reaches 1 (crisp focal plane), scales forward past lens
  const scale = useTransform(progress, [start, center, end], [0.86, 1, 1.75]);

  // 2. CAMERA BLUR: Optical depth of field (14px blur -> 0px razor focus -> 18px exit blur)
  const blurValue = useTransform(progress, [start, center, end], [14, 0, 18]);
  const blur = useSpring(blurValue, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const filter = useTransform(blur, (v) => (v > 0.15 ? `blur(${v.toFixed(1)}px)` : "none"));

  // 3. OPACITY: Clean fade-in, solid hold at center, graceful exit fade
  const opacity = useTransform(
    progress,
    [start, start + 0.035, center - 0.015, center + 0.015, end - 0.035, end],
    [0, 1, 1, 1, 0, 0]
  );

  // 4. TEXT Y PARALLAX: Subtle cinematic vertical drift
  const textY = useTransform(progress, [start, end], [50, -50]);

  // 5. POINTER EVENTS: Only clickable while in the active focal zone
  const pointerEvents = useTransform(progress, (v) =>
    v >= start + 0.02 && v <= end - 0.02 ? "auto" : "none"
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        filter,
        pointerEvents,
        zIndex: total - index,
        willChange: "transform, opacity, filter",
      }}
      className="absolute inset-0 w-full h-full flex items-center justify-center px-6 sm:px-12 md:px-16 lg:px-20 pt-16 sm:pt-20 pb-16"
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-14 lg:gap-20">
        {/* LEFT: TITLE & SHORT DESCRIPTION */}
        <div className="w-full md:w-1/2 space-y-6 order-2 md:order-1 text-left">
          <motion.div style={{ y: textY }} className="space-y-5">
            <span className="text-xs font-mono font-bold tracking-[0.3em] uppercase text-primary border-l-2 border-primary/50 pl-3.5 block">
              {item.tag || `Sector // 0${index + 1}`}
            </span>

            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark tracking-tight leading-[1.08] whitespace-pre-line">
              {item.title}
            </h3>

            <p className="text-dark-muted text-base sm:text-lg font-normal leading-relaxed max-w-lg">
              {item.desc}
            </p>

            {item.link && (
              <div className="pt-2">
                <Link
                  href={item.link}
                  className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-full shadow-[0_6px_20px_rgba(117,69,245,0.28)] hover:shadow-[0_10px_25px_rgba(117,69,245,0.42)] hover:scale-103 transition-all duration-300"
                >
                  <span>Explore Sector Solutions</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT: TALL CARD IMAGE */}
        <div className="w-full md:w-[440px] lg:w-[500px] h-[36vh] sm:h-[46vh] md:h-[62vh] relative order-1 md:order-2 flex-shrink-0">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white border border-border/80 shadow-[0_30px_70px_rgba(117,69,245,0.15)] relative">
            <img
              src={item.img}
              className="absolute inset-0 w-full h-full object-cover object-center"
              alt={item.title}
              loading="lazy"
            />
            {/* Subtle inner gradient flare */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Shadow Backlight Ambient Glow */}
          <div
            className="absolute -inset-14 blur-[90px] -z-10 opacity-30 rounded-full pointer-events-none"
            style={{ backgroundColor: item.color || "rgba(117, 69, 245, 0.45)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function FocalShiftReveal({
  items,
  heading,
  subheading,
  className = "",
}: FocalShiftRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = items.length;

  // Bind scroll progress across container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spring physics for fluid 60fps tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${total * 100}vh` }}
      className={`relative w-full bg-[#FAF9FF] text-dark ${className}`}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* AMBIENT BACKGROUND (Bokeh Depth Accents) */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-100/50 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-100/60 rounded-full blur-[120px]" />
        </div>

        {/* PINNED SECTION HEADER */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 pt-8 sm:pt-10 flex items-center justify-between">
          <div>
            {heading || (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                Industries We <span className="gradient-text">Serve</span>
              </h2>
            )}
            {subheading && (
              <p className="text-xs sm:text-sm text-dark-muted hidden sm:block mt-1">
                {subheading}
              </p>
            )}
          </div>

          {/* Focal Shift Indicator */}
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-border/80 shadow-xs text-xs font-bold text-dark">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>Focal Shift Reveal</span>
          </div>
        </div>

        {/* THE FOCUS STACK (Active Depth Layers) */}
        <div className="relative flex-1 w-full h-full">
          {items.map((item, i) => (
            <FocalLayer
              key={item.id}
              item={item}
              index={i}
              total={total}
              progress={smoothProgress}
            />
          ))}
        </div>

        {/* BOTTOM SECTOR PROGRESS INDICATOR */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-2 sm:gap-3">
            {items.map((it, idx) => (
              <SectorStepDot
                key={it.id}
                index={idx}
                total={total}
                progress={smoothProgress}
                containerRef={containerRef}
              />
            ))}
          </div>

          <Link
            href="/industries"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary hover:text-primary-dark transition-colors group"
          >
            <span>View All Industry Frameworks</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function SectorStepDot({
  index,
  total,
  progress,
  containerRef,
}: {
  index: number;
  total: number;
  progress: MotionValue<number>;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const start = index / total;
  const end = (index + 1) / total;

  const isActive = useTransform(progress, (v) => v >= start && v < end);
  const [active, setActive] = React.useState(index === 0);

  React.useEffect(() => {
    return isActive.on("change", (latest) => {
      setActive(latest);
    });
  }, [isActive]);

  const handleClick = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const targetScroll = scrollTop + (index + 0.5) * (containerRef.current.offsetHeight / total);
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Jump to sector 0${index + 1}`}
      className={`transition-all duration-300 rounded-full flex items-center justify-center ${
        active
          ? "w-8 h-7 bg-primary text-white text-[11px] font-black shadow-sm scale-105"
          : "w-7 h-7 bg-white/90 border border-border/70 text-dark-muted hover:text-dark text-[11px] font-bold"
      }`}
    >
      {index + 1}
    </button>
  );
}

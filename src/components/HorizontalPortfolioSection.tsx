"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles, MoveRight } from "lucide-react";
import {
  PORTFOLIO_SHOWCASE_DATA,
  PortfolioShowcaseItem,
} from "@/data/portfolioShowcaseData";
import PortfolioPanel from "./PortfolioPanel";

export interface HorizontalPortfolioSectionProps {
  items?: PortfolioShowcaseItem[];
  label?: string;
  heading?: string;
  description?: string;
  indicatorText?: string;
  className?: string;
  onSelectProject?: (item: PortfolioShowcaseItem) => void;
}

export default function HorizontalPortfolioSection({
  items = PORTFOLIO_SHOWCASE_DATA,
  label = "SELECTED WORK",
  heading = "Ideas brought to life.",
  description = "Explore how design, technology and creativity come together to create meaningful digital experiences.",
  indicatorText = "Scroll to explore",
  className = "",
  onSelectProject,
}: HorizontalPortfolioSectionProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const [scrollRange, setScrollRange] = useState(0);
  const [activeStep, setActiveStep] = useState(1);

  // Measure dynamic scroll distance based on track length and viewport width
  useEffect(() => {
    const calculateDistance = () => {
      if (trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        // Total horizontal translation needed so the last panel is comfortably framed
        const totalDistance = Math.max(0, trackWidth - viewportWidth + 120);
        setScrollRange(totalDistance);
      }
    };

    calculateDistance();
    window.addEventListener("resize", calculateDistance);

    // Re-check after images/fonts settle
    const timeout = setTimeout(calculateDistance, 400);

    return () => {
      window.removeEventListener("resize", calculateDistance);
      clearTimeout(timeout);
    };
  }, [items]);

  // Framer Motion scroll link: track progress within this pinned section
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Calculate horizontal translation directly from vertical scroll progress
  const x = useTransform(scrollYProgress, (progress) => {
    if (shouldReduceMotion) return 0;
    return -progress * scrollRange;
  });

  // Listen to progress to update the numeric step indicator
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const step = Math.min(
        items.length,
        Math.max(1, Math.round(latest * (items.length - 1)) + 1)
      );
      setActiveStep(step);
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <section
      ref={targetRef}
      id="showcase"
      className={`relative bg-[#FAF9FF] border-y border-border/70 overflow-clip ${className}`}
    >
      {/* ============================================================== */}
      {/* DESKTOP & TABLET: PINNED SCROLL-DRIVEN HORIZONTAL SHOWCASE     */}
      {/* ============================================================== */}
      <div className="hidden md:block h-[320vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-6 lg:py-8 select-none">
          {/* Subtle Ambient Decorative Gradient Glows */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />

          {/* Section Header */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                {/* Small Badge / Label */}
                <div className="inline-flex items-center gap-2 bg-[#F3EFFF] text-primary border border-primary-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{label}</span>
                </div>

                {/* Main Heading */}
                <h2 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-dark tracking-tight leading-tight">
                  {heading.split("life")[0]}
                  <span className="bg-gradient-to-r from-primary via-[#6030E4] to-primary-dark bg-clip-text text-transparent">
                    life.
                  </span>
                </h2>

                {/* Supporting Description */}
                <p className="text-sm sm:text-base text-dark-muted font-normal max-w-2xl mt-1.5 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Scroll Indicator & Step Counter */}
              <div className="flex items-center gap-4 shrink-0">
                {/* Active Item Index */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-border/80 shadow-sm text-xs font-mono font-bold text-dark">
                  <span className="text-primary font-black">
                    {activeStep < 10 ? `0${activeStep}` : activeStep}
                  </span>
                  <span className="text-dark-muted/50">/</span>
                  <span className="text-dark-muted">
                    {items.length < 10 ? `0${items.length}` : items.length}
                  </span>
                </div>

                {/* Scroll Prompt */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-border/80 shadow-sm text-xs font-semibold text-dark">
                  <span>{indicatorText}</span>
                  <MoveRight className="w-4 h-4 text-primary animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Horizontal Translating Track */}
          <div className="relative z-10 my-auto flex items-center overflow-visible">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex items-center gap-6 lg:gap-8 px-6 sm:px-10 lg:px-16 w-max will-change-transform"
            >
              {items.map((item, idx) => (
                <PortfolioPanel
                  key={item.id}
                  item={item}
                  index={idx}
                  total={items.length}
                  onSelect={onSelectProject}
                />
              ))}

              {/* Final End-Card inviting user to explore full work */}
              <div className="shrink-0 w-[300px] lg:w-[340px] h-[420px] sm:h-[460px] lg:h-[500px] rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-[#3D249E] text-white p-8 flex flex-col justify-between shadow-glow-md">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-purple-200">
                    Ready to build?
                  </span>
                  <h3 className="text-2xl lg:text-3xl font-extrabold tracking-tight mt-2 leading-tight">
                    Let&apos;s engineer your next digital launch.
                  </h3>
                  <p className="text-xs sm:text-sm text-purple-100/80 mt-3 leading-relaxed">
                    From custom web apps to multi-channel marketplaces, our team delivers iconic results.
                  </p>
                </div>

                <Link
                  href="/our-work"
                  className="inline-flex items-center justify-between w-full px-5 py-3.5 rounded-full bg-white text-dark font-bold text-xs sm:text-sm shadow-md hover:bg-softBg transition-colors group"
                >
                  <span>Explore Full Portfolio</span>
                  <ArrowRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Bottom Scroll Progress Bar */}
          <div className="w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
            <div className="flex items-center justify-between gap-4 pt-2">
              <span className="text-[11px] font-semibold text-dark-muted tracking-wide">
                Interactive Scroll Showcase
              </span>

              {/* Progress Line */}
              <div className="flex-1 max-w-md h-1 bg-border/60 rounded-full overflow-hidden">
                <motion.div
                  style={{
                    scaleX: scrollYProgress,
                    transformOrigin: "left",
                  }}
                  className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full"
                />
              </div>

              <span className="text-[11px] font-semibold text-dark-muted tracking-wide">
                UNIQUOVA Portfolio
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* MOBILE EXPERIENCE: TOUCH-FRIENDLY HORIZONTAL SWIPE GALLERY     */}
      {/* ============================================================== */}
      <div className="block md:hidden py-14 px-4">
        {/* Mobile Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-[#F3EFFF] text-primary border border-primary-200/80 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{label}</span>
          </div>

          <h2 className="text-3xl font-extrabold text-dark tracking-tight leading-tight">
            Ideas brought to{" "}
            <span className="bg-gradient-to-r from-primary via-[#6030E4] to-primary-dark bg-clip-text text-transparent">
              life.
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-dark-muted font-normal mt-2 leading-relaxed">
            {description}
          </p>

          <div className="flex items-center gap-2 mt-4 text-xs font-semibold text-primary">
            <span>Swipe to explore selected work</span>
            <MoveRight className="w-3.5 h-3.5 animate-pulse" />
          </div>
        </div>

        {/* Horizontal Touch Snap Track */}
        <div className="flex items-stretch gap-4 overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar -mx-4 px-4">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="snap-center shrink-0 w-[84vw] max-w-[340px]"
            >
              <PortfolioPanel
                item={{
                  ...item,
                  widthClass: "w-full",
                }}
                index={idx}
                total={items.length}
                onSelect={onSelectProject}
              />
            </div>
          ))}

          {/* Mobile Final CTA Card */}
          <div className="snap-center shrink-0 w-[84vw] max-w-[340px] rounded-3xl bg-gradient-to-br from-primary to-primary-dark text-white p-6 flex flex-col justify-between shadow-glow-sm">
            <div>
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-200">
                Ready to build?
              </span>
              <h3 className="text-xl font-extrabold tracking-tight mt-1 leading-snug">
                Let&apos;s engineer your next digital launch.
              </h3>
              <p className="text-xs text-purple-100/80 mt-2 leading-relaxed">
                From custom web apps to marketplaces, we build scalable excellence.
              </p>
            </div>

            <Link
              href="/our-work"
              className="inline-flex items-center justify-between w-full px-4 py-3 rounded-full bg-white text-dark font-bold text-xs mt-6 group"
            >
              <span>Explore All Work</span>
              <ArrowRight className="w-3.5 h-3.5 text-primary group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

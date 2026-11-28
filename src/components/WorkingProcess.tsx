"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Compass, Lightbulb, Code2, Rocket, ArrowRight, ChevronDown } from "lucide-react";
import { PROCESS_STEPS } from "@/data/agencyData";

const stepIcons = [Compass, Lightbulb, Code2, Rocket];

const STEP_IMAGES: Record<string, string> = {
  "01": "/images/pillars/business_focused.jpg",
  "02": "/images/pillars/creative_thinking.jpg",
  "03": "/images/pillars/tech_execution.jpg",
  "04": "/images/pillars/scalable.jpg",
};

export default function WorkingProcess() {
  const [activePanel, setActivePanel] = useState<string>("intro");
  const [activeMobileStep, setActiveMobileStep] = useState<string>("");
  const desktopGridRef = useRef<HTMLDivElement>(null);
  const isDesktopInView = useInView(desktopGridRef, { once: true, amount: 0.25 });

  const isIntroActive = activePanel === "intro";

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-[#FAF9FF] relative overflow-hidden">
      {/* Subtle ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* MOBILE & TABLET VIEW (< lg): Compact Fluid Wave Banner + Sleek Smooth Vertical Accordion */}
        <div className="lg:hidden max-w-3xl mx-auto space-y-4">
          {/* Mobile Fluid Violet Header Card */}
          <div className="relative rounded-[1.75rem] overflow-hidden border border-primary/20 shadow-[0_18px_45px_rgba(117,69,245,0.2)] p-6 sm:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-[#5224CC] via-[#7545F5] to-[#A682FF]" />
            <div className="absolute -top-20 -left-16 w-64 h-64 rounded-full bg-[#C4ACFD]/45 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -right-12 w-72 h-72 rounded-full bg-[#3A1696]/70 blur-3xl pointer-events-none" />

            <svg
              viewBox="0 0 800 500"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
            >
              <defs>
                <linearGradient id="mobileWaveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9E76FB" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#4318A8" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="mobileWaveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C4ACFD" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5D2EE3" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <path
                d="M0,260 C180,160 360,360 560,220 C680,135 760,180 800,140 L800,500 L0,500 Z"
                fill="url(#mobileWaveGrad1)"
              />
              <path
                d="M0,340 C220,250 420,420 640,300 C720,255 770,275 800,260 L800,500 L0,500 Z"
                fill="url(#mobileWaveGrad2)"
              />
            </svg>

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-[1.1] mb-2.5">
                Our Working <span className="text-[#E6DCFF]">Process</span>
              </h2>

              <p className="text-white/90 text-sm sm:text-base font-normal leading-relaxed">
                A battle-tested four-step execution framework designed to eliminate
                guesswork, accelerate delivery, and ensure long-term commercial
                success.
              </p>
            </div>
          </div>

          {/* Mobile Vertical Interactive Accordion (all steps collapsed by default) */}
          <div className="space-y-3">
            {PROCESS_STEPS.map((step, idx) => {
              const StepIcon = stepIcons[idx % stepIcons.length];
              const stepImage = STEP_IMAGES[step.number] || "/images/pillars/integrated.jpg";
              const isSelected = activeMobileStep === step.number;

              return (
                <div
                  key={step.number}
                  className={`rounded-[1.5rem] bg-white border transition-all duration-300 overflow-hidden ${
                    isSelected
                      ? "border-primary/45 shadow-[0_18px_45px_rgba(117,69,245,0.14)]"
                      : "border-border/80 shadow-xs hover:border-primary/35"
                  }`}
                >
                  {/* Always-Visible Step Bar Header */}
                  <button
                    type="button"
                    aria-expanded={isSelected}
                    onClick={() =>
                      setActiveMobileStep((prev) =>
                        prev === step.number ? "" : step.number
                      )
                    }
                    className="relative z-10 w-full px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between gap-3 text-left cursor-pointer touch-manipulation select-none"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center border shrink-0 transition-all duration-300 ${
                          isSelected
                            ? "bg-primary text-white border-primary shadow-glow-sm scale-105"
                            : "bg-primary-light/70 text-primary border-primary-200/70"
                        }`}
                      >
                        <StepIcon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-extrabold text-primary bg-primary-light px-1.5 py-0.5 rounded-md">
                            {step.number}
                          </span>
                          <h3
                            className={`text-base sm:text-lg font-black tracking-tight truncate transition-colors ${
                              isSelected ? "text-primary" : "text-dark"
                            }`}
                          >
                            {step.title}
                          </h3>
                        </div>
                        <p className="text-xs font-medium text-dark-muted truncate mt-0.5">
                          {step.subtitle}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isSelected
                          ? "bg-primary/10 border-primary/25 text-primary rotate-180"
                          : "bg-softBg border-border/80 text-dark-muted rotate-0"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {/* Smooth CSS Grid Accordion Panel (Instant open/close toggle & preloaded artwork) */}
                  <div
                    className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                      isSelected
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0 pointer-events-none"
                    }`}
                  >
                    <div className="overflow-hidden min-h-0">
                      <div className="px-4 pb-5 pt-1 sm:px-5 sm:pb-6 space-y-4 border-t border-border/50">
                        <p className="text-dark-muted text-sm leading-relaxed pt-3">
                          {step.description}
                        </p>

                        {/* Key Deliverable Tags */}
                        {step.tags && step.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2.5 py-1 rounded-full bg-[#FAF9FF] border border-primary/15 text-[11px] font-semibold text-dark"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Clean Visual Showcase Image */}
                        <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-border/70 shadow-sm bg-softBg">
                          <img
                            src={stepImage}
                            alt={`${step.title} — ${step.subtitle}`}
                            className="w-full h-full object-cover object-center filter contrast-[1.03] brightness-[1.02]"
                            loading="eager"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* DESKTOP VIEW (lg+): Elastic Expansion Grid — GPU-smooth CSS flex transitions with fixed-size inner frames */}
        <div
          ref={desktopGridRef}
          onMouseLeave={() => setActivePanel("intro")}
          className="hidden lg:flex lg:flex-row gap-4 w-full lg:h-[460px]"
        >
          {/* LEFT WINDOW: Our Working Process with Lavender Fluid Wave Gradient */}
          <motion.div
            initial={{ opacity: 0, x: 90 }}
            animate={
              isDesktopInView
                ? {
                    opacity: [0, 1, 1, 1],
                    x: [90, -8, 3, 0],
                    scaleX: [1, 0.98, 1.01, 1],
                  }
                : { opacity: 0, x: 90 }
            }
            transition={{
              duration: 0.65,
              times: [0, 0.55, 0.8, 1],
              ease: "easeOut",
            }}
            onClick={() => setActivePanel("intro")}
            onMouseEnter={() => setActivePanel("intro")}
            style={{
              transition: "flex-grow 650ms cubic-bezier(0.25, 1.12, 0.45, 1), min-height 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease",
            }}
            className={`relative rounded-[2rem] overflow-hidden cursor-pointer select-none border border-primary/20 ${
              isIntroActive
                ? "lg:flex-[5] min-h-[340px] lg:min-h-0 shadow-[0_20px_60px_rgba(117,69,245,0.2)]"
                : "lg:flex-[0.48] lg:min-w-[68px] min-h-[68px] lg:min-h-0 shadow-md hover:brightness-105"
            }`}
          >
            {/* Layered Lavender / Royal Violet Fluid Mesh & Wave Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#5224CC] via-[#7545F5] to-[#A682FF]" />
            <div className="absolute -top-24 -left-20 w-80 h-80 rounded-full bg-[#C4ACFD]/45 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-[#3A1696]/70 blur-3xl pointer-events-none" />

            {/* Flowing Organic Lavender Waves (SVG) */}
            <svg
              viewBox="0 0 800 500"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full pointer-events-none opacity-80"
            >
              <defs>
                <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#9E76FB" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#4318A8" stopOpacity="0.85" />
                </linearGradient>
                <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#C4ACFD" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#5D2EE3" stopOpacity="0.7" />
                </linearGradient>
              </defs>
              <path
                d="M0,260 C180,160 360,360 560,220 C680,135 760,180 800,140 L800,500 L0,500 Z"
                fill="url(#waveGrad1)"
              />
              <path
                d="M0,340 C220,250 420,420 640,300 C720,255 770,275 800,260 L800,500 L0,500 Z"
                fill="url(#waveGrad2)"
              />
            </svg>

            {/* Collapsed Vertical Label */}
            <div
              className={`absolute inset-0 z-10 flex items-center justify-center p-4 transition-opacity duration-300 ${
                isIntroActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-150"
              }`}
            >
              <span className="lg:-rotate-90 whitespace-nowrap text-xs font-extrabold uppercase tracking-[0.22em] text-white/95">
                Working Process
              </span>
            </div>

            {/* Expanded Content (Fixed width on desktop so text never reflows/jitters) */}
            <div
              className={`relative z-10 h-full lg:w-[620px] xl:w-[820px] flex flex-col justify-center p-8 sm:p-12 lg:p-14 transition-all duration-500 ease-out ${
                isIntroActive
                  ? "opacity-100 translate-x-0 delay-100"
                  : "opacity-0 -translate-x-4 pointer-events-none"
              }`}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4 max-w-xl">
                Our Working <span className="text-[#E6DCFF]">Process</span>
              </h2>

              <p className="text-white/90 text-sm sm:text-base lg:text-lg font-normal leading-relaxed max-w-lg mb-8">
                A battle-tested four-step execution framework designed to eliminate
                guesswork, accelerate delivery, and ensure long-term commercial
                success.
              </p>

              <div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActivePanel("01");
                  }}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full border border-white/40 bg-white/10 hover:bg-white/20 text-white text-sm font-bold backdrop-blur-md transition-all duration-300 group cursor-pointer"
                >
                  <span>Explore Framework</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* ELASTIC PILLAR BARS (Discover, Strategize, Create, Grow) */}
          {PROCESS_STEPS.map((step, idx) => {
            const isExpanded = activePanel === step.number;
            const StepIcon = stepIcons[idx % stepIcons.length];
            const stepImage = STEP_IMAGES[step.number] || "/images/pillars/integrated.jpg";

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: 130 }}
                animate={
                  isDesktopInView
                    ? {
                        opacity: [0, 1, 1, 1],
                        x: [130, -14, 5, 0],
                        scaleX: [1, 0.9, 1.04, 1],
                      }
                    : { opacity: 0, x: 130 }
                }
                transition={{
                  duration: 0.55,
                  delay: 0.22 + idx * 0.14,
                  times: [0, 0.52, 0.78, 1],
                  ease: "easeOut",
                }}
                onClick={() => setActivePanel(step.number)}
                onMouseEnter={() => setActivePanel(step.number)}
                style={{
                  transition: "flex-grow 650ms cubic-bezier(0.25, 1.12, 0.45, 1), min-height 500ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 400ms ease, border-color 300ms ease",
                }}
                className={`relative rounded-[2rem] bg-white border overflow-hidden cursor-pointer select-none ${
                  isExpanded
                    ? "lg:flex-[5] border-primary/30 shadow-[0_20px_55px_rgba(117,69,245,0.14)] min-h-[380px] lg:min-h-0"
                    : "lg:flex-[0.48] lg:min-w-[68px] border-border/80 shadow-sm hover:border-primary/40 hover:shadow-md min-h-[64px] lg:min-h-0 group"
                }`}
              >
                {/* Collapsed Vertical Title Bar */}
                <div
                  className={`absolute inset-0 z-10 flex items-center justify-center p-4 transition-opacity duration-300 ${
                    isExpanded ? "opacity-0 pointer-events-none" : "opacity-100 delay-150"
                  }`}
                >
                  <span className="lg:-rotate-90 whitespace-nowrap text-xs sm:text-[13px] font-bold uppercase tracking-[0.22em] text-dark-muted group-hover:text-primary transition-colors">
                    {step.title}
                  </span>
                </div>

                {/* Expanded Content — Fixed inner width & fixed image dimensions prevent any lag or distortion */}
                <div
                  className={`relative h-full w-full lg:w-[620px] xl:w-[820px] p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center gap-6 lg:gap-8 transition-all duration-500 ease-out ${
                    isExpanded
                      ? "opacity-100 translate-x-0 delay-100"
                      : "opacity-0 translate-x-4 pointer-events-none"
                  }`}
                >
                  {/* Subtle soft lavender top-right glow */}
                  <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

                  {/* LEFT: Step Text & Details */}
                  <div className="flex-1 flex flex-col justify-center z-10 text-left">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-primary-light text-primary flex items-center justify-center border border-primary-200/70 shadow-xs">
                        <StepIcon className="w-5 h-5" />
                      </div>
                      <span className="text-2xl font-black text-primary/40 tracking-tight">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-dark tracking-tight leading-tight mb-1.5">
                      {step.title}
                    </h3>

                    <p className="text-xs sm:text-sm font-bold text-primary tracking-wide mb-4">
                      {step.subtitle}
                    </p>

                    <p className="text-dark-muted text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* RIGHT: Fixed-aspect Image Container (Never stretches or distorts during panel expansion) */}
                  <div className="w-full sm:w-[270px] lg:w-[300px] xl:w-[360px] h-52 sm:h-[280px] lg:h-[340px] relative rounded-2xl overflow-hidden border border-border/70 shadow-md shrink-0 z-10 bg-softBg">
                    <img
                      src={stepImage}
                      alt={`${step.title} — ${step.subtitle}`}
                      className="w-full h-full object-cover object-center filter contrast-[1.03]"
                      loading="eager"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/15 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

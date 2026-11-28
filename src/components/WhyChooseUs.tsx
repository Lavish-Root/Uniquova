"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from "framer-motion";
import {
  Layers,
  TrendingUp,
  Lightbulb,
  Cpu,
  Maximize2,
  Users2,
  ArrowRight,
} from "lucide-react";
import { WHY_CHOOSE_US_DATA } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";
import StatsCounter from "@/components/ui/stats-counter";

function renderAnimatedStat(raw: string, trigger: boolean) {
  const match = raw.match(/^(.*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return raw;
  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return (
    <StatsCounter
      value={Number(numStr)}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals}
      delay={0.12}
      trigger={trigger}
    />
  );
}

const iconMap = [
  Layers,
  TrendingUp,
  Lightbulb,
  Cpu,
  Maximize2,
  Users2,
];

const PILLAR_BG_IMAGES: Record<string, string> = {
  integrated: "/images/pillars/integrated.jpg",
  "business-focused": "/images/pillars/business_focused.jpg",
  "creative-thinking": "/images/pillars/creative_thinking.jpg",
  "tech-execution": "/images/pillars/tech_execution.jpg",
  scalable: "/images/pillars/scalable.jpg",
  "client-centric": "/images/pillars/client_centric.jpg",
};

function LuminousPillarNode({
  pillar,
  index,
  isBeamTouching,
  hasBeamPassed,
  registerDot,
}: {
  pillar: (typeof WHY_CHOOSE_US_DATA)[0];
  index: number;
  isBeamTouching: boolean;
  hasBeamPassed: boolean;
  registerDot: (index: number, el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Progressive reveal as cards scroll into view or when touched by the beam
  const isInView = useInView(ref, { margin: "0px 0px -12% 0px" });
  const [hasRevealed, setHasRevealed] = useState(index === 0);

  useEffect(() => {
    if (isInView || isBeamTouching || hasBeamPassed) {
      setHasRevealed(true);
    }
  }, [isInView, isBeamTouching, hasBeamPassed]);

  const setDotRef = useCallback(
    (el: HTMLDivElement | null) => {
      registerDot(index, el);
    },
    [index, registerDot]
  );

  const Icon = iconMap[index % iconMap.length];
  const bgImage = PILLAR_BG_IMAGES[pillar.id];
  const isHoveredByBeam = isBeamTouching;

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        } flex-row pl-8 md:pl-0`}
    >
      {/* Center Milestone Node on the Vertical Beam */}
      <div
        ref={setDotRef}
        className="absolute left-3 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20"
      >
        {isHoveredByBeam && (
          <motion.span
            key={`ripple-${index}`}
            initial={{ scale: 0.9, opacity: 0.75 }}
            animate={{ scale: 2.3, opacity: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="absolute w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary/45 pointer-events-none"
          />
        )}
        <motion.div
          animate={{
            scale: isHoveredByBeam ? 1.45 : hasBeamPassed ? 1 : 0.85,
            backgroundColor: isHoveredByBeam
              ? "#7545F5"
              : hasBeamPassed
                ? "#FAF9FF"
                : "#EAE6F4",
            borderColor: isHoveredByBeam
              ? "#FFFFFF"
              : hasBeamPassed
                ? "#9E76FB"
                : "#D4CEE8",
          }}
          transition={{ type: "spring", stiffness: 280, damping: 22 }}
          className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center relative ${isHoveredByBeam
            ? "shadow-[0_0_18px_4px_rgba(117,69,245,0.55)]"
            : "shadow-md"
            }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isHoveredByBeam
              ? "bg-white"
              : hasBeamPassed
                ? "bg-primary"
                : "bg-primary/30"
              }`}
          />
        </motion.div>
      </div>

      {/* Alternating Strategic Pillar Card — Activates hover effect when touched by the beam, then settles back to normal */}
      <motion.div
        initial={false}
        animate={{
          opacity: hasRevealed ? 1 : 0,
          x: hasRevealed ? 0 : index % 2 === 0 ? -60 : 60,
          y: isHoveredByBeam ? -4 : 0,
          scale: hasRevealed ? (isHoveredByBeam ? 1.018 : 1) : 0.9,
        }}
        transition={{
          opacity: { duration: 0.55, ease: "easeOut" },
          x: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          y: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
        }}
        className={`w-full md:w-[46%] p-3.5 sm:p-5 md:p-7 rounded-2xl md:rounded-3xl border bg-white/95 backdrop-blur-md transition-[border-color,box-shadow] duration-[400ms] ease-out group overflow-hidden relative ${index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
          } ${isHoveredByBeam
            ? "border-primary/50 shadow-[0_22px_50px_rgba(117,69,245,0.18)]"
            : "border-border/80 shadow-sm hover:shadow-[0_20px_45px_rgba(117,69,245,0.12)] hover:border-primary/40"
          }`}
      >
        {/* Subtle Background Pillar Visual Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl md:rounded-3xl z-0">
          {bgImage && (
            <img
              src={bgImage}
              alt={pillar.title}
              width={600}
              height={400}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.08] brightness-[1.02] transition-all duration-700 ease-out ${isHoveredByBeam
                ? "opacity-35 scale-105"
                : "opacity-15 group-hover:opacity-35 scale-100 group-hover:scale-105"
                }`}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60 pointer-events-none" />
          <div
            className={`absolute -top-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-2xl transition-opacity duration-500 ${isHoveredByBeam
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-100"
              }`}
          />
        </div>

        {/* Card Content — Icon, Title & Key Stat */}
        <div className="relative z-10 flex flex-col justify-center h-full">
          <div className="flex flex-row items-center justify-between gap-2.5 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3.5 md:gap-4 min-w-0 flex-1">
              <div
                className={`w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center border transition-all duration-300 shrink-0 ${isHoveredByBeam
                  ? "bg-primary text-white border-primary scale-110 shadow-glow-sm"
                  : "bg-primary-50 group-hover:bg-primary group-hover:text-white text-primary border-primary-200/60 shadow-xs group-hover:scale-110"
                  }`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] md:text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-0.5">
                  Pillar 0{index + 1}
                </span>
                <h3
                  className={`text-[15px] sm:text-lg md:text-2xl font-black tracking-tight transition-colors duration-300 leading-tight md:leading-snug ${isHoveredByBeam
                    ? "text-primary"
                    : "text-dark group-hover:text-primary"
                    }`}
                >
                  {pillar.title}
                </h3>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span
                className={`text-lg sm:text-2xl md:text-3xl font-black transition-colors duration-300 block leading-none md:leading-normal ${isHoveredByBeam
                  ? "text-primary"
                  : "text-dark group-hover:text-primary"
                  }`}
              >
                {renderAnimatedStat(pillar.stat, hasRevealed)}
              </span>
              <p className="text-[8.5px] sm:text-[9.5px] md:text-[10px] uppercase font-bold tracking-wider text-dark-muted max-w-[78px] sm:max-w-none leading-tight mt-0.5 ml-auto">
                {pillar.statLabel}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const nodeOffsetsRef = useRef<number[]>([]);
  const trackHeightRef = useRef<number>(0);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [highestVisitedIndex, setHighestVisitedIndex] = useState<number>(-1);
  const [trackHeight, setTrackHeight] = useState<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const highestVisitedRef = useRef<number>(-1);

  const registerDot = useCallback((index: number, el: HTMLDivElement | null) => {
    dotRefs.current[index] = el;
  }, []);

  // Scroll beam spring progression (latches downward progress so scrolling up never shrinks it)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end 75%"],
  });

  const maxProgress = useMotionValue(0);

  const beamSpring = useSpring(maxProgress, {
    stiffness: 65,
    damping: 20,
    mass: 0.9,
    restDelta: 0.0005,
  });

  // Map 0..0.92 of scroll spring to 0..100% of visual beam length; 0.92..1.0 gives final dot settle window
  const scaleY = useTransform(beamSpring, [0, 0.92], [0, 1], { clamp: true });

  // Glowing comet bead synchronized with the descending tip of the progress bar
  const tipTop = useTransform(scaleY, (v) => `${v * 100}%`);
  const tipOpacity = useTransform(beamSpring, [0, 0.015, 0.92, 0.96], [0, 1, 1, 0]);

  const measureNodePositions = useCallback(() => {
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const trackRect = trackEl.getBoundingClientRect();

    const lastDotEl = dotRefs.current[WHY_CHOOSE_US_DATA.length - 1];
    let effectiveHeight = trackRect.height;
    if (lastDotEl) {
      const lastDotRect = lastDotEl.getBoundingClientRect();
      const lastDotCenterY = lastDotRect.top + lastDotRect.height / 2;
      effectiveHeight = Math.max(1, lastDotCenterY - trackRect.top - 4);
      setTrackHeight((prev) =>
        prev !== null && Math.abs(prev - effectiveHeight) < 0.5
          ? prev
          : effectiveHeight
      );
    }

    if (effectiveHeight <= 0) return;
    trackHeightRef.current = effectiveHeight;

    nodeOffsetsRef.current = dotRefs.current.map((dotEl) => {
      if (!dotEl) return effectiveHeight;
      const dotRect = dotEl.getBoundingClientRect();
      const dotCenterY = dotRect.top + dotRect.height / 2;
      return Math.max(0, dotCenterY - trackRect.top);
    });
  }, []);

  const syncBeamState = useCallback((springVal: number) => {
    const offsets = nodeOffsetsRef.current;
    const height = trackHeightRef.current;
    if (offsets.length === 0 || height <= 0) return;

    const tipPx = Math.min(1, Math.max(0, springVal / 0.92)) * height;
    let nextActive: number | null = null;
    let nextHighestVisited = highestVisitedRef.current;

    for (let i = 0; i < offsets.length; i++) {
      const dotPx = offsets[i];
      const isLast = i === offsets.length - 1;
      // Only trigger once the beam tip physically reaches inside the 20px dot rim (dotPx - 7px)
      const hasReached = tipPx >= dotPx - 7;
      const withinWindow = isLast ? springVal <= 0.98 : tipPx <= dotPx + 36;

      if (hasReached) {
        if (i > nextHighestVisited) {
          nextHighestVisited = i;
        }
        if (withinWindow) {
          nextActive = i;
        }
      }
    }

    if (nextActive !== activeIndexRef.current) {
      activeIndexRef.current = nextActive;
      setActiveIndex(nextActive);
    }
    if (nextHighestVisited !== highestVisitedRef.current) {
      highestVisitedRef.current = nextHighestVisited;
      setHighestVisitedIndex(nextHighestVisited);
    }
  }, []);

  useEffect(() => {
    const rafId = requestAnimationFrame(() => {
      measureNodePositions();
      const initial = scrollYProgress.get();
      if (initial > maxProgress.get()) {
        maxProgress.set(initial);
      }
      syncBeamState(beamSpring.get());
    });

    const observer =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
          measureNodePositions();
          syncBeamState(beamSpring.get());
        })
        : null;

    if (observer && containerRef.current) {
      observer.observe(containerRef.current);
    }

    const onResize = () => {
      measureNodePositions();
      syncBeamState(beamSpring.get());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, [measureNodePositions, syncBeamState, scrollYProgress, maxProgress, beamSpring]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > maxProgress.get()) {
      maxProgress.set(latest);
    }
  });

  useMotionValueEvent(beamSpring, "change", (latest) => {
    syncBeamState(latest);
  });

  return (
    <section className="pt-12 pb-10 sm:pt-16 sm:pb-12 lg:pt-28 lg:pb-16 bg-[#FAF9FF] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Top Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          layout="split"
          maxWidth="max-w-none"
          className="mb-8 sm:mb-12 md:mb-20"
          title={
            <>
              Built Around Your <br />
              <span className="gradient-text">Business Goals.</span>
            </>
          }
          subtitle="We bridge the gap between imaginative creative design and rigorous engineering. Every line of code and every brand identity is crafted with one clear objective: driving measurable commercial results for your enterprise."
        />

        {/* Luminous Timeline Scroll Beam Container with Sequential Touch-Activated Hover */}
        <div ref={containerRef} className="max-w-5xl mx-auto relative mb-10 sm:mb-16 md:mb-24">
          {/* Vertical Track & Unclipped Light Aura — Terminates cleanly at the final milestone dot */}
          <div
            ref={trackRef}
            style={
              trackHeight !== null
                ? { height: `${trackHeight}px`, bottom: "auto" }
                : undefined
            }
            className="absolute left-3 md:left-1/2 top-5 md:top-4 bottom-8 md:bottom-14 w-1 -translate-x-1/2 pointer-events-none"
          >
            {/* Base Track */}
            <div className="w-full h-full bg-border/80 rounded-full" />

            {/* Soft Outer Ambient Halo */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="absolute inset-0 w-2 -left-0.5 bg-gradient-to-b from-primary-300/60 via-primary/70 to-indigo-500/70 blur-[5px] rounded-full"
            />

            {/* Crisp Fiber-Optic Progress Core */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleY, transformOrigin: "top" }}
                className="w-full h-full bg-gradient-to-b from-primary-400 via-[#7545F5] to-indigo-600"
              />
            </div>

            {/* Leading Luminous Bead gliding down the progress tip */}
            <motion.div
              style={{ top: tipTop, opacity: tipOpacity }}
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none"
            >
              <span className="block w-6 h-6 rounded-full bg-primary/35 blur-md -m-1.5" />
              <span className="absolute inset-0 m-auto w-2.5 h-2.5 rounded-full bg-white ring-2 ring-primary shadow-[0_0_14px_4px_rgba(117,69,245,0.85)]" />
            </motion.div>
          </div>

          {/* Milestones / Strategic Pillars */}
          <div className="space-y-4 sm:space-y-6 md:space-y-28">
            {WHY_CHOOSE_US_DATA.map((pillar, idx) => (
              <LuminousPillarNode
                key={pillar.id}
                pillar={pillar}
                index={idx}
                isBeamTouching={activeIndex === idx}
                hasBeamPassed={idx <= highestVisitedIndex && activeIndex !== idx}
                registerDot={registerDot}
              />
            ))}
          </div>
        </div>

        {/* Highlight Banner: Dedicated Partnership */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl md:rounded-3xl p-5 sm:p-8 md:p-12 text-white shadow-glow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <h3 className="text-lg sm:text-2xl lg:text-3xl font-extrabold mb-2 sm:mb-3 leading-tight">
                Work directly with dedicated in-house specialists.
              </h3>
              <p className="text-xs sm:text-sm md:text-base text-purple-100 max-w-2xl leading-relaxed">
                No middle agents, no endless email chains. You get direct access to our senior
                developers, marketplace managers, and brand strategists committed to your growth.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white text-dark hover:bg-purple-50 font-bold text-xs sm:text-sm px-5 py-3 sm:px-6 sm:py-4 rounded-full shadow-md transition-all duration-200"
              >
                <span>Learn About Our Culture</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

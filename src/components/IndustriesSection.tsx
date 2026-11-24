"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES_DATA } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";

// Short, punchy 1-sentence descriptions per user request
const SHORT_DESCRIPTIONS: Record<string, string> = {
  retail: "Multi-channel marketplace scaling, headless D2C storefronts, and automated inventory systems.",
  saas: "High-converting web platforms, interactive product dashboards, and developer portals.",
  healthcare: "HIPAA-compliant platforms, accessible telemedicine apps, and digital patient booking.",
  education: "Interactive learning portals, LMS platforms, and high-retention student applications.",
  fashion: "High-aesthetic digital storefronts, iconic visual branding, and editorial storytelling.",
  startups: "Rapid MVP engineering, investor-ready prototypes, and agile go-to-market execution.",
};

const SECTOR_COLORS: Record<string, string> = {
  retail: "rgba(16, 185, 129, 0.4)",
  saas: "rgba(59, 130, 246, 0.4)",
  healthcare: "rgba(168, 85, 247, 0.4)",
  education: "rgba(245, 158, 11, 0.4)",
  fashion: "rgba(236, 72, 153, 0.4)",
  startups: "rgba(117, 69, 245, 0.4)",
};

interface FocalLayerProps {
  industry: (typeof INDUSTRIES_DATA)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
}

function FocalLayer({ industry, index, total, progress }: FocalLayerProps) {
  const step = 1 / total;
  const start = index * step;
  // Wide plateau: gives a generous scroll dwell where image stays 100% crisp at maximum scale
  const enterEnd = start + 0.28 * step;
  const stayEnd = start + 0.74 * step;
  const end = (index + 1) * step;

  // 1. DEPTH SCALE: Moves from back plane (0.86), locks at 1.0 (crisp plateau), then scales past camera (1.75)
  const scale = useTransform(
    progress,
    [start, enterEnd, stayEnd, end],
    [0.86, 1.0, 1.0, 1.75]
  );

  // 2. CAMERA BLUR: Optical depth blur (12px) -> razor-sharp crisp focus (0px plateau) -> exit blur (14px)
  const blurValue = useTransform(
    progress,
    [start, enterEnd, stayEnd, end],
    [12, 0, 0, 14]
  );
  const blur = useSpring(blurValue, { stiffness: 95, damping: 28, restDelta: 0.001 });
  const filter = useTransform(blur, (v) => (v > 0.15 ? `blur(${v.toFixed(1)}px)` : "none"));

  // 3. OPACITY: Clean fade-in, solid hold across the entire crisp plateau, graceful exit fade
  const opacity = useTransform(
    progress,
    [start, start + 0.12 * step, stayEnd, end],
    [0, 1, 1, 0]
  );

  // 4. TEXT Y PARALLAX: Gentle cinematic vertical drift
  const textY = useTransform(
    progress,
    [start, enterEnd, stayEnd, end],
    [40, 0, 0, -40]
  );

  // 5. POINTER EVENTS: Active while in focus
  const pointerEvents = useTransform(progress, (v) =>
    v >= start + 0.08 * step && v <= end - 0.08 * step ? "auto" : "none"
  );

  const shortDesc = SHORT_DESCRIPTIONS[industry.id] || industry.description;
  const backlightColor = SECTOR_COLORS[industry.id] || "rgba(117, 69, 245, 0.4)";

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
        <div className="w-full md:w-1/2 space-y-6 text-left order-2 md:order-1">
          <motion.div style={{ y: textY }} className="space-y-5">
            <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-dark tracking-tight leading-[1.08]">
              {industry.title}
            </h3>

            <p className="text-dark-muted text-base sm:text-lg font-normal leading-relaxed max-w-lg">
              {shortDesc}
            </p>

            <div className="pt-2">
              <Link
                href={`/industries#${industry.id}`}
                className="inline-flex items-center gap-2 text-sm font-bold text-white bg-primary hover:bg-primary-dark px-6 py-3 rounded-full shadow-[0_6px_20px_rgba(117,69,245,0.28)] hover:shadow-[0_10px_25px_rgba(117,69,245,0.42)] hover:scale-102 transition-all duration-300"
              >
                <span>Explore Sector Solutions</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: TALL CARD IMAGE (Uilora Focal Shift Showcase Card) */}
        <div className="w-full md:w-[440px] lg:w-[490px] h-[36vh] sm:h-[46vh] md:h-[62vh] relative order-1 md:order-2 flex-shrink-0">
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden bg-white border border-border/80 shadow-[0_30px_70px_rgba(117,69,245,0.16)] relative">
            <img
              src={industry.image}
              className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.01]"
              alt={`${industry.title} Showcase`}
              loading="lazy"
            />
            {/* Subtle inner gradient flare */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Shadow Backlight Ambient Glow */}
          <div
            className="absolute -inset-16 blur-[90px] -z-10 opacity-35 rounded-full pointer-events-none"
            style={{ backgroundColor: backlightColor }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function IndustriesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const total = INDUSTRIES_DATA.length;

  // Bind scroll progress across container (depth-based reveals during scroll)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Butter-smooth spring physics for 60fps tracking
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="industries" className="relative w-full bg-[#FAF9FF] text-dark">
      <div
        ref={containerRef}
        style={{ height: `${total * 100}vh` }}
        className="relative w-full"
      >
        {/* Pinned Viewport Container */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
          {/* AMBIENT BACKGROUND (Bokeh Depth Accents) */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-100/50 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-100/60 rounded-full blur-[120px]" />
          </div>

          {/* PINNED SECTION HEADER WITH CONTINUOUS SCROLL-LINKED ANIMATION */}
          <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 pt-8 sm:pt-10">
            <ScrollHeading
              align="left"
              maxWidth="max-w-4xl"
              targetRef={containerRef}
              fadeOnExit={false}
              offset={["start 92%", "start 10%"]}
              title={
                <>
                  Industries We <span className="gradient-text">Serve</span>
                </>
              }
              titleClassName="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight mb-2"
              subtitle="Tailoring technology and creative strategies to each market sector with precision and depth."
              subtitleClassName="text-sm sm:text-base text-dark-muted font-normal leading-relaxed max-w-xl"
            />
          </div>

          {/* THE FOCUS STACK (Active Depth Layers) */}
          <div className="relative flex-1 w-full h-full">
            {INDUSTRIES_DATA.map((ind, i) => (
              <FocalLayer
                key={ind.id}
                industry={ind}
                index={i}
                total={total}
                progress={smoothProgress}
              />
            ))}
          </div>

          {/* BOTTOM PROGRESS TRACK & DIRECTORY LINK */}
          <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-8 pb-6 sm:pb-8 flex items-center justify-between pointer-events-auto">
            {/* Sleek Minimalist Scroll Progress Line */}
            <div className="w-36 sm:w-56 h-1 bg-border/80 rounded-full overflow-hidden">
              <motion.div
                style={{ scaleX: smoothProgress, originX: 0 }}
                className="w-full h-full bg-primary"
              />
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
    </section>
  );
}

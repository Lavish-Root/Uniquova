"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useSpring, useInView } from "framer-motion";
import {
  Layers,
  TrendingUp,
  Lightbulb,
  Cpu,
  Maximize2,
  Users2,
  Check,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { WHY_CHOOSE_US_DATA } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";

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
}: {
  pillar: typeof WHY_CHOOSE_US_DATA[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-35% 0px -35% 0px" });
  const Icon = iconMap[index % iconMap.length];
  const bgImage = PILLAR_BG_IMAGES[pillar.id];

  return (
    <div
      ref={ref}
      className={`relative flex items-center ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row pl-10 md:pl-0`}
    >
      {/* Center Luminous Pulse Node on the Vertical Beam */}
      <div className="absolute left-3.5 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
        <motion.div
          animate={{
            scale: isInView ? 1.4 : 1,
            backgroundColor: isInView ? "#7545F5" : "#FAF9FF",
            borderColor: isInView ? "#fff" : "#C4ACFD",
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-5 h-5 rounded-full border-2 shadow-md flex items-center justify-center transition-colors duration-500"
        >
          {isInView && (
            <motion.div
              layoutId="luminous-pulse"
              className="absolute inset-0 rounded-full bg-primary/40 blur-md animate-pulse"
            />
          )}
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isInView ? "bg-white" : "bg-primary"
            }`}
          />
        </motion.div>
      </div>

      {/* Alternating Luminous Strategic Pillar Card */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full md:w-[46%] p-6 sm:p-8 rounded-3xl border border-border/80 bg-white/95 backdrop-blur-md shadow-sm hover:shadow-[0_20px_45px_rgba(117,69,245,0.12)] hover:border-primary/40 transition-all duration-300 group overflow-hidden relative ${
          index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
        }`}
      >
        {/* Subtle Background Pillar Visual Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
          {bgImage && (
            <img
              src={bgImage}
              alt={pillar.title}
              width={600}
              height={400}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover object-center filter contrast-[1.08] brightness-[1.02] opacity-15 group-hover:opacity-35 scale-100 group-hover:scale-105 transition-all duration-700 ease-out"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/60 pointer-events-none" />
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Card Content */}
        <div className="relative z-10 flex flex-col justify-between h-full">
          <div>
            <div className="flex items-center justify-between mb-4 sm:mb-6">
              <div className="w-12 h-12 rounded-2xl bg-primary-50 group-hover:bg-primary group-hover:text-white text-primary flex items-center justify-center border border-primary-200/60 transition-all duration-300 shadow-xs group-hover:scale-110">
                <Icon className="w-6 h-6" />
              </div>

              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-black text-dark group-hover:text-primary transition-colors">
                  {pillar.stat}
                </span>
                <p className="text-[10px] uppercase font-bold tracking-wider text-dark-muted">
                  {pillar.statLabel}
                </p>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-[11px] font-mono font-bold text-primary uppercase tracking-widest block mb-1">
                Pillar 0{index + 1}
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-dark tracking-tight group-hover:text-primary transition-colors">
                {pillar.title}
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-dark-muted font-medium leading-relaxed mb-6">
              {pillar.description}
            </p>
          </div>

          <div className="pt-4 border-t border-border/70 flex items-center justify-between text-xs font-semibold text-primary">
            <span>Guaranteed Standard</span>
            <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
              <Check className="w-3 h-3 text-primary group-hover:text-white transition-colors duration-300" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll beam spring progression
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <section className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          layout="split"
          maxWidth="max-w-none"
          className="mb-16 sm:mb-20"
          badge={
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-200 shadow-xs">
              <Zap className="w-3.5 h-3.5" />
              <span>The UNIQUOVA Advantage</span>
            </div>
          }
          title={
            <>
              Built Around Your <br />
              <span className="gradient-text">Business Goals.</span>
            </>
          }
          subtitle="We bridge the gap between imaginative creative design and rigorous engineering. Every line of code and every brand identity is crafted with one clear objective: driving measurable commercial results for your enterprise."
        />

        {/* Luminous Timeline Scroll Beam Container */}
        <div ref={containerRef} className="max-w-5xl mx-auto relative mb-20">
          {/* Vertical Track Line */}
          <div className="absolute left-3.5 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-border/80 rounded-full overflow-hidden">
            {/* Luminous Animated Light Beam */}
            <motion.div
              style={{ scaleY, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-primary via-purple-500 to-indigo-600 shadow-[0_0_20px_rgba(117,69,245,0.7)]"
            />
          </div>

          {/* Luminous Milestones / Strategic Pillars */}
          <div className="space-y-12 sm:space-y-16">
            {WHY_CHOOSE_US_DATA.map((pillar, idx) => (
              <LuminousPillarNode
                key={pillar.id}
                pillar={pillar}
                index={idx}
              />
            ))}
          </div>
        </div>

        {/* Highlight Banner: Dedicated Partnership */}
        <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 sm:p-12 text-white shadow-glow-md relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold mb-4 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>Zero Outsourcing Guarantee</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">
                Work directly with dedicated in-house specialists.
              </h3>
              <p className="text-sm sm:text-base text-purple-100 max-w-2xl leading-relaxed">
                No middle agents, no endless email chains. You get direct access to our senior
                developers, marketplace managers, and brand strategists committed to your growth.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white text-dark hover:bg-purple-50 font-bold text-sm px-6 py-4 rounded-full shadow-md transition-all duration-200"
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

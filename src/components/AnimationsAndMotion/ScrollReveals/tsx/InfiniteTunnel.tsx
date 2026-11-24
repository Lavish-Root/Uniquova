"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ScrollHeading from "@/components/ScrollHeading";

export interface TunnelWorkItem {
  id: string;
  title: string;
  domain: string;
  image: string;
  domainLink: string;
  tagline?: string;
}

interface InfiniteTunnelProps {
  items?: TunnelWorkItem[];
}

const DEFAULT_WORK_ITEMS: TunnelWorkItem[] = [
  {
    id: "ecommerce-work",
    title: "Apex Direct — D2C & Marketplace Store",
    domain: "E-commerce Solutions",
    tagline: "Amazon & Flipkart Multi-Channel Growth",
    image: "/images/portfolio/apex_ecommerce.jpg",
    domainLink: "/services/ecommerce",
  },
  {
    id: "web-dev-work",
    title: "Manufacturing Art — High-Speed Web App",
    domain: "Website Development",
    tagline: "Next.js Production Architecture & UI/UX",
    image: "/images/selected_work/QAxA8GI2uEu8q2zketxqbeX0Rg_480.webp",
    domainLink: "/services/web-development",
  },
  {
    id: "app-dev-work",
    title: "Zenith Health — iOS & Android Mobile App",
    domain: "App Development",
    tagline: "Native 60fps Mobile Performance & Telehealth",
    image: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp",
    domainLink: "/services/app-development",
  },
  {
    id: "branding-work",
    title: "MegaHR — Metro Takeover Brand System",
    domain: "Branding & Identity",
    tagline: "Visual Identity, Design Tokens & Guidelines",
    image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_480.webp",
    domainLink: "/services/branding",
  },
  {
    id: "graphic-design-work",
    title: "DeluPay — 3D Visual Identity & Motion",
    domain: "Graphic Designing",
    tagline: "High-CTR Ads, 3D Mockups & Social Creatives",
    image: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_480.webp",
    domainLink: "/services/graphic-design",
  },
];

function TunnelCard({
  item,
  index,
  total,
  smoothProgress,
}: {
  item: TunnelWorkItem;
  index: number;
  total: number;
  smoothProgress: MotionValue<number>;
}) {
  const step = 1 / total;
  const start = index * step;
  const peak = start + step * 0.5;
  const end = (index + 1) * step;

  // GPU-accelerated transforms without heavy blur recalculations
  const scale = useTransform(
    smoothProgress,
    [Math.max(0, start - 0.06), start, peak, end, Math.min(1, end + 0.06)],
    [0.25, 0.55, 1, 1.35, 1.7]
  );

  const opacity = useTransform(
    smoothProgress,
    [Math.max(0, start - 0.04), start + 0.015, peak - 0.03, peak + 0.03, end - 0.015, Math.min(1, end + 0.04)],
    [0, 0.45, 1, 1, 0.45, 0]
  );

  const translateY = useTransform(
    smoothProgress,
    [start, peak, end],
    [40, 0, -40]
  );

  const pointerEvents = useTransform(
    smoothProgress,
    (v) => (v >= start + 0.04 && v <= end - 0.04 ? "auto" : "none")
  );

  return (
    <motion.div
      style={{
        scale,
        opacity,
        y: translateY,
        pointerEvents,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
      }}
      className="absolute inset-0 flex items-center justify-center p-4 sm:p-6 md:p-8 select-none"
    >
      {/* Clickable Image Showcase Card - Redirects directly to the domain work page */}
      <Link
        href={item.domainLink}
        className="group relative w-full max-w-3xl sm:max-w-4xl h-[320px] sm:h-[400px] md:h-[460px] lg:h-[500px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(117,69,245,0.16)] border-2 border-white/80 hover:border-primary/50 transition-all duration-300 cursor-pointer block transform-gpu"
      >
        {/* Full Showcase Deliverable Image */}
        <img
          src={item.image}
          alt={`${item.title} — ${item.domain}`}
          className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Subtle Top Gradient for Badge & Arrow Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Top-Left: Domain Branding Badge */}
        <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-20">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-primary text-xs sm:text-sm font-black shadow-md border border-white/50">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span>{item.domain}</span>
          </span>
        </div>

        {/* Top-Right: Brand Lavender ↗ Circular Redirect Button */}
        <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#7545F5] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(117,69,245,0.45)] border border-white/40 group-hover:scale-110 group-hover:bg-[#6030E4] group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function InfiniteTunnel({
  items = DEFAULT_WORK_ITEMS,
}: InfiniteTunnelProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Bind scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Butter-smooth spring interpolation to eradicate jitter and lag
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 26,
    stiffness: 90,
    mass: 0.12,
    restDelta: 0.0001,
  });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[550vh] bg-[#FAF9FF] text-dark overflow-clip"
    >
      {/* Sticky Fullscreen Tunnel Chamber */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        
        {/* Background Ambient Lavender Lighting & Performance-Optimized Tunnel Rings */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top-Right Ambient Blur */}
          <div className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-primary-100/60 blur-[100px]" />
          
          {/* Central Portal Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-primary-200/35 via-purple-100/40 to-transparent blur-[110px]" />

          {/* Bottom-Left Ambient Blur */}
          <div className="absolute -bottom-20 -left-20 w-[450px] h-[450px] rounded-full bg-primary-200/35 blur-[100px]" />

          {/* Performance 3D Tunnel Rings (Clean vector borders without expensive multi-layer backdrop blurs) */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[1, 2, 3, 4, 5].map((ring) => (
              <div
                key={ring}
                style={{
                  width: `${ring * 240}px`,
                  height: `${ring * 165}px`,
                  opacity: 0.15 + ring * 0.05,
                }}
                className="absolute rounded-[44px] border-2 border-primary/25 pointer-events-none"
              />
            ))}
          </div>
        </div>

        {/* Top Header Overlay Bar with Continuous Scroll-Linked Animation */}
        <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 flex items-center justify-between">
          <div>
            <ScrollHeading
              align="left"
              maxWidth="max-w-xl"
              targetRef={containerRef}
              fadeOnExit={false}
              offset={["start 92%", "start 10%"]}
              title={
                <>
                  Featured <span className="gradient-text">Work Showcase</span>
                </>
              }
              titleClassName="text-2xl sm:text-3xl lg:text-4xl font-black text-dark tracking-tight leading-tight mb-0"
            />
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <Link
              href="/our-work"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-dark px-5 py-2.5 rounded-full border border-primary/25 hover:border-primary/50 bg-white/95 shadow-xs transition-all"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* 3D Tunnel Chamber Viewport */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden pb-8">
          {items.map((item, idx) => (
            <TunnelCard
              key={item.id}
              item={item}
              index={idx}
              total={items.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

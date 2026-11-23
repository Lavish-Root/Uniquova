"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Hero from "@/components/Hero";
import SelectedWorkShowcase from "@/components/SelectedWorkShowcase";

interface HeroScrollOverlapProps {
  onOpenContact?: () => void;
}

export default function HeroScrollOverlap({ onOpenContact }: HeroScrollOverlapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress across the sticky staging area
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring physics for buttery 60fps/120fps motion without jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  // 1. HERO 3D DEPTH SCALE-DOWN:
  // As the user scrolls, Hero scales down from 1.0 to 0.90, fades to 0.72, and darkens
  const heroScale = useTransform(smoothProgress, [0, 0.45], [1, 0.90]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.45], [1, 0.75]);
  const heroOverlayOpacity = useTransform(smoothProgress, [0, 0.45], [0, 0.55]);

  // 2. SCROLL-TRIGGERED PARALLAX REVEAL (transform: translateY & scale):
  // Incoming Selected Work card rises upward like a physical sheet sliding over the hero
  const cardY = useTransform(smoothProgress, [0, 0.45], [240, 0]);
  const cardScale = useTransform(smoothProgress, [0, 0.45], [0.96, 1.0]);

  return (
    <div ref={containerRef} className="relative w-full z-1">
      {/* 1. Sticky Hero Backdrop */}
      <div className="sticky top-0 z-1 h-screen w-full overflow-hidden flex flex-col justify-center bg-[#FAF9FF]">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="w-full h-full flex flex-col justify-center origin-center"
        >
          <Hero onOpenContact={onOpenContact} />
        </motion.div>

        {/* 3D Depth Dimming Vignette Overlay */}
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-[#0B0819] pointer-events-none z-20 transition-opacity duration-75"
        />
      </div>

      {/* 2. Parallax Card-Stack Sheet Reveal Section (transform: translateY(...)) */}
      <motion.div
        style={{
          y: cardY,
          scale: cardScale,
        }}
        className="relative z-10 w-full origin-top will-change-transform -mt-6 sm:-mt-10 lg:-mt-14"
      >
        <SelectedWorkShowcase />
      </motion.div>
    </div>
  );
}

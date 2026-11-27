"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { INDUSTRIES_DATA, IndustryItem } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";

function IndustryCard({
  industry,
  onHoverStart,
  onHoverEnd,
}: {
  industry: IndustryItem;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  return (
    <Link
      href={`/industries#${industry.id}`}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className="block w-[300px] sm:w-[380px] md:w-[450px] flex-shrink-0 group select-none cursor-pointer"
    >
      {/* CARD IMAGE CONTAINER */}
      <div className="relative w-full aspect-[16/11] rounded-[2rem] overflow-hidden bg-white border border-border/80 shadow-[0_12px_36px_rgba(117,69,245,0.08)] group-hover:shadow-[0_24px_55px_rgba(117,69,245,0.18)] group-hover:-translate-y-1.5 transition-all duration-500">
        <img
          src={industry.image}
          alt={`${industry.title} Showcase`}
          className="w-full h-full object-cover object-center filter contrast-[1.04] brightness-[1.01] group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
        {/* Subtle inner ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/15 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* MAIN TITLE ONLY (CENTERED) */}
      <div className="pt-4 px-2 text-center">
        <h3 className="text-xl sm:text-2xl font-black text-dark group-hover:text-primary transition-colors duration-300 tracking-tight text-center">
          {industry.title}
        </h3>
      </div>
    </Link>
  );
}

export default function IndustriesSection() {
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Resume animation when user scrolls down or moves cursor away
  useEffect(() => {
    const handleScroll = () => {
      setIsPaused(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="industries"
      ref={sectionRef}
      className="relative w-full py-14 sm:py-28 bg-[#FAF9FF] text-dark overflow-hidden"
    >
      {/* Ambient Bokeh Accent Lighting */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-primary-100/50 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-purple-100/60 rounded-full blur-[120px]" />
      </div>

      {/* Section Header with Continuous Scroll-Linked Animation */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 mb-8 sm:mb-14">
        <ScrollHeading
          align="left"
          maxWidth="max-w-3xl"
          fadeOnExit={false}
          title={
            <>
              Industries We <span className="gradient-text">Serve</span>
            </>
          }
          titleClassName="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight mb-3"
          subtitle="Tailoring technology and creative strategies to each market sector with precision and depth."
          subtitleClassName="text-base sm:text-lg text-dark-muted font-normal leading-relaxed max-w-2xl"
        />
      </div>

      {/* Continuous Right-to-Left Marquee Slider */}
      <div
        className="relative w-full overflow-hidden py-4 z-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Continuous Running Track (Right to Left) */}
        <div
          className="flex w-max animate-marquee-left"
          style={{
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {/* 4 Identical sets of items for seamless 100% infinite looping without empty gaps */}
          {[0, 1, 2, 3].map((setIndex) => (
            <div
              key={setIndex}
              className="flex gap-6 sm:gap-8 pr-6 sm:pr-8"
              aria-hidden={setIndex > 0 ? "true" : undefined}
            >
              {INDUSTRIES_DATA.map((ind) => (
                <IndustryCard
                  key={`${setIndex}-${ind.id}`}
                  industry={ind}
                  onHoverStart={() => setIsPaused(true)}
                  onHoverEnd={() => setIsPaused(false)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Directory Link */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 mt-8 sm:mt-12 flex items-center justify-center md:justify-end">
        <Link
          href="/industries"
          className="inline-flex items-center gap-2 text-sm sm:text-base font-bold text-primary hover:text-primary-dark transition-colors group"
        >
          <span>View All Industry Frameworks</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
}

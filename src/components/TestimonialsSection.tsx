"use client";

import React from "react";
import { Star, MessageSquare } from "lucide-react";
import { TESTIMONIALS_DATA } from "@/data/agencyData";

export default function TestimonialsSection() {
  // Split the 9 testimonials into 3 distinct columns for vertical flow
  const col1 = [TESTIMONIALS_DATA[0], TESTIMONIALS_DATA[1], TESTIMONIALS_DATA[2]];
  const col2 = [TESTIMONIALS_DATA[3], TESTIMONIALS_DATA[4], TESTIMONIALS_DATA[5]];
  const col3 = [TESTIMONIALS_DATA[6], TESTIMONIALS_DATA[7], TESTIMONIALS_DATA[8]];

  const renderCard = (t: (typeof TESTIMONIALS_DATA)[0], key: string) => (
    <div
      key={key}
      className="bg-white rounded-3xl p-6 sm:p-7 border border-border/90 shadow-sm hover:shadow-[0_12px_30px_rgba(117,69,245,0.15)] hover:border-primary/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
    >
      <div>
        {/* Card Header: Avatar, Name & Handle */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={t.avatar}
            alt={t.name}
            className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20 shadow-xs"
          />
          <div className="flex flex-col min-w-0">
            <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors truncate">
              {t.name}
            </h4>
            <p className="text-xs text-dark-muted font-medium truncate">
              {t.handle || `@${t.name.toLowerCase().replace(/\s+/g, "_")}`}
            </p>
          </div>
        </div>

        {/* Review Quote Body */}
        <p className="text-dark/90 font-normal text-sm leading-relaxed mb-5">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Card Footer: 5 Theme Purple Stars & Category Tag */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex text-primary gap-1">
          {[...Array(t.rating)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current text-primary" />
          ))}
        </div>

        <span className="text-[11px] font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary-light">
          {t.tag}
        </span>
      </div>
    </div>
  );

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-[#FAF9FF] relative overflow-hidden">
      {/* Embedded scoped styles to guarantee animation execution */}
      <style>{`
        @keyframes marqueeUp {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        @keyframes marqueeDown {
          0% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-marquee-up {
          animation: marqueeUp 26s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-up-slow {
          animation: marqueeUp 32s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-down {
          animation: marqueeDown 26s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-down-slow {
          animation: marqueeDown 32s linear infinite !important;
          will-change: transform;
        }
        .pause-on-hover:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200">
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Verified Client Feedback</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight mb-4">
            Trusted by Leaders <br />
            <span className="gradient-text">Who Value Real Growth</span>
          </h2>

          <p className="text-base sm:text-lg text-dark-muted font-normal leading-relaxed">
            Hear directly from founders, enterprise product managers, and e-commerce leaders scaling
            with UNIQUOVA.
          </p>
        </div>

        {/* 3-COLUMN VERTICAL MOVING REVIEWS MARQUEE CONTAINER */}
        <div className="relative h-[650px] sm:h-[720px] overflow-hidden">
          {/* Top & Bottom Gradient Fade Masks for seamless infinite flow */}
          <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#FAF9FF] via-[#FAF9FF]/95 to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#FAF9FF] via-[#FAF9FF]/95 to-transparent z-20 pointer-events-none" />

          {/* Grid of 3 Moving Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 h-full">
            {/* COLUMN 1 (LEFT): Moves DOWN TO UP (Upwards) */}
            <div className="overflow-hidden relative group">
              <div
                className="flex flex-col gap-6 animate-marquee-up pause-on-hover"
                style={{ willChange: "transform" }}
              >
                {/* 4 duplicated sets for mathematically seamless infinite loop */}
                {[...col1, ...col1, ...col1, ...col1].map((t, idx) =>
                  renderCard(t, `col1-${idx}`)
                )}
              </div>
            </div>

            {/* COLUMN 2 (MIDDLE): Moves UP TO DOWN (Downwards) */}
            <div className="overflow-hidden relative group hidden md:block">
              <div
                className="flex flex-col gap-6 animate-marquee-down pause-on-hover"
                style={{ willChange: "transform" }}
              >
                {/* 4 duplicated sets for mathematically seamless infinite loop */}
                {[...col2, ...col2, ...col2, ...col2].map((t, idx) =>
                  renderCard(t, `col2-${idx}`)
                )}
              </div>
            </div>

            {/* COLUMN 3 (RIGHT): Moves DOWN TO UP (Upwards) */}
            <div className="overflow-hidden relative group hidden lg:block">
              <div
                className="flex flex-col gap-6 animate-marquee-up-slow pause-on-hover"
                style={{ willChange: "transform" }}
              >
                {/* 4 duplicated sets for mathematically seamless infinite loop */}
                {[...col3, ...col3, ...col3, ...col3].map((t, idx) =>
                  renderCard(t, `col3-${idx}`)
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Rating Benchmark Bottom Bar */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-border shadow-xs text-center max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-extrabold text-dark">4.9 / 5.0 Rating</span>
          </div>

          <p className="text-xs text-dark-muted font-medium">
            Over <span className="font-bold text-primary">200+ clients</span> served across India, US, UK &amp; UAE.
          </p>
        </div>
      </div>
    </section>
  );
}

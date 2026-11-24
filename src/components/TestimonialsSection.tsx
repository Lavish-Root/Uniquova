"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Star, MessageSquare, CheckCircle2, MessageSquarePlus } from "lucide-react";
import { TESTIMONIALS_DATA, TestimonialItem } from "@/data/agencyData";
import ScrollHeading from "@/components/ScrollHeading";

export default function TestimonialsSection() {
  const [allTestimonials, setAllTestimonials] = useState<TestimonialItem[]>(TESTIMONIALS_DATA);

  // Fetch verified testimonials from official API
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        const res = await fetch("/api/feedback");
        const json = await res.json();
        if (json.success && Array.isArray(json.testimonials) && json.testimonials.length > 0) {
          setAllTestimonials(json.testimonials);
          try {
            localStorage.setItem("uniqova_user_testimonials", JSON.stringify(json.testimonials));
          } catch {
            // ignore
          }
          return;
        }
      } catch {
        // Network fallback to local cache or default data
      }

      // Fallback: Check local storage or defaults if network is offline
      try {
        const local = JSON.parse(localStorage.getItem("uniqova_user_testimonials") || "[]");
        if (Array.isArray(local) && local.length > 0) {
          setAllTestimonials(local);
          return;
        }
      } catch {
        // ignore
      }

      setAllTestimonials(TESTIMONIALS_DATA);
    };

    loadTestimonials();

    // Listen for live in-session submissions
    const handleNewTestimonial = (event: Event) => {
      const customEvt = event as CustomEvent<TestimonialItem>;
      if (customEvt.detail) {
        setAllTestimonials((prev) => [customEvt.detail, ...prev]);
      }
    };

    // Listen for live in-session deletions
    const handleDeleted = (event: Event) => {
      const customEvt = event as CustomEvent<{ id: string }>;
      if (customEvt.detail?.id) {
        setAllTestimonials((prev) => prev.filter((t) => t.id !== customEvt.detail.id));
      }
    };

    window.addEventListener("testimonialSubmitted", handleNewTestimonial);
    window.addEventListener("testimonialDeleted", handleDeleted);
    return () => {
      window.removeEventListener("testimonialSubmitted", handleNewTestimonial);
      window.removeEventListener("testimonialDeleted", handleDeleted);
    };
  }, []);

  // Split dynamically into 3 distinct columns for vertical flow
  const col1: TestimonialItem[] = [];
  const col2: TestimonialItem[] = [];
  const col3: TestimonialItem[] = [];

  allTestimonials.forEach((t, idx) => {
    if (idx % 3 === 0) col1.push(t);
    else if (idx % 3 === 1) col2.push(t);
    else col3.push(t);
  });

  // Ensure minimum elements for infinite marquee rendering
  const safeCol1 = col1.length < 3 ? [...col1, ...TESTIMONIALS_DATA.slice(0, 3)] : col1;
  const safeCol2 = col2.length < 3 ? [...col2, ...TESTIMONIALS_DATA.slice(3, 6)] : col2;
  const safeCol3 = col3.length < 3 ? [...col3, ...TESTIMONIALS_DATA.slice(6, 9)] : col3;

  const renderCard = (t: TestimonialItem, key: string) => (
    <div
      key={key}
      className={`bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between group cursor-pointer ${
        t.isUserSubmitted
          ? "border-primary/40 shadow-[0_8px_25px_rgba(117,69,245,0.12)] hover:border-primary"
          : "border-border/90 shadow-sm hover:shadow-[0_12px_30px_rgba(117,69,245,0.15)] hover:border-primary/50"
      }`}
    >
      <div>
        {/* Card Header: Avatar, Name & Handle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src={t.avatar}
              alt={`${t.name} — Client Testimonial for UNIQOVA`}
              width={44}
              height={44}
              loading="lazy"
              className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/20 shadow-xs shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <h4 className="text-sm font-bold text-dark group-hover:text-primary transition-colors truncate">
                {t.name}
              </h4>
              <p className="text-xs text-dark-muted font-medium truncate">
                {t.role ? `${t.role}, ` : ""}
                {t.company || t.handle}
              </p>
            </div>
          </div>

          {t.isUserSubmitted && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 shrink-0">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Review Quote Body */}
        <p className="text-dark/90 font-normal text-sm leading-relaxed mb-5">
          &ldquo;{t.quote}&rdquo;
        </p>
      </div>

      {/* Card Footer: 5 Theme Purple Stars & Category Tag */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex text-primary gap-1">
          {[...Array(t.rating || 5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-current text-primary" />
          ))}
        </div>

        <span className="text-[11px] font-semibold text-primary px-2.5 py-0.5 rounded-full bg-primary-light truncate max-w-[170px]">
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
        {/* Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          className="mb-16"
          title={
            <>
              Trusted by Leaders <br />
              <span className="gradient-text">Who Value Real Growth</span>
            </>
          }
          subtitle="Hear directly from founders, enterprise product managers, and e-commerce leaders scaling with UNIQUOVA."
          extra={
            <Link
              href="/feedback"
              className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:text-primary-dark bg-white hover:bg-primary-light/50 px-4 py-2 rounded-full border border-primary/20 shadow-xs transition-colors"
            >
              <MessageSquarePlus className="w-3.5 h-3.5 text-primary" />
              <span>Are you a client? Submit your verified review</span>
            </Link>
          }
        />

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
                {[...safeCol1, ...safeCol1, ...safeCol1, ...safeCol1].map((t, idx) =>
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
                {[...safeCol2, ...safeCol2, ...safeCol2, ...safeCol2].map((t, idx) =>
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
                {[...safeCol3, ...safeCol3, ...safeCol3, ...safeCol3].map((t, idx) =>
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

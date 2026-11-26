"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import ScrollHeading from "@/components/ScrollHeading";
import ImageSlider, { SlideItem } from "@/src/components/CrazyComponents/tsx/ImageSlider";
import { SelectedWorkItem, DEFAULT_SELECTED_WORK } from "@/data/agencyData";

function normalizeImagePath(src: string): string {
  if (!src) return "/images/portfolio/apex_ecommerce.jpg";
  if (src.startsWith("data:") || src.startsWith("http://") || src.startsWith("https://")) return src;
  let p = src.trim();
  if (p.startsWith("opt/")) {
    const hash = p.split("/")[1] || "";
    return `/images/selected_work/${hash}_480.webp`;
  }
  if (p.includes("/images/selected_work/")) {
    return p.replace(/_\d+\.webp$/, "_480.webp");
  }
  if (!p.startsWith("/")) p = "/" + p;
  return p;
}

export default function SelectedWorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic slides populated and managed 100% from the CMS (/uniq_up)
  const [slides, setSlides] = useState<SlideItem[]>([]);
  const [isCmsLoading, setIsCmsLoading] = useState(true);

  // Fetch the latest CMS-managed showcase items and listen for real-time CMS edits
  useEffect(() => {
    let isMounted = true;

    const fetchSlides = async () => {
      try {
        const res = await fetch(`/api/selected-work?t=${Date.now()}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!isMounted) return;
        if (data.success && Array.isArray(data.items)) {
          const mapped: SlideItem[] = data.items.map((item: SelectedWorkItem) => ({
            title: item.title,
            status: item.alt || "Showcase Experience",
            image: normalizeImagePath(item.src),
          }));
          setSlides(mapped);
          try {
            sessionStorage.setItem("uniquova_selected_work_cache", JSON.stringify(mapped));
          } catch {
            // Ignore storage errors
          }
          setIsCmsLoading(false);
          return;
        }
      } catch {
        // Network error fallback below
      }

      if (!isMounted) return;
      try {
        const cached = sessionStorage.getItem("uniquova_selected_work_cache");
        if (cached) {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed)) {
            setSlides(parsed);
            setIsCmsLoading(false);
            return;
          }
        }
      } catch {
        // Ignore
      }

      setSlides(
        DEFAULT_SELECTED_WORK.map((item) => ({
          title: item.title,
          status: item.alt || "Showcase Experience",
          image: normalizeImagePath(item.src),
        }))
      );
      setIsCmsLoading(false);
    };

    fetchSlides();

    const handleUpdate = () => {
      fetchSlides();
    };

    const handleStorage = (e: StorageEvent) => {
      if (!e.key || e.key === "uniquova_selected_work_sync") {
        fetchSlides();
      }
    };

    const handleVisibility = () => {
      if (!document.hidden) {
        fetchSlides();
      }
    };

    window.addEventListener("selectedWorkUpdated", handleUpdate);
    window.addEventListener("storage", handleStorage);
    window.addEventListener("focus", handleUpdate);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      isMounted = false;
      window.removeEventListener("selectedWorkUpdated", handleUpdate);
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("focus", handleUpdate);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // ====================================================================
  // EXACT REFERENCE SCROLL-UP ENTRANCE ANIMATION (Matching Reference Video)
  // When scrolling down from the landing page, the entire "Ideas brought to life"
  // container slides UP with buttery spring physics, scale elevation, and 3D tilt.
  // ====================================================================
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start 10%"],
  });

  const springConfig = { stiffness: 140, damping: 22, mass: 0.3 };

  // Transforms for the entrance:
  // - Entire container slides UP from 320px down to 0px
  // - Scales from 0.88 to 1.0
  // - 3D perspective rotation (14deg -> 0deg)
  // - Smooth opacity transition
  const rawY = useTransform(scrollYProgress, [0, 1], [320, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.88, 1.0]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.45], [0.3, 1.0]);

  const smoothY = useSpring(rawY, springConfig);
  const smoothScale = useSpring(rawScale, springConfig);
  const smoothRotateX = useSpring(rawRotateX, springConfig);
  const smoothOpacity = useSpring(rawOpacity, springConfig);

  return (
    <section
      ref={containerRef}
      id="selected-work"
      style={{ perspective: "1200px" }}
      className="relative w-full bg-[#FAF9FF] pt-8 pb-16 sm:pb-24 lg:pb-32 overflow-hidden -mt-10 sm:-mt-16 lg:-mt-20 z-20"
    >
      {/* ====================================================
          THE SCROLL-UP ENTRANCE CONTAINER (EXPANDED BREADTH)
         ==================================================== */}
      <motion.div
        style={{
          y: smoothY,
          scale: smoothScale,
          rotateX: smoothRotateX,
          opacity: smoothOpacity,
          transformStyle: "preserve-3d",
        }}
        className="max-w-[1720px] w-full mx-auto px-2 sm:px-4 md:px-6 lg:px-8 will-change-transform"
      >
        {/* Sleek Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          align="left"
          maxWidth="max-w-3xl"
          className="mb-6 sm:mb-8"
          title="Ideas brought to life."
          titleClassName="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight mb-2"
          subtitle="Explore category-defining digital experiences crafted with strategy, technology, and design."
          subtitleClassName="text-sm sm:text-base text-dark-muted max-w-xl font-medium"
        />

        {/* ====================================================
            THE CINEMA SHOWCASE CARD WITH WEBGL DISPLACEMENT SLIDER
            - Increased breadth & height
            - Liquid shader displacement transitions
            - Autoplay, smooth GSAP typography & pagination
           ==================================================== */}
        <div
          className="relative w-full aspect-video rounded-[32px] sm:rounded-[40px] overflow-hidden bg-[#0A0910] shadow-[0_30px_90px_-20px_rgba(21,19,35,0.45)] border border-white/10 select-none group will-change-transform"
        >
          <div className="absolute inset-0">
            <ImageSlider
              slides={slides}
              autoPlay={true}
              interval={3500}
              accentColor="#7545F5"
              showPagination={true}
              isExternalLoading={isCmsLoading}
              fit="contain"
              className="h-full rounded-[32px] sm:rounded-[40px]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

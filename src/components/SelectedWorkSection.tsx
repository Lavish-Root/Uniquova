"use client";

import React, { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import ScrollHeading from "@/components/ScrollHeading";
import type { SlideItem } from "@/src/components/CrazyComponents/tsx/ImageSlider";
import { SelectedWorkItem, DEFAULT_SELECTED_WORK } from "@/data/agencyData";

const ImageSlider = dynamic(
  () => import("@/src/components/CrazyComponents/tsx/ImageSlider"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-[#0A0910] flex items-center justify-center">
        <div className="w-9 h-9 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
      </div>
    ),
  }
);

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
    offset: ["start 95%", "start 40%"],
  });

  const springConfig = { stiffness: 180, damping: 24, mass: 0.3 };

  // Transforms for the entrance:
  // - Smooth upward glide without leaving an empty gap below TrustedBy on mobile
  const rawY = useTransform(scrollYProgress, [0, 1], [64, 0]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [0.95, 1.0]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [8, 0]);
  const rawOpacity = useTransform(scrollYProgress, [0, 0.5], [0.75, 1.0]);

  const smoothY = useSpring(rawY, springConfig);
  const smoothScale = useSpring(rawScale, springConfig);
  const smoothRotateX = useSpring(rawRotateX, springConfig);
  const smoothOpacity = useSpring(rawOpacity, springConfig);

  return (
    <section
      ref={containerRef}
      id="selected-work"
      style={{ perspective: "1200px" }}
      className="relative w-full bg-[#FAF9FF] pt-4 sm:pt-10 lg:pt-14 pb-12 sm:pb-24 lg:pb-32 overflow-hidden z-20"
    >
      {/* ====================================================
          THE SCROLL-UP ENTRANCE CONTAINER
         ==================================================== */}
      <motion.div
        style={{
          y: smoothY,
          scale: smoothScale,
          rotateX: smoothRotateX,
          opacity: smoothOpacity,
          transformStyle: "preserve-3d",
        }}
        className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 lg:px-8 will-change-transform"
      >
        {/* Sleek Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          align="left"
          maxWidth="max-w-3xl"
          className="mb-7 sm:mb-9 relative z-10"
          title={
            <>
              Ideas brought to <span className="gradient-text">life.</span>
            </>
          }
          subtitle="Explore category-defining digital experiences crafted with strategy, technology, and design."
        />

        {/* ====================================================
            THE CINEMA SHOWCASE CARD WITH WEBGL DISPLACEMENT SLIDER
            - Compact proportions matching balanced layout framing
            - Liquid shader displacement transitions
            - Autoplay, smooth GSAP typography & pagination
           ==================================================== */}
        <div
          className="relative w-full h-[300px] sm:h-[420px] md:h-[510px] lg:h-[580px] xl:h-[600px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#0A0910] shadow-[0_24px_70px_-15px_rgba(21,19,35,0.35)] border border-white/10 select-none group will-change-transform"
        >
          <div className="absolute inset-0">
            <ImageSlider
              slides={slides}
              autoPlay={true}
              interval={3500}
              accentColor="#7545F5"
              showPagination={false}
              isExternalLoading={isCmsLoading}
              fit="cover"
              className="h-full rounded-[28px] sm:rounded-[36px]"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

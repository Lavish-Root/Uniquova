"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";

export interface DeliverableCardItem {
  id: string;
  companyName: string;
  category: string;
  title: string;
  image: string;
  quote: string;
  founderName: string;
  founderRole: string;
  metrics: { label: string; value: string }[];
  summary: string;
  projectLink: string;
}

// ====================================================================
// COLUMN 1 DELIVERABLES: Continuous motion from BOTTOM TO TOP (Upward)
// Matches user Photo 1 (Euroteam banners, laptop, patterns, 913.ai, Ruuster)
// ====================================================================
export const COLUMN_1_ITEMS: DeliverableCardItem[] = [
  {
    id: "col1-euroteam-banners",
    companyName: "Euroteam",
    category: "Sustainable Global Logistics",
    title: "Euroteam — Street Billboard Campaign",
    image: "/images/selected_work/pT9GV8WvHgTQ65MW162mjfBro_1440.webp", // Photo 1 center card
    quote: "“The digital architecture and enterprise branding engineered by the team gave us an undeniable enterprise edge in global markets.”",
    founderName: "Mark Van Dijk",
    founderRole: "Managing Director, Euroteam",
    metrics: [
      { label: "Route Volume", value: "€120M+" },
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Partner Conversion", value: "+64%" },
    ],
    summary:
      "Enterprise logistics digital transformation, street billboard campaign takeover, sustainable brand guidelines, and international web platform.",
    projectLink: "/our-work",
  },
  {
    id: "col1-913ai-wave",
    companyName: "913.ai",
    category: "Domain-Specific AI Agents",
    title: "913.ai — 3D Dimensional Brand Identity",
    image: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_1440.webp",
    quote: "“A complete brand we're proud to put in front of investors and customers.”",
    founderName: "Immo Ait Stapelfeld",
    founderRole: "CEO & Founder, 913.ai",
    metrics: [
      { label: "Seed Closed", value: "$4.2M" },
      { label: "User Acquisition", value: "+340%" },
      { label: "Brand Recall", value: "98.4%" },
    ],
    summary:
      "Comprehensive brand identity, typography architecture, 3D visual wave assets, and high-converting marketing framework for enterprise AI agents.",
    projectLink: "/our-work",
  },
  {
    id: "col1-ruuster-billboard",
    companyName: "Ruuster",
    category: "AI Real Estate Intelligence",
    title: "Ruuster AI — Manhattan Building Billboard",
    image: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_2000.webp",
    quote: "“UNIQUOVA transformed our vision into an iconic brand identity and platform that scaled user acquisition 300%.”",
    founderName: "Alexander Wright",
    founderRole: "Founder & CEO, Ruuster",
    metrics: [
      { label: "Active Investors", value: "24,000+" },
      { label: "Conversion Lift", value: "+182%" },
      { label: "P95 Speed", value: "0.42s" },
    ],
    summary:
      "Large-scale Manhattan billboard campaign, scalable Next.js cloud web application, design system, and multi-platform visual guidelines.",
    projectLink: "/our-work",
  },
  {
    id: "col1-megahr-subway",
    companyName: "MegaHR",
    category: "AI-First Hiring Infrastructure",
    title: "MegaHR — AI Hiring Subway Takeover",
    image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_2048.webp",
    quote: "“If you're looking for strategic thinking with fast, dependable delivery, this is it.”",
    founderName: "Darren Bounds",
    founderRole: "Founder & CEO, MegaHR",
    metrics: [
      { label: "Talent Screen Time", value: "-68%" },
      { label: "Series A Raised", value: "$6.5M" },
      { label: "Employer NPS", value: "94.2" },
    ],
    summary:
      "Full corporate identity, metro campaign screens takeover, web design system, and multi-channel AI recruitment platform interface.",
    projectLink: "/our-work",
  },
  {
    id: "col1-euroteam-laptop",
    companyName: "Euroteam",
    category: "Sustainable Global Logistics",
    title: "Euroteam — Web Platform Interface",
    image: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_2048.webp", // Photo 1 top card
    quote: "“World-class execution, ultra-fast delivery, and an intuitive UI that our global partners praise daily.”",
    founderName: "Mark Van Dijk",
    founderRole: "Managing Director, Euroteam",
    metrics: [
      { label: "Global Coverage", value: "48 Countries" },
      { label: "Response Time", value: "< 200ms" },
      { label: "Client Retention", value: "99.1%" },
    ],
    summary:
      "Real-time route scheduling interface, multi-currency logistics checkout, and high-performance React front-end.",
    projectLink: "/our-work",
  },
  {
    id: "col1-euroteam-patterns",
    companyName: "Euroteam",
    category: "Sustainable Global Logistics",
    title: "Euroteam — Dynamic Brand Patterns",
    image: "/images/selected_work/yylnHjpawl6cfQNJLwRB14HQ_1440.webp", // Photo 1 bottom card
    quote: "“Every visual touchpoint reflects our commitment to sustainable forward-moving logistics.”",
    founderName: "Mark Van Dijk",
    founderRole: "Managing Director, Euroteam",
    metrics: [
      { label: "Fleet Touchpoints", value: "1,200+" },
      { label: "Brand Equity", value: "€45M" },
      { label: "Design Consistency", value: "100%" },
    ],
    summary:
      "Generative graphic systems, vehicle wraps, physical collateral, and sustainability reporting templates.",
    projectLink: "/our-work",
  },
];

// ====================================================================
// COLUMN 2 DELIVERABLES: Continuous motion from TOP TO BOTTOM (Downward)
// Matches user Photo 2 (Mark OS web app, TWIN tote bag, Needle, DeluPay, Advimagine)
// ====================================================================
export const COLUMN_2_ITEMS: DeliverableCardItem[] = [
  {
    id: "col2-markos-web",
    companyName: "Mark OS",
    category: "AI Content Compliance",
    title: "Mark OS — AI Content Review Platform",
    image: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_2560.webp", // Photo 2 top card
    quote: "“Ensure your content hits the mark every time with verified compliance and brand protection.”",
    founderName: "Sarah Jenkins",
    founderRole: "Head of Product, Mark OS",
    metrics: [
      { label: "Review Accuracy", value: "99.4%" },
      { label: "Speed Increase", value: "12x" },
      { label: "Enterprise ARR", value: "$3.8M" },
    ],
    summary:
      "Next-generation AI compliance web app, cultural sensitivities scanner, brand guideline detector, and enterprise review workspace.",
    projectLink: "/our-work",
  },
  {
    id: "col2-twin-tote",
    companyName: "TWIN Global",
    category: "Digital Trade Ecosystem",
    title: "TWIN Global — Merchandise & Physical Touchpoints",
    image: "/images/selected_work/rZy5kVEyJg6E87JFlpFNpA2BSQ_1440.webp", // Photo 2 bottom card
    quote: "“Our brand merchandise and tangible touchpoints instantly set us apart at every international summit.”",
    founderName: "Christian Meyer",
    founderRole: "Co-Founder, TWIN Global",
    metrics: [
      { label: "Summit Attendees", value: "18,000+" },
      { label: "Global Trade GMV", value: "$80M+" },
      { label: "Member Net Promoter", value: "92" },
    ],
    summary:
      "Corporate apparel, custom woven tote bags, summit collateral, and bespoke typography for a global digital trade network.",
    projectLink: "/our-work",
  },
  {
    id: "col2-needle-billboard",
    companyName: "Needle",
    category: "Healthcare & Pharmaceuticals",
    title: "Needle — ADHD Medication Stock Finder",
    image: "/images/selected_work/2QlElFBnG4q7Qn7iIoRrvaKfE_1400.webp",
    quote: "“Needle finds your ADHD medications in stock so patients never waste critical hours calling pharmacies.”",
    founderName: "Elena Rostova",
    founderRole: "CEO & Co-Founder, Needle",
    metrics: [
      { label: "Pharmacies Synced", value: "14,500+" },
      { label: "Patient Hours Saved", value: "320K hrs" },
      { label: "Daily Queries", value: "85,000+" },
    ],
    summary:
      "High-impact outdoor billboard series, empathetic mascot brand illustration, real-time pharmacy inventory lookup engine, and responsive mobile application.",
    projectLink: "/our-work",
  },
  {
    id: "col2-delupay-fintech",
    companyName: "DeluPay",
    category: "Next-Gen Fintech Payments",
    title: "DeluPay — 3D Holographic Card Architecture",
    image: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_1504.webp",
    quote: "“World-class 3D visuals, fluid UI, and sub-second performance that helped us close our institutional round in record time.”",
    founderName: "Nicolas Dupont",
    founderRole: "Co-Founder & CTO, DeluPay",
    metrics: [
      { label: "Transaction Speed", value: "40K TPS" },
      { label: "Seed Closed", value: "€3.5M" },
      { label: "Uptime SLA", value: "99.99%" },
    ],
    summary:
      "Holographic mobile card UI, high-throughput consumer checkout application, 3D metallic dimensional assets, and brand design system.",
    projectLink: "/our-work",
  },
  {
    id: "col2-advimagine-3d",
    companyName: "Advimagine",
    category: "Industrial Engineering",
    title: "Advimagine — Precision Manufacturing 3D",
    image: "/images/selected_work/QAxA8GI2uEu8q2zketxqbeX0Rg_2560.webp",
    quote: "“The dark aesthetic and glossy 3D spatial visual assets transformed our industrial brand into an ultra-modern market leader.”",
    founderName: "Jens Lindqvist",
    founderRole: "VP Brand, Advimagine",
    metrics: [
      { label: "Enterprise Inquiries", value: "+210%" },
      { label: "Session Duration", value: "+4.2 min" },
      { label: "Award Honors", value: "Awwwards SOTD" },
    ],
    summary:
      "WebGL spatial interactions, glossy aerodynamic precision hero graphics, and technical design system for precision components.",
    projectLink: "/our-work",
  },
  {
    id: "col2-913-merch",
    companyName: "913.ai",
    category: "Domain-Specific AI Agents",
    title: "913.ai — Technical Apparel & Collateral",
    image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_1440.webp",
    quote: "“Our team and community wear the brand with immense pride at every AI conference worldwide.”",
    founderName: "Immo Ait Stapelfeld",
    founderRole: "CEO & Founder, 913.ai",
    metrics: [
      { label: "Conference Merch", value: "5,000+" },
      { label: "Community Growth", value: "+450%" },
      { label: "Brand Recall", value: "98.4%" },
    ],
    summary:
      "Embroidered technical outerwear, weatherproof windbreakers, hardware packaging, and investor presentation kits.",
    projectLink: "/our-work",
  },
];

export interface FounderStory {
  id: string;
  companyName: string;
  companyCategory: string;
  logoType: "megahr" | "913" | "ruuster" | "euroteam";
  quote: string;
  founderName: string;
  founderRole: string;
  founderAvatar: string;
  projectLink: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  caseStudySummary: string;
}

export const FEATURED_FOUNDERS: FounderStory[] = [
  {
    id: "mega-hr",
    companyName: "MegaHR",
    companyCategory: "AI-First Hiring Infrastructure",
    logoType: "megahr",
    quote: "“If you're looking for strategic thinking with fast, dependable delivery, this is it.”",
    founderName: "Darren Bounds",
    founderRole: "Founder & CEO, MegaHR",
    founderAvatar: "/images/team/team-1.jpg",
    projectLink: "/our-work",
    accentColor: "#CEF845", // Lime
    metrics: [
      { label: "Talent Screen Time", value: "-68%" },
      { label: "Series A Raised", value: "$6.5M" },
      { label: "Employer NPS", value: "94.2" },
    ],
    caseStudySummary:
      "Full corporate identity, metro campaign screens takeover, web design system, and multi-channel AI recruitment platform interface.",
  },
  {
    id: "913-ai",
    companyName: "913.ai",
    companyCategory: "Domain-Specific AI Agents",
    logoType: "913",
    quote: "“A complete brand we're proud to put in front of investors and customers.”",
    founderName: "Immo Ait Stapelfeld",
    founderRole: "CEO & Founder, 913.ai",
    founderAvatar: "/images/team/team-2.jpg",
    projectLink: "/our-work",
    accentColor: "#10b981", // Emerald
    metrics: [
      { label: "Seed Closed", value: "$4.2M" },
      { label: "User Acquisition", value: "+340%" },
      { label: "Brand Recall", value: "98.4%" },
    ],
    caseStudySummary:
      "Engineered comprehensive brand identity, typography architecture, 3D visual assets, and high-converting marketing framework for enterprise AI agents.",
  },
  {
    id: "ruuster-ai",
    companyName: "Ruuster",
    companyCategory: "AI Real Estate Intelligence",
    logoType: "ruuster",
    quote: "“UNIQUOVA transformed our vision into an iconic brand identity and platform that scaled user acquisition 300%.”",
    founderName: "Alexander Wright",
    founderRole: "Founder & CEO, Ruuster",
    founderAvatar: "/images/team/team-3.jpg",
    projectLink: "/our-work",
    accentColor: "#f97316", // Orange
    metrics: [
      { label: "Active Investors", value: "24,000+" },
      { label: "Conversion Lift", value: "+182%" },
      { label: "P95 Speed", value: "0.42s" },
    ],
    caseStudySummary:
      "Large-scale Manhattan billboard campaign, scalable Next.js cloud web application, design system, and multi-platform visual guidelines.",
  },
  {
    id: "euroteam-logistics",
    companyName: "Euroteam",
    companyCategory: "Sustainable Global Logistics",
    logoType: "euroteam",
    quote: "“The digital architecture and enterprise branding engineered by the team gave us an undeniable enterprise edge in global markets.”",
    founderName: "Mark Van Dijk",
    founderRole: "Managing Director, Euroteam",
    founderAvatar: "/images/team/team-4.jpg",
    projectLink: "/our-work",
    accentColor: "#059669", // Forest Green
    metrics: [
      { label: "Route Volume", value: "€120M+" },
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Partner Conversion", value: "+64%" },
    ],
    caseStudySummary:
      "Enterprise digital transformation, real-time fleet scheduling dashboard, sustainable identity guidelines, and international web platform.",
  },
];

interface TrustedByCompaniesProps {
  onOpenContact?: () => void;
}

export default function TrustedByCompanies({ onOpenContact }: TrustedByCompaniesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedStoryModal, setSelectedStoryModal] = useState<DeliverableCardItem | FounderStory | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  const total = FEATURED_FOUNDERS.length;
  const current = FEATURED_FOUNDERS[currentIndex];

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay interval with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // 3D GPU Tilt on mousemove for bento visuals
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltSpringConfig = { stiffness: 120, damping: 22, mass: 0.15 };
  const smoothTiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), tiltSpringConfig);
  const smoothTiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), tiltSpringConfig);

  // ====================================================================
  // CONTINUOUS BIDIRECTIONAL SCROLL-LINKED ENTRANCE & EXIT ANIMATION
  // - When scrolling down: Headline, Subtitle, and Bento Card animate IN
  //   with synchronized spring elevation, scale, 3D tilt, and fade.
  // - When scrolling up: Everything animates in reverse in real time!
  // ====================================================================
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"],
  });

  const scrollSpringConfig = { stiffness: 95, damping: 19, mass: 0.25 };

  // 1. Headline ("Trusted by AI founders") scroll entrance & exit
  const rawHeaderY = useTransform(scrollYProgress, [0, 0.30, 0.70, 1], [85, 0, 0, -65]);
  const rawHeaderScale = useTransform(scrollYProgress, [0, 0.30, 0.70, 1], [0.85, 1.0, 1.0, 0.88]);
  const rawHeaderOpacity = useTransform(scrollYProgress, [0, 0.24, 0.78, 1], [0, 1.0, 1.0, 0]);
  const smoothHeaderY = useSpring(rawHeaderY, scrollSpringConfig);
  const smoothHeaderScale = useSpring(rawHeaderScale, scrollSpringConfig);
  const smoothHeaderOpacity = useSpring(rawHeaderOpacity, scrollSpringConfig);

  // 2. Subtitle ("Straight from the founders we work with") staggered scroll entrance & exit
  const rawSubtitleY = useTransform(scrollYProgress, [0, 0.33, 0.68, 1], [65, 0, 0, -50]);
  const rawSubtitleScale = useTransform(scrollYProgress, [0, 0.33, 0.68, 1], [0.89, 1.0, 1.0, 0.91]);
  const rawSubtitleOpacity = useTransform(scrollYProgress, [0, 0.26, 0.76, 1], [0, 1.0, 1.0, 0]);
  const smoothSubtitleY = useSpring(rawSubtitleY, scrollSpringConfig);
  const smoothSubtitleScale = useSpring(rawSubtitleScale, scrollSpringConfig);
  const smoothSubtitleOpacity = useSpring(rawSubtitleOpacity, scrollSpringConfig);

  // 3. Main tactile bento card container scroll entrance & exit
  const rawCardY = useTransform(scrollYProgress, [0, 0.36, 0.66, 1], [150, 0, 0, -85]);
  const rawCardScale = useTransform(scrollYProgress, [0, 0.36, 0.66, 1], [0.86, 1.0, 1.0, 0.88]);
  const rawCardRotateX = useTransform(scrollYProgress, [0, 0.36, 0.66, 1], [12, 0, 0, -9]);
  const rawCardOpacity = useTransform(scrollYProgress, [0, 0.28, 0.74, 1], [0, 1.0, 1.0, 0]);
  const smoothScrollCardY = useSpring(rawCardY, scrollSpringConfig);
  const smoothScrollCardScale = useSpring(rawCardScale, scrollSpringConfig);
  const smoothScrollCardRotateX = useSpring(rawCardRotateX, scrollSpringConfig);
  const smoothScrollCardOpacity = useSpring(rawCardOpacity, scrollSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bentoGridRef.current) return;
    const rect = bentoGridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Render company logo
  const renderCompanyLogo = (story: FounderStory) => {
    if (story.logoType === "megahr") {
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            <div className="w-2 h-2 bg-dark rounded-[1px]" />
            <div className="w-2 h-2 bg-dark rounded-[1px]" />
            <div className="w-2 h-2 bg-dark rounded-[1px]" />
            <div className="w-2 h-2 bg-primary rounded-[1px]" />
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">MegaHR</span>
        </div>
      );
    }
    if (story.logoType === "913") {
      return (
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-dashed border-primary animate-spin-slow" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary absolute" />
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">913.ai</span>
        </div>
      );
    }
    if (story.logoType === "ruuster") {
      return (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-500 rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">Ruuster</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center text-white text-[9px] font-bold">
          E
        </div>
        <span className="font-extrabold text-2xl text-dark tracking-tight">Euroteam</span>
      </div>
    );
  };

  // Duplicate items twice to form a seamless infinite marquee
  const col1Double = [...COLUMN_1_ITEMS, ...COLUMN_1_ITEMS];
  const col2Double = [...COLUMN_2_ITEMS, ...COLUMN_2_ITEMS];

  return (
    <section
      id="trusted-by"
      ref={containerRef}
      style={{ perspective: "1400px" }}
      className="py-12 sm:py-16 lg:py-20 bg-[#FAF9FF] relative overflow-hidden will-change-transform"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ====================================================
            SECTION HEADER (Synchronized Scroll-Driven Parallax)
            - Title: "Trusted by AI founders"
            - Subtitle: "Straight from the founders we work with"
            - Both animate into view as you scroll down, and animate
              out in reverse as you scroll back up!
           ==================================================== */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 will-change-transform">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-light border border-primary-200 text-primary text-xs font-bold uppercase tracking-widest mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span>Client Impact</span>
          </div>

          <motion.h2
            style={{
              y: smoothHeaderY,
              scale: smoothHeaderScale,
              opacity: smoothHeaderOpacity,
              transformStyle: "preserve-3d",
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight will-change-transform"
          >
            Trusted by AI founders
          </motion.h2>

          <motion.p
            style={{
              y: smoothSubtitleY,
              scale: smoothSubtitleScale,
              opacity: smoothSubtitleOpacity,
            }}
            className="text-sm sm:text-base text-dark-muted font-medium mt-1.5 max-w-xl mx-auto will-change-transform"
          >
            Straight from the founders we work with
          </motion.p>
        </div>

        {/* ====================================================
            THE MAIN TACTILE BENTO CARD CONTAINER
            - Continuous Bidirectional Scroll-Linked Entrance & Exit Animation
            - When scrolling down: rises up, scales 0.90 -> 1.0, tilts 9deg -> 0deg, fades in
            - When scrolling up: smoothly animates in reverse!
            - Aspect ratio ~3.0:1 (matching Photo 2)
            - UNIQOVA Signature Theme: Soft Lavender Luxury Gradient with Electric Purple Accents
           ==================================================== */}
        <motion.div
          style={{
            y: smoothScrollCardY,
            scale: smoothScrollCardScale,
            rotateX: smoothScrollCardRotateX,
            opacity: smoothScrollCardOpacity,
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-gradient-to-br from-[#F5EFFF] via-[#FAF8FF] to-[#EBE2FF] border border-primary/20 rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-5 sm:p-7 lg:p-8 xl:p-10 shadow-[0_24px_70px_-15px_rgba(117,69,245,0.13),0_4px_24px_rgba(21,19,35,0.03)] overflow-hidden will-change-transform group"
        >
          {/* Ambient Lavender Radial Glow Inside Card */}
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-primary/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            
            {/* ====================================================
                LEFT COLUMN: Testimonial Quote & Founder Bio (5 cols)
                Sleek compact sizing matching Photo 2
               ==================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[240px] sm:min-h-[270px] lg:min-h-[310px]">
              
              {/* Top Row: Company Logo & Interactive Navigation Pills */}
              <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`logo-${current.id}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {renderCompanyLogo(current)}
                  </motion.div>
                </AnimatePresence>

                {/* Circular Navigation Buttons in UNIQOVA Theme (< White & > Electric Purple) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Founder"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-primary-light active:scale-95 text-dark hover:text-primary shadow-xs border border-primary/20 flex items-center justify-center transition-all cursor-pointer hover:shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="Next Founder"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary active:scale-95 text-white shadow-glow-sm hover:shadow-glow flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>
                </div>
              </div>

              {/* Middle: Big Testimonial Quotation (Compact elegant typography) */}
              <div className="my-auto py-2">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`quote-${current.id}`}
                    custom={direction}
                    initial={{ opacity: 0, y: direction > 0 ? 15 : -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction > 0 ? -15 : 15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <p className="text-xl sm:text-2xl lg:text-[25px] xl:text-[27px] font-extrabold text-dark leading-[1.28] tracking-tight">
                      {current.quote}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom: Founder Avatar, Name & "See the project" */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`founder-${current.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: 0.04 }}
                  className="flex items-center gap-3 pt-3 sm:pt-4"
                >
                  {/* Founder Avatar */}
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-primary/25 shrink-0 bg-white shadow-sm">
                    <img
                      src={current.founderAvatar}
                      alt={current.founderName}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  {/* Founder Info */}
                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base font-extrabold text-dark leading-tight">
                      {current.founderName}
                    </span>
                    <div className="text-xs sm:text-sm text-dark-muted font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>{current.founderRole}</span>
                      <span className="text-dark-muted/40">·</span>
                      <button
                        onClick={() => setSelectedStoryModal(current)}
                        className="text-primary font-bold hover:text-primary-dark transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>See the project</span>
                        <ArrowRight className="w-3 h-3 inline-block" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ====================================================
                RIGHT BENTO DELIVERABLES GRID (7 cols)
                DUAL OPPOSING VERTICAL ROTATING MARQUEES:
                - Decreased height matching Photo 2 (~300px - 360px)
                - Column 1 (Middle): Rotates from BOTTOM TO TOP (Upwards)
                - Column 2 (Right): Rotates from TOP TO BOTTOM (Downwards)
                - Pause on hover, click to view case study, GPU 60fps
               ==================================================== */}
            <motion.div
              ref={bentoGridRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: smoothTiltX,
                rotateY: smoothTiltY,
                transformStyle: "preserve-3d",
              }}
              className="lg:col-span-7 w-full h-[290px] sm:h-[330px] lg:h-[360px] overflow-hidden will-change-transform relative rounded-[20px] sm:rounded-[24px]"
            >
              {/* Top & Bottom Soft Edge Gradient Masks (Color-matched to UNIQOVA theme container) */}
              <div className="absolute inset-x-0 top-0 h-10 sm:h-12 bg-gradient-to-b from-[#F5EFFF] to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-10 sm:h-12 bg-gradient-to-t from-[#EBE2FF] to-transparent z-10 pointer-events-none" />

              <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full items-start">
                
                {/* ------------------------------------------------
                    COLUMN 1 (Photo 1): ROTATES FROM BOTTOM TO TOP
                    Infinite vertical conveyor moving UPWARDS
                   ------------------------------------------------ */}
                <div className="overflow-hidden h-full flex flex-col group/col1">
                  <div className="animate-marquee-up pause-on-hover flex flex-col gap-3 sm:gap-3.5 will-change-transform">
                    {col1Double.map((item, idx) => (
                      <div
                        key={`col1-${item.id}-${idx}`}
                        onClick={() => setSelectedStoryModal(item)}
                        className="group/card relative w-full h-[140px] sm:h-[160px] lg:h-[175px] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#0A0910] border border-primary/20 hover:border-primary/60 shadow-[0_8px_24px_rgba(21,19,35,0.12)] hover:shadow-glow-sm cursor-pointer shrink-0 transition-all duration-300 ease-out hover:scale-[1.025]"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center select-none group-hover/card:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* ------------------------------------------------
                    COLUMN 2 (Photo 2): ROTATES FROM TOP TO BOTTOM
                    Infinite vertical conveyor moving DOWNWARDS
                   ------------------------------------------------ */}
                <div className="overflow-hidden h-full flex flex-col group/col2">
                  <div className="animate-marquee-down pause-on-hover flex flex-col gap-3 sm:gap-3.5 will-change-transform">
                    {col2Double.map((item, idx) => (
                      <div
                        key={`col2-${item.id}-${idx}`}
                        onClick={() => setSelectedStoryModal(item)}
                        className="group/card relative w-full h-[140px] sm:h-[160px] lg:h-[175px] rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#16151E] border border-primary/20 hover:border-primary/60 shadow-[0_8px_24px_rgba(21,19,35,0.12)] hover:shadow-glow-sm cursor-pointer shrink-0 transition-all duration-300 ease-out hover:scale-[1.025]"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          loading="lazy"
                          className="w-full h-full object-cover object-center select-none group-hover/card:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>

      {/* ====================================================
          INTERACTIVE CASE STUDY DETAIL MODAL
         ==================================================== */}
      <AnimatePresence>
        {selectedStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStoryModal(null)}
              className="fixed inset-0 bg-dark/70 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-border overflow-hidden z-10 my-8"
            >
              {/* Modal Header */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-br from-softBg to-white border-b border-border">
                <button
                  onClick={() => setSelectedStoryModal(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-softBg hover:bg-primary-light text-dark hover:text-primary flex items-center justify-center border border-border shadow-xs transition-transform active:scale-90 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <span className="font-extrabold text-xl text-dark">
                    {selectedStoryModal.companyName}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary-light text-primary font-bold border border-primary-200">
                    {"category" in selectedStoryModal
                      ? selectedStoryModal.category
                      : selectedStoryModal.companyCategory}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-dark leading-tight mt-2">
                  {selectedStoryModal.quote}
                </h3>

                <p className="text-sm text-dark-muted font-medium mt-3 leading-relaxed">
                  {"summary" in selectedStoryModal
                    ? selectedStoryModal.summary
                    : selectedStoryModal.caseStudySummary}
                </p>
              </div>

              {/* Modal Body: Metrics & Deliverable previews */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-dark-muted mb-3">
                    Verified Engagement Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {selectedStoryModal.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-softBg border border-border/80 text-center hover:border-primary/30 transition-colors"
                      >
                        <div className="text-xl sm:text-2xl font-black text-primary">
                          {metric.value}
                        </div>
                        <div className="text-xs font-medium text-dark-muted mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deliverable Image Preview */}
                {"image" in selectedStoryModal && (
                  <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-border shadow-xs">
                    <img
                      src={selectedStoryModal.image}
                      alt={selectedStoryModal.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Modal Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-light border border-primary/20 text-primary flex items-center justify-center font-black text-sm">
                      {selectedStoryModal.founderName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-dark">
                        {selectedStoryModal.founderName}
                      </div>
                      <div className="text-xs text-dark-muted font-medium">
                        {selectedStoryModal.founderRole}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {onOpenContact && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStoryModal(null);
                          onOpenContact();
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-sm font-bold shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                      >
                        <span>Start Similar Project</span>
                      </button>
                    )}
                    <Link
                      href={selectedStoryModal.projectLink}
                      onClick={() => setSelectedStoryModal(null)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-softBg text-dark border border-border hover:border-primary/40 text-sm font-bold shadow-xs transition-all cursor-pointer"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

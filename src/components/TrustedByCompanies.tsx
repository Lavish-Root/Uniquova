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

export interface BrandWorkItem {
  id: string;
  companyName: string;
  category: string;
  title: string;
  image: string;
  caption: string;
  quote: string;
  founderName: string;
  founderRole: string;
  metrics: { label: string; value: string }[];
  summary: string;
  projectLink: string;
}

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
  workImages: BrandWorkItem[];
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
    accentColor: "#7545F5",
    metrics: [
      { label: "Talent Screen Time", value: "-68%" },
      { label: "Series A Raised", value: "$6.5M" },
      { label: "Employer NPS", value: "94.2" },
    ],
    caseStudySummary:
      "Full corporate identity, metro campaign screens takeover, web design system, and multi-channel AI recruitment platform interface.",
    workImages: [
      {
        id: "megahr-w1",
        companyName: "MegaHR",
        category: "Billboard & OOH",
        title: "MegaHR — AI Subway Takeover Series",
        image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_2048.webp",
        caption: "Manhattan Metro Takeover",
        quote: "“Our subway takeover series established MegaHR as the defining AI recruitment brand across NYC tech hubs.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Footfall Reach", value: "2.4M" },
          { label: "Direct Signups", value: "+340%" },
          { label: "Brand Recall", value: "96.8%" },
        ],
        summary: "City-wide digital subway screens takeover showing live candidate qualification workflows.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-w2",
        companyName: "MegaHR",
        category: "Transit Posters",
        title: "MegaHR — Station Poster Architecture",
        image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_1440.webp",
        caption: "Subway Station Screen Series",
        quote: "“Clean, high-converting posters that translated complex AI models into instant value propositions.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Campaign CTR", value: "8.2%" },
          { label: "Inbound Demos", value: "1,200+" },
          { label: "CAC Reduction", value: "-42%" },
        ],
        summary: "High-contrast geometric posters deployed across prime tech corridor transit hubs.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-w3",
        companyName: "MegaHR",
        category: "Web & UI/UX",
        title: "MegaHR — AI Hiring Web Platform",
        image: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_2560.webp",
        caption: "Candidate Screening Workspace",
        quote: "“The platform interface engineered by UNIQOVA allowed recruiters to screen 10x more candidates effortlessly.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "P95 Latency", value: "< 240ms" },
          { label: "Recruiter NPS", value: "94.2" },
          { label: "Screen Velocity", value: "12x" },
        ],
        summary: "Responsive Next.js web application with real-time biometric candidate ranking and automated scheduling.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-w4",
        companyName: "MegaHR",
        category: "Brand Architecture",
        title: "MegaHR — Visual Identity & Tokens",
        image: "/images/selected_work/6Fiwu9F9MKkOxpv42vAlXksFU_1440.webp",
        caption: "Brand Identity & Design Tokens",
        quote: "“From logo geometry to color tokens, UNIQOVA created a unified brand language that scales with our enterprise growth.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Brand Equity", value: "$6.5M" },
          { label: "Design Consistency", value: "100%" },
          { label: "Press Features", value: "18 Outlets" },
        ],
        summary: "Design system tokens, corporate stationery, investor pitch decks, and brand guideline documentation.",
        projectLink: "/our-work",
      },
    ],
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
    accentColor: "#7545F5",
    metrics: [
      { label: "Seed Closed", value: "$4.2M" },
      { label: "User Acquisition", value: "+340%" },
      { label: "Brand Recall", value: "98.4%" },
    ],
    caseStudySummary:
      "Engineered comprehensive brand identity, typography architecture, 3D visual assets, and high-converting marketing framework for enterprise AI agents.",
    workImages: [
      {
        id: "913-w1",
        companyName: "913.ai",
        category: "3D Visuals & Identity",
        title: "913.ai — 3D Dimensional Wave Identity",
        image: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_1440.webp",
        caption: "Spatial 3D Wave Dynamics",
        quote: "“The glossy 3D wave visual assets defined our category and positioned us as an elite AI research studio.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Investor Traction", value: "$4.2M" },
          { label: "Session Time", value: "+3.8m" },
          { label: "Global Mentions", value: "450+" },
        ],
        summary: "Photorealistic 3D particle wave simulations representing continuous AI agent intelligence.",
        projectLink: "/our-work",
      },
      {
        id: "913-w2",
        companyName: "913.ai",
        category: "Web Platform UI",
        title: "913.ai — Autonomous Agent Console",
        image: "/images/selected_work/rjlcLH3DNif0U74oMAOCto3zT0_1440.webp",
        caption: "AI Agent Console & Studio",
        quote: "“Sub-second agent execution telemetry packed in an ultra-clean, distraction-free developer interface.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Task Throughput", value: "250K/day" },
          { label: "Dev Retention", value: "96.2%" },
          { label: "Uptime SLA", value: "99.99%" },
        ],
        summary: "Real-time multi-agent orchestration console with graph-based reasoning monitors and token consumption analytics.",
        projectLink: "/our-work",
      },
      {
        id: "913-w3",
        companyName: "913.ai",
        category: "Packaging & Unboxing",
        title: "913.ai — Hardware Packaging System",
        image: "/images/selected_work/gtavCMDLHB0d9ehFukQtVNbXeU_1440.webp",
        caption: "Investor Presentation Kits",
        quote: "“The physical touchpoints and packaging created by UNIQOVA left institutional investors speechless.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Term Sheets", value: "4 Offers" },
          { label: "Valuation Jump", value: "2.8x" },
          { label: "Partner NPS", value: "98.4" },
        ],
        summary: "Matte black structural packaging, foil-stamped documentation, and custom dimensional investor kits.",
        projectLink: "/our-work",
      },
      {
        id: "913-w4",
        companyName: "913.ai",
        category: "Summit Collateral",
        title: "913.ai — Technical Apparel & Merch",
        image: "/images/selected_work/rLOEAajcxuoSByBHZOjxaMTnzA_1440.webp",
        caption: "Global AI Summit Collateral",
        quote: "“Our team and community wear the brand with immense pride at every tier-1 AI conference globally.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Conference Merch", value: "5,000+" },
          { label: "Community Growth", value: "+450%" },
          { label: "Organic Reach", value: "1.2M" },
        ],
        summary: "Embroidered technical outerwear, weatherproof windbreakers, hardware packaging, and investor kits.",
        projectLink: "/our-work",
      },
    ],
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
    accentColor: "#7545F5",
    metrics: [
      { label: "Active Investors", value: "24,000+" },
      { label: "Conversion Lift", value: "+182%" },
      { label: "P95 Speed", value: "0.42s" },
    ],
    caseStudySummary:
      "Large-scale Manhattan billboard campaign, scalable Next.js cloud web application, design system, and multi-platform visual guidelines.",
    workImages: [
      {
        id: "ruuster-w1",
        companyName: "Ruuster",
        category: "Large-Format OOH",
        title: "Ruuster — Manhattan Building Billboard",
        image: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_2000.webp",
        caption: "Manhattan Billboard Campaign",
        quote: "“The towering Manhattan billboard campaign instantly drove enterprise credibility and institutional buy-in.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Impression Count", value: "5.8M" },
          { label: "Institutional LPs", value: "48 Funds" },
          { label: "Direct Inbound", value: "+210%" },
        ],
        summary: "Iconic high-rise billboard takeover in Midtown Manhattan featuring bold brand typography.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-w2",
        companyName: "Ruuster",
        category: "Cloud Web App",
        title: "Ruuster — AI Property Intelligence Platform",
        image: "/images/selected_work/it4cXk12EJX3M46FocEoA4IDN8_1440.webp",
        caption: "Real-Time Valuation Engine",
        quote: "“Our web platform processes millions of residential listings in real time with breathtaking performance.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Query Speed", value: "0.42s" },
          { label: "Listings Synced", value: "3.2M" },
          { label: "User Retention", value: "91.4%" },
        ],
        summary: "High-concurrency React & Next.js cloud portal with geospatial predictive yield mapping.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-w3",
        companyName: "Ruuster",
        category: "Urban OOH Advertising",
        title: "Ruuster — Transit Hub Display Series",
        image: "/images/selected_work/2QlElFBnG4q7Qn7iIoRrvaKfE_1400.webp",
        caption: "Transit Hub Billboard Series",
        quote: "“Striking visuals that cut through the noise of urban commuter hubs and generated record app signups.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "App Installs", value: "65,000+" },
          { label: "Cost Per Install", value: "$1.85" },
          { label: "Active Volume", value: "$45M+" },
        ],
        summary: "Multi-city digital transit screens showcasing real-time residential investment yields.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-w4",
        companyName: "Ruuster",
        category: "Fintech Interface",
        title: "Ruuster — Mobile Investor Portal",
        image: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_1504.webp",
        caption: "Mobile Investment App UI",
        quote: "“Sleek holographic card architecture and fluid interactions that our high-net-worth clients praise daily.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Store Rating", value: "4.9 ★" },
          { label: "AUM Growth", value: "3.2x" },
          { label: "Daily Sessions", value: "4.8" },
        ],
        summary: "Native mobile wallet and fractional real estate trading UI with instant ACH settlement.",
        projectLink: "/our-work",
      },
    ],
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
    accentColor: "#7545F5",
    metrics: [
      { label: "Route Volume", value: "€120M+" },
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Partner Conversion", value: "+64%" },
    ],
    caseStudySummary:
      "Enterprise digital transformation, real-time fleet scheduling dashboard, sustainable identity guidelines, and international web platform.",
    workImages: [
      {
        id: "euroteam-w1",
        companyName: "Euroteam",
        category: "OOH & Brand Takeover",
        title: "Euroteam — Highway 3-Banner Billboard Series",
        image: "/images/selected_work/pT9GV8WvHgTQ65MW162mjfBro_1440.webp",
        caption: "Highway 3-Banner Billboard Series",
        quote: "“Our sustainable green brand banners immediately elevated our prestige across major European transit freight routes.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Freight Inquiries", value: "+84%" },
          { label: "Partner Deals", value: "€32M" },
          { label: "Brand Recall", value: "99.1%" },
        ],
        summary: "Highway outdoor billboard series highlighting sustainable carbon-neutral freight logistics.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-w2",
        companyName: "Euroteam",
        category: "Enterprise Web App",
        title: "Euroteam — Global Logistics Web Platform",
        image: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_2048.webp",
        caption: "Fleet Scheduling & Route Interface",
        quote: "“Sub-200ms route calculations and a world-class UI that our international supply chain partners praise daily.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Global Coverage", value: "48 Countries" },
          { label: "Response Time", value: "< 200ms" },
          { label: "Client Retention", value: "99.1%" },
        ],
        summary: "Enterprise web application featuring real-time fleet scheduling, multi-currency checkout, and instant dispatch.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-w3",
        companyName: "Euroteam",
        category: "Generative Identity",
        title: "Euroteam — Dynamic Sustainable Patterns",
        image: "/images/selected_work/yylnHjpawl6cfQNJLwRB14HQ_1440.webp",
        caption: "Fleet Wraps & Dynamic Patterns",
        quote: "“Every touchpoint—from shipping containers to digital apps—embodies our commitment to clean, forward-moving logistics.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Fleet Touchpoints", value: "1,200+" },
          { label: "Brand Equity", value: "€45M" },
          { label: "Consistency Score", value: "100%" },
        ],
        summary: "Generative vector patterns applied across electric trucks, shipping containers, and environmental impact collateral.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-w4",
        companyName: "Euroteam",
        category: "Logistics Telemetry",
        title: "Euroteam — Route Command Center",
        image: "/images/selected_work/wUqQcSSSVGIKdc8JPIo7HYcBvA_1440.webp",
        caption: "Global Operations Dashboard",
        quote: "“Real-time telematics dashboard that gave our operations team complete clarity across European freight lanes.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "On-Time Dispatch", value: "99.8%" },
          { label: "Fuel Optimization", value: "-18%" },
          { label: "Active Routes", value: "480+" },
        ],
        summary: "Cloud-native mission control dashboard monitoring cargo telemetry and carbon offsets in real time.",
        projectLink: "/our-work",
      },
    ],
  },
];

interface TrustedByCompaniesProps {
  onOpenContact?: () => void;
}

export default function TrustedByCompanies({ onOpenContact }: TrustedByCompaniesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedStoryModal, setSelectedStoryModal] = useState<BrandWorkItem | FounderStory | null>(null);

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
    }, 7000);
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"],
  });

  const scrollSpringConfig = { stiffness: 95, damping: 19, mass: 0.25 };

  const rawHeaderY = useTransform(scrollYProgress, [0, 0.30, 0.70, 1], [85, 0, 0, -65]);
  const rawHeaderScale = useTransform(scrollYProgress, [0, 0.30, 0.70, 1], [0.85, 1.0, 1.0, 0.88]);
  const rawHeaderOpacity = useTransform(scrollYProgress, [0, 0.24, 0.78, 1], [0, 1.0, 1.0, 0]);
  const smoothHeaderY = useSpring(rawHeaderY, scrollSpringConfig);
  const smoothHeaderScale = useSpring(rawHeaderScale, scrollSpringConfig);
  const smoothHeaderOpacity = useSpring(rawHeaderOpacity, scrollSpringConfig);

  const rawSubtitleY = useTransform(scrollYProgress, [0, 0.33, 0.68, 1], [65, 0, 0, -50]);
  const rawSubtitleScale = useTransform(scrollYProgress, [0, 0.33, 0.68, 1], [0.89, 1.0, 1.0, 0.91]);
  const rawSubtitleOpacity = useTransform(scrollYProgress, [0, 0.26, 0.76, 1], [0, 1.0, 1.0, 0]);
  const smoothSubtitleY = useSpring(rawSubtitleY, scrollSpringConfig);
  const smoothSubtitleScale = useSpring(rawSubtitleScale, scrollSpringConfig);
  const smoothSubtitleOpacity = useSpring(rawSubtitleOpacity, scrollSpringConfig);

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

  return (
    <section
      id="trusted-by"
      ref={containerRef}
      style={{ perspective: "1400px" }}
      className="py-12 sm:py-16 lg:py-20 bg-[#FAF9FF] relative overflow-hidden will-change-transform"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
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
            - Left: Brand Owner Info, Quote, & "< >" Nav Buttons
            - Right: Synchronized Deliverable Images of THAT Specific Brand
            - Theme: UNIQOVA Signature Soft Lavender Luxury
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
                LEFT COLUMN: Brand Owner, Logo, Quote, & Controls
               ==================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[260px] sm:min-h-[290px] lg:min-h-[340px]">
              
              {/* Top Row: Company Logo & Interactive Navigation "< >" */}
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

                {/* Circular Navigation Buttons: "<" (White) & ">" (Electric Purple) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Brand"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-primary-light active:scale-95 text-dark hover:text-primary shadow-xs border border-primary/20 flex items-center justify-center transition-all cursor-pointer hover:shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="Next Brand"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary active:scale-95 text-white shadow-glow-sm hover:shadow-glow flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>
                </div>
              </div>

              {/* Middle: Big Testimonial Quotation */}
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

              {/* Bottom: Founder Avatar, Name, Role & Case Study Link */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`founder-${current.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: 0.04 }}
                  className="flex items-center gap-3 pt-3 sm:pt-4"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-primary/25 shrink-0 bg-white shadow-sm">
                    <img
                      src={current.founderAvatar}
                      alt={current.founderName}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

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
                RIGHT COLUMN: That Specific Brand's Work Images
                - Synchronized to current brand owner on "< >" click
                - Interactive 3D tilt on mousemove
                - Smooth slide & fade transition between brand owners
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
              className="lg:col-span-7 w-full h-[310px] sm:h-[340px] lg:h-[370px] overflow-hidden will-change-transform relative rounded-[20px] sm:rounded-[24px]"
            >
              {/* Soft Gradient Border Accents */}
              <div className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-[#F5EFFF]/60 to-transparent z-10 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#EBE2FF]/60 to-transparent z-10 pointer-events-none" />

              {/* Synchronized Deliverables Grid for Current Brand Owner */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`work-grid-${current.id}`}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    x: direction > 0 ? 32 : -32,
                    scale: 0.98,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    x: direction > 0 ? -32 : 32,
                    scale: 0.98,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.38,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 h-full w-full"
                >
                  {/* Sub-Column 1: Left 2 Work Deliverables */}
                  <div className="flex flex-col gap-3 sm:gap-3.5 h-full">
                    {current.workImages.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedStoryModal(item)}
                        className="group/card relative flex-1 w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#0A0910] border border-primary/20 hover:border-primary/60 shadow-[0_8px_24px_rgba(21,19,35,0.12)] hover:shadow-glow-sm cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02]"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center select-none group-hover/card:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <span className="inline-block text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 truncate max-w-full">
                            {item.caption}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />
                      </div>
                    ))}
                  </div>

                  {/* Sub-Column 2: Right 2 Work Deliverables */}
                  <div className="flex flex-col gap-3 sm:gap-3.5 h-full">
                    {current.workImages.slice(2, 4).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedStoryModal(item)}
                        className="group/card relative flex-1 w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#16151E] border border-primary/20 hover:border-primary/60 shadow-[0_8px_24px_rgba(21,19,35,0.12)] hover:shadow-glow-sm cursor-pointer transition-all duration-300 ease-out hover:scale-[1.02]"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover object-center select-none group-hover/card:scale-105 transition-transform duration-500 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
                          <span className="inline-block text-[11px] font-bold text-white bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 truncate max-w-full">
                            {item.caption}
                          </span>
                        </div>
                        <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStoryModal(null)}
              className="fixed inset-0 bg-dark/70 backdrop-blur-md"
            />

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

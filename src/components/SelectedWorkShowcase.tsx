"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  TrendingUp,
  X,
  ArrowRight,
} from "lucide-react";

export interface ShowcaseProject {
  id: string;
  title: string;
  client: string;
  category: string;
  badge: string;
  impact: string;
  description: string;
  image: string;
  metrics: { label: string; value: string }[];
  technologies: string[];
  liveUrl?: string;
  accent: {
    gradient: string;
    border: string;
    glow: string;
  };
}

export const SHOWCASE_PROJECTS: ShowcaseProject[] = [
  {
    id: "apex-commerce",
    title: "Apex Direct — D2C E-commerce Scaling",
    client: "Apex Lifestyle Co.",
    category: "E-commerce & Web",
    badge: "Shopify Plus & Marketplace",
    impact: "+182% Revenue Growth",
    description:
      "Re-platformed legacy storefront to headless Next.js with automated Amazon marketplace inventory sync and high-converting product pages.",
    image: "/images/portfolio/apex_ecommerce.jpg",
    metrics: [
      { label: "Conversion Rate", value: "+4.1%" },
      { label: "ACoS Reduction", value: "-28%" },
      { label: "Page Load Speed", value: "0.8s" },
    ],
    technologies: ["Next.js 14", "Tailwind CSS", "Amazon Ads API", "Shopify Plus", "TypeScript"],
    liveUrl: "https://uniquova.com/our-work",
    accent: {
      gradient: "from-purple-500/20 via-primary/10 to-transparent",
      border: "border-purple-500/30",
      glow: "rgba(117, 69, 245, 0.25)",
    },
  },
  {
    id: "novacloud-saas",
    title: "NovaCloud — Enterprise SaaS Platform",
    client: "Nova Technologies",
    category: "Web & UI/UX",
    badge: "Cloud Telemetry & AI",
    impact: "3.2x User Engagement",
    description:
      "Complete web application redesign and frontend architecture overhaul for an AI-powered operations monitoring suite with real-time graphs.",
    image: "/images/portfolio/novacloud_saas.jpg",
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Daily Active Users", value: "+140%" },
      { label: "Core Web Vitals", value: "< 420ms" },
    ],
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js"],
    liveUrl: "https://uniquova.com/our-work",
    accent: {
      gradient: "from-blue-500/20 via-primary/10 to-transparent",
      border: "border-blue-500/30",
      glow: "rgba(59, 130, 246, 0.25)",
    },
  },
  {
    id: "zenith-health",
    title: "Zenith Health — Telemedicine App",
    client: "Zenith Digital Healthcare",
    category: "App Development",
    badge: "HIPAA Compliant Health",
    impact: "150K+ Active Users",
    description:
      "Cross-platform iOS and Android healthcare app with encrypted patient video consultations, doctor booking, and biometric vitals telemetry.",
    image: "/images/portfolio/zenith_health.jpg",
    metrics: [
      { label: "App Store Rating", value: "4.9 ★" },
      { label: "Consultation Speed", value: "< 2 mins" },
      { label: "Crash-Free Rate", value: "99.9%" },
    ],
    technologies: ["React Native", "WebRTC", "PostgreSQL", "Tailwind CSS", "HIPAA Compliant"],
    liveUrl: "https://uniquova.com/our-work",
    accent: {
      gradient: "from-teal-500/20 via-primary/10 to-transparent",
      border: "border-teal-500/30",
      glow: "rgba(20, 184, 166, 0.25)",
    },
  },
  {
    id: "vaultpay-fintech",
    title: "VaultPay — Neo-Banking Ecosystem",
    client: "Vault Financial Tech",
    category: "Web & Mobile Platform",
    badge: "Instant Payouts & Security",
    impact: "₹24Cr+ Monthly GMV",
    description:
      "Futuristic digital banking app interface with holographic debit cards, real-time multi-currency settlement charts, and biometric authentication.",
    image: "/images/portfolio/vaultpay_fintech.jpg",
    metrics: [
      { label: "Settlement Speed", value: "Instant" },
      { label: "Cloud Uptime SLA", value: "99.99%" },
      { label: "Security Compliance", value: "PCI-DSS" },
    ],
    technologies: ["Next.js", "Node.js", "Tailwind CSS", "Biometrics", "WebSockets"],
    liveUrl: "https://uniquova.com/our-work",
    accent: {
      gradient: "from-indigo-500/20 via-primary/10 to-transparent",
      border: "border-indigo-500/30",
      glow: "rgba(99, 102, 241, 0.25)",
    },
  },
  {
    id: "lumina-brand",
    title: "Lumina Organics — Global Brand Identity",
    client: "Lumina Beauty Group",
    category: "Branding & Design",
    badge: "Packaging & 3D Renders",
    impact: "Sold Out in 48 Hours",
    description:
      "Bespoke typography, eco-luxe cosmetic packaging system with purple foil embossing, and cohesive visual identity guidelines across 20+ SKUs.",
    image: "/images/portfolio/lumina_brand.jpg",
    metrics: [
      { label: "Brand Recall Lift", value: "+84%" },
      { label: "Global Distribution", value: "14 Countries" },
      { label: "Social Following", value: "+320%" },
    ],
    technologies: ["Brand Strategy", "Packaging Design", "Figma", "3D Renders", "Vector Craft"],
    liveUrl: "https://uniquova.com/our-work",
    accent: {
      gradient: "from-pink-500/20 via-primary/10 to-transparent",
      border: "border-pink-500/30",
      glow: "rgba(236, 72, 153, 0.25)",
    },
  },
  {
    id: "nexalearn-edtech",
    title: "NexaLearn — Next-Gen AI EdTech",
    client: "Nexa Digital Academy",
    category: "Web Development",
    badge: "Spatial Learning & AI Tutor",
    impact: "85K+ Active Learners",
    description:
      "Interactive futuristic digital learning platform: video lecture interface with AI co-pilot notes, student collaboration chat, and mastery progress analytics.",
    image: "/images/portfolio/nexalearn_edtech.jpg",
    metrics: [
      { label: "Course Rating", value: "4.8 ★" },
      { label: "Completion Velocity", value: "94%" },
      { label: "AI Tutor Precision", value: "98.5%" },
    ],
    technologies: ["Next.js 14", "WebSockets", "Tailwind CSS", "Canvas API", "AI Agents"],
    liveUrl: "https://uniquova.com/our-work",
    accent: {
      gradient: "from-violet-500/20 via-primary/10 to-transparent",
      border: "border-violet-500/30",
      glow: "rgba(139, 92, 246, 0.25)",
    },
  },
];

export default function SelectedWorkShowcase() {
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const marqueeRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Mouse Drag / Touch Scrub Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX - dragOffset);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const currentX = e.clientX;
    const newOffset = currentX - dragStartX;
    setDragOffset(newOffset);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX - dragOffset);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const newOffset = currentX - dragStartX;
    setDragOffset(newOffset);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard escape listener for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="selected-work"
      className="relative z-10 bg-white rounded-t-[50px] sm:rounded-t-[68px] lg:rounded-t-[84px] shadow-[0_-35px_90px_rgba(0,0,0,0.48),0_-10px_35px_rgba(117,69,245,0.12)] border-t border-border/80 pt-12 sm:pt-16 lg:pt-20 pb-16 sm:pb-24 lg:pb-28 min-h-[85vh] lg:min-h-[92vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[700px] h-[500px] bg-gradient-to-b from-primary/8 via-primary-light/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[600px] h-[600px] bg-primary-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Infinite Horizontal Marquee Track Container (Moving Photo Component / Ticker) */}
      <div
        ref={marqueeRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => {
          setIsPaused(false);
          setIsDragging(false);
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        data-paused={isPaused || isDragging}
        className={`marquee-container relative w-full overflow-hidden py-4 select-none ${isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        style={
          {
            "--marquee-speed": "50s",
          } as React.CSSProperties
        }
      >
        {/* Soft edge blur masks for continuous infinite horizon */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-20 pointer-events-none" />

        {/* Marquee Flex Ribbon (Duplicated array for 100% seamless zero-glitch loop) */}
        <div
          ref={trackRef}
          className={`flex gap-8 sm:gap-12 lg:gap-16 items-center w-max ${isDragging ? "" : "animate-marquee-horizontal"
            }`}
          style={{
            transform: isDragging ? `translate3d(${dragOffset}px, 0, 0)` : undefined,
          }}
        >
          {[...SHOWCASE_PROJECTS, ...SHOWCASE_PROJECTS].map((project, idx) => {
            const uniqueKey = `${project.id}-${idx}`;

            return (
              <div
                key={uniqueKey}
                onClick={() => setSelectedProject(project)}
                className="group relative w-[clamp(500px,68vw,1040px)] h-[440px] sm:h-[560px] lg:h-[660px] xl:h-[720px] rounded-[28px] sm:rounded-[36px] lg:rounded-[44px] overflow-hidden border border-border/70 hover:border-primary/50 shadow-[0_20px_60px_rgba(0,0,0,0.12)] hover:shadow-[0_28px_80px_rgba(117,69,245,0.24)] transition-all duration-500 hover:-translate-y-2 hover:scale-[1.015] bg-slate-900 shrink-0 cursor-pointer"
              >
                {/* Full-bleed Showcase Image matching reference */}
                <img
                  src={project.image}
                  alt={`${project.title} — UNIQUOVA Portfolio`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center filter brightness-[0.98] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out rounded-[28px] sm:rounded-[36px] lg:rounded-[44px]"
                />

                {/* Subtle dark bottom fade only visible on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[28px] sm:rounded-[36px] lg:rounded-[44px]" />

                {/* Minimalist Floating Label on Hover */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
                  <div className="bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-white/80">
                    <p className="text-xs sm:text-sm font-bold text-dark">{project.title}</p>
                    <p className="text-[11px] text-primary font-semibold">{project.client}</p>
                  </div>

                  <div className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-primary shadow-md border border-white/80">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/75 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl border border-border max-h-[92vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 text-dark-muted hover:text-dark font-bold text-lg p-2 rounded-full hover:bg-softBg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                {selectedProject.category}
              </span>
              <span className="text-dark-muted">•</span>
              <span className="text-xs font-semibold text-dark-muted">{selectedProject.client}</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-dark mb-4 leading-tight">
              {selectedProject.title}
            </h3>

            {/* Modal Image Showcase */}
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden mb-6 border border-border/80 shadow-md">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-dark/85 backdrop-blur-md text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/20">
                {selectedProject.impact}
              </div>
            </div>

            <p className="text-sm sm:text-base text-dark-muted leading-relaxed mb-6 font-normal">
              {selectedProject.description}
            </p>

            {/* Metrics Showcase */}
            <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-[#FAF9FF] border border-border/80 mb-6">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="text-center border-r border-border/60 last:border-r-0 px-2">
                  <p className="text-base sm:text-xl font-black text-primary font-mono">{m.value}</p>
                  <p className="text-[11px] text-dark-muted font-medium mt-0.5">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Stack Chips */}
            <div className="mb-6">
              <h4 className="text-xs font-bold uppercase tracking-wider text-dark mb-2.5">
                Architecture & Core Tech Stack
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-3 py-1 rounded-lg bg-softBg text-dark border border-border/80"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4 border-t border-border">
              <Link
                href="/our-work"
                onClick={() => setSelectedProject(null)}
                className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white text-sm font-bold shadow-md shadow-primary/20 transition-all text-center"
              >
                <span>🚀 Explore Full Case Study</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => setSelectedProject(null)}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-white hover:bg-softBg text-dark text-sm font-bold border border-border transition-colors text-center"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

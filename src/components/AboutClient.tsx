"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import TeamSection from "@/components/TeamSection";
import ScrollHeading from "@/components/ScrollHeading";
import {
  Sparkles,
  Target,
  Eye,
  Award,
  Users,
  Shield,
  Zap,
  Compass,
  ArrowRight,
  ArrowUpRight,
  Rocket,
  ShieldCheck,
  TrendingUp,
  Layers,
  Code2,
  Lock,
  Clock,
  Sparkle,
} from "lucide-react";

// ====================================================================
// 60FPS SMOOTH ANIMATED COUNTER COMPONENT
// ====================================================================
function AnimatedCounter({
  value,
  suffix = "",
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "20px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startTime = performance.now();

    const update = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = value * ease;
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function AboutClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeStoryTab, setActiveStoryTab] = useState<"origin" | "rigor" | "philosophy">("origin");
  const [valueFilter, setValueFilter] = useState<"all" | "growth" | "craft" | "trust">("all");

  const hallmarks = [
    "🚀 250+ Successful Deployments",
    "⚡ Next.js 14 & Full-Stack Rigor",
    "🛒 Amazon & Flipkart Scaling Specialists",
    "🎯 99.2% On-Time Delivery Record",
    "✨ Pixel-Perfect Conversion Design",
    "🔒 Enterprise-Grade Security & Scalability",
    "📈 3.4x Average Client Revenue ROI",
    "🤝 100% In-House Collective — Zero Outsourcing",
  ];

  const storyContent = {
    origin: {
      tag: "Founding Story",
      title: "Engineering Next-Generation Products with Full Creative Autonomy",
      p1: "UNIQUOVA was founded to bridge the gap between creative branding studios that lack technical rigor and traditional dev shops that neglect conversion-focused design.",
      p2: "We assembled a world-class in-house collective of e-commerce marketplace managers, Next.js full-stack engineers, mobile app developers, and brand architects. By removing intermediaries and unifying these competencies, we provide our clients with an unfair competitive advantage in speed, quality, and measurable ROI.",
      metrics: [
        { label: "Founded On", value: "Strict Craft" },
        { label: "Execution Model", value: "Zero Outsourcing" },
        { label: "Client Model", value: "Dedicated Squads" },
      ],
    },
    rigor: {
      tag: "Code & Architecture",
      title: "Strict Engineering Standards, Zero Technical Debt",
      p1: "Every digital product we engineer starts with a modern architectural blueprint: strict TypeScript typing, headless API architecture, sub-second Edge caching, and automated end-to-end testing.",
      p2: "We never take shortcuts that compromise long-term scalability. By treating performance and accessibility as non-negotiable foundations, our products remain lightning-fast and maintainable as your transaction volume grows 10x.",
      metrics: [
        { label: "Code Quality", value: "100% TypeScript" },
        { label: "API Speed", value: "<150ms TTFB" },
        { label: "Test Coverage", value: "Automated CI/CD" },
      ],
    },
    philosophy: {
      tag: "ROI & Impact",
      title: "Commercial-First Thinking in Every Pixel & Line of Code",
      p1: "A beautiful design that fails to convert is an expensive failure. At UNIQUOVA, we tie every UI decision, animation, and technical optimization to real business KPIs—average order value, conversion rate, and user retention.",
      p2: "Our cross-functional teams work directly alongside your executive stakeholders in shared communication channels, eliminating agency hierarchy and ensuring transparent, rapid, high-impact iteration.",
      metrics: [
        { label: "Target Metric", value: "Conversion Rate" },
        { label: "Collaboration", value: "Shared Slack" },
        { label: "Iteration Speed", value: "Weekly Releases" },
      ],
    },
  };

  const culturalPillars = [
    {
      icon: Code2,
      title: "100% In-House Craft",
      desc: "Zero outsourced code or junior handoffs. Every line of TypeScript, mobile layout, and Figma pixel is engineered by our core collective.",
      badge: "Direct Founder Access",
    },
    {
      icon: Clock,
      title: "14-Day Agile Sprints",
      desc: "Rapid delivery cycles with weekly working software previews, automated CI/CD deployments, and continuous client feedback loops.",
      badge: "Predictable Timelines",
    },
    {
      icon: TrendingUp,
      title: "Commercial-First Architecture",
      desc: "We engineer for revenue: optimizing Core Web Vitals, sub-second TTFB, checkout conversions, and multi-channel marketplace algorithms.",
      badge: "Average 3.4x ROI",
    },
    {
      icon: Lock,
      title: "Enterprise Stability",
      desc: "Enterprise cloud configurations, SOC2-ready security guidelines, strict automated quality assurance, and dedicated post-launch support.",
      badge: "99.99% Uptime SLA",
    },
  ];

  const allCoreValues = [
    {
      title: "Radical Transparency",
      category: "trust",
      desc: "Clear timelines, open source-level honesty, and zero hidden costs or technical jargon.",
      icon: Eye,
    },
    {
      title: "Commercial Focus",
      category: "growth",
      desc: "Design and engineering that directly optimize conversions, ROAS, and recurring customer revenue.",
      icon: Target,
    },
    {
      title: "Craft & Precision",
      category: "craft",
      desc: "Pixel-perfect interfaces, accessible design tokens, and clean, modular production code.",
      icon: Award,
    },
    {
      title: "Speed with Stability",
      category: "craft",
      desc: "Rapid agile development cycles coupled with strict automated quality assurance.",
      icon: Zap,
    },
    {
      title: "Long-Term Partnership",
      category: "growth",
      desc: "We celebrate your victories and continuously iterate post-launch to maintain market leadership.",
      icon: Users,
    },
    {
      title: "Zero Compromise on Security",
      category: "trust",
      desc: "Enterprise-standard data safety, secure APIs, and compliant cloud architectures.",
      icon: Shield,
    },
  ];

  const filteredValues = valueFilter === "all"
    ? allCoreValues
    : allCoreValues.filter((v) => v.category === valueFilter);

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col selection:bg-primary/20 selection:text-primary-dark">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* ============================================================
          HERO SECTION: EXACT ORIGINAL DESIGN WITH SEAMLESS BLURRED ALPHA MASK
          (Photo Reference Match: Full-bleed image fading into white, NO BOX)
          ============================================================ */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 purple-mesh-bg relative overflow-hidden">
        {/* Themed Background Image Layer - Positioned on right with true alpha gradient mask */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div
            className="absolute inset-y-0 right-0 w-full lg:w-3/4 xl:w-7/12 h-full overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)",
            }}
          >
            <img
              src="/images/about_hero_bg.jpg?v=1"
              alt="UNIQUOVA Creative Technology Agency Headquarters & Studio"
              width={1200}
              height={800}
              className="w-full h-full object-cover object-center lg:object-right filter contrast-[1.06] brightness-[1.02]"
            />
            {/* Subtle Brand Theme Tint Overlay */}
            <div className="absolute inset-0 bg-[#7545F5]/[0.03] mix-blend-multiply" />

            {/* Top & Bottom seamless gradient transitions */}
            <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#FAF9FF] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-white via-white/80 to-transparent" />
          </div>

          {/* Subtle geometric dot grid for depth */}
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(#7545F5 1.5px, transparent 1.5px)`,
              backgroundSize: "32px 32px",
            }}
          />

          {/* Ambient Glow Orbs */}
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-light/40 rounded-full blur-3xl" />
        </div>

        {/* Ambient Floating Micro-Badges over Ambient Space */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden xl:flex items-center gap-2.5 bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-primary-200/80 shadow-md absolute bottom-12 right-12 z-20 pointer-events-none"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-left">
            <p className="text-[11px] font-bold text-dark">Studio HQ · Active Operations</p>
            <p className="text-[9px] text-dark-muted font-medium">Delivering 24/7 Global Quality</p>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="hidden lg:flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-primary-200/80 shadow-xs absolute top-28 right-8 xl:right-24 z-20 pointer-events-none"
        >
          <Zap className="w-3.5 h-3.5 text-primary" />
          <span className="text-[11px] font-extrabold text-primary">Top 1% Next.js &amp; App Rigor</span>
        </motion.div>

        {/* Hero Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl">
            {/* Animated Badge with pulsing dot */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center gap-2.5 bg-white/95 backdrop-blur-md border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-xs"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <Sparkles className="w-3.5 h-3.5" />
              <span>About UNIQUOVA · Creative Tech Collective</span>
            </motion.div>

            {/* Headline with Staggered Entrance */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-[1.12] mb-6"
            >
              Empowering Visionary Brands in the{" "}
              <span className="gradient-text">Digital Era.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed mb-8"
            >
              We are a full-service creative technology agency helping startups, e-commerce brands,
              and expanding enterprises turn bold visions into dominant digital products.
            </motion.p>

            {/* Interactive Quick-Scroll Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4"
            >
              <a
                href="#story"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-6 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-glow-md hover:-translate-y-0.5 transition-all duration-300 group"
              >
                <span>Explore Our Story</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#our-team"
                className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-dark hover:text-primary px-6 py-3.5 rounded-2xl font-bold text-sm border border-border/80 shadow-xs hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Users className="w-4 h-4 text-primary" />
                <span>Meet The Leadership</span>
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTINUOUS FLOWING HALLMARKS TICKER ("CHALTE HUE AAYE")
          - Seamless continuous infinite marquee
          - Pauses on hover
          - Soft gradient fade edges
          ============================================================ */}
      <div className="w-full bg-[#FAF9FF] border-y border-border/70 py-4 overflow-hidden relative group">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#FAF9FF] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#FAF9FF] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max space-x-6 animate-marquee group-hover:[animation-play-state:paused]">
          {[...hallmarks, ...hallmarks].map((item, idx) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-2xl bg-white border border-border/80 shadow-xs flex items-center gap-2.5 text-xs sm:text-sm font-bold text-dark whitespace-nowrap hover:border-primary/40 hover:text-primary transition-colors cursor-default"
            >
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ============================================================
          OUR STORY & ORIGIN WITH INTERACTIVE TABS & METRIC CARDS
          ============================================================ */}
      <section id="story" className="py-24 bg-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-14 sm:mb-16"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Heritage &amp; Mission</span>
              </div>
            }
            title={
              <>
                Built on the Belief that <span className="gradient-text">Quality Drives Growth</span>
              </>
            }
            subtitle="How an obsession with craftsmanship, technical rigor, and measurable commercial impact shaped UNIQUOVA."
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Interactive Tabbed Narrative */}
            <div className="lg:col-span-6 space-y-6">
              {/* Interactive Story Tab Switcher */}
              <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[#FAF9FF] border border-border/80 w-fit">
                {([
                  { id: "origin", label: "Our Origin" },
                  { id: "rigor", label: "Engineering Rigor" },
                  { id: "philosophy", label: "Commercial Focus" },
                ] as const).map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveStoryTab(tab.id)}
                    className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                      activeStoryTab === tab.id ? "text-white" : "text-dark-muted hover:text-dark"
                    }`}
                  >
                    {activeStoryTab === tab.id && (
                      <motion.div
                        layoutId="storyTabBg"
                        className="absolute inset-0 bg-primary rounded-xl shadow-xs"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Animated Tab Content */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStoryTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-4"
                >
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full uppercase tracking-wider">
                    <Sparkle className="w-3 h-3" />
                    <span>{storyContent[activeStoryTab].tag}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight leading-tight">
                    {storyContent[activeStoryTab].title}
                  </h3>

                  <p className="text-base text-dark-muted leading-relaxed">
                    {storyContent[activeStoryTab].p1}
                  </p>

                  <p className="text-base text-dark-muted leading-relaxed">
                    {storyContent[activeStoryTab].p2}
                  </p>

                  {/* Micro Highlights */}
                  <div className="grid grid-cols-3 gap-3 pt-3">
                    {storyContent[activeStoryTab].metrics.map((m, i) => (
                      <div key={i} className="p-3 rounded-xl bg-[#FAF9FF] border border-border/80">
                        <p className="text-[10px] uppercase font-bold text-dark-muted tracking-wider">{m.label}</p>
                        <p className="text-xs sm:text-sm font-extrabold text-primary mt-0.5">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* 3 Interactive Metric Cards with Counter Animation & Hover Lift */}
              <div className="pt-6 grid grid-cols-3 gap-3 sm:gap-4 border-t border-border">
                {/* Metric 1 */}
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-border/80 hover:border-primary/50 hover:bg-white hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 cursor-default group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Rocket className="w-4 h-4" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-primary font-mono group-hover:scale-105 transition-transform origin-left">
                    <AnimatedCounter value={250} suffix="+" />
                  </p>
                  <p className="text-xs text-dark-muted mt-1 font-semibold group-hover:text-dark transition-colors">
                    Projects Shipped
                  </p>
                  <div className="w-full bg-primary/10 h-1 rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="bg-primary h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-border/80 hover:border-primary/50 hover:bg-white hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 cursor-default group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-primary font-mono group-hover:scale-105 transition-transform origin-left">
                    <AnimatedCounter value={99.2} decimals={1} suffix="%" />
                  </p>
                  <p className="text-xs text-dark-muted mt-1 font-semibold group-hover:text-dark transition-colors">
                    On-Time Delivery
                  </p>
                  <div className="w-full bg-primary/10 h-1 rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "99.2%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
                      className="bg-primary h-full rounded-full"
                    />
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-2xl bg-[#FAF9FF] border border-border/80 hover:border-primary/50 hover:bg-white hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 cursor-default group relative overflow-hidden">
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-primary font-mono group-hover:scale-105 transition-transform origin-left">
                    <AnimatedCounter value={3.4} decimals={1} suffix="x" />
                  </p>
                  <p className="text-xs text-dark-muted mt-1 font-semibold group-hover:text-dark transition-colors">
                    Average Client ROI
                  </p>
                  <div className="w-full bg-primary/10 h-1 rounded-full mt-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "88%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                      className="bg-primary h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Mission & Vision Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="bg-gradient-to-tr from-primary-light via-[#F7F4FF] to-white p-8 sm:p-10 rounded-3xl border border-border/80 shadow-lg relative overflow-hidden group hover:shadow-xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                <div className="flex items-center gap-3.5 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-glow-sm">
                    <Target className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-dark">
                      Our Operating North Star
                    </h3>
                    <p className="text-xs text-dark-muted font-medium">
                      Why we build, design and scale
                    </p>
                  </div>
                </div>

                <div className="space-y-5 relative z-10">
                  {/* Mission Box */}
                  <div className="bg-white p-6 rounded-2xl border border-border shadow-xs hover:shadow-card-hover hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 cursor-default group/box">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                      <span>Our Mission</span>
                    </p>
                    <p className="text-sm text-dark-muted leading-relaxed mb-4">
                      To empower ambitious businesses worldwide with high-performing e-commerce ecosystems,
                      bulletproof software architectures, and compelling brand storytelling that converts visitors into lifelong advocates.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["High-Converting UI", "Zero Tech Debt", "Direct Founder Access"].map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold bg-primary-light text-primary px-2.5 py-0.5 rounded-full border border-primary-200/50">
                          ✓ {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Vision Box */}
                  <div className="bg-white p-6 rounded-2xl border border-border shadow-xs hover:shadow-card-hover hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 cursor-default group/box">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#6030E4]" />
                      <span>Our Vision</span>
                    </p>
                    <p className="text-sm text-dark-muted leading-relaxed mb-4">
                      To become the global benchmark for creative technology agencies—where aesthetic elegance,
                      engineering brilliance, and commercial profitability operate in total harmony.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Global Standard", "Scalable Growth", "In-House Collective"].map((tag) => (
                        <span key={tag} className="text-[11px] font-semibold bg-[#6030E4]/10 text-[#6030E4] px-2.5 py-0.5 rounded-full border border-[#6030E4]/20">
                          ★ {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          INTERACTIVE BENTO SHOWCASE: 4 CULTURAL & ENGINEERING PILLARS
          ============================================================ */}
      <section className="py-20 bg-white relative overflow-hidden border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-14"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Layers className="w-3.5 h-3.5" />
                <span>How We Operate</span>
              </div>
            }
            title={
              <>
                The Pillars of Our <span className="gradient-text">Engineering Culture</span>
              </>
            }
            subtitle="Four non-negotiable operational principles that separate UNIQUOVA from traditional agencies."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalPillars.map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#FAF9FF] hover:bg-white rounded-3xl p-6 sm:p-7 border border-border/80 hover:border-primary/50 shadow-xs hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-[#6030E4] to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white text-primary flex items-center justify-center mb-5 shadow-xs border border-border group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors mb-2.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-muted leading-relaxed mb-6">
                    {pillar.desc}
                  </p>
                </div>
                <div className="pt-4 border-t border-border/60">
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-primary bg-primary-light/60 px-3 py-1 rounded-full border border-primary-200/50">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{pillar.badge}</span>
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR CORE VALUES WITH INTERACTIVE CATEGORY FILTER & HOVER LIFT
          ============================================================ */}
      <section className="py-24 bg-[#FAF9FF] relative overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-0 w-96 h-96 bg-primary-light/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollHeading
            className="mb-10 sm:mb-12"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Shield className="w-3.5 h-3.5" />
                <span>Our Core Principles</span>
              </div>
            }
            title={
              <>
                Values Engineered for <span className="gradient-text">Excellence</span>
              </>
            }
            subtitle="The fundamental commitments that guide every client interaction, line of code, and creative deliverable."
          />

          {/* Interactive Value Filter Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-white border border-border/80 shadow-xs gap-1.5">
              {([
                { id: "all", label: "All Values (6)" },
                { id: "growth", label: "Commercial Growth" },
                { id: "craft", label: "Engineering Craft" },
                { id: "trust", label: "Trust & Security" },
              ] as const).map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setValueFilter(tab.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    valueFilter === tab.id ? "text-white" : "text-dark-muted hover:text-dark"
                  }`}
                >
                  {valueFilter === tab.id && (
                    <motion.div
                      layoutId="valueFilterTab"
                      className="absolute inset-0 bg-primary rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredValues.map((val, idx) => {
                const Icon = val.icon;
                const formattedNumber = `0${idx + 1}`;
                return (
                  <motion.div
                    key={val.title}
                    layout
                    initial={{ opacity: 0, scale: 0.92, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white rounded-3xl p-8 border border-border shadow-sm hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Subtle Top Border Highlight on Hover */}
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary to-[#6030E4] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs border border-primary-200/50">
                          <Icon className="w-6 h-6 transition-transform group-hover:rotate-6" />
                        </div>
                        <span className="text-3xl font-black font-mono text-dark/15 group-hover:text-primary/30 transition-colors">
                          {formattedNumber}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-dark group-hover:text-primary transition-colors mb-3">
                        {val.title}
                      </h3>
                      <p className="text-sm text-dark-muted leading-relaxed">
                        {val.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-semibold text-primary/70 group-hover:text-primary transition-colors">
                      <span>Core Commitment</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          OUR TEAM SECTION
          ============================================================ */}
      <TeamSection />

      {/* ============================================================
          CONTACT CTA SECTION
          ============================================================ */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

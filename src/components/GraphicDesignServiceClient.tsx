"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollHeading from "@/components/ScrollHeading";
import {
  Palette,
  PenTool,
  Sparkles,
  TrendingUp,
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck,
  Maximize2,
  Zap,
  Layout,
  Eye,
  Award,
  HelpCircle,
  Shapes,
  Sliders,
  Send,
} from "lucide-react";

export default function GraphicDesignServiceClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeFormat, setActiveFormat] = useState<"square" | "story" | "banner">("square");
  const [activeTab, setActiveTab] = useState<"social" | "3d" | "collateral" | "branding">("social");
  const [selectedPantone, setSelectedPantone] = useState<number>(0);

  const pantoneSwatches = [
    {
      name: "PANTONE 2665 C",
      colorName: "UNIQUOVA Royal Purple",
      hex: "#7545F5",
      cmyk: "C:74 M:81 Y:0 K:0",
      textColor: "text-white",
    },
    {
      name: "PANTONE Black 6 C",
      colorName: "Obsidian Charcoal",
      hex: "#151323",
      cmyk: "C:0 M:0 Y:0 K:100",
      textColor: "text-white",
    },
    {
      name: "PANTONE 2635 C",
      colorName: "Lavender Mist",
      hex: "#F3EFFF",
      cmyk: "C:5 M:8 Y:0 K:0",
      textColor: "text-dark",
    },
  ];

  const formatDimensions = {
    square: {
      label: "1:1 Square (Meta / IG Feed)",
      ratioText: "1080 × 1080 px · 1:1 Square",
      containerClass: "w-full max-w-[340px] h-[340px] mx-auto",
    },
    story: {
      label: "9:16 Vertical (Stories / Reels)",
      ratioText: "1080 × 1920 px · 9:16 Vertical",
      containerClass: "w-full max-w-[260px] h-[390px] mx-auto",
    },
    banner: {
      label: "16:9 Display (Web / Ad Banners)",
      ratioText: "1920 × 1080 px · 16:9 Landscape",
      containerClass: "w-full max-w-[440px] h-[250px] mx-auto",
    },
  };

  const disciplines = {
    social: {
      badge: "High-CTR Social Ads",
      title: "Performance Ad Creatives & Social Stacks",
      desc: "Scroll-stopping static ads, carousel slides, and video cover thumbnails designed specifically to lower CPA and maximize conversion velocity across Meta, Google, and LinkedIn.",
      metrics: [
        { label: "Average CTR Lift", value: "+64%" },
        { label: "Turnaround Time", value: "<24-48 hrs" },
        { label: "A/B Variants Included", value: "3-5 per ASIN" },
      ],
      deliverables: [
        "Instagram & Facebook Feed Creatives (1:1 & 4:5)",
        "Story & Reel High-Impact Vertical Posters (9:16)",
        "Multi-Slide High-Retention Educational Carousels",
        "Google Performance Max & Display Network Banners",
      ],
    },
    "3d": {
      badge: "Photorealistic 3D Renders",
      title: "3D Product Mockups & Hero Visuals",
      desc: "Studio-grade photorealistic 3D packaging renders, exploded product component views, and dynamic lighting scenes that eliminate the need for expensive physical photography.",
      metrics: [
        { label: "Render Quality", value: "4K / 300 DPI" },
        { label: "Lighting Setups", value: "Custom Studio" },
        { label: "Asset Formats", value: "PSD, PNG, WebP" },
      ],
      deliverables: [
        "Amazon & Flipkart Main Image Hero White-Background Renders",
        "3D Lifestyle Scene Compositions & Contextual Staging",
        "Transparent PNG Cutouts with Drop Shadows & Ambient Occlusion",
        "Custom Packaging Box, Bottle, and Foil Mockups",
      ],
    },
    collateral: {
      badge: "Executive Presentations",
      title: "Marketing Collateral & Pitch Decks",
      desc: "Investor-ready pitch presentations, corporate one-pagers, sales brochures, and whitepaper PDF layouts engineered with typographic clarity and persuasive visual pacing.",
      metrics: [
        { label: "Page Length", value: "10-40+ Slides" },
        { label: "Visual Polish", value: "C-Suite Ready" },
        { label: "Formats", value: "Figma, PDF, PPT" },
      ],
      deliverables: [
        "Investor Pitch Decks with Dynamic Chart Data Visuals",
        "Interactive Digital Product Catalogs & Lookbooks",
        "Print-Ready Commercial Brochures & Tri-folds",
        "Corporate Brand One-Pagers & Fact Sheets",
      ],
    },
    branding: {
      badge: "Identity Systems",
      title: "Packaging Die-Lines & Print Collateral",
      desc: "Full vector print packaging layouts, box die-lines, foil-stamped labels, business stationery, and brand merchandise ready for flawless physical manufacturing.",
      metrics: [
        { label: "Color Space", value: "CMYK & Spot" },
        { label: "Die-Line Precision", value: "Exact Millimeters" },
        { label: "Vector Scalability", value: "Infinite" },
      ],
      deliverables: [
        "Manufacturing-Ready Product Box & Pouch Die-lines",
        "Premium Foil-Stamp & Emboss Vector Separation Layers",
        "Executive Stationery (Business Cards, Letterheads, Envelopes)",
        "Large-Format Exhibition Banners & Trade Show Backdrops",
      ],
    },
  };

  const currentDiscipline = disciplines[activeTab];

  const craftPillars = [
    {
      icon: Layout,
      title: "Mathematical Visual Hierarchy",
      desc: "We build layouts around focal point anchoring and typographic golden ratios, directing the viewer's eye to your primary value proposition in under 0.8 seconds.",
      badge: "Eye-Tracking Tested",
    },
    {
      icon: Palette,
      title: "Color Psychology & Contrast Ratio",
      desc: "Strategic Pantone, RGB, and CMYK color calibration engineered to pop against crowded social feeds while maintaining strict WCAG AA contrast legibility.",
      badge: "300 DPI Precision",
    },
    {
      icon: Sliders,
      title: "Multi-Platform Asset Matrix",
      desc: "Never stretch or crop. Every creative is natively adapted across 1:1 square, 9:16 vertical, and 16:9 banner formats with tailored typographic scaling.",
      badge: "Zero Distortion",
    },
    {
      icon: Zap,
      title: "Agile On-Demand Design Sprints",
      desc: "Collaborate directly with our Art Directors via shared Slack channels. Get rapid 24-48 hour turnaround on active creative sprints with 100% source file ownership.",
      badge: "Direct Art Director Access",
    },
  ];

  const faqs = [
    {
      q: "Do we receive the original editable source files?",
      a: "Yes, 100%. Upon project completion, you receive full editable source files (Figma, Adobe Illustrator .AI, Photoshop .PSD) along with production-ready WebP and print-ready high-res PNG/PDF files with zero licensing lock-in.",
    },
    {
      q: "How many revisions are included in a design sprint?",
      a: "Our standard sprints include iterative feedback loops until you are completely satisfied with the visual direction. Because we establish moodboards and structural wireframes upfront, final revisions are fast and aligned.",
    },
    {
      q: "Can you create 3D product renders if we don't have existing CAD files?",
      a: "Yes. Our 3D team can model realistic bottles, boxes, packaging pouches, and consumer electronics using simple 2D reference photos and label artwork.",
    },
    {
      q: "How fast is your turnaround time for monthly retainer clients?",
      a: "For clients on our monthly design retainer, standard static creatives and social ad variants are typically turned around in 24 to 48 hours, with priority same-day delivery for emergency promotional campaigns.",
    },
    {
      q: "Do your creatives comply with advertising policies on Meta and Google?",
      a: "Strictly. We adhere to all Meta, Google Ads, and marketplace advertising guidelines, maintaining safe text-to-image ratios, prohibited claim avoidance, and high conversion clickability.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col selection:bg-primary/20 selection:text-primary-dark">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* ============================================================
          SECTION 1: HERO — THE INTERACTIVE ARTBOARD & VECTOR STUDIO
          ============================================================ */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 purple-mesh-bg relative overflow-hidden">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[520px] bg-gradient-to-tr from-primary/15 via-[#8F63FF]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-primary-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Strategic Creative Copy */}
            <div className="lg:col-span-6 flex flex-col items-start">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
                <Palette className="w-3.5 h-3.5 text-primary" />
                <span>Commercial Creative Studio &amp; Visual Systems</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight text-dark leading-[1.12] mb-6">
                Creatives Engineered to Stop the Scroll &amp;{" "}
                <span className="bg-gradient-to-r from-primary via-[#6030E4] to-primary-dark bg-clip-text text-transparent">
                  Accelerate Conversions.
                </span>
              </h1>

              {/* Tagline */}
              <p className="text-lg sm:text-xl text-primary font-bold mb-4">
                High-Impact Social Ads, 3D Product Renders, and Multi-Platform Visual Systems.
              </p>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-dark-muted font-normal leading-relaxed mb-8 max-w-xl">
                We engineer pixel-perfect, conversion-focused graphic assets—from high-CTR Meta &amp; Google ad variants
                to investor pitch decks, packaging die-lines, and 3D product visualizations that demand attention.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-md hover:shadow-glow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Book a Design Sprint</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <a
                  href="#formats-matrix"
                  className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-dark hover:text-primary px-6 py-4 rounded-2xl font-bold text-sm border border-border/80 shadow-xs hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Shapes className="w-4 h-4 text-primary" />
                  <span>View Formats &amp; Deliverables</span>
                </a>
              </div>

              {/* Trust Metric Chips */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/80 w-full max-w-lg">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-primary font-mono">+64%</p>
                  <p className="text-xs text-dark-muted font-semibold mt-0.5">Average CTR Lift</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-primary font-mono">300 DPI</p>
                  <p className="text-xs text-dark-muted font-semibold mt-0.5">Vector Precision</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-primary font-mono">&lt;48 hrs</p>
                  <p className="text-xs text-dark-muted font-semibold mt-0.5">Sprint Turnaround</p>
                </div>
              </div>
            </div>

            {/* Right Column: The Interactive Designer's Artboard */}
            <div className="lg:col-span-6 relative">
              <div className="relative w-full max-w-lg mx-auto select-none">
                {/* Glow Backdrop */}
                <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />
                <div className="absolute w-56 h-56 bg-primary-dark/15 rounded-full blur-2xl pointer-events-none -bottom-8 -left-8" />

                {/* Designer Cursor Pill */}
                <motion.div
                  animate={{ x: [0, 8, 0], y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-3.5 right-8 z-30 flex items-center gap-1.5 bg-[#7545F5] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-md pointer-events-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Mayoor G. · Creative Lead</span>
                </motion.div>

                {/* Main Artboard Card */}
                <div className="relative w-full bg-white/95 backdrop-blur-xl border border-primary/25 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(117,69,245,0.14)] z-10">
                  {/* Top Canvas Bar: Dimension Tag & Format Switcher */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border/70 mb-5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[11px] font-mono font-bold text-dark-muted">
                        {formatDimensions[activeFormat].ratioText}
                      </span>
                    </div>

                    {/* Format Switcher Pills */}
                    <div className="flex items-center gap-1 bg-softBg p-1 rounded-xl border border-border/80">
                      {(["square", "story", "banner"] as const).map((fmt) => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => setActiveFormat(fmt)}
                          className={`text-[10px] font-bold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                            activeFormat === fmt
                              ? "bg-primary text-white shadow-xs"
                              : "text-dark-muted hover:text-dark"
                          }`}
                        >
                          {fmt === "square" ? "1:1" : fmt === "story" ? "9:16" : "16:9"}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Dynamic Interactive Artboard Canvas */}
                  <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    className={`relative rounded-2xl p-5 overflow-hidden flex flex-col justify-between transition-all duration-500 border border-primary/20 ${formatDimensions[activeFormat].containerClass}`}
                    style={{
                      background: "linear-gradient(135deg, #151323 0%, #2A1F4D 60%, #5030C7 100%)",
                    }}
                  >
                    {/* Bounding Box Corner Guides */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t-2 border-l-2 border-primary/80" />
                    <div className="absolute top-2 right-2 w-2 h-2 border-t-2 border-r-2 border-primary/80" />
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b-2 border-l-2 border-primary/80" />
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b-2 border-r-2 border-primary/80" />

                    {/* Ambient Artboard Glow */}
                    <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-primary/30 rounded-full blur-2xl pointer-events-none" />

                    {/* Artboard Content Header */}
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200 bg-white/10 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
                        Performance Creative
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-300 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-md backdrop-blur-sm">
                        <TrendingUp className="w-3 h-3 text-emerald-300" />
                        +64% CTR
                      </span>
                    </div>

                    {/* Vector Bézier Curve Animation (The Hallmark of Vector Precision) */}
                    <div className="my-auto py-2 relative z-10">
                      <svg className="w-full h-20 overflow-visible" viewBox="0 0 320 70">
                        {/* Bézier Vector Path */}
                        <motion.path
                          d="M 15 55 C 80 12, 140 70, 220 22 S 290 32, 305 32"
                          fill="none"
                          stroke="#C4ACFD"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                        />

                        {/* Tangent Guide Line 1 */}
                        <line x1="15" y1="55" x2="80" y2="12" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        <circle cx="80" cy="12" r="3" fill="#A78BFA" />

                        {/* Anchor Point 1 (Vector Square Node) */}
                        <rect x="12" y="52" width="6" height="6" fill="#fff" stroke="#7545F5" strokeWidth="2" />

                        {/* Tangent Guide Line 2 */}
                        <line x1="140" y1="70" x2="220" y2="22" stroke="#A78BFA" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                        <circle cx="140" cy="70" r="3" fill="#A78BFA" />

                        {/* Anchor Point 2 (Vector Square Node) */}
                        <rect x="217" y="19" width="6" height="6" fill="#fff" stroke="#7545F5" strokeWidth="2" />

                        {/* Floating Pen Tool Cursor */}
                        <motion.g
                          animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                          <circle cx="220" cy="22" r="8" fill="rgba(117, 69, 245, 0.3)" />
                        </motion.g>
                      </svg>
                      
                      <div className="text-center mt-1">
                        <p className="text-xs font-black text-white tracking-wide">
                          Scalable Vector Geometry &bull; 300 DPI
                        </p>
                      </div>
                    </div>

                    {/* Artboard Footer Info */}
                    <div className="relative z-10 flex items-center justify-between text-[10px] text-purple-200/80 pt-2 border-t border-white/10">
                      <span>Grid: 8pt Baseline</span>
                      <span className="font-mono text-white/90">Figma &bull; AI &bull; PSD</span>
                    </div>
                  </motion.div>

                  {/* Pantone Color Palette Chips (Interactive Swatch Selector) */}
                  <div className="mt-5 pt-4 border-t border-border/70">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-dark-muted">
                        Pantone &amp; Color Calibration System
                      </span>
                      <span className="text-[10px] font-mono text-primary font-bold">
                        {pantoneSwatches[selectedPantone].cmyk}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2.5">
                      {pantoneSwatches.map((swatch, idx) => (
                        <div
                          key={swatch.name}
                          onClick={() => setSelectedPantone(idx)}
                          className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                            selectedPantone === idx
                              ? "border-primary shadow-sm ring-2 ring-primary/20 scale-[1.02]"
                              : "border-border/70 hover:border-primary/40 bg-white"
                          }`}
                        >
                          <div
                            className="w-full h-7 rounded-lg mb-2 shadow-xs"
                            style={{ backgroundColor: swatch.hex }}
                          />
                          <p className="text-[10px] font-extrabold text-dark truncate">{swatch.name}</p>
                          <p className="text-[9px] font-mono text-dark-muted">{swatch.hex}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating Glass Pill: Top Left */}
                <div className="hidden sm:flex absolute -top-4 -left-5 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2 px-3.5 shadow-md items-center gap-2 z-20 animate-float">
                  <div className="w-7 h-7 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-xs">
                    <PenTool className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-dark">Bézier Precision</p>
                    <p className="text-[9px] text-dark-muted font-semibold">100% Vector Scalable</p>
                  </div>
                </div>

                {/* Floating Glass Pill: Bottom Right */}
                <div className="hidden sm:flex absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl py-2 px-3.5 shadow-md items-center gap-2 z-20 animate-float-slow pointer-events-none select-none">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-[11px] font-bold text-dark">Zero Canva Templates</p>
                    <p className="text-[9px] text-dark-muted font-semibold">100% Custom Agency Craft</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CREATIVE FORMATS & CANVAS MATRIX (INTERACTIVE TABS)
          ============================================================ */}
      <section id="formats-matrix" className="py-24 bg-white relative overflow-hidden border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-12"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Format Creative Engine</span>
              </div>
            }
            title={
              <>
                Comprehensive Visual <span className="gradient-text">Design Matrix</span>
              </>
            }
            subtitle="From high-CTR performance social ad suites to luxury 3D product packaging and executive investor pitch decks."
          />

          {/* Interactive Discipline Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF9FF] border border-border/80 shadow-xs gap-1.5 max-w-full overflow-x-auto">
              {[
                { id: "social", label: "📱 Performance Social Ads", short: "Social Ads" },
                { id: "3d", label: "📦 3D Product Mockups", short: "3D Renders" },
                { id: "collateral", label: "📄 Pitch Decks & Brochures", short: "Decks" },
                { id: "branding", label: "🎨 Packaging & Print Die-lines", short: "Packaging" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id ? "text-white" : "text-dark-muted hover:text-dark"
                  }`}
                >
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="designTabBg"
                      className="absolute inset-0 bg-primary rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Discipline Breakdown */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="bg-[#FAF9FF] rounded-3xl p-8 sm:p-12 border border-border/80 shadow-sm"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/80 mb-8">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary-light px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>{currentDiscipline.badge}</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                    {currentDiscipline.title}
                  </h3>
                  <p className="text-sm sm:text-base text-dark-muted leading-relaxed mt-2 max-w-2xl">
                    {currentDiscipline.desc}
                  </p>
                </div>

                {/* 3 Metric Badges */}
                <div className="flex items-center gap-4 sm:gap-6 bg-white p-4 rounded-2xl border border-border/80 shadow-xs shrink-0">
                  {currentDiscipline.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-xl sm:text-2xl font-black text-primary font-mono">{m.value}</p>
                      <p className="text-[11px] text-dark-muted font-semibold mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deliverables Checklist */}
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-dark mb-4">
                  Tangible Deliverables Included in this Track:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                  {currentDiscipline.deliverables.map((del, dIdx) => (
                    <div
                      key={dIdx}
                      className="bg-white p-4 rounded-xl border border-border flex items-start gap-3 shadow-xs"
                    >
                      <div className="w-6 h-6 rounded-lg bg-primary-light text-primary flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-dark leading-snug">{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-border/80">
                <span className="text-xs text-dark-muted font-medium">
                  Delivered with editable Figma, AI, and PSD source files with full intellectual property ownership.
                </span>
                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-dark hover:bg-primary text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
                >
                  <span>Inquire for {currentDiscipline.badge}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: THE CRAFT PHILOSOPHY (BENTO GRID)
          ============================================================ */}
      <section className="py-24 bg-[#FAF9FF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-16"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Award className="w-3.5 h-3.5" />
                <span>The UNIQUOVA Standard</span>
              </div>
            }
            title={
              <>
                Engineered for Commercial <span className="gradient-text">Impact</span>
              </>
            }
            subtitle="Four non-negotiable principles that separate our commercial graphic designs from amateur visual noise."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {craftPillars.map((pillar, idx) => (
              <div
                key={pillar.title}
                className="bg-white rounded-3xl p-7 border border-border shadow-sm hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-[#6030E4] to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary-light text-primary flex items-center justify-center mb-5 shadow-xs border border-primary-200/50 group-hover:bg-primary group-hover:text-white group-hover:scale-110 transition-all duration-300">
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
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: 4-STAGE CREATIVE SPRINT WORKFLOW
          ============================================================ */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-16"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <FileCheck className="w-3.5 h-3.5" />
                <span>Predictable Sprints</span>
              </div>
            }
            title={
              <>
                Our 4-Stage Creative <span className="gradient-text">Sprint Workflow</span>
              </>
            }
            subtitle="How we take complex marketing briefs from concept to high-converting production assets in under 48 hours."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Brief & Moodboard Discovery",
                desc: "We analyze your audience demographic, competitor ads, and campaign objectives, creating a targeted visual moodboard before pushing a single pixel.",
              },
              {
                step: "02",
                title: "Structural Layout & Blueprint",
                desc: "Establishing grid hierarchy, focal point positioning, and typography balance to guarantee instant cognitive legibility on mobile viewports.",
              },
              {
                step: "03",
                title: "High-Fidelity Render & Styling",
                desc: "Injecting Pantone color theory, custom 3D lighting, drop shadows, and high-CTR call-to-action treatments across all requested aspect ratios.",
              },
              {
                step: "04",
                title: "Production Export & Handoff",
                desc: "Full delivery of optimized WebP, PNG, and print-ready PDF files alongside editable Figma/AI source archives ready for immediate campaign deployment.",
              },
            ].map((wf) => (
              <div
                key={wf.step}
                className="p-7 rounded-3xl bg-[#FAF9FF] border border-border hover:border-primary/40 transition-all flex flex-col justify-between group hover:-translate-y-1.5 duration-300"
              >
                <div>
                  <span className="text-3xl font-black text-primary/40 group-hover:text-primary transition-colors mb-4 block font-mono">
                    {wf.step}
                  </span>
                  <h3 className="text-lg font-bold text-dark group-hover:text-primary transition-colors mb-2">
                    {wf.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-dark-muted leading-relaxed">
                    {wf.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: GRAPHIC DESIGN FAQS
          ============================================================ */}
      <section className="py-24 bg-[#FAF9FF] relative overflow-hidden border-t border-border/70">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Common Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-3">
              Graphic Design <span className="gradient-text">FAQs</span>
            </h2>
            <p className="text-sm text-dark-muted">
              Everything you need to know about our visual design process, source file delivery, and turnaround times.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-border p-6 shadow-xs hover:border-primary/40 transition-colors"
              >
                <h3 className="text-base font-bold text-dark mb-2">{faq.q}</h3>
                <p className="text-sm text-dark-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: INQUIRY CTA & MODAL
          ============================================================ */}
      <section className="py-20 bg-white relative overflow-hidden border-t border-border/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-tr from-primary to-primary-dark rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="max-w-2xl mx-auto relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 px-3.5 py-1 rounded-full uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Ready to Elevate Your Visual Identity?</span>
              </span>

              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
                Start Your Next Design Sprint with UNIQUOVA.
              </h2>

              <p className="text-base text-purple-100 mb-8 leading-relaxed">
                Whether you need high-CTR social ad creatives, photorealistic 3D product renders, or full brand packaging die-lines, our creative collective is ready to execute.
              </p>

              <button
                type="button"
                onClick={() => setIsContactOpen(true)}
                className="inline-flex items-center gap-2 bg-white text-dark hover:text-primary font-bold text-sm px-9 py-4 rounded-full shadow-lg hover:bg-softBg transition-all duration-300"
              >
                <span>Book a Free Creative Consultation</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService="Graphic Designing"
      />

      <Footer />
    </main>
  );
}

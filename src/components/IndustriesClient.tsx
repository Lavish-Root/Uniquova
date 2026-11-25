"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import { INDUSTRIES_DATA } from "@/data/agencyData";
import {
  ShoppingBag,
  Cpu,
  HeartPulse,
  GraduationCap,
  Sparkles,
  Rocket,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Layers,
  ChevronDown,
} from "lucide-react";

const iconMap = {
  ShoppingBag: ShoppingBag,
  Cpu: Cpu,
  HeartPulse: HeartPulse,
  GraduationCap: GraduationCap,
  Sparkles: Sparkles,
  Rocket: Rocket,
};

const shortNameMap: Record<string, string> = {
  retail: "E-Commerce",
  saas: "Tech & SaaS",
  healthcare: "Healthcare",
  education: "Education",
  fashion: "Fashion",
  startups: "Startups",
};

export default function IndustriesClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [expandedWhy, setExpandedWhy] = useState<Record<string, boolean>>({});

  const toggleWhy = (id: string) => {
    setExpandedWhy((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredIndustries =
    selectedSector === "all"
      ? INDUSTRIES_DATA
      : INDUSTRIES_DATA.filter((ind) => ind.id === selectedSector);

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-40 lg:pb-24 purple-mesh-bg relative overflow-hidden">
        {/* Themed Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Industries Background Image */}
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
              src="/images/industries_hero_bg.jpg?v=4"
              alt="UNIQUOVA Industry Sector Expertise and Enterprise Solutions"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover object-center lg:object-right filter contrast-[1.05] brightness-[1.02]"
            />
            <div className="absolute inset-0 bg-[#7545F5]/[0.03] mix-blend-multiply" />
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF9FF] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/60 to-transparent" />
          </div>

          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(#7545F5 1.5px, transparent 1.5px)`,
              backgroundSize: "32px 32px",
            }}
          />

          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-light/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-4 sm:mb-6">
              Tailored Solutions for Your <br className="hidden sm:inline" />
              <span className="gradient-text">Industry Sector.</span>
            </h1>

            <p className="text-sm sm:text-lg lg:text-xl text-dark-muted font-normal leading-relaxed">
              We engineer specialized digital growth engines calibrated to the unique compliance,
              consumer expectations, and unit economics of each commercial sector.
            </p>
          </div>
        </div>
      </section>

      {/* Sector Trust & Impact Metric Strip */}
      <section className="border-y border-border/70 bg-[#FAF9FF]/80 py-6 sm:py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
            <div className="border-r border-border/50">
              <div className="text-2xl sm:text-4xl font-extrabold text-primary font-mono">6+</div>
              <div className="text-[11px] sm:text-sm text-dark-muted font-medium mt-0.5">Specialized Sectors</div>
            </div>
            <div className="border-r-0 md:border-r border-border/50">
              <div className="text-2xl sm:text-4xl font-extrabold text-dark font-mono">₹10Cr+</div>
              <div className="text-[11px] sm:text-sm text-dark-muted font-medium mt-0.5">Handled Commercial Scale</div>
            </div>
            <div className="border-r border-border/50">
              <div className="text-2xl sm:text-4xl font-extrabold text-primary font-mono">98%</div>
              <div className="text-[11px] sm:text-sm text-dark-muted font-medium mt-0.5">On-Time Production</div>
            </div>
            <div>
              <div className="text-2xl sm:text-4xl font-extrabold text-dark font-mono">100%</div>
              <div className="text-[11px] sm:text-sm text-dark-muted font-medium mt-0.5">Custom Frameworks</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Sector Jump & Filter Bar */}
      <section className="pt-8 pb-4 sm:pt-12 sm:pb-6 bg-white">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          <div className="bg-[#FAF9FF] border border-border/80 rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs">
            <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-dark">
                  Industry Focus Areas
                </span>
                <span className="text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full bg-white text-primary border border-border shadow-2xs">
                  {filteredIndustries.length} {filteredIndustries.length === 1 ? "Sector" : "Sectors"}
                </span>
              </div>
              {selectedSector !== "all" && (
                <button
                  onClick={() => setSelectedSector("all")}
                  className="text-xs font-bold text-primary hover:underline cursor-pointer transition-colors"
                >
                  Show All
                </button>
              )}
            </div>

            {/* Mobile Symmetrical View (sm:hidden): Featured All Sectors on top + 2-Column Grid */}
            <div className="sm:hidden pt-3">
              {/* Featured All Sectors Full-Width Header Pill */}
              <button
                onClick={() => setSelectedSector("all")}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 ${
                  selectedSector === "all"
                    ? "bg-gradient-to-r from-primary to-[#8A5CF6] text-white shadow-md shadow-primary/25 font-bold"
                    : "bg-white text-dark-muted hover:text-dark border border-border/80 shadow-2xs"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Layers
                    className={`w-4 h-4 ${
                      selectedSector === "all" ? "text-white" : "text-primary"
                    }`}
                  />
                  <span className="font-bold">All Sectors Overview</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    selectedSector === "all"
                      ? "bg-white/20 text-white"
                      : "bg-softBg text-dark-muted border border-border/60"
                  }`}
                >
                  6 Sectors
                </span>
              </button>

              {/* 2-Column Balanced Grid for 6 Specialized Sectors (3 rows x 2 columns) */}
              <div className="grid grid-cols-2 gap-2 mt-2">
                {INDUSTRIES_DATA.map((ind) => {
                  const Icon = iconMap[ind.icon as keyof typeof iconMap] || Rocket;
                  const isActive = selectedSector === ind.id;

                  return (
                    <button
                      key={ind.id}
                      onClick={() => setSelectedSector(ind.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer active:scale-95 text-left ${
                        isActive
                          ? "bg-gradient-to-r from-primary to-[#8A5CF6] text-white shadow-md shadow-primary/25 font-bold scale-[1.01] border-transparent"
                          : "bg-white text-dark-muted hover:text-dark border border-border/80 shadow-2xs hover:border-primary/40"
                      }`}
                    >
                      <Icon
                        className={`w-3.5 h-3.5 shrink-0 ${
                          isActive ? "text-white" : "text-primary"
                        }`}
                      />
                      <span className="truncate text-[11px] font-semibold">
                        {shortNameMap[ind.id] || ind.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Tablet & Desktop Horizontal Row (hidden sm:flex) */}
            <div className="hidden sm:flex flex-wrap xl:flex-nowrap items-center justify-start xl:justify-between gap-2 xl:gap-2.5 pt-3">
              <button
                onClick={() => setSelectedSector("all")}
                className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedSector === "all"
                    ? "bg-gradient-to-r from-primary to-[#8A5CF6] text-white shadow-md font-bold"
                    : "bg-white text-dark-muted hover:text-dark border border-border/80 hover:border-primary/40 shadow-2xs"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>All Sectors</span>
              </button>

              {INDUSTRIES_DATA.map((ind) => {
                const Icon = iconMap[ind.icon as keyof typeof iconMap] || Rocket;
                const isActive = selectedSector === ind.id;

                return (
                  <button
                    key={ind.id}
                    onClick={() => setSelectedSector(ind.id)}
                    className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive
                        ? "bg-gradient-to-r from-primary to-[#8A5CF6] text-white shadow-md font-bold"
                        : "bg-white text-dark-muted hover:text-dark border border-border/80 hover:border-primary/40 shadow-2xs"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{ind.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Dives into Industries */}
      <section className="py-8 sm:py-12 lg:py-20 bg-white">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8 space-y-8 sm:space-y-14 lg:space-y-20">
          {filteredIndustries.map((ind, index) => {
            const Icon = iconMap[ind.icon as keyof typeof iconMap] || Rocket;
            const isReversed = index % 2 === 1;
            const isWhyExpanded = !!expandedWhy[ind.id];

            return (
              <div
                id={ind.id}
                key={ind.id}
                className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-12 border border-border/90 hover:border-primary/40 transition-all duration-300 shadow-[0_4px_25px_rgba(117,69,245,0.03)] hover:shadow-[0_12px_40px_rgba(117,69,245,0.08)] group relative overflow-hidden"
              >
                {/* Subtle Ambient Glow */}
                <div
                  className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${ind.accent.bg} rounded-full blur-3xl pointer-events-none -mr-20 -mt-20`}
                />

                {/* MOBILE VISUAL HEADER: Shows at the TOP of the card on mobile for an immediate high-end visual */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-border/70 shadow-sm bg-dark lg:hidden">
                  <img
                    src={ind.image}
                    alt={`${ind.title} Visual Showcase`}
                    width={800}
                    height={500}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-103 transition-transform duration-500 filter contrast-[1.03] brightness-[1.01]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center relative z-10">
                  {/* Left / Content Column */}
                  <div className={`lg:col-span-7 ${isReversed ? "lg:order-2" : "lg:order-1"}`}>
                    {/* Title & Icon Header */}
                    <div className="flex items-center gap-3 sm:gap-3.5 mb-2.5 sm:mb-4">
                      <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#FAF9FF] text-primary flex items-center justify-center shrink-0 shadow-xs border border-border group-hover:scale-105 group-hover:border-primary/40 transition-all duration-300">
                        <Icon className="w-5 h-5 sm:w-7 sm:h-7" />
                      </div>

                      <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-dark tracking-tight">
                        {ind.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-base lg:text-lg text-dark-muted leading-relaxed mb-4 sm:mb-6 font-normal">
                      {ind.description}
                    </p>

                    {/* 3 Verified Commercial Metrics Cards: Compact, punchy 3-column micro-bar */}
                    <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                      {ind.metrics.map((m, mIdx) => (
                        <div
                          key={mIdx}
                          className="bg-[#FAF9FF] border border-border/80 rounded-xl sm:rounded-2xl p-2 sm:p-3.5 text-center transition-colors group-hover:border-primary/20"
                        >
                          <div className="text-base sm:text-2xl font-extrabold text-primary font-mono">
                            {m.value}
                          </div>
                          <div className="text-[9.5px] sm:text-xs font-semibold text-dark-muted mt-0.5 leading-tight">
                            {m.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Key Deliverables: Balanced 2-column grid instead of 4 giant rows */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mb-4 sm:mb-6">
                      {ind.solutions.map((sol) => (
                        <div
                          key={sol}
                          className="flex items-center gap-1.5 sm:gap-2.5 text-[11px] sm:text-sm font-semibold text-dark bg-[#FAF9FF] border border-border/70 rounded-xl px-2.5 py-1.5 sm:px-3 sm:py-2 shadow-2xs min-w-0"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span className="truncate">{sol}</span>
                        </div>
                      ))}
                    </div>

                    {/* MOBILE SMART "WHY UNIQUOVA" SECTION: Clean toggle that saves 180px of vertical space */}
                    <div className="lg:hidden bg-[#FAF9FF] border border-border/80 rounded-2xl p-3 sm:p-4 mb-4">
                      <button
                        type="button"
                        onClick={() => toggleWhy(ind.id)}
                        className="w-full flex items-center justify-between text-xs font-bold text-dark cursor-pointer text-left select-none"
                      >
                        <span className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                          <span>Why UNIQUOVA for {ind.title}</span>
                        </span>
                        <span className="text-[11px] font-bold text-primary shrink-0 flex items-center gap-0.5">
                          <span>{isWhyExpanded ? "Hide" : "Why Us (3)"}</span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 transition-transform duration-200 ${
                              isWhyExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </span>
                      </button>

                      {!isWhyExpanded && (
                        <p className="mt-2 text-[11px] text-dark-muted leading-relaxed line-clamp-1 italic">
                          💡 {ind.whyUniquova[0]}
                        </p>
                      )}

                      {isWhyExpanded && (
                        <ul className="mt-2.5 space-y-2 text-xs text-dark-muted border-t border-border/60 pt-2.5">
                          {ind.whyUniquova.map((why, wIdx) => (
                            <li key={wIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                              <span className="leading-relaxed">{why}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {/* DESKTOP "WHY UNIQUOVA" SECTION: Full, detailed breakdown */}
                    <div className="hidden lg:block bg-[#FAF9FF]/90 rounded-2xl p-5 border border-border/80 mb-6">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-dark mb-3 flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary" />
                        <span>Why UNIQUOVA for {ind.title}</span>
                      </h3>
                      <ul className="space-y-2.5 text-sm text-dark-muted">
                        {ind.whyUniquova.map((why, wIdx) => (
                          <li key={wIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                            <span className="leading-relaxed">{why}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Button: Full-width on mobile, auto on desktop */}
                    <button
                      type="button"
                      onClick={() => setIsContactOpen(true)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-primary to-[#8A5CF6] text-white text-xs sm:text-sm font-bold shadow-[0_4px_15px_rgba(117,69,245,0.25)] hover:shadow-[0_6px_20px_rgba(117,69,245,0.35)] hover:scale-102 transition-all cursor-pointer"
                    >
                      <span>Consult with our {ind.title} Lead</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* DESKTOP-ONLY VISUAL SHOWCASE COLUMN (Hidden on mobile to eliminate duplicate stacked image) */}
                  <div
                    className={`hidden lg:block lg:col-span-5 ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative rounded-3xl overflow-hidden border border-border/80 shadow-lg group-hover:shadow-2xl transition-all duration-500 bg-dark/5 h-[460px] flex items-center justify-center">
                      <img
                        src={ind.image}
                        alt={`${ind.title} Visual Showcase`}
                        width={800}
                        height={600}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter contrast-[1.03] brightness-[1.01]"
                      />
                      {/* Subtle Vignette Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

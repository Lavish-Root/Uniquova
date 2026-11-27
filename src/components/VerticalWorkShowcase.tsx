"use client";

import React, { useState, useEffect, useMemo } from "react";
import { ProjectItem } from "@/data/agencyData";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
  Columns3,
  Rows3,
  Grid3X3,
  CheckCircle2,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VerticalWorkShowcaseProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

type ViewMode = "bento" | "masonry-3" | "masonry-2" | "full";

export default function VerticalWorkShowcase({
  project,
  onClose,
  onOpenContact,
}: VerticalWorkShowcaseProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("masonry-2");

  // Lock body scroll when showcase is open
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [project]);

  // Handle Escape key to close showcase
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, onClose]);

  // Resolve all deliverable images for this project
  const images = useMemo(() => {
    if (!project) return [];
    if (project.gallery && project.gallery.length > 0) {
      return project.gallery;
    }
    return [project.mediaUrl || "/images/services/web_dev_bg.jpg"];
  }, [project]);

  // Parse structured case study description into readable sections
  const parsedDescription = useMemo(() => {
    if (!project?.description) return { leads: [], bullets: [], conclusion: "" };

    const raw = project.description;
    const lines = raw.split("\n");

    const leads: string[] = [];
    const bullets: string[] = [];
    const closing: string[] = [];

    let inScope = false;
    let pastScope = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      if (trimmed.toLowerCase().includes("project scope:") || trimmed.includes("**Project Scope:**")) {
        inScope = true;
        continue;
      }

      if (inScope && !pastScope) {
        if (trimmed.startsWith("-") || trimmed.startsWith("•") || trimmed.startsWith("*")) {
          bullets.push(trimmed.replace(/^[-•*]\s*/, ""));
          continue;
        } else {
          pastScope = true;
        }
      }

      if (pastScope) {
        closing.push(trimmed);
      } else {
        leads.push(trimmed);
      }
    }

    return {
      leads,
      bullets,
      conclusion: closing.join(" "),
    };
  }, [project?.description]);

  // Standard Bento chunker
  const bentoSections = useMemo(() => {
    if (images.length === 0) return [];
    const sections: {
      type: "hero" | "pair" | "triple" | "asymmetric";
      items: { url: string; index: number }[];
    }[] = [];

    let currIdx = 0;
    let cycleStep = 0;

    if (currIdx < images.length) {
      sections.push({
        type: "hero",
        items: [{ url: images[currIdx], index: currIdx }],
      });
      currIdx++;
    }

    while (currIdx < images.length) {
      const remaining = images.length - currIdx;
      const step = cycleStep % 3;

      if (step === 0) {
        const count = Math.min(2, remaining);
        sections.push({
          type: "pair",
          items: images.slice(currIdx, currIdx + count).map((url, i) => ({
            url,
            index: currIdx + i,
          })),
        });
        currIdx += count;
      } else if (step === 1) {
        const count = remaining >= 3 ? 3 : Math.min(2, remaining);
        sections.push({
          type: "triple",
          items: images.slice(currIdx, currIdx + count).map((url, i) => ({
            url,
            index: currIdx + i,
          })),
        });
        currIdx += count;
      } else {
        const count = Math.min(2, remaining);
        sections.push({
          type: "asymmetric",
          items: images.slice(currIdx, currIdx + count).map((url, i) => ({
            url,
            index: currIdx + i,
          })),
        });
        currIdx += count;
      }
      cycleStep++;
    }

    return sections;
  }, [images]);

  if (!project) return null;

  const isSyaahi =
    project.client.toLowerCase().includes("syaahi") ||
    project.title.toLowerCase().includes("syaahi");
  const logoSrc = project.logoUrl || (isSyaahi ? "/images/portfolio/syaahi_logo.png" : null);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#0F021B] text-white overflow-hidden selection:bg-primary selection:text-white">
        {/* Ambient Themed Glow Accents */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div className="absolute -top-32 -right-24 w-[650px] h-[650px] bg-[#7545F5]/20 rounded-full blur-[150px]" />
          <div className="absolute top-1/3 -left-36 w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[150px]" />
          <div className="absolute -bottom-24 right-1/4 w-[550px] h-[550px] bg-[#7545F5]/20 rounded-full blur-[150px]" />
        </div>

        {/* Sticky Top Header Navigation */}
        <header className="sticky top-0 z-30 w-full bg-[#0F021B]/95 backdrop-blur-xl border-b border-[#7545F5]/20 px-4 sm:px-8 py-3 sm:py-3.5 transition-all shadow-[0_4px_30px_rgba(15,2,27,0.8)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-3 sm:gap-4">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-[#7545F5]/25 text-white/90 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border border-white/15 hover:border-[#7545F5]/40 shadow-xs shrink-0"
              aria-label="Back to all projects"
            >
              <ArrowLeft className="w-4 h-4 text-[#C4B5FD] group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Projects</span>
            </button>

            {/* Middle: Interactive Layout Switcher & Deliverable Count */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Deliverable Counter Pill */}
              <span className="hidden md:inline-flex text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#DDD6FE]">
                {images.length} {images.length === 1 ? "Deliverable" : "Deliverables"}
              </span>

              {/* Layout Switcher Segmented Control */}
              <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.06] border border-[#7545F5]/30 backdrop-blur-md shadow-inner">
                <button
                  type="button"
                  onClick={() => setViewMode("masonry-2")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "masonry-2"
                      ? "bg-gradient-to-r from-primary to-[#8B5CF6] text-white shadow-md shadow-[#7545F5]/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="2-Column Showcase Grid (Default)"
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span>2 Cols</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("masonry-3")}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "masonry-3"
                      ? "bg-gradient-to-r from-primary to-[#8B5CF6] text-white shadow-md shadow-[#7545F5]/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="3-Column Grid"
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">3 Cols</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("bento")}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "bento"
                      ? "bg-gradient-to-r from-primary to-[#8B5CF6] text-white shadow-md shadow-[#7545F5]/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="Curated Bento Architecture"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Bento</span>
                </button>

                <button
                  type="button"
                  onClick={() => setViewMode("full")}
                  className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    viewMode === "full"
                      ? "bg-gradient-to-r from-primary to-[#8B5CF6] text-white shadow-md shadow-[#7545F5]/30"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                  title="Full Screen Stream"
                >
                  <Rows3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Full</span>
                </button>
              </div>
            </div>

            {/* Right: Live Project Link */}
            <div className="flex items-center gap-2 shrink-0">
              {project.vercelUrl && (
                <a
                  href={project.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-glow-sm transition-all cursor-pointer"
                >
                  <span className="hidden xs:inline">Live Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Gallery Stage */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* EXECUTIVE CASE STUDY OVERVIEW WITH LIGHT LAVENDER CARD & STANDALONE BACKLIT LOGO */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12 sm:mb-16"
            >
              {/* Category & Badge Header Row */}
              <div className="flex flex-wrap items-center gap-2 mb-5">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#7545F5]/30 text-[#E9D5FF] border border-[#7545F5]/50 flex items-center gap-1.5 shadow-xs">
                  <Sparkles className="w-3 h-3 text-primary-light" />
                  {project.serviceCategory}
                </span>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-[#DDD6FE] border border-white/15 backdrop-blur-md">
                  {project.client}
                </span>
                {(project.badges || []).map((b, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/5 text-white/75 border border-white/10"
                  >
                    {b}
                  </span>
                ))}
              </div>

              {/* 2-COLUMN SECTION: LEFT CARD + RIGHT STANDALONE BACKLIT LOGO */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-8">
                {/* LEFT COLUMN: LIGHT LAVENDER HIGH-CONTRAST CASE STUDY CARD */}
                <div className="lg:col-span-7 rounded-3xl bg-gradient-to-br from-[#FAF5FF] via-[#F4EBFF] to-[#ECE1FD] text-[#1D0936] p-6 sm:p-8 lg:p-10 border border-[#C084FC]/50 shadow-[0_20px_50px_rgba(117,69,245,0.25)] relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#A855F7]/15 rounded-full blur-2xl pointer-events-none" />

                  {/* Project Title */}
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#1A0631] tracking-tight leading-tight mb-4">
                    {project.title}
                  </h1>

                  {/* Lead Overview Paragraphs */}
                  {parsedDescription.leads.map((p, idx) => (
                    <p
                      key={idx}
                      className="text-sm sm:text-base text-[#2C0E52] leading-relaxed font-medium mb-3.5 last:mb-0"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Scope & Capabilities Cards Grid */}
                  {parsedDescription.bullets.length > 0 && (
                    <div className="my-6 pt-5 border-t border-[#D8B4FE]/60">
                      <div className="flex items-center gap-2 mb-3.5">
                        <Layers className="w-4 h-4 text-[#7545F5]" />
                        <h4 className="text-xs font-black uppercase tracking-wider text-[#581C87]">
                          Key Capabilities & Engineering Scope
                        </h4>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {parsedDescription.bullets.map((bullet, idx) => (
                          <div
                            key={idx}
                            className="bg-white/85 backdrop-blur-sm rounded-xl p-3 sm:p-3.5 border border-[#D8B4FE]/50 shadow-xs flex items-start gap-2.5 hover:border-[#9333EA] hover:bg-white transition-all group"
                          >
                            <CheckCircle2 className="w-4 h-4 text-[#7545F5] group-hover:text-[#9333EA] shrink-0 mt-0.5 transition-colors" />
                            <span className="text-xs sm:text-[13px] font-semibold text-[#1F0A38] leading-snug">
                              {bullet}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Milestone Takeaway / Conclusion */}
                  {parsedDescription.conclusion && (
                    <div className="mt-4 p-4 rounded-2xl bg-white/90 border border-[#7545F5]/30 text-xs sm:text-sm font-semibold text-[#2F0E5A] shadow-xs flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-[#7545F5] shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-[#1F0A38]">Strategic Objective: </span>
                        <span>{parsedDescription.conclusion}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: STANDALONE FLOATING LOGO WITH CRISP WHITE INNER BOUNDARY LINE (NO GLOW) */}
                <div className="lg:col-span-5 flex items-center justify-center relative py-6 sm:py-10">
                  {/* STANDALONE SYAAHI LOGO — PURE, FLOATING WITH CRISP WHITE INNER BOUNDARY LINE */}
                  {logoSrc && (
                    <img
                      src={logoSrc}
                      alt={`${project.client} Logo`}
                      className="relative z-10 max-h-40 sm:max-h-56 w-auto object-contain select-none hover:scale-105 transition-all duration-500 cursor-default"
                      style={{
                        filter:
                          "drop-shadow(1.5px 0 0 #FFFFFF) drop-shadow(-1.5px 0 0 #FFFFFF) drop-shadow(0 1.5px 0 #FFFFFF) drop-shadow(0 -1.5px 0 #FFFFFF) drop-shadow(1px 1px 0 #FFFFFF) drop-shadow(-1px -1px 0 #FFFFFF) drop-shadow(1px -1px 0 #FFFFFF) drop-shadow(-1px 1px 0 #FFFFFF) drop-shadow(0 20px 40px rgba(0,0,0,0.65))",
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Performance Metrics Bar */}
              {(project.metrics && project.metrics.length > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
                  {project.metrics.map((metric, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 sm:p-4 rounded-2xl bg-white/[0.04] border border-[#7545F5]/25 backdrop-blur-md"
                    >
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#C4B5FD] mb-1">
                        {metric.label}
                      </p>
                      <p className="text-lg sm:text-2xl font-black text-white">
                        {metric.value}
                      </p>
                    </div>
                  ))}
                  {project.impact && (
                    <div className="p-3.5 sm:p-4 rounded-2xl bg-[#7545F5]/15 border border-[#7545F5]/40 backdrop-blur-md col-span-2 sm:col-span-1">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-[#E9D5FF] mb-1">
                        Verified Impact
                      </p>
                      <p className="text-sm sm:text-base font-bold text-white line-clamp-2">
                        {project.impact}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Technologies Pill Ribbon */}
              {(project.technologies && project.technologies.length > 0) && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
                  <span className="text-[11px] uppercase tracking-wider text-white/50 font-bold mr-1">
                    Tech Stack:
                  </span>
                  {project.technologies.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2.5 py-1 rounded-lg bg-white/5 text-white/80 border border-white/10 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* GALLERY SHOWCASE DISPLAY ENGINE */}
            {/* 100% Aspect Ratio Preserved • Zero Crop • Zero Stretch • Non-Clickable */}

            {/* MODE 1: DYNAMIC MASONRY WATERFALL (3 COLS / 2 COLS) */}
            {(viewMode === "masonry-3" || viewMode === "masonry-2") && (
              <div
                className={
                  viewMode === "masonry-3"
                    ? "columns-1 sm:columns-2 lg:columns-3 gap-6 sm:gap-8 [column-fill:_balance]"
                    : "columns-1 sm:columns-2 gap-6 sm:gap-8 [column-fill:_balance]"
                }
              >
                {images.map((imgUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: Math.min((index % 6) * 0.05, 0.25) }}
                    className="break-inside-avoid inline-block w-full mb-6 sm:mb-8 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#18042B] to-[#0D0119] border border-[#7545F5]/25 hover:border-[#9333EA]/60 shadow-[0_15px_40px_rgba(10,2,18,0.7)] hover:shadow-[0_20px_50px_rgba(117,69,245,0.22)] transition-all duration-300"
                  >
                    <div className="relative w-full">
                      <img
                        src={imgUrl}
                        alt={`${project.title} deliverable ${index + 1}`}
                        loading={index < 4 ? "eager" : "lazy"}
                        className="w-full h-auto block select-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* MODE 2: CURATED BENTO FLOW */}
            {viewMode === "bento" && (
              <div className="flex flex-col gap-6 sm:gap-8 w-full">
                {bentoSections.map((section, sIdx) => {
                  if (section.type === "hero") {
                    const item = section.items[0];
                    return (
                      <motion.div
                        key={`hero-${sIdx}`}
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.5 }}
                        className="w-full group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#18042B] to-[#0D0119] border border-[#7545F5]/30 hover:border-[#9333EA]/70 shadow-[0_20px_60px_rgba(10,2,18,0.85)] hover:shadow-[0_25px_65px_rgba(117,69,245,0.25)] transition-all duration-300"
                      >
                        <div className="relative w-full">
                          <img
                            src={item.url}
                            alt={`${project.title} flagship deliverable`}
                            loading="eager"
                            className="w-full h-auto block select-none transition-transform duration-700 ease-out group-hover:scale-[1.01]"
                          />
                        </div>
                      </motion.div>
                    );
                  }

                  if (section.type === "pair") {
                    return (
                      <div
                        key={`pair-${sIdx}`}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-start w-full"
                      >
                        {section.items.map((item) => (
                          <motion.div
                            key={item.index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45 }}
                            className="w-full group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#18042B] to-[#0D0119] border border-[#7545F5]/25 hover:border-[#9333EA]/60 shadow-[0_15px_40px_rgba(10,2,18,0.7)] hover:shadow-[0_20px_50px_rgba(117,69,245,0.22)] transition-all duration-300"
                          >
                            <div className="relative w-full">
                              <img
                                src={item.url}
                                alt={`${project.title} deliverable ${item.index + 1}`}
                                loading="lazy"
                                className="w-full h-auto block select-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    );
                  }

                  if (section.type === "triple") {
                    return (
                      <div
                        key={`triple-${sIdx}`}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-start w-full"
                      >
                        {section.items.map((item) => (
                          <motion.div
                            key={item.index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45 }}
                            className="w-full group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#18042B] to-[#0D0119] border border-[#7545F5]/25 hover:border-[#9333EA]/60 shadow-[0_15px_40px_rgba(10,2,18,0.7)] hover:shadow-[0_20px_50px_rgba(117,69,245,0.22)] transition-all duration-300"
                          >
                            <div className="relative w-full">
                              <img
                                src={item.url}
                                alt={`${project.title} deliverable ${item.index + 1}`}
                                loading="lazy"
                                className="w-full h-auto block select-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    );
                  }

                  if (section.type === "asymmetric") {
                    return (
                      <div
                        key={`asym-${sIdx}`}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start w-full"
                      >
                        {section.items.map((item, i) => (
                          <motion.div
                            key={item.index}
                            initial={{ opacity: 0, y: 25 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.45 }}
                            className={`w-full ${
                              i === 0 ? "lg:col-span-7" : "lg:col-span-5"
                            } group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#18042B] to-[#0D0119] border border-[#7545F5]/25 hover:border-[#9333EA]/60 shadow-[0_15px_40px_rgba(10,2,18,0.7)] hover:shadow-[0_20px_50px_rgba(117,69,245,0.22)] transition-all duration-300`}
                          >
                            <div className="relative w-full">
                              <img
                                src={item.url}
                                alt={`${project.title} deliverable ${item.index + 1}`}
                                loading="lazy"
                                className="w-full h-auto block select-none transition-transform duration-700 ease-out group-hover:scale-[1.015]"
                              />
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            )}

            {/* MODE 3: FULL SCREEN STREAM */}
            {viewMode === "full" && (
              <div className="flex flex-col gap-8 sm:gap-12 lg:gap-16 w-full">
                {images.map((imgUrl, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.25) }}
                    className="w-full group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-gradient-to-b from-[#18042B] to-[#0D0119] border border-[#7545F5]/25 hover:border-[#9333EA]/60 shadow-[0_20px_60px_rgba(10,2,18,0.85)] hover:shadow-[0_25px_65px_rgba(117,69,245,0.25)] transition-all duration-300"
                  >
                    <div className="relative w-full">
                      <img
                        src={imgUrl}
                        alt={`${project.title} deliverable ${index + 1}`}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="w-full h-auto block select-none"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Bottom Showcase Footer & Inquiry CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 sm:mt-24 p-6 sm:p-12 rounded-3xl bg-gradient-to-r from-[#7545F5]/20 via-[#8A5CF6]/15 to-[#7545F5]/20 border border-[#7545F5]/35 text-center relative overflow-hidden"
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#7545F5]/30 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-[#8B5CF6]/30 rounded-full blur-3xl pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#7545F5]/30 text-[#D8B4FE] text-xs font-bold uppercase tracking-wider mb-4 border border-[#7545F5]/45 relative z-10">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation Architecture</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-3 relative z-10">
                Ready to build something iconic together?
              </h3>
              <p className="text-sm text-white/75 max-w-xl mx-auto mb-8 relative z-10">
                Explore custom engineering, high-converting digital storefronts, and enterprise solutions tailored for your business.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 relative z-10">
                <button
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                  className="px-6 py-3 rounded-full bg-primary hover:bg-primary-dark text-white text-xs sm:text-sm font-bold shadow-lg shadow-primary/30 hover:scale-105 transition-all cursor-pointer"
                >
                  Inquire Similar Solution
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-[#7545F5]/25 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/15 hover:border-[#7545F5]/40"
                >
                  Back to Portfolio
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
}

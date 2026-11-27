"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { ProjectItem } from "@/data/agencyData";
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  LayoutGrid,
  Rows3,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VerticalWorkShowcaseProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

type ViewMode = "curated" | "grid";

export default function VerticalWorkShowcase({
  project,
  onClose,
  onOpenContact,
}: VerticalWorkShowcaseProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("curated");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Resolve all deliverable images for this project
  const images = useMemo(() => {
    if (!project) return [];
    if (project.gallery && project.gallery.length > 0) {
      return project.gallery;
    }
    return [project.mediaUrl || "/images/services/web_dev_bg.jpg"];
  }, [project]);

  // Lock body scroll when showcase or lightbox is open
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [project]);

  // Handle keyboard events (Escape to close showcase or lightbox, Arrows for lightbox navigation)
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) {
          setLightboxIndex(null);
        } else {
          onClose();
        }
      } else if (lightboxIndex !== null) {
        if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : images.length - 1
          );
        } else if (e.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev !== null && prev < images.length - 1 ? prev + 1 : 0
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, lightboxIndex, images.length, onClose]);

  // Lightbox navigation helpers
  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null && prev < images.length - 1 ? prev + 1 : 0
      );
    },
    [images.length]
  );

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      setLightboxIndex((prev) =>
        prev !== null && prev > 0 ? prev - 1 : images.length - 1
      );
    },
    [images.length]
  );

  // Domain name for browser mockups
  const displayDomain = useMemo(() => {
    if (!project) return "uniquova.com";
    return project.vercelUrl
      ? project.vercelUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")
      : `${project.client.toLowerCase().replace(/[^a-z0-9]/g, "")}.com`;
  }, [project]);

  // Dynamic layout chunking engine for "curated" bento flow:
  // Pattern rhythm:
  // 1. Hero item (1 full-width browser mockup)
  // 2. Pair (2 items, 2-col)
  // 3. Triple (3 items, 3-col)
  // 4. Asymmetric Bento (2 items, 2/3 + 1/3)
  // 5. Panoramic (1 full-width)
  // Repeating cycle across all images
  const curatedSections = useMemo(() => {
    if (images.length === 0) return [];
    const sections: {
      type: "hero" | "pair" | "triple" | "asymmetric" | "panoramic";
      items: { url: string; index: number }[];
    }[] = [];

    let currIdx = 0;
    let cycleStep = 0;

    // First item is always Hero flagship
    if (currIdx < images.length) {
      sections.push({
        type: "hero",
        items: [{ url: images[currIdx], index: currIdx }],
      });
      currIdx++;
    }

    while (currIdx < images.length) {
      const remaining = images.length - currIdx;
      const step = cycleStep % 4;

      if (step === 0) {
        // Pair: 2 items
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
        // Triple: 3 items (or 2 if only 2 remain)
        const count = remaining >= 3 ? 3 : Math.min(2, remaining);
        sections.push({
          type: "triple",
          items: images.slice(currIdx, currIdx + count).map((url, i) => ({
            url,
            index: currIdx + i,
          })),
        });
        currIdx += count;
      } else if (step === 2) {
        // Asymmetric: 2 items (wide + tall)
        const count = Math.min(2, remaining);
        sections.push({
          type: "asymmetric",
          items: images.slice(currIdx, currIdx + count).map((url, i) => ({
            url,
            index: currIdx + i,
          })),
        });
        currIdx += count;
      } else {
        // Panoramic: 1 item
        sections.push({
          type: "panoramic",
          items: [{ url: images[currIdx], index: currIdx }],
        });
        currIdx += 1;
      }

      cycleStep++;
    }

    return sections;
  }, [images]);

  if (!project) return null;

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
        <header className="sticky top-0 z-30 w-full bg-[#0F021B]/90 backdrop-blur-xl border-b border-[#7545F5]/20 px-4 sm:px-8 py-3.5 sm:py-4 transition-all shadow-[0_4px_30px_rgba(15,2,27,0.8)]">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-[#7545F5]/25 text-white/90 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border border-white/15 hover:border-[#7545F5]/40 shadow-xs"
              aria-label="Back to all projects"
            >
              <ArrowLeft className="w-4 h-4 text-[#C4B5FD] group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Projects</span>
            </button>

            {/* Middle: Deliverables Count & View Switcher */}
            <div className="hidden md:flex items-center gap-3">
              <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#DDD6FE]">
                {images.length} {images.length === 1 ? "Deliverable" : "Deliverables"}
              </span>

              {/* View Mode Switcher */}
              <div className="inline-flex items-center p-1 rounded-full bg-white/5 border border-white/10">
                <button
                  type="button"
                  onClick={() => setViewMode("curated")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === "curated"
                      ? "bg-[#7545F5] text-white shadow-xs"
                      : "text-white/60 hover:text-white"
                  }`}
                  title="Auto-Arranged WeGrow Bento Layout"
                >
                  <Rows3 className="w-3.5 h-3.5" />
                  <span>Curated Flow</span>
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-[#7545F5] text-white shadow-xs"
                      : "text-white/60 hover:text-white"
                  }`}
                  title="Grid Gallery View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Grid View</span>
                </button>
              </div>
            </div>

            {/* Right: Live Project Link */}
            <div className="flex items-center gap-2">
              {project.vercelUrl && (
                <a
                  href={project.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-glow-sm transition-all cursor-pointer"
                >
                  <span>Live Project</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Gallery Stream */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Project Header & Case Study Overview Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10 sm:mb-14"
            >
              {/* Badges Pill Row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#7545F5]/30 text-[#E9D5FF] border border-[#7545F5]/50 flex items-center gap-1.5">
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

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 max-w-4xl">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/75 max-w-3xl leading-relaxed whitespace-pre-line font-normal mb-8">
                {project.description}
              </p>

              {/* Performance Metrics Bar (Bento Quick Strip) */}
              {(project.metrics && project.metrics.length > 0) && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
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

            {/* Mobile View Switcher (Visible on small screens) */}
            <div className="flex md:hidden items-center justify-between gap-2 mb-6 p-2 rounded-2xl bg-white/5 border border-white/10">
              <span className="text-xs font-mono font-bold text-white/80 pl-2">
                {images.length} Deliverables
              </span>
              <div className="inline-flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setViewMode("curated")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    viewMode === "curated" ? "bg-[#7545F5] text-white" : "text-white/60"
                  }`}
                >
                  Curated
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    viewMode === "grid" ? "bg-[#7545F5] text-white" : "text-white/60"
                  }`}
                >
                  Grid
                </button>
              </div>
            </div>

            {/* GALLERY RENDER: CURATED WEGROW BENTO FLOW */}
            {viewMode === "curated" ? (
              <div className="flex flex-col gap-8 sm:gap-14">
                {curatedSections.map((section, sIdx) => {
                  if (section.type === "hero" || section.type === "panoramic") {
                    const item = section.items[0];
                    return (
                      <motion.div
                        key={`hero-${sIdx}-${item.index}`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ duration: 0.5 }}
                        className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#140224] border border-[#7545F5]/30 shadow-[0_20px_60px_rgba(10,2,18,0.8)] cursor-pointer"
                        onClick={() => setLightboxIndex(item.index)}
                      >
                        {/* Browser Window Header Chrome (WeGrow style) */}
                        <div className="w-full bg-[#1A0430] border-b border-[#7545F5]/30 px-4 py-2.5 flex items-center justify-between gap-4 select-none">
                          <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#EF4444]/80 inline-block" />
                            <span className="w-3 h-3 rounded-full bg-[#F59E0B]/80 inline-block" />
                            <span className="w-3 h-3 rounded-full bg-[#10B981]/80 inline-block" />
                          </div>
                          <div className="flex items-center gap-1.5 px-4 py-1 rounded-full bg-black/40 border border-white/10 text-[11px] font-mono text-white/60 max-w-xs sm:max-w-md truncate">
                            <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                            <span className="truncate">https://{displayDomain}/showcase</span>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] font-mono font-bold text-[#C4B5FD]">
                            <span>Deliverable 0{item.index + 1}</span>
                            <Maximize2 className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>

                        {/* High-Resolution Screen Render */}
                        <div className="relative w-full overflow-hidden bg-[#0D0119]">
                          <img
                            src={item.url}
                            alt={`${project.title} deliverable ${item.index + 1}`}
                            loading={item.index < 3 ? "eager" : "lazy"}
                            className="w-full h-auto object-cover object-top group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                          />
                        </div>

                        {/* Subtle Hover Overlay Indicator */}
                        <div className="absolute inset-0 bg-[#7545F5]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none flex items-center justify-center">
                          <span className="px-4 py-2 rounded-full bg-[#0F021B]/90 backdrop-blur-md border border-[#7545F5]/50 text-xs font-bold text-white shadow-xl flex items-center gap-2">
                            <Maximize2 className="w-3.5 h-3.5 text-primary-light" />
                            Click to Enlarge
                          </span>
                        </div>
                      </motion.div>
                    );
                  }

                  if (section.type === "pair") {
                    return (
                      <div
                        key={`pair-${sIdx}`}
                        className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
                      >
                        {section.items.map((item) => (
                          <motion.div
                            key={item.index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: (item.index % 2) * 0.1 }}
                            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#140224] border border-[#7545F5]/25 shadow-[0_15px_40px_rgba(10,2,18,0.6)] cursor-pointer flex flex-col"
                            onClick={() => setLightboxIndex(item.index)}
                          >
                            {/* Card Top Chrome */}
                            <div className="w-full bg-[#1A0430]/90 px-4 py-2 border-b border-[#7545F5]/20 flex items-center justify-between text-[11px] font-mono text-[#DDD6FE]">
                              <span className="font-bold">Deliverable 0{item.index + 1}</span>
                              <span className="text-white/40 group-hover:text-white transition-colors flex items-center gap-1">
                                <Maximize2 className="w-3 h-3" />
                                Zoom
                              </span>
                            </div>
                            <div className="relative w-full h-full min-h-[260px] sm:min-h-[360px] overflow-hidden bg-[#0D0119] flex items-center justify-center">
                              <img
                                src={item.url}
                                alt={`${project.title} deliverable ${item.index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
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
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
                      >
                        {section.items.map((item) => (
                          <motion.div
                            key={item.index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: (item.index % 3) * 0.08 }}
                            className="group relative rounded-2xl overflow-hidden bg-[#140224] border border-[#7545F5]/25 shadow-lg cursor-pointer flex flex-col"
                            onClick={() => setLightboxIndex(item.index)}
                          >
                            <div className="w-full bg-[#1A0430]/90 px-3.5 py-1.5 border-b border-[#7545F5]/20 flex items-center justify-between text-[10px] font-mono text-[#DDD6FE]">
                              <span className="font-bold">Deliverable 0{item.index + 1}</span>
                              <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                            <div className="relative w-full h-[240px] sm:h-[300px] overflow-hidden bg-[#0D0119]">
                              <img
                                src={item.url}
                                alt={`${project.title} deliverable ${item.index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
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
                        className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch"
                      >
                        {section.items[0] && (
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5 }}
                            className="lg:col-span-8 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#140224] border border-[#7545F5]/25 shadow-xl cursor-pointer flex flex-col"
                            onClick={() => setLightboxIndex(section.items[0].index)}
                          >
                            <div className="w-full bg-[#1A0430]/90 px-4 py-2 border-b border-[#7545F5]/20 flex items-center justify-between text-[11px] font-mono text-[#DDD6FE]">
                              <span className="font-bold">Deliverable 0{section.items[0].index + 1} • Key Feature</span>
                              <Maximize2 className="w-3 h-3" />
                            </div>
                            <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] overflow-hidden bg-[#0D0119]">
                              <img
                                src={section.items[0].url}
                                alt={`${project.title} deliverable ${section.items[0].index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-top group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                              />
                            </div>
                          </motion.div>
                        )}
                        {section.items[1] && (
                          <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="lg:col-span-4 group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#140224] border border-[#7545F5]/25 shadow-xl cursor-pointer flex flex-col"
                            onClick={() => setLightboxIndex(section.items[1].index)}
                          >
                            <div className="w-full bg-[#1A0430]/90 px-4 py-2 border-b border-[#7545F5]/20 flex items-center justify-between text-[11px] font-mono text-[#DDD6FE]">
                              <span className="font-bold">Deliverable 0{section.items[1].index + 1}</span>
                              <Maximize2 className="w-3 h-3" />
                            </div>
                            <div className="relative w-full h-full min-h-[300px] sm:min-h-[420px] overflow-hidden bg-[#0D0119]">
                              <img
                                src={section.items[1].url}
                                alt={`${project.title} deliverable ${section.items[1].index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                              />
                            </div>
                          </motion.div>
                        )}
                      </div>
                    );
                  }

                  return null;
                })}
              </div>
            ) : (
              /* ALTERNATIVE VIEW: CLEAN UNIFORM MASONRY/GRID VIEW */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {images.map((imgUrl, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: (idx % 6) * 0.05 }}
                    className="group relative rounded-2xl overflow-hidden bg-[#140224] border border-[#7545F5]/25 shadow-lg cursor-pointer flex flex-col"
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <div className="w-full bg-[#1A0430]/90 px-3.5 py-1.5 border-b border-[#7545F5]/20 flex items-center justify-between text-[11px] font-mono text-[#DDD6FE]">
                      <span className="font-bold">Deliverable 0{idx + 1}</span>
                      <Maximize2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="relative w-full h-[280px] sm:h-[320px] overflow-hidden bg-[#0D0119]">
                      <img
                        src={imgUrl}
                        alt={`${project.title} deliverable ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
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
                Explore custom engineering, high-converting digital storefronts, and enterprise web solutions tailored for your business.
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

        {/* FULLSCREEN LIGHTBOX MODAL */}
        <AnimatePresence>
          {lightboxIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-60 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-4 sm:p-6 select-none"
              onClick={() => setLightboxIndex(null)}
            >
              {/* Lightbox Top Bar */}
              <div
                className="w-full flex items-center justify-between text-white z-10"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[#E9D5FF]">
                    Deliverable 0{lightboxIndex + 1} of {images.length}
                  </span>
                  <span className="hidden sm:inline text-xs text-white/60 font-medium truncate max-w-md">
                    {project.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={images[lightboxIndex]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Open original in new tab"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="p-2 rounded-full bg-white/10 hover:bg-red-500/80 text-white/80 hover:text-white transition-colors cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Lightbox Center Image Stage */}
              <div
                className="relative flex-1 flex items-center justify-center my-4 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Previous Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-[#7545F5] text-white transition-all backdrop-blur-md border border-white/15 cursor-pointer shadow-lg"
                  aria-label="Previous deliverable"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {/* Main Fullscreen Image */}
                <motion.div
                  key={lightboxIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[80vh] max-w-[92vw] overflow-auto rounded-2xl shadow-2xl border border-white/10 bg-[#0A0112]"
                >
                  <img
                    src={images[lightboxIndex]}
                    alt={`${project.title} deliverable ${lightboxIndex + 1}`}
                    className="max-h-[80vh] max-w-[92vw] w-auto h-auto object-contain mx-auto"
                  />
                </motion.div>

                {/* Next Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 z-20 p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-[#7545F5] text-white transition-all backdrop-blur-md border border-white/15 cursor-pointer shadow-lg"
                  aria-label="Next deliverable"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Lightbox Bottom Info Strip */}
              <div
                className="w-full flex items-center justify-center text-xs font-mono text-white/50 z-10 text-center"
                onClick={(e) => e.stopPropagation()}
              >
                <span>Press ← / → keys to navigate • Esc or click outside to close</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
}

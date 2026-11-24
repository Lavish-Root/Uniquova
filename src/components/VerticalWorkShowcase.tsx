"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/agencyData";
import {
  ArrowLeft,
  X,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface VerticalWorkShowcaseProps {
  project: ProjectItem | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export default function VerticalWorkShowcase({
  project,
  onClose,
  onOpenContact,
}: VerticalWorkShowcaseProps) {
  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    if (!project) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  // Resolve all images for this project
  const images =
    project.gallery && project.gallery.length > 0
      ? project.gallery
      : [project.mediaUrl || "/images/services/web_dev_bg.jpg"];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex flex-col bg-[#07090E]/95 backdrop-blur-2xl text-white overflow-hidden">
        {/* Sticky Top Header Navigation */}
        <header className="sticky top-0 z-30 w-full bg-[#07090E]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 py-3.5 sm:py-4 transition-all">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border border-white/10"
              aria-label="Back to all projects"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Projects</span>
            </button>

            {/* Middle: Title & Discipline */}
            <div className="hidden md:flex items-center gap-3 text-center truncate">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/20 text-purple-300 border border-primary/30">
                {project.serviceCategory}
              </span>
              <span className="text-sm font-bold text-white/90 truncate max-w-md">
                {project.title}
              </span>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {project.vercelUrl && (
                <a
                  href={project.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-primary to-[#8A5CF6] hover:from-primary-dark hover:to-primary text-white text-xs font-bold shadow-md shadow-primary/25 hover:scale-[1.02] transition-all cursor-pointer"
                >
                  <span>Launch Live</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white/80 hover:text-white transition-all duration-200 cursor-pointer border border-white/10"
                aria-label="Close vertical showcase"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Scrollable Vertical Content Stream */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth py-8 sm:py-14 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            {/* Top Showcase Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-10 sm:mb-14 text-center sm:text-left"
            >
              {/* Badges Pill Row */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-4">
                {(project.badges || [project.serviceCategory]).map((b, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/15 backdrop-blur-md"
                  >
                    {b}
                  </span>
                ))}
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-primary/25 text-purple-300 border border-primary/40">
                  {project.client}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/70 max-w-3xl leading-relaxed whitespace-pre-line mb-6 font-normal">
                {project.description}
              </p>

              {/* Metrics & Impact Ribbon */}
              {project.metrics && project.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 p-4 rounded-2xl bg-white/[0.04] border border-white/10 max-w-2xl mb-8">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2 text-center sm:text-left">
                      <p className="text-lg sm:text-2xl font-black text-purple-400 font-mono">
                        {m.value}
                      </p>
                      <p className="text-[11px] sm:text-xs text-white/60 font-medium">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Technologies Tag Cloud */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 border-t border-white/10">
                  <span className="text-xs font-bold text-white/40 uppercase tracking-wider mr-1">
                    Stack:
                  </span>
                  {project.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-white/5 text-white/80 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Vertical Component: Stack of All Images */}
            <div className="flex flex-col gap-8 sm:gap-14">
              {images.map((imgUrl, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-white/[0.02] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
                >
                  {/* Image Deliverable Index Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white/90 border border-white/15 shadow-sm">
                      Deliverable 0{index + 1}
                    </span>
                  </div>

                  {/* High-Resolution Deliverable Showcase Image */}
                  <div className="relative w-full overflow-hidden bg-black/40">
                    <img
                      src={imgUrl}
                      alt={`${project.title} deliverable showcase ${index + 1}`}
                      loading={index < 2 ? "eager" : "lazy"}
                      className="w-full h-auto object-cover object-center group-hover:scale-[1.01] transition-transform duration-700 ease-out"
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Showcase Footer & Inquiry CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 sm:mt-24 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-primary/15 via-[#8A5CF6]/10 to-primary/15 border border-primary/20 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation Deliverables</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-3">
                Ready to build something iconic together?
              </h3>
              <p className="text-sm text-white/70 max-w-xl mx-auto mb-6">
                Explore custom engineering, brand identity systems, and high-converting commercial applications tailored for your business.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
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
                  className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all cursor-pointer border border-white/15"
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

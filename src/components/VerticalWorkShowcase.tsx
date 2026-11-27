"use client";

import React, { useEffect } from "react";
import { ProjectItem } from "@/data/agencyData";
import {
  ArrowLeft,
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
      <div className="fixed inset-0 z-50 flex flex-col bg-[#190528] text-white overflow-hidden selection:bg-primary selection:text-white">
        {/* Ambient Themed Glow Accents */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          <div className="absolute -top-32 -right-24 w-[600px] h-[600px] bg-[#7545F5]/15 rounded-full blur-[140px]" />
          <div className="absolute top-1/2 -left-32 w-[550px] h-[550px] bg-[#8B5CF6]/12 rounded-full blur-[140px]" />
          <div className="absolute -bottom-24 right-1/4 w-[500px] h-[500px] bg-[#7545F5]/15 rounded-full blur-[140px]" />
        </div>

        {/* Sticky Top Header Navigation */}
        <header className="sticky top-0 z-30 w-full bg-[#190528]/85 backdrop-blur-xl border-b border-[#7545F5]/25 px-4 sm:px-8 py-3.5 sm:py-4 transition-all shadow-[0_4px_30px_rgba(25,5,40,0.7)]">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
            {/* Back Button */}
            <button
              onClick={onClose}
              className="group inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-white/10 hover:bg-[#7545F5]/25 text-white/90 hover:text-white text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer border border-white/15 hover:border-[#7545F5]/40 shadow-xs"
              aria-label="Back to all projects"
            >
              <ArrowLeft className="w-4 h-4 text-[#C4B5FD] group-hover:text-white group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Projects</span>
            </button>

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
        </header>

        {/* Scrollable Vertical Content Stream */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden scroll-smooth py-8 sm:py-14 px-4 sm:px-6 lg:px-8 relative z-10">
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
                    className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-[#DDD6FE] border border-white/15 backdrop-blur-md"
                  >
                    {b}
                  </span>
                ))}
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#7545F5]/30 text-[#E9D5FF] border border-[#7545F5]/50">
                  {project.client}
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                {project.title}
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/75 max-w-3xl leading-relaxed whitespace-pre-line font-normal">
                {project.description}
              </p>
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
                  className="group relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#140321] border border-[#7545F5]/25 shadow-[0_20px_50px_rgba(10,2,18,0.7)]"
                >
                  {/* Image Deliverable Index Badge */}
                  <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                    <span className="text-[11px] font-mono font-bold px-3 py-1.5 rounded-full bg-[#190528]/85 backdrop-blur-md text-white/95 border border-[#7545F5]/35 shadow-md">
                      Deliverable 0{index + 1}
                    </span>
                  </div>

                  {/* High-Resolution Deliverable Showcase Image */}
                  <div className="relative w-full overflow-hidden bg-[#10031B]">
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
              className="mt-16 sm:mt-24 p-6 sm:p-10 rounded-3xl bg-gradient-to-r from-[#7545F5]/20 via-[#8A5CF6]/15 to-[#7545F5]/20 border border-[#7545F5]/35 text-center"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7545F5]/30 text-[#D8B4FE] text-xs font-bold uppercase tracking-wider mb-4 border border-[#7545F5]/45">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Next-Generation Deliverables</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white mb-3">
                Ready to build something iconic together?
              </h3>
              <p className="text-sm text-white/75 max-w-xl mx-auto mb-6">
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

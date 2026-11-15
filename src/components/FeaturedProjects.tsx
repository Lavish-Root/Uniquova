"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { FEATURED_PROJECTS } from "@/data/agencyData";

export default function FeaturedProjects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "E-commerce & Web", "Web & UI/UX", "App Development", "Branding & Design"];

  const filteredProjects =
    activeCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-primary-200">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Case Studies</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-sm text-dark-muted mt-2">
              (Representative client showcase architectures demonstrating real deliverables)
            </p>
          </div>

          <Link
            href="/our-work"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-primary-dark transition-colors self-start md:self-auto"
          >
            <span>View Full Portfolio</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-primary text-white shadow-glow-sm"
                  : "bg-softBg text-dark-muted hover:text-dark border border-border"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-[#FAF9FF] rounded-3xl border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Project Card Header Visual Banner */}
              <div
                className={`relative h-56 sm:h-64 bg-gradient-to-br ${project.accent} p-6 flex flex-col justify-between overflow-hidden border-b border-border/60`}
              >
                {/* Background decorative glow */}
                <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500" />

                <div className="flex items-center justify-between relative z-10">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-primary shadow-sm">
                    {project.category}
                  </span>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-dark/80 backdrop-blur-md text-white shadow-sm">
                    {project.impact}
                  </span>
                </div>

                {/* Isometric Showcase Graphic Card Mockup */}
                <div className="relative z-10 self-center w-full max-w-sm bg-white/90 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-lg transform group-hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-dark">{project.client}</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center pt-2 border-t border-border/60">
                    {project.metrics.map((m, mIdx) => (
                      <div key={mIdx}>
                        <p className="text-xs font-black text-primary">{m.value}</p>
                        <p className="text-[10px] text-dark-muted">{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-dark-muted leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech / Service Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-[11px] font-semibold px-2.5 py-1 rounded-md bg-softBg text-dark border border-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-border/70 flex items-center justify-between">
                  <Link
                    href={`/our-work?project=${project.id}`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:text-primary-dark transition-colors"
                  >
                    <span>View Project Details</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <span className="text-xs text-dark-muted font-medium">
                    Verified Deliverable
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

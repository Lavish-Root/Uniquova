"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import { ProjectItem } from "@/data/agencyData";
import initialProjects from "@/data/projects.json";
import {
  ArrowUpRight,
  Sparkles,
  ExternalLink,
  Code,
  Smartphone,
  ShoppingCart,
  Palette,
  PenTool,
  Layers,
  Search,
} from "lucide-react";

export default function OurWorkClient() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects as ProjectItem[]);
  const [activeCategory, setActiveCategory] = useState("All Projects");
  const [searchQuery, setSearchQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null);

  // Fetch live updates from API
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
        }
      })
      .catch(() => {
        // Keep initialProjects fallback
      });
  }, []);

  const categories = [
    { name: "All Projects", icon: Layers },
    { name: "Web Development", icon: Code },
    { name: "Mobile App Development", icon: Smartphone },
    { name: "E-commerce Solutions", icon: ShoppingCart },
    { name: "Graphic Designing", icon: Palette },
    { name: "Branding", icon: PenTool },
  ];

  const getCategoryCount = (catName: string) => {
    if (catName === "All Projects") return projects.length;
    return projects.filter(
      (p) => p.serviceCategory.toLowerCase() === catName.toLowerCase()
    ).length;
  };

  const filteredProjects = projects.filter((p) => {
    const matchesCategory =
      activeCategory === "All Projects" ||
      p.serviceCategory.toLowerCase() === activeCategory.toLowerCase();

    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !query ||
      p.title.toLowerCase().includes(query) ||
      p.client.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      (p.technologies || []).some((t) => t.toLowerCase().includes(query));

    return matchesCategory && matchesQuery;
  });

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col selection:bg-primary selection:text-white">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-28 purple-mesh-bg relative overflow-hidden">
        {/* Themed Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Portfolio Background Image Layer with True Alpha Mask */}
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
              src="/images/our_work_hero_bg.jpg?v=4"
              alt="UNIQUOVA Portfolio: E-commerce, Web & UI/UX, App Development, and Branding"
              width={1200}
              height={800}
              loading="lazy"
              className="w-full h-full object-cover object-center lg:object-right filter contrast-[1.04] brightness-[1.02]"
            />
            {/* Subtle Brand Theme Tint Overlay */}
            <div className="absolute inset-0 bg-[#7545F5]/[0.03] mix-blend-multiply" />

            {/* Top & Bottom seamless gradient transitions */}
            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#FAF9FF] to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white via-white/60 to-transparent" />
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
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary-light/40 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-2xl lg:max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-md border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-6 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Live Deliverables & Case Studies</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
              Our Work: Engineered for <br />
              <span className="gradient-text">Commercial Growth.</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed">
              Explore our verified portfolio of production web applications with live Vercel deployments,
              marketplace growth systems, mobile platforms, and brand identities.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Showcase Section */}
      <section className="py-16 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Controls Bar: Category Navigation & Search */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6 mb-12">
            {/* Category Filter Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 lg:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const Icon = cat.icon;
                const count = getCategoryCount(cat.name);
                const isActive = activeCategory === cat.name;

                return (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                      isActive
                        ? "bg-primary text-white shadow-glow-sm"
                        : "bg-softBg text-dark-muted hover:text-dark hover:bg-primary-light/30 border border-border"
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? "text-white" : "text-primary"}`} />
                    <span>{cat.name}</span>
                    <span
                      className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                        isActive ? "bg-white/20 text-white" : "bg-dark/5 text-dark-muted"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Keyword Search */}
            <div className="relative min-w-[280px]">
              <Search className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects by tech, client..."
                className="w-full bg-softBg border border-border rounded-full pl-10 pr-8 py-2.5 text-xs sm:text-sm text-dark placeholder-dark-muted/60 focus:outline-none focus:border-primary transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-muted hover:text-dark text-xs font-bold"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="bg-softBg border border-border rounded-3xl p-12 text-center my-8">
              <Layers className="w-12 h-12 text-primary/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-dark mb-1">No Projects Found</h3>
              <p className="text-sm text-dark-muted max-w-md mx-auto mb-6">
                No projects matched your criteria in &quot;{activeCategory}&quot;. Try selecting another service category.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All Projects");
                  setSearchQuery("");
                }}
                className="px-6 py-2.5 rounded-full bg-primary text-white text-xs font-bold shadow-glow-sm"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map((project) => (
                <div
                  key={project.id}
                  className="group bg-[#FAF9FF] rounded-3xl border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col justify-between"
                >
                  <div>
                    {/* Visual Showcase Banner */}
                    <div className="relative h-60 sm:h-64 bg-slate-900 overflow-hidden border-b border-border/60">
                      <img
                        src={project.mediaUrl || "/images/services/web_dev_bg.jpg"}
                        alt={project.title}
                        loading="lazy"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent" />

                      {/* Header Badges */}
                      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-primary shadow-xs">
                          {project.serviceCategory}
                        </span>
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-dark/85 backdrop-blur-md text-white shadow-xs">
                          {project.impact}
                        </span>
                      </div>

                      {/* Client Highlight Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 z-10">
                        <p className="text-xs font-extrabold uppercase tracking-widest text-primary-light">
                          {project.client}
                        </p>
                        <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mt-0.5">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    {/* Project Body */}
                    <div className="p-6 sm:p-8 bg-white">
                      <p className="text-sm text-dark-muted leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Technologies Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {(project.technologies || []).map((t, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-semibold px-2.5 py-1 rounded-md bg-softBg text-dark border border-border"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Metrics Showcase */}
                      {project.metrics && project.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-2 p-3.5 rounded-2xl bg-[#FAF9FF] border border-border mb-6">
                          {project.metrics.map((m, mIdx) => (
                            <div key={mIdx} className="text-center">
                              <p className="text-sm font-black text-primary">{m.value}</p>
                              <p className="text-[11px] text-dark-muted truncate">{m.label}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="px-6 sm:px-8 py-5 bg-[#FAF9FF] border-t border-border flex flex-wrap items-center justify-between gap-3">
                    {/* Live Vercel Button */}
                    {project.vercelUrl ? (
                      <a
                        href={project.vercelUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-glow-sm transition-all hover:scale-105"
                      >
                        <span>🚀 View Live Vercel Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-xs text-dark-muted italic">Internal Solution</span>
                    )}

                    {/* Secondary Case Study Button */}
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-dark hover:text-primary transition-colors py-1"
                    >
                      <span>Read Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5 text-primary" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl border border-border max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-6 right-6 text-dark-muted hover:text-dark font-bold text-lg p-1"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {activeProjectModal.serviceCategory}
            </span>
            <p className="text-xs text-dark-muted mt-0.5">Client: {activeProjectModal.client}</p>

            <h3 className="text-2xl font-extrabold text-dark mt-2 mb-4">
              {activeProjectModal.title}
            </h3>

            <p className="text-sm text-dark-muted leading-relaxed mb-6">
              {activeProjectModal.description}
            </p>

            {/* Metrics */}
            <div className="bg-softBg p-4 rounded-2xl border border-border mb-6">
              <p className="text-xs font-bold text-dark uppercase tracking-wider mb-3">
                Documented Commercial Results
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {(activeProjectModal.metrics || []).map((m, idx) => (
                  <div key={idx} className="bg-white p-2.5 rounded-xl border border-border">
                    <p className="text-sm font-black text-primary">{m.value}</p>
                    <p className="text-[11px] text-dark-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <p className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                Production Stack
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(activeProjectModal.technologies || []).map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 rounded-md bg-softBg text-dark border border-border"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-border">
              {activeProjectModal.vercelUrl && (
                <a
                  href={activeProjectModal.vercelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-full border border-primary text-primary hover:bg-primary-light/30 text-xs font-bold inline-flex items-center gap-1.5"
                >
                  <span>Launch Live Vercel</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              )}

              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  setIsContactOpen(true);
                }}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-glow-sm"
              >
                Inquire Similar Solution
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

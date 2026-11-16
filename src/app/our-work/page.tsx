"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import { FEATURED_PROJECTS } from "@/data/agencyData";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function OurWorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<typeof FEATURED_PROJECTS[0] | null>(null);

  const categories = ["All", "E-commerce & Web", "Web & UI/UX", "App Development", "Branding & Design"];

  const filteredProjects =
    activeCategory === "All"
      ? FEATURED_PROJECTS
      : FEATURED_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-16 lg:pt-40 lg:pb-28 purple-mesh-bg relative overflow-hidden">
        {/* Themed Background Image Layer */}
        <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden">
          {/* Portfolio Background Image Layer with True Alpha Mask - Completely Eliminates Any Dividing Line */}
          <div 
            className="absolute inset-y-0 right-0 w-full lg:w-3/4 xl:w-7/12 h-full overflow-hidden"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, rgba(0,0,0,0.15) 15%, rgba(0,0,0,0.85) 45%, black 65%, black 100%)"
            }}
          >
            <img
              src="/images/our_work_hero_bg.jpg?v=4"
              alt="UNIQUOVA Portfolio: E-commerce, Web & UI/UX, App Development, and Branding"
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
              backgroundSize: "32px 32px"
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
              <span>Proven Deliverables</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
              Our Work: Engineered for <br />
              <span className="gradient-text">Commercial Growth.</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed">
              Explore our portfolio of high-performing e-commerce stores, custom web apps, mobile
              products, and visual brand identities built to scale.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-primary text-white shadow-glow-sm"
                    : "bg-softBg text-dark-muted hover:text-dark border border-border"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((p) => (
              <div
                key={p.id}
                className="group bg-[#FAF9FF] rounded-3xl border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 overflow-hidden flex flex-col"
              >
                {/* Visual Header */}
                <div className={`p-8 bg-gradient-to-br ${p.accent} border-b border-border/60 relative`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/90 text-primary shadow-xs">
                      {p.category}
                    </span>
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-dark/80 text-white shadow-xs">
                      {p.impact}
                    </span>
                  </div>

                  <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white shadow-md my-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-dark-muted mb-1">
                      {p.client}
                    </p>
                    <h3 className="text-2xl font-extrabold text-dark mb-4">{p.title}</h3>

                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-border">
                      {p.metrics.map((m, mIdx) => (
                        <div key={mIdx}>
                          <p className="text-sm font-black text-primary">{m.value}</p>
                          <p className="text-[11px] text-dark-muted">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-8 flex-1 flex flex-col justify-between bg-white">
                  <div>
                    <p className="text-sm text-dark-muted leading-relaxed mb-6">
                      {p.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {p.technologies.map((t) => (
                        <span
                          key={t}
                          className="text-xs font-medium px-2.5 py-1 rounded-md bg-softBg text-dark border border-border"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border flex items-center justify-between">
                    <button
                      onClick={() => setActiveProjectModal(p)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition-colors"
                    >
                      <span>Read Case Study Summary</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <span className="text-xs text-dark-muted font-medium">Production Architecture</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Case Study Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 relative shadow-2xl border border-border">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-6 right-6 text-dark-muted hover:text-dark font-bold text-lg"
            >
              ✕
            </button>
            <span className="text-xs font-bold text-primary uppercase tracking-wider">
              {activeProjectModal.category}
            </span>
            <h3 className="text-2xl font-extrabold text-dark mt-1 mb-4">
              {activeProjectModal.title}
            </h3>
            <p className="text-sm text-dark-muted leading-relaxed mb-6">
              {activeProjectModal.description}
            </p>

            <div className="bg-softBg p-4 rounded-xl border border-border mb-6">
              <p className="text-xs font-bold text-dark uppercase tracking-wider mb-2">
                Documented Business Impact
              </p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {activeProjectModal.metrics.map((m, idx) => (
                  <div key={idx} className="bg-white p-2 rounded-lg border border-border">
                    <p className="text-sm font-black text-primary">{m.value}</p>
                    <p className="text-[10px] text-dark-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setActiveProjectModal(null)}
                className="px-5 py-2.5 rounded-full border border-border text-sm font-semibold hover:bg-softBg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setActiveProjectModal(null);
                  setIsContactOpen(true);
                }}
                className="px-6 py-2.5 rounded-full bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-glow-sm"
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

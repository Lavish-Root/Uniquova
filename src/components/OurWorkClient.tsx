"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import VerticalWorkShowcase from "@/components/VerticalWorkShowcase";
import { ProjectItem } from "@/data/agencyData";
import initialProjects from "@/data/projects.json";
import { Layers } from "lucide-react";

export default function OurWorkClient() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects as ProjectItem[]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  // Fetch live updates from API with instant cache
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("uniquova_projects_v2");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProjects(parsed);
          return;
        }
      }
    } catch {
      // Ignore
    }

    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects) && data.projects.length > 0) {
          setProjects(data.projects);
          try {
            sessionStorage.setItem("uniquova_projects_v2", JSON.stringify(data.projects));
          } catch {
            // Ignore
          }
        }
      })
      .catch(() => {
        // Keep initialProjects fallback
      });
  }, []);

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col selection:bg-primary selection:text-white">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* Hero Section */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-20 purple-mesh-bg relative overflow-hidden">
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
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-tight mb-6">
              Our Work: Engineered for <br />
              <span className="gradient-text">Commercial Growth.</span>
            </h1>

            <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed">
              Explore our verified portfolio of production web platforms, 
              scalable commerce systems, mobile applications, and brand identities.
            </p>
          </div>
        </div>
      </section>

      {/* High-End Minimalist 2-Column Showcase Grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="bg-softBg border border-border rounded-3xl p-12 text-center my-8">
              <Layers className="w-12 h-12 text-primary/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-dark mb-1">No Projects Found</h3>
              <p className="text-sm text-dark-muted max-w-md mx-auto mb-6">
                Our portfolio showcase is loading fresh deliverables.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12 lg:gap-x-10 lg:gap-y-16">
              {projects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer select-none flex flex-col transition-all duration-300"
                >
                  {/* Rounded Showcase Box Image Container */}
                  <div className="relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/10] w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-950 shadow-[0_4px_20px_rgba(0,0,0,0.06)] group-hover:shadow-[0_20px_40px_rgba(117,69,245,0.16)] transition-all duration-500">
                    {/* Project Image */}
                    <img
                      src={project.mediaUrl || "/images/services/web_dev_bg.jpg"}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03] brightness-[0.98]"
                    />

                    {/* Subtle Overlay Tint on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Floating Top-Left Tags / Badges */}
                    <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex flex-wrap items-center gap-1.5 sm:gap-2 z-10">
                      {(project.badges && project.badges.length > 0
                        ? project.badges
                        : [project.serviceCategory]
                      ).map((badge, bIdx) => (
                        <span
                          key={bIdx}
                          className="text-[11px] sm:text-xs font-semibold px-2.5 sm:px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-dark shadow-sm border border-white/40"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Clean Bottom Row: Title on Left, Pill Tags on Right */}
                  <div className="mt-3.5 sm:mt-4 flex items-start justify-between gap-3 px-0.5">
                    {/* Left: Project Title */}
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-dark group-hover:text-primary transition-colors leading-snug line-clamp-2">
                      {project.title}
                    </h3>

                    {/* Right: Pill Tags */}
                    <div className="flex items-center gap-1.5 shrink-0 pt-0.5">
                      {(project.tags && project.tags.length > 0
                        ? project.tags
                        : [project.serviceCategory]
                      ).map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[10px] sm:text-xs font-medium px-2.5 sm:px-3 py-0.5 rounded-full border border-border/80 text-dark-muted bg-white shadow-2xs whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Dedicated Vertical Component for Selected Work */}
      <VerticalWorkShowcase
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* CTA */}
      <ContactCTA onOpenContact={() => setIsContactOpen(true)} />

      <Footer />

      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
    </main>
  );
}

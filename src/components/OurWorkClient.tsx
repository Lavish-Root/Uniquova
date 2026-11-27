"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import ContactModal from "@/components/ContactModal";
import VerticalWorkShowcase from "@/components/VerticalWorkShowcase";
import { ProjectItem } from "@/data/agencyData";
import initialProjects from "@/data/projects.json";
import { Layers, ArrowUpRight, Sparkles } from "lucide-react";
import ScrollHeading from "@/components/ScrollHeading";

interface WorkCardMotionProps {
  project: ProjectItem;
  side: "left" | "right";
  onClick: () => void;
}

// ====================================================================
// CINEMATIC AWARD-WINNING 3D SCROLL ENTRANCE & CONTINUOUS PARALLAX
// - 3-Zone dynamic scroll runway: below viewport -> active focal zone -> gentle exit drift
// - Left cards emerge from deep down side tilted counter-clockwise (-8.5deg -> 0deg)
// - Right cards emerge from deep down side tilted clockwise (+8.5deg -> 0deg)
// - Deep vertical travel (y: 280px -> 0px) with 3D tilt (rotateX: 14deg -> 0deg) & scale (0.84 -> 1.0)
// - Static anchor wrapper eliminates scroll jitter and layout feedback loops
// - Buttery spring physics with natural inertia for fluid deceleration
// - Interactive 3D micro-tilt on mouse hover
// ====================================================================
function WorkCardMotion({ project, side, onClick }: WorkCardMotionProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  // Static target tracks the true document scroll runway continuously
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start 100%", "end 0%"],
  });

  // Soft, floaty spring physics with inertia for natural fluid deceleration
  const springConfig = { stiffness: 70, damping: 20, mass: 0.3 };

  // Soft subtle entrance angle (±3deg -> 0deg)
  const initialRotate = side === "left" ? -3 : 3;
  const rawRotateZ = useTransform(
    scrollYProgress,
    [0, 0.35, 0.85, 1],
    [initialRotate, 0, 0, 0]
  );

  // Deep vertical travel with smooth deceleration
  const rawY = useTransform(
    scrollYProgress,
    [0, 0.35, 0.85, 1],
    [90, 0, 0, 0]
  );

  // Scale bloom: 0.94 -> 1.0
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.35, 0.85, 1],
    [0.94, 1.0, 1.0, 1.0]
  );

  // Opacity fade: 0 -> 1.0
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.22, 0.85, 1],
    [0, 1.0, 1.0, 1.0]
  );

  const smoothRotateZ = useSpring(rawRotateZ, springConfig);
  const smoothY = useSpring(rawY, springConfig);
  const smoothScale = useSpring(rawScale, springConfig);
  const smoothOpacity = useSpring(rawOpacity, springConfig);

  const cleanMediaUrl = (project.mediaUrl || "/images/services/web_dev_bg.jpg")
    .replace(/_(2560|2048|1920|1440|960)\.webp/, "_480.webp");

  return (
    <div ref={triggerRef} className="relative w-full z-10 hover:z-20">
      <motion.div
        style={{
          y: smoothY,
          rotateZ: smoothRotateZ,
          scale: smoothScale,
          opacity: smoothOpacity,
        }}
        className="will-change-transform"
      >
        <div
          role="button"
          tabIndex={0}
          aria-label={`View case study: ${project.title}`}
          onClick={onClick}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onClick();
            }
          }}
          className="group cursor-pointer select-none bg-white rounded-[28px] sm:rounded-[36px] p-4 sm:p-5 lg:p-6 border border-border/80 shadow-[0_6px_28px_rgba(21,19,35,0.04)] hover:shadow-[0_24px_60px_rgba(117,69,245,0.18)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 ease-out flex flex-col justify-between relative overflow-hidden focus:outline-hidden focus:ring-2 focus:ring-primary/40 active:scale-[0.99]"
        >
          {/* Ambient Lavender Bloom on Hover */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Rounded Showcase Box Image Container */}
          <div className="relative aspect-[16/10] sm:aspect-[4/3] md:aspect-[16/11] w-full rounded-2xl sm:rounded-[26px] overflow-hidden bg-slate-950 shadow-inner mb-4 sm:mb-5">
            <img
              src={cleanMediaUrl}
              alt={project.title}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out filter contrast-[1.03] brightness-[0.98] pointer-events-none select-none"
            />

            {/* Subtle Overlay Tint on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Floating Top-Left Badges */}
            <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 flex flex-wrap items-center gap-1.5 sm:gap-2 z-10 pointer-events-none">
              {(project.badges && project.badges.length > 0
                ? project.badges
                : [project.serviceCategory]
              ).map((badge, bIdx) => (
                <span
                  key={bIdx}
                  className="text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-dark shadow-sm border border-white/60"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Quick Action Pill on Image (Bottom Right) */}
            <div className="absolute bottom-3.5 right-3.5 z-10 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 pointer-events-none">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg shadow-primary/30 border border-white/30">
                <span>View Case Study</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Card Details: Title, Description, and Tags */}
          <div className="px-1 flex flex-col relative z-10">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-black text-dark group-hover:text-primary transition-colors tracking-tight leading-snug">
                {project.title}
              </h3>
              <span className="text-[11px] font-bold text-primary px-3 py-1 rounded-full bg-primary-light border border-primary-200/60 shrink-0 whitespace-nowrap mt-0.5">
                {project.serviceCategory}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-dark-muted font-normal leading-relaxed line-clamp-2 mb-4">
              {project.description}
            </p>

            {/* Tags & Explore Action */}
            <div className="pt-3 border-t border-border/60 flex items-center justify-between gap-2">
              <div className="flex flex-wrap items-center gap-1.5">
                {(project.tags && project.tags.length > 0
                  ? project.tags
                  : [project.serviceCategory]
                ).map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-border/80 text-dark-muted bg-[#FAF9FF] group-hover:border-primary/20 group-hover:bg-primary-light/40 group-hover:text-primary transition-colors whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:translate-x-1 transition-transform shrink-0">
                <span>View Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function OurWorkClient() {
  const [projects, setProjects] = useState<ProjectItem[]>(initialProjects as ProjectItem[]);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax differential for right column
  const { scrollYProgress: sectionScroll } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rawCol2Parallax = useTransform(sectionScroll, [0, 1], [0, -60]);
  const smoothCol2Parallax = useSpring(rawCol2Parallax, { stiffness: 60, damping: 18 });

  // Filter categories
  const categories = ["All", "Web Development", "E-commerce", "Branding", "App Development"];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "All") return true;
    return (
      p.serviceCategory?.toLowerCase().includes(activeCategory.toLowerCase()) ||
      p.tags?.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  });

  // Split filtered projects into 2 staggered columns
  const col1 = filteredProjects.filter((_, idx) => idx % 2 === 0);
  const col2 = filteredProjects.filter((_, idx) => idx % 2 === 1);

  // Fetch live updates from API with instant cache
  useEffect(() => {
    try {
      const cached = sessionStorage.getItem("uniquova_projects_v2");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) {
          setProjects(parsed);
        }
      }
    } catch {
      // Ignore
    }

    fetch(`/api/projects?t=${Date.now()}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.projects)) {
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
              className="w-full h-full object-cover object-center lg:object-right filter contrast-[1.04] brightness-[0.98]"
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
      <section
        ref={sectionRef}
        className="py-12 sm:py-16 lg:py-24 bg-[#FAF9FF]/50 relative overflow-hidden"
      >
        {/* Soft Background Ambient Light Gradients */}
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-primary-light/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Heading with Bidirectional Scroll Link */}
          <ScrollHeading
            className="mb-8 sm:mb-10 text-center"
            title={
              <>
                Design that lives. <span className="gradient-text">Beyond the mockups.</span>
              </>
            }
            subtitle="Not mockups. Not renders. Our work on real brands, real businesses, and real places driving actual commercial results."
          />

          {/* Interactive Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-14 sm:mb-16">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "text-white shadow-glow-sm"
                      : "text-dark-muted hover:text-dark bg-white border border-border/80 hover:border-primary/30"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCategoryPill"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark rounded-full -z-10"
                    />
                  )}
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>

          {filteredProjects.length === 0 ? (
            <div className="bg-white border border-border rounded-3xl p-12 text-center my-8 shadow-xs">
              <Layers className="w-12 h-12 text-primary/40 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-dark mb-1">No Projects Found</h3>
              <p className="text-sm text-dark-muted max-w-md mx-auto mb-6">
                No deliverables found under this category filter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left Column */}
              <div className="flex flex-col gap-10 sm:gap-14 lg:gap-20">
                {col1.map((project) => (
                  <WorkCardMotion
                    key={project.id}
                    project={project}
                    side="left"
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </div>

              {/* Right Column (Staggered Downwards with Continuous Parallax) */}
              <motion.div
                style={{ y: smoothCol2Parallax }}
                className="flex flex-col gap-10 sm:gap-14 lg:gap-20 md:pt-24 lg:pt-32"
              >
                {col2.map((project) => (
                  <WorkCardMotion
                    key={project.id}
                    project={project}
                    side="right"
                    onClick={() => setSelectedProject(project)}
                  />
                ))}
              </motion.div>
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

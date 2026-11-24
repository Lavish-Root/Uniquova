"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Code,
  Smartphone,
  PenTool,
  Palette,
  ArrowUpRight,
  ArrowRight,
  Check,
  Sparkles,
  Eye,
  Heart,
  Filter,
} from "lucide-react";
import ScrollHeading from "@/components/ScrollHeading";
import ServicesMarquee from "./ServicesMarquee";

export interface ClayServiceItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  tagline: string;
  badge: string;
  category: "E-commerce & Growth" | "Web & Mobile Apps" | "Branding & Creatives";
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultImage: string;
  hoverImage: string;
  previewLabel: string;
  status: "Completed" | "In High Demand" | "Popular";
  views: number;
  likes: number;
  isPopular?: boolean;
  tags: string[];
  link: string;
}

const CLAY_SERVICES_DATA: ClayServiceItem[] = [
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "E-commerce Solutions",
    client: "Marketplace Scaling",
    tagline: "Sell. Grow. Scale.",
    badge: "E-commerce",
    category: "E-commerce & Growth",
    shortDesc: "We launch, manage, and scale your brand's sales across Amazon, Flipkart, and your own online store.",
    icon: ShoppingCart,
    defaultImage: "/images/services/ecom_shopping_store.jpg",
    hoverImage: "/images/services/ecom_digital_retail.jpg",
    previewLabel: "Marketplace Growth",
    status: "In High Demand",
    views: 4820,
    likes: 1240,
    tags: [
      "Amazon & Flipkart Store Management",
      "Profitable PPC Ads & Keyword Scaling",
      "High-Converting Listing SEO & Catalogs",
    ],
    link: "/services/ecommerce",
  },
  {
    id: "web-development",
    slug: "web-development",
    title: "Website Development",
    client: "Next.js Web Storefront",
    tagline: "Build. Perform. Excel.",
    badge: "Web Platform",
    category: "Web & Mobile Apps",
    shortDesc: "Ultra-fast, modern websites and web apps built to turn everyday visitors into paying customers on every screen.",
    icon: Code,
    defaultImage: "/images/services/web_dev_bg.jpg",
    hoverImage: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp",
    previewLabel: "Next.js Live Store",
    status: "Popular",
    isPopular: true,
    views: 6150,
    likes: 1980,
    tags: [
      "Custom High-Speed Business Websites",
      "Next.js E-commerce & Web Portals",
      "Mobile-First Responsive Experiences",
    ],
    link: "/services/web-development",
  },
  {
    id: "app-development",
    slug: "app-development",
    title: "App Development",
    client: "iOS & Android",
    tagline: "Innovate. Engage. Grow.",
    badge: "Mobile Apps",
    category: "Web & Mobile Apps",
    shortDesc: "Sleek, fluid mobile apps for iPhone and Android that deliver effortless user experiences and keep clients coming back.",
    icon: Smartphone,
    defaultImage: "/images/services/app_dev_bg.jpg",
    hoverImage: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp",
    previewLabel: "Mobile Experience",
    status: "Completed",
    views: 3940,
    likes: 870,
    tags: [
      "Native iOS & Android Mobile Apps",
      "Silky Smooth 60fps User Experience",
      "Instant Cloud Sync & Push Notifications",
    ],
    link: "/services/app-development",
  },
  {
    id: "branding",
    slug: "branding",
    title: "Branding & Identity",
    client: "Brand System",
    tagline: "Define. Differentiate.",
    badge: "Brand Identity",
    category: "Branding & Creatives",
    shortDesc: "Memorable logos, distinct color systems, and timeless visual identities that make your company instantly recognizable.",
    icon: PenTool,
    defaultImage: "/images/services/branding_bg.jpg",
    hoverImage: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_480.webp",
    previewLabel: "3D Brand System",
    status: "Completed",
    views: 5210,
    likes: 1450,
    tags: [
      "Signature Logo & Monogram Systems",
      "Complete Brand Guidelines & Tokens",
      "Packaging, Stationery & Social Kits",
    ],
    link: "/services/branding",
  },
  {
    id: "graphic-designing",
    slug: "graphic-design",
    title: "Graphic Designing",
    client: "Visual Creatives",
    tagline: "Create. Communicate.",
    badge: "Creative & Visuals",
    category: "Branding & Creatives",
    shortDesc: "Scroll-stopping social media posts, high-converting ad creatives, and marketing banners that drive measurable clicks.",
    icon: Palette,
    defaultImage: "/images/services/graphic_design_bg.jpg",
    hoverImage: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_480.webp",
    previewLabel: "Ad Creative & OOH",
    status: "Popular",
    views: 4320,
    likes: 1120,
    tags: [
      "High-Converting Ad Creatives & Reels",
      "Social Media Graphics for IG & LinkedIn",
      "Product Mockups & Marketing Banners",
    ],
    link: "/services/graphic-design",
  },
];

const FILTER_CATEGORIES = [
  "All Services",
  "E-commerce & Growth",
  "Web & Mobile Apps",
  "Branding & Creatives",
] as const;

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeFilter, setActiveFilter] = useState<string>("All Services");

  const filteredServices =
    activeFilter === "All Services"
      ? CLAY_SERVICES_DATA
      : CLAY_SERVICES_DATA.filter((s) => s.category === activeFilter);

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF8FF] relative overflow-hidden">
      {/* Decorative ambient background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          className="mb-10 sm:mb-12"
          badge={
            <div className="clay-inset inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-primary text-xs font-black uppercase tracking-wider border border-white/60 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>End-to-End Capabilities</span>
            </div>
          }
          title={
            <>
              Our Core <span className="gradient-text">Digital Services</span>
            </>
          }
          subtitle="From scaling high-volume marketplace stores to architecting custom web and mobile applications, we deliver end-to-end digital excellence designed for scalable revenue."
        />

        {/* ====================================================
            INTERACTIVE CLAY FILTER BUTTONS (From Reference UI)
           ==================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-12 sm:mb-14 overflow-x-auto pb-2 scrollbar-none">
          <div className="clay-inset p-2.5 rounded-2xl flex items-center gap-2 bg-white/40 border border-white/60">
            <Filter className="w-4 h-4 text-slate-400" />
          </div>
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`clay-btn !rounded-full px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-black transition-all cursor-pointer border border-white/60 ${
                activeFilter === cat ? "active text-primary" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ====================================================
            CLAYMORPHISM 3D CARDS GRID
            - Tactile dual shadows (.clay-card & .clay-card-hover)
            - Image zoom wrapper (.img-zoom-wrapper) with hover scale
            - Floating badges + Hover overlay with pop-in ArrowUpRight button
            - Framer Motion layout transition
           ==================================================== */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-8 mb-16"
        >
          <AnimatePresence>
            {filteredServices.map((service, idx) => {
              const IconComponent = service.icon;

              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 25 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.92, y: 25 }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  key={service.id}
                  className="h-full flex"
                >
                  <div
                    className={`clay-card clay-card-hover p-5 sm:p-6 w-full cursor-pointer group flex flex-col justify-between ${
                      service.isPopular
                        ? "border-2 border-primary/40 shadow-[14px_14px_30px_rgba(117,69,245,0.18),-10px_-10px_24px_rgba(255,255,255,0.95)]"
                        : ""
                    }`}
                  >
                    <div>
                      {/* ====================================================
                          IMAGE ZOOM WRAPPER & HOVER ACTION OVERLAY
                         ==================================================== */}
                      <div className="img-zoom-wrapper h-60 w-full bg-slate-200 relative mb-5 rounded-[24px]">
                        {/* Default Image */}
                        <img
                          src={service.defaultImage}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-400 ease-out select-none"
                          loading="lazy"
                        />

                        {/* Hover Live Preview Image */}
                        <img
                          src={service.hoverImage}
                          alt={`${service.title} Live Preview`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-108 transition-all duration-500 ease-out select-none"
                          loading="lazy"
                        />

                        {/* Floating Badges */}
                        <div className="absolute top-3.5 left-3.5 z-20">
                          <span className="clay-card !rounded-2xl px-3.5 py-1.5 text-xs font-black text-slate-700 shadow-md border-white/80 backdrop-blur-md bg-white/70">
                            {service.badge}
                          </span>
                        </div>

                        <div className="absolute top-3.5 right-3.5 z-20">
                          <span
                            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider clay-inset shadow-none border border-white/50 backdrop-blur-md ${
                              service.status === "Popular"
                                ? "bg-primary-light/90 text-primary"
                                : service.status === "In High Demand"
                                ? "bg-orange-100/90 text-orange-600"
                                : "bg-green-100/90 text-green-600"
                            }`}
                          >
                            {service.status}
                          </span>
                        </div>

                        {/* Hover Overlay with Pop-In Action Button */}
                        <div className="absolute inset-0 bg-[#7545F5]/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-[2px]">
                          <div className="clay-btn-primary w-14 h-14 rounded-full flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-300 delay-75 shadow-glow">
                            <ArrowUpRight className="w-6 h-6 stroke-[3px]" />
                          </div>
                        </div>

                        {/* Bottom Preview Label */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-20 pointer-events-none">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-xs">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                            <span>{service.previewLabel}</span>
                          </span>
                        </div>
                      </div>

                      {/* Title & Scope */}
                      <div className="px-1">
                        <div className="flex items-center justify-between gap-3 mb-1">
                          <h3 className="text-xl sm:text-[22px] font-black text-slate-800 leading-tight group-hover:text-primary transition-colors tracking-tight">
                            {service.title}
                          </h3>
                          <div className="w-8 h-8 rounded-xl clay-inset flex items-center justify-center text-primary shrink-0 border border-white/60">
                            <IconComponent className="w-4 h-4" />
                          </div>
                        </div>

                        <p className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3">
                          {service.tagline}
                        </p>

                        {/* Plain English Simple Description */}
                        <p className="text-sm text-slate-600 font-medium leading-relaxed mb-4">
                          {service.shortDesc}
                        </p>

                        {/* 3 Simple Tags */}
                        <div className="space-y-2 mb-5">
                          {service.tags.map((tag, tIdx) => (
                            <div key={tIdx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                              <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                <Check className="w-2.5 h-2.5 stroke-[3]" />
                              </div>
                              <span>{tag}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Meta Row: Views, Likes & Actions */}
                    <div className="px-1 pt-4 border-t-2 border-slate-300/30 mt-auto">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3.5">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-500">
                            <Eye className="w-4 h-4 stroke-[2.5px]" /> {service.views.toLocaleString()}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-500">
                            <Heart className="w-4 h-4 stroke-[2.5px] text-red-500" /> {service.likes.toLocaleString()}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectService?.(service.title);
                          }}
                          className="clay-inset text-xs font-black text-primary px-3 py-1 rounded-full border border-white/60 hover:text-primary-dark transition-colors cursor-pointer"
                        >
                          Inquire
                        </button>
                      </div>

                      <Link
                        href={service.link}
                        className="w-full clay-btn py-3 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-slate-700 hover:text-primary transition-all group/btn"
                      >
                        <span>Explore Full Scope</span>
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* ====================================================
              6TH CARD: CUSTOM ALL-IN-ONE GROWTH STRATEGY
              - Luxury dark claymorphic card
             ==================================================== */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.92, y: 25 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.25 }}
            className="h-full flex"
          >
            <div className="clay-card p-5 sm:p-6 w-full flex flex-col justify-between bg-gradient-to-br from-[#120E24] via-[#1A1435] to-[#0A0714] text-white border border-primary/40 shadow-[14px_14px_32px_rgba(21,19,35,0.4),-8px_-8px_20px_rgba(255,255,255,0.08)] group hover:-translate-y-2 transition-transform duration-300">
              <div>
                {/* Image Showcase */}
                <div className="img-zoom-wrapper h-60 w-full relative mb-5 rounded-[24px] overflow-hidden bg-black/40">
                  <img
                    src="/images/services/ecommerce_bg_1.jpg"
                    alt="Growth Strategy"
                    className="w-full h-full object-cover group-hover:opacity-0 transition-opacity duration-400 select-none"
                    loading="lazy"
                  />
                  <img
                    src="/images/hero-reference.jpg"
                    alt="Full-Service Agency Impact"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-108 transition-all duration-500 select-none"
                    loading="lazy"
                  />

                  <div className="absolute top-3.5 left-3.5 z-20">
                    <span className="px-3.5 py-1.5 rounded-2xl text-xs font-black text-purple-200 bg-white/10 backdrop-blur-md border border-white/20">
                      Custom Bundle
                    </span>
                  </div>

                  <div className="absolute top-3.5 right-3.5 z-20">
                    <span className="px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-primary/80 text-white backdrop-blur-md border border-primary-300/40">
                      High Growth
                    </span>
                  </div>

                  <div className="absolute inset-0 bg-[#7545F5]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 backdrop-blur-[2px]">
                    <div className="clay-btn-primary w-14 h-14 rounded-full flex items-center justify-center text-white scale-50 group-hover:scale-100 transition-transform duration-300 shadow-glow">
                      <ArrowUpRight className="w-6 h-6 stroke-[3px]" />
                    </div>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between z-20 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-pulse" />
                      <span>All-in-One Team</span>
                    </span>
                  </div>
                </div>

                <div className="px-1">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <h3 className="text-xl sm:text-[22px] font-black text-white leading-tight tracking-tight">
                      Need an Integrated Growth Strategy?
                    </h3>
                    <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-primary-300 shrink-0 border border-white/20">
                      <Sparkles className="w-4 h-4" />
                    </div>
                  </div>

                  <p className="text-xs font-extrabold text-primary-300 uppercase tracking-widest mb-3">
                    Unified Agency Team
                  </p>

                  <p className="text-sm text-purple-200/80 font-medium leading-relaxed mb-4">
                    Combine marketplace management, custom website engineering, and branding into one dedicated team.
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-100">
                      <div className="w-4 h-4 rounded-full bg-primary/30 text-primary-300 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Dedicated Cross-Functional Team</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-100">
                      <div className="w-4 h-4 rounded-full bg-primary/30 text-primary-300 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Custom Growth Roadmap & Strategy</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-purple-100">
                      <div className="w-4 h-4 rounded-full bg-primary/30 text-primary-300 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span>Direct Founder Slack Channel</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-1 pt-4 border-t-2 border-white/15 mt-auto">
                <Link
                  href="/contact"
                  className="w-full clay-btn-primary py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs font-black text-white transition-all shadow-glow-sm hover:shadow-glow cursor-pointer"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Strategy Call CTA Banner in Tactile Clay */}
        <div className="clay-card p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/80">
          <div>
            <h4 className="text-lg font-black text-slate-800 tracking-tight">
              Not sure which service is right for your growth stage?
            </h4>
            <p className="text-sm text-slate-500 mt-1 font-bold">
              Our digital strategists will audit your brand presence and map out a free roadmap.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 clay-btn py-3 px-7 rounded-full text-primary font-black text-sm border border-white/70 hover:clay-btn-primary transition-all cursor-pointer"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-4 h-4 inline-block ml-2" />
          </Link>
        </div>

      </div>

      {/* FULL HORIZONTAL EDGE-TO-EDGE MARQUEE */}
      <div className="w-full mt-12 overflow-hidden relative z-10">
        <ServicesMarquee />
      </div>
    </section>
  );
}

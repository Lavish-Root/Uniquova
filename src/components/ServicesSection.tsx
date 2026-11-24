"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ShoppingCart,
  Code,
  Smartphone,
  PenTool,
  Palette,
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import ScrollHeading from "@/components/ScrollHeading";
import ServicesMarquee from "./ServicesMarquee";

export interface ServiceCardItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  badge: string;
  shortDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultImage: string;
  hoverImage: string;
  previewLabel: string;
  isPopular?: boolean;
  tags: string[];
  link: string;
}

const CORE_SERVICES: ServiceCardItem[] = [
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "E-commerce Solutions",
    tagline: "Sell. Grow. Scale.",
    badge: "Marketplace & Growth",
    shortDesc: "We launch, manage, and scale your brand's sales across Amazon, Flipkart, and your own online store.",
    icon: ShoppingCart,
    defaultImage: "/images/services/ecom_shopping_store.jpg",
    hoverImage: "/images/services/ecom_digital_retail.jpg",
    previewLabel: "Marketplace Growth",
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
    tagline: "Build. Perform. Excel.",
    badge: "Full-Stack & High Speed",
    shortDesc: "Ultra-fast, modern websites and web apps built to turn everyday visitors into paying customers on every screen.",
    icon: Code,
    defaultImage: "/images/services/web_dev_bg.jpg",
    hoverImage: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp",
    previewLabel: "Next.js Web Storefront",
    isPopular: true,
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
    tagline: "Innovate. Engage. Grow.",
    badge: "iOS & Android",
    shortDesc: "Sleek, fluid mobile apps for iPhone and Android that deliver effortless user experiences and keep clients coming back.",
    icon: Smartphone,
    defaultImage: "/images/services/app_dev_bg.jpg",
    hoverImage: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp",
    previewLabel: "Mobile App Experience",
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
    tagline: "Define. Differentiate.",
    badge: "Identity & Strategy",
    shortDesc: "Memorable logos, distinct color systems, and timeless visual identities that make your company instantly recognizable.",
    icon: PenTool,
    defaultImage: "/images/services/branding_bg.jpg",
    hoverImage: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_480.webp",
    previewLabel: "3D Brand System",
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
    tagline: "Create. Communicate.",
    badge: "Creative & Visuals",
    shortDesc: "Scroll-stopping social media posts, high-converting ad creatives, and marketing banners that drive measurable clicks.",
    icon: Palette,
    defaultImage: "/images/services/graphic_design_bg.jpg",
    hoverImage: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_480.webp",
    previewLabel: "Ad Creative & OOH",
    tags: [
      "High-Converting Ad Creatives & Reels",
      "Social Media Graphics for IG & LinkedIn",
      "Product Mockups & Marketing Banners",
    ],
    link: "/services/graphic-design",
  },
];

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  // Staggered flowing scroll entrance variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 35, scale: 0.97 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      {/* Decorative ambient background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          className="mb-14 sm:mb-16"
          badge={
            <div className="inline-flex items-center gap-2 bg-primary-light text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-primary-200 shadow-xs">
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

        {/* 6 Cards Grid: Flowing Scroll Entrance + Fast Interactive Hover Card Animations */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 lg:gap-8 mb-16"
        >
          {CORE_SERVICES.map((service) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className={`group relative bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-300 ease-out hover:-translate-y-2.5 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-[0_22px_50px_rgba(117,69,245,0.16)] will-change-transform ${
                  service.isPopular
                    ? "border-primary/40 ring-2 ring-primary/20 bg-gradient-to-b from-[#FAF8FF] to-white shadow-[0_10px_30px_rgba(117,69,245,0.08)]"
                    : "border-border/80 hover:border-primary/50"
                }`}
              >
                {/* Ambient Soft Lavender Hover Flare */}
                <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col justify-between h-full">
                  <div>
                    {/* Top Row: Icon, Category Badge & Optional Popular Tag */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-primary-light border border-primary-200/60 text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs group-hover:shadow-glow-sm group-hover:scale-105">
                        <IconComponent className="w-6 h-6" />
                      </div>

                      <div className="flex items-center gap-2">
                        {service.isPopular && (
                          <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-primary to-primary-dark text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                            Popular
                          </span>
                        )}
                        <span className="text-xs font-bold px-3 py-1 rounded-full bg-softBg text-dark-muted border border-border/80 shadow-xs">
                          {service.badge}
                        </span>
                      </div>
                    </div>

                    {/* Title & Tagline */}
                    <div>
                      <h3 className="text-xl sm:text-[22px] font-black text-dark group-hover:text-primary transition-colors duration-200 tracking-tight leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs font-bold text-primary tracking-wide uppercase mt-0.5">
                        {service.tagline}
                      </p>
                    </div>

                    {/* Simple, Everyday Plain English Description */}
                    <p className="text-sm text-dark-muted leading-relaxed mt-2.5 font-normal">
                      {service.shortDesc}
                    </p>

                    {/* ====================================================
                        COOL INTERACTIVE IMAGE SHOWCASE
                        - Default state: High-res clean visual/mockup
                        - Hover state: Smoothly cross-fades into dynamic live preview deliverable
                        - Subtle zoom and preview badge
                       ==================================================== */}
                    <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden my-5 bg-[#0F0D1B] border border-border/80 group-hover:border-primary/40 transition-colors duration-300 shadow-xs group-hover:shadow-md">
                      {/* Default Image */}
                      <img
                        src={service.defaultImage}
                        alt={`${service.title} Overview`}
                        className="w-full h-full object-cover object-center group-hover:opacity-0 transition-opacity duration-400 ease-out select-none"
                        loading="lazy"
                      />

                      {/* Hover Image (Reveals smoothly on hover) */}
                      <img
                        src={service.hoverImage}
                        alt={`${service.title} Deliverable Preview`}
                        className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-500 ease-out select-none"
                        loading="lazy"
                      />

                      {/* Vignette Shadow Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent pointer-events-none" />

                      {/* Floating Bottom Preview Pill */}
                      <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          <span>{service.previewLabel}</span>
                        </span>

                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/80 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span>Hovered</span>
                        </span>
                      </div>
                    </div>

                    {/* 3 Simple, Clear Feature Highlights (Plain English) */}
                    <div className="space-y-2 mb-6">
                      {service.tags.map((tag, tIdx) => (
                        <div key={tIdx} className="flex items-center gap-2.5 text-xs font-semibold text-dark/90">
                          <div className="w-4 h-4 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </div>
                          <span>{tag}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer: Action Links */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/70 mt-auto">
                    <Link
                      href={service.link}
                      className="inline-flex items-center gap-1.5 text-sm font-extrabold text-primary group-hover:text-primary-dark transition-colors group/btn"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1.5 transition-transform duration-200" />
                    </Link>

                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectService) {
                          onSelectService(service.title);
                        }
                      }}
                      className="text-xs font-bold text-dark-muted hover:text-primary px-3 py-1.5 rounded-full hover:bg-primary-light transition-all cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* ====================================================
              6TH CARD: CUSTOM ALL-IN-ONE GROWTH STRATEGY
              - Luxury dark gradient bento card
              - Interactive preview image with hover swap
              - Straightforward bundle proposal
             ==================================================== */}
          <motion.div
            variants={cardVariants}
            className="group relative bg-gradient-to-br from-[#120E24] via-[#1A1435] to-[#0A0714] text-white rounded-3xl p-6 sm:p-7 border border-primary/30 flex flex-col justify-between overflow-hidden shadow-xl hover:shadow-[0_22px_50px_rgba(117,69,245,0.25)] hover:-translate-y-2.5 transition-all duration-300 will-change-transform"
          >
            {/* Ambient Radial Flare */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-48 h-48 bg-primary/30 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                {/* Header Row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-primary-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs group-hover:scale-105">
                    <Sparkles className="w-6 h-6" />
                  </div>

                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/10 text-purple-200 border border-white/15">
                    Custom Bundle
                  </span>
                </div>

                {/* Title & Tagline */}
                <div>
                  <h3 className="text-xl sm:text-[22px] font-black text-white tracking-tight leading-snug">
                    Need an Integrated Growth Strategy?
                  </h3>
                  <p className="text-xs font-bold text-primary-300 tracking-wide uppercase mt-0.5">
                    Unified Agency Team
                  </p>
                </div>

                {/* Simple 1-Sentence Plain English Description */}
                <p className="text-sm text-purple-200/80 leading-relaxed mt-2.5 font-normal">
                  Combine e-commerce marketplace scaling, custom web engineering, and branding into one dedicated team to maximize revenue.
                </p>

                {/* Cool Interactive Image Showcase for Custom Bundle */}
                <div className="relative h-44 sm:h-48 w-full rounded-2xl overflow-hidden my-5 bg-[#0A0714] border border-white/15 group-hover:border-primary/50 transition-colors duration-300 shadow-xs group-hover:shadow-md">
                  <img
                    src="/images/services/ecommerce_bg_1.jpg"
                    alt="Growth Strategy Ecosystem"
                    className="w-full h-full object-cover object-center group-hover:opacity-0 transition-opacity duration-400 ease-out select-none"
                    loading="lazy"
                  />
                  <img
                    src="/images/hero-reference.jpg"
                    alt="Full-Service Agency Impact"
                    className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-500 ease-out select-none"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/65 backdrop-blur-md text-white text-[11px] font-bold border border-white/20 shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-pulse" />
                      <span>All-in-One Team</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-white/80 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span>Scale Together</span>
                    </span>
                  </div>
                </div>

                {/* 3 Simple Tags */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-purple-100">
                    <div className="w-4 h-4 rounded-full bg-primary/20 text-primary-300 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Dedicated Cross-Functional Team</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-purple-100">
                    <div className="w-4 h-4 rounded-full bg-primary/20 text-primary-300 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Custom Service Scope & Roadmap</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-purple-100">
                    <div className="w-4 h-4 rounded-full bg-primary/20 text-primary-300 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>Direct Founder Slack Channel</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-white/15 mt-auto">
                <Link
                  href="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-bold text-sm px-6 py-3.5 rounded-full shadow-glow-sm hover:shadow-glow transition-all duration-200 cursor-pointer"
                >
                  <span>Request Custom Proposal</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Strategy Call CTA Banner */}
        <div className="bg-white rounded-3xl border border-border/80 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div>
            <h4 className="text-lg font-black text-dark tracking-tight">
              Not sure which service is right for your growth stage?
            </h4>
            <p className="text-sm text-dark-muted mt-1 font-medium">
              Our digital strategists will audit your brand presence and map out a free roadmap.
            </p>
          </div>

          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 bg-softBg hover:bg-primary-light text-primary font-bold text-sm px-6 py-3 rounded-full border border-primary/20 hover:border-primary/40 transition-all duration-200 cursor-pointer"
          >
            <span>Book a Strategy Call</span>
            <ArrowRight className="w-4 h-4" />
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

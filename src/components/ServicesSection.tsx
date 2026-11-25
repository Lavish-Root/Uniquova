"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";
import ScrollHeading from "@/components/ScrollHeading";
import ServicesMarquee from "./ServicesMarquee";

export interface DomainTag {
  label: string;
  image: string;
}

export interface ServiceCardData {
  id: string;
  slug: string;
  domain: string;
  title: string;
  defaultImage: string;
  tags: DomainTag[];
  link: string;
}

const CORE_SERVICES: ServiceCardData[] = [
  {
    id: "ecommerce",
    slug: "ecommerce",
    domain: "E-commerce",
    title: "E-commerce that drives real sales",
    defaultImage: "/images/services/ecom_shopping_store.jpg",
    link: "/services/ecommerce",
    tags: [
      { label: "Amazon management", image: "/images/services/ecommerce_bg_1.jpg" },
      { label: "Flipkart operations", image: "/images/services/ecommerce_bg_3.jpg" },
      { label: "PPC ad campaigns", image: "/images/services/ecom_digital_retail.jpg" },
      { label: "Listing SEO", image: "/images/services/ecom_packages.jpg" },
      { label: "Product catalogs", image: "/images/services/ecom_shopping_store.jpg" },
      { label: "Storefront design", image: "/images/services/ecom_laptop_cart.jpg" },
    ],
  },
  {
    id: "web-development",
    slug: "web-development",
    domain: "Web Development",
    title: "Websites that close deals",
    defaultImage: "/images/services/web_dev_bg.jpg",
    link: "/services/web-development",
    tags: [
      { label: "Website design", image: "/images/services/web_dev_bg.jpg" },
      { label: "Landing pages", image: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp" },
      { label: "Wireframes & UX", image: "/images/selected_work/it4cXk12EJX3M46FocEoA4IDN8_480.webp" },
      { label: "Custom web apps", image: "/images/selected_work/QAxA8GI2uEu8q2zketxqbeX0Rg_480.webp" },
      { label: "Next.js performance", image: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_480.webp" },
      { label: "Design systems", image: "/images/selected_work/me7oqaVBqgeLO9RXw1QevAGsFlw_480.webp" },
    ],
  },
  {
    id: "app-development",
    slug: "app-development",
    domain: "App Development",
    title: "Apps that users love daily",
    defaultImage: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp",
    link: "/services/app-development",
    tags: [
      { label: "iOS applications", image: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp" },
      { label: "Android apps", image: "/images/services/app_dev_bg.jpg" },
      { label: "Cross-platform", image: "/images/selected_work/KentOs5VhgKxRvEU6cqYCY2pH7A_480.webp" },
      { label: "Fluid UI/UX", image: "/images/selected_work/qcyJpQGUrkkC5mT7vOWCxH6fZk_480.webp" },
      { label: "Custom features", image: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp" },
      { label: "App Store launch", image: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp" },
    ],
  },
  {
    id: "branding",
    slug: "branding",
    domain: "Branding",
    title: "Brand identity that means something",
    defaultImage: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_480.webp",
    link: "/services/branding",
    tags: [
      { label: "Branding strategy", image: "/images/services/branding_bg.jpg" },
      { label: "Naming & positioning", image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_480.webp" },
      { label: "Logo design", image: "/images/selected_work/6Fiwu9F9MKkOxpv42vAlXksFU_480.webp" },
      { label: "Visual identity", image: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_480.webp" },
      { label: "Brand guidelines", image: "/images/selected_work/6Fiwu9F9MKkOxpv42vAlXksFU_480.webp" },
      { label: "Marketing materials", image: "/images/selected_work/rLOEAajcxuoSByBHZOjxaMTnzA_480.webp" },
    ],
  },
  {
    id: "graphic-design",
    slug: "graphic-design",
    domain: "Graphic Designing",
    title: "Creatives that stop the scroll",
    defaultImage: "/images/services/graphic_design_bg.jpg",
    link: "/services/graphic-design",
    tags: [
      { label: "Social media creatives", image: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_480.webp" },
      { label: "Ad campaigns", image: "/images/services/graphic_design_bg.jpg" },
      { label: "3D mockups", image: "/images/selected_work/gtavCMDLHB0d9ehFukQtVNbXeU_480.webp" },
      { label: "Motion graphics", image: "/images/selected_work/rjlcLH3DNif0U74oMAOCto3zT0_480.webp" },
      { label: "Pitch & sales decks", image: "/images/selected_work/pT9GV8WvHgTQ65MW162mjfBro_480.webp" },
      { label: "Marketing banners", image: "/images/selected_work/rLOEAajcxuoSByBHZOjxaMTnzA_480.webp" },
    ],
  },
  {
    id: "growth-strategy",
    slug: "ecommerce",
    domain: "Integrated Growth",
    title: "Growth strategy that scales brands",
    defaultImage: "/images/pillars/integrated.jpg",
    link: "/contact",
    tags: [
      { label: "Dedicated growth team", image: "/images/pillars/tech_execution.jpg" },
      { label: "Omnichannel scaling", image: "/images/pillars/integrated.jpg" },
      { label: "Conversion optimization", image: "/images/pillars/business_focused.jpg" },
      { label: "Full-funnel roadmap", image: "/images/pillars/scalable.jpg" },
      { label: "Founder Slack channel", image: "/images/pillars/client_centric.jpg" },
    ],
  },
];

interface ServicesSectionProps {
  onSelectService?: (serviceTitle: string) => void;
}

function ServiceCard({
  service,
}: {
  service: ServiceCardData;
  onSelectService?: (title: string) => void;
}) {
  const [activeImage, setActiveImage] = useState<string>(service.defaultImage);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isManualTagHover, setIsManualTagHover] = useState<boolean>(false);

  // Automatic image slideshow when the card is hovered
  useEffect(() => {
    if (!isHovered || isManualTagHover || service.tags.length === 0) return;

    let isCancelled = false;
    let intervalId: NodeJS.Timeout | null = null;

    // Gentle 500ms delay before cycling so casual mouse passing doesn't trigger rapid switches
    const initialTimeout = setTimeout(() => {
      if (isCancelled) return;

      // Advance to first tag deliverable
      setActiveTagIndex(0);
      setActiveImage(service.tags[0].image);

      // Cycle automatically through all deliverable images every 1.5 seconds
      intervalId = setInterval(() => {
        setActiveTagIndex((prev) => {
          const next = prev === null ? 0 : (prev + 1) % service.tags.length;
          setActiveImage(service.tags[next].image);
          return next;
        });
      }, 1500);
    }, 500);

    return () => {
      isCancelled = true;
      clearTimeout(initialTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [isHovered, isManualTagHover, service.tags]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="group flex flex-col cursor-pointer"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsManualTagHover(false);
        setActiveImage(service.defaultImage);
        setActiveTagIndex(null);
      }}
    >
      {/* ====================================================
          TOP IMAGE SHOWCASE
          - Rounded corners (rounded-[24px] sm:rounded-[28px])
          - Automatically cycles images on card hover
          - Changes image instantly when hovering specific tags
          - Top-left: Domain category badge
          - Top-right: Lime-green circular button with ArrowUpRight
         ==================================================== */}
      <Link
        href={service.link}
        className="relative w-full h-[220px] sm:h-[250px] lg:h-[265px] rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-100 mb-4 sm:mb-5 shadow-xs group-hover:shadow-lg transition-all duration-300 block"
      >
        <motion.img
          key={activeImage}
          src={activeImage}
          alt={service.title}
          initial={{ opacity: 0.75, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out select-none"
          loading="eager"
        />

        {/* Domain pill badge in top-left */}
        <div className="absolute top-3.5 left-3.5 z-20">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold tracking-wide border border-white/20 shadow-xs">
            {service.domain}
          </span>
        </div>

        {/* Circular Lavender ArrowUpRight Badge in Top Right Corner */}
        <div className="absolute top-3.5 right-3.5 z-20">
          <div className="w-8 h-8 rounded-full bg-primary hover:bg-primary-dark text-white flex items-center justify-center shadow-[0_4px_14px_rgba(117,69,245,0.4)] border border-white/30 group-hover:scale-110 group-hover:rotate-45 transition-all duration-300">
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>

        {/* Subtle Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
      </Link>

      {/* Headline Title */}
      <Link href={service.link}>
        <h3 className="text-xl sm:text-[23px] font-black text-slate-900 tracking-tight leading-snug mb-3 group-hover:text-primary transition-colors">
          {service.title}
        </h3>
      </Link>

      {/* Pill Tags: Automatically synced with auto-cycle OR manual hover */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
        {service.tags.map((tag, tIdx) => {
          const isSelected = activeTagIndex === tIdx;
          return (
            <span
              key={tIdx}
              onMouseEnter={() => {
                setIsManualTagHover(true);
                setActiveImage(tag.image);
                setActiveTagIndex(tIdx);
              }}
              onMouseLeave={() => {
                setIsManualTagHover(false);
              }}
              className={`text-[11px] sm:text-[12px] font-medium px-3 py-1 sm:py-1.5 rounded-full border transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5 ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs scale-105"
                  : "bg-slate-100/90 text-slate-700 border-slate-200/60 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {isSelected && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-300 animate-pulse shrink-0" />
              )}
              <span>{tag.label}</span>
            </span>
          );
        })}
      </div>
    </motion.div>
  );
}

export default function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF9FF] relative overflow-hidden">
      {/* Decorative ambient background blurs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          className="mb-12 sm:mb-16"
          title={
            <>
              Our Core <span className="gradient-text">Digital Services</span>
            </>
          }
          subtitle="From scaling high-volume marketplace stores to architecting custom web and mobile applications, we deliver end-to-end digital excellence designed for scalable revenue."
        />

        {/* 6 Cards Grid: Exactly Matching Reference Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 mb-16">
          {CORE_SERVICES.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
              onSelectService={onSelectService}
            />
          ))}
        </div>

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

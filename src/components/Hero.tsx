"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  ShoppingCart,
  Code,
  Smartphone,
  PenTool,
  Palette,
  Star,
} from "lucide-react";
import TrustedBy from "./TrustedBy";

interface HeroProps {
  onOpenContact?: () => void;
}

export default function Hero({ onOpenContact }: HeroProps) {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  // Floating service cards exactly matching the reference image
  const floatingCards = [
    {
      id: "ecommerce",
      title: "E-commerce Solutions",
      subtitle: "Sell. Grow. Scale.",
      icon: ShoppingCart,
      position: "top-4 -left-6 md:top-8 md:-left-8",
      animClass: "animate-float",
      href: "/services/ecommerce",
    },
    {
      id: "web-dev",
      title: "Website Development",
      subtitle: "Build. Perform. Excel.",
      icon: Code,
      position: "-top-6 right-8 md:-top-4 md:right-12",
      animClass: "animate-float-slow",
      href: "/services/web-development",
    },
    {
      id: "app-dev",
      title: "App Development",
      subtitle: "Innovate. Engage. Grow.",
      icon: Smartphone,
      position: "top-1/2 -right-6 md:top-1/2 md:-right-8 -translate-y-1/2",
      animClass: "animate-float",
      href: "/services/app-development",
    },
    {
      id: "branding",
      title: "Branding",
      subtitle: "Define. Differentiate.",
      icon: PenTool,
      position: "bottom-6 -left-4 md:bottom-10 md:-left-6",
      animClass: "animate-float-reverse",
      href: "/services/branding",
    },
    {
      id: "graphic-design",
      title: "Graphic Designing",
      subtitle: "Create. Communicate.",
      icon: Palette,
      position: "bottom-2 right-4 md:bottom-4 md:right-10",
      animClass: "animate-float",
      href: "/services/graphic-design",
    },
  ];

  return (
    <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden purple-mesh-bg">
      {/* Background ambient lighting orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-primary/15 via-[#8F63FF]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-primary-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Agency Information & Call to Actions */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            {/* Headline (from reference image) */}
            <h1 className="text-4xl sm:text-5xl lg:text-[3.6rem] font-extrabold tracking-tight text-dark leading-[1.12] mb-6">
              Your Vision,{" "}
              <br className="hidden sm:inline" />
              <span className="relative inline-block mt-1">
                <span className="bg-gradient-to-r from-primary via-[#6030E4] to-primary-dark bg-clip-text text-transparent">
                  Our Digital Expertise.
                </span>
                
                {/* Hand-drawn purple curved underline accent (as in reference image) */}
                <svg
                  className="absolute -bottom-2 left-6 sm:left-12 w-44 sm:w-56 h-3 text-primary"
                  viewBox="0 0 200 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 10C55 2 145 2 197 10"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-dark-muted font-normal leading-relaxed max-w-xl mb-8">
              From e-commerce to cutting-edge technology, we craft innovative solutions to help
              your business grow faster, smarter and bigger.
            </p>

            {/* CTA Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto mb-10">
              <Link
                href="/services"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-600 hover:to-primary-800 text-white font-semibold text-base px-8 py-4 rounded-full shadow-[0_12px_30px_rgba(117,69,245,0.32)] hover:shadow-[0_16px_40px_rgba(117,69,245,0.45)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Explore Our Services</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>

              <button
                type="button"
                onClick={onOpenContact}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-softBg text-dark font-semibold text-base px-7 py-4 rounded-full border border-border/90 shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Watch Our Work</span>
              </button>
            </div>

            {/* Social Proof & Rating Bar (from reference image) */}
            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border/70 w-full sm:w-auto">
              {/* Client Avatars */}
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                  alt="UNIQUOVA Client Partner — E-commerce Brand Founder"
                  width={36}
                  height={36}
                  loading="lazy"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                  alt="UNIQUOVA Client Partner — Tech Enterprise Director"
                  width={36}
                  height={36}
                  loading="lazy"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&auto=format&fit=crop&q=80"
                  alt="UNIQUOVA Client Partner — D2C Brand Leader"
                  width={36}
                  height={36}
                  loading="lazy"
                />
                <img
                  className="inline-block h-9 w-9 rounded-full ring-2 ring-white object-cover shadow-sm"
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                  alt="UNIQUOVA Client Partner — Global Retail Executive"
                  width={36}
                  height={36}
                  loading="lazy"
                />
              </div>

              {/* Verified Count */}
              <div className="text-xs sm:text-sm font-semibold text-dark">
                Trusted by <span className="text-primary font-bold">200+</span> Happy Clients
              </div>

              <div className="hidden sm:block text-border font-light">|</div>

              {/* Star Rating */}
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-bold text-dark">
                  4.9/5{" "}
                  <span className="text-dark-muted font-normal">(Client Rating)</span>
                </span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Interactive 3D Digital Workspace Visual & Floating Service Cards */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[520px] lg:min-h-[560px]">
            
            {/* Glowing circular glass pedestal & orbital rings */}
            <div className="relative w-full max-w-[480px] aspect-square flex items-center justify-center">
              
              {/* Outer Glowing Orbital Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/25 shadow-[0_0_80px_rgba(117,69,245,0.18)] animate-pulse-glow" />
              
              {/* Secondary tilted elliptical ring */}
              <div className="absolute w-[92%] h-[65%] rounded-[100%] border border-primary/30 rotate-[-15deg] pointer-events-none" />

              {/* Glass disc pedestal */}
              <div className="absolute bottom-6 w-[88%] h-24 rounded-[50%] bg-gradient-to-t from-primary/20 via-primary-light/40 to-transparent blur-md pointer-events-none" />

              {/* Floating 3D Isometric Purple Cubes */}
              <div className="absolute top-12 right-2 w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-primary-dark to-[#341b8a] shadow-[0_8px_20px_rgba(117,69,245,0.4)] rotate-45 transform animate-float-slow opacity-90 hidden sm:block" />
              <div className="absolute top-1/2 -left-8 w-6 h-6 rounded-md bg-gradient-to-tr from-primary to-primary-light shadow-[0_6px_16px_rgba(117,69,245,0.35)] rotate-12 transform animate-float opacity-80" />
              <div className="absolute bottom-16 right-0 w-7 h-7 rounded-md bg-gradient-to-br from-primary-dark to-primary shadow-[0_6px_18px_rgba(80,48,199,0.4)] -rotate-12 transform animate-float-reverse opacity-85" />

              {/* Central 3D Laptop with UNIQUOVA screen */}
              <div className="relative z-10 w-[84%] max-w-[380px] transition-transform duration-500 hover:scale-[1.02]">
                
                {/* Laptop Display (Isometric Perspective Screen) */}
                <div className="relative rounded-t-2xl bg-[#0f0d1a] border-4 border-[#24213d] shadow-[0_25px_60px_-15px_rgba(117,69,245,0.4)] p-3 pb-4">
                  {/* WebCam Dot */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-700" />
                  
                  {/* Screen Content */}
                  <div className="relative aspect-[16/10] bg-gradient-to-br from-[#120e26] via-[#1a1438] to-[#0d091e] rounded-xl overflow-hidden flex flex-col items-center justify-center p-4 border border-purple-500/20">
                    
                    {/* Screen ambient glow */}
                    <div className="absolute inset-0 bg-radial-gradient from-primary/30 to-transparent opacity-70 pointer-events-none" />

                    {/* Animated grid lines on screen */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#7545f512_1px,transparent_1px),linear-gradient(to_bottom,#7545f512_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

                    {/* UNIQUOVA Emblem on Laptop Screen with 3D Blink Glow */}
                    <div className="relative flex flex-col items-center justify-center z-10">
                      {/* Ambient 3D Volumetric Aura behind logo */}
                      <div className="absolute top-1/2 -translate-y-1/2 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-primary via-[#9E76FB] to-[#C4ACFD] blur-2xl animate-aura-pulse pointer-events-none" />

                      {/* Logo with 3D breathing neon blink glow */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 mb-2 flex items-center justify-center animate-3d-glow select-none">
                        <img
                          src="/images/uniquova_emblem_white.png?v=2"
                          alt="UNIQUOVA Logo"
                          className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                        />
                      </div>

                      <div className="text-white font-extrabold text-sm sm:text-base tracking-wider flex items-center gap-1">
                        <span>UNIQUOVA</span>
                        <span className="text-primary-300">.</span>
                      </div>
                      <div className="text-[10px] text-purple-200/80 font-medium">Your Vision. Our Expertise.</div>
                    </div>

                  </div>
                </div>

                {/* Laptop Base (Keyboard Chassis & Trackpad) */}
                <div className="relative -mt-1 h-3.5 bg-gradient-to-b from-[#3a3556] to-[#1e1b30] rounded-b-xl shadow-lg border-t border-purple-400/30 flex items-center justify-center">
                  <div className="w-16 h-1 bg-purple-300/40 rounded-full" />
                </div>
              </div>

              {/* 5 FLOATING GLASS CARDS (Exactly matching the reference image) */}
              {floatingCards.map((card) => {
                const IconComponent = card.icon;
                const isHovered = activeCard === card.id;

                return (
                  <Link
                    key={card.id}
                    href={card.href}
                    onMouseEnter={() => setActiveCard(card.id)}
                    onMouseLeave={() => setActiveCard(null)}
                    className={`absolute z-20 ${card.position} ${card.animClass} group block cursor-pointer transition-transform duration-300`}
                  >
                    <div
                      className={`glass-hero-card rounded-2xl p-3 sm:p-3.5 transition-all duration-300 flex items-center gap-3 ${
                        isHovered
                          ? "scale-105 border-primary shadow-[0_20px_45px_rgba(117,69,245,0.25)] bg-white/95"
                          : "hover:scale-105"
                      }`}
                    >
                      {/* Icon inside soft lavender box */}
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-light flex items-center justify-center text-primary shrink-0 transition-transform group-hover:scale-110 shadow-sm">
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Card Content */}
                      <div className="pr-1">
                        <h2 className="text-xs sm:text-sm font-bold text-dark group-hover:text-primary transition-colors whitespace-nowrap leading-tight">
                          {card.title}
                        </h2>
                        <p className="text-[11px] text-dark-muted font-medium mt-0.5 whitespace-nowrap">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                );
              })}

            </div>

          </div>

        </div>

        {/* SECTION 2: Trusted By Banner (matching reference image) */}
        <TrustedBy />

      </div>
    </section>
  );
}

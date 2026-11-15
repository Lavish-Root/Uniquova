"use client";

import React from "react";
import {
  TrendingUp,
  Package,
  ShoppingCart,
  Star,
  CheckCircle2,
  Code,
  Zap,
  Smartphone,
  Layers,
  Sparkles,
  PenTool,
  Palette,
  Eye,
} from "lucide-react";

interface ServiceHeroVisualProps {
  slug: string;
}

export default function ServiceHeroVisual({ slug }: ServiceHeroVisualProps) {
  // Normalize slug
  const s = slug.toLowerCase();

  // 1. E-COMMERCE VISUAL
  if (s.includes("ecom") || s.includes("marketplace")) {
    return (
      <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center select-none">
        {/* Ambient Purple Glow */}
        <div className="absolute w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />
        <div className="absolute w-56 h-56 bg-primary-dark/20 rounded-full blur-2xl pointer-events-none -bottom-8 -left-8" />

        {/* Central Glassmorphic Marketplace Dashboard */}
        <div className="relative w-full bg-white/85 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(117,69,245,0.14)] z-10">
          {/* Card Top: Live Badge & Channels */}
          <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-dark tracking-tight">Marketplace Operations Live</span>
            </div>
            <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary-light">
              Amazon &amp; Flipkart
            </span>
          </div>

          {/* Revenue & Growth Stat */}
          <div className="mb-6">
            <span className="text-xs text-dark-muted font-medium">Monthly Gross Marketplace Value</span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-2xl sm:text-3xl font-black text-dark tracking-tight">₹48,50,000+</span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                <TrendingUp className="w-3 h-3" />
                +148% MoM
              </span>
            </div>
          </div>

          {/* Graphical Growth Wave */}
          <div className="h-20 w-full relative mb-6">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 300 70" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ecomGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7545F5" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#7545F5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0,55 Q40,45 80,48 T160,25 T240,15 T300,5 L300,70 L0,70 Z"
                fill="url(#ecomGrad)"
              />
              <path
                d="M0,55 Q40,45 80,48 T160,25 T240,15 T300,5"
                fill="none"
                stroke="#7545F5"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="300" cy="5" r="4" fill="#7545F5" />
            </svg>
          </div>

          {/* 3 Metrics Footer */}
          <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border/60 text-center">
            <div className="bg-softBg rounded-xl p-2.5">
              <div className="text-[10px] text-dark-muted font-medium">BuyBox Share</div>
              <div className="text-xs font-extrabold text-dark mt-0.5">99.4%</div>
            </div>
            <div className="bg-softBg rounded-xl p-2.5">
              <div className="text-[10px] text-dark-muted font-medium">ROAS Target</div>
              <div className="text-xs font-extrabold text-primary mt-0.5">4.2x</div>
            </div>
            <div className="bg-softBg rounded-xl p-2.5">
              <div className="text-[10px] text-dark-muted font-medium">Orders / Mo</div>
              <div className="text-xs font-extrabold text-dark mt-0.5">14,200+</div>
            </div>
          </div>
        </div>

        {/* Floating Glass Pill 1: Top Right */}
        <div className="absolute -top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2.5 px-4 shadow-[0_10px_25px_rgba(117,69,245,0.15)] flex items-center gap-2.5 z-20 animate-float">
          <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
            A+
          </div>
          <div>
            <div className="text-xs font-bold text-dark">A+ Brand Content</div>
            <div className="text-[10px] text-emerald-600 font-semibold">+34% Conversion</div>
          </div>
        </div>

        {/* Floating Glass Pill 2: Bottom Left */}
        <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2.5 px-4 shadow-[0_10px_25px_rgba(117,69,245,0.15)] flex items-center gap-2.5 z-20 animate-float-reverse">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <ShoppingCart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-dark">Listing SEO Audit</div>
            <div className="text-[10px] text-primary font-semibold">Rank #1 Target</div>
          </div>
        </div>
      </div>
    );
  }

  // 2. WEB DEVELOPMENT VISUAL
  if (s.includes("web") || s.includes("website")) {
    return (
      <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center select-none">
        <div className="absolute w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />

        <div className="relative w-full bg-[#12111A] text-white border border-primary/30 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(117,69,245,0.2)] z-10 font-mono">
          {/* Code Window Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] text-purple-300 font-sans font-bold">AppRouter.tsx</span>
          </div>

          {/* Syntax Code Preview */}
          <div className="space-y-1.5 text-xs text-purple-200/90 leading-relaxed font-mono">
            <p><span className="text-purple-400">import</span> &#123; NextApp &#125; <span className="text-purple-400">from</span> <span className="text-emerald-400">&quot;@uniquova/core&quot;</span>;</p>
            <p className="text-gray-500">// 100/100 Core Web Vitals Guaranteed</p>
            <p><span className="text-purple-400">export default async function</span> <span className="text-amber-300">ModernExperience</span>() &#123;</p>
            <p className="pl-4"><span className="text-purple-400">return</span> (</p>
            <p className="pl-8 text-emerald-300">&lt;<span className="text-rose-400">ScalablePlatform</span> speed=<span className="text-amber-400">&quot;instant&quot;</span> security=<span className="text-amber-400">&quot;enterprise&quot;</span> /&gt;</p>
            <p className="pl-4">);</p>
            <p>&#125;</p>
          </div>

          {/* Benchmarks Bar */}
          <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center font-sans">
            <div className="bg-white/5 rounded-xl p-2 border border-white/5">
              <div className="text-[10px] text-purple-300">Lighthouse</div>
              <div className="text-sm font-black text-emerald-400">100 / 100</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/5">
              <div className="text-[10px] text-purple-300">LCP Speed</div>
              <div className="text-sm font-black text-white">0.4s</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2 border border-white/5">
              <div className="text-[10px] text-purple-300">Stack</div>
              <div className="text-sm font-black text-primary-300">Next.js 14</div>
            </div>
          </div>
        </div>

        {/* Floating Pill 1: Top Right */}
        <div className="absolute -top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2.5 px-4 shadow-[0_10px_25px_rgba(117,69,245,0.15)] flex items-center gap-2.5 z-20 animate-float">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-dark">Production Ready</div>
            <div className="text-[10px] text-emerald-600 font-semibold">Zero Tech Debt</div>
          </div>
        </div>
      </div>
    );
  }

  // 3. APP DEVELOPMENT VISUAL
  if (s.includes("app")) {
    return (
      <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center select-none">
        <div className="absolute w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />

        <div className="relative w-72 bg-gradient-to-b from-[#1C182E] to-[#12101F] text-white border-4 border-[#3D3558] rounded-[2.5rem] p-4 shadow-[0_25px_60px_rgba(117,69,245,0.22)] z-10">
          {/* Dynamic Island Notch */}
          <div className="w-24 h-4 bg-black rounded-full mx-auto mb-4" />

          {/* App UI Header */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <span className="text-[10px] text-purple-300 font-medium">Welcome Back</span>
              <h4 className="text-sm font-extrabold text-white">UNIQUOVA Mobile</h4>
            </div>
            <div className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center text-primary-200">
              <Sparkles className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Interactive UI Card Inside App */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 mb-3">
            <span className="text-[10px] text-purple-200">Real-Time Sync</span>
            <div className="text-lg font-black text-white mt-0.5">60 FPS Native</div>
            <div className="w-full bg-white/20 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-primary h-full rounded-full w-4/5" />
            </div>
          </div>

          {/* 2 Mini Modules */}
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 text-center">
              <span className="text-[9px] text-purple-300">iOS</span>
              <div className="text-xs font-bold text-white">Swift / Expo</div>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 border border-white/5 text-center">
              <span className="text-[9px] text-purple-300">Android</span>
              <div className="text-xs font-bold text-white">Kotlin / Flutter</div>
            </div>
          </div>

          {/* Home indicator bar */}
          <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-4" />
        </div>

        {/* Floating Pill: Bottom Left */}
        <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2.5 px-4 shadow-[0_10px_25px_rgba(117,69,245,0.15)] flex items-center gap-2.5 z-20 animate-float-reverse">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-dark">Cross-Platform</div>
            <div className="text-[10px] text-primary font-semibold">1 Codebase, 2 Stores</div>
          </div>
        </div>
      </div>
    );
  }

  // 4. BRANDING VISUAL
  if (s.includes("brand")) {
    return (
      <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center select-none">
        <div className="absolute w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />

        <div className="relative w-full bg-white/90 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(117,69,245,0.14)] z-10">
          <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-5">
            <span className="text-xs font-bold text-dark">Brand Guidelines &amp; Identity</span>
            <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary-light">
              Visual System
            </span>
          </div>

          {/* Color Palette Swatches */}
          <div className="mb-6">
            <span className="text-xs text-dark-muted font-medium">Core Brand Palette</span>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex-1 h-12 rounded-xl bg-[#7545F5] flex flex-col justify-end p-1.5 text-[9px] text-white font-mono font-bold">
                #7545F5
              </div>
              <div className="flex-1 h-12 rounded-xl bg-[#5030C7] flex flex-col justify-end p-1.5 text-[9px] text-white font-mono font-bold">
                #5030C7
              </div>
              <div className="flex-1 h-12 rounded-xl bg-[#F3EFFF] border border-border flex flex-col justify-end p-1.5 text-[9px] text-dark font-mono font-bold">
                #F3EFFF
              </div>
              <div className="flex-1 h-12 rounded-xl bg-[#151323] flex flex-col justify-end p-1.5 text-[9px] text-white font-mono font-bold">
                #151323
              </div>
            </div>
          </div>

          {/* Golden Ratio Typography & Monogram */}
          <div className="bg-softBg rounded-2xl p-4 border border-border/60 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] text-primary font-bold uppercase tracking-wider">Typography</span>
              <div className="text-sm font-extrabold text-dark mt-0.5">Plus Jakarta Sans</div>
              <div className="text-xs text-dark-muted">Geometric &bull; Modern &bull; Global</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-black text-xl shadow-glow-sm">
              UQ
            </div>
          </div>
        </div>

        {/* Floating Pill: Top Right */}
        <div className="absolute -top-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2.5 px-4 shadow-[0_10px_25px_rgba(117,69,245,0.15)] flex items-center gap-2.5 z-20 animate-float">
          <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
            <PenTool className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-dark">Trademark Ready</div>
            <div className="text-[10px] text-emerald-600 font-semibold">100% Vector Scalable</div>
          </div>
        </div>
      </div>
    );
  }

  // 5. GRAPHIC DESIGNING VISUAL (DEFAULT)
  return (
    <div className="relative w-full max-w-lg mx-auto lg:max-w-none flex items-center justify-center select-none">
      <div className="absolute w-72 h-72 bg-primary/25 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />

      <div className="relative w-full bg-white/90 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(117,69,245,0.14)] z-10">
        <div className="flex items-center justify-between pb-4 border-b border-border/60 mb-5">
          <span className="text-xs font-bold text-dark">Commercial Creatives Studio</span>
          <span className="text-[11px] font-bold text-primary px-2.5 py-0.5 rounded-full bg-primary-light">
            High CTR
          </span>
        </div>

        {/* Creative Canvas Preview Card */}
        <div className="relative bg-gradient-to-tr from-primary to-primary-dark rounded-2xl p-5 text-white shadow-md mb-4 overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-lg" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">Ad Creative</span>
          <h4 className="text-lg font-black tracking-tight mt-1 mb-2">Scale Your Reach with Precision</h4>
          <span className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-300" />
            +64% Click-Through Rate
          </span>
        </div>

        {/* Multi-Format Ratios */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-softBg rounded-xl p-2.5 border border-border/50">
            <div className="text-[10px] text-dark-muted font-medium">Meta Feed</div>
            <div className="text-xs font-bold text-dark mt-0.5">1 : 1 Square</div>
          </div>
          <div className="bg-softBg rounded-xl p-2.5 border border-border/50">
            <div className="text-[10px] text-dark-muted font-medium">Stories / Reels</div>
            <div className="text-xs font-bold text-dark mt-0.5">9 : 16 Vertical</div>
          </div>
          <div className="bg-softBg rounded-xl p-2.5 border border-border/50">
            <div className="text-[10px] text-dark-muted font-medium">Banners</div>
            <div className="text-xs font-bold text-dark mt-0.5">16 : 9 Display</div>
          </div>
        </div>
      </div>

      {/* Floating Pill: Bottom Left */}
      <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2.5 px-4 shadow-[0_10px_25px_rgba(117,69,245,0.15)] flex items-center gap-2.5 z-20 animate-float-reverse">
        <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
          <Palette className="w-4 h-4" />
        </div>
        <div>
          <div className="text-xs font-bold text-dark">Brand Consistency</div>
          <div className="text-[10px] text-primary font-semibold">Ready-to-Deploy Assets</div>
        </div>
      </div>
    </div>
  );
}


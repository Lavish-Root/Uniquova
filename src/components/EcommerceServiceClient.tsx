"use client";

import React, { useState, useId } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactModal from "@/components/ContactModal";
import ScrollHeading from "@/components/ScrollHeading";
import {
  ShoppingCart,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Layers,
  Zap,
  Target,
  Award,
  Calculator,
  Lock,
  Package,
  HelpCircle,
  Send,
  Star,
  BarChart3,
  Flame,
  Search,
  Check,
  ExternalLink,
} from "lucide-react";

export default function EcommerceServiceClient() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [activeChannel, setActiveChannel] = useState<"amazon" | "flipkart" | "d2c">("amazon");
  const [monthlySales, setMonthlySales] = useState<number>(1500000); // ₹15 Lakhs
  const [currentAcos, setCurrentAcos] = useState<number>(38); // 38%
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [auditForm, setAuditForm] = useState({
    brandName: "",
    storeUrl: "",
    primaryChannel: "Amazon India",
    salesRange: "₹10L - ₹25L / mo",
    contactEmail: "",
    whatsapp: "",
  });

  // Calculate dynamic ROI projections
  const currentAdSpend = Math.round((monthlySales * (currentAcos / 100)));
  const projectedGMV = Math.round(monthlySales * 2.85); // 2.85x growth in 120 days
  const targetAcos = 18.5; // Benchmark target ACoS
  const optimizedAdSpend = Math.round((projectedGMV * (targetAcos / 100)));
  const projectedRevenueGain = projectedGMV - monthlySales;
  const estimatedSavings = Math.max(0, currentAdSpend - Math.round(monthlySales * (targetAcos / 100)));

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!auditForm.brandName || !auditForm.contactEmail) return;
    setAuditSubmitted(true);
  };

  const channelData = {
    amazon: {
      badge: "Official Amazon Ads Verified & SP-API",
      title: "Amazon Seller Central (India & Global)",
      tagline: "Outrank Competitors, Defend Buy Box, and Maximize Net Margins",
      overview:
        "Full-funnel Amazon management for brands selling on Amazon India (.in), USA (.com), UK, and UAE. From A+ content design and Brand Stores to high-velocity Sponsored Ads and Amazon DSP retargeting.",
      metrics: [
        { label: "Average ACoS Reduction", value: "48%" },
        { label: "Buy Box Win Rate", value: "99.4%" },
        { label: "Target ROAS Range", value: "4.5x - 7.2x" },
      ],
      features: [
        {
          title: "Algorithmic Listing SEO & Indexation",
          desc: "Reverse-ASIN indexing, high-volume backend search terms, bullet point conversion optimization, and lifestyle infographic stacks.",
        },
        {
          title: "High-ROAS PPC & Amazon DSP",
          desc: "Daily negative keyword harvesting, competitor ASIN interception, dayparting bid automation, and high-margin DSP display retargeting.",
        },
        {
          title: "Buy Box Defense & 24/7 Hijacker Removal",
          desc: "Real-time unauthorized reseller alerts, Brand Registry IP enforcement, dynamic repricing, and listing suppression prevention.",
        },
        {
          title: "Predictive FBA Logistics & Inventory Sprints",
          desc: "Multi-FC inventory allocation, stockout risk mitigation, seasonal buffers, and IPI score optimization to prevent storage surcharges.",
        },
      ],
      deliverables: [
        "Custom Brand Storefront with Mobile-First UX",
        "Full Module A+ Content & Premium Editorial Copy",
        "Weekly ROAS, TACoS & Search Impression Reports",
        "Reimbursement Recovery Audits for Lost/Damaged FBA Stock",
      ],
    },
    flipkart: {
      badge: "Flipkart Verified Agency Partner",
      title: "Flipkart Marketplace Scale",
      tagline: "Capture Bharat's High-Intent E-commerce Traffic with F-Assured Dominance",
      overview:
        "Specialized management for Flipkart sellers. We turn Tier-1 to Tier-3 consumer demand into reliable daily volume through Flipkart Smart logistics, PLA ads, and Big Billion Days preparation.",
      metrics: [
        { label: "Diwali GMV Spike", value: "+310%" },
        { label: "F-Assured Badging", value: "100%" },
        { label: "Average ROAS", value: "4.2x" },
      ],
      features: [
        {
          title: "F-Assured Badging & Flipkart Smart Setup",
          desc: "Full operational setup to achieve and maintain F-Assured badges, drastically improving listing visibility and buyer trust.",
        },
        {
          title: "PLA & PCA Advertising Strategy",
          desc: "Product Listing Ads (PLA) and Product Contextual Ads (PCA) structured for minimum cost-per-click and maximum conversion velocity.",
        },
        {
          title: "Big Billion Days & Festival War-Room",
          desc: "Deals curation, inventory staging in Flipkart Fulfillment Centers, and hourly bid management during mega shopping sales.",
        },
        {
          title: "Catalog Quality & Tier-1 Account Health",
          desc: "Category attribute enhancement, brand approval compliance, and proactive seller metric health defense.",
        },
      ],
      deliverables: [
        "Flipkart Enhanced Product Listings & Infographics",
        "Mega-Sale Deal Application & Margin Structuring",
        "Daily SLA, Dispatch, and Return Rate Monitoring",
        "Flipkart Ads Optimization & Budget Reallocation",
      ],
    },
    d2c: {
      badge: "Headless Shopify & Custom E-commerce",
      title: "Direct-to-Consumer (D2C) Storefronts",
      tagline: "Own Your Customer Data, Maximize LTV, and Eliminate Marketplace Fees",
      overview:
        "High-performance direct-to-consumer online stores built on Shopify Plus or Headless Next.js, combined with 1-click checkout, automated WhatsApp retention funnels, and high-ROAS Meta & Google ads.",
      metrics: [
        { label: "Checkout Conversion Rate", value: "4.8%+" },
        { label: "Sub-Second Page Load", value: "<850ms" },
        { label: "Repeat Purchase Rate", value: "32%+" },
      ],
      features: [
        {
          title: "Next.js / Shopify Headless Storefronts",
          desc: "Lightning-fast digital storefronts with 99/100 Core Web Vitals, custom product bundles, and seamless mobile responsive checkout.",
        },
        {
          title: "1-Click Checkout & Gateway Integration",
          desc: "Pre-integrated Razorpay, Cashfree, UPI autopay, and Shiprocket RTO-risk protection to reduce return-to-origin losses.",
        },
        {
          title: "Meta & Google Performance Max Funnels",
          desc: "Full-funnel commercial creatives, dynamic product ads (DPA), and high-intent Google Shopping keyword captures.",
        },
        {
          title: "Automated WhatsApp & Email Retention",
          desc: "Automated abandoned cart recovery, post-purchase replenishment reminders, and VIP loyalty referral loops.",
        },
      ],
      deliverables: [
        "High-Converting Mobile-First Custom D2C Storefront",
        "Pre-Configured Analytics (GA4, Meta CAPI, Mixpanel)",
        "Automated Cart Recovery Flows on WhatsApp & SMS",
        "Conversion Rate Optimization (CRO) A/B Testing Suite",
      ],
    },
  };

  const currentChannel = channelData[activeChannel];

  const caseStudies = [
    {
      brand: "EarthVital Nutrition",
      category: "D2C & Marketplace Health Supplements",
      badge: "Amazon + Flipkart Scale",
      timeline: "120 Days",
      before: {
        revenue: "₹6.2 Lakhs / mo",
        acos: "46.2%",
        buybox: "71.4%",
      },
      after: {
        revenue: "₹54.8 Lakhs / mo",
        acos: "19.4%",
        buybox: "99.6%",
      },
      highlights: [
        "Overhauled 42 ASINs with high-intent A+ Content and clinical proof infographics.",
        "Harvested 1,400+ negative keywords to stop PPC budget leakage.",
        "Scaled Sponsored Brands video campaigns with 5.15x ROAS.",
      ],
    },
    {
      brand: "AuraAcoustics",
      category: "Consumer Electronics & Audio",
      badge: "Best Seller Rank #3",
      timeline: "90 Days",
      before: {
        revenue: "₹18.5 Lakhs / mo",
        acos: "39.5%",
        buybox: "84.0%",
      },
      after: {
        revenue: "₹89.2 Lakhs / mo",
        acos: "17.8%",
        buybox: "99.8%",
      },
      highlights: [
        "Won Best Seller Rank #3 in Wireless Audio within 3 months.",
        "Amazon DSP retargeting deployed for abandoned cart browsers.",
        "Multi-city FBA split reduced customer delivery times to under 24 hours.",
      ],
    },
    {
      brand: "Kavya Home & Living",
      category: "Home & Kitchen Appliances",
      badge: "Flipkart F-Assured Scale",
      timeline: "60 Days",
      before: {
        revenue: "₹11.0 Lakhs / mo",
        acos: "34.0%",
        buybox: "79.0%",
      },
      after: {
        revenue: "₹45.6 Lakhs / mo",
        acos: "18.2%",
        buybox: "99.1%",
      },
      highlights: [
        "Earned F-Assured badge across entire product line in 14 days.",
        "+310% Diwali sale GMV surge with zero inventory stockouts.",
        "Product Listing Ads restructured for maximum buy-box dominance.",
      ],
    },
  ];

  const faqs = [
    {
      q: "How quickly can UNIQUOVA reduce our Amazon or Flipkart ACoS?",
      a: "Our negative keyword harvesting and bid restructuring typically yield visible ACoS reductions within the first 14 to 21 days. Concurrently, our listing SEO enhancements begin indexing in 3 to 4 weeks to boost organic revenue without ad dependency.",
    },
    {
      q: "Do we retain full ownership and access to our Seller Central accounts?",
      a: "Yes, 100%. You grant us user permissions as an agency partner. You maintain primary super-admin access, direct payouts to your bank account, and complete intellectual property ownership at all times.",
    },
    {
      q: "What is your pricing model for E-commerce management?",
      a: "We offer performance-aligned models: a base monthly management retainer coupled with an incentive tier tied to net revenue growth or ROAS targets. This ensures our incentives are 100% aligned with your commercial expansion.",
    },
    {
      q: "How do you protect our brand against unauthorized Buy Box hijackers?",
      a: "We deploy automated 24/7 Buy Box monitoring bots. When an unauthorized reseller or counterfeit seller hops onto your ASIN, our team immediately initiates Brand Registry IP violation reports, Cease & Desist notices, and test buys to restore 100% Buy Box control.",
    },
    {
      q: "Can you help us launch on international marketplaces like Amazon USA or UAE?",
      a: "Yes. We have hands-on operational experience expanding Indian brands to Amazon USA, UK, Canada, and the UAE, including international shipping setup, US trademark guidance, and local consumer search intent optimization.",
    },
  ];

  return (
    <main className="min-h-screen bg-white text-dark flex flex-col selection:bg-primary/20 selection:text-primary-dark">
      <Navbar onOpenContact={() => setIsContactOpen(true)} />

      {/* ============================================================
          SECTION 1: HERO — SCALE YOUR BRAND TO MULTI-CRORE DOMINANCE
          ============================================================ */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 purple-mesh-bg relative overflow-hidden">
        {/* Ambient Decorative Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-tr from-primary/15 via-[#8F63FF]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-primary-200/40 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Hero Narrative & High-Intent Action */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Partner Badges */}
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-primary-200 text-primary px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                  <Award className="w-3.5 h-3.5 text-primary" />
                  <span>Official Amazon Ads Verified</span>
                </div>
                <div className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md border border-border text-dark px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>Flipkart Growth Partner</span>
                </div>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight text-dark leading-[1.12] mb-6">
                Scale Your Brand to Multi-Crore{" "}
                <span className="bg-gradient-to-r from-primary via-[#6030E4] to-primary-dark bg-clip-text text-transparent">
                  Marketplace Dominance.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-dark-muted font-normal leading-relaxed mb-8 max-w-2xl">
                We engineer algorithmic listing SEO, high-ROAS PPC advertising, automated Buy Box protection,
                and predictive FBA logistics to turn high-intent searchers into profitable repeat customers.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="#free-audit"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-md hover:shadow-glow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Claim Free 360° Marketplace Audit</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#roas-calculator"
                  className="inline-flex items-center gap-2 bg-white/90 hover:bg-white text-dark hover:text-primary px-6 py-4 rounded-2xl font-bold text-sm border border-border/80 shadow-xs hover:border-primary/40 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <Calculator className="w-4 h-4 text-primary" />
                  <span>Calculate Potential ROAS</span>
                </a>
              </div>

              {/* Proof Ticker Chips */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/80 w-full max-w-xl">
                <div>
                  <p className="text-xl sm:text-2xl font-black text-primary font-mono">₹50Cr+</p>
                  <p className="text-xs text-dark-muted font-semibold mt-0.5">GMV Scaled</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-primary font-mono">99.4%</p>
                  <p className="text-xs text-dark-muted font-semibold mt-0.5">BuyBox Win Rate</p>
                </div>
                <div>
                  <p className="text-xl sm:text-2xl font-black text-primary font-mono">18.5%</p>
                  <p className="text-xs text-dark-muted font-semibold mt-0.5">Average Target ACoS</p>
                </div>
              </div>
            </div>

            {/* Right Column: Live Glassmorphic Marketplace Dashboard */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full max-w-lg mx-auto select-none">
                {/* Glow Backdrop */}
                <div className="absolute w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none -top-10 -right-10" />
                <div className="absolute w-56 h-56 bg-primary-dark/15 rounded-full blur-2xl pointer-events-none -bottom-8 -left-8" />

                {/* Dashboard Card */}
                <div className="relative w-full bg-white/95 backdrop-blur-xl border border-primary/20 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(117,69,245,0.14)] z-10">
                  {/* Top Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-5">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-bold text-dark tracking-tight">Marketplace Operations Live</span>
                    </div>
                    <span className="text-[11px] font-bold text-primary px-3 py-1 rounded-full bg-primary-light border border-primary-200/50">
                      Amazon &amp; Flipkart
                    </span>
                  </div>

                  {/* Revenue Number */}
                  <div className="mb-6">
                    <span className="text-xs text-dark-muted font-semibold">Monthly Gross Marketplace Value</span>
                    <div className="flex items-baseline gap-3 mt-1.5">
                      <span className="text-3xl sm:text-4xl font-black text-dark tracking-tight font-mono">
                        ₹48,50,000+
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <TrendingUp className="w-3 h-3" />
                        +148% MoM
                      </span>
                    </div>
                  </div>

                  {/* Graphical SVG Growth Wave */}
                  <div className="h-24 w-full relative mb-6">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 300 80" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="ecomHeroGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#7545F5" stopOpacity="0.4" />
                          <stop offset="100%" stopColor="#7545F5" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0,65 Q50,55 90,52 T170,30 T250,18 T300,8 L300,80 L0,80 Z"
                        fill="url(#ecomHeroGrad)"
                      />
                      <path
                        d="M0,65 Q50,55 90,52 T170,30 T250,18 T300,8"
                        fill="none"
                        stroke="#7545F5"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                      <circle cx="300" cy="8" r="5" fill="#7545F5" className="animate-pulse" />
                    </svg>
                  </div>

                  {/* 3 Metric Pills */}
                  <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-border/70 text-center">
                    <div className="bg-[#FAF9FF] rounded-2xl p-3 border border-border/60">
                      <div className="text-[10px] text-dark-muted font-semibold uppercase">BuyBox Share</div>
                      <div className="text-sm font-extrabold text-dark mt-0.5 font-mono">99.4%</div>
                    </div>
                    <div className="bg-[#FAF9FF] rounded-2xl p-3 border border-border/60">
                      <div className="text-[10px] text-dark-muted font-semibold uppercase">ROAS Target</div>
                      <div className="text-sm font-extrabold text-primary mt-0.5 font-mono">4.8x</div>
                    </div>
                    <div className="bg-[#FAF9FF] rounded-2xl p-3 border border-border/60">
                      <div className="text-[10px] text-dark-muted font-semibold uppercase">Monthly Units</div>
                      <div className="text-sm font-extrabold text-dark mt-0.5 font-mono">14,200+</div>
                    </div>
                  </div>
                </div>

                {/* Floating Glass Pill 1: Top Right */}
                <div className="hidden sm:flex absolute -top-5 -right-5 bg-white/95 backdrop-blur-md border border-primary/30 rounded-2xl py-2 px-3.5 shadow-md items-center gap-2 z-20 animate-float">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold text-xs">
                    ★
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-dark">A+ Brand Store</p>
                    <p className="text-[9px] text-dark-muted font-semibold">Verified Conversion Lift</p>
                  </div>
                </div>

                {/* Floating Glass Pill 2: Bottom Left */}
                <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white/95 backdrop-blur-md border border-emerald-500/30 rounded-2xl py-2 px-3.5 shadow-md items-center gap-2 z-20 animate-float-slow">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                  <div>
                    <p className="text-[11px] font-bold text-dark">Zero Stockout SLA</p>
                    <p className="text-[9px] text-dark-muted font-semibold">Predictive FBA Buffering</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 2: CHANNEL DOMINANCE MATRIX (INTERACTIVE TABS)
          ============================================================ */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-12"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Layers className="w-3.5 h-3.5" />
                <span>Multi-Channel Omnipresence</span>
              </div>
            }
            title={
              <>
                Channel Dominance <span className="gradient-text">Matrix</span>
              </>
            }
            subtitle="Choose your core battleground. We engineer bespoke growth infrastructure whether you sell on marketplaces or direct-to-consumer."
          />

          {/* Interactive Channel Switcher Tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF9FF] border border-border/80 shadow-xs gap-1.5 max-w-full overflow-x-auto">
              {[
                { id: "amazon", label: "📦 Amazon Seller Central", short: "Amazon" },
                { id: "flipkart", label: "🛍️ Flipkart Growth", short: "Flipkart" },
                { id: "d2c", label: "🌐 D2C Headless Shopify", short: "Shopify D2C" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveChannel(tab.id as any)}
                  className={`relative px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeChannel === tab.id ? "text-white" : "text-dark-muted hover:text-dark"
                  }`}
                >
                  {activeChannel === tab.id && (
                    <motion.div
                      layoutId="channelTabBg"
                      className="absolute inset-0 bg-primary rounded-xl shadow-xs"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Channel Breakdown Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChannel}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="bg-[#FAF9FF] rounded-3xl p-8 sm:p-12 border border-border/80 shadow-sm"
            >
              {/* Header inside container */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-border/80 mb-10">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary-light px-3.5 py-1 rounded-full uppercase tracking-wider mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>{currentChannel.badge}</span>
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight">
                    {currentChannel.title}
                  </h3>
                  <p className="text-base text-primary font-semibold mt-1">
                    {currentChannel.tagline}
                  </p>
                </div>

                {/* 3 Channel Metrics */}
                <div className="flex items-center gap-4 sm:gap-6 bg-white p-4 rounded-2xl border border-border/80 shadow-xs shrink-0">
                  {currentChannel.metrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <p className="text-xl sm:text-2xl font-black text-primary font-mono">{m.value}</p>
                      <p className="text-[11px] text-dark-muted font-semibold mt-0.5">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {currentChannel.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="bg-white p-6 rounded-2xl border border-border shadow-xs hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 group"
                  >
                    <div className="flex items-center gap-3 mb-2.5">
                      <div className="w-8 h-8 rounded-xl bg-primary-light text-primary flex items-center justify-center font-bold text-xs group-hover:bg-primary group-hover:text-white transition-colors">
                        0{idx + 1}
                      </div>
                      <h4 className="text-base font-bold text-dark group-hover:text-primary transition-colors">
                        {feat.title}
                      </h4>
                    </div>
                    <p className="text-xs sm:text-sm text-dark-muted leading-relaxed pl-11">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Bottom Deliverables Strip & Action */}
              <div className="bg-white rounded-2xl p-6 border border-border flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-dark mb-2">
                    Verified Deliverables Included:
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {currentChannel.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-softBg text-dark border border-border"
                      >
                        <Check className="w-3.5 h-3.5 text-primary" />
                        <span>{del}</span>
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsContactOpen(true)}
                  className="inline-flex items-center justify-center gap-2 bg-dark hover:bg-primary text-white font-bold text-xs sm:text-sm px-7 py-3.5 rounded-xl transition-colors whitespace-nowrap shrink-0 shadow-sm"
                >
                  <span>Inquire for {currentChannel.title}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ============================================================
          SECTION 3: THE 4 GROWTH ENGINES (INTERACTIVE BENTO GRID)
          ============================================================ */}
      <section className="py-24 bg-[#FAF9FF] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-16"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Zap className="w-3.5 h-3.5" />
                <span>Proven Execution Framework</span>
              </div>
            }
            title={
              <>
                The 4 E-commerce <span className="gradient-text">Growth Engines</span>
              </>
            }
            subtitle="How UNIQUOVA systematically transforms stagnant product catalogs into market-dominant category leaders."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Engine 1: SEO & A+ */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-sm hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-[#6030E4] to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs border border-primary-200/50">
                    <Search className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full uppercase tracking-wider">
                    Engine 01 · SEO
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors mb-3">
                  Algorithmic Listing SEO &amp; A+ Conversion Copy
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed mb-6">
                  We reverse-engineer Amazon &amp; Flipkart A9 algorithms using proprietary keyword indexers.
                  Every title, bullet point, backend search term, and lifestyle image is mathematically optimized
                  to rank in the top 3 organic search results while doubling listing conversion rates.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-border/70">
                  {[
                    "Reverse-ASIN high-volume keyword indexation",
                    "Lifestyle infographic stack & comparison charts",
                    "A+ Content Brand Story and Premium Video embeds",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-dark">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                <span>Outcome: Top 3 Organic Search Placement</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* Engine 2: PPC & Ads */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-sm hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-[#6030E4] to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs border border-primary-200/50">
                    <Target className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full uppercase tracking-wider">
                    Engine 02 · Advertising
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors mb-3">
                  High-ROAS PPC Advertising &amp; Negative Harvesting
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed mb-6">
                  Stop ad spend bleed. We build multi-tiered campaign architectures: Sponsored Products,
                  Sponsored Brands Video, and Amazon DSP. Continuous negative keyword harvesting eliminates wasted clicks,
                  lowering your ACoS to sustainable profit-generating levels.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-border/70">
                  {[
                    "Daily negative keyword harvesting & bid dayparting",
                    "Competitor ASIN interception & brand defense campaigns",
                    "Amazon DSP programmatic display & off-Amazon retargeting",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-dark">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                <span>Outcome: 4.8x - 7.2x Verified Return on Ad Spend</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* Engine 3: Buy Box Defense */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-sm hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-[#6030E4] to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs border border-primary-200/50">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full uppercase tracking-wider">
                    Engine 03 · Protection
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors mb-3">
                  24/7 Buy Box Defense &amp; Hijacker Removal
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed mb-6">
                  If you lose the Buy Box, your advertising and sales immediately pause. Our monitoring bots
                  track your ASINs 24/7. We enforce Brand Registry IP violations against unauthorized counterfeiters
                  and configure algorithmic repricing to safeguard your margins.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-border/70">
                  {[
                    "Instant unauthorized seller alerts & Cease & Desist filing",
                    "Brand Registry trademark & IP infringement enforcement",
                    "Algorithmic margin-preserving Buy Box repricing",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-dark">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                <span>Outcome: 99.4% Average Buy Box Win Rate</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>

            {/* Engine 4: FBA Logistics */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-border shadow-sm hover:shadow-[0_20px_50px_rgba(117,69,245,0.12)] hover:border-primary/50 hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary via-[#6030E4] to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary-light text-primary flex items-center justify-center group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-xs border border-primary-200/50">
                    <Package className="w-7 h-7" />
                  </div>
                  <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full uppercase tracking-wider">
                    Engine 04 · Operations
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-dark group-hover:text-primary transition-colors mb-3">
                  Predictive Inventory Forecasting &amp; FBA Sprints
                </h3>
                <p className="text-sm text-dark-muted leading-relaxed mb-6">
                  Running out of stock destroys months of organic ranking progress. We model sales velocity, lead times,
                  and festival buffer requirements, splitting inventory across regional fulfillment centers to guarantee
                  Prime next-day delivery badges for your customers.
                </p>

                <div className="space-y-2.5 pt-4 border-t border-border/70">
                  {[
                    "Reorder velocity modeling to prevent stockouts",
                    "Multi-city FBA allocation for instant 1-day Prime delivery",
                    "IPI score optimization & aged inventory fee avoidance",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-dark">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60 flex items-center justify-between text-xs font-bold text-primary">
                <span>Outcome: Zero Stockout Penalties &amp; 100% Prime Speed</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 4: INTERACTIVE REVENUE & ROAS CALCULATOR
          ============================================================ */}
      <section id="roas-calculator" className="py-24 bg-white relative overflow-hidden border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-14"
            badge={
              <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Calculator className="w-3.5 h-3.5 text-emerald-600" />
                <span>ROI Simulation Tool</span>
              </div>
            }
            title={
              <>
                Interactive E-commerce <span className="gradient-text">Revenue Calculator</span>
              </>
            }
            subtitle="Adjust the sliders below to see your estimated 90-day revenue expansion and net ad spend savings under UNIQUOVA management."
          />

          <div className="bg-gradient-to-tr from-[#FAF9FF] via-white to-primary-light/30 rounded-3xl p-8 sm:p-12 border border-border/80 shadow-lg max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Left Column: Sliders */}
              <div className="lg:col-span-6 space-y-8">
                
                {/* Slider 1: Monthly Sales */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="monthly-sales-slider" className="text-xs font-bold uppercase tracking-wider text-dark">
                      Current Monthly Sales (GMV)
                    </label>
                    <span className="text-xl font-black text-primary font-mono">
                      ₹{(monthlySales / 100000).toFixed(1)} Lakhs
                    </span>
                  </div>
                  <input
                    id="monthly-sales-slider"
                    type="range"
                    min={200000}
                    max={10000000}
                    step={100000}
                    value={monthlySales}
                    onChange={(e) => setMonthlySales(Number(e.target.value))}
                    className="w-full h-2.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] text-dark-muted font-semibold mt-1">
                    <span>₹2 Lakhs</span>
                    <span>₹50 Lakhs</span>
                    <span>₹1 Crore</span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[500000, 1500000, 3500000, 7500000].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setMonthlySales(val)}
                        className={`text-[11px] font-bold px-3 py-1 rounded-lg border transition-colors ${
                          monthlySales === val
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-dark-muted border-border hover:border-primary/40"
                        }`}
                      >
                        ₹{(val / 100000)}L
                      </button>
                    ))}
                  </div>
                </div>

                {/* Slider 2: Current ACoS */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label htmlFor="current-acos-slider" className="text-xs font-bold uppercase tracking-wider text-dark">
                      Current Advertising ACoS (%)
                    </label>
                    <span className="text-xl font-black text-primary font-mono">
                      {currentAcos}%
                    </span>
                  </div>
                  <input
                    id="current-acos-slider"
                    type="range"
                    min={15}
                    max={60}
                    step={1}
                    value={currentAcos}
                    onChange={(e) => setCurrentAcos(Number(e.target.value))}
                    className="w-full h-2.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                  <div className="flex justify-between text-[11px] text-dark-muted font-semibold mt-1">
                    <span>15% (Healthy)</span>
                    <span>35% (Average)</span>
                    <span>60% (Severe Leak)</span>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {[22, 35, 45, 55].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setCurrentAcos(val)}
                        className={`text-[11px] font-bold px-3 py-1 rounded-lg border transition-colors ${
                          currentAcos === val
                            ? "bg-primary text-white border-primary"
                            : "bg-white text-dark-muted border-border hover:border-primary/40"
                        }`}
                      >
                        {val}% ACoS
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Calculated Outputs Card */}
              <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-border shadow-md">
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-dark-muted">
                    Projected 90-120 Day Scale
                  </span>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    2.85x Growth Benchmark
                  </span>
                </div>

                <div className="space-y-5 mb-8">
                  {/* Projected Monthly Revenue */}
                  <div>
                    <span className="text-xs text-dark-muted font-medium">Estimated Scaled Monthly GMV</span>
                    <div className="flex items-baseline gap-2.5 mt-1">
                      <span className="text-3xl sm:text-4xl font-black text-dark font-mono">
                        ₹{(projectedGMV / 100000).toFixed(1)} Lakhs
                      </span>
                      <span className="text-xs font-bold text-emerald-600 font-mono">
                        (+₹{(projectedRevenueGain / 100000).toFixed(1)}L Net Lift)
                      </span>
                    </div>
                  </div>

                  {/* ACoS Drop */}
                  <div className="grid grid-cols-2 gap-4 pt-3 border-t border-border/70">
                    <div className="bg-[#FAF9FF] p-3 rounded-xl border border-border/80">
                      <span className="text-[10px] text-dark-muted font-bold uppercase">Optimized ACoS Target</span>
                      <p className="text-xl font-black text-primary font-mono mt-0.5">{targetAcos}%</p>
                      <span className="text-[10px] text-emerald-600 font-semibold">
                        -{currentAcos - targetAcos}% efficiency gain
                      </span>
                    </div>
                    <div className="bg-[#FAF9FF] p-3 rounded-xl border border-border/80">
                      <span className="text-[10px] text-dark-muted font-bold uppercase">Ad Spend Saved / Mo</span>
                      <p className="text-xl font-black text-emerald-600 font-mono mt-0.5">
                        ₹{(estimatedSavings / 1000).toFixed(0)}k+
                      </p>
                      <span className="text-[10px] text-dark-muted font-semibold">Reinvested in profit</span>
                    </div>
                  </div>
                </div>

                <a
                  href="#free-audit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm py-4 rounded-xl shadow-md hover:shadow-glow-md transition-all duration-300"
                >
                  <span>Lock In This Growth · Claim Free Audit</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 5: VERIFIED MARKETPLACE CASE STUDIES & ROI PROOF
          ============================================================ */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollHeading
            className="mb-16"
            badge={
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <Flame className="w-3.5 h-3.5 text-primary" />
                <span>Empirical Track Record</span>
              </div>
            }
            title={
              <>
                Verified Marketplace <span className="gradient-text">Case Studies</span>
              </>
            }
            subtitle="Real brands. Real numbers. How we structured catalog architecture and advertising to generate multi-crore outcomes."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="bg-[#FAF9FF] rounded-3xl p-7 sm:p-8 border border-border shadow-sm hover:shadow-card-hover hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-primary bg-primary-light px-3 py-1 rounded-full uppercase tracking-wider">
                      {cs.badge}
                    </span>
                    <span className="text-xs font-semibold text-dark-muted">{cs.timeline}</span>
                  </div>

                  <h3 className="text-xl font-bold text-dark mb-1">{cs.brand}</h3>
                  <p className="text-xs text-dark-muted mb-6">{cs.category}</p>

                  {/* Before vs After Metric Grid */}
                  <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl bg-white border border-border/80 shadow-xs mb-6">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-dark-muted">Before UNIQUOVA</span>
                      <p className="text-sm font-bold text-dark mt-1 font-mono">{cs.before.revenue}</p>
                      <p className="text-xs text-red-500 font-semibold mt-0.5">{cs.before.acos} ACoS</p>
                      <p className="text-[11px] text-dark-muted">BuyBox: {cs.before.buybox}</p>
                    </div>

                    <div className="border-l border-border pl-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Under Management</span>
                      <p className="text-sm font-extrabold text-primary mt-1 font-mono">{cs.after.revenue}</p>
                      <p className="text-xs text-emerald-600 font-bold mt-0.5">{cs.after.acos} ACoS</p>
                      <p className="text-[11px] text-emerald-600 font-bold">BuyBox: {cs.after.buybox}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-dark">Strategic Levers Pulled:</p>
                    {cs.highlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-dark-muted leading-relaxed">
                        <Check className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-xs font-bold text-primary">
                  <span>Full Performance Case Log</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          SECTION 6: FREE 360° MARKETPLACE AUDIT FORM & FAQS
          ============================================================ */}
      <section id="free-audit" className="py-24 bg-[#FAF9FF] relative overflow-hidden border-t border-border/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Lead Capture Magnet Form */}
            <div className="lg:col-span-6 bg-white rounded-3xl p-8 sm:p-10 border border-primary/20 shadow-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/10 rounded-full blur-2xl pointer-events-none" />

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary bg-primary-light px-3.5 py-1 rounded-full uppercase tracking-wider mb-4 border border-primary-200/50">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Zero Obligation · 100% Confidential</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-dark tracking-tight leading-tight mb-3">
                Claim Your Free 360° Marketplace Audit
              </h3>
              <p className="text-sm text-dark-muted leading-relaxed mb-6">
                Our marketplace growth directors will personally inspect your listings, catalog indexation,
                ACoS leakages, and Buy Box vulnerabilities. Delivered as a comprehensive growth blueprint within 24 hours.
              </p>

              {auditSubmitted ? (
                <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h4 className="text-lg font-bold text-emerald-950">Marketplace Audit Request Received!</h4>
                  <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
                    Our Senior E-commerce Director is auditing your brand details right now.
                    We will send the complete 360° evaluation to <strong>{auditForm.contactEmail}</strong> within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleAuditSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="audit-brand-name" className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                      Brand Name *
                    </label>
                    <input
                      id="audit-brand-name"
                      type="text"
                      required
                      placeholder="e.g. Acme Naturals"
                      value={auditForm.brandName}
                      onChange={(e) => setAuditForm({ ...auditForm, brandName: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="audit-primary-channel" className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                        Primary Channel
                      </label>
                      <select
                        id="audit-primary-channel"
                        value={auditForm.primaryChannel}
                        onChange={(e) => setAuditForm({ ...auditForm, primaryChannel: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all bg-white"
                      >
                        <option>Amazon India (.in)</option>
                        <option>Amazon USA / Global</option>
                        <option>Flipkart</option>
                        <option>D2C Shopify</option>
                        <option>Multiple Channels</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="audit-sales-range" className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                        Current Monthly Sales
                      </label>
                      <select
                        id="audit-sales-range"
                        value={auditForm.salesRange}
                        onChange={(e) => setAuditForm({ ...auditForm, salesRange: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all bg-white"
                      >
                        <option>Less than ₹5 Lakhs / mo</option>
                        <option>₹5L - ₹15L / mo</option>
                        <option>₹15L - ₹50L / mo</option>
                        <option>₹50L - ₹1 Crore / mo</option>
                        <option>₹1 Crore+ / mo</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="audit-store-url" className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                      Store Link or Top ASINs
                    </label>
                    <input
                      id="audit-store-url"
                      type="text"
                      placeholder="e.g. amazon.in/shops/yourbrand or B09XYZ..."
                      value={auditForm.storeUrl}
                      onChange={(e) => setAuditForm({ ...auditForm, storeUrl: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="audit-contact-email" className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                        Work Email *
                      </label>
                      <input
                        id="audit-contact-email"
                        type="email"
                        required
                        placeholder="founder@yourbrand.com"
                        value={auditForm.contactEmail}
                        onChange={(e) => setAuditForm({ ...auditForm, contactEmail: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="audit-whatsapp" className="block text-xs font-bold text-dark uppercase tracking-wider mb-1">
                        WhatsApp / Phone (For Instant Report)
                      </label>
                      <input
                        id="audit-whatsapp"
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={auditForm.whatsapp}
                        onChange={(e) => setAuditForm({ ...auditForm, whatsapp: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold text-sm py-4 rounded-xl shadow-md hover:shadow-glow-md transition-all duration-300"
                  >
                    <Send className="w-4 h-4" />
                    <span>Claim Free 360° Marketplace Audit (Worth ₹15,000)</span>
                  </button>

                  <p className="text-[11px] text-center text-dark-muted font-medium">
                    🔒 We respect your confidentiality. Zero spam. Strictly NDA-compliant evaluation.
                  </p>
                </form>
              )}
            </div>

            {/* Right Column: E-commerce FAQs */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Seller Inquiries</span>
              </div>

              <h3 className="text-3xl font-extrabold text-dark tracking-tight leading-tight">
                Frequently Asked <span className="gradient-text">Seller Questions</span>
              </h3>
              <p className="text-base text-dark-muted">
                Everything you need to know about partnering with UNIQUOVA for multi-channel marketplace scaling.
              </p>

              <div className="space-y-4 pt-2">
                {faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-border p-6 shadow-xs hover:border-primary/40 transition-colors"
                  >
                    <h4 className="text-base font-bold text-dark mb-2">{faq.q}</h4>
                    <p className="text-sm text-dark-muted leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Inquiry Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultService="E-commerce Solutions"
      />

      <Footer />
    </main>
  );
}

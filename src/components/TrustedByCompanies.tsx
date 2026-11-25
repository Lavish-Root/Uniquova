"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  X,
} from "lucide-react";

export interface BrandWorkItem {
  id: string;
  companyName: string;
  category: string;
  title: string;
  image: string;
  caption: string;
  quote: string;
  founderName: string;
  founderRole: string;
  metrics: { label: string; value: string }[];
  summary: string;
  projectLink: string;
}

export interface FounderStory {
  id: string;
  companyName: string;
  companyCategory: string;
  logoType: "megahr" | "913" | "ruuster" | "euroteam" | "needle" | "outset";
  quote: string;
  founderName: string;
  founderRole: string;
  founderAvatar: string;
  projectLink: string;
  accentColor: string;
  metrics: { label: string; value: string }[];
  caseStudySummary: string;
  workImages: BrandWorkItem[];
  col1Items: BrandWorkItem[];
  col2Items: BrandWorkItem[];
}

export const FEATURED_FOUNDERS: FounderStory[] = [
  {
    id: "mega-hr",
    companyName: "MegaHR",
    companyCategory: "AI-First Hiring Infrastructure",
    logoType: "megahr",
    quote: "“If you're looking for strategic thinking with fast, dependable delivery, this is it.”",
    founderName: "Darren Bounds",
    founderRole: "Founder & CEO, MegaHR",
    founderAvatar: "/images/team/team-1.jpg",
    projectLink: "/our-work",
    accentColor: "#7545F5",
    metrics: [
      { label: "Talent Screen Time", value: "-68%" },
      { label: "Series A Raised", value: "$6.5M" },
      { label: "Employer NPS", value: "94.2" },
    ],
    caseStudySummary:
      "Full corporate identity, metro campaign screens takeover, web design system, and multi-channel AI recruitment platform interface.",
    workImages: [
      {
        id: "megahr-w1",
        companyName: "MegaHR",
        category: "Billboard & OOH",
        title: "MegaHR — AI Subway Takeover Series",
        image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_480.webp",
        caption: "Manhattan Metro Takeover",
        quote: "“Our subway takeover series established MegaHR as the defining AI recruitment brand across NYC tech hubs.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Footfall Reach", value: "2.4M" },
          { label: "Direct Signups", value: "+340%" },
          { label: "Brand Recall", value: "96.8%" },
        ],
        summary: "City-wide digital subway screens takeover showing live candidate qualification workflows.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-w2",
        companyName: "MegaHR",
        category: "Web & UI/UX",
        title: "MegaHR — AI Hiring Web Platform",
        image: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp",
        caption: "Candidate Screening Workspace",
        quote: "“The platform interface engineered by UNIQOVA allowed recruiters to screen 10x more candidates effortlessly.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "P95 Latency", value: "< 240ms" },
          { label: "Recruiter NPS", value: "94.2" },
          { label: "Screen Velocity", value: "12x" },
        ],
        summary: "Responsive Next.js web application with real-time biometric candidate ranking and automated scheduling.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-w3",
        companyName: "MegaHR",
        category: "Brand Architecture",
        title: "MegaHR — Visual Identity & Tokens",
        image: "/images/selected_work/6Fiwu9F9MKkOxpv42vAlXksFU_480.webp",
        caption: "Brand Identity & Design Tokens",
        quote: "“From logo geometry to color tokens, UNIQOVA created a unified brand language that scales with our enterprise growth.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Brand Equity", value: "$6.5M" },
          { label: "Design Consistency", value: "100%" },
          { label: "Press Features", value: "18 Outlets" },
        ],
        summary: "Design system tokens, corporate stationery, investor pitch decks, and brand guideline documentation.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-w4",
        companyName: "MegaHR",
        category: "Mobile & Tablet",
        title: "MegaHR — AI Recruiter Mobile Station",
        image: "/images/selected_work/KentOs5VhgKxRvEU6cqYCY2pH7A_480.webp",
        caption: "AI Recruiter Mobile Station",
        quote: "“The mobile and tablet screener gives talent teams instant access to pipeline health on the go.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Mobile Daily Active", value: "85%" },
          { label: "Candidate Match", value: "99.1%" },
          { label: "Time to Hire", value: "3.2 Days" },
        ],
        summary: "Optimized mobile tablet workspace for executive recruiters and talent leads.",
        projectLink: "/our-work",
      },
    ],
    col1Items: [
      {
        id: "megahr-c1-1",
        companyName: "MegaHR",
        category: "Billboard & OOH",
        title: "MegaHR — AI Subway Takeover Series",
        image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_480.webp",
        caption: "Manhattan Metro Takeover",
        quote: "“Our subway takeover series established MegaHR as the defining AI recruitment brand across NYC tech hubs.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Footfall Reach", value: "2.4M" },
          { label: "Direct Signups", value: "+340%" },
          { label: "Brand Recall", value: "96.8%" },
        ],
        summary: "City-wide digital subway screens takeover showing live candidate qualification workflows.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-c1-2",
        companyName: "MegaHR",
        category: "Web & UI/UX",
        title: "MegaHR — AI Hiring Web Platform",
        image: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp",
        caption: "Candidate Screening Workspace",
        quote: "“The platform interface engineered by UNIQOVA allowed recruiters to screen 10x more candidates effortlessly.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "P95 Latency", value: "< 240ms" },
          { label: "Recruiter NPS", value: "94.2" },
          { label: "Screen Velocity", value: "12x" },
        ],
        summary: "Responsive Next.js web application with real-time biometric candidate ranking and automated scheduling.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-c1-3",
        companyName: "MegaHR",
        category: "Brand Architecture",
        title: "MegaHR — Visual Identity & Tokens",
        image: "/images/selected_work/6Fiwu9F9MKkOxpv42vAlXksFU_480.webp",
        caption: "Brand Identity & Design Tokens",
        quote: "“From logo geometry to color tokens, UNIQOVA created a unified brand language that scales with our enterprise growth.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Brand Equity", value: "$6.5M" },
          { label: "Design Consistency", value: "100%" },
          { label: "Press Features", value: "18 Outlets" },
        ],
        summary: "Design system tokens, corporate stationery, investor pitch decks, and brand guideline documentation.",
        projectLink: "/our-work",
      },
    ],
    col2Items: [
      {
        id: "megahr-c2-1",
        companyName: "MegaHR",
        category: "Mobile & Tablet",
        title: "MegaHR — AI Recruiter Mobile Station",
        image: "/images/selected_work/KentOs5VhgKxRvEU6cqYCY2pH7A_480.webp",
        caption: "AI Recruiter Mobile Station",
        quote: "“The mobile and tablet screener gives talent teams instant access to pipeline health on the go.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Mobile Daily Active", value: "85%" },
          { label: "Candidate Match", value: "99.1%" },
          { label: "Time to Hire", value: "3.2 Days" },
        ],
        summary: "Optimized mobile tablet workspace for executive recruiters and talent leads.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-c2-2",
        companyName: "MegaHR",
        category: "Transit Posters",
        title: "MegaHR — Station Poster Architecture",
        image: "/images/selected_work/HAegA2N4CzuRhh4T7urCIBx84M_480.webp",
        caption: "Subway Station Screen Series",
        quote: "“Clean, high-converting posters that translated complex AI models into instant value propositions.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Campaign CTR", value: "8.2%" },
          { label: "Inbound Demos", value: "1,200+" },
          { label: "CAC Reduction", value: "-42%" },
        ],
        summary: "High-contrast geometric posters deployed across prime tech corridor transit hubs.",
        projectLink: "/our-work",
      },
      {
        id: "megahr-c2-3",
        companyName: "MegaHR",
        category: "Talent Telemetry",
        title: "MegaHR — Real-Time Pipeline Analytics",
        image: "/images/selected_work/VoRww8rQDPyN3LNlZtvNUDqZOVE_480.webp",
        caption: "Executive Pipeline Analytics",
        quote: "“The live qualification dashboard turned recruitment from a cost center into a strategic weapon.”",
        founderName: "Darren Bounds",
        founderRole: "Founder & CEO, MegaHR",
        metrics: [
          { label: "Conversion Lift", value: "4.2x" },
          { label: "Offer Acceptance", value: "92%" },
          { label: "Pipeline Velocity", value: "+180%" },
        ],
        summary: "Live candidate streaming and qualification telemetry for fast-scaling engineering teams.",
        projectLink: "/our-work",
      },
    ],
  },
  {
    id: "913-ai",
    companyName: "913.ai",
    companyCategory: "Domain-Specific AI Agents",
    logoType: "913",
    quote: "“A complete brand we're proud to put in front of investors and customers.”",
    founderName: "Immo Ait Stapelfeld",
    founderRole: "CEO & Founder, 913.ai",
    founderAvatar: "/images/team/team-2.jpg",
    projectLink: "/our-work",
    accentColor: "#7545F5",
    metrics: [
      { label: "Seed Closed", value: "$4.2M" },
      { label: "User Acquisition", value: "+340%" },
      { label: "Brand Recall", value: "98.4%" },
    ],
    caseStudySummary:
      "Engineered comprehensive brand identity, typography architecture, 3D visual assets, and high-converting marketing framework for enterprise AI agents.",
    workImages: [
      {
        id: "913-w1",
        companyName: "913.ai",
        category: "3D Visuals & Identity",
        title: "913.ai — 3D Dimensional Wave Identity",
        image: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_480.webp",
        caption: "Spatial 3D Wave Dynamics",
        quote: "“The glossy 3D wave visual assets defined our category and positioned us as an elite AI research studio.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Investor Traction", value: "$4.2M" },
          { label: "Session Time", value: "+3.8m" },
          { label: "Global Mentions", value: "450+" },
        ],
        summary: "Photorealistic 3D particle wave simulations representing continuous AI agent intelligence.",
        projectLink: "/our-work",
      },
      {
        id: "913-w2",
        companyName: "913.ai",
        category: "Web Platform UI",
        title: "913.ai — Autonomous Agent Console",
        image: "/images/selected_work/rjlcLH3DNif0U74oMAOCto3zT0_480.webp",
        caption: "AI Agent Console & Studio",
        quote: "“Sub-second agent execution telemetry packed in an ultra-clean, distraction-free developer interface.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Task Throughput", value: "250K/day" },
          { label: "Dev Retention", value: "96.2%" },
          { label: "Uptime SLA", value: "99.99%" },
        ],
        summary: "Real-time multi-agent orchestration console with graph-based reasoning monitors and token consumption analytics.",
        projectLink: "/our-work",
      },
      {
        id: "913-w3",
        companyName: "913.ai",
        category: "Packaging & Unboxing",
        title: "913.ai — Hardware Packaging System",
        image: "/images/selected_work/gtavCMDLHB0d9ehFukQtVNbXeU_480.webp",
        caption: "Investor Presentation Kits",
        quote: "“The physical touchpoints and packaging created by UNIQOVA left institutional investors speechless.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Term Sheets", value: "4 Offers" },
          { label: "Valuation Jump", value: "2.8x" },
          { label: "Partner NPS", value: "98.4" },
        ],
        summary: "Matte black structural packaging, foil-stamped documentation, and custom dimensional investor kits.",
        projectLink: "/our-work",
      },
      {
        id: "913-w4",
        companyName: "913.ai",
        category: "Summit Collateral",
        title: "913.ai — Technical Apparel & Merch",
        image: "/images/selected_work/rLOEAajcxuoSByBHZOjxaMTnzA_480.webp",
        caption: "Global AI Summit Collateral",
        quote: "“Our team and community wear the brand with immense pride at every tier-1 AI conference globally.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Conference Merch", value: "5,000+" },
          { label: "Community Growth", value: "+450%" },
          { label: "Organic Reach", value: "1.2M" },
        ],
        summary: "Embroidered technical outerwear, weatherproof windbreakers, hardware packaging, and investor kits.",
        projectLink: "/our-work",
      },
    ],
    col1Items: [
      {
        id: "913-c1-1",
        companyName: "913.ai",
        category: "3D Visuals & Identity",
        title: "913.ai — 3D Dimensional Wave Identity",
        image: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_480.webp",
        caption: "Spatial 3D Wave Dynamics",
        quote: "“The glossy 3D wave visual assets defined our category and positioned us as an elite AI research studio.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Investor Traction", value: "$4.2M" },
          { label: "Session Time", value: "+3.8m" },
          { label: "Global Mentions", value: "450+" },
        ],
        summary: "Photorealistic 3D particle wave simulations representing continuous AI agent intelligence.",
        projectLink: "/our-work",
      },
      {
        id: "913-c1-2",
        companyName: "913.ai",
        category: "Web Platform UI",
        title: "913.ai — Autonomous Agent Console",
        image: "/images/selected_work/rjlcLH3DNif0U74oMAOCto3zT0_480.webp",
        caption: "AI Agent Console & Studio",
        quote: "“Sub-second agent execution telemetry packed in an ultra-clean, distraction-free developer interface.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Task Throughput", value: "250K/day" },
          { label: "Dev Retention", value: "96.2%" },
          { label: "Uptime SLA", value: "99.99%" },
        ],
        summary: "Real-time multi-agent orchestration console with graph-based reasoning monitors and token consumption analytics.",
        projectLink: "/our-work",
      },
      {
        id: "913-c1-3",
        companyName: "913.ai",
        category: "Packaging & Unboxing",
        title: "913.ai — Hardware Packaging System",
        image: "/images/selected_work/gtavCMDLHB0d9ehFukQtVNbXeU_480.webp",
        caption: "Investor Presentation Kits",
        quote: "“The physical touchpoints and packaging created by UNIQOVA left institutional investors speechless.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Term Sheets", value: "4 Offers" },
          { label: "Valuation Jump", value: "2.8x" },
          { label: "Partner NPS", value: "98.4" },
        ],
        summary: "Matte black structural packaging, foil-stamped documentation, and custom dimensional investor kits.",
        projectLink: "/our-work",
      },
    ],
    col2Items: [
      {
        id: "913-c2-1",
        companyName: "913.ai",
        category: "Summit Collateral",
        title: "913.ai — Technical Apparel & Merch",
        image: "/images/selected_work/rLOEAajcxuoSByBHZOjxaMTnzA_480.webp",
        caption: "Global AI Summit Collateral",
        quote: "“Our team and community wear the brand with immense pride at every tier-1 AI conference globally.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Conference Merch", value: "5,000+" },
          { label: "Community Growth", value: "+450%" },
          { label: "Organic Reach", value: "1.2M" },
        ],
        summary: "Embroidered technical outerwear, weatherproof windbreakers, hardware packaging, and investor kits.",
        projectLink: "/our-work",
      },
      {
        id: "913-c2-2",
        companyName: "913.ai",
        category: "Wave Simulation",
        title: "913.ai — Generative Dimensional Wave",
        image: "/images/selected_work/AqzNoOtPPVkoo2wVZLMef3uhL8o_480.webp",
        caption: "Generative Particle Mesh",
        quote: "“Every interaction with our brand feels deeply technical yet extraordinarily refined.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Visual Engagement", value: "98.2%" },
          { label: "Keynote Views", value: "180K" },
          { label: "Award Honors", value: "FWA / Awwwards" },
        ],
        summary: "Generative 3D fluid dynamics mesh illustrating distributed autonomous neural pathways.",
        projectLink: "/our-work",
      },
      {
        id: "913-c2-3",
        companyName: "913.ai",
        category: "Console Architecture",
        title: "913.ai — Live Telemetry Monitor",
        image: "/images/selected_work/rjlcLH3DNif0U74oMAOCto3zT0_480.webp",
        caption: "Real-Time Agent Telemetry",
        quote: "“Engineers immediately understand what their agents are doing in production down to the millisecond.”",
        founderName: "Immo Ait Stapelfeld",
        founderRole: "CEO & Founder, 913.ai",
        metrics: [
          { label: "Trace Speed", value: "< 50ms" },
          { label: "Graph Nodes", value: "10,000+" },
          { label: "Error Detection", value: "99.9%" },
        ],
        summary: "High-density developer workspace displaying token distribution, reasoning branches, and latency traces.",
        projectLink: "/our-work",
      },
    ],
  },
  {
    id: "ruuster-ai",
    companyName: "Ruuster",
    companyCategory: "AI Real Estate Intelligence",
    logoType: "ruuster",
    quote: "“UNIQUOVA transformed our vision into an iconic brand identity and platform that scaled user acquisition 300%.”",
    founderName: "Alexander Wright",
    founderRole: "Founder & CEO, Ruuster",
    founderAvatar: "/images/team/team-3.jpg",
    projectLink: "/our-work",
    accentColor: "#F97316",
    metrics: [
      { label: "Active Investors", value: "24,000+" },
      { label: "Conversion Lift", value: "+182%" },
      { label: "P95 Speed", value: "0.42s" },
    ],
    caseStudySummary:
      "Large-scale Manhattan billboard campaign, scalable Next.js cloud web application, design system, and multi-platform visual guidelines.",
    workImages: [
      {
        id: "ruuster-w1",
        companyName: "Ruuster",
        category: "Large-Format OOH",
        title: "Ruuster — Manhattan Building Billboard",
        image: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_480.webp",
        caption: "Manhattan Billboard Campaign",
        quote: "“The towering Manhattan billboard campaign instantly drove enterprise credibility and institutional buy-in.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Impression Count", value: "5.8M" },
          { label: "Institutional LPs", value: "48 Funds" },
          { label: "Direct Inbound", value: "+210%" },
        ],
        summary: "Iconic high-rise billboard takeover in Midtown Manhattan featuring bold brand typography.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-w2",
        companyName: "Ruuster",
        category: "Cloud Web App",
        title: "Ruuster — AI Property Intelligence Platform",
        image: "/images/selected_work/it4cXk12EJX3M46FocEoA4IDN8_480.webp",
        caption: "Real-Time Valuation Engine",
        quote: "“Our web platform processes millions of residential listings in real time with breathtaking performance.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Query Speed", value: "0.42s" },
          { label: "Listings Synced", value: "3.2M" },
          { label: "User Retention", value: "91.4%" },
        ],
        summary: "High-concurrency React & Next.js cloud portal with geospatial predictive yield mapping.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-w3",
        companyName: "Ruuster",
        category: "Urban OOH Advertising",
        title: "Ruuster — Transit Hub Display Series",
        image: "/images/selected_work/2QlElFBnG4q7Qn7iIoRrvaKfE_480.webp",
        caption: "Transit Hub Billboard Series",
        quote: "“Striking visuals that cut through the noise of urban commuter hubs and generated record app signups.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "App Installs", value: "65,000+" },
          { label: "Cost Per Install", value: "$1.85" },
          { label: "Active Volume", value: "$45M+" },
        ],
        summary: "Multi-city digital transit screens showcasing real-time residential investment yields.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-w4",
        companyName: "Ruuster",
        category: "Fintech Interface",
        title: "Ruuster — Mobile Investor Portal",
        image: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp",
        caption: "Mobile Investment App UI",
        quote: "“Sleek holographic card architecture and fluid interactions that our high-net-worth clients praise daily.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Store Rating", value: "4.9 ★" },
          { label: "AUM Growth", value: "3.2x" },
          { label: "Daily Sessions", value: "4.8" },
        ],
        summary: "Native mobile wallet and fractional real estate trading UI with instant ACH settlement.",
        projectLink: "/our-work",
      },
    ],
    col1Items: [
      {
        id: "ruuster-c1-1",
        companyName: "Ruuster",
        category: "Large-Format OOH",
        title: "Ruuster — Manhattan Building Billboard",
        image: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_480.webp",
        caption: "Manhattan Billboard Campaign",
        quote: "“The towering Manhattan billboard campaign instantly drove enterprise credibility and institutional buy-in.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Impression Count", value: "5.8M" },
          { label: "Institutional LPs", value: "48 Funds" },
          { label: "Direct Inbound", value: "+210%" },
        ],
        summary: "Iconic high-rise billboard takeover in Midtown Manhattan featuring bold brand typography.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-c1-2",
        companyName: "Ruuster",
        category: "Cloud Web App",
        title: "Ruuster — AI Property Intelligence Platform",
        image: "/images/selected_work/it4cXk12EJX3M46FocEoA4IDN8_480.webp",
        caption: "Real-Time Valuation Engine",
        quote: "“Our web platform processes millions of residential listings in real time with breathtaking performance.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Query Speed", value: "0.42s" },
          { label: "Listings Synced", value: "3.2M" },
          { label: "User Retention", value: "91.4%" },
        ],
        summary: "High-concurrency React & Next.js cloud portal with geospatial predictive yield mapping.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-c1-3",
        companyName: "Ruuster",
        category: "Urban OOH Advertising",
        title: "Ruuster — Transit Hub Display Series",
        image: "/images/selected_work/2QlElFBnG4q7Qn7iIoRrvaKfE_480.webp",
        caption: "Transit Hub Billboard Series",
        quote: "“Striking visuals that cut through the noise of urban commuter hubs and generated record app signups.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "App Installs", value: "65,000+" },
          { label: "Cost Per Install", value: "$1.85" },
          { label: "Active Volume", value: "$45M+" },
        ],
        summary: "Multi-city digital transit screens showcasing real-time residential investment yields.",
        projectLink: "/our-work",
      },
    ],
    col2Items: [
      {
        id: "ruuster-c2-1",
        companyName: "Ruuster",
        category: "Fintech Interface",
        title: "Ruuster — Mobile Investor Portal",
        image: "/images/selected_work/7FldzCFmPc3PkirvuWP1hV6M_480.webp",
        caption: "Mobile Investment App UI",
        quote: "“Sleek holographic card architecture and fluid interactions that our high-net-worth clients praise daily.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Store Rating", value: "4.9 ★" },
          { label: "AUM Growth", value: "3.2x" },
          { label: "Daily Sessions", value: "4.8" },
        ],
        summary: "Native mobile wallet and fractional real estate trading UI with instant ACH settlement.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-c2-2",
        companyName: "Ruuster",
        category: "Investor Decks",
        title: "Ruuster — Institutional LP Deck Architecture",
        image: "/images/selected_work/lHVy2gEqT4bpJpxQsWz3JpyIDI4_480.webp",
        caption: "Institutional Fund Presentation",
        quote: "“The decks and visual identity engineered by UNIQOVA allowed us to raise our institutional round ahead of schedule.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Capital Raised", value: "$18.5M" },
          { label: "LP Commitments", value: "100%" },
          { label: "Due Diligence", value: "12 Days" },
        ],
        summary: "Institutional investor presentations, interactive financial models, and executive summary materials.",
        projectLink: "/our-work",
      },
      {
        id: "ruuster-c2-3",
        companyName: "Ruuster",
        category: "Geospatial Analytics",
        title: "Ruuster — High-Yield Property Heatmap",
        image: "/images/selected_work/it4cXk12EJX3M46FocEoA4IDN8_480.webp",
        caption: "High-Yield Geospatial Heatmap",
        quote: "“Real-time predictive yield heatmaps gave retail investors institutional-grade data at their fingertips.”",
        founderName: "Alexander Wright",
        founderRole: "Founder & CEO, Ruuster",
        metrics: [
          { label: "Yield Accuracy", value: "98.7%" },
          { label: "Transactions", value: "$120M+" },
          { label: "User NPS", value: "93.4" },
        ],
        summary: "Web-based geospatial valuation engine powered by deep learning predictive rent algorithms.",
        projectLink: "/our-work",
      },
    ],
  },
  {
    id: "euroteam-logistics",
    companyName: "Euroteam",
    companyCategory: "Sustainable Global Logistics",
    logoType: "euroteam",
    quote: "“The digital architecture and enterprise branding engineered by the team gave us an undeniable enterprise edge in global markets.”",
    founderName: "Mark Van Dijk",
    founderRole: "Managing Director, Euroteam",
    founderAvatar: "/images/team/team-4.jpg",
    projectLink: "/our-work",
    accentColor: "#10B981",
    metrics: [
      { label: "Route Volume", value: "€120M+" },
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Partner Conversion", value: "+64%" },
    ],
    caseStudySummary:
      "Enterprise digital transformation, real-time fleet scheduling dashboard, sustainable identity guidelines, and international web platform.",
    workImages: [
      {
        id: "euroteam-w1",
        companyName: "Euroteam",
        category: "OOH & Brand Takeover",
        title: "Euroteam — Highway 3-Banner Billboard Series",
        image: "/images/selected_work/pT9GV8WvHgTQ65MW162mjfBro_480.webp",
        caption: "Highway 3-Banner Billboard Series",
        quote: "“Our sustainable green brand banners immediately elevated our prestige across major European transit freight routes.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Freight Inquiries", value: "+84%" },
          { label: "Partner Deals", value: "€32M" },
          { label: "Brand Recall", value: "99.1%" },
        ],
        summary: "Highway outdoor billboard series highlighting sustainable carbon-neutral freight logistics.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-w2",
        companyName: "Euroteam",
        category: "Enterprise Web App",
        title: "Euroteam — Global Logistics Web Platform",
        image: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_480.webp",
        caption: "Fleet Scheduling & Route Interface",
        quote: "“Sub-200ms route calculations and a world-class UI that our international supply chain partners praise daily.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Global Coverage", value: "48 Countries" },
          { label: "Response Time", value: "< 200ms" },
          { label: "Client Retention", value: "99.1%" },
        ],
        summary: "Enterprise web application featuring real-time fleet scheduling, multi-currency checkout, and instant dispatch.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-w3",
        companyName: "Euroteam",
        category: "Generative Identity",
        title: "Euroteam — Dynamic Sustainable Patterns",
        image: "/images/selected_work/yylnHjpawl6cfQNJLwRB14HQ_480.webp",
        caption: "Fleet Wraps & Dynamic Patterns",
        quote: "“Every touchpoint—from shipping containers to digital apps—embodies our commitment to clean, forward-moving logistics.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Fleet Touchpoints", value: "1,200+" },
          { label: "Brand Equity", value: "€45M" },
          { label: "Consistency Score", value: "100%" },
        ],
        summary: "Generative vector patterns applied across electric trucks, shipping containers, and environmental impact collateral.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-w4",
        companyName: "Euroteam",
        category: "Logistics Telemetry",
        title: "Euroteam — Route Command Center",
        image: "/images/selected_work/wUqQcSSSVGIKdc8JPIo7HYcBvA_480.webp",
        caption: "Global Operations Dashboard",
        quote: "“Real-time telematics dashboard that gave our operations team complete clarity across European freight lanes.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "On-Time Dispatch", value: "99.8%" },
          { label: "Fuel Optimization", value: "-18%" },
          { label: "Active Routes", value: "480+" },
        ],
        summary: "Cloud-native mission control dashboard monitoring cargo telemetry and carbon offsets in real time.",
        projectLink: "/our-work",
      },
    ],
    col1Items: [
      {
        id: "euroteam-c1-1",
        companyName: "Euroteam",
        category: "OOH & Brand Takeover",
        title: "Euroteam — Highway 3-Banner Billboard Series",
        image: "/images/selected_work/pT9GV8WvHgTQ65MW162mjfBro_480.webp",
        caption: "Highway 3-Banner Billboard Series",
        quote: "“Our sustainable green brand banners immediately elevated our prestige across major European transit freight routes.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Freight Inquiries", value: "+84%" },
          { label: "Partner Deals", value: "€32M" },
          { label: "Brand Recall", value: "99.1%" },
        ],
        summary: "Highway outdoor billboard series highlighting sustainable carbon-neutral freight logistics.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-c1-2",
        companyName: "Euroteam",
        category: "Enterprise Web App",
        title: "Euroteam — Global Logistics Web Platform",
        image: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_480.webp",
        caption: "Fleet Scheduling & Route Interface",
        quote: "“Sub-200ms route calculations and a world-class UI that our international supply chain partners praise daily.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Global Coverage", value: "48 Countries" },
          { label: "Response Time", value: "< 200ms" },
          { label: "Client Retention", value: "99.1%" },
        ],
        summary: "Enterprise web application featuring real-time fleet scheduling, multi-currency checkout, and instant dispatch.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-c1-3",
        companyName: "Euroteam",
        category: "Generative Identity",
        title: "Euroteam — Dynamic Sustainable Patterns",
        image: "/images/selected_work/yylnHjpawl6cfQNJLwRB14HQ_480.webp",
        caption: "Fleet Wraps & Dynamic Patterns",
        quote: "“Every touchpoint—from shipping containers to digital apps—embodies our commitment to clean, forward-moving logistics.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Fleet Touchpoints", value: "1,200+" },
          { label: "Brand Equity", value: "€45M" },
          { label: "Consistency Score", value: "100%" },
        ],
        summary: "Generative vector patterns applied across electric trucks, shipping containers, and environmental impact collateral.",
        projectLink: "/our-work",
      },
    ],
    col2Items: [
      {
        id: "euroteam-c2-1",
        companyName: "Euroteam",
        category: "Logistics Telemetry",
        title: "Euroteam — Route Command Center",
        image: "/images/selected_work/wUqQcSSSVGIKdc8JPIo7HYcBvA_480.webp",
        caption: "Global Operations Dashboard",
        quote: "“Real-time telematics dashboard that gave our operations team complete clarity across European freight lanes.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "On-Time Dispatch", value: "99.8%" },
          { label: "Fuel Optimization", value: "-18%" },
          { label: "Active Routes", value: "480+" },
        ],
        summary: "Cloud-native mission control dashboard monitoring cargo telemetry and carbon offsets in real time.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-c2-2",
        companyName: "Euroteam",
        category: "Freight Corridor OOH",
        title: "Euroteam — European Transit Freight Corridor",
        image: "/images/selected_work/pT9GV8WvHgTQ65MW162mjfBro_480.webp",
        caption: "European Freight Transit Banners",
        quote: "“Cohesive visual communication across ports, highways, and railway freight terminals.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Transit Routes", value: "480+" },
          { label: "Partner Trust", value: "99.8%" },
          { label: "Emissions Saved", value: "32,000T" },
        ],
        summary: "International transit signage engineered for visibility in all weather conditions.",
        projectLink: "/our-work",
      },
      {
        id: "euroteam-c2-3",
        companyName: "Euroteam",
        category: "Route Dispatch UI",
        title: "Euroteam — Instant Route Dispatch Engine",
        image: "/images/selected_work/5XLw1iOCFMkIdPcaUnzOqvhUN8M_480.webp",
        caption: "Instant Dispatch Engine UI",
        quote: "“Zero-friction dispatch engine that reduced route planning time from hours to seconds.”",
        founderName: "Mark Van Dijk",
        founderRole: "Managing Director, Euroteam",
        metrics: [
          { label: "Dispatch Velocity", value: "14x" },
          { label: "Driver Adoption", value: "98.5%" },
          { label: "Fuel Cost", value: "-18%" },
        ],
        summary: "Responsive tablet interface used by over 3,000 European freight drivers and depot coordinators.",
        projectLink: "/our-work",
      },
    ],
  },
  {
    id: "needle-health",
    companyName: "Needle",
    companyCategory: "On-Demand Healthcare Logistics",
    logoType: "needle",
    quote: "“UNIQUOVA gave Needle the bold, consumer-friendly identity we needed to solve medication shortages nationwide.”",
    founderName: "Dr. Julian Vance",
    founderRole: "Co-Founder & CEO, Needle",
    founderAvatar: "/images/team/team-5.jpg",
    projectLink: "/our-work",
    accentColor: "#7545F5",
    metrics: [
      { label: "Pharmacies Synced", value: "14,000+" },
      { label: "Rx Fill Rate", value: "94.8%" },
      { label: "Time Saved", value: "4.5 Hrs" },
    ],
    caseStudySummary:
      "Full consumer brand identity, high-impact city billboard campaign, real-time prescription pharmacy inventory platform, and iOS/Android patient apps.",
    workImages: [
      {
        id: "needle-w1",
        companyName: "Needle",
        category: "Urban Billboard",
        title: "Needle — Citywide Pharmacy Locator Billboard",
        image: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_480.webp",
        caption: "Needle Finds Your Medications",
        quote: "“The superhero billboard campaign made Needle an overnight sensation across metro transit corridors.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "App Signups", value: "+420%" },
          { label: "Brand Recall", value: "97.4%" },
          { label: "Prescriptions Filled", value: "350K+" },
        ],
        summary: "Bold, human-centric citywide billboard takeover connecting patients directly with verified pharmacy stock.",
        projectLink: "/our-work",
      },
      {
        id: "needle-w2",
        companyName: "Needle",
        category: "Pharmacy Web Platform",
        title: "Needle — Real-Time Stock Engine",
        image: "/images/selected_work/hpcsAqyp0liwh7Ok2IW6n891fQ_480.webp",
        caption: "Real-Time Pharmacy Stock Engine",
        quote: "“Patients find rare medication in seconds instead of calling 20 pharmacies manually.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Query Speed", value: "< 180ms" },
          { label: "Sync Accuracy", value: "99.4%" },
          { label: "Patient NPS", value: "96.5" },
        ],
        summary: "Cloud-native web platform aggregating live inventory feeds from major pharmacy chains in real time.",
        projectLink: "/our-work",
      },
      {
        id: "needle-w3",
        companyName: "Needle",
        category: "Transit Billboard Series",
        title: "Needle — Commuter Transit Displays",
        image: "/images/selected_work/9poKWYVyKb5i4OwJGKSpWYNX44_480.webp",
        caption: "Commuter Transit Display Series",
        quote: "“Clear, empathetic messaging that resonated with patients during critical healthcare needs.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Metro Reach", value: "3.8M" },
          { label: "Organic Mentions", value: "1,800+" },
          { label: "Doctor Referrals", value: "2,400+" },
        ],
        summary: "High-visibility transit posters placed adjacent to medical centers and transit hubs.",
        projectLink: "/our-work",
      },
      {
        id: "needle-w4",
        companyName: "Needle",
        category: "Mobile Health UI",
        title: "Needle — Patient Notification Wallet",
        image: "/images/selected_work/qcyJpQGUrkkC5mT7vOWCxH6fZk_480.webp",
        caption: "Patient Notification & Alert UI",
        quote: "“Instant push alerts the millisecond a patient's prescription is stocked at their local pharmacy.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Notification Open", value: "78%" },
          { label: "Claim Speed", value: "< 4 Mins" },
          { label: "App Store", value: "4.9 ★" },
        ],
        summary: "Frictionless patient wallet with push notifications, automated transfer requests, and insurance cards.",
        projectLink: "/our-work",
      },
    ],
    col1Items: [
      {
        id: "needle-c1-1",
        companyName: "Needle",
        category: "Urban Billboard",
        title: "Needle — Citywide Pharmacy Locator Billboard",
        image: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_480.webp",
        caption: "Needle Finds Your Medications",
        quote: "“The superhero billboard campaign made Needle an overnight sensation across metro transit corridors.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "App Signups", value: "+420%" },
          { label: "Brand Recall", value: "97.4%" },
          { label: "Prescriptions Filled", value: "350K+" },
        ],
        summary: "Bold, human-centric citywide billboard takeover connecting patients directly with verified pharmacy stock.",
        projectLink: "/our-work",
      },
      {
        id: "needle-c1-2",
        companyName: "Needle",
        category: "Pharmacy Web Platform",
        title: "Needle — Real-Time Stock Engine",
        image: "/images/selected_work/hpcsAqyp0liwh7Ok2IW6n891fQ_480.webp",
        caption: "Real-Time Pharmacy Stock Engine",
        quote: "“Patients find rare medication in seconds instead of calling 20 pharmacies manually.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Query Speed", value: "< 180ms" },
          { label: "Sync Accuracy", value: "99.4%" },
          { label: "Patient NPS", value: "96.5" },
        ],
        summary: "Cloud-native web platform aggregating live inventory feeds from major pharmacy chains in real time.",
        projectLink: "/our-work",
      },
      {
        id: "needle-c1-3",
        companyName: "Needle",
        category: "Transit Billboard Series",
        title: "Needle — Commuter Transit Displays",
        image: "/images/selected_work/9poKWYVyKb5i4OwJGKSpWYNX44_480.webp",
        caption: "Commuter Transit Display Series",
        quote: "“Clear, empathetic messaging that resonated with patients during critical healthcare needs.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Metro Reach", value: "3.8M" },
          { label: "Organic Mentions", value: "1,800+" },
          { label: "Doctor Referrals", value: "2,400+" },
        ],
        summary: "High-visibility transit posters placed adjacent to medical centers and transit hubs.",
        projectLink: "/our-work",
      },
    ],
    col2Items: [
      {
        id: "needle-c2-1",
        companyName: "Needle",
        category: "Mobile Health UI",
        title: "Needle — Patient Notification Wallet",
        image: "/images/selected_work/qcyJpQGUrkkC5mT7vOWCxH6fZk_480.webp",
        caption: "Patient Notification & Alert UI",
        quote: "“Instant push alerts the millisecond a patient's prescription is stocked at their local pharmacy.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Notification Open", value: "78%" },
          { label: "Claim Speed", value: "< 4 Mins" },
          { label: "App Store", value: "4.9 ★" },
        ],
        summary: "Frictionless patient wallet with push notifications, automated transfer requests, and insurance cards.",
        projectLink: "/our-work",
      },
      {
        id: "needle-c2-2",
        companyName: "Needle",
        category: "National OOH Campaign",
        title: "Needle — Nationwide Pharmacy Network Billboard",
        image: "/images/selected_work/uqMI3M9FIeMorIDx6YyRwRj9C8_480.webp",
        caption: "National Pharmacy Network",
        quote: "“Our brand presence established Needle as the gold standard patient advocacy tool in digital health.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Pharmacy Partners", value: "14,000+" },
          { label: "Patient Savings", value: "$4.2M" },
          { label: "Press Coverage", value: "42 Outlets" },
        ],
        summary: "Nationwide outdoor awareness campaign emphasizing instant medication location and stock verification.",
        projectLink: "/our-work",
      },
      {
        id: "needle-c2-3",
        companyName: "Needle",
        category: "Prescription Telemetry",
        title: "Needle — Prescription Routing Architecture",
        image: "/images/selected_work/hpcsAqyp0liwh7Ok2IW6n891fQ_480.webp",
        caption: "Prescription Routing Architecture",
        quote: "“Automated transfer requests routed directly to nearby pharmacies with 100% HIPAA compliance.”",
        founderName: "Dr. Julian Vance",
        founderRole: "Co-Founder & CEO, Needle",
        metrics: [
          { label: "Transfer Time", value: "< 15 Mins" },
          { label: "HIPAA Compliant", value: "100%" },
          { label: "User Growth", value: "18x" },
        ],
        summary: "HIPAA-compliant cloud telemetry managing medication requests across state pharmacy networks.",
        projectLink: "/our-work",
      },
    ],
  },
  {
    id: "outset-law",
    companyName: "Outset Law",
    companyCategory: "Modern Corporate & Personal Law",
    logoType: "outset",
    quote: "“A legal brand that feels humane, modern, and trustworthy. Our client inquiries doubled in the first quarter.”",
    founderName: "Eleanor Sterling",
    founderRole: "Managing Partner, Outset Law",
    founderAvatar: "/images/team/team-6.jpg",
    projectLink: "/our-work",
    accentColor: "#1C593F",
    metrics: [
      { label: "Client Inbound", value: "+210%" },
      { label: "Consultation Rate", value: "74%" },
      { label: "Avg Resolution", value: "-35%" },
    ],
    caseStudySummary:
      "Modern legal branding, boardroom billboard series, seamless client intake portal, brand typography guidelines, and digital consultation systems.",
    workImages: [
      {
        id: "outset-w1",
        companyName: "Outset Law",
        category: "Executive Billboard",
        title: "Outset Law — Executive Hall & Boardroom Billboard",
        image: "/images/selected_work/HihuK51yaPuGKHmnXrlbzvzZM_480.webp",
        caption: "Legal Clarity for Life's Transitions",
        quote: "“The calming, sophisticated billboard established Outset Law as the premier trusted counsel for major life events.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Inbound Retainers", value: "€4.8M" },
          { label: "Brand Equity", value: "98.9%" },
          { label: "Client Trust", value: "100%" },
        ],
        summary: "Prestigious indoor and outdoor billboard installations emphasizing calm guidance through complex legal transitions.",
        projectLink: "/our-work",
      },
      {
        id: "outset-w2",
        companyName: "Outset Law",
        category: "Transit Brand Series",
        title: "Outset Law — Metro Transit Law Architecture",
        image: "/images/selected_work/l5uacj7PHrYhKwot8vkmbWa4HM_480.webp",
        caption: "Metro Transit Law Series",
        quote: "“Warm, approachable legal communication that stripped away archaic jargon and connected with real people.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Inquiry Volume", value: "+180%" },
          { label: "Response Time", value: "< 2 Hrs" },
          { label: "Client Retention", value: "96.4%" },
        ],
        summary: "Subway and urban transit series highlighting transparent pricing and compassionate family law services.",
        projectLink: "/our-work",
      },
      {
        id: "outset-w3",
        companyName: "Outset Law",
        category: "Client Intake UI",
        title: "Outset Law — Frictionless Consultation Portal",
        image: "/images/selected_work/me7oqaVBqgeLO9RXw1QevAGsFlw_480.webp",
        caption: "Digital Client Intake Portal",
        quote: "“Clients can schedule, upload sensitive case files, and communicate securely with their attorney in minutes.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Booking Speed", value: "3 Mins" },
          { label: "Intake Drop-off", value: "-62%" },
          { label: "Client NPS", value: "97.8" },
        ],
        summary: "End-to-end encrypted client intake portal with interactive case assessment and direct attorney scheduling.",
        projectLink: "/our-work",
      },
      {
        id: "outset-w4",
        companyName: "Outset Law",
        category: "Legal Tech Automation",
        title: "Outset Law — Document & Contract Workflow",
        image: "/images/selected_work/rZy5kVEyJg6E87JFlpFNpA2BSQ_480.webp",
        caption: "Automated Document Workflows",
        quote: "“Streamlined paperwork and automated drafting allowed our partners to focus 100% on advocacy.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Drafting Velocity", value: "5x" },
          { label: "Error Rate", value: "0.0%" },
          { label: "Partner Hours Saved", value: "40+/wk" },
        ],
        summary: "Intelligent document automation engine generating bespoke estate planning and corporate contracts.",
        projectLink: "/our-work",
      },
    ],
    col1Items: [
      {
        id: "outset-c1-1",
        companyName: "Outset Law",
        category: "Executive Billboard",
        title: "Outset Law — Executive Hall & Boardroom Billboard",
        image: "/images/selected_work/HihuK51yaPuGKHmnXrlbzvzZM_480.webp",
        caption: "Legal Clarity for Life's Transitions",
        quote: "“The calming, sophisticated billboard established Outset Law as the premier trusted counsel for major life events.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Inbound Retainers", value: "€4.8M" },
          { label: "Brand Equity", value: "98.9%" },
          { label: "Client Trust", value: "100%" },
        ],
        summary: "Prestigious indoor and outdoor billboard installations emphasizing calm guidance through complex legal transitions.",
        projectLink: "/our-work",
      },
      {
        id: "outset-c1-2",
        companyName: "Outset Law",
        category: "Transit Brand Series",
        title: "Outset Law — Metro Transit Law Architecture",
        image: "/images/selected_work/l5uacj7PHrYhKwot8vkmbWa4HM_480.webp",
        caption: "Metro Transit Law Series",
        quote: "“Warm, approachable legal communication that stripped away archaic jargon and connected with real people.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Inquiry Volume", value: "+180%" },
          { label: "Response Time", value: "< 2 Hrs" },
          { label: "Client Retention", value: "96.4%" },
        ],
        summary: "Subway and urban transit series highlighting transparent pricing and compassionate family law services.",
        projectLink: "/our-work",
      },
      {
        id: "outset-c1-3",
        companyName: "Outset Law",
        category: "Client Intake UI",
        title: "Outset Law — Frictionless Consultation Portal",
        image: "/images/selected_work/me7oqaVBqgeLO9RXw1QevAGsFlw_480.webp",
        caption: "Digital Client Intake Portal",
        quote: "“Clients can schedule, upload sensitive case files, and communicate securely with their attorney in minutes.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Booking Speed", value: "3 Mins" },
          { label: "Intake Drop-off", value: "-62%" },
          { label: "Client NPS", value: "97.8" },
        ],
        summary: "End-to-end encrypted client intake portal with interactive case assessment and direct attorney scheduling.",
        projectLink: "/our-work",
      },
    ],
    col2Items: [
      {
        id: "outset-c2-1",
        companyName: "Outset Law",
        category: "Legal Tech Automation",
        title: "Outset Law — Document & Contract Workflow",
        image: "/images/selected_work/rZy5kVEyJg6E87JFlpFNpA2BSQ_480.webp",
        caption: "Automated Document Workflows",
        quote: "“Streamlined paperwork and automated drafting allowed our partners to focus 100% on advocacy.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Drafting Velocity", value: "5x" },
          { label: "Error Rate", value: "0.0%" },
          { label: "Partner Hours Saved", value: "40+/wk" },
        ],
        summary: "Intelligent document automation engine generating bespoke estate planning and corporate contracts.",
        projectLink: "/our-work",
      },
      {
        id: "outset-c2-2",
        companyName: "Outset Law",
        category: "High-Impact OOH",
        title: "Outset Law — Life Transitions Billboard Series",
        image: "/images/selected_work/HihuK51yaPuGKHmnXrlbzvzZM_480.webp",
        caption: "Life Transitions Billboard Series",
        quote: "“A modern visual standard that elevated the firm to the top tier of international practice.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Referral Rate", value: "88%" },
          { label: "Corporate Clients", value: "140+" },
          { label: "National Reach", value: "2.8M" },
        ],
        summary: "High-impact outdoor media conveying calm authority and dependable legal counsel.",
        projectLink: "/our-work",
      },
      {
        id: "outset-c2-3",
        companyName: "Outset Law",
        category: "Brand Guidelines",
        title: "Outset Law — Humane Brand Guidelines & Tokens",
        image: "/images/selected_work/l5uacj7PHrYhKwot8vkmbWa4HM_480.webp",
        caption: "Humane Brand Guidelines & Tokens",
        quote: "“The design tokens and editorial guidelines ensure our message remains consistent across all offices.”",
        founderName: "Eleanor Sterling",
        founderRole: "Managing Partner, Outset Law",
        metrics: [
          { label: "Brand Uniformity", value: "100%" },
          { label: "Multi-Office Sync", value: "6 Locations" },
          { label: "Client Satisfaction", value: "99.2%" },
        ],
        summary: "Complete brand guidelines covering typography, legal documentation styling, and office signage.",
        projectLink: "/our-work",
      },
    ],
  },
];

interface TrustedByCompaniesProps {
  onOpenContact?: () => void;
}

export default function TrustedByCompanies({ onOpenContact }: TrustedByCompaniesProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedStoryModal, setSelectedStoryModal] = useState<BrandWorkItem | FounderStory | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const bentoGridRef = useRef<HTMLDivElement>(null);

  const total = FEATURED_FOUNDERS.length;
  const current = FEATURED_FOUNDERS[currentIndex];

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay interval with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 7500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide]);

  // 3D GPU Tilt on mousemove for bento visuals
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const tiltSpringConfig = { stiffness: 120, damping: 22, mass: 0.15 };
  const smoothTiltX = useSpring(useTransform(mouseY, [-0.5, 0.5], [2.5, -2.5]), tiltSpringConfig);
  const smoothTiltY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-2.5, 2.5]), tiltSpringConfig);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 90%", "end 10%"],
  });

  const scrollSpringConfig = { stiffness: 95, damping: 19, mass: 0.25 };

  const rawHeaderY = useTransform(scrollYProgress, [0, 0.30, 0.70, 1], [85, 0, 0, -65]);
  const rawHeaderScale = useTransform(scrollYProgress, [0, 0.30, 0.70, 1], [0.85, 1.0, 1.0, 0.88]);
  const rawHeaderOpacity = useTransform(scrollYProgress, [0, 0.24, 0.78, 1], [0, 1.0, 1.0, 0]);
  const smoothHeaderY = useSpring(rawHeaderY, scrollSpringConfig);
  const smoothHeaderScale = useSpring(rawHeaderScale, scrollSpringConfig);
  const smoothHeaderOpacity = useSpring(rawHeaderOpacity, scrollSpringConfig);

  const rawSubtitleY = useTransform(scrollYProgress, [0, 0.33, 0.68, 1], [65, 0, 0, -50]);
  const rawSubtitleScale = useTransform(scrollYProgress, [0, 0.33, 0.68, 1], [0.89, 1.0, 1.0, 0.91]);
  const rawSubtitleOpacity = useTransform(scrollYProgress, [0, 0.26, 0.76, 1], [0, 1.0, 1.0, 0]);
  const smoothSubtitleY = useSpring(rawSubtitleY, scrollSpringConfig);
  const smoothSubtitleScale = useSpring(rawSubtitleScale, scrollSpringConfig);
  const smoothSubtitleOpacity = useSpring(rawSubtitleOpacity, scrollSpringConfig);

  const rawCardY = useTransform(scrollYProgress, [0, 0.36, 0.66, 1], [150, 0, 0, -85]);
  const rawCardScale = useTransform(scrollYProgress, [0, 0.36, 0.66, 1], [0.86, 1.0, 1.0, 0.88]);
  const rawCardRotateX = useTransform(scrollYProgress, [0, 0.36, 0.66, 1], [12, 0, 0, -9]);
  const rawCardOpacity = useTransform(scrollYProgress, [0, 0.28, 0.74, 1], [0, 1.0, 1.0, 0]);
  const smoothScrollCardY = useSpring(rawCardY, scrollSpringConfig);
  const smoothScrollCardScale = useSpring(rawCardScale, scrollSpringConfig);
  const smoothScrollCardRotateX = useSpring(rawCardRotateX, scrollSpringConfig);
  const smoothScrollCardOpacity = useSpring(rawCardOpacity, scrollSpringConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!bentoGridRef.current) return;
    const rect = bentoGridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x / rect.width - 0.5);
    mouseY.set(y / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const renderCompanyLogo = (story: FounderStory) => {
    if (story.logoType === "megahr") {
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 grid grid-cols-2 gap-0.5">
            <div className="w-2 h-2 bg-dark rounded-[1px]" />
            <div className="w-2 h-2 bg-dark rounded-[1px]" />
            <div className="w-2 h-2 bg-dark rounded-[1px]" />
            <div className="w-2 h-2 bg-primary rounded-[1px]" />
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">MegaHR</span>
        </div>
      );
    }
    if (story.logoType === "913") {
      return (
        <div className="flex items-center gap-2.5">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full border-2 border-dashed border-primary animate-spin-slow" />
            <div className="w-1.5 h-1.5 rounded-full bg-primary absolute" />
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">913.ai</span>
        </div>
      );
    }
    if (story.logoType === "ruuster") {
      return (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#F97316] rounded-sm rotate-45 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full" />
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">Ruuster</span>
        </div>
      );
    }
    if (story.logoType === "euroteam") {
      return (
        <div className="flex items-center gap-2">
          <div className="w-4.5 h-4.5 rounded-full bg-[#10B981] flex items-center justify-center text-white text-[10px] font-black">
            E
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">Euroteam</span>
        </div>
      );
    }
    if (story.logoType === "needle") {
      return (
        <div className="flex items-center gap-2.5">
          <div className="w-4.5 h-4.5 rounded-full bg-primary flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-white" />
          </div>
          <span className="font-extrabold text-2xl text-dark tracking-tight">Needle</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2">
        <div className="px-1.5 py-0.5 rounded bg-[#1C593F] text-white text-[10px] font-black tracking-widest uppercase">
          OUTSET
        </div>
        <span className="font-extrabold text-2xl text-dark tracking-tight">Outset Law</span>
      </div>
    );
  };

  return (
    <section
      id="trusted-by"
      ref={containerRef}
      style={{ perspective: "1400px" }}
      className="py-12 sm:py-16 lg:py-20 bg-[#FAF9FF] relative overflow-hidden will-change-transform"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8 lg:mb-10 will-change-transform">
          <motion.h2
            style={{
              y: smoothHeaderY,
              scale: smoothHeaderScale,
              opacity: smoothHeaderOpacity,
              transformStyle: "preserve-3d",
            }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-dark tracking-tight leading-tight will-change-transform"
          >
            Trusted by AI founders
          </motion.h2>

          <motion.p
            style={{
              y: smoothSubtitleY,
              scale: smoothSubtitleScale,
              opacity: smoothSubtitleOpacity,
            }}
            className="text-sm sm:text-base text-dark-muted font-medium mt-1.5 max-w-xl mx-auto will-change-transform"
          >
            Straight from the founders we work with
          </motion.p>
        </div>

        {/* ====================================================
            THE MAIN TACTILE BENTO CARD CONTAINER
            - Left: Active Brand Owner Info, Quote, & "< >" Nav Buttons
            - Right: Continuous Moving Marquee Animation of THAT Specific Brand
            - Theme: UNIQOVA Signature Soft Lavender Luxury
           ==================================================== */}
        <motion.div
          style={{
            y: smoothScrollCardY,
            scale: smoothScrollCardScale,
            rotateX: smoothScrollCardRotateX,
            opacity: smoothScrollCardOpacity,
            transformStyle: "preserve-3d",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-gradient-to-br from-[#F5EFFF] via-[#FAF8FF] to-[#EBE2FF] border border-primary/20 rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-5 sm:p-7 lg:p-8 xl:p-10 shadow-[0_24px_70px_-15px_rgba(117,69,245,0.13),0_4px_24px_rgba(21,19,35,0.03)] overflow-hidden will-change-transform group"
        >
          {/* Ambient Lavender Radial Glow Inside Card */}
          <div className="absolute -top-28 -right-28 w-80 h-80 bg-primary/12 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
            
            {/* ====================================================
                LEFT COLUMN: Brand Owner, Logo, Quote, & Controls
               ==================================================== */}
            <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[300px] sm:min-h-[340px] lg:min-h-[390px]">
              
              {/* Top Row: Company Logo & Interactive Navigation "< >" */}
              <div className="flex items-center justify-between gap-3 mb-3 sm:mb-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`logo-${current.id}`}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                  >
                    {renderCompanyLogo(current)}
                  </motion.div>
                </AnimatePresence>

                {/* Circular Navigation Buttons: "<" (White) & ">" (Electric Purple) */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous Brand"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white hover:bg-primary-light active:scale-95 text-dark hover:text-primary shadow-xs border border-primary/20 flex items-center justify-center transition-all cursor-pointer hover:shadow-sm"
                  >
                    <ChevronLeft className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="Next Brand"
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary active:scale-95 text-white shadow-glow-sm hover:shadow-glow flex items-center justify-center transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </button>
                </div>
              </div>

              {/* Middle: Big Testimonial Quotation */}
              <div className="my-auto py-2">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={`quote-${current.id}`}
                    custom={direction}
                    initial={{ opacity: 0, y: direction > 0 ? 15 : -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: direction > 0 ? -15 : 15 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <p className="text-xl sm:text-2xl lg:text-[25px] xl:text-[27px] font-extrabold text-dark leading-[1.28] tracking-tight">
                      {current.quote}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Bottom: Founder Avatar, Name, Role & Case Study Link */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`founder-${current.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3, delay: 0.04 }}
                  className="flex items-center gap-3 pt-3 sm:pt-4"
                >
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-primary/25 shrink-0 bg-white shadow-sm">
                    <img
                      src={current.founderAvatar}
                      alt={current.founderName}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>

                  <div className="flex flex-col">
                    <span className="text-sm sm:text-base font-extrabold text-dark leading-tight">
                      {current.founderName}
                    </span>
                    <div className="text-xs sm:text-sm text-dark-muted font-medium mt-0.5 flex items-center gap-1.5 flex-wrap">
                      <span>{current.founderRole}</span>
                      <span className="text-dark-muted/40">·</span>
                      <button
                        onClick={() => setSelectedStoryModal(current)}
                        className="text-primary font-bold hover:text-primary-dark transition-colors underline underline-offset-4 decoration-primary/40 hover:decoration-primary inline-flex items-center gap-1 cursor-pointer"
                      >
                        <span>See the project</span>
                        <ArrowRight className="w-3 h-3 inline-block" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ====================================================
                RIGHT COLUMN: Continuous Moving Deliverables Animation
                - Runs continuously without stopping (dual marquee)
                - Displays the product images of THAT specific brand owner
                - When navigating with "< >" or dots, seamlessly switches
                - Interactive 3D tilt on mousemove
                - Top & bottom gradient fades for smooth infinite flow
               ==================================================== */}
            <motion.div
              ref={bentoGridRef}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                rotateX: smoothTiltX,
                rotateY: smoothTiltY,
                transformStyle: "preserve-3d",
              }}
              className="lg:col-span-7 w-full h-[360px] sm:h-[400px] lg:h-[430px] overflow-hidden will-change-transform relative rounded-[22px] sm:rounded-[28px] bg-[#0E0C18]/5 border border-primary/15"
            >
              {/* Soft Gradient Overlay Fades at Top & Bottom */}
              <div className="absolute inset-x-0 top-0 h-14 bg-gradient-to-b from-[#F5EFFF] via-[#FAF8FF]/70 to-transparent z-20 pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[#EBE2FF] via-[#FAF8FF]/70 to-transparent z-20 pointer-events-none" />

              {/* Animated Presence for Smooth Seamless Founder Switch */}
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={`brand-conveyor-${current.id}`}
                  custom={direction}
                  initial={{
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(4px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    filter: "blur(4px)",
                  }}
                  transition={{
                    duration: 0.35,
                    ease: "easeInOut",
                  }}
                  className="grid grid-cols-2 gap-3 sm:gap-4 h-full w-full"
                >
                  {/* Column 1: Continuous Vertical Marquee Up */}
                  <div className="h-full overflow-hidden">
                    <div className="animate-marquee-up pause-on-hover flex flex-col gap-3 sm:gap-3.5 will-change-transform">
                      {[...current.col1Items, ...current.col1Items].map((item, idx) => (
                        <div
                          key={`${item.id}-c1-${idx}`}
                          onClick={() => setSelectedStoryModal(item)}
                          className="group/card relative h-[180px] sm:h-[200px] lg:h-[210px] w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#0A0910] border border-primary/20 hover:border-primary/60 shadow-[0_8px_24px_rgba(21,19,35,0.12)] hover:shadow-glow-sm cursor-pointer transition-all duration-300 ease-out shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover object-center select-none group-hover/card:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="inline-block text-[11px] font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 truncate max-w-full">
                              {item.caption}
                            </span>
                          </div>
                          <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Column 2: Continuous Vertical Marquee Down */}
                  <div className="h-full overflow-hidden">
                    <div className="animate-marquee-down pause-on-hover flex flex-col gap-3 sm:gap-3.5 will-change-transform">
                      {[...current.col2Items, ...current.col2Items].map((item, idx) => (
                        <div
                          key={`${item.id}-c2-${idx}`}
                          onClick={() => setSelectedStoryModal(item)}
                          className="group/card relative h-[180px] sm:h-[200px] lg:h-[210px] w-full rounded-[18px] sm:rounded-[22px] overflow-hidden bg-[#16151E] border border-primary/20 hover:border-primary/60 shadow-[0_8px_24px_rgba(21,19,35,0.12)] hover:shadow-glow-sm cursor-pointer transition-all duration-300 ease-out shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover object-center select-none group-hover/card:scale-105 transition-transform duration-500 ease-out"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />
                          <div className="absolute bottom-2.5 left-2.5 right-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <span className="inline-block text-[11px] font-bold text-white bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20 truncate max-w-full">
                              {item.caption}
                            </span>
                          </div>
                          <div className="absolute inset-0 rounded-[inherit] border border-white/10 pointer-events-none" />
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>
        </motion.div>



      </div>

      {/* ====================================================
          INTERACTIVE CASE STUDY DETAIL MODAL
         ==================================================== */}
      <AnimatePresence>
        {selectedStoryModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedStoryModal(null)}
              className="fixed inset-0 bg-dark/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-3xl bg-white rounded-[28px] sm:rounded-[36px] shadow-2xl border border-border overflow-hidden z-10 my-8"
            >
              {/* Modal Header */}
              <div className="relative p-6 sm:p-8 bg-gradient-to-br from-softBg to-white border-b border-border">
                <button
                  onClick={() => setSelectedStoryModal(null)}
                  className="absolute top-5 right-5 w-9 h-9 rounded-full bg-softBg hover:bg-primary-light text-dark hover:text-primary flex items-center justify-center border border-border shadow-xs transition-transform active:scale-90 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <span className="font-extrabold text-xl text-dark">
                    {selectedStoryModal.companyName}
                  </span>
                  <span className="text-xs px-3 py-1 rounded-full bg-primary-light text-primary font-bold border border-primary-200">
                    {"category" in selectedStoryModal
                      ? selectedStoryModal.category
                      : selectedStoryModal.companyCategory}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-dark leading-tight mt-2">
                  {selectedStoryModal.quote}
                </h3>

                <p className="text-sm text-dark-muted font-medium mt-3 leading-relaxed">
                  {"summary" in selectedStoryModal
                    ? selectedStoryModal.summary
                    : selectedStoryModal.caseStudySummary}
                </p>
              </div>

              {/* Modal Body: Metrics & Deliverable previews */}
              <div className="p-6 sm:p-8 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-dark-muted mb-3">
                    Verified Engagement Metrics
                  </h4>
                  <div className="grid grid-cols-3 gap-3 sm:gap-4">
                    {selectedStoryModal.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-2xl bg-softBg border border-border/80 text-center hover:border-primary/30 transition-colors"
                      >
                        <div className="text-xl sm:text-2xl font-black text-primary">
                          {metric.value}
                        </div>
                        <div className="text-xs font-medium text-dark-muted mt-1">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {"image" in selectedStoryModal && (
                  <div className="h-56 sm:h-64 rounded-2xl overflow-hidden border border-border shadow-xs">
                    <img
                      src={selectedStoryModal.image}
                      alt={selectedStoryModal.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Modal Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-light border border-primary/20 text-primary flex items-center justify-center font-black text-sm">
                      {selectedStoryModal.founderName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-dark">
                        {selectedStoryModal.founderName}
                      </div>
                      <div className="text-xs text-dark-muted font-medium">
                        {selectedStoryModal.founderRole}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {onOpenContact && (
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStoryModal(null);
                          onOpenContact();
                        }}
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white text-sm font-bold shadow-glow-sm hover:shadow-glow transition-all cursor-pointer"
                      >
                        <span>Start Similar Project</span>
                      </button>
                    )}
                    <Link
                      href={selectedStoryModal.projectLink}
                      onClick={() => setSelectedStoryModal(null)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-softBg text-dark border border-border hover:border-primary/40 text-sm font-bold shadow-xs transition-all cursor-pointer"
                    >
                      <span>Explore Case Study</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

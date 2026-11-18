"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { CompanyInfo } from "@/data/agencyData";

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  showText?: boolean;
  variant?: "default" | "white";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  tagline?: string;
}

export default function Logo({
  className = "",
  showTagline = true,
  showText = true,
  variant = "default",
  size = "md",
  tagline: customTagline,
}: LogoProps) {
  const isWhite = variant === "white";
  const [activeTagline, setActiveTagline] = useState(
    customTagline || "Your Vision. Our Expertise."
  );

  useEffect(() => {
    if (customTagline) {
      setActiveTagline(customTagline);
      return;
    }

    fetch("/api/company-info")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.companyInfo?.tagline) {
          setActiveTagline(data.companyInfo.tagline);
        }
      })
      .catch(() => {});

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<CompanyInfo>;
      if (customEvt.detail?.tagline) {
        setActiveTagline(customEvt.detail.tagline);
      }
    };

    window.addEventListener("companyInfoUpdated", handleUpdate);
    return () => window.removeEventListener("companyInfoUpdated", handleUpdate);
  }, [customTagline]);

  const sizeClasses = {
    sm: { icon: "w-8 h-8", text: "text-lg", tag: "text-[9px]" },
    md: { icon: "w-10 h-10", text: "text-xl", tag: "text-[10px]" },
    lg: { icon: "w-12 h-12", text: "text-2xl", tag: "text-[11px]" },
    xl: { icon: "w-16 h-16", text: "text-3xl", tag: "text-xs" },
    "2xl": { icon: "w-20 h-20", text: "text-4xl", tag: "text-sm" },
    "3xl": { icon: "w-24 h-24", text: "text-5xl", tag: "text-base" },
  }[size];

  return (
    <Link
      href="/"
      title="UNIQUOVA"
      className={`inline-flex items-center gap-2.5 group transition-opacity hover:opacity-95 ${className}`}
    >
      {/* Monogram UQ Mark */}
      <div className={`relative ${sizeClasses.icon} flex items-center justify-center shrink-0`}>
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="uqGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7545F5" />
              <stop offset="100%" stopColor="#5030C7" />
            </linearGradient>
            <linearGradient id="uqAccent" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9E76FB" />
              <stop offset="100%" stopColor="#7545F5" />
            </linearGradient>
          </defs>

          {/* Stylized rounded UQ path */}
          {/* U path */}
          <path
            d="M8 12V22C8 27.5228 12.4772 32 18 32H20C21.6 32 23.1 31.6 24.4 30.9"
            stroke="url(#uqGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Q loop */}
          <circle
            cx="28"
            cy="21"
            r="9"
            stroke="url(#uqGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Q diagonal kick/lens */}
          <path
            d="M32 26L37 32"
            stroke={isWhite ? "#9E76FB" : "#151323"}
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          {/* Glowing accent point */}
          <circle cx="10" cy="12" r="2.5" fill="#9E76FB" />
        </svg>
      </div>

      {/* Brand Text & Tagline */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <span
              className={`font-black tracking-tight leading-none ${sizeClasses.text} ${
                isWhite ? "text-white" : "text-dark"
              }`}
            >
              UNIQUOVA
            </span>
            <span className="text-primary font-black text-lg leading-none ml-0.5">.</span>
          </div>

          {showTagline && (
            <span
              className={`font-medium tracking-normal mt-0.5 whitespace-nowrap ${sizeClasses.tag} ${
                isWhite ? "text-purple-200/80" : "text-dark-muted"
              }`}
            >
              {activeTagline}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}


"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CompanyInfo, DEFAULT_COMPANY_INFO } from "@/data/agencyData";

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
    customTagline || DEFAULT_COMPANY_INFO.tagline || "Your Vision. Our Expertise."
  );

  useEffect(() => {
    if (customTagline) {
      setActiveTagline(customTagline);
      return;
    }

    // Check if tagline was cached in sessionStorage to prevent network delay
    try {
      const cached = sessionStorage.getItem("uniquova_company_info");
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed?.tagline) {
          setActiveTagline(parsed.tagline);
        }
      }
    } catch {
      // Ignore sessionStorage errors
    }

    const handleUpdate = (e: Event) => {
      const customEvt = e as CustomEvent<CompanyInfo>;
      if (customEvt.detail?.tagline) {
        setActiveTagline(customEvt.detail.tagline);
        try {
          sessionStorage.setItem("uniquova_company_info", JSON.stringify(customEvt.detail));
        } catch {
          // Ignore
        }
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
      {/* Monogram Emblem Mark */}
      <div className={`relative ${sizeClasses.icon} flex items-center justify-center shrink-0`}>
        <Image
          src={isWhite ? "/images/uniquova_emblem_white.png" : "/images/uniquova_emblem.png"}
          alt="UNIQUOVA Emblem"
          width={96}
          height={96}
          priority
          className="w-full h-full object-contain drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
        />
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


"use client";

import React, { useState, useEffect } from "react";
import initialBrands from "@/data/brands.json";
import { BrandPartnerItem } from "@/data/agencyData";

export default function TrustedBy() {
  const [brands, setBrands] = useState<BrandPartnerItem[]>(initialBrands as BrandPartnerItem[]);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/brands")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted && data.success && Array.isArray(data.brands)) {
          setBrands(data.brands);
        }
      })
      .catch(() => {
        // Keep initial fallback brands
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const activeBrands = brands.filter((b) => b.active !== false);

  if (activeBrands.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mt-8 lg:mt-12">
      {/* Scoped CSS animation for smooth Left-to-Right motion */}
      <style>{`
        @keyframes marqueeLeftToRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .animate-marquee-left-to-right {
          animation: marqueeLeftToRight 30s linear infinite !important;
          will-change: transform;
        }
        .animate-marquee-left-to-right:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <div className="bg-white/95 backdrop-blur-xl border border-border/80 shadow-[0_10px_35px_rgba(117,69,245,0.06)] rounded-2xl sm:rounded-full px-5 sm:px-7 py-3 sm:py-3.5 flex flex-col md:flex-row items-center gap-5 sm:gap-6 overflow-hidden">
        {/* Left Badge: Trusted By / Leading brands & businesses */}
        <div className="flex items-center gap-3 shrink-0 z-10 bg-white/95 pr-2">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shrink-0" />
          <div className="flex flex-col text-left">
            <span className="text-xs sm:text-sm font-extrabold text-dark tracking-tight leading-none whitespace-nowrap">
              Trusted By
            </span>
            <span className="text-[10px] sm:text-xs font-medium text-dark-muted leading-tight mt-0.5 whitespace-nowrap">
              Leading brands &amp; businesses
            </span>
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="hidden md:block w-px h-8 bg-border/80 shrink-0 z-10" />

        {/* Marquee Track Container with gradient fade edges */}
        <div className="relative w-full overflow-hidden flex-1 py-1">
          {/* Subtle fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Continuous Moving Track: from Left to Right */}
          <div className="flex w-max items-center space-x-8 sm:space-x-10 animate-marquee-left-to-right">
            {[...activeBrands, ...activeBrands, ...activeBrands, ...activeBrands].map((brand, idx) => {
              const content = (
                <div className="flex items-center hover:opacity-85 transition-opacity shrink-0 py-1">
                  <img
                    src={brand.logoUrl}
                    alt={brand.alt || `${brand.name} — Trusted Partner`}
                    width={130}
                    height={36}
                    loading="lazy"
                    className="h-7 sm:h-8 w-auto object-contain max-w-[140px]"
                  />
                </div>
              );

              return (
                <div
                  key={`${brand.id}-${idx}`}
                  className="shrink-0 transition-transform duration-200 hover:scale-105"
                  title={brand.name}
                >
                  {brand.websiteUrl ? (
                    <a
                      href={brand.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block cursor-pointer"
                    >
                      {content}
                    </a>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

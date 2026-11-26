"use client";

import React, { useState, useEffect } from "react";
import initialCapabilities from "@/data/capabilities.json";
import { CapabilityItem } from "@/data/agencyData";
import CapabilityIcon from "./CapabilityIcon";

export default function ServicesMarquee() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [capabilities, setCapabilities] = useState<CapabilityItem[]>(
    initialCapabilities as CapabilityItem[]
  );

  const fetchCapabilities = async () => {
    try {
      const res = await fetch(`/api/capabilities?t=${Date.now()}`, { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.capabilities)) {
        setCapabilities(data.capabilities);
      }
    } catch {
      // Keep initial capabilities
    }
  };

  useEffect(() => {
    fetchCapabilities();

    const handleUpdate = () => {
      fetchCapabilities();
    };

    window.addEventListener("capabilitiesUpdated", handleUpdate);
    window.addEventListener("focus", handleUpdate);
    return () => {
      window.removeEventListener("capabilitiesUpdated", handleUpdate);
      window.removeEventListener("focus", handleUpdate);
    };
  }, []);

  // Separate into Track 1 and Track 2
  const activeItems = capabilities.filter((c) => c.active !== false);

  const row1Items = activeItems
    .filter((c) => c.track === 1)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const row2Items = activeItems
    .filter((c) => c.track === 2)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  // Fallbacks if one row is completely empty
  const displayRow1 = row1Items.length > 0 ? row1Items : activeItems.slice(0, Math.ceil(activeItems.length / 2));
  const displayRow2 = row2Items.length > 0 ? row2Items : activeItems.slice(Math.ceil(activeItems.length / 2));

  // UNIQUOVA signature brand theme colors:
  const themePrimary = "#7545F5"; // Primary Purple
  const themeDark = "#5030C7"; // Deep Purple
  const themeGlow = "rgba(117, 69, 245, 0.28)"; // Purple glow shadow
  const themeBgHover = "#F8F5FF"; // Soft Light Lavender on hover

  return (
    <div className="w-full relative py-2">
      {/* TRACK 1 (Moves Left) */}
      <div className="relative w-full overflow-hidden py-3 group">
        {/* Soft edge masks matching the #FAF9FF section background */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#FAF9FF] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#FAF9FF] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max space-x-5 animate-marquee group-hover:[animation-play-state:paused]">
          {/* Double the array for seamless infinite looping */}
          {[...displayRow1, ...displayRow1].map((item, idx) => {
            const isHovered = hoveredId === `${item.id}-${idx}`;

            return (
              <div
                key={`${item.id}-${idx}`}
                onMouseEnter={() => setHoveredId(`${item.id}-${idx}`)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  color: isHovered ? themePrimary : "#64748B",
                  borderColor: isHovered ? themePrimary : "#EAE6F4",
                  boxShadow: isHovered
                    ? `0 12px 30px ${themeGlow}, 0 2px 6px rgba(117, 69, 245, 0.12)`
                    : "0 2px 8px rgba(0,0,0,0.02)",
                  backgroundColor: isHovered ? themeBgHover : "rgba(255, 255, 255, 0.85)",
                }}
                className={`px-5 py-3.5 rounded-2xl border flex items-center gap-3 transition-all duration-300 cursor-pointer select-none ${
                  isHovered
                    ? "scale-105 opacity-100 z-10"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <div
                  className={`transition-all duration-300 transform ${
                    isHovered ? "scale-110 text-primary" : "text-dark-muted grayscale"
                  }`}
                  style={{ color: isHovered ? themePrimary : undefined }}
                >
                  <CapabilityIcon iconKey={item.iconKey} className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-extrabold tracking-tight whitespace-nowrap transition-colors ${
                      isHovered ? "text-primary" : "text-dark"
                    }`}
                    style={{ color: isHovered ? themePrimary : undefined }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-[10px] uppercase font-bold tracking-wider transition-colors"
                    style={{
                      color: isHovered ? themeDark : "#94A3B8",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* TRACK 2 (Moves Right / Reverse) */}
      <div className="relative w-full overflow-hidden py-3 mt-1 group">
        {/* Soft edge masks matching the #FAF9FF section background */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-r from-[#FAF9FF] to-transparent z-20 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-36 bg-gradient-to-l from-[#FAF9FF] to-transparent z-20 pointer-events-none" />

        <div className="flex w-max space-x-5 animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {[...displayRow2, ...displayRow2].map((item, idx) => {
            const isHovered = hoveredId === `${item.id}-r2-${idx}`;

            return (
              <div
                key={`${item.id}-r2-${idx}`}
                onMouseEnter={() => setHoveredId(`${item.id}-r2-${idx}`)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  color: isHovered ? themePrimary : "#64748B",
                  borderColor: isHovered ? themePrimary : "#EAE6F4",
                  boxShadow: isHovered
                    ? `0 12px 30px ${themeGlow}, 0 2px 6px rgba(117, 69, 245, 0.12)`
                    : "0 2px 8px rgba(0,0,0,0.02)",
                  backgroundColor: isHovered ? themeBgHover : "rgba(255, 255, 255, 0.85)",
                }}
                className={`px-5 py-3.5 rounded-2xl border flex items-center gap-3 transition-all duration-300 cursor-pointer select-none ${
                  isHovered
                    ? "scale-105 opacity-100 z-10"
                    : "opacity-75 hover:opacity-100"
                }`}
              >
                <div
                  className={`transition-all duration-300 transform ${
                    isHovered ? "scale-110 text-primary" : "text-dark-muted grayscale"
                  }`}
                  style={{ color: isHovered ? themePrimary : undefined }}
                >
                  <CapabilityIcon iconKey={item.iconKey} className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span
                    className={`text-sm font-extrabold tracking-tight whitespace-nowrap transition-colors ${
                      isHovered ? "text-primary" : "text-dark"
                    }`}
                    style={{ color: isHovered ? themePrimary : undefined }}
                  >
                    {item.name}
                  </span>
                  <span
                    className="text-[10px] uppercase font-bold tracking-wider transition-colors"
                    style={{
                      color: isHovered ? themeDark : "#94A3B8",
                    }}
                  >
                    {item.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PortfolioShowcaseItem } from "@/data/portfolioShowcaseData";

interface PortfolioPanelProps {
  item: PortfolioShowcaseItem;
  index: number;
  total: number;
  onSelect?: (item: PortfolioShowcaseItem) => void;
}

export default function PortfolioPanel({
  item,
  index,
  total,
  onSelect,
}: PortfolioPanelProps) {
  const content = (
    <div
      className={`group relative shrink-0 ${item.widthClass} h-[420px] sm:h-[460px] lg:h-[500px] bg-white rounded-3xl border border-border/80 shadow-[0_10px_30px_rgba(21,19,35,0.04)] hover:shadow-[0_20px_50px_rgba(117,69,245,0.14)] hover:border-primary/40 transition-all duration-500 overflow-hidden flex flex-col justify-between`}
    >
      {/* Visual Mockup Container */}
      <div className="relative w-full h-[66%] sm:h-[70%] bg-softBg overflow-hidden rounded-2xl m-2.5 sm:m-3 self-center border border-border/40">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 680px"
          priority={index < 2}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-103"
        />

        {/* Ambient subtle vignette overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-black/10 opacity-40 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

        {/* Top-Left Order Index */}
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center justify-center font-mono text-[11px] font-bold text-white bg-dark/75 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 shadow-sm">
            {item.number} / {total < 10 ? `0${total}` : total}
          </span>
        </div>

        {/* Top-Right Performance Metric Badge */}
        {item.metricBadge && (
          <div className="absolute top-3 right-3 z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-white/60 text-dark shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-xs font-extrabold text-primary">
                {item.metricBadge.value}
              </span>
              <span className="text-[10px] font-semibold text-dark-muted hidden sm:inline">
                {item.metricBadge.label}
              </span>
            </div>
          </div>
        )}

        {/* Hover Floating Action Cue */}
        <div className="absolute bottom-3 right-3 z-10 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="w-10 h-10 rounded-full bg-primary text-white shadow-glow-md flex items-center justify-center">
            <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
          </div>
        </div>
      </div>

      {/* Panel Editorial Metadata */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 flex flex-col justify-between flex-1">
        <div>
          {/* Category & Service Line */}
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              {item.category}
            </span>
            <span className="text-[10px] text-dark-muted/70 font-medium hidden sm:inline">
              {item.deliverableType}
            </span>
          </div>

          {/* Project Title */}
          <h3 className="text-xl sm:text-2xl font-extrabold text-dark tracking-tight leading-snug group-hover:text-primary transition-colors">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-dark-muted line-clamp-2 mt-1 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Tech & Solution Tags */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2.5 border-t border-border/50">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[10px] sm:text-[11px] font-medium text-dark-muted bg-softBg border border-border/70 px-2.5 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
          {item.tags.length > 3 && (
            <span className="text-[10px] text-dark-muted/70 font-medium">
              +{item.tags.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (item.linkHref) {
    return (
      <Link
        href={item.linkHref}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-3xl"
        onClick={() => onSelect && onSelect(item)}
      >
        {content}
      </Link>
    );
  }

  return (
    <div
      onClick={() => onSelect && onSelect(item)}
      className="cursor-pointer"
    >
      {content}
    </div>
  );
}

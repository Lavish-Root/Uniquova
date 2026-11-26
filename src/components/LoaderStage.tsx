"use client";

import React from "react";
import KineticTextLoader from "@/components/KineticTextLoader";

/**
 * Shared loader presentation for GlobalPageLoader and Next.js Suspense loading.tsx.
 * Uses the clean #FAF9FF soft lavender backdrop with ambient glow orbs behind
 * the upgraded UNIQUOVA kinetic typography centerpiece.
 */
export default function LoaderStage() {
  return (
    <>
      {/* Ambient background glowing orbs matching UNIQOVA lavender theme */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] sm:w-[560px] h-[360px] sm:h-[560px] bg-gradient-to-tr from-[#7545F5]/16 via-[#C4ACFD]/22 to-transparent rounded-full blur-3xl animate-pulse-glow"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] h-[240px] bg-[#5030C7]/10 rounded-full blur-2xl"
      />

      {/* Centered UNIQUOVA Kinetic Wordmark */}
      <div className="relative z-10 flex flex-col items-center">
        <KineticTextLoader text="UNIQUOVA" />
      </div>
    </>
  );
}

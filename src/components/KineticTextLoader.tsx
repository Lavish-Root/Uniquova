"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export interface KineticTextLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  accentColor?: string;
  dotColor?: string;
}

/**
 * Renders the UNIQUOVA kinetic typography loader with Bold Times New Roman glyphs,
 * where a glowing orb arcs from 'I', squashes & rebounds off 'U', with comet wake trails
 * and synchronized energy ripples.
 */
export function KineticTextLoader({
  className,
  text = "UNIQUOVA",
  accentColor,
  dotColor,
  ...props
}: KineticTextLoaderProps) {
  const letters = text.split("");
  const uRef = useRef<HTMLSpanElement>(null);
  const iRef = useRef<HTMLSpanElement>(null);

  // Pre-calibrated for Bold Times New Roman (60px, 8px gap) so SSR & frame-0 align cleanly
  const [metrics, setMetrics] = useState<{ midX: number; halfSpan: number }>({
    midX: 68,
    halfSpan: 46.3,
  });

  useEffect(() => {
    const measure = () => {
      if (!uRef.current || !iRef.current) return;
      const uCenter = uRef.current.offsetLeft + uRef.current.offsetWidth / 2;
      const iCenter = iRef.current.offsetLeft + iRef.current.offsetWidth / 2;
      if (iCenter > uCenter) {
        setMetrics({
          midX: (uCenter + iCenter) / 2,
          halfSpan: (iCenter - uCenter) / 2,
        });
      }
    };

    measure();
    if (typeof document !== "undefined" && document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [text]);

  const dynamicStyle = {
    "--uq-half": `${metrics.halfSpan}px`,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center font-bold select-none animate-uq-word-enter",
        className
      )}
      style={{ fontFamily: "'Times New Roman', Times, Georgia, serif", ...dynamicStyle }}
      {...props}
    >
      <div className="relative scale-[0.78] sm:scale-[1.02] lg:scale-[1.15]">
        {/* Trailing Comet Wake 2 (furthest echo) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[6px] z-10 animate-uq-dot-x-trail-2"
          style={{ left: `${metrics.midX}px` }}
        >
          <div className="-ml-[2.5px] -mt-[2.5px] w-[5px] h-[5px] rounded-full bg-[#A855F7]/35 blur-[1px] animate-uq-dot-y-trail-2" />
        </div>

        {/* Trailing Comet Wake 1 (closer echo) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-[6px] z-10 animate-uq-dot-x-trail-1"
          style={{ left: `${metrics.midX}px` }}
        >
          <div className="-ml-[3.5px] -mt-[3.5px] w-[7px] h-[7px] rounded-full bg-[#9E76FB]/60 shadow-[0_0_8px_rgba(117,69,245,0.6)] animate-uq-dot-y-trail-1" />
        </div>

        {/* Primary Horizontal Track & 3D Specular Glowing Orb */}
        <div
          className="pointer-events-none absolute top-[6px] z-20 animate-uq-dot-x"
          style={{ left: `${metrics.midX}px` }}
        >
          {/* Outer atmospheric halo */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 -ml-[12px] -mt-[12px] w-[24px] h-[24px] rounded-full bg-[#7545F5]/25 blur-[5px] animate-uq-dot-y"
          />
          {/* Core 3D crystal marble orb */}
          <div
            className={cn(
              "-ml-[5.5px] -mt-[5.5px] w-[11px] h-[11px] rounded-full animate-uq-dot-y",
              dotColor ||
                "bg-[radial-gradient(circle_at_30%_30%,#FFFFFF_0%,#E9D5FF_28%,#7545F5_72%,#4C1D95_100%)] shadow-[0_0_16px_rgba(117,69,245,1),0_0_32px_rgba(168,85,247,0.75)]"
            )}
          />
        </div>

        <p
          className="relative m-0 flex items-baseline gap-[8px] whitespace-nowrap text-[3.75rem] leading-none font-bold tracking-[0.02em]"
          aria-label={text}
        >
          {letters.map((char, index) => {
            // First 'U' (index 0): Squashes when struck by the ball and springs up to bounce it back
            if (index === 0 && char.toUpperCase() === "U") {
              return (
                <span key={index} ref={uRef} className="relative inline-block">
                  {/* Double concentric shockwave ripples on bounce */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[22px] left-1/2 w-8 h-8 rounded-full border-2 border-[#7545F5]/75 animate-uq-ripple-u"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[22px] left-1/2 w-8 h-8 rounded-full border border-[#A855F7]/50 animate-uq-ripple-u-outer"
                  />
                  {/* Soft floor contact glow spot */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[6px] left-1/2 w-9 h-2.5 rounded-full bg-[#7545F5]/45 blur-[4px] animate-uq-aura-u"
                  />
                  <span
                    className={cn(
                      "inline-block font-bold animate-uq-u",
                      accentColor || "text-[#7545F5]"
                    )}
                  >
                    {char}
                  </span>
                </span>
              );
            }

            // Letter 'N' (index 1): Overhead violet highlight as the orb soars across
            if (index === 1 && char.toUpperCase() === "N") {
              return (
                <span
                  key={index}
                  className="inline-block font-bold animate-uq-n text-[#151323] drop-shadow-[0_4px_12px_rgba(21,19,35,0.12)]"
                >
                  {char}
                </span>
              );
            }

            // Letter 'I' (index 2): Origin & return point for the bouncing orb
            if (index === 2 && char.toUpperCase() === "I") {
              return (
                <span key={index} ref={iRef} className="relative inline-block">
                  {/* Double concentric shockwave ripples on launch/catch */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[22px] left-1/2 w-8 h-8 rounded-full border-2 border-[#7545F5]/75 animate-uq-ripple-i"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-[22px] left-1/2 w-8 h-8 rounded-full border border-[#A855F7]/50 animate-uq-ripple-i-outer"
                  />
                  {/* Soft floor contact glow spot */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-[6px] left-1/2 w-7 h-2.5 rounded-full bg-[#7545F5]/45 blur-[4px] animate-uq-aura-i"
                  />
                  <span
                    className={cn(
                      "inline-block font-bold animate-uq-i",
                      accentColor || "text-[#7545F5]"
                    )}
                  >
                    {char}
                  </span>
                </span>
              );
            }

            // Remaining bold Times New Roman letters ('Q', 'U', 'O', 'V', 'A')
            return (
              <span
                key={index}
                className="inline-block font-bold text-[#151323] drop-shadow-[0_4px_12px_rgba(21,19,35,0.12)]"
              >
                {char}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default KineticTextLoader;

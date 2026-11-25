"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring, type UseScrollOptions } from "framer-motion";

interface ScrollHeadingProps {
  badge?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  align?: "center" | "left";
  layout?: "stacked" | "split";
  className?: string;
  maxWidth?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  targetRef?: React.RefObject<HTMLElement | HTMLDivElement | null>;
  offset?: UseScrollOptions["offset"];
  fadeOnExit?: boolean;
}

export default function ScrollHeading({
  badge,
  title,
  subtitle,
  extra,
  align = "center",
  layout = "stacked",
  className = "",
  maxWidth = "max-w-3xl",
  titleClassName = "text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight mb-4",
  subtitleClassName = "text-base sm:text-lg text-dark-muted font-normal leading-relaxed",
  targetRef,
  offset,
  fadeOnExit = true,
}: ScrollHeadingProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const activeRef = targetRef || localRef;

  // ====================================================================
  // CONTINUOUS BIDIRECTIONAL SCROLL-LINKED ENTRANCE & EXIT ANIMATION
  // - When scrolling down: lifts up, expands, and fades in with spring physics.
  // - When scrolling up: reverses smoothly in real time!
  // ====================================================================
  const defaultOffset: UseScrollOptions["offset"] = fadeOnExit ? ["start 92%", "end 8%"] : ["start 92%", "start 10%"];
  const { scrollYProgress } = useScroll({
    target: activeRef,
    offset: offset || defaultOffset,
  });

  const springConfig = { stiffness: 95, damping: 19, mass: 0.25 };

  // 1. Badge transforms
  const rawBadgeY = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.28, 0.72, 1] : [0, 0.8, 1],
    fadeOnExit ? [35, 0, 0, -25] : [35, 0, 0]
  );
  const rawBadgeScale = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.28, 0.72, 1] : [0, 0.8, 1],
    fadeOnExit ? [0.88, 1.0, 1.0, 0.90] : [0.88, 1.0, 1.0]
  );
  const rawBadgeOpacity = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.22, 0.78, 1] : [0, 0.65, 1],
    fadeOnExit ? [0, 1.0, 1.0, 0] : [0, 1.0, 1.0]
  );
  const smoothBadgeY = useSpring(rawBadgeY, springConfig);
  const smoothBadgeScale = useSpring(rawBadgeScale, springConfig);
  const smoothBadgeOpacity = useSpring(rawBadgeOpacity, springConfig);

  // 2. Title ("Our Core Digital Services", "Industries We Serve", etc.)
  const rawTitleY = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.32, 0.68, 1] : [0, 0.85, 1],
    fadeOnExit ? [75, 0, 0, -55] : [75, 0, 0]
  );
  const rawTitleScale = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.32, 0.68, 1] : [0, 0.85, 1],
    fadeOnExit ? [0.86, 1.0, 1.0, 0.88] : [0.86, 1.0, 1.0]
  );
  const rawTitleOpacity = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.24, 0.76, 1] : [0, 0.7, 1],
    fadeOnExit ? [0, 1.0, 1.0, 0] : [0, 1.0, 1.0]
  );
  const smoothTitleY = useSpring(rawTitleY, springConfig);
  const smoothTitleScale = useSpring(rawTitleScale, springConfig);
  const smoothTitleOpacity = useSpring(rawTitleOpacity, springConfig);

  // 3. Subtitle / description
  const rawSubtitleY = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.35, 0.65, 1] : [0, 0.9, 1],
    fadeOnExit ? [55, 0, 0, -40] : [55, 0, 0]
  );
  const rawSubtitleScale = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.35, 0.65, 1] : [0, 0.9, 1],
    fadeOnExit ? [0.90, 1.0, 1.0, 0.92] : [0.90, 1.0, 1.0]
  );
  const rawSubtitleOpacity = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.26, 0.74, 1] : [0, 0.75, 1],
    fadeOnExit ? [0, 1.0, 1.0, 0] : [0, 1.0, 1.0]
  );
  const smoothSubtitleY = useSpring(rawSubtitleY, springConfig);
  const smoothSubtitleScale = useSpring(rawSubtitleScale, springConfig);
  const smoothSubtitleOpacity = useSpring(rawSubtitleOpacity, springConfig);

  // 4. Extra / action row
  const rawExtraY = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.38, 0.62, 1] : [0, 0.9, 1],
    fadeOnExit ? [40, 0, 0, -30] : [40, 0, 0]
  );
  const rawExtraOpacity = useTransform(
    scrollYProgress,
    fadeOnExit ? [0, 0.28, 0.72, 1] : [0, 0.75, 1],
    fadeOnExit ? [0, 1.0, 1.0, 0] : [0, 1.0, 1.0]
  );
  const smoothExtraY = useSpring(rawExtraY, springConfig);
  const smoothExtraOpacity = useSpring(rawExtraOpacity, springConfig);

  const isCenter = align === "center";

  if (layout === "split") {
    return (
      <div
        ref={localRef}
        style={{ perspective: "1200px" }}
        className={`will-change-transform ${maxWidth} ${className}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            {badge && (
              <motion.div
                style={{
                  y: smoothBadgeY,
                  scale: smoothBadgeScale,
                  opacity: smoothBadgeOpacity,
                }}
                className="mb-4 inline-block will-change-transform"
              >
                {badge}
              </motion.div>
            )}

            <motion.h2
              style={{
                y: smoothTitleY,
                scale: smoothTitleScale,
                opacity: smoothTitleOpacity,
                transformStyle: "preserve-3d",
              }}
              className={`${titleClassName} will-change-transform`}
            >
              {title}
            </motion.h2>
          </div>

          <div className="lg:col-span-5 pb-2">
            {subtitle && (
              <motion.p
                style={{
                  y: smoothSubtitleY,
                  scale: smoothSubtitleScale,
                  opacity: smoothSubtitleOpacity,
                }}
                className={`${subtitleClassName} will-change-transform`}
              >
                {subtitle}
              </motion.p>
            )}

            {extra && (
              <motion.div
                style={{
                  y: smoothExtraY,
                  opacity: smoothExtraOpacity,
                }}
                className="mt-4 will-change-transform"
              >
                {extra}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={localRef}
      style={{ perspective: "1200px" }}
      className={`will-change-transform ${isCenter ? "text-center mx-auto" : "text-left"} ${maxWidth} ${className}`}
    >
      {badge && (
        <motion.div
          style={{
            y: smoothBadgeY,
            scale: smoothBadgeScale,
            opacity: smoothBadgeOpacity,
          }}
          className={`mb-4 ${isCenter ? "flex justify-center" : "inline-block"} will-change-transform`}
        >
          {badge}
        </motion.div>
      )}

      <motion.h2
        style={{
          y: smoothTitleY,
          scale: smoothTitleScale,
          opacity: smoothTitleOpacity,
          transformStyle: "preserve-3d",
        }}
        className={`${titleClassName} will-change-transform`}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          style={{
            y: smoothSubtitleY,
            scale: smoothSubtitleScale,
            opacity: smoothSubtitleOpacity,
          }}
          className={`${subtitleClassName} will-change-transform`}
        >
          {subtitle}
        </motion.p>
      )}

      {extra && (
        <motion.div
          style={{
            y: smoothExtraY,
            opacity: smoothExtraOpacity,
          }}
          className="mt-5 will-change-transform"
        >
          {extra}
        </motion.div>
      )}
    </div>
  );
}

"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

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
}: ScrollHeadingProps) {
  const headingRef = useRef<HTMLDivElement>(null);

  // ====================================================================
  // CONTINUOUS BIDIRECTIONAL SCROLL-LINKED ENTRANCE & EXIT ANIMATION
  // - When scrolling down: lifts up, expands, and fades in with spring physics.
  // - When scrolling up: reverses smoothly in real time!
  // ====================================================================
  const { scrollYProgress } = useScroll({
    target: headingRef,
    offset: ["start 92%", "end 8%"],
  });

  const springConfig = { stiffness: 95, damping: 19, mass: 0.25 };

  // 1. Badge transforms
  const rawBadgeY = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [35, 0, 0, -25]);
  const rawBadgeScale = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0.88, 1.0, 1.0, 0.90]);
  const rawBadgeOpacity = useTransform(scrollYProgress, [0, 0.22, 0.78, 1], [0, 1.0, 1.0, 0]);
  const smoothBadgeY = useSpring(rawBadgeY, springConfig);
  const smoothBadgeScale = useSpring(rawBadgeScale, springConfig);
  const smoothBadgeOpacity = useSpring(rawBadgeOpacity, springConfig);

  // 2. Title ("Our Core Digital Services", etc.)
  const rawTitleY = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [75, 0, 0, -55]);
  const rawTitleScale = useTransform(scrollYProgress, [0, 0.32, 0.68, 1], [0.86, 1.0, 1.0, 0.88]);
  const rawTitleOpacity = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [0, 1.0, 1.0, 0]);
  const smoothTitleY = useSpring(rawTitleY, springConfig);
  const smoothTitleScale = useSpring(rawTitleScale, springConfig);
  const smoothTitleOpacity = useSpring(rawTitleOpacity, springConfig);

  // 3. Subtitle / description
  const rawSubtitleY = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [55, 0, 0, -40]);
  const rawSubtitleScale = useTransform(scrollYProgress, [0, 0.35, 0.65, 1], [0.90, 1.0, 1.0, 0.92]);
  const rawSubtitleOpacity = useTransform(scrollYProgress, [0, 0.26, 0.74, 1], [0, 1.0, 1.0, 0]);
  const smoothSubtitleY = useSpring(rawSubtitleY, springConfig);
  const smoothSubtitleScale = useSpring(rawSubtitleScale, springConfig);
  const smoothSubtitleOpacity = useSpring(rawSubtitleOpacity, springConfig);

  // 4. Extra / action row
  const rawExtraY = useTransform(scrollYProgress, [0, 0.38, 0.62, 1], [40, 0, 0, -30]);
  const rawExtraOpacity = useTransform(scrollYProgress, [0, 0.28, 0.72, 1], [0, 1.0, 1.0, 0]);
  const smoothExtraY = useSpring(rawExtraY, springConfig);
  const smoothExtraOpacity = useSpring(rawExtraOpacity, springConfig);

  const isCenter = align === "center";

  if (layout === "split") {
    return (
      <div
        ref={headingRef}
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
      ref={headingRef}
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

"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(MorphSVGPlugin);
}

type DockIcon = React.ComponentType<{ className?: string }>;

export type MorphIconType =
  | "home"
  | "blog"
  | "marker"
  | "email"
  | "linkedin"
  | "x"
  | "instagram"
  | "facebook"
  | "github";

export interface DockItem {
  title: string;
  icon?: DockIcon;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  ariaLabel?: string;
  morphType?: MorphIconType;
  svgPath?: string;
}

export interface GlassDockProps extends React.HTMLAttributes<HTMLDivElement> {
  items: DockItem[];
  showTooltip?: boolean;
  dockClassName?: string;
  itemClassName?: string;
  tooltipClassName?: string;
  tooltipOffsetY?: number;
  iconSizeClassName?: string;
}

const DEFAULT_PATHS: Record<MorphIconType, string> = {
  home: "M3 18V10.5339C3 9.57062 3.46259 8.66591 4.24353 8.1019L10.2435 3.76856C11.2921 3.01128 12.7079 3.01128 13.7565 3.76856L19.7565 8.1019C20.5374 8.66591 21 9.57062 21 10.5339V18C21 19.6569 19.6569 21 18 21H6C4.34315 21 3 19.6569 3 18Z",
  blog: "M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z",
  marker:
    "M12 21C12 21 9.39536 18.8605 7.3637 16C6.06474 14.1711 5 12.0475 5 10C5 6.134 8.134 3 12 3C15.866 3 19 6.134 19 10C19 12.0475 17.9353 14.1711 16.6363 16C14.6046 18.8605 12 21 12 21Z",
  email:
    "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z",
  linkedin:
    "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z",
  x: "M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z",
  instagram:
    "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  facebook:
    "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  github:
    "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
};

const DROPLET_PRIMARY =
  "M12 21C12 21 15.3954 18.8605 13.3637 16C12.0647 14.1711 9.51275 11.9823 9 10C8 6.134 10.134 3 12 3C13.866 3 16 6.134 15 10C14.4873 11.9823 11.9353 14.1711 10.6363 16C8.60464 18.8605 12 21 12 21Z";
const DROPLET_SECONDARY =
  "M12 21C12 21 14.0216 19.0215 14.3637 16C14.6026 13.8898 13.5128 11.9823 13 10C12 6.134 13.134 3 12 3C10.866 3 12 6.134 11 10C10.4873 11.9823 9.39736 13.8898 9.6363 16C9.97843 19.0215 12 21 12 21Z";

const MorphingIcon = ({
  type,
  customPath,
  hoverTrigger,
  className,
}: {
  type: MorphIconType;
  customPath?: string;
  hoverTrigger: number;
  className?: string;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const targetPath = customPath ?? DEFAULT_PATHS[type];
  const lastTriggerRef = useRef(0);

  const runMorph = useCallback(() => {
    const svg = svgRef.current;
    const path = pathRef.current;
    if (!svg || !path) return;

    gsap.killTweensOf([svg, path]);
    path.setAttribute("d", targetPath);

    const midShape =
      type === "linkedin"
        ? "M13.364 5.63604C14.0062 9.12971 7.68417 13.4401 8.36401 18.3639C8.84929 21.8787 15.1508 21.8787 15.6361 18.3639C16.316 13.4401 9.99389 9.12969 10.6361 5.63604C11.3564 1.71793 12.6438 1.71795 13.364 5.63604Z"
        : type === "home"
          ? "M12.1483 3.46366L12.8548 8.05624C12.9493 8.67024 12.8508 9.29842 12.573 9.85405L8.08541 18.8292C7.58673 19.8265 8.31198 21 9.42705 21H14.5729C15.688 21 16.4133 19.8265 15.9146 18.8292L11.427 9.85405C11.1492 9.29842 11.0507 8.67024 11.1452 8.05624L11.8517 3.46366C11.8778 3.29407 12.1222 3.29407 12.1483 3.46366Z"
          : DROPLET_SECONDARY;

    const firstShape =
      type === "home"
        ? "M12.6387 3.53796L15.1949 7.69178C15.7004 8.51322 15.7802 9.5276 15.4092 10.4179L11.3846 20.0769C11.2016 20.516 11.5243 21 12 21V21C12.4757 21 12.7984 20.516 12.6154 20.0769L8.5908 10.4179C8.21983 9.5276 8.29956 8.51322 8.80506 7.69178L11.3613 3.53796C11.6541 3.06206 12.3459 3.06206 12.6387 3.53796Z"
        : DROPLET_PRIMARY;

    gsap.to(svg, {
      scale: 0.78,
      opacity: 0.9,
      duration: 0.08,
      onComplete: () => {
        gsap.to(path, {
          keyframes: [
            { morphSVG: firstShape, duration: 0.12 },
            { morphSVG: midShape, duration: 0.08 },
            {
              morphSVG: targetPath,
              duration: 0.76,
              ease: "elastic.out(1.05, 0.58)",
              onStart: () => {
                gsap.to(svg, {
                  scale: 1,
                  opacity: 1,
                  duration: 0.76,
                  ease: "elastic.out(1.05, 0.58)",
                });
              },
              onComplete: () => {
                path.setAttribute("d", targetPath);
              },
            },
          ],
        });
      },
    });
  }, [targetPath, type]);

  useEffect(() => {
    if (hoverTrigger > 0 && hoverTrigger !== lastTriggerRef.current) {
      lastTriggerRef.current = hoverTrigger;
      runMorph();
    }
  }, [hoverTrigger, runMorph]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 24 24"
      className={cn("fill-current", className)}
      aria-hidden="true"
    >
      <path
        ref={pathRef}
        d={targetPath}
        fill="currentColor"
        fillRule={type === "github" ? "evenodd" : undefined}
        clipRule={type === "github" ? "evenodd" : undefined}
      />
    </svg>
  );
};

export const GlassDock = React.forwardRef<HTMLDivElement, GlassDockProps>(
  (
    {
      items,
      showTooltip = true,
      className,
      dockClassName,
      itemClassName,
      tooltipClassName,
      tooltipOffsetY = -56,
      iconSizeClassName = "h-[22px] w-[22px]",
      ...props
    },
    ref
  ) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const [direction, setDirection] = useState(0);
    const [tooltipX, setTooltipX] = useState(0);
    const [morphTriggers, setMorphTriggers] = useState<Record<number, number>>(
      {}
    );
    const itemRefs = useRef<(HTMLElement | null)[]>([]);

    const handleMouseEnter = (index: number) => {
      if (hoveredIndex !== null && index !== hoveredIndex) {
        setDirection(index > hoveredIndex ? 1 : -1);
      }
      setHoveredIndex(index);

      const el = itemRefs.current[index];
      if (el) {
        setTooltipX(el.offsetLeft + el.offsetWidth / 2);
      } else {
        setTooltipX(index * 52 + 20);
      }

      setMorphTriggers((prev) => ({
        ...prev,
        [index]: (prev[index] ?? 0) + 1,
      }));
    };

    return (
      <div ref={ref} className={cn("w-max", className)} {...props}>
        <div
          className={cn(
            "glass-dock relative flex gap-4 items-center px-6 py-4 rounded-2xl",
            "glass-border bg-white/80 dark:bg-black/80",
            "backdrop-blur-xl shadow-2xl justify-center",
            dockClassName
          )}
          onMouseLeave={() => {
            setHoveredIndex(null);
            setDirection(0);
          }}
        >
          {showTooltip && (
            <AnimatePresence>
              {hoveredIndex !== null && items[hoveredIndex] && (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.92, y: 10, x: tooltipX }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: tooltipOffsetY,
                    x: tooltipX,
                  }}
                  exit={{ opacity: 0, scale: 0.92, y: 10, x: tooltipX }}
                  transition={{ type: "spring", stiffness: 160, damping: 20 }}
                  className="absolute top-0 left-0 pointer-events-none z-30"
                >
                  <div
                    className={cn(
                      "-translate-x-1/2 px-4 py-1.5 rounded-lg",
                      "bg-black text-white dark:bg-white dark:text-black",
                      "shadow-md flex items-center justify-center",
                      "border border-neutral-700 dark:border-neutral-300",
                      "min-w-[84px]",
                      tooltipClassName
                    )}
                  >
                    <div className="relative h-4 flex items-center justify-center overflow-hidden w-full">
                      <AnimatePresence mode="popLayout" custom={direction}>
                        <motion.span
                          key={items[hoveredIndex].title}
                          custom={direction}
                          initial={{
                            x: direction > 0 ? 35 : -35,
                            opacity: 0,
                            filter: "blur(6px)",
                          }}
                          animate={{
                            x: 0,
                            opacity: 1,
                            filter: "blur(0px)",
                          }}
                          exit={{
                            x: direction > 0 ? -35 : 35,
                            opacity: 0,
                            filter: "blur(6px)",
                          }}
                          transition={{
                            duration: 0.28,
                            ease: "easeOut",
                          }}
                          className="text-[12px] font-medium tracking-wide whitespace-nowrap"
                        >
                          {items[hoveredIndex].title}
                        </motion.span>
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {items.map((el, index) => {
            const Icon = el.icon;
            const isHovered = hoveredIndex === index;
            const resolvedType =
              el.morphType ?? (el.title.toLowerCase() as MorphIconType);
            const isAnimated = Object.prototype.hasOwnProperty.call(
              DEFAULT_PATHS,
              resolvedType
            );

            const content = (
              <span className="flex items-center justify-center">
                {isAnimated ? (
                  <MorphingIcon
                    type={resolvedType}
                    customPath={el.svgPath}
                    hoverTrigger={morphTriggers[index] ?? 0}
                    className={iconSizeClassName}
                  />
                ) : Icon ? (
                  <Icon
                    className={cn(
                      "transition-colors duration-200",
                      iconSizeClassName
                    )}
                  />
                ) : null}
              </span>
            );

            const sharedMotionProps = {
              whileTap: { scale: 0.92 },
              animate: {
                scale: isHovered ? 1.14 : 1,
                y: isHovered ? -4 : 0,
                opacity:
                  hoveredIndex !== null && hoveredIndex !== index ? 0.8 : 1,
              },
              transition: { type: "spring" as const, stiffness: 360, damping: 20 },
              className: cn(
                "relative w-10 h-10 flex items-center justify-center cursor-pointer will-change-transform",
                itemClassName
              ),
            };

            if (el.href) {
              return (
                <motion.a
                  key={el.title}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  href={el.href}
                  target={el.target}
                  rel={
                    el.rel ??
                    (el.target === "_blank" ? "noopener noreferrer" : undefined)
                  }
                  aria-label={el.ariaLabel ?? el.title}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onFocus={() => handleMouseEnter(index)}
                  onClick={el.onClick}
                  {...sharedMotionProps}
                >
                  {content}
                </motion.a>
              );
            }

            return (
              <motion.button
                key={el.title}
                ref={(node) => {
                  itemRefs.current[index] = node;
                }}
                type="button"
                aria-label={el.ariaLabel ?? el.title}
                onMouseEnter={() => handleMouseEnter(index)}
                onFocus={() => handleMouseEnter(index)}
                onClick={el.onClick}
                {...sharedMotionProps}
              >
                {content}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }
);

GlassDock.displayName = "GlassDock";
export default GlassDock;

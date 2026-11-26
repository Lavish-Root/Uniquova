"use client";

import { useMemo, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatsCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  trigger?: boolean;
  className?: string;
}

const SILKY_OUT_EASE: [number, number, number, number] = [0.12, 0.98, 0.22, 1];
const REVEAL_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const DIGITS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const;

interface DigitReelProps {
  target: number;
  digitIndex: number;
  duration: number;
  baseDelay: number;
  active: boolean;
  reducedMotion: boolean;
}

function DigitReel({
  target,
  digitIndex,
  duration,
  baseDelay,
  active,
  reducedMotion,
}: DigitReelProps) {
  const reel = useMemo(() => [...DIGITS, ...DIGITS.slice(0, target + 1)], [target]);
  const finalPercent = `-${((reel.length - 1) / reel.length) * 100}%`;

  return (
    <span
      className="relative inline-block overflow-hidden h-[1.35em] leading-[1.35em] align-middle"
      style={{
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      {/* Preserves exact width and inline alignment for each digit */}
      <span className="invisible select-none">{target}</span>

      <motion.span
        className="absolute left-0 top-0 flex flex-col items-center w-full will-change-transform"
        initial={reducedMotion ? { y: finalPercent } : { y: "0%" }}
        animate={
          reducedMotion || active ? { y: finalPercent } : { y: "0%" }
        }
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: duration + digitIndex * 0.08,
                delay: baseDelay + digitIndex * 0.065,
                ease: SILKY_OUT_EASE,
              }
        }
      >
        {reel.map((num, idx) => (
          <span
            key={idx}
            className="block h-[1.35em] leading-[1.35em] select-none"
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export default function StatsCounter({
  value,
  duration = 1.65,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  trigger,
  className,
}: StatsCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: "some" });
  const shouldAnimate = trigger !== undefined ? trigger && isInView : isInView;
  const prefersReducedMotion = Boolean(useReducedMotion());

  const formatted = useMemo(() => {
    const safe = Math.abs(value) < 1e-9 ? 0 : value;
    return safe.toFixed(decimals);
  }, [value, decimals]);

  const chars = useMemo(() => {
    let digitCount = 0;
    return formatted.split("").map((char, i) => {
      if (/\d/.test(char)) {
        const currentIndex = digitCount++;
        return {
          key: `d-${i}`,
          isDigit: true as const,
          digit: Number(char),
          digitIndex: currentIndex,
        };
      }
      return {
        key: `c-${i}`,
        isDigit: false as const,
        char,
      };
    });
  }, [formatted]);

  const accessibleText = `${prefix}${formatted}${suffix}`;

  return (
    <motion.span
      ref={ref}
      aria-label={accessibleText}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: 0, y: 12, scale: 0.94, filter: "blur(4px)" }
      }
      animate={
        prefersReducedMotion || shouldAnimate
          ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          : { opacity: 0, y: 12, scale: 0.94, filter: "blur(4px)" }
      }
      transition={{
        duration: 0.72,
        delay,
        ease: REVEAL_EASE,
      }}
      className={cn(
        "inline-flex items-center -my-[0.12em] tabular-nums will-change-transform",
        className
      )}
    >
      <span className="sr-only">{accessibleText}</span>
      <span
        aria-hidden="true"
        className="inline-flex items-center whitespace-pre"
      >
        {prefix && (
          <span className="inline-block h-[1.35em] leading-[1.35em]">
            {prefix}
          </span>
        )}
        {chars.map((item) =>
          item.isDigit ? (
            <DigitReel
              key={item.key}
              target={item.digit}
              digitIndex={item.digitIndex}
              duration={duration}
              baseDelay={delay}
              active={shouldAnimate}
              reducedMotion={prefersReducedMotion}
            />
          ) : (
            <span
              key={item.key}
              className="inline-block h-[1.35em] leading-[1.35em]"
            >
              {item.char}
            </span>
          )
        )}
        {suffix && (
          <span className="inline-block h-[1.35em] leading-[1.35em]">
            {suffix}
          </span>
        )}
      </span>
    </motion.span>
  );
}

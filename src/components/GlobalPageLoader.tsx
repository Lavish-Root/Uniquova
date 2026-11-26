"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import LoaderStage from "@/components/LoaderStage";

export default function GlobalPageLoader() {
  const [isVisible, setIsVisible] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const pathname = usePathname();

  const isFirstMountRef = useRef(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const unmountTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (unmountTimerRef.current) {
      clearTimeout(unmountTimerRef.current);
      unmountTimerRef.current = null;
    }
  }, []);

  const hideLoader = useCallback(
    (delayMs: number) => {
      clearTimers();
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        unmountTimerRef.current = setTimeout(() => {
          setShouldRender(false);
        }, 650);
      }, delayMs);
    },
    [clearTimers]
  );

  const showLoader = useCallback(() => {
    clearTimers();
    setShouldRender(true);
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, [clearTimers]);

  // 1. Initial load & route transition handling
  useEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      // Show a full smooth I <-> U bounce cycle on initial website load
      hideLoader(1400);
    } else {
      // Smooth reveal after route changes
      hideLoader(650);
    }

    return clearTimers;
  }, [pathname, hideLoader, clearTimers]);

  // 2. Listen to internal navigation clicks & browser history navigation
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target.target === "_blank" ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const targetPath = href.split("?")[0].split("#")[0];
      if (targetPath === window.location.pathname) {
        return;
      }

      showLoader();

      // Failsafe: never stay stuck if route transition doesn't update pathname
      hideTimerRef.current = setTimeout(() => {
        setIsVisible(false);
        unmountTimerRef.current = setTimeout(() => setShouldRender(false), 650);
      }, 3500);
    };

    const handlePopState = () => {
      showLoader();
      hideLoader(650);
    };

    document.addEventListener("click", handleAnchorClick, true);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, true);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [showLoader, hideLoader]);

  if (!shouldRender) return null;

  return (
    <div
      aria-live="polite"
      aria-busy={isVisible}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FAF9FF] overflow-hidden transition-all duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] select-none ${
        isVisible
          ? "opacity-100 pointer-events-auto scale-100 blur-0"
          : "opacity-0 pointer-events-none scale-[1.03] -translate-y-2"
      }`}
    >
      <LoaderStage />
    </div>
  );
}

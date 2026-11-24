"use client";

import React, { useRef, useEffect, useCallback } from "react";

interface MoltenCursorProps {
  color?: string;
  particlesPerFrame?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  r: number;
  g: number;
  b: number;
}

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function MoltenCursor({
  color = "#8b5cf6", // Brand Lavender
  particlesPerFrame = 2,
}: MoltenCursorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -100, y: -100, prevX: -100, prevY: -100, vX: 0, vY: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const requestRef = useRef<number>(0);
  const isPointerFine = useRef<boolean>(true);

  // Parse color into r,g,b for particle tinting
  const parseColor = useCallback((hex: string) => {
    const c = hex.replace("#", "");
    return {
      r: parseInt(c.substring(0, 2), 16) || 139,
      g: parseInt(c.substring(2, 4), 16) || 92,
      b: parseInt(c.substring(4, 6), 16) || 246,
    };
  }, []);

  useEffect(() => {
    // Only enable on devices with fine pointer (mouse/trackpad), skip touch screens
    if (typeof window !== "undefined") {
      isPointerFine.current = window.matchMedia("(pointer: fine)").matches;
    }

    const handleMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mouse = mouseRef.current;
    mouse.vX = mouse.x - mouse.prevX;
    mouse.vY = mouse.y - mouse.prevY;
    mouse.prevX = mouse.x;
    mouse.prevY = mouse.y;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const velocity = Math.sqrt(mouse.vX * mouse.vX + mouse.vY * mouse.vY);

    if (velocity > 0.8 && isPointerFine.current) {
      const { r, g, b } = parseColor(color);
      for (let i = 0; i < particlesPerFrame; i++) {
        particlesRef.current.push({
          x: mouse.x + (Math.random() - 0.5) * 4,
          y: mouse.y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3 - 0.2, // Subtle upward float
          life: random(0.6, 1),
          size: random(2.5, 5.5),
          r,
          g,
          b,
        });
      }
    }

    // Limit maximum particles for maximum 60fps performance
    if (particlesRef.current.length > 120) {
      particlesRef.current.splice(0, particlesRef.current.length - 120);
    }

    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
      const p = particlesRef.current[i];
      p.life -= 0.024;
      p.x += p.vx;
      p.y += p.vy;
      p.size *= 0.95;

      if (p.life <= 0) {
        particlesRef.current.splice(i, 1);
        continue;
      }

      ctx.fillStyle = `rgba(${p.r}, ${Math.floor(p.g * (0.7 + 0.3 * p.life))}, ${p.b}, ${p.life * 0.85})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, Math.max(0.5, p.size), 0, Math.PI * 2);
      ctx.fill();
    }

    requestRef.current = requestAnimationFrame(animate);
  }, [color, particlesPerFrame, parseColor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize, { passive: true });
    resize();
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full"
      aria-hidden="true"
    />
  );
}

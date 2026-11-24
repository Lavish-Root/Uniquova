"use client";

import React, { useRef, useEffect, useCallback, useState } from "react";

interface MoltenPreviewProps {
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

export const MoltenPreview = ({
    color = "#8b5cf6",
    particlesPerFrame = 3,
}: MoltenPreviewProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });
    const particlesRef = useRef<Particle[]>([]);
    const requestRef = useRef<number>(0);
    const [isActive, setIsActive] = useState(false);

    // Parse color into r,g,b for particle tinting
    const parseColor = (hex: string) => {
        const c = hex.replace("#", "");
        return {
            r: parseInt(c.substring(0, 2), 16) || 139,
            g: parseInt(c.substring(2, 4), 16) || 92,
            b: parseInt(c.substring(4, 6), 16) || 246,
        };
    };

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };
        window.addEventListener("mousemove", handleMove);
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
        if (velocity > 0.5 || isActive) {
            const { r, g, b } = parseColor(color);
            for (let i = 0; i < particlesPerFrame; i++) {
                particlesRef.current.push({
                    x: mouse.x,
                    y: mouse.y,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    life: random(0.5, 1),
                    size: random(2, 6),
                    r,
                    g,
                    b,
                });
            }
        }

        ctx.globalCompositeOperation = "lighter";
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.life -= 0.02;
            p.x += p.vx;
            p.y += p.vy;
            p.size *= 0.95;
            if (p.life <= 0) {
                particlesRef.current.splice(i, 1);
                continue;
            }
            ctx.fillStyle = `rgba(${p.r}, ${Math.floor(p.g * (0.6 + 0.4 * p.life))}, ${p.b}, ${p.life})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
        requestRef.current = requestAnimationFrame(animate);
    }, [isActive, color, particlesPerFrame]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resize);
        resize();
        requestRef.current = requestAnimationFrame(animate);
        return () => {
            cancelAnimationFrame(requestRef.current);
            window.removeEventListener("resize", resize);
        };
    }, [animate]);

    return (
        <div className="min-h-screen bg-zinc-950 cursor-none relative overflow-hidden">
            {/* Aurora background blobs in lavender/violet theme */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/15 blur-[120px]" />
                <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[40%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px]" />
            </div>

            {/* Canvas — above everything */}
            <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-50 w-full h-full" />

            {/* Floating glass navbar */}
            <div className="relative z-20 flex justify-center pt-5 px-4">
                <nav className="flex items-center justify-between px-6 h-11 w-full max-w-sm backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
                    <span className="text-white font-bold text-sm tracking-tight">UNIQUOVA</span>
                    <div className="flex items-center gap-5 text-sm text-zinc-300">
                        <a href="/" className="hover:text-white transition-colors">Home</a>
                        <a href="/services" className="hover:text-white transition-colors">Services</a>
                    </div>
                </nav>
            </div>

            {/* Hero */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-56px)] text-center px-4">
                <div className="mb-5 inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-xs text-purple-200 tracking-wide">
                    <span style={{ color }}>✦</span> Molten Cursor FX
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight max-w-2xl leading-[1.05] mb-5">
                    Move your cursor.<br />
                    <span
                        className="text-transparent bg-clip-text"
                        style={{ backgroundImage: `linear-gradient(135deg, ${color}, #e9d5ff)` }}
                    >
                        Watch it ignite.
                    </span>
                </h1>
                <p className="text-zinc-400 text-base mb-10 max-w-sm">
                    Every movement leaves a trail of lavender molten sparks behind your cursor.
                </p>
                <div className="flex gap-3 items-center">
                    <button
                        onMouseEnter={() => setIsActive(true)}
                        onMouseLeave={() => setIsActive(false)}
                        className="px-5 py-2.5 bg-white text-zinc-950 font-semibold rounded-full text-sm hover:bg-purple-100 transition-colors shadow-lg shadow-purple-500/20"
                    >
                        Get Started
                    </button>
                    <button className="px-5 py-2.5 border border-purple-400/30 text-purple-200 rounded-full text-sm hover:border-purple-300 hover:text-white transition-colors">
                        Learn More
                    </button>
                </div>
            </div>
        </div>
    );
};

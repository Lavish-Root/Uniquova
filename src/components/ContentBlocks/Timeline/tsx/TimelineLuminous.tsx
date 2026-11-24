"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring, useInView } from "framer-motion";

export interface TimelineItem {
    year: string;
    title: string;
    desc: string;
    category: string;
}

export interface TimelineLuminousProps {
    items?: TimelineItem[];
    backgroundColor?: string;
    beamColor?: string;
    nodeColor?: string;
    cardBgColor?: string;
    cardBorderColor?: string;
    yearColor?: string;
    titleColor?: string;
    textColor?: string;
}

const LuminousNode = ({
    item,
    index,
    nodeColor,
    cardBgColor,
    cardBorderColor,
    yearColor,
    titleColor,
    textColor,
}: {
    item: TimelineItem;
    index: number;
    nodeColor: string;
    cardBgColor: string;
    cardBorderColor: string;
    yearColor: string;
    titleColor: string;
    textColor: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { margin: "-40% 0px -40% 0px" });

    return (
        <div
            ref={ref}
            className={`relative flex items-center ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } flex-row pl-12 md:pl-0`}
        >
            <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center">
                <motion.div
                    animate={{
                        scale: isInView ? 1.5 : 1,
                        backgroundColor: isInView ? "#fff" : "#1e293b",
                    }}
                    className="w-4 h-4 rounded-full border-2 z-10 transition-colors duration-500"
                    style={{ borderColor: nodeColor }}
                >
                    {isInView && (
                        <motion.div
                            layoutId="pulse"
                            className="absolute inset-0 rounded-full blur-md"
                            style={{ backgroundColor: nodeColor }}
                        />
                    )}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className={`w-full md:w-[45%] p-6 rounded-2xl border backdrop-blur-sm transition-colors group ${
                    index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
                style={{ backgroundColor: cardBgColor, borderColor: cardBorderColor }}
            >
                <span
                    className="font-mono text-xs uppercase tracking-wider mb-2 block"
                    style={{ color: yearColor }}
                >
                    {item.year}
                </span>
                <h3
                    className="text-2xl font-bold mb-2 group-hover:transition-colors"
                    style={{ color: titleColor }}
                >
                    {item.title}
                </h3>
                <p className="leading-relaxed" style={{ color: textColor }}>
                    {item.desc}
                </p>
            </motion.div>
        </div>
    );
};

const TimelineLuminous: React.FC<TimelineLuminousProps> = ({
    items = [
        { year: "2020", title: "The Inception", desc: "A humble beginning in a garage, fueled by caffeine and code.", category: "Origin" },
        { year: "2021", title: "First Round", desc: "Secured seed funding and expanded the team to 10 dreamers.", category: "Growth" },
        { year: "2022", title: "Global Launch", desc: "Released version 1.0 to the world. Servers crashed, we celebrated.", category: "Product" },
        { year: "2023", title: "The Pivot", desc: "Realized our true calling. Shifted focus to AI-driven solutions.", category: "Strategy" },
        { year: "2024", title: "Unicorn Status", desc: "Valuation hit the magic number. The work has only just begun.", category: "Milestone" },
        { year: "2025", title: "Beyond Earth", desc: "Establishing the first orbital office. Sky is no longer the limit.", category: "Future" },
    ],
    backgroundColor = "#020617",
    beamColor = "#7545f5",
    nodeColor = "#7545f5",
    cardBgColor = "rgba(15, 23, 42, 0.5)",
    cardBorderColor = "rgba(255,255,255,0.1)",
    yearColor = "#9e76fb",
    titleColor = "#ffffff",
    textColor = "#94a3b8",
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <div
            ref={containerRef}
            className="relative min-h-[200vh] py-24 overflow-hidden"
            style={{ backgroundColor }}
        >
            <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] rounded-full blur-[120px] pointer-events-none"
                style={{ backgroundColor: `${beamColor}33` }}
            />

            <div className="max-w-4xl mx-auto relative px-4">
                <div
                    className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 -translate-x-1/2"
                    style={{ backgroundColor: "#1e293b" }}
                >
                    <motion.div
                        style={{ scaleY, transformOrigin: "top", backgroundColor: beamColor }}
                        className="w-full h-full bg-gradient-to-b shadow-[0_0_20px_rgba(117,69,245,0.5)]"
                    />
                </div>

                <div className="space-y-24">
                    {items.map((item, i) => (
                        <LuminousNode
                            key={i}
                            item={item}
                            index={i}
                            nodeColor={nodeColor}
                            cardBgColor={cardBgColor}
                            cardBorderColor={cardBorderColor}
                            yearColor={yearColor}
                            titleColor={titleColor}
                            textColor={textColor}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TimelineLuminous;

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, Globe, ArrowUpRight, Sparkles } from "lucide-react";
import ScrollHeading from "@/components/ScrollHeading";

// Social SVG Icons
function LinkedInIcon({ className = "w-4 h-4 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.2a1.6 1.6 0 0 0-1.6 1.6c0 .88.72 1.63 1.6 1.63.88 0 1.6-.75 1.6-1.63 0-.88-.72-1.6-1.6-1.6" />
    </svg>
  );
}

function TwitterXIcon({ className = "w-3.5 h-3.5 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function GithubIcon({ className = "w-4 h-4 fill-current" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Design" | "Growth" | "Operations";
  bio: string;
  image: string;
  specialties: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    website?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Lavish Chouhan",
    role: "Founder & CEO",
    category: "Leadership",
    bio: "Guiding brand scaling and digital product excellence with 8+ years of agency leadership.",
    image: "/images/team/team-1.jpg",
    specialties: ["Agency Strategy", "Product Vision"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      website: "https://uniquova.com",
    },
  },
  {
    id: 2,
    name: "Sahil Meena",
    role: "Co-Founder & CTO",
    category: "Leadership",
    bio: "Architecting high-performance Next.js architectures, secure cloud APIs, and scalable infrastructure.",
    image: "/images/team/team-2.jpg",
    specialties: ["Next.js 14", "Cloud Systems"],
    socials: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: 3,
    name: "Shreyansh Sharma",
    role: "Head of E-commerce Operations & CMO",
    category: "Leadership",
    bio: "Spearheading multi-channel marketplace operations across Amazon & Flipkart, driving commercial marketing strategy and customer acquisition.",
    image: "/images/team/team-3.jpg",
    specialties: ["Amazon & Flipkart", "Marketplace Ads"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: 4,
    name: "Prince Chouhan",
    role: "Business Development Manager",
    category: "Growth",
    bio: "Driving strategic client partnerships, agency business expansion, and enterprise relationship growth.",
    image: "/images/team/team-4.jpg",
    specialties: ["Client Partnerships", "Venture Growth"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: 5,
    name: "Mayank Baharwal",
    role: "Head of Digital Marketing & SEO",
    category: "Growth",
    bio: "Leading performance search optimization, technical SEO architectures, and full-funnel digital marketing campaigns to drive organic reach.",
    image: "/images/team/team-5.jpg",
    specialties: ["Technical SEO", "Growth Funnels"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: 6,
    name: "Mayoor Gahlot",
    role: "UI/UX & Graphic Design Lead",
    category: "Design",
    bio: "Directing intuitive product user interfaces, cross-platform design systems, and visually captivating commercial brand graphics.",
    image: "/images/team/team-6.jpg",
    specialties: ["Design Systems", "Conversion UI"],
    socials: {
      linkedin: "https://linkedin.com",
      website: "https://dribbble.com",
    },
  },
  {
    id: 7,
    name: "Pravani Chhaparwal",
    role: "Project & Client Success Manager",
    category: "Operations",
    bio: "Orchestrating agile project sprints, cross-functional delivery timelines, and client satisfaction for seamless digital launches.",
    image: "/images/team/team-7.jpg",
    specialties: ["Agile Sprints", "Client Success"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: 8,
    name: "Tushar Saini",
    role: "Content & Brand Communications Manager",
    category: "Growth",
    bio: "Crafting high-impact brand narratives, omnichannel content strategy, PR communications, and engaging commercial copy.",
    image: "/images/team/team-8.jpg",
    specialties: ["Brand Storytelling", "Omnichannel Copy"],
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

// Single Reusable Member Card
function TeamMemberCard({ member, index = 0 }: { member: TeamMember; index?: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 25 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.4, delay: (index % 3) * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="group bg-[#FAF9FF] hover:bg-white rounded-3xl p-4 sm:p-5 border border-border hover:border-primary/50 shadow-xs hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden"
    >
      <div>
        {/* Portrait Container */}
        <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-softBg mb-4">
          <img
            src={member.image}
            alt={`${member.name} — ${member.role} at UNIQUOVA`}
            width={400}
            height={500}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 filter contrast-[1.02]"
          />

          {/* Gradient bottom overlay for smooth visual depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/75 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3.5">
            {/* Social links revealed on hover */}
            <div className="flex items-center gap-2 w-full justify-center">
              {member.socials.linkedin && (
                <a
                  href={member.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} LinkedIn`}
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-primary flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <LinkedInIcon className="w-4 h-4 fill-primary" />
                </a>
              )}
              {member.socials.twitter && (
                <a
                  href={member.socials.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Twitter`}
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-dark flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <TwitterXIcon className="w-3.5 h-3.5 fill-dark" />
                </a>
              )}
              {member.socials.github && (
                <a
                  href={member.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} GitHub`}
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-dark flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <GithubIcon className="w-4 h-4 fill-dark" />
                </a>
              )}
              {member.socials.website && (
                <a
                  href={member.socials.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} Portfolio`}
                  className="w-8 h-8 rounded-full bg-white/95 hover:bg-white text-primary flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
                >
                  <Globe className="w-4 h-4 text-primary" />
                </a>
              )}
            </div>
          </div>

          {/* Corner Department Badge */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-dark tracking-wide uppercase shadow-xs border border-white/40">
            {member.category}
          </div>
        </div>

        {/* Member Info */}
        <div className="px-1">
          <h3 className="text-lg font-extrabold text-dark group-hover:text-primary transition-colors">
            {member.name}
          </h3>

          <p className="text-xs font-semibold text-primary mb-2">
            {member.role}
          </p>

          <p className="text-xs text-dark-muted leading-relaxed line-clamp-3 mb-3">
            {member.bio}
          </p>

          {/* Specialty tag pills */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {member.specialties.map((spec) => (
              <span
                key={spec}
                className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white border border-border text-dark-muted group-hover:border-primary/30 group-hover:text-primary transition-colors"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Quick Connect Accent */}
      <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-dark-muted px-1">
        <span className="font-medium">UNIQUOVA Core</span>
        <span className="inline-flex items-center text-primary font-semibold gap-0.5 group-hover:translate-x-0.5 transition-transform">
          <span>Connect</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </motion.div>
  );
}

export default function TeamSection() {
  const [activeFilter, setActiveFilter] = useState<"all" | "leadership" | "growth" | "design-ops">("all");

  const filteredMembers = TEAM_MEMBERS.filter((m) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "leadership") return m.category === "Leadership";
    if (activeFilter === "growth") return m.category === "Growth";
    if (activeFilter === "design-ops") return m.category === "Design" || m.category === "Operations";
    return true;
  });

  return (
    <section id="our-team" className="py-24 bg-white relative overflow-hidden border-t border-border/60">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-primary-light/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Continuous Bidirectional Scroll Animation */}
        <ScrollHeading
          className="mb-10 sm:mb-12"
          badge={
            <div className="inline-flex items-center gap-2 bg-primary-light border border-primary-200 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
              <Users className="w-3.5 h-3.5" />
              <span>Meet Our Team</span>
            </div>
          }
          title={
            <>
              The Minds Driving <span className="gradient-text">UNIQUOVA</span>
            </>
          }
          subtitle="A specialized collective of digital strategists, full-stack engineers, and brand designers passionate about turning ambitious goals into market-leading reality."
        />

        {/* Interactive Team Category Filter Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1.5 rounded-2xl bg-[#FAF9FF] border border-border/80 shadow-xs gap-1 sm:gap-1.5">
            {[
              { id: "all", label: "All Members (8)" },
              { id: "leadership", label: "Founders & Leadership (3)" },
              { id: "growth", label: "Growth & Marketing (3)" },
              { id: "design-ops", label: "Design & Delivery (2)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`relative px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer ${
                  activeFilter === tab.id ? "text-white" : "text-dark-muted hover:text-dark"
                }`}
              >
                {activeFilter === tab.id && (
                  <motion.div
                    layoutId="teamFilterTab"
                    className="absolute inset-0 bg-primary rounded-xl shadow-xs"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Responsive Grid with Spring Layout Animation */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          <AnimatePresence>
            {filteredMembers.map((member, idx) => (
              <TeamMemberCard key={member.id} member={member} index={idx} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

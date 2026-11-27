"use client";

import React from "react";


export interface TeamMember {
  id: number;
  name: string;
  role: string;
  category: "Leadership" | "Engineering" | "Design" | "Growth" | "Operations";
  bio: string;
  image: string; // Stored in /public/images/team/team-X.jpg (easily replaceable)
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
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
  {
    id: 7,
    name: "Pravani Chhaparwal",
    role: "Project & Client Success Manager",
    category: "Operations",
    bio: "Orchestrating agile project sprints, cross-functional delivery timelines, and client satisfaction for seamless digital launches.",
    image: "/images/team/team-7.jpg",
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
    socials: {
      linkedin: "https://linkedin.com",
      website: "https://dribbble.com",
    },
  },
  {
    id: 4,
    name: "Prince Chouhan",
    role: "Business Development Manager",
    category: "Growth",
    bio: "Driving strategic client partnerships, agency business expansion, and enterprise relationship growth.",
    image: "/images/team/team-4.jpg",
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
    socials: {
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
    },
  },
];

// Single Reusable Member Card
function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group bg-white rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border border-border/80 hover:border-primary/45 shadow-[0_8px_28px_rgba(117,69,245,0.06)] hover:shadow-[0_20px_48px_rgba(117,69,245,0.16)] transition-all duration-500 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Portrait Container */}
      <div className="relative aspect-[4/5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-softBg mb-3 sm:mb-3.5 ring-1 ring-black/5">
        <img
          src={member.image}
          alt={`${member.name} — ${member.role} at UNIQUOVA`}
          width={400}
          height={500}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out filter contrast-[1.03]"
        />

        {/* Subtle ambient violet depth overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A0D3F]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Member Info */}
      <div className="px-1 pb-1.5 sm:px-1.5 text-center flex-1 flex flex-col justify-center">
        <div className="w-6 h-0.5 bg-primary/25 group-hover:w-10 group-hover:bg-primary rounded-full mx-auto mb-2 transition-all duration-300" />
        <h3 className="text-sm sm:text-base lg:text-[17px] font-extrabold text-dark group-hover:text-primary transition-colors leading-snug">
          {member.name}
        </h3>

        <p className="text-[11px] sm:text-xs font-semibold text-primary/90 mt-0.5 leading-snug">
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default function TeamSection() {
  return (
    <section id="our-team" className="py-14 sm:py-20 lg:py-24 bg-[#FAF9FF]/60 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-primary-light/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight mb-3 sm:mb-4">
            The Minds Driving <span className="gradient-text">UNIQUOVA</span>
          </h2>

          <p className="text-sm sm:text-base lg:text-lg text-dark-muted font-normal leading-relaxed">
            A specialized collective of digital strategists, full-stack engineers, and brand designers
            passionate about turning ambitious goals into market-leading reality.
          </p>
        </div>

        {/* 4x4 Team Arrangement (4 per row on desktop, 2 per row on mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5 lg:gap-6">
          {TEAM_MEMBERS.map((member) => (
            <TeamMemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
}

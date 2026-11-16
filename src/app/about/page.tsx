import React from "react";
import type { Metadata } from "next";
import AboutClient from "@/components/AboutClient";
import JsonLd from "@/components/JsonLd";
import { getOrganizationSchema, getBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Us — Leadership Team, Vision & Culture",
  description:
    "Discover UNIQOVA's mission, leadership team, and engineering culture. We empower growing brands with world-class digital, e-commerce, and creative solutions.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About UNIQOVA — Full-Service Digital Agency Team & Mission",
    description:
      "Meet the founders, engineers, and e-commerce strategists behind UNIQOVA. We turn ambitious visions into dominant digital products.",
    url: "https://uniquova.com/about",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/about_hero_bg.jpg?v=1",
        width: 1200,
        height: 630,
        alt: "UNIQUOVA Team and Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About UNIQOVA — Digital Agency Leadership & Culture",
    description: "Discover our story, leadership team, and vision for full-service digital excellence.",
    images: ["/images/about_hero_bg.jpg?v=1"],
  },
};

export default function AboutPage() {
  const schemas = [
    getOrganizationSchema(),
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "About Us", url: "/about" },
    ]),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <AboutClient />
    </>
  );
}

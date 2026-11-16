import React from "react";
import type { Metadata } from "next";
import ServicesClient from "@/components/ServicesClient";
import JsonLd from "@/components/JsonLd";
import { getBreadcrumbSchema, SITE_URL } from "@/lib/schema";
import { SERVICES_DATA } from "@/data/agencyData";

export const metadata: Metadata = {
  title: "Digital Agency Services — E-commerce, Web, App, Brand & Design",
  description:
    "Explore UNIQOVA's full suite of digital agency services: Amazon & Flipkart marketplace management, Next.js web development, mobile apps, and brand design.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Digital Agency Services — UNIQOVA | Full-Stack Capabilities",
    description:
      "End-to-end e-commerce solutions, high-performance web development, cross-platform mobile apps, and strategic branding built to scale your business.",
    url: "https://uniquova.com/services",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/hero-reference.jpg",
        width: 1200,
        height: 630,
        alt: "UNIQUOVA Digital Agency Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Agency Services — UNIQOVA",
    description: "Explore our integrated digital capabilities: e-commerce scaling, web apps, mobile engineering, and branding.",
    images: ["/images/hero-reference.jpg"],
  },
};

export default function ServicesPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services" },
  ]);

  const serviceCatalogSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "UNIQUOVA Digital Services",
    description: "Complete list of digital agency services provided by UNIQOVA",
    itemListElement: SERVICES_DATA.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: service.title,
      url: `${SITE_URL}/services/${service.slug}`,
      description: service.shortDesc,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, serviceCatalogSchema]} />
      <ServicesClient />
    </>
  );
}

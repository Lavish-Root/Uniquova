import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import IndividualServiceClient from "@/components/IndividualServiceClient";
import JsonLd from "@/components/JsonLd";
import { SERVICES_DATA, SERVICE_BG_IMAGES } from "@/data/agencyData";
import { getServiceSchema, getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";

interface ServicePageProps {
  params: {
    slug: string;
  };
}

// Generate static routes for all services at build time
export async function generateStaticParams() {
  const slugs = SERVICES_DATA.map((service) => service.slug);
  // Ensure both graphic-design and graphic-designing are statically generated
  slugs.push("graphic-design", "graphic-designing");
  return Array.from(new Set(slugs)).map((slug) => ({ slug }));
}

// Find service helper supporting alias normalization
function findServiceBySlug(rawSlug: string) {
  if (rawSlug === "graphic-design" || rawSlug === "graphic-designing") {
    return SERVICES_DATA.find(
      (s) => s.slug === "graphic-design" || s.slug === "graphic-designing"
    );
  }
  return SERVICES_DATA.find((s) => s.slug === rawSlug);
}

// Dynamic SEO Metadata for every individual service page
export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const service = findServiceBySlug(params?.slug);

  if (!service) {
    return {
      title: "Service Not Found",
      robots: { index: false, follow: false },
    };
  }

  const bgImage = SERVICE_BG_IMAGES[service.slug] || "/images/hero-reference.jpg";

  return {
    title: `${service.title} — Services | UNIQOVA`,
    description: service.shortDesc,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} — UNIQOVA | Digital Agency`,
      description: service.shortDesc,
      url: `https://uniquova.com/services/${service.slug}`,
      siteName: "UNIQUOVA",
      locale: "en_IN",
      type: "website",
      images: [
        {
          url: bgImage,
          width: 1200,
          height: 630,
          alt: `${service.title} — UNIQOVA`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} — UNIQOVA`,
      description: service.shortDesc,
      images: [bgImage],
    },
  };
}

export default function IndividualServicePage({ params }: ServicePageProps) {
  const service = findServiceBySlug(params?.slug);

  if (!service) {
    notFound();
  }

  const schemas = [
    getServiceSchema(service),
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.title, url: `/services/${service.slug}` },
    ]),
    getFaqSchema(service.faqs),
  ];

  return (
    <>
      <JsonLd data={schemas} />
      <IndividualServiceClient service={service} />
    </>
  );
}

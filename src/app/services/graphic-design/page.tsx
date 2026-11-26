import React from "react";
import type { Metadata } from "next";
import GraphicDesignServiceClient from "@/components/GraphicDesignServiceClient";
import JsonLd from "@/components/JsonLd";
import { getServiceSchema, getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";
import { SERVICES_DATA } from "@/data/agencyData";

export const metadata: Metadata = {
  title: "Graphic Designing & Visual Creative Systems | Social Ads, 3D & Print — UNIQOVA",
  description:
    "High-impact visual creatives engineered to stop the scroll and accelerate conversion. Performance Meta/Google ad variants, 3D product renders, packaging die-lines, and executive pitch decks.",
  alternates: {
    canonical: "/services/graphic-design",
  },
  openGraph: {
    title: "Graphic Designing & Visual Creative Agency — UNIQOVA",
    description:
      "Creatives engineered to stop the scroll & accelerate conversions. High-CTR social ads, 3D product mockups, and multi-format visual brand systems.",
    url: "https://uniquova.com/services/graphic-design",
    siteName: "UNIQUOVA",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/images/services/graphic_design_bg.jpg?v=3",
        width: 1200,
        height: 630,
        alt: "UNIQUOVA Graphic Designing Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Graphic Designing & Visual Systems — UNIQOVA",
    description:
      "High-impact performance ad creatives, 3D product renders, and investor pitch decks with 24-48 hr sprint turnaround.",
    images: ["/images/services/graphic_design_bg.jpg?v=3"],
  },
};

export default function GraphicDesignPage() {
  const service = SERVICES_DATA.find(
    (s) => s.slug === "graphic-design" || s.slug === "graphic-designing"
  );

  const schemas: Record<string, unknown>[] = [];
  if (service) {
    schemas.push(getServiceSchema(service));
  }
  schemas.push(
    getBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: "Graphic Designing", url: "/services/graphic-design" },
    ])
  );
  if (service?.faqs) {
    schemas.push(getFaqSchema(service.faqs));
  }

  return (
    <>
      <JsonLd data={schemas} />
      <GraphicDesignServiceClient />
    </>
  );
}

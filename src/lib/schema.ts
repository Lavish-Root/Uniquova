import { ServiceItem, FAQ_DATA } from "@/data/agencyData";

export const SITE_URL = "https://uniquova.com";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "UNIQUOVA",
    legalName: "UNIQUOVA",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo-dark.png`,
    description:
      "UNIQUOVA is a full-service digital agency empowering growing brands through integrated e-commerce solutions, high-performance web development, mobile apps, branding, and graphic designing.",
    email: "contact@uniquova.com",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    founders: [
      {
        "@type": "Person",
        name: "Lavish Chouhan",
        jobTitle: "Founder & CEO",
      },
      {
        "@type": "Person",
        name: "Sahil Meena",
        jobTitle: "Co-Founder & CTO",
      },
    ],
    sameAs: [
      "https://linkedin.com",
      "https://twitter.com",
      "https://instagram.com",
      "https://github.com",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        email: "contact@uniquova.com",
        availableLanguage: ["English", "Hindi"],
        areaServed: ["IN", "US", "GB", "AE"],
      },
    ],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: "UNIQUOVA",
    description: "Premium Full-Service Digital Agency: E-commerce, Web Development, Mobile Apps & Branding.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#professionalService`,
    name: "UNIQUOVA",
    url: SITE_URL,
    image: `${SITE_URL}/images/hero-reference.jpg`,
    email: "contact@uniquova.com",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "19:00",
      },
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

export function getServiceSchema(service: ServiceItem) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}/services/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.shortDesc,
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: service.deliverables.map((deliv, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: deliv,
        },
        position: index + 1,
      })),
    },
  };
}

export function getFaqSchema(faqs?: { q: string; a: string }[]) {
  const faqList = faqs && faqs.length > 0 ? faqs : FAQ_DATA;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqList.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://uniquova.com";
  const lastModified = new Date();

  interface SitemapEntry {
    route: string;
    priority: number;
    changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  }

  const routes: SitemapEntry[] = [
    // Top-level Homepage
    { route: "", priority: 1.0, changeFrequency: "daily" },

    // Primary High-Priority E-commerce Services
    { route: "/services/ecommerce", priority: 0.95, changeFrequency: "weekly" },
    { route: "/services/amazon-account-management", priority: 0.95, changeFrequency: "weekly" },
    { route: "/services/flipkart-account-management", priority: 0.9, changeFrequency: "weekly" },
    { route: "/services/amazon-ppc-management", priority: 0.9, changeFrequency: "weekly" },
    { route: "/services/ecommerce-catalog-management", priority: 0.9, changeFrequency: "weekly" },

    // Core Digital Agency Services
    { route: "/services", priority: 0.85, changeFrequency: "weekly" },
    { route: "/services/web-development", priority: 0.85, changeFrequency: "weekly" },
    { route: "/services/app-development", priority: 0.85, changeFrequency: "weekly" },
    { route: "/services/branding", priority: 0.85, changeFrequency: "weekly" },
    { route: "/services/graphic-design", priority: 0.85, changeFrequency: "weekly" },

    // Agency Authority & Inquiries
    { route: "/about", priority: 0.8, changeFrequency: "monthly" },
    { route: "/our-work", priority: 0.8, changeFrequency: "weekly" },
    { route: "/industries", priority: 0.75, changeFrequency: "monthly" },
    { route: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { route: "/feedback", priority: 0.7, changeFrequency: "monthly" },

    // Legal Policies
    { route: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { route: "/terms-and-conditions", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map((item) => ({
    url: `${baseUrl}${item.route}`,
    lastModified,
    changeFrequency: item.changeFrequency,
    priority: item.priority,
  }));
}

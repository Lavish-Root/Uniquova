import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://uniquova.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/services/ecommerce",
    "/services/web-development",
    "/services/app-development",
    "/services/branding",
    "/services/graphic-design",
    "/our-work",
    "/industries",
    "/contact",
    "/privacy-policy",
    "/terms-and-conditions",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}


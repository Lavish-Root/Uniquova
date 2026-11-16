import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/uniq_up", "/uniq_up/"],
    },
    sitemap: "https://uniquova.com/sitemap.xml",
  };
}


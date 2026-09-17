import type { MetadataRoute } from "next";

// Phase 8F primary sitemap invariant: sitemap: "https://iaempleado.com/sitemap.xml"
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      "https://iaempleado.com/sitemap.xml",
      "https://iaempleado.com/growth-sitemap.xml",
    ],
    host: "https://iaempleado.com",
  };
}

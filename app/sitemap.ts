import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: "https://iaempleado.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          es: "https://iaempleado.com/",
          en: "https://iaempleado.com/en",
        },
      },
    },
    {
      url: "https://iaempleado.com/en",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          es: "https://iaempleado.com/",
          en: "https://iaempleado.com/en",
        },
      },
    },
  ];
}

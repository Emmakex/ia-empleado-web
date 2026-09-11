import type { MetadataRoute } from "next";
import { employeeDetailPath, getDetailedEmployeeRecords } from "../lib/employee-content-engine";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [
    {
      url: "https://iaempleado.com/",
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: { es: "https://iaempleado.com/", en: "https://iaempleado.com/en" } },
    },
    {
      url: "https://iaempleado.com/en",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: { languages: { es: "https://iaempleado.com/", en: "https://iaempleado.com/en" } },
    },
    {
      url: "https://iaempleado.com/empleados-ia",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      alternates: { languages: { es: "https://iaempleado.com/empleados-ia", en: "https://iaempleado.com/en/ai-employees" } },
    },
    {
      url: "https://iaempleado.com/en/ai-employees",
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
      alternates: { languages: { es: "https://iaempleado.com/empleados-ia", en: "https://iaempleado.com/en/ai-employees" } },
    },
  ];

  for (const employee of getDetailedEmployeeRecords()) {
    const esPath = employeeDetailPath(employee.key, "es");
    const enPath = employeeDetailPath(employee.key, "en");
    entries.push(
      {
        url: `https://iaempleado.com${esPath}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.9,
        alternates: { languages: { es: `https://iaempleado.com${esPath}`, en: `https://iaempleado.com${enPath}` } },
      },
      {
        url: `https://iaempleado.com${enPath}`,
        lastModified,
        changeFrequency: "weekly",
        priority: 0.8,
        alternates: { languages: { es: `https://iaempleado.com${esPath}`, en: `https://iaempleado.com${enPath}` } },
      },
    );
  }

  return entries;
}

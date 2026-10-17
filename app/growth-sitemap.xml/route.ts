import { blogArticlePath, blogArticleRecords, blogIndexPath, growthLandingPath, growthLandingRecords } from "../../lib/growth-content";

const BASE_URL = "https://iaempleado.com";

type SitemapEntry = {
  url: string;
  esUrl: string;
  enUrl: string;
  lastModified: string;
  changeFrequency: "daily" | "weekly";
  priority: number;
};

function sitemapUrl({ url, esUrl, enUrl, lastModified, changeFrequency, priority }: SitemapEntry) {
  return [
    "<url>",
    `<loc>${url}</loc>`,
    `<xhtml:link rel="alternate" hreflang="es-ES" href="${esUrl}" />`,
    `<xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />`,
    `<xhtml:link rel="alternate" hreflang="x-default" href="${esUrl}" />`,
    `<lastmod>${lastModified}</lastmod>`,
    `<changefreq>${changeFrequency}</changefreq>`,
    `<priority>${priority.toFixed(1)}</priority>`,
    "</url>",
  ].join("");
}

export function GET() {
  const latestDate = [...growthLandingRecords.map((item) => item.updatedAt), ...blogArticleRecords.map((item) => item.updatedAt)]
    .sort()
    .at(-1) ?? new Date().toISOString().slice(0, 10);

  const blogEsUrl = `${BASE_URL}${blogIndexPath("es")}`;
  const blogEnUrl = `${BASE_URL}${blogIndexPath("en")}`;
  const urls = [
    sitemapUrl({ url: blogEsUrl, esUrl: blogEsUrl, enUrl: blogEnUrl, lastModified: latestDate, changeFrequency: "daily", priority: 0.8 }),
    sitemapUrl({ url: blogEnUrl, esUrl: blogEsUrl, enUrl: blogEnUrl, lastModified: latestDate, changeFrequency: "daily", priority: 0.7 }),
  ];

  for (const landing of growthLandingRecords) {
    const esUrl = `${BASE_URL}${growthLandingPath(landing.key, "es")}`;
    const enUrl = `${BASE_URL}${growthLandingPath(landing.key, "en")}`;
    urls.push(
      sitemapUrl({ url: esUrl, esUrl, enUrl, lastModified: landing.updatedAt, changeFrequency: "weekly", priority: 0.9 }),
      sitemapUrl({ url: enUrl, esUrl, enUrl, lastModified: landing.updatedAt, changeFrequency: "weekly", priority: 0.8 }),
    );
  }

  for (const article of blogArticleRecords) {
    const esUrl = `${BASE_URL}${blogArticlePath(article.key, "es")}`;
    const enUrl = `${BASE_URL}${blogArticlePath(article.key, "en")}`;
    urls.push(
      sitemapUrl({ url: esUrl, esUrl, enUrl, lastModified: article.updatedAt, changeFrequency: "weekly", priority: 0.8 }),
      sitemapUrl({ url: enUrl, esUrl, enUrl, lastModified: article.updatedAt, changeFrequency: "weekly", priority: 0.7 }),
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join("")}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

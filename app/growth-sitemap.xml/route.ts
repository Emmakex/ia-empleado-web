import { blogArticlePath, blogArticleRecords, blogIndexPath, growthLandingPath, growthLandingRecords } from "../../lib/growth-content";

const BASE_URL = "https://iaempleado.com";

function sitemapUrl(url: string, lastModified: string, changeFrequency: "daily" | "weekly", priority: number) {
  return `<url><loc>${url}</loc><lastmod>${lastModified}</lastmod><changefreq>${changeFrequency}</changefreq><priority>${priority.toFixed(1)}</priority></url>`;
}

export function GET() {
  const latestDate = [...growthLandingRecords.map((item) => item.updatedAt), ...blogArticleRecords.map((item) => item.updatedAt)]
    .sort()
    .at(-1) ?? new Date().toISOString().slice(0, 10);

  const urls = [
    sitemapUrl(`${BASE_URL}${blogIndexPath("es")}`, latestDate, "daily", 0.8),
    sitemapUrl(`${BASE_URL}${blogIndexPath("en")}`, latestDate, "daily", 0.7),
  ];

  for (const landing of growthLandingRecords) {
    urls.push(
      sitemapUrl(`${BASE_URL}${growthLandingPath(landing.key, "es")}`, landing.updatedAt, "weekly", 0.9),
      sitemapUrl(`${BASE_URL}${growthLandingPath(landing.key, "en")}`, landing.updatedAt, "weekly", 0.8),
    );
  }

  for (const article of blogArticleRecords) {
    urls.push(
      sitemapUrl(`${BASE_URL}${blogArticlePath(article.key, "es")}`, article.updatedAt, "weekly", 0.8),
      sitemapUrl(`${BASE_URL}${blogArticlePath(article.key, "en")}`, article.updatedAt, "weekly", 0.7),
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}

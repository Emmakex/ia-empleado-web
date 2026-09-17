import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://iaempleado.com").replace(/\/$/, "");

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const landings = [
  ...readJson("content/growth/landings.json"),
  ...readJson("content/growth/incremental-landings.json"),
];
const articles = [
  ...readJson("content/growth/articles.json"),
  ...readJson("content/growth/incremental-articles.json"),
];

const recordDate = (record) => record.updatedAt || record.publishedAt || "0000-00-00";
const latestDate = [...landings, ...articles]
  .map(recordDate)
  .sort((left, right) => right.localeCompare(left))[0];

if (!latestDate) {
  throw new Error("Growth content is empty; nothing to verify in production");
}

const latestLandings = landings.filter((record) => recordDate(record) === latestDate);
const latestArticles = articles.filter((record) => recordDate(record) === latestDate);

const pages = [
  { path: "/blog", canonical: `${baseUrl}/blog` },
  { path: "/en/blog", canonical: `${baseUrl}/en/blog` },
  ...latestLandings.flatMap((record) => [
    {
      path: `/${record.slugs.es}`,
      canonical: `${baseUrl}/${record.slugs.es}`,
    },
    {
      path: `/en/${record.slugs.en}`,
      canonical: `${baseUrl}/en/${record.slugs.en}`,
    },
  ]),
  ...latestArticles.flatMap((record) => [
    {
      path: `/blog/${record.slugs.es}`,
      canonical: `${baseUrl}/blog/${record.slugs.es}`,
    },
    {
      path: `/en/blog/${record.slugs.en}`,
      canonical: `${baseUrl}/en/blog/${record.slugs.en}`,
    },
  ]),
];

function tagAttribute(tag, name) {
  const match = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']+)["']`, "i"));
  return match?.[1] ?? null;
}

function canonicalFromHtml(html) {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  const canonicalTag = tags.find((tag) => {
    const rel = tagAttribute(tag, "rel");
    return rel?.split(/\s+/).some((value) => value.toLowerCase() === "canonical");
  });
  return canonicalTag ? tagAttribute(canonicalTag, "href") : null;
}

function hasNoindex(html) {
  const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
  return tags.some((tag) => {
    const name = tagAttribute(tag, "name")?.toLowerCase();
    const content = tagAttribute(tag, "content")?.toLowerCase() ?? "";
    return name === "robots" && content.includes("noindex");
  });
}

async function getText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    cache: "no-store",
    headers: {
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Cache-Control": "no-cache",
      "User-Agent": "IA-Empleado-Growth-Production-Verifier/1.0",
    },
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  return body;
}

console.log(`Verifying Growth production profile for content date ${latestDate}`);
console.log(`Checking ${pages.length} indexable pages plus sitemap and robots.txt`);

for (const page of pages) {
  const url = `${baseUrl}${page.path}`;
  const html = await getText(url);
  const canonical = canonicalFromHtml(html);

  if (canonical !== page.canonical) {
    throw new Error(
      `${url} canonical mismatch: expected ${page.canonical}, received ${canonical ?? "missing"}`,
    );
  }

  if (hasNoindex(html)) {
    throw new Error(`${url} unexpectedly contains a robots noindex directive`);
  }

  console.log(`PASS page ${page.path}`);
}

const sitemapUrl = `${baseUrl}/growth-sitemap.xml`;
const sitemap = await getText(sitemapUrl);
for (const page of pages) {
  if (!sitemap.includes(`<loc>${page.canonical}</loc>`)) {
    throw new Error(`${sitemapUrl} is missing ${page.canonical}`);
  }
}
console.log(`PASS sitemap ${sitemapUrl}`);

const robotsUrl = `${baseUrl}/robots.txt`;
const robots = await getText(robotsUrl);
if (!robots.includes(sitemapUrl)) {
  throw new Error(`${robotsUrl} does not declare ${sitemapUrl}`);
}
console.log(`PASS robots ${robotsUrl}`);

console.log(
  `Growth production verification passed for ${latestLandings.length} landing record(s) and ${latestArticles.length} article record(s) dated ${latestDate}`,
);

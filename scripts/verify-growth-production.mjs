import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const baseUrl = (process.env.PRODUCTION_BASE_URL || "https://iaempleado.com").replace(/\/$/, "");

const readJson = (relativePath) =>
  JSON.parse(fs.readFileSync(path.join(root, relativePath), "utf8"));

const dailyDir = path.join(root, "content/growth/daily");
const readDailyFiles = (suffix) =>
  fs
    .readdirSync(dailyDir)
    .filter((name) => name.endsWith(suffix))
    .sort()
    .map((name) => ({ name, records: readJson(`content/growth/daily/${name}`) }));

const dailyLandingFiles = readDailyFiles(".landings.json");
const dailyArticleFiles = readDailyFiles(".articles.json");
const dailyLandings = dailyLandingFiles.flatMap((file) => file.records);
const dailyArticles = dailyArticleFiles.flatMap((file) => file.records);

const landings = [
  ...readJson("content/growth/landings.json"),
  ...readJson("content/growth/incremental-landings.json"),
  ...dailyLandings,
];
const articles = [
  ...readJson("content/growth/articles.json"),
  ...readJson("content/growth/incremental-articles.json"),
  ...dailyArticles,
];

const recordDate = (record) => record.updatedAt || record.publishedAt || "0000-00-00";
const latestDate = [...landings, ...articles]
  .map(recordDate)
  .sort((left, right) => right.localeCompare(left))[0];

if (!latestDate) {
  throw new Error("Growth content is empty; nothing to verify in production");
}

const latestLandings = dailyLandingFiles.length
  ? dailyLandingFiles.at(-1).records
  : landings.filter((record) => recordDate(record) === latestDate);
const latestArticles = dailyArticleFiles.length
  ? dailyArticleFiles.at(-1).records
  : articles.filter((record) => recordDate(record) === latestDate);

const expectedUrls = [
  ...latestLandings.flatMap((record) => [
    `${baseUrl}/${record.slugs.es}`,
    `${baseUrl}/en/${record.slugs.en}`,
  ]),
  ...latestArticles.flatMap((record) => [
    `${baseUrl}/blog/${record.slugs.es}`,
    `${baseUrl}/en/blog/${record.slugs.en}`,
  ]),
];

async function getText(url) {
  const response = await fetch(url, {
    redirect: "follow",
    cache: "no-store",
    headers: {
      Accept: "application/xml,text/xml;q=0.9,*/*;q=0.8",
      "Cache-Control": "no-cache",
      "User-Agent": "IA-Empleado-Growth-Sitemap-Verifier/1.0",
    },
  });

  const body = await response.text();
  if (!response.ok) {
    throw new Error(`${url} returned HTTP ${response.status}`);
  }
  return body;
}

console.log(`Verifying Growth production sitemap for content date ${latestDate}`);
if (dailyLandingFiles.length || dailyArticleFiles.length) {
  console.log(
    `Latest daily files: ${dailyLandingFiles.at(-1)?.name ?? "none"}, ${dailyArticleFiles.at(-1)?.name ?? "none"}`,
  );
}
console.log(`Checking ${expectedUrls.length} latest Growth URL(s) in the public sitemap`);

const sitemapUrl = `${baseUrl}/growth-sitemap.xml`;
const sitemap = await getText(sitemapUrl);

for (const url of expectedUrls) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) {
    throw new Error(`${sitemapUrl} is missing ${url}`);
  }
  console.log(`PASS sitemap URL ${url}`);
}

console.log(
  `Growth production verification passed via public sitemap for ${latestLandings.length} landing record(s) and ${latestArticles.length} article record(s).`,
);

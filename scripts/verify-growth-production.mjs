import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { execFileSync } from "node:child_process";

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

// Verify every newly added or changed Growth owner in the release commit, including
// backdated daily batches. The latest-content fallback is explicit and not
// misrepresented as a PR-specific verification.
const recordDate = (record) => record.updatedAt || record.publishedAt || "0000-00-00";
const latestDate = [...landings, ...articles].map(recordDate)
  .sort((left, right) => right.localeCompare(left))[0];

if (!latestDate) throw new Error("Growth content is empty; nothing to verify in production");

const latestTargets = [
  ...landings.filter((record) => recordDate(record) === latestDate).map((record) => ({ kind: "landing", record })),
  ...articles.filter((record) => recordDate(record) === latestDate).map((record) => ({ kind: "article", record })),
];

function recordKind(file) {
  if (!file.startsWith("content/growth/")) return null;
  const base = path.basename(file);
  if (base === "landings.json" || base === "incremental-landings.json" ||
      (file.startsWith("content/growth/daily/") && base.endsWith(".landings.json"))) return "landing";
  if (base === "articles.json" || base === "incremental-articles.json" ||
      (file.startsWith("content/growth/daily/") && base.endsWith(".articles.json"))) return "article";
  return null;
}

function changedRecordTargets() {
  const base = process.env.GROWTH_VERIFY_BASE_SHA || "HEAD^";
  const head = process.env.GROWTH_VERIFY_HEAD_SHA || "HEAD";
  let paths;
  try {
    paths = execFileSync("git", ["diff", "--name-only", base, head, "--", "content/growth"], {
      cwd: root, encoding: "utf8",
    }).trim().split("\n").filter(Boolean);
  } catch {
    console.warn("WARNING git release diff unavailable; verifying latest Growth records only (not PR-specific)");
    return [];
  }

  const targets = [];
  for (const file of paths) {
    const kind = recordKind(file);
    if (!kind) continue;
    let records;
    try {
      records = readJson(file);
    } catch {
      continue; // Removed files have no new public URL to check.
    }
    if (!Array.isArray(records)) continue;
    let previous = [];
    try {
      previous = JSON.parse(execFileSync("git", ["show", base + ":" + file], {
        cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"],
      }));
    } catch {
      // Newly added file.
    }
    const before = new Map((Array.isArray(previous) ? previous : []).map((record) => [record.key, record]));
    for (const record of records) {
      const old = before.get(record.key);
      if (!old || JSON.stringify(old) !== JSON.stringify(record)) targets.push({ kind, record });
    }
  }
  return targets;
}

const changedTargets = changedRecordTargets();
const targets = changedTargets.length ? changedTargets : latestTargets;
const mode = changedTargets.length ? "release-diff" : "latest-fallback";
if (!changedTargets.length) console.warn("WARNING no changed Growth owners identified; this is NOT a PR-specific acceptance");

function recordUrls({ kind, record }) {
  const prefix = kind === "article" ? "/blog/" : "/";
  const englishPrefix = kind === "article" ? "/en/blog/" : "/en/";
  return {
    es: baseUrl + prefix + record.slugs.es,
    en: baseUrl + englishPrefix + record.slugs.en,
  };
}

function visibleText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, num) => String.fromCodePoint(parseInt(num, 10)))
    .replace(/&(?:amp|lt|gt|quot|apos|nbsp);/gi, (entity) =>
      ({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"',
         "&apos;": "'", "&nbsp;": " " })[entity.toLowerCase()] ?? entity)
    .replace(/\s+/gu, " ")
    .trim().toLowerCase();
}

function assertSitemapEntry(sitemap, url, esUrl, enUrl) {
  const entry = (sitemap.match(/<url>[\s\S]*?<\/url>/g) ?? [])
    .find((block) => block.includes("<loc>" + url + "</loc>"));
  if (!entry) throw new Error("Growth sitemap is missing " + url);
  for (const [locale, alternate] of [["es-ES", esUrl], ["en", enUrl], ["x-default", esUrl]]) {
    if (!entry.includes('hreflang="' + locale + '" href="' + alternate + '"')) {
      throw new Error("Growth sitemap missing hreflang " + locale + " for " + url);
    }
  }
}

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

console.log("Verifying Growth production in " + mode + " mode: " + targets.length + " record(s)");
const sitemap = await getText(baseUrl + "/growth-sitemap.xml");
for (const target of targets) {
  const urls = recordUrls(target);
  for (const locale of ["es", "en"]) {
    const url = urls[locale];
    assertSitemapEntry(sitemap, url, urls.es, urls.en);
    const html = await getText(url);
    if (!/<html\b/i.test(html) || !/<h1\b/i.test(html)) {
      throw new Error("Growth page is not server-rendered HTML with an H1: " + url);
    }
    const text = visibleText(html);
    const expected = [target.record.title?.[locale], target.record.lead?.[locale],
                      target.record.intro?.[locale]]
      .filter((value) => typeof value === "string" && value.trim().length >= 30);
    if (!expected.some((value) => text.includes(visibleText(value).slice(0, 70)))) {
      throw new Error("Published Growth page does not contain expected editorial text: " + url);
    }
    const canonicalMatch = html.match(/<link\b[^>]*rel="canonical"[^>]*>/i)?.[0];
    if (!canonicalMatch || !canonicalMatch.includes('href="' + url + '"')) {
      throw new Error("Growth page canonical is missing or incorrect: " + url);
    }
    console.log("PASS live HTTP + content + canonical + sitemap/hreflang " + url);
  }
}
console.log("PASS Growth production: " + (targets.length * 2) +
  " ES/EN URLs checked, mode=" + mode + ". Google indexing is NOT implied.");

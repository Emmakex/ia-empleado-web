import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import type { Locale } from "./i18n";
import landingsJson from "../content/growth/landings.json";
import articlesJson from "../content/growth/articles.json";
import incrementalLandingsJson from "../content/growth/incremental-landings.json";
import incrementalArticlesJson from "../content/growth/incremental-articles.json";
import consolidationsJson from "../content/growth/consolidations.json";
import seoOverridesJson from "../content/growth/seo-overrides.json";
import seoOverridesPhase2Json from "../content/growth/seo-overrides-phase2.json";
import seoOverridesPhase3Json from "../content/growth/seo-overrides-phase3.json";
import seoOverridesPhase4Json from "../content/growth/seo-overrides-phase4.json";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type GrowthSection = {
  title: LocalizedText;
  paragraphs: LocalizedList;
};

export type GrowthFaq = {
  question: LocalizedText;
  answer: LocalizedText;
};

export type GrowthLandingRecord = {
  key: string;
  slugs: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  eyebrow: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  sections: GrowthSection[];
  workflow: {
    title: LocalizedText;
    steps: LocalizedList;
  };
  metrics: LocalizedList;
  faq: GrowthFaq[];
  relatedArticleKey: string;
  publishedAt: string;
  updatedAt: string;
};

export type BlogArticleRecord = {
  key: string;
  slugs: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  title: LocalizedText;
  excerpt: LocalizedText;
  intro: LocalizedText;
  sections: GrowthSection[];
  takeaways: LocalizedList;
  relatedLandingKey: string;
  publishedAt: string;
  updatedAt: string;
};

type ConsolidationRegistry = {
  articles: Array<{ key: string }>;
  landings: Array<{ key: string }>;
};

type SeoOverride<T extends { key: string }> = Partial<T> & {
  key: string;
  decision?: string;
  primaryKeyword?: LocalizedText;
  supportingKeywords?: LocalizedList;
  researchBasis?: string[];
};

type SeoOverrideRegistry = {
  landings: Array<SeoOverride<GrowthLandingRecord>>;
  articles: Array<SeoOverride<BlogArticleRecord>>;
};

const dailyDirectory = path.join(process.cwd(), "content", "growth", "daily");
const replacedLegacyArticleKeys = new Set(["what-is-an-ai-employee"]);
const consolidationRegistry = consolidationsJson as ConsolidationRegistry;
const baseSeoOverrideRegistry = seoOverridesJson as SeoOverrideRegistry;
const phase2SeoOverrideRegistry = seoOverridesPhase2Json as SeoOverrideRegistry;
const phase3SeoOverrideRegistry = seoOverridesPhase3Json as SeoOverrideRegistry;
const phase4SeoOverrideRegistry = seoOverridesPhase4Json as SeoOverrideRegistry;
const seoOverrideRegistry: SeoOverrideRegistry = {
  landings: [
    ...baseSeoOverrideRegistry.landings,
    ...phase2SeoOverrideRegistry.landings,
    ...phase3SeoOverrideRegistry.landings,
    ...phase4SeoOverrideRegistry.landings,
  ],
  articles: [
    ...baseSeoOverrideRegistry.articles,
    ...phase2SeoOverrideRegistry.articles,
    ...phase3SeoOverrideRegistry.articles,
    ...phase4SeoOverrideRegistry.articles,
  ],
};
const consolidatedArticleKeys = new Set(consolidationRegistry.articles.map((item) => item.key));
const consolidatedLandingKeys = new Set(consolidationRegistry.landings.map((item) => item.key));

function readDailyRecords<T>(suffix: string): T[] {
  return readdirSync(dailyDirectory)
    .filter((name) => name.endsWith(suffix))
    .sort()
    .flatMap((name) => {
      const value = JSON.parse(readFileSync(path.join(dailyDirectory, name), "utf8"));
      return Array.isArray(value) ? (value as T[]) : [];
    });
}

function applySeoOverrides<T extends { key: string }>(records: T[], overrides: Array<SeoOverride<T>>): T[] {
  const byKey = new Map(overrides.map((override) => [override.key, override]));
  return records.map((record) => {
    const override = byKey.get(record.key);
    return override ? ({ ...record, ...override } as T) : record;
  });
}

const dailyLandings = readDailyRecords<GrowthLandingRecord>(".landings.json");
const dailyArticles = readDailyRecords<BlogArticleRecord>(".articles.json");
const legacyArticles = (articlesJson as BlogArticleRecord[]).filter((record) => !replacedLegacyArticleKeys.has(record.key));

const baseLandingRecords = [
  ...(landingsJson as GrowthLandingRecord[]),
  ...(incrementalLandingsJson as GrowthLandingRecord[]),
  ...dailyLandings,
].filter((record) => !consolidatedLandingKeys.has(record.key));

const baseArticleRecords = [
  ...legacyArticles,
  ...(incrementalArticlesJson as BlogArticleRecord[]),
  ...dailyArticles,
].filter((record) => !consolidatedArticleKeys.has(record.key));

export const growthLandingRecords = applySeoOverrides(baseLandingRecords, seoOverrideRegistry.landings);
export const blogArticleRecords = applySeoOverrides(baseArticleRecords, seoOverrideRegistry.articles);

export function getGrowthLandingByKey(key: string) {
  return growthLandingRecords.find((record) => record.key === key);
}

export function getGrowthLandingBySlug(slug: string, locale: Locale) {
  return growthLandingRecords.find((record) => record.slugs[locale] === slug);
}

export function growthLandingPath(key: string, locale: Locale): string {
  const record = getGrowthLandingByKey(key);
  if (!record) throw new Error(`Unknown growth landing: ${key}`);
  return locale === "es" ? `/${record.slugs.es}` : `/en/${record.slugs.en}`;
}

export function getBlogArticleByKey(key: string) {
  return blogArticleRecords.find((record) => record.key === key);
}

export function getBlogArticleBySlug(slug: string, locale: Locale) {
  return blogArticleRecords.find((record) => record.slugs[locale] === slug);
}

export function blogIndexPath(locale: Locale): string {
  return locale === "es" ? "/blog" : "/en/blog";
}

export function blogArticlePath(key: string, locale: Locale): string {
  const record = getBlogArticleByKey(key);
  if (!record) throw new Error(`Unknown blog article: ${key}`);
  return locale === "es" ? `/blog/${record.slugs.es}` : `/en/blog/${record.slugs.en}`;
}

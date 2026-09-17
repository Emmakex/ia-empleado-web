import type { Locale } from "./i18n";
import landingsJson from "../content/growth/landings.json";
import articlesJson from "../content/growth/articles.json";
import incrementalLandingsJson from "../content/growth/incremental-landings.json";
import incrementalArticlesJson from "../content/growth/incremental-articles.json";

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

export const growthLandingRecords = [
  ...(landingsJson as GrowthLandingRecord[]),
  ...(incrementalLandingsJson as GrowthLandingRecord[]),
];

export const blogArticleRecords = [
  ...(articlesJson as BlogArticleRecord[]),
  ...(incrementalArticlesJson as BlogArticleRecord[]),
];

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

import { readFile } from "node:fs/promises";

const readJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), "utf8"));

const legacyLandings = await readJson("../content/growth/landings.json");
const incrementalLandings = await readJson("../content/growth/incremental-landings.json");
const legacyArticles = await readJson("../content/growth/articles.json");
const incrementalArticles = await readJson("../content/growth/incremental-articles.json");

const landings = [...legacyLandings, ...incrementalLandings];
const articles = [...legacyArticles, ...incrementalArticles];

const errors = [];
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MIN_INCREMENTAL_LANDING_WORDS = 900;
const MIN_INCREMENTAL_ARTICLE_WORDS = 1200;

function requireText(value, label) {
  if (typeof value !== "string" || !value.trim()) errors.push(`${label} must be non-empty text`);
}

function validateLocalized(value, label) {
  requireText(value?.es, `${label}.es`);
  requireText(value?.en, `${label}.en`);
}

function validateUnique(records, selector, label) {
  const seen = new Set();
  for (const record of records) {
    const value = selector(record);
    if (seen.has(value)) errors.push(`Duplicate ${label}: ${value}`);
    seen.add(value);
  }
}

function wordCount(value) {
  return String(value ?? "")
    .trim()
    .split(/\s+/u)
    .filter(Boolean).length;
}

function landingEditorialCopy(record, locale) {
  return [
    record.title?.[locale],
    record.lead?.[locale],
    ...(record.sections ?? []).flatMap((section) => [
      section.title?.[locale],
      ...(section.paragraphs?.[locale] ?? []),
    ]),
    record.workflow?.title?.[locale],
    ...(record.workflow?.steps?.[locale] ?? []),
    ...(record.metrics?.[locale] ?? []),
    ...(record.faq ?? []).flatMap((item) => [item.question?.[locale], item.answer?.[locale]]),
  ]
    .filter(Boolean)
    .join(" ");
}

function articleEditorialCopy(record, locale) {
  return [
    record.title?.[locale],
    record.excerpt?.[locale],
    record.intro?.[locale],
    ...(record.sections ?? []).flatMap((section) => [
      section.title?.[locale],
      ...(section.paragraphs?.[locale] ?? []),
    ]),
    ...(record.takeaways?.[locale] ?? []),
  ]
    .filter(Boolean)
    .join(" ");
}

if (!Array.isArray(landings) || landings.length === 0) errors.push("At least one growth landing is required");
if (!Array.isArray(articles) || articles.length === 0) errors.push("At least one blog article is required");

for (const landing of landings) {
  requireText(landing.key, "landing.key");
  validateLocalized(landing.slugs, `${landing.key}.slugs`);
  if (!slugPattern.test(landing.slugs?.es ?? "")) errors.push(`${landing.key}.slugs.es is not a safe slug`);
  if (!slugPattern.test(landing.slugs?.en ?? "")) errors.push(`${landing.key}.slugs.en is not a safe slug`);
  validateLocalized(landing.seoTitle, `${landing.key}.seoTitle`);
  validateLocalized(landing.seoDescription, `${landing.key}.seoDescription`);
  validateLocalized(landing.title, `${landing.key}.title`);
  validateLocalized(landing.lead, `${landing.key}.lead`);
  if (!Array.isArray(landing.sections) || landing.sections.length < 2) errors.push(`${landing.key} needs at least two substantive sections`);
  if (!Array.isArray(landing.faq) || landing.faq.length < 2) errors.push(`${landing.key} needs at least two FAQs`);
  if (!Array.isArray(landing.metrics?.es) || landing.metrics.es.length < 3) errors.push(`${landing.key} needs Spanish metrics`);
  if (!Array.isArray(landing.metrics?.en) || landing.metrics.en.length < 3) errors.push(`${landing.key} needs English metrics`);
  if (!datePattern.test(landing.publishedAt ?? "")) errors.push(`${landing.key}.publishedAt must be YYYY-MM-DD`);
  if (!datePattern.test(landing.updatedAt ?? "")) errors.push(`${landing.key}.updatedAt must be YYYY-MM-DD`);
  requireText(landing.relatedArticleKey, `${landing.key}.relatedArticleKey`);
}

for (const article of articles) {
  requireText(article.key, "article.key");
  validateLocalized(article.slugs, `${article.key}.slugs`);
  if (!slugPattern.test(article.slugs?.es ?? "")) errors.push(`${article.key}.slugs.es is not a safe slug`);
  if (!slugPattern.test(article.slugs?.en ?? "")) errors.push(`${article.key}.slugs.en is not a safe slug`);
  validateLocalized(article.seoTitle, `${article.key}.seoTitle`);
  validateLocalized(article.seoDescription, `${article.key}.seoDescription`);
  validateLocalized(article.title, `${article.key}.title`);
  validateLocalized(article.excerpt, `${article.key}.excerpt`);
  validateLocalized(article.intro, `${article.key}.intro`);
  if (!Array.isArray(article.sections) || article.sections.length < 2) errors.push(`${article.key} needs at least two substantive sections`);
  if (!Array.isArray(article.takeaways?.es) || article.takeaways.es.length < 3) errors.push(`${article.key} needs Spanish takeaways`);
  if (!Array.isArray(article.takeaways?.en) || article.takeaways.en.length < 3) errors.push(`${article.key} needs English takeaways`);
  if (!datePattern.test(article.publishedAt ?? "")) errors.push(`${article.key}.publishedAt must be YYYY-MM-DD`);
  if (!datePattern.test(article.updatedAt ?? "")) errors.push(`${article.key}.updatedAt must be YYYY-MM-DD`);
  requireText(article.relatedLandingKey, `${article.key}.relatedLandingKey`);
}

for (const landing of incrementalLandings) {
  for (const locale of ["es", "en"]) {
    const words = wordCount(landingEditorialCopy(landing, locale));
    if (words < MIN_INCREMENTAL_LANDING_WORDS) {
      errors.push(
        `${landing.key}.${locale} needs at least ${MIN_INCREMENTAL_LANDING_WORDS} editorial words; found ${words}`,
      );
    }
  }
}

for (const article of incrementalArticles) {
  for (const locale of ["es", "en"]) {
    const words = wordCount(articleEditorialCopy(article, locale));
    if (words < MIN_INCREMENTAL_ARTICLE_WORDS) {
      errors.push(
        `${article.key}.${locale} needs at least ${MIN_INCREMENTAL_ARTICLE_WORDS} editorial words; found ${words}`,
      );
    }
  }
}

validateUnique(landings, (item) => item.key, "landing key");
validateUnique(landings, (item) => item.slugs.es, "Spanish landing slug");
validateUnique(landings, (item) => item.slugs.en, "English landing slug");
validateUnique(articles, (item) => item.key, "article key");
validateUnique(articles, (item) => item.slugs.es, "Spanish article slug");
validateUnique(articles, (item) => item.slugs.en, "English article slug");

const landingKeys = new Set(landings.map((item) => item.key));
const articleKeys = new Set(articles.map((item) => item.key));
for (const landing of landings) {
  if (!articleKeys.has(landing.relatedArticleKey)) errors.push(`${landing.key} links to unknown article ${landing.relatedArticleKey}`);
}
for (const article of articles) {
  if (!landingKeys.has(article.relatedLandingKey)) errors.push(`${article.key} links to unknown landing ${article.relatedLandingKey}`);
}

if (errors.length) {
  console.error(`Growth content contract failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Growth content contract OK: ${landings.length} landing(s), ${articles.length} article(s). Incremental minimums: ${MIN_INCREMENTAL_LANDING_WORDS} words/landing/locale, ${MIN_INCREMENTAL_ARTICLE_WORDS} words/article/locale.`,
);

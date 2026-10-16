import { readFile, readdir } from "node:fs/promises";

const readJson = async (relativePath) =>
  JSON.parse(await readFile(new URL(relativePath, import.meta.url), "utf8"));

const readDailyRecords = async (suffix) => {
  const directory = new URL("../content/growth/daily/", import.meta.url);
  const files = (await readdir(directory)).filter((name) => name.endsWith(suffix)).sort();
  const records = await Promise.all(
    files.map(async (name) => {
      const value = JSON.parse(await readFile(new URL(name, directory), "utf8"));
      return Array.isArray(value) ? value : [];
    }),
  );
  return records.flat();
};

const editorialPolicy = await readJson("../content/growth/daily/.editorial-policy.json");
const consolidationRegistry = await readJson("../content/growth/consolidations.json");
const baseSeoOverrideRegistry = await readJson("../content/growth/seo-overrides.json");
const phase2SeoOverrideRegistry = await readJson("../content/growth/seo-overrides-phase2.json");
const phase3SeoOverrideRegistry = await readJson("../content/growth/seo-overrides-phase3.json");
const phase4SeoOverrideRegistry = await readJson("../content/growth/seo-overrides-phase4.json");
const phase5SeoOverrideRegistry = await readJson("../content/growth/seo-overrides-phase5.json");
const phase6SeoOverrideRegistry = await readJson("../content/growth/seo-overrides-phase6.json");
const phase7SeoOverrideRegistry = await readJson("../content/growth/seo-overrides-phase7.json");
const phase8SeoOverrideRegistry = await readJson("../content/growth/seo-overrides-phase8.json");
const seoOverrideRegistries = [
  baseSeoOverrideRegistry,
  phase2SeoOverrideRegistry,
  phase3SeoOverrideRegistry,
  phase4SeoOverrideRegistry,
  phase5SeoOverrideRegistry,
  phase6SeoOverrideRegistry,
  phase7SeoOverrideRegistry,
  phase8SeoOverrideRegistry,
];
const seoOverrideRegistry = {
  landings: seoOverrideRegistries.flatMap((registry) => registry.landings ?? []),
  articles: seoOverrideRegistries.flatMap((registry) => registry.articles ?? []),
};
const legacyLandings = await readJson("../content/growth/landings.json");
const incrementalLandings = await readJson("../content/growth/incremental-landings.json");
const rawDailyLandings = await readDailyRecords(".landings.json");
const rawLegacyArticles = await readJson("../content/growth/articles.json");
const incrementalArticles = await readJson("../content/growth/incremental-articles.json");
const rawDailyArticles = await readDailyRecords(".articles.json");
const replacedLegacyArticleKeys = new Set(["what-is-an-ai-employee"]);
const consolidatedArticleKeys = new Set((consolidationRegistry.articles ?? []).map((item) => item.key));
const consolidatedLandingKeys = new Set((consolidationRegistry.landings ?? []).map((item) => item.key));
const legacyArticles = rawLegacyArticles.filter((record) => !replacedLegacyArticleKeys.has(record.key));
const dailyLandings = rawDailyLandings.filter((record) => !consolidatedLandingKeys.has(record.key));
const dailyArticles = rawDailyArticles.filter((record) => !consolidatedArticleKeys.has(record.key));

function applySeoOverrides(records, overrides) {
  const byKey = new Map((overrides ?? []).map((override) => [override.key, override]));
  return records.map((record) => {
    const override = byKey.get(record.key);
    return override ? { ...record, ...override } : record;
  });
}

const baseLandings = [...legacyLandings, ...incrementalLandings, ...dailyLandings].filter(
  (record) => !consolidatedLandingKeys.has(record.key),
);
const baseArticles = [...legacyArticles, ...incrementalArticles, ...dailyArticles].filter(
  (record) => !consolidatedArticleKeys.has(record.key),
);
const landings = applySeoOverrides(baseLandings, seoOverrideRegistry.landings);
const articles = applySeoOverrides(baseArticles, seoOverrideRegistry.articles);
const editorialLandingKeys = new Set([...incrementalLandings, ...dailyLandings].map((record) => record.key));
const editorialArticleKeys = new Set([...incrementalArticles, ...dailyArticles].map((record) => record.key));
const editorialLandings = landings.filter((record) => editorialLandingKeys.has(record.key));
const editorialArticles = articles.filter((record) => editorialArticleKeys.has(record.key));

const errors = [];
const datePattern = /^\d{4}-\d{2}-\d{2}$/;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MIN_EDITORIAL_LANDING_WORDS = editorialPolicy.landingMinWordsPerLocale ?? 900;
const MIN_EDITORIAL_ARTICLE_WORDS = editorialPolicy.articleMinWordsPerLocale ?? 1200;
const EDITORIAL_METADATA_EFFECTIVE_DATE = editorialPolicy.effectiveFrom ?? "9999-12-31";
const allowedSearchIntents = new Set(["commercial", "informational", "transactional", "comparison"]);
const allowedConversionRoles = new Set(["demo", "process-analysis", "education", "evaluation"]);
const allowedOverrideDecisions = new Set(["KEEP", "EXPAND", "REPOSITION", "MERGE", "REDIRECT", "NOINDEX"]);

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

function validateStringList(value, label, minimum) {
  if (!Array.isArray(value) || value.length < minimum) {
    errors.push(`${label} needs at least ${minimum} item(s)`);
    return;
  }
  value.forEach((item, index) => requireText(item, `${label}[${index}]`));
}

function needsEditorialMetadata(record) {
  return typeof record.updatedAt === "string" && record.updatedAt >= EDITORIAL_METADATA_EFFECTIVE_DATE;
}

function validateEditorialMetadata(record, kind) {
  if (!needsEditorialMetadata(record)) return;

  const editorial = record.editorial;
  if (!editorial || typeof editorial !== "object") {
    errors.push(`${record.key} updated on/after ${EDITORIAL_METADATA_EFFECTIVE_DATE} requires editorial metadata`);
    return;
  }

  validateLocalized(editorial.primaryKeyword, `${record.key}.editorial.primaryKeyword`);
  validateStringList(editorial.supportingKeywords?.es, `${record.key}.editorial.supportingKeywords.es`, 3);
  validateStringList(editorial.supportingKeywords?.en, `${record.key}.editorial.supportingKeywords.en`, 3);
  requireText(editorial.searchIntent, `${record.key}.editorial.searchIntent`);
  if (editorial.searchIntent && !allowedSearchIntents.has(editorial.searchIntent)) {
    errors.push(`${record.key}.editorial.searchIntent is not allowed: ${editorial.searchIntent}`);
  }
  requireText(editorial.cluster, `${record.key}.editorial.cluster`);
  requireText(editorial.canonicalRole, `${record.key}.editorial.canonicalRole`);
  const expectedRole = kind === "landing" ? "landing" : "support";
  if (editorial.canonicalRole && editorial.canonicalRole !== expectedRole) {
    errors.push(`${record.key}.editorial.canonicalRole must be ${expectedRole}`);
  }
  requireText(editorial.conversionRole, `${record.key}.editorial.conversionRole`);
  if (editorial.conversionRole && !allowedConversionRoles.has(editorial.conversionRole)) {
    errors.push(`${record.key}.editorial.conversionRole is not allowed: ${editorial.conversionRole}`);
  }
  validateStringList(editorial.researchBasis, `${record.key}.editorial.researchBasis`, 1);
}

function validateSeoOverrides(overrides, baseRecords, kind) {
  const baseKeys = new Set(baseRecords.map((record) => record.key));
  for (const override of overrides ?? []) {
    requireText(override.key, `${kind}.seoOverride.key`);
    if (!baseKeys.has(override.key)) errors.push(`${kind} SEO override targets unknown key: ${override.key}`);
    requireText(override.decision, `${override.key}.decision`);
    if (override.decision && !allowedOverrideDecisions.has(override.decision)) {
      errors.push(`${override.key}.decision is not allowed: ${override.decision}`);
    }
    validateLocalized(override.primaryKeyword, `${override.key}.primaryKeyword`);
    validateStringList(override.supportingKeywords?.es, `${override.key}.supportingKeywords.es`, 3);
    validateStringList(override.supportingKeywords?.en, `${override.key}.supportingKeywords.en`, 3);
    validateStringList(override.researchBasis, `${override.key}.researchBasis`, 1);
    if (override.seoTitle) validateLocalized(override.seoTitle, `${override.key}.seoTitle`);
    if (override.seoDescription) validateLocalized(override.seoDescription, `${override.key}.seoDescription`);
    if (override.updatedAt && !datePattern.test(override.updatedAt)) {
      errors.push(`${override.key}.updatedAt must be YYYY-MM-DD`);
    }
  }
}

for (const entry of consolidationRegistry.articles ?? []) {
  requireText(entry.key, "consolidation.article.key");
  requireText(entry.decision, `${entry.key}.decision`);
  requireText(entry.destinations?.es, `${entry.key}.destinations.es`);
  requireText(entry.destinations?.en, `${entry.key}.destinations.en`);
}
for (const entry of consolidationRegistry.landings ?? []) {
  requireText(entry.key, "consolidation.landing.key");
  requireText(entry.decision, `${entry.key}.decision`);
  requireText(entry.destinations?.es, `${entry.key}.destinations.es`);
  requireText(entry.destinations?.en, `${entry.key}.destinations.en`);
}

seoOverrideRegistries.forEach((registry, index) => {
  validateUnique(registry.landings ?? [], (item) => item.key, `landing SEO override key in registry ${index + 1}`);
  validateUnique(registry.articles ?? [], (item) => item.key, `article SEO override key in registry ${index + 1}`);
});
validateSeoOverrides(seoOverrideRegistry.landings, baseLandings, "landing");
validateSeoOverrides(seoOverrideRegistry.articles, baseArticles, "article");

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
  validateEditorialMetadata(landing, "landing");
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
  validateEditorialMetadata(article, "article");
}

for (const landing of editorialLandings) {
  for (const locale of ["es", "en"]) {
    const words = wordCount(landingEditorialCopy(landing, locale));
    if (words < MIN_EDITORIAL_LANDING_WORDS) {
      errors.push(
        `${landing.key}.${locale} needs at least ${MIN_EDITORIAL_LANDING_WORDS} editorial words; found ${words}`,
      );
    }
  }
}

for (const article of editorialArticles) {
  for (const locale of ["es", "en"]) {
    const words = wordCount(articleEditorialCopy(article, locale));
    if (words < MIN_EDITORIAL_ARTICLE_WORDS) {
      errors.push(
        `${article.key}.${locale} needs at least ${MIN_EDITORIAL_ARTICLE_WORDS} editorial words; found ${words}`,
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
const articleByKey = new Map(articles.map((item) => [item.key, item]));
for (const landing of landings) {
  if (!articleKeys.has(landing.relatedArticleKey) && !consolidatedArticleKeys.has(landing.relatedArticleKey)) {
    errors.push(`${landing.key} links to unknown article ${landing.relatedArticleKey}`);
  }
  const article = articleByKey.get(landing.relatedArticleKey);
  if (landing.editorial && article?.editorial) {
    if (landing.editorial.cluster !== article.editorial.cluster) {
      errors.push(`${landing.key} and ${article.key} must share the same editorial cluster`);
    }
    for (const locale of ["es", "en"]) {
      const landingKeyword = landing.editorial.primaryKeyword?.[locale]?.trim().toLowerCase();
      const articleKeyword = article.editorial.primaryKeyword?.[locale]?.trim().toLowerCase();
      if (landingKeyword && articleKeyword && landingKeyword === articleKeyword) {
        errors.push(`${landing.key} and ${article.key} cannot target the same primary ${locale} keyword`);
      }
    }
  }
}
for (const article of articles) {
  if (!landingKeys.has(article.relatedLandingKey) && !consolidatedLandingKeys.has(article.relatedLandingKey)) {
    errors.push(`${article.key} links to unknown landing ${article.relatedLandingKey}`);
  }
}

if (errors.length) {
  console.error(`Growth content contract failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Growth content contract OK: ${landings.length} landing(s), ${articles.length} article(s). Editorial minimums: ${MIN_EDITORIAL_LANDING_WORDS} words/landing/locale, ${MIN_EDITORIAL_ARTICLE_WORDS} words/article/locale. Editorial metadata gate: ${EDITORIAL_METADATA_EFFECTIVE_DATE}. Active daily files: ${dailyLandings.length} landing(s), ${dailyArticles.length} article(s). Consolidated: ${consolidatedLandingKeys.size} landing(s), ${consolidatedArticleKeys.size} article(s). SEO override layers: ${seoOverrideRegistries.length}; effective declarations: ${(seoOverrideRegistry.landings ?? []).length} landing override declaration(s), ${(seoOverrideRegistry.articles ?? []).length} article override declaration(s).`,
);

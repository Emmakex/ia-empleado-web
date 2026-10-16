import { expect, test } from "@playwright/test";
import type { ComparisonKey } from "../lib/comparison-content";
import {
  auditedComparisonIndexContent,
  auditedComparisonRecords,
  comparisonSearchAudit,
} from "../lib/comparison-search-optimization";

const keys: ComparisonKey[] = ["chatbot", "ai-agent", "rpa", "traditional-automation", "ai-copilot"];
const locales = ["es", "en"] as const;

test("phase 4 comparison owners declare distinct researched intents", () => {
  for (const locale of locales) {
    const primaries = keys.map((key) => comparisonSearchAudit[key].primaryKeyword[locale].toLowerCase());
    expect(new Set(primaries).size).toBe(primaries.length);

    for (const key of keys) {
      const audit = comparisonSearchAudit[key];
      expect(audit.primaryKeyword[locale].length).toBeGreaterThan(4);
      expect(audit.supportingKeywords[locale].length).toBeGreaterThanOrEqual(3);
      expect(audit.researchBasis.join(" ")).toContain("Semrush");
      expect(["KEEP", "EXPAND", "REPOSITION"]).toContain(audit.decision);
    }
  }
});

test("phase 4 audited records preserve the five canonical comparison surfaces", () => {
  expect(auditedComparisonRecords).toHaveLength(5);
  expect(new Set(auditedComparisonRecords.map((record) => record.key))).toEqual(new Set(keys));

  for (const record of auditedComparisonRecords) {
    expect(record.slugs.es.length).toBeGreaterThan(1);
    expect(record.slugs.en.length).toBeGreaterThan(1);
    expect(record.seoDescription.es.length).toBeGreaterThan(70);
    expect(record.seoDescription.en.length).toBeGreaterThan(70);
    expect(record.shortAnswer.es.length).toBeGreaterThan(80);
    expect(record.shortAnswer.en.length).toBeGreaterThan(80);
  }
});

test("phase 4 comparison hub remains evaluation content instead of broad homepage ownership", () => {
  expect(auditedComparisonIndexContent.es.seoTitle.toLowerCase()).toContain("comparativas");
  expect(auditedComparisonIndexContent.en.seoTitle.toLowerCase()).toContain("comparisons");
  expect(auditedComparisonIndexContent.es.title.toLowerCase()).toContain("chatbots");
  expect(auditedComparisonIndexContent.en.title.toLowerCase()).toContain("chatbots");

  for (const key of keys) {
    expect(comparisonSearchAudit[key].primaryKeyword.es.toLowerCase()).not.toBe("agentes ia para empresas");
    expect(comparisonSearchAudit[key].primaryKeyword.en.toLowerCase()).not.toBe("ai agents for business");
  }
});

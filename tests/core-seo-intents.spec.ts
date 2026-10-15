import { expect, test } from "@playwright/test";
import type { EmployeeKey } from "../lib/employee-catalog";
import { getEmployeeSeoIntent } from "../lib/core-seo-intents";

const employeeKeys: EmployeeKey[] = ["customer-support", "administrative", "accounting-billing", "sales-sdr"];
const locales = ["es", "en"] as const;

test("phase 1 employee owners declare distinct researched intents", () => {
  for (const locale of locales) {
    const primaryKeywords = employeeKeys.map((key) => getEmployeeSeoIntent(key, locale).primaryKeyword.toLowerCase());
    expect(new Set(primaryKeywords).size).toBe(primaryKeywords.length);

    for (const key of employeeKeys) {
      const intent = getEmployeeSeoIntent(key, locale);
      expect(intent.primaryKeyword.length).toBeGreaterThan(3);
      expect(intent.supportingKeywords.length).toBeGreaterThanOrEqual(3);
      expect(intent.title.length).toBeGreaterThan(20);
      expect(intent.description.length).toBeGreaterThan(70);
      expect(intent.description.length).toBeLessThanOrEqual(170);
      expect(intent.researchBasis).toContain("Semrush");
      expect(["KEEP", "EXPAND", "REPOSITION"]).toContain(intent.decision);
    }
  }
});

test("phase 1 employee owners do not steal the homepage business-agent intent", () => {
  for (const locale of locales) {
    for (const key of employeeKeys) {
      const intent = getEmployeeSeoIntent(key, locale);
      expect(intent.primaryKeyword.toLowerCase()).not.toBe(locale === "es" ? "agentes ia para empresas" : "ai agents for business");
    }
  }
});

import type { Locale } from "./i18n";

export const GROWTH_ANALYTICS_ENDPOINT = "/api/growth-analytics";
export const GROWTH_DATA_LAYER_EVENT = "ia_growth_funnel";
export const GROWTH_ANALYTICS_SCHEMA_VERSION = 1;

export type GrowthAnalyticsEventName =
  | "growth_landing_view"
  | "growth_stage_view"
  | "growth_cta_click"
  | "growth_demo_form_view"
  | "growth_demo_submit"
  | "growth_lead_submit_success"
  | "growth_email_handoff"
  | "growth_lead_fallback";

export type GrowthFunnelStage = "hero" | "diagnosis" | "roi" | "pilot" | "final" | "demo";
export type GrowthFunnelTarget = "landing" | "process" | "roi" | "demo" | "email";

export type GrowthAttribution = {
  landingKey: string;
  locale: Locale;
  canonicalPath?: string;
  stage: GrowthFunnelStage;
  target: GrowthFunnelTarget;
  source?: string;
};

export type GrowthAnalyticsPayload = GrowthAttribution & {
  eventName: GrowthAnalyticsEventName;
};

type ValidationResult =
  | { ok: true; value: GrowthAnalyticsPayload }
  | { ok: false };

const eventNames = new Set<GrowthAnalyticsEventName>([
  "growth_landing_view",
  "growth_stage_view",
  "growth_cta_click",
  "growth_demo_form_view",
  "growth_demo_submit",
  "growth_lead_submit_success",
  "growth_email_handoff",
  "growth_lead_fallback",
]);
const stages = new Set<GrowthFunnelStage>(["hero", "diagnosis", "roi", "pilot", "final", "demo"]);
const targets = new Set<GrowthFunnelTarget>(["landing", "process", "roi", "demo", "email"]);

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function parseGrowthLandingSource(source: string | undefined): Pick<GrowthAttribution, "landingKey" | "stage"> | undefined {
  if (!source) return undefined;
  const match = /^seo-landing:([^:]{1,100}):(hero|fit|pilot|final)$/u.exec(source.trim());
  if (!match) return undefined;

  const rawStage = match[2];
  const stage: GrowthFunnelStage = rawStage === "fit" ? "diagnosis" : rawStage as GrowthFunnelStage;
  return { landingKey: match[1], stage };
}

export function validateGrowthAnalyticsPayload(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false };

  const candidate = input as Record<string, unknown>;
  const eventName = cleanText(candidate.eventName, 64) as GrowthAnalyticsEventName;
  const landingKey = cleanText(candidate.landingKey, 100);
  const locale: Locale | undefined = candidate.locale === "es" || candidate.locale === "en"
    ? candidate.locale
    : undefined;
  const canonicalPath = cleanText(candidate.canonicalPath, 220);
  const stage = cleanText(candidate.stage, 24) as GrowthFunnelStage;
  const target = cleanText(candidate.target, 24) as GrowthFunnelTarget;
  const source = cleanText(candidate.source, 100);

  if (
    !eventNames.has(eventName)
    || !landingKey
    || !locale
    || !stages.has(stage)
    || !targets.has(target)
    || (canonicalPath && !canonicalPath.startsWith("/"))
  ) {
    return { ok: false };
  }

  return {
    ok: true,
    value: {
      eventName,
      landingKey,
      locale,
      canonicalPath: canonicalPath || undefined,
      stage,
      target,
      source: source || undefined,
    },
  };
}

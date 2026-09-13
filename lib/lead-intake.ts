import type { Locale } from "./i18n";
import { isLeadIntent, type LeadIntent } from "./conversion-handoff";

export const LEAD_INTAKE_ENDPOINT = "/api/lead-intake";
export const LEAD_INTAKE_SCHEMA_VERSION = 1;
export const LEAD_CONSENT_VERSION = "lead-intake-v1";

export type LeadIntakeMode = "direct" | "email";

export type LeadIntakeCapability = {
  mode: LeadIntakeMode;
  configured: boolean;
  privacyNoticeUrl?: string;
};

export type LeadIntakePayload = {
  locale: Locale;
  name: string;
  email: string;
  company?: string;
  need: string;
  intent: LeadIntent;
  source: string;
  context?: string;
  consent: boolean;
  consentVersion: string;
  website?: string;
};

export type LeadIntakeAcceptedResponse = {
  ok: true;
  status: "accepted";
  leadId?: string;
};

export type LeadIntakeErrorCode =
  | "invalid_request"
  | "validation_error"
  | "origin_not_allowed"
  | "rate_limited"
  | "transport_unconfigured"
  | "delivery_failed";

export type LeadIntakeErrorResponse = {
  ok: false;
  code: LeadIntakeErrorCode;
  fallback?: "email";
};

export type LeadIntakeResponse = LeadIntakeAcceptedResponse | LeadIntakeErrorResponse;

type ValidationResult =
  | { ok: true; value: LeadIntakePayload }
  | { ok: false };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanText(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function cleanMultiline(value: unknown, maxLength: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]+/g, " ")
    .replace(/\r\n?/g, "\n")
    .trim()
    .slice(0, maxLength);
}

export function validateLeadIntakePayload(input: unknown): ValidationResult {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { ok: false };

  const candidate = input as Record<string, unknown>;
  const locale: Locale | undefined = candidate.locale === "es" || candidate.locale === "en"
    ? candidate.locale
    : undefined;
  const name = cleanText(candidate.name, 100);
  const email = cleanText(candidate.email, 160).toLowerCase();
  const company = cleanText(candidate.company, 140);
  const need = cleanMultiline(candidate.need, 1400);
  const rawIntent = cleanText(candidate.intent, 40);
  const source = cleanText(candidate.source, 80);
  const context = cleanText(candidate.context, 160);
  const consent = candidate.consent === true;
  const consentVersion = cleanText(candidate.consentVersion, 40);
  const website = cleanText(candidate.website, 200);

  if (!locale || !name || !EMAIL_PATTERN.test(email) || !need || !isLeadIntent(rawIntent)) {
    return { ok: false };
  }
  if (!source || !consent || consentVersion !== LEAD_CONSENT_VERSION) {
    return { ok: false };
  }

  return {
    ok: true,
    value: {
      locale,
      name,
      email,
      company: company || undefined,
      need,
      intent: rawIntent,
      source,
      context: context || undefined,
      consent,
      consentVersion,
      website: website || undefined,
    },
  };
}

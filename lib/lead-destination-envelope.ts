import type { Locale } from "./i18n";
import { isLeadIntent, type LeadIntent } from "./conversion-handoff";
import { LEAD_CONSENT_VERSION, LEAD_INTAKE_SCHEMA_VERSION } from "./lead-intake";

export type LeadDestinationEnvelope = {
  schemaVersion: number;
  leadId: string;
  receivedAt: string;
  locale: Locale;
  contact: {
    name: string;
    email: string;
    company?: string;
  };
  request: {
    intent: LeadIntent;
    source: string;
    context?: string;
    need: string;
  };
  consent: {
    accepted: true;
    version: string;
    privacyNoticeUrl: string;
  };
  origin: "iaempleado.com";
};

type EnvelopeValidationResult =
  | { ok: true; value: LeadDestinationEnvelope }
  | { ok: false };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LEAD_ID_PATTERN = /^lead_[a-zA-Z0-9_-]{8,80}$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: readonly string[]): boolean {
  const allowlist = new Set(allowed);
  return Object.keys(value).every((key) => allowlist.has(key));
}

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

function validHttpUrl(value: unknown): string | undefined {
  const clean = cleanText(value, 500);
  if (!clean) return undefined;
  try {
    const url = new URL(clean);
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

export function validateLeadDestinationEnvelope(input: unknown): EnvelopeValidationResult {
  if (!isRecord(input)) return { ok: false };
  if (!hasOnlyKeys(input, ["schemaVersion", "leadId", "receivedAt", "locale", "contact", "request", "consent", "origin"])) {
    return { ok: false };
  }

  if (input.schemaVersion !== LEAD_INTAKE_SCHEMA_VERSION) return { ok: false };
  const leadId = cleanText(input.leadId, 90);
  if (!LEAD_ID_PATTERN.test(leadId)) return { ok: false };

  const receivedAt = cleanText(input.receivedAt, 40);
  if (!receivedAt || Number.isNaN(Date.parse(receivedAt))) return { ok: false };

  const locale: Locale | undefined = input.locale === "es" || input.locale === "en" ? input.locale : undefined;
  if (!locale || input.origin !== "iaempleado.com") return { ok: false };

  if (!isRecord(input.contact) || !hasOnlyKeys(input.contact, ["name", "email", "company"])) return { ok: false };
  const name = cleanText(input.contact.name, 100);
  const email = cleanText(input.contact.email, 160).toLowerCase();
  const company = cleanText(input.contact.company, 140);
  if (!name || !EMAIL_PATTERN.test(email)) return { ok: false };

  if (!isRecord(input.request) || !hasOnlyKeys(input.request, ["intent", "source", "context", "need"])) return { ok: false };
  const rawIntent = cleanText(input.request.intent, 40);
  const source = cleanText(input.request.source, 80);
  const context = cleanText(input.request.context, 160);
  const need = cleanMultiline(input.request.need, 1400);
  if (!isLeadIntent(rawIntent) || !source || !need) return { ok: false };

  if (!isRecord(input.consent) || !hasOnlyKeys(input.consent, ["accepted", "version", "privacyNoticeUrl"])) return { ok: false };
  const consentVersion = cleanText(input.consent.version, 40);
  const privacyNoticeUrl = validHttpUrl(input.consent.privacyNoticeUrl);
  if (input.consent.accepted !== true || consentVersion !== LEAD_CONSENT_VERSION || !privacyNoticeUrl) {
    return { ok: false };
  }

  return {
    ok: true,
    value: {
      schemaVersion: LEAD_INTAKE_SCHEMA_VERSION,
      leadId,
      receivedAt: new Date(receivedAt).toISOString(),
      locale,
      contact: {
        name,
        email,
        company: company || undefined,
      },
      request: {
        intent: rawIntent,
        source,
        context: context || undefined,
        need,
      },
      consent: {
        accepted: true,
        version: consentVersion,
        privacyNoticeUrl,
      },
      origin: "iaempleado.com",
    },
  };
}

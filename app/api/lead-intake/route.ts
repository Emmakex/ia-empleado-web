import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  LEAD_INTAKE_SCHEMA_VERSION,
  validateLeadIntakePayload,
  type LeadIntakeCapability,
  type LeadIntakeResponse,
} from "../../../lib/lead-intake";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 5;
const DELIVERY_TIMEOUT_MS = 8_000;

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateBucket>();

function json<T>(body: T, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function validHttpUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value.trim());
    if (url.protocol !== "https:" && url.protocol !== "http:") return undefined;
    return url.toString();
  } catch {
    return undefined;
  }
}

function getTransportConfig() {
  const webhookUrl = validHttpUrl(process.env.LEAD_INTAKE_WEBHOOK_URL);
  const privacyNoticeUrl = validHttpUrl(process.env.LEAD_PRIVACY_NOTICE_URL);
  const token = process.env.LEAD_INTAKE_WEBHOOK_TOKEN?.trim() || undefined;

  return {
    webhookUrl,
    privacyNoticeUrl,
    token,
    configured: Boolean(webhookUrl && privacyNoticeUrl),
  };
}

function getCapability(): LeadIntakeCapability {
  const config = getTransportConfig();
  return config.configured
    ? { mode: "direct", configured: true, privacyNoticeUrl: config.privacyNoticeUrl }
    : { mode: "email", configured: false };
}

function originAllowed(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = forwardedHost || request.headers.get("host") || request.nextUrl.host;
    if (originUrl.host === requestHost) return true;

    if (
      process.env.NODE_ENV !== "production" &&
      (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1")
    ) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function clientIp(request: NextRequest): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || undefined;
}

function rateLimited(ip: string | undefined): boolean {
  if (!ip) return false;

  const now = Date.now();
  const existing = rateBuckets.get(ip);

  if (!existing || existing.resetAt <= now) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }

  existing.count += 1;
  rateBuckets.set(ip, existing);

  if (rateBuckets.size > 5_000) {
    for (const [key, bucket] of rateBuckets) {
      if (bucket.resetAt <= now) rateBuckets.delete(key);
    }
  }

  return existing.count > RATE_MAX_REQUESTS;
}

export async function GET() {
  return json(getCapability());
}

export async function POST(request: NextRequest) {
  if (!originAllowed(request)) {
    const body: LeadIntakeResponse = { ok: false, code: "origin_not_allowed" };
    return json(body, 403);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    const body: LeadIntakeResponse = { ok: false, code: "invalid_request" };
    return json(body, 413);
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    const body: LeadIntakeResponse = { ok: false, code: "invalid_request" };
    return json(body, 400);
  }

  const validation = validateLeadIntakePayload(input);
  if (!validation.ok) {
    const body: LeadIntakeResponse = { ok: false, code: "validation_error" };
    return json(body, 400);
  }

  // Honeypot submissions are acknowledged but never delivered downstream.
  if (validation.value.website) {
    const body: LeadIntakeResponse = { ok: true, status: "accepted" };
    return json(body, 202);
  }

  const config = getTransportConfig();
  if (!config.configured || !config.webhookUrl || !config.privacyNoticeUrl) {
    const body: LeadIntakeResponse = {
      ok: false,
      code: "transport_unconfigured",
      fallback: "email",
    };
    return json(body, 503);
  }

  if (rateLimited(clientIp(request))) {
    const body: LeadIntakeResponse = { ok: false, code: "rate_limited", fallback: "email" };
    return json(body, 429);
  }

  const leadId = `lead_${randomUUID()}`;
  const receivedAt = new Date().toISOString();
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DELIVERY_TIMEOUT_MS);

  try {
    const response = await fetch(config.webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "User-Agent": "IAEmpleadoWeb/lead-intake",
        "X-IA-Empleado-Event": "lead.created",
        ...(config.token ? { Authorization: `Bearer ${config.token}` } : {}),
      },
      body: JSON.stringify({
        schemaVersion: LEAD_INTAKE_SCHEMA_VERSION,
        leadId,
        receivedAt,
        locale: validation.value.locale,
        contact: {
          name: validation.value.name,
          email: validation.value.email,
          company: validation.value.company,
        },
        request: {
          intent: validation.value.intent,
          source: validation.value.source,
          context: validation.value.context,
          need: validation.value.need,
        },
        consent: {
          accepted: true,
          version: validation.value.consentVersion,
          privacyNoticeUrl: config.privacyNoticeUrl,
        },
        origin: "iaempleado.com",
      }),
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      console.error(`[lead-intake] delivery_failed leadId=${leadId} status=${response.status}`);
      const body: LeadIntakeResponse = { ok: false, code: "delivery_failed", fallback: "email" };
      return json(body, 502);
    }

    const body: LeadIntakeResponse = { ok: true, status: "accepted", leadId };
    return json(body, 202);
  } catch (error) {
    const reason = error instanceof Error ? error.name : "unknown";
    console.error(`[lead-intake] delivery_failed leadId=${leadId} reason=${reason}`);
    const body: LeadIntakeResponse = { ok: false, code: "delivery_failed", fallback: "email" };
    return json(body, 502);
  } finally {
    clearTimeout(timeout);
  }
}

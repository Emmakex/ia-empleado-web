import { NextRequest, NextResponse } from "next/server";
import {
  GROWTH_ANALYTICS_SCHEMA_VERSION,
  validateGrowthAnalyticsPayload,
} from "../../../lib/growth-analytics";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 4_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX_REQUESTS = 180;

type RateBucket = {
  count: number;
  resetAt: number;
};

const rateBuckets = new Map<string, RateBucket>();

function json(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function originAllowed(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    const originUrl = new URL(origin);
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const requestHost = forwardedHost || request.headers.get("host") || request.nextUrl.host;
    if (originUrl.host === requestHost) return true;

    return process.env.NODE_ENV !== "production"
      && (originUrl.hostname === "localhost" || originUrl.hostname === "127.0.0.1");
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

export async function POST(request: NextRequest) {
  if (!originAllowed(request)) return json({ ok: false, code: "origin_not_allowed" }, 403);

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: "invalid_request" }, 413);
  }

  if (rateLimited(clientIp(request))) {
    return json({ ok: false, code: "rate_limited" }, 429);
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, code: "invalid_request" }, 400);
  }

  const validation = validateGrowthAnalyticsPayload(input);
  if (!validation.ok) return json({ ok: false, code: "validation_error" }, 400);

  const event = {
    schemaVersion: GROWTH_ANALYTICS_SCHEMA_VERSION,
    receivedAt: new Date().toISOString(),
    ...validation.value,
  };

  // Intentionally no cookies, user identifiers, IP addresses or form fields are
  // written to the event. The host log is the first-party collection baseline;
  // dataLayer/custom DOM events expose the same contract to a future analytics sink.
  console.info(`[growth-analytics] ${JSON.stringify(event)}`);

  return json({ ok: true, status: "accepted" }, 202);
}

import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  BrevoDeliveryError,
  deliverLeadToBrevo,
  getBrevoDestinationConfig,
} from "../../../../../lib/brevo-lead-destination";
import { validateLeadDestinationEnvelope } from "../../../../../lib/lead-destination-envelope";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;

function json<T>(body: T, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function bearerToken(request: NextRequest): string | undefined {
  const authorization = request.headers.get("authorization")?.trim();
  if (!authorization?.startsWith("Bearer ")) return undefined;
  const token = authorization.slice("Bearer ".length).trim();
  return token || undefined;
}

function secureEqual(left: string | undefined, right: string | undefined): boolean {
  if (!left || !right) return false;
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) return false;
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export async function GET() {
  const config = getBrevoDestinationConfig();
  return json({ provider: "brevo", configured: config.configured });
}

export async function POST(request: NextRequest) {
  const config = getBrevoDestinationConfig();

  if (!config.configured || !config.webhookToken) {
    return json({ ok: false, code: "destination_unconfigured" }, 503);
  }

  if (!secureEqual(bearerToken(request), config.webhookToken)) {
    return json({ ok: false, code: "unauthorized" }, 401);
  }

  const contentLength = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(contentLength) && contentLength > MAX_BODY_BYTES) {
    return json({ ok: false, code: "invalid_request" }, 413);
  }

  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, code: "invalid_request" }, 400);
  }

  const validation = validateLeadDestinationEnvelope(input);
  if (!validation.ok) {
    return json({ ok: false, code: "validation_error" }, 400);
  }

  try {
    const result = await deliverLeadToBrevo(validation.value, config);
    return json({
      ok: true,
      provider: "brevo",
      leadId: validation.value.leadId,
      dealId: result.dealId,
    }, 202);
  } catch (error) {
    const step = error instanceof BrevoDeliveryError ? error.step : "unknown";
    const status = error instanceof BrevoDeliveryError && error.status ? ` status=${error.status}` : "";
    console.error(`[lead-destination:brevo] delivery_failed leadId=${validation.value.leadId} step=${step}${status}`);
    return json({ ok: false, code: "destination_delivery_failed" }, 502);
  }
}

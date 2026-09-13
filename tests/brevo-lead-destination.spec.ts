import { expect, test } from "@playwright/test";
import {
  buildBrevoContactPayload,
  buildBrevoDealPayload,
  buildBrevoNotePayload,
  deliverLeadToBrevo,
  type BrevoDestinationConfig,
} from "../lib/brevo-lead-destination";
import {
  validateLeadDestinationEnvelope,
  type LeadDestinationEnvelope,
} from "../lib/lead-destination-envelope";
import { LEAD_CONSENT_VERSION, LEAD_INTAKE_SCHEMA_VERSION } from "../lib/lead-intake";

function envelope(overrides: Partial<LeadDestinationEnvelope> = {}): LeadDestinationEnvelope {
  return {
    schemaVersion: LEAD_INTAKE_SCHEMA_VERSION,
    leadId: "lead_test-12345678",
    receivedAt: "2026-09-13T12:00:00.000Z",
    locale: "es",
    contact: {
      name: "Ana Pérez López",
      email: "ana@example.com",
      company: "Acme <Sales>",
    },
    request: {
      intent: "team",
      source: "team-builder-result",
      context: "Ventas & Reporting",
      need: "Seguimiento <comercial> con aprobación humana",
    },
    consent: {
      accepted: true,
      version: LEAD_CONSENT_VERSION,
      privacyNoticeUrl: "https://iaempleado.com/privacidad",
    },
    origin: "iaempleado.com",
    ...overrides,
  };
}

const config: BrevoDestinationConfig = {
  apiKey: "test-api-key",
  pipelineId: "pipeline-test",
  dealStageId: "stage-test",
  dealOwner: "owner@example.com",
  webhookToken: "test-webhook-token",
  configured: true,
};

test.describe("Web Phase 7C2A Brevo destination foundation", () => {
  test("strictly validates the canonical downstream envelope", () => {
    const valid = validateLeadDestinationEnvelope(envelope());
    expect(valid.ok).toBe(true);
    if (valid.ok) {
      expect(valid.value.contact.email).toBe("ana@example.com");
      expect(valid.value.request.intent).toBe("team");
      expect(valid.value.consent.version).toBe(LEAD_CONSENT_VERSION);
    }

    const extra = validateLeadDestinationEnvelope({ ...envelope(), unexpected: "nope" });
    expect(extra.ok).toBe(false);

    const wrongConsent = validateLeadDestinationEnvelope({
      ...envelope(),
      consent: { ...envelope().consent, version: "old-consent" },
    });
    expect(wrongConsent.ok).toBe(false);

    const wrongOrigin = validateLeadDestinationEnvelope({ ...envelope(), origin: "example.com" });
    expect(wrongOrigin.ok).toBe(false);
  });

  test("maps contact without enrolling it in marketing lists", () => {
    const payload = buildBrevoContactPayload(envelope());
    expect(payload).toEqual({
      email: "ana@example.com",
      attributes: {
        FIRSTNAME: "Ana",
        LASTNAME: "Pérez López",
      },
      updateEnabled: true,
    });
    expect(JSON.stringify(payload)).not.toContain("listIds");
    expect(JSON.stringify(payload)).not.toContain("marketing");
  });

  test("maps deal to explicit pipeline/stage and links the contact", () => {
    const payload = buildBrevoDealPayload(envelope(), 42, config);
    expect(payload.name).toContain("Acme <Sales>");
    expect(payload.attributes).toEqual({
      pipeline: "pipeline-test",
      deal_stage: "stage-test",
      deal_owner: "owner@example.com",
    });
    expect(payload.linkedContactsIds).toEqual([42]);
  });

  test("escapes CRM note content and preserves commercial provenance", () => {
    const payload = buildBrevoNotePayload(envelope(), 42, "deal-123");
    expect(payload.contactIds).toEqual([42]);
    expect(payload.dealIds).toEqual(["deal-123"]);
    expect(payload.text).toContain("lead_test-12345678");
    expect(payload.text).toContain("team-builder-result");
    expect(payload.text).toContain(LEAD_CONSENT_VERSION);
    expect(payload.text).toContain("https://iaempleado.com/privacidad");
    expect(payload.text).toContain("Ventas &amp; Reporting");
    expect(payload.text).toContain("Seguimiento &lt;comercial&gt; con aprobación humana");
    expect(payload.text).not.toContain("<Sales>");
  });

  test("delivers contact then deal then note through mocked Brevo calls", async () => {
    const calls: Array<{ url: string; method: string; headers: Headers; body?: string }> = [];
    const responses = [
      new Response(JSON.stringify({ id: 42 }), { status: 201, headers: { "content-type": "application/json" } }),
      new Response(JSON.stringify({ id: 42, email: "ana@example.com" }), { status: 200, headers: { "content-type": "application/json" } }),
      new Response(JSON.stringify({ id: "deal-123" }), { status: 201, headers: { "content-type": "application/json" } }),
      new Response(JSON.stringify({ id: "note-456" }), { status: 200, headers: { "content-type": "application/json" } }),
    ];

    const fetchImpl: typeof fetch = async (input, init = {}) => {
      const headers = new Headers(init.headers);
      calls.push({
        url: String(input),
        method: init.method || "GET",
        headers,
        body: typeof init.body === "string" ? init.body : undefined,
      });
      const response = responses.shift();
      if (!response) throw new Error("Unexpected Brevo request");
      return response;
    };

    const result = await deliverLeadToBrevo(envelope(), config, {
      fetchImpl,
      baseUrl: "https://brevo.test/v3",
      timeoutMs: 2_000,
    });

    expect(result).toEqual({ contactId: 42, dealId: "deal-123", noteId: "note-456" });
    expect(calls.map((call) => [call.method, call.url])).toEqual([
      ["POST", "https://brevo.test/v3/contacts"],
      ["GET", "https://brevo.test/v3/contacts/ana%40example.com?identifierType=email_id"],
      ["POST", "https://brevo.test/v3/crm/deals"],
      ["POST", "https://brevo.test/v3/crm/notes"],
    ]);

    for (const call of calls) {
      expect(call.headers.get("api-key")).toBe("test-api-key");
      expect(call.headers.get("accept")).toBe("application/json");
    }

    expect(JSON.parse(calls[0].body || "{}")).toMatchObject({
      email: "ana@example.com",
      updateEnabled: true,
    });
    expect(JSON.parse(calls[2].body || "{}")).toMatchObject({
      attributes: { pipeline: "pipeline-test", deal_stage: "stage-test" },
      linkedContactsIds: [42],
    });
    expect(JSON.parse(calls[3].body || "{}")).toMatchObject({
      contactIds: [42],
      dealIds: ["deal-123"],
    });
  });

  test("production route defaults to an unconfigured destination without secrets", async ({ request }) => {
    const health = await request.get("/api/internal/lead-destinations/brevo");
    expect(health.status()).toBe(200);
    expect(await health.json()).toEqual({ provider: "brevo", configured: false });

    const delivery = await request.post("/api/internal/lead-destinations/brevo", {
      data: envelope(),
      headers: { Authorization: "Bearer not-configured" },
    });
    expect(delivery.status()).toBe(503);
    expect(await delivery.json()).toEqual({ ok: false, code: "destination_unconfigured" });
  });
});

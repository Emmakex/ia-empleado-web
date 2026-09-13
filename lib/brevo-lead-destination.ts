import type { LeadDestinationEnvelope } from "./lead-destination-envelope";

export const BREVO_API_BASE_URL = "https://api.brevo.com/v3";
export const BREVO_DESTINATION_TIMEOUT_MS = 6_000;

export type BrevoDestinationConfig = {
  apiKey?: string;
  pipelineId?: string;
  dealStageId?: string;
  dealOwner?: string;
  webhookToken?: string;
  configured: boolean;
};

export type BrevoDeliveryResult = {
  contactId: number;
  dealId: string;
  noteId?: string;
};

export class BrevoDeliveryError extends Error {
  readonly step: string;
  readonly status?: number;

  constructor(step: string, status?: number) {
    super(`Brevo delivery failed at ${step}`);
    this.name = "BrevoDeliveryError";
    this.step = step;
    this.status = status;
  }
}

function envText(value: string | undefined): string | undefined {
  const clean = value?.trim();
  return clean || undefined;
}

export function getBrevoDestinationConfig(env: NodeJS.ProcessEnv = process.env): BrevoDestinationConfig {
  const apiKey = envText(env.BREVO_API_KEY);
  const pipelineId = envText(env.BREVO_PIPELINE_ID);
  const dealStageId = envText(env.BREVO_DEAL_STAGE_ID);
  const dealOwner = envText(env.BREVO_DEAL_OWNER);
  const webhookToken = envText(env.LEAD_INTAKE_WEBHOOK_TOKEN);

  return {
    apiKey,
    pipelineId,
    dealStageId,
    dealOwner,
    webhookToken,
    configured: Boolean(apiKey && pipelineId && dealStageId && webhookToken),
  };
}

function splitContactName(name: string): { firstName: string; lastName?: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || name.trim(),
    lastName: parts.length > 1 ? parts.slice(1).join(" ") : undefined,
  };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function line(label: string, value: string | undefined): string {
  return `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value || "—")}</p>`;
}

export function buildBrevoContactPayload(envelope: LeadDestinationEnvelope) {
  const { firstName, lastName } = splitContactName(envelope.contact.name);
  return {
    email: envelope.contact.email,
    attributes: {
      FIRSTNAME: firstName,
      ...(lastName ? { LASTNAME: lastName } : {}),
    },
    updateEnabled: true,
  };
}

export function buildBrevoDealPayload(
  envelope: LeadDestinationEnvelope,
  contactId: number,
  config: Pick<BrevoDestinationConfig, "pipelineId" | "dealStageId" | "dealOwner">,
) {
  if (!config.pipelineId || !config.dealStageId) {
    throw new BrevoDeliveryError("deal_config");
  }

  const subject = envelope.contact.company || envelope.contact.name;
  const name = `IA Empleado — ${subject} — ${envelope.request.intent}`.slice(0, 200);

  return {
    name,
    attributes: {
      pipeline: config.pipelineId,
      deal_stage: config.dealStageId,
      ...(config.dealOwner ? { deal_owner: config.dealOwner } : {}),
    },
    linkedContactsIds: [contactId],
  };
}

export function buildBrevoNotePayload(
  envelope: LeadDestinationEnvelope,
  contactId: number,
  dealId: string,
) {
  const text = [
    "<p><strong>IA Empleado — solicitud web</strong></p>",
    line("Lead ID", envelope.leadId),
    line("Recibido", envelope.receivedAt),
    line("Nombre", envelope.contact.name),
    line("Empresa", envelope.contact.company),
    line("Interés", envelope.request.intent),
    line("Origen", envelope.request.source),
    line("Contexto", envelope.request.context),
    line("Necesidad / proceso", envelope.request.need),
    line("Idioma", envelope.locale),
    line("Consentimiento", envelope.consent.version),
    line("Privacidad", envelope.consent.privacyNoticeUrl),
    line("Origen técnico", envelope.origin),
  ].join("");

  return {
    text,
    contactIds: [contactId],
    dealIds: [dealId],
  };
}

type FetchLike = typeof fetch;

type DeliveryOptions = {
  fetchImpl?: FetchLike;
  baseUrl?: string;
  timeoutMs?: number;
};

async function brevoRequest<T>(
  fetchImpl: FetchLike,
  url: string,
  apiKey: string,
  init: RequestInit,
  signal: AbortSignal,
  step: string,
): Promise<T | undefined> {
  let response: Response;
  try {
    response = await fetchImpl(url, {
      ...init,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "api-key": apiKey,
        ...(init.headers || {}),
      },
      cache: "no-store",
      signal,
    });
  } catch {
    throw new BrevoDeliveryError(step);
  }

  if (!response.ok) {
    throw new BrevoDeliveryError(step, response.status);
  }

  if (response.status === 204) return undefined;
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return undefined;

  try {
    return await response.json() as T;
  } catch {
    throw new BrevoDeliveryError(`${step}_response`);
  }
}

export async function deliverLeadToBrevo(
  envelope: LeadDestinationEnvelope,
  config: BrevoDestinationConfig,
  options: DeliveryOptions = {},
): Promise<BrevoDeliveryResult> {
  if (!config.configured || !config.apiKey || !config.pipelineId || !config.dealStageId) {
    throw new BrevoDeliveryError("config");
  }

  const fetchImpl = options.fetchImpl || fetch;
  const baseUrl = (options.baseUrl || BREVO_API_BASE_URL).replace(/\/$/, "");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || BREVO_DESTINATION_TIMEOUT_MS);

  try {
    await brevoRequest(
      fetchImpl,
      `${baseUrl}/contacts`,
      config.apiKey,
      { method: "POST", body: JSON.stringify(buildBrevoContactPayload(envelope)) },
      controller.signal,
      "contact_upsert",
    );

    const contact = await brevoRequest<{ id?: number }>(
      fetchImpl,
      `${baseUrl}/contacts/${encodeURIComponent(envelope.contact.email)}?identifierType=email_id`,
      config.apiKey,
      { method: "GET" },
      controller.signal,
      "contact_lookup",
    );

    if (!contact?.id || !Number.isInteger(contact.id)) {
      throw new BrevoDeliveryError("contact_lookup_response");
    }

    const deal = await brevoRequest<{ id?: string }>(
      fetchImpl,
      `${baseUrl}/crm/deals`,
      config.apiKey,
      {
        method: "POST",
        body: JSON.stringify(buildBrevoDealPayload(envelope, contact.id, config)),
      },
      controller.signal,
      "deal_create",
    );

    if (!deal?.id) {
      throw new BrevoDeliveryError("deal_create_response");
    }

    const note = await brevoRequest<{ id?: string }>(
      fetchImpl,
      `${baseUrl}/crm/notes`,
      config.apiKey,
      {
        method: "POST",
        body: JSON.stringify(buildBrevoNotePayload(envelope, contact.id, deal.id)),
      },
      controller.signal,
      "note_create",
    );

    return {
      contactId: contact.id,
      dealId: deal.id,
      noteId: note?.id,
    };
  } finally {
    clearTimeout(timeout);
  }
}

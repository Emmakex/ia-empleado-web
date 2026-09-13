import nodemailer from "nodemailer";
import { getLeadIntentLabel } from "./conversion-handoff";
import type { LeadIntakePayload } from "./lead-intake";

const DEFAULT_FROM_NAME = "IA Empleado";
const DEFAULT_SUBJECT_PREFIX = "[IA Empleado]";
const DEFAULT_APP_BASE_URL = "https://iaempleado.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type LeadSmtpConfig = {
  host?: string;
  port?: number;
  secure?: boolean;
  user?: string;
  password?: string;
  fromEmail?: string;
  fromName: string;
  recipients: string[];
  subjectPrefix: string;
  appBaseUrl: string;
  configured: boolean;
};

export type LeadSmtpDeliveryInput = {
  leadId: string;
  receivedAt: string;
  payload: LeadIntakePayload;
  privacyNoticeUrl: string;
};

export type LeadSmtpDeliveryResult = {
  messageId: string;
  acceptedCount: number;
  rejectedCount: number;
  pendingCount: number;
};

function cleanHeader(value: string | undefined, fallback = "", maxLength = 120): string {
  const clean = (value || fallback)
    .replace(/[\r\n\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
  return clean || fallback;
}

function parsePort(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const port = Number.parseInt(value.trim(), 10);
  return Number.isInteger(port) && port > 0 && port <= 65_535 ? port : undefined;
}

function parseSecure(value: string | undefined): boolean | undefined {
  if (!value) return undefined;
  const normalized = value.trim().toLowerCase();
  if (normalized === "true" || normalized === "1" || normalized === "yes") return true;
  if (normalized === "false" || normalized === "0" || normalized === "no") return false;
  return undefined;
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

function validEmail(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const email = cleanHeader(value, "", 160).toLowerCase();
  return EMAIL_PATTERN.test(email) ? email : undefined;
}

function parseRecipients(value: string | undefined): string[] {
  if (!value) return [];
  return Array.from(new Set(
    value
      .split(/[;,]/)
      .map((candidate) => validEmail(candidate))
      .filter((candidate): candidate is string => Boolean(candidate)),
  ));
}

export function getLeadSmtpConfig(): LeadSmtpConfig {
  const host = cleanHeader(process.env.SMTP_HOST, "", 255) || undefined;
  const port = parsePort(process.env.SMTP_PORT);
  const secure = parseSecure(process.env.SMTP_SECURE);
  const user = cleanHeader(process.env.SMTP_USER, "", 255) || undefined;
  const password = process.env.SMTP_PASSWORD || undefined;
  const fromEmail = validEmail(process.env.SMTP_FROM_EMAIL);
  const fromName = cleanHeader(process.env.SMTP_FROM_NAME, DEFAULT_FROM_NAME, 100);
  const recipients = parseRecipients(process.env.LEAD_NOTIFICATION_TO);
  const subjectPrefix = cleanHeader(process.env.LEAD_NOTIFICATION_SUBJECT_PREFIX, DEFAULT_SUBJECT_PREFIX, 80);
  const appBaseUrl = validHttpUrl(process.env.APP_BASE_URL) || DEFAULT_APP_BASE_URL;

  return {
    host,
    port,
    secure,
    user,
    password,
    fromEmail,
    fromName,
    recipients,
    subjectPrefix,
    appBaseUrl,
    configured: Boolean(
      host
      && port
      && secure !== undefined
      && user
      && password
      && fromEmail
      && recipients.length > 0,
    ),
  };
}

function display(value: string | undefined, fallback = "No indicado"): string {
  return value?.trim() || fallback;
}

function safeDiagnostic(value: unknown, fallback = "none", maxLength = 160): string {
  const raw = typeof value === "string" ? value : fallback;
  return raw
    .replace(/[\r\n\u0000-\u001f\u007f]+/g, " ")
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "<email>")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength) || fallback;
}

export function buildLeadNotification(input: LeadSmtpDeliveryInput, _config: LeadSmtpConfig) {
  const { payload, leadId } = input;
  const interest = getLeadIntentLabel("es", payload.intent);

  // Diagnostic profile: keep the automated message intentionally close to a
  // normal human-to-human mailbox message while Hostinger's spam trigger is
  // isolated. Rich HTML, URLs, external Reply-To and custom X-* headers are
  // deliberately omitted and will be reintroduced one at a time after a
  // confirmed inbox delivery.
  const subject = "IA Empleado - nuevo contacto";
  const text = [
    "Nuevo contacto desde IA Empleado.",
    "",
    `Nombre: ${payload.name}`,
    `Email: ${payload.email}`,
    `Empresa: ${display(payload.company)}`,
    `Interés: ${interest}`,
    "",
    "Necesidad:",
    payload.need,
    "",
    `Referencia: ${leadId}`,
  ].join("\n");

  return { subject, text };
}

export async function deliverLeadViaSmtp(input: LeadSmtpDeliveryInput): Promise<LeadSmtpDeliveryResult> {
  const config = getLeadSmtpConfig();
  if (
    !config.configured
    || !config.host
    || !config.port
    || config.secure === undefined
    || !config.user
    || !config.password
    || !config.fromEmail
  ) {
    throw new Error("smtp_unconfigured");
  }

  const message = buildLeadNotification(input, config);
  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    requireTLS: !config.secure,
    auth: {
      user: config.user,
      pass: config.password,
    },
    connectionTimeout: 8_000,
    greetingTimeout: 8_000,
    socketTimeout: 10_000,
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  const info = await transporter.sendMail({
    from: {
      name: config.fromName,
      address: config.fromEmail,
    },
    to: config.recipients,
    subject: message.subject,
    text: message.text,
  });

  const acceptedCount = Array.isArray(info.accepted) ? info.accepted.length : 0;
  const rejectedCount = Array.isArray(info.rejected) ? info.rejected.length : 0;
  const pendingCount = Array.isArray(info.pending) ? info.pending.length : 0;
  const messageId = safeDiagnostic(info.messageId, "unknown", 160);
  const response = safeDiagnostic(info.response, "none", 160);

  if (
    acceptedCount !== config.recipients.length
    || rejectedCount > 0
    || pendingCount > 0
  ) {
    console.error(
      `[lead-smtp] partial_delivery leadId=${input.leadId} accepted=${acceptedCount}/${config.recipients.length} rejected=${rejectedCount} pending=${pendingCount} response=${response}`,
    );
    throw new Error(`smtp_partial_delivery accepted=${acceptedCount} rejected=${rejectedCount} pending=${pendingCount}`);
  }

  console.info(
    `[lead-smtp] accepted leadId=${input.leadId} messageId=${messageId} accepted=${acceptedCount} rejected=${rejectedCount} pending=${pendingCount} response=${response}`,
  );

  return { messageId, acceptedCount, rejectedCount, pendingCount };
}

import nodemailer from "nodemailer";
import { getLeadIntentLabel } from "./conversion-handoff";
import type { LeadIntakePayload } from "./lead-intake";

const DEFAULT_FROM_NAME = "IA Empleado";
const DEFAULT_SUBJECT_PREFIX = "[IA Empleado]";
const DEFAULT_APP_BASE_URL = "https://iaempleado.com";
const REFERENCE_DEMO_URL = "https://kairoseth.iaempleado.com";
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

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
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

export function buildLeadNotification(input: LeadSmtpDeliveryInput, config: LeadSmtpConfig) {
  const { payload, leadId, receivedAt, privacyNoticeUrl } = input;
  const interest = getLeadIntentLabel("es", payload.intent);
  const companyOrName = display(payload.company, payload.name);
  const subject = cleanHeader(
    `${config.subjectPrefix} Nuevo lead — ${companyOrName} — ${interest}`,
    `${DEFAULT_SUBJECT_PREFIX} Nuevo lead`,
    180,
  );

  const text = [
    "Nuevo lead recibido desde iaempleado.com",
    "",
    `Lead ID: ${leadId}`,
    `Fecha: ${receivedAt}`,
    `Idioma: ${payload.locale.toUpperCase()}`,
    `Empresa: ${display(payload.company)}`,
    `Contacto: ${payload.name}`,
    `Email: ${payload.email}`,
    `Interés: ${interest}`,
    `Origen: ${payload.source}`,
    `Contexto: ${display(payload.context, "No especificado")}`,
    "",
    "Necesidad / proceso:",
    payload.need,
    "",
    `Consentimiento: ${payload.consentVersion}`,
    `Privacidad: ${privacyNoticeUrl}`,
    `Origen técnico: ${config.appBaseUrl}`,
    `Demo de referencia: ${REFERENCE_DEMO_URL}`,
  ].join("\n");

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:6px 12px 6px 0;font-weight:700;vertical-align:top;white-space:nowrap">${escapeHtml(label)}</td>
      <td style="padding:6px 0;vertical-align:top">${escapeHtml(value)}</td>
    </tr>`;

  const html = `<!doctype html>
<html lang="es">
  <body style="margin:0;padding:24px;background:#f7f7f8;font-family:Arial,Helvetica,sans-serif;color:#151515">
    <div style="max-width:720px;margin:0 auto;background:#ffffff;border:1px solid #e6e6e8;border-radius:16px;padding:28px">
      <div style="font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#666">IA Empleado · Lead comercial</div>
      <h1 style="margin:10px 0 20px;font-size:24px;line-height:1.2">Nuevo lead recibido</h1>
      <table role="presentation" style="border-collapse:collapse;width:100%;font-size:14px;line-height:1.5">
        ${row("Lead ID", leadId)}
        ${row("Fecha", receivedAt)}
        ${row("Idioma", payload.locale.toUpperCase())}
        ${row("Empresa", display(payload.company))}
        ${row("Contacto", payload.name)}
        ${row("Email", payload.email)}
        ${row("Interés", interest)}
        ${row("Origen", payload.source)}
        ${row("Contexto", display(payload.context, "No especificado"))}
      </table>
      <h2 style="margin:24px 0 8px;font-size:16px">Necesidad / proceso</h2>
      <div style="white-space:pre-wrap;background:#f7f7f8;border-radius:10px;padding:14px;font-size:14px;line-height:1.55">${escapeHtml(payload.need)}</div>
      <div style="margin-top:24px;padding-top:18px;border-top:1px solid #ececef;font-size:12px;line-height:1.6;color:#666">
        Consentimiento: ${escapeHtml(payload.consentVersion)}<br>
        Privacidad: <a href="${escapeHtml(privacyNoticeUrl)}">${escapeHtml(privacyNoticeUrl)}</a><br>
        Origen técnico: <a href="${escapeHtml(config.appBaseUrl)}">${escapeHtml(config.appBaseUrl)}</a><br>
        Demo de referencia: <a href="${REFERENCE_DEMO_URL}">${REFERENCE_DEMO_URL}</a>
      </div>
    </div>
  </body>
</html>`;

  return { subject, text, html };
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
    replyTo: {
      name: payloadSafeReplyName(input.payload.name),
      address: input.payload.email,
    },
    subject: message.subject,
    text: message.text,
    html: message.html,
    headers: {
      "X-IA-Empleado-Lead-Id": input.leadId,
      "X-IA-Empleado-Event": "lead.created",
    },
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

function payloadSafeReplyName(name: string): string {
  return cleanHeader(name, "Contacto IA Empleado", 100);
}

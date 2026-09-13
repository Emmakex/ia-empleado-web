import type { Locale } from "./i18n";

export const LEAD_CONTACT_EMAIL = "hola@iaempleado.com";

export type LeadIntent =
  | "demo"
  | "team"
  | "process"
  | "employee"
  | "integration"
  | "private-deployment";

export type LeadHandoffContext = {
  intent: LeadIntent;
  source: string;
  context?: string;
};

export type LeadMailFields = {
  name: string;
  email: string;
  company?: string;
  need: string;
};

export type SearchParamRecord = Record<string, string | string[] | undefined>;

const allowedIntents = new Set<LeadIntent>([
  "demo",
  "team",
  "process",
  "employee",
  "integration",
  "private-deployment",
]);

const intentLabels: Record<Locale, Record<LeadIntent, string>> = {
  es: {
    demo: "Solicitud de demo",
    team: "Diseño de Equipo IA",
    process: "Mejora de proceso",
    employee: "Empleado IA",
    integration: "Integración",
    "private-deployment": "Implantación privada",
  },
  en: {
    demo: "Demo request",
    team: "AI Team design",
    process: "Process improvement",
    employee: "AI Employee",
    integration: "Integration",
    "private-deployment": "Private deployment",
  },
};

const pageContent = {
  es: {
    seoTitle: "Solicitar una demo de IA Empleado",
    seoDescription: "Cuéntanos qué proceso, equipo o integración quieres evaluar y prepara una solicitud de demo con el contexto adecuado.",
    eyebrow: "SIGUIENTE PASO",
    title: "Hablemos del proceso real que quieres mejorar.",
    description: "Comparte el contexto mínimo para que la conversación empiece por tu operación, tus sistemas y los límites de autoridad que necesitas.",
    contextTitle: "Contexto conservado",
    contextFallback: "Solicitud general de demo",
    formTitle: "Prepara tu solicitud",
    formDescription: "Por ahora la web no almacena ni transmite estos datos a un CRM. Al continuar se abrirá tu aplicación de correo con la información preparada para enviarla a IA Empleado.",
    directFormDescription: "Envía la solicitud directamente al equipo de IA Empleado. Solo activamos esta vía cuando existe un destino de recepción real y una información de privacidad publicada.",
    fields: {
      name: "Nombre",
      email: "Email de contacto",
      company: "Empresa (opcional)",
      need: "¿Qué proceso, equipo o necesidad quieres evaluar?",
    },
    submit: "Preparar correo",
    directSubmit: "Enviar solicitud",
    sending: "Enviando solicitud…",
    privacy: "Tus datos permanecen en este navegador hasta que decidas enviarlos desde tu aplicación de correo.",
    directPrivacy: "Los datos se transmitirán únicamente para gestionar esta solicitud de contacto.",
    consent: "Acepto que los datos introducidos se utilicen para responder a esta solicitud y confirmo que he podido consultar la información de privacidad.",
    privacyLink: "Ver información de privacidad",
    successTitle: "Solicitud recibida",
    successBody: "La solicitud se ha entregado al canal configurado de IA Empleado. Conserva este navegador abierto si quieres seguir explorando la web.",
    fallbackTitle: "No hemos podido entregar la solicitud directamente",
    fallbackBody: "No se ha confirmado la entrega al canal directo. Puedes enviar ahora el mismo contenido desde tu aplicación de correo.",
    fallbackAction: "Preparar correo alternativo",
    retry: "Reintentar envío",
    fallback: "También puedes escribir directamente a",
    back: "Seguir explorando la web",
  },
  en: {
    seoTitle: "Request an IA Empleado demo",
    seoDescription: "Tell us which process, team or integration you want to evaluate and prepare a demo request with the right context.",
    eyebrow: "NEXT STEP",
    title: "Let’s talk about the real process you want to improve.",
    description: "Share the minimum context so the conversation starts with your operation, systems and the authority boundaries you need.",
    contextTitle: "Context preserved",
    contextFallback: "General demo request",
    formTitle: "Prepare your request",
    formDescription: "The website does not currently store or transmit these details to a CRM. Continuing opens your email application with the information prepared for you to send to IA Empleado.",
    directFormDescription: "Send the request directly to the IA Empleado team. This path is enabled only when a real receiving destination and published privacy information are configured.",
    fields: {
      name: "Name",
      email: "Contact email",
      company: "Company (optional)",
      need: "Which process, team or need do you want to evaluate?",
    },
    submit: "Prepare email",
    directSubmit: "Send request",
    sending: "Sending request…",
    privacy: "Your details stay in this browser until you choose to send them from your email application.",
    directPrivacy: "The details will be transmitted only to handle this contact request.",
    consent: "I agree that the details entered may be used to respond to this request and confirm that I have been able to review the privacy information.",
    privacyLink: "View privacy information",
    successTitle: "Request received",
    successBody: "The request has been delivered to the configured IA Empleado channel. You can keep this browser open if you want to continue exploring the website.",
    fallbackTitle: "We could not deliver the request directly",
    fallbackBody: "Delivery to the direct channel was not confirmed. You can send the same content now from your email application.",
    fallbackAction: "Prepare fallback email",
    retry: "Retry submission",
    fallback: "You can also email us directly at",
    back: "Keep exploring the website",
  },
} as const;

function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function cleanParam(value: string | undefined, maxLength: number): string | undefined {
  if (!value) return undefined;
  const clean = value.replace(/[\r\n\t]+/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength);
  return clean || undefined;
}

export function isLeadIntent(value: string | undefined): value is LeadIntent {
  return Boolean(value && allowedIntents.has(value as LeadIntent));
}

export function normalizeLeadHandoffParams(searchParams: SearchParamRecord): LeadHandoffContext {
  const rawIntent = cleanParam(firstParam(searchParams.intent), 40);
  const rawSource = cleanParam(firstParam(searchParams.source), 80);
  const rawContext = cleanParam(firstParam(searchParams.context), 160);

  return {
    intent: isLeadIntent(rawIntent) ? rawIntent : "demo",
    source: rawSource ?? "direct",
    context: rawContext,
  };
}

export function requestDemoPath(
  locale: Locale,
  context: Partial<LeadHandoffContext> = {},
): string {
  const path = locale === "es" ? "/solicitar-demo" : "/en/request-demo";
  const params = new URLSearchParams();

  if (context.intent) params.set("intent", context.intent);
  if (context.source) params.set("source", cleanParam(context.source, 80) ?? "direct");
  if (context.context) params.set("context", cleanParam(context.context, 160) ?? "");

  const query = params.toString();
  return query ? `${path}?${query}` : path;
}

export function getLeadIntentLabel(locale: Locale, intent: LeadIntent): string {
  return intentLabels[locale][intent];
}

export function getConversionHandoffContent(locale: Locale) {
  return pageContent[locale];
}

export function buildLeadMailto(
  locale: Locale,
  context: LeadHandoffContext,
  fields: LeadMailFields,
): string {
  const intentLabel = getLeadIntentLabel(locale, context.intent);
  const subject = locale === "es"
    ? `IA Empleado — ${intentLabel}${fields.company?.trim() ? ` — ${fields.company.trim()}` : ""}`
    : `IA Empleado — ${intentLabel}${fields.company?.trim() ? ` — ${fields.company.trim()}` : ""}`;

  const lines = locale === "es"
    ? [
        `Nombre: ${fields.name.trim()}`,
        `Email: ${fields.email.trim()}`,
        `Empresa: ${fields.company?.trim() || "No indicada"}`,
        `Interés: ${intentLabel}`,
        `Origen: ${context.source}`,
        `Contexto: ${context.context || "No especificado"}`,
        "",
        "Necesidad / proceso:",
        fields.need.trim(),
        "",
        "Origen técnico: iaempleado.com",
      ]
    : [
        `Name: ${fields.name.trim()}`,
        `Email: ${fields.email.trim()}`,
        `Company: ${fields.company?.trim() || "Not provided"}`,
        `Interest: ${intentLabel}`,
        `Source: ${context.source}`,
        `Context: ${context.context || "Not specified"}`,
        "",
        "Need / process:",
        fields.need.trim(),
        "",
        "Technical origin: iaempleado.com",
      ];

  return `mailto:${LEAD_CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join("\n"))}`;
}

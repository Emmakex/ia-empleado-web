import type { EmployeeKey } from "./employee-catalog";
import type { Locale } from "./i18n";

export type CoreSeoIntent = {
  primaryKeyword: string;
  supportingKeywords: string[];
  searchIntent: "commercial" | "commercial-investigation";
  decision: "KEEP" | "EXPAND" | "REPOSITION";
  title: string;
  description: string;
  researchBasis: string;
};

const employeeIntents: Record<EmployeeKey, Record<Locale, CoreSeoIntent>> = {
  "customer-support": {
    es: {
      primaryKeyword: "agentes ia atención al cliente",
      supportingKeywords: ["agente ia atención al cliente", "ia atención al cliente", "ia para atención al cliente"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "Agente IA para Atención al Cliente | IA Empleado",
      description: "Agente IA para atención al cliente que trabaja con CRM, ecommerce y ticketing, automatiza tareas de soporte y escala excepciones a personas.",
      researchBasis: "Semrush ES 2026-10-15: 140 búsquedas/mes para 'agentes ia atención al cliente' (KD 11); 40 para 'agente ia atención al cliente' (KD 21).",
    },
    en: {
      primaryKeyword: "ai customer service agent",
      supportingKeywords: ["ai agents for customer service", "ai customer support agent", "customer service ai agent"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "AI Customer Service Agent | AI Employee",
      description: "AI customer service agent for support workflows across CRM, ecommerce and ticketing, with explicit permissions, traceability and human escalation.",
      researchBasis: "Semrush UK 2026-10-15: 140 searches/month for 'ai customer service agent' (KD 47); 90 for 'ai agents for customer service'.",
    },
  },
  administrative: {
    es: {
      primaryKeyword: "agente ia administrativo",
      supportingKeywords: ["automatización administrativa con ia", "ia para administración", "empleado ia administrativo"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "Agente IA Administrativo | Automatización administrativa",
      description: "Agente IA administrativo para correo, documentos, registros y back office, con permisos mínimos, trazabilidad y aprobación humana en acciones sensibles.",
      researchBasis: "Semrush ES 2026-10-15: 30 búsquedas/mes para 'agente ia administrativo'.",
    },
    en: {
      primaryKeyword: "ai administrative assistant",
      supportingKeywords: ["administrative ai agent", "ai administration automation", "ai back office automation"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "AI Administrative Assistant for Business | AI Employee",
      description: "AI administrative assistant for email, documents, records and back-office workflows with least-privilege access, traceability and human approval.",
      researchBasis: "Semrush UK 2026-10-15: 10 searches/month for 'ai administrative assistant'; adjacent variants had insufficient reported volume.",
    },
  },
  "accounting-billing": {
    es: {
      primaryKeyword: "ia para contabilidad",
      supportingKeywords: ["ia contable", "agente ia contabilidad", "empleado ia contabilidad"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "IA para Contabilidad y Facturación | IA Empleado",
      description: "IA para contabilidad y facturación: valida facturas, prepara registros, detecta incidencias y coordina revisiones sin delegar autoridad financiera ilimitada.",
      researchBasis: "Semrush ES 2026-10-15: 210 búsquedas/mes para 'ia para contabilidad' (KD 46) y 110 para 'ia contable' (KD 50). La automatización contable y de facturas pertenece a la landing de proceso.",
    },
    en: {
      primaryKeyword: "ai for accounting",
      supportingKeywords: ["ai accountant", "ai accounting agent", "accounting ai agent"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "AI for Accounting and Billing | AI Employee",
      description: "AI for accounting and billing workflows: validate invoices, prepare records, detect exceptions and keep consequential financial actions under human control.",
      researchBasis: "Semrush UK 2026-10-15: 390 searches/month for 'ai for accounting' (KD 63) and 1,000 for 'ai accountant' (KD 47). Accounting and invoice automation belong to the process landing.",
    },
  },
  "sales-sdr": {
    es: {
      primaryKeyword: "agente ia ventas",
      supportingKeywords: ["ia para ventas", "agente ia comercial", "sdr con ia"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "Agente IA para Ventas y SDR | IA Empleado",
      description: "Agente IA para ventas y SDR que ayuda con research, cualificación, CRM y seguimiento comercial, manteniendo negociación y decisiones sensibles bajo control humano.",
      researchBasis: "Semrush ES 2026-10-15: 50 búsquedas/mes para 'agente ia ventas' (KD 19) y 50 para 'ia para ventas' (KD 37). La automatización de pedidos pertenece al propietario de proceso Day 25.",
    },
    en: {
      primaryKeyword: "ai sdr",
      supportingKeywords: ["ai sales agent", "ai agent for sales", "sales ai agent"],
      searchIntent: "commercial-investigation",
      decision: "REPOSITION",
      title: "AI SDR and Sales Agent | AI Employee",
      description: "AI SDR and sales agent for account research, lead qualification, CRM updates and follow-up, with bounded permissions and human control over consequential decisions.",
      researchBasis: "Semrush UK 2026-10-15: 390 searches/month for 'ai sdr' (KD 57) and 210 for 'ai sales agent' (KD 47). Sales-order automation is intentionally assigned to the Day 25 process owner.",
    },
  },
};

export function getEmployeeSeoIntent(employeeKey: EmployeeKey, locale: Locale): CoreSeoIntent {
  return employeeIntents[employeeKey][locale];
}

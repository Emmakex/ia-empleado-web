import type { StaticImageData } from "next/image";
import type { EmployeeKey } from "./employee-catalog";
import type { Locale } from "./i18n";
import claraCanonical from "../public/branding/characters/clara-canonical.webp";
import alexCanonical from "../public/branding/characters/alex-canonical.webp";
import sofiaCanonical from "../public/branding/characters/sofia-canonical.webp";
import javierCanonical from "../public/branding/characters/javier-canonical.webp";

export type BrandRoleMotif = "conversation" | "operations" | "ledger" | "pipeline";

export type BrandRoleVisualFamily = {
  motif: BrandRoleMotif;
  flow: [string, string, string];
  systems: [string, string, string];
  humanControl: string;
};

export type BrandCharacter = {
  id: "clara" | "alex" | "sofia" | "javier";
  employeeKey: EmployeeKey;
  name: string;
  asset: StaticImageData;
  role: string;
  shortRole: string;
  accent: "blue" | "violet" | "teal" | "amber";
  promise: string;
  visualFamily: BrandRoleVisualFamily;
};

const characters = {
  es: [
    {
      id: "clara",
      employeeKey: "customer-support",
      name: "Clara",
      asset: claraCanonical,
      role: "Atención al Cliente IA",
      shortRole: "Atención al Cliente",
      accent: "blue",
      promise: "Responde, acompaña y escala excepciones con contexto.",
      visualFamily: {
        motif: "conversation",
        flow: ["Entrada", "Contexto", "Resolución"],
        systems: ["Helpdesk", "CRM", "Email"],
        humanControl: "Escala excepciones cuando corresponde",
      },
    },
    {
      id: "alex",
      employeeKey: "administrative",
      name: "Alex",
      asset: alexCanonical,
      role: "Administrativo IA",
      shortRole: "Administración",
      accent: "violet",
      promise: "Organiza tareas, documentos y seguimiento operativo.",
      visualFamily: {
        motif: "operations",
        flow: ["Solicitud", "Documento", "Seguimiento"],
        systems: ["ERP", "Documentos", "Email"],
        humanControl: "Valida cambios sensibles antes de ejecutar",
      },
    },
    {
      id: "sofia",
      employeeKey: "accounting-billing",
      name: "Sofía",
      asset: sofiaCanonical,
      role: "Contabilidad y Facturación IA",
      shortRole: "Contabilidad",
      accent: "teal",
      promise: "Controla, valida y prepara información financiera.",
      visualFamily: {
        motif: "ledger",
        flow: ["Factura", "Validación", "Registro"],
        systems: ["ERP", "Facturas", "Datos"],
        humanControl: "Revisión humana para excepciones y cierres",
      },
    },
    {
      id: "javier",
      employeeKey: "sales-sdr",
      name: "Javier",
      asset: javierCanonical,
      role: "Comercial / SDR IA",
      shortRole: "Comercial / SDR",
      accent: "amber",
      promise: "Prospecta, cualifica y mantiene el seguimiento comercial.",
      visualFamily: {
        motif: "pipeline",
        flow: ["Lead", "Cualificación", "Seguimiento"],
        systems: ["CRM", "Email", "Pipeline"],
        humanControl: "Aprobación humana antes de compromisos",
      },
    },
  ],
  en: [
    {
      id: "clara",
      employeeKey: "customer-support",
      name: "Clara",
      asset: claraCanonical,
      role: "AI Customer Support",
      shortRole: "Customer Support",
      accent: "blue",
      promise: "Responds, supports and escalates exceptions with context.",
      visualFamily: {
        motif: "conversation",
        flow: ["Request", "Context", "Resolution"],
        systems: ["Helpdesk", "CRM", "Email"],
        humanControl: "Escalates exceptions when required",
      },
    },
    {
      id: "alex",
      employeeKey: "administrative",
      name: "Alex",
      asset: alexCanonical,
      role: "AI Administrative",
      shortRole: "Administration",
      accent: "violet",
      promise: "Organizes tasks, documents and operational follow-up.",
      visualFamily: {
        motif: "operations",
        flow: ["Request", "Document", "Follow-up"],
        systems: ["ERP", "Documents", "Email"],
        humanControl: "Validates sensitive changes before execution",
      },
    },
    {
      id: "sofia",
      employeeKey: "accounting-billing",
      name: "Sofía",
      asset: sofiaCanonical,
      role: "AI Accounting & Billing",
      shortRole: "Accounting & Billing",
      accent: "teal",
      promise: "Checks, validates and prepares financial information.",
      visualFamily: {
        motif: "ledger",
        flow: ["Invoice", "Validation", "Record"],
        systems: ["ERP", "Invoices", "Data"],
        humanControl: "Human review for exceptions and close",
      },
    },
    {
      id: "javier",
      employeeKey: "sales-sdr",
      name: "Javier",
      asset: javierCanonical,
      role: "AI Sales / SDR",
      shortRole: "Sales / SDR",
      accent: "amber",
      promise: "Prospects, qualifies and maintains commercial follow-up.",
      visualFamily: {
        motif: "pipeline",
        flow: ["Lead", "Qualification", "Follow-up"],
        systems: ["CRM", "Email", "Pipeline"],
        humanControl: "Human approval before commitments",
      },
    },
  ],
} satisfies Record<Locale, BrandCharacter[]>;

export function getBrandCharacters(locale: Locale): BrandCharacter[] {
  return characters[locale];
}

export function getBrandCharacterByEmployeeKey(employeeKey: EmployeeKey, locale: Locale): BrandCharacter | undefined {
  return characters[locale].find((character) => character.employeeKey === employeeKey);
}

export function getBrandCharacterForProfileKey(profileKey: string, locale: Locale): BrandCharacter | undefined {
  return characters[locale].find((character) => character.employeeKey === profileKey);
}

export function getBrandCharacterForActorLabel(actor: string, locale: Locale): BrandCharacter | undefined {
  const normalized = actor.toLocaleLowerCase(locale === "es" ? "es" : "en");
  const key = normalized.includes("atención al cliente") || normalized.includes("customer support")
    ? "customer-support"
    : normalized.includes("administrativo") || normalized.includes("administrative")
      ? "administrative"
      : normalized.includes("contabilidad") || normalized.includes("facturación") || normalized.includes("accounting") || normalized.includes("billing")
        ? "accounting-billing"
        : normalized.includes("comercial sdr") || normalized.includes("sales sdr")
          ? "sales-sdr"
          : undefined;

  return key ? getBrandCharacterForProfileKey(key, locale) : undefined;
}

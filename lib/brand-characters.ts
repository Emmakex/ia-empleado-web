import type { EmployeeKey } from "./employee-catalog";
import type { Locale } from "./i18n";

export type BrandCharacter = {
  id: "clara" | "alex" | "sofia" | "javier";
  employeeKey: EmployeeKey;
  name: string;
  asset: string;
  role: string;
  shortRole: string;
  accent: "blue" | "violet" | "teal" | "amber";
  promise: string;
};

const characters = {
  es: [
    { id: "clara", employeeKey: "customer-support", name: "Clara", asset: "/branding/characters/clara-canonical.webp", role: "Atención al Cliente IA", shortRole: "Atención al Cliente", accent: "blue", promise: "Responde, acompaña y escala excepciones con contexto." },
    { id: "alex", employeeKey: "administrative", name: "Alex", asset: "/branding/characters/alex-canonical.webp", role: "Administrativo IA", shortRole: "Administración", accent: "violet", promise: "Organiza tareas, documentos y seguimiento operativo." },
    { id: "sofia", employeeKey: "accounting-billing", name: "Sofía", asset: "/branding/characters/sofia-canonical.webp", role: "Contabilidad y Facturación IA", shortRole: "Contabilidad", accent: "teal", promise: "Controla, valida y prepara información financiera." },
    { id: "javier", employeeKey: "sales-sdr", name: "Javier", asset: "/branding/characters/javier-canonical.webp", role: "Comercial / SDR IA", shortRole: "Comercial / SDR", accent: "amber", promise: "Prospecta, cualifica y mantiene el seguimiento comercial." },
  ],
  en: [
    { id: "clara", employeeKey: "customer-support", name: "Clara", asset: "/branding/characters/clara-canonical.webp", role: "AI Customer Support", shortRole: "Customer Support", accent: "blue", promise: "Responds, supports and escalates exceptions with context." },
    { id: "alex", employeeKey: "administrative", name: "Alex", asset: "/branding/characters/alex-canonical.webp", role: "AI Administrative", shortRole: "Administration", accent: "violet", promise: "Organizes tasks, documents and operational follow-up." },
    { id: "sofia", employeeKey: "accounting-billing", name: "Sofía", asset: "/branding/characters/sofia-canonical.webp", role: "AI Accounting & Billing", shortRole: "Accounting & Billing", accent: "teal", promise: "Checks, validates and prepares financial information." },
    { id: "javier", employeeKey: "sales-sdr", name: "Javier", asset: "/branding/characters/javier-canonical.webp", role: "AI Sales / SDR", shortRole: "Sales / SDR", accent: "amber", promise: "Prospects, qualifies and maintains commercial follow-up." },
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

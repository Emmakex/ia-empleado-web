import type { Locale } from "./i18n";

type LocalizedText = Record<Locale, string>;

export type EditorialSource = {
  label: LocalizedText;
  publisher: string;
  href: string;
};

const sourcesByKey: Record<string, EditorialSource[]> = {
  "ai-accounts-receivable-automation": [
    {
      label: {
        es: "Morosidad en operaciones comerciales: marco y contexto europeo",
        en: "Late payment in commercial transactions: European framework and context",
      },
      publisher: "European Commission",
      href: "https://single-market-economy.ec.europa.eu/smes/challenges-and-resilience/late-payment_en",
    },
    {
      label: {
        es: "EU Payment Observatory: análisis y evidencia sobre plazos de pago",
        en: "EU Payment Observatory: analysis and evidence on payment behaviour",
      },
      publisher: "European Commission",
      href: "https://single-market-economy.ec.europa.eu/smes/challenges-and-resilience/late-payment/eu-payment-observatory/observatory-analysis_en",
    },
  ],
  "ai-bank-reconciliation": [
    {
      label: {
        es: "Estrategia de pagos del Eurosistema: pagos B2B, datos y conciliación",
        en: "Eurosystem payments strategy: B2B payments, data and reconciliation",
      },
      publisher: "European Central Bank",
      href: "https://www.ecb.europa.eu/press/pubbydate/2026/html/ecb.eurosystemcomprehensivepaymentsstrategy202603.en.html",
    },
    {
      label: {
        es: "Glosario del BCE: definición de conciliación",
        en: "ECB glossary: reconciliation definition",
      },
      publisher: "European Central Bank",
      href: "https://www.ecb.europa.eu/services/glossary/html/act7r.en.html",
    },
  ],
};

export function getEditorialSources(key: string): EditorialSource[] {
  return sourcesByKey[key] ?? [];
}

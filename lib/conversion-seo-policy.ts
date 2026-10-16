import type { Locale } from "./i18n";

export type Phase5SurfaceKey =
  | "collaboration"
  | "team-builder"
  | "process-analyzer"
  | "roi-calculator"
  | "request-demo"
  | "legal-notice"
  | "privacy-policy";

export type Phase5IndexDecision = "INDEX_DISTINCT_OWNER" | "NOINDEX";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type Phase5SeoPolicy = {
  decision: Phase5IndexDecision;
  index: boolean;
  follow: boolean;
  includeInSitemap: boolean;
  primaryIntent: LocalizedText;
  primaryKeyword: LocalizedText;
  supportingKeywords: LocalizedList;
  researchBasis: string[];
  seoTitle?: LocalizedText;
  seoDescription?: LocalizedText;
};

export const phase5SeoPolicies: Record<Phase5SurfaceKey, Phase5SeoPolicy> = {
  collaboration: {
    decision: "INDEX_DISTINCT_OWNER",
    index: true,
    follow: true,
    includeInSitemap: true,
    primaryIntent: {
      es: "entender cómo colaboran varios agentes IA dentro de un proceso empresarial con sistemas y control humano",
      en: "understand how multiple AI agents collaborate inside a business workflow with systems and human control",
    },
    primaryKeyword: { es: "agentes ia trabajando juntos", en: "ai agents working together" },
    supportingKeywords: {
      es: ["sistemas multiagente", "sistema multiagente", "colaboración entre agentes ia"],
      en: ["multi agent systems", "ai agent collaboration", "multi agent workflows"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: sistema multiagente 50 búsquedas/mes, KD 37; sistemas multiagente 50, KD 31. Las variantes exactas de agentes IA trabajando juntos no mostraron volumen medible en el lote probado.",
      "Semrush UK 2026-10-16: multi agent systems 390 búsquedas/mes, KD 52; AI agents working together 20; AI agent collaboration 20.",
      "Ownership boundary: this page demonstrates coordinated multi-agent workflow mechanics; /equipos-ia owns team composition and Growth pages own process-specific automation demand.",
    ],
    seoTitle: {
      es: "Cómo trabajan juntos los agentes IA | Flujos multiagente con control humano",
      en: "AI agents working together | Multi-agent workflows with human control",
    },
    seoDescription: {
      es: "Explora cómo varios agentes IA se pasan tareas y contexto entre CRM, ERP, email y personas para resolver procesos con permisos, trazabilidad y control humano.",
      en: "See how multiple AI agents hand off tasks and context across CRM, ERP, email and people to complete workflows with permissions, traceability and human control.",
    },
  },
  "team-builder": {
    decision: "INDEX_DISTINCT_OWNER",
    index: true,
    follow: true,
    includeInSitemap: true,
    primaryIntent: {
      es: "configurar de forma interactiva una composición orientativa de agentes o Empleados IA",
      en: "interactively configure an indicative AI agent or AI Employee team composition",
    },
    primaryKeyword: { es: "configurador de equipo ia", en: "ai team builder" },
    supportingKeywords: {
      es: ["diseñar equipo ia", "crear equipo ia", "equipo ia"],
      en: ["build ai team", "design ai team", "ai team"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: equipo IA 30 búsquedas/mes; configurador/diseñar/crear equipo IA no mostraron volumen medible en el lote probado.",
      "Semrush UK 2026-10-16: AI team builder 20 búsquedas/mes; AI team 110, KD 44.",
      "Ownership boundary: /equipos-ia and /en/ai-teams own team-category evaluation; this route owns the interactive configuration/tool intent and must not replace the team hub.",
    ],
    seoTitle: {
      es: "Configura tu Equipo IA | Team Builder de agentes y Empleados IA",
      en: "AI Team Builder | Design a team of AI agents and AI Employees",
    },
    seoDescription: {
      es: "Configura sector, problemas, departamentos y sistemas para obtener una composición orientativa de agentes IA, roles, handoffs y controles sin activar nada automáticamente.",
      en: "Choose sector, problems, departments and systems to build an explainable AI team map with roles, handoffs and controls without activating anything automatically.",
    },
  },
  "process-analyzer": {
    decision: "INDEX_DISTINCT_OWNER",
    index: true,
    follow: true,
    includeInSitemap: true,
    primaryIntent: {
      es: "analizar un proceso empresarial y comparar un rediseño orientativo con IA, reglas y control humano",
      en: "analyse a business process and compare an indicative redesign using AI, rules and human control",
    },
    primaryKeyword: { es: "analizador de procesos", en: "process analyzer" },
    supportingKeywords: {
      es: ["analizar procesos empresariales", "mejorar procesos con ia", "rediseño de procesos con ia"],
      en: ["business process analyzer", "improve process with ai", "ai process redesign"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: analizador de procesos 50 búsquedas/mes, KD 12.",
      "Semrush UK 2026-10-16: process analyzer 30 búsquedas/mes; business process analyzer returned 0 in the tested batch.",
      "Ownership boundary: this route owns analysis/tool intent; process-automation Growth owners retain implementation/commercial search intent.",
    ],
    seoTitle: {
      es: "Analizador de procesos | Detecta qué automatizar con IA y qué mantener humano",
      en: "Process Analyzer | Find what to automate with AI and what to keep human",
    },
    seoDescription: {
      es: "Analiza un proceso empresarial con patrones explicables y compara qué pasos automatizar con reglas, asistir con IA o mantener bajo responsabilidad humana.",
      en: "Analyse a business workflow with explainable patterns and compare which steps to automate with rules, assist with AI or keep under human responsibility.",
    },
  },
  "roi-calculator": {
    decision: "INDEX_DISTINCT_OWNER",
    index: true,
    follow: true,
    includeInSitemap: true,
    primaryIntent: {
      es: "calcular de forma transparente el ROI potencial de una automatización con IA usando datos y supuestos del usuario",
      en: "calculate the potential ROI of AI automation transparently using user-provided data and assumptions",
    },
    primaryKeyword: { es: "calculadora roi ia", en: "ai roi calculator" },
    supportingKeywords: {
      es: ["roi ia", "roi de ia", "roi automatización ia"],
      en: ["ai roi", "automation roi calculator", "artificial intelligence roi"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: ROI IA 20 búsquedas/mes; ROI de IA 10. La variante exacta calculadora ROI IA no mostró volumen medible en el lote probado.",
      "Semrush UK 2026-10-16: AI ROI calculator 30 búsquedas/mes; AI ROI 110, KD 36; automation ROI calculator 20; artificial intelligence ROI 10.",
      "The page exposes formulas, editable assumptions and non-guarantee language, so it is a genuine utility owner rather than a thin conversion page.",
    ],
    seoTitle: {
      es: "Calculadora ROI de IA | Estima tiempo, valor potencial y retorno",
      en: "AI ROI Calculator | Estimate time, potential value and return",
    },
    seoDescription: {
      es: "Calcula el ROI potencial de automatizar con IA a partir de volumen, tiempo, coste y supuestos editables. Fórmulas visibles y sin promesas de ahorro garantizado.",
      en: "Calculate potential AI automation ROI from volume, time, cost and editable assumptions. Visible formulas and no guaranteed-savings claims.",
    },
  },
  "request-demo": {
    decision: "NOINDEX",
    index: false,
    follow: true,
    includeInSitemap: false,
    primaryIntent: {
      es: "conversión: solicitar contacto o una demo desde contexto comercial existente",
      en: "conversion: request contact or a demo from an existing commercial journey",
    },
    primaryKeyword: { es: "", en: "" },
    supportingKeywords: { es: [], en: [] },
    researchBasis: [
      "Conversion endpoint with query-context handoff; it does not need to compete for generic AI demo or business-AI intent.",
      "Semrush UK 2026-10-16 showed small generic demand for AI demo (30/month) and AI agent demo (10/month), but those queries do not justify indexing a lead form as the canonical information owner.",
    ],
  },
  "legal-notice": {
    decision: "NOINDEX",
    index: false,
    follow: true,
    includeInSitemap: false,
    primaryIntent: { es: "información legal obligatoria para usuarios", en: "required legal information for users" },
    primaryKeyword: { es: "", en: "" },
    supportingKeywords: { es: [], en: [] },
    researchBasis: [
      "Legal utility content remains publicly accessible and crawlable through links but should not consume search-result ownership or sitemap priority.",
    ],
  },
  "privacy-policy": {
    decision: "NOINDEX",
    index: false,
    follow: true,
    includeInSitemap: false,
    primaryIntent: { es: "información de privacidad y tratamiento de datos para usuarios", en: "privacy and data-processing information for users" },
    primaryKeyword: { es: "", en: "" },
    supportingKeywords: { es: [], en: [] },
    researchBasis: [
      "Privacy utility content remains publicly accessible and crawlable through links but should not consume search-result ownership or sitemap priority.",
    ],
  },
};

export function getPhase5SeoPolicy(key: Phase5SurfaceKey) {
  return phase5SeoPolicies[key];
}

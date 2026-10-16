import type { Locale } from "./i18n";
import {
  comparisonIndexContent,
  comparisonRecords,
  type ComparisonKey,
  type ComparisonRecord,
} from "./comparison-content";

type LocalizedText = Record<Locale, string>;

type ComparisonSearchAudit = {
  decision: "KEEP" | "EXPAND" | "REPOSITION";
  primaryKeyword: LocalizedText;
  supportingKeywords: Record<Locale, string[]>;
  researchBasis: string[];
  seoTitle?: LocalizedText;
  seoDescription?: LocalizedText;
  title?: LocalizedText;
  intro?: LocalizedText;
  shortAnswer?: LocalizedText;
};

export const comparisonSearchAudit: Record<ComparisonKey, ComparisonSearchAudit> = {
  chatbot: {
    decision: "REPOSITION",
    primaryKeyword: { es: "agente ia vs chatbot", en: "ai agent vs chatbot" },
    supportingKeywords: {
      es: ["chatbot vs agente ia", "empleado ia vs chatbot", "agentes ia vs chatbot"],
      en: ["chatbot vs ai agent", "ai employee vs chatbot", "ai agents vs chatbots"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: agente IA vs chatbot 30 búsquedas/mes; las variantes basadas en Empleado IA no mostraron volumen medible en el lote analizado.",
      "Semrush UK 2026-10-16: AI agent vs chatbot 70 búsquedas/mes; chatbot vs AI agent 10 búsquedas/mes.",
      "Phase 2 already merged historical Growth comparison duplicates into this dedicated owner.",
    ],
    seoTitle: {
      es: "Agente IA vs chatbot: diferencias y cuándo elegir cada uno | IA Empleado",
      en: "AI agent vs chatbot: differences and when to use each | IA Empleado",
    },
    seoDescription: {
      es: "Agente IA vs chatbot: compara alcance, herramientas, autonomía, supervisión y trazabilidad, y entiende cuándo un Empleado IA aporta trabajo operativo gobernado.",
      en: "AI agent vs chatbot: compare scope, tools, autonomy, oversight and traceability, and see where a governed AI Employee model fits operational work.",
    },
    title: {
      es: "Agente IA vs chatbot: dónde encaja un Empleado IA",
      en: "AI agent vs chatbot: where an AI Employee fits",
    },
    intro: {
      es: "Un chatbot prioriza la conversación. Un agente IA puede usar herramientas y avanzar tareas. En IA Empleado, esas capacidades agentivas se organizan como un rol empresarial con responsabilidades, permisos, controles y handoffs claros. Esta comparativa ayuda a elegir el patrón adecuado sin presentar uno como sustituto universal del otro.",
      en: "A chatbot prioritises conversation. An AI agent can use tools and advance tasks. In IA Empleado, those agentic capabilities are organised as a business role with clear responsibilities, permissions, controls and handoffs. This comparison helps choose the right pattern without presenting either one as a universal replacement for the other.",
    },
    shortAnswer: {
      es: "Usa un chatbot cuando el objetivo principal sea conversar, informar o recoger datos. Usa un agente IA —o un Empleado IA como rol gobernado— cuando el trabajo continúe después de la conversación y deba coordinar acciones, sistemas y controles.",
      en: "Use a chatbot when the main goal is conversation, information or data collection. Use an AI agent—or an AI Employee as a governed role—when work continues after the conversation and must coordinate actions, systems and controls.",
    },
  },
  "ai-agent": {
    decision: "EXPAND",
    primaryKeyword: { es: "empleado ia vs agente ia", en: "ai employee vs ai agent" },
    supportingKeywords: {
      es: ["empleado ia y agente ia", "diferencia empleado ia agente ia", "agente ia empresarial"],
      en: ["ai employee and ai agent", "difference ai employee ai agent", "business ai agent"],
    },
    researchBasis: [
      "Semrush ES/UK 2026-10-16: the exact Empleado IA / AI Employee comparison variants did not show measurable volume in the tested batch.",
      "This page remains useful as a product-definition and evaluation boundary because the informational owner for 'qué es un agente IA' lives in the blog while Home owns broad business-agent intent.",
    ],
    seoTitle: {
      es: "Empleado IA vs agente IA: diferencia entre capacidad técnica y rol | IA Empleado",
      en: "AI Employee vs AI agent: technical capability vs business role | IA Empleado",
    },
    seoDescription: {
      es: "Empleado IA vs agente IA: diferencia un patrón técnico agentivo de un rol empresarial con responsabilidades, permisos, owner humano, controles y handoffs.",
      en: "AI Employee vs AI agent: distinguish an agentic technical pattern from a business role with responsibilities, permissions, human ownership, controls and handoffs.",
    },
    shortAnswer: {
      es: "Agente IA describe principalmente una capacidad técnica: interpretar objetivos, usar herramientas y avanzar tareas. Empleado IA describe cómo convertir esas capacidades en un rol empresarial gobernado, con responsabilidades, límites de autoridad y supervisión comprensibles para la organización.",
      en: "AI agent mainly describes a technical capability: interpreting goals, using tools and advancing tasks. AI Employee describes how those capabilities become a governed business role with responsibilities, authority boundaries and oversight the organisation can understand.",
    },
  },
  rpa: {
    decision: "REPOSITION",
    primaryKeyword: { es: "rpa vs ia", en: "rpa vs ai" },
    supportingKeywords: {
      es: ["agente ia vs rpa", "empleado ia vs rpa", "rpa e inteligencia artificial"],
      en: ["ai agent vs rpa", "ai employee vs rpa", "rpa and artificial intelligence"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: RPA vs IA 20 búsquedas/mes.",
      "Semrush UK 2026-10-16: RPA vs AI 40 búsquedas/mes; AI agent vs RPA 10 búsquedas/mes.",
      "Historical RPA comparison Growth content was consolidated in Phase 2, so this dedicated page is the comparison owner.",
    ],
    seoTitle: {
      es: "RPA vs IA: diferencias, casos de uso y cuándo combinarlas | IA Empleado",
      en: "RPA vs AI: differences, use cases and when to combine them | IA Empleado",
    },
    seoDescription: {
      es: "RPA vs IA: compara procesos deterministas, lenguaje, excepciones, mantenimiento, supervisión y cómo un agente o Empleado IA puede usar RPA como herramienta.",
      en: "RPA vs AI: compare deterministic processes, language, exceptions, maintenance, oversight and how an AI agent or AI Employee can use RPA as a tool.",
    },
    title: {
      es: "RPA vs IA: cuándo usar automatización determinista, agentes o ambos",
      en: "RPA vs AI: when to use deterministic automation, agents or both",
    },
    shortAnswer: {
      es: "RPA encaja mejor en pasos repetitivos, estables y deterministas. La IA aporta más cuando hay lenguaje, contexto o excepciones. En muchos procesos la mejor arquitectura combina ambos: la IA interpreta y coordina; RPA ejecuta tramos legacy bien definidos.",
      en: "RPA fits repetitive, stable and deterministic steps. AI adds more value when language, context or exceptions matter. Many workflows combine both: AI interprets and coordinates while RPA executes well-defined legacy steps.",
    },
  },
  "traditional-automation": {
    decision: "KEEP",
    primaryKeyword: { es: "ia vs automatización tradicional", en: "ai vs traditional automation" },
    supportingKeywords: {
      es: ["automatización con ia vs automatización tradicional", "ia y automatización tradicional", "automatización inteligente vs tradicional"],
      en: ["traditional automation vs ai", "ai automation vs traditional automation", "intelligent automation vs traditional automation"],
    },
    researchBasis: [
      "Semrush ES/UK 2026-10-16: exact traditional-automation comparison variants showed no meaningful measured volume in the tested batch.",
      "The page is retained as decision-support content because it answers a distinct architecture question and does not compete with broad process-automation owners.",
    ],
    seoTitle: {
      es: "IA vs automatización tradicional: cuándo usar reglas, IA o ambas | IA Empleado",
      en: "AI vs traditional automation: when to use rules, AI or both | IA Empleado",
    },
    seoDescription: {
      es: "IA vs automatización tradicional: decide entre reglas deterministas e interpretación con IA según variabilidad, lenguaje, riesgo, mantenimiento y control humano.",
      en: "AI vs traditional automation: choose deterministic rules or AI interpretation based on variability, language, risk, maintenance and human control.",
    },
    title: {
      es: "IA vs automatización tradicional: automatiza con reglas lo que pueda resolverse con reglas",
      en: "AI vs traditional automation: use rules where rules are enough",
    },
  },
  "ai-copilot": {
    decision: "REPOSITION",
    primaryKeyword: { es: "agente ia vs copiloto ia", en: "ai agent vs copilot" },
    supportingKeywords: {
      es: ["copiloto ia vs agente ia", "empleado ia vs copiloto ia", "agente ia y copiloto"],
      en: ["copilot vs ai agent", "ai employee vs copilot", "ai agent and copilot"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: exact agent/copilot comparison variants showed no reported volume in the tested batch.",
      "Semrush UK 2026-10-16: AI agent vs copilot 10 búsquedas/mes.",
      "The page owns the assistance-vs-delegation decision and is distinct from the generic AI-agent definition article.",
    ],
    seoTitle: {
      es: "Agente IA vs copiloto IA: asistencia o delegación gobernada | IA Empleado",
      en: "AI agent vs copilot: assistance or governed delegation | IA Empleado",
    },
    seoDescription: {
      es: "Agente IA vs copiloto IA: compara quién inicia el trabajo, nivel de delegación, supervisión humana, integración, handoffs y trabajo en segundo plano.",
      en: "AI agent vs copilot: compare who initiates work, delegation level, human oversight, integration, handoffs and background execution.",
    },
    title: {
      es: "Agente IA vs copiloto IA: asistencia directa frente a delegación gobernada",
      en: "AI agent vs copilot: direct assistance versus governed delegation",
    },
    shortAnswer: {
      es: "El copiloto mantiene a una persona como operador principal en cada paso. Un agente IA puede recibir trabajo delegado y avanzar de forma acotada. IA Empleado organiza esa delegación como un rol con responsabilidades, permisos y puntos de control humanos definidos.",
      en: "A copilot keeps a person as the primary operator at each step. An AI agent can receive delegated work and progress within boundaries. IA Empleado organises that delegation as a role with defined responsibilities, permissions and human control points.",
    },
  },
};

function applyAudit(record: ComparisonRecord): ComparisonRecord {
  const audit = comparisonSearchAudit[record.key];
  return {
    ...record,
    ...(audit.seoTitle ? { seoTitle: audit.seoTitle } : {}),
    ...(audit.seoDescription ? { seoDescription: audit.seoDescription } : {}),
    ...(audit.title ? { title: audit.title } : {}),
    ...(audit.intro ? { intro: audit.intro } : {}),
    ...(audit.shortAnswer ? { shortAnswer: audit.shortAnswer } : {}),
  };
}

export const auditedComparisonRecords = comparisonRecords.map(applyAudit);

export const auditedComparisonIndexContent = {
  es: {
    ...comparisonIndexContent.es,
    seoTitle: "Comparativas de IA para empresas: agentes, chatbots, RPA y copilotos | IA Empleado",
    seoDescription: "Compara agentes IA, chatbots, RPA, automatización tradicional y copilotos para elegir el enfoque adecuado según proceso, riesgo, sistemas y control humano.",
    title: "Compara agentes IA, chatbots, RPA y copilotos antes de automatizar.",
    intro: "Estas comparativas ayudan a elegir arquitectura y nivel de delegación. Parten del trabajo real, separan conversación, asistencia, reglas deterministas y ejecución agentiva, y explican cuándo conviene combinar enfoques.",
  },
  en: {
    ...comparisonIndexContent.en,
    seoTitle: "AI comparisons for business: agents, chatbots, RPA and copilots | IA Empleado",
    seoDescription: "Compare AI agents, chatbots, RPA, traditional automation and copilots to choose the right approach for each workflow, risk level and control model.",
    title: "Compare AI agents, chatbots, RPA and copilots before you automate.",
    intro: "These comparisons help choose architecture and delegation level. They start from the real work, separate conversation, assistance, deterministic rules and agentic execution, and explain when combining approaches makes sense.",
  },
} as const;

export function getAuditedComparisonBySlug(slug: string, locale: Locale) {
  return auditedComparisonRecords.find((record) => record.slugs[locale] === slug);
}

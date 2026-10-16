import type { Locale } from "./i18n";
import {
  sectorIndexContent,
  sectorRecords,
  type ClusterIndexContent,
  type SectorKey,
  type SectorRecord,
} from "./sector-use-cases";

type SectorOverride = Partial<
  Pick<
    SectorRecord,
    "seoTitle" | "seoDescription" | "eyebrow" | "heroTitle" | "heroDescription" | "shortAnswer"
  >
>;

export const sectorSearchOwnership = {
  ecommerce: {
    decision: "REPOSITION",
    primaryKeyword: { es: "ia para ecommerce", en: "ai for ecommerce" },
    supportingKeywords: {
      es: ["agentes ia ecommerce", "inteligencia artificial ecommerce", "ia ecommerce"],
      en: ["ecommerce ai", "ai agents ecommerce", "ai ecommerce"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para ecommerce 50/month, KD 45; inteligencia artificial ecommerce 50/month, KD 42; agentes IA ecommerce 70/month; IA ecommerce 40/month.",
      "Semrush UK 2026-10-16: AI for ecommerce 140/month, KD 46; ecommerce AI 140/month, KD 35; AI agents ecommerce 10/month.",
      "Ownership boundary: /automatizacion-ecommerce-ia owns ecommerce automation; the related guide owns ecommerce-with-AI implementation; this sector page owns ecommerce-specific evaluation/context.",
    ],
  },
  travel: {
    decision: "REPOSITION",
    primaryKeyword: { es: "ia para turismo", en: "ai for travel" },
    supportingKeywords: {
      es: ["ia turismo", "inteligencia artificial turismo", "agentes ia turismo"],
      en: ["travel ai", "ai agents travel", "travel artificial intelligence"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para turismo 20/month; IA turismo 50/month, KD 31; inteligencia artificial turismo 50/month, KD 48.",
      "Semrush UK 2026-10-16: AI for travel 110/month, KD 59; travel AI 390/month, KD 61; AI agents travel 20/month.",
      "Ownership boundary: booking automation and booking implementation remain with their Growth owners; this page owns tourism-industry evaluation/context.",
    ],
  },
  "professional-services": {
    decision: "KEEP",
    primaryKeyword: { es: "ia para servicios profesionales", en: "ai for professional services" },
    supportingKeywords: {
      es: ["ia para consultoras", "automatización servicios profesionales", "ia para despachos profesionales"],
      en: ["professional services ai", "ai for consulting firms", "ai agents professional services"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: the tested exact professional-services variants returned no reported volume; the page is retained for a materially distinct evaluation purpose across consultancies, firms and B2B service organizations rather than forced onto a broader keyword owned elsewhere.",
      "Semrush UK 2026-10-16: AI for professional services 30/month, CPC 18.66; professional services AI 10/month; AI for consulting firms 20/month.",
    ],
  },
  sales: {
    decision: "REPOSITION",
    primaryKeyword: { es: "ia para ventas b2b", en: "ai for b2b sales" },
    supportingKeywords: {
      es: ["ia ventas b2b", "agentes ia ventas b2b", "automatización ventas b2b"],
      en: ["b2b sales ai", "ai agents b2b sales", "b2b sales automation"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para ventas B2B 40/month. Broad automatización de ventas remains owned by the Growth sales landing.",
      "Semrush UK 2026-10-16: AI for B2B sales 20/month; B2B sales AI 20/month; B2B sales automation 90/month. The sector page deliberately stays on the B2B audience/context intent instead of taking the broad sales-automation query.",
    ],
  },
} as const satisfies Record<SectorKey, unknown>;

const sectorOverrides: Record<SectorKey, SectorOverride> = {
  ecommerce: {
    seoTitle: {
      es: "IA para ecommerce | Agentes IA para operaciones y clientes",
      en: "AI for ecommerce | AI agents for operations and customer workflows",
    },
    seoDescription: {
      es: "IA para ecommerce aplicada a atención, pedidos, stock, facturación y excepciones, con agentes especializados, sistemas conectados y control humano.",
      en: "AI for ecommerce across support, orders, inventory, billing and exceptions, using specialized agents, connected systems and human control.",
    },
    eyebrow: { es: "SECTOR · IA PARA ECOMMERCE", en: "INDUSTRY · AI FOR ECOMMERCE" },
    heroTitle: {
      es: "IA para ecommerce: coordina atención, pedidos, stock y facturación con agentes especializados.",
      en: "AI for ecommerce: coordinate support, orders, inventory and billing with specialized agents.",
    },
    heroDescription: {
      es: "Esta página explica cómo encaja la IA en un ecommerce como contexto sectorial: qué procesos cruzan cliente y back office, qué sistemas deben compartir estado y dónde las excepciones siguen necesitando reglas o aprobación humana.",
      en: "This page explains how AI fits ecommerce as an industry context: which workflows cross customer-facing and back-office work, which systems must share state, and where exceptions still require rules or human approval.",
    },
    shortAnswer: {
      es: "La IA para ecommerce es más útil cuando coordina procesos entre atención, pedidos, stock, logística y facturación. El sector no sustituye la landing de automatización ecommerce: aquí el foco es el modelo operativo completo, sus sistemas, riesgos y handoffs.",
      en: "AI for ecommerce is most useful when it coordinates workflows across support, orders, inventory, logistics and billing. This industry page does not replace the ecommerce-automation landing: its job is the full operating context, systems, risks and handoffs.",
    },
  },
  travel: {
    seoTitle: {
      es: "IA para turismo | Agentes IA para reservas y operaciones",
      en: "AI for travel | AI agents for bookings and operations",
    },
    seoDescription: {
      es: "IA para turismo aplicada a consultas, disponibilidad, reservas, documentación, proveedores y cambios con fuentes autoritativas y control humano.",
      en: "AI for travel across inquiries, availability, bookings, documents, suppliers and changes with authoritative sources and human control.",
    },
    eyebrow: { es: "SECTOR · IA PARA TURISMO", en: "INDUSTRY · AI FOR TRAVEL" },
    heroTitle: {
      es: "IA para turismo: coordina consulta, disponibilidad, reserva y cambios sin inventar confirmaciones.",
      en: "AI for travel: coordinate inquiry, availability, booking and changes without inventing confirmations.",
    },
    heroDescription: {
      es: "El valor sectorial está en mantener el mismo contexto entre viajero, reservas, proveedores, administración y facturación, distinguiendo siempre una opción consultada de una confirmación real.",
      en: "The industry value comes from preserving the same context across traveler support, reservations, suppliers, administration and billing while always distinguishing a checked option from a real confirmation.",
    },
    shortAnswer: {
      es: "La IA para turismo puede estructurar consultas, coordinar disponibilidad, documentación y cambios, pero precio y confirmación deben depender de motores o proveedores autoritativos. La automatización de reservas conserva su propia intención de proceso.",
      en: "AI for travel can structure inquiries and coordinate availability, documents and changes, but price and confirmation must depend on authoritative engines or suppliers. Booking automation keeps its separate process intent.",
    },
  },
  "professional-services": {
    seoTitle: {
      es: "IA para servicios profesionales | Agentes para operaciones internas",
      en: "AI for professional services | Governed agents for operations",
    },
    seoDescription: {
      es: "IA para servicios profesionales en correo, documentación, CRM, facturación y seguimiento, separando trabajo operativo de criterio profesional y decisiones sensibles.",
      en: "AI for professional services across email, documents, CRM, billing and follow-up, separating operational work from professional judgment and sensitive decisions.",
    },
    eyebrow: { es: "SECTOR · IA PARA SERVICIOS PROFESIONALES", en: "INDUSTRY · AI FOR PROFESSIONAL SERVICES" },
    heroTitle: {
      es: "IA para servicios profesionales: automatiza coordinación y preparación sin sustituir el criterio experto.",
      en: "AI for professional services: automate coordination and preparation without replacing expert judgment.",
    },
    heroDescription: {
      es: "Despachos, consultoras, ingenierías y empresas B2B pueden reducir trabajo repetitivo alrededor de correo, documentos, CRM y facturación manteniendo un owner humano para consejo, firma y compromisos profesionales.",
      en: "Firms, consultancies, engineering companies and B2B service businesses can reduce repetitive work around email, documents, CRM and billing while retaining a human owner for advice, signature and professional commitments.",
    },
    shortAnswer: {
      es: "En servicios profesionales, la IA encaja mejor en la capa operativa: clasificar solicitudes, estructurar documentos, mantener expedientes, actualizar CRM y preparar facturación. El criterio profesional, legal o técnico permanece bajo la autoridad correspondiente.",
      en: "In professional services, AI fits best in the operational layer: triaging requests, structuring documents, maintaining case files, updating CRM and preparing billing. Professional, legal or technical judgment remains with the appropriate authority.",
    },
  },
  sales: {
    seoTitle: {
      es: "IA para ventas B2B | Agentes para research, CRM y seguimiento",
      en: "AI for B2B sales | Agents for research, CRM and follow-up",
    },
    seoDescription: {
      es: "IA para ventas B2B aplicada a research, CRM, seguimiento, respuestas y reuniones con límites de canal, consentimiento y control humano sobre negociación y compromisos.",
      en: "AI for B2B sales across research, CRM, follow-up, replies and meetings with channel limits, consent and human control over negotiation and commitments.",
    },
    eyebrow: { es: "CONTEXTO · IA PARA VENTAS B2B", en: "CONTEXT · AI FOR B2B SALES" },
    heroTitle: {
      es: "IA para ventas B2B: sistematiza research, CRM y seguimiento sin convertir el outreach en spam autónomo.",
      en: "AI for B2B sales: systematize research, CRM and follow-up without turning outreach into autonomous spam.",
    },
    heroDescription: {
      es: "Esta página posee el contexto B2B: cómo combinar señales, cuentas, CRM, correo, reuniones y reporting bajo políticas de mercado. La landing de automatización de ventas conserva la intención general del proceso.",
      en: "This page owns the B2B context: how to combine signals, accounts, CRM, email, meetings and reporting under market policy. The sales-automation landing retains the broader process intent.",
    },
    shortAnswer: {
      es: "La IA para ventas B2B aporta valor al preparar research, mantener CRM, clasificar respuestas y asegurar una siguiente acción. Envíos, frecuencia, negociación, precios y claims sensibles deben respetar políticas y autoridad humana.",
      en: "AI for B2B sales creates value by preparing research, maintaining CRM, classifying replies and preserving a next action. Sending, frequency, negotiation, pricing and sensitive claims must remain inside policy and human authority.",
    },
  },
};

const optimizedIndexOverrides: Record<Locale, Partial<ClusterIndexContent>> = {
  es: {
    seoTitle: "IA por sectores | Ecommerce, turismo, servicios y ventas B2B",
    seoDescription: "Explora cómo aplicar IA por sector en ecommerce, turismo, servicios profesionales y ventas B2B con procesos, sistemas, agentes y controles específicos.",
    eyebrow: "IA POR SECTORES",
    title: "IA por sectores: aplica agentes donde cambian procesos, sistemas y riesgos.",
    description: "La misma automatización no sirve igual en todos los contextos. Este hub organiza la IA por sector para separar necesidades de ecommerce, turismo, servicios profesionales y ventas B2B sin competir con las páginas que poseen la automatización de cada proceso.",
    cardsTitle: "IA para ecommerce, turismo, servicios profesionales y ventas B2B",
    cardsIntro: "Cada página tiene un trabajo distinto: explicar el contexto operativo del sector, sus sistemas, handoffs, límites y equipos posibles. Las landings de Growth conservan las intenciones de automatización de procesos concretos.",
  },
  en: {
    seoTitle: "AI by industry | Ecommerce, travel, professional services and B2B sales",
    seoDescription: "Explore AI by industry across ecommerce, travel, professional services and B2B sales with specific workflows, systems, agents and controls.",
    eyebrow: "AI BY INDUSTRY",
    title: "AI by industry: apply agents where workflows, systems and risks actually differ.",
    description: "The same automation pattern does not fit every context. This hub organizes AI by industry across ecommerce, travel, professional services and B2B sales without competing with pages that own specific process-automation intent.",
    cardsTitle: "AI for ecommerce, travel, professional services and B2B sales",
    cardsIntro: "Each page has one job: explain the operating context, systems, handoffs, limits and possible teams for that industry. Growth landings retain concrete process-automation intent.",
  },
};

export const optimizedSectorIndexContent: Record<Locale, ClusterIndexContent> = {
  es: { ...sectorIndexContent.es, ...optimizedIndexOverrides.es },
  en: { ...sectorIndexContent.en, ...optimizedIndexOverrides.en },
};

export const optimizedSectorRecords: SectorRecord[] = sectorRecords.map((record) => ({
  ...record,
  ...sectorOverrides[record.key],
}));

export function getOptimizedSectorBySlug(slug: string, locale: Locale): SectorRecord | undefined {
  return optimizedSectorRecords.find((record) => record.slugs[locale] === slug);
}

import type { Locale } from "./i18n";
import {
  departmentIndexContent,
  departmentRecords,
  type DepartmentKey,
  type DepartmentRecord,
  type OrganizationIndexContent,
} from "./organization-map";

type DepartmentOverride = Partial<
  Pick<DepartmentRecord, "seoTitle" | "seoDescription" | "eyebrow" | "heroTitle" | "heroDescription" | "shortAnswer">
>;

export const departmentSearchOwnership = {
  "customer-support": {
    decision: "REPOSITION",
    primaryKeyword: { es: "equipo de atención al cliente con ia", en: "ai-augmented customer service team" },
    supportingKeywords: {
      es: ["departamento atención al cliente ia", "atención al cliente con ia", "equipo soporte ia"],
      en: ["customer service team ai", "ai customer service team", "customer support ai team"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para atención al cliente 20/month, but that broader solution/process territory is already owned by the customer-support role and Growth automation surfaces. Tested team/department variants reported no measurable volume.",
      "Semrush UK 2026-10-16: AI for customer service 320/month, KD 47; AI customer service 1,000/month, KD 63. These broad terms remain outside this organizational owner, which is intentionally framed as the operating model of an AI-augmented support team.",
    ],
  },
  administration: {
    decision: "REPOSITION",
    primaryKeyword: { es: "departamento de administración con ia", en: "ai-augmented administration team" },
    supportingKeywords: {
      es: ["administración con ia", "equipo administrativo ia", "departamento administración ia"],
      en: ["ai administration team", "ai augmented administration", "administrative team ai"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para administración 10/month. The specialist Administrative AI profile and administrative-automation Growth content already own role and process intent, so the department keeps organizational intent.",
      "Semrush UK 2026-10-16: AI for administration 20/month; tested team/department variants returned no reported volume. Low-volume organizational wording is preferred over cannibalizing stronger existing owners.",
    ],
  },
  "accounting-billing": {
    decision: "REPOSITION",
    primaryKeyword: { es: "departamento de contabilidad con ia", en: "ai-augmented accounting team" },
    supportingKeywords: {
      es: ["equipo contabilidad ia", "contabilidad con ia", "departamento facturación ia"],
      en: ["ai accounting team", "ai for accounting teams", "accounting team ai"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para contabilidad 210/month, KD 46 and contabilidad con IA 30/month. IA para contabilidad is already assigned to the Accounting & Billing AI role, so this page stays on department operating-model intent.",
      "Semrush UK 2026-10-16: AI for accounting 390/month, KD 63; accounting AI 480/month, KD 62; AI accounting 1,300/month, KD 59. Those broad terms belong to the role/category owner rather than this department surface.",
    ],
  },
  sales: {
    decision: "REPOSITION",
    primaryKeyword: { es: "equipo de ventas con ia", en: "ai for sales teams" },
    supportingKeywords: {
      es: ["departamento ventas ia", "ventas con ia", "equipo comercial ia"],
      en: ["ai sales team", "ai augmented sales team", "sales team ai"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para ventas 50/month, KD 37 and ventas con IA 30/month. Broad sales intent remains split between the Sales / SDR AI role and sales-automation Growth owner; the department owns team operating-model intent.",
      "Semrush UK 2026-10-16: AI for sales teams 30/month and AI sales team 20/month, providing direct evidence for a team-level owner distinct from sales automation and AI sales-agent pages.",
    ],
  },
  "ecommerce-operations": {
    decision: "REPOSITION",
    primaryKeyword: { es: "operaciones ecommerce con ia", en: "ai ecommerce operations" },
    supportingKeywords: {
      es: ["equipo ecommerce ia", "operaciones ecommerce ia", "back office ecommerce ia"],
      en: ["ecommerce operations ai", "ai ecommerce team", "ai ecommerce operations team"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para ecommerce 50/month, KD 45, but Phase 3 sector ownership assigns that broad industry query to /sectores/ecommerce. Exact operations/team variants returned no reported volume.",
      "Semrush UK 2026-10-16: AI for ecommerce 140/month, KD 46. Broad industry intent remains with the ecommerce sector; the department is intentionally limited to the operating model across orders, support and back office.",
    ],
  },
  "travel-reservations": {
    decision: "REPOSITION",
    primaryKeyword: { es: "operaciones de reservas con ia", en: "ai travel operations" },
    supportingKeywords: {
      es: ["equipo reservas ia", "operaciones turismo ia", "departamento reservas ia"],
      en: ["travel operations ai", "ai reservations team", "ai travel operations team"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: IA para turismo 20/month. That industry query belongs to the travel sector, while booking automation and booking management already have separate Growth/use-case owners; this page owns the departmental operating model.",
      "Semrush UK 2026-10-16: AI for travel 110/month, KD 59 and AI reservations 10/month. Broad travel demand remains with the sector page; the department stays on multi-role travel/reservations operations.",
    ],
  },
} as const satisfies Record<DepartmentKey, unknown>;

const departmentOverrides: Record<DepartmentKey, DepartmentOverride> = {
  "customer-support": {
    seoTitle: { es: "Equipo de Atención al Cliente con IA | Modelo operativo", en: "AI-augmented Customer Service Team | Operating model" },
    seoDescription: {
      es: "Cómo organizar un equipo de atención al cliente con IA entre personas, agentes, CRM, ticketing y pedidos, con handoffs, métricas y límites explícitos.",
      en: "How to organize an AI-augmented customer service team across people, agents, CRM, ticketing and orders with handoffs, metrics and explicit boundaries.",
    },
    eyebrow: { es: "DEPARTAMENTO · EQUIPO DE ATENCIÓN AL CLIENTE", en: "DEPARTMENT · CUSTOMER SERVICE TEAM" },
    heroTitle: {
      es: "Un equipo de Atención al Cliente aumentado por IA coordina conversación, sistemas y responsables.",
      en: "An AI-augmented Customer Service team coordinates conversation, systems and owners.",
    },
    heroDescription: {
      es: "Esta página posee la intención organizativa del departamento: qué responsabilidades permanecen en el equipo, qué trabajo absorben los agentes, qué sistemas comparten y cómo se resuelven handoffs. La automatización de atención al cliente y el perfil Atención al Cliente IA conservan sus intenciones de proceso y rol.",
      en: "This page owns the department operating-model intent: which responsibilities stay with the team, which work agents absorb, which systems they share and how handoffs are resolved. Customer-service automation and the Customer Support AI profile retain process and role intent.",
    },
    shortAnswer: {
      es: "Un equipo de atención al cliente con IA combina personas y agentes especializados alrededor de un mismo estado del caso, con permisos y reglas distintos para responder, consultar, actualizar y escalar.",
      en: "An AI-augmented customer service team combines people and specialist agents around one case state, with distinct permissions and rules for responding, reading, updating and escalating.",
    },
  },
  administration: {
    seoTitle: { es: "Departamento de Administración con IA | Modelo operativo", en: "AI-augmented Administration Team | Operating model" },
    seoDescription: {
      es: "Diseña un departamento de Administración con IA para correo, documentos, registros, ERP y seguimiento, separando preparación, ejecución y aprobación humana.",
      en: "Design an AI-augmented administration team across email, documents, records, ERP and follow-up while separating preparation, execution and human approval.",
    },
    eyebrow: { es: "DEPARTAMENTO · ADMINISTRACIÓN CON IA", en: "DEPARTMENT · AI-AUGMENTED ADMINISTRATION" },
    heroTitle: {
      es: "Un departamento de Administración con IA organiza documentos, registros y seguimiento sin perder procedencia.",
      en: "An AI-augmented Administration team organizes documents, records and follow-up without losing provenance.",
    },
    heroDescription: {
      es: "Esta página posee la intención organizativa del área administrativa: responsabilidades, reparto entre roles, sistemas compartidos, métricas y excepciones. El Agente IA Administrativo conserva intención de rol y la automatización administrativa conserva intención de proceso.",
      en: "This page owns the administration operating-model intent: responsibilities, role allocation, shared systems, metrics and exceptions. Administrative AI keeps role intent and administrative automation keeps process intent.",
    },
    shortAnswer: {
      es: "Un departamento de Administración aumentado por IA distribuye clasificación, extracción, preparación y seguimiento entre agentes y personas, manteniendo fuente, estado y aprobación verificables.",
      en: "An AI-augmented administration team distributes classification, extraction, preparation and follow-up across agents and people while keeping source, state and approval verifiable.",
    },
  },
  "accounting-billing": {
    seoTitle: { es: "Departamento de Contabilidad con IA | Facturación y control", en: "AI-augmented Accounting Team | Billing and control" },
    seoDescription: {
      es: "Cómo organizar Contabilidad y Facturación con IA entre documentos, ERP, validaciones, excepciones y revisión humana sin delegar autoridad financiera.",
      en: "How to organize an AI-augmented accounting and billing team across documents, ERP, validation, exceptions and human review without delegating financial authority.",
    },
    eyebrow: { es: "DEPARTAMENTO · CONTABILIDAD Y FACTURACIÓN", en: "DEPARTMENT · ACCOUNTING AND BILLING" },
    heroTitle: {
      es: "Un departamento de Contabilidad con IA coordina preparación y controles sin confundirlos con autoridad financiera.",
      en: "An AI-augmented Accounting team coordinates preparation and controls without confusing them with financial authority.",
    },
    heroDescription: {
      es: "Esta página posee la intención organizativa: cómo trabajan juntos perfiles, validaciones, ERP y revisión humana en el área. IA para Contabilidad conserva la intención de agente/rol y las landings de automatización contable y de facturas conservan sus procesos.",
      en: "This page owns organizational intent: how roles, validation, ERP and human review work together in the function. AI for Accounting retains agent/role intent while accounting and invoice automation retain their process owners.",
    },
    shortAnswer: {
      es: "Un departamento de Contabilidad aumentado por IA puede automatizar preparación, matching y controles, pero aprobación, contabilización sensible y pagos siguen reglas de autoridad independientes.",
      en: "An AI-augmented Accounting team can automate preparation, matching and controls, while approval, sensitive posting and payments follow independent authority rules.",
    },
  },
  sales: {
    seoTitle: { es: "Equipo de Ventas con IA | Pipeline, roles y control comercial", en: "AI for Sales Teams | Pipeline, roles and control" },
    seoDescription: {
      es: "Cómo organizar un equipo de ventas con IA entre SDR, CRM, seguimiento, research y comerciales, manteniendo negociación, precio y compromisos bajo control humano.",
      en: "How to organize AI for sales teams across SDR, CRM, follow-up, research and sellers while keeping negotiation, pricing and commitments under human control.",
    },
    eyebrow: { es: "DEPARTAMENTO · EQUIPO DE VENTAS CON IA", en: "DEPARTMENT · AI FOR SALES TEAMS" },
    heroTitle: {
      es: "Un equipo de Ventas con IA comparte contexto y próxima acción sin automatizar el criterio comercial.",
      en: "AI for sales teams shares context and next action without automating commercial judgment.",
    },
    heroDescription: {
      es: "Esta página posee la intención del modelo operativo del equipo: qué hacen SDR, agentes y comerciales alrededor del CRM, cómo se reparten señales y handoffs y qué decisiones conservan las personas. Ventas/SDR IA y automatización de ventas mantienen sus intenciones de rol y proceso.",
      en: "This page owns the sales-team operating model: what SDRs, agents and sellers do around CRM, how signals and handoffs are divided, and which decisions remain human. Sales / SDR AI and sales automation retain role and process intent.",
    },
    shortAnswer: {
      es: "Un equipo de ventas con IA usa agentes para research, CRM y seguimiento, pero mantiene en personas negociación, precio, consentimiento y compromisos que afectan a la relación comercial.",
      en: "AI for sales teams uses agents for research, CRM and follow-up while people retain negotiation, pricing, consent and commitments that affect the commercial relationship.",
    },
  },
  "ecommerce-operations": {
    seoTitle: { es: "Operaciones Ecommerce con IA | Equipo, pedidos y back office", en: "AI Ecommerce Operations | Team, orders and back office" },
    seoDescription: {
      es: "Organiza operaciones ecommerce con IA entre pedidos, atención, catálogo, ERP y back office, diferenciando el modelo del equipo de la automatización y del sector.",
      en: "Organize AI ecommerce operations across orders, support, catalog, ERP and back office while separating the team operating model from automation and industry intent.",
    },
    eyebrow: { es: "DEPARTAMENTO · OPERACIONES ECOMMERCE", en: "DEPARTMENT · ECOMMERCE OPERATIONS" },
    heroTitle: {
      es: "Operaciones Ecommerce con IA: un equipo coordinado alrededor del pedido y sus excepciones.",
      en: "AI Ecommerce Operations: a coordinated team around the order and its exceptions.",
    },
    heroDescription: {
      es: "Esta página posee la intención organizativa de Operaciones Ecommerce: responsabilidades, roles, sistemas, métricas y handoffs. IA para ecommerce pertenece al sector y automatización ecommerce pertenece al proceso; aquí explicamos cómo se organiza el área que los opera.",
      en: "This page owns the Ecommerce Operations organizational intent: responsibilities, roles, systems, metrics and handoffs. AI for ecommerce belongs to the industry page and ecommerce automation to the process owner; this page explains the team that operates them.",
    },
    shortAnswer: {
      es: "Operaciones Ecommerce con IA coordina soporte, pedidos y back office sobre estados verificables, con responsables y límites claros para cambios, sustituciones, reembolsos y excepciones.",
      en: "AI Ecommerce Operations coordinates support, orders and back office around verifiable states, with clear owners and boundaries for changes, substitutions, refunds and exceptions.",
    },
  },
  "travel-reservations": {
    seoTitle: { es: "Operaciones de Reservas con IA | Equipo de turismo y control", en: "AI Travel Operations | Reservations team and control" },
    seoDescription: {
      es: "Organiza operaciones de reservas con IA entre consultas, proveedores, disponibilidad, documentación y cambios, manteniendo confirmaciones y decisiones económicas verificables.",
      en: "Organize AI travel operations across inquiries, suppliers, availability, documents and changes while keeping confirmations and financial decisions verifiable.",
    },
    eyebrow: { es: "DEPARTAMENTO · TURISMO Y RESERVAS", en: "DEPARTMENT · TRAVEL AND RESERVATIONS" },
    heroTitle: {
      es: "Operaciones de Reservas con IA: coordina ventas, back office y proveedores alrededor de una reserva verificable.",
      en: "AI Travel Operations: coordinate sales, back office and suppliers around a verifiable booking.",
    },
    heroDescription: {
      es: "Esta página posee la intención organizativa del equipo de Turismo y Reservas. IA para turismo pertenece al sector; automatización de reservas y gestión de reservas conservan sus intenciones de proceso y caso de uso. Aquí se define quién hace qué y con qué sistemas y autoridad.",
      en: "This page owns the Travel & Reservations team operating model. AI for travel belongs to the industry page, while booking automation and booking management retain process/use-case intent. Here the job is defining who does what with which systems and authority.",
    },
    shortAnswer: {
      es: "Un equipo de Turismo y Reservas aumentado por IA distribuye consulta, cotización, documentación, seguimiento y excepciones entre agentes y personas, sin confundir disponibilidad, opción y confirmación.",
      en: "An AI-augmented Travel & Reservations team distributes inquiry, quoting, documentation, follow-up and exceptions across agents and people without confusing availability, option and confirmation.",
    },
  },
};

const indexOverrides: Record<Locale, Partial<OrganizationIndexContent>> = {
  es: {
    seoTitle: "IA por departamentos | Equipos aumentados y modelo operativo",
    seoDescription: "Explora cómo organizar IA por departamentos en atención, administración, contabilidad, ventas, ecommerce y reservas sin confundir roles, procesos y autoridad.",
    eyebrow: "IA POR DEPARTAMENTOS",
    title: "IA por departamentos: organiza agentes, personas y sistemas alrededor de responsabilidades reales.",
    description: "Este hub posee intención organizativa. Cada departamento explica responsabilidades, reparto de trabajo, sistemas, métricas, handoffs y límites; las páginas de Empleados IA siguen siendo propietarias de roles y Growth de los procesos de automatización.",
    cardsTitle: "Seis departamentos con un modelo operativo distinto",
    cardsIntro: "No duplicamos las landings de automatización: aquí el trabajo es mostrar cómo se coordinan personas, agentes y sistemas dentro de cada área.",
  },
  en: {
    seoTitle: "AI by department | Augmented teams and operating models",
    seoDescription: "Explore AI by department across support, administration, accounting, sales, ecommerce and travel without confusing roles, processes and authority.",
    eyebrow: "AI BY DEPARTMENT",
    title: "AI by department: organize agents, people and systems around real responsibilities.",
    description: "This hub owns organizational intent. Each department explains responsibilities, work allocation, systems, metrics, handoffs and boundaries; AI Employee pages retain role intent and Growth retains process-automation intent.",
    cardsTitle: "Six departments with distinct operating models",
    cardsIntro: "These pages do not duplicate automation landings: their job is to show how people, agents and systems coordinate inside each function.",
  },
};

export const optimizedDepartmentIndexContent: Record<Locale, OrganizationIndexContent> = {
  es: { ...departmentIndexContent.es, ...indexOverrides.es },
  en: { ...departmentIndexContent.en, ...indexOverrides.en },
};

export const optimizedDepartmentRecords: DepartmentRecord[] = departmentRecords.map((record) => ({
  ...record,
  ...departmentOverrides[record.key],
}));

export function getOptimizedDepartmentBySlug(locale: Locale, slug: string): DepartmentRecord | undefined {
  return optimizedDepartmentRecords.find((record) => record.slugs[locale] === slug);
}

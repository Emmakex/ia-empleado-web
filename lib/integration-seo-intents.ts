import type { Locale } from "./i18n";
import {
  integrationIndexContent,
  integrationRecords,
  type IntegrationKey,
  type IntegrationRecord,
  type OrganizationIndexContent,
} from "./organization-map";

type LocalizedText = Record<Locale, string>;
type LocalizedList = Record<Locale, string[]>;

export type IntegrationSeoDecision = "KEEP" | "EXPAND" | "REPOSITION" | "MERGE" | "NOINDEX";

export type IntegrationSeoIntent = {
  key: IntegrationKey;
  decision: IntegrationSeoDecision;
  primaryKeyword: LocalizedText;
  supportingKeywords: LocalizedList;
  searchIntent: "commercial" | "informational";
  researchBasis: string[];
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  heroTitle: LocalizedText;
  heroDescription: LocalizedText;
  shortAnswer: LocalizedText;
  relatedProcessOwner?: LocalizedText;
};

export const integrationHubSeoIntent = {
  decision: "KEEP" as const,
  primaryKeyword: { es: "integraciones para empleados ia", en: "ai agent integrations" },
  supportingKeywords: {
    es: ["integraciones agentes ia", "integración con sistemas empresariales", "crm erp email ia"],
    en: ["ai integrations", "ai integrations for business", "business system integrations"],
  },
  searchIntent: "commercial" as const,
  researchBasis: [
    "Semrush ES 2026-10-16: integración de IA 30/month is broader implementation intent already owned by the enterprise-AI-integration Growth page; exact agent-integration hub variants reported no volume.",
    "Semrush UK 2026-10-16: AI integration 260/month, AI integrations 50/month and AI agent integrations 10/month. The hub remains a system-category/navigation owner rather than taking broad implementation intent.",
  ],
};

export const integrationSeoIntents: Record<IntegrationKey, IntegrationSeoIntent> = {
  crm: {
    key: "crm",
    decision: "REPOSITION",
    primaryKeyword: { es: "integración crm", en: "crm integration" },
    supportingKeywords: { es: ["integracion crm", "crm api integración", "crm con ia"], en: ["ai crm integration", "connect crm to ai", "crm api integration"] },
    searchIntent: "commercial",
    researchBasis: [
      "Semrush ES 2026-10-16: integración CRM 70/month, KD 22; integracion CRM 40/month, KD 21; CRM API integración 30/month.",
      "Semrush UK 2026-10-16: CRM integration 880/month, KD 37, CPC 12.87; AI CRM integration 20/month; connect CRM to AI 10/month.",
    ],
    seoTitle: { es: "Integración CRM con IA | Datos, permisos y trazabilidad | IA Empleado", en: "CRM integration with AI | Data, permissions and audit | IA Empleado" },
    seoDescription: { es: "Diseña una integración CRM con IA para clientes, leads, oportunidades y casos con matching fiable, permisos mínimos, escritura controlada y trazabilidad.", en: "Design CRM integration with AI for customers, leads, opportunities and cases using reliable matching, least privilege, controlled writes and auditability." },
    heroTitle: { es: "Integración CRM con IA: conecta agentes con clientes, leads y pipeline bajo permisos mínimos.", en: "CRM integration with AI: connect agents to customers, leads and pipeline under least-privilege access." },
    heroDescription: { es: "Una integración CRM con IA define qué objetos puede consultar un agente, cómo identifica el registro correcto, qué campos puede crear o actualizar y qué acciones requieren revisión. Esta página posee acceso e integración del sistema; la automatización CRM conserva el proceso comercial.", en: "CRM integration with AI defines which objects an agent may query, how it matches the correct record, which fields it may create or update and which actions require review. This page owns system access and integration; CRM automation retains commercial workflow intent." },
    shortAnswer: { es: "Integrar IA con un CRM significa conceder acceso verificable y limitado a datos y acciones del CRM; no equivale a automatizar por sí solo ventas o soporte.", en: "CRM integration with AI means granting verifiable, bounded access to CRM data and actions; it is not the same as automating sales or support itself." },
    relatedProcessOwner: { es: "/automatizacion-crm-ia", en: "/en/ai-crm-automation" },
  },
  erp: {
    key: "erp",
    decision: "REPOSITION",
    primaryKeyword: { es: "integración erp", en: "erp integration" },
    supportingKeywords: { es: ["integracion erp", "erp api integración", "erp con ia"], en: ["ai erp integration", "connect erp to ai", "erp api integration"] },
    searchIntent: "commercial",
    researchBasis: [
      "Semrush ES 2026-10-16: integración ERP 50/month, KD 13; integracion ERP 390/month, KD 20; ERP API integración 30/month.",
      "Semrush UK 2026-10-16: ERP integration 590/month, KD 33, CPC 12.55; AI ERP integration 20/month; connect ERP to AI 10/month.",
    ],
    seoTitle: { es: "Integración ERP con IA | Pedidos, facturas y permisos | IA Empleado", en: "ERP integration with AI | Orders, invoices and permissions | IA Empleado" },
    seoDescription: { es: "Diseña integración ERP con IA para pedidos, facturas, maestros y estados con fuentes autoritativas, idempotencia, permisos separados y aprobación.", en: "Design ERP integration with AI for orders, invoices, master data and states using authoritative sources, idempotency, separated permissions and approval." },
    heroTitle: { es: "Integración ERP con IA: conecta agentes con datos operativos sin abrir escritura indiscriminada.", en: "ERP integration with AI: connect agents to operational data without granting indiscriminate write access." },
    heroDescription: { es: "Una integración ERP con IA define fuentes autoritativas, matching de entidades, permisos de lectura y escritura, idempotencia, validaciones y fallback. Esta página posee conexión y autoridad del sistema; la automatización ERP conserva el proceso operativo.", en: "ERP integration with AI defines authoritative sources, entity matching, read/write permissions, idempotency, validation and fallback. This page owns system connection and authority; ERP automation retains operational workflow intent." },
    shortAnswer: { es: "Integrar IA con un ERP es dar acceso acotado a datos y operaciones verificables; no implica permiso general para modificar contabilidad, pedidos o maestros.", en: "ERP integration with AI means bounded access to verifiable data and operations; it does not imply general permission to modify accounting, orders or master data." },
    relatedProcessOwner: { es: "/automatizacion-erp-ia", en: "/en/ai-erp-automation" },
  },
  email: {
    key: "email",
    decision: "REPOSITION",
    primaryKeyword: { es: "integración email", en: "email integration" },
    supportingKeywords: { es: ["integracion email", "integración correo electrónico", "integracion correo electronico"], en: ["ai email integration", "email system integration", "email api integration"] },
    searchIntent: "commercial",
    researchBasis: [
      "Semrush ES 2026-10-16: integración email 50/month, KD 22; integracion email 70/month, KD 23; integración correo electrónico 20/month, KD 15.",
      "Semrush UK 2026-10-16: email integration 50/month, KD 24, CPC 6.31; AI email integration 20/month.",
    ],
    seoTitle: { es: "Integración de email con IA | Lectura, borradores y envío | IA Empleado", en: "Email integration with AI | Read, draft and send controls | IA Empleado" },
    seoDescription: { es: "Integra email con IA separando lectura, borradores y envío, con identidad, permisos, consentimiento, adjuntos, trazabilidad y revisión según riesgo.", en: "Integrate email with AI while separating reading, drafting and sending with identity, permissions, consent, attachment controls, traceability and risk-based review." },
    heroTitle: { es: "Integración de email con IA: separa leer, redactar y enviar antes de automatizar la bandeja.", en: "Email integration with AI: separate reading, drafting and sending before automating the inbox." },
    heroDescription: { es: "Una integración de email con IA define buzones, identidad, acceso a hilos y adjuntos, capacidad de borrador y autoridad de envío. Esta página posee la conexión del canal; la automatización de correo conserva el flujo de trabajo.", en: "Email integration with AI defines mailboxes, identity, thread and attachment access, draft capability and send authority. This page owns channel connection; email automation retains workflow intent." },
    shortAnswer: { es: "Integrar email con IA significa controlar qué puede leer, redactar y enviar el agente; cada capacidad necesita permisos y reglas independientes.", en: "Email integration with AI means controlling what the agent may read, draft and send; each capability needs independent permissions and rules." },
    relatedProcessOwner: { es: "/automatizacion-email-empresarial-ia", en: "/en/ai-enterprise-email-automation" },
  },
  calendar: {
    key: "calendar",
    decision: "REPOSITION",
    primaryKeyword: { es: "integración calendario", en: "calendar integration" },
    supportingKeywords: { es: ["integracion calendario", "calendario con ia", "automatización calendario"], en: ["ai calendar integration", "calendar api integration", "ai scheduling integration"] },
    searchIntent: "commercial",
    researchBasis: [
      "Semrush ES 2026-10-16: integración calendario 10/month; integracion calendario 20/month.",
      "Semrush UK 2026-10-16: calendar integration 390/month, KD 29, CPC 4.25; AI calendar integration 20/month.",
    ],
    seoTitle: { es: "Integración de calendario con IA | Disponibilidad y citas | IA Empleado", en: "Calendar integration with AI | Availability and scheduling | IA Empleado" },
    seoDescription: { es: "Integra calendarios con IA para consultar disponibilidad, proponer horarios y crear eventos con zonas horarias, privacidad y permisos separados para crear, mover o cancelar.", en: "Integrate calendars with AI for availability, proposed times and authorized events with time-zone, privacy and separate create, reschedule and cancel controls." },
    heroTitle: { es: "Integración de calendario con IA: disponibilidad real y permisos distintos para crear, mover o cancelar.", en: "Calendar integration with AI: real availability and separate authority to create, move or cancel events." },
    heroDescription: { es: "Una integración de calendario con IA define qué calendarios exponen disponibilidad, qué contexto puede leer el agente y qué acciones puede ejecutar. Consultar libre/ocupado, crear una cita, reprogramarla y cancelarla son permisos distintos.", en: "Calendar integration with AI defines which calendars expose availability, which context the agent may read and which actions it may execute. Reading free/busy, creating a meeting, rescheduling it and cancelling it are distinct permissions." },
    shortAnswer: { es: "La integración de calendario conecta IA con disponibilidad y eventos bajo permisos explícitos; ver un hueco libre no significa tener autoridad para reservarlo.", en: "Calendar integration connects AI to availability and events under explicit permissions; seeing a free slot does not mean having authority to book it." },
  },
  ecommerce: {
    key: "ecommerce",
    decision: "REPOSITION",
    primaryKeyword: { es: "integración ecommerce", en: "ecommerce integration" },
    supportingKeywords: { es: ["integracion ecommerce", "integración tienda online", "plataforma ecommerce integración"], en: ["ai ecommerce integration", "ecommerce api integration", "online store integration"] },
    searchIntent: "commercial",
    researchBasis: [
      "Semrush ES 2026-10-16: integración ecommerce 30/month, KD 12; integracion ecommerce 20/month, KD 11; integración tienda online 10/month.",
      "Semrush UK 2026-10-16: ecommerce integration 260/month, KD 29, CPC 10.04; AI ecommerce integration 10/month.",
    ],
    seoTitle: { es: "Integración ecommerce con IA | Pedidos, clientes y cambios | IA Empleado", en: "Ecommerce integration with AI | Orders, customers and changes | IA Empleado" },
    seoDescription: { es: "Integra una plataforma ecommerce con IA para consultar pedidos, clientes y productos y ejecutar cambios autorizados con matching, reglas de devolución y trazabilidad.", en: "Integrate an ecommerce platform with AI for orders, customers and products plus authorized changes using reliable matching, return policies and auditability." },
    heroTitle: { es: "Integración ecommerce con IA: conecta pedidos y clientes como datos autoritativos, no como texto que el agente deba adivinar.", en: "Ecommerce integration with AI: connect orders and customers as authoritative data, not text the agent must guess." },
    heroDescription: { es: "Una integración ecommerce con IA define cómo se identifica pedido, cliente y producto, qué estados pueden leerse y qué cambios están permitidos. Esta página posee acceso al sistema; la automatización ecommerce conserva el proceso operativo.", en: "Ecommerce integration with AI defines how orders, customers and products are matched, which states may be read and which changes are permitted. This page owns system access; ecommerce automation retains operational workflow intent." },
    shortAnswer: { es: "Integrar IA con ecommerce es conectar datos y acciones verificables del pedido bajo políticas explícitas; no significa automatizar ciegamente cada compra o devolución.", en: "Ecommerce integration with AI means connecting verifiable order data and actions under explicit policies; it does not mean blindly automating every purchase or return." },
    relatedProcessOwner: { es: "/automatizacion-ecommerce-ia", en: "/en/ai-ecommerce-automation" },
  },
  ticketing: {
    key: "ticketing",
    decision: "REPOSITION",
    primaryKeyword: { es: "integración ticketing", en: "ticketing integration" },
    supportingKeywords: { es: ["integracion ticketing", "sistema de tickets ia", "ticketing ia"], en: ["ai ticketing system", "ai ticketing", "ticketing api integration"] },
    searchIntent: "commercial",
    researchBasis: [
      "Semrush ES 2026-10-16: integración ticketing 20/month; integracion ticketing 20/month; sistema de tickets IA 10/month.",
      "Semrush UK 2026-10-16: ticketing integration 110/month, KD 23, CPC 8.10; AI ticketing system 90/month, KD 32; AI ticketing 70/month, KD 31.",
    ],
    seoTitle: { es: "Integración ticketing con IA | Casos, SLA y handoffs | IA Empleado", en: "Ticketing integration with AI | Cases, SLA and handoffs | IA Empleado" },
    seoDescription: { es: "Integra ticketing con IA para clasificar casos, mantener estado y owner, coordinar handoffs y respetar SLA con transiciones, trazabilidad y cierre controlado.", en: "Integrate ticketing with AI to classify cases, maintain state and ownership, coordinate handoffs and respect SLA with controlled transitions, traceability and closure." },
    heroTitle: { es: "Integración ticketing con IA: conserva estado, owner, SLA e historial mientras el agente trabaja el caso.", en: "Ticketing integration with AI: preserve state, owner, SLA and history while the agent works the case." },
    heroDescription: { es: "Una integración ticketing con IA define taxonomía, estados válidos, reglas de routing, cambios de owner, SLA y condiciones de cierre. El sistema de tickets conserva la historia del trabajo; CRM, ERP o ecommerce siguen siendo autoritativos para sus propios datos.", en: "Ticketing integration with AI defines taxonomy, valid states, routing rules, ownership changes, SLA and closure conditions. Ticketing preserves work history; CRM, ERP or ecommerce remain authoritative for their own data." },
    shortAnswer: { es: "La integración ticketing conecta IA con el ciclo de vida del caso; clasificación, prioridad, reasignación y cierre necesitan reglas y autoridad explícitas.", en: "Ticketing integration connects AI to the case lifecycle; classification, priority, reassignment and closure require explicit rules and authority." },
  },
  "document-management": {
    key: "document-management",
    decision: "REPOSITION",
    primaryKeyword: { es: "integración gestión documental", en: "document management integration" },
    supportingKeywords: { es: ["integracion gestion documental", "gestión documental ia", "gestion documental ia"], en: ["ai document management", "document management ai", "document integration ai"] },
    searchIntent: "commercial",
    researchBasis: [
      "Semrush ES 2026-10-16: integración gestión documental 20/month; integracion gestion documental 10/month; gestión documental IA 30/month, KD 19; gestion documental IA 20/month, KD 18.",
      "Semrush UK 2026-10-16: document management integration 50/month, KD 21, CPC 7.39; AI document management 90/month, KD 37; document management AI 20/month.",
    ],
    seoTitle: { es: "Integración de gestión documental con IA | IA Empleado", en: "Document management integration with AI | IA Empleado" },
    seoDescription: { es: "Integra gestión documental con IA para localizar, clasificar y extraer información manteniendo procedencia, versión, permisos, retención y revisión de baja confianza.", en: "Integrate document management with AI for search, classification and extraction while preserving provenance, version, permissions, retention and low-confidence review." },
    heroTitle: { es: "Integración de gestión documental con IA: automatiza sobre documentos sin perder origen, versión ni permisos.", en: "Document management integration with AI: automate around documents without losing origin, version or permissions." },
    heroDescription: { es: "Una integración de gestión documental con IA define repositorios y tipos dentro de alcance, cómo se resuelve la versión vigente, qué puede extraerse y qué nivel de confianza exige revisión. Encontrar texto no convierte una copia en fuente autoritativa.", en: "Document management integration with AI defines repositories and document types in scope, how the current version is resolved, what may be extracted and which confidence level requires review. Finding text does not turn a copy into an authoritative source." },
    shortAnswer: { es: "Integrar IA con gestión documental significa conservar procedencia, versión, permisos y confianza de extracción para que el documento correcto siga siendo verificable.", en: "Document management integration with AI means preserving provenance, version, permissions and extraction confidence so the correct document remains verifiable." },
  },
};

const integrationIndexOverrides: Record<Locale, Partial<OrganizationIndexContent>> = {
  es: {
    seoTitle: "Integraciones para agentes IA | CRM, ERP, email y sistemas",
    seoDescription: "Explora integraciones para agentes IA con CRM, ERP, email, calendario, ecommerce, ticketing y gestión documental, separando acceso, permisos y automatización de procesos.",
    eyebrow: "INTEGRACIONES PARA AGENTES IA",
    title: "Integraciones para agentes IA: conecta sistemas con autoridad delimitada y datos verificables.",
    description: "Este hub organiza la capa de sistemas: qué fuentes son autoritativas, qué puede leer o escribir un agente y qué controles necesita cada conexión. No compite con la landing de integración empresarial, que conserva la intención amplia de implementación entre sistemas.",
    cardsTitle: "Siete categorías de integración con un trabajo de búsqueda propio",
    cardsIntro: "Cada categoría explica acceso, matching, permisos, validación, fallback y auditoría. Que un sistema participe en un proceso no convierte su página de integración en propietaria de la automatización de ese proceso.",
  },
  en: {
    seoTitle: "AI agent integrations | CRM, ERP, email and business systems",
    seoDescription: "Explore AI agent integrations with CRM, ERP, email, calendar, ecommerce, ticketing and document management while separating system access from process automation.",
    eyebrow: "AI AGENT INTEGRATIONS",
    title: "AI agent integrations: connect business systems with bounded authority and verifiable data.",
    description: "This hub organizes the system layer: authoritative sources, agent read/write access and controls for each connection. It does not compete with the enterprise integration landing, which retains broad cross-system implementation intent.",
    cardsTitle: "Seven integration categories with a distinct search job",
    cardsIntro: "Each category explains access, matching, permissions, validation, fallback and audit. A system participating in a workflow does not make its integration page the owner of process-automation intent.",
  },
};

export const optimizedIntegrationIndexContent: Record<Locale, OrganizationIndexContent> = {
  es: { ...integrationIndexContent.es, ...integrationIndexOverrides.es },
  en: { ...integrationIndexContent.en, ...integrationIndexOverrides.en },
};

export function getIntegrationSeoIntent(key: IntegrationKey) {
  return integrationSeoIntents[key];
}

export function applyIntegrationSeoIntent(record: IntegrationRecord): IntegrationRecord {
  const seo = getIntegrationSeoIntent(record.key);
  return {
    ...record,
    seoTitle: seo.seoTitle,
    seoDescription: seo.seoDescription,
    heroTitle: seo.heroTitle,
    heroDescription: seo.heroDescription,
    shortAnswer: seo.shortAnswer,
  };
}

export const optimizedIntegrationRecords: IntegrationRecord[] = integrationRecords.map(applyIntegrationSeoIntent);

export function getOptimizedIntegrationBySlug(locale: Locale, slug: string): IntegrationRecord | undefined {
  return optimizedIntegrationRecords.find((record) => record.slugs[locale] === slug);
}

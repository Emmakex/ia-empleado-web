import type { Locale } from "./i18n";
import {
  useCaseIndexContent,
  useCaseRecords,
  type ClusterIndexContent,
  type UseCaseKey,
  type UseCaseRecord,
} from "./sector-use-cases";

type UseCaseOverride = Partial<
  Pick<
    UseCaseRecord,
    "title" | "seoTitle" | "seoDescription" | "eyebrow" | "heroTitle" | "heroDescription" | "shortAnswer" | "problem"
  >
>;

export const useCaseSearchOwnership = {
  "customer-issue": {
    decision: "REPOSITION",
    primaryKeyword: { es: "gestión de reclamaciones", en: "customer issue resolution" },
    supportingKeywords: {
      es: ["gestión de incidencias", "reclamaciones clientes", "resolución de incidencias"],
      en: ["customer complaint management", "customer issue management", "customer complaint resolution"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: gestión de incidencias 140/month, KD 20; gestión de reclamaciones 70/month, KD 17; reclamaciones clientes 40/month, KD 32; resolución de incidencias 20/month.",
      "Semrush UK 2026-10-16: customer complaint management 40/month; customer issue resolution 20/month; customer issue management 20/month.",
      "Boundary: customer-service Growth content owns broad automation; Customer Support AI owns the specialist role; this page owns the bounded issue-resolution workflow.",
    ],
  },
  "invoice-validation": {
    decision: "REPOSITION",
    primaryKeyword: { es: "validación de facturas", en: "invoice validation" },
    supportingKeywords: {
      es: ["control de facturas", "validar facturas", "revisión de facturas"],
      en: ["invoice control", "validate invoices", "invoice verification"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: validación de facturas 10/month; control de facturas 170/month, KD 24. Broad automatización de facturas remains with Growth.",
      "Semrush UK 2026-10-16: invoice validation 110/month, KD 41; invoice control 20/month; invoice automation 260/month is a broader category outside this bounded owner.",
    ],
  },
  "sales-follow-up": {
    decision: "REPOSITION",
    primaryKeyword: { es: "seguimiento de leads", en: "sales follow up" },
    supportingKeywords: {
      es: ["seguimiento comercial", "seguimiento de ventas", "seguimiento clientes ventas"],
      en: ["sales follow up process", "lead follow up", "sales follow up automation"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: seguimiento de leads 40/month, KD 26; seguimiento comercial 20/month, KD 19; seguimiento de ventas 10/month.",
      "Semrush UK 2026-10-16: sales follow up 70/month, KD 42; sales follow up process 50/month; lead follow up 50/month.",
      "Boundary: broad sales automation remains with Growth and Sales / SDR AI remains the specialist-role owner.",
    ],
  },
  "order-exception": {
    decision: "REPOSITION",
    primaryKeyword: { es: "control de pedidos", en: "order exception management" },
    supportingKeywords: {
      es: ["gestión de pedidos", "incidencias de pedidos", "automatización de pedidos"],
      en: ["order management", "order issue management", "order automation"],
    },
    researchBasis: [
      "Semrush ES exact-query recheck 2026-10-16: gestión de pedidos 390/month, KD 21; control de pedidos 70/month, KD 12; automatización de pedidos 70/month, KD 12.",
      "Semrush UK 2026-10-16: order management 1,900/month, KD 58; AI order management 110/month, KD 40; order exception management 10/month. The narrower exception wording avoids claiming full OMS-category ownership.",
    ],
  },
  "travel-booking": {
    decision: "REPOSITION",
    primaryKeyword: { es: "gestión de reservas", en: "travel booking management" },
    supportingKeywords: {
      es: ["reservas de viajes", "gestión de reservas turísticas", "reservas con ia"],
      en: ["booking management", "travel bookings", "booking workflow"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: gestión de reservas 140/month, KD 27; reservas de viajes 90/month; gestión de reservas turísticas 10/month. Booking automation remains with Growth.",
      "Semrush UK 2026-10-16: booking management 90/month, KD 26; travel booking management 30/month; booking automation 20/month remains a separate automation-category owner.",
    ],
  },
  "administrative-documentation": {
    decision: "REPOSITION",
    primaryKeyword: { es: "automatización documental", en: "document workflow automation" },
    supportingKeywords: {
      es: ["gestión documental", "gestión de documentos", "documentación administrativa"],
      en: ["document automation", "document management", "document workflow"],
    },
    researchBasis: [
      "Semrush ES 2026-10-16: gestión documental 1,300/month, KD 61; automatización documental 40/month; gestión de documentos 210/month. The narrower workflow intent avoids taking system/category ownership.",
      "Semrush UK 2026-10-16: document management 1,900/month, KD 66; document workflow automation 320/month, KD 44; document automation 50/month. Integration pages retain connector/system-access intent.",
    ],
  },
} as const satisfies Record<UseCaseKey, unknown>;

const useCaseOverrides: Record<UseCaseKey, UseCaseOverride> = {
  "customer-issue": {
    title: {
      es: "Gestionar incidencias y reclamaciones de clientes entre varios sistemas",
      en: "Resolve customer issues and complaints across multiple systems",
    },
    seoTitle: {
      es: "Gestión de reclamaciones e incidencias de clientes | IA Empleado",
      en: "Customer issue resolution and complaint workflow | IA Empleado",
    },
    seoDescription: {
      es: "Gestiona incidencias y reclamaciones entre CRM, pedidos, ticketing y políticas con trazabilidad, handoffs y aprobación humana.",
      en: "Resolve customer issues across CRM, orders, ticketing and policy with traceability, handoffs and human approval.",
    },
    eyebrow: { es: "CASO DE USO · INCIDENCIAS Y RECLAMACIONES", en: "USE CASE · CUSTOMER ISSUES" },
    heroTitle: {
      es: "Resuelve incidencias de clientes con contexto verificable antes de prometer una solución.",
      en: "Resolve customer issues with verifiable context before promising an outcome.",
    },
    heroDescription: {
      es: "Este caso posee el flujo de resolución: identificar cliente y recurso, consultar fuentes autorizadas, aplicar política, coordinar responsables y escalar excepciones. La landing de atención al cliente conserva la intención amplia de automatización y el perfil Atención al Cliente IA conserva la intención de rol.",
      en: "This use case owns the resolution workflow: identify the customer and resource, check authorised sources, apply policy, coordinate owners and escalate exceptions. The customer-service landing keeps broad automation intent and the Customer Support AI profile keeps role intent.",
    },
    shortAnswer: {
      es: "La gestión de incidencias y reclamaciones con IA funciona cuando el sistema puede comprobar identidad, pedido o servicio, política y estado real antes de proponer una acción. Si faltan datos, hay contradicciones o la compensación supera límites, el caso pasa a una persona.",
      en: "Customer issue resolution with AI works when the system can verify identity, order or service, policy and real status before proposing an action. Missing data, contradictions or higher-impact compensation move the case to a person.",
    },
    problem: {
      es: "El problema no es solo responder: es reunir contexto fiable entre conversación, CRM, pedido, ticket, política y operación para no depender de copiar datos ni adivinar estados.",
      en: "The problem is not simply replying. It is assembling reliable context across conversation, CRM, order, ticket, policy and operations instead of copying data or guessing states.",
    },
  },
  "invoice-validation": {
    title: { es: "Validar facturas antes de aprobar, registrar o escalar", en: "Validate invoices before approval, posting or escalation" },
    seoTitle: { es: "Validación de facturas con controles y revisión | IA Empleado", en: "Invoice validation with controls and review | IA Empleado" },
    seoDescription: {
      es: "Valida datos, duplicados, referencias y reglas de facturas antes de registro o aprobación, separando extracción, control y autoridad financiera.",
      en: "Validate invoice data, duplicates, references and rules before posting or approval while separating extraction, control and financial authority.",
    },
    eyebrow: { es: "CASO DE USO · VALIDACIÓN DE FACTURAS", en: "USE CASE · INVOICE VALIDATION" },
    heroTitle: {
      es: "Validación de facturas: automatiza comprobaciones repetitivas sin convertirlas en aprobación de pago.",
      en: "Invoice validation: automate repetitive checks without turning them into payment approval.",
    },
    heroDescription: {
      es: "Este caso posee la validación acotada: recepción, extracción, duplicados, referencias, reglas y preparación para revisión. La automatización de facturas y contabilidad conserva la intención de proceso más amplia; Contabilidad y Facturación IA conserva la intención de rol.",
      en: "This use case owns bounded validation: intake, extraction, duplicate checks, references, rules and preparation for review. Invoice/accounting automation keeps the broader process intent and Accounting & Billing AI keeps role intent.",
    },
    shortAnswer: {
      es: "La validación de facturas con IA puede extraer y contrastar campos, detectar duplicados y comprobar reglas contra fuentes autorizadas. Aprobar un pago, asumir riesgo o resolver una discrepancia material son autoridades separadas.",
      en: "Invoice validation with AI can extract and compare fields, detect duplicates and check rules against authorised sources. Approving payment, taking financial risk or resolving a material discrepancy are separate authorities.",
    },
  },
  "sales-follow-up": {
    title: { es: "Mantener seguimiento de leads y CRM sin convertirlo en spam", en: "Maintain sales follow-up and CRM without turning it into spam" },
    seoTitle: { es: "Seguimiento de leads y CRM con IA y control | IA Empleado", en: "Sales follow up and CRM with AI controls | IA Empleado" },
    seoDescription: {
      es: "Estructura seguimiento de leads, CRM, respuestas, tareas y reuniones con IA, manteniendo consentimiento, políticas de canal y revisión humana.",
      en: "Structure sales follow up, CRM, replies, tasks and meetings with AI while preserving consent, channel policy and human review.",
    },
    eyebrow: { es: "CASO DE USO · SEGUIMIENTO DE LEADS", en: "USE CASE · SALES FOLLOW UP" },
    heroTitle: {
      es: "Seguimiento de leads: conserva una siguiente acción clara sin automatizar negociación ni consentimiento.",
      en: "Sales follow up: preserve a clear next action without automating negotiation or consent.",
    },
    heroDescription: {
      es: "Este caso posee el patrón de continuidad entre lead, CRM, correo y reunión. La landing de automatización de ventas conserva la intención general del proceso; Comercial / SDR IA conserva la intención de agente especializado.",
      en: "This use case owns continuity across lead, CRM, email and meetings. The sales-automation landing retains broader process intent, while Sales / SDR AI retains specialist-agent intent.",
    },
    shortAnswer: {
      es: "Un flujo de seguimiento de leads con IA puede resumir contexto, actualizar CRM, proponer la siguiente acción y preparar borradores. Envío, frecuencia, claims, negociación y compromisos comerciales siguen sujetos a política y autoridad humana.",
      en: "An AI-assisted sales-follow-up flow can summarise context, update CRM, propose the next action and prepare drafts. Sending, frequency, claims, negotiation and commercial commitments remain subject to policy and human authority.",
    },
  },
  "order-exception": {
    title: { es: "Controlar pedidos e incidencias cuando salen del flujo normal", en: "Manage order exceptions when orders leave the happy path" },
    seoTitle: { es: "Control de pedidos e incidencias con IA | IA Empleado", en: "Order exception management with AI | IA Empleado" },
    seoDescription: {
      es: "Controla incidencias de pedidos consultando stock, ERP, ecommerce y transporte, coordinando responsables y escalando cambios, sustituciones o reembolsos.",
      en: "Manage order exceptions across inventory, ERP, ecommerce and shipping while coordinating owners and escalating changes, substitutions or refunds.",
    },
    eyebrow: { es: "CASO DE USO · CONTROL DE PEDIDOS", en: "USE CASE · ORDER EXCEPTIONS" },
    heroTitle: {
      es: "Control de pedidos: detecta y coordina excepciones antes de prometer stock, entrega o compensación.",
      en: "Order exception management: coordinate the exception before promising stock, delivery or compensation.",
    },
    heroDescription: {
      es: "Este caso posee el camino de excepción: pedido identificado, estados contrastados, causa clasificada, responsables coordinados y acción escalada cuando cambia dinero o compromiso. Las páginas Growth de procesamiento y automatización de pedidos conservan la intención de flujo general.",
      en: "This use case owns the exception path: identify the order, reconcile states, classify cause, coordinate owners and escalate actions that change money or commitments. Growth order-processing and automation pages retain the general flow intent.",
    },
    shortAnswer: {
      es: "El control de pedidos con IA es útil cuando una incidencia obliga a cruzar ecommerce, ERP, stock, transporte y atención. La IA puede reunir el estado y preparar una solución, pero no debe inventar stock ni asumir permisos de cambio, sustitución o reembolso.",
      en: "Order exception management with AI is useful when an issue crosses ecommerce, ERP, inventory, shipping and support. AI can assemble the state and prepare a resolution, but it must not invent inventory or assume change, replacement or refund authority.",
    },
  },
  "travel-booking": {
    title: { es: "Gestionar una reserva de viaje desde consulta hasta confirmación", en: "Manage a travel booking from inquiry to confirmation" },
    seoTitle: { es: "Gestión de reservas de viajes con IA y control | IA Empleado", en: "Travel booking management with AI controls | IA Empleado" },
    seoDescription: {
      es: "Gestiona consultas, disponibilidad, opciones, datos y confirmaciones de reservas con fuentes autoritativas, trazabilidad y control sobre cambios económicos.",
      en: "Manage travel inquiries, availability, options, traveler data and booking confirmations with authoritative sources, traceability and financial controls.",
    },
    eyebrow: { es: "CASO DE USO · GESTIÓN DE RESERVAS", en: "USE CASE · TRAVEL BOOKING MANAGEMENT" },
    heroTitle: {
      es: "Gestión de reservas: convierte una consulta en una confirmación sin confundir opción, disponibilidad y reserva real.",
      en: "Travel booking management: move from inquiry to confirmation without confusing option, availability and a real booking.",
    },
    heroDescription: {
      es: "Este caso posee el workflow concreto de una reserva. La landing de automatización de reservas conserva la intención comercial de automatizar el proceso y la página de Turismo conserva el contexto sectorial completo.",
      en: "This use case owns the concrete booking workflow. The booking-automation landing retains commercial automation intent, while the Travel sector page retains the full industry context.",
    },
    shortAnswer: {
      es: "La gestión de reservas con IA puede estructurar la solicitud, consultar disponibilidad autorizada, preparar opciones, recoger datos y coordinar confirmación. Precio, condiciones y estado confirmado deben volver siempre a la fuente que realmente los gobierna.",
      en: "Travel booking management with AI can structure the request, check authorised availability, prepare options, collect data and coordinate confirmation. Price, terms and confirmed status must always come back to the source that actually governs them.",
    },
  },
  "administrative-documentation": {
    title: { es: "Automatizar documentación administrativa con trazabilidad", en: "Automate document workflows with administrative controls" },
    seoTitle: { es: "Automatización documental con IA y trazabilidad | IA Empleado", en: "Document workflow automation with AI controls | IA Empleado" },
    seoDescription: {
      es: "Automatiza clasificación, extracción, completitud y registro de documentos con procedencia, confianza, permisos y revisión humana donde el dato sea sensible.",
      en: "Automate document classification, extraction, completeness and record updates with provenance, confidence, permissions and human review for sensitive data.",
    },
    eyebrow: { es: "CASO DE USO · AUTOMATIZACIÓN DOCUMENTAL", en: "USE CASE · DOCUMENT WORKFLOW AUTOMATION" },
    heroTitle: {
      es: "Automatización documental: reduce clasificación y copia manual sin convertir una extracción incierta en verdad operativa.",
      en: "Document workflow automation: reduce classification and copying without turning uncertain extraction into operational truth.",
    },
    heroDescription: {
      es: "Este caso posee el flujo documental: entrada, clasificación, extracción, validación, registro y excepción. La integración de gestión documental conserva la intención de acceso/conector al sistema y la automatización administrativa conserva el proceso administrativo más amplio.",
      en: "This use case owns the document workflow: intake, classification, extraction, validation, record update and exception. The document-management integration retains system-access/connector intent, while administrative automation retains the broader administrative process.",
    },
    shortAnswer: {
      es: "La automatización documental con IA puede clasificar documentos, extraer campos y preparar actualizaciones si cada dato conserva procedencia y nivel de confianza. Un dato sensible, incompleto o de baja confianza debe validarse antes de convertirse en registro autoritativo.",
      en: "Document workflow automation with AI can classify documents, extract fields and prepare updates when every value retains provenance and confidence. Sensitive, incomplete or low-confidence data should be validated before becoming an authoritative record.",
    },
  },
};

const optimizedIndexOverrides: Record<Locale, Partial<ClusterIndexContent>> = {
  es: {
    seoTitle: "Casos de uso IA en empresas | 6 procesos reales y controlados",
    seoDescription: "Explora casos de uso de IA para reclamaciones, facturas, seguimiento de leads, pedidos, reservas y documentos con sistemas, responsables, métricas y control humano.",
    eyebrow: "CASOS DE USO IA",
    title: "Casos de uso de IA: seis procesos concretos con sistemas, responsables y control humano.",
    description: "Un caso de uso de IA útil empieza por un problema y un resultado verificable. Estas páginas separan la intención del problema —reclamación, validación, seguimiento, excepción, reserva o documento— de las landings que venden automatización, de los roles que ejecutan trabajo y de las integraciones que dan acceso a sistemas.",
    cardsTitle: "Seis casos de uso con un propietario de intención distinto",
    cardsIntro: "Cada patrón define entrada, pasos, sistemas, límites y métricas. Cuando existe una landing Growth relacionada, esta conserva la intención de automatización comercial y el caso de uso se mantiene en el problema o resultado acotado.",
  },
  en: {
    seoTitle: "AI use cases for business | 6 governed workflow patterns",
    seoDescription: "Explore AI use cases for customer issues, invoices, sales follow up, orders, bookings and documents with systems, owners, metrics and human control.",
    eyebrow: "AI USE CASES",
    title: "AI use cases: six concrete workflows with systems, owners and human control.",
    description: "A useful AI use case starts with a problem and a verifiable outcome. These pages separate bounded problem intent—complaint, validation, follow-up, exception, booking or document—from automation landings, specialist roles and system integrations.",
    cardsTitle: "Six use cases with distinct intent ownership",
    cardsIntro: "Each pattern defines its input, steps, systems, limits and metrics. Where a related Growth landing exists, it keeps commercial automation intent while the use case stays focused on the bounded problem or outcome.",
  },
};

export const optimizedUseCaseIndexContent: Record<Locale, ClusterIndexContent> = {
  es: { ...useCaseIndexContent.es, ...optimizedIndexOverrides.es },
  en: { ...useCaseIndexContent.en, ...optimizedIndexOverrides.en },
};

export const optimizedUseCaseRecords: UseCaseRecord[] = useCaseRecords.map((record) => ({
  ...record,
  ...useCaseOverrides[record.key],
}));

export function getOptimizedUseCaseBySlug(slug: string, locale: Locale): UseCaseRecord | undefined {
  return optimizedUseCaseRecords.find((record) => record.slugs[locale] === slug);
}

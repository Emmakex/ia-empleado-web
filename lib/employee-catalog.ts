import type { Locale } from "./i18n";

export type EmployeeKey =
  | "customer-support"
  | "administrative"
  | "accounting-billing"
  | "sales-sdr";

export type EmployeeAvailability = "reference" | "content-next";

type LocalizedSummary = {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  department: string;
  focus: string;
  statusLabel: string;
  cardCta: string;
};

type EmployeeFaq = {
  question: string;
  answer: string;
};

export type LocalizedEmployeeDetail = LocalizedSummary & {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  definitionTitle: string;
  definitionBody: string;
  tasksTitle: string;
  tasks: string[];
  workflowTitle: string;
  workflowIntro: string;
  workflow: Array<{ title: string; text: string }>;
  systemsTitle: string;
  systemsIntro: string;
  systems: string[];
  collaborationTitle: string;
  collaborationIntro: string;
  collaboration: Array<{ title: string; text: string }>;
  supervisionTitle: string;
  supervisionIntro: string;
  supervision: string[];
  useCasesTitle: string;
  useCases: Array<{ title: string; text: string }>;
  sectorsTitle: string;
  sectors: string[];
  limitsTitle: string;
  limits: string[];
  faqTitle: string;
  faq: EmployeeFaq[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type EmployeeRecord = {
  key: EmployeeKey;
  availability: EmployeeAvailability;
  locales: Record<Locale, LocalizedSummary>;
  detail?: Record<Locale, LocalizedEmployeeDetail>;
};

const employees: EmployeeRecord[] = [
  {
    key: "customer-support",
    availability: "reference",
    locales: {
      es: {
        slug: "atencion-cliente",
        name: "Empleado IA de Atención al Cliente",
        shortName: "Atención al Cliente IA",
        description: "Ayuda a gestionar consultas repetitivas, localizar contexto de cliente o pedido, actualizar casos y escalar excepciones según las políticas de cada empresa.",
        department: "Atención al cliente",
        focus: "Consultas, pedidos, incidencias y seguimiento",
        statusLabel: "Perfil de referencia",
        cardCta: "Ver perfil completo",
      },
      en: {
        slug: "customer-support",
        name: "Customer Support AI Employee",
        shortName: "Customer Support AI",
        description: "Helps manage repetitive requests, retrieve customer or order context, update cases and escalate exceptions under each company’s policies.",
        department: "Customer service",
        focus: "Questions, orders, incidents and follow-up",
        statusLabel: "Reference profile",
        cardCta: "View full profile",
      },
    },
    detail: {
      es: {
        slug: "atencion-cliente",
        name: "Empleado IA de Atención al Cliente",
        shortName: "Atención al Cliente IA",
        description: "Ayuda a gestionar consultas repetitivas, localizar contexto de cliente o pedido, actualizar casos y escalar excepciones según las políticas de cada empresa.",
        department: "Atención al cliente",
        focus: "Consultas, pedidos, incidencias y seguimiento",
        statusLabel: "Perfil de referencia",
        cardCta: "Ver perfil completo",
        seoTitle: "Empleado IA de Atención al Cliente | IA Empleado",
        seoDescription: "Qué es un Empleado IA de Atención al Cliente, qué tareas puede asumir, cómo se conecta a CRM, ecommerce o ticketing y cuándo debe intervenir una persona.",
        eyebrow: "EMPLEADO IA · ATENCIÓN AL CLIENTE",
        heroTitle: "Atención al cliente que trabaja con contexto, sistemas y reglas.",
        heroDescription: "Un Empleado IA de Atención al Cliente está diseñado para resolver trabajo repetitivo de soporte, consultar información autorizada y coordinarse con otros roles sin convertir cada conversación en una automatización sin control.",
        definitionTitle: "¿Qué es un Empleado IA de Atención al Cliente?",
        definitionBody: "Es un trabajador digital especializado en flujos acotados de servicio al cliente. Puede recibir solicitudes, interpretar su intención, consultar fuentes aprobadas, preparar o ejecutar acciones de bajo riesgo cuando la política lo permite y escalar los casos que requieren criterio humano, autorización o información adicional.",
        tasksTitle: "Tareas que puede asumir",
        tasks: [
          "Clasificar consultas recibidas por email o chat.",
          "Responder preguntas frecuentes usando conocimiento aprobado.",
          "Identificar cliente, pedido, servicio o incidencia antes de actuar.",
          "Consultar CRM, ecommerce, ERP, ticketing o sistemas de servicio autorizados.",
          "Informar de estados de pedido, envío, solicitud o caso cuando el dato es fiable.",
          "Crear y actualizar tickets o casos con trazabilidad.",
          "Preparar cambios de bajo riesgo definidos por política.",
          "Gestionar devoluciones o reembolsos solo dentro de reglas y umbrales explícitos.",
          "Escalar excepciones, identidad incierta o acciones relevantes a una persona.",
        ],
        workflowTitle: "Cómo trabaja dentro de un proceso",
        workflowIntro: "El valor no está en responder rápido por sí solo, sino en conectar la conversación con el proceso empresarial correcto.",
        workflow: [
          { title: "1. Recibe", text: "Entra una consulta por un canal autorizado y se identifica intención, contexto disponible y urgencia." },
          { title: "2. Verifica", text: "Busca información en conocimiento y sistemas permitidos antes de afirmar datos o modificar registros." },
          { title: "3. Decide la ruta", text: "La política determina si puede responder, ejecutar una acción de bajo riesgo, pedir datos o escalar." },
          { title: "4. Coordina", text: "Si el caso cruza otro proceso, deriva trabajo estructurado a Administración, Facturación u otro empleado especializado." },
          { title: "5. Cierra y registra", text: "Comunica el resultado y conserva el historial necesario para seguimiento, auditoría y mejora." },
        ],
        systemsTitle: "Sistemas con los que puede trabajar",
        systemsIntro: "Las integraciones reales dependen del entorno de cada empresa. No todos los despliegues necesitan todos los conectores.",
        systems: ["Email", "Chat", "CRM", "Ecommerce", "ERP", "Ticketing", "Envíos", "Base de conocimiento", "APIs internas"],
        collaborationTitle: "No trabaja aislado",
        collaborationIntro: "Una incidencia de cliente suele atravesar más de un departamento. El Empleado IA puede entregar una tarea estructurada al rol adecuado y recuperar el resultado para continuar la conversación.",
        collaboration: [
          { title: "Con Administrativo IA", text: "Para corregir datos, completar registros, solicitar documentación o gestionar un trámite interno." },
          { title: "Con Contabilidad y Facturación IA", text: "Para revisar una factura, preparar una corrección o validar un estado de cobro sin delegar autoridad financiera ilimitada." },
          { title: "Con Gestión de Pedidos", text: "Para incidencias de stock, preparación, entrega, cambios de pedido o coordinación con proveedores." },
          { title: "Con personas", text: "Para excepciones, reclamaciones sensibles, identidad incierta o cualquier acción que la política reserve a supervisión humana." },
        ],
        supervisionTitle: "Qué permanece bajo control humano",
        supervisionIntro: "La capacidad técnica y la autoridad empresarial son cosas distintas. El empleado solo actúa dentro del alcance configurado.",
        supervision: [
          "Reembolsos, créditos o compensaciones por encima de umbrales definidos.",
          "Cambios relevantes cuando no existe una coincidencia fiable del cliente o recurso.",
          "Casos donde la información disponible es contradictoria o insuficiente.",
          "Situaciones sensibles, reclamaciones complejas o excepciones fuera de política.",
          "Cualquier permiso que la empresa decida mantener exclusivamente en manos humanas.",
        ],
        useCasesTitle: "Ejemplos de uso",
        useCases: [
          { title: "Estado de pedido", text: "Recibe la consulta, identifica el pedido correcto, consulta el sistema autorizado y responde con el estado real disponible." },
          { title: "Factura incorrecta", text: "Detecta que el problema pertenece también a Facturación, genera una tarea estructurada y mantiene al cliente informado durante el proceso." },
          { title: "Devolución dentro de política", text: "Comprueba pedido, plazo y condiciones. Puede preparar o ejecutar el siguiente paso solo si las reglas y permisos del despliegue lo autorizan." },
          { title: "Caso no estándar", text: "Resume lo ocurrido, adjunta contexto relevante y lo entrega a una persona para evitar que el cliente tenga que repetir toda la historia." },
        ],
        sectorsTitle: "Dónde encaja especialmente bien",
        sectors: ["Ecommerce", "Retail", "Turismo y reservas", "Servicios B2B", "Software y SaaS", "Distribución", "Empresas con alto volumen de consultas"],
        limitsTitle: "Lo que no debe prometerse",
        limits: [
          "No significa que todas las consultas puedan automatizarse al 100%.",
          "No obtiene autoridad financiera, contractual o de acceso por el hecho de usar IA.",
          "No debe inventar datos de pedidos, clientes o políticas cuando una fuente autorizada no los confirma.",
          "Voz, visión, navegación web y otros módulos son capacidades opcionales, no requisitos del perfil base.",
          "El alcance final depende de integraciones, calidad de datos, excepciones y políticas de cada organización.",
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { question: "¿Es lo mismo que un chatbot?", answer: "No necesariamente. Un chatbot se centra en conversación. Un Empleado IA se define por un trabajo, herramientas autorizadas, permisos, políticas, memoria o conocimiento acotados, trazabilidad y reglas de supervisión." },
          { question: "¿Puede conectarse al CRM o ecommerce?", answer: "Sí cuando existe una integración aprobada para el entorno del cliente. El perfil está pensado para trabajar con CRM, ecommerce, ERP, ticketing y otras fuentes, pero cada despliegue incorpora solo los conectores necesarios." },
          { question: "¿Puede hacer reembolsos automáticamente?", answer: "Solo dentro de reglas deterministas, permisos y umbrales explícitos. Acciones de mayor impacto pueden requerir aprobación humana y nunca se asume autoridad ilimitada por defecto." },
          { question: "¿Puede trabajar con otros Empleados IA?", answer: "Sí. La visión de IA Empleado permite que roles especializados se pasen tareas y contexto autorizado para resolver procesos transversales, manteniendo límites de acceso y supervisión." },
          { question: "¿Sustituye completamente al equipo de soporte?", answer: "El objetivo es absorber trabajo repetitivo y mejorar capacidad operativa. Las excepciones, decisiones relevantes y situaciones sensibles pueden seguir siendo responsabilidad de personas según la política de la empresa." },
        ],
        ctaEyebrow: "DISEÑA TU PROCESO",
        ctaTitle: "¿Qué parte de tu atención al cliente debería asumir primero un Empleado IA?",
        ctaText: "Podemos partir de un proceso concreto, los sistemas que ya utilizas y los puntos donde quieres mantener aprobación humana.",
        ctaPrimary: "Analizar mi caso",
        ctaSecondary: "Ver todos los Empleados IA",
      },
      en: {
        slug: "customer-support",
        name: "Customer Support AI Employee",
        shortName: "Customer Support AI",
        description: "Helps manage repetitive requests, retrieve customer or order context, update cases and escalate exceptions under each company’s policies.",
        department: "Customer service",
        focus: "Questions, orders, incidents and follow-up",
        statusLabel: "Reference profile",
        cardCta: "View full profile",
        seoTitle: "Customer Support AI Employee | IA Empleado",
        seoDescription: "What a Customer Support AI Employee is, which tasks it can take on, how it connects to CRM, ecommerce or ticketing, and when a person must intervene.",
        eyebrow: "AI EMPLOYEE · CUSTOMER SUPPORT",
        heroTitle: "Customer support that works with context, systems and rules.",
        heroDescription: "A Customer Support AI Employee is designed to handle repetitive support work, consult approved information and coordinate with other roles without turning every conversation into uncontrolled automation.",
        definitionTitle: "What is a Customer Support AI Employee?",
        definitionBody: "It is a digital worker specialized in bounded customer-service workflows. It can receive requests, interpret intent, consult approved sources, prepare or execute low-risk actions when policy permits, and escalate cases that require human judgment, authorization or additional information.",
        tasksTitle: "Tasks it can take on",
        tasks: [
          "Classify requests received by email or chat.",
          "Answer frequent questions using approved knowledge.",
          "Identify the customer, order, service or incident before acting.",
          "Query authorized CRM, ecommerce, ERP, ticketing or service systems.",
          "Provide order, shipment, request or case status when the source is reliable.",
          "Create and update tickets or cases with traceability.",
          "Prepare low-risk changes defined by policy.",
          "Handle returns or refunds only within explicit rules and thresholds.",
          "Escalate exceptions, uncertain identity or consequential actions to a person.",
        ],
        workflowTitle: "How it works inside a process",
        workflowIntro: "The value is not just answering quickly. It is connecting the conversation to the right business process.",
        workflow: [
          { title: "1. Receive", text: "A request arrives through an approved channel and the employee identifies intent, available context and urgency." },
          { title: "2. Verify", text: "It checks approved knowledge and systems before asserting facts or changing records." },
          { title: "3. Choose the route", text: "Policy determines whether it can answer, perform a low-risk action, request more information or escalate." },
          { title: "4. Coordinate", text: "If the case crosses another process, it hands structured work to Administration, Billing or another specialist employee." },
          { title: "5. Close and record", text: "It communicates the outcome and preserves the history needed for follow-up, audit and improvement." },
        ],
        systemsTitle: "Systems it can work with",
        systemsIntro: "Actual integrations depend on each company environment. Not every deployment needs every connector.",
        systems: ["Email", "Chat", "CRM", "Ecommerce", "ERP", "Ticketing", "Shipping", "Knowledge base", "Internal APIs"],
        collaborationTitle: "It does not work in isolation",
        collaborationIntro: "A customer issue often crosses multiple departments. The AI Employee can hand structured work to the right role and recover the result to continue the conversation.",
        collaboration: [
          { title: "With Administrative AI", text: "To correct data, complete records, request documentation or handle an internal administrative step." },
          { title: "With Accounting & Billing AI", text: "To review an invoice, prepare a correction or validate payment status without delegating unlimited financial authority." },
          { title: "With Order Management", text: "For stock, fulfilment, delivery, order-change or supplier coordination issues." },
          { title: "With people", text: "For exceptions, sensitive complaints, uncertain identity or any action that policy reserves for human supervision." },
        ],
        supervisionTitle: "What remains under human control",
        supervisionIntro: "Technical capability and business authority are different things. The employee only acts inside its configured scope.",
        supervision: [
          "Refunds, credits or compensation above defined thresholds.",
          "Consequential changes when there is no reliable customer or resource match.",
          "Cases where available information is contradictory or insufficient.",
          "Sensitive situations, complex complaints or exceptions outside policy.",
          "Any permission the company chooses to keep exclusively human.",
        ],
        useCasesTitle: "Example use cases",
        useCases: [
          { title: "Order status", text: "Receives the request, identifies the correct order, checks the authorized system and replies with the real available status." },
          { title: "Incorrect invoice", text: "Detects that the issue also belongs to Billing, creates a structured task and keeps the customer informed through the process." },
          { title: "Return within policy", text: "Checks the order, time window and conditions. It can prepare or execute the next step only when deployment rules and permissions authorize it." },
          { title: "Non-standard case", text: "Summarizes what happened, attaches relevant context and hands it to a person so the customer does not have to repeat the whole story." },
        ],
        sectorsTitle: "Where it fits especially well",
        sectors: ["Ecommerce", "Retail", "Travel and reservations", "B2B services", "Software and SaaS", "Distribution", "Companies with high support volume"],
        limitsTitle: "What should not be promised",
        limits: [
          "It does not mean every customer request can be automated 100%.",
          "It does not gain financial, contractual or access authority simply because it uses AI.",
          "It must not invent order, customer or policy data when an authorized source does not confirm it.",
          "Voice, vision, browser automation and other modules are optional capabilities, not requirements of the base profile.",
          "Final scope depends on integrations, data quality, exceptions and each organization’s policies.",
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { question: "Is it the same as a chatbot?", answer: "Not necessarily. A chatbot focuses on conversation. An AI Employee is defined by a job, authorized tools, permissions, policies, bounded memory or knowledge, traceability and supervision rules." },
          { question: "Can it connect to CRM or ecommerce systems?", answer: "Yes when an approved integration exists for the customer environment. The profile is designed to work with CRM, ecommerce, ERP, ticketing and other sources, but each deployment includes only the connectors it needs." },
          { question: "Can it issue refunds automatically?", answer: "Only within deterministic rules, permissions and explicit thresholds. Higher-impact actions can require human approval, and unlimited authority is never assumed by default." },
          { question: "Can it work with other AI Employees?", answer: "Yes. IA Empleado is designed for specialized roles to hand off tasks and authorized context across processes while preserving access and supervision boundaries." },
          { question: "Does it fully replace a support team?", answer: "The goal is to absorb repetitive work and improve operational capacity. Exceptions, consequential decisions and sensitive situations can remain human responsibilities according to company policy." },
        ],
        ctaEyebrow: "DESIGN YOUR PROCESS",
        ctaTitle: "Which part of customer support should an AI Employee take on first?",
        ctaText: "We can start with one concrete process, the systems you already use and the points where you want to keep human approval.",
        ctaPrimary: "Analyze my use case",
        ctaSecondary: "View all AI Employees",
      },
    },
  },
  {
    key: "administrative",
    availability: "content-next",
    locales: {
      es: { slug: "administrativo", name: "Empleado IA Administrativo", shortName: "Administrativo IA", description: "Procesa correo, documentos, registros, formularios y seguimiento administrativo manteniendo trazabilidad y control humano en acciones relevantes.", department: "Administración", focus: "Documentos, registros y back office", statusLabel: "Perfil de referencia", cardCta: "Contenido profundo en preparación" },
      en: { slug: "administrative", name: "Administrative AI Employee", shortName: "Administrative AI", description: "Processes email, documents, records, forms and administrative follow-up while preserving traceability and human control over consequential actions.", department: "Administration", focus: "Documents, records and back office", statusLabel: "Reference profile", cardCta: "Deep content in preparation" },
    },
  },
  {
    key: "accounting-billing",
    availability: "content-next",
    locales: {
      es: { slug: "contabilidad-facturacion", name: "Empleado IA de Contabilidad y Facturación", shortName: "Contabilidad y Facturación IA", description: "Ayuda con entrada y validación de facturas, duplicados, vencimientos, conciliación básica, reporting y preparación de acciones para aprobación.", department: "Finanzas", focus: "Facturas, controles y seguimiento", statusLabel: "Perfil de referencia", cardCta: "Contenido profundo en preparación" },
      en: { slug: "accounting-billing", name: "Accounting & Billing AI Employee", shortName: "Accounting & Billing AI", description: "Helps with invoice intake and validation, duplicate checks, due dates, basic reconciliation, reporting and preparation of actions for approval.", department: "Finance", focus: "Invoices, controls and follow-up", statusLabel: "Reference profile", cardCta: "Deep content in preparation" },
    },
  },
  {
    key: "sales-sdr",
    availability: "content-next",
    locales: {
      es: { slug: "comercial-sdr", name: "Empleado IA Comercial SDR", shortName: "Comercial SDR IA", description: "Apoya investigación aprobada, higiene de CRM, cualificación, preparación de outreach, seguimiento y coordinación de reuniones bajo reglas de canal y supervisión.", department: "Ventas", focus: "Prospección, CRM y seguimiento", statusLabel: "Perfil de referencia", cardCta: "Contenido profundo en preparación" },
      en: { slug: "sales-sdr", name: "Sales / SDR AI Employee", shortName: "Sales SDR AI", description: "Supports approved research, CRM hygiene, qualification, outreach preparation, follow-up and meeting coordination under channel and supervision policies.", department: "Sales", focus: "Prospecting, CRM and follow-up", statusLabel: "Reference profile", cardCta: "Deep content in preparation" },
    },
  },
];

export function getEmployeeCatalog(locale: Locale) {
  return employees.map((employee) => ({
    key: employee.key,
    availability: employee.availability,
    ...employee.locales[locale],
    href: employee.detail ? employeeDetailPath(employee.key, locale) : null,
  }));
}

export function getEmployeeBySlug(locale: Locale, slug: string) {
  const employee = employees.find((item) => item.detail?.[locale].slug === slug);
  if (!employee?.detail) return null;
  return {
    key: employee.key,
    availability: employee.availability,
    content: employee.detail[locale],
    alternate: employee.detail[locale === "es" ? "en" : "es"],
  };
}

export function getDetailedEmployeeRecords() {
  return employees.filter((employee) => employee.detail);
}

export function employeeIndexPath(locale: Locale) {
  return locale === "es" ? "/empleados-ia" : "/en/ai-employees";
}

export function employeeDetailPath(key: EmployeeKey, locale: Locale) {
  const employee = employees.find((item) => item.key === key);
  if (!employee?.detail) return employeeIndexPath(locale);
  const slug = employee.detail[locale].slug;
  return locale === "es" ? `/empleados-ia/${slug}` : `/en/ai-employees/${slug}`;
}

export function alternateEmployeePath(key: EmployeeKey, locale: Locale) {
  return employeeDetailPath(key, locale === "es" ? "en" : "es");
}

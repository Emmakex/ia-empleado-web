import type { Locale } from "./i18n";
import type { EmployeeKey } from "./employee-catalog";
import { employeeDetailPath } from "./employee-content-engine";

export type DiscoveryStatus = "reference" | "catalog" | "restricted";

type LocalizedLabel = Record<Locale, string>;

type TaxonomyItem = {
  id: string;
  label: LocalizedLabel;
};

const departments = [
  { id: "customer-service", label: { es: "Atención al cliente", en: "Customer service" } },
  { id: "administration", label: { es: "Administración", en: "Administration" } },
  { id: "finance", label: { es: "Finanzas", en: "Finance" } },
  { id: "front-desk", label: { es: "Recepción", en: "Front desk" } },
  { id: "operations", label: { es: "Operaciones", en: "Operations" } },
  { id: "ecommerce", label: { es: "Ecommerce", en: "Ecommerce" } },
  { id: "analytics", label: { es: "Analítica", en: "Analytics" } },
  { id: "sales", label: { es: "Ventas", en: "Sales" } },
  { id: "marketing", label: { es: "Marketing", en: "Marketing" } },
  { id: "travel", label: { es: "Viajes y reservas", en: "Travel and reservations" } },
  { id: "logistics", label: { es: "Logística", en: "Logistics" } },
  { id: "technology", label: { es: "Tecnología", en: "Technology" } },
  { id: "knowledge", label: { es: "Conocimiento", en: "Knowledge" } },
  { id: "professional-services", label: { es: "Servicios profesionales", en: "Professional services" } },
  { id: "legal", label: { es: "Legal", en: "Legal" } },
  { id: "hr", label: { es: "Recursos humanos", en: "Human resources" } },
] as const satisfies readonly TaxonomyItem[];

const sectors = [
  { id: "cross-sector", label: { es: "Multisector", en: "Cross-sector" } },
  { id: "ecommerce-retail", label: { es: "Ecommerce y retail", en: "Ecommerce and retail" } },
  { id: "professional-services", label: { es: "Servicios profesionales", en: "Professional services" } },
  { id: "travel-hospitality", label: { es: "Turismo y hospitality", en: "Travel and hospitality" } },
  { id: "software-technology", label: { es: "Software y tecnología", en: "Software and technology" } },
  { id: "logistics-distribution", label: { es: "Logística y distribución", en: "Logistics and distribution" } },
] as const satisfies readonly TaxonomyItem[];

const problems = [
  { id: "inbox-overload", label: { es: "Sobrecarga de correo", en: "Inbox overload" } },
  { id: "repetitive-requests", label: { es: "Consultas repetitivas", en: "Repetitive requests" } },
  { id: "manual-data", label: { es: "Entrada manual de datos", en: "Manual data entry" } },
  { id: "document-backlog", label: { es: "Acumulación documental", en: "Document backlog" } },
  { id: "billing-control", label: { es: "Control de facturación", en: "Billing control" } },
  { id: "order-exceptions", label: { es: "Incidencias de pedidos", en: "Order exceptions" } },
  { id: "follow-up-gaps", label: { es: "Seguimiento inconsistente", en: "Follow-up gaps" } },
  { id: "reporting-delay", label: { es: "Reporting lento", en: "Slow reporting" } },
  { id: "booking-volume", label: { es: "Alto volumen de reservas", en: "High booking volume" } },
  { id: "operational-coordination", label: { es: "Coordinación operativa", en: "Operational coordination" } },
  { id: "support-queues", label: { es: "Colas de soporte", en: "Support queues" } },
  { id: "quality-risk", label: { es: "Riesgo de calidad", en: "Quality risk" } },
  { id: "knowledge-sprawl", label: { es: "Conocimiento disperso", en: "Knowledge sprawl" } },
  { id: "regulated-decisions", label: { es: "Decisiones reguladas o de alto impacto", en: "Regulated or high-impact decisions" } },
] as const satisfies readonly TaxonomyItem[];

const tasks = [
  { id: "email", label: { es: "Procesar email", en: "Process email" } },
  { id: "customer-service", label: { es: "Atender consultas", en: "Handle customer requests" } },
  { id: "records", label: { es: "Actualizar registros", en: "Update records" } },
  { id: "documents", label: { es: "Gestionar documentos", en: "Manage documents" } },
  { id: "ocr", label: { es: "Extraer datos / OCR", en: "Extract data / OCR" } },
  { id: "billing", label: { es: "Validar facturas", en: "Validate invoices" } },
  { id: "scheduling", label: { es: "Coordinar citas", en: "Coordinate appointments" } },
  { id: "orders", label: { es: "Gestionar pedidos", en: "Manage orders" } },
  { id: "ecommerce-ops", label: { es: "Operar ecommerce", en: "Operate ecommerce" } },
  { id: "reporting", label: { es: "Preparar reporting", en: "Prepare reporting" } },
  { id: "crm", label: { es: "Mantener CRM", en: "Maintain CRM" } },
  { id: "research", label: { es: "Investigar contexto", en: "Research context" } },
  { id: "outreach", label: { es: "Preparar seguimiento comercial", en: "Prepare sales outreach" } },
  { id: "marketing-ops", label: { es: "Operar marketing", en: "Run marketing operations" } },
  { id: "reservations", label: { es: "Gestionar reservas", en: "Manage reservations" } },
  { id: "logistics", label: { es: "Coordinar logística", en: "Coordinate logistics" } },
  { id: "ticketing", label: { es: "Gestionar tickets", en: "Manage tickets" } },
  { id: "software-testing", label: { es: "Probar software", en: "Test software" } },
  { id: "documentation", label: { es: "Crear documentación", en: "Create documentation" } },
  { id: "case-preparation", label: { es: "Preparar expedientes", en: "Prepare cases" } },
  { id: "hr-admin", label: { es: "Administrar RRHH", en: "Administer HR" } },
  { id: "screening", label: { es: "Apoyar cribado", en: "Support screening" } },
  { id: "financial-assessment", label: { es: "Apoyar evaluación financiera", en: "Support financial assessment" } },
] as const satisfies readonly TaxonomyItem[];

type DiscoveryLocalizedContent = {
  name: string;
  shortName: string;
  description: string;
  focus: string;
};

export type DiscoveryProfileKey =
  | "email-manager"
  | "customer-support"
  | "administrative"
  | "accounting-billing"
  | "receptionist"
  | "order-management"
  | "ecommerce-operations"
  | "back-office"
  | "reporting"
  | "sales-sdr"
  | "marketing-operations"
  | "travel-agent"
  | "reservations"
  | "logistics-operations"
  | "it-support-l1"
  | "software-qa"
  | "documentation"
  | "gestoria-operations"
  | "legal-assistant"
  | "hr-administration"
  | "recruitment-selection"
  | "financial-decisions";

type DiscoveryProfile = {
  key: DiscoveryProfileKey;
  status: DiscoveryStatus;
  deepProfileKey?: EmployeeKey;
  departmentId: string;
  sectorIds: string[];
  problemIds: string[];
  taskIds: string[];
  relatedKeys: DiscoveryProfileKey[];
  locales: Record<Locale, DiscoveryLocalizedContent>;
};

const profiles: DiscoveryProfile[] = [
  {
    key: "email-manager",
    status: "catalog",
    departmentId: "administration",
    sectorIds: ["cross-sector", "professional-services"],
    problemIds: ["inbox-overload", "follow-up-gaps", "manual-data"],
    taskIds: ["email", "records", "documents"],
    relatedKeys: ["administrative", "sales-sdr", "receptionist", "documentation"],
    locales: {
      es: { name: "Empleado IA Gestor de Correo", shortName: "Gestor de Correo IA", description: "Clasifica, prioriza y enruta mensajes, prepara respuestas y convierte correos en tareas o registros trazables según reglas de la empresa.", focus: "Bandejas de entrada, clasificación, routing y seguimiento" },
      en: { name: "Email Manager AI Employee", shortName: "Email Manager AI", description: "Classifies, prioritizes and routes messages, prepares replies and turns email into traceable tasks or records under company rules.", focus: "Inboxes, classification, routing and follow-up" },
    },
  },
  {
    key: "customer-support",
    status: "reference",
    deepProfileKey: "customer-support",
    departmentId: "customer-service",
    sectorIds: ["cross-sector", "ecommerce-retail", "travel-hospitality", "software-technology"],
    problemIds: ["repetitive-requests", "support-queues", "order-exceptions"],
    taskIds: ["customer-service", "email", "ticketing", "orders"],
    relatedKeys: ["administrative", "accounting-billing", "order-management", "ecommerce-operations"],
    locales: {
      es: { name: "Empleado IA de Atención al Cliente", shortName: "Atención al Cliente IA", description: "Gestiona consultas repetitivas, consulta contexto autorizado, actualiza casos y escala excepciones bajo políticas explícitas.", focus: "Consultas, pedidos, incidencias y seguimiento" },
      en: { name: "Customer Support AI Employee", shortName: "Customer Support AI", description: "Handles repetitive requests, checks authorized context, updates cases and escalates exceptions under explicit policies.", focus: "Questions, orders, incidents and follow-up" },
    },
  },
  {
    key: "administrative",
    status: "reference",
    deepProfileKey: "administrative",
    departmentId: "administration",
    sectorIds: ["cross-sector", "professional-services"],
    problemIds: ["manual-data", "document-backlog", "inbox-overload"],
    taskIds: ["email", "records", "documents", "ocr"],
    relatedKeys: ["email-manager", "accounting-billing", "documentation", "gestoria-operations"],
    locales: {
      es: { name: "Empleado IA Administrativo", shortName: "Administrativo IA", description: "Procesa correo, documentos, registros y formularios, prepara actualizaciones y deriva excepciones manteniendo trazabilidad.", focus: "Documentos, registros, formularios y back office" },
      en: { name: "Administrative AI Employee", shortName: "Administrative AI", description: "Processes email, documents, records and forms, prepares updates and routes exceptions while preserving traceability.", focus: "Documents, records, forms and back office" },
    },
  },
  {
    key: "accounting-billing",
    status: "reference",
    deepProfileKey: "accounting-billing",
    departmentId: "finance",
    sectorIds: ["cross-sector", "ecommerce-retail", "professional-services"],
    problemIds: ["billing-control", "document-backlog", "manual-data"],
    taskIds: ["billing", "documents", "ocr", "reporting"],
    relatedKeys: ["administrative", "reporting", "order-management", "customer-support"],
    locales: {
      es: { name: "Empleado IA de Contabilidad y Facturación", shortName: "Contabilidad y Facturación IA", description: "Ayuda con entrada y validación de facturas, duplicados, vencimientos, conciliación básica, reporting y preparación de acciones para aprobación.", focus: "Facturas, controles, vencimientos y seguimiento" },
      en: { name: "Accounting & Billing AI Employee", shortName: "Accounting & Billing AI", description: "Helps with invoice intake and validation, duplicates, due dates, basic reconciliation, reporting and approval preparation.", focus: "Invoices, controls, due dates and follow-up" },
    },
  },
  {
    key: "receptionist",
    status: "catalog",
    departmentId: "front-desk",
    sectorIds: ["cross-sector", "professional-services", "travel-hospitality"],
    problemIds: ["repetitive-requests", "booking-volume", "inbox-overload"],
    taskIds: ["customer-service", "email", "scheduling"],
    relatedKeys: ["email-manager", "administrative", "reservations", "sales-sdr"],
    locales: {
      es: { name: "Empleado IA Recepcionista", shortName: "Recepcionista IA", description: "Atiende primeras consultas, recoge contexto, agenda citas y deriva cada solicitud al proceso o persona adecuada.", focus: "Recepción, agenda, derivación y primera atención" },
      en: { name: "Receptionist AI Employee", shortName: "Receptionist AI", description: "Handles first-line requests, gathers context, schedules appointments and routes each request to the right process or person.", focus: "Front desk, scheduling, routing and first response" },
    },
  },
  {
    key: "order-management",
    status: "catalog",
    departmentId: "operations",
    sectorIds: ["ecommerce-retail", "logistics-distribution"],
    problemIds: ["order-exceptions", "operational-coordination", "follow-up-gaps"],
    taskIds: ["orders", "records", "email", "reporting"],
    relatedKeys: ["customer-support", "ecommerce-operations", "logistics-operations", "accounting-billing"],
    locales: {
      es: { name: "Empleado IA de Gestión de Pedidos", shortName: "Gestión de Pedidos IA", description: "Sigue pedidos, detecta incidencias, coordina cambios autorizados y mantiene sincronizados estados y comunicaciones.", focus: "Pedidos, estados, incidencias y coordinación" },
      en: { name: "Order Management AI Employee", shortName: "Order Management AI", description: "Tracks orders, detects exceptions, coordinates authorized changes and keeps statuses and communications synchronized.", focus: "Orders, statuses, exceptions and coordination" },
    },
  },
  {
    key: "ecommerce-operations",
    status: "catalog",
    departmentId: "ecommerce",
    sectorIds: ["ecommerce-retail"],
    problemIds: ["order-exceptions", "repetitive-requests", "reporting-delay"],
    taskIds: ["ecommerce-ops", "orders", "customer-service", "reporting"],
    relatedKeys: ["order-management", "customer-support", "accounting-billing", "marketing-operations"],
    locales: {
      es: { name: "Empleado IA de Operaciones Ecommerce", shortName: "Ecommerce Operations IA", description: "Apoya operaciones repetitivas de catálogo, pedidos, incidencias y seguimiento comercial conectadas con los sistemas de la tienda.", focus: "Catálogo, pedidos, operaciones y seguimiento" },
      en: { name: "Ecommerce Operations AI Employee", shortName: "Ecommerce Operations AI", description: "Supports repetitive catalog, order, exception and commercial follow-up work connected to store systems.", focus: "Catalog, orders, operations and follow-up" },
    },
  },
  {
    key: "back-office",
    status: "catalog",
    departmentId: "operations",
    sectorIds: ["cross-sector", "professional-services"],
    problemIds: ["manual-data", "document-backlog", "operational-coordination"],
    taskIds: ["records", "documents", "email", "reporting"],
    relatedKeys: ["administrative", "documentation", "reporting", "email-manager"],
    locales: {
      es: { name: "Empleado IA de Back Office", shortName: "Back Office IA", description: "Ejecuta trabajo operativo repetitivo entre sistemas, registros y documentación con reglas, colas y trazabilidad definidas.", focus: "Operaciones internas, registros y tareas repetitivas" },
      en: { name: "Back Office AI Employee", shortName: "Back Office AI", description: "Executes repetitive operational work across systems, records and documents with defined rules, queues and traceability.", focus: "Internal operations, records and repetitive work" },
    },
  },
  {
    key: "reporting",
    status: "catalog",
    departmentId: "analytics",
    sectorIds: ["cross-sector", "ecommerce-retail", "professional-services", "software-technology"],
    problemIds: ["reporting-delay", "manual-data"],
    taskIds: ["reporting", "records"],
    relatedKeys: ["accounting-billing", "sales-sdr", "marketing-operations", "logistics-operations"],
    locales: {
      es: { name: "Empleado IA de Reporting", shortName: "Reporting IA", description: "Recopila datos autorizados, prepara resúmenes recurrentes y ayuda a detectar desviaciones sin ocultar el origen de la información.", focus: "KPIs, resúmenes, seguimiento y alertas" },
      en: { name: "Reporting AI Employee", shortName: "Reporting AI", description: "Collects authorized data, prepares recurring summaries and helps detect deviations without hiding information provenance.", focus: "KPIs, summaries, monitoring and alerts" },
    },
  },
  {
    key: "sales-sdr",
    status: "reference",
    deepProfileKey: "sales-sdr",
    departmentId: "sales",
    sectorIds: ["cross-sector", "professional-services", "software-technology"],
    problemIds: ["follow-up-gaps", "manual-data", "inbox-overload"],
    taskIds: ["crm", "research", "outreach", "scheduling"],
    relatedKeys: ["email-manager", "marketing-operations", "reporting", "receptionist"],
    locales: {
      es: { name: "Empleado IA Comercial SDR", shortName: "Comercial SDR IA", description: "Apoya investigación aprobada, higiene de CRM, cualificación, preparación de outreach, seguimiento y coordinación de reuniones.", focus: "Prospección, CRM, seguimiento y reuniones" },
      en: { name: "Sales / SDR AI Employee", shortName: "Sales SDR AI", description: "Supports approved research, CRM hygiene, qualification, outreach preparation, follow-up and meeting coordination.", focus: "Prospecting, CRM, follow-up and meetings" },
    },
  },
  {
    key: "marketing-operations",
    status: "catalog",
    departmentId: "marketing",
    sectorIds: ["cross-sector", "ecommerce-retail", "software-technology"],
    problemIds: ["follow-up-gaps", "reporting-delay", "manual-data"],
    taskIds: ["marketing-ops", "reporting", "records", "research"],
    relatedKeys: ["sales-sdr", "reporting", "ecommerce-operations", "documentation"],
    locales: {
      es: { name: "Empleado IA de Marketing Operativo", shortName: "Marketing Operativo IA", description: "Apoya campañas, segmentación operativa, QA de contenidos, coordinación de activos y reporting dentro de procesos aprobados.", focus: "Campañas, contenidos, segmentación y reporting" },
      en: { name: "Marketing Operations AI Employee", shortName: "Marketing Operations AI", description: "Supports campaigns, operational segmentation, content QA, asset coordination and reporting inside approved processes.", focus: "Campaigns, content, segmentation and reporting" },
    },
  },
  {
    key: "travel-agent",
    status: "catalog",
    departmentId: "travel",
    sectorIds: ["travel-hospitality"],
    problemIds: ["booking-volume", "repetitive-requests", "operational-coordination"],
    taskIds: ["research", "reservations", "customer-service", "email"],
    relatedKeys: ["reservations", "customer-support", "administrative", "accounting-billing"],
    locales: {
      es: { name: "Empleado IA Agente de Viajes", shortName: "Agente de Viajes IA", description: "Ayuda a preparar opciones, consultar información autorizada y coordinar solicitudes con reservas y atención al viajero.", focus: "Consultas, propuestas, reservas y seguimiento" },
      en: { name: "Travel Agent AI Employee", shortName: "Travel Agent AI", description: "Helps prepare options, consult approved information and coordinate requests with reservations and traveler support.", focus: "Requests, proposals, reservations and follow-up" },
    },
  },
  {
    key: "reservations",
    status: "catalog",
    departmentId: "travel",
    sectorIds: ["travel-hospitality", "professional-services"],
    problemIds: ["booking-volume", "repetitive-requests", "follow-up-gaps"],
    taskIds: ["reservations", "scheduling", "email", "records"],
    relatedKeys: ["travel-agent", "receptionist", "customer-support", "administrative"],
    locales: {
      es: { name: "Empleado IA de Reservas", shortName: "Reservas IA", description: "Gestiona solicitudes de disponibilidad, recoge datos, prepara reservas y mantiene seguimiento bajo reglas de capacidad y autorización.", focus: "Disponibilidad, reservas, cambios y seguimiento" },
      en: { name: "Reservations AI Employee", shortName: "Reservations AI", description: "Handles availability requests, collects details, prepares bookings and maintains follow-up under capacity and authorization rules.", focus: "Availability, bookings, changes and follow-up" },
    },
  },
  {
    key: "logistics-operations",
    status: "catalog",
    departmentId: "logistics",
    sectorIds: ["logistics-distribution", "ecommerce-retail"],
    problemIds: ["operational-coordination", "order-exceptions", "reporting-delay"],
    taskIds: ["logistics", "orders", "records", "reporting"],
    relatedKeys: ["order-management", "customer-support", "reporting", "back-office"],
    locales: {
      es: { name: "Empleado IA de Operaciones Logísticas", shortName: "Logística IA", description: "Coordina estados, incidencias y tareas operativas entre pedidos, almacén, transporte y atención al cliente cuando existen integraciones aprobadas.", focus: "Estados, incidencias, coordinación y reporting" },
      en: { name: "Logistics Operations AI Employee", shortName: "Logistics AI", description: "Coordinates statuses, exceptions and operational tasks across orders, warehouse, transport and customer support when approved integrations exist.", focus: "Statuses, exceptions, coordination and reporting" },
    },
  },
  {
    key: "it-support-l1",
    status: "catalog",
    departmentId: "technology",
    sectorIds: ["cross-sector", "software-technology"],
    problemIds: ["support-queues", "repetitive-requests", "knowledge-sprawl"],
    taskIds: ["ticketing", "customer-service", "documentation"],
    relatedKeys: ["documentation", "software-qa", "reporting", "email-manager"],
    locales: {
      es: { name: "Empleado IA de Soporte IT L1", shortName: "Soporte IT L1 IA", description: "Clasifica incidencias, consulta conocimiento aprobado, ejecuta pasos de bajo riesgo y escala problemas que requieren acceso o diagnóstico especializado.", focus: "Tickets, troubleshooting básico y escalado" },
      en: { name: "IT Support L1 AI Employee", shortName: "IT Support L1 AI", description: "Classifies incidents, consults approved knowledge, executes low-risk steps and escalates issues requiring privileged access or specialist diagnosis.", focus: "Tickets, basic troubleshooting and escalation" },
    },
  },
  {
    key: "software-qa",
    status: "catalog",
    departmentId: "technology",
    sectorIds: ["software-technology"],
    problemIds: ["quality-risk", "reporting-delay"],
    taskIds: ["software-testing", "documentation", "reporting"],
    relatedKeys: ["it-support-l1", "documentation", "reporting", "back-office"],
    locales: {
      es: { name: "Empleado IA de Software QA", shortName: "Software QA IA", description: "Ayuda a preparar casos, ejecutar comprobaciones autorizadas, registrar evidencias y resumir regresiones para revisión del equipo de desarrollo.", focus: "Pruebas, evidencias, regresiones y documentación" },
      en: { name: "Software QA AI Employee", shortName: "Software QA AI", description: "Helps prepare cases, run authorized checks, record evidence and summarize regressions for development-team review.", focus: "Testing, evidence, regressions and documentation" },
    },
  },
  {
    key: "documentation",
    status: "catalog",
    departmentId: "knowledge",
    sectorIds: ["cross-sector", "professional-services", "software-technology"],
    problemIds: ["knowledge-sprawl", "document-backlog"],
    taskIds: ["documentation", "documents", "research"],
    relatedKeys: ["administrative", "it-support-l1", "software-qa", "legal-assistant"],
    locales: {
      es: { name: "Empleado IA de Documentación", shortName: "Documentación IA", description: "Organiza fuentes aprobadas, redacta borradores, actualiza documentación y señala inconsistencias o información pendiente de validar.", focus: "Manuales, conocimiento, actualización y consistencia" },
      en: { name: "Documentation AI Employee", shortName: "Documentation AI", description: "Organizes approved sources, drafts content, updates documentation and flags inconsistencies or information that still requires validation.", focus: "Manuals, knowledge, updates and consistency" },
    },
  },
  {
    key: "gestoria-operations",
    status: "catalog",
    departmentId: "professional-services",
    sectorIds: ["professional-services"],
    problemIds: ["document-backlog", "manual-data", "follow-up-gaps"],
    taskIds: ["documents", "records", "case-preparation", "email"],
    relatedKeys: ["administrative", "documentation", "accounting-billing", "legal-assistant"],
    locales: {
      es: { name: "Empleado IA de Gestoría Operativa", shortName: "Gestoría Operativa IA", description: "Prepara expedientes, revisa completitud documental, mantiene seguimiento y organiza información para que un profesional gestione el trámite.", focus: "Expedientes, documentos, seguimiento y preparación" },
      en: { name: "Gestoría Operations AI Employee", shortName: "Gestoría Operations AI", description: "Prepares cases, checks document completeness, maintains follow-up and organizes information for a professional to handle the procedure.", focus: "Cases, documents, follow-up and preparation" },
    },
  },
  {
    key: "legal-assistant",
    status: "catalog",
    departmentId: "legal",
    sectorIds: ["professional-services", "cross-sector"],
    problemIds: ["document-backlog", "knowledge-sprawl", "quality-risk"],
    taskIds: ["documents", "research", "case-preparation", "documentation"],
    relatedKeys: ["documentation", "gestoria-operations", "administrative", "email-manager"],
    locales: {
      es: { name: "Empleado IA Asistente Jurídico", shortName: "Asistente Jurídico IA", description: "Apoya búsqueda y organización de información, preparación documental y resúmenes, sin sustituir criterio jurídico ni asumir decisiones profesionales.", focus: "Documentación, investigación y preparación jurídica" },
      en: { name: "Legal Assistant AI Employee", shortName: "Legal Assistant AI", description: "Supports information research and organization, document preparation and summaries without replacing legal judgment or assuming professional decisions.", focus: "Documents, research and legal preparation" },
    },
  },
  {
    key: "hr-administration",
    status: "catalog",
    departmentId: "hr",
    sectorIds: ["cross-sector", "professional-services"],
    problemIds: ["manual-data", "document-backlog", "follow-up-gaps"],
    taskIds: ["hr-admin", "records", "documents", "email"],
    relatedKeys: ["administrative", "documentation", "email-manager", "recruitment-selection"],
    locales: {
      es: { name: "Empleado IA de RRHH Administrativo", shortName: "RRHH Administrativo IA", description: "Apoya altas documentales, solicitudes internas, actualización de registros y seguimiento administrativo con permisos y privacidad acotados.", focus: "Registros, documentación y operaciones de RRHH" },
      en: { name: "HR Administration AI Employee", shortName: "HR Administration AI", description: "Supports document onboarding, internal requests, record updates and HR administration with bounded permissions and privacy controls.", focus: "Records, documents and HR operations" },
    },
  },
  {
    key: "recruitment-selection",
    status: "restricted",
    departmentId: "hr",
    sectorIds: ["cross-sector", "professional-services"],
    problemIds: ["regulated-decisions", "manual-data"],
    taskIds: ["screening", "records", "documents"],
    relatedKeys: ["hr-administration", "documentation", "administrative"],
    locales: {
      es: { name: "Selección de Personal con IA", shortName: "Selección de Personal", description: "Área de alto impacto. Cualquier automatización que influya en selección, ranking o decisiones sobre candidatos requiere revisión legal, de riesgo y de diseño humano.", focus: "Uso restringido · no es activación autoservicio" },
      en: { name: "AI-assisted Recruitment Selection", shortName: "Recruitment Selection", description: "High-impact area. Any automation influencing candidate selection, ranking or decisions requires legal, risk and human-design review.", focus: "Restricted use · not self-service activation" },
    },
  },
  {
    key: "financial-decisions",
    status: "restricted",
    departmentId: "finance",
    sectorIds: ["cross-sector", "professional-services"],
    problemIds: ["regulated-decisions", "quality-risk"],
    taskIds: ["financial-assessment", "records", "reporting"],
    relatedKeys: ["accounting-billing", "reporting", "administrative"],
    locales: {
      es: { name: "Decisiones Financieras con IA", shortName: "Decisiones Financieras", description: "Área de alto impacto. Elegibilidad, riesgo, crédito u otras decisiones financieras reguladas requieren aprobación explícita de producto, legal y riesgo antes de cualquier propuesta comercial.", focus: "Uso restringido · revisión obligatoria" },
      en: { name: "AI-assisted Financial Decisions", shortName: "Financial Decisions", description: "High-impact area. Eligibility, risk, credit or other regulated financial decisions require explicit product, legal and risk approval before any commercial proposal.", focus: "Restricted use · mandatory review" },
    },
  },
];

const taxonomyMap = (items: readonly TaxonomyItem[]) => new Map(items.map((item) => [item.id, item]));
const departmentMap = taxonomyMap(departments);
const sectorMap = taxonomyMap(sectors);
const problemMap = taxonomyMap(problems);
const taskMap = taxonomyMap(tasks);

function labelFor(map: Map<string, TaxonomyItem>, id: string, locale: Locale) {
  return map.get(id)?.label[locale] ?? id;
}

export type DiscoveryProfileView = {
  key: DiscoveryProfileKey;
  status: DiscoveryStatus;
  name: string;
  shortName: string;
  description: string;
  focus: string;
  departmentId: string;
  department: string;
  sectorIds: string[];
  sectors: string[];
  problemIds: string[];
  problems: string[];
  taskIds: string[];
  tasks: string[];
  relatedKeys: DiscoveryProfileKey[];
  href: string | null;
};

export function getDiscoveryProfiles(locale: Locale): DiscoveryProfileView[] {
  return profiles.map((profile) => {
    const content = profile.locales[locale];
    return {
      key: profile.key,
      status: profile.status,
      ...content,
      departmentId: profile.departmentId,
      department: labelFor(departmentMap, profile.departmentId, locale),
      sectorIds: profile.sectorIds,
      sectors: profile.sectorIds.map((id) => labelFor(sectorMap, id, locale)),
      problemIds: profile.problemIds,
      problems: profile.problemIds.map((id) => labelFor(problemMap, id, locale)),
      taskIds: profile.taskIds,
      tasks: profile.taskIds.map((id) => labelFor(taskMap, id, locale)),
      relatedKeys: profile.relatedKeys,
      href: profile.deepProfileKey ? employeeDetailPath(profile.deepProfileKey, locale) : null,
    };
  });
}

export function getDiscoveryFilterOptions(locale: Locale) {
  const used = (field: "departmentId" | "sectorIds" | "problemIds" | "taskIds") => {
    const values = new Set<string>();
    for (const profile of profiles) {
      const raw = profile[field];
      if (Array.isArray(raw)) raw.forEach((value) => values.add(value));
      else values.add(raw);
    }
    return values;
  };

  const localize = (items: readonly TaxonomyItem[], ids: Set<string>) =>
    items.filter((item) => ids.has(item.id)).map((item) => ({ value: item.id, label: item.label[locale] }));

  return {
    departments: localize(departments, used("departmentId")),
    sectors: localize(sectors, used("sectorIds")),
    problems: localize(problems, used("problemIds")),
    tasks: localize(tasks, used("taskIds")),
  };
}

export function getRelatedDiscoveryProfiles(employeeKey: EmployeeKey, locale: Locale) {
  const source = profiles.find((profile) => profile.deepProfileKey === employeeKey);
  if (!source) return [];
  const all = getDiscoveryProfiles(locale);
  return source.relatedKeys
    .map((key) => all.find((profile) => profile.key === key))
    .filter((profile): profile is DiscoveryProfileView => Boolean(profile));
}

export function getDiscoveryProfileCount() {
  return profiles.length;
}

import type { EmployeeKey } from "./employee-catalog";
import type { Locale } from "./i18n";
import type { TeamKey } from "./team-content-engine";

export type SectorKey = "ecommerce" | "travel" | "professional-services" | "sales";
export type UseCaseKey =
  | "customer-issue"
  | "invoice-validation"
  | "sales-follow-up"
  | "order-exception"
  | "travel-booking"
  | "administrative-documentation";

export type RoleReference = {
  name: string;
  contribution: string;
  employeeKey?: EmployeeKey;
};

export type SectorRecord = {
  key: SectorKey;
  slugs: Record<Locale, string>;
  name: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  heroTitle: Record<Locale, string>;
  heroDescription: Record<Locale, string>;
  shortAnswer: Record<Locale, string>;
  problems: Record<Locale, string[]>;
  useCases: UseCaseKey[];
  teams: TeamKey[];
  roles: Record<Locale, RoleReference[]>;
  systems: Record<Locale, string[]>;
  controls: Record<Locale, string[]>;
  metrics: Record<Locale, string[]>;
  implementation: Record<Locale, Array<{ title: string; text: string }>>;
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};

export type UseCaseStep = {
  title: string;
  text: string;
  mode: "automated" | "assisted" | "human";
};

export type UseCaseRecord = {
  key: UseCaseKey;
  slugs: Record<Locale, string>;
  title: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  heroTitle: Record<Locale, string>;
  heroDescription: Record<Locale, string>;
  shortAnswer: Record<Locale, string>;
  problem: Record<Locale, string>;
  steps: Record<Locale, UseCaseStep[]>;
  roles: Record<Locale, RoleReference[]>;
  teams: TeamKey[];
  sectors: SectorKey[];
  systems: Record<Locale, string[]>;
  controls: Record<Locale, string[]>;
  metrics: Record<Locale, string[]>;
  limits: Record<Locale, string[]>;
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};

export type ClusterIndexContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  cardsTitle: string;
  cardsIntro: string;
  methodologyTitle: string;
  methodology: Array<{ title: string; text: string }>;
  ctaTitle: string;
  ctaText: string;
};

export const sectorIndexContent: Record<Locale, ClusterIndexContent> = {
  es: {
    seoTitle: "Empleados IA por sector | Ecommerce, turismo, servicios y ventas",
    seoDescription: "Descubre cómo diseñar Equipos IA por sector partiendo de problemas, procesos, sistemas y puntos de control reales, sin prometer automatización universal.",
    eyebrow: "SECTORES",
    title: "Diseña la automatización alrededor de cómo funciona tu sector, no alrededor de una lista de herramientas.",
    description: "Cada sector combina procesos, sistemas y excepciones distintas. Estas páginas conectan problemas operativos concretos con casos de uso, Empleados IA, Equipos IA, controles humanos y métricas que sí pueden medirse.",
    cardsTitle: "Cuatro sectores iniciales",
    cardsIntro: "Empezamos por sectores donde ya existe suficiente profundidad de procesos para crear páginas útiles y no landings SEO genéricas.",
    methodologyTitle: "Cómo leer estas páginas",
    methodology: [
      { title: "Problema antes que tecnología", text: "La página empieza por fricciones operativas reales y solo después relaciona roles y sistemas." },
      { title: "Proceso antes que promesa", text: "Cada caso de uso muestra pasos, handoffs, controles y límites; no se presenta una tarea aislada como transformación completa." },
      { title: "Autoridad explícita", text: "Automatizar una acción no concede autoridad financiera, contractual o regulatoria por defecto." },
    ],
    ctaTitle: "¿Tu sector no aparece todavía?",
    ctaText: "El modelo se puede adaptar a otros sectores partiendo del proceso, los sistemas y las decisiones que hoy requieren más coordinación.",
  },
  en: {
    seoTitle: "AI Employees by industry | Ecommerce, travel, services and sales",
    seoDescription: "See how to design AI Teams by industry around real problems, processes, systems and control points without promising universal automation.",
    eyebrow: "INDUSTRIES",
    title: "Design automation around how your industry actually works, not around a list of tools.",
    description: "Each industry combines different processes, systems and exceptions. These pages connect concrete operational problems with use cases, AI Employees, AI Teams, human controls and measurable outcomes.",
    cardsTitle: "Four initial industries",
    cardsIntro: "We start with industries where there is enough process depth to build useful pages instead of generic SEO landing pages.",
    methodologyTitle: "How to read these pages",
    methodology: [
      { title: "Problem before technology", text: "Each page starts with real operational friction and only then maps roles and systems." },
      { title: "Process before promise", text: "Every use case shows steps, handoffs, controls and limits rather than presenting one task as a complete transformation." },
      { title: "Explicit authority", text: "Automating an action does not grant financial, contractual or regulated authority by default." },
    ],
    ctaTitle: "Is your industry not listed yet?",
    ctaText: "The model can be adapted to other industries by starting from the process, systems and decisions that currently require the most coordination.",
  },
};

export const useCaseIndexContent: Record<Locale, ClusterIndexContent> = {
  es: {
    seoTitle: "Casos de uso de Empleados IA | Procesos reales y controlados",
    seoDescription: "Explora casos de uso de Empleados IA para atención al cliente, facturación, ventas, pedidos, reservas y documentación con pasos, sistemas y controles explícitos.",
    eyebrow: "CASOS DE USO",
    title: "Del problema concreto al proceso que realmente habría que rediseñar.",
    description: "Un caso de uso útil no dice solo “usar IA”. Define entrada, responsables, sistemas, pasos automatizables o asistidos, decisiones humanas, métricas y límites.",
    cardsTitle: "Seis patrones operativos iniciales",
    cardsIntro: "Son patrones educativos reutilizables entre sectores. El alcance real depende de integraciones, datos, políticas, permisos y excepciones de cada organización.",
    methodologyTitle: "Qué debe quedar claro en cada caso",
    methodology: [
      { title: "Qué entra", text: "Evento, solicitud, documento o señal que inicia el proceso." },
      { title: "Quién hace qué", text: "Separamos pasos automatizables, trabajo asistido y decisiones que permanecen bajo responsabilidad humana." },
      { title: "Cómo se valida", text: "Las métricas se comparan con una línea base real; los ejemplos no son resultados garantizados." },
    ],
    ctaTitle: "¿Quieres aplicar uno de estos patrones a tu proceso real?",
    ctaText: "Usa el Process Analyzer para mapear el antes y después o el Team Builder para identificar la composición inicial.",
  },
  en: {
    seoTitle: "AI Employee use cases | Real processes with explicit controls",
    seoDescription: "Explore AI Employee use cases for customer support, billing, sales, orders, reservations and documentation with explicit steps, systems and controls.",
    eyebrow: "USE CASES",
    title: "Move from a concrete problem to the process that would actually need redesigning.",
    description: "A useful use case does not stop at “use AI”. It defines the input, owners, systems, automatable or assisted steps, human decisions, metrics and limits.",
    cardsTitle: "Six initial operational patterns",
    cardsIntro: "These are reusable educational patterns across industries. Actual scope depends on each organization’s integrations, data, policies, permissions and exceptions.",
    methodologyTitle: "What every use case should make clear",
    methodology: [
      { title: "What comes in", text: "The event, request, document or signal that starts the process." },
      { title: "Who does what", text: "We separate automatable steps, assisted work and decisions that remain under human responsibility." },
      { title: "How it is validated", text: "Metrics are compared with a real baseline; examples are not guaranteed outcomes." },
    ],
    ctaTitle: "Want to apply one of these patterns to your real process?",
    ctaText: "Use the Process Analyzer to map the before and after, or the Team Builder to identify an initial composition.",
  },
};

export const sectorRecords: SectorRecord[] = [
  {
    key: "ecommerce",
    slugs: { es: "ecommerce", en: "ecommerce" },
    name: { es: "Ecommerce", en: "Ecommerce" },
    seoTitle: { es: "Empleados IA para Ecommerce | Atención, pedidos y facturación", en: "AI Employees for Ecommerce | Support, orders and billing" },
    seoDescription: { es: "Cómo un Equipo IA puede coordinar atención al cliente, incidencias de pedidos, facturación y operaciones ecommerce con sistemas y controles humanos.", en: "How an AI Team can coordinate customer support, order exceptions, billing and ecommerce operations with systems and human controls." },
    eyebrow: { es: "SECTOR · ECOMMERCE", en: "INDUSTRY · ECOMMERCE" },
    heroTitle: { es: "Un ecommerce no necesita otro bot aislado: necesita coordinar cliente, pedido, stock, envío y facturación.", en: "An ecommerce business does not need another isolated bot: it needs customer, order, stock, shipping and billing coordination." },
    heroDescription: { es: "El valor aparece cuando una consulta puede convertirse en una acción trazable: localizar un pedido, revisar una incidencia, coordinar facturación, actualizar un caso y escalar lo que sale de política.", en: "Value appears when a request can become a traceable action: locate an order, inspect an exception, coordinate billing, update a case and escalate what falls outside policy." },
    shortAnswer: { es: "En ecommerce, los Empleados IA encajan especialmente bien en procesos de alto volumen donde atención, pedidos y back office necesitan compartir contexto sin dar autoridad ilimitada a la automatización.", en: "In ecommerce, AI Employees fit high-volume workflows where support, orders and back office need to share context without granting unlimited authority to automation." },
    problems: {
      es: ["Clientes preguntando por pedidos en varios canales.", "Incidencias de entrega o stock que cruzan soporte y operaciones.", "Facturas o datos de cliente que requieren corrección.", "Devoluciones y reembolsos sujetos a reglas, plazos y umbrales.", "Back office con tareas repetitivas entre ecommerce, ERP, CRM y ticketing."],
      en: ["Customers asking about orders across multiple channels.", "Delivery or stock exceptions crossing support and operations.", "Invoices or customer records requiring correction.", "Returns and refunds governed by rules, deadlines and thresholds.", "Repetitive back-office work across ecommerce, ERP, CRM and ticketing."],
    },
    useCases: ["customer-issue", "order-exception", "invoice-validation"],
    teams: ["ecommerce"],
    roles: {
      es: [
        { name: "Atención al Cliente IA", contribution: "Mantiene la conversación, recupera contexto fiable y coordina excepciones.", employeeKey: "customer-support" },
        { name: "Gestión de Pedidos", contribution: "Trabaja sobre stock, preparación, entrega, cambios y estados de pedido." },
        { name: "Ecommerce Operations", contribution: "Coordina tareas operativas de catálogo, back office y excepciones del canal." },
        { name: "Contabilidad y Facturación IA", contribution: "Revisa facturas, estados y discrepancias sin asumir autoridad de pago.", employeeKey: "accounting-billing" },
        { name: "Administrativo IA", contribution: "Corrige registros, documentos y datos que alimentan el proceso.", employeeKey: "administrative" },
      ],
      en: [
        { name: "Customer Support AI", contribution: "Maintains the customer thread, retrieves reliable context and coordinates exceptions.", employeeKey: "customer-support" },
        { name: "Order Management", contribution: "Handles stock, fulfilment, delivery, order changes and status." },
        { name: "Ecommerce Operations", contribution: "Coordinates catalog, back-office and channel exception work." },
        { name: "Accounting & Billing AI", contribution: "Reviews invoices, states and discrepancies without assuming payment authority.", employeeKey: "accounting-billing" },
        { name: "Administrative AI", contribution: "Corrects records, documents and data that feed the workflow.", employeeKey: "administrative" },
      ],
    },
    systems: { es: ["Plataforma ecommerce", "CRM", "ERP", "Ticketing", "Email / chat", "Envíos", "Estado de pagos", "Base de conocimiento", "APIs internas"], en: ["Ecommerce platform", "CRM", "ERP", "Ticketing", "Email / chat", "Shipping", "Payment status", "Knowledge base", "Internal APIs"] },
    controls: { es: ["Reembolsos o compensaciones fuera de umbral.", "Cambios de pedido relevantes sin coincidencia fiable del recurso.", "Excepciones de precio, promoción o política.", "Casos sensibles o información contradictoria."], en: ["Refunds or compensation above configured thresholds.", "Consequential order changes without a reliable resource match.", "Price, promotion or policy exceptions.", "Sensitive cases or contradictory information."] },
    metrics: { es: ["Tiempo de primera respuesta", "Tiempo de resolución", "Recontactos por incidencia", "Pedidos con excepción", "Tiempo humano por caso", "Correcciones/retrabajo"], en: ["First-response time", "Resolution time", "Repeat contacts per issue", "Orders with exceptions", "Human time per case", "Corrections/rework"] },
    implementation: {
      es: [{ title: "1. Elegir un flujo", text: "Empieza por una incidencia frecuente y medible, no por automatizar toda la tienda." }, { title: "2. Fijar fuentes autoritativas", text: "Define dónde viven pedido, cliente, stock, envío y reglas antes de permitir acciones." }, { title: "3. Separar permisos", text: "Consultar estado, actualizar un ticket y emitir un reembolso son autoridades distintas." }, { title: "4. Medir contra baseline", text: "Compara tiempo, retrabajo, escalados y experiencia antes de ampliar alcance." }],
      en: [{ title: "1. Choose one workflow", text: "Start with a frequent, measurable exception rather than automating the whole store." }, { title: "2. Establish authoritative sources", text: "Define where order, customer, stock, shipping and rules live before enabling actions." }, { title: "3. Separate permissions", text: "Reading status, updating a ticket and issuing a refund are different authorities." }, { title: "4. Measure against baseline", text: "Compare time, rework, escalations and experience before expanding scope." }],
    },
    faq: {
      es: [{ question: "¿Puede conectarse a cualquier ecommerce?", answer: "La arquitectura puede adaptarse a distintas plataformas, pero cada integración debe implementarse y validarse para el entorno concreto. No se presupone compatibilidad universal." }, { question: "¿Puede aprobar devoluciones automáticamente?", answer: "Solo cuando reglas deterministas, permisos y umbrales lo permiten. Las excepciones o acciones de mayor impacto pueden requerir aprobación humana." }, { question: "¿Sustituye al equipo de soporte?", answer: "El objetivo es absorber trabajo repetitivo y coordinar procesos. Excepciones, reclamaciones sensibles y decisiones relevantes pueden seguir bajo responsabilidad humana." }],
      en: [{ question: "Can it connect to any ecommerce platform?", answer: "The architecture can be adapted to different platforms, but each integration must be implemented and validated for the specific environment. Universal compatibility is not assumed." }, { question: "Can it approve returns automatically?", answer: "Only when deterministic rules, permissions and thresholds allow it. Exceptions or higher-impact actions may still require human approval." }, { question: "Does it replace the support team?", answer: "The goal is to absorb repetitive work and coordinate processes. Exceptions, sensitive complaints and consequential decisions may remain under human responsibility." }],
    },
  },
  {
    key: "travel",
    slugs: { es: "turismo", en: "travel" },
    name: { es: "Turismo y reservas", en: "Travel and reservations" },
    seoTitle: { es: "Empleados IA para Turismo y Reservas | IA Empleado", en: "AI Employees for Travel and Reservations | IA Empleado" },
    seoDescription: { es: "Cómo coordinar consultas, disponibilidad, reservas, documentación, facturación y cambios con Equipos IA, proveedores y control humano.", en: "How to coordinate inquiries, availability, bookings, documentation, billing and changes with AI Teams, suppliers and human control." },
    eyebrow: { es: "SECTOR · TURISMO", en: "INDUSTRY · TRAVEL" },
    heroTitle: { es: "En turismo, una buena experiencia depende de que consulta, disponibilidad, reserva y cambios compartan el mismo contexto.", en: "In travel, a good experience depends on inquiry, availability, booking and changes sharing the same context." },
    heroDescription: { es: "Un Equipo IA puede ayudar a coordinar solicitudes, proveedores, reservas, documentación y atención posterior, siempre distinguiendo una opción consultada de una confirmación real.", en: "An AI Team can help coordinate requests, suppliers, bookings, documentation and after-sales support while clearly distinguishing a checked option from a real confirmation." },
    shortAnswer: { es: "Turismo es un buen encaje cuando hay muchos handoffs entre cliente, reservas, proveedores, administración y facturación; la condición es mantener disponibilidad, precio y confirmación ligados a fuentes autoritativas.", en: "Travel is a strong fit when many handoffs exist across customer service, reservations, suppliers, administration and billing, provided availability, price and confirmation remain tied to authoritative sources." },
    problems: { es: ["Consultas con preferencias y restricciones incompletas.", "Disponibilidad repartida entre motores y proveedores.", "Datos de viajeros y documentación que llegan por fases.", "Cambios o cancelaciones con condiciones y penalizaciones.", "Facturación y cobros vinculados a reservas y servicios distintos."], en: ["Inquiries with incomplete preferences and constraints.", "Availability spread across booking engines and suppliers.", "Traveler data and documentation arriving in stages.", "Changes or cancellations with terms and penalties.", "Billing and payment status linked to different bookings and services."] },
    useCases: ["travel-booking", "customer-issue", "administrative-documentation", "invoice-validation"],
    teams: ["travel"],
    roles: {
      es: [{ name: "Agente de Viajes IA", contribution: "Estructura necesidades y opciones usando fuentes autorizadas." }, { name: "Reservas IA", contribution: "Coordina disponibilidad, localizadores y estados sin confundir consulta con confirmación." }, { name: "Atención al Cliente IA", contribution: "Conserva el hilo del viajero y coordina incidencias y cambios.", employeeKey: "customer-support" }, { name: "Administrativo IA", contribution: "Gestiona datos, registros y documentación necesaria.", employeeKey: "administrative" }, { name: "Contabilidad y Facturación IA", contribution: "Revisa facturas y estados económicos sin autoridad financiera ilimitada.", employeeKey: "accounting-billing" }],
      en: [{ name: "Travel Agent AI", contribution: "Structures needs and options using authorized sources." }, { name: "Reservations AI", contribution: "Coordinates availability, locators and states without confusing a query with confirmation." }, { name: "Customer Support AI", contribution: "Preserves the traveler thread and coordinates incidents and changes.", employeeKey: "customer-support" }, { name: "Administrative AI", contribution: "Handles required data, records and documentation.", employeeKey: "administrative" }, { name: "Accounting & Billing AI", contribution: "Reviews invoices and financial states without unlimited financial authority.", employeeKey: "accounting-billing" }],
    },
    systems: { es: ["Motor de reservas", "CRM", "Email / mensajería", "Proveedores / APIs", "ERP", "Facturación", "Estado de pagos", "Gestión documental", "Calendario", "Reporting"], en: ["Booking engine", "CRM", "Email / messaging", "Suppliers / APIs", "ERP", "Billing", "Payment status", "Document management", "Calendar", "Reporting"] },
    controls: { es: ["Confirmaciones que no estén respaldadas por proveedor o sistema.", "Cambios con penalización o excepción contractual.", "Reembolsos, cargos o importes fuera de permisos.", "Datos sensibles compartidos solo con el rol que los necesita."], en: ["Confirmations not backed by the supplier or authoritative system.", "Changes involving penalties or contractual exceptions.", "Refunds, charges or amounts outside permissions.", "Sensitive data shared only with roles that need it."] },
    metrics: { es: ["Tiempo hasta primera propuesta", "Tiempo hasta confirmación", "Casos esperando datos", "Errores/retrabajo", "Tiempo de resolución de cambios", "Handoffs por reserva"], en: ["Time to first proposal", "Time to confirmation", "Cases waiting for data", "Errors/rework", "Change-resolution time", "Handoffs per booking"] },
    implementation: {
      es: [{ title: "1. Acotar un tipo de solicitud", text: "Consulta, reserva, documentación o cambio: cada uno tiene fuentes y riesgos distintos." }, { title: "2. Definir la verdad operativa", text: "Precio, disponibilidad y confirmación deben venir del sistema o proveedor que realmente manda." }, { title: "3. Diseñar handoffs", text: "Separa atención, reserva, documentación y facturación para no compartir más datos de los necesarios." }, { title: "4. Probar excepciones", text: "Penalizaciones, cancelaciones y cambios relevantes deben probarse antes de ampliar autonomía." }],
      en: [{ title: "1. Bound one request type", text: "Inquiry, booking, documentation or change: each has different sources and risks." }, { title: "2. Define operational truth", text: "Price, availability and confirmation must come from the system or supplier that actually governs them." }, { title: "3. Design handoffs", text: "Separate support, reservations, documentation and billing so roles do not share more data than necessary." }, { title: "4. Test exceptions", text: "Penalties, cancellations and consequential changes should be tested before increasing autonomy." }],
    },
    faq: {
      es: [{ question: "¿Puede confirmar una reserva?", answer: "Solo cuando una integración fiable y una fuente autoritativa confirman realmente el servicio. Una consulta de disponibilidad no debe presentarse como reserva confirmada." }, { question: "¿Puede trabajar con varios proveedores?", answer: "Sí como arquitectura, pero cada proveedor o motor requiere integración, normalización y reglas específicas." }, { question: "¿Qué pasa con cambios y cancelaciones?", answer: "El equipo puede preparar y coordinar el proceso, pero penalizaciones, excepciones y autoridad económica pueden mantenerse bajo aprobación humana." }],
      en: [{ question: "Can it confirm a booking?", answer: "Only when a reliable integration and authoritative source genuinely confirm the service. An availability query must not be presented as a confirmed booking." }, { question: "Can it work with multiple suppliers?", answer: "Architecturally yes, but each supplier or booking engine needs specific integration, normalization and rules." }, { question: "What about changes and cancellations?", answer: "The team can prepare and coordinate the workflow, but penalties, exceptions and financial authority can remain under human approval." }],
    },
  },
  {
    key: "professional-services",
    slugs: { es: "servicios-profesionales", en: "professional-services" },
    name: { es: "Servicios profesionales", en: "Professional services" },
    seoTitle: { es: "Empleados IA para Servicios Profesionales | IA Empleado", en: "AI Employees for Professional Services | IA Empleado" },
    seoDescription: { es: "Cómo coordinar correo, documentación, clientes, facturación y seguimiento comercial en empresas de servicios profesionales con IA gobernada.", en: "How to coordinate email, documents, clients, billing and commercial follow-up in professional services with governed AI." },
    eyebrow: { es: "SECTOR · SERVICIOS PROFESIONALES", en: "INDUSTRY · PROFESSIONAL SERVICES" },
    heroTitle: { es: "Menos tiempo moviendo información entre correo, documentos, CRM y facturación; más control sobre el trabajo que sí requiere criterio.", en: "Less time moving information across email, documents, CRM and billing; more control over work that genuinely requires judgment." },
    heroDescription: { es: "Despachos, consultoras, ingenierías y empresas B2B suelen compartir la misma fricción: mucha coordinación administrativa alrededor de trabajo experto. Los Empleados IA pueden absorber parte de esa coordinación sin sustituir la responsabilidad profesional.", en: "Firms, consultancies, engineering companies and B2B service businesses often share the same friction: heavy administrative coordination around expert work. AI Employees can absorb part of that coordination without replacing professional responsibility." },
    shortAnswer: { es: "En servicios profesionales, el mejor punto de entrada suele ser la capa operativa: bandejas, documentación, CRM, facturación y seguimiento. Las decisiones profesionales, legales o de alto impacto requieren límites específicos.", en: "In professional services, the best entry point is usually the operational layer: inboxes, documentation, CRM, billing and follow-up. Professional, legal or high-impact decisions require specific boundaries." },
    problems: { es: ["Bandejas compartidas con solicitudes difíciles de priorizar.", "Documentación incompleta o repartida entre clientes y proyectos.", "CRM y expedientes que dependen de actualización manual.", "Facturación y seguimiento de cobro con mucha coordinación.", "Oportunidades comerciales que pierden continuidad después de reuniones o propuestas."], en: ["Shared inboxes with requests that are hard to prioritize.", "Incomplete documentation spread across clients and projects.", "CRM and case records dependent on manual updates.", "Billing and payment follow-up requiring heavy coordination.", "Commercial opportunities losing continuity after meetings or proposals."] },
    useCases: ["administrative-documentation", "invoice-validation", "sales-follow-up", "customer-issue"],
    teams: ["administration", "sales"],
    roles: {
      es: [{ name: "Administrativo IA", contribution: "Clasifica solicitudes, estructura datos y mantiene expedientes operativos.", employeeKey: "administrative" }, { name: "Contabilidad y Facturación IA", contribution: "Prepara validaciones, registro y seguimiento económico dentro de permisos.", employeeKey: "accounting-billing" }, { name: "Comercial SDR IA", contribution: "Mantiene research, CRM y seguimiento comercial bajo política.", employeeKey: "sales-sdr" }, { name: "Gestor de Correo IA", contribution: "Ordena bandejas y deriva trabajo al rol correcto." }, { name: "Documentación", contribution: "Ayuda a mantener versiones, metadatos y trazabilidad documental." }],
      en: [{ name: "Administrative AI", contribution: "Classifies requests, structures data and maintains operational records.", employeeKey: "administrative" }, { name: "Accounting & Billing AI", contribution: "Prepares validation, posting support and financial follow-up within permissions.", employeeKey: "accounting-billing" }, { name: "Sales / SDR AI", contribution: "Maintains research, CRM and commercial follow-up under policy.", employeeKey: "sales-sdr" }, { name: "Email Manager AI", contribution: "Organizes inboxes and routes work to the right role." }, { name: "Documentation", contribution: "Helps maintain versions, metadata and document traceability." }],
    },
    systems: { es: ["Email", "CRM", "Gestión documental", "ERP / facturación", "Calendario", "Formularios", "Gestor de proyectos", "Firma / documentos", "Reporting", "APIs internas"], en: ["Email", "CRM", "Document management", "ERP / billing", "Calendar", "Forms", "Project management", "Signature / documents", "Reporting", "Internal APIs"] },
    controls: { es: ["Consejo profesional, legal o técnico reservado a responsables cualificados.", "Pagos, compromisos contractuales y cambios sensibles fuera de autoridad por defecto.", "Extracciones de baja confianza requieren revisión.", "Documentos sensibles siguen clasificación, retención y acceso del cliente."], en: ["Professional, legal or technical advice reserved for qualified owners.", "Payments, contractual commitments and sensitive changes outside default authority.", "Low-confidence extraction requires review.", "Sensitive documents follow the client’s classification, retention and access policies."] },
    metrics: { es: ["Tiempo de clasificación de solicitudes", "Expedientes incompletos", "Tiempo administrativo por cliente", "Facturas pendientes de revisión", "Completitud de CRM", "Retrabajo documental"], en: ["Request triage time", "Incomplete case files", "Administrative time per client", "Invoices waiting for review", "CRM completeness", "Document rework"] },
    implementation: {
      es: [{ title: "1. Separar trabajo experto y operativo", text: "Identifica qué tareas son coordinación y cuáles requieren juicio profesional real." }, { title: "2. Elegir un expediente", text: "Empieza por un tipo de cliente, proyecto o trámite con entradas y resultados claros." }, { title: "3. Fijar trazabilidad", text: "Origen del documento, versión, extracción y acción deben poder reconstruirse." }, { title: "4. Mantener owner humano", text: "El responsable profesional conserva decisiones, firma y compromisos que correspondan." }],
      en: [{ title: "1. Separate expert and operational work", text: "Identify which tasks are coordination and which require genuine professional judgment." }, { title: "2. Choose one case type", text: "Start with one client, project or workflow type with clear inputs and outcomes." }, { title: "3. Establish traceability", text: "Document origin, version, extraction and action should be reconstructable." }, { title: "4. Keep a human owner", text: "The professional owner retains decisions, signature and commitments where required." }],
    },
    faq: {
      es: [{ question: "¿Puede sustituir el criterio de un profesional?", answer: "No es la propuesta. El foco inicial está en coordinación, preparación y trabajo repetitivo. El alcance de decisiones profesionales debe definirse explícitamente según el servicio y la normativa aplicable." }, { question: "¿Puede trabajar con documentos confidenciales?", answer: "Solo bajo un despliegue, permisos, clasificación y políticas de tratamiento adecuados. La capacidad técnica no elimina las obligaciones de seguridad y confidencialidad." }, { question: "¿Dónde suele estar el ROI?", answer: "En reducción de tiempo operativo, retrabajo y esperas; debe medirse con datos reales de volumen, tiempos y costes, no con un porcentaje genérico." }],
      en: [{ question: "Can it replace professional judgment?", answer: "That is not the proposition. The initial focus is coordination, preparation and repetitive work. The scope of professional decisions must be explicitly defined for the service and applicable regulation." }, { question: "Can it work with confidential documents?", answer: "Only under appropriate deployment, permissions, classification and data-handling policies. Technical capability does not remove security and confidentiality obligations." }, { question: "Where does ROI usually come from?", answer: "From reduced operational time, rework and waiting; it should be measured with real volume, time and cost data rather than a generic percentage." }],
    },
  },
  {
    key: "sales",
    slugs: { es: "ventas", en: "sales" },
    name: { es: "Ventas B2B", en: "B2B sales" },
    seoTitle: { es: "Empleados IA para Ventas B2B | Prospección, CRM y seguimiento", en: "AI Employees for B2B Sales | Prospecting, CRM and follow-up" },
    seoDescription: { es: "Cómo coordinar research, CRM, correo, reuniones y reporting con Empleados IA de ventas sin automatizar indiscriminadamente el outreach.", en: "How to coordinate research, CRM, email, meetings and reporting with sales AI Employees without indiscriminate outreach automation." },
    eyebrow: { es: "SECTOR · VENTAS", en: "INDUSTRY · SALES" },
    heroTitle: { es: "La oportunidad no se pierde por falta de otro mensaje automático, sino por contexto roto, seguimiento irregular y CRM incompleto.", en: "Opportunities are not lost because one more automated message is missing, but because context breaks, follow-up is inconsistent and CRM is incomplete." },
    heroDescription: { es: "Un Equipo IA de Ventas puede ayudar a investigar cuentas, mantener contexto, preparar seguimiento, clasificar respuestas y actualizar CRM, conservando revisión humana para negociación, claims y compromisos relevantes.", en: "A Sales AI Team can help research accounts, preserve context, prepare follow-up, classify replies and update CRM while keeping human review for negotiation, claims and consequential commitments." },
    shortAnswer: { es: "En ventas B2B, IA Empleado tiene sentido cuando se quiere sistematizar research, CRM y seguimiento con límites de canal, volumen, mercado y consentimiento; no como motor de spam autónomo.", en: "In B2B sales, IA Empleado fits when research, CRM and follow-up need to become systematic under channel, volume, market and consent policies, not as an autonomous spam engine." },
    problems: { es: ["Leads sin siguiente acción clara.", "CRM incompleto o desactualizado.", "Research repetido antes de cada contacto.", "Respuestas comerciales que se pierden entre bandejas.", "Reuniones sin contexto consolidado y reporting manual."], en: ["Leads without a clear next action.", "Incomplete or outdated CRM.", "Repeated research before every contact.", "Commercial replies getting lost across inboxes.", "Meetings without consolidated context and manual reporting."] },
    useCases: ["sales-follow-up", "customer-issue"],
    teams: ["sales"],
    roles: {
      es: [{ name: "Comercial SDR IA", contribution: "Investiga cuentas, mantiene CRM y prepara seguimiento dentro de reglas.", employeeKey: "sales-sdr" }, { name: "Marketing Operations", contribution: "Aporta señales, origen y contexto de campañas o formularios." }, { name: "Gestor de Correo IA", contribution: "Relaciona respuestas con oportunidades y clasifica intención." }, { name: "Reporting IA", contribution: "Consolida actividad y estado sin inventar atribución o ingresos." }, { name: "Personas de ventas", contribution: "Negocian, validan claims y asumen compromisos comerciales relevantes." }],
      en: [{ name: "Sales / SDR AI", contribution: "Researches accounts, maintains CRM and prepares follow-up within policy.", employeeKey: "sales-sdr" }, { name: "Marketing Operations", contribution: "Adds campaign, source and form-signal context." }, { name: "Email Manager AI", contribution: "Links replies to opportunities and classifies intent." }, { name: "Reporting AI", contribution: "Consolidates activity and state without inventing attribution or revenue." }, { name: "Sales people", contribution: "Negotiate, validate claims and own consequential commercial commitments." }],
    },
    systems: { es: ["CRM", "Email", "Calendario", "Formularios", "Marketing automation", "Fuentes de research aprobadas", "Documentos comerciales", "Reporting / BI", "APIs internas"], en: ["CRM", "Email", "Calendar", "Forms", "Marketing automation", "Approved research sources", "Sales documents", "Reporting / BI", "Internal APIs"] },
    controls: { es: ["Canales, volúmenes, dominios y geografías permitidos.", "Consentimiento y requisitos de marketing directo por mercado.", "Aprobación de precios, descuentos y compromisos.", "Revisión humana de claims sensibles o información no confirmada."], en: ["Allowed channels, volumes, domains and geographies.", "Consent and direct-marketing requirements by market.", "Approval of pricing, discounts and commitments.", "Human review for sensitive claims or unconfirmed information."] },
    metrics: { es: ["Tiempo hasta primer seguimiento", "Leads con siguiente acción", "Completitud del CRM", "Tiempo humano por oportunidad", "Reuniones cualificadas", "Correcciones de handoff"], en: ["Time to first follow-up", "Leads with a next action", "CRM completeness", "Human time per opportunity", "Qualified meetings", "Handoff corrections"] },
    implementation: {
      es: [{ title: "1. Limpiar la fuente de verdad", text: "El CRM debe tener reglas claras de identidad, estado y ownership antes de automatizar seguimiento." }, { title: "2. Definir política de outreach", text: "Canal, volumen, mercado, consentimiento y revisión humana deben estar explícitos." }, { title: "3. Automatizar preparación primero", text: "Research, resúmenes y CRM suelen ser un punto de entrada de menor riesgo que el envío autónomo." }, { title: "4. Medir calidad, no solo volumen", text: "Evalúa completitud, reuniones útiles, correcciones y tiempo humano además de actividad." }],
      en: [{ title: "1. Clean the source of truth", text: "CRM needs clear identity, state and ownership rules before follow-up is automated." }, { title: "2. Define outreach policy", text: "Channel, volume, market, consent and human review should be explicit." }, { title: "3. Automate preparation first", text: "Research, summaries and CRM are usually a lower-risk entry point than autonomous sending." }, { title: "4. Measure quality, not only volume", text: "Track completeness, useful meetings, corrections and human time in addition to activity." }],
    },
    faq: {
      es: [{ question: "¿Puede hacer prospección automáticamente?", answer: "Puede apoyar research, preparación y seguimiento y, donde la política lo permita, ejecutar acciones acotadas. No se asume envío masivo o indiscriminado por defecto." }, { question: "¿Puede escribir en el CRM?", answer: "Sí cuando existe una integración y permisos definidos. Los campos y acciones disponibles deben limitarse al alcance del rol." }, { question: "¿Puede negociar?", answer: "La negociación, precios, descuentos y compromisos relevantes pueden mantenerse bajo control humano aunque la IA prepare contexto o borradores." }],
      en: [{ question: "Can it prospect automatically?", answer: "It can support research, preparation and follow-up and, where policy allows, perform bounded actions. Mass or indiscriminate sending is not assumed by default." }, { question: "Can it write to the CRM?", answer: "Yes when an integration and permissions are defined. Available fields and actions should be limited to the role’s scope." }, { question: "Can it negotiate?", answer: "Negotiation, pricing, discounts and consequential commitments can remain under human control even when AI prepares context or drafts." }],
    },
  },
];

export const useCaseRecords: UseCaseRecord[] = [
  {
    key: "customer-issue",
    slugs: { es: "incidencia-cliente", en: "customer-issue" },
    title: { es: "Resolver una incidencia de cliente entre varios sistemas", en: "Resolve a customer issue across multiple systems" },
    seoTitle: { es: "Caso de uso IA: incidencia de cliente | IA Empleado", en: "AI use case: customer issue resolution | IA Empleado" },
    seoDescription: { es: "Flujo de referencia para clasificar una incidencia, consultar contexto, coordinar otros roles y escalar excepciones con trazabilidad.", en: "Reference workflow to classify an issue, retrieve context, coordinate other roles and escalate exceptions with traceability." },
    eyebrow: { es: "CASO DE USO · ATENCIÓN", en: "USE CASE · SUPPORT" },
    heroTitle: { es: "De “tengo un problema” a una resolución trazable, sin obligar al cliente a reconstruir el caso en cada handoff.", en: "From “I have a problem” to a traceable resolution without forcing the customer to rebuild the case at every handoff." },
    heroDescription: { es: "El patrón combina atención, consulta de sistemas, coordinación con otros roles y aprobación humana cuando la política o el impacto lo exigen.", en: "The pattern combines support, system lookup, coordination with other roles and human approval when policy or impact requires it." },
    shortAnswer: { es: "Funciona mejor cuando el problema requiere más que una respuesta: identificar el recurso correcto, consultar estados, coordinar acciones y conservar contexto hasta el cierre.", en: "It works best when the problem requires more than an answer: identify the right resource, inspect states, coordinate actions and preserve context through closure." },
    problem: { es: "Las incidencias se vuelven costosas cuando soporte no ve el pedido, facturación no ve el historial o cada traspaso empieza desde cero. El objetivo es mover una tarea estructurada, no simplemente reenviar la conversación.", en: "Issues become expensive when support cannot see the order, billing cannot see the history or every handoff starts from zero. The goal is to move structured work, not simply forward the conversation." },
    steps: {
      es: [{ title: "1. Recibir y clasificar", text: "Identifica intención, urgencia y contexto disponible sin afirmar datos aún no verificados.", mode: "assisted" }, { title: "2. Verificar recurso", text: "Relaciona cliente, pedido, reserva o servicio con una fuente autorizada antes de actuar.", mode: "automated" }, { title: "3. Coordinar el trabajo", text: "Entrega una tarea estructurada a pedidos, administración o facturación cuando el caso cruza procesos.", mode: "assisted" }, { title: "4. Resolver excepción", text: "Una persona interviene si hay compensación, identidad incierta, excepción de política o impacto relevante.", mode: "human" }, { title: "5. Cerrar y registrar", text: "Comunica resultado, actualiza el caso y conserva el historial necesario.", mode: "assisted" }],
      en: [{ title: "1. Receive and classify", text: "Identify intent, urgency and available context without asserting unverified facts.", mode: "assisted" }, { title: "2. Verify the resource", text: "Match the customer, order, booking or service against an authorized source before acting.", mode: "automated" }, { title: "3. Coordinate the work", text: "Hand structured work to orders, administration or billing when the case crosses processes.", mode: "assisted" }, { title: "4. Resolve the exception", text: "A person intervenes for compensation, uncertain identity, policy exceptions or consequential impact.", mode: "human" }, { title: "5. Close and record", text: "Communicate the outcome, update the case and preserve the required history.", mode: "assisted" }],
    },
    roles: { es: [{ name: "Atención al Cliente IA", contribution: "Orquesta la conversación y mantiene el contexto.", employeeKey: "customer-support" }, { name: "Administrativo IA", contribution: "Corrige datos o documentación cuando el caso lo necesita.", employeeKey: "administrative" }, { name: "Contabilidad y Facturación IA", contribution: "Revisa discrepancias económicas sin autoridad ilimitada.", employeeKey: "accounting-billing" }], en: [{ name: "Customer Support AI", contribution: "Orchestrates the conversation and preserves context.", employeeKey: "customer-support" }, { name: "Administrative AI", contribution: "Corrects data or documentation when needed.", employeeKey: "administrative" }, { name: "Accounting & Billing AI", contribution: "Reviews financial discrepancies without unlimited authority.", employeeKey: "accounting-billing" }] },
    teams: ["ecommerce", "travel"], sectors: ["ecommerce", "travel", "professional-services"],
    systems: { es: ["CRM", "Ticketing", "Email / chat", "ERP", "Ecommerce o reservas", "Facturación", "Base de conocimiento"], en: ["CRM", "Ticketing", "Email / chat", "ERP", "Ecommerce or booking system", "Billing", "Knowledge base"] },
    controls: { es: ["Identidad o recurso no confirmado.", "Compensaciones y reembolsos fuera de umbral.", "Excepciones de política.", "Información contradictoria o sensible."], en: ["Unconfirmed identity or resource.", "Compensation and refunds above threshold.", "Policy exceptions.", "Contradictory or sensitive information."] },
    metrics: { es: ["Tiempo de resolución", "Recontactos", "Handoffs", "Escalados", "Retrabajo", "Tiempo humano por caso"], en: ["Resolution time", "Repeat contacts", "Handoffs", "Escalations", "Rework", "Human time per case"] },
    limits: { es: ["No garantiza resolución automática del 100% de incidencias.", "No inventa estados ni políticas cuando una fuente autorizada no los confirma.", "Las acciones disponibles dependen de integraciones y permisos reales."], en: ["It does not guarantee fully automatic resolution of every issue.", "It does not invent states or policies when an authorized source cannot confirm them.", "Available actions depend on actual integrations and permissions."] },
    faq: { es: [{ question: "¿Es solo un chatbot?", answer: "No necesariamente. La conversación puede ser la entrada, pero el patrón continúa con sistemas, handoffs, acciones y controles." }, { question: "¿Qué pasa si no encuentra el pedido?", answer: "Debe pedir información o escalar; no debe adivinar una coincidencia para continuar." }], en: [{ question: "Is this just a chatbot?", answer: "Not necessarily. Conversation may be the entry point, but the pattern continues through systems, handoffs, actions and controls." }, { question: "What if it cannot find the order?", answer: "It should request more information or escalate rather than guess a match and continue." }] },
  },
  {
    key: "invoice-validation",
    slugs: { es: "validacion-facturas", en: "invoice-validation" },
    title: { es: "Validar y preparar facturas con controles", en: "Validate and prepare invoices with controls" },
    seoTitle: { es: "Caso de uso IA: validación de facturas | IA Empleado", en: "AI use case: invoice validation | IA Empleado" },
    seoDescription: { es: "Patrón para recibir facturas, extraer datos, detectar duplicados, validar reglas y preparar revisión humana sin delegar pagos o riesgo financiero.", en: "Pattern to receive invoices, extract data, detect duplicates, validate rules and prepare human review without delegating payments or financial risk." },
    eyebrow: { es: "CASO DE USO · FACTURACIÓN", en: "USE CASE · BILLING" },
    heroTitle: { es: "Automatiza la preparación y los controles repetitivos; conserva aprobación y autoridad financiera donde corresponde.", en: "Automate repetitive preparation and checks while keeping approval and financial authority where they belong." },
    heroDescription: { es: "El objetivo es reducir clasificación, extracción, cotejo y retrabajo, no convertir un modelo en responsable autónomo de pagos o decisiones de crédito.", en: "The goal is to reduce classification, extraction, matching and rework, not turn a model into an autonomous owner of payments or credit decisions." },
    shortAnswer: { es: "La IA puede ayudar a estructurar documentos y coordinar validaciones; los cálculos y reglas críticas deben ser deterministas cuando sea posible y la autoridad de contabilizar o pagar se configura por separado.", en: "AI can help structure documents and coordinate validation; critical calculations and rules should be deterministic where possible, while posting or payment authority is configured separately." },
    problem: { es: "La factura llega por email o portal, alguien extrae datos, busca proveedor o cliente, revisa duplicados y reglas, corrige errores y prepara registro. Gran parte es repetitiva, pero los errores tienen impacto económico.", en: "An invoice arrives by email or portal, someone extracts data, finds the supplier or customer, checks duplicates and rules, fixes issues and prepares posting. Much is repetitive, but mistakes have financial impact." },
    steps: { es: [{ title: "1. Recibir documento", text: "Clasifica la factura y conserva origen y archivo original.", mode: "automated" }, { title: "2. Extraer y cotejar", text: "Extrae campos y relaciona proveedor, cliente, pedido o expediente; baja confianza pasa a revisión.", mode: "assisted" }, { title: "3. Validar reglas", text: "Duplicados, importes, impuestos y campos se contrastan con reglas deterministas cuando es posible.", mode: "automated" }, { title: "4. Preparar registro", text: "Genera borrador, incidencia o tarea con la trazabilidad de las comprobaciones.", mode: "assisted" }, { title: "5. Aprobar acción relevante", text: "Contabilización definitiva, pago, excepción o decisión financiera permanece bajo la autoridad configurada.", mode: "human" }], en: [{ title: "1. Receive the document", text: "Classify the invoice while preserving source and original file.", mode: "automated" }, { title: "2. Extract and match", text: "Extract fields and match supplier, customer, order or case; low confidence goes to review.", mode: "assisted" }, { title: "3. Validate rules", text: "Duplicates, amounts, tax fields and required data are checked deterministically where possible.", mode: "automated" }, { title: "4. Prepare posting", text: "Create a draft, issue or task with traceability of completed checks.", mode: "assisted" }, { title: "5. Approve consequential action", text: "Final posting, payment, exception or financial decision remains under configured authority.", mode: "human" }] },
    roles: { es: [{ name: "Contabilidad y Facturación IA", contribution: "Coordina extracción, matching, validaciones y preparación.", employeeKey: "accounting-billing" }, { name: "Administrativo IA", contribution: "Completa registros o solicita documentación faltante.", employeeKey: "administrative" }], en: [{ name: "Accounting & Billing AI", contribution: "Coordinates extraction, matching, validation and preparation.", employeeKey: "accounting-billing" }, { name: "Administrative AI", contribution: "Completes records or requests missing documentation.", employeeKey: "administrative" }] },
    teams: ["administration", "ecommerce", "travel"], sectors: ["ecommerce", "travel", "professional-services"],
    systems: { es: ["Email / portal", "Gestión documental", "ERP / contabilidad", "Pedidos / compras", "CRM", "APIs internas", "Estado bancario de solo lectura si aplica"], en: ["Email / portal", "Document management", "ERP / accounting", "Orders / purchasing", "CRM", "Internal APIs", "Read-only banking state where appropriate"] },
    controls: { es: ["Baja confianza de extracción.", "Proveedor o cliente sin coincidencia fiable.", "Duplicados o importes anómalos.", "Contabilización, pago o excepción fuera de autoridad."], en: ["Low extraction confidence.", "Supplier or customer without a reliable match.", "Duplicates or anomalous amounts.", "Posting, payment or exception outside authority."] },
    metrics: { es: ["Tiempo por factura", "Facturas en revisión", "Duplicados detectados", "Correcciones", "Tiempo hasta registro", "Porcentaje de campos validados"], en: ["Time per invoice", "Invoices under review", "Duplicates detected", "Corrections", "Time to posting preparation", "Percentage of validated fields"] },
    limits: { es: ["No ofrece asesoramiento fiscal o contable regulado por defecto.", "No mueve dinero como autoridad autónoma base.", "No realiza decisiones de crédito, riesgo o elegibilidad."], en: ["It does not provide regulated tax or accounting advice by default.", "It does not move money as a default autonomous authority.", "It does not make credit, risk or eligibility decisions."] },
    faq: { es: [{ question: "¿Puede leer facturas escaneadas?", answer: "Puede incorporarse OCR cuando el tipo de documento lo requiere, pero la calidad de extracción debe medirse y los campos de baja confianza revisarse." }, { question: "¿Puede pagar una factura?", answer: "No se asume esa autoridad. La preparación y validación pueden automatizarse mientras pago y aprobación permanecen separados." }], en: [{ question: "Can it read scanned invoices?", answer: "OCR can be added when the document type requires it, but extraction quality should be measured and low-confidence fields reviewed." }, { question: "Can it pay an invoice?", answer: "That authority is not assumed. Preparation and validation can be automated while payment and approval remain separate." }] },
  },
  {
    key: "sales-follow-up",
    slugs: { es: "seguimiento-comercial", en: "sales-follow-up" },
    title: { es: "Mantener seguimiento comercial y CRM sin convertirlo en spam", en: "Maintain sales follow-up and CRM without turning it into spam" },
    seoTitle: { es: "Caso de uso IA: seguimiento comercial y CRM", en: "AI use case: sales follow-up and CRM" },
    seoDescription: { es: "Cómo estructurar research, CRM, borradores, respuestas y reuniones con políticas de outreach, consentimiento y revisión humana.", en: "How to structure research, CRM, drafts, replies and meetings with outreach policy, consent and human review." },
    eyebrow: { es: "CASO DE USO · VENTAS", en: "USE CASE · SALES" },
    heroTitle: { es: "Haz consistente el seguimiento comercial sin ceder negociación ni control de canal a una automatización abierta.", en: "Make sales follow-up consistent without handing negotiation or channel control to open-ended automation." },
    heroDescription: { es: "El patrón organiza research, CRM, preparación de mensajes, clasificación de respuestas y agenda con límites explícitos de envío y autoridad.", en: "The pattern organizes research, CRM, message preparation, reply classification and scheduling under explicit sending and authority boundaries." },
    shortAnswer: { es: "La mayor ganancia inicial suele estar en research, preparación, CRM y clasificación de respuestas; el envío, frecuencia y negociación deben quedar sujetos a políticas de mercado y empresa.", en: "The strongest initial gain is usually in research, preparation, CRM and reply classification; sending, frequency and negotiation should remain subject to market and company policies." },
    problem: { es: "Cuando el seguimiento depende de memoria individual aparecen leads sin próxima acción, CRM incompleto y reuniones sin contexto. Automatizar solo mensajes puede aumentar ruido sin arreglar el proceso.", en: "When follow-up depends on individual memory, leads lose next actions, CRM becomes incomplete and meetings lack context. Automating messages alone can increase noise without fixing the workflow." },
    steps: { es: [{ title: "1. Registrar señal", text: "Conserva origen, consentimiento disponible y relación con cuenta o lead.", mode: "automated" }, { title: "2. Preparar contexto", text: "Research aprobado y CRM se resumen sin inventar datos faltantes.", mode: "assisted" }, { title: "3. Proponer siguiente acción", text: "Criterios deterministas y política comercial ayudan a decidir seguimiento, revisión o descarte.", mode: "assisted" }, { title: "4. Ejecutar dentro de política", text: "Borradores o envíos solo se realizan por canales, mercados y volúmenes permitidos.", mode: "assisted" }, { title: "5. Negociar o comprometer", text: "Precios, descuentos, claims sensibles y compromisos relevantes pasan a una persona.", mode: "human" }], en: [{ title: "1. Record the signal", text: "Preserve source, available consent and relationship to account or lead.", mode: "automated" }, { title: "2. Prepare context", text: "Approved research and CRM are summarized without inventing missing facts.", mode: "assisted" }, { title: "3. Propose the next action", text: "Deterministic criteria and commercial policy help choose follow-up, review or discard.", mode: "assisted" }, { title: "4. Execute within policy", text: "Drafts or sends happen only through allowed channels, markets and volumes.", mode: "assisted" }, { title: "5. Negotiate or commit", text: "Pricing, discounts, sensitive claims and consequential commitments go to a person.", mode: "human" }] },
    roles: { es: [{ name: "Comercial SDR IA", contribution: "Mantiene research, CRM y seguimiento.", employeeKey: "sales-sdr" }, { name: "Gestor de Correo IA", contribution: "Clasifica respuestas y mantiene el hilo." }, { name: "Reporting IA", contribution: "Consolida estado operativo y actividad." }], en: [{ name: "Sales / SDR AI", contribution: "Maintains research, CRM and follow-up.", employeeKey: "sales-sdr" }, { name: "Email Manager AI", contribution: "Classifies replies and preserves the thread." }, { name: "Reporting AI", contribution: "Consolidates operational state and activity." }] },
    teams: ["sales"], sectors: ["sales", "professional-services"],
    systems: { es: ["CRM", "Email", "Calendario", "Formularios", "Fuentes de research", "Marketing automation", "Reporting"], en: ["CRM", "Email", "Calendar", "Forms", "Research sources", "Marketing automation", "Reporting"] },
    controls: { es: ["Consentimiento y preferencias de contacto.", "Límites de canal, volumen, dominio y geografía.", "Claims no verificados.", "Negociación, precio y compromisos."], en: ["Consent and contact preferences.", "Channel, volume, domain and geography limits.", "Unverified claims.", "Negotiation, pricing and commitments."] },
    metrics: { es: ["Tiempo a siguiente acción", "Completitud CRM", "Leads sin seguimiento", "Tiempo humano por oportunidad", "Reuniones cualificadas", "Correcciones"], en: ["Time to next action", "CRM completeness", "Leads without follow-up", "Human time per opportunity", "Qualified meetings", "Corrections"] },
    limits: { es: ["No garantiza conversiones ni reuniones.", "No presupone permiso para contactar cualquier persona o mercado.", "No inventa hechos sobre empresas o contactos."], en: ["It does not guarantee conversions or meetings.", "It does not assume permission to contact any person or market.", "It does not invent facts about companies or contacts."] },
    faq: { es: [{ question: "¿Puede enviar emails automáticamente?", answer: "Puede habilitarse dentro de reglas y permisos, pero no se presupone envío autónomo. Muchas implantaciones pueden exigir revisión humana antes del outbound." }, { question: "¿Puede buscar información de empresas?", answer: "Sí mediante fuentes aprobadas y dentro de la política definida; los datos no confirmados no deben convertirse en hechos." }], en: [{ question: "Can it send emails automatically?", answer: "It can be enabled within rules and permissions, but autonomous sending is not assumed. Many deployments may require human review before outbound." }, { question: "Can it research companies?", answer: "Yes through approved sources and defined policy; unconfirmed information must not be turned into facts." }] },
  },
  {
    key: "order-exception",
    slugs: { es: "incidencias-pedidos", en: "order-exception" },
    title: { es: "Coordinar una incidencia de pedido", en: "Coordinate an order exception" },
    seoTitle: { es: "Caso de uso IA: incidencias de pedidos | IA Empleado", en: "AI use case: order exceptions | IA Empleado" },
    seoDescription: { es: "Flujo para detectar una incidencia de pedido, consultar stock o envío, coordinar operaciones y soporte y escalar cambios o reembolsos relevantes.", en: "Workflow to detect an order exception, inspect stock or shipping, coordinate operations and support, and escalate consequential changes or refunds." },
    eyebrow: { es: "CASO DE USO · PEDIDOS", en: "USE CASE · ORDERS" },
    heroTitle: { es: "Cuando un pedido se sale del camino normal, coordina sistemas y responsables antes de prometer una solución.", en: "When an order leaves the happy path, coordinate systems and owners before promising a resolution." },
    heroDescription: { es: "El patrón conecta ecommerce, ERP, stock, transporte y atención al cliente para gestionar excepciones con un estado verificable.", en: "The pattern connects ecommerce, ERP, stock, shipping and customer support to manage exceptions against a verifiable state." },
    shortAnswer: { es: "La IA puede detectar, clasificar y coordinar muchas excepciones; cambios de importe, compensaciones o sustituciones fuera de política deben mantenerse bajo reglas o aprobación humana.", en: "AI can detect, classify and coordinate many exceptions; amount changes, compensation or substitutions outside policy should remain under rules or human approval." },
    problem: { es: "Un pedido retrasado, sin stock o mal preparado suele cruzar ecommerce, almacén, transporte y soporte. Si cada equipo mira una pantalla distinta, la respuesta al cliente llega tarde o con información incoherente.", en: "A delayed, out-of-stock or incorrectly fulfilled order often crosses ecommerce, warehouse, shipping and support. If every team sees a different screen, the customer receives late or inconsistent answers." },
    steps: { es: [{ title: "1. Detectar excepción", text: "Evento o consulta activa el caso y se identifica el pedido exacto.", mode: "automated" }, { title: "2. Consultar estado real", text: "Stock, preparación, transporte y pago se leen desde fuentes autorizadas.", mode: "automated" }, { title: "3. Proponer resolución", text: "Reglas determinan si procede esperar, reexpedir, sustituir, corregir datos o escalar.", mode: "assisted" }, { title: "4. Aprobar impacto", text: "Compensaciones, cambios relevantes o excepciones de política pasan a una persona o regla de autoridad explícita.", mode: "human" }, { title: "5. Comunicar y registrar", text: "Atención informa con el estado confirmado y conserva el resultado en el caso.", mode: "assisted" }], en: [{ title: "1. Detect the exception", text: "An event or request opens the case and identifies the exact order.", mode: "automated" }, { title: "2. Inspect real state", text: "Stock, fulfilment, shipping and payment are read from authorized sources.", mode: "automated" }, { title: "3. Propose resolution", text: "Rules determine whether to wait, reship, substitute, correct data or escalate.", mode: "assisted" }, { title: "4. Approve impact", text: "Compensation, consequential changes or policy exceptions go to a person or explicit authority rule.", mode: "human" }, { title: "5. Communicate and record", text: "Support communicates the confirmed state and records the outcome in the case.", mode: "assisted" }] },
    roles: { es: [{ name: "Gestión de Pedidos", contribution: "Coordina estado, stock, preparación y cambios." }, { name: "Atención al Cliente IA", contribution: "Mantiene comunicación y contexto.", employeeKey: "customer-support" }, { name: "Administrativo IA", contribution: "Corrige datos operativos cuando procede.", employeeKey: "administrative" }], en: [{ name: "Order Management", contribution: "Coordinates state, stock, fulfilment and changes." }, { name: "Customer Support AI", contribution: "Maintains communication and context.", employeeKey: "customer-support" }, { name: "Administrative AI", contribution: "Corrects operational data where appropriate.", employeeKey: "administrative" }] },
    teams: ["ecommerce"], sectors: ["ecommerce"],
    systems: { es: ["Ecommerce", "ERP", "WMS / stock", "Transportista", "CRM", "Ticketing", "Estado de pago"], en: ["Ecommerce", "ERP", "WMS / stock", "Carrier", "CRM", "Ticketing", "Payment status"] },
    controls: { es: ["Pedido no identificado con fiabilidad.", "Cambio de producto o importe fuera de política.", "Compensación o reembolso fuera de umbral.", "Información contradictoria entre sistemas."], en: ["Order not reliably identified.", "Product or amount change outside policy.", "Compensation or refund above threshold.", "Contradictory system information."] },
    metrics: { es: ["Tiempo de detección", "Tiempo de resolución", "Contactos por incidencia", "Pedidos reabiertos", "Compensaciones", "Retrabajo"], en: ["Detection time", "Resolution time", "Contacts per exception", "Reopened orders", "Compensation cases", "Rework"] },
    limits: { es: ["No inventa stock, entrega o estado del transportista.", "No cambia pedidos sin una coincidencia fiable.", "No asume permisos de reembolso o sustitución por defecto."], en: ["It does not invent stock, delivery or carrier state.", "It does not change orders without a reliable match.", "It does not assume refund or substitution permissions by default."] },
    faq: { es: [{ question: "¿Puede reexpedir automáticamente?", answer: "Solo si la empresa define reglas, permisos y condiciones claras para ese tipo de incidencia. En otros casos prepara la acción y solicita aprobación." }, { question: "¿Qué pasa si ERP y ecommerce muestran estados distintos?", answer: "El conflicto debe tratarse como excepción y no resolverse eligiendo arbitrariamente una fuente." }], en: [{ question: "Can it reship automatically?", answer: "Only if the company defines clear rules, permissions and conditions for that exception type. Otherwise it prepares the action and requests approval." }, { question: "What if ERP and ecommerce show different states?", answer: "The conflict should be treated as an exception rather than resolved by arbitrarily choosing one source." }] },
  },
  {
    key: "travel-booking",
    slugs: { es: "reservas-viajes", en: "travel-booking" },
    title: { es: "Coordinar consulta, disponibilidad y reserva de viaje", en: "Coordinate travel inquiry, availability and booking" },
    seoTitle: { es: "Caso de uso IA: reservas de viajes | IA Empleado", en: "AI use case: travel booking | IA Empleado" },
    seoDescription: { es: "Patrón para estructurar una consulta, comprobar disponibilidad, preparar opciones y coordinar una reserva sin inventar confirmaciones de proveedor.", en: "Pattern to structure an inquiry, check availability, prepare options and coordinate a booking without inventing supplier confirmations." },
    eyebrow: { es: "CASO DE USO · RESERVAS", en: "USE CASE · BOOKINGS" },
    heroTitle: { es: "Convierte una consulta compleja en una reserva coordinada, manteniendo cada confirmación ligada a su fuente real.", en: "Turn a complex inquiry into a coordinated booking while keeping every confirmation tied to its real source." },
    heroDescription: { es: "El patrón cubre necesidades, opciones, disponibilidad, confirmación, datos de viajeros, documentación y facturación con handoffs explícitos.", en: "The pattern covers needs, options, availability, confirmation, traveler data, documentation and billing with explicit handoffs." },
    shortAnswer: { es: "La IA puede estructurar y coordinar gran parte del proceso, pero disponibilidad, precio y confirmación deben venir de motores o proveedores autoritativos y las excepciones relevantes deben escalarse.", en: "AI can structure and coordinate much of the process, but availability, price and confirmation must come from authoritative engines or suppliers, with consequential exceptions escalated." },
    problem: { es: "Una reserva mezcla lenguaje natural, fechas, viajeros, preferencias, varios proveedores, condiciones y pagos. El riesgo aparece cuando una opción consultada se confunde con una confirmación o cuando el contexto se rompe entre atención y operaciones.", en: "A booking combines natural language, dates, travelers, preferences, multiple suppliers, terms and payments. Risk appears when a checked option is confused with confirmation or context breaks between support and operations." },
    steps: { es: [{ title: "1. Estructurar necesidad", text: "Recoge destino, fechas, viajeros, preferencias y datos faltantes.", mode: "assisted" }, { title: "2. Consultar fuentes", text: "Busca opciones y disponibilidad solo en sistemas o proveedores autorizados.", mode: "automated" }, { title: "3. Preparar propuesta", text: "Presenta opciones con condiciones y distingue disponibilidad consultada de confirmación.", mode: "assisted" }, { title: "4. Confirmar con autoridad", text: "La reserva avanza únicamente cuando sistema/proveedor confirma y las reglas permiten continuar.", mode: "human" }, { title: "5. Completar back office", text: "Distribuye datos, documentación y facturación al rol adecuado con contexto mínimo necesario.", mode: "assisted" }], en: [{ title: "1. Structure the need", text: "Collect destination, dates, travelers, preferences and missing data.", mode: "assisted" }, { title: "2. Query sources", text: "Search options and availability only in authorized systems or suppliers.", mode: "automated" }, { title: "3. Prepare proposal", text: "Present options with terms and distinguish checked availability from confirmation.", mode: "assisted" }, { title: "4. Confirm with authority", text: "The booking proceeds only when the system/supplier confirms and policy allows continuation.", mode: "human" }, { title: "5. Complete back office", text: "Distribute data, documentation and billing to the right role with minimum necessary context.", mode: "assisted" }] },
    roles: { es: [{ name: "Agente de Viajes IA", contribution: "Interpreta necesidades y prepara opciones." }, { name: "Reservas IA", contribution: "Coordina disponibilidad, localizadores y estados." }, { name: "Atención al Cliente IA", contribution: "Mantiene la comunicación y los cambios posteriores.", employeeKey: "customer-support" }, { name: "Administrativo IA", contribution: "Gestiona datos y documentación.", employeeKey: "administrative" }], en: [{ name: "Travel Agent AI", contribution: "Interprets needs and prepares options." }, { name: "Reservations AI", contribution: "Coordinates availability, locators and states." }, { name: "Customer Support AI", contribution: "Maintains communication and later changes.", employeeKey: "customer-support" }, { name: "Administrative AI", contribution: "Handles data and documentation.", employeeKey: "administrative" }] },
    teams: ["travel"], sectors: ["travel"],
    systems: { es: ["Motor de reservas", "Proveedores / APIs", "CRM", "Email / mensajería", "Facturación", "Documentación", "Estado de pagos"], en: ["Booking engine", "Suppliers / APIs", "CRM", "Email / messaging", "Billing", "Documentation", "Payment status"] },
    controls: { es: ["Confirmación real de proveedor/sistema.", "Cambios con penalización.", "Importes, reembolsos y condiciones fuera de permiso.", "Datos sensibles de viajeros."], en: ["Real supplier/system confirmation.", "Changes involving penalties.", "Amounts, refunds and terms outside permission.", "Sensitive traveler data."] },
    metrics: { es: ["Tiempo a primera propuesta", "Tiempo a confirmación", "Opciones no confirmadas", "Casos esperando datos", "Errores de reserva", "Tiempo de cambios"], en: ["Time to first proposal", "Time to confirmation", "Unconfirmed options", "Cases waiting for data", "Booking errors", "Change resolution time"] },
    limits: { es: ["No inventa disponibilidad, precio ni condiciones.", "No presenta una opción como confirmada sin respaldo autoritativo.", "No presupone compatibilidad universal con proveedores."], en: ["It does not invent availability, price or terms.", "It does not present an option as confirmed without authoritative backing.", "It does not assume universal supplier compatibility."] },
    faq: { es: [{ question: "¿Puede reservar sin intervención humana?", answer: "Puede existir un flujo automatizado para casos acotados con integración y reglas fiables, pero la capacidad debe configurarse por proveedor, producto y autoridad. No es una promesa universal." }, { question: "¿Qué ocurre si cambia el precio?", answer: "El sistema debe volver a consultar la fuente autoritativa y aplicar la política definida; no debe mantener un importe antiguo como si siguiera vigente." }], en: [{ question: "Can it book without human intervention?", answer: "A bounded automated flow can exist with reliable integration and rules, but capability must be configured by supplier, product and authority. It is not a universal promise." }, { question: "What happens if the price changes?", answer: "The system should re-query the authoritative source and apply defined policy rather than treating an old amount as still valid." }] },
  },
  {
    key: "administrative-documentation",
    slugs: { es: "documentacion-administrativa", en: "administrative-documentation" },
    title: { es: "Procesar documentación administrativa con trazabilidad", en: "Process administrative documentation with traceability" },
    seoTitle: { es: "Caso de uso IA: documentación administrativa | IA Empleado", en: "AI use case: administrative documentation | IA Empleado" },
    seoDescription: { es: "Patrón para clasificar documentos, extraer datos, comprobar completitud, actualizar registros y escalar baja confianza o acciones sensibles.", en: "Pattern to classify documents, extract data, check completeness, update records and escalate low confidence or sensitive actions." },
    eyebrow: { es: "CASO DE USO · ADMINISTRACIÓN", en: "USE CASE · ADMINISTRATION" },
    heroTitle: { es: "Reduce clasificación y copia manual sin convertir una extracción incierta en un dato autoritativo.", en: "Reduce manual classification and copying without turning uncertain extraction into authoritative data." },
    heroDescription: { es: "El patrón conserva procedencia, confianza y relación con el expediente para que correo, documentos y sistemas internos formen un flujo auditable.", en: "The pattern preserves provenance, confidence and case linkage so email, documents and internal systems become an auditable workflow." },
    shortAnswer: { es: "La IA puede clasificar, extraer y preparar actualizaciones; los datos de baja confianza, documentos sensibles y compromisos relevantes deben seguir reglas de revisión y autoridad.", en: "AI can classify, extract and prepare updates; low-confidence data, sensitive documents and consequential commitments should follow review and authority rules." },
    problem: { es: "Muchas operaciones administrativas repiten el mismo patrón: llega un email o documento, alguien decide a qué expediente pertenece, copia campos, detecta lo que falta y actualiza uno o varios sistemas.", en: "Many administrative operations repeat the same pattern: an email or document arrives, someone decides which case it belongs to, copies fields, identifies what is missing and updates one or more systems." },
    steps: { es: [{ title: "1. Recibir y conservar origen", text: "Guarda canal, remitente, archivo y relación con la solicitud cuando existe.", mode: "automated" }, { title: "2. Clasificar y extraer", text: "Identifica tipo de documento y campos estructurados con señal de confianza.", mode: "assisted" }, { title: "3. Comprobar completitud", text: "Reglas determinan datos obligatorios, documentos faltantes e inconsistencias.", mode: "automated" }, { title: "4. Preparar actualización", text: "Crea borrador o actualización permitida y conserva la trazabilidad del dato original.", mode: "assisted" }, { title: "5. Revisar excepción", text: "Baja confianza, datos sensibles o compromisos fuera de autoridad pasan a una persona.", mode: "human" }], en: [{ title: "1. Receive and preserve source", text: "Keep channel, sender, file and relationship to the request where available.", mode: "automated" }, { title: "2. Classify and extract", text: "Identify document type and structured fields with confidence signals.", mode: "assisted" }, { title: "3. Check completeness", text: "Rules determine required data, missing documents and inconsistencies.", mode: "automated" }, { title: "4. Prepare update", text: "Create a draft or permitted update while retaining provenance of the original data.", mode: "assisted" }, { title: "5. Review exception", text: "Low confidence, sensitive data or commitments outside authority go to a person.", mode: "human" }] },
    roles: { es: [{ name: "Administrativo IA", contribution: "Coordina clasificación, extracción, completitud y registro.", employeeKey: "administrative" }, { name: "Gestor de Correo IA", contribution: "Relaciona mensajes y adjuntos con el flujo correcto." }, { name: "Documentación", contribution: "Mantiene versiones, metadatos y localización de archivos." }], en: [{ name: "Administrative AI", contribution: "Coordinates classification, extraction, completeness and records.", employeeKey: "administrative" }, { name: "Email Manager AI", contribution: "Links messages and attachments to the right workflow." }, { name: "Documentation", contribution: "Maintains versions, metadata and file location." }] },
    teams: ["administration", "travel"], sectors: ["professional-services", "travel"],
    systems: { es: ["Email", "Gestión documental", "ERP / back office", "CRM", "Formularios", "Almacenamiento", "APIs internas"], en: ["Email", "Document management", "ERP / back office", "CRM", "Forms", "Storage", "Internal APIs"] },
    controls: { es: ["Extracción de baja confianza.", "Documento sin expediente fiable.", "Datos sensibles o con retención específica.", "Pagos, firma o compromisos legales fuera de autoridad."], en: ["Low-confidence extraction.", "Document without a reliable case match.", "Sensitive data or specific retention rules.", "Payments, signatures or legal commitments outside authority."] },
    metrics: { es: ["Tiempo de clasificación", "Campos revisados manualmente", "Documentos incompletos", "Errores de registro", "Tiempo hasta expediente completo", "Retrabajo"], en: ["Classification time", "Fields manually reviewed", "Incomplete documents", "Record errors", "Time to complete case", "Rework"] },
    limits: { es: ["OCR o visión son módulos opcionales cuando el documento lo exige.", "La extracción no convierte automáticamente el dato en verdadero.", "Clasificación, retención y permisos siguen la política de la organización."], en: ["OCR or vision are optional modules when the document requires them.", "Extraction does not automatically make a value true.", "Classification, retention and permissions follow organizational policy."] },
    faq: { es: [{ question: "¿Puede actualizar sistemas automáticamente?", answer: "Puede hacerlo para campos y acciones de bajo riesgo con permisos explícitos. Otros cambios pueden quedar como borrador o requerir revisión." }, { question: "¿Qué ocurre con un dato dudoso?", answer: "Debe conservarse la señal de baja confianza y enviarse a revisión en lugar de tratarlo como información confirmada." }], en: [{ question: "Can it update systems automatically?", answer: "It can for low-risk fields and actions with explicit permissions. Other changes can remain drafts or require review." }, { question: "What happens with uncertain data?", answer: "The low-confidence signal should be preserved and routed to review rather than treated as confirmed information." }] },
  },
];

export function sectorIndexPath(locale: Locale) {
  return locale === "es" ? "/sectores" : "/en/sectors";
}

export function sectorDetailPath(key: SectorKey, locale: Locale) {
  const sector = sectorRecords.find((record) => record.key === key);
  if (!sector) throw new Error(`Unknown sector key: ${key}`);
  return `${sectorIndexPath(locale)}/${sector.slugs[locale]}`;
}

export function getSectorBySlug(slug: string, locale: Locale) {
  return sectorRecords.find((record) => record.slugs[locale] === slug);
}

export function useCaseIndexPath(locale: Locale) {
  return locale === "es" ? "/casos-de-uso" : "/en/use-cases";
}

export function useCaseDetailPath(key: UseCaseKey, locale: Locale) {
  const record = useCaseRecords.find((item) => item.key === key);
  if (!record) throw new Error(`Unknown use case key: ${key}`);
  return `${useCaseIndexPath(locale)}/${record.slugs[locale]}`;
}

export function getUseCaseBySlug(slug: string, locale: Locale) {
  return useCaseRecords.find((record) => record.slugs[locale] === slug);
}

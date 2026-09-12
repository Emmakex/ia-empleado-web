import type { EmployeeKey } from "./employee-catalog";
import type { Locale } from "./i18n";
import type { TeamKey } from "./team-content-engine";
import type { UseCaseKey, SectorKey } from "./sector-use-cases";

export type DepartmentKey =
  | "customer-support"
  | "administration"
  | "accounting-billing"
  | "sales"
  | "ecommerce-operations"
  | "travel-reservations";

export type IntegrationKey =
  | "crm"
  | "erp"
  | "email"
  | "calendar"
  | "ecommerce"
  | "ticketing"
  | "document-management";

export type DepartmentRecord = {
  key: DepartmentKey;
  slugs: Record<Locale, string>;
  name: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  heroTitle: Record<Locale, string>;
  heroDescription: Record<Locale, string>;
  shortAnswer: Record<Locale, string>;
  responsibilities: Record<Locale, string[]>;
  employeeKeys: EmployeeKey[];
  catalogRoles: Record<Locale, string[]>;
  teams: TeamKey[];
  useCases: UseCaseKey[];
  integrations: IntegrationKey[];
  controls: Record<Locale, string[]>;
  metrics: Record<Locale, string[]>;
  operatingModel: Record<Locale, Array<{ title: string; text: string }>>;
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};

export type IntegrationRecord = {
  key: IntegrationKey;
  slugs: Record<Locale, string>;
  name: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  heroTitle: Record<Locale, string>;
  heroDescription: Record<Locale, string>;
  shortAnswer: Record<Locale, string>;
  purpose: Record<Locale, string[]>;
  reads: Record<Locale, string[]>;
  writes: Record<Locale, string[]>;
  departments: DepartmentKey[];
  useCases: UseCaseKey[];
  employeeKeys: EmployeeKey[];
  teams: TeamKey[];
  controls: Record<Locale, string[]>;
  checklist: Record<Locale, Array<{ title: string; text: string }>>;
  limits: Record<Locale, string[]>;
  faq: Record<Locale, Array<{ question: string; answer: string }>>;
};

export type OrganizationIndexContent = {
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

export const departmentIndexContent: Record<Locale, OrganizationIndexContent> = {
  es: {
    seoTitle: "Empleados IA por departamento | IA Empleado",
    seoDescription: "Explora cómo organizar Empleados IA por atención al cliente, administración, facturación, ventas, ecommerce y turismo con procesos, sistemas y controles explícitos.",
    eyebrow: "DEPARTAMENTOS",
    title: "Organiza la IA alrededor de responsabilidades empresariales, no alrededor de prompts sueltos.",
    description: "Un departamento concentra objetivos, sistemas, permisos, métricas y excepciones. Estas páginas conectan ese contexto con Empleados IA, Equipos IA, casos de uso e integraciones que pueden evaluarse sin confundir capacidad técnica con autoridad empresarial.",
    cardsTitle: "Seis departamentos iniciales",
    cardsIntro: "Cada departamento tiene suficiente profundidad para explicar trabajo real, handoffs, sistemas y supervisión. No son paquetes cerrados ni sustituciones automáticas de equipos humanos.",
    methodologyTitle: "Qué debe definir un departamento aumentado por IA",
    methodology: [
      { title: "Responsabilidad", text: "Qué resultado debe conseguir el área y qué trabajo repetitivo absorbe cada rol digital." },
      { title: "Sistemas", text: "Qué fuentes son autoritativas y qué permisos de lectura o escritura necesita cada tarea." },
      { title: "Control", text: "Qué acciones siguen requiriendo aprobación, criterio o responsabilidad de una persona." },
    ],
    ctaTitle: "¿Quieres diseñar un departamento aumentado por IA?",
    ctaText: "Empieza por un proceso medible, identifica los roles necesarios y conecta solo los sistemas imprescindibles para ese primer alcance.",
  },
  en: {
    seoTitle: "AI Employees by department | IA Empleado",
    seoDescription: "Explore how to organize AI Employees across customer support, administration, billing, sales, ecommerce and travel with explicit processes, systems and controls.",
    eyebrow: "DEPARTMENTS",
    title: "Organize AI around business responsibilities, not isolated prompts.",
    description: "A department concentrates outcomes, systems, permissions, metrics and exceptions. These pages connect that context with AI Employees, AI Teams, use cases and integrations without confusing technical capability with business authority.",
    cardsTitle: "Six initial departments",
    cardsIntro: "Each department has enough depth to explain real work, handoffs, systems and supervision. They are not fixed packages or automatic replacements for human teams.",
    methodologyTitle: "What an AI-augmented department should define",
    methodology: [
      { title: "Responsibility", text: "Which outcome the area owns and which repetitive work each digital role absorbs." },
      { title: "Systems", text: "Which sources are authoritative and which read or write permissions each task requires." },
      { title: "Control", text: "Which actions still require human approval, judgment or accountability." },
    ],
    ctaTitle: "Want to design an AI-augmented department?",
    ctaText: "Start with one measurable process, identify the roles needed and connect only the systems required for that first scope.",
  },
};

export const integrationIndexContent: Record<Locale, OrganizationIndexContent> = {
  es: {
    seoTitle: "Integraciones para Empleados IA | CRM, ERP, email y más",
    seoDescription: "Cómo evaluar integraciones de Empleados IA con CRM, ERP, correo, calendario, ecommerce, ticketing y gestión documental sin asumir conectores universales.",
    eyebrow: "INTEGRACIONES",
    title: "Una integración útil no es “conectar una API”: es definir datos, autoridad y trazabilidad.",
    description: "Los Empleados IA necesitan trabajar sobre fuentes autorizadas. Esta capa explica qué puede leerse, qué podría escribirse, qué controles hacen falta y por qué cada integración depende del sistema y del proceso real de la empresa.",
    cardsTitle: "Siete categorías de integración iniciales",
    cardsIntro: "Son categorías de sistema, no una promesa de compatibilidad universal ni una lista de conectores ya certificados para todos los proveedores.",
    methodologyTitle: "Cómo evaluar una integración antes de automatizar",
    methodology: [
      { title: "Fuente autoritativa", text: "Define qué sistema contiene el dato que se considera verdadero para cada decisión." },
      { title: "Permiso mínimo", text: "Separa lectura, propuesta, escritura y acciones sensibles en permisos distintos." },
      { title: "Fallback y auditoría", text: "Diseña qué ocurre si el sistema falla, el dato es ambiguo o una acción necesita aprobación humana." },
    ],
    ctaTitle: "¿Tus sistemas no aparecen todavía?",
    ctaText: "La arquitectura puede adaptarse a otros sistemas cuando existen interfaces fiables y un proceso bien definido, pero cada conector debe validarse en el entorno concreto.",
  },
  en: {
    seoTitle: "AI Employee integrations | CRM, ERP, email and more",
    seoDescription: "How to evaluate AI Employee integrations with CRM, ERP, email, calendar, ecommerce, ticketing and document management without assuming universal connectors.",
    eyebrow: "INTEGRATIONS",
    title: "A useful integration is not just “connect an API”: it defines data, authority and traceability.",
    description: "AI Employees need to work from authorized sources. This layer explains what can be read, what may be written, which controls are required and why every integration depends on the company’s real system and process.",
    cardsTitle: "Seven initial integration categories",
    cardsIntro: "These are system categories, not a promise of universal compatibility or a list of connectors already certified for every vendor.",
    methodologyTitle: "How to evaluate an integration before automating",
    methodology: [
      { title: "Authoritative source", text: "Define which system contains the data considered true for each decision." },
      { title: "Least privilege", text: "Separate read, propose, write and sensitive actions into distinct permissions." },
      { title: "Fallback and audit", text: "Design what happens when the system fails, data is ambiguous or an action requires human approval." },
    ],
    ctaTitle: "Are your systems not listed yet?",
    ctaText: "The architecture can adapt to other systems when reliable interfaces and a well-defined process exist, but each connector must be validated in the specific environment.",
  },
};

export const departmentRecords: DepartmentRecord[] = [
  {
    key: "customer-support",
    slugs: { es: "atencion-cliente", en: "customer-support" },
    name: { es: "Atención al cliente", en: "Customer Support" },
    seoTitle: { es: "Empleados IA para Atención al Cliente | IA Empleado", en: "AI Employees for Customer Support | IA Empleado" },
    seoDescription: { es: "Cómo organizar atención al cliente con Empleados IA, CRM, ticketing, ecommerce y controles humanos para incidencias y excepciones.", en: "How to organize customer support with AI Employees, CRM, ticketing, ecommerce and human controls for requests and exceptions." },
    eyebrow: { es: "DEPARTAMENTO · ATENCIÓN AL CLIENTE", en: "DEPARTMENT · CUSTOMER SUPPORT" },
    heroTitle: { es: "Atención al cliente con contexto operativo, no solo respuestas automáticas.", en: "Customer support with operational context, not just automated answers." },
    heroDescription: { es: "El departamento puede combinar conversación, consulta de sistemas, gestión de casos y handoffs a pedidos, facturación o personas, manteniendo límites explícitos sobre reembolsos, cambios y excepciones.", en: "The department can combine conversation, system lookup, case management and handoffs to orders, billing or people while keeping explicit limits around refunds, changes and exceptions." },
    shortAnswer: { es: "El mejor punto de partida suele ser una incidencia frecuente donde el equipo humano pierde tiempo buscando contexto o coordinando varios sistemas.", en: "A strong starting point is usually a frequent issue where people lose time retrieving context or coordinating several systems." },
    responsibilities: {
      es: ["Clasificar consultas e incidencias.", "Recuperar contexto fiable de cliente, pedido o servicio.", "Resolver preguntas dentro de conocimiento aprobado.", "Crear o actualizar casos con trazabilidad.", "Coordinar incidencias con pedidos, administración o facturación.", "Escalar excepciones y acciones sensibles."],
      en: ["Classify requests and incidents.", "Retrieve reliable customer, order or service context.", "Answer questions from approved knowledge.", "Create or update cases with traceability.", "Coordinate issues with orders, administration or billing.", "Escalate exceptions and sensitive actions."],
    },
    employeeKeys: ["customer-support", "administrative", "accounting-billing"],
    catalogRoles: { es: ["Gestión de Pedidos", "Back office", "Reporting"], en: ["Order Management", "Back office", "Reporting"] },
    teams: ["ecommerce", "travel"],
    useCases: ["customer-issue", "order-exception"],
    integrations: ["crm", "email", "ticketing", "ecommerce", "erp"],
    controls: { es: ["Reembolsos o compensaciones fuera de umbral.", "Identidad o recurso no confirmados.", "Reclamaciones sensibles o excepciones de política.", "Cambios contractuales o económicos relevantes."], en: ["Refunds or compensation above thresholds.", "Unconfirmed identity or resource match.", "Sensitive complaints or policy exceptions.", "Consequential contractual or financial changes."] },
    metrics: { es: ["Tiempo de primera respuesta", "Tiempo de resolución", "Recontactos", "Escalados", "Tiempo humano por caso", "Correcciones"], en: ["First-response time", "Resolution time", "Repeat contacts", "Escalations", "Human time per case", "Corrections"] },
    operatingModel: {
      es: [{ title: "1. Recibir", text: "Capturar solicitud, identidad y contexto disponible." }, { title: "2. Verificar", text: "Consultar fuentes autorizadas antes de afirmar datos o actuar." }, { title: "3. Resolver o derivar", text: "Aplicar política de bajo riesgo o entregar el caso al rol adecuado." }, { title: "4. Cerrar y aprender", text: "Registrar resultado y medir dónde siguen apareciendo retrabajo o escalados." }],
      en: [{ title: "1. Receive", text: "Capture the request, identity and available context." }, { title: "2. Verify", text: "Check authorized sources before asserting facts or acting." }, { title: "3. Resolve or hand off", text: "Apply low-risk policy or route the case to the right role." }, { title: "4. Close and learn", text: "Record the outcome and measure where rework or escalation remains." }],
    },
    faq: {
      es: [{ question: "¿Esto sustituye un equipo de soporte?", answer: "No se plantea como sustitución universal. El objetivo es absorber trabajo repetitivo y coordinar contexto, manteniendo personas para excepciones, responsabilidad y casos sensibles." }, { question: "¿Necesita CRM y ticketing?", answer: "No siempre ambos. Se conectan únicamente los sistemas necesarios para el flujo elegido y con permisos mínimos." }],
      en: [{ question: "Does this replace a support team?", answer: "It is not positioned as a universal replacement. The goal is to absorb repetitive work and coordinate context while people retain exceptions, accountability and sensitive cases." }, { question: "Does it need both CRM and ticketing?", answer: "Not always. Only the systems needed for the selected workflow should be connected, with least-privilege access." }],
    },
  },
  {
    key: "administration",
    slugs: { es: "administracion", en: "administration" },
    name: { es: "Administración", en: "Administration" },
    seoTitle: { es: "Empleados IA para Administración | IA Empleado", en: "AI Employees for Administration | IA Empleado" },
    seoDescription: { es: "Automatización administrativa con correo, documentos, ERP, CRM y controles de trazabilidad para registros, formularios y seguimiento.", en: "Administrative automation across email, documents, ERP and CRM with traceability controls for records, forms and follow-up." },
    eyebrow: { es: "DEPARTAMENTO · ADMINISTRACIÓN", en: "DEPARTMENT · ADMINISTRATION" },
    heroTitle: { es: "Administración que procesa correo, documentos y registros sin perder procedencia ni control.", en: "Administration that processes email, documents and records without losing provenance or control." },
    heroDescription: { es: "Un área administrativa aumentada por IA puede clasificar entradas, extraer datos, comprobar completitud, preparar registros y coordinar faltantes, dejando compromisos legales, pagos y casos inciertos bajo revisión humana.", en: "An AI-augmented administration team can classify inputs, extract data, check completeness, prepare records and coordinate missing information while legal commitments, payments and uncertain cases remain under human review." },
    shortAnswer: { es: "Funciona especialmente bien cuando el volumen está en bandejas, documentos y tareas repetitivas entre varios sistemas.", en: "It fits especially well when volume is concentrated in inboxes, documents and repetitive work across several systems." },
    responsibilities: { es: ["Clasificar email y documentos.", "Extraer datos estructurados con procedencia.", "Comprobar campos y documentación faltante.", "Preparar altas, actualizaciones y formularios.", "Solicitar información pendiente.", "Generar seguimiento y reporting operativo."], en: ["Classify email and documents.", "Extract structured data with provenance.", "Check missing fields and documentation.", "Prepare registrations, updates and forms.", "Request missing information.", "Generate operational follow-up and reporting."] },
    employeeKeys: ["administrative", "accounting-billing"],
    catalogRoles: { es: ["Gestor de Correo", "Back office", "Documentación", "Reporting"], en: ["Email Manager", "Back office", "Documentation", "Reporting"] },
    teams: ["administration", "ecommerce", "travel"],
    useCases: ["administrative-documentation", "invoice-validation"],
    integrations: ["email", "document-management", "erp", "crm"],
    controls: { es: ["Extracciones con baja confianza.", "Documentos sensibles o sujetos a retención especial.", "Compromisos legales o contractuales.", "Pagos y movimientos de dinero."], en: ["Low-confidence extraction.", "Sensitive documents or special retention requirements.", "Legal or contractual commitments.", "Payments and money movement."] },
    metrics: { es: ["Tiempo por expediente", "Campos incompletos", "Retrabajo", "Tiempo en espera de documentación", "Errores de transcripción", "Backlog"], en: ["Time per case", "Incomplete fields", "Rework", "Time waiting for documents", "Transcription errors", "Backlog"] },
    operatingModel: { es: [{ title: "1. Capturar", text: "Centralizar entradas desde correo, formularios o documentos." }, { title: "2. Estructurar", text: "Extraer y normalizar datos conservando la fuente." }, { title: "3. Validar", text: "Separar lo completo de lo incierto o pendiente." }, { title: "4. Registrar", text: "Actualizar sistemas autorizados o preparar la acción para revisión." }], en: [{ title: "1. Capture", text: "Centralize inputs from email, forms or documents." }, { title: "2. Structure", text: "Extract and normalize data while preserving the source." }, { title: "3. Validate", text: "Separate complete records from uncertain or pending ones." }, { title: "4. Record", text: "Update authorized systems or prepare the action for review." }] },
    faq: { es: [{ question: "¿Puede leer documentos escaneados?", answer: "Puede incorporarse OCR cuando el proceso lo necesita, pero una extracción de baja confianza no debe convertirse automáticamente en un dato autoritativo." }, { question: "¿Puede firmar o aceptar compromisos?", answer: "No por defecto. La autoridad legal o contractual se configura separadamente y normalmente permanece bajo responsabilidad humana." }], en: [{ question: "Can it read scanned documents?", answer: "OCR can be added when the process needs it, but low-confidence extraction should not automatically become authoritative data." }, { question: "Can it sign or accept commitments?", answer: "Not by default. Legal or contractual authority is configured separately and normally remains under human responsibility." }] },
  },
  {
    key: "accounting-billing",
    slugs: { es: "contabilidad-facturacion", en: "accounting-billing" },
    name: { es: "Contabilidad y facturación", en: "Accounting & Billing" },
    seoTitle: { es: "Empleados IA para Contabilidad y Facturación | IA Empleado", en: "AI Employees for Accounting & Billing | IA Empleado" },
    seoDescription: { es: "Procesos de facturación con validación determinista, ERP, documentos y supervisión humana para discrepancias, duplicados y registro.", en: "Billing workflows with deterministic validation, ERP, documents and human oversight for discrepancies, duplicates and posting." },
    eyebrow: { es: "DEPARTAMENTO · CONTABILIDAD Y FACTURACIÓN", en: "DEPARTMENT · ACCOUNTING & BILLING" },
    heroTitle: { es: "Facturación repetitiva con controles deterministas y aprobación donde importa.", en: "Repetitive billing work with deterministic controls and approval where it matters." },
    heroDescription: { es: "La IA puede ayudar a recibir, extraer, cotejar y preparar trabajo contable, pero los cálculos críticos, permisos de registro, pagos y decisiones financieras deben tener reglas y autoridad separadas del modelo.", en: "AI can help receive, extract, match and prepare accounting work, but critical calculations, posting permissions, payments and financial decisions need rules and authority separate from the model." },
    shortAnswer: { es: "El valor aparece en validación, preparación y detección de excepciones, no en conceder autonomía financiera ilimitada.", en: "Value appears in validation, preparation and exception detection, not in granting unlimited financial autonomy." },
    responsibilities: { es: ["Recibir y clasificar facturas.", "Extraer campos y conservar procedencia.", "Cotejar proveedor o cliente.", "Detectar duplicados y discrepancias.", "Preparar registro o corrección.", "Generar recordatorios e informes operativos."], en: ["Receive and classify invoices.", "Extract fields and preserve provenance.", "Match supplier or customer.", "Detect duplicates and discrepancies.", "Prepare posting or correction.", "Generate reminders and operational reports."] },
    employeeKeys: ["accounting-billing", "administrative"],
    catalogRoles: { es: ["Reporting", "Documentación", "Back office"], en: ["Reporting", "Documentation", "Back office"] },
    teams: ["administration", "ecommerce", "travel"],
    useCases: ["invoice-validation", "administrative-documentation"],
    integrations: ["erp", "email", "document-management", "crm"],
    controls: { es: ["Movimiento de dinero no autorizado por defecto.", "Asientos o aprobaciones por encima del alcance configurado.", "Tratamiento fiscal o contable que requiera juicio profesional.", "Crédito, riesgo o elegibilidad financiera fuera del perfil."], en: ["Money movement is not authorized by default.", "Posting or approvals beyond configured scope.", "Tax or accounting treatment requiring professional judgment.", "Credit, risk or financial eligibility decisions outside the profile."] },
    metrics: { es: ["Tiempo por factura", "Duplicados detectados", "Discrepancias", "Retrabajo", "Tiempo de aprobación", "Documentos pendientes"], en: ["Time per invoice", "Duplicates detected", "Discrepancies", "Rework", "Approval time", "Pending documents"] },
    operatingModel: { es: [{ title: "1. Recibir", text: "Capturar factura y metadatos desde canales aprobados." }, { title: "2. Validar", text: "Aplicar comprobaciones deterministas y cotejos de identidad." }, { title: "3. Excepcionar", text: "Separar casos correctos de discrepancias o baja confianza." }, { title: "4. Preparar aprobación", text: "Registrar o proponer la acción según permisos y política." }], en: [{ title: "1. Receive", text: "Capture invoice and metadata from approved channels." }, { title: "2. Validate", text: "Apply deterministic checks and identity matching." }, { title: "3. Exception", text: "Separate clean cases from discrepancies or low confidence." }, { title: "4. Prepare approval", text: "Post or propose the action according to permissions and policy." }] },
    faq: { es: [{ question: "¿Puede decidir impuestos o criterios contables?", answer: "No se presenta como sustituto del juicio profesional. Puede aplicar reglas definidas y señalar inconsistencias, pero los criterios relevantes deben configurarse o revisarse por responsables competentes." }, { question: "¿Puede pagar facturas?", answer: "No por defecto. Preparar, validar y ejecutar un pago son autoridades distintas y el movimiento de dinero requiere controles explícitos." }], en: [{ question: "Can it decide tax or accounting treatment?", answer: "It is not positioned as a replacement for professional judgment. It can apply defined rules and flag inconsistencies, while material treatment remains configured or reviewed by qualified owners." }, { question: "Can it pay invoices?", answer: "Not by default. Preparing, validating and executing a payment are separate authorities, and money movement requires explicit controls." }] },
  },
  {
    key: "sales",
    slugs: { es: "ventas", en: "sales" },
    name: { es: "Ventas", en: "Sales" },
    seoTitle: { es: "Empleados IA para Ventas | Prospección, CRM y seguimiento", en: "AI Employees for Sales | Prospecting, CRM and follow-up" },
    seoDescription: { es: "Cómo coordinar research, CRM, correo, calendario y seguimiento comercial con Empleados IA y límites de outreach y autoridad comercial.", en: "How to coordinate research, CRM, email, calendar and sales follow-up with AI Employees and explicit outreach and commercial authority limits." },
    eyebrow: { es: "DEPARTAMENTO · VENTAS", en: "DEPARTMENT · SALES" },
    heroTitle: { es: "Seguimiento comercial sistemático sin convertir la prospección en envío sin control.", en: "Systematic sales follow-up without turning prospecting into uncontrolled outreach." },
    heroDescription: { es: "El departamento puede coordinar research aprobado, CRM, borradores, clasificación de respuestas, agenda y reporting, manteniendo consentimiento, volumen, geografía, precios y compromisos bajo políticas explícitas.", en: "The department can coordinate approved research, CRM, drafts, reply classification, scheduling and reporting while consent, volume, geography, pricing and commitments remain under explicit policy." },
    shortAnswer: { es: "El mejor uso es reducir trabajo administrativo comercial y mejorar continuidad del pipeline, no prometer ventas automáticas.", en: "The strongest use is reducing sales administration and improving pipeline continuity, not promising automatic revenue." },
    responsibilities: { es: ["Investigar cuentas desde fuentes aprobadas.", "Crear o enriquecer CRM.", "Preparar resúmenes y criterios de cualificación.", "Borradores de outreach y follow-up.", "Clasificar respuestas.", "Preparar reuniones y reporting."], en: ["Research accounts from approved sources.", "Create or enrich CRM records.", "Prepare summaries and qualification criteria.", "Draft outreach and follow-up.", "Classify replies.", "Prepare meetings and reporting."] },
    employeeKeys: ["sales-sdr"],
    catalogRoles: { es: ["Marketing Operations", "Gestor de Correo", "Reporting"], en: ["Marketing Operations", "Email Manager", "Reporting"] },
    teams: ["sales"],
    useCases: ["sales-follow-up"],
    integrations: ["crm", "email", "calendar", "document-management"],
    controls: { es: ["Consentimiento y preferencias de contacto.", "Volumen, dominios, canales y geografía del outreach.", "Precios, descuentos y compromisos comerciales.", "Claims o datos de prospectos no verificados."], en: ["Consent and contact preferences.", "Outreach volume, domains, channels and geography.", "Pricing, discounts and commercial commitments.", "Unverified prospect claims or facts."] },
    metrics: { es: ["Tiempo a siguiente acción", "Completitud del CRM", "Oportunidades sin seguimiento", "Tiempo humano por cuenta", "Reuniones cualificadas", "Correcciones de datos"], en: ["Time to next action", "CRM completeness", "Opportunities without follow-up", "Human time per account", "Qualified meetings", "Data corrections"] },
    operatingModel: { es: [{ title: "1. Detectar señal", text: "Registrar procedencia y contexto permitido." }, { title: "2. Preparar cuenta", text: "Estructurar research y CRM sin inventar hechos." }, { title: "3. Seguir", text: "Proponer o ejecutar comunicaciones dentro de la política." }, { title: "4. Escalar", text: "Entregar oportunidad preparada a una persona antes de negociación o compromiso." }], en: [{ title: "1. Detect signal", text: "Record provenance and permitted context." }, { title: "2. Prepare account", text: "Structure research and CRM without inventing facts." }, { title: "3. Follow up", text: "Propose or execute communications within policy." }, { title: "4. Escalate", text: "Hand a prepared opportunity to a person before negotiation or commitment." }] },
    faq: { es: [{ question: "¿Puede enviar emails automáticamente?", answer: "Puede configurarse envío en contextos permitidos, pero canal, consentimiento, volumen y revisión deben formar parte de la política; no se asume outreach indiscriminado." }, { question: "¿Promete más ventas?", answer: "No. Puede mejorar disciplina y capacidad operativa; la conversión depende de mercado, oferta, datos, mensaje y trabajo comercial humano." }], en: [{ question: "Can it send emails automatically?", answer: "Sending can be configured in permitted contexts, but channel, consent, volume and review belong in policy; indiscriminate outreach is not assumed." }, { question: "Does it promise more sales?", answer: "No. It can improve discipline and operating capacity; conversion still depends on market, offer, data, messaging and human sales work." }] },
  },
  {
    key: "ecommerce-operations",
    slugs: { es: "operaciones-ecommerce", en: "ecommerce-operations" },
    name: { es: "Operaciones ecommerce", en: "Ecommerce Operations" },
    seoTitle: { es: "Empleados IA para Operaciones Ecommerce | IA Empleado", en: "AI Employees for Ecommerce Operations | IA Empleado" },
    seoDescription: { es: "Coordina pedidos, incidencias, back office y atención ecommerce con sistemas autoritativos, permisos y supervisión humana.", en: "Coordinate orders, exceptions, back office and ecommerce support with authoritative systems, permissions and human oversight." },
    eyebrow: { es: "DEPARTAMENTO · OPERACIONES ECOMMERCE", en: "DEPARTMENT · ECOMMERCE OPERATIONS" },
    heroTitle: { es: "Operaciones ecommerce que conectan pedido, stock, envío, cliente y facturación.", en: "Ecommerce operations connecting order, stock, shipping, customer and billing." },
    heroDescription: { es: "El área puede usar Empleados IA para coordinar excepciones entre plataforma ecommerce, ERP, logística, soporte y facturación, manteniendo cambios de alto impacto y devoluciones fuera de regla bajo aprobación.", en: "The area can use AI Employees to coordinate exceptions across ecommerce, ERP, logistics, support and billing while consequential changes and out-of-policy returns remain approval-controlled." },
    shortAnswer: { es: "La oportunidad está en excepciones y handoffs repetitivos, no en automatizar ciegamente cada pedido.", en: "The opportunity is in repetitive exceptions and handoffs, not blindly automating every order." },
    responsibilities: { es: ["Monitorizar estados de pedido.", "Clasificar excepciones de stock o entrega.", "Coordinar soporte y back office.", "Preparar cambios permitidos.", "Mantener registros consistentes.", "Escalar devoluciones o incidencias fuera de política."], en: ["Monitor order states.", "Classify stock or delivery exceptions.", "Coordinate support and back office.", "Prepare permitted changes.", "Keep records consistent.", "Escalate returns or incidents outside policy."] },
    employeeKeys: ["customer-support", "administrative", "accounting-billing"],
    catalogRoles: { es: ["Gestión de Pedidos", "Ecommerce Operations", "Back office", "Reporting"], en: ["Order Management", "Ecommerce Operations", "Back office", "Reporting"] },
    teams: ["ecommerce"],
    useCases: ["order-exception", "customer-issue", "invoice-validation"],
    integrations: ["ecommerce", "erp", "ticketing", "email", "crm"],
    controls: { es: ["Cambios de pedido sin coincidencia fiable.", "Reembolsos fuera de umbral.", "Excepciones de precio o promoción.", "Estados de stock o entrega no confirmados."], en: ["Order changes without a reliable match.", "Refunds above thresholds.", "Price or promotion exceptions.", "Unconfirmed stock or delivery states."] },
    metrics: { es: ["Pedidos con excepción", "Tiempo de resolución", "Recontactos", "Retrabajo", "Tiempo humano por excepción", "Errores de sincronización"], en: ["Orders with exceptions", "Resolution time", "Repeat contacts", "Rework", "Human time per exception", "Synchronization errors"] },
    operatingModel: { es: [{ title: "1. Detectar", text: "Identificar una excepción desde una fuente fiable." }, { title: "2. Enriquecer", text: "Recuperar pedido, cliente y estado relacionado." }, { title: "3. Coordinar", text: "Entregar tareas a soporte, facturación o back office." }, { title: "4. Cerrar", text: "Aplicar la acción permitida y registrar el resultado." }], en: [{ title: "1. Detect", text: "Identify an exception from a reliable source." }, { title: "2. Enrich", text: "Retrieve related order, customer and state." }, { title: "3. Coordinate", text: "Hand work to support, billing or back office." }, { title: "4. Close", text: "Apply the permitted action and record the outcome." }] },
    faq: { es: [{ question: "¿Puede cambiar pedidos automáticamente?", answer: "Solo si existe una coincidencia fiable del pedido, una regla explícita y permiso suficiente. Los cambios relevantes pueden reservarse a aprobación humana." }, { question: "¿Necesita acceso total al ecommerce?", answer: "No. Debe usarse el mínimo permiso necesario para cada flujo, separando lectura, actualización y acciones sensibles." }], en: [{ question: "Can it change orders automatically?", answer: "Only when there is a reliable order match, an explicit rule and sufficient permission. Consequential changes can remain human-approved." }, { question: "Does it need full ecommerce access?", answer: "No. Each workflow should use the least privilege required, separating read, update and sensitive actions." }] },
  },
  {
    key: "travel-reservations",
    slugs: { es: "turismo-reservas", en: "travel-reservations" },
    name: { es: "Turismo y reservas", en: "Travel & Reservations" },
    seoTitle: { es: "Empleados IA para Turismo y Reservas | IA Empleado", en: "AI Employees for Travel & Reservations | IA Empleado" },
    seoDescription: { es: "Coordina consultas, disponibilidad, reservas, documentación, facturación y cambios con Empleados IA, proveedores y controles humanos.", en: "Coordinate inquiries, availability, bookings, documents, billing and changes with AI Employees, suppliers and human controls." },
    eyebrow: { es: "DEPARTAMENTO · TURISMO Y RESERVAS", en: "DEPARTMENT · TRAVEL & RESERVATIONS" },
    heroTitle: { es: "Turismo conectado desde la consulta hasta la reserva, sin inventar disponibilidad ni confirmaciones.", en: "Travel connected from inquiry to booking without inventing availability or confirmations." },
    heroDescription: { es: "El departamento puede coordinar consulta, propuesta, disponibilidad, datos de viajeros, facturación y soporte, siempre distinguiendo una opción consultada de una reserva realmente confirmada por la fuente autoritativa.", en: "The department can coordinate inquiry, proposal, availability, traveler data, billing and support while always distinguishing a checked option from a booking actually confirmed by the authoritative source." },
    shortAnswer: { es: "La clave es coordinar handoffs y proveedores manteniendo la confirmación real, condiciones y autoridad económica en fuentes y reglas verificables.", en: "The key is coordinating handoffs and suppliers while keeping real confirmation, terms and financial authority tied to verifiable sources and rules." },
    responsibilities: { es: ["Estructurar consultas de viaje.", "Consultar disponibilidad autorizada.", "Preparar opciones y condiciones.", "Coordinar datos y documentación.", "Gestionar cambios e incidencias.", "Mantener facturación y soporte sincronizados."], en: ["Structure travel inquiries.", "Check authorized availability.", "Prepare options and terms.", "Coordinate data and documentation.", "Handle changes and incidents.", "Keep billing and support synchronized."] },
    employeeKeys: ["customer-support", "administrative", "accounting-billing"],
    catalogRoles: { es: ["Agente de Viajes", "Reservas", "Reporting"], en: ["Travel Agent", "Reservations", "Reporting"] },
    teams: ["travel"],
    useCases: ["travel-booking", "customer-issue", "invoice-validation"],
    integrations: ["crm", "email", "calendar", "erp", "document-management"],
    controls: { es: ["Confirmaciones sin respaldo de proveedor o sistema.", "Cambios con penalización o impacto económico.", "Pagos o devoluciones fuera de reglas.", "Tratamiento de datos de viajeros más allá de necesidad y permiso."], en: ["Confirmations not backed by supplier or system.", "Changes with penalties or financial impact.", "Payments or refunds outside rules.", "Traveler data processing beyond need and permission."] },
    metrics: { es: ["Tiempo a primera propuesta", "Tiempo a confirmación", "Handoffs por reserva", "Datos pendientes", "Retrabajo", "Tiempo de resolución de cambios"], en: ["Time to first proposal", "Time to confirmation", "Handoffs per booking", "Pending data", "Rework", "Change-resolution time"] },
    operatingModel: { es: [{ title: "1. Estructurar consulta", text: "Convertir preferencias y restricciones en criterios claros." }, { title: "2. Consultar", text: "Usar fuentes aprobadas y distinguir opción de confirmación." }, { title: "3. Confirmar", text: "Continuar solo cuando proveedor, sistema y política lo permiten." }, { title: "4. Coordinar", text: "Entregar documentación, facturación y soporte con contexto mínimo necesario." }], en: [{ title: "1. Structure inquiry", text: "Turn preferences and constraints into clear criteria." }, { title: "2. Check", text: "Use approved sources and distinguish an option from confirmation." }, { title: "3. Confirm", text: "Continue only when supplier, system and policy allow it." }, { title: "4. Coordinate", text: "Hand documents, billing and support the minimum necessary context." }] },
    faq: { es: [{ question: "¿Puede confirmar una reserva automáticamente?", answer: "Solo cuando existe una integración fiable, permiso explícito y una confirmación real del sistema o proveedor autoritativo. Una consulta de disponibilidad no equivale a reserva." }, { question: "¿Puede trabajar con varios proveedores?", answer: "Sí como arquitectura, pero cada integración, formato y regla debe implementarse y validarse para el entorno concreto." }], en: [{ question: "Can it confirm a booking automatically?", answer: "Only when a reliable integration, explicit permission and real confirmation from the authoritative system or supplier exist. An availability check is not a booking." }, { question: "Can it work with multiple suppliers?", answer: "Architecturally yes, but each integration, format and rule must be implemented and validated for the specific environment." }] },
  },
];

export const integrationRecords: IntegrationRecord[] = [
  {
    key: "crm",
    slugs: { es: "crm", en: "crm" },
    name: { es: "CRM", en: "CRM" },
    seoTitle: { es: "Integración CRM para Empleados IA | IA Empleado", en: "CRM integration for AI Employees | IA Empleado" },
    seoDescription: { es: "Cómo diseñar acceso de Empleados IA a CRM para consultar clientes, leads y casos, actualizar registros y mantener trazabilidad con permisos mínimos.", en: "How to design AI Employee access to CRM for customers, leads and cases, record updates and traceability with least privilege." },
    eyebrow: { es: "INTEGRACIÓN · CRM", en: "INTEGRATION · CRM" },
    heroTitle: { es: "El CRM debe seguir siendo una fuente empresarial, no convertirse en memoria informal del modelo.", en: "The CRM should remain a business source of record, not become informal model memory." },
    heroDescription: { es: "Una integración CRM útil define qué entidades puede consultar cada Empleado IA, qué campos puede modificar, cómo se identifica el registro correcto y qué acciones requieren revisión.", en: "A useful CRM integration defines which entities each AI Employee may query, which fields it may change, how the right record is matched and which actions require review." },
    shortAnswer: { es: "CRM es especialmente valioso para soporte y ventas, pero leer contexto, crear actividad y cambiar datos sensibles deben ser permisos separados.", en: "CRM is especially valuable for support and sales, but reading context, creating activity and changing sensitive data should be separate permissions." },
    purpose: { es: ["Recuperar cliente, cuenta, lead u oportunidad.", "Mantener historial y siguiente acción.", "Relacionar conversaciones con registros correctos.", "Entregar contexto autorizado entre roles."], en: ["Retrieve customer, account, lead or opportunity.", "Maintain history and next action.", "Relate conversations to the right record.", "Hand authorized context between roles."] },
    reads: { es: ["Identidad y datos de contacto autorizados", "Estado de oportunidad o caso", "Historial relevante", "Propietario y próxima acción"], en: ["Authorized identity and contact data", "Opportunity or case state", "Relevant history", "Owner and next action"] },
    writes: { es: ["Notas y actividad", "Campos permitidos", "Creación/actualización de casos", "Tareas y siguiente acción"], en: ["Notes and activity", "Permitted fields", "Case creation/update", "Tasks and next action"] },
    departments: ["customer-support", "sales", "administration", "travel-reservations"],
    useCases: ["customer-issue", "sales-follow-up", "travel-booking"],
    employeeKeys: ["customer-support", "sales-sdr", "administrative"],
    teams: ["sales", "ecommerce", "travel"],
    controls: { es: ["Coincidencia fiable de persona/cuenta antes de escribir.", "Campos sensibles separados de actividad operativa.", "No revelar datos de otros clientes.", "Auditar origen y autor de cambios relevantes."], en: ["Reliable person/account match before writing.", "Sensitive fields separated from operational activity.", "Do not expose other customers’ data.", "Audit provenance and actor for relevant changes."] },
    checklist: { es: [{ title: "Objetos", text: "Define clientes, leads, oportunidades, casos y campos realmente necesarios." }, { title: "Permisos", text: "Separa lectura, creación, actualización y campos sensibles." }, { title: "Matching", text: "Establece cómo se identifica de forma fiable el registro correcto." }, { title: "Auditoría", text: "Conserva acción, origen y resultado de cada cambio relevante." }], en: [{ title: "Objects", text: "Define the customers, leads, opportunities, cases and fields actually needed." }, { title: "Permissions", text: "Separate read, create, update and sensitive fields." }, { title: "Matching", text: "Define how the correct record is reliably identified." }, { title: "Audit", text: "Preserve action, provenance and result for relevant changes." }] },
    limits: { es: ["No existe un único modelo de datos CRM.", "No se asume compatibilidad universal con cualquier proveedor.", "La integración no concede acceso a todos los contactos o campos.", "El CRM no sustituye reglas de consentimiento o privacidad."], en: ["There is no single universal CRM data model.", "Universal compatibility with every vendor is not assumed.", "Integration does not grant access to every contact or field.", "CRM does not replace consent or privacy rules."] },
    faq: { es: [{ question: "¿IA Empleado tiene un CRM propio?", answer: "No es necesario. El enfoque es trabajar con los sistemas empresariales autorizados del cliente cuando existe una integración adecuada." }, { question: "¿Puede actualizar cualquier campo?", answer: "No. Los permisos deben limitarse por rol y flujo; campos sensibles o críticos pueden permanecer solo lectura o requerir aprobación." }], en: [{ question: "Does IA Empleado include its own CRM?", answer: "It does not need to. The approach is to work with the customer’s authorized business systems when an appropriate integration exists." }, { question: "Can it update any field?", answer: "No. Permissions should be scoped by role and workflow; sensitive or critical fields can remain read-only or approval-controlled." }] },
  },
  {
    key: "erp",
    slugs: { es: "erp", en: "erp" },
    name: { es: "ERP", en: "ERP" },
    seoTitle: { es: "Integración ERP para Empleados IA | IA Empleado", en: "ERP integration for AI Employees | IA Empleado" },
    seoDescription: { es: "Cómo conectar Empleados IA con ERP para pedidos, facturación, clientes y operaciones manteniendo fuentes autoritativas, permisos y aprobación.", en: "How to connect AI Employees with ERP for orders, billing, customers and operations while preserving authoritative sources, permissions and approval." },
    eyebrow: { es: "INTEGRACIÓN · ERP", en: "INTEGRATION · ERP" },
    heroTitle: { es: "ERP: datos operativos autoritativos con escritura mucho más controlada que la lectura.", en: "ERP: authoritative operational data with writing much more tightly controlled than reading." },
    heroDescription: { es: "El ERP suele concentrar pedidos, facturas, maestros y estados críticos. La integración debe distinguir consulta, propuesta de cambio, escritura permitida y acciones con impacto económico o contable.", en: "ERP systems often concentrate orders, invoices, master data and critical states. Integration should distinguish lookup, proposed change, permitted write and financially or accounting-significant actions." },
    shortAnswer: { es: "ERP puede desbloquear procesos de alto valor, pero es precisamente donde menos conviene dar permisos amplios por comodidad.", en: "ERP access can unlock high-value workflows, but it is exactly where broad permissions should not be granted for convenience." },
    purpose: { es: ["Consultar pedidos, facturas y estados.", "Cotejar entidades y referencias.", "Preparar registros o correcciones.", "Coordinar excepciones operativas."], en: ["Query orders, invoices and states.", "Match entities and references.", "Prepare records or corrections.", "Coordinate operational exceptions."] },
    reads: { es: ["Pedidos y líneas", "Facturas y estados", "Maestros de cliente/proveedor", "Stock o estados operativos según alcance"], en: ["Orders and lines", "Invoices and states", "Customer/supplier master data", "Stock or operational states within scope"] },
    writes: { es: ["Campos operativos permitidos", "Borradores o propuestas", "Estados de workflow autorizados", "Registros de seguimiento"], en: ["Permitted operational fields", "Drafts or proposals", "Authorized workflow states", "Follow-up records"] },
    departments: ["administration", "accounting-billing", "ecommerce-operations", "travel-reservations", "customer-support"],
    useCases: ["invoice-validation", "order-exception", "administrative-documentation"],
    employeeKeys: ["administrative", "accounting-billing", "customer-support"],
    teams: ["administration", "ecommerce", "travel"],
    controls: { es: ["Separar lectura de escritura.", "No mover dinero por defecto.", "Aplicar validaciones deterministas a importes y estados.", "Registrar cambios y aprobaciones relevantes."], en: ["Separate read from write.", "No money movement by default.", "Apply deterministic validation to amounts and states.", "Record relevant changes and approvals."] },
    checklist: { es: [{ title: "Fuente", text: "Define qué módulos del ERP son autoritativos para cada dato." }, { title: "Transacciones", text: "Identifica operaciones reversibles frente a acciones de impacto." }, { title: "Idempotencia", text: "Evita duplicar registros cuando una petición se repite." }, { title: "Fallback", text: "Si falla el ERP, el proceso debe parar o escalar en lugar de inventar estado." }], en: [{ title: "Source", text: "Define which ERP modules are authoritative for each datum." }, { title: "Transactions", text: "Identify reversible operations versus consequential actions." }, { title: "Idempotency", text: "Avoid duplicate records when a request is retried." }, { title: "Fallback", text: "If the ERP fails, the workflow should stop or escalate rather than invent state." }] },
    limits: { es: ["Cada ERP tiene módulos, APIs y reglas distintas.", "No se presupone acceso de escritura a contabilidad.", "Los datos maestros pueden requerir workflows separados.", "La integración no sustituye controles financieros internos."], en: ["Each ERP has different modules, APIs and rules.", "Write access to accounting is not assumed.", "Master data may require separate workflows.", "Integration does not replace internal financial controls."] },
    faq: { es: [{ question: "¿Puede escribir directamente en el ERP?", answer: "Puede diseñarse escritura para acciones concretas y autorizadas, pero no se concede acceso general. Muchos flujos empiezan en lectura o preparación para aprobación." }, { question: "¿Qué pasa si el ERP no responde?", answer: "El proceso debe tener un fallback explícito: reintentar de forma segura, dejar pendiente o escalar. No debe inventar estados." }], en: [{ question: "Can it write directly to the ERP?", answer: "Writing can be designed for specific authorized actions, but general access is not granted. Many workflows start with read-only or prepare-for-approval modes." }, { question: "What happens if the ERP is unavailable?", answer: "The workflow needs an explicit fallback: safe retry, pending state or escalation. It should not invent states." }] },
  },
  {
    key: "email",
    slugs: { es: "correo-email", en: "email" },
    name: { es: "Correo electrónico", en: "Email" },
    seoTitle: { es: "Integración de Email para Empleados IA | IA Empleado", en: "Email integration for AI Employees | IA Empleado" },
    seoDescription: { es: "Clasificación, borradores, seguimiento y envío controlado de email con Empleados IA, identidad, consentimiento y trazabilidad.", en: "Email classification, drafting, follow-up and controlled sending with AI Employees, identity, consent and traceability." },
    eyebrow: { es: "INTEGRACIÓN · EMAIL", en: "INTEGRATION · EMAIL" },
    heroTitle: { es: "El correo es un canal de trabajo; la integración debe separar leer, redactar y enviar.", en: "Email is a work channel; integration should separate reading, drafting and sending." },
    heroDescription: { es: "Muchos procesos empiezan en una bandeja. Un Empleado IA puede clasificar, asociar contexto, preparar respuesta y coordinar tareas, pero el envío automático depende de identidad, política, consentimiento y riesgo del mensaje.", en: "Many workflows start in an inbox. An AI Employee can classify, relate context, draft a response and coordinate work, while automatic sending depends on identity, policy, consent and message risk." },
    shortAnswer: { es: "Email es una de las integraciones más transversales, pero 'puede redactar' no significa 'puede enviar cualquier mensaje'.", en: "Email is one of the most cross-functional integrations, but 'can draft' does not mean 'can send any message'." },
    purpose: { es: ["Clasificar bandejas y asuntos.", "Relacionar mensajes con casos o registros.", "Preparar borradores y solicitudes de información.", "Coordinar follow-up y handoffs."], en: ["Classify inboxes and subjects.", "Relate messages to cases or records.", "Prepare drafts and information requests.", "Coordinate follow-up and handoffs."] },
    reads: { es: ["Remitente y destinatarios", "Asunto y contenido permitido", "Hilo relevante", "Adjuntos según política"], en: ["Sender and recipients", "Permitted subject and content", "Relevant thread", "Attachments according to policy"] },
    writes: { es: ["Borradores", "Etiquetas o clasificación", "Respuestas permitidas", "Mensajes de seguimiento autorizados"], en: ["Drafts", "Labels or classification", "Permitted replies", "Authorized follow-up messages"] },
    departments: ["customer-support", "administration", "sales", "accounting-billing", "travel-reservations"],
    useCases: ["customer-issue", "sales-follow-up", "invoice-validation", "administrative-documentation", "travel-booking"],
    employeeKeys: ["customer-support", "administrative", "accounting-billing", "sales-sdr"],
    teams: ["sales", "administration", "ecommerce", "travel"],
    controls: { es: ["Verificar identidad y hilo antes de actuar.", "Separar borrador de envío.", "Respetar consentimiento y preferencias de contacto.", "Filtrar datos sensibles y adjuntos según política."], en: ["Verify identity and thread before acting.", "Separate draft from send.", "Respect consent and contact preferences.", "Filter sensitive data and attachments according to policy."] },
    checklist: { es: [{ title: "Bandejas", text: "Define qué buzones y carpetas forman parte del alcance." }, { title: "Identidad", text: "Establece remitentes autorizados y reglas de reply-to." }, { title: "Envío", text: "Define qué mensajes pueden enviarse sin revisión y cuáles no." }, { title: "Retención", text: "Alinea logs y contenido con la política de datos de la organización." }], en: [{ title: "Inboxes", text: "Define which mailboxes and folders are in scope." }, { title: "Identity", text: "Establish authorized senders and reply-to rules." }, { title: "Sending", text: "Define which messages may be sent without review and which may not." }, { title: "Retention", text: "Align logs and content with the organization’s data policy." }] },
    limits: { es: ["No se asume acceso a todo el correo corporativo.", "Spam o outreach masivo no es un caso por defecto.", "Adjuntos sensibles pueden requerir tratamiento separado.", "El email no sustituye sistemas autoritativos de pedido, cliente o factura."], en: ["Access to all corporate email is not assumed.", "Spam or mass outreach is not a default use case.", "Sensitive attachments may require separate handling.", "Email does not replace authoritative order, customer or invoice systems."] },
    faq: { es: [{ question: "¿Puede responder automáticamente?", answer: "Sí para categorías y mensajes de bajo riesgo cuando la política lo permite. Otros mensajes pueden quedar en borrador para revisión humana." }, { question: "¿Puede leer adjuntos?", answer: "Puede procesarlos cuando el flujo y la clasificación de datos lo permiten; documentos sensibles o no soportados pueden requerir revisión o herramientas adicionales." }], en: [{ question: "Can it reply automatically?", answer: "Yes for low-risk categories and messages when policy permits. Other messages can remain drafts for human review." }, { question: "Can it read attachments?", answer: "It can process them when the workflow and data classification permit it; sensitive or unsupported documents may require review or additional tools." }] },
  },
  {
    key: "calendar",
    slugs: { es: "calendario", en: "calendar" },
    name: { es: "Calendario", en: "Calendar" },
    seoTitle: { es: "Integración de Calendario para Empleados IA | IA Empleado", en: "Calendar integration for AI Employees | IA Empleado" },
    seoDescription: { es: "Cómo usar calendario para disponibilidad, reuniones y seguimiento con Empleados IA sin crear citas duplicadas ni revelar información innecesaria.", en: "How to use calendars for availability, meetings and follow-up with AI Employees without duplicate bookings or unnecessary data exposure." },
    eyebrow: { es: "INTEGRACIÓN · CALENDARIO", en: "INTEGRATION · CALENDAR" },
    heroTitle: { es: "Agenda automatizada con disponibilidad real, permisos y contexto mínimo.", en: "Automated scheduling with real availability, permissions and minimal context." },
    heroDescription: { es: "La integración de calendario puede consultar disponibilidad, proponer horarios y crear eventos autorizados. Debe controlar zonas horarias, conflictos, participantes, privacidad y quién puede cancelar o modificar una cita.", en: "Calendar integration can query availability, propose times and create authorized events. It needs controls for time zones, conflicts, participants, privacy and who may cancel or change a meeting." },
    shortAnswer: { es: "Calendario parece simple, pero crear, reprogramar y cancelar son autoridades distintas y deben tratarse como tales.", en: "Calendar looks simple, but create, reschedule and cancel are different authorities and should be treated that way." },
    purpose: { es: ["Consultar disponibilidad.", "Proponer franjas.", "Crear reuniones permitidas.", "Relacionar agenda con seguimiento comercial o de reservas."], en: ["Query availability.", "Propose time slots.", "Create permitted meetings.", "Relate scheduling to sales follow-up or reservations."] },
    reads: { es: ["Disponibilidad libre/ocupado", "Zona horaria", "Participantes necesarios", "Contexto mínimo del evento"], en: ["Free/busy availability", "Time zone", "Required participants", "Minimum event context"] },
    writes: { es: ["Eventos autorizados", "Cambios de horario permitidos", "Notas no sensibles", "Recordatorios"], en: ["Authorized events", "Permitted rescheduling", "Non-sensitive notes", "Reminders"] },
    departments: ["sales", "travel-reservations", "administration"],
    useCases: ["sales-follow-up", "travel-booking"],
    employeeKeys: ["sales-sdr", "administrative"],
    teams: ["sales", "travel"],
    controls: { es: ["Evitar dobles reservas.", "Respetar zonas horarias y ventanas laborales.", "No exponer títulos o asistentes innecesarios.", "Separar crear, reprogramar y cancelar."], en: ["Avoid double booking.", "Respect time zones and working windows.", "Do not expose unnecessary titles or attendees.", "Separate create, reschedule and cancel permissions."] },
    checklist: { es: [{ title: "Disponibilidad", text: "Define calendarios y reglas de free/busy." }, { title: "Zona horaria", text: "Normaliza horario del usuario y de la organización." }, { title: "Permisos", text: "Distingue crear, mover y cancelar." }, { title: "Contexto", text: "Incluye solo información necesaria en el evento." }], en: [{ title: "Availability", text: "Define calendars and free/busy rules." }, { title: "Time zone", text: "Normalize user and organization time zones." }, { title: "Permissions", text: "Distinguish create, move and cancel." }, { title: "Context", text: "Include only information necessary in the event." }] },
    limits: { es: ["No todos los calendarios exponen las mismas capacidades.", "Disponibilidad no equivale a permiso para reservar.", "Reuniones externas pueden requerir reglas adicionales.", "El calendario no decide prioridad comercial o contractual."], en: ["Not every calendar exposes the same capabilities.", "Availability does not equal permission to book.", "External meetings may require additional rules.", "Calendar does not decide commercial or contractual priority."] },
    faq: { es: [{ question: "¿Puede reservar reuniones solo?", answer: "Puede hacerlo cuando existe permiso explícito y reglas de disponibilidad. Algunos contextos pueden requerir confirmación humana antes de crear o mover eventos." }, { question: "¿Ve el contenido de todo el calendario?", answer: "No debería necesitarlo. Para muchos flujos basta con disponibilidad libre/ocupado y contexto mínimo." }], en: [{ question: "Can it book meetings by itself?", answer: "It can when explicit permission and availability rules exist. Some contexts may require human confirmation before creating or moving events." }, { question: "Does it see the content of the entire calendar?", answer: "It should not need to. Many workflows only require free/busy availability and minimal context." }] },
  },
  {
    key: "ecommerce",
    slugs: { es: "ecommerce", en: "ecommerce" },
    name: { es: "Plataforma ecommerce", en: "Ecommerce platform" },
    seoTitle: { es: "Integración Ecommerce para Empleados IA | IA Empleado", en: "Ecommerce integration for AI Employees | IA Empleado" },
    seoDescription: { es: "Consulta y gestión controlada de pedidos, clientes, productos y estados ecommerce con Empleados IA y reglas de devolución y cambios.", en: "Controlled lookup and management of orders, customers, products and ecommerce states with AI Employees and explicit return/change rules." },
    eyebrow: { es: "INTEGRACIÓN · ECOMMERCE", en: "INTEGRATION · ECOMMERCE" },
    heroTitle: { es: "Pedidos y clientes como datos operativos, no como texto que la IA deba adivinar.", en: "Orders and customers as operational data, not text the AI should guess." },
    heroDescription: { es: "La plataforma ecommerce puede aportar pedido, líneas, estado, cliente y catálogo para soporte y operaciones. Cualquier modificación debe validar primero el recurso y aplicar políticas explícitas para cambios, devoluciones o reembolsos.", en: "The ecommerce platform can provide order, line, state, customer and catalog context for support and operations. Any mutation should first validate the resource and apply explicit policies for changes, returns or refunds." },
    shortAnswer: { es: "La regla clave es simple: no modificar un pedido sin coincidencia autoritativa y no convertir una posibilidad comercial en un estado real.", en: "The key rule is simple: do not modify an order without an authoritative match and do not turn a commercial possibility into a real state." },
    purpose: { es: ["Consultar pedidos y estados.", "Relacionar cliente con compra.", "Preparar devoluciones o cambios permitidos.", "Coordinar soporte, pedidos y facturación."], en: ["Query orders and states.", "Relate customer to purchase.", "Prepare permitted returns or changes.", "Coordinate support, orders and billing."] },
    reads: { es: ["Pedido y líneas", "Estado de fulfilment", "Cliente asociado", "Producto y disponibilidad expuesta"], en: ["Order and lines", "Fulfilment state", "Associated customer", "Product and exposed availability"] },
    writes: { es: ["Notas o metadatos permitidos", "Estados de workflow autorizados", "Solicitudes de devolución", "Cambios de bajo riesgo definidos por política"], en: ["Permitted notes or metadata", "Authorized workflow states", "Return requests", "Low-risk changes defined by policy"] },
    departments: ["ecommerce-operations", "customer-support", "accounting-billing"],
    useCases: ["order-exception", "customer-issue", "invoice-validation"],
    employeeKeys: ["customer-support", "administrative", "accounting-billing"],
    teams: ["ecommerce"],
    controls: { es: ["Coincidencia autoritativa del pedido.", "Separar consulta, cambio y reembolso.", "Respetar reglas de devolución y plazos.", "No exponer pedidos de otros clientes."], en: ["Authoritative order match.", "Separate lookup, change and refund.", "Respect return rules and deadlines.", "Do not expose other customers’ orders."] },
    checklist: { es: [{ title: "Identificadores", text: "Define cómo se localiza pedido y cliente sin ambigüedad." }, { title: "Estados", text: "Mapea estados internos a mensajes comprensibles sin inventarlos." }, { title: "Acciones", text: "Clasifica cambios por riesgo y reversibilidad." }, { title: "Eventos", text: "Decide qué cambios deben disparar handoffs o notificaciones." }], en: [{ title: "Identifiers", text: "Define how order and customer are located without ambiguity." }, { title: "States", text: "Map internal states to understandable messages without inventing them." }, { title: "Actions", text: "Classify changes by risk and reversibility." }, { title: "Events", text: "Decide which changes should trigger handoffs or notifications." }] },
    limits: { es: ["No se presupone compatibilidad universal entre plataformas.", "Inventario y fulfilment pueden vivir en sistemas separados.", "Un estado ecommerce no siempre refleja proveedor o transportista en tiempo real.", "Reembolsos requieren política y autoridad independientes."], en: ["Universal compatibility across platforms is not assumed.", "Inventory and fulfilment may live in separate systems.", "An ecommerce state may not reflect supplier or carrier status in real time.", "Refunds require independent policy and authority."] },
    faq: { es: [{ question: "¿Puede gestionar devoluciones?", answer: "Puede comprobar condiciones y preparar o ejecutar pasos dentro de reglas explícitas. Casos fuera de política o por encima de umbral deben escalar." }, { question: "¿Puede ver stock en tiempo real?", answer: "Solo si la fuente conectada es realmente autoritativa y expone ese dato. No debe inferir disponibilidad a partir de información incompleta." }], en: [{ question: "Can it handle returns?", answer: "It can check conditions and prepare or execute steps within explicit rules. Out-of-policy or above-threshold cases should escalate." }, { question: "Can it see real-time stock?", answer: "Only if the connected source is actually authoritative and exposes that data. Availability should not be inferred from incomplete information." }] },
  },
  {
    key: "ticketing",
    slugs: { es: "ticketing", en: "ticketing" },
    name: { es: "Ticketing / gestión de casos", en: "Ticketing / case management" },
    seoTitle: { es: "Integración Ticketing para Empleados IA | IA Empleado", en: "Ticketing integration for AI Employees | IA Empleado" },
    seoDescription: { es: "Cómo usar ticketing para clasificación, actualización, handoffs y trazabilidad de incidencias con Empleados IA y supervisión humana.", en: "How to use ticketing for classification, updates, handoffs and traceability of incidents with AI Employees and human oversight." },
    eyebrow: { es: "INTEGRACIÓN · TICKETING", en: "INTEGRATION · TICKETING" },
    heroTitle: { es: "El ticket debe conservar la historia del trabajo, no solo el último mensaje.", en: "A ticket should preserve the history of the work, not just the latest message." },
    heroDescription: { es: "Una integración de ticketing permite clasificar, priorizar, actualizar y entregar casos entre personas y Empleados IA. La trazabilidad debe mostrar qué ocurrió, qué sistema se consultó, qué handoff se hizo y qué quedó pendiente.", en: "A ticketing integration lets people and AI Employees classify, prioritize, update and hand off cases. Traceability should show what happened, which system was consulted, which handoff occurred and what remains pending." },
    shortAnswer: { es: "Ticketing funciona como columna vertebral de incidencias cuando el proceso necesita estado, owner, SLA y handoffs explícitos.", en: "Ticketing works as an incident backbone when the process needs state, owner, SLA and explicit handoffs." },
    purpose: { es: ["Crear y clasificar casos.", "Mantener owner y estado.", "Coordinar handoffs.", "Registrar resolución y pendientes."], en: ["Create and classify cases.", "Maintain owner and state.", "Coordinate handoffs.", "Record resolution and pending work."] },
    reads: { es: ["Caso y estado", "Historial relevante", "Prioridad/SLA", "Relaciones con cliente o pedido"], en: ["Case and state", "Relevant history", "Priority/SLA", "Customer or order relationships"] },
    writes: { es: ["Clasificación", "Notas y resumen", "Cambio de owner permitido", "Estado y tareas autorizados"], en: ["Classification", "Notes and summary", "Permitted owner change", "Authorized state and tasks"] },
    departments: ["customer-support", "ecommerce-operations", "administration"],
    useCases: ["customer-issue", "order-exception"],
    employeeKeys: ["customer-support", "administrative"],
    teams: ["ecommerce", "travel"],
    controls: { es: ["No cerrar casos con trabajo pendiente.", "Preservar historial y procedencia.", "No cambiar prioridad o SLA sin regla.", "Escalar reclamaciones sensibles."], en: ["Do not close cases with pending work.", "Preserve history and provenance.", "Do not change priority or SLA without policy.", "Escalate sensitive complaints."] },
    checklist: { es: [{ title: "Estados", text: "Define transiciones válidas y quién puede ejecutarlas." }, { title: "Ownership", text: "Aclara cuándo cambia el responsable y qué contexto viaja." }, { title: "SLA", text: "Usa reglas reales en lugar de prioridad inferida sin base." }, { title: "Cierre", text: "Exige evidencia de resolución o motivo de escalado." }], en: [{ title: "States", text: "Define valid transitions and who may execute them." }, { title: "Ownership", text: "Clarify when ownership changes and what context travels." }, { title: "SLA", text: "Use real rules instead of unsupported inferred priority." }, { title: "Closure", text: "Require evidence of resolution or an escalation reason." }] },
    limits: { es: ["Ticketing no sustituye CRM, ERP o ecommerce como fuente autoritativa.", "Prioridad automática necesita reglas comprobables.", "Cierre automático no debe ocultar pendientes.", "Cada plataforma tiene estados y permisos propios."], en: ["Ticketing does not replace CRM, ERP or ecommerce as an authoritative source.", "Automatic priority needs verifiable rules.", "Automatic closure should not hide pending work.", "Each platform has its own states and permissions."] },
    faq: { es: [{ question: "¿Puede asignar tickets automáticamente?", answer: "Sí cuando existe una taxonomía y reglas de routing claras. Casos ambiguos o sensibles pueden ir a revisión." }, { question: "¿Puede cerrar tickets?", answer: "Puede cerrarlos dentro de un flujo definido cuando existe evidencia suficiente y no quedan acciones pendientes; de lo contrario debe escalar o dejar el caso abierto." }], en: [{ question: "Can it assign tickets automatically?", answer: "Yes when a clear taxonomy and routing rules exist. Ambiguous or sensitive cases can go to review." }, { question: "Can it close tickets?", answer: "It can close them within a defined workflow when sufficient evidence exists and no actions remain; otherwise it should escalate or keep the case open." }] },
  },
  {
    key: "document-management",
    slugs: { es: "gestion-documental", en: "document-management" },
    name: { es: "Gestión documental", en: "Document management" },
    seoTitle: { es: "Integración de Gestión Documental para Empleados IA", en: "Document management integration for AI Employees" },
    seoDescription: { es: "Clasificación, extracción, búsqueda y preparación de documentos con Empleados IA, procedencia, permisos, retención y revisión de baja confianza.", en: "Document classification, extraction, search and preparation with AI Employees, provenance, permissions, retention and low-confidence review." },
    eyebrow: { es: "INTEGRACIÓN · GESTIÓN DOCUMENTAL", en: "INTEGRATION · DOCUMENT MANAGEMENT" },
    heroTitle: { es: "Documentos útiles para automatizar solo cuando conservan origen, permisos y versión.", en: "Documents are useful for automation only when origin, permissions and version are preserved." },
    heroDescription: { es: "Una integración documental puede localizar, clasificar, extraer y preparar información, pero debe mantener procedencia, versión, control de acceso y retención para que un dato extraído no se convierta en verdad sin contexto.", en: "A document integration can locate, classify, extract and prepare information, but it should preserve provenance, version, access control and retention so extracted data does not become truth without context." },
    shortAnswer: { es: "La gestión documental es clave para Administración y Facturación, siempre que baja confianza, documentos sensibles y versiones contradictorias tengan un camino de revisión.", en: "Document management is key for Administration and Billing as long as low confidence, sensitive documents and conflicting versions have a review path." },
    purpose: { es: ["Localizar documentos autorizados.", "Clasificar y extraer campos.", "Comprobar completitud.", "Preparar datos para otros sistemas."], en: ["Locate authorized documents.", "Classify and extract fields.", "Check completeness.", "Prepare data for other systems."] },
    reads: { es: ["Contenido permitido", "Metadatos y versión", "Propietario/procedencia", "Clasificación y permisos"], en: ["Permitted content", "Metadata and version", "Owner/provenance", "Classification and permissions"] },
    writes: { es: ["Metadatos permitidos", "Clasificación", "Borradores o derivados", "Estado de revisión"], en: ["Permitted metadata", "Classification", "Drafts or derivatives", "Review state"] },
    departments: ["administration", "accounting-billing", "travel-reservations", "sales"],
    useCases: ["administrative-documentation", "invoice-validation", "travel-booking"],
    employeeKeys: ["administrative", "accounting-billing", "sales-sdr"],
    teams: ["administration", "travel", "sales"],
    controls: { es: ["Mantener procedencia y versión.", "Revisar extracciones de baja confianza.", "Respetar clasificación y retención.", "No propagar datos sensibles más allá del rol necesario."], en: ["Preserve provenance and version.", "Review low-confidence extraction.", "Respect classification and retention.", "Do not propagate sensitive data beyond the role that needs it."] },
    checklist: { es: [{ title: "Fuentes", text: "Define repositorios, carpetas y tipos documentales dentro del alcance." }, { title: "Versiones", text: "Establece cómo se resuelve documento vigente frente a copias anteriores." }, { title: "Confianza", text: "Marca umbrales para extracción automática y revisión." }, { title: "Retención", text: "Alinea derivados y logs con la política documental." }], en: [{ title: "Sources", text: "Define repositories, folders and document types in scope." }, { title: "Versions", text: "Establish how the current document is resolved versus older copies." }, { title: "Confidence", text: "Set thresholds for automatic extraction and review." }, { title: "Retention", text: "Align derivatives and logs with document policy." }] },
    limits: { es: ["OCR y extracción no son infalibles.", "No todos los formatos o repositorios son equivalentes.", "Una copia encontrada no siempre es la versión vigente.", "El acceso documental debe seguir permisos empresariales."], en: ["OCR and extraction are not infallible.", "Not all formats or repositories are equivalent.", "A found copy is not always the current version.", "Document access should follow enterprise permissions."] },
    faq: { es: [{ question: "¿Puede usar OCR?", answer: "Sí cuando el flujo lo necesita. La confianza de extracción debe quedar visible y los campos inciertos deben revisarse antes de convertirse en datos autoritativos." }, { question: "¿Puede acceder a todos los documentos?", answer: "No. El acceso debe respetar permisos, clasificación y necesidad del rol, igual que para una persona o aplicación empresarial." }], en: [{ question: "Can it use OCR?", answer: "Yes when the workflow needs it. Extraction confidence should remain visible and uncertain fields should be reviewed before becoming authoritative data." }, { question: "Can it access every document?", answer: "No. Access should respect permissions, classification and role need, just as it would for a person or business application." }] },
  },
];

export function departmentIndexPath(locale: Locale) {
  return locale === "es" ? "/departamentos" : "/en/departments";
}

export function departmentDetailPath(key: DepartmentKey, locale: Locale) {
  const record = departmentRecords.find((item) => item.key === key);
  if (!record) throw new Error(`Unknown department key: ${key}`);
  return `${departmentIndexPath(locale)}/${record.slugs[locale]}`;
}

export function getDepartmentBySlug(locale: Locale, slug: string) {
  return departmentRecords.find((record) => record.slugs[locale] === slug);
}

export function integrationIndexPath(locale: Locale) {
  return locale === "es" ? "/integraciones" : "/en/integrations";
}

export function integrationDetailPath(key: IntegrationKey, locale: Locale) {
  const record = integrationRecords.find((item) => item.key === key);
  if (!record) throw new Error(`Unknown integration key: ${key}`);
  return `${integrationIndexPath(locale)}/${record.slugs[locale]}`;
}

export function getIntegrationBySlug(locale: Locale, slug: string) {
  return integrationRecords.find((record) => record.slugs[locale] === slug);
}

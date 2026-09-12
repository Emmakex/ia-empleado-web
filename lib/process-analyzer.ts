import { getDiscoveryProfiles, type DiscoveryProfileKey } from "./employee-discovery";
import type { Locale } from "./i18n";

export type ProcessTemplateKey = "customer-issue" | "invoice-control" | "sales-follow-up" | "order-exception";
export type ProcessStepMode = "automated" | "assisted" | "human";
export type ProcessPainKey = "manual-copying" | "waiting" | "lost-context" | "rework" | "exceptions";

type LocalizedText = Record<Locale, string>;

type ProcessStep = {
  id: string;
  painKeys: ProcessPainKey[];
  mode: ProcessStepMode;
  employeeKeys: DiscoveryProfileKey[];
  systems: string[];
  locales: Record<Locale, {
    currentTitle: string;
    currentText: string;
    currentOwner: string;
    proposedTitle: string;
    proposedText: string;
    humanControl: string;
  }>;
};

type ProcessTemplate = {
  key: ProcessTemplateKey;
  locales: Record<Locale, {
    label: string;
    description: string;
    trigger: string;
    outcome: string;
  }>;
  steps: ProcessStep[];
};

export type ProcessEmployeeView = {
  key: DiscoveryProfileKey;
  name: string;
  shortName: string;
  status: "reference" | "catalog" | "restricted";
  href: string | null;
};

export type ProcessStepView = {
  id: string;
  painKeys: ProcessPainKey[];
  mode: ProcessStepMode;
  systems: string[];
  currentTitle: string;
  currentText: string;
  currentOwner: string;
  proposedTitle: string;
  proposedText: string;
  humanControl: string;
  employees: ProcessEmployeeView[];
};

export type ProcessTemplateView = {
  key: ProcessTemplateKey;
  label: string;
  description: string;
  trigger: string;
  outcome: string;
  steps: ProcessStepView[];
  employees: ProcessEmployeeView[];
  systems: string[];
};

export type ProcessAnalyzerPageContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroNote: string;
  analyzerEyebrow: string;
  analyzerTitle: string;
  analyzerDescription: string;
  processLabel: string;
  processHelp: string;
  painLabel: string;
  painHelp: string;
  currentTitle: string;
  currentIntro: string;
  markBottleneck: string;
  bottleneckMarked: string;
  proposedTitle: string;
  proposedIntro: string;
  automatedLabel: string;
  assistedLabel: string;
  humanLabel: string;
  controlLabel: string;
  employeesLabel: string;
  systemsLabel: string;
  summaryLabel: string;
  selectedBottlenecksLabel: string;
  noBottlenecksLabel: string;
  emailLabel: string;
  resetLabel: string;
  privacyNote: string;
  methodologyEyebrow: string;
  methodologyTitle: string;
  methodologyIntro: string;
  methodologyItems: Array<{ title: string; text: string }>;
  staticEyebrow: string;
  staticTitle: string;
  staticIntro: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const painLabels: Record<ProcessPainKey, LocalizedText> = {
  "manual-copying": { es: "Copiar datos entre sistemas", en: "Copying data between systems" },
  waiting: { es: "Esperas entre responsables", en: "Waiting between owners" },
  "lost-context": { es: "Pérdida de contexto", en: "Context loss" },
  rework: { es: "Repetición y retrabajo", en: "Repetition and rework" },
  exceptions: { es: "Excepciones difíciles de gestionar", en: "Hard-to-handle exceptions" },
};

const pageContent: Record<Locale, ProcessAnalyzerPageContent> = {
  es: {
    seoTitle: "Mejora tu proceso con Empleados IA | IA Empleado",
    seoDescription: "Compara un proceso empresarial actual con una propuesta coordinada de Empleados IA, sistemas y control humano mediante un analizador interactivo y explicable.",
    eyebrow: "PROCESS ANALYZER · IA EMPLEADO",
    heroTitle: "Mira tu proceso antes y después de coordinarlo con Empleados IA.",
    heroDescription: "Elige un flujo de referencia, marca dónde se pierde tiempo o contexto y compara el trabajo actual con una propuesta orientativa que separa automatización, asistencia y decisiones humanas.",
    heroNote: "Herramienta educativa con patrones predefinidos. No analiza sistemas reales, no ejecuta acciones y no sustituye un discovery técnico del proceso.",
    analyzerEyebrow: "ANTES → DESPUÉS",
    analyzerTitle: "Detecta dónde conviene automatizar, asistir o mantener control humano",
    analyzerDescription: "La propuesta no intenta automatizar todo. Cada paso conserva una clasificación visible y explica qué rol, sistema y punto de control intervienen.",
    processLabel: "1. Proceso que quieres revisar",
    processHelp: "Empieza con el patrón que más se parezca a tu operación actual.",
    painLabel: "2. Cuellos de botella generales",
    painHelp: "Selecciona los problemas que hoy aparecen con más frecuencia. También puedes marcar pasos concretos en el flujo actual.",
    currentTitle: "Cómo suele funcionar hoy",
    currentIntro: "Marca cualquier paso que en tu empresa genere esperas, errores, retrabajo o pérdida de contexto.",
    markBottleneck: "Marcar cuello de botella",
    bottleneckMarked: "Cuello de botella marcado",
    proposedTitle: "Cómo podría reorganizarse",
    proposedIntro: "Propuesta orientativa basada en responsabilidades acotadas, handoffs explícitos y aprobación humana cuando el impacto lo exige.",
    automatedLabel: "Automatizable con reglas",
    assistedLabel: "IA prepara / persona o política valida",
    humanLabel: "Responsabilidad humana",
    controlLabel: "Control",
    employeesLabel: "Empleados IA implicados",
    systemsLabel: "Sistemas a evaluar",
    summaryLabel: "Lectura rápida del rediseño",
    selectedBottlenecksLabel: "cuellos de botella señalados",
    noBottlenecksLabel: "No has marcado pasos concretos; la propuesta usa el patrón de referencia completo.",
    emailLabel: "Hablar sobre este proceso",
    resetLabel: "Limpiar marcas",
    privacyNote: "Todo el análisis ocurre localmente en tu navegador. La web no guarda las marcas del proceso. El CTA abre tu cliente de correo con un resumen si decides compartirlo.",
    methodologyEyebrow: "METODOLOGÍA",
    methodologyTitle: "No todo paso repetitivo debe convertirse en una acción autónoma",
    methodologyIntro: "El analizador separa ejecución repetitiva, preparación asistida y responsabilidad humana para evitar que una mejora de velocidad elimine controles necesarios.",
    methodologyItems: [
      { title: "Automatizable con reglas", text: "Trabajo repetitivo y verificable que puede ejecutarse dentro de permisos, fuentes y condiciones explícitas." },
      { title: "Asistido", text: "La IA recopila contexto, valida datos o prepara una acción, pero una política determinista o una persona confirma el paso relevante." },
      { title: "Humano", text: "Negociación, criterio sensible, excepciones de alto impacto o autoridad reservada permanecen bajo responsabilidad de personas." },
      { title: "Handoff trazable", text: "Cuando cambia el responsable también queda claro qué contexto viaja, qué resultado se espera y qué sistema actúa como fuente." },
    ],
    staticEyebrow: "PATRONES EXPLICADOS",
    staticTitle: "Cuatro procesos de referencia, también en HTML rastreable",
    staticIntro: "La interacción ayuda a comparar. El contenido siguiente describe los mismos procesos de forma semántica para accesibilidad, SEO y motores generativos.",
    faqTitle: "Preguntas frecuentes sobre el Process Analyzer",
    faq: [
      { question: "¿El analizador estudia mi proceso real automáticamente?", answer: "No. Esta primera versión trabaja con patrones empresariales predefinidos. Sirve para explorar una arquitectura posible antes de hacer un discovery técnico con datos, excepciones y sistemas reales." },
      { question: "¿Por qué algunos pasos siguen siendo humanos?", answer: "Porque capacidad técnica y autoridad empresarial no son lo mismo. Decisiones sensibles, negociación, excepciones o acciones por encima de determinados umbrales pueden mantenerse bajo control humano." },
      { question: "¿Marcar un sistema significa que ya existe un conector?", answer: "No. Los sistemas muestran dependencias del proceso. La integración real debe validarse después según proveedor, API, permisos, datos y arquitectura." },
      { question: "¿Se guardan los cuellos de botella que marco?", answer: "No en esta versión. El estado se mantiene localmente durante la sesión. Solo se comparte un resumen si eliges abrir y enviar el correo preparado." },
    ],
  },
  en: {
    seoTitle: "Improve your process with AI Employees | IA Empleado",
    seoDescription: "Compare a current business workflow with an explainable proposal coordinated by AI Employees, systems and human control.",
    eyebrow: "PROCESS ANALYZER · IA EMPLEADO",
    heroTitle: "See your process before and after coordinating it with AI Employees.",
    heroDescription: "Choose a reference workflow, mark where time or context is lost and compare current work with an indicative proposal that separates automation, assistance and human decisions.",
    heroNote: "Educational tool based on predefined patterns. It does not inspect real systems, execute actions or replace technical process discovery.",
    analyzerEyebrow: "BEFORE → AFTER",
    analyzerTitle: "Find where to automate, assist or keep human control",
    analyzerDescription: "The proposal does not try to automate everything. Every step keeps a visible classification and explains which role, system and control point is involved.",
    processLabel: "1. Process you want to review",
    processHelp: "Start with the pattern closest to your current operation.",
    painLabel: "2. General bottlenecks",
    painHelp: "Select the problems that appear most often today. You can also mark specific steps in the current flow.",
    currentTitle: "How it often works today",
    currentIntro: "Mark any step that creates waiting, errors, rework or context loss in your organization.",
    markBottleneck: "Mark bottleneck",
    bottleneckMarked: "Bottleneck marked",
    proposedTitle: "How it could be reorganized",
    proposedIntro: "Indicative proposal based on bounded responsibilities, explicit handoffs and human approval when impact requires it.",
    automatedLabel: "Rule-based automation candidate",
    assistedLabel: "AI prepares / person or policy validates",
    humanLabel: "Human responsibility",
    controlLabel: "Control",
    employeesLabel: "AI Employees involved",
    systemsLabel: "Systems to evaluate",
    summaryLabel: "Quick redesign summary",
    selectedBottlenecksLabel: "bottlenecks marked",
    noBottlenecksLabel: "You have not marked specific steps; the proposal uses the full reference pattern.",
    emailLabel: "Discuss this process",
    resetLabel: "Clear marks",
    privacyNote: "The analysis runs locally in your browser. The website does not store your process marks. The CTA opens your email client with a summary if you choose to share it.",
    methodologyEyebrow: "METHOD",
    methodologyTitle: "Not every repetitive step should become an autonomous action",
    methodologyIntro: "The analyzer separates repetitive execution, assisted preparation and human responsibility so that improving speed does not remove necessary controls.",
    methodologyItems: [
      { title: "Rule-based automation", text: "Repetitive, verifiable work that can execute inside explicit permissions, sources and conditions." },
      { title: "Assisted", text: "AI gathers context, validates data or prepares an action while deterministic policy or a person confirms the consequential step." },
      { title: "Human", text: "Negotiation, sensitive judgment, high-impact exceptions or reserved authority remain under human responsibility." },
      { title: "Traceable handoff", text: "When ownership changes, the allowed context, expected result and authoritative system should be explicit." },
    ],
    staticEyebrow: "EXPLAINED PATTERNS",
    staticTitle: "Four reference processes, also rendered as crawlable HTML",
    staticIntro: "Interaction helps comparison. The content below explains the same processes semantically for accessibility, SEO and generative engines.",
    faqTitle: "Process Analyzer frequently asked questions",
    faq: [
      { question: "Does the analyzer automatically study my real process?", answer: "No. This first version uses predefined business patterns. It helps explore a possible architecture before technical discovery with real data, exceptions and systems." },
      { question: "Why do some steps remain human?", answer: "Technical capability and business authority are different. Sensitive decisions, negotiation, exceptions or actions above defined thresholds can remain under human control." },
      { question: "Does a listed system mean a connector already exists?", answer: "No. Systems represent process dependencies. Real integration must be validated against provider, API, permissions, data and architecture." },
      { question: "Are the bottlenecks I mark stored?", answer: "Not in this version. State remains local during the session. A summary is only shared if you choose to open and send the prepared email." },
    ],
  },
};

const processTemplates: ProcessTemplate[] = [
  {
    key: "customer-issue",
    locales: {
      es: { label: "Incidencia de cliente", description: "Una consulta entra por soporte y termina implicando pedido, factura o una excepción que puede necesitar aprobación.", trigger: "El cliente comunica un problema por email o chat.", outcome: "Respuesta final con el caso actualizado y las decisiones relevantes trazadas." },
      en: { label: "Customer issue", description: "A support request arrives and ends up involving an order, invoice or exception that may need approval.", trigger: "A customer reports a problem by email or chat.", outcome: "Final response with the case updated and consequential decisions traceable." },
    },
    steps: [
      { id: "receive", painKeys: ["rework", "waiting"], mode: "automated", employeeKeys: ["customer-support"], systems: ["Email", "Ticketing"], locales: {
        es: { currentTitle: "Recibir y clasificar", currentText: "Una persona abre el mensaje, interpreta el motivo y crea o localiza el caso.", currentOwner: "Equipo de soporte", proposedTitle: "Clasificar y abrir contexto", proposedText: "Atención al Cliente IA identifica intención y relaciona la solicitud con el caso correcto usando fuentes autorizadas.", humanControl: "Escalar si no puede identificar de forma fiable al cliente o la solicitud." },
        en: { currentTitle: "Receive and classify", currentText: "A person opens the message, interprets the reason and creates or finds the case.", currentOwner: "Support team", proposedTitle: "Classify and open context", proposedText: "Customer Support AI identifies intent and links the request to the correct case using approved sources.", humanControl: "Escalate when customer or request identity cannot be established reliably." },
      } },
      { id: "lookup", painKeys: ["manual-copying", "lost-context"], mode: "automated", employeeKeys: ["customer-support", "order-management"], systems: ["CRM", "Ecommerce", "ERP"], locales: {
        es: { currentTitle: "Buscar cliente y pedido", currentText: "El agente salta entre CRM, ecommerce y ERP y copia datos al ticket.", currentOwner: "Soporte", proposedTitle: "Consultar fuentes autorizadas", proposedText: "El contexto necesario se recupera desde los sistemas permitidos y se asocia al caso sin copiar información manualmente entre pantallas.", humanControl: "No afirmar estados que ninguna fuente autorizada confirme." },
        en: { currentTitle: "Find customer and order", currentText: "The agent jumps between CRM, ecommerce and ERP and copies data into the ticket.", currentOwner: "Support", proposedTitle: "Query approved sources", proposedText: "Required context is retrieved from permitted systems and attached to the case without manual copy-paste between screens.", humanControl: "Do not assert a status that no authoritative source confirms." },
      } },
      { id: "investigate", painKeys: ["waiting", "lost-context", "exceptions"], mode: "assisted", employeeKeys: ["customer-support", "accounting-billing", "order-management"], systems: ["ERP", "Billing", "Order management"], locales: {
        es: { currentTitle: "Pedir revisión a otro departamento", currentText: "Soporte reenvía información a facturación u operaciones y espera respuesta, a menudo sin un formato común.", currentOwner: "Soporte + Back office", proposedTitle: "Handoff estructurado al especialista", proposedText: "El caso pasa al rol especializado con el contexto mínimo necesario y un resultado esperado explícito.", humanControl: "La política define qué datos pueden viajar entre roles y qué excepción exige revisión humana." },
        en: { currentTitle: "Ask another department to review", currentText: "Support forwards information to billing or operations and waits, often without a shared structure.", currentOwner: "Support + Back office", proposedTitle: "Structured handoff to the specialist", proposedText: "The case moves to the specialist role with the minimum required context and an explicit expected result.", humanControl: "Policy defines what data may travel between roles and which exception requires human review." },
      } },
      { id: "approve", painKeys: ["waiting", "exceptions"], mode: "human", employeeKeys: ["accounting-billing"], systems: ["Billing", "ERP"], locales: {
        es: { currentTitle: "Decidir compensación o cancelación", currentText: "Una persona revisa condiciones, importe y excepción antes de autorizar una acción relevante.", currentOwner: "Responsable humano", proposedTitle: "Mantener la autoridad humana", proposedText: "La IA prepara evidencia y propuesta, pero compensaciones, cancelaciones fuera de regla o importes sensibles permanecen bajo aprobación humana.", humanControl: "La persona conserva la decisión y el sistema registra la aprobación antes de ejecutar." },
        en: { currentTitle: "Decide compensation or cancellation", currentText: "A person reviews terms, amount and exception before authorizing a consequential action.", currentOwner: "Human owner", proposedTitle: "Keep human authority", proposedText: "AI prepares evidence and a proposal, while compensation, out-of-policy cancellation or sensitive amounts remain under human approval.", humanControl: "A person retains the decision and the system records approval before execution." },
      } },
      { id: "close", painKeys: ["rework", "lost-context"], mode: "automated", employeeKeys: ["customer-support"], systems: ["Ticketing", "Email", "CRM"], locales: {
        es: { currentTitle: "Responder y cerrar", currentText: "Soporte reconstruye la historia, redacta la respuesta y actualiza varios registros.", currentOwner: "Soporte", proposedTitle: "Comunicar resultado y registrar", proposedText: "Atención al Cliente IA recupera el resultado aprobado, prepara la respuesta y actualiza el historial permitido para cerrar el caso.", humanControl: "Mensajes sensibles o ambiguos pueden reservarse a revisión antes del envío." },
        en: { currentTitle: "Reply and close", currentText: "Support reconstructs the story, writes the reply and updates several records.", currentOwner: "Support", proposedTitle: "Communicate outcome and record", proposedText: "Customer Support AI retrieves the approved outcome, prepares the response and updates permitted history to close the case.", humanControl: "Sensitive or ambiguous messages can remain subject to review before sending." },
      } },
    ],
  },
  {
    key: "invoice-control",
    locales: {
      es: { label: "Recepción y validación de factura", description: "Una factura llega por correo o documento, se extraen datos, se valida y se prepara para contabilización o excepción.", trigger: "Llega una factura de proveedor o documento de cobro.", outcome: "Factura preparada, validada o escalada con evidencia y trazabilidad." },
      en: { label: "Invoice intake and validation", description: "An invoice arrives by email or document, data is extracted, validated and prepared for posting or exception handling.", trigger: "A supplier invoice or billing document arrives.", outcome: "Invoice prepared, validated or escalated with evidence and traceability." },
    },
    steps: [
      { id: "intake", painKeys: ["rework", "manual-copying"], mode: "automated", employeeKeys: ["administrative", "accounting-billing"], systems: ["Email", "Documents"], locales: {
        es: { currentTitle: "Recoger factura", currentText: "Una persona descarga adjuntos, renombra archivos y decide dónde guardarlos.", currentOwner: "Administración", proposedTitle: "Ingesta y clasificación", proposedText: "Administrativo IA identifica el documento, conserva origen y lo entrega al flujo contable con metadatos básicos.", humanControl: "Documentos ilegibles o de origen incierto se separan para revisión." },
        en: { currentTitle: "Collect invoice", currentText: "A person downloads attachments, renames files and decides where to store them.", currentOwner: "Administration", proposedTitle: "Ingest and classify", proposedText: "Administrative AI identifies the document, preserves its source and hands it to the accounting flow with basic metadata.", humanControl: "Unreadable or uncertain-origin documents are separated for review." },
      } },
      { id: "extract", painKeys: ["manual-copying", "rework"], mode: "automated", employeeKeys: ["administrative", "accounting-billing"], systems: ["OCR", "ERP"], locales: {
        es: { currentTitle: "Teclear datos", currentText: "Proveedor, fecha, base, impuesto y total se copian manualmente al sistema.", currentOwner: "Administración / Contabilidad", proposedTitle: "Extraer y normalizar", proposedText: "Se extraen campos y se preparan en formato estructurado para validación antes de cualquier registro definitivo.", humanControl: "Valores con baja confianza o campos obligatorios ausentes requieren comprobación." },
        en: { currentTitle: "Type data", currentText: "Supplier, date, net amount, tax and total are manually copied into the system.", currentOwner: "Administration / Accounting", proposedTitle: "Extract and normalize", proposedText: "Fields are extracted and prepared in structured form for validation before any final posting.", humanControl: "Low-confidence values or missing mandatory fields require verification." },
      } },
      { id: "validate", painKeys: ["exceptions", "rework"], mode: "assisted", employeeKeys: ["accounting-billing"], systems: ["ERP", "Purchase records"], locales: {
        es: { currentTitle: "Comprobar factura", currentText: "Se revisan duplicados, totales, proveedor, vencimiento y relación con pedido o servicio.", currentOwner: "Contabilidad", proposedTitle: "Aplicar controles deterministas", proposedText: "Contabilidad y Facturación IA cruza reglas, duplicados y referencias y separa automáticamente casos limpios de excepciones.", humanControl: "La ausencia de referencia, discrepancias o reglas fiscales específicas pueden requerir revisión profesional." },
        en: { currentTitle: "Check invoice", currentText: "Duplicates, totals, supplier, due date and purchase or service reference are reviewed.", currentOwner: "Accounting", proposedTitle: "Apply deterministic controls", proposedText: "Accounting & Billing AI checks rules, duplicates and references and separates clean cases from exceptions.", humanControl: "Missing references, discrepancies or specific tax rules may require professional review." },
      } },
      { id: "exception", painKeys: ["waiting", "exceptions", "lost-context"], mode: "human", employeeKeys: ["accounting-billing"], systems: ["ERP", "Documents"], locales: {
        es: { currentTitle: "Resolver discrepancia", currentText: "Una persona contacta con proveedor o responsable interno y decide el tratamiento de la excepción.", currentOwner: "Contabilidad / Responsable", proposedTitle: "Conservar decisión profesional", proposedText: "La IA presenta la discrepancia, evidencia y contexto; una persona resuelve la excepción que implica criterio contable, fiscal o autorización.", humanControl: "La persona decide el tratamiento y documenta la excepción antes de continuar." },
        en: { currentTitle: "Resolve discrepancy", currentText: "A person contacts the supplier or internal owner and decides how the exception should be handled.", currentOwner: "Accounting / Owner", proposedTitle: "Keep professional decision-making", proposedText: "AI presents the discrepancy, evidence and context; a person resolves exceptions involving accounting, tax or authorization judgment.", humanControl: "A person decides the treatment and records the exception before proceeding." },
      } },
      { id: "record", painKeys: ["manual-copying", "rework"], mode: "assisted", employeeKeys: ["accounting-billing", "reporting"], systems: ["ERP", "Reporting / BI"], locales: {
        es: { currentTitle: "Registrar y reportar", currentText: "Tras la revisión, se actualiza ERP y después se replica información en controles o reporting.", currentOwner: "Contabilidad", proposedTitle: "Preparar registro y trazabilidad", proposedText: "El sistema recibe el estado validado y Reporting IA puede reutilizar la información confirmada sin crear una segunda fuente manual.", humanControl: "El permiso de contabilización o pago se configura por separado y puede requerir aprobación." },
        en: { currentTitle: "Record and report", currentText: "After review, ERP is updated and information is then replicated into controls or reporting.", currentOwner: "Accounting", proposedTitle: "Prepare posting and traceability", proposedText: "The system receives validated status and Reporting AI can reuse confirmed information without creating a second manual source.", humanControl: "Posting or payment permission is configured separately and may require approval." },
      } },
    ],
  },
  {
    key: "sales-follow-up",
    locales: {
      es: { label: "Lead comercial y seguimiento", description: "Una señal comercial entra, se investiga, se registra, se prepara seguimiento y una persona toma el control cuando empieza la negociación.", trigger: "Entra un lead, respuesta de campaña o cuenta a investigar.", outcome: "Oportunidad contextualizada, CRM actualizado y siguiente acción clara." },
      en: { label: "Sales lead and follow-up", description: "A commercial signal arrives, is researched, recorded and followed up until a person takes control when negotiation starts.", trigger: "A lead, campaign response or account to research arrives.", outcome: "Contextualized opportunity, updated CRM and a clear next action." },
    },
    steps: [
      { id: "capture", painKeys: ["manual-copying", "rework"], mode: "automated", employeeKeys: ["marketing-operations", "sales-sdr"], systems: ["Forms", "CRM", "Marketing automation"], locales: {
        es: { currentTitle: "Capturar señal", currentText: "El lead llega por una fuente y alguien crea o completa manualmente el registro en CRM.", currentOwner: "Marketing / Ventas", proposedTitle: "Registrar procedencia y contexto", proposedText: "La señal se normaliza y conserva su fuente antes de pasar al proceso comercial.", humanControl: "No enriquecer ni contactar usando fuentes o bases no aprobadas." },
        en: { currentTitle: "Capture signal", currentText: "The lead arrives from a source and someone manually creates or completes the CRM record.", currentOwner: "Marketing / Sales", proposedTitle: "Record source and context", proposedText: "The signal is normalized and its source preserved before entering the sales process.", humanControl: "Do not enrich or contact using unapproved sources or datasets." },
      } },
      { id: "research", painKeys: ["waiting", "lost-context"], mode: "assisted", employeeKeys: ["sales-sdr"], systems: ["CRM", "Approved research sources"], locales: {
        es: { currentTitle: "Investigar cuenta", currentText: "El comercial busca información dispersa y decide qué datos copiar al CRM.", currentOwner: "Comercial", proposedTitle: "Preparar research trazable", proposedText: "Comercial SDR IA reúne contexto permitido, señala la fuente y prepara un resumen para decidir el siguiente paso.", humanControl: "La calidad del research se valida cuando influye en priorización o mensaje sensible." },
        en: { currentTitle: "Research account", currentText: "The seller searches scattered information and decides which details to copy into CRM.", currentOwner: "Sales", proposedTitle: "Prepare traceable research", proposedText: "Sales SDR AI gathers permitted context, preserves source and prepares a summary for the next-step decision.", humanControl: "Research quality is reviewed when it affects prioritization or sensitive messaging." },
      } },
      { id: "outreach", painKeys: ["rework", "waiting"], mode: "assisted", employeeKeys: ["sales-sdr", "email-manager"], systems: ["Email", "CRM"], locales: {
        es: { currentTitle: "Preparar seguimiento", currentText: "Se redacta un correo, se comprueba contexto y se programa seguimiento en herramientas separadas.", currentOwner: "Comercial", proposedTitle: "Preparar contacto y siguiente acción", proposedText: "El SDR prepara mensaje y CRM; Gestor de Correo relaciona la respuesta con la oportunidad correcta y mantiene continuidad.", humanControl: "Consentimiento, marca y política comercial determinan qué mensajes pueden enviarse automáticamente." },
        en: { currentTitle: "Prepare follow-up", currentText: "An email is written, context checked and follow-up scheduled across separate tools.", currentOwner: "Sales", proposedTitle: "Prepare contact and next action", proposedText: "The SDR prepares messaging and CRM; Email Manager links the reply to the correct opportunity and maintains continuity.", humanControl: "Consent, brand and commercial policy determine which messages may be sent automatically." },
      } },
      { id: "meeting", painKeys: ["lost-context", "waiting"], mode: "automated", employeeKeys: ["sales-sdr", "email-manager"], systems: ["Calendar", "CRM", "Email"], locales: {
        es: { currentTitle: "Coordinar reunión", currentText: "La disponibilidad se negocia por correo y luego se actualizan agenda y CRM.", currentOwner: "Comercial / Prospecto", proposedTitle: "Coordinar agenda y contexto", proposedText: "Cuando la intención está clara, se coordinan horarios permitidos y se adjunta contexto de la oportunidad a la siguiente etapa.", humanControl: "La persona puede reservarse la confirmación en cuentas estratégicas o situaciones ambiguas." },
        en: { currentTitle: "Coordinate meeting", currentText: "Availability is negotiated by email and calendar and CRM are updated afterwards.", currentOwner: "Sales / Prospect", proposedTitle: "Coordinate calendar and context", proposedText: "When intent is clear, permitted times are coordinated and opportunity context follows into the next stage.", humanControl: "A person can retain confirmation for strategic accounts or ambiguous situations." },
      } },
      { id: "negotiate", painKeys: ["exceptions"], mode: "human", employeeKeys: ["sales-sdr"], systems: ["CRM", "Commercial documents"], locales: {
        es: { currentTitle: "Negociar condiciones", currentText: "Una persona adapta propuesta, condiciones, precio y compromiso comercial.", currentOwner: "Responsable comercial", proposedTitle: "Mantener negociación humana", proposedText: "La IA prepara historial y borradores, pero negociación, descuentos, compromisos y condiciones relevantes permanecen bajo autoridad humana.", humanControl: "La persona aprueba cualquier compromiso comercial relevante antes de enviarlo." },
        en: { currentTitle: "Negotiate terms", currentText: "A person adapts proposal, terms, price and commercial commitment.", currentOwner: "Sales owner", proposedTitle: "Keep negotiation human", proposedText: "AI prepares history and drafts, while negotiation, discounts, commitments and consequential terms remain under human authority.", humanControl: "A person approves every consequential commercial commitment before it is sent." },
      } },
    ],
  },
  {
    key: "order-exception",
    locales: {
      es: { label: "Incidencia de pedido", description: "Un pedido presenta retraso, falta de stock, error de preparación o problema de entrega y cruza soporte, operaciones y logística.", trigger: "Se detecta una incidencia en preparación, stock, transporte o entrega.", outcome: "Incidencia coordinada con estado coherente, cliente informado y excepción aprobada cuando corresponde." },
      en: { label: "Order exception", description: "An order has a delay, stock issue, fulfillment error or delivery problem and crosses support, operations and logistics.", trigger: "An exception is detected in fulfillment, stock, transport or delivery.", outcome: "Coordinated exception with consistent status, informed customer and approval when required." },
    },
    steps: [
      { id: "detect", painKeys: ["waiting", "lost-context"], mode: "automated", employeeKeys: ["order-management", "ecommerce-operations"], systems: ["Ecommerce", "ERP", "Order management"], locales: {
        es: { currentTitle: "Detectar incidencia", currentText: "La incidencia aparece en una herramienta y puede tardar en llegar al equipo que debe actuar.", currentOwner: "Operaciones", proposedTitle: "Detectar y clasificar evento", proposedText: "Gestión de Pedidos IA identifica el tipo de excepción y abre el flujo con el pedido y estado correcto.", humanControl: "Eventos contradictorios o sin pedido fiable se escalan antes de actuar." },
        en: { currentTitle: "Detect exception", currentText: "The issue appears in one tool and may take time to reach the team that needs to act.", currentOwner: "Operations", proposedTitle: "Detect and classify event", proposedText: "Order Management AI identifies the exception type and starts the workflow with the correct order and state.", humanControl: "Contradictory events or uncertain order identity are escalated before action." },
      } },
      { id: "verify", painKeys: ["manual-copying", "lost-context"], mode: "automated", employeeKeys: ["order-management", "logistics-operations"], systems: ["ERP", "Warehouse", "Carrier / shipping"], locales: {
        es: { currentTitle: "Comprobar stock y transporte", currentText: "Una persona consulta varios sistemas y reconstruye qué ha ocurrido.", currentOwner: "Operaciones / Logística", proposedTitle: "Cruzar estados autorizados", proposedText: "Pedido, almacén y transporte se consultan como fuentes separadas y se resume la discrepancia sin ocultar qué sistema afirma cada estado.", humanControl: "No convertir un estado estimado en una confirmación si la fuente autoritativa no lo respalda." },
        en: { currentTitle: "Check stock and transport", currentText: "A person checks several systems and reconstructs what happened.", currentOwner: "Operations / Logistics", proposedTitle: "Cross-check approved states", proposedText: "Order, warehouse and transport are queried as separate sources and the discrepancy is summarized without hiding which system states what.", humanControl: "Do not turn an estimated state into a confirmation when the authoritative source does not support it." },
      } },
      { id: "coordinate", painKeys: ["waiting", "rework", "lost-context"], mode: "assisted", employeeKeys: ["order-management", "logistics-operations", "customer-support"], systems: ["Order management", "Ticketing", "Shipping"], locales: {
        es: { currentTitle: "Coordinar solución", currentText: "Operaciones, logística y soporte intercambian mensajes hasta acordar reexpedición, nueva fecha o siguiente acción.", currentOwner: "Operaciones + Logística + Soporte", proposedTitle: "Handoffs con objetivo explícito", proposedText: "Cada rol recibe una tarea concreta y devuelve un estado estructurado para que el siguiente responsable continúe sin reconstruir el caso.", humanControl: "Una persona interviene cuando el proveedor o transportista requiere negociación o la solución sale de política." },
        en: { currentTitle: "Coordinate solution", currentText: "Operations, logistics and support exchange messages until they agree on reshipment, a new date or another next step.", currentOwner: "Operations + Logistics + Support", proposedTitle: "Handoffs with explicit outcome", proposedText: "Each role receives a concrete task and returns structured status so the next owner can continue without rebuilding the case.", humanControl: "A person intervenes when supplier or carrier negotiation is needed or the solution is outside policy." },
      } },
      { id: "approve", painKeys: ["exceptions", "waiting"], mode: "human", employeeKeys: ["customer-support", "accounting-billing"], systems: ["ERP", "Billing"], locales: {
        es: { currentTitle: "Autorizar compensación", currentText: "Si hay devolución, descuento o compensación, un responsable revisa impacto y condiciones.", currentOwner: "Responsable humano", proposedTitle: "Aprobación visible de excepción", proposedText: "El equipo prepara contexto y opciones, pero la autoridad financiera o comercial relevante permanece reservada a una persona.", humanControl: "La aprobación queda registrada antes de ejecutar devolución, crédito o compensación fuera de umbral." },
        en: { currentTitle: "Authorize compensation", currentText: "If there is a refund, discount or compensation, an owner reviews impact and terms.", currentOwner: "Human owner", proposedTitle: "Visible exception approval", proposedText: "The team prepares context and options, while consequential financial or commercial authority remains reserved to a person.", humanControl: "Approval is recorded before refund, credit or compensation above the configured threshold." },
      } },
      { id: "notify", painKeys: ["rework", "lost-context"], mode: "automated", employeeKeys: ["customer-support", "order-management"], systems: ["Email", "Ticketing", "CRM"], locales: {
        es: { currentTitle: "Informar al cliente", currentText: "Soporte reúne las respuestas internas, explica el resultado y actualiza el caso.", currentOwner: "Soporte", proposedTitle: "Cerrar el bucle con el cliente", proposedText: "Atención al Cliente IA recibe el estado final aprobado, comunica el resultado y mantiene el historial asociado al pedido y caso.", humanControl: "Reclamaciones sensibles o comunicación de alto impacto pueden requerir revisión previa." },
        en: { currentTitle: "Inform customer", currentText: "Support gathers internal responses, explains the outcome and updates the case.", currentOwner: "Support", proposedTitle: "Close the loop with the customer", proposedText: "Customer Support AI receives the approved final state, communicates the outcome and keeps history linked to the order and case.", humanControl: "Sensitive complaints or high-impact communication can require review before sending." },
      } },
    ],
  },
];

export function processAnalyzerPath(locale: Locale) {
  return locale === "es" ? "/mejora-tu-proceso" : "/en/improve-your-process";
}

export function getProcessAnalyzerPageContent(locale: Locale) {
  return pageContent[locale];
}

export function getProcessPainOptions(locale: Locale) {
  return (Object.keys(painLabels) as ProcessPainKey[]).map((value) => ({ value, label: painLabels[value][locale] }));
}

export function getProcessAnalyzerTemplates(locale: Locale): ProcessTemplateView[] {
  const profiles = getDiscoveryProfiles(locale);
  const byKey = new Map(profiles.map((profile) => [profile.key, profile]));

  return processTemplates.map((template) => {
    const steps = template.steps.map((step) => {
      const localized = step.locales[locale];
      const employees = step.employeeKeys
        .map((key) => byKey.get(key))
        .filter((profile): profile is NonNullable<typeof profile> => Boolean(profile))
        .map((profile) => ({
          key: profile.key,
          name: profile.name,
          shortName: profile.shortName,
          status: profile.status,
          href: profile.href,
        }));
      return { ...localized, id: step.id, painKeys: step.painKeys, mode: step.mode, systems: step.systems, employees };
    });

    const employeeMap = new Map<DiscoveryProfileKey, ProcessEmployeeView>();
    const systems = new Set<string>();
    for (const step of steps) {
      step.employees.forEach((employee) => employeeMap.set(employee.key, employee));
      step.systems.forEach((system) => systems.add(system));
    }

    return {
      key: template.key,
      ...template.locales[locale],
      steps,
      employees: [...employeeMap.values()],
      systems: [...systems],
    };
  });
}

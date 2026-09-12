import type { Locale } from "./i18n";

export type CollaborationStepKind = "event" | "employee" | "system" | "human" | "result";

export type CollaborationStep = {
  kind: CollaborationStepKind;
  actor: string;
  title: string;
  description: string;
  handoff: string;
};

export type CollaborationScenario = {
  key: string;
  label: string;
  title: string;
  summary: string;
  trigger: string;
  outcome: string;
  steps: CollaborationStep[];
};

export type CollaborationPageContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroNote: string;
  simulatorEyebrow: string;
  simulatorTitle: string;
  simulatorDescription: string;
  scenarioLabel: string;
  stepLabel: string;
  previousLabel: string;
  nextLabel: string;
  playLabel: string;
  pauseLabel: string;
  resetLabel: string;
  progressLabel: string;
  handoffLabel: string;
  triggerLabel: string;
  outcomeLabel: string;
  principlesEyebrow: string;
  principlesTitle: string;
  principles: Array<{ title: string; text: string }>;
  crawlableEyebrow: string;
  crawlableTitle: string;
  crawlableDescription: string;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
  disclaimer: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

const scenarioRecords: Array<{ key: string; locales: Record<Locale, Omit<CollaborationScenario, "key">> }> = [
  {
    key: "invoice-cancellation",
    locales: {
      es: {
        label: "Factura incorrecta + cancelación",
        title: "Un cliente detecta una factura incorrecta y quiere cancelar el pedido",
        summary: "El caso cruza soporte, sistemas de pedido, facturación, administración y una aprobación humana antes de cerrar la conversación.",
        trigger: "Email del cliente: la factura no coincide con el pedido y solicita cancelación.",
        outcome: "Datos corregidos, decisión registrada y respuesta final con trazabilidad del proceso.",
        steps: [
          { kind: "event", actor: "Cliente", title: "Entra una solicitud con dos problemas", description: "La petición contiene una incidencia de facturación y una solicitud de cancelación. El sistema conserva el mensaje original como contexto de entrada.", handoff: "Entrega la solicitud a Atención al Cliente IA." },
          { kind: "employee", actor: "Atención al Cliente IA", title: "Clasifica, identifica y reúne contexto", description: "Detecta ambas intenciones, verifica la identidad disponible y localiza el pedido antes de responder o modificar datos.", handoff: "Solicita estado real a CRM y gestión de pedidos." },
          { kind: "system", actor: "CRM + pedidos", title: "Devuelve cliente, pedido y estado", description: "Las fuentes autorizadas aportan datos verificables. La discrepancia de factura queda confirmada y el pedido todavía admite una ruta de cancelación condicionada.", handoff: "La discrepancia pasa a Contabilidad y Facturación IA." },
          { kind: "employee", actor: "Contabilidad y Facturación IA", title: "Revisa la factura y prepara la corrección", description: "Compara los datos disponibles, identifica el campo inconsistente y prepara el cambio sin asumir autoridad financiera ilimitada.", handoff: "Pide a Administrativo IA corregir el registro operativo relacionado." },
          { kind: "employee", actor: "Administrativo IA", title: "Actualiza el registro dentro de política", description: "Corrige los datos administrativos autorizados y deja el expediente listo para que la política de cancelación evalúe el siguiente paso.", handoff: "La solicitud llega al punto de control humano definido para la cancelación." },
          { kind: "human", actor: "Responsable humano", title: "Aprueba la excepción relevante", description: "La persona revisa el contexto resumido, la política aplicable y el impacto económico antes de aprobar o rechazar la cancelación.", handoff: "Devuelve una decisión explícita a Atención al Cliente IA." },
          { kind: "result", actor: "Atención al Cliente + Reporting", title: "Comunica y registra el resultado", description: "El cliente recibe una respuesta coherente con la decisión. El recorrido queda registrado para seguimiento, métricas y auditoría.", handoff: "Proceso finalizado con historial trazable." },
        ],
      },
      en: {
        label: "Wrong invoice + cancellation",
        title: "A customer finds an incorrect invoice and wants to cancel the order",
        summary: "The case crosses support, order systems, billing, administration and a human approval point before the conversation closes.",
        trigger: "Customer email: the invoice does not match the order and cancellation is requested.",
        outcome: "Corrected data, recorded decision and a final response with process traceability.",
        steps: [
          { kind: "event", actor: "Customer", title: "One request arrives with two problems", description: "The request contains a billing issue and a cancellation request. The original message remains available as the input context.", handoff: "The request is handed to Customer Support AI." },
          { kind: "employee", actor: "Customer Support AI", title: "Classify, identify and gather context", description: "It detects both intents, verifies the available identity context and finds the order before answering or changing data.", handoff: "It requests verified status from CRM and order management." },
          { kind: "system", actor: "CRM + orders", title: "Return customer, order and status", description: "Approved sources provide verifiable data. The invoice discrepancy is confirmed and the order still has a conditional cancellation path.", handoff: "The discrepancy is handed to Accounting & Billing AI." },
          { kind: "employee", actor: "Accounting & Billing AI", title: "Review the invoice and prepare a correction", description: "It compares available records, identifies the inconsistent field and prepares the change without assuming unlimited financial authority.", handoff: "It asks Administrative AI to correct the related operational record." },
          { kind: "employee", actor: "Administrative AI", title: "Update the record within policy", description: "It corrects authorized administrative data and leaves the case ready for the cancellation policy to evaluate the next step.", handoff: "The request reaches the human control point defined for cancellation." },
          { kind: "human", actor: "Human supervisor", title: "Approve the consequential exception", description: "A person reviews the summarized context, applicable policy and financial impact before approving or rejecting cancellation.", handoff: "An explicit decision returns to Customer Support AI." },
          { kind: "result", actor: "Customer Support + Reporting", title: "Communicate and record the outcome", description: "The customer receives a response aligned with the decision. The path is recorded for follow-up, metrics and audit.", handoff: "Process completed with a traceable history." },
        ],
      },
    },
  },
  {
    key: "sales-lead",
    locales: {
      es: {
        label: "Lead comercial → reunión",
        title: "Un lead solicita información y parece encajar con el cliente objetivo",
        summary: "Ventas coordina investigación autorizada, CRM, preparación de contacto, calendario y revisión humana de cualquier condición comercial sensible.",
        trigger: "Formulario comercial con empresa, necesidad y preferencia de contacto.",
        outcome: "Lead priorizado, contexto registrado y reunión propuesta sin inventar condiciones ni compromisos.",
        steps: [
          { kind: "event", actor: "Lead", title: "Llega una solicitud comercial", description: "El formulario aporta datos declarados por el contacto y una necesidad inicial. No se asumen hechos que no estén confirmados.", handoff: "Pasa a Comercial SDR IA para clasificación inicial." },
          { kind: "employee", actor: "Comercial SDR IA", title: "Evalúa encaje con criterios definidos", description: "Ordena la oportunidad usando criterios comerciales aprobados, identifica información faltante y evita convertir una estimación en una decisión automática de negocio.", handoff: "Consulta CRM y fuentes internas permitidas." },
          { kind: "system", actor: "CRM + conocimiento", title: "Recupera historial y contexto autorizado", description: "El sistema devuelve relaciones previas, estado del contacto y material comercial aprobado relevante para esa necesidad.", handoff: "El contexto vuelve al SDR para preparar el siguiente contacto." },
          { kind: "employee", actor: "Comercial SDR + Gestor de Correo", title: "Prepara un contacto contextual", description: "El equipo digital redacta una respuesta basada en información aprobada y propone preguntas concretas para avanzar la oportunidad.", handoff: "Consulta disponibilidad en calendario antes de proponer una reunión." },
          { kind: "system", actor: "Calendario", title: "Ofrece disponibilidad permitida", description: "Solo se utilizan franjas y reglas de agenda autorizadas. No se reserva una persona fuera de las políticas configuradas.", handoff: "Si aparecen condiciones especiales, el caso se eleva a una persona." },
          { kind: "human", actor: "Responsable comercial", title: "Valida excepciones y compromisos", description: "Descuentos, compromisos contractuales o condiciones fuera del marco estándar permanecen bajo decisión humana.", handoff: "La decisión vuelve al flujo comercial." },
          { kind: "result", actor: "Comercial SDR + Reporting", title: "Propone reunión y conserva trazabilidad", description: "El lead recibe el siguiente paso adecuado y el CRM conserva origen, contexto, estado y resultado para seguimiento.", handoff: "Proceso listo para continuar con el equipo comercial humano." },
        ],
      },
      en: {
        label: "Sales lead → meeting",
        title: "A lead asks for information and appears to fit the target customer profile",
        summary: "Sales coordinates approved research, CRM, contact preparation, calendar and human review for any sensitive commercial condition.",
        trigger: "Commercial form with company, need and preferred contact method.",
        outcome: "Prioritized lead, recorded context and a proposed meeting without inventing terms or commitments.",
        steps: [
          { kind: "event", actor: "Lead", title: "A commercial request arrives", description: "The form contains information declared by the contact and an initial need. Unconfirmed facts are not assumed.", handoff: "It moves to Sales SDR AI for initial classification." },
          { kind: "employee", actor: "Sales SDR AI", title: "Assess fit against defined criteria", description: "It organizes the opportunity using approved commercial criteria, identifies missing information and avoids turning an estimate into an automatic business decision.", handoff: "It queries CRM and approved internal sources." },
          { kind: "system", actor: "CRM + knowledge", title: "Retrieve history and approved context", description: "The system returns previous relationships, contact status and approved commercial material relevant to the need.", handoff: "Context returns to the SDR to prepare the next contact." },
          { kind: "employee", actor: "Sales SDR + Email Manager", title: "Prepare a contextual contact", description: "The digital team drafts a response grounded in approved information and proposes concrete questions to advance the opportunity.", handoff: "It checks calendar availability before proposing a meeting." },
          { kind: "system", actor: "Calendar", title: "Offer permitted availability", description: "Only authorized slots and scheduling rules are used. A person is not booked outside configured policy.", handoff: "Special commercial conditions are escalated to a person." },
          { kind: "human", actor: "Sales owner", title: "Validate exceptions and commitments", description: "Discounts, contractual commitments or non-standard conditions remain under human decision.", handoff: "The decision returns to the sales flow." },
          { kind: "result", actor: "Sales SDR + Reporting", title: "Propose the meeting and preserve traceability", description: "The lead receives the appropriate next step and CRM retains source, context, status and outcome for follow-up.", handoff: "The process is ready to continue with the human sales team." },
        ],
      },
    },
  },
  {
    key: "delivery-incident",
    locales: {
      es: {
        label: "Incidencia de entrega",
        title: "Un pedido figura entregado, pero el cliente dice que no lo ha recibido",
        summary: "Atención al Cliente, Gestión de Pedidos y sistemas logísticos colaboran antes de decidir si corresponde investigación, reposición, compensación o intervención humana.",
        trigger: "Mensaje del cliente notificando una entrega no localizada.",
        outcome: "Incidencia documentada, ruta de resolución aplicada y cliente informado con datos verificables.",
        steps: [
          { kind: "event", actor: "Cliente", title: "Notifica una entrega no recibida", description: "El mensaje se clasifica como incidencia de entrega y se conserva el contexto original para evitar que el cliente repita información.", handoff: "Atención al Cliente IA inicia la verificación." },
          { kind: "employee", actor: "Atención al Cliente IA", title: "Identifica pedido y comprueba el caso", description: "Relaciona la solicitud con el pedido correcto y evita afirmar que el paquete fue recibido solo porque un estado técnico dice entregado.", handoff: "Consulta ecommerce, pedidos y trazabilidad logística." },
          { kind: "system", actor: "Ecommerce + logística", title: "Devuelve eventos de preparación y entrega", description: "Los sistemas autorizados aportan estado, transportista y eventos disponibles para construir una imagen verificable de la incidencia.", handoff: "La incidencia estructurada pasa a Gestión de Pedidos IA." },
          { kind: "employee", actor: "Gestión de Pedidos IA", title: "Abre la ruta operativa adecuada", description: "Según política, puede preparar una investigación con transportista, revisar una reposición permitida o recopilar datos adicionales.", handoff: "Si existe impacto económico, coordina con Facturación." },
          { kind: "employee", actor: "Contabilidad y Facturación IA", title: "Prepara el impacto económico permitido", description: "Calcula o prepara el ajuste dentro de reglas explícitas, sin aprobar por sí solo una compensación fuera de umbral.", handoff: "Los casos fuera de umbral pasan a aprobación humana." },
          { kind: "human", actor: "Responsable humano", title: "Decide la excepción fuera de política automática", description: "La persona recibe el contexto reunido y decide cuando la reposición, compensación o reclamación supera la autoridad delegada.", handoff: "La decisión vuelve a Atención al Cliente IA." },
          { kind: "result", actor: "Atención al Cliente + Reporting", title: "Cierra el ciclo con el cliente", description: "Se comunica el siguiente paso real, se actualiza el caso y quedan disponibles los datos necesarios para medir tiempos y causas de incidencia.", handoff: "Proceso cerrado o en seguimiento con propietario claro." },
        ],
      },
      en: {
        label: "Delivery incident",
        title: "An order is marked delivered, but the customer says it was not received",
        summary: "Customer Support, Order Management and logistics systems collaborate before deciding whether investigation, replacement, compensation or human intervention is appropriate.",
        trigger: "Customer message reporting a missing delivery.",
        outcome: "Documented incident, appropriate resolution path and a customer update grounded in verifiable data.",
        steps: [
          { kind: "event", actor: "Customer", title: "Report a missing delivery", description: "The message is classified as a delivery incident and the original context is retained so the customer does not need to repeat information.", handoff: "Customer Support AI starts verification." },
          { kind: "employee", actor: "Customer Support AI", title: "Identify the order and verify the case", description: "It links the request to the correct order and does not claim receipt merely because a technical status says delivered.", handoff: "It queries ecommerce, orders and logistics tracking." },
          { kind: "system", actor: "Ecommerce + logistics", title: "Return fulfilment and delivery events", description: "Approved systems provide status, carrier and available events to build a verifiable picture of the incident.", handoff: "The structured incident moves to Order Management AI." },
          { kind: "employee", actor: "Order Management AI", title: "Open the appropriate operational path", description: "Depending on policy, it can prepare a carrier investigation, review an allowed replacement or collect additional information.", handoff: "If there is financial impact, it coordinates with Billing." },
          { kind: "employee", actor: "Accounting & Billing AI", title: "Prepare the permitted financial impact", description: "It calculates or prepares the adjustment under explicit rules without approving compensation beyond its threshold.", handoff: "Cases outside the threshold move to human approval." },
          { kind: "human", actor: "Human supervisor", title: "Decide the exception outside automated policy", description: "A person receives the gathered context and decides when replacement, compensation or claims exceed delegated authority.", handoff: "The decision returns to Customer Support AI." },
          { kind: "result", actor: "Customer Support + Reporting", title: "Close the loop with the customer", description: "The real next step is communicated, the case is updated and data remains available to measure incident time and causes.", handoff: "Process closed or kept in follow-up with a clear owner." },
        ],
      },
    },
  },
];

const pageContent: Record<Locale, CollaborationPageContent> = {
  es: {
    seoTitle: "Cómo trabajan juntos los Empleados IA | Simulador IA Empleado",
    seoDescription: "Simula cómo varios Empleados IA, sistemas empresariales y personas se pasan tareas y contexto para resolver procesos completos con controles y trazabilidad.",
    eyebrow: "COLABORACIÓN · DEMO INTERACTIVA",
    heroTitle: "Mira cómo una tarea pasa de un Empleado IA a otro hasta resolverse.",
    heroDescription: "Selecciona un caso y recorre el proceso paso a paso. Verás quién trabaja, qué sistema interviene, cuándo cambia la responsabilidad y dónde aparece una aprobación humana.",
    heroNote: "Es una simulación educativa con datos sintéticos. Explica el modelo de colaboración; no ejecuta acciones sobre sistemas reales de clientes.",
    simulatorEyebrow: "VER CÓMO TRABAJAN JUNTOS",
    simulatorTitle: "Un proceso completo, varios especialistas coordinados",
    simulatorDescription: "Puedes reproducir el recorrido o inspeccionar cada handoff manualmente. La autoridad de cada paso sigue siendo explícita.",
    scenarioLabel: "Escenario",
    stepLabel: "Paso",
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    playLabel: "Reproducir",
    pauseLabel: "Pausar",
    resetLabel: "Reiniciar",
    progressLabel: "Progreso del proceso",
    handoffLabel: "Siguiente handoff",
    triggerLabel: "Entrada",
    outcomeLabel: "Resultado esperado",
    principlesEyebrow: "QUÉ ESTÁS VIENDO",
    principlesTitle: "La colaboración no significa compartirlo todo ni actuar sin límites",
    principles: [
      { title: "Especialización", text: "Cada Empleado IA conserva un trabajo definido. El caso cambia de propietario cuando entra en otra responsabilidad." },
      { title: "Contexto autorizado", text: "Solo viaja la información necesaria para el siguiente paso y siempre dentro de las fuentes y permisos configurados." },
      { title: "Política antes que autonomía", text: "Una capacidad técnica no concede autoridad empresarial. Umbrales y excepciones pueden detener el flujo para pedir aprobación." },
      { title: "Trazabilidad", text: "Entrada, consultas, handoffs, decisiones y resultado deben poder quedar registrados para seguimiento y mejora." },
    ],
    crawlableEyebrow: "LOS ESCENARIOS COMPLETOS",
    crawlableTitle: "El significado de la demo también existe fuera de la animación",
    crawlableDescription: "Estos recorridos se publican como contenido HTML para que sean accesibles, citables y comprensibles incluso sin ejecutar la interacción.",
    faqTitle: "Preguntas sobre la simulación",
    faq: [
      { question: "¿La demo está conectada a datos reales?", answer: "No. Esta experiencia pública usa escenarios y datos sintéticos. Su objetivo es explicar el modelo de trabajo colaborativo sin exponer sistemas, credenciales ni información de clientes." },
      { question: "¿Los Empleados IA comparten toda la información entre ellos?", answer: "No deberían. Cada handoff debe limitarse al contexto necesario y respetar los permisos, la organización y las políticas definidas para cada despliegue." },
      { question: "¿Un Equipo IA puede tomar cualquier decisión automáticamente?", answer: "No. Las acciones dependen de autoridad delegada, riesgo, reglas y umbrales. Las decisiones relevantes pueden reservarse a una persona." },
      { question: "¿Todos estos conectores están incluidos por defecto?", answer: "No. CRM, ERP, ecommerce, calendario, logística y otros conectores son ejemplos de sistemas posibles. Cada cliente incorpora solo las integraciones que su proceso necesita y que estén validadas para su entorno." },
    ],
    disclaimer: "Los recorridos son modelos comerciales de referencia. La implementación real depende de procesos, datos, integraciones, permisos, políticas y validación del entorno de cada organización.",
    ctaTitle: "Ahora podemos dibujar este mismo recorrido con uno de tus procesos.",
    ctaText: "Parte de un caso concreto, identifica qué sistemas intervienen y decide dónde quieres mantener control humano.",
    ctaPrimary: "Diseñar mi equipo IA",
    ctaSecondary: "Explorar Equipos IA",
  },
  en: {
    seoTitle: "How AI Employees work together | IA Empleado simulator",
    seoDescription: "Simulate how multiple AI Employees, business systems and people hand off tasks and context to resolve complete processes with controls and traceability.",
    eyebrow: "COLLABORATION · INTERACTIVE DEMO",
    heroTitle: "Watch a task move from one AI Employee to another until the process is resolved.",
    heroDescription: "Choose a case and inspect the process step by step. See who works, which system participates, when ownership changes and where human approval appears.",
    heroNote: "This is an educational simulation using synthetic data. It explains the collaboration model and does not execute actions on real customer systems.",
    simulatorEyebrow: "SEE THE TEAM WORK",
    simulatorTitle: "One complete process, multiple coordinated specialists",
    simulatorDescription: "Play the path or inspect every handoff manually. Authority remains explicit at every step.",
    scenarioLabel: "Scenario",
    stepLabel: "Step",
    previousLabel: "Previous",
    nextLabel: "Next",
    playLabel: "Play",
    pauseLabel: "Pause",
    resetLabel: "Reset",
    progressLabel: "Process progress",
    handoffLabel: "Next handoff",
    triggerLabel: "Input",
    outcomeLabel: "Expected outcome",
    principlesEyebrow: "WHAT YOU ARE SEEING",
    principlesTitle: "Collaboration does not mean sharing everything or acting without limits",
    principles: [
      { title: "Specialization", text: "Each AI Employee keeps a defined job. The case changes owner when it enters another responsibility." },
      { title: "Authorized context", text: "Only the information needed for the next step should travel, within configured sources and permissions." },
      { title: "Policy before autonomy", text: "Technical capability does not grant business authority. Thresholds and exceptions can stop the flow and request approval." },
      { title: "Traceability", text: "Input, queries, handoffs, decisions and outcome should be recordable for follow-up and improvement." },
    ],
    crawlableEyebrow: "COMPLETE SCENARIOS",
    crawlableTitle: "The meaning of the demo also exists outside the animation",
    crawlableDescription: "These paths are published as HTML content so they remain accessible, citable and understandable without running the interaction.",
    faqTitle: "Questions about the simulation",
    faq: [
      { question: "Is the demo connected to real data?", answer: "No. This public experience uses synthetic scenarios and data. Its purpose is to explain the collaborative work model without exposing customer systems, credentials or information." },
      { question: "Do AI Employees share all information with each other?", answer: "They should not. Each handoff should contain only the necessary context and respect the permissions, organization and policies defined for the deployment." },
      { question: "Can an AI Team make any decision automatically?", answer: "No. Actions depend on delegated authority, risk, rules and thresholds. Consequential decisions can remain reserved for a person." },
      { question: "Are all these connectors included by default?", answer: "No. CRM, ERP, ecommerce, calendar, logistics and other connectors are examples of possible systems. Each customer uses only the integrations required by the process and validated for its environment." },
    ],
    disclaimer: "These paths are reference commercial models. Real implementation depends on each organization’s processes, data, integrations, permissions, policies and environment validation.",
    ctaTitle: "Now we can map the same journey using one of your processes.",
    ctaText: "Start with a concrete case, identify the systems involved and decide where you want to keep human control.",
    ctaPrimary: "Design my AI team",
    ctaSecondary: "Explore AI Teams",
  },
};

export function collaborationDemoPath(locale: Locale) {
  return locale === "es" ? "/como-trabajan-juntos" : "/en/see-team-work";
}

export function getCollaborationScenarios(locale: Locale): CollaborationScenario[] {
  return scenarioRecords.map((scenario) => ({ key: scenario.key, ...scenario.locales[locale] }));
}

export function getCollaborationPageContent(locale: Locale) {
  return pageContent[locale];
}

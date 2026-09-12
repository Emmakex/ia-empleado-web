import type { EmployeeKey } from "./employee-catalog";
import type { Locale } from "./i18n";

export type TeamKey = "sales" | "ecommerce" | "administration" | "travel";

type TeamMember = {
  name: string;
  responsibility: string;
  description: string;
  employeeKey?: EmployeeKey;
};

type TeamFaq = {
  question: string;
  answer: string;
};

export type LocalizedTeamDetail = {
  slug: string;
  name: string;
  shortName: string;
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  statusLabel: string;
  heroTitle: string;
  heroDescription: string;
  outcomeLabel: string;
  outcome: string;
  problemTitle: string;
  problemBody: string;
  membersTitle: string;
  membersIntro: string;
  members: TeamMember[];
  workflowTitle: string;
  workflowIntro: string;
  workflow: Array<{ title: string; text: string }>;
  systemsTitle: string;
  systemsIntro: string;
  systems: string[];
  controlsTitle: string;
  controlsIntro: string;
  controls: string[];
  metricsTitle: string;
  metricsIntro: string;
  metrics: string[];
  useCasesTitle: string;
  useCases: Array<{ title: string; text: string }>;
  limitsTitle: string;
  limits: string[];
  faqTitle: string;
  faq: TeamFaq[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

type TeamRecord = {
  key: TeamKey;
  locales: Record<Locale, LocalizedTeamDetail>;
};

export type TeamIndexContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  title: string;
  description: string;
  definitionTitle: string;
  definitionBody: string;
  cardsTitle: string;
  cardsIntro: string;
  memberCountLabel: string;
  viewLabel: string;
  modelNote: string;
  principlesTitle: string;
  principles: Array<{ title: string; text: string }>;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaText: string;
  ctaPrimary: string;
};

const teamIndexContent: Record<Locale, TeamIndexContent> = {
  es: {
    seoTitle: "Equipos IA para empresas | IA Empleado",
    seoDescription: "Descubre cómo varios Empleados IA especializados pueden coordinar ventas, ecommerce, administración o turismo con sistemas, políticas y supervisión humana.",
    eyebrow: "EQUIPOS IA",
    title: "No automatices tareas aisladas. Diseña un equipo alrededor del proceso.",
    description: "Un Equipo IA combina varios Empleados IA especializados para coordinar un resultado empresarial de principio a fin. Cada composición se adapta a los sistemas, permisos y límites reales de cada organización.",
    definitionTitle: "¿Qué es un Equipo IA?",
    definitionBody: "Es una composición de trabajadores digitales especializados que se pasan tareas y contexto autorizado dentro de un proceso común. No significa que todos compartan todos los datos ni que puedan actuar sin límites: cada rol conserva sus permisos, herramientas, políticas y puntos de aprobación.",
    cardsTitle: "Cuatro composiciones iniciales",
    cardsIntro: "Estos equipos son modelos comerciales de referencia para explicar cómo puede organizarse el trabajo. No son paquetes cerrados ni prometen disponibilidad automática de cada integración.",
    memberCountLabel: "perfiles coordinados",
    viewLabel: "Ver cómo trabaja el equipo",
    modelNote: "Modelo de equipo de referencia · adaptación por cliente",
    principlesTitle: "Qué convierte varios agentes en un equipo",
    principles: [
      { title: "Objetivo compartido", text: "Los roles se coordinan alrededor de un proceso o resultado empresarial, no alrededor de conversaciones independientes." },
      { title: "Handoffs explícitos", text: "Cada traspaso define qué tarea cambia de responsable, qué contexto puede viajar y qué resultado se espera." },
      { title: "Autoridad delimitada", text: "Permisos, reglas, umbrales y aprobaciones humanas determinan qué puede ejecutar cada miembro." },
      { title: "Trazabilidad", text: "El proceso debe poder reconstruirse: entrada, decisiones, sistemas consultados, traspasos, aprobaciones y resultado." },
    ],
    ctaEyebrow: "DISEÑA TU EQUIPO",
    ctaTitle: "Empieza por un proceso que hoy cruza varias personas y sistemas.",
    ctaText: "Mapeamos el trabajo actual, detectamos qué roles digitales tienen sentido y dejamos explícito dónde deben seguir interviniendo personas.",
    ctaPrimary: "Diseñar mi equipo IA",
  },
  en: {
    seoTitle: "AI Teams for business | IA Empleado",
    seoDescription: "See how specialized AI Employees can coordinate sales, ecommerce, administration or travel workflows across systems, policies and human oversight.",
    eyebrow: "AI TEAMS",
    title: "Do not automate isolated tasks. Design a team around the process.",
    description: "An AI Team combines several specialized AI Employees to coordinate an end-to-end business outcome. Each composition is adapted to the actual systems, permissions and boundaries of each organization.",
    definitionTitle: "What is an AI Team?",
    definitionBody: "It is a composition of specialized digital workers that hand off tasks and authorized context inside a shared process. It does not mean every role shares every data source or acts without limits: each member keeps its own permissions, tools, policies and approval boundaries.",
    cardsTitle: "Four initial compositions",
    cardsIntro: "These teams are reference commercial models used to explain how work can be organized. They are not fixed bundles and do not promise automatic availability of every integration.",
    memberCountLabel: "coordinated profiles",
    viewLabel: "See how the team works",
    modelNote: "Reference team model · customer adaptation",
    principlesTitle: "What turns multiple agents into a team",
    principles: [
      { title: "Shared outcome", text: "Roles coordinate around a business process or outcome rather than independent conversations." },
      { title: "Explicit handoffs", text: "Each handoff defines which task changes owner, which context may travel and which result is expected." },
      { title: "Bounded authority", text: "Permissions, rules, thresholds and human approvals determine what each member may execute." },
      { title: "Traceability", text: "The process should be reconstructable: input, decisions, systems consulted, handoffs, approvals and result." },
    ],
    ctaEyebrow: "DESIGN YOUR TEAM",
    ctaTitle: "Start with a process that currently crosses several people and systems.",
    ctaText: "We map the current work, identify which digital roles make sense and make the points where people should remain involved explicit.",
    ctaPrimary: "Design my AI team",
  },
};

const teamRecords: TeamRecord[] = [
  {
    key: "sales",
    locales: {
      es: {
        slug: "ventas",
        name: "Equipo IA de Ventas",
        shortName: "Ventas",
        seoTitle: "Equipo IA de Ventas | IA Empleado",
        seoDescription: "Cómo un equipo de Marketing Operations, Comercial SDR, correo y reporting puede coordinar research, seguimiento, CRM y reuniones con supervisión humana.",
        eyebrow: "EQUIPO IA · VENTAS",
        statusLabel: "Modelo de equipo de referencia",
        heroTitle: "De una señal comercial a una oportunidad preparada, sin perder el contexto entre herramientas.",
        heroDescription: "El Equipo IA de Ventas muestra cómo varios perfiles especializados pueden colaborar alrededor de captación, research, seguimiento y CRM sin convertir la relación comercial en una secuencia automática sin control.",
        outcomeLabel: "Resultado que coordina",
        outcome: "Prospección y seguimiento comercial estructurados, con CRM actualizado y escalado humano antes de compromisos relevantes.",
        problemTitle: "El problema: ventas suele romperse en los traspasos",
        problemBody: "Una oportunidad puede empezar en marketing, pasar por research, correo, CRM, agenda y reporting. Cuando cada paso vive en una herramienta o responsable distinto aparecen leads sin seguimiento, datos incompletos, mensajes duplicados y reuniones sin contexto. El equipo coordina esos handoffs; no sustituye el criterio comercial ni concede autoridad contractual a la IA.",
        membersTitle: "Quién participa",
        membersIntro: "La composición se ajusta por empresa. Este modelo combina cuatro funciones habituales.",
        members: [
          { name: "Marketing Operations", responsibility: "Señales y contexto", description: "Clasifica fuentes, campañas y señales de interés y prepara contexto útil para el siguiente rol." },
          { name: "Comercial SDR IA", responsibility: "Research y seguimiento", description: "Investiga cuentas, prepara contactos, mantiene actividad en CRM y organiza el seguimiento dentro de reglas aprobadas.", employeeKey: "sales-sdr" },
          { name: "Gestor de Correo IA", responsibility: "Bandeja y respuestas", description: "Ordena respuestas, identifica intención, propone siguientes pasos y mantiene el hilo asociado a la oportunidad correcta." },
          { name: "Reporting IA", responsibility: "Visibilidad del proceso", description: "Consolida actividad, estado del pipeline y métricas operativas sin inventar atribución o ingresos no confirmados." },
        ],
        workflowTitle: "Cómo trabaja el equipo",
        workflowIntro: "Ejemplo educativo de un flujo de prospección B2B. Las acciones reales dependen de consentimiento, datos, herramientas y política comercial.",
        workflow: [
          { title: "1. Detecta señal", text: "Una fuente aprobada genera un lead o una cuenta a revisar y conserva su procedencia." },
          { title: "2. Enriquece contexto", text: "Se recopila solo la información permitida y se estructura para que el SDR no empiece desde cero." },
          { title: "3. Prepara seguimiento", text: "El Comercial SDR propone o ejecuta acciones permitidas, registra actividad y mantiene CRM como fuente operativa." },
          { title: "4. Interpreta respuesta", text: "El gestor de correo relaciona la conversación con la oportunidad y deriva reunión, objeción, descarte o revisión humana." },
          { title: "5. Mide y escala", text: "Reporting actualiza el estado y una persona interviene antes de descuentos, compromisos, negociación o excepciones relevantes." },
        ],
        systemsTitle: "Sistemas habituales",
        systemsIntro: "No se necesitan todos. Se conectan únicamente las fuentes necesarias para el proceso aprobado.",
        systems: ["CRM", "Email", "Calendario", "Marketing automation", "Formularios", "Fuentes de research", "Documentos comerciales", "Reporting / BI", "APIs internas"],
        controlsTitle: "Puntos de control humano",
        controlsIntro: "Automatizar seguimiento no equivale a delegar autoridad comercial.",
        controls: [
          "Aprobación de precios, descuentos, condiciones o compromisos contractuales.",
          "Revisión de mensajes sensibles, claims no validados o excepciones de marca.",
          "Cumplimiento de consentimiento, preferencias de contacto y políticas de prospección.",
          "Decisiones donde la identidad, intención o calidad de los datos no sea fiable.",
        ],
        metricsTitle: "Qué medir",
        metricsIntro: "Son indicadores posibles, no promesas de mejora. Deben compararse con una línea base real.",
        metrics: ["Tiempo hasta primer seguimiento", "Porcentaje de leads con siguiente acción", "Completitud del CRM", "Tiempo humano por oportunidad", "Reuniones cualificadas", "Tasa de handoffs que requieren corrección"],
        useCasesTitle: "Casos de uso",
        useCases: [
          { title: "Lead entrante", text: "Clasifica la fuente, recupera contexto, crea o actualiza el registro y prepara la siguiente acción para el SDR." },
          { title: "Respuesta a campaña", text: "Relaciona el email con la cuenta correcta, identifica intención y propone reunión, seguimiento o descarte." },
          { title: "Pipeline desactualizado", text: "Detecta oportunidades sin actividad o campos incompletos y prepara tareas para corregir el dato antes de reportar." },
          { title: "Preparación de reunión", text: "Resume interacciones y contexto autorizado para que la persona llegue a la conversación con información consistente." },
        ],
        limitsTitle: "Límites realistas",
        limits: [
          "No garantiza ventas, reuniones ni conversión.",
          "No debe enviar mensajes masivos o no consentidos por defecto.",
          "No negocia ni compromete condiciones comerciales fuera de permisos explícitos.",
          "La calidad del pipeline depende de la calidad de CRM, fuentes e integraciones.",
          "Marketing Operations, Email Manager y Reporting son composiciones de catálogo y requieren adaptación al entorno real.",
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { question: "¿Es un CRM autónomo?", answer: "No. El equipo puede trabajar sobre un CRM autorizado, pero el CRM sigue siendo un sistema empresarial separado y la política define qué campos y acciones puede modificar cada rol." },
          { question: "¿Puede contactar leads automáticamente?", answer: "Puede prepararse o habilitarse seguimiento dentro de canales, consentimiento, reglas y límites aprobados. No se asume envío autónomo indiscriminado." },
          { question: "¿Quién aprueba descuentos o propuestas?", answer: "La empresa define los umbrales. Los compromisos comerciales relevantes pueden reservarse a una persona aunque el equipo prepare contexto y borradores." },
          { question: "¿Todos los empleados ven toda la información?", answer: "No. Los handoffs deben transportar solo el contexto autorizado y cada rol conserva permisos separados." },
        ],
        ctaEyebrow: "DISEÑA TU FLUJO COMERCIAL",
        ctaTitle: "Empieza por el punto donde hoy se pierden más oportunidades o más tiempo humano.",
        ctaText: "Podemos mapear captación, CRM, correo, agenda y reporting y decidir qué parte conviene coordinar primero.",
        ctaPrimary: "Diseñar un equipo de Ventas",
        ctaSecondary: "Ver todos los equipos",
      },
      en: {
        slug: "sales",
        name: "Sales AI Team",
        shortName: "Sales",
        seoTitle: "Sales AI Team | IA Empleado",
        seoDescription: "How Marketing Operations, Sales SDR, email and reporting roles can coordinate research, follow-up, CRM and meetings under human oversight.",
        eyebrow: "AI TEAM · SALES",
        statusLabel: "Reference team model",
        heroTitle: "From a commercial signal to a prepared opportunity without losing context between tools.",
        heroDescription: "The Sales AI Team shows how specialized roles can collaborate around acquisition, research, follow-up and CRM without turning the commercial relationship into an uncontrolled automated sequence.",
        outcomeLabel: "Outcome it coordinates",
        outcome: "Structured prospecting and follow-up, with an updated CRM and human escalation before consequential commercial commitments.",
        problemTitle: "The problem: sales often breaks at the handoffs",
        problemBody: "An opportunity may start in marketing and move through research, email, CRM, calendar and reporting. When each step lives in a different tool or owner, leads go untouched, data becomes incomplete, messages are duplicated and meetings lose context. The team coordinates those handoffs; it does not replace commercial judgment or grant contractual authority to AI.",
        membersTitle: "Who participates",
        membersIntro: "The composition is adapted per company. This reference model combines four common functions.",
        members: [
          { name: "Marketing Operations", responsibility: "Signals and context", description: "Classifies sources, campaigns and intent signals and prepares useful context for the next role." },
          { name: "Sales SDR AI", responsibility: "Research and follow-up", description: "Researches accounts, prepares contacts, maintains CRM activity and organizes follow-up within approved rules.", employeeKey: "sales-sdr" },
          { name: "Email Manager AI", responsibility: "Inbox and replies", description: "Organizes responses, identifies intent, proposes next steps and keeps each thread associated with the correct opportunity." },
          { name: "Reporting AI", responsibility: "Process visibility", description: "Consolidates activity, pipeline state and operating metrics without inventing attribution or unconfirmed revenue." },
        ],
        workflowTitle: "How the team works",
        workflowIntro: "Educational example of a B2B prospecting flow. Real actions depend on consent, data, tools and commercial policy.",
        workflow: [
          { title: "1. Detect a signal", text: "An approved source generates a lead or account to review while preserving its origin." },
          { title: "2. Enrich context", text: "Only permitted information is gathered and structured so the SDR does not start from zero." },
          { title: "3. Prepare follow-up", text: "The Sales SDR proposes or performs permitted actions, records activity and keeps CRM as the operating source." },
          { title: "4. Interpret the reply", text: "The email role connects the conversation to the opportunity and routes a meeting, objection, disqualification or human review." },
          { title: "5. Measure and escalate", text: "Reporting updates the state and a person intervenes before discounts, commitments, negotiation or relevant exceptions." },
        ],
        systemsTitle: "Typical systems",
        systemsIntro: "Not all are required. Only the sources needed for the approved process are connected.",
        systems: ["CRM", "Email", "Calendar", "Marketing automation", "Forms", "Research sources", "Sales documents", "Reporting / BI", "Internal APIs"],
        controlsTitle: "Human control points",
        controlsIntro: "Automating follow-up does not mean delegating commercial authority.",
        controls: [
          "Approval of pricing, discounts, terms or contractual commitments.",
          "Review of sensitive messages, unvalidated claims or brand exceptions.",
          "Compliance with consent, contact preferences and prospecting policies.",
          "Decisions where identity, intent or data quality is not reliable.",
        ],
        metricsTitle: "What to measure",
        metricsIntro: "These are possible indicators, not improvement promises. They should be compared with a real baseline.",
        metrics: ["Time to first follow-up", "Leads with a next action", "CRM completeness", "Human time per opportunity", "Qualified meetings", "Handoffs requiring correction"],
        useCasesTitle: "Use cases",
        useCases: [
          { title: "Inbound lead", text: "Classifies the source, retrieves context, creates or updates the record and prepares the next SDR action." },
          { title: "Campaign reply", text: "Connects the email to the correct account, identifies intent and proposes a meeting, follow-up or disqualification." },
          { title: "Stale pipeline", text: "Detects opportunities with no activity or missing fields and prepares correction tasks before reporting." },
          { title: "Meeting preparation", text: "Summarizes interactions and authorized context so the person enters the conversation with consistent information." },
        ],
        limitsTitle: "Realistic limits",
        limits: [
          "It does not guarantee sales, meetings or conversion.",
          "It should not send indiscriminate or non-consensual outreach by default.",
          "It does not negotiate or commit commercial terms outside explicit permissions.",
          "Pipeline quality depends on CRM, source and integration quality.",
          "Marketing Operations, Email Manager and Reporting are catalog compositions that require adaptation to the real environment.",
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { question: "Is it an autonomous CRM?", answer: "No. The team can work on an authorized CRM, but the CRM remains a separate business system and policy defines which fields and actions each role may change." },
          { question: "Can it contact leads automatically?", answer: "Follow-up can be prepared or enabled within approved channels, consent, rules and limits. Unrestricted autonomous outreach is not assumed." },
          { question: "Who approves discounts or proposals?", answer: "The company defines the thresholds. Consequential commercial commitments can remain human even when the team prepares context and drafts." },
          { question: "Does every employee see all information?", answer: "No. Handoffs should carry only authorized context and each role keeps separate permissions." },
        ],
        ctaEyebrow: "DESIGN YOUR SALES FLOW",
        ctaTitle: "Start where opportunities or human time are currently being lost.",
        ctaText: "We can map acquisition, CRM, email, calendar and reporting and decide which part should be coordinated first.",
        ctaPrimary: "Design a Sales AI Team",
        ctaSecondary: "View all teams",
      },
    },
  },
  {
    key: "ecommerce",
    locales: {
      es: {
        slug: "ecommerce",
        name: "Equipo IA de Ecommerce",
        shortName: "Ecommerce",
        seoTitle: "Equipo IA para Ecommerce | IA Empleado",
        seoDescription: "Cómo Atención al Cliente, Pedidos, Operaciones Ecommerce, Facturación y Reporting pueden coordinar incidencias de compra con controles humanos.",
        eyebrow: "EQUIPO IA · ECOMMERCE",
        statusLabel: "Modelo de equipo de referencia",
        heroTitle: "Un pedido no termina en el checkout: conecta soporte, operaciones, facturación y seguimiento.",
        heroDescription: "El Equipo IA de Ecommerce organiza trabajo que cruza atención al cliente, pedidos, catálogo, facturación y reporting para que una incidencia no quede fragmentada entre bandejas y sistemas.",
        outcomeLabel: "Resultado que coordina",
        outcome: "Incidencias y operaciones de pedido encaminadas al rol correcto, con estado consistente y aprobación humana en acciones de mayor impacto.",
        problemTitle: "El problema: una incidencia de compra rara vez pertenece a un solo departamento",
        problemBody: "Un cliente puede preguntar por un envío y terminar revelando un problema de stock, dirección, factura o devolución. Resolverlo exige consultar varias fuentes y coordinar responsables. El equipo crea un flujo común sin asumir que todos los cambios, reembolsos o excepciones deben ejecutarse automáticamente.",
        membersTitle: "Quién participa",
        membersIntro: "La composición de referencia combina cinco funciones frecuentes en operaciones ecommerce.",
        members: [
          { name: "Atención al Cliente IA", responsibility: "Entrada y comunicación", description: "Recibe la solicitud, identifica cliente y pedido y mantiene la comunicación durante el proceso.", employeeKey: "customer-support" },
          { name: "Gestión de Pedidos IA", responsibility: "Pedido y fulfillment", description: "Coordina estado, preparación, cambios permitidos, incidencias de entrega y handoffs con operaciones." },
          { name: "Operaciones Ecommerce IA", responsibility: "Catálogo y operación", description: "Trabaja con información operativa de tienda, catálogo, stock o reglas comerciales dentro del alcance aprobado." },
          { name: "Contabilidad y Facturación IA", responsibility: "Factura y cobro", description: "Valida datos de facturación, estados de cobro y correcciones dentro de reglas y umbrales explícitos.", employeeKey: "accounting-billing" },
          { name: "Reporting IA", responsibility: "Visibilidad", description: "Consolida volumen, causas, tiempos y resultados para detectar cuellos de botella reales." },
        ],
        workflowTitle: "Cómo trabaja el equipo",
        workflowIntro: "Ejemplo: un cliente reporta una factura incorrecta y quiere cancelar un pedido.",
        workflow: [
          { title: "1. Identifica el caso", text: "Atención localiza cliente y pedido antes de afirmar estados o iniciar cambios." },
          { title: "2. Separa los problemas", text: "La discrepancia de factura se deriva a Facturación y la petición de cancelación a Pedido / Operaciones." },
          { title: "3. Verifica sistemas", text: "Cada rol consulta únicamente las fuentes necesarias: ecommerce, ERP, pago, envío o facturación." },
          { title: "4. Aplica política", text: "Una acción permitida continúa; un reembolso, cambio sensible o excepción supera el umbral y se detiene para aprobación." },
          { title: "5. Recompone el resultado", text: "Atención recibe los resultados de los handoffs, comunica una respuesta coherente y Reporting registra el cierre." },
        ],
        systemsTitle: "Sistemas habituales",
        systemsIntro: "La arquitectura depende del stack de la tienda y de qué fuentes sean realmente autoritativas.",
        systems: ["Plataforma ecommerce", "CRM", "ERP", "Inventario", "Envíos", "Ticketing", "Pasarela / estado de pago", "Facturación", "Email / chat", "Reporting"],
        controlsTitle: "Puntos de control humano",
        controlsIntro: "Las acciones sobre dinero, identidad o compromisos al cliente deben tener límites explícitos.",
        controls: [
          "Reembolsos, créditos o compensaciones por encima de umbrales definidos.",
          "Cambios de pedido cuando el estado logístico o la identidad no es fiable.",
          "Excepciones de stock, precio o política comercial.",
          "Casos de fraude, reclamación compleja o conflicto entre fuentes.",
        ],
        metricsTitle: "Qué medir",
        metricsIntro: "El objetivo es observar el proceso completo, no presumir porcentajes de automatización.",
        metrics: ["Tiempo de resolución", "Casos con múltiples handoffs", "Toques manuales por incidencia", "Backlog por causa", "Correcciones de pedido o factura", "Tiempo hasta informar al cliente"],
        useCasesTitle: "Casos de uso",
        useCases: [
          { title: "Pedido retrasado", text: "Cruza estado de envío y pedido, comunica información fiable y deriva una excepción logística cuando corresponde." },
          { title: "Factura incorrecta", text: "Entrega el caso a Facturación con pedido y datos relevantes y recupera el resultado para cerrar con el cliente." },
          { title: "Cambio antes de preparación", text: "Comprueba estado y política y solo ejecuta o prepara el cambio cuando el flujo lo permite." },
          { title: "Incidencia recurrente", text: "Reporting agrupa causas repetidas para detectar un problema operativo en lugar de resolver cada ticket de forma aislada." },
        ],
        limitsTitle: "Límites realistas",
        limits: [
          "No garantiza automatización total del servicio postventa.",
          "No debe suponer stock, pago, envío o identidad cuando los sistemas no lo confirman.",
          "Reembolsos y cambios sensibles requieren reglas y, cuando proceda, aprobación humana.",
          "La composición exacta depende de ecommerce, ERP, logística y procesos existentes.",
          "Gestión de Pedidos, Operaciones Ecommerce y Reporting son perfiles de catálogo que requieren adaptación antes de presentarse como capacidad desplegada específica.",
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { question: "¿Puede trabajar con Shopify, WooCommerce o PrestaShop?", answer: "La arquitectura contempla plataformas ecommerce mediante integraciones específicas, pero cada conector debe validarse para el entorno del cliente y no se presupone soporte universal." },
          { question: "¿Puede cancelar pedidos solo?", answer: "Solo si el estado, identidad, reglas y permisos permiten esa acción. Los casos fuera de política o de mayor impacto pueden requerir aprobación humana." },
          { question: "¿Qué pasa si ERP y tienda discrepan?", answer: "El flujo debe reconocer el conflicto y escalarlo o aplicar una fuente autoritativa definida; no debe escoger datos arbitrariamente." },
          { question: "¿El cliente tiene que repetir el problema a cada rol?", answer: "No debería. El objetivo del handoff es transferir la tarea y el contexto autorizado necesario para continuar sin reiniciar el caso." },
        ],
        ctaEyebrow: "DISEÑA TU OPERACIÓN ECOMMERCE",
        ctaTitle: "Mapea desde la consulta del cliente hasta pedido, factura, envío y cierre.",
        ctaText: "Podemos identificar qué handoffs consumen más tiempo y qué sistemas deben participar sin ampliar permisos innecesariamente.",
        ctaPrimary: "Diseñar un equipo Ecommerce",
        ctaSecondary: "Ver todos los equipos",
      },
      en: {
        slug: "ecommerce",
        name: "Ecommerce AI Team",
        shortName: "Ecommerce",
        seoTitle: "AI Team for Ecommerce | IA Empleado",
        seoDescription: "How Customer Support, Orders, Ecommerce Operations, Billing and Reporting can coordinate purchase issues with human controls.",
        eyebrow: "AI TEAM · ECOMMERCE",
        statusLabel: "Reference team model",
        heroTitle: "An order does not end at checkout: connect support, operations, billing and follow-up.",
        heroDescription: "The Ecommerce AI Team organizes work across customer support, orders, catalog operations, billing and reporting so one issue does not fragment across inboxes and systems.",
        outcomeLabel: "Outcome it coordinates",
        outcome: "Order incidents and operations routed to the right role, with consistent status and human approval for higher-impact actions.",
        problemTitle: "The problem: a purchase issue rarely belongs to one department",
        problemBody: "A customer may ask about a shipment and reveal a stock, address, invoice or return issue. Resolving it requires several sources and owners. The team creates one coordinated flow without assuming that every change, refund or exception should run automatically.",
        membersTitle: "Who participates",
        membersIntro: "The reference composition combines five common ecommerce operating functions.",
        members: [
          { name: "Customer Support AI", responsibility: "Intake and communication", description: "Receives the request, identifies the customer and order and maintains communication through the process.", employeeKey: "customer-support" },
          { name: "Order Management AI", responsibility: "Order and fulfilment", description: "Coordinates status, fulfilment, permitted changes, delivery incidents and operations handoffs." },
          { name: "Ecommerce Operations AI", responsibility: "Catalog and operations", description: "Works with store, catalog, stock or commercial-rule information within the approved scope." },
          { name: "Accounting & Billing AI", responsibility: "Invoice and payment", description: "Validates billing data, payment status and corrections under explicit rules and thresholds.", employeeKey: "accounting-billing" },
          { name: "Reporting AI", responsibility: "Visibility", description: "Consolidates volume, causes, cycle times and outcomes to expose real operating bottlenecks." },
        ],
        workflowTitle: "How the team works",
        workflowIntro: "Example: a customer reports an incorrect invoice and wants to cancel an order.",
        workflow: [
          { title: "1. Identify the case", text: "Support locates the customer and order before asserting status or starting a change." },
          { title: "2. Split the problems", text: "The invoice discrepancy goes to Billing and the cancellation request to Order / Operations." },
          { title: "3. Verify systems", text: "Each role consults only the required sources: ecommerce, ERP, payment, shipping or billing." },
          { title: "4. Apply policy", text: "A permitted action continues; a refund, sensitive change or exception beyond threshold stops for approval." },
          { title: "5. Recompose the outcome", text: "Support receives the handoff results, communicates one coherent answer and Reporting records closure." },
        ],
        systemsTitle: "Typical systems",
        systemsIntro: "The architecture depends on the store stack and on which sources are actually authoritative.",
        systems: ["Ecommerce platform", "CRM", "ERP", "Inventory", "Shipping", "Ticketing", "Payment status", "Billing", "Email / chat", "Reporting"],
        controlsTitle: "Human control points",
        controlsIntro: "Actions involving money, identity or customer commitments need explicit limits.",
        controls: [
          "Refunds, credits or compensation above defined thresholds.",
          "Order changes when logistics status or identity is unreliable.",
          "Stock, pricing or commercial-policy exceptions.",
          "Fraud, complex claims or conflicting system sources.",
        ],
        metricsTitle: "What to measure",
        metricsIntro: "The goal is to observe the full process rather than assume an automation percentage.",
        metrics: ["Resolution time", "Cases with multiple handoffs", "Manual touches per incident", "Backlog by cause", "Order or invoice corrections", "Time to inform the customer"],
        useCasesTitle: "Use cases",
        useCases: [
          { title: "Delayed order", text: "Combines shipment and order status, communicates reliable information and routes a logistics exception when needed." },
          { title: "Incorrect invoice", text: "Hands the case to Billing with the order and relevant data and recovers the result to close with the customer." },
          { title: "Pre-fulfilment change", text: "Checks status and policy and only executes or prepares the change when the flow allows it." },
          { title: "Recurring incident", text: "Reporting groups repeated causes to expose an operating issue instead of treating each ticket in isolation." },
        ],
        limitsTitle: "Realistic limits",
        limits: [
          "It does not guarantee full post-purchase automation.",
          "It must not assume stock, payment, shipment or identity when systems do not confirm it.",
          "Refunds and sensitive changes need rules and, when appropriate, human approval.",
          "The exact composition depends on ecommerce, ERP, logistics and existing processes.",
          "Order Management, Ecommerce Operations and Reporting are catalog roles that require adaptation before being presented as a specific deployed capability.",
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { question: "Can it work with Shopify, WooCommerce or PrestaShop?", answer: "The architecture supports ecommerce platforms through specific integrations, but each connector must be validated for the customer environment and universal support is not assumed." },
          { question: "Can it cancel orders on its own?", answer: "Only when status, identity, rules and permissions allow the action. Out-of-policy or higher-impact cases can require human approval." },
          { question: "What if the ERP and store disagree?", answer: "The flow should recognize the conflict and escalate it or use a defined authoritative source; it should not choose data arbitrarily." },
          { question: "Does the customer repeat the problem to every role?", answer: "It should not. The handoff is designed to transfer the task and only the authorized context required to continue the case." },
        ],
        ctaEyebrow: "DESIGN YOUR ECOMMERCE OPERATION",
        ctaTitle: "Map the journey from the customer request through order, invoice, shipping and closure.",
        ctaText: "We can identify which handoffs consume the most time and which systems should participate without widening permissions unnecessarily.",
        ctaPrimary: "Design an Ecommerce AI Team",
        ctaSecondary: "View all teams",
      },
    },
  },
  {
    key: "administration",
    locales: {
      es: {
        slug: "administracion",
        name: "Equipo IA de Administración",
        shortName: "Administración",
        seoTitle: "Equipo IA de Administración | IA Empleado",
        seoDescription: "Cómo correo, Administrativo, Documentación y Facturación pueden coordinar solicitudes, documentos y registros con trazabilidad y aprobación humana.",
        eyebrow: "EQUIPO IA · ADMINISTRACIÓN",
        statusLabel: "Modelo de equipo de referencia",
        heroTitle: "Convierte bandejas, documentos y registros en un proceso administrativo coordinado.",
        heroDescription: "El Equipo IA de Administración reúne roles para clasificar entradas, solicitar o revisar documentación, mantener registros y coordinar facturación sin borrar los puntos de control que necesita una operación seria.",
        outcomeLabel: "Resultado que coordina",
        outcome: "Solicitudes administrativas encaminadas, documentación localizada y registros preparados o actualizados dentro de permisos definidos.",
        problemTitle: "El problema: el back office acumula trabajo invisible entre correos y sistemas",
        problemBody: "Muchas tareas administrativas no son difíciles por separado, pero exigen copiar datos, perseguir documentos, validar campos, actualizar herramientas y avisar a otras áreas. Cuando nadie ve el proceso completo, aparecen retrasos y errores. El equipo coordina el recorrido y deja las excepciones o decisiones relevantes a personas.",
        membersTitle: "Quién participa",
        membersIntro: "La composición de referencia conecta entrada, ejecución administrativa, documentación y facturación.",
        members: [
          { name: "Gestor de Correo IA", responsibility: "Entrada y clasificación", description: "Ordena solicitudes, relaciona hilos y crea tareas estructuradas para el responsable adecuado." },
          { name: "Administrativo IA", responsibility: "Registros y back office", description: "Gestiona tareas repetitivas, actualiza registros autorizados y coordina excepciones con personas.", employeeKey: "administrative" },
          { name: "Documentación IA", responsibility: "Documentos y evidencias", description: "Localiza, clasifica y prepara documentación dentro de fuentes y reglas aprobadas." },
          { name: "Contabilidad y Facturación IA", responsibility: "Datos económicos", description: "Interviene cuando el trámite requiere factura, estado de cobro o validación contable dentro de su alcance.", employeeKey: "accounting-billing" },
        ],
        workflowTitle: "Cómo trabaja el equipo",
        workflowIntro: "Ejemplo: llega por email una solicitud que requiere actualizar datos, adjuntar documentación y revisar una factura.",
        workflow: [
          { title: "1. Clasifica la entrada", text: "El gestor de correo identifica el asunto, conserva el hilo y crea una tarea con contexto mínimo suficiente." },
          { title: "2. Verifica requisitos", text: "Administración comprueba qué campos, documentos o autorizaciones faltan antes de modificar registros." },
          { title: "3. Reúne documentación", text: "Documentación busca las fuentes permitidas, identifica ausencias y evita sustituir un documento por inferencias." },
          { title: "4. Coordina el dato económico", text: "Si existe factura o cobro, Facturación valida la parte correspondiente y devuelve un resultado estructurado." },
          { title: "5. Actualiza y cierra", text: "Administración ejecuta lo permitido, solicita aprobación cuando procede y deja el expediente con estado y trazabilidad claros." },
        ],
        systemsTitle: "Sistemas habituales",
        systemsIntro: "El equipo debe trabajar sobre fuentes autoritativas, no sobre copias inconexas cuando existe un sistema maestro.",
        systems: ["Email", "Gestor documental", "ERP", "CRM", "Facturación", "Calendario", "Formularios", "Firma / aprobación", "Almacenamiento", "APIs internas"],
        controlsTitle: "Puntos de control humano",
        controlsIntro: "La automatización administrativa necesita controles de identidad, autorización y calidad de dato.",
        controls: [
          "Cambios sensibles en datos maestros o información de terceros.",
          "Documentación incompleta, contradictoria o cuya validez no puede verificarse.",
          "Aprobaciones, firmas o compromisos que la organización reserve a personas.",
          "Operaciones financieras fuera del alcance y umbrales definidos para Facturación.",
        ],
        metricsTitle: "Qué medir",
        metricsIntro: "Las métricas deben demostrar si el proceso mejora sin ocultar retrabajo o excepciones.",
        metrics: ["Tiempo de ciclo por solicitud", "Solicitudes pendientes por documentación", "Toques manuales", "Errores de datos detectados", "SLA de respuesta", "Porcentaje de casos escalados"],
        useCasesTitle: "Casos de uso",
        useCases: [
          { title: "Alta o actualización de proveedor", text: "Reúne datos y documentos, identifica faltantes y prepara el registro para revisión o actualización autorizada." },
          { title: "Solicitud interna por email", text: "Convierte una conversación en una tarea trazable y la entrega al rol correcto con contexto suficiente." },
          { title: "Expediente incompleto", text: "Detecta qué evidencia falta, prepara la solicitud y evita cerrar el caso hasta recibir la documentación requerida." },
          { title: "Factura ligada a trámite", text: "Separa la validación administrativa de la parte contable y reúne ambas respuestas antes de cerrar el expediente." },
        ],
        limitsTitle: "Límites realistas",
        limits: [
          "No convierte automáticamente cualquier correo en una acción válida.",
          "No debe alterar datos maestros sin identidad, permisos y reglas suficientes.",
          "No sustituye firmas, autorizaciones o controles legales que deban permanecer humanos.",
          "OCR, firma, visión o extracción avanzada son capacidades opcionales según el proceso.",
          "Gestor de Correo y Documentación son perfiles de catálogo que requieren adaptación antes de considerarlos una implantación concreta.",
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { question: "¿Puede leer documentos adjuntos?", answer: "Puede diseñarse con capacidades documentales u OCR cuando el proceso lo requiera, pero no se consideran universales ni deben activarse sin necesidad." },
          { question: "¿Puede actualizar el ERP?", answer: "Sí cuando existe una integración aprobada y el campo o acción está dentro de sus permisos. Los cambios sensibles pueden requerir aprobación." },
          { question: "¿Cómo evita duplicados?", answer: "El proceso debe definir claves, fuentes autoritativas y reglas de coincidencia. Cuando la identidad no es fiable, debe detenerse y escalar." },
          { question: "¿Puede coordinarse con Facturación?", answer: "Sí. Un trámite puede entregar la parte económica al rol especializado y recuperar el resultado sin conceder acceso financiero innecesario al rol administrativo." },
        ],
        ctaEyebrow: "DISEÑA TU BACK OFFICE",
        ctaTitle: "Elige un trámite repetitivo que hoy dependa de email, documentos y varias actualizaciones manuales.",
        ctaText: "Mapeamos entradas, fuentes, permisos, aprobaciones y salida para construir un primer flujo controlado.",
        ctaPrimary: "Diseñar un equipo Administrativo",
        ctaSecondary: "Ver todos los equipos",
      },
      en: {
        slug: "administration",
        name: "Administration AI Team",
        shortName: "Administration",
        seoTitle: "Administration AI Team | IA Empleado",
        seoDescription: "How email, Administrative, Documentation and Billing roles can coordinate requests, documents and records with traceability and human approval.",
        eyebrow: "AI TEAM · ADMINISTRATION",
        statusLabel: "Reference team model",
        heroTitle: "Turn inboxes, documents and records into one coordinated administrative process.",
        heroDescription: "The Administration AI Team brings roles together to classify intake, request or review documentation, maintain records and coordinate billing without removing the control points serious operations require.",
        outcomeLabel: "Outcome it coordinates",
        outcome: "Administrative requests routed correctly, documentation located and records prepared or updated within defined permissions.",
        problemTitle: "The problem: back-office work accumulates invisibly between email and systems",
        problemBody: "Many administrative tasks are not difficult individually, but require copying data, chasing documents, validating fields, updating tools and notifying other areas. When nobody sees the whole process, delays and errors appear. The team coordinates the journey and leaves exceptions or consequential decisions to people.",
        membersTitle: "Who participates",
        membersIntro: "The reference composition connects intake, administrative execution, documentation and billing.",
        members: [
          { name: "Email Manager AI", responsibility: "Intake and classification", description: "Organizes requests, links threads and creates structured tasks for the right owner." },
          { name: "Administrative AI", responsibility: "Records and back office", description: "Handles repetitive work, updates authorized records and coordinates exceptions with people.", employeeKey: "administrative" },
          { name: "Documentation AI", responsibility: "Documents and evidence", description: "Locates, classifies and prepares documentation within approved sources and rules." },
          { name: "Accounting & Billing AI", responsibility: "Financial data", description: "Participates when the process requires an invoice, payment status or accounting validation within its scope.", employeeKey: "accounting-billing" },
        ],
        workflowTitle: "How the team works",
        workflowIntro: "Example: an email request requires a data update, supporting documents and an invoice review.",
        workflow: [
          { title: "1. Classify intake", text: "The email role identifies the subject, preserves the thread and creates a task with minimum sufficient context." },
          { title: "2. Verify requirements", text: "Administration checks which fields, documents or approvals are missing before changing records." },
          { title: "3. Gather documentation", text: "Documentation searches permitted sources, identifies missing evidence and avoids substituting documents with inference." },
          { title: "4. Coordinate financial data", text: "If an invoice or payment is involved, Billing validates the relevant part and returns a structured result." },
          { title: "5. Update and close", text: "Administration performs permitted changes, requests approval when required and leaves a clear status and audit trail." },
        ],
        systemsTitle: "Typical systems",
        systemsIntro: "The team should work on authoritative sources rather than disconnected copies when a system of record exists.",
        systems: ["Email", "Document management", "ERP", "CRM", "Billing", "Calendar", "Forms", "Signature / approval", "Storage", "Internal APIs"],
        controlsTitle: "Human control points",
        controlsIntro: "Administrative automation needs identity, authorization and data-quality controls.",
        controls: [
          "Sensitive changes to master data or third-party information.",
          "Incomplete, contradictory or unverifiable documentation.",
          "Approvals, signatures or commitments the organization reserves to people.",
          "Financial operations outside Billing's defined scope and thresholds.",
        ],
        metricsTitle: "What to measure",
        metricsIntro: "Metrics should show whether the process improves without hiding rework or exceptions.",
        metrics: ["Cycle time per request", "Requests waiting for documents", "Manual touches", "Data errors detected", "Response SLA", "Cases escalated"],
        useCasesTitle: "Use cases",
        useCases: [
          { title: "Supplier onboarding or update", text: "Collects data and documents, identifies gaps and prepares the record for review or an authorized update." },
          { title: "Internal email request", text: "Turns a conversation into a traceable task and hands it to the right role with sufficient context." },
          { title: "Incomplete case", text: "Detects missing evidence, prepares the request and avoids closing the case before required documentation arrives." },
          { title: "Invoice tied to a process", text: "Separates administrative validation from the accounting portion and combines both results before closure." },
        ],
        limitsTitle: "Realistic limits",
        limits: [
          "It does not automatically turn every email into a valid action.",
          "It must not change master data without sufficient identity, permissions and rules.",
          "It does not replace signatures, authorizations or legal controls that must remain human.",
          "OCR, signature, vision or advanced extraction are optional capabilities based on process need.",
          "Email Manager and Documentation are catalog roles that require adaptation before being considered a concrete deployment.",
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { question: "Can it read attached documents?", answer: "It can be designed with document or OCR capabilities when the process needs them, but those capabilities are not universal and should not be enabled without need." },
          { question: "Can it update the ERP?", answer: "Yes when an approved integration exists and the field or action is within its permissions. Sensitive changes can require approval." },
          { question: "How does it avoid duplicates?", answer: "The process must define keys, authoritative sources and matching rules. When identity is unreliable, it should stop and escalate." },
          { question: "Can it coordinate with Billing?", answer: "Yes. A process can hand the financial portion to the specialist role and recover the result without granting unnecessary financial access to Administration." },
        ],
        ctaEyebrow: "DESIGN YOUR BACK OFFICE",
        ctaTitle: "Choose a repetitive process that currently depends on email, documents and several manual updates.",
        ctaText: "We map inputs, sources, permissions, approvals and output to build a controlled first workflow.",
        ctaPrimary: "Design an Administration AI Team",
        ctaSecondary: "View all teams",
      },
    },
  },
  {
    key: "travel",
    locales: {
      es: {
        slug: "turismo",
        name: "Equipo IA de Turismo",
        shortName: "Turismo",
        seoTitle: "Equipo IA para Turismo y Reservas | IA Empleado",
        seoDescription: "Cómo Agente de Viajes, Reservas, Atención, Administración y Facturación pueden coordinar consultas y reservas bajo políticas y supervisión humana.",
        eyebrow: "EQUIPO IA · TURISMO",
        statusLabel: "Modelo de equipo de referencia",
        heroTitle: "Conecta consulta, propuesta, reserva, documentación y cobro sin romper la experiencia del viajero.",
        heroDescription: "El Equipo IA de Turismo representa un flujo donde varios roles especializados comparten tareas y contexto autorizado desde la primera consulta hasta la gestión de una reserva y su seguimiento.",
        outcomeLabel: "Resultado que coordina",
        outcome: "Solicitudes de viaje encaminadas desde consulta y disponibilidad hasta reserva, documentación, facturación y soporte, con excepciones escaladas.",
        problemTitle: "El problema: una reserva mezcla servicio, proveedores, fechas, documentos y dinero",
        problemBody: "Turismo concentra muchos handoffs: interpretar necesidades, consultar disponibilidad, preparar opciones, registrar viajeros, confirmar servicios, coordinar proveedores, gestionar pagos y responder cambios. El equipo organiza el recorrido, pero no inventa disponibilidad ni compromete servicios que un proveedor o sistema no ha confirmado.",
        membersTitle: "Quién participa",
        membersIntro: "La composición de referencia cubre cinco funciones habituales en una operación de viajes o reservas.",
        members: [
          { name: "Agente de Viajes IA", responsibility: "Consulta y propuesta", description: "Interpreta necesidades, estructura opciones y prepara información usando fuentes y proveedores autorizados." },
          { name: "Reservas IA", responsibility: "Disponibilidad y booking", description: "Coordina disponibilidad, opciones, localizadores y estados de reserva según integraciones y reglas existentes." },
          { name: "Atención al Cliente IA", responsibility: "Comunicación y soporte", description: "Mantiene el hilo con el viajero y coordina incidencias o cambios con los roles adecuados.", employeeKey: "customer-support" },
          { name: "Administrativo IA", responsibility: "Datos y documentación", description: "Gestiona registros, datos del viajero y tareas documentales dentro del alcance permitido.", employeeKey: "administrative" },
          { name: "Contabilidad y Facturación IA", responsibility: "Cobros y facturación", description: "Valida estados económicos, facturas y tareas asociadas sin recibir autoridad financiera ilimitada.", employeeKey: "accounting-billing" },
        ],
        workflowTitle: "Cómo trabaja el equipo",
        workflowIntro: "Ejemplo: una persona solicita un viaje, compara opciones, confirma y después necesita una modificación.",
        workflow: [
          { title: "1. Estructura la solicitud", text: "El Agente de Viajes convierte preferencias y restricciones en criterios claros y pide información faltante." },
          { title: "2. Consulta disponibilidad", text: "Reservas utiliza fuentes autorizadas y distingue una opción consultada de una confirmación real." },
          { title: "3. Prepara y confirma", text: "La propuesta reúne condiciones relevantes; una confirmación solo continúa cuando sistemas, proveedor y política permiten reservar." },
          { title: "4. Completa administración", text: "Datos, documentos, factura y estado de pago se entregan a los roles correspondientes con el mínimo contexto necesario." },
          { title: "5. Atiende cambios", text: "Soporte conserva la historia, consulta reglas y escalados y coordina la modificación sin prometer lo que aún no está confirmado." },
        ],
        systemsTitle: "Sistemas habituales",
        systemsIntro: "Las fuentes dependen del modelo de negocio: agencia, DMC, hotel, operador, plataforma de actividades u otro entorno de reservas.",
        systems: ["Motor de reservas", "CRM", "Email / mensajería", "Proveedores / APIs", "ERP", "Facturación", "Estado de pago", "Gestor documental", "Calendario", "Reporting"],
        controlsTitle: "Puntos de control humano",
        controlsIntro: "Disponibilidad, precio, cambios y cobros pueden tener consecuencias contractuales y económicas.",
        controls: [
          "Excepciones de precio, condiciones, cancelación o penalización.",
          "Confirmaciones que no estén respaldadas por el proveedor o sistema autoritativo.",
          "Cambios relevantes de pasajero, fechas, servicios o importes fuera de reglas.",
          "Reembolsos, cobros o decisiones sensibles que superen los permisos definidos.",
        ],
        metricsTitle: "Qué medir",
        metricsIntro: "La medición debe separar velocidad comercial de calidad y errores operativos.",
        metrics: ["Tiempo hasta primera propuesta", "Tiempo hasta confirmar disponibilidad", "Handoffs por reserva", "Casos pendientes de datos", "Errores o retrabajo", "Tiempo de resolución de cambios"],
        useCasesTitle: "Casos de uso",
        useCases: [
          { title: "Solicitud de viaje", text: "Recoge requisitos, consulta fuentes permitidas y prepara opciones con condiciones visibles." },
          { title: "Reserva confirmada", text: "Distribuye datos y tareas administrativas necesarias manteniendo localizador, fechas y viajeros consistentes." },
          { title: "Cambio de fecha", text: "Consulta condiciones y disponibilidad y escala cuando la modificación implica penalización o excepción." },
          { title: "Incidencia durante el viaje", text: "Atención recupera contexto y coordina proveedor, reserva o administración sin obligar al viajero a reconstruir todo el caso." },
        ],
        limitsTitle: "Límites realistas",
        limits: [
          "No inventa disponibilidad, precio, condiciones ni confirmaciones de proveedor.",
          "No debe tratar una consulta de disponibilidad como reserva confirmada.",
          "Pagos, devoluciones y penalizaciones necesitan reglas y permisos explícitos.",
          "La integración depende de motores, proveedores, APIs y procesos concretos de cada empresa.",
          "Agente de Viajes y Reservas son perfiles de catálogo y requieren adaptación antes de presentarse como una implantación específica.",
        ],
        faqTitle: "Preguntas frecuentes",
        faq: [
          { question: "¿Puede reservar automáticamente?", answer: "Puede diseñarse un flujo de reserva cuando existe una integración fiable y permisos explícitos, pero una consulta no se convierte en confirmación hasta que el sistema o proveedor autoritativo la respalda." },
          { question: "¿Puede trabajar con varios proveedores?", answer: "Sí como arquitectura, siempre que cada integración y regla de normalización se implemente para el entorno concreto. No se presupone compatibilidad universal." },
          { question: "¿Qué ocurre con cambios y cancelaciones?", answer: "El equipo consulta condiciones y estado, prepara el siguiente paso y escala cuando existen penalizaciones, excepciones o autoridad económica reservada a personas." },
          { question: "¿Comparte datos de viajeros con todos los roles?", answer: "No debería. Cada handoff debe limitar el contexto a lo necesario y respetar permisos y políticas de datos." },
        ],
        ctaEyebrow: "DISEÑA TU OPERACIÓN DE VIAJES",
        ctaTitle: "Empieza por un flujo concreto: consulta, reserva, documentación o cambios.",
        ctaText: "Mapeamos proveedores, sistemas, datos, condiciones y puntos de aprobación para definir una primera composición útil.",
        ctaPrimary: "Diseñar un equipo de Turismo",
        ctaSecondary: "Ver todos los equipos",
      },
      en: {
        slug: "travel",
        name: "Travel AI Team",
        shortName: "Travel",
        seoTitle: "AI Team for Travel and Reservations | IA Empleado",
        seoDescription: "How Travel Agent, Reservations, Support, Administration and Billing roles can coordinate inquiries and bookings under policies and human oversight.",
        eyebrow: "AI TEAM · TRAVEL",
        statusLabel: "Reference team model",
        heroTitle: "Connect inquiry, proposal, booking, documentation and billing without breaking the traveler experience.",
        heroDescription: "The Travel AI Team represents a flow where specialized roles share tasks and authorized context from the first inquiry through booking management and follow-up.",
        outcomeLabel: "Outcome it coordinates",
        outcome: "Travel requests routed from inquiry and availability through booking, documentation, billing and support, with exceptions escalated.",
        problemTitle: "The problem: one booking combines service, suppliers, dates, documents and money",
        problemBody: "Travel operations contain many handoffs: interpreting needs, checking availability, preparing options, registering travelers, confirming services, coordinating suppliers, managing payments and answering changes. The team organizes the journey but does not invent availability or commit services a supplier or system has not confirmed.",
        membersTitle: "Who participates",
        membersIntro: "The reference composition covers five common functions in a travel or reservation operation.",
        members: [
          { name: "Travel Agent AI", responsibility: "Inquiry and proposal", description: "Interprets needs, structures options and prepares information using authorized sources and suppliers." },
          { name: "Reservations AI", responsibility: "Availability and booking", description: "Coordinates availability, options, locators and reservation states according to existing integrations and rules." },
          { name: "Customer Support AI", responsibility: "Communication and support", description: "Keeps the traveler thread and coordinates incidents or changes with the appropriate roles.", employeeKey: "customer-support" },
          { name: "Administrative AI", responsibility: "Data and documentation", description: "Handles traveler records, data and document tasks within the permitted scope.", employeeKey: "administrative" },
          { name: "Accounting & Billing AI", responsibility: "Payments and billing", description: "Validates financial states, invoices and related tasks without receiving unlimited financial authority.", employeeKey: "accounting-billing" },
        ],
        workflowTitle: "How the team works",
        workflowIntro: "Example: a person requests a trip, compares options, confirms and later needs a modification.",
        workflow: [
          { title: "1. Structure the request", text: "The Travel Agent turns preferences and constraints into clear criteria and asks for missing information." },
          { title: "2. Check availability", text: "Reservations uses authorized sources and distinguishes a checked option from a real confirmation." },
          { title: "3. Prepare and confirm", text: "The proposal surfaces relevant terms; confirmation continues only when systems, supplier and policy allow booking." },
          { title: "4. Complete administration", text: "Data, documents, invoice and payment status are handed to the relevant roles with minimum necessary context." },
          { title: "5. Handle changes", text: "Support preserves history, checks rules and escalations and coordinates the modification without promising what is not yet confirmed." },
        ],
        systemsTitle: "Typical systems",
        systemsIntro: "Sources depend on the business model: agency, DMC, hotel, operator, activities platform or another reservation environment.",
        systems: ["Booking engine", "CRM", "Email / messaging", "Suppliers / APIs", "ERP", "Billing", "Payment status", "Document management", "Calendar", "Reporting"],
        controlsTitle: "Human control points",
        controlsIntro: "Availability, price, changes and payments can have contractual and financial consequences.",
        controls: [
          "Pricing, terms, cancellation or penalty exceptions.",
          "Confirmations not backed by the authoritative supplier or system.",
          "Consequential passenger, date, service or amount changes outside rules.",
          "Refunds, charges or sensitive decisions above defined permissions.",
        ],
        metricsTitle: "What to measure",
        metricsIntro: "Measurement should separate commercial speed from operating quality and errors.",
        metrics: ["Time to first proposal", "Time to availability confirmation", "Handoffs per booking", "Cases waiting for data", "Errors or rework", "Change-resolution time"],
        useCasesTitle: "Use cases",
        useCases: [
          { title: "Travel inquiry", text: "Collects requirements, checks permitted sources and prepares options with visible conditions." },
          { title: "Confirmed booking", text: "Distributes required data and administrative tasks while keeping locator, dates and travelers consistent." },
          { title: "Date change", text: "Checks terms and availability and escalates when the modification involves a penalty or exception." },
          { title: "Incident during travel", text: "Support retrieves context and coordinates supplier, reservation or administration without forcing the traveler to rebuild the case." },
        ],
        limitsTitle: "Realistic limits",
        limits: [
          "It does not invent supplier availability, price, terms or confirmation.",
          "It must not treat an availability check as a confirmed booking.",
          "Payments, refunds and penalties need explicit rules and permissions.",
          "Integration depends on the specific booking engines, suppliers, APIs and processes of each company.",
          "Travel Agent and Reservations are catalog roles that require adaptation before being presented as a specific deployment.",
        ],
        faqTitle: "Frequently asked questions",
        faq: [
          { question: "Can it book automatically?", answer: "A booking flow can be designed when a reliable integration and explicit permissions exist, but a query does not become a confirmation until the authoritative system or supplier supports it." },
          { question: "Can it work with multiple suppliers?", answer: "Architecturally yes, provided each integration and normalization rule is implemented for the specific environment. Universal compatibility is not assumed." },
          { question: "What happens with changes and cancellations?", answer: "The team checks terms and state, prepares the next step and escalates when penalties, exceptions or financial authority reserved to people are involved." },
          { question: "Does it share traveler data with every role?", answer: "It should not. Each handoff should limit context to what is necessary and respect data permissions and policies." },
        ],
        ctaEyebrow: "DESIGN YOUR TRAVEL OPERATION",
        ctaTitle: "Start with one concrete flow: inquiry, booking, documentation or changes.",
        ctaText: "We map suppliers, systems, data, conditions and approval points to define a useful first composition.",
        ctaPrimary: "Design a Travel AI Team",
        ctaSecondary: "View all teams",
      },
    },
  },
];

export function getTeamIndexContent(locale: Locale) {
  return teamIndexContent[locale];
}

export function getTeamRecords() {
  return teamRecords;
}

export function getLocalizedTeams(locale: Locale) {
  return teamRecords.map((team) => ({ key: team.key, ...team.locales[locale] }));
}

export function getTeamBySlug(locale: Locale, slug: string) {
  const team = teamRecords.find((record) => record.locales[locale].slug === slug);
  return team ? { key: team.key, detail: team.locales[locale] } : undefined;
}

export function teamIndexPath(locale: Locale) {
  return locale === "es" ? "/equipos-ia" : "/en/ai-teams";
}

export function teamDetailPath(key: TeamKey, locale: Locale) {
  const team = teamRecords.find((record) => record.key === key);
  if (!team) throw new Error(`Unknown team key: ${key}`);
  return `${teamIndexPath(locale)}/${team.locales[locale].slug}`;
}

export function alternateTeamPath(key: TeamKey, locale: Locale) {
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  return teamDetailPath(key, otherLocale);
}

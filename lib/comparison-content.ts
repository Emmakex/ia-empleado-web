import type { Locale } from "./i18n";

export type ComparisonKey = "chatbot" | "ai-agent" | "rpa" | "traditional-automation" | "ai-copilot";

export type ComparisonDimension = {
  label: string;
  employee: string;
  alternative: string;
};

export type ComparisonRecord = {
  key: ComparisonKey;
  slugs: Record<Locale, string>;
  title: Record<Locale, string>;
  alternativeName: Record<Locale, string>;
  seoTitle: Record<Locale, string>;
  seoDescription: Record<Locale, string>;
  intro: Record<Locale, string>;
  shortAnswer: Record<Locale, string>;
  dimensions: Record<Locale, ComparisonDimension[]>;
  chooseEmployeeWhen: Record<Locale, string[]>;
  chooseAlternativeWhen: Record<Locale, string[]>;
  combineWhen: Record<Locale, string[]>;
  faq: Record<Locale, { question: string; answer: string }[]>;
};

export const comparisonRecords: ComparisonRecord[] = [
  {
    key: "chatbot",
    slugs: { es: "chatbot", en: "chatbot" },
    title: { es: "Empleado IA vs chatbot", en: "AI Employee vs chatbot" },
    alternativeName: { es: "Chatbot", en: "Chatbot" },
    seoTitle: { es: "Empleado IA vs chatbot: diferencias, usos y cuándo elegir cada uno", en: "AI Employee vs chatbot: differences, use cases and when to choose each" },
    seoDescription: { es: "Comparativa práctica entre un Empleado IA y un chatbot: alcance, integración, autonomía, supervisión, trazabilidad y casos donde conviene cada enfoque.", en: "A practical comparison of an AI Employee and a chatbot across scope, integrations, autonomy, supervision, traceability and best-fit use cases." },
    intro: { es: "Un chatbot prioriza la conversación. Un Empleado IA se diseña alrededor de una función operativa, tareas, sistemas, reglas y handoffs. Los dos enfoques pueden solaparse y también convivir.", en: "A chatbot is primarily conversation-oriented. An AI Employee is designed around an operational role, tasks, systems, rules and handoffs. The two approaches can overlap and can also work together." },
    shortAnswer: { es: "Si el objetivo principal es responder preguntas o guiar a una persona por conversación, un chatbot puede ser suficiente. Si el objetivo es coordinar trabajo operativo entre sistemas, roles y controles, el modelo de Empleado IA suele encajar mejor.", en: "If the main goal is answering questions or guiding a person through a conversation, a chatbot may be enough. If the goal is coordinating operational work across systems, roles and controls, the AI Employee model is usually a better fit." },
    dimensions: {
      es: [
        { label: "Orientación principal", employee: "Trabajo operativo definido por rol y responsabilidad.", alternative: "Conversación, atención o autoservicio guiado." },
        { label: "Alcance", employee: "Puede abarcar varios pasos y handoffs dentro de un proceso.", alternative: "Suele concentrarse en la interacción y resolución conversacional." },
        { label: "Integraciones", employee: "Se plantea alrededor de herramientas y sistemas necesarios para ejecutar el trabajo.", alternative: "Puede integrar sistemas, pero no todos los chatbots necesitan hacerlo." },
        { label: "Supervisión", employee: "Escala acciones sensibles o excepciones según políticas explícitas.", alternative: "Normalmente escala la conversación o el caso a una persona." },
        { label: "Trazabilidad", employee: "Conviene registrar decisiones, acciones, handoffs y aprobaciones.", alternative: "La trazabilidad suele centrarse en conversaciones, intents y tickets." },
        { label: "Forma de uso", employee: "Puede trabajar en segundo plano además de interactuar con personas.", alternative: "Normalmente requiere una interfaz conversacional como punto de entrada." },
      ],
      en: [
        { label: "Primary orientation", employee: "Operational work defined by role and responsibility.", alternative: "Conversation, support or guided self-service." },
        { label: "Scope", employee: "Can span several steps and handoffs inside a process.", alternative: "Usually focuses on interaction and conversational resolution." },
        { label: "Integrations", employee: "Designed around the tools and systems needed to do the work.", alternative: "Can integrate systems, but not every chatbot needs to." },
        { label: "Supervision", employee: "Escalates sensitive actions or exceptions according to explicit policies.", alternative: "Usually escalates the conversation or case to a person." },
        { label: "Traceability", employee: "Should record decisions, actions, handoffs and approvals.", alternative: "Traceability usually centers on conversations, intents and tickets." },
        { label: "Usage pattern", employee: "Can work in the background as well as interact with people.", alternative: "Usually requires a conversational interface as the entry point." },
      ],
    },
    chooseEmployeeWhen: { es: ["Hay tareas posteriores a la conversación que deben ejecutarse o coordinarse.", "Intervienen varios sistemas, departamentos o roles.", "Necesitas controles de autorización, aprobación o auditoría."], en: ["There is follow-up work that must be executed or coordinated after the conversation.", "Several systems, departments or roles are involved.", "You need authorization, approval or audit controls."] },
    chooseAlternativeWhen: { es: ["El problema se resuelve principalmente informando, orientando o recogiendo datos.", "La conversación es el producto principal y el flujo posterior es mínimo.", "Quieres una primera capa de autoservicio con poco alcance operativo."], en: ["The problem is mainly solved by informing, guiding or collecting information.", "Conversation is the main product and downstream workflow is minimal.", "You want a first self-service layer with limited operational scope."] },
    combineWhen: { es: ["El chatbot puede ser la interfaz de entrada y un Empleado IA ejecutar el trabajo posterior.", "Una conversación puede abrir un caso y derivarlo al equipo digital adecuado."], en: ["The chatbot can be the front door while an AI Employee performs the downstream work.", "A conversation can open a case and route it to the right digital team."] },
    faq: { es: [{ question: "¿Un Empleado IA necesita chat?", answer: "No. Puede tener una interfaz conversacional, pero también puede activarse por eventos, colas, correo, formularios o procesos internos." }, { question: "¿Un chatbot puede ejecutar acciones?", answer: "Sí, algunos pueden hacerlo mediante herramientas e integraciones. La diferencia aquí no es técnica absoluta, sino de diseño: conversación como centro frente a trabajo operativo gobernado como centro." }], en: [{ question: "Does an AI Employee need chat?", answer: "No. It can expose a conversational interface, but it can also be triggered by events, queues, email, forms or internal processes." }, { question: "Can a chatbot perform actions?", answer: "Yes. Some can use tools and integrations. The distinction here is not an absolute technical boundary; it is a product-design difference between conversation-first and governed operational work." }] },
  },
  {
    key: "ai-agent",
    slugs: { es: "agente-ia", en: "ai-agent" },
    title: { es: "Empleado IA vs agente IA", en: "AI Employee vs AI agent" },
    alternativeName: { es: "Agente IA", en: "AI agent" },
    seoTitle: { es: "Empleado IA vs agente IA: qué cambia en el enfoque", en: "AI Employee vs AI agent: what changes in the approach" },
    seoDescription: { es: "Comparativa entre Empleado IA y agente IA: solapamientos, diferencias de diseño, gobernanza, identidad de rol, handoffs y uso empresarial.", en: "Compare AI Employees and AI agents across overlap, role design, governance, handoffs and enterprise use." },
    intro: { es: "La categoría técnica de agente IA puede incluir sistemas capaces de planificar, usar herramientas y actuar. Empleado IA no pretende sustituir esa categoría: la organiza alrededor de un puesto, responsabilidades, permisos, supervisión y colaboración empresarial.", en: "The technical category of AI agent can include systems that plan, use tools and act. AI Employee does not replace that category; it frames it around a job, responsibilities, permissions, supervision and business collaboration." },
    shortAnswer: { es: "Un agente IA describe principalmente un patrón técnico de comportamiento. Empleado IA describe cómo empaquetar capacidades agentivas dentro de un rol empresarial gobernado y comprensible para la organización.", en: "An AI agent mainly describes a technical behavior pattern. AI Employee describes how agentic capabilities are packaged inside a governed business role that the organization can understand and manage." },
    dimensions: {
      es: [
        { label: "Unidad de diseño", employee: "Puesto, responsabilidad y límites de autoridad.", alternative: "Capacidad técnica o agente que persigue objetivos." },
        { label: "Gobernanza", employee: "Permisos, políticas, aprobaciones y escalados son parte del diseño del rol.", alternative: "Depende de la arquitectura concreta del agente." },
        { label: "Identidad organizativa", employee: "Nombre de función, tareas, owner humano y relaciones con otros roles.", alternative: "Puede existir sin una identidad organizativa explícita." },
        { label: "Colaboración", employee: "Handoffs entre especialistas son un concepto de primer nivel.", alternative: "Puede colaborar con otros agentes, pero no es obligatorio." },
        { label: "Evaluación", employee: "Se evalúa por resultados del puesto, controles y calidad operativa.", alternative: "Suele evaluarse por capacidad, éxito de tareas y comportamiento del agente." },
        { label: "Comunicación interna", employee: "Usa lenguaje que negocio, operaciones y compliance pueden entender.", alternative: "Puede requerir una descripción más técnica." },
      ],
      en: [
        { label: "Design unit", employee: "Job, responsibility and authority boundaries.", alternative: "Technical capability or agent pursuing goals." },
        { label: "Governance", employee: "Permissions, policies, approvals and escalation are part of role design.", alternative: "Depends on the specific agent architecture." },
        { label: "Organizational identity", employee: "Function name, tasks, human owner and relationships with other roles.", alternative: "Can exist without an explicit organizational identity." },
        { label: "Collaboration", employee: "Handoffs between specialists are a first-class concept.", alternative: "Can collaborate with other agents, but does not have to." },
        { label: "Evaluation", employee: "Measured by job outcomes, controls and operational quality.", alternative: "Often measured by capability, task success and agent behavior." },
        { label: "Internal communication", employee: "Uses language business, operations and compliance can understand.", alternative: "May require a more technical description." },
      ],
    },
    chooseEmployeeWhen: { es: ["Necesitas convertir capacidades agentivas en un rol con owner, límites y responsabilidades.", "Quieres diseñar equipos digitales con handoffs y controles visibles.", "Debes explicar claramente a negocio quién hace qué y con qué autoridad."], en: ["You need to turn agentic capabilities into a role with ownership, limits and responsibilities.", "You want digital teams with visible handoffs and controls.", "You must clearly explain to business stakeholders who does what and with what authority."] },
    chooseAlternativeWhen: { es: ["Estás prototipando una capacidad técnica concreta sin necesidad de modelarla como puesto.", "El agente es un componente interno de una arquitectura mayor.", "La prioridad es experimentar con planificación, herramientas o autonomía técnica."], en: ["You are prototyping a specific technical capability without needing to model it as a job.", "The agent is an internal component of a larger architecture.", "The priority is experimenting with planning, tools or technical autonomy."] },
    combineWhen: { es: ["Un Empleado IA puede estar implementado internamente mediante uno o varios agentes.", "La capa de rol y gobernanza puede envolver capacidades agentivas sin ocultar sus límites."], en: ["An AI Employee can be implemented internally using one or more agents.", "The role and governance layer can wrap agentic capabilities without hiding their limits."] },
    faq: { es: [{ question: "¿Empleado IA y agente IA son categorías incompatibles?", answer: "No. Pueden describir capas distintas del mismo sistema: agente como patrón técnico y Empleado IA como producto/rol organizativo." }, { question: "¿Un Empleado IA siempre es autónomo?", answer: "No. Puede trabajar de forma asistida, semiautónoma o con aprobación humana obligatoria según la tarea y el riesgo." }], en: [{ question: "Are AI Employees and AI agents incompatible categories?", answer: "No. They can describe different layers of the same system: agent as a technical pattern and AI Employee as the organizational product/role." }, { question: "Is an AI Employee always autonomous?", answer: "No. It can work in assisted, semi-autonomous or approval-required modes depending on the task and risk." }] },
  },
  {
    key: "rpa",
    slugs: { es: "rpa", en: "rpa" },
    title: { es: "Empleado IA vs RPA", en: "AI Employee vs RPA" },
    alternativeName: { es: "RPA", en: "RPA" },
    seoTitle: { es: "Empleado IA vs RPA: diferencias y cuándo combinar ambos", en: "AI Employee vs RPA: differences and when to combine them" },
    seoDescription: { es: "Compara Empleado IA y RPA por determinismo, variabilidad de entradas, integración, supervisión y mantenimiento.", en: "Compare AI Employees and RPA across determinism, input variability, integration, supervision and maintenance." },
    intro: { es: "RPA destaca cuando el proceso es repetitivo, estable y puede expresarse como pasos deterministas sobre interfaces o sistemas. Un Empleado IA encaja mejor cuando hay lenguaje natural, excepciones, contexto y decisiones que deben gobernarse.", en: "RPA is strong when a process is repetitive, stable and expressible as deterministic steps across interfaces or systems. An AI Employee is a better fit when natural language, exceptions, context and governed decisions matter." },
    shortAnswer: { es: "No son sustitutos directos. RPA puede ser excelente para pasos deterministas; un Empleado IA puede coordinar trabajo más variable y, cuando tiene sentido, invocar automatizaciones RPA como herramienta.", en: "They are not direct substitutes. RPA can be excellent for deterministic steps; an AI Employee can coordinate more variable work and, when appropriate, invoke RPA automations as tools." },
    dimensions: {
      es: [
        { label: "Tipo de proceso", employee: "Variable, contextual y con excepciones controladas.", alternative: "Repetitivo, estable y fuertemente definido." },
        { label: "Entradas", employee: "Puede trabajar con lenguaje natural y datos semiestructurados.", alternative: "Funciona mejor con entradas y pantallas predecibles." },
        { label: "Determinismo", employee: "Puede incorporar razonamiento, políticas y revisión humana.", alternative: "Busca repetir secuencias definidas de forma consistente." },
        { label: "Cambios de proceso", employee: "Puede tolerar cierta variación si los límites están bien diseñados.", alternative: "Cambios de UI o flujo pueden requerir mantenimiento del robot." },
        { label: "Supervisión", employee: "Escalado y aprobaciones forman parte del flujo.", alternative: "La supervisión suele centrarse en excepciones técnicas y fallos del robot." },
        { label: "Combinación", employee: "Puede orquestar cuándo usar automatizaciones deterministas.", alternative: "Puede actuar como herramienta ejecutora dentro de un proceso mayor." },
      ],
      en: [
        { label: "Process type", employee: "Variable, contextual and controlled-exception work.", alternative: "Repetitive, stable and strongly defined work." },
        { label: "Inputs", employee: "Can work with natural language and semi-structured data.", alternative: "Works best with predictable inputs and interfaces." },
        { label: "Determinism", employee: "Can include reasoning, policy checks and human review.", alternative: "Aims to repeat defined sequences consistently." },
        { label: "Process changes", employee: "Can tolerate some variation if boundaries are well designed.", alternative: "UI or flow changes may require robot maintenance." },
        { label: "Supervision", employee: "Escalation and approvals can be built into the workflow.", alternative: "Supervision often centers on technical exceptions and robot failures." },
        { label: "Combination", employee: "Can orchestrate when deterministic automations should be used.", alternative: "Can act as an execution tool inside a larger process." },
      ],
    },
    chooseEmployeeWhen: { es: ["El proceso incluye correos, documentos, texto libre o excepciones frecuentes.", "Necesitas interpretar contexto antes de decidir el siguiente paso.", "Existen aprobaciones o handoffs entre personas y sistemas."], en: ["The process includes email, documents, free text or frequent exceptions.", "You need to interpret context before choosing the next step.", "Approvals or handoffs exist across people and systems."] },
    chooseAlternativeWhen: { es: ["Los pasos están muy definidos y cambian poco.", "La tarea consiste sobre todo en mover datos o pulsar secuencias repetibles.", "Quieres automatizar un tramo estable sin añadir una capa de razonamiento."], en: ["The steps are tightly defined and change little.", "The task is mostly moving data or performing repeatable sequences.", "You want to automate a stable segment without adding a reasoning layer."] },
    combineWhen: { es: ["El Empleado IA interpreta el caso y decide qué robot o flujo determinista debe ejecutarse.", "RPA ejecuta un tramo legacy mientras el Empleado IA mantiene contexto y supervisión."], en: ["The AI Employee interprets the case and selects which robot or deterministic flow should run.", "RPA executes a legacy segment while the AI Employee maintains context and supervision."] },
    faq: { es: [{ question: "¿RPA queda obsoleto con IA?", answer: "No. Los pasos deterministas y estables siguen siendo buenos candidatos para automatización clásica o RPA." }, { question: "¿Un Empleado IA puede usar RPA?", answer: "Sí, conceptualmente puede usar una automatización RPA como herramienta si esa integración está implementada y gobernada." }], en: [{ question: "Does AI make RPA obsolete?", answer: "No. Stable deterministic steps remain strong candidates for classic automation or RPA." }, { question: "Can an AI Employee use RPA?", answer: "Yes. Conceptually it can use an RPA automation as a tool when that integration is implemented and governed." }] },
  },
  {
    key: "traditional-automation",
    slugs: { es: "automatizacion-tradicional", en: "traditional-automation" },
    title: { es: "Empleado IA vs automatización tradicional", en: "AI Employee vs traditional automation" },
    alternativeName: { es: "Automatización tradicional", en: "Traditional automation" },
    seoTitle: { es: "Empleado IA vs automatización tradicional: qué automatizar con cada enfoque", en: "AI Employee vs traditional automation: what to automate with each approach" },
    seoDescription: { es: "Guía para elegir entre Empleado IA y automatización tradicional según variabilidad, reglas, lenguaje, supervisión y coste de mantenimiento.", en: "A guide to choosing between AI Employees and traditional automation based on variability, rules, language, supervision and maintenance." },
    intro: { es: "La automatización tradicional es ideal cuando una regla puede expresarse de forma clara y determinista. Empleado IA aporta valor cuando el trabajo necesita interpretar información variable, mantener contexto y saber cuándo pedir ayuda humana.", en: "Traditional automation is ideal when a rule can be expressed clearly and deterministically. AI Employee adds value when work requires interpreting variable information, maintaining context and knowing when to involve a person." },
    shortAnswer: { es: "Automatiza con reglas lo que pueda resolverse con reglas. Usa IA donde la variabilidad, el lenguaje o las excepciones hagan insuficiente una automatización puramente determinista.", en: "Automate with rules what can be solved with rules. Use AI where variability, language or exceptions make purely deterministic automation insufficient." },
    dimensions: {
      es: [
        { label: "Lógica", employee: "Contextual y probabilística dentro de límites definidos.", alternative: "Reglas explícitas, condiciones y transformaciones deterministas." },
        { label: "Previsibilidad", employee: "Adecuado cuando no todas las entradas son idénticas.", alternative: "Excelente cuando entradas y resultados esperados están bien definidos." },
        { label: "Explicabilidad operativa", employee: "Debe mostrar contexto, decisiones, políticas y escalados.", alternative: "La ruta lógica suele ser directamente inspeccionable en reglas o código." },
        { label: "Coste de ejecución", employee: "Puede implicar inferencia y controles adicionales.", alternative: "Suele ser muy eficiente para reglas simples y repetitivas." },
        { label: "Mantenimiento", employee: "Requiere evaluar prompts/modelos/políticas además de integraciones.", alternative: "Requiere mantener código, reglas, APIs y cambios de proceso." },
        { label: "Mejor uso", employee: "Interpretación, clasificación, coordinación y excepciones.", alternative: "Cálculos, validaciones, sincronizaciones y flujos definidos." },
      ],
      en: [
        { label: "Logic", employee: "Contextual and probabilistic within defined boundaries.", alternative: "Explicit rules, conditions and deterministic transformations." },
        { label: "Predictability", employee: "Useful when inputs are not always identical.", alternative: "Excellent when inputs and expected outputs are well defined." },
        { label: "Operational explainability", employee: "Should expose context, decisions, policies and escalation.", alternative: "The logic path is often directly inspectable in rules or code." },
        { label: "Execution cost", employee: "May involve inference and additional controls.", alternative: "Often very efficient for simple repetitive rules." },
        { label: "Maintenance", employee: "Requires evaluating prompts/models/policies as well as integrations.", alternative: "Requires maintaining code, rules, APIs and process changes." },
        { label: "Best use", employee: "Interpretation, classification, coordination and exceptions.", alternative: "Calculations, validations, synchronization and defined workflows." },
      ],
    },
    chooseEmployeeWhen: { es: ["Las entradas cambian y contienen lenguaje o documentos no uniformes.", "No puedes describir todas las excepciones con reglas razonables.", "El sistema debe coordinar con personas cuando falta certeza o autoridad."], en: ["Inputs vary and contain language or non-uniform documents.", "You cannot reasonably encode every exception as rules.", "The system must coordinate with people when certainty or authority is missing."] },
    chooseAlternativeWhen: { es: ["La lógica es estable, exacta y fácil de expresar con código o reglas.", "El resultado debe ser completamente determinista.", "No necesitas interpretación semántica ni razonamiento contextual."], en: ["The logic is stable, exact and easy to express in code or rules.", "The result must be fully deterministic.", "You do not need semantic interpretation or contextual reasoning."] },
    combineWhen: { es: ["El Empleado IA interpreta y la automatización clásica ejecuta validaciones o cálculos exactos.", "Las reglas duras pueden funcionar como límites que el Empleado IA nunca debe saltarse."], en: ["The AI Employee interprets while classic automation performs exact validations or calculations.", "Hard rules can act as boundaries that the AI Employee must never bypass."] },
    faq: { es: [{ question: "¿Debería sustituir automatizaciones existentes por IA?", answer: "No por defecto. Si una automatización determinista funciona bien y es barata de mantener, normalmente conviene conservarla." }, { question: "¿Dónde aporta más IA?", answer: "En los tramos donde lenguaje, contexto, clasificación, priorización o excepciones hacen difícil mantener reglas exhaustivas." }], en: [{ question: "Should existing automations be replaced by AI?", answer: "Not by default. If a deterministic automation works well and is inexpensive to maintain, it is usually sensible to keep it." }, { question: "Where does AI add the most value?", answer: "In segments where language, context, classification, prioritization or exceptions make exhaustive rules hard to maintain." }] },
  },
  {
    key: "ai-copilot",
    slugs: { es: "copiloto-ia", en: "ai-copilot" },
    title: { es: "Empleado IA vs copiloto de IA", en: "AI Employee vs AI copilot" },
    alternativeName: { es: "Copiloto de IA", en: "AI copilot" },
    seoTitle: { es: "Empleado IA vs copiloto de IA: asistencia frente a delegación gobernada", en: "AI Employee vs AI copilot: assistance vs governed delegation" },
    seoDescription: { es: "Comparativa entre un Empleado IA y un copiloto de IA: quién inicia el trabajo, autonomía, responsabilidad humana, integración y casos adecuados.", en: "Compare AI Employees and AI copilots across initiation, autonomy, human responsibility, integrations and best-fit use cases." },
    intro: { es: "Un copiloto de IA normalmente ayuda a una persona mientras trabaja. Un Empleado IA se diseña para recibir y coordinar trabajo delegado dentro de límites concretos, manteniendo puntos de control humano cuando corresponde.", en: "An AI copilot typically assists a person while they work. An AI Employee is designed to receive and coordinate delegated work within defined boundaries, while preserving human control points where appropriate." },
    shortAnswer: { es: "Elige copiloto cuando la persona debe seguir siendo el operador principal en cada paso. Elige Empleado IA cuando quieres delegar una parte definida del proceso y que el sistema devuelva resultados, excepciones o solicitudes de aprobación.", en: "Choose a copilot when the person should remain the primary operator at every step. Choose an AI Employee when you want to delegate a defined part of the process and have the system return outcomes, exceptions or approval requests." },
    dimensions: {
      es: [
        { label: "Quién inicia", employee: "Puede activarse por eventos, colas, procesos o personas.", alternative: "Normalmente acompaña a una persona dentro de su herramienta de trabajo." },
        { label: "Rol humano", employee: "Supervisa, aprueba excepciones y conserva autoridad final.", alternative: "Opera activamente y decide cuándo aceptar o usar cada sugerencia." },
        { label: "Delegación", employee: "Puede asumir un tramo definido de trabajo de principio a fin.", alternative: "Asiste al usuario durante pasos que la persona sigue liderando." },
        { label: "Handoffs", employee: "Puede entregar trabajo a otros Empleados IA o personas.", alternative: "Suele devolver sugerencias, borradores o acciones al usuario actual." },
        { label: "Trabajo en segundo plano", employee: "Puede existir si el diseño y permisos lo permiten.", alternative: "No suele ser el patrón principal de un copiloto." },
        { label: "Control", employee: "Políticas y aprobaciones determinan qué puede delegarse.", alternative: "El control se apoya mucho en que la persona revise antes de actuar." },
      ],
      en: [
        { label: "Who initiates", employee: "Can be triggered by events, queues, processes or people.", alternative: "Usually accompanies a person inside their work tool." },
        { label: "Human role", employee: "Supervises, approves exceptions and retains final authority.", alternative: "Actively operates and decides when to accept or use each suggestion." },
        { label: "Delegation", employee: "Can own a defined segment of work end to end.", alternative: "Assists the user through steps the person continues to lead." },
        { label: "Handoffs", employee: "Can hand work to other AI Employees or people.", alternative: "Usually returns suggestions, drafts or actions to the current user." },
        { label: "Background work", employee: "Can exist when design and permissions allow it.", alternative: "Usually not the primary copilot pattern." },
        { label: "Control", employee: "Policies and approvals define what can be delegated.", alternative: "Control relies heavily on the person reviewing before acting." },
      ],
    },
    chooseEmployeeWhen: { es: ["Quieres delegar un proceso repetitivo con límites y resultados claros.", "El trabajo debe continuar aunque una persona no esté interactuando constantemente.", "Necesitas handoffs automáticos entre roles y sistemas con escalado humano."], en: ["You want to delegate a repetitive process with clear boundaries and outcomes.", "Work should continue without constant human interaction.", "You need automatic handoffs across roles and systems with human escalation."] },
    chooseAlternativeWhen: { es: ["La persona debe tomar cada decisión importante en tiempo real.", "El objetivo es acelerar redacción, análisis o búsqueda dentro del puesto actual.", "No quieres delegación operativa, solo asistencia contextual."], en: ["A person should make every important decision in real time.", "The goal is accelerating drafting, analysis or search inside the current job.", "You do not want operational delegation, only contextual assistance."] },
    combineWhen: { es: ["Una misma persona puede usar un copiloto mientras delega tareas repetitivas a Empleados IA.", "El copiloto puede explicar o revisar el trabajo producido por un equipo digital."], en: ["The same person can use a copilot while delegating repetitive work to AI Employees.", "The copilot can explain or review work produced by a digital team."] },
    faq: { es: [{ question: "¿Un Empleado IA elimina la necesidad de copilotos?", answer: "No. Son patrones complementarios: uno prioriza delegación gobernada y el otro asistencia directa a la persona." }, { question: "¿Cuál mantiene más control humano?", answer: "Ambos pueden diseñarse con alto control humano. La diferencia es dónde ocurre: en un copiloto la persona suele intervenir en cada paso; en un Empleado IA puede intervenir en puntos de control definidos." }], en: [{ question: "Does an AI Employee remove the need for copilots?", answer: "No. They are complementary patterns: one emphasizes governed delegation and the other direct human assistance." }, { question: "Which keeps more human control?", answer: "Both can be designed with strong human control. The difference is where it happens: a copilot usually keeps the person in each step, while an AI Employee can involve them at defined control points." }] },
  },
];

export const comparisonIndexContent = {
  es: {
    seoTitle: "Comparativas de Empleados IA: chatbot, agentes, RPA y copilotos",
    seoDescription: "Compara Empleados IA con chatbots, agentes IA, RPA, automatización tradicional y copilotos para elegir el enfoque adecuado por proceso.",
    eyebrow: "COMPARATIVAS",
    title: "No todo problema necesita el mismo tipo de automatización.",
    intro: "Estas comparativas no buscan declarar un ganador universal. Explican qué cambia entre enfoques y en qué contextos cada uno suele ser más adecuado.",
    methodologyTitle: "Cómo comparamos",
    methodology: ["Partimos del trabajo real que debe resolverse, no de la etiqueta tecnológica.", "Separamos tareas deterministas, asistencia humana, interpretación contextual y delegación.", "Valoramos integración, supervisión, trazabilidad, mantenimiento y riesgo operativo.", "Cuando dos enfoques se complementan, lo indicamos explícitamente."],
  },
  en: {
    seoTitle: "AI Employee comparisons: chatbots, agents, RPA and copilots",
    seoDescription: "Compare AI Employees with chatbots, AI agents, RPA, traditional automation and copilots to choose the right approach for each process.",
    eyebrow: "COMPARISONS",
    title: "Not every problem needs the same kind of automation.",
    intro: "These comparisons do not try to declare a universal winner. They explain what changes between approaches and where each one is usually the better fit.",
    methodologyTitle: "How we compare",
    methodology: ["We start from the real work to be solved, not the technology label.", "We separate deterministic tasks, human assistance, contextual interpretation and delegation.", "We evaluate integration, supervision, traceability, maintenance and operational risk.", "When two approaches complement each other, we say so explicitly."],
  },
} as const;

export function comparisonIndexPath(locale: Locale) {
  return locale === "es" ? "/comparativas" : "/en/comparisons";
}

export function comparisonDetailPath(key: ComparisonKey, locale: Locale) {
  const record = comparisonRecords.find((item) => item.key === key);
  if (!record) throw new Error(`Unknown comparison: ${key}`);
  return `${comparisonIndexPath(locale)}/${record.slugs[locale]}`;
}

export function getComparisonBySlug(slug: string, locale: Locale) {
  return comparisonRecords.find((item) => item.slugs[locale] === slug);
}

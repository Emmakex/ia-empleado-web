import { getDiscoveryFilterOptions, getDiscoveryProfiles, type DiscoveryProfileKey, type DiscoveryProfileView } from "./employee-discovery";
import type { Locale } from "./i18n";
import { getLocalizedTeams, teamDetailPath, type TeamKey } from "./team-content-engine";

export type BuilderSelection = {
  sectorId: string;
  problemIds: string[];
  departmentIds: string[];
  systemIds: string[];
};

type LocalizedOption = { value: string; label: string };

type BuilderSystem = {
  id: string;
  label: Record<Locale, string>;
  taskIds: string[];
};

export type BuilderPreset = {
  key: TeamKey;
  label: string;
  description: string;
  selection: BuilderSelection;
};

export type BuilderPageContent = {
  seoTitle: string;
  seoDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroNote: string;
  builderEyebrow: string;
  builderTitle: string;
  builderDescription: string;
  presetsTitle: string;
  sectorLabel: string;
  sectorHelp: string;
  problemsLabel: string;
  problemsHelp: string;
  departmentsLabel: string;
  departmentsHelp: string;
  systemsLabel: string;
  systemsHelp: string;
  clearLabel: string;
  resultsEyebrow: string;
  resultsTitle: string;
  emptyTitle: string;
  emptyText: string;
  teamMatchLabel: string;
  rolesLabel: string;
  handoffsLabel: string;
  systemsReviewLabel: string;
  restrictedTitle: string;
  restrictedText: string;
  fitHigh: string;
  fitMedium: string;
  fitUseful: string;
  referenceLabel: string;
  catalogLabel: string;
  viewProfileLabel: string;
  viewTeamLabel: string;
  emailLabel: string;
  privacyNote: string;
  methodEyebrow: string;
  methodTitle: string;
  methodIntro: string;
  methodSteps: Array<{ title: string; text: string }>;
  interpretationEyebrow: string;
  interpretationTitle: string;
  interpretationItems: Array<{ title: string; text: string }>;
  faqTitle: string;
  faq: Array<{ question: string; answer: string }>;
};

const systems: BuilderSystem[] = [
  { id: "email", label: { es: "Email", en: "Email" }, taskIds: ["email", "customer-service", "outreach"] },
  { id: "crm", label: { es: "CRM", en: "CRM" }, taskIds: ["crm", "records", "outreach", "reporting"] },
  { id: "erp", label: { es: "ERP", en: "ERP" }, taskIds: ["records", "billing", "orders", "reporting"] },
  { id: "calendar", label: { es: "Calendario / agenda", en: "Calendar / scheduling" }, taskIds: ["scheduling", "reservations", "outreach"] },
  { id: "ecommerce", label: { es: "Ecommerce", en: "Ecommerce" }, taskIds: ["ecommerce-ops", "orders", "customer-service", "billing"] },
  { id: "ticketing", label: { es: "Ticketing / soporte", en: "Ticketing / support" }, taskIds: ["ticketing", "customer-service", "documentation"] },
  { id: "documents", label: { es: "Documentos / OCR", en: "Documents / OCR" }, taskIds: ["documents", "ocr", "documentation", "case-preparation"] },
  { id: "booking", label: { es: "Reservas / booking", en: "Booking / reservations" }, taskIds: ["reservations", "scheduling", "customer-service"] },
  { id: "bi", label: { es: "Reporting / BI", en: "Reporting / BI" }, taskIds: ["reporting", "crm"] },
  { id: "internal-api", label: { es: "APIs / sistemas internos", en: "APIs / internal systems" }, taskIds: ["records", "orders", "reporting", "documents"] },
];

const pageContent: Record<Locale, BuilderPageContent> = {
  es: {
    seoTitle: "Diseña tu Equipo IA | Team Builder de IA Empleado",
    seoDescription: "Configura sector, problemas, departamentos y sistemas para obtener una composición orientativa de Empleados IA, handoffs y un Equipo IA de referencia.",
    eyebrow: "TEAM BUILDER · IA EMPLEADO",
    heroTitle: "Diseña un equipo alrededor de tu proceso, no alrededor de una lista de agentes.",
    heroDescription: "Selecciona el contexto de tu empresa y obtén una composición orientativa basada en el catálogo real de IA Empleado. Cada recomendación explica por qué aparece, qué rol puede asumir y dónde siguen haciendo falta límites o revisión humana.",
    heroNote: "Herramienta comercial educativa. No activa empleados, no conecta sistemas y no convierte una recomendación en una propuesta técnica aprobada.",
    builderEyebrow: "CONFIGURADOR",
    builderTitle: "Describe el trabajo que quieres mejorar",
    builderDescription: "Puedes empezar desde un ejemplo o combinar tus propios criterios. El resultado se recalcula en el navegador sin enviar datos a ningún servidor.",
    presetsTitle: "Ejemplos rápidos",
    sectorLabel: "1. Sector principal",
    sectorHelp: "Elige el contexto que más se parezca a tu operación.",
    problemsLabel: "2. Problemas que quieres reducir",
    problemsHelp: "Puedes seleccionar varios cuellos de botella.",
    departmentsLabel: "3. Departamentos implicados",
    departmentsHelp: "Marca las áreas que hoy participan en el proceso.",
    systemsLabel: "4. Sistemas que ya forman parte del trabajo",
    systemsHelp: "Se usan como contexto de diseño; no implican que exista ya un conector listo para tu entorno.",
    clearLabel: "Limpiar configuración",
    resultsEyebrow: "COMPOSICIÓN ORIENTATIVA",
    resultsTitle: "Tu mapa inicial de Equipo IA",
    emptyTitle: "Empieza seleccionando al menos un criterio",
    emptyText: "El configurador necesita contexto para priorizar perfiles. Puedes usar uno de los ejemplos rápidos o elegir sector, problemas, departamentos y sistemas manualmente.",
    teamMatchLabel: "Equipo IA de referencia más cercano",
    rolesLabel: "Empleados IA recomendados",
    handoffsLabel: "Conexiones naturales entre roles",
    systemsReviewLabel: "Sistemas a evaluar en el diseño",
    restrictedTitle: "Hay un área de alto impacto en la selección",
    restrictedText: "El configurador no recomienda perfiles restringidos como activación autoservicio. Procesos de selección de personal o decisiones financieras reguladas requieren revisión específica de producto, legal, riesgo y supervisión humana.",
    fitHigh: "Coincidencia alta",
    fitMedium: "Coincidencia media",
    fitUseful: "Complemento útil",
    referenceLabel: "Perfil profundo",
    catalogLabel: "Perfil de catálogo",
    viewProfileLabel: "Ver perfil",
    viewTeamLabel: "Ver equipo de referencia",
    emailLabel: "Hablar sobre esta configuración",
    privacyNote: "La selección se procesa localmente en tu navegador. Al pulsar el CTA se abre tu cliente de correo con un resumen; la web no guarda esta configuración.",
    methodEyebrow: "CÓMO SE CALCULA",
    methodTitle: "Una recomendación explicable, no una caja negra",
    methodIntro: "La primera versión del Team Builder usa reglas deterministas sobre las taxonomías ya publicadas en IA Empleado.",
    methodSteps: [
      { title: "Cruza problemas", text: "Da más peso a perfiles cuyas tareas y foco coinciden con los problemas empresariales seleccionados." },
      { title: "Cruza departamentos", text: "Prioriza roles que encajan en las áreas que realmente participan en el proceso." },
      { title: "Añade contexto sectorial", text: "Usa el sector para diferenciar composiciones parecidas sin asumir que un perfil solo sirve para una industria." },
      { title: "Evalúa sistemas", text: "Los sistemas aportan contexto por las tareas que suelen contener, pero nunca se tratan como conectores ya disponibles." },
      { title: "Aplica límites", text: "Los perfiles restringidos se excluyen de la recomendación operativa y se convierten en una advertencia de revisión." },
    ],
    interpretationEyebrow: "CÓMO LEER EL RESULTADO",
    interpretationTitle: "El resultado es un mapa de diseño, no una implantación cerrada",
    interpretationItems: [
      { title: "Rol recomendado", text: "Indica que existe una coincidencia razonable entre el trabajo descrito y un perfil del catálogo." },
      { title: "Equipo de referencia", text: "Señala cuál de las cuatro composiciones publicadas se parece más al contexto elegido; no obliga a usarla completa." },
      { title: "Handoff", text: "Muestra relaciones naturales entre perfiles que pueden pasarse trabajo y contexto autorizado dentro de un proceso." },
      { title: "Sistema a evaluar", text: "Es una dependencia potencial del proceso. La integración real se valida después según proveedor, API, permisos y arquitectura." },
    ],
    faqTitle: "Preguntas frecuentes sobre el Team Builder",
    faq: [
      { question: "¿El resultado es una propuesta técnica definitiva?", answer: "No. Es una composición comercial orientativa. Antes de implantarla hay que validar sistemas, datos, permisos, volumen, excepciones, riesgo y puntos de aprobación humana." },
      { question: "¿Por qué no aparecen perfiles restringidos como recomendación?", answer: "Porque áreas como selección de personal o decisiones financieras de alto impacto no deben presentarse como activaciones genéricas de autoservicio. Requieren revisión específica antes de cualquier diseño." },
      { question: "¿Los sistemas que selecciono ya tienen integración disponible?", answer: "No necesariamente. El configurador usa el tipo de sistema para entender el proceso. Cada conector real debe comprobarse para el entorno concreto del cliente." },
      { question: "¿Se envían mis selecciones a un servidor?", answer: "No en esta versión. El cálculo se realiza en el navegador. Solo se comparte información si decides abrir el correo preparado por el CTA y enviarlo desde tu propio cliente de correo." },
    ],
  },
  en: {
    seoTitle: "Design your AI Team | IA Empleado Team Builder",
    seoDescription: "Choose sector, problems, departments and systems to get an explainable AI Employee composition, handoffs and a reference AI Team.",
    eyebrow: "TEAM BUILDER · IA EMPLEADO",
    heroTitle: "Design a team around your process, not around a list of agents.",
    heroDescription: "Select your company context and get an indicative composition based on the real IA Empleado catalog. Each recommendation explains why the role appears, what it can contribute and where boundaries or human review still matter.",
    heroNote: "Educational commercial tool. It does not activate employees, connect systems or turn a recommendation into an approved technical proposal.",
    builderEyebrow: "CONFIGURATOR",
    builderTitle: "Describe the work you want to improve",
    builderDescription: "Start from a reference example or combine your own criteria. The result is recalculated in the browser without sending data to a server.",
    presetsTitle: "Quick examples",
    sectorLabel: "1. Primary sector",
    sectorHelp: "Choose the context closest to your operation.",
    problemsLabel: "2. Problems you want to reduce",
    problemsHelp: "You can select several bottlenecks.",
    departmentsLabel: "3. Departments involved",
    departmentsHelp: "Select the areas that currently participate in the process.",
    systemsLabel: "4. Systems already involved in the work",
    systemsHelp: "They are design context only; selection does not imply that a ready-made connector exists for your environment.",
    clearLabel: "Clear configuration",
    resultsEyebrow: "INDICATIVE COMPOSITION",
    resultsTitle: "Your initial AI Team map",
    emptyTitle: "Start by selecting at least one criterion",
    emptyText: "The builder needs context to prioritize profiles. Use a quick example or choose sector, problems, departments and systems manually.",
    teamMatchLabel: "Closest reference AI Team",
    rolesLabel: "Recommended AI Employees",
    handoffsLabel: "Natural connections between roles",
    systemsReviewLabel: "Systems to evaluate in the design",
    restrictedTitle: "Your selection includes a high-impact area",
    restrictedText: "The builder never recommends restricted profiles as self-service activation. Recruitment selection or regulated financial decisions require dedicated product, legal, risk and human-oversight review.",
    fitHigh: "High fit",
    fitMedium: "Medium fit",
    fitUseful: "Useful complement",
    referenceLabel: "Deep profile",
    catalogLabel: "Catalog profile",
    viewProfileLabel: "View profile",
    viewTeamLabel: "View reference team",
    emailLabel: "Discuss this configuration",
    privacyNote: "Your selection is processed locally in the browser. The CTA opens your email client with a summary; the website does not store this configuration.",
    methodEyebrow: "HOW IT IS CALCULATED",
    methodTitle: "An explainable recommendation, not a black box",
    methodIntro: "The first Team Builder version uses deterministic rules over taxonomies already published by IA Empleado.",
    methodSteps: [
      { title: "Match problems", text: "Profiles receive more weight when their tasks and focus match the selected business problems." },
      { title: "Match departments", text: "Roles are prioritized when they fit the areas that actually participate in the process." },
      { title: "Add sector context", text: "Sector helps distinguish similar compositions without assuming a profile only works in one industry." },
      { title: "Evaluate systems", text: "Systems add context through the tasks they usually contain, but are never treated as already-available connectors." },
      { title: "Apply boundaries", text: "Restricted profiles are removed from operational recommendations and converted into a review warning." },
    ],
    interpretationEyebrow: "HOW TO READ THE RESULT",
    interpretationTitle: "The result is a design map, not a closed implementation",
    interpretationItems: [
      { title: "Recommended role", text: "Shows a reasonable match between the work described and a profile in the catalog." },
      { title: "Reference team", text: "Shows which of the four published compositions is closest to the selected context; it does not require using the whole team." },
      { title: "Handoff", text: "Highlights natural relationships between profiles that can pass work and authorized context inside a process." },
      { title: "System to evaluate", text: "Represents a potential process dependency. Actual integration is validated later against provider, API, permissions and architecture." },
    ],
    faqTitle: "Team Builder frequently asked questions",
    faq: [
      { question: "Is the result a final technical proposal?", answer: "No. It is an indicative commercial composition. Systems, data, permissions, volume, exceptions, risk and human approval points still need technical validation." },
      { question: "Why are restricted profiles not recommended?", answer: "High-impact areas such as recruitment selection or financial decisions should not be presented as generic self-service activations. They require dedicated review before any design." },
      { question: "Are the systems I select already supported by an integration?", answer: "Not necessarily. The builder uses system type to understand the workflow. Each real connector must be validated for the customer environment." },
      { question: "Are my selections sent to a server?", answer: "Not in this version. Calculation happens in your browser. Information is only shared if you choose to open the prepared email and send it from your own email client." },
    ],
  },
};

const teamBlueprints: Record<TeamKey, { sectors: string[]; departments: string[]; problems: string[]; systems: string[] }> = {
  sales: {
    sectors: ["professional-services", "software-technology", "cross-sector"],
    departments: ["sales", "marketing"],
    problems: ["follow-up-gaps", "inbox-overload", "reporting-delay"],
    systems: ["crm", "email", "calendar", "bi"],
  },
  ecommerce: {
    sectors: ["ecommerce-retail"],
    departments: ["ecommerce", "operations", "customer-service", "finance"],
    problems: ["order-exceptions", "repetitive-requests", "billing-control", "reporting-delay"],
    systems: ["ecommerce", "erp", "email", "ticketing", "bi"],
  },
  administration: {
    sectors: ["cross-sector", "professional-services"],
    departments: ["administration", "finance", "knowledge", "professional-services"],
    problems: ["manual-data", "document-backlog", "inbox-overload", "follow-up-gaps"],
    systems: ["email", "erp", "documents", "internal-api"],
  },
  travel: {
    sectors: ["travel-hospitality"],
    departments: ["travel", "front-desk", "customer-service", "administration", "finance"],
    problems: ["booking-volume", "operational-coordination", "repetitive-requests", "follow-up-gaps"],
    systems: ["booking", "email", "calendar", "erp", "documents"],
  },
};

const presetSelections: Record<TeamKey, BuilderSelection> = {
  ecommerce: {
    sectorId: "ecommerce-retail",
    problemIds: ["order-exceptions", "repetitive-requests", "billing-control"],
    departmentIds: ["ecommerce", "operations", "customer-service", "finance"],
    systemIds: ["ecommerce", "erp", "email"],
  },
  administration: {
    sectorId: "professional-services",
    problemIds: ["manual-data", "document-backlog", "inbox-overload"],
    departmentIds: ["administration", "finance", "knowledge"],
    systemIds: ["email", "documents", "erp"],
  },
  sales: {
    sectorId: "professional-services",
    problemIds: ["follow-up-gaps", "inbox-overload", "reporting-delay"],
    departmentIds: ["sales", "marketing"],
    systemIds: ["crm", "email", "calendar"],
  },
  travel: {
    sectorId: "travel-hospitality",
    problemIds: ["booking-volume", "operational-coordination", "repetitive-requests"],
    departmentIds: ["travel", "customer-service", "administration"],
    systemIds: ["booking", "email", "calendar"],
  },
};

export type RecommendedRole = DiscoveryProfileView & {
  score: number;
  fit: "high" | "medium" | "useful";
  reasons: string[];
};

export type RecommendedHandoff = {
  from: string;
  to: string;
  text: string;
};

export type TeamBuilderRecommendation = {
  roles: RecommendedRole[];
  referenceTeam: null | { key: TeamKey; name: string; href: string; score: number };
  handoffs: RecommendedHandoff[];
  restrictedAreas: DiscoveryProfileView[];
  selectedSystemLabels: string[];
};

export function teamBuilderPath(locale: Locale) {
  return locale === "es" ? "/disena-tu-equipo-ia" : "/en/design-your-ai-team";
}

export function getTeamBuilderPageContent(locale: Locale) {
  return pageContent[locale];
}

export function getTeamBuilderOptions(locale: Locale) {
  const discovery = getDiscoveryFilterOptions(locale);
  return {
    sectors: discovery.sectors,
    problems: discovery.problems,
    departments: discovery.departments,
    systems: systems.map((system) => ({ value: system.id, label: system.label[locale] })),
  };
}

export function getTeamBuilderPresets(locale: Locale): BuilderPreset[] {
  const teams = getLocalizedTeams(locale);
  return (["ecommerce", "administration", "sales", "travel"] as TeamKey[]).map((key) => {
    const team = teams.find((item) => item.key === key);
    if (!team) throw new Error(`Missing team preset: ${key}`);
    return {
      key,
      label: team.name,
      description: team.outcome,
      selection: presetSelections[key],
    };
  });
}

function buildLabelMap(options: LocalizedOption[]) {
  return new Map(options.map((option) => [option.value, option.label]));
}

function systemMatchesProfile(systemId: string, profile: DiscoveryProfileView) {
  const system = systems.find((item) => item.id === systemId);
  if (!system) return false;
  return system.taskIds.some((taskId) => profile.taskIds.includes(taskId));
}

function hasAnySelection(selection: BuilderSelection) {
  return Boolean(selection.sectorId || selection.problemIds.length || selection.departmentIds.length || selection.systemIds.length);
}

function scoreTeam(key: TeamKey, selection: BuilderSelection) {
  const blueprint = teamBlueprints[key];
  let score = 0;
  if (selection.sectorId && blueprint.sectors.includes(selection.sectorId)) score += 5;
  score += selection.departmentIds.filter((id) => blueprint.departments.includes(id)).length * 3;
  score += selection.problemIds.filter((id) => blueprint.problems.includes(id)).length * 4;
  score += selection.systemIds.filter((id) => blueprint.systems.includes(id)).length * 2;
  return score;
}

export function buildTeamRecommendation(locale: Locale, selection: BuilderSelection): TeamBuilderRecommendation {
  const profiles = getDiscoveryProfiles(locale);
  const options = getTeamBuilderOptions(locale);
  const sectorLabels = buildLabelMap(options.sectors);
  const problemLabels = buildLabelMap(options.problems);
  const departmentLabels = buildLabelMap(options.departments);
  const systemLabels = buildLabelMap(options.systems);

  if (!hasAnySelection(selection)) {
    return { roles: [], referenceTeam: null, handoffs: [], restrictedAreas: [], selectedSystemLabels: [] };
  }

  const restrictedAreas = profiles.filter((profile) => {
    if (profile.status !== "restricted") return false;
    const problemMatch = profile.problemIds.some((id) => selection.problemIds.includes(id));
    return problemMatch;
  });

  const roles = profiles
    .filter((profile) => profile.status !== "restricted")
    .map((profile): RecommendedRole => {
      let score = 0;
      const reasons: string[] = [];

      const problemMatches = profile.problemIds.filter((id) => selection.problemIds.includes(id));
      if (problemMatches.length) {
        score += problemMatches.length * 5;
        reasons.push(`${locale === "es" ? "Problema" : "Problem"}: ${problemMatches.slice(0, 2).map((id) => problemLabels.get(id) ?? id).join(", ")}`);
      }

      if (selection.departmentIds.includes(profile.departmentId)) {
        score += 4;
        reasons.push(`${locale === "es" ? "Departamento" : "Department"}: ${departmentLabels.get(profile.departmentId) ?? profile.department}`);
      }

      if (selection.sectorId) {
        if (profile.sectorIds.includes(selection.sectorId)) {
          score += 3;
          reasons.push(`${locale === "es" ? "Sector" : "Sector"}: ${sectorLabels.get(selection.sectorId) ?? selection.sectorId}`);
        } else if (profile.sectorIds.includes("cross-sector")) {
          score += 1;
        }
      }

      const matchingSystems = selection.systemIds.filter((systemId) => systemMatchesProfile(systemId, profile));
      if (matchingSystems.length) {
        score += Math.min(matchingSystems.length, 3) * 2;
        reasons.push(`${locale === "es" ? "Contexto de sistemas" : "System context"}: ${matchingSystems.slice(0, 2).map((id) => systemLabels.get(id) ?? id).join(", ")}`);
      }

      if (profile.status === "reference" && score > 0) score += 1;

      return {
        ...profile,
        score,
        fit: score >= 12 ? "high" : score >= 7 ? "medium" : "useful",
        reasons: reasons.slice(0, 3),
      };
    })
    .filter((profile) => profile.score > 0)
    .sort((a, b) => b.score - a.score || (a.status === "reference" ? -1 : 1) || a.shortName.localeCompare(b.shortName))
    .slice(0, 6);

  const teamScores = (["sales", "ecommerce", "administration", "travel"] as TeamKey[])
    .map((key) => ({ key, score: scoreTeam(key, selection) }))
    .sort((a, b) => b.score - a.score);
  const bestTeam = teamScores[0];
  const localizedTeams = getLocalizedTeams(locale);
  const matchedTeam = bestTeam && bestTeam.score >= 6 ? localizedTeams.find((team) => team.key === bestTeam.key) : undefined;
  const referenceTeam = matchedTeam && bestTeam
    ? { key: matchedTeam.key, name: matchedTeam.name, href: teamDetailPath(matchedTeam.key, locale), score: bestTeam.score }
    : null;

  const roleMap = new Map<DiscoveryProfileKey, RecommendedRole>(roles.map((role) => [role.key, role]));
  const pairKeys = new Set<string>();
  const handoffs: RecommendedHandoff[] = [];
  for (const role of roles) {
    for (const relatedKey of role.relatedKeys) {
      const related = roleMap.get(relatedKey);
      if (!related) continue;
      const pairKey = [role.key, related.key].sort().join("|");
      if (pairKeys.has(pairKey)) continue;
      pairKeys.add(pairKey);
      handoffs.push({
        from: role.shortName,
        to: related.shortName,
        text: locale === "es"
          ? "Conexión natural del catálogo: el trabajo puede pasar de un rol al otro cuando el proceso cruza ambas funciones, compartiendo solo el contexto autorizado."
          : "Natural catalog connection: work can pass between these roles when the process crosses both functions, sharing only authorized context.",
      });
      if (handoffs.length >= 4) break;
    }
    if (handoffs.length >= 4) break;
  }

  return {
    roles,
    referenceTeam,
    handoffs,
    restrictedAreas,
    selectedSystemLabels: selection.systemIds.map((id) => systemLabels.get(id) ?? id),
  };
}

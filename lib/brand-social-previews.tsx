import { ImageResponse } from "next/og";
import type { Locale } from "./i18n";
import { getBrandCharacters } from "./brand-characters";

export type BrandPreviewSurface =
  | "home"
  | "employees"
  | "teams"
  | "collaboration"
  | "team-builder"
  | "process-analyzer"
  | "roi"
  | "sectors"
  | "use-cases"
  | "departments"
  | "integrations";

type PreviewCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string;
  characterIds: Array<"clara" | "alex" | "sofia" | "javier">;
};

const previewCopy: Record<Locale, Record<BrandPreviewSurface, PreviewCopy>> = {
  es: {
    home: {
      eyebrow: "PERSONAS · IA · SISTEMAS",
      title: "Tu empresa. Un equipo de Empleados IA trabajando juntos.",
      subtitle: "Compañeros digitales coordinados con tus personas, procesos y sistemas.",
      footer: "Personas. IA. Sistemas. Un mismo equipo.",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    employees: {
      eyebrow: "EMPLEADOS IA",
      title: "Roles digitales con responsabilidad, contexto y control humano.",
      subtitle: "Clara, Alex, Sofía y Javier son la primera familia de referencia de IA Empleado.",
      footer: "Descubre qué puede hacer cada rol y dónde necesita supervisión.",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    teams: {
      eyebrow: "EQUIPOS IA",
      title: "No contratas una IA aislada. Construyes un equipo digital.",
      subtitle: "Roles coordinados, handoffs visibles, sistemas conectados y aprobación humana.",
      footer: "Del empleado individual a una empresa aumentada por IA.",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    collaboration: {
      eyebrow: "CÓMO TRABAJAN JUNTOS",
      title: "Mira el trabajo pasar de un rol a otro, paso a paso.",
      subtitle: "Simula handoffs, sistemas, decisiones humanas y resultados trazables.",
      footer: "Una demo explicable. No una caja negra.",
      characterIds: ["clara", "sofia", "alex"],
    },
    "team-builder": {
      eyebrow: "TEAM BUILDER",
      title: "Diseña un Equipo IA alrededor de tu problema real.",
      subtitle: "Combina sector, departamentos, sistemas y necesidades para obtener una composición orientativa.",
      footer: "El equipo recomendado siempre requiere validación técnica y humana.",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    "process-analyzer": {
      eyebrow: "PROCESS ANALYZER",
      title: "Visualiza qué automatizar, qué asistir y qué debe seguir siendo humano.",
      subtitle: "Convierte un proceso actual en un flujo coordinado y explicable.",
      footer: "Automatización · asistencia · responsabilidad humana.",
      characterIds: ["clara", "alex", "sofia"],
    },
    roi: {
      eyebrow: "CALCULADORA ROI",
      title: "Convierte tiempo operativo en escenarios de capacidad potencial.",
      subtitle: "Supuestos visibles, cálculo local y resultados orientativos; nunca promesas automáticas.",
      footer: "Estima primero. Valida después el proceso y el equipo.",
      characterIds: [],
    },
    sectors: {
      eyebrow: "SECTORES",
      title: "Equipos IA adaptados al contexto de cada negocio.",
      subtitle: "Ecommerce, turismo, servicios profesionales y ventas con procesos y sistemas diferentes.",
      footer: "Mismo sistema de marca. Distinto contexto operativo.",
      characterIds: ["clara", "javier", "alex", "sofia"],
    },
    "use-cases": {
      eyebrow: "CASOS DE USO",
      title: "De una tarea aislada a un flujo coordinado y trazable.",
      subtitle: "Incidencias, pedidos, facturación, ventas, reservas y documentación.",
      footer: "Entrada → Empleado IA → sistema → control humano → resultado.",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    departments: {
      eyebrow: "DEPARTAMENTOS",
      title: "Empleados IA que colaboran con la estructura real de tu empresa.",
      subtitle: "Ventas, soporte, administración, finanzas y operaciones con límites claros.",
      footer: "Coordinación visible entre personas, IA y sistemas.",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    integrations: {
      eyebrow: "INTEGRACIONES",
      title: "La IA trabaja sobre fuentes de verdad y permisos definidos.",
      subtitle: "READ, WRITE, auditoría y aprobación humana antes de acciones sensibles.",
      footer: "Integrar no significa dar acceso ilimitado.",
      characterIds: ["alex", "sofia", "clara"],
    },
  },
  en: {
    home: {
      eyebrow: "PEOPLE · AI · SYSTEMS",
      title: "Your company. A team of AI Employees working together.",
      subtitle: "Digital colleagues coordinated with your people, processes and systems.",
      footer: "People. AI. Systems. One team.",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    employees: {
      eyebrow: "AI EMPLOYEES",
      title: "Digital roles with responsibility, context and human control.",
      subtitle: "Clara, Alex, Sofía and Javier are the first IA Empleado reference family.",
      footer: "See what each role can do and where supervision remains necessary.",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    teams: {
      eyebrow: "AI TEAMS",
      title: "You do not hire an isolated AI. You build a digital team.",
      subtitle: "Coordinated roles, visible handoffs, connected systems and human approval.",
      footer: "From individual AI Employee to AI-augmented company.",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    collaboration: {
      eyebrow: "SEE THE TEAM WORK",
      title: "Watch work move from one role to another, step by step.",
      subtitle: "Simulate handoffs, systems, human decisions and traceable outcomes.",
      footer: "An explainable demo. Not a black box.",
      characterIds: ["clara", "sofia", "alex"],
    },
    "team-builder": {
      eyebrow: "TEAM BUILDER",
      title: "Design an AI Team around your real problem.",
      subtitle: "Combine sector, departments, systems and needs to obtain an indicative composition.",
      footer: "Every recommendation still requires technical and human validation.",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    "process-analyzer": {
      eyebrow: "PROCESS ANALYZER",
      title: "See what to automate, what to assist and what should remain human.",
      subtitle: "Turn a current process into a coordinated, explainable workflow.",
      footer: "Automation · assistance · human responsibility.",
      characterIds: ["clara", "alex", "sofia"],
    },
    roi: {
      eyebrow: "ROI CALCULATOR",
      title: "Turn operational time into potential-capacity scenarios.",
      subtitle: "Visible assumptions, local calculation and indicative outcomes; never automatic promises.",
      footer: "Estimate first. Then validate the process and team.",
      characterIds: [],
    },
    sectors: {
      eyebrow: "SECTORS",
      title: "AI Teams adapted to the context of each business.",
      subtitle: "Ecommerce, travel, professional services and sales with different processes and systems.",
      footer: "Same brand system. Different operational context.",
      characterIds: ["clara", "javier", "alex", "sofia"],
    },
    "use-cases": {
      eyebrow: "USE CASES",
      title: "From an isolated task to a coordinated, traceable workflow.",
      subtitle: "Incidents, orders, billing, sales, bookings and documentation.",
      footer: "Input → AI Employee → system → human control → outcome.",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    departments: {
      eyebrow: "DEPARTMENTS",
      title: "AI Employees collaborating with your real company structure.",
      subtitle: "Sales, support, administration, finance and operations with explicit boundaries.",
      footer: "Visible coordination between people, AI and systems.",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    integrations: {
      eyebrow: "INTEGRATIONS",
      title: "AI works on defined sources of truth and permissions.",
      subtitle: "READ, WRITE, audit and human approval before sensitive actions.",
      footer: "Integration does not mean unlimited access.",
      characterIds: ["alex", "sofia", "clara"],
    },
  },
};

export function isBrandPreviewSurface(value: string): value is BrandPreviewSurface {
  return value in previewCopy.es;
}

export function brandPreviewUrl(locale: Locale, surface: BrandPreviewSurface): string {
  return `https://iaempleado.com/brand-preview/${locale}/${surface}`;
}

export function renderBrandSocialPreview(locale: Locale, surface: BrandPreviewSurface): ImageResponse {
  const copy = previewCopy[locale][surface];
  const allCharacters = getBrandCharacters(locale);
  const characters = copy.characterIds
    .map((id) => allCharacters.find((character) => character.id === id))
    .filter((character): character is NonNullable<typeof character> => Boolean(character));
  const markUrl = "https://iaempleado.com/branding/ia-empleado-mark.svg";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg,#ffffff 0%,#f8f9ff 52%,#f5fbff 100%)",
          color: "#111827",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ position: "absolute", width: 420, height: 420, borderRadius: 999, background: "rgba(91,95,245,.12)", filter: "blur(80px)", right: -80, top: -120 }} />
        <div style={{ position: "absolute", width: 340, height: 340, borderRadius: 999, background: "rgba(16,185,129,.09)", filter: "blur(80px)", left: -100, bottom: -130 }} />

        <div style={{ display: "flex", width: "100%", padding: "58px 64px", gap: 46 }}>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: characters.length ? "61%" : "72%" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img src={markUrl} width="58" height="58" alt="" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.02em" }}>IA Empleado</div>
                <div style={{ marginTop: 4, fontSize: 15, fontWeight: 700, letterSpacing: ".14em", color: "#5b5ff5" }}>{copy.eyebrow}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div style={{ fontSize: 48, lineHeight: 1.04, fontWeight: 850, letterSpacing: "-0.04em", maxWidth: 700 }}>{copy.title}</div>
              <div style={{ fontSize: 23, lineHeight: 1.35, color: "#475569", maxWidth: 690 }}>{copy.subtitle}</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#475569", fontSize: 17, fontWeight: 700 }}>
              <span style={{ display: "flex", width: 10, height: 10, borderRadius: 999, background: "#10b981" }} />
              {copy.footer}
            </div>
          </div>

          <div style={{ display: "flex", position: "relative", flex: 1, alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", width: 300, height: 300, border: "2px solid rgba(91,95,245,.12)", borderRadius: 999 }} />
            <div style={{ position: "absolute", width: 215, height: 215, border: "2px dashed rgba(91,95,245,.16)", borderRadius: 999 }} />
            <div style={{ display: "flex", width: 118, height: 118, borderRadius: 999, alignItems: "center", justifyContent: "center", background: "rgba(255,255,255,.96)", border: "1px solid rgba(91,95,245,.18)", boxShadow: "0 20px 55px rgba(79,70,229,.14)" }}>
              <img src={markUrl} width="62" height="62" alt="" />
            </div>

            {characters.map((character, index) => {
              const positions = [
                { left: 8, top: 44 },
                { right: 4, top: 60 },
                { left: 18, bottom: 20 },
                { right: 12, bottom: 6 },
              ];
              const pos = positions[index] ?? positions[0];
              return (
                <div key={character.id} style={{ position: "absolute", display: "flex", flexDirection: "column", width: 118, overflow: "hidden", borderRadius: 20, border: "1px solid rgba(148,163,184,.24)", background: "white", boxShadow: "0 18px 40px rgba(15,23,42,.10)", ...pos }}>
                  <img src={`https://iaempleado.com${character.asset}`} width="118" height="120" style={{ objectFit: "cover", objectPosition: "center top" }} alt="" />
                  <div style={{ display: "flex", flexDirection: "column", padding: "8px 10px 10px", background: "rgba(255,255,255,.98)" }}>
                    <span style={{ fontSize: 15, fontWeight: 800 }}>{character.name}</span>
                    <span style={{ marginTop: 2, fontSize: 10, color: "#64748b" }}>{character.shortRole}</span>
                  </div>
                </div>
              );
            })}

            {characters.length === 0 ? (
              <div style={{ position: "absolute", bottom: 48, display: "flex", gap: 9, alignItems: "flex-end" }}>
                {[34, 55, 73].map((height, index) => (
                  <div key={height} style={{ display: "flex", width: 64, height: 140, alignItems: "flex-end", padding: 9, borderRadius: 16, background: "rgba(255,255,255,.92)", border: "1px solid rgba(148,163,184,.2)" }}>
                    <div style={{ width: "100%", height: `${height}%`, borderRadius: 10, background: index === 0 ? "#c7d2fe" : index === 1 ? "#818cf8" : "#10b981" }} />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}

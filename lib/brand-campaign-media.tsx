import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import sharp from "sharp";
import type { Locale } from "./i18n";
import type { BrandPreviewSurface } from "./brand-social-previews";
import { getBrandCharacters } from "./brand-characters";

export type BrandCampaignFormat = "landscape" | "square" | "portrait" | "story";

type CampaignCopy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  characterIds: Array<"clara" | "alex" | "sofia" | "javier">;
};

const campaignDimensions: Record<BrandCampaignFormat, { width: number; height: number }> = {
  landscape: { width: 1600, height: 900 },
  square: { width: 1080, height: 1080 },
  portrait: { width: 1080, height: 1350 },
  story: { width: 1080, height: 1920 },
};

const campaignFrames: Record<BrandCampaignFormat, string> = {
  landscape: "/branding/media/demo-frame.svg",
  square: "/branding/media/social-square-frame.svg",
  portrait: "/branding/media/portrait-frame.svg",
  story: "/branding/media/story-frame.svg",
};

const campaignCopy: Record<Locale, Record<BrandPreviewSurface, CampaignCopy>> = {
  es: {
    home: {
      eyebrow: "PERSONAS · IA · SISTEMAS",
      title: "Un mismo equipo. Personas y Empleados IA trabajando sobre tus sistemas.",
      subtitle: "Coordina trabajo real con contexto, permisos y control humano visibles.",
      cta: "Descubre IA Empleado",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    employees: {
      eyebrow: "EMPLEADOS IA",
      title: "Roles digitales especializados, no un asistente genérico para todo.",
      subtitle: "Clara, Alex, Sofía y Javier muestran cómo separar responsabilidades y supervisión.",
      cta: "Explora los roles",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    teams: {
      eyebrow: "EQUIPOS IA",
      title: "Cuando los roles colaboran, la automatización deja de ser una tarea aislada.",
      subtitle: "Handoffs, sistemas compartidos y aprobación humana dentro del mismo flujo.",
      cta: "Explora Equipos IA",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    collaboration: {
      eyebrow: "TRABAJO COORDINADO",
      title: "Mira cómo una solicitud pasa de conversación a acción trazable.",
      subtitle: "Cada handoff conserva contexto y muestra dónde intervienen sistemas y personas.",
      cta: "Ver cómo trabajan juntos",
      characterIds: ["clara", "sofia", "alex"],
    },
    "team-builder": {
      eyebrow: "TEAM BUILDER",
      title: "Diseña un Equipo IA alrededor de tu proceso, no de una lista de herramientas.",
      subtitle: "Combina necesidades, sistemas y roles para obtener una composición orientativa.",
      cta: "Diseñar mi equipo",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    "process-analyzer": {
      eyebrow: "PROCESS ANALYZER",
      title: "Separa qué automatizar, qué asistir y qué debe seguir siendo humano.",
      subtitle: "Convierte un proceso actual en un flujo coordinado, explicable y medible.",
      cta: "Analizar mi proceso",
      characterIds: ["clara", "alex", "sofia"],
    },
    roi: {
      eyebrow: "VALOR POTENCIAL",
      title: "Estima capacidad potencial con supuestos visibles, no con promesas automáticas.",
      subtitle: "Modela volumen, tiempo y coste antes de validar el proceso y el equipo.",
      cta: "Calcular escenario",
      characterIds: [],
    },
    sectors: {
      eyebrow: "SECTORES",
      title: "Misma identidad. Cuatro contextos operativos distintos.",
      subtitle: "Ecommerce, turismo, servicios profesionales y ventas B2B con procesos propios.",
      cta: "Explorar sectores",
      characterIds: ["clara", "javier", "alex", "sofia"],
    },
    "use-cases": {
      eyebrow: "CASOS DE USO",
      title: "De una tarea repetitiva a un proceso con sistemas, handoffs y control.",
      subtitle: "Atención, pedidos, facturación, ventas, reservas y documentación.",
      cta: "Explorar casos de uso",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    departments: {
      eyebrow: "DEPARTAMENTOS",
      title: "Los Empleados IA se integran en la estructura real de tu empresa.",
      subtitle: "Ventas, soporte, administración, finanzas y operaciones con límites explícitos.",
      cta: "Explorar departamentos",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    integrations: {
      eyebrow: "INTEGRACIONES",
      title: "Conectar sistemas no significa conceder autoridad ilimitada.",
      subtitle: "Fuentes de verdad, permisos READ/WRITE, auditoría y aprobación humana.",
      cta: "Explorar integraciones",
      characterIds: ["alex", "sofia", "clara"],
    },
  },
  en: {
    home: {
      eyebrow: "PEOPLE · AI · SYSTEMS",
      title: "One team. People and AI Employees working across your systems.",
      subtitle: "Coordinate real work with visible context, permissions and human control.",
      cta: "Discover IA Empleado",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    employees: {
      eyebrow: "AI EMPLOYEES",
      title: "Specialized digital roles, not one generic assistant for everything.",
      subtitle: "Clara, Alex, Sofía and Javier show how responsibility and supervision stay separated.",
      cta: "Explore the roles",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    teams: {
      eyebrow: "AI TEAMS",
      title: "When roles collaborate, automation becomes more than an isolated task.",
      subtitle: "Handoffs, shared systems and human approval inside one visible workflow.",
      cta: "Explore AI Teams",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    collaboration: {
      eyebrow: "COORDINATED WORK",
      title: "See how a request moves from conversation to traceable action.",
      subtitle: "Every handoff preserves context and shows where systems and people intervene.",
      cta: "See the team work",
      characterIds: ["clara", "sofia", "alex"],
    },
    "team-builder": {
      eyebrow: "TEAM BUILDER",
      title: "Design an AI Team around your process, not a list of tools.",
      subtitle: "Combine needs, systems and roles to obtain an indicative composition.",
      cta: "Design my team",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    "process-analyzer": {
      eyebrow: "PROCESS ANALYZER",
      title: "Separate what to automate, what to assist and what should remain human.",
      subtitle: "Turn a current process into a coordinated, explainable and measurable workflow.",
      cta: "Analyze my process",
      characterIds: ["clara", "alex", "sofia"],
    },
    roi: {
      eyebrow: "POTENTIAL VALUE",
      title: "Estimate potential capacity with visible assumptions, not automatic promises.",
      subtitle: "Model volume, time and cost before validating the process and team.",
      cta: "Calculate a scenario",
      characterIds: [],
    },
    sectors: {
      eyebrow: "INDUSTRIES",
      title: "One identity. Four different operating contexts.",
      subtitle: "Ecommerce, travel, professional services and B2B sales with distinct workflows.",
      cta: "Explore industries",
      characterIds: ["clara", "javier", "alex", "sofia"],
    },
    "use-cases": {
      eyebrow: "USE CASES",
      title: "Move from a repetitive task to a process with systems, handoffs and control.",
      subtitle: "Support, orders, billing, sales, bookings and documentation.",
      cta: "Explore use cases",
      characterIds: ["clara", "alex", "sofia", "javier"],
    },
    departments: {
      eyebrow: "DEPARTMENTS",
      title: "AI Employees fit into the real structure of your company.",
      subtitle: "Sales, support, administration, finance and operations with explicit boundaries.",
      cta: "Explore departments",
      characterIds: ["javier", "clara", "alex", "sofia"],
    },
    integrations: {
      eyebrow: "INTEGRATIONS",
      title: "Connecting systems does not mean granting unlimited authority.",
      subtitle: "Sources of truth, READ/WRITE permissions, audit and human approval.",
      cta: "Explore integrations",
      characterIds: ["alex", "sofia", "clara"],
    },
  },
};

const rasterAssetCache = new Map<string, Promise<string>>();

function rasterAsset(publicPath: string): Promise<string> {
  const cached = rasterAssetCache.get(publicPath);
  if (cached) return cached;

  const promise = (async () => {
    const relativePath = publicPath.replace(/^\/+/, "");
    const source = await readFile(join(process.cwd(), "public", relativePath));
    const png = await sharp(source).png().toBuffer();
    return `data:image/png;base64,${png.toString("base64")}`;
  })();

  rasterAssetCache.set(publicPath, promise);
  return promise;
}

export function isBrandCampaignFormat(value: string): value is BrandCampaignFormat {
  return value in campaignDimensions;
}

export function brandCampaignUrl(locale: Locale, format: BrandCampaignFormat, surface: BrandPreviewSurface): string {
  return `https://iaempleado.com/brand-campaign/${locale}/${format}/${surface}`;
}

export async function renderBrandCampaignMedia(
  locale: Locale,
  format: BrandCampaignFormat,
  surface: BrandPreviewSurface,
): Promise<ImageResponse> {
  const dimensions = campaignDimensions[format];
  const copy = campaignCopy[locale][surface];
  const allCharacters = getBrandCharacters(locale);
  const characters = copy.characterIds
    .map((id) => allCharacters.find((character) => character.id === id))
    .filter((character): character is NonNullable<typeof character> => Boolean(character));

  const [markAsset, frameAsset, ...characterAssets] = await Promise.all([
    rasterAsset("/branding/ia-empleado-mark.svg"),
    rasterAsset(campaignFrames[format]),
    ...characters.map((character) => rasterAsset(character.asset)),
  ]);

  const visualCharacters = characters.map((character, index) => ({
    character,
    asset: characterAssets[index],
  }));

  const wide = format === "landscape";
  const story = format === "story";
  const portrait = format === "portrait";
  const canvasPad = wide ? 82 : story ? 92 : 72;
  const titleSize = wide ? 62 : story ? 66 : portrait ? 58 : 54;
  const subtitleSize = wide ? 25 : story ? 29 : 23;
  const cardWidth = wide ? 142 : story ? 172 : 142;
  const cardImageHeight = wide ? 150 : story ? 188 : 150;
  const textMinHeight = wide ? "100%" : story ? 680 : portrait ? 500 : 410;
  const artWidth = wide ? 520 : story ? 720 : 650;
  const artHeight = wide ? 620 : story ? 900 : portrait ? 620 : 430;
  const hubSize = wide ? 136 : story ? 166 : 126;
  const outerOrbit = wide ? 370 : story ? 480 : 350;
  const innerOrbit = wide ? 270 : story ? 350 : 250;
  const cardPositions = [
    { left: 0, top: 0 },
    { right: 0, top: 0 },
    { left: 0, bottom: 0 },
    { right: 0, bottom: 0 },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(145deg,#ffffff 0%,#f8f9ff 52%,#f3fbff 100%)",
          color: "#111827",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ position: "absolute", width: wide ? 560 : 460, height: wide ? 560 : 460, borderRadius: 999, background: "rgba(91,95,245,.12)", filter: "blur(92px)", right: wide ? -130 : -150, top: -150 }} />
        <div style={{ position: "absolute", width: wide ? 440 : 380, height: wide ? 440 : 380, borderRadius: 999, background: "rgba(16,185,129,.09)", filter: "blur(90px)", left: -130, bottom: -150 }} />
        <img src={frameAsset} alt="" width={dimensions.width} height={dimensions.height} style={{ position: "absolute", left: 0, top: 0, width: dimensions.width, height: dimensions.height }} />

        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100%",
            padding: canvasPad,
            flexDirection: wide ? "row" : "column",
            gap: wide ? 54 : story ? 52 : 34,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: wide ? "58%" : "100%",
              minHeight: textMinHeight,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <img src={markAsset} width={wide ? 64 : 58} height={wide ? 64 : 58} alt="" />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: wide ? 31 : 28, fontWeight: 800, letterSpacing: "-0.02em" }}>IA Empleado</div>
                <div style={{ marginTop: 5, fontSize: wide ? 17 : 15, fontWeight: 800, letterSpacing: ".13em", color: "#5b5ff5" }}>{copy.eyebrow}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: story ? 28 : 20, maxWidth: wide ? 820 : 900 }}>
              <div style={{ fontSize: titleSize, lineHeight: 1.03, fontWeight: 850, letterSpacing: "-0.045em" }}>{copy.title}</div>
              <div style={{ fontSize: subtitleSize, lineHeight: 1.34, color: "#475569", maxWidth: wide ? 760 : 880 }}>{copy.subtitle}</div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: wide ? 19 : 18, fontWeight: 800, color: "#344054" }}>
              <span style={{ display: "flex", width: 11, height: 11, borderRadius: 999, background: "#10b981" }} />
              {copy.cta}
              <span style={{ color: "#5b5ff5" }}>→</span>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              minHeight: artHeight,
            }}
          >
            <div
              style={{
                display: "flex",
                position: "relative",
                width: artWidth,
                height: artHeight,
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: (artWidth - outerOrbit) / 2,
                  top: (artHeight - outerOrbit) / 2,
                  width: outerOrbit,
                  height: outerOrbit,
                  border: "2px solid rgba(91,95,245,.12)",
                  borderRadius: 999,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: (artWidth - innerOrbit) / 2,
                  top: (artHeight - innerOrbit) / 2,
                  width: innerOrbit,
                  height: innerOrbit,
                  border: "2px dashed rgba(91,95,245,.17)",
                  borderRadius: 999,
                }}
              />
              <div
                style={{
                  display: "flex",
                  position: "absolute",
                  left: (artWidth - hubSize) / 2,
                  top: (artHeight - hubSize) / 2,
                  width: hubSize,
                  height: hubSize,
                  borderRadius: 999,
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255,255,255,.97)",
                  border: "1px solid rgba(91,95,245,.20)",
                  boxShadow: "0 22px 62px rgba(79,70,229,.14)",
                }}
              >
                <img src={markAsset} width={wide ? 72 : story ? 86 : 66} height={wide ? 72 : story ? 86 : 66} alt="" />
              </div>

              {visualCharacters.map(({ character, asset }, index) => (
                <div
                  key={character.id}
                  style={{
                    position: "absolute",
                    ...cardPositions[index],
                    display: "flex",
                    flexDirection: "column",
                    width: cardWidth,
                    overflow: "hidden",
                    borderRadius: 22,
                    border: "1px solid rgba(148,163,184,.24)",
                    background: "white",
                    boxShadow: "0 18px 42px rgba(15,23,42,.10)",
                  }}
                >
                  <img src={asset} width={cardWidth} height={cardImageHeight} style={{ width: cardWidth, height: cardImageHeight, objectFit: "contain", objectPosition: "center bottom", background: "#f8fafc" }} alt="" />
                  <div style={{ display: "flex", flexDirection: "column", padding: story ? "12px 13px 14px" : "9px 11px 11px", background: "rgba(255,255,255,.98)" }}>
                    <span style={{ fontSize: story ? 19 : 16, fontWeight: 800 }}>{character.name}</span>
                    <span style={{ marginTop: 3, fontSize: story ? 13 : 11, lineHeight: 1.2, color: "#64748b" }}>{character.shortRole}</span>
                  </div>
                </div>
              ))}

              {visualCharacters.length === 0 ? (
                <div style={{ position: "absolute", display: "flex", gap: story ? 18 : 12, alignItems: "flex-end", left: (artWidth - (story ? 351 : 270)) / 2, bottom: story ? 120 : 54 }}>
                  {[32, 52, 72].map((height, index) => (
                    <div key={height} style={{ display: "flex", width: story ? 105 : 82, height: story ? 250 : 190, alignItems: "flex-end", padding: story ? 14 : 11, borderRadius: 22, background: "rgba(255,255,255,.94)", border: "1px solid rgba(148,163,184,.22)", boxShadow: "0 15px 36px rgba(15,23,42,.07)" }}>
                      <div style={{ width: "100%", height: `${height}%`, borderRadius: 12, background: index === 0 ? "#c7d2fe" : index === 1 ? "#818cf8" : "#10b981" }} />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    ),
    dimensions,
  );
}

import type { Locale } from "../lib/i18n";

type BrandBeforeAfterProofProps = {
  locale: Locale;
  alternativeName: string;
};

export function BrandBeforeAfterProof({ locale, alternativeName }: BrandBeforeAfterProofProps) {
  const content = locale === "es"
    ? {
        eyebrow: "LECTURA VISUAL",
        title: "Del enfoque aislado a un trabajo coordinado y gobernado",
        intro: "Esta secuencia representa un patrón de diseño. No afirma que todos los procesos partan del mismo estado ni que el resultado se produzca automáticamente.",
        before: "Antes / enfoque aislado",
        beforeText: `${alternativeName} puede resolver bien una parte concreta del problema, pero el resto del proceso puede seguir dependiendo de handoffs manuales o herramientas separadas.`,
        withAi: "Con IA Empleado",
        withAiText: "El rol se diseña alrededor de tareas, sistemas, permisos, handoffs y controles humanos explícitos.",
        outcome: "Resultado potencial",
        outcomeText: "Menos fragmentación operativa, mayor continuidad de contexto y una trazabilidad más clara cuando la arquitectura e integraciones lo permiten.",
      }
    : {
        eyebrow: "VISUAL READING",
        title: "From an isolated approach to coordinated, governed work",
        intro: "This sequence represents a design pattern. It does not claim that every process starts from the same state or that the outcome happens automatically.",
        before: "Before / isolated approach",
        beforeText: `${alternativeName} may solve one part of the problem well, while the rest of the process can still depend on manual handoffs or disconnected tools.`,
        withAi: "With IA Empleado",
        withAiText: "The role is designed around tasks, systems, permissions, handoffs and explicit human controls.",
        outcome: "Potential outcome",
        outcomeText: "Less operational fragmentation, better context continuity and clearer traceability when the architecture and integrations support it.",
      };

  return (
    <div className="brand-before-after-proof">
      <div className="brand-proof-heading">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
      </div>
      <div className="brand-proof-flow" aria-label={content.title}>
        <article className="brand-proof-stage stage-before">
          <span className="brand-proof-index">01</span>
          <div className="brand-proof-stage-icon" aria-hidden="true">◇</div>
          <h3>{content.before}</h3>
          <p>{content.beforeText}</p>
        </article>
        <span className="brand-proof-arrow" aria-hidden="true">→</span>
        <article className="brand-proof-stage stage-with-ai">
          <span className="brand-proof-index">02</span>
          <img className="brand-proof-mark" src="/branding/ia-empleado-mark.svg" alt="" />
          <h3>{content.withAi}</h3>
          <p>{content.withAiText}</p>
          <div className="brand-proof-mini-chips" aria-hidden="true"><span>CRM</span><span>ERP</span><span>Human</span></div>
        </article>
        <span className="brand-proof-arrow" aria-hidden="true">→</span>
        <article className="brand-proof-stage stage-outcome">
          <span className="brand-proof-index">03</span>
          <div className="brand-proof-stage-icon" aria-hidden="true">✓</div>
          <h3>{content.outcome}</h3>
          <p>{content.outcomeText}</p>
          <span className="brand-proof-potential-label">{locale === "es" ? "POTENCIAL · NO GARANTIZADO" : "POTENTIAL · NOT GUARANTEED"}</span>
        </article>
      </div>
    </div>
  );
}

import type { Locale } from "../lib/i18n";
import { getBrandCharacters } from "../lib/brand-characters";

type BrandInteractivePreviewProps = {
  locale: Locale;
  mode: "collaboration" | "team-builder" | "process" | "roi";
  title: string;
};

const labels = {
  es: {
    collaboration: ["Solicitud", "Handoff", "Sistema", "Aprobación"],
    "team-builder": ["Sector", "Roles", "Sistemas", "Control"],
    process: ["Proceso actual", "Rediseño", "Sistemas", "Control humano"],
    roi: ["Baseline", "Escenarios", "Capacidad", "Valor potencial"],
    human: "Aprobación humana",
  },
  en: {
    collaboration: ["Request", "Handoff", "System", "Approval"],
    "team-builder": ["Industry", "Roles", "Systems", "Control"],
    process: ["Current process", "Redesign", "Systems", "Human control"],
    roi: ["Baseline", "Scenarios", "Capacity", "Potential value"],
    human: "Human approval",
  },
} as const;

export function BrandInteractivePreview({ locale, mode, title }: BrandInteractivePreviewProps) {
  const characters = getBrandCharacters(locale);
  const copy = labels[locale];
  const steps = copy[mode];

  return (
    <div className={`brand-interactive-preview mode-${mode}`} role="img" aria-label={title}>
      <div className="brand-interactive-glow glow-a" aria-hidden="true" />
      <div className="brand-interactive-glow glow-b" aria-hidden="true" />
      <div className="brand-interactive-orbits" aria-hidden="true" />

      <div className="brand-interactive-portraits" aria-hidden="true">
        {characters.map((character, index) => (
          <div className={`brand-interactive-person person-${index + 1}`} data-accent={character.accent} key={character.id}>
            <img src={character.asset} alt="" width={112} height={132} />
            <span>{character.name}</span>
          </div>
        ))}
      </div>

      <div className="brand-interactive-core" aria-hidden="true">
        <span className="brand-interactive-core-ring" />
        <img src="/branding/ia-empleado-mark.svg" alt="" width={54} height={54} />
        <strong>IA Empleado</strong>
      </div>

      <div className="brand-interactive-flow" aria-hidden="true">
        {steps.map((step, index) => (
          <span key={step}><i>{String(index + 1).padStart(2, "0")}</i>{step}</span>
        ))}
      </div>

      <div className="brand-interactive-human" aria-hidden="true">
        <i>✓</i><span>{copy.human}</span>
      </div>
    </div>
  );
}

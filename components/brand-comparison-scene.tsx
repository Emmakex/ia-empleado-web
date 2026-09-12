import type { Locale } from "../lib/i18n";
import type { ComparisonKey } from "../lib/comparison-content";
import { getBrandCharacters } from "../lib/brand-characters";

type BrandComparisonSceneProps = {
  locale: Locale;
  alternativeName?: string;
  comparisonKey?: ComparisonKey;
  compact?: boolean;
};

const alternativeGlyph: Record<ComparisonKey, string> = {
  chatbot: "💬",
  "ai-agent": "◈",
  rpa: "▦",
  "traditional-automation": "↻",
  "ai-copilot": "✦",
};

export function BrandComparisonScene({ locale, alternativeName, comparisonKey, compact = false }: BrandComparisonSceneProps) {
  const characters = getBrandCharacters(locale);
  const alternative = alternativeName ?? (locale === "es" ? "Otros enfoques" : "Other approaches");
  const glyph = comparisonKey ? alternativeGlyph[comparisonKey] : "↔";
  const labels = locale === "es"
    ? { fit: "Elegir por ajuste", role: "Rol + sistemas + políticas", human: "Control humano", alt: alternative, employee: "Empleado IA" }
    : { fit: "Choose by fit", role: "Role + systems + policies", human: "Human control", alt: alternative, employee: "AI Employee" };

  return (
    <div className={`brand-comparison-scene${compact ? " is-compact" : ""}`} aria-label={`${labels.employee} vs ${labels.alt}`}>
      <div className="brand-comparison-glow glow-left" aria-hidden="true" />
      <div className="brand-comparison-glow glow-right" aria-hidden="true" />
      <div className="brand-comparison-side brand-comparison-alternative">
        <span className="brand-comparison-side-kicker">{labels.alt}</span>
        <div className="brand-comparison-alt-symbol" aria-hidden="true">{glyph}</div>
        <span className="brand-comparison-side-caption">{locale === "es" ? "Patrón a evaluar" : "Pattern to evaluate"}</span>
      </div>

      <div className="brand-comparison-core" aria-hidden="true">
        <span className="brand-comparison-core-line" />
        <div className="brand-comparison-core-mark">
          <img src="/branding/ia-empleado-mark.svg" alt="" />
        </div>
        <strong>{labels.fit}</strong>
        <small>{labels.human}</small>
      </div>

      <div className="brand-comparison-side brand-comparison-employee">
        <span className="brand-comparison-side-kicker">{labels.employee}</span>
        <div className="brand-comparison-portraits" aria-hidden="true">
          {characters.map((character) => (
            <span className="brand-comparison-portrait" data-accent={character.accent} key={character.id}>
              <img src={character.asset} alt="" />
            </span>
          ))}
        </div>
        <span className="brand-comparison-side-caption">{labels.role}</span>
      </div>

      <div className="brand-comparison-system-row" aria-hidden="true">
        {(locale === "es" ? ["CRM", "ERP", "Email", "Aprobación"] : ["CRM", "ERP", "Email", "Approval"]).map((item) => <span key={item}>{item}</span>)}
      </div>
    </div>
  );
}

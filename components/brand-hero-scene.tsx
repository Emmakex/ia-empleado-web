import type { Locale } from "../lib/i18n";
import { getBrandCharacters } from "../lib/brand-characters";
import { BrandCharacterImage } from "./brand-character-image";

type BrandHeroSceneProps = {
  locale: Locale;
  visualLabel: string;
  systems: string[];
};

export function BrandHeroScene({ locale, visualLabel, systems }: BrandHeroSceneProps) {
  const characters = getBrandCharacters(locale);
  const copy = locale === "es"
    ? {
        task: "Tarea en movimiento",
        core: "Un mismo equipo",
        coordination: "Contexto coordinado",
        approval: "Aprobación humana",
        approvalDetail: "cuando la política lo exige",
        result: "Resultado registrado",
      }
    : {
        task: "Work in motion",
        core: "One team",
        coordination: "Coordinated context",
        approval: "Human approval",
        approvalDetail: "when policy requires it",
        result: "Outcome recorded",
      };

  return (
    <div className="brand-hero-stage" role="img" aria-label={visualLabel}>
      <div className="brand-hero-mist brand-hero-mist-one" aria-hidden="true" />
      <div className="brand-hero-mist brand-hero-mist-two" aria-hidden="true" />
      <div className="brand-hero-orbit brand-hero-orbit-one" aria-hidden="true" />
      <div className="brand-hero-orbit brand-hero-orbit-two" aria-hidden="true" />

      <svg className="brand-hero-lines" viewBox="0 0 760 620" aria-hidden="true">
        <path className="brand-line-static" d="M380 310C286 260 216 195 137 145" />
        <path className="brand-line-static" d="M380 310C475 260 548 194 625 145" />
        <path className="brand-line-static" d="M380 310C282 364 214 430 137 477" />
        <path className="brand-line-static" d="M380 310C477 362 548 430 625 477" />
        <path className="brand-line-flow brand-line-flow-one" d="M137 145C228 188 292 250 380 310C468 368 540 426 625 477" />
        <path className="brand-line-flow brand-line-flow-two" d="M625 145C539 191 470 252 380 310C292 368 219 426 137 477" />
      </svg>

      <div className="brand-hero-task" aria-hidden="true">
        <span className="brand-hero-task-dot" />
        {copy.task}
      </div>

      <div className="brand-hero-core" aria-hidden="true">
        <span className="brand-hero-core-ring" />
        <img src="/branding/ia-empleado-mark.svg" alt="" width={58} height={58} decoding="async" />
        <strong>{copy.core}</strong>
        <small>{copy.coordination}</small>
      </div>

      {characters.map((character, index) => (
        <div
          className={`brand-character-node brand-character-node-${index + 1}`}
          data-accent={character.accent}
          key={character.id}
          aria-hidden="true"
        >
          <div className="brand-character-portrait">
            <BrandCharacterImage
              character={character}
              sizes="(max-width: 430px) 120px, (max-width: 760px) 126px, 140px"
              eager
              fetchPriority={index < 2 ? "high" : "auto"}
            />
          </div>
          <div className="brand-character-label">
            <strong>{character.name}</strong>
            <span>{character.shortRole}</span>
          </div>
          <span className="brand-character-status" />
        </div>
      ))}

      <div className="brand-hero-approval" aria-hidden="true">
        <span className="brand-hero-approval-icon">✓</span>
        <span><strong>{copy.approval}</strong><small>{copy.approvalDetail}</small></span>
      </div>

      <div className="brand-hero-result" aria-hidden="true">
        <span>↗</span>{copy.result}
      </div>

      <div className="brand-hero-footer" aria-hidden="true">
        <p className="brand-hero-caption">{visualLabel}</p>
        <div className="brand-hero-systems">
          {systems.map((system) => <span key={system}>{system}</span>)}
        </div>
      </div>
    </div>
  );
}

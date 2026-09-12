import type { EmployeeKey } from "../lib/employee-catalog";
import type { Locale } from "../lib/i18n";
import { getBrandCharacterByEmployeeKey } from "../lib/brand-characters";
import { BrandCharacterImage } from "./brand-character-image";

export type BrandCollaborationParticipant = {
  id: string;
  employeeKey?: EmployeeKey;
  name: string;
  responsibility?: string;
};

type BrandCollaborationCompositionProps = {
  locale: Locale;
  variant: "team" | "department";
  contextKey: string;
  eyebrow: string;
  title: string;
  participants: BrandCollaborationParticipant[];
  systems: string[];
  humanLabel: string;
  handoffLabel?: string;
};

export function BrandCollaborationComposition({
  locale,
  variant,
  contextKey,
  eyebrow,
  title,
  participants,
  systems,
  humanLabel,
  handoffLabel,
}: BrandCollaborationCompositionProps) {
  const visibleParticipants = participants.slice(0, 4);
  const extraCount = Math.max(0, participants.length - visibleParticipants.length);
  const resolvedHandoffLabel = handoffLabel ?? (locale === "es" ? "Handoffs coordinados" : "Coordinated handoffs");
  const sceneLabel = locale === "es"
    ? variant === "team" ? `Composición visual del equipo ${title}` : `Composición visual del departamento ${title}`
    : variant === "team" ? `${title} team visual composition` : `${title} department visual composition`;

  return (
    <aside
      className={`brand-collaboration-composition is-${variant}`}
      data-collaboration-context={contextKey}
      data-collaboration-variant={variant}
      role="img"
      aria-label={sceneLabel}
    >
      <div className="brand-collaboration-glow glow-a" aria-hidden="true" />
      <div className="brand-collaboration-glow glow-b" aria-hidden="true" />

      <div className="brand-collaboration-heading" aria-hidden="true">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>

      <div className="brand-collaboration-network" aria-hidden="true">
        <div className="brand-collaboration-participants">
          {visibleParticipants.map((participant, index) => {
            const character = participant.employeeKey
              ? getBrandCharacterByEmployeeKey(participant.employeeKey, locale)
              : undefined;
            const family = character?.visualFamily;
            const motif = family?.motif ?? "catalog";

            return (
              <div
                className={`brand-collaboration-participant participant-${index + 1}`}
                data-role-family={character?.id ?? "catalog"}
                data-role-motif={motif}
                data-accent={character?.accent ?? "neutral"}
                key={participant.id}
              >
                <span className={`brand-collaboration-motif motif-${motif}`} />
                <div className="brand-collaboration-portrait">
                  {character ? (
                    <BrandCharacterImage
                      character={character}
                      sizes="(max-width: 760px) 86px, 104px"
                    />
                  ) : (
                    <span className="brand-collaboration-generic">{String(index + 1).padStart(2, "0")}</span>
                  )}
                </div>
                <div className="brand-collaboration-participant-copy">
                  <strong>{character?.name ?? participant.name}</strong>
                  <small>{participant.responsibility ?? character?.shortRole ?? participant.name}</small>
                  {family ? (
                    <span className="brand-collaboration-mini-flow">
                      <i>{family.flow[0]}</i>
                      <b>→</b>
                      <i>{family.flow[family.flow.length - 1]}</i>
                    </span>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        <div className="brand-collaboration-hub">
          <span className="brand-collaboration-hub-ring" />
          <img src="/branding/ia-empleado-mark.svg" alt="" width={46} height={46} />
          <strong>{resolvedHandoffLabel}</strong>
          <small>{locale === "es" ? "Contexto + reglas + trazabilidad" : "Context + rules + traceability"}</small>
        </div>

        {extraCount > 0 ? (
          <div className="brand-collaboration-extra">
            +{extraCount} {locale === "es" ? "rol" : "role"}{extraCount === 1 ? "" : "s"}
          </div>
        ) : null}
      </div>

      <div className="brand-collaboration-systems" aria-hidden="true">
        <strong>{locale === "es" ? "Sistemas compartidos" : "Shared systems"}</strong>
        <div>{systems.slice(0, 4).map((system) => <span key={system}>{system}</span>)}</div>
      </div>

      <div className="brand-collaboration-human" aria-hidden="true">
        <span>✓</span>
        <strong>{humanLabel}</strong>
      </div>
    </aside>
  );
}

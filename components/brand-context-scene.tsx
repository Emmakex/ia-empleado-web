import type { Locale } from "../lib/i18n";
import type { RoleReference } from "../lib/sector-use-cases";
import { getBrandCharacterByEmployeeKey } from "../lib/brand-characters";

type BrandCharacterStripProps = {
  locale: Locale;
  roles: RoleReference[];
  compact?: boolean;
};

export function BrandCharacterStrip({ locale, roles, compact = false }: BrandCharacterStripProps) {
  const canonical = roles
    .map((role) => role.employeeKey ? getBrandCharacterByEmployeeKey(role.employeeKey, locale) : undefined)
    .filter((character): character is NonNullable<typeof character> => Boolean(character));

  if (canonical.length === 0) return null;

  return (
    <div className={`brand-context-roster${compact ? " is-compact" : ""}`} aria-hidden="true">
      {canonical.slice(0, 4).map((character) => (
        <span className="brand-context-avatar" data-accent={character.accent} key={character.id}>
          <img src={character.asset} alt="" width={96} height={112} />
          {!compact && <small>{character.name}</small>}
        </span>
      ))}
    </div>
  );
}

type BrandContextSceneProps = {
  locale: Locale;
  kind: "sector" | "use-case";
  contextKey: string;
  eyebrow: string;
  title: string;
  roles: RoleReference[];
  systems: string[];
  humanLabel: string;
};

export function BrandContextScene({ locale, kind, contextKey, eyebrow, title, roles, systems, humanLabel }: BrandContextSceneProps) {
  const canonical = roles
    .map((role) => role.employeeKey ? getBrandCharacterByEmployeeKey(role.employeeKey, locale) : undefined)
    .filter((character): character is NonNullable<typeof character> => Boolean(character));
  const neutralRoles = roles.filter((role) => !role.employeeKey).slice(0, 2);
  const label = locale === "es" ? "Escena visual de trabajo coordinado" : "Coordinated work visual scene";
  const processLabel = locale === "es" ? "Proceso coordinado" : "Coordinated process";

  return (
    <aside className={`brand-context-scene is-${kind}`} data-context={contextKey} role="img" aria-label={`${label}: ${title}`}>
      <div className="brand-context-glow glow-one" aria-hidden="true" />
      <div className="brand-context-glow glow-two" aria-hidden="true" />
      <div className="brand-context-grid-lines" aria-hidden="true" />

      <div className="brand-context-heading" aria-hidden="true">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>

      <div className="brand-context-core" aria-hidden="true">
        <span className="brand-context-core-ring" />
        <img src="/branding/ia-empleado-mark.svg" alt="" width={50} height={50} />
        <strong>{processLabel}</strong>
      </div>

      <div className="brand-context-people" aria-hidden="true">
        {canonical.slice(0, 4).map((character, index) => (
          <div className={`brand-context-person person-${index + 1}`} data-accent={character.accent} key={character.id}>
            <img src={character.asset} alt="" width={130} height={154} />
            <span><strong>{character.name}</strong><small>{character.shortRole}</small></span>
          </div>
        ))}
        {neutralRoles.map((role, index) => (
          <div className={`brand-context-neutral neutral-${index + 1}`} key={role.name}>
            <span aria-hidden="true">◇</span>
            <small>{role.name}</small>
          </div>
        ))}
      </div>

      <div className="brand-context-human" aria-hidden="true">
        <span>✓</span>
        <strong>{humanLabel}</strong>
      </div>

      <div className="brand-context-systems" aria-hidden="true">
        {systems.slice(0, 4).map((system) => <span key={system}>{system}</span>)}
      </div>
    </aside>
  );
}

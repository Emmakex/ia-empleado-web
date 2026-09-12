import type { EmployeeKey } from "../lib/employee-catalog";
import type { Locale } from "../lib/i18n";
import { getBrandCharacterByEmployeeKey, getBrandCharacters } from "../lib/brand-characters";
import { BrandCharacterImage } from "./brand-character-image";

type BrandOrganizationRosterProps = {
  locale: Locale;
  employeeKeys: EmployeeKey[];
  compact?: boolean;
};

export function BrandOrganizationRoster({ locale, employeeKeys, compact = false }: BrandOrganizationRosterProps) {
  const characters = employeeKeys
    .map((key) => getBrandCharacterByEmployeeKey(key, locale))
    .filter((character): character is NonNullable<typeof character> => Boolean(character));

  if (characters.length === 0) return null;

  return (
    <div className={`brand-organization-roster${compact ? " is-compact" : ""}`} aria-hidden="true">
      {characters.slice(0, 4).map((character) => (
        <span className="brand-organization-avatar" data-accent={character.accent} key={character.id}>
          <BrandCharacterImage character={character} sizes={compact ? "44px" : "88px"} />
          {!compact && <small>{character.name}</small>}
        </span>
      ))}
    </div>
  );
}

type BrandOrganizationSceneProps = {
  locale: Locale;
  kind: "department" | "integration";
  contextKey: string;
  eyebrow: string;
  title: string;
  employeeKeys?: EmployeeKey[];
  systems: string[];
  humanLabel: string;
};

export function BrandOrganizationScene({
  locale,
  kind,
  contextKey,
  eyebrow,
  title,
  employeeKeys,
  systems,
  humanLabel,
}: BrandOrganizationSceneProps) {
  const characters = employeeKeys?.length
    ? employeeKeys
        .map((key) => getBrandCharacterByEmployeeKey(key, locale))
        .filter((character): character is NonNullable<typeof character> => Boolean(character))
    : getBrandCharacters(locale);

  const sceneLabel = locale === "es"
    ? kind === "department" ? "Escena visual del departamento" : "Escena visual de integración"
    : kind === "department" ? "Department visual scene" : "Integration visual scene";
  const coreLabel = locale === "es"
    ? kind === "department" ? "Trabajo coordinado" : "Sistema autorizado"
    : kind === "department" ? "Coordinated work" : "Authorized system";

  return (
    <aside className={`brand-organization-scene is-${kind}`} data-context={contextKey} role="img" aria-label={`${sceneLabel}: ${title}`}>
      <div className="brand-organization-glow glow-a" aria-hidden="true" />
      <div className="brand-organization-glow glow-b" aria-hidden="true" />
      <div className="brand-organization-lines" aria-hidden="true" />

      <div className="brand-organization-scene-heading" aria-hidden="true">
        <span>{eyebrow}</span>
        <strong>{title}</strong>
      </div>

      <div className="brand-organization-core" aria-hidden="true">
        <span className="brand-organization-core-ring" />
        <img src="/branding/ia-empleado-mark.svg" alt="" width={52} height={52} />
        <strong>{coreLabel}</strong>
      </div>

      <div className="brand-organization-people" aria-hidden="true">
        {characters.slice(0, 4).map((character, index) => (
          <div className={`brand-organization-person person-${index + 1}`} data-accent={character.accent} key={character.id}>
            <BrandCharacterImage character={character} sizes="(max-width: 760px) 108px, 126px" />
            <span><strong>{character.name}</strong><small>{character.shortRole}</small></span>
          </div>
        ))}
      </div>

      <div className="brand-organization-human" aria-hidden="true">
        <span>✓</span>
        <strong>{humanLabel}</strong>
      </div>

      <div className="brand-organization-systems" aria-hidden="true">
        {systems.slice(0, 4).map((system) => <span key={system}>{system}</span>)}
      </div>
    </aside>
  );
}

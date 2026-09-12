"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "../lib/i18n";
import { getBrandCharacterForProfileKey } from "../lib/brand-characters";
import {
  buildTeamRecommendation,
  type BuilderPageContent,
  type BuilderPreset,
  type BuilderSelection,
} from "../lib/team-builder";
import { BrandCharacterImage } from "./brand-character-image";

type BuilderOptions = {
  sectors: Array<{ value: string; label: string }>;
  problems: Array<{ value: string; label: string }>;
  departments: Array<{ value: string; label: string }>;
  systems: Array<{ value: string; label: string }>;
};

type TeamBuilderProps = {
  locale: Locale;
  content: BuilderPageContent;
  options: BuilderOptions;
  presets: BuilderPreset[];
};

const emptySelection: BuilderSelection = {
  sectorId: "",
  problemIds: [],
  departmentIds: [],
  systemIds: [],
};

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function TeamBuilder({ locale, content, options, presets }: TeamBuilderProps) {
  const [selection, setSelection] = useState<BuilderSelection>(emptySelection);
  const recommendation = useMemo(() => buildTeamRecommendation(locale, selection), [locale, selection]);
  const hasSelection = Boolean(selection.sectorId || selection.problemIds.length || selection.departmentIds.length || selection.systemIds.length);
  const recommendedCharacters = recommendation.roles
    .map((role) => getBrandCharacterForProfileKey(role.key, locale))
    .filter((character): character is NonNullable<typeof character> => Boolean(character));

  const optionLabel = (items: Array<{ value: string; label: string }>, value: string) =>
    items.find((item) => item.value === value)?.label ?? value;

  const fitLabel = (fit: "high" | "medium" | "useful") =>
    fit === "high" ? content.fitHigh : fit === "medium" ? content.fitMedium : content.fitUseful;

  const summary = useMemo(() => {
    if (!hasSelection) return "";
    const lines = [
      locale === "es" ? "Configuración generada en IA Empleado Team Builder" : "Configuration generated in IA Empleado Team Builder",
      "",
      `${locale === "es" ? "Sector" : "Sector"}: ${selection.sectorId ? optionLabel(options.sectors, selection.sectorId) : "—"}`,
      `${locale === "es" ? "Problemas" : "Problems"}: ${selection.problemIds.map((id) => optionLabel(options.problems, id)).join(", ") || "—"}`,
      `${locale === "es" ? "Departamentos" : "Departments"}: ${selection.departmentIds.map((id) => optionLabel(options.departments, id)).join(", ") || "—"}`,
      `${locale === "es" ? "Sistemas" : "Systems"}: ${selection.systemIds.map((id) => optionLabel(options.systems, id)).join(", ") || "—"}`,
      "",
      `${locale === "es" ? "Equipo de referencia" : "Reference team"}: ${recommendation.referenceTeam?.name ?? "—"}`,
      `${locale === "es" ? "Roles sugeridos" : "Suggested roles"}: ${recommendation.roles.map((role) => role.shortName).join(", ") || "—"}`,
      "",
      locale === "es"
        ? "Nota: esta composición es orientativa y requiere validación técnica, de permisos, datos, excepciones y control humano."
        : "Note: this composition is indicative and requires validation of technology, permissions, data, exceptions and human control.",
    ];
    return lines.join("\n");
  }, [hasSelection, locale, options, recommendation, selection]);

  const mailtoHref = hasSelection
    ? `mailto:hola@iaempleado.com?subject=${encodeURIComponent(locale === "es" ? "IA Empleado - Configuración Team Builder" : "IA Empleado - Team Builder configuration")}&body=${encodeURIComponent(summary)}`
    : "mailto:hola@iaempleado.com";

  const applyPreset = (preset: BuilderPreset) => {
    setSelection({
      sectorId: preset.selection.sectorId,
      problemIds: [...preset.selection.problemIds],
      departmentIds: [...preset.selection.departmentIds],
      systemIds: [...preset.selection.systemIds],
    });
  };

  return (
    <div className="team-builder-shell brand-team-builder-shell">
      <section className="team-builder-config" aria-labelledby="builder-config-title">
        <div className="team-builder-config-head">
          <div>
            <p className="eyebrow">{content.builderEyebrow}</p>
            <h2 id="builder-config-title">{content.builderTitle}</h2>
            <p>{content.builderDescription}</p>
          </div>
          <button className="builder-clear" type="button" onClick={() => setSelection(emptySelection)} disabled={!hasSelection}>
            {content.clearLabel}
          </button>
        </div>

        <div className="builder-presets" aria-labelledby="builder-presets-title">
          <h3 id="builder-presets-title">{content.presetsTitle}</h3>
          <div className="builder-preset-grid">
            {presets.map((preset) => (
              <button className="builder-preset" type="button" key={preset.key} onClick={() => applyPreset(preset)}>
                <span>{preset.label}</span>
                <small>{preset.description}</small>
              </button>
            ))}
          </div>
        </div>

        <div className="builder-fields">
          <fieldset className="builder-field builder-field-sector">
            <legend>{content.sectorLabel}</legend>
            <p>{content.sectorHelp}</p>
            <div className="builder-choice-grid builder-sector-grid">
              {options.sectors.map((option) => {
                const active = selection.sectorId === option.value;
                return (
                  <button
                    type="button"
                    className={active ? "builder-choice is-active" : "builder-choice"}
                    aria-pressed={active}
                    key={option.value}
                    onClick={() => setSelection((current) => ({ ...current, sectorId: active ? "" : option.value }))}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="builder-field">
            <legend>{content.problemsLabel}</legend>
            <p>{content.problemsHelp}</p>
            <div className="builder-choice-grid">
              {options.problems.map((option) => {
                const active = selection.problemIds.includes(option.value);
                return (
                  <button
                    type="button"
                    className={active ? "builder-choice is-active" : "builder-choice"}
                    aria-pressed={active}
                    key={option.value}
                    onClick={() => setSelection((current) => ({ ...current, problemIds: toggleValue(current.problemIds, option.value) }))}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="builder-field">
            <legend>{content.departmentsLabel}</legend>
            <p>{content.departmentsHelp}</p>
            <div className="builder-choice-grid">
              {options.departments.map((option) => {
                const active = selection.departmentIds.includes(option.value);
                return (
                  <button
                    type="button"
                    className={active ? "builder-choice is-active" : "builder-choice"}
                    aria-pressed={active}
                    key={option.value}
                    onClick={() => setSelection((current) => ({ ...current, departmentIds: toggleValue(current.departmentIds, option.value) }))}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="builder-field">
            <legend>{content.systemsLabel}</legend>
            <p>{content.systemsHelp}</p>
            <div className="builder-choice-grid builder-system-grid">
              {options.systems.map((option) => {
                const active = selection.systemIds.includes(option.value);
                return (
                  <button
                    type="button"
                    className={active ? "builder-choice builder-system-choice is-active" : "builder-choice builder-system-choice"}
                    aria-pressed={active}
                    key={option.value}
                    onClick={() => setSelection((current) => ({ ...current, systemIds: toggleValue(current.systemIds, option.value) }))}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>
      </section>

      <aside className="team-builder-results" aria-live="polite" aria-labelledby="builder-results-title">
        <div className="builder-results-head">
          <p className="eyebrow">{content.resultsEyebrow}</p>
          <h2 id="builder-results-title">{content.resultsTitle}</h2>
        </div>

        {!hasSelection ? (
          <div className="builder-empty-state brand-builder-empty-state">
            <img src="/branding/ia-empleado-mark.svg" alt="" width={58} height={58} aria-hidden="true" />
            <h3>{content.emptyTitle}</h3>
            <p>{content.emptyText}</p>
          </div>
        ) : (
          <>
            <div className="builder-brand-team-map" aria-hidden="true">
              <div className="builder-brand-team-core">
                <img src="/branding/ia-empleado-mark.svg" alt="" width={48} height={48} />
                <span>{locale === "es" ? "Composición sugerida" : "Suggested composition"}</span>
              </div>
              <div className="builder-brand-roster">
                {recommendedCharacters.map((character) => (
                  <div className="builder-brand-person" data-accent={character.accent} key={character.id}>
                    <BrandCharacterImage character={character} sizes="92px" />
                    <span><strong>{character.name}</strong><small>{character.shortRole}</small></span>
                  </div>
                ))}
                {recommendation.roles.filter((role) => !getBrandCharacterForProfileKey(role.key, locale)).slice(0, 2).map((role) => (
                  <div className="builder-brand-neutral" key={role.key}><i>◇</i><span>{role.shortName}</span></div>
                ))}
              </div>
              <div className="builder-brand-governance"><span>✓</span>{locale === "es" ? "Validación humana y permisos explícitos" : "Human validation and explicit permissions"}</div>
            </div>

            {recommendation.restrictedAreas.length > 0 && (
              <div className="builder-restricted-alert" role="note">
                <span aria-hidden="true">!</span>
                <div>
                  <h3>{content.restrictedTitle}</h3>
                  <p>{content.restrictedText}</p>
                  <ul>{recommendation.restrictedAreas.map((area) => <li key={area.key}>{area.shortName}</li>)}</ul>
                </div>
              </div>
            )}

            {recommendation.referenceTeam && (
              <section className="builder-reference-team" aria-labelledby="builder-team-match-title">
                <p id="builder-team-match-title">{content.teamMatchLabel}</p>
                <div>
                  <span className="builder-team-symbol" aria-hidden="true">◎</span>
                  <div>
                    <h3>{recommendation.referenceTeam.name}</h3>
                    <Link href={recommendation.referenceTeam.href}>{content.viewTeamLabel} <span aria-hidden="true">→</span></Link>
                  </div>
                </div>
              </section>
            )}

            <section className="builder-role-section" aria-labelledby="builder-roles-title">
              <h3 id="builder-roles-title">{content.rolesLabel}</h3>
              <div className="builder-role-grid">
                {recommendation.roles.map((role, index) => {
                  const character = getBrandCharacterForProfileKey(role.key, locale);
                  return (
                    <article className={`builder-role-card${character ? " has-brand-character" : ""}`} key={role.key}>
                      {character && (
                        <div className="builder-role-character" data-accent={character.accent} aria-hidden="true">
                          <BrandCharacterImage character={character} sizes="(max-width: 760px) 88px, 104px" />
                          <span>{character.name}</span>
                        </div>
                      )}
                      <div className="builder-role-topline">
                        <span className="builder-role-index">{String(index + 1).padStart(2, "0")}</span>
                        <span className={`builder-fit is-${role.fit}`}>{fitLabel(role.fit)}</span>
                      </div>
                      <p className="builder-role-status">{role.status === "reference" ? content.referenceLabel : content.catalogLabel}</p>
                      <h4>{role.shortName}</h4>
                      <p>{role.focus}</p>
                      <ul className="builder-reasons">
                        {role.reasons.map((reason) => <li key={reason}>{reason}</li>)}
                      </ul>
                      {role.href && <Link className="builder-role-link" href={role.href}>{content.viewProfileLabel} <span aria-hidden="true">→</span></Link>}
                    </article>
                  );
                })}
              </div>
            </section>

            {recommendation.handoffs.length > 0 && (
              <section className="builder-handoffs" aria-labelledby="builder-handoffs-title">
                <h3 id="builder-handoffs-title">{content.handoffsLabel}</h3>
                <div className="builder-handoff-list">
                  {recommendation.handoffs.map((handoff) => (
                    <article key={`${handoff.from}-${handoff.to}`}>
                      <div className="builder-handoff-line">
                        <span>{handoff.from}</span><i aria-hidden="true">→</i><span>{handoff.to}</span>
                      </div>
                      <p>{handoff.text}</p>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {recommendation.selectedSystemLabels.length > 0 && (
              <section className="builder-selected-systems" aria-labelledby="builder-systems-title">
                <h3 id="builder-systems-title">{content.systemsReviewLabel}</h3>
                <div>{recommendation.selectedSystemLabels.map((system) => <span key={system}>{system}</span>)}</div>
              </section>
            )}

            <div className="builder-result-cta">
              <a className="button" href={mailtoHref}>{content.emailLabel}</a>
              <p>{content.privacyNote}</p>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

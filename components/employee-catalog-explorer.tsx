"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Locale } from "../lib/i18n";
import type { DiscoveryProfileView } from "../lib/employee-discovery";
import { getBrandCharacterForProfileKey } from "../lib/brand-characters";

type FilterOption = { value: string; label: string };

type EmployeeCatalogExplorerProps = {
  locale: Locale;
  profiles: DiscoveryProfileView[];
  options: { departments: FilterOption[]; sectors: FilterOption[]; problems: FilterOption[]; tasks: FilterOption[] };
};

const copy = {
  es: { search: "Buscar", searchPlaceholder: "Ej. facturas, CRM, reservas...", department: "Departamento", sector: "Sector", problem: "Problema", task: "Tarea", all: "Todos", clear: "Limpiar filtros", results: (count: number) => `${count} perfiles encontrados`, empty: "No hay perfiles que coincidan con todos los filtros seleccionados.", reference: "Perfil profundo disponible", catalog: "Oportunidad de catálogo", restricted: "Uso restringido · requiere revisión", departmentLabel: "Departamento", focusLabel: "Foco", tasksLabel: "Tareas relacionadas", problemsLabel: "Problemas que aborda", sectorsLabel: "Sectores", view: "Ver perfil completo", catalogCta: "Perfil de catálogo", restrictedCta: "No disponible como activación autoservicio" },
  en: { search: "Search", searchPlaceholder: "E.g. invoices, CRM, reservations...", department: "Department", sector: "Sector", problem: "Problem", task: "Task", all: "All", clear: "Clear filters", results: (count: number) => `${count} profiles found`, empty: "No profiles match all selected filters.", reference: "Deep profile available", catalog: "Catalog opportunity", restricted: "Restricted use · review required", departmentLabel: "Department", focusLabel: "Focus", tasksLabel: "Related tasks", problemsLabel: "Problems addressed", sectorsLabel: "Sectors", view: "View full profile", catalogCta: "Catalog profile", restrictedCta: "Not available as self-service activation" },
} as const;

function normalize(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function EmployeeCatalogExplorer({ locale, profiles, options }: EmployeeCatalogExplorerProps) {
  const t = copy[locale];
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [sector, setSector] = useState("");
  const [problem, setProblem] = useState("");
  const [task, setTask] = useState("");

  const filtered = useMemo(() => {
    const query = normalize(search.trim());
    return profiles.filter((profile) => {
      if (department && profile.departmentId !== department) return false;
      if (sector && !profile.sectorIds.includes(sector)) return false;
      if (problem && !profile.problemIds.includes(problem)) return false;
      if (task && !profile.taskIds.includes(task)) return false;
      if (!query) return true;
      const haystack = normalize([profile.name, profile.shortName, profile.description, profile.focus, profile.department, ...profile.tasks, ...profile.problems, ...profile.sectors].join(" "));
      return haystack.includes(query);
    });
  }, [department, problem, profiles, search, sector, task]);

  const reset = () => { setSearch(""); setDepartment(""); setSector(""); setProblem(""); setTask(""); };

  return (
    <div className="employee-catalog-explorer">
      <div className="catalog-filter-panel" aria-label={locale === "es" ? "Filtros del catálogo" : "Catalog filters"}>
        <label className="catalog-filter catalog-filter-search"><span>{t.search}</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.searchPlaceholder} type="search" /></label>
        <label className="catalog-filter"><span>{t.department}</span><select value={department} onChange={(event) => setDepartment(event.target.value)}><option value="">{t.all}</option>{options.departments.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <label className="catalog-filter"><span>{t.sector}</span><select value={sector} onChange={(event) => setSector(event.target.value)}><option value="">{t.all}</option>{options.sectors.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <label className="catalog-filter"><span>{t.problem}</span><select value={problem} onChange={(event) => setProblem(event.target.value)}><option value="">{t.all}</option>{options.problems.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <label className="catalog-filter"><span>{t.task}</span><select value={task} onChange={(event) => setTask(event.target.value)}><option value="">{t.all}</option>{options.tasks.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
        <button className="catalog-filter-reset" type="button" onClick={reset}>{t.clear}</button>
      </div>

      <div className="catalog-results-bar"><strong aria-live="polite">{t.results(filtered.length)}</strong><div className="catalog-status-legend" aria-label={locale === "es" ? "Estados del catálogo" : "Catalog statuses"}><span><i className="legend-dot is-reference" />{t.reference}</span><span><i className="legend-dot is-catalog" />{t.catalog}</span><span><i className="legend-dot is-restricted" />{t.restricted}</span></div></div>

      {filtered.length > 0 ? (
        <div className="employee-catalog-grid employee-catalog-grid-discovery">
          {filtered.map((profile, index) => {
            const character = profile.status === "reference" ? getBrandCharacterForProfileKey(profile.key, locale) : undefined;
            return (
              <article className={`employee-catalog-card discovery-card status-${profile.status}${character ? " has-brand-character" : ""}`} data-accent={character?.accent} key={profile.key}>
                {character && <div className="discovery-character-visual" aria-hidden="true"><img src={character.asset} alt="" width={180} height={220} /><span><strong>{character.name}</strong><small>{character.shortRole}</small></span></div>}
                <div className="employee-card-topline"><span className="employee-card-index">{String(index + 1).padStart(2, "0")}</span><span className={`employee-content-status is-${profile.status}`}>{profile.status === "reference" ? t.reference : profile.status === "restricted" ? t.restricted : t.catalog}</span></div>
                <p className="employee-department">{profile.department}</p>
                <h3>{profile.shortName}</h3>
                <p className="employee-card-description">{profile.description}</p>
                <dl className="employee-card-meta"><div><dt>{t.departmentLabel}</dt><dd>{profile.department}</dd></div><div><dt>{t.focusLabel}</dt><dd>{profile.focus}</dd></div></dl>
                <div className="discovery-taxonomy-block"><p><strong>{t.tasksLabel}</strong></p><div className="discovery-chip-row">{profile.tasks.slice(0, 3).map((item) => <span key={item}>{item}</span>)}</div></div>
                <div className="discovery-taxonomy-block"><p><strong>{t.problemsLabel}</strong></p><div className="discovery-chip-row is-muted">{profile.problems.slice(0, 2).map((item) => <span key={item}>{item}</span>)}</div></div>
                <p className="discovery-sector-line"><strong>{t.sectorsLabel}:</strong> {profile.sectors.slice(0, 3).join(" · ")}</p>
                <div className="discovery-card-footer">{profile.href ? <Link className="employee-text-link" href={profile.href}>{t.view} <span aria-hidden="true">→</span></Link> : <span className={`employee-text-link is-disabled${profile.status === "restricted" ? " is-restricted" : ""}`}>{profile.status === "restricted" ? t.restrictedCta : t.catalogCta}</span>}</div>
              </article>
            );
          })}
        </div>
      ) : <div className="catalog-empty-state" role="status"><p>{t.empty}</p><button className="button button-ghost" type="button" onClick={reset}>{t.clear}</button></div>}
    </div>
  );
}

import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import { employeeDetailPath, getEmployeeCatalog } from "../lib/employee-content-engine";
import { getBrandCharacterByEmployeeKey } from "../lib/brand-characters";
import { getTeamRecords, teamDetailPath } from "../lib/team-content-engine";
import { useCaseDetailPath, useCaseRecords } from "../lib/sector-use-cases";
import {
  departmentDetailPath,
  departmentRecords,
  integrationDetailPath,
  integrationIndexPath,
  type IntegrationRecord,
} from "../lib/organization-map";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { BrandOrganizationScene } from "./brand-organization-scene";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale; integration: IntegrationRecord };

export function IntegrationDetailPage({ locale, integration }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = integrationDetailPath(integration.key, locale);
  const alternate = integrationDetailPath(integration.key, otherLocale);
  const catalog = getEmployeeCatalog(locale);
  const teams = getTeamRecords();
  const relatedDepartments = integration.departments.map((key) => departmentRecords.find((item) => item.key === key)).filter(Boolean);
  const relatedUseCases = integration.useCases.map((key) => useCaseRecords.find((item) => item.key === key)).filter(Boolean);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: integration.seoTitle[locale],
    description: integration.seoDescription[locale],
    url: `https://iaempleado.com${canonical}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
    isPartOf: { "@type": "WebSite", name: "IA Empleado", url: locale === "es" ? "https://iaempleado.com/" : "https://iaempleado.com/en" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://iaempleado.com${localeHref(locale)}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Integraciones" : "Integrations", item: `https://iaempleado.com${integrationIndexPath(locale)}` },
      { "@type": "ListItem", position: 3, name: integration.name[locale], item: `https://iaempleado.com${canonical}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: integration.faq[locale].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternate} />
      <main id="contenido" className="organization-map-page">
        <section className="organization-detail-hero section-shell integration-detail-hero">
          <div className="container organization-detail-hero-grid brand-organization-detail-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <Link href={integrationIndexPath(locale)}>{locale === "es" ? "Integraciones" : "Integrations"}</Link>
                <span aria-hidden="true">/</span>
                <span>{integration.name[locale]}</span>
              </nav>
              <p className="eyebrow">{integration.eyebrow[locale]}</p>
              <h1>{integration.heroTitle[locale]}</h1>
              <p className="organization-hero-lead">{integration.heroDescription[locale]}</p>
              <div className="organization-short-answer" role="note"><strong>{locale === "es" ? "Respuesta corta" : "Short answer"}</strong><p>{integration.shortAnswer[locale]}</p></div>
              <div className="hero-actions"><a className="button" href="#integration-contract">{locale === "es" ? "Ver contrato de integración" : "View integration contract"}</a><Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar mi proceso" : "Analyze my process"}</Link></div>
            </div>
            <div className="brand-organization-hero-side">
              <BrandOrganizationScene
                locale={locale}
                kind="integration"
                contextKey={integration.key}
                eyebrow={integration.eyebrow[locale]}
                title={integration.name[locale]}
                employeeKeys={integration.employeeKeys}
                systems={[integration.name[locale], "READ", "WRITE", locale === "es" ? "Auditoría" : "Audit"]}
                humanLabel={locale === "es" ? "Acción sensible → persona" : "Sensitive action → person"}
              />
              <aside className="organization-summary-card integration-summary">
                <span>{locale === "es" ? "Alcance de referencia" : "Reference scope"}</span>
                <dl><div><dt>{locale === "es" ? "Departamentos" : "Departments"}</dt><dd>{integration.departments.length}</dd></div><div><dt>{locale === "es" ? "Casos de uso" : "Use cases"}</dt><dd>{integration.useCases.length}</dd></div><div><dt>{locale === "es" ? "Perfiles profundos" : "Deep profiles"}</dt><dd>{integration.employeeKeys.length}</dd></div></dl>
                <p>{locale === "es" ? "Categoría de sistema · no implica un conector universal ni compatibilidad con todos los proveedores." : "System category · does not imply a universal connector or compatibility with every vendor."}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="integration-purpose-title">
          <div className="container organization-two-column">
            <div className="section-heading organization-section-heading"><p className="eyebrow">{locale === "es" ? "PARA QUÉ" : "PURPOSE"}</p><h2 id="integration-purpose-title">{locale === "es" ? "Qué trabajo habilita esta integración" : "What work this integration enables"}</h2><p>{locale === "es" ? "La integración existe para servir un proceso; conectar por conectar no es un objetivo." : "The integration exists to serve a process; connecting systems for its own sake is not the goal."}</p></div>
            <ul className="organization-list">{integration.purpose[locale].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ul>
          </div>
        </section>

        <section className="content-section" id="integration-contract" aria-labelledby="integration-contract-title">
          <div className="container">
            <div className="section-heading organization-section-heading"><p className="eyebrow">{locale === "es" ? "CONTRATO" : "CONTRACT"}</p><h2 id="integration-contract-title">{locale === "es" ? "Separar lectura y escritura" : "Separate read and write"}</h2><p>{locale === "es" ? "Una misma API puede exponer muchas acciones, pero cada Empleado IA debe recibir solo el alcance necesario." : "The same API may expose many actions, but each AI Employee should receive only the scope it needs."}</p></div>
            <div className="integration-read-write-grid brand-integration-contract-grid">
              <article><span className="integration-mode read-mode">READ</span><h3>{locale === "es" ? "Lecturas habituales" : "Typical reads"}</h3><ul>{integration.reads[locale].map((item) => <li key={item}>{item}</li>)}</ul></article>
              <article><span className="integration-mode write-mode">WRITE</span><h3>{locale === "es" ? "Escrituras que pueden evaluarse" : "Writes that may be evaluated"}</h3><ul>{integration.writes[locale].map((item) => <li key={item}>{item}</li>)}</ul></article>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="integration-departments-title">
          <div className="container"><div className="section-heading organization-section-heading"><p className="eyebrow">{locale === "es" ? "DEPARTAMENTOS" : "DEPARTMENTS"}</p><h2 id="integration-departments-title">{locale === "es" ? "Dónde puede aportar valor" : "Where it can add value"}</h2></div><div className="organization-card-grid compact-grid">{relatedDepartments.map((record) => record && <article className="organization-card" key={record.key}><h3>{record.name[locale]}</h3><p>{record.shortAnswer[locale]}</p><Link className="text-link" href={departmentDetailPath(record.key, locale)}>{locale === "es" ? "Ver departamento" : "View department"} <span aria-hidden="true">→</span></Link></article>)}</div></div>
        </section>

        <section className="content-section" aria-labelledby="integration-process-title">
          <div className="container"><div className="section-heading organization-section-heading"><p className="eyebrow">{locale === "es" ? "CASOS DE USO" : "USE CASES"}</p><h2 id="integration-process-title">{locale === "es" ? "Procesos relacionados" : "Related processes"}</h2></div><div className="organization-card-grid compact-grid">{relatedUseCases.map((record) => record && <article className="organization-card" key={record.key}><h3>{record.title[locale]}</h3><p>{record.shortAnswer[locale]}</p><Link className="text-link" href={useCaseDetailPath(record.key, locale)}>{locale === "es" ? "Ver caso de uso" : "View use case"} <span aria-hidden="true">→</span></Link></article>)}</div></div>
        </section>

        <section className="content-section section-panel" aria-labelledby="integration-roles-title">
          <div className="container">
            <div className="section-heading organization-section-heading"><p className="eyebrow">{locale === "es" ? "ROLES" : "ROLES"}</p><h2 id="integration-roles-title">{locale === "es" ? "Empleados IA que podrían usarla" : "AI Employees that could use it"}</h2><p>{locale === "es" ? "Cada rol mantiene permisos independientes aunque comparta el mismo sistema." : "Each role keeps independent permissions even when sharing the same system."}</p></div>
            <div className="organization-role-grid">
              {integration.employeeKeys.map((key) => {
                const employee = catalog.find((item) => item.key === key);
                const character = getBrandCharacterByEmployeeKey(key, locale);
                return employee ? (
                  <article className="organization-role-card brand-organization-role-card" data-accent={character?.accent} key={key}>
                    {character ? <img className="organization-role-portrait" src={character.asset} alt="" width={104} height={124} /> : <span aria-hidden="true">{employee.shortName.slice(0, 2).toUpperCase()}</span>}
                    <div><h3>{character ? `${character.name} · ${employee.shortName}` : employee.shortName}</h3><p>{employee.description}</p><Link className="text-link" href={employeeDetailPath(key, locale)}>{locale === "es" ? "Ver perfil" : "View profile"} <span aria-hidden="true">→</span></Link></div>
                  </article>
                ) : null;
              })}
            </div>
            <div className="organization-team-links"><strong>{locale === "es" ? "Equipos IA relacionados" : "Related AI Teams"}</strong><div>{integration.teams.map((key) => { const team = teams.find((item) => item.key === key); return team ? <Link className="chip-link" key={key} href={teamDetailPath(key, locale)}>{team.locales[locale].shortName}</Link> : null; })}</div></div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="integration-checklist-title">
          <div className="container"><div className="section-heading organization-section-heading"><p className="eyebrow">{locale === "es" ? "ANTES DE CONECTAR" : "BEFORE CONNECTING"}</p><h2 id="integration-checklist-title">{locale === "es" ? "Checklist mínimo de diseño" : "Minimum design checklist"}</h2></div><div className="organization-method-grid">{integration.checklist[locale].map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div></div>
        </section>

        <section className="content-section section-panel" aria-labelledby="integration-control-title">
          <div className="container organization-control-metrics"><div className="organization-control-panel"><p className="eyebrow">{locale === "es" ? "CONTROL" : "CONTROL"}</p><h2 id="integration-control-title">{locale === "es" ? "Guardrails que deben quedar explícitos" : "Guardrails that should remain explicit"}</h2><ul>{integration.controls[locale].map((item) => <li key={item}>{item}</li>)}</ul></div><div><p className="eyebrow">{locale === "es" ? "LÍMITES" : "LIMITS"}</p><h2>{locale === "es" ? "Lo que la página no promete" : "What this page does not promise"}</h2><ul className="organization-limit-list">{integration.limits[locale].map((item) => <li key={item}>{item}</li>)}</ul></div></div>
        </section>

        <section className="content-section" aria-labelledby="integration-faq-title">
          <div className="container faq-layout"><div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="integration-faq-title">{locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}</h2></div><div className="faq-list">{integration.faq[locale].map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div>
        </section>

        <section className="content-section final-cta"><div className="container cta-panel"><div><p className="eyebrow">{locale === "es" ? "INTEGRAR CON PROPÓSITO" : "INTEGRATE WITH PURPOSE"}</p><h2>{locale === "es" ? "Empieza por el proceso, luego decide qué sistema necesita el Empleado IA." : "Start with the process, then decide which system the AI Employee needs."}</h2><p>{locale === "es" ? "Así reducimos permisos, dependencias y complejidad antes de ampliar el alcance." : "This reduces permissions, dependencies and complexity before expanding scope."}</p></div><div className="cta-actions"><Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar mi proceso" : "Analyze my process"}</Link><Link className="button button-ghost" href={integrationIndexPath(locale)}>{locale === "es" ? "Ver todas las integraciones" : "View all integrations"}</Link></div></div></section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import { employeeDetailPath } from "../lib/employee-content-engine";
import { getBrandCharacterByEmployeeKey } from "../lib/brand-characters";
import { getTeamRecords, teamDetailPath } from "../lib/team-content-engine";
import {
  sectorDetailPath,
  sectorIndexPath,
  type SectorRecord,
  useCaseDetailPath,
  useCaseRecords,
} from "../lib/sector-use-cases";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { roiEstimatorPath } from "../lib/roi-estimator";
import { teamBuilderPath } from "../lib/team-builder";
import { comparisonIndexPath } from "../lib/comparison-content";
import { BrandCharacterStrip, BrandContextScene } from "./brand-context-scene";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale; sector: SectorRecord };

export function SectorDetailPage({ locale, sector }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = sectorDetailPath(sector.key, locale);
  const alternate = sectorDetailPath(sector.key, otherLocale);
  const relatedUseCases = sector.useCases.map((key) => useCaseRecords.find((record) => record.key === key)).filter(Boolean);
  const teams = getTeamRecords();

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: sector.seoTitle[locale],
    description: sector.seoDescription[locale],
    url: `https://iaempleado.com${canonical}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
    isPartOf: { "@type": "WebSite", name: "IA Empleado", url: locale === "es" ? "https://iaempleado.com/" : "https://iaempleado.com/en" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://iaempleado.com${localeHref(locale)}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Sectores" : "Industries", item: `https://iaempleado.com${sectorIndexPath(locale)}` },
      { "@type": "ListItem", position: 3, name: sector.name[locale], item: `https://iaempleado.com${canonical}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: sector.faq[locale].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternate} />
      <main id="contenido" className="sector-cluster-page brand-sector-cluster-page">
        <section className="sector-detail-hero section-shell brand-sector-detail-hero" data-sector={sector.key}>
          <div className="container sector-detail-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <Link href={sectorIndexPath(locale)}>{locale === "es" ? "Sectores" : "Industries"}</Link>
                <span aria-hidden="true">/</span>
                <span>{sector.name[locale]}</span>
              </nav>
              <p className="eyebrow">{sector.eyebrow[locale]}</p>
              <h1>{sector.heroTitle[locale]}</h1>
              <p className="sector-hero-lead">{sector.heroDescription[locale]}</p>
              <div className="sector-short-answer" role="note">
                <strong>{locale === "es" ? "Respuesta corta" : "Short answer"}</strong>
                <p>{sector.shortAnswer[locale]}</p>
              </div>
              <div className="hero-actions">
                <a className="button" href="#procesos-sector">{locale === "es" ? "Ver procesos" : "View processes"}</a>
                <Link className="button button-ghost" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar mi Equipo IA" : "Design my AI Team"}</Link>
              </div>
            </div>
            <div className="brand-sector-detail-visual">
              <BrandContextScene
                locale={locale}
                kind="sector"
                contextKey={sector.key}
                eyebrow={sector.eyebrow[locale]}
                title={sector.name[locale]}
                roles={sector.roles[locale]}
                systems={sector.systems[locale]}
                humanLabel={locale === "es" ? "Aprobación humana cuando la política lo exige" : "Human approval when policy requires it"}
              />
              <aside className="sector-detail-summary brand-sector-summary">
                <span className="sector-summary-kicker">{locale === "es" ? "Mapa operativo" : "Operating map"}</span>
                <dl>
                  <div><dt>{locale === "es" ? "Casos de uso" : "Use cases"}</dt><dd>{sector.useCases.length}</dd></div>
                  <div><dt>{locale === "es" ? "Roles mostrados" : "Roles shown"}</dt><dd>{sector.roles[locale].length}</dd></div>
                  <div><dt>{locale === "es" ? "Sistemas a evaluar" : "Systems to evaluate"}</dt><dd>{sector.systems[locale].length}</dd></div>
                </dl>
                <p>{locale === "es" ? "Modelo educativo de referencia · la implantación final depende del entorno real." : "Educational reference model · final implementation depends on the real environment."}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="sector-problems-title">
          <div className="container sector-two-column">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "FRICCIONES HABITUALES" : "COMMON FRICTION"}</p>
              <h2 id="sector-problems-title">{locale === "es" ? `Qué suele romperse en ${sector.name.es}` : `What commonly breaks in ${sector.name.en}`}</h2>
              <p>{locale === "es" ? "No todos estos problemas existen en todas las empresas; sirven para identificar dónde empezar a mapear." : "Not every business has every problem; these help identify where process mapping should start."}</p>
            </div>
            <ul className="sector-problem-list">
              {sector.problems[locale].map((problem, index) => (
                <li key={problem}><span>{String(index + 1).padStart(2, "0")}</span><p>{problem}</p></li>
              ))}
            </ul>
          </div>
        </section>

        <section className="content-section" id="procesos-sector" aria-labelledby="sector-usecases-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "PROCESOS" : "PROCESSES"}</p>
              <h2 id="sector-usecases-title">{locale === "es" ? "Casos de uso relacionados" : "Related use cases"}</h2>
              <p>{locale === "es" ? "Cada caso explica pasos, responsabilidad, sistemas, controles y límites con más detalle." : "Each use case explains steps, responsibility, systems, controls and limits in more detail."}</p>
            </div>
            <div className="use-case-card-grid">
              {relatedUseCases.map((record) => record && (
                <article className="use-case-card brand-use-case-card" data-use-case={record.key} key={record.key}>
                  <div className="sector-card-topline"><span>{record.eyebrow[locale]}</span><span>{record.steps[locale].length} {locale === "es" ? "pasos" : "steps"}</span></div>
                  <BrandCharacterStrip locale={locale} roles={record.roles[locale]} compact />
                  <h3>{record.title[locale]}</h3>
                  <p>{record.shortAnswer[locale]}</p>
                  <Link className="text-link" href={useCaseDetailPath(record.key, locale)}>{locale === "es" ? "Abrir caso de uso" : "Open use case"} <span aria-hidden="true">→</span></Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="sector-team-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "EQUIPO" : "TEAM"}</p>
              <h2 id="sector-team-title">{locale === "es" ? "Roles que pueden participar" : "Roles that can participate"}</h2>
              <p>{locale === "es" ? "La composición no es un paquete fijo. Cada rol obtiene solo los sistemas y permisos necesarios para su trabajo." : "This is not a fixed package. Each role receives only the systems and permissions needed for its work."}</p>
            </div>
            <div className="sector-role-grid">
              {sector.roles[locale].map((role) => {
                const character = role.employeeKey ? getBrandCharacterByEmployeeKey(role.employeeKey, locale) : undefined;
                return (
                  <article key={role.name} className={`sector-role-card${character ? " has-brand-character" : ""}`}>
                    {character ? (
                      <span className="sector-role-character" data-accent={character.accent} aria-hidden="true"><img src={character.asset} alt="" width={96} height={112} /></span>
                    ) : (
                      <span className="sector-role-mark" aria-hidden="true">{role.name.slice(0, 2).toUpperCase()}</span>
                    )}
                    <div>
                      {character && <p className="sector-role-character-name">{character.name}</p>}
                      <h3>{role.name}</h3>
                      <p>{role.contribution}</p>
                      {role.employeeKey ? <Link className="text-link" href={employeeDetailPath(role.employeeKey, locale)}>{locale === "es" ? "Ver perfil" : "View profile"} <span aria-hidden="true">→</span></Link> : <small>{locale === "es" ? "Perfil de catálogo · requiere adaptación" : "Catalog profile · requires adaptation"}</small>}
                    </div>
                  </article>
                );
              })}
            </div>
            <div className="sector-reference-teams">
              <strong>{locale === "es" ? "Equipos de referencia relacionados" : "Related reference teams"}</strong>
              <div>
                {sector.teams.map((key) => {
                  const team = teams.find((item) => item.key === key);
                  if (!team) return null;
                  return <Link key={key} className="chip-link" href={teamDetailPath(key, locale)}>{team.locales[locale].shortName}</Link>;
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="sector-systems-title">
          <div className="container sector-systems-controls">
            <div>
              <p className="eyebrow">{locale === "es" ? "SISTEMAS" : "SYSTEMS"}</p>
              <h2 id="sector-systems-title">{locale === "es" ? "Qué sistemas habría que evaluar" : "Which systems should be evaluated"}</h2>
              <p>{locale === "es" ? "Que un sistema aparezca aquí no significa que exista un conector universal listo para activar." : "A system appearing here does not imply a universal ready-made connector exists."}</p>
              <div className="sector-system-cloud">{sector.systems[locale].map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <div className="sector-control-panel">
              <p className="eyebrow">{locale === "es" ? "CONTROL HUMANO" : "HUMAN CONTROL"}</p>
              <h2>{locale === "es" ? "Dónde no conviene confundir capacidad con autoridad" : "Where capability should not be confused with authority"}</h2>
              <ul>{sector.controls[locale].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="sector-implementation-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "IMPLANTACIÓN" : "IMPLEMENTATION"}</p>
              <h2 id="sector-implementation-title">{locale === "es" ? "Cómo empezar sin intentar automatizar el sector entero" : "How to start without trying to automate the entire industry"}</h2>
            </div>
            <div className="sector-method-grid">
              {sector.implementation[locale].map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="sector-metrics-title">
          <div className="container sector-metrics-layout">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "MEDICIÓN" : "MEASUREMENT"}</p>
              <h2 id="sector-metrics-title">{locale === "es" ? "Métricas para validar si mejora el proceso" : "Metrics to validate whether the process improves"}</h2>
              <p>{locale === "es" ? "Son indicadores posibles, no resultados prometidos. Primero se necesita una línea base real." : "These are possible indicators, not promised outcomes. A real baseline comes first."}</p>
            </div>
            <div className="sector-metric-grid">{sector.metrics[locale].map((metric) => <span key={metric}>{metric}</span>)}</div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="sector-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="sector-faq-title">{locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}</h2></div>
            <div className="faq-list">
              {sector.faq[locale].map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}
            </div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{locale === "es" ? "PASAR DE SECTOR A PROCESO" : "MOVE FROM INDUSTRY TO PROCESS"}</p>
              <h2>{locale === "es" ? "El siguiente paso es elegir un proceso concreto y medirlo." : "The next step is to choose one concrete process and measure it."}</h2>
              <p>{locale === "es" ? "Mapea el antes/después, estima capacidad potencial con supuestos transparentes y decide qué Equipo IA tendría sentido evaluar." : "Map the before/after, estimate potential capacity with transparent assumptions and decide which AI Team is worth evaluating."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link>
              <Link className="button button-ghost" href={roiEstimatorPath(locale)}>{locale === "es" ? "Calcular valor potencial" : "Estimate potential value"}</Link>
              <Link className="button button-ghost" href={comparisonIndexPath(locale)}>{locale === "es" ? "Comparar enfoques" : "Compare approaches"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

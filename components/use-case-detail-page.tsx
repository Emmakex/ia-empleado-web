import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import { employeeDetailPath } from "../lib/employee-content-engine";
import { getBrandCharacterByEmployeeKey } from "../lib/brand-characters";
import { getTeamRecords, teamDetailPath } from "../lib/team-content-engine";
import {
  sectorDetailPath,
  sectorRecords,
  useCaseDetailPath,
  useCaseIndexPath,
  type UseCaseRecord,
} from "../lib/sector-use-cases";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { roiEstimatorPath } from "../lib/roi-estimator";
import { BrandContextScene } from "./brand-context-scene";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale; record: UseCaseRecord };

function modeLabel(mode: "automated" | "assisted" | "human", locale: Locale) {
  if (mode === "automated") return locale === "es" ? "Automatizable" : "Automatable";
  if (mode === "assisted") return locale === "es" ? "Asistido" : "Assisted";
  return locale === "es" ? "Humano" : "Human";
}

export function UseCaseDetailPage({ locale, record }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = useCaseDetailPath(record.key, locale);
  const alternate = useCaseDetailPath(record.key, otherLocale);
  const teams = getTeamRecords();

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: record.seoTitle[locale],
    description: record.seoDescription[locale],
    url: `https://iaempleado.com${canonical}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: record.title[locale],
    description: record.shortAnswer[locale],
    step: record.steps[locale].map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.title,
      text: step.text,
    })),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.faq[locale].map((item) => ({
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
        <section className="use-case-detail-hero section-shell brand-use-case-detail-hero" data-use-case={record.key}>
          <div className="container sector-detail-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <Link href={useCaseIndexPath(locale)}>{locale === "es" ? "Casos de uso" : "Use cases"}</Link>
                <span aria-hidden="true">/</span>
                <span>{record.title[locale]}</span>
              </nav>
              <p className="eyebrow">{record.eyebrow[locale]}</p>
              <h1>{record.heroTitle[locale]}</h1>
              <p className="sector-hero-lead">{record.heroDescription[locale]}</p>
              <div className="sector-short-answer" role="note"><strong>{locale === "es" ? "Respuesta corta" : "Short answer"}</strong><p>{record.shortAnswer[locale]}</p></div>
              <div className="hero-actions">
                <a className="button" href="#flujo-caso">{locale === "es" ? "Ver flujo" : "View workflow"}</a>
                <Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Aplicarlo a mi proceso" : "Apply it to my process"}</Link>
              </div>
            </div>
            <div className="brand-sector-detail-visual">
              <BrandContextScene
                locale={locale}
                kind="use-case"
                contextKey={record.key}
                eyebrow={record.eyebrow[locale]}
                title={record.title[locale]}
                roles={record.roles[locale]}
                systems={record.systems[locale]}
                humanLabel={locale === "es" ? "Escalado humano en excepciones" : "Human escalation for exceptions"}
              />
              <aside className="sector-detail-summary brand-sector-summary">
                <span className="sector-summary-kicker">{locale === "es" ? "Patrón de referencia" : "Reference pattern"}</span>
                <dl>
                  <div><dt>{locale === "es" ? "Pasos" : "Steps"}</dt><dd>{record.steps[locale].length}</dd></div>
                  <div><dt>{locale === "es" ? "Roles" : "Roles"}</dt><dd>{record.roles[locale].length}</dd></div>
                  <div><dt>{locale === "es" ? "Sectores relacionados" : "Related industries"}</dt><dd>{record.sectors.length}</dd></div>
                </dl>
                <p>{locale === "es" ? "Diseño educativo · no representa una implantación lista para producción." : "Educational design · not a production-ready implementation."}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="use-case-problem-title">
          <div className="container sector-two-column">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "PROBLEMA OPERATIVO" : "OPERATIONAL PROBLEM"}</p>
              <h2 id="use-case-problem-title">{locale === "es" ? "Qué intenta resolver este patrón" : "What this pattern is trying to solve"}</h2>
            </div>
            <div className="use-case-problem-copy"><p>{record.problem[locale]}</p></div>
          </div>
        </section>

        <section className="content-section" id="flujo-caso" aria-labelledby="use-case-flow-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "FLUJO" : "WORKFLOW"}</p>
              <h2 id="use-case-flow-title">{locale === "es" ? "Responsabilidad paso a paso" : "Responsibility step by step"}</h2>
              <p>{locale === "es" ? "Automatizable no significa autónomo sin límites. Cada paso depende de calidad de datos, permisos y reglas." : "Automatable does not mean autonomous without limits. Every step depends on data quality, permissions and rules."}</p>
            </div>
            <ol className="use-case-flow-list brand-use-case-flow-list">
              {record.steps[locale].map((step, index) => (
                <li key={step.title} className={`use-case-flow-step mode-${step.mode}`}>
                  <span className="use-case-step-number">{String(index + 1).padStart(2, "0")}</span>
                  <div><span className={`use-case-mode mode-${step.mode}`}>{modeLabel(step.mode, locale)}</span><h3>{step.title}</h3><p>{step.text}</p></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="use-case-roles-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "COLABORACIÓN" : "COLLABORATION"}</p>
              <h2 id="use-case-roles-title">{locale === "es" ? "Qué roles pueden intervenir" : "Which roles can participate"}</h2>
            </div>
            <div className="sector-role-grid">
              {record.roles[locale].map((role) => {
                const character = role.employeeKey ? getBrandCharacterByEmployeeKey(role.employeeKey, locale) : undefined;
                return (
                  <article className={`sector-role-card${character ? " has-brand-character" : ""}`} key={role.name}>
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
              <strong>{locale === "es" ? "Equipos de referencia" : "Reference teams"}</strong>
              <div>{record.teams.map((key) => { const team = teams.find((item) => item.key === key); return team ? <Link key={key} className="chip-link" href={teamDetailPath(key, locale)}>{team.locales[locale].shortName}</Link> : null; })}</div>
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="use-case-systems-title">
          <div className="container sector-systems-controls">
            <div>
              <p className="eyebrow">{locale === "es" ? "SISTEMAS" : "SYSTEMS"}</p>
              <h2 id="use-case-systems-title">{locale === "es" ? "Fuentes y herramientas a evaluar" : "Sources and tools to evaluate"}</h2>
              <p>{locale === "es" ? "Esta lista describe contexto típico, no conectores universales disponibles por defecto." : "This list describes typical context, not universal connectors available by default."}</p>
              <div className="sector-system-cloud">{record.systems[locale].map((item) => <span key={item}>{item}</span>)}</div>
            </div>
            <div className="sector-control-panel">
              <p className="eyebrow">{locale === "es" ? "ESCALADO" : "ESCALATION"}</p>
              <h2>{locale === "es" ? "Cuándo debe intervenir una persona" : "When a person should intervene"}</h2>
              <ul>{record.controls[locale].map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="use-case-sectors-title">
          <div className="container sector-two-column">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "DÓNDE ENCAJA" : "WHERE IT FITS"}</p>
              <h2 id="use-case-sectors-title">{locale === "es" ? "Sectores relacionados" : "Related industries"}</h2>
              <p>{locale === "es" ? "El mismo patrón cambia según las fuentes de verdad, regulación, volumen y excepciones del sector." : "The same pattern changes according to the industry’s sources of truth, regulation, volume and exceptions."}</p>
            </div>
            <div className="sector-related-links">
              {record.sectors.map((key) => { const sector = sectorRecords.find((item) => item.key === key); return sector ? <Link key={key} href={sectorDetailPath(key, locale)}><strong>{sector.name[locale]}</strong><span>{sector.shortAnswer[locale]}</span></Link> : null; })}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="use-case-measure-title">
          <div className="container sector-metrics-layout">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "VALIDACIÓN" : "VALIDATION"}</p>
              <h2 id="use-case-measure-title">{locale === "es" ? "Cómo medir si el rediseño aporta valor" : "How to measure whether the redesign creates value"}</h2>
              <p>{locale === "es" ? "Mide contra el proceso actual. No conviertas un ejemplo de referencia en un KPI prometido." : "Measure against the current process. Do not turn a reference example into a promised KPI."}</p>
            </div>
            <div className="sector-metric-grid">{record.metrics[locale].map((metric) => <span key={metric}>{metric}</span>)}</div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="use-case-limits-title">
          <div className="container sector-two-column">
            <div className="section-heading sector-section-heading"><p className="eyebrow">{locale === "es" ? "LÍMITES" : "LIMITS"}</p><h2 id="use-case-limits-title">{locale === "es" ? "Lo que este caso de uso no demuestra" : "What this use case does not prove"}</h2></div>
            <ul className="sector-limit-list">{record.limits[locale].map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="content-section" aria-labelledby="use-case-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="use-case-faq-title">{locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}</h2></div>
            <div className="faq-list">{record.faq[locale].map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div><p className="eyebrow">{locale === "es" ? "PRÓXIMO PASO" : "NEXT STEP"}</p><h2>{locale === "es" ? "Compara este patrón con tu proceso real antes de hablar de automatización." : "Compare this pattern with your real process before talking about automation."}</h2><p>{locale === "es" ? "Marca cuellos de botella, conserva los puntos humanos necesarios y calcula el valor potencial con tus propios datos." : "Mark bottlenecks, keep the human control points you need and estimate potential value with your own data."}</p></div>
            <div className="cta-actions"><Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link><Link className="button button-ghost" href={roiEstimatorPath(locale)}>{locale === "es" ? "Calcular valor potencial" : "Estimate potential value"}</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import { employeeDetailPath, getEmployeeCatalog } from "../lib/employee-content-engine";
import { getTeamRecords, teamDetailPath } from "../lib/team-content-engine";
import { useCaseDetailPath, useCaseRecords } from "../lib/sector-use-cases";
import {
  departmentDetailPath,
  departmentIndexPath,
  integrationDetailPath,
  integrationIndexPath,
  integrationRecords,
  type DepartmentRecord,
} from "../lib/organization-map";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { roiEstimatorPath } from "../lib/roi-estimator";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale; department: DepartmentRecord };

export function DepartmentDetailPage({ locale, department }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = departmentDetailPath(department.key, locale);
  const alternate = departmentDetailPath(department.key, otherLocale);
  const catalog = getEmployeeCatalog(locale);
  const teams = getTeamRecords();
  const relatedUseCases = department.useCases.map((key) => useCaseRecords.find((item) => item.key === key)).filter(Boolean);
  const relatedIntegrations = department.integrations.map((key) => integrationRecords.find((item) => item.key === key)).filter(Boolean);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: department.seoTitle[locale],
    description: department.seoDescription[locale],
    url: `https://iaempleado.com${canonical}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
    isPartOf: { "@type": "WebSite", name: "IA Empleado", url: locale === "es" ? "https://iaempleado.com/" : "https://iaempleado.com/en" },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://iaempleado.com${localeHref(locale)}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Departamentos" : "Departments", item: `https://iaempleado.com${departmentIndexPath(locale)}` },
      { "@type": "ListItem", position: 3, name: department.name[locale], item: `https://iaempleado.com${canonical}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: department.faq[locale].map((item) => ({
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
        <section className="organization-detail-hero section-shell">
          <div className="container organization-detail-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <Link href={departmentIndexPath(locale)}>{locale === "es" ? "Departamentos" : "Departments"}</Link>
                <span aria-hidden="true">/</span>
                <span>{department.name[locale]}</span>
              </nav>
              <p className="eyebrow">{department.eyebrow[locale]}</p>
              <h1>{department.heroTitle[locale]}</h1>
              <p className="organization-hero-lead">{department.heroDescription[locale]}</p>
              <div className="organization-short-answer" role="note">
                <strong>{locale === "es" ? "Respuesta corta" : "Short answer"}</strong>
                <p>{department.shortAnswer[locale]}</p>
              </div>
              <div className="hero-actions">
                <a className="button" href="#department-work">{locale === "es" ? "Ver responsabilidades" : "View responsibilities"}</a>
                <Link className="button button-ghost" href={integrationIndexPath(locale)}>{locale === "es" ? "Explorar integraciones" : "Explore integrations"}</Link>
              </div>
            </div>
            <aside className="organization-summary-card">
              <span>{locale === "es" ? "Mapa del departamento" : "Department map"}</span>
              <dl>
                <div><dt>{locale === "es" ? "Perfiles profundos" : "Deep profiles"}</dt><dd>{department.employeeKeys.length}</dd></div>
                <div><dt>{locale === "es" ? "Casos de uso" : "Use cases"}</dt><dd>{department.useCases.length}</dd></div>
                <div><dt>{locale === "es" ? "Integraciones" : "Integrations"}</dt><dd>{department.integrations.length}</dd></div>
              </dl>
              <p>{locale === "es" ? "Modelo educativo · la composición final se adapta a sistemas, permisos y procesos reales." : "Educational model · final composition adapts to real systems, permissions and processes."}</p>
            </aside>
          </div>
        </section>

        <section className="content-section section-panel" id="department-work" aria-labelledby="department-work-title">
          <div className="container organization-two-column">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "RESPONSABILIDAD" : "RESPONSIBILITY"}</p>
              <h2 id="department-work-title">{locale === "es" ? "Trabajo que puede organizar el departamento" : "Work the department can organize"}</h2>
              <p>{locale === "es" ? "La automatización debe empezar por trabajo acotado y medible, no por delegar de golpe toda la función." : "Automation should start with bounded, measurable work rather than delegating the whole function at once."}</p>
            </div>
            <ul className="organization-list">
              {department.responsibilities[locale].map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}
            </ul>
          </div>
        </section>

        <section className="content-section" aria-labelledby="department-employees-title">
          <div className="container">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "EMPLEADOS IA" : "AI EMPLOYEES"}</p>
              <h2 id="department-employees-title">{locale === "es" ? "Roles que pueden participar" : "Roles that can participate"}</h2>
              <p>{locale === "es" ? "Los perfiles profundos enlazan a su ficha; el resto son roles de catálogo que requieren adaptación antes de una implantación específica." : "Deep profiles link to their detail page; the remaining roles are catalog roles that require adaptation before a specific deployment."}</p>
            </div>
            <div className="organization-role-grid">
              {department.employeeKeys.map((key) => {
                const employee = catalog.find((item) => item.key === key);
                if (!employee) return null;
                return <article className="organization-role-card" key={key}><span aria-hidden="true">{employee.shortName.slice(0, 2).toUpperCase()}</span><div><h3>{employee.shortName}</h3><p>{employee.description}</p><Link className="text-link" href={employeeDetailPath(key, locale)}>{locale === "es" ? "Ver perfil" : "View profile"} <span aria-hidden="true">→</span></Link></div></article>;
              })}
              {department.catalogRoles[locale].map((role) => <article className="organization-role-card catalog-role" key={role}><span aria-hidden="true">+</span><div><h3>{role}</h3><p>{locale === "es" ? "Perfil del catálogo general · requiere definición y adaptación al entorno real." : "General catalog profile · requires definition and adaptation to the real environment."}</p></div></article>)}
            </div>
            <div className="organization-team-links">
              <strong>{locale === "es" ? "Equipos IA relacionados" : "Related AI Teams"}</strong>
              <div>{department.teams.map((key) => { const team = teams.find((item) => item.key === key); return team ? <Link className="chip-link" key={key} href={teamDetailPath(key, locale)}>{team.locales[locale].shortName}</Link> : null; })}</div>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="department-processes-title">
          <div className="container">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "PROCESOS" : "PROCESSES"}</p>
              <h2 id="department-processes-title">{locale === "es" ? "Casos de uso relacionados" : "Related use cases"}</h2>
            </div>
            <div className="organization-card-grid compact-grid">
              {relatedUseCases.map((record) => record && <article className="organization-card" key={record.key}><h3>{record.title[locale]}</h3><p>{record.shortAnswer[locale]}</p><Link className="text-link" href={useCaseDetailPath(record.key, locale)}>{locale === "es" ? "Ver proceso" : "View process"} <span aria-hidden="true">→</span></Link></article>)}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="department-integrations-title">
          <div className="container">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "SISTEMAS" : "SYSTEMS"}</p>
              <h2 id="department-integrations-title">{locale === "es" ? "Integraciones a evaluar" : "Integrations to evaluate"}</h2>
              <p>{locale === "es" ? "Que una categoría aparezca aquí no significa que exista un conector universal listo para activar." : "A category appearing here does not mean a universal ready-made connector exists."}</p>
            </div>
            <div className="organization-integration-grid">
              {relatedIntegrations.map((record) => record && <Link className="organization-integration-link" key={record.key} href={integrationDetailPath(record.key, locale)}><strong>{record.name[locale]}</strong><span>{record.shortAnswer[locale]}</span><em aria-hidden="true">→</em></Link>)}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="department-model-title">
          <div className="container">
            <div className="section-heading organization-section-heading"><p className="eyebrow">{locale === "es" ? "MODELO OPERATIVO" : "OPERATING MODEL"}</p><h2 id="department-model-title">{locale === "es" ? "Cómo introducir IA sin delegar autoridad de golpe" : "How to introduce AI without delegating authority all at once"}</h2></div>
            <div className="organization-method-grid">{department.operatingModel[locale].map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="department-control-title">
          <div className="container organization-control-metrics">
            <div className="organization-control-panel"><p className="eyebrow">{locale === "es" ? "CONTROL HUMANO" : "HUMAN CONTROL"}</p><h2 id="department-control-title">{locale === "es" ? "Qué debe seguir bajo reglas o aprobación" : "What should remain under rules or approval"}</h2><ul>{department.controls[locale].map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div><p className="eyebrow">{locale === "es" ? "MÉTRICAS" : "METRICS"}</p><h2>{locale === "es" ? "Cómo validar si mejora" : "How to validate improvement"}</h2><p>{locale === "es" ? "Son indicadores posibles, no promesas. Se comparan contra una línea base real." : "These are possible indicators, not promises. They should be compared with a real baseline."}</p><div className="organization-metric-grid">{department.metrics[locale].map((item) => <span key={item}>{item}</span>)}</div></div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="department-faq-title">
          <div className="container faq-layout"><div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="department-faq-title">{locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}</h2></div><div className="faq-list">{department.faq[locale].map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel"><div><p className="eyebrow">{locale === "es" ? "DE DEPARTAMENTO A PROCESO" : "FROM DEPARTMENT TO PROCESS"}</p><h2>{locale === "es" ? "Elige un proceso concreto y mide el antes y el después." : "Choose one concrete process and measure the before and after."}</h2><p>{locale === "es" ? "No necesitas automatizar todo el departamento para empezar a liberar capacidad." : "You do not need to automate the entire department to start freeing capacity."}</p></div><div className="cta-actions"><Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link><Link className="button button-ghost" href={roiEstimatorPath(locale)}>{locale === "es" ? "Estimar valor potencial" : "Estimate potential value"}</Link></div></div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

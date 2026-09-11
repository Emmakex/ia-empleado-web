import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import type { EmployeeKey, LocalizedEmployeeDetail } from "../lib/employee-catalog";
import { alternateEmployeePath, employeeIndexPath } from "../lib/employee-catalog";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type EmployeeDetailPageProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  employeeKey: EmployeeKey;
  content: LocalizedEmployeeDetail;
};

export function EmployeeDetailPage({ locale, dictionary, employeeKey, content }: EmployeeDetailPageProps) {
  const alternateHref = alternateEmployeePath(employeeKey, locale);
  const indexHref = employeeIndexPath(locale);
  const canonicalPath = locale === "es" ? `/empleados-ia/${content.slug}` : `/en/ai-employees/${content.slug}`;

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: content.name,
    serviceType: content.shortName,
    description: content.seoDescription,
    provider: {
      "@type": "Organization",
      name: "IA Empleado",
      url: "https://iaempleado.com",
    },
    url: `https://iaempleado.com${canonicalPath}`,
    areaServed: "International",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternateHref} />
      <main id="contenido" className="employee-content-page">
        <section className="employee-detail-hero">
          <div className="container employee-detail-hero-grid">
            <div>
              <nav className="breadcrumb" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumb"}>
                <Link href={locale === "es" ? "/" : "/en"}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <Link href={indexHref}>{locale === "es" ? "Empleados IA" : "AI Employees"}</Link>
                <span aria-hidden="true">/</span>
                <span>{content.shortName}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1>{content.heroTitle}</h1>
              <p className="employee-hero-lead">{content.heroDescription}</p>
              <div className="hero-actions">
                <a className="button" href="#casos-de-uso">{locale === "es" ? "Ver casos de uso" : "See use cases"}</a>
                <a className="button button-ghost" href="#control-humano">{locale === "es" ? "Ver límites y control" : "See boundaries and control"}</a>
              </div>
            </div>
            <aside className="employee-role-card">
              <span className="status-pill">{content.statusLabel}</span>
              <div className="employee-role-mark" aria-hidden="true">CS</div>
              <h2>{content.shortName}</h2>
              <dl>
                <div><dt>{locale === "es" ? "Departamento" : "Department"}</dt><dd>{content.department}</dd></div>
                <div><dt>{locale === "es" ? "Foco" : "Focus"}</dt><dd>{content.focus}</dd></div>
                <div><dt>{locale === "es" ? "Modelo" : "Model"}</dt><dd>{locale === "es" ? "Trabajo gobernado y supervisado" : "Governed, supervised work"}</dd></div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="content-section" aria-labelledby="definition-title">
          <div className="container employee-two-column">
            <div><p className="eyebrow">{locale === "es" ? "DEFINICIÓN" : "DEFINITION"}</p><h2 id="definition-title">{content.definitionTitle}</h2></div>
            <p className="employee-definition-body">{content.definitionBody}</p>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="tasks-title">
          <div className="container">
            <div className="section-heading"><p className="eyebrow">{locale === "es" ? "TRABAJO REAL" : "REAL WORK"}</p><h2 id="tasks-title">{content.tasksTitle}</h2></div>
            <div className="employee-task-grid">
              {content.tasks.map((task, index) => <article key={task}><span>{String(index + 1).padStart(2, "0")}</span><p>{task}</p></article>)}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="workflow-title">
          <div className="container">
            <div className="section-heading"><p className="eyebrow">{locale === "es" ? "FLUJO" : "WORKFLOW"}</p><h2 id="workflow-title">{content.workflowTitle}</h2><p>{content.workflowIntro}</p></div>
            <div className="employee-workflow-grid">
              {content.workflow.map((step) => <article key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="systems-title">
          <div className="container employee-two-column">
            <div><p className="eyebrow">{locale === "es" ? "INTEGRACIONES" : "INTEGRATIONS"}</p><h2 id="systems-title">{content.systemsTitle}</h2><p className="section-lead">{content.systemsIntro}</p></div>
            <div className="integration-cloud employee-integration-cloud">{content.systems.map((system, index) => <span className={index < 3 ? "integration-chip chip-strong" : "integration-chip"} key={system}>{system}</span>)}</div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="collaboration-title">
          <div className="container">
            <div className="section-heading"><p className="eyebrow">{locale === "es" ? "COLABORACIÓN" : "COLLABORATION"}</p><h2 id="collaboration-title">{content.collaborationTitle}</h2><p>{content.collaborationIntro}</p></div>
            <div className="employee-collaboration-grid">
              {content.collaboration.map((item) => <article key={item.title}><span className="collaboration-dot" aria-hidden="true" /><h3>{item.title}</h3><p>{item.text}</p></article>)}
            </div>
          </div>
        </section>

        <section className="content-section employee-control-section" id="control-humano" aria-labelledby="supervision-title">
          <div className="container employee-control-grid">
            <div><p className="eyebrow">{locale === "es" ? "CONTROL Y AUTORIDAD" : "CONTROL AND AUTHORITY"}</p><h2 id="supervision-title">{content.supervisionTitle}</h2><p>{content.supervisionIntro}</p></div>
            <ul>{content.supervision.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </section>

        <section className="content-section" id="casos-de-uso" aria-labelledby="use-cases-title">
          <div className="container">
            <div className="section-heading"><p className="eyebrow">{locale === "es" ? "CASOS DE USO" : "USE CASES"}</p><h2 id="use-cases-title">{content.useCasesTitle}</h2></div>
            <div className="employee-use-case-grid">{content.useCases.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="sectors-title">
          <div className="container employee-two-column">
            <div><p className="eyebrow">{locale === "es" ? "SECTORES" : "SECTORS"}</p><h2 id="sectors-title">{content.sectorsTitle}</h2></div>
            <div className="employee-sector-list">{content.sectors.map((sector) => <span key={sector}>{sector}</span>)}</div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="limits-title">
          <div className="container employee-limits-grid">
            <div><p className="eyebrow">{locale === "es" ? "LÍMITES" : "BOUNDARIES"}</p><h2 id="limits-title">{content.limitsTitle}</h2></div>
            <ol>{content.limits.map((item) => <li key={item}>{item}</li>)}</ol>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="employee-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="employee-faq-title">{content.faqTitle}</h2></div>
            <div className="faq-list">{content.faq.map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div><p className="eyebrow">{content.ctaEyebrow}</p><h2>{content.ctaTitle}</h2><p>{content.ctaText}</p></div>
            <div className="cta-actions">
              <a className="button" href="mailto:hola@iaempleado.com?subject=IA%20Empleado%20-%20Atencion%20al%20Cliente">{content.ctaPrimary}</a>
              <Link className="button button-ghost" href={indexHref}>{content.ctaSecondary}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

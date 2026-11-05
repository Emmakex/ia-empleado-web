import { Fragment } from "react";
import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import type { GrowthLandingRecord } from "../lib/growth-content";
import { blogArticlePath, blogIndexPath, getBlogArticleByKey, growthLandingPath } from "../lib/growth-content";
import { getEditorialSources } from "../lib/editorial-sources";
import { employeeIndexPath } from "../lib/employee-catalog";
import { employeeDetailPath } from "../lib/employee-content-engine";
import { useCaseDetailPath, useCaseIndexPath } from "../lib/sector-use-cases";
import { integrationIndexPath } from "../lib/organization-map";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { roiEstimatorPath } from "../lib/roi-estimator";
import { requestDemoPath } from "../lib/conversion-handoff";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale; record: GrowthLandingRecord };

function formatEditorialDate(value: string, locale: Locale) {
  return new Intl.DateTimeFormat(locale === "es" ? "es-ES" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T12:00:00Z`));
}

export function GrowthLandingPage({ locale, record }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = growthLandingPath(record.key, locale);
  const alternate = growthLandingPath(record.key, otherLocale);
  const relatedArticle = getBlogArticleByKey(record.relatedArticleKey);
  const editorialSources = getEditorialSources(record.key);
  const isAccountingCluster = record.key === "ai-invoicing-accounting-automation"
    || record.key === "ai-invoice-processing"
    || record.key === "ai-accounts-receivable-automation"
    || record.key === "ai-bank-reconciliation";
  const isExpenseManagementCluster = record.key === "ai-expense-management";
  const isSalesOrderCluster = record.key === "ai-sales-order-processing";
  const isEmployeeOnboardingCluster = record.key === "ai-employee-onboarding";
  const isLeaveManagementCluster = record.key === "ai-leave-management";
  const relatedEmployee = record.key === "ai-customer-support-automation"
    ? {
        href: employeeDetailPath("customer-support", locale),
        label: locale === "es" ? "Ver Agente IA de Atención al Cliente" : "View Customer Support AI agent",
      }
    : isAccountingCluster || isExpenseManagementCluster
      ? {
          href: employeeDetailPath("accounting-billing", locale),
          label: locale === "es" ? "Ver IA para Contabilidad y Facturación" : "View AI for Accounting and Billing",
        }
      : isSalesOrderCluster
        ? {
            href: employeeDetailPath("sales-sdr", locale),
            label: locale === "es" ? "Ver Agente IA para Ventas y SDR" : "View AI SDR and Sales Agent",
          }
        : isEmployeeOnboardingCluster || isLeaveManagementCluster
          ? {
              href: employeeDetailPath("administrative", locale),
              label: locale === "es" ? "Ver Agente IA Administrativo" : "View Administrative AI Agent",
            }
          : undefined;
  const relatedUseCase = isAccountingCluster
    ? {
        href: useCaseDetailPath("invoice-validation", locale),
        label: locale === "es" ? "Ver validación de facturas" : "View invoice validation",
      }
    : isSalesOrderCluster
      ? {
          href: useCaseDetailPath("order-exception", locale),
          label: locale === "es" ? "Ver incidencias de pedidos" : "View order exceptions",
        }
      : isEmployeeOnboardingCluster
        ? {
            href: useCaseDetailPath("administrative-documentation", locale),
            label: locale === "es" ? "Ver gestión documental administrativa" : "View administrative document workflow",
          }
        : undefined;
  const relatedRoiHref = record.key === "ai-employee-cost" || record.key === "ai-employee-roi"
    ? roiEstimatorPath(locale)
    : undefined;
  const processHref = processAnalyzerPath(locale);
  const roiHref = roiEstimatorPath(locale);
  const heroDemoHref = requestDemoPath(locale, {
    intent: "demo",
    source: `seo-landing:${record.key}:hero`,
    context: record.title[locale],
  });
  const fitDemoHref = requestDemoPath(locale, {
    intent: "demo",
    source: `seo-landing:${record.key}:fit`,
    context: record.title[locale],
  });
  const pilotDemoHref = requestDemoPath(locale, {
    intent: "demo",
    source: `seo-landing:${record.key}:pilot`,
    context: record.title[locale],
  });
  const finalDemoHref = requestDemoPath(locale, {
    intent: "demo",
    source: `seo-landing:${record.key}:final`,
    context: record.title[locale],
  });

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.faq.map((item) => ({
      "@type": "Question",
      name: item.question[locale],
      acceptedAnswer: { "@type": "Answer", text: item.answer[locale] },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://iaempleado.com${localeHref(locale)}` },
      { "@type": "ListItem", position: 2, name: record.title[locale], item: `https://iaempleado.com${canonical}` },
    ],
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternate} />
      <main id="contenido" className="sector-cluster-page editorial-landing-page">
        <section className="sector-hero section-shell">
          <div className="container sector-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{record.eyebrow[locale]}</span>
              </nav>
              <p className="eyebrow">{record.eyebrow[locale]}</p>
              <h1>{record.title[locale]}</h1>
              <p className="sector-hero-lead">{record.lead[locale]}</p>
              <div className="editorial-reading-meta">
                <span>{locale === "es" ? "Publicado" : "Published"}: <time dateTime={record.publishedAt}>{formatEditorialDate(record.publishedAt, locale)}</time></span>
                {record.updatedAt !== record.publishedAt ? <span>{locale === "es" ? "Actualizado" : "Updated"}: <time dateTime={record.updatedAt}>{formatEditorialDate(record.updatedAt, locale)}</time></span> : null}
              </div>
              <div className="hero-actions">
                <Link className="button" href={heroDemoHref}>{locale === "es" ? "Ver cómo aplicarlo en mi empresa" : "See how it fits my business"}</Link>
                <Link className="button button-ghost" href={processHref}>{locale === "es" ? "Analizar mi proceso" : "Analyse my process"}</Link>
              </div>
            </div>
          </div>
        </section>

        <section className="content-section editorial-reading-rail" aria-label={locale === "es" ? "Resumen y navegación" : "Summary and navigation"}>
          <div className="container">
            <div className="editorial-reading-rail-inner">
              <div className="editorial-reading-summary">
                <div>
                  <strong>{locale === "es" ? "Lectura orientada a decisión" : "Decision-oriented reading"}</strong>
                  <p>{locale === "es" ? "Empieza por el proceso, revisa controles y termina en métricas, relaciones y fuentes." : "Start with the process, review controls, then move to metrics, related routes and sources."}</p>
                </div>
                <span className="eyebrow">{record.sections.length} {locale === "es" ? "bloques" : "sections"}</span>
              </div>
              <nav className="editorial-section-nav" aria-label={locale === "es" ? "En esta página" : "On this page"}>
                {record.sections.slice(0, 6).map((section, index) => (
                  <a href={`#section-${index + 1}`} key={section.title[locale]}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title[locale].replace(/^\d+\.\s*/u, "")}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </section>

        {(relatedArticle || relatedEmployee || relatedUseCase) ? (
          <section className="content-section editorial-context-strip" aria-label={locale === "es" ? "Enlaces relacionados" : "Related links"}>
            <div className="container editorial-context-strip-inner">
              <strong>{locale === "es" ? "Conecta este tema" : "Connect this topic"}</strong>
              {relatedArticle ? <Link className="text-link" href={`${blogArticlePath(relatedArticle.key, locale)}#contenido`}>{locale === "es" ? "Guía operativa" : "Operational guide"} →</Link> : null}
              {relatedEmployee ? <Link className="text-link" href={`${relatedEmployee.href}#contenido`}>{locale === "es" ? "Rol IA relacionado" : "Related AI role"} →</Link> : null}
              {relatedUseCase ? <Link className="text-link" href={`${relatedUseCase.href}#contenido`}>{locale === "es" ? "Caso de uso relacionado" : "Related use case"} →</Link> : null}
            </div>
          </section>
        ) : null}

        {record.sections.map((section, index) => (
          <Fragment key={section.title[locale]}>
            <section id={`section-${index + 1}`} className={index % 2 === 1 ? "content-section section-panel" : "content-section"}>
              <div className="container">
                <div className="section-heading sector-section-heading">
                  <p className="eyebrow">{String(index + 1).padStart(2, "0")}</p>
                  <h2>{section.title[locale]}</h2>
                </div>
                <div className="legal-copy">
                  {section.paragraphs[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </div>
            </section>

            {index === 1 ? (
              <section className="content-section growth-conversion-stage" aria-label={locale === "es" ? "Analiza el encaje" : "Analyse fit"}>
                <div className="container cta-panel">
                  <div>
                    <p className="eyebrow">{locale === "es" ? "¿ENCAJA EN TU PROCESO?" : "DOES IT FIT YOUR PROCESS?"}</p>
                    <h2>{locale === "es" ? "Pasa de la idea a un diagnóstico de tu operativa actual." : "Move from the idea to a diagnosis of your current operation."}</h2>
                    <p>{locale === "es" ? "Identifica qué parte conviene automatizar primero, qué datos necesita el flujo y dónde debe seguir existiendo control humano." : "Identify what to automate first, which data the workflow needs and where human control must remain."}</p>
                  </div>
                  <div className="cta-actions">
                    <Link className="button" href={processHref}>{locale === "es" ? "Analizar un proceso" : "Analyse a process"}</Link>
                    <Link className="button button-ghost" href={fitDemoHref}>{locale === "es" ? "Hablar sobre mi caso" : "Discuss my case"}</Link>
                  </div>
                </div>
              </section>
            ) : null}

            {index === 4 ? (
              <section className="content-section section-panel growth-conversion-stage" aria-label={locale === "es" ? "Valida el impacto" : "Validate impact"}>
                <div className="container cta-panel">
                  <div>
                    <p className="eyebrow">{locale === "es" ? "VALIDA EL IMPACTO" : "VALIDATE THE IMPACT"}</p>
                    <h2>{locale === "es" ? "Antes de ampliar la automatización, calcula si el volumen y el tiempo justifican un piloto." : "Before expanding automation, calculate whether volume and time justify a pilot."}</h2>
                    <p>{locale === "es" ? "Compara el trabajo manual actual con un escenario automatizado y utiliza esa referencia para decidir el siguiente paso." : "Compare current manual work with an automated scenario and use that baseline to decide the next step."}</p>
                  </div>
                  <div className="cta-actions">
                    <Link className="button" href={roiHref}>{locale === "es" ? "Calcular impacto y ROI" : "Calculate impact and ROI"}</Link>
                  </div>
                </div>
              </section>
            ) : null}
          </Fragment>
        ))}

        <section className="content-section growth-conversion-stage" aria-label={locale === "es" ? "Diseña un piloto" : "Design a pilot"}>
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{locale === "es" ? "DISEÑA UN PILOTO" : "DESIGN A PILOT"}</p>
              <h2>{locale === "es" ? "Lleva estas reglas a un piloto controlado con tus datos, sistemas y responsables." : "Turn these rules into a controlled pilot with your data, systems and owners."}</h2>
              <p>{locale === "es" ? "Podemos aterrizar el alcance, las integraciones, las aprobaciones humanas y las métricas que demostrarán si merece la pena ampliar la automatización." : "We can define scope, integrations, human approvals and the metrics that will show whether automation should expand."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={pilotDemoHref}>{locale === "es" ? "Diseñar mi piloto" : "Design my pilot"}</Link>
              <Link className="button button-ghost" href={roiHref}>{locale === "es" ? "Calcular ROI primero" : "Calculate ROI first"}</Link>
            </div>
          </div>
        </section>

        <section className="content-section section-panel">
          <div className="container">
            <div className="section-heading sector-section-heading"><p className="eyebrow">WORKFLOW</p><h2>{record.workflow.title[locale]}</h2></div>
            <div className="sector-method-grid">
              {record.workflow.steps[locale].map((step, index) => (
                <article key={step}><span>{String(index + 1).padStart(2, "0")}</span><p>{step}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section">
          <div className="container">
            <div className="section-heading sector-section-heading"><p className="eyebrow">{locale === "es" ? "MÉTRICAS" : "METRICS"}</p><h2>{locale === "es" ? "Qué conviene medir" : "What to measure"}</h2></div>
            <div className="sector-card-grid">
              {record.metrics[locale].map((metric) => <article className="sector-card" key={metric}><h3>{metric}</h3></article>)}
            </div>
          </div>
        </section>

        {relatedArticle ? (
          <section className="content-section section-panel">
            <div className="container cta-panel">
              <div><p className="eyebrow">{locale === "es" ? "GUÍA RELACIONADA" : "RELATED GUIDE"}</p><h2>{relatedArticle.title[locale]}</h2><p>{relatedArticle.excerpt[locale]}</p></div>
              <div className="cta-actions"><Link className="button button-ghost" href={blogArticlePath(relatedArticle.key, locale)}>{locale === "es" ? "Leer la guía" : "Read guide"}</Link></div>
            </div>
          </section>
        ) : null}

        <section className="content-section" aria-labelledby="growth-explore-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "RELACIONES DEL TEMA" : "TOPIC CONNECTIONS"}</p>
              <h2 id="growth-explore-title">{locale === "es" ? "Explora el producto, los casos de uso y las integraciones relacionadas." : "Explore related product roles, use cases and integrations."}</h2>
            </div>
            <div className="cta-actions">
              {relatedEmployee ? <Link className="text-link" href={relatedEmployee.href}>{relatedEmployee.label} →</Link> : null}
              {relatedUseCase ? <Link className="text-link" href={relatedUseCase.href}>{relatedUseCase.label} →</Link> : null}
              {relatedRoiHref ? (
                <Link className="text-link" href={relatedRoiHref}>
                  {locale === "es" ? "Calcular un escenario de ROI" : "Calculate an ROI scenario"} →
                </Link>
              ) : null}
              <Link className="text-link" href={employeeIndexPath(locale)}>{locale === "es" ? "Explorar Empleados IA" : "Explore AI Employees"} →</Link>
              <Link className="text-link" href={useCaseIndexPath(locale)}>{locale === "es" ? "Ver casos de uso" : "View use cases"} →</Link>
              <Link className="text-link" href={integrationIndexPath(locale)}>{locale === "es" ? "Ver integraciones" : "View integrations"} →</Link>
              <Link className="text-link" href={blogIndexPath(locale)}>{locale === "es" ? "Más guías" : "More guides"} →</Link>
            </div>
          </div>
        </section>

        {editorialSources.length ? (
          <section className="content-section editorial-sources" aria-labelledby="editorial-sources-title">
            <div className="container">
              <div className="section-heading sector-section-heading">
                <p className="eyebrow">{locale === "es" ? "FUENTES Y CONTEXTO" : "SOURCES AND CONTEXT"}</p>
                <h2 id="editorial-sources-title">{locale === "es" ? "Referencias externas para contrastar el proceso." : "External references for validating the process."}</h2>
              </div>
              <div className="editorial-source-grid">
                {editorialSources.map((source) => (
                  <article className="editorial-source-card" key={source.href}>
                    <span>{source.publisher}</span>
                    <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label[locale]} ↗</a>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="content-section" aria-labelledby="growth-faq-title">
          <div className="container">
            <div className="section-heading sector-section-heading"><p className="eyebrow">FAQ</p><h2 id="growth-faq-title">{locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}</h2></div>
            <div className="sector-card-grid">
              {record.faq.map((item) => <article className="sector-card" key={item.question[locale]}><h3>{item.question[locale]}</h3><p>{item.answer[locale]}</p></article>)}
            </div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{locale === "es" ? "SIGUIENTE PASO" : "NEXT STEP"}</p>
              <h2>{locale === "es" ? "Convierte este enfoque en una propuesta concreta para tu empresa." : "Turn this approach into a concrete proposal for your business."}</h2>
              <p>{locale === "es" ? "Revisamos contigo el proceso, las integraciones necesarias y el alcance de un primer piloto antes de plantear una implantación mayor." : "We review the process, required integrations and the scope of a first pilot with you before proposing a broader implementation."}</p>
            </div>
            <div className="cta-actions"><Link className="button" href={finalDemoHref}>{locale === "es" ? "Solicitar una demo" : "Request a demo"}</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

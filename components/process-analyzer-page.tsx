import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  getProcessAnalyzerPageContent,
  getProcessAnalyzerTemplates,
  getProcessPainOptions,
  processAnalyzerPath,
} from "../lib/process-analyzer";
import { teamBuilderPath } from "../lib/team-builder";
import { collaborationDemoPath } from "../lib/collaboration-demo";
import { BrandInteractivePreview } from "./brand-interactive-preview";
import { ProcessAnalyzer } from "./process-analyzer";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type ProcessAnalyzerPageProps = {
  locale: Locale;
};

export function ProcessAnalyzerPage({ locale }: ProcessAnalyzerPageProps) {
  const dictionary = getDictionary(locale);
  const content = getProcessAnalyzerPageContent(locale);
  const templates = getProcessAnalyzerTemplates(locale);
  const painOptions = getProcessPainOptions(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonicalPath = processAnalyzerPath(locale);
  const alternatePath = processAnalyzerPath(otherLocale);
  const homeHref = localeHref(locale);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: content.seoTitle,
    description: content.seoDescription,
    url: `https://iaempleado.com${canonicalPath}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: "IA Empleado",
      url: locale === "es" ? "https://iaempleado.com/" : "https://iaempleado.com/en",
    },
  };

  const processSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.staticTitle,
    numberOfItems: templates.length,
    itemListElement: templates.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: template.label,
      description: template.description,
    })),
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
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternatePath} />
      <main id="contenido" className="process-analyzer-page">
        <section className="process-analyzer-hero section-shell" aria-labelledby="process-analyzer-hero-title">
          <div className="container process-analyzer-hero-grid brand-interactive-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Mejora tu proceso" : "Improve your process"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="process-analyzer-hero-title">{content.heroTitle}</h1>
              <p className="process-analyzer-hero-lead">{content.heroDescription}</p>
              <div className="hero-actions">
                <a className="button" href="#analizador-proceso">{locale === "es" ? "Analizar un proceso" : "Analyze a process"}</a>
                <Link className="button button-ghost" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar un Equipo IA" : "Design an AI Team"}</Link>
              </div>
            </div>
            <div className="brand-interactive-hero-side">
              <BrandInteractivePreview locale={locale} mode="process" title={content.analyzerTitle} />
              <aside className="process-analyzer-hero-note" role="note">
                <span className="process-analyzer-note-icon" aria-hidden="true">↔</span>
                <p>{content.heroNote}</p>
                <div className="process-analyzer-local-chip">{locale === "es" ? "Estado local · sin conexión al runtime" : "Local state · no runtime connection"}</div>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section process-analyzer-main" id="analizador-proceso" aria-label={content.analyzerTitle}>
          <div className="container">
            <ProcessAnalyzer locale={locale} content={content} templates={templates} painOptions={painOptions} />
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="process-methodology-title">
          <div className="container">
            <div className="section-heading process-analyzer-section-heading">
              <p className="eyebrow">{content.methodologyEyebrow}</p>
              <h2 id="process-methodology-title">{content.methodologyTitle}</h2>
              <p>{content.methodologyIntro}</p>
            </div>
            <div className="process-methodology-grid">
              {content.methodologyItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="static-processes-title">
          <div className="container">
            <div className="section-heading process-analyzer-section-heading">
              <p className="eyebrow">{content.staticEyebrow}</p>
              <h2 id="static-processes-title">{content.staticTitle}</h2>
              <p>{content.staticIntro}</p>
            </div>
            <div className="process-static-patterns">
              {templates.map((template) => (
                <article className="process-static-pattern" key={template.key}>
                  <div className="process-static-header">
                    <div>
                      <h3>{template.label}</h3>
                      <p>{template.description}</p>
                    </div>
                    <div className="process-static-outcome">
                      <span>{locale === "es" ? "Resultado" : "Outcome"}</span>
                      <strong>{template.outcome}</strong>
                    </div>
                  </div>
                  <ol className="process-static-step-list">
                    {template.steps.map((step, index) => {
                      const modeLabel = step.mode === "automated" ? content.automatedLabel : step.mode === "assisted" ? content.assistedLabel : content.humanLabel;
                      return (
                        <li key={step.id}>
                          <span className="process-static-number">{String(index + 1).padStart(2, "0")}</span>
                          <div className="process-static-before"><small>{locale === "es" ? "Antes" : "Before"}</small><strong>{step.currentTitle}</strong><p>{step.currentText}</p></div>
                          <span className="process-static-arrow" aria-hidden="true">→</span>
                          <div className="process-static-after"><small>{modeLabel}</small><strong>{step.proposedTitle}</strong><p>{step.proposedText}</p></div>
                        </li>
                      );
                    })}
                  </ol>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="process-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">FAQ</p>
              <h2 id="process-faq-title">{content.faqTitle}</h2>
            </div>
            <div className="faq-list">
              {content.faq.map((item, index) => (
                <details className="faq-item" key={item.question} open={index === 0}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{locale === "es" ? "DEL PROCESO AL EQUIPO" : "FROM PROCESS TO TEAM"}</p>
              <h2>{locale === "es" ? "Cuando ya sabes qué proceso mejorar, define qué equipo debe coordinarlo." : "Once you know which process to improve, define the team that should coordinate it."}</h2>
              <p>{locale === "es" ? "Combina este análisis con el Team Builder y el simulador para pasar del problema operativo a una composición explicable y un flujo visible." : "Combine this analysis with the Team Builder and simulator to move from an operational problem to an explainable composition and visible workflow."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar mi Equipo IA" : "Design my AI Team"}</Link>
              <Link className="button button-ghost" href={collaborationDemoPath(locale)}>{locale === "es" ? "Ver simulador" : "Open simulator"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(processSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

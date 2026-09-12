import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import { getRoiEstimatorPageContent, roiEstimatorPath } from "../lib/roi-estimator";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { teamBuilderPath } from "../lib/team-builder";
import { RoiEstimator } from "./roi-estimator";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type RoiEstimatorPageProps = {
  locale: Locale;
};

export function RoiEstimatorPage({ locale }: RoiEstimatorPageProps) {
  const dictionary = getDictionary(locale);
  const content = getRoiEstimatorPageContent(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonicalPath = roiEstimatorPath(locale);
  const alternatePath = roiEstimatorPath(otherLocale);
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

  const methodologySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.methodologyTitle,
    numberOfItems: content.methodologyItems.length,
    itemListElement: content.methodologyItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      description: item.text,
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
      <main id="contenido" className="roi-estimator-page">
        <section className="roi-hero section-shell" aria-labelledby="roi-hero-title">
          <div className="container roi-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Calculadora ROI" : "ROI calculator"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="roi-hero-title">{content.heroTitle}</h1>
              <p className="roi-hero-lead">{content.heroDescription}</p>
              <div className="hero-actions">
                <a className="button" href="#calculadora-roi">{locale === "es" ? "Calcular escenario" : "Calculate scenario"}</a>
                <Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar primero mi proceso" : "Analyze my process first"}</Link>
              </div>
            </div>
            <aside className="roi-hero-note" role="note">
              <span aria-hidden="true">∑</span>
              <p>{content.heroNote}</p>
              <div className="roi-local-chip">{locale === "es" ? "Cálculo local · supuestos visibles" : "Local calculation · visible assumptions"}</div>
            </aside>
          </div>
        </section>

        <section className="content-section roi-main-section" id="calculadora-roi" aria-label={content.calculatorTitle}>
          <div className="container">
            <RoiEstimator locale={locale} content={content} />
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="roi-methodology-title">
          <div className="container">
            <div className="section-heading roi-section-heading">
              <p className="eyebrow">{content.methodologyEyebrow}</p>
              <h2 id="roi-methodology-title">{content.methodologyTitle}</h2>
              <p>{content.methodologyIntro}</p>
            </div>
            <div className="roi-methodology-grid">
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

        <section className="content-section" aria-labelledby="roi-formula-title">
          <div className="container">
            <div className="section-heading roi-section-heading">
              <p className="eyebrow">{locale === "es" ? "MATEMÁTICA AUDITABLE" : "AUDITABLE MATH"}</p>
              <h2 id="roi-formula-title">{content.formulaTitle}</h2>
            </div>
            <div className="roi-formula-grid">
              {content.formulaItems.map((item) => (
                <article key={item.label}>
                  <h3>{item.label}</h3>
                  <code>{item.formula}</code>
                  <p>{item.explanation}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="roi-example-title">
          <div className="container roi-example-layout">
            <div className="section-heading roi-section-heading">
              <p className="eyebrow">{content.exampleEyebrow}</p>
              <h2 id="roi-example-title">{content.exampleTitle}</h2>
              <p>{content.exampleIntro}</p>
            </div>
            <dl className="roi-example-list">
              {content.exampleItems.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="content-section" aria-labelledby="roi-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">FAQ</p>
              <h2 id="roi-faq-title">{content.faqTitle}</h2>
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
              <p className="eyebrow">{locale === "es" ? "DEL VALOR AL DISEÑO" : "FROM VALUE TO DESIGN"}</p>
              <h2>{locale === "es" ? "Una estimación solo es útil si después se valida el proceso y el equipo." : "An estimate is only useful when the process and team are validated afterwards."}</h2>
              <p>{locale === "es" ? "Usa el analizador para revisar el flujo real y el Team Builder para definir qué roles podrían intervenir antes de convertir una hipótesis en una propuesta." : "Use the process analyzer to review the real workflow and Team Builder to define which roles may be involved before turning an assumption into a proposal."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link>
              <Link className="button button-ghost" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar mi Equipo IA" : "Design my AI Team"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(methodologySchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

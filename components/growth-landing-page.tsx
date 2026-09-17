import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import type { GrowthLandingRecord } from "../lib/growth-content";
import { blogArticlePath, getBlogArticleByKey, growthLandingPath } from "../lib/growth-content";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { requestDemoPath } from "../lib/conversion-handoff";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale; record: GrowthLandingRecord };

export function GrowthLandingPage({ locale, record }: Props) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = growthLandingPath(record.key, locale);
  const alternate = growthLandingPath(record.key, otherLocale);
  const relatedArticle = getBlogArticleByKey(record.relatedArticleKey);
  const demoHref = requestDemoPath(locale, {
    intent: "demo",
    source: `seo-landing:${record.key}`,
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
      <main id="contenido" className="sector-cluster-page">
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
              <div className="hero-actions">
                <Link className="button" href={demoHref}>{locale === "es" ? "Evaluar mi proceso" : "Evaluate my process"}</Link>
                <Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar un proceso" : "Analyse a process"}</Link>
              </div>
            </div>
          </div>
        </section>

        {record.sections.map((section, index) => (
          <section className={index % 2 === 1 ? "content-section section-panel" : "content-section"} key={section.title[locale]}>
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
        ))}

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
            <div><p className="eyebrow">{locale === "es" ? "SIGUIENTE PASO" : "NEXT STEP"}</p><h2>{locale === "es" ? "Lleva este enfoque a un proceso real de tu empresa." : "Apply this approach to a real business process."}</h2></div>
            <div className="cta-actions"><Link className="button" href={demoHref}>{locale === "es" ? "Solicitar demo" : "Request demo"}</Link></div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    </>
  );
}

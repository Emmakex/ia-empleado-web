import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  comparisonDetailPath,
  comparisonIndexContent,
  comparisonIndexPath,
  comparisonRecords,
} from "../lib/comparison-content";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { teamBuilderPath } from "../lib/team-builder";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type ComparisonsIndexPageProps = {
  locale: Locale;
};

export function ComparisonsIndexPage({ locale }: ComparisonsIndexPageProps) {
  const dictionary = getDictionary(locale);
  const content = comparisonIndexContent[locale];
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonicalPath = comparisonIndexPath(locale);
  const alternatePath = comparisonIndexPath(otherLocale);
  const homeHref = localeHref(locale);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
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

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: comparisonRecords.length,
    itemListElement: comparisonRecords.map((record, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: record.title[locale],
      url: `https://iaempleado.com${comparisonDetailPath(record.key, locale)}`,
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternatePath} />
      <main id="contenido" className="comparison-page">
        <section className="comparison-hero section-shell" aria-labelledby="comparison-index-title">
          <div className="container comparison-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Comparativas" : "Comparisons"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="comparison-index-title">{content.title}</h1>
              <p className="comparison-hero-lead">{content.intro}</p>
              <div className="hero-actions">
                <a className="button" href="#comparativas-grid">{locale === "es" ? "Ver comparativas" : "View comparisons"}</a>
                <Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar mi proceso" : "Analyze my process"}</Link>
              </div>
            </div>
            <aside className="comparison-hero-note">
              <span className="comparison-note-kicker">{locale === "es" ? "CRITERIO" : "PRINCIPLE"}</span>
              <strong>{locale === "es" ? "No hay un ganador universal." : "There is no universal winner."}</strong>
              <p>{locale === "es" ? "La mejor arquitectura depende del trabajo, el riesgo, los sistemas existentes y cuánto control humano necesitas mantener." : "The best architecture depends on the work, the risk, existing systems and how much human control you need to preserve."}</p>
            </aside>
          </div>
        </section>

        <section className="content-section comparison-index-section" id="comparativas-grid" aria-labelledby="comparison-grid-title">
          <div className="container">
            <div className="section-heading comparison-section-heading">
              <p className="eyebrow">{locale === "es" ? "ELEGIR POR AJUSTE" : "CHOOSE BY FIT"}</p>
              <h2 id="comparison-grid-title">{locale === "es" ? "Cinco comparativas para tomar una decisión con contexto" : "Five comparisons for making a context-aware decision"}</h2>
              <p>{locale === "es" ? "Cada página explica diferencias, cuándo elegir cada enfoque y cuándo conviene combinarlos." : "Each page explains the differences, when to choose each approach and when combining them makes sense."}</p>
            </div>
            <div className="comparison-card-grid">
              {comparisonRecords.map((record) => (
                <article className="comparison-card" key={record.key}>
                  <div className="comparison-card-icon" aria-hidden="true">↔</div>
                  <h3>{record.title[locale]}</h3>
                  <p>{record.shortAnswer[locale]}</p>
                  <Link className="comparison-card-link" href={comparisonDetailPath(record.key, locale)}>
                    {locale === "es" ? "Abrir comparativa" : "Open comparison"}<span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="comparison-method-title">
          <div className="container">
            <div className="section-heading comparison-section-heading">
              <p className="eyebrow">{locale === "es" ? "METODOLOGÍA" : "METHODOLOGY"}</p>
              <h2 id="comparison-method-title">{content.methodologyTitle}</h2>
            </div>
            <div className="comparison-method-grid">
              {content.methodology.map((item, index) => (
                <article key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{locale === "es" ? "DEL ENFOQUE AL DISEÑO" : "FROM APPROACH TO DESIGN"}</p>
              <h2>{locale === "es" ? "Primero decide qué tipo de automatización encaja. Después diseña el equipo." : "First decide what kind of automation fits. Then design the team."}</h2>
              <p>{locale === "es" ? "Usa las comparativas para elegir el patrón adecuado y el Team Builder para convertirlo en una composición concreta." : "Use the comparisons to choose the right pattern and the Team Builder to turn it into a concrete composition."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar mi Equipo IA" : "Design my AI Team"}</Link>
              <Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
    </>
  );
}

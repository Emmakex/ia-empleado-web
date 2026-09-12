import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  sectorIndexPath,
  useCaseDetailPath,
  useCaseIndexContent,
  useCaseIndexPath,
  useCaseRecords,
} from "../lib/sector-use-cases";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale };

export function UseCaseIndexPage({ locale }: Props) {
  const dictionary = getDictionary(locale);
  const content = useCaseIndexContent[locale];
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = useCaseIndexPath(locale);
  const alternate = useCaseIndexPath(otherLocale);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.seoTitle,
    description: content.seoDescription,
    url: `https://iaempleado.com${canonical}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
  };

  const listSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: useCaseRecords.length,
    itemListElement: useCaseRecords.map((record, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: record.title[locale],
      url: `https://iaempleado.com${useCaseDetailPath(record.key, locale)}`,
    })),
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
                <span>{locale === "es" ? "Casos de uso" : "Use cases"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className="sector-hero-lead">{content.description}</p>
              <div className="hero-actions">
                <a className="button" href="#casos-listado">{locale === "es" ? "Explorar casos" : "Explore use cases"}</a>
                <Link className="button button-ghost" href={sectorIndexPath(locale)}>{locale === "es" ? "Ver sectores" : "View industries"}</Link>
              </div>
            </div>
            <aside className="sector-hero-note">
              <strong>{useCaseRecords.length}</strong>
              <span>{locale === "es" ? "patrones operativos con pasos y controles" : "operational patterns with steps and controls"}</span>
              <p>{locale === "es" ? "No son automatizaciones listas para activar: son diseños de referencia que deben adaptarse." : "These are not ready-to-activate automations; they are reference designs that require adaptation."}</p>
            </aside>
          </div>
        </section>

        <section className="content-section" id="casos-listado" aria-labelledby="use-case-cards-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "PATRONES OPERATIVOS" : "OPERATIONAL PATTERNS"}</p>
              <h2 id="use-case-cards-title">{content.cardsTitle}</h2>
              <p>{content.cardsIntro}</p>
            </div>
            <div className="use-case-card-grid">
              {useCaseRecords.map((record) => {
                const humanSteps = record.steps[locale].filter((step) => step.mode === "human").length;
                return (
                  <article className="use-case-card" key={record.key}>
                    <div className="sector-card-topline">
                      <span>{record.eyebrow[locale]}</span>
                      <span>{humanSteps} {locale === "es" ? "punto humano" : "human point"}</span>
                    </div>
                    <h3>{record.title[locale]}</h3>
                    <p>{record.shortAnswer[locale]}</p>
                    <div className="use-case-mode-row" aria-label={locale === "es" ? "Tipos de responsabilidad" : "Responsibility modes"}>
                      <span className="mode-automated">{locale === "es" ? "Automatizable" : "Automatable"}</span>
                      <span className="mode-assisted">{locale === "es" ? "Asistido" : "Assisted"}</span>
                      <span className="mode-human">{locale === "es" ? "Humano" : "Human"}</span>
                    </div>
                    <Link className="text-link" href={useCaseDetailPath(record.key, locale)}>
                      {locale === "es" ? "Ver proceso completo" : "View complete process"} <span aria-hidden="true">→</span>
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="use-case-method-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "CRITERIO DE DISEÑO" : "DESIGN CRITERIA"}</p>
              <h2 id="use-case-method-title">{content.methodologyTitle}</h2>
            </div>
            <div className="sector-method-grid">
              {content.methodology.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section final-cta">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{locale === "es" ? "LLEVARLO A TU PROCESO" : "APPLY IT TO YOUR PROCESS"}</p>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link>
              <Link className="button button-ghost" href={sectorIndexPath(locale)}>{locale === "es" ? "Explorar sectores" : "Explore industries"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(listSchema) }} />
    </>
  );
}

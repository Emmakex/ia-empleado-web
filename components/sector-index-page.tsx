import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  sectorDetailPath,
  sectorIndexContent,
  sectorIndexPath,
  sectorRecords,
  useCaseIndexPath,
} from "../lib/sector-use-cases";
import { teamBuilderPath } from "../lib/team-builder";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale };

export function SectorIndexPage({ locale }: Props) {
  const dictionary = getDictionary(locale);
  const content = sectorIndexContent[locale];
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = sectorIndexPath(locale);
  const alternate = sectorIndexPath(otherLocale);

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
    numberOfItems: sectorRecords.length,
    itemListElement: sectorRecords.map((sector, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: sector.name[locale],
      url: `https://iaempleado.com${sectorDetailPath(sector.key, locale)}`,
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
                <span>{locale === "es" ? "Sectores" : "Industries"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className="sector-hero-lead">{content.description}</p>
              <div className="hero-actions">
                <a className="button" href="#sectores-listado">{locale === "es" ? "Explorar sectores" : "Explore industries"}</a>
                <Link className="button button-ghost" href={useCaseIndexPath(locale)}>{locale === "es" ? "Ver casos de uso" : "View use cases"}</Link>
              </div>
            </div>
            <aside className="sector-hero-note">
              <strong>{sectorRecords.length}</strong>
              <span>{locale === "es" ? "sectores iniciales con contenido profundo" : "initial industries with deep content"}</span>
              <p>{locale === "es" ? "Cada página conecta problemas, procesos, roles, sistemas, controles y métricas." : "Each page connects problems, processes, roles, systems, controls and metrics."}</p>
            </aside>
          </div>
        </section>

        <section className="content-section" id="sectores-listado" aria-labelledby="sector-cards-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "MAPA DE SECTORES" : "INDUSTRY MAP"}</p>
              <h2 id="sector-cards-title">{content.cardsTitle}</h2>
              <p>{content.cardsIntro}</p>
            </div>
            <div className="sector-card-grid">
              {sectorRecords.map((sector) => (
                <article className="sector-card" key={sector.key}>
                  <div className="sector-card-topline">
                    <span>{sector.eyebrow[locale]}</span>
                    <span>{sector.useCases.length} {locale === "es" ? "casos" : "use cases"}</span>
                  </div>
                  <h3>{sector.name[locale]}</h3>
                  <p>{sector.shortAnswer[locale]}</p>
                  <div className="sector-card-tags">
                    {sector.systems[locale].slice(0, 4).map((system) => <span key={system}>{system}</span>)}
                  </div>
                  <Link className="text-link" href={sectorDetailPath(sector.key, locale)}>
                    {locale === "es" ? "Ver sector y procesos" : "View industry and processes"} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="sector-method-title">
          <div className="container">
            <div className="section-heading sector-section-heading">
              <p className="eyebrow">{locale === "es" ? "MÉTODO" : "METHOD"}</p>
              <h2 id="sector-method-title">{content.methodologyTitle}</h2>
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
              <p className="eyebrow">{locale === "es" ? "SIGUIENTE PASO" : "NEXT STEP"}</p>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar mi Equipo IA" : "Design my AI Team"}</Link>
              <Link className="button button-ghost" href={useCaseIndexPath(locale)}>{locale === "es" ? "Explorar casos de uso" : "Explore use cases"}</Link>
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

import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  departmentIndexPath,
  integrationDetailPath,
  integrationIndexContent,
  integrationIndexPath,
  integrationRecords,
} from "../lib/organization-map";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { BrandOrganizationRoster, BrandOrganizationScene } from "./brand-organization-scene";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale };

export function IntegrationIndexPage({ locale }: Props) {
  const dictionary = getDictionary(locale);
  const content = integrationIndexContent[locale];
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = integrationIndexPath(locale);
  const alternate = integrationIndexPath(otherLocale);

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
    numberOfItems: integrationRecords.length,
    itemListElement: integrationRecords.map((record, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: record.name[locale],
      url: `https://iaempleado.com${integrationDetailPath(record.key, locale)}`,
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternate} />
      <main id="contenido" className="organization-map-page">
        <section className="organization-hero section-shell integration-hero">
          <div className="container organization-hero-grid brand-organization-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Integraciones" : "Integrations"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className="organization-hero-lead">{content.description}</p>
              <div className="hero-actions">
                <a className="button" href="#integration-list">{locale === "es" ? "Explorar integraciones" : "Explore integrations"}</a>
                <Link className="button button-ghost" href={departmentIndexPath(locale)}>{locale === "es" ? "Ver departamentos" : "View departments"}</Link>
              </div>
            </div>
            <div className="brand-organization-hero-side">
              <BrandOrganizationScene
                locale={locale}
                kind="integration"
                contextKey="integrations"
                eyebrow={locale === "es" ? "DATOS · PERMISOS · TRAZABILIDAD" : "DATA · PERMISSIONS · TRACEABILITY"}
                title={locale === "es" ? "Sistemas conectados con autoridad delimitada" : "Connected systems with bounded authority"}
                systems={["CRM", "ERP", "Email", "Ecommerce"]}
                humanLabel={locale === "es" ? "Aprobación humana" : "Human approval"}
              />
              <aside className="organization-hero-note">
                <strong>{integrationRecords.length}</strong>
                <span>{locale === "es" ? "categorías de sistema con contrato de control" : "system categories with a control contract"}</span>
                <p>{locale === "es" ? "No prometemos conectores universales: cada integración debe validarse contra el sistema y proceso reales." : "We do not promise universal connectors: every integration must be validated against the real system and process."}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section" id="integration-list" aria-labelledby="integration-list-title">
          <div className="container">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "CAPA DE SISTEMAS" : "SYSTEM LAYER"}</p>
              <h2 id="integration-list-title">{content.cardsTitle}</h2>
              <p>{content.cardsIntro}</p>
            </div>
            <div className="organization-card-grid">
              {integrationRecords.map((record) => (
                <article className="organization-card integration-card brand-organization-card" key={record.key}>
                  <div className="organization-card-topline">
                    <span>{record.eyebrow[locale]}</span>
                    <span>{record.departments.length} {locale === "es" ? "departamentos" : "departments"}</span>
                  </div>
                  <BrandOrganizationRoster locale={locale} employeeKeys={record.employeeKeys} compact />
                  <h3>{record.name[locale]}</h3>
                  <p>{record.shortAnswer[locale]}</p>
                  <div className="organization-tag-row">
                    {record.purpose[locale].slice(0, 3).map((item) => <span key={item}>{item}</span>)}
                  </div>
                  <Link className="text-link" href={integrationDetailPath(record.key, locale)}>
                    {locale === "es" ? "Ver contrato de integración" : "View integration contract"} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="integration-method-title">
          <div className="container">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "CRITERIO DE INTEGRACIÓN" : "INTEGRATION CRITERIA"}</p>
              <h2 id="integration-method-title">{content.methodologyTitle}</h2>
            </div>
            <div className="organization-method-grid">
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
              <p className="eyebrow">{locale === "es" ? "DEL SISTEMA AL PROCESO" : "FROM SYSTEM TO PROCESS"}</p>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar mi proceso" : "Analyze my process"}</Link>
              <Link className="button button-ghost" href={departmentIndexPath(locale)}>{locale === "es" ? "Explorar departamentos" : "Explore departments"}</Link>
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

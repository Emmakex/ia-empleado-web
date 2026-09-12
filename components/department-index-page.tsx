import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  departmentDetailPath,
  departmentIndexContent,
  departmentIndexPath,
  departmentRecords,
  integrationIndexPath,
} from "../lib/organization-map";
import { teamBuilderPath } from "../lib/team-builder";
import { BrandOrganizationRoster, BrandOrganizationScene } from "./brand-organization-scene";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type Props = { locale: Locale };

export function DepartmentIndexPage({ locale }: Props) {
  const dictionary = getDictionary(locale);
  const content = departmentIndexContent[locale];
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonical = departmentIndexPath(locale);
  const alternate = departmentIndexPath(otherLocale);

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
    numberOfItems: departmentRecords.length,
    itemListElement: departmentRecords.map((record, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: record.name[locale],
      url: `https://iaempleado.com${departmentDetailPath(record.key, locale)}`,
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternate} />
      <main id="contenido" className="organization-map-page">
        <section className="organization-hero section-shell">
          <div className="container organization-hero-grid brand-organization-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={localeHref(locale)}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Departamentos" : "Departments"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1>{content.title}</h1>
              <p className="organization-hero-lead">{content.description}</p>
              <div className="hero-actions">
                <a className="button" href="#department-list">{locale === "es" ? "Explorar departamentos" : "Explore departments"}</a>
                <Link className="button button-ghost" href={integrationIndexPath(locale)}>{locale === "es" ? "Ver integraciones" : "View integrations"}</Link>
              </div>
            </div>
            <div className="brand-organization-hero-side">
              <BrandOrganizationScene
                locale={locale}
                kind="department"
                contextKey="departments"
                eyebrow={locale === "es" ? "PERSONAS · IA · SISTEMAS" : "PEOPLE · AI · SYSTEMS"}
                title={locale === "es" ? "Un departamento aumentado por IA" : "An AI-augmented department"}
                systems={["CRM", "ERP", "Email", "Ticketing"]}
                humanLabel={locale === "es" ? "Control humano" : "Human control"}
              />
              <aside className="organization-hero-note">
                <strong>{departmentRecords.length}</strong>
                <span>{locale === "es" ? "departamentos con mapa operativo" : "departments with an operating map"}</span>
                <p>{locale === "es" ? "Cada página conecta responsabilidades, Empleados IA, procesos, sistemas y control humano." : "Each page connects responsibilities, AI Employees, processes, systems and human control."}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section" id="department-list" aria-labelledby="department-list-title">
          <div className="container">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "MAPA ORGANIZATIVO" : "ORGANIZATION MAP"}</p>
              <h2 id="department-list-title">{content.cardsTitle}</h2>
              <p>{content.cardsIntro}</p>
            </div>
            <div className="organization-card-grid">
              {departmentRecords.map((record) => (
                <article className="organization-card brand-organization-card" key={record.key}>
                  <div className="organization-card-topline">
                    <span>{record.eyebrow[locale]}</span>
                    <span>{record.useCases.length} {locale === "es" ? "procesos" : "processes"}</span>
                  </div>
                  <BrandOrganizationRoster locale={locale} employeeKeys={record.employeeKeys} compact />
                  <h3>{record.name[locale]}</h3>
                  <p>{record.shortAnswer[locale]}</p>
                  <div className="organization-tag-row">
                    {record.integrations.slice(0, 4).map((key) => <span key={key}>{key.replaceAll("-", " ")}</span>)}
                  </div>
                  <Link className="text-link" href={departmentDetailPath(record.key, locale)}>
                    {locale === "es" ? "Ver departamento" : "View department"} <span aria-hidden="true">→</span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="department-method-title">
          <div className="container">
            <div className="section-heading organization-section-heading">
              <p className="eyebrow">{locale === "es" ? "DISEÑO" : "DESIGN"}</p>
              <h2 id="department-method-title">{content.methodologyTitle}</h2>
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
              <p className="eyebrow">{locale === "es" ? "SIGUIENTE PASO" : "NEXT STEP"}</p>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar mi Equipo IA" : "Design my AI Team"}</Link>
              <Link className="button button-ghost" href={integrationIndexPath(locale)}>{locale === "es" ? "Explorar integraciones" : "Explore integrations"}</Link>
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

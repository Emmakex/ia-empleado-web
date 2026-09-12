import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  getTeamBuilderOptions,
  getTeamBuilderPageContent,
  getTeamBuilderPresets,
  teamBuilderPath,
} from "../lib/team-builder";
import { collaborationDemoPath } from "../lib/collaboration-demo";
import { TeamBuilder } from "./team-builder";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type TeamBuilderPageProps = {
  locale: Locale;
};

export function TeamBuilderPage({ locale }: TeamBuilderPageProps) {
  const dictionary = getDictionary(locale);
  const content = getTeamBuilderPageContent(locale);
  const options = getTeamBuilderOptions(locale);
  const presets = getTeamBuilderPresets(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonicalPath = teamBuilderPath(locale);
  const alternatePath = teamBuilderPath(otherLocale);
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

  const methodSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.methodTitle,
    numberOfItems: content.methodSteps.length,
    itemListElement: content.methodSteps.map((step, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: step.title,
      description: step.text,
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
      <main id="contenido" className="team-builder-page">
        <section className="team-builder-hero section-shell" aria-labelledby="team-builder-hero-title">
          <div className="container team-builder-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Diseña tu Equipo IA" : "Design your AI Team"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="team-builder-hero-title">{content.heroTitle}</h1>
              <p className="team-builder-hero-lead">{content.heroDescription}</p>
              <div className="hero-actions">
                <a className="button" href="#team-builder">{locale === "es" ? "Configurar mi equipo" : "Configure my team"}</a>
                <Link className="button button-ghost" href={collaborationDemoPath(locale)}>
                  {locale === "es" ? "Ver cómo trabajan juntos" : "See the team work"}
                </Link>
              </div>
            </div>
            <aside className="team-builder-hero-note" role="note">
              <span aria-hidden="true">◎</span>
              <p>{content.heroNote}</p>
              <div className="team-builder-privacy-chip">{locale === "es" ? "Cálculo local · sin envío de datos" : "Local calculation · no data upload"}</div>
            </aside>
          </div>
        </section>

        <section className="content-section team-builder-main-section" id="team-builder" aria-label={content.builderTitle}>
          <div className="container">
            <TeamBuilder locale={locale} content={content} options={options} presets={presets} />
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="builder-method-title">
          <div className="container">
            <div className="section-heading team-builder-section-heading">
              <p className="eyebrow">{content.methodEyebrow}</p>
              <h2 id="builder-method-title">{content.methodTitle}</h2>
              <p>{content.methodIntro}</p>
            </div>
            <ol className="team-builder-method-grid">
              {content.methodSteps.map((step, index) => (
                <li key={step.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="content-section" aria-labelledby="builder-interpretation-title">
          <div className="container">
            <div className="section-heading team-builder-section-heading">
              <p className="eyebrow">{content.interpretationEyebrow}</p>
              <h2 id="builder-interpretation-title">{content.interpretationTitle}</h2>
            </div>
            <div className="team-builder-interpretation-grid">
              {content.interpretationItems.map((item, index) => (
                <article key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="builder-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">FAQ</p>
              <h2 id="builder-faq-title">{content.faqTitle}</h2>
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
              <p className="eyebrow">{locale === "es" ? "DEL MAPA AL PROCESO" : "FROM MAP TO PROCESS"}</p>
              <h2>{locale === "es" ? "¿Quieres ver cómo se comporta un equipo cuando una tarea cambia de responsable?" : "Want to see how a team behaves when work changes owner?"}</h2>
              <p>{locale === "es" ? "El simulador de colaboración muestra handoffs, sistemas y puntos de control humano con escenarios sintéticos paso a paso." : "The collaboration simulator shows handoffs, systems and human-control points through step-by-step synthetic scenarios."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={collaborationDemoPath(locale)}>{locale === "es" ? "Ver simulador" : "Open simulator"}</Link>
              <Link className="button button-ghost" href={locale === "es" ? "/equipos-ia" : "/en/ai-teams"}>{locale === "es" ? "Explorar Equipos IA" : "Explore AI Teams"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(methodSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

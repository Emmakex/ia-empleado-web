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
import { processAnalyzerPath } from "../lib/process-analyzer";
import { BrandInteractivePreview } from "./brand-interactive-preview";
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
  const faq = content.faq.map((item, index) => index === content.faq.length - 1
    ? {
        ...item,
        answer: locale === "es"
          ? "No. El cálculo permanece en el navegador. Si decides continuar a Solicitar demo, solo se transfiere un resumen breve generado con valores predefinidos del catálogo; no viajan datos personales ni texto libre del configurador."
          : "No. Calculation stays in the browser. If you continue to Request demo, only a short summary built from predefined catalog values is transferred; no personal data or free text from the builder is carried over.",
      }
    : item);

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
    mainEntity: faq.map((item) => ({
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
          <div className="container team-builder-hero-grid brand-interactive-hero-grid">
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
                <Link className="button button-ghost" href={processAnalyzerPath(locale)}>
                  {locale === "es" ? "Mejorar un proceso" : "Improve a process"}
                </Link>
              </div>
            </div>
            <div className="brand-interactive-hero-side">
              <BrandInteractivePreview locale={locale} mode="team-builder" title={content.builderTitle} />
              <aside className="team-builder-hero-note" role="note">
                <span aria-hidden="true">◎</span>
                <p>{content.heroNote}</p>
                <div className="team-builder-privacy-chip">{locale === "es" ? "Cálculo local · sin envío de datos" : "Local calculation · no data upload"}</div>
              </aside>
            </div>
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
              {faq.map((item, index) => (
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
              <p className="eyebrow">{locale === "es" ? "DEL EQUIPO AL PROCESO" : "FROM TEAM TO PROCESS"}</p>
              <h2>{locale === "es" ? "Ahora compara cómo trabaja hoy el proceso y qué cambia con una composición coordinada." : "Now compare how the process works today and what changes with a coordinated composition."}</h2>
              <p>{locale === "es" ? "El Process Analyzer separa automatización, asistencia y responsabilidad humana paso a paso, sin asumir que todo debe ser autónomo." : "The Process Analyzer separates automation, assistance and human responsibility step by step without assuming everything should be autonomous."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link>
              <Link className="button button-ghost" href={collaborationDemoPath(locale)}>{locale === "es" ? "Ver simulador" : "Open simulator"}</Link>
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

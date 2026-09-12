import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import { localeHref } from "../lib/i18n";
import { teamIndexPath } from "../lib/team-content-engine";
import {
  collaborationDemoPath,
  getCollaborationPageContent,
  getCollaborationScenarios,
} from "../lib/collaboration-demo";
import { BrandInteractivePreview } from "./brand-interactive-preview";
import { CollaborationSimulator } from "./collaboration-simulator";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type CollaborationPageProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function CollaborationPage({ locale, dictionary }: CollaborationPageProps) {
  const content = getCollaborationPageContent(locale);
  const scenarios = getCollaborationScenarios(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonicalPath = collaborationDemoPath(locale);
  const alternatePath = collaborationDemoPath(otherLocale);
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
      url: "https://iaempleado.com",
    },
  };

  const scenariosSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.simulatorTitle,
    numberOfItems: scenarios.length,
    itemListElement: scenarios.map((scenario, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: scenario.title,
      description: scenario.summary,
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
      <a className="skip-link" href="#contenido">
        {locale === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternatePath} />
      <main id="contenido" className="collaboration-page">
        <section className="collaboration-hero section-shell" aria-labelledby="collaboration-hero-title">
          <div className="container collaboration-hero-grid brand-interactive-hero-grid">
            <div>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="collaboration-hero-title">{content.heroTitle}</h1>
              <p className="collaboration-hero-lead">{content.heroDescription}</p>
              <div className="hero-actions">
                <a className="button" href="#simulador">
                  {locale === "es" ? "Abrir simulador" : "Open simulator"}
                </a>
                <Link className="button button-secondary" href={teamIndexPath(locale)}>
                  {content.ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="brand-interactive-hero-side">
              <BrandInteractivePreview locale={locale} mode="collaboration" title={content.simulatorTitle} />
              <aside className="collaboration-hero-note" aria-label={locale === "es" ? "Alcance de la demo" : "Demo scope"}>
                <span className="collaboration-demo-badge">SYNTHETIC DEMO</span>
                <p>{content.heroNote}</p>
                <div className="collaboration-hero-legend">
                  <span><i className="kind-dot kind-employee" />{locale === "es" ? "Empleado IA" : "AI Employee"}</span>
                  <span><i className="kind-dot kind-system" />{locale === "es" ? "Sistema" : "System"}</span>
                  <span><i className="kind-dot kind-human" />{locale === "es" ? "Persona" : "Person"}</span>
                  <span><i className="kind-dot kind-result" />{locale === "es" ? "Resultado" : "Outcome"}</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section collaboration-simulator-section" id="simulador" aria-labelledby="simulator-title">
          <div className="container">
            <div className="section-heading collaboration-section-heading">
              <p className="eyebrow">{content.simulatorEyebrow}</p>
              <h2 id="simulator-title">{content.simulatorTitle}</h2>
              <p>{content.simulatorDescription}</p>
            </div>
            <CollaborationSimulator locale={locale} content={content} scenarios={scenarios} />
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="principles-title">
          <div className="container">
            <div className="section-heading collaboration-section-heading">
              <p className="eyebrow">{content.principlesEyebrow}</p>
              <h2 id="principles-title">{content.principlesTitle}</h2>
            </div>
            <div className="collaboration-principles-grid">
              {content.principles.map((item, index) => (
                <article className="collaboration-principle-card" key={item.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="scenarios-static-title">
          <div className="container">
            <div className="section-heading collaboration-section-heading">
              <p className="eyebrow">{content.crawlableEyebrow}</p>
              <h2 id="scenarios-static-title">{content.crawlableTitle}</h2>
              <p>{content.crawlableDescription}</p>
            </div>
            <div className="collaboration-static-scenarios">
              {scenarios.map((scenario, scenarioIndex) => (
                <article className="collaboration-static-scenario" key={scenario.key}>
                  <div className="collaboration-static-head">
                    <span>{String(scenarioIndex + 1).padStart(2, "0")}</span>
                    <div>
                      <p>{scenario.label}</p>
                      <h3>{scenario.title}</h3>
                    </div>
                  </div>
                  <p className="collaboration-static-summary">{scenario.summary}</p>
                  <dl className="collaboration-static-io">
                    <div><dt>{content.triggerLabel}</dt><dd>{scenario.trigger}</dd></div>
                    <div><dt>{content.outcomeLabel}</dt><dd>{scenario.outcome}</dd></div>
                  </dl>
                  <ol className="collaboration-static-steps">
                    {scenario.steps.map((step, index) => (
                      <li key={`${scenario.key}-${step.title}`}>
                        <div className={`static-step-marker kind-${step.kind}`}>{index + 1}</div>
                        <div>
                          <span className="static-step-actor">{step.actor}</span>
                          <h4>{step.title}</h4>
                          <p>{step.description}</p>
                          <p className="static-step-handoff"><strong>{content.handoffLabel}:</strong> {step.handoff}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </article>
              ))}
            </div>
            <p className="disclaimer collaboration-disclaimer">{content.disclaimer}</p>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="collaboration-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">FAQ</p>
              <h2 id="collaboration-faq-title">{content.faqTitle}</h2>
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

        <section className="content-section collaboration-cta-section">
          <div className="container collaboration-cta-card">
            <div>
              <p className="eyebrow">{locale === "es" ? "TU PROCESO" : "YOUR PROCESS"}</p>
              <h2>{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <div className="collaboration-cta-actions">
              <Link className="button" href={`${homeHref}#disena-tu-equipo`}>{content.ctaPrimary}</Link>
              <Link className="button button-secondary" href={teamIndexPath(locale)}>{content.ctaSecondary}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(scenariosSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

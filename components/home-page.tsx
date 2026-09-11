import type { Locale, SiteDictionary } from "../lib/i18n";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type HomePageProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function HomePage({ locale, dictionary }: HomePageProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dictionary.faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "IA Empleado",
    url: locale === "es" ? "https://iaempleado.com/" : "https://iaempleado.com/en",
    inLanguage: locale === "es" ? "es-ES" : "en",
    description: dictionary.seo.description,
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        {locale === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <SiteHeader locale={locale} dictionary={dictionary} />
      <main id="contenido">
        <section className="hero section-shell" aria-labelledby="hero-title">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{dictionary.hero.eyebrow}</p>
              <h1 id="hero-title">{dictionary.hero.title}</h1>
              <p className="hero-description">{dictionary.hero.description}</p>
              <div className="hero-actions">
                <a className="button" href="#disena-tu-equipo">{dictionary.hero.primaryCta}</a>
                <a className="button button-ghost" href="#como-funciona">{dictionary.hero.secondaryCta}</a>
              </div>
              <p className="hero-note"><span aria-hidden="true">↳</span> {dictionary.hero.note}</p>
            </div>

            <div className="ecosystem-card" aria-label={dictionary.hero.visualLabel}>
              <div className="ecosystem-orbit ecosystem-orbit-one" aria-hidden="true" />
              <div className="ecosystem-orbit ecosystem-orbit-two" aria-hidden="true" />
              <svg className="network-lines" viewBox="0 0 600 520" role="presentation" aria-hidden="true">
                <path d="M300 260 L125 115" />
                <path d="M300 260 L475 115" />
                <path d="M300 260 L125 405" />
                <path d="M300 260 L475 405" />
                <path className="network-flow" d="M125 115 L300 260 L475 405" />
                <path className="network-flow network-flow-delay" d="M475 115 L300 260 L125 405" />
              </svg>
              <div className="core-node">
                <span className="core-pulse" aria-hidden="true" />
                <strong>{dictionary.hero.core}</strong>
                <small>{locale === "es" ? "Coordinación" : "Coordination"}</small>
              </div>
              {dictionary.hero.nodes.map((node, index) => (
                <div className={`employee-node employee-node-${index + 1}`} key={node}>
                  <span className="node-status" aria-hidden="true" />
                  <span>{node}</span>
                </div>
              ))}
              <div className="system-row">
                {dictionary.hero.systems.map((system) => <span key={system}>{system}</span>)}
              </div>
              <p className="visual-caption">{dictionary.hero.visualLabel}</p>
            </div>
          </div>
        </section>

        <section className="principles-strip" aria-label={locale === "es" ? "Principios del producto" : "Product principles"}>
          <div className="container principles-grid">
            {dictionary.principles.map((principle, index) => (
              <article key={principle.title} className="principle-item">
                <span className="principle-index">0{index + 1}</span>
                <div><h2>{principle.title}</h2><p>{principle.text}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-section" aria-labelledby="definition-title">
          <div className="container two-column">
            <div>
              <p className="eyebrow">{dictionary.definition.eyebrow}</p>
              <h2 id="definition-title">{dictionary.definition.title}</h2>
            </div>
            <div className="content-stack">
              <p className="section-lead">{dictionary.definition.body}</p>
              <ul className="check-list">
                {dictionary.definition.bullets.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" id="como-funciona" aria-labelledby="workflow-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{dictionary.workflow.eyebrow}</p>
              <h2 id="workflow-title">{dictionary.workflow.title}</h2>
              <p>{dictionary.workflow.description}</p>
            </div>
            <div className="workflow-grid">
              {dictionary.workflow.steps.map((step, index) => (
                <article className="workflow-step" key={step.index}>
                  <div className="step-topline">
                    <span className="step-index">{step.index}</span>
                    {index < dictionary.workflow.steps.length - 1 && <span className="step-arrow" aria-hidden="true">→</span>}
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </article>
              ))}
            </div>
            <p className="disclaimer">{dictionary.workflow.disclaimer}</p>
          </div>
        </section>

        <section className="content-section" aria-labelledby="levels-title">
          <div className="container">
            <div className="section-heading compact-heading">
              <p className="eyebrow">{dictionary.levels.eyebrow}</p>
              <h2 id="levels-title">{dictionary.levels.title}</h2>
            </div>
            <div className="levels-grid">
              {dictionary.levels.items.map((item, index) => (
                <article className="level-card" key={item.label}>
                  <span className="level-number">{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  {index < dictionary.levels.items.length - 1 && <span className="level-connector" aria-hidden="true">→</span>}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" id="empleados" aria-labelledby="employees-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{dictionary.employees.eyebrow}</p>
              <h2 id="employees-title">{dictionary.employees.title}</h2>
              <p>{dictionary.employees.description}</p>
            </div>
            <div className="card-grid four-grid">
              {dictionary.employees.items.map((employee) => (
                <article className="info-card employee-card" key={employee.title}>
                  <span className="status-pill">{employee.tag}</span>
                  <div className="avatar-mark" aria-hidden="true">{employee.title.slice(0, 2).toUpperCase()}</div>
                  <h3>{employee.title}</h3>
                  <p>{employee.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="equipos" aria-labelledby="teams-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{dictionary.teams.eyebrow}</p>
              <h2 id="teams-title">{dictionary.teams.title}</h2>
              <p>{dictionary.teams.description}</p>
            </div>
            <div className="card-grid two-card-grid">
              {dictionary.teams.items.map((team) => (
                <article className="team-card" key={team.title}>
                  <div className="team-card-header">
                    <span className="team-icon" aria-hidden="true">◎</span>
                    <h3>{team.title}</h3>
                  </div>
                  <p className="team-members">{team.members}</p>
                  <p>{team.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section comparison-section" aria-labelledby="comparison-title">
          <div className="container">
            <div className="section-heading compact-heading">
              <p className="eyebrow">{dictionary.beforeAfter.eyebrow}</p>
              <h2 id="comparison-title">{dictionary.beforeAfter.title}</h2>
            </div>
            <div className="comparison-grid">
              <article className="comparison-card muted-card">
                <span className="comparison-label">01</span>
                <h3>{dictionary.beforeAfter.beforeTitle}</h3>
                <ol>{dictionary.beforeAfter.before.map((item) => <li key={item}>{item}</li>)}</ol>
              </article>
              <div className="comparison-divider" aria-hidden="true">→</div>
              <article className="comparison-card active-card">
                <span className="comparison-label">02</span>
                <h3>{dictionary.beforeAfter.afterTitle}</h3>
                <ol>{dictionary.beforeAfter.after.map((item) => <li key={item}>{item}</li>)}</ol>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="systems-title">
          <div className="container two-column">
            <div>
              <p className="eyebrow">{dictionary.systems.eyebrow}</p>
              <h2 id="systems-title">{dictionary.systems.title}</h2>
              <p className="section-lead">{dictionary.systems.description}</p>
            </div>
            <div className="integration-cloud" aria-label={locale === "es" ? "Tipos de integración" : "Integration types"}>
              {dictionary.systems.items.map((item, index) => (
                <span className={index % 3 === 0 ? "integration-chip chip-strong" : "integration-chip"} key={item}>{item}</span>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" id="seguridad" aria-labelledby="security-title">
          <div className="container">
            <div className="security-intro">
              <div>
                <p className="eyebrow">{dictionary.security.eyebrow}</p>
                <h2 id="security-title">{dictionary.security.title}</h2>
              </div>
              <p className="section-lead">{dictionary.security.description}</p>
            </div>
            <div className="security-grid">
              {dictionary.security.items.map((item, index) => (
                <article className="security-card" key={item.title}>
                  <span className="security-symbol" aria-hidden="true">{index === 0 ? "⌁" : index === 1 ? "✓" : "◇"}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section section-panel" id="preguntas" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">{dictionary.faq.eyebrow}</p>
              <h2 id="faq-title">{dictionary.faq.title}</h2>
            </div>
            <div className="faq-list">
              {dictionary.faq.items.map((item, index) => (
                <details className="faq-item" key={item.question} open={index === 0}>
                  <summary>{item.question}<span aria-hidden="true">+</span></summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section final-cta" id="disena-tu-equipo" aria-labelledby="cta-title">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{dictionary.cta.eyebrow}</p>
              <h2 id="cta-title">{dictionary.cta.title}</h2>
              <p>{dictionary.cta.description}</p>
            </div>
            <div className="cta-actions">
              <a className="button" href="mailto:hola@iaempleado.com?subject=IA%20Empleado%20-%20Equipo%20IA">{dictionary.cta.primary}</a>
              <a className="button button-ghost" href="#como-funciona">{dictionary.cta.secondary}</a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  comparisonDetailPath,
  comparisonIndexPath,
  type ComparisonRecord,
} from "../lib/comparison-content";
import { processAnalyzerPath } from "../lib/process-analyzer";
import { teamBuilderPath } from "../lib/team-builder";
import { BrandBeforeAfterProof } from "./brand-before-after-proof";
import { BrandComparisonScene } from "./brand-comparison-scene";
import { BrandEvidencePanel } from "./brand-evidence-panel";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type ComparisonDetailPageProps = {
  locale: Locale;
  record: ComparisonRecord;
};

export function ComparisonDetailPage({ locale, record }: ComparisonDetailPageProps) {
  const dictionary = getDictionary(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const canonicalPath = comparisonDetailPath(record.key, locale);
  const alternatePath = comparisonDetailPath(record.key, otherLocale);
  const indexPath = comparisonIndexPath(locale);
  const homeHref = localeHref(locale);
  const dimensions = record.dimensions[locale];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: record.seoTitle[locale],
    description: record.seoDescription[locale],
    url: `https://iaempleado.com${canonicalPath}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
    isPartOf: {
      "@type": "WebSite",
      name: "IA Empleado",
      url: locale === "es" ? "https://iaempleado.com/" : "https://iaempleado.com/en",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "es" ? "Inicio" : "Home", item: `https://iaempleado.com${homeHref}` },
      { "@type": "ListItem", position: 2, name: locale === "es" ? "Comparativas" : "Comparisons", item: `https://iaempleado.com${indexPath}` },
      { "@type": "ListItem", position: 3, name: record.title[locale], item: `https://iaempleado.com${canonicalPath}` },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.faq[locale].map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternatePath} />
      <main id="contenido" className="comparison-page comparison-detail-page">
        <section className="comparison-hero section-shell" aria-labelledby="comparison-title">
          <div className="container comparison-hero-grid comparison-brand-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <Link href={indexPath}>{locale === "es" ? "Comparativas" : "Comparisons"}</Link>
                <span aria-hidden="true">/</span>
                <span>{record.alternativeName[locale]}</span>
              </nav>
              <p className="eyebrow">{locale === "es" ? "COMPARATIVA PRÁCTICA" : "PRACTICAL COMPARISON"}</p>
              <h1 id="comparison-title">{record.title[locale]}</h1>
              <p className="comparison-hero-lead">{record.intro[locale]}</p>
              <div className="hero-actions">
                <a className="button" href="#tabla-comparativa">{locale === "es" ? "Ver diferencias" : "See differences"}</a>
                <Link className="button button-ghost" href={processAnalyzerPath(locale)}>{locale === "es" ? "Analizar mi proceso" : "Analyze my process"}</Link>
              </div>
            </div>
            <div className="comparison-hero-side">
              <BrandComparisonScene locale={locale} alternativeName={record.alternativeName[locale]} comparisonKey={record.key} />
              <aside className="comparison-answer-card" role="note">
                <span>{locale === "es" ? "RESPUESTA CORTA" : "SHORT ANSWER"}</span>
                <p>{record.shortAnswer[locale]}</p>
              </aside>
            </div>
          </div>
        </section>

        <section className="content-section comparison-table-section" id="tabla-comparativa" aria-labelledby="comparison-table-title">
          <div className="container">
            <div className="section-heading comparison-section-heading">
              <p className="eyebrow">{locale === "es" ? "DIFERENCIAS" : "DIFFERENCES"}</p>
              <h2 id="comparison-table-title">{locale === "es" ? `Empleado IA y ${record.alternativeName.es}, dimensión por dimensión` : `AI Employee and ${record.alternativeName.en}, dimension by dimension`}</h2>
              <p>{locale === "es" ? "Las descripciones son patrones habituales, no reglas universales. La implementación concreta puede mezclar características de varios enfoques." : "These descriptions are common patterns, not universal rules. A concrete implementation can combine characteristics from several approaches."}</p>
            </div>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">{locale === "es" ? "Dimensión" : "Dimension"}</th>
                    <th scope="col">{locale === "es" ? "Empleado IA" : "AI Employee"}</th>
                    <th scope="col">{record.alternativeName[locale]}</th>
                  </tr>
                </thead>
                <tbody>
                  {dimensions.map((dimension) => (
                    <tr key={dimension.label}>
                      <th scope="row">{dimension.label}</th>
                      <td>{dimension.employee}</td>
                      <td>{dimension.alternative}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="content-section comparison-proof-section" aria-label={locale === "es" ? "Lectura visual de la comparación" : "Visual comparison reading"}>
          <div className="container">
            <BrandBeforeAfterProof locale={locale} alternativeName={record.alternativeName[locale]} />
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="comparison-choice-title">
          <div className="container">
            <div className="section-heading comparison-section-heading">
              <p className="eyebrow">{locale === "es" ? "CUÁNDO ELEGIR" : "WHEN TO CHOOSE"}</p>
              <h2 id="comparison-choice-title">{locale === "es" ? "Elige por el trabajo que necesitas resolver" : "Choose based on the work you need to solve"}</h2>
            </div>
            <div className="comparison-choice-grid">
              <article className="comparison-choice-card comparison-choice-primary">
                <span className="comparison-choice-label">{locale === "es" ? "Empleado IA" : "AI Employee"}</span>
                <h3>{locale === "es" ? "Suele encajar mejor cuando…" : "Usually fits better when…"}</h3>
                <ul>
                  {record.chooseEmployeeWhen[locale].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article className="comparison-choice-card">
                <span className="comparison-choice-label">{record.alternativeName[locale]}</span>
                <h3>{locale === "es" ? "Suele encajar mejor cuando…" : "Usually fits better when…"}</h3>
                <ul>
                  {record.chooseAlternativeWhen[locale].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
              <article className="comparison-choice-card comparison-choice-combine">
                <span className="comparison-choice-label">{locale === "es" ? "Combinación" : "Combination"}</span>
                <h3>{locale === "es" ? "Tiene sentido combinarlos cuando…" : "Combining them makes sense when…"}</h3>
                <ul>
                  {record.combineWhen[locale].map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="comparison-decision-title">
          <div className="container comparison-decision-layout">
            <div>
              <p className="eyebrow">{locale === "es" ? "DECISIÓN" : "DECISION"}</p>
              <h2 id="comparison-decision-title">{locale === "es" ? "Una arquitectura puede usar varios patrones a la vez" : "One architecture can use several patterns at once"}</h2>
            </div>
            <div className="comparison-decision-copy">
              <p>{locale === "es" ? "IA Empleado no parte de la idea de reemplazar todas las herramientas existentes. Un proceso puede conservar reglas deterministas, usar RPA en sistemas legacy, ofrecer un chatbot al cliente y delegar coordinación a un Empleado IA." : "IA Empleado does not start from the assumption that every existing tool should be replaced. A process can keep deterministic rules, use RPA for legacy systems, expose a chatbot to customers and delegate coordination to an AI Employee."}</p>
              <p>{locale === "es" ? "La decisión correcta depende del proceso, el nivel de riesgo, la calidad de las integraciones y qué acciones deben permanecer bajo autoridad humana." : "The right decision depends on the process, the level of risk, integration quality and which actions must remain under human authority."}</p>
            </div>
          </div>
        </section>

        <section className="content-section comparison-evidence-section" aria-labelledby="comparison-evidence-title">
          <div className="container">
            <div className="section-heading comparison-section-heading">
              <p className="eyebrow">{locale === "es" ? "PRUEBA INSPECCIONABLE" : "INSPECTABLE EVIDENCE"}</p>
              <h2 id="comparison-evidence-title">{locale === "es" ? "Comprueba el enfoque con demos, análisis y estimaciones separadas" : "Inspect the approach through separate demos, analysis and estimates"}</h2>
              <p>{locale === "es" ? "Cada superficie indica qué tipo de evidencia estás viendo para no confundir una demo con producción ni una estimación con un resultado medido." : "Each surface states what kind of evidence you are viewing so a demo is not confused with production and an estimate is not confused with a measured result."}</p>
            </div>
            <BrandEvidencePanel locale={locale} />
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="comparison-faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">FAQ</p>
              <h2 id="comparison-faq-title">{locale === "es" ? "Preguntas frecuentes" : "Frequently asked questions"}</h2>
            </div>
            <div className="faq-list">
              {record.faq[locale].map((item, index) => (
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
              <p className="eyebrow">{locale === "es" ? "APLICARLO A TU EMPRESA" : "APPLY IT TO YOUR BUSINESS"}</p>
              <h2>{locale === "es" ? "No elijas una etiqueta. Diseña el proceso y asigna el patrón adecuado a cada tramo." : "Do not choose a label. Design the process and assign the right pattern to each segment."}</h2>
              <p>{locale === "es" ? "Analiza primero dónde está el cuello de botella y después decide qué parte necesita reglas, asistencia, delegación o aprobación humana." : "First identify the bottleneck, then decide which part needs rules, assistance, delegation or human approval."}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={processAnalyzerPath(locale)}>{locale === "es" ? "Mejorar mi proceso" : "Improve my process"}</Link>
              <Link className="button button-ghost" href={teamBuilderPath(locale)}>{locale === "es" ? "Diseñar mi Equipo IA" : "Design my AI Team"}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}

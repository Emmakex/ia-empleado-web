import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  getConversionHandoffContent,
  getLeadIntentLabel,
  normalizeLeadHandoffParams,
  requestDemoPath,
  type SearchParamRecord,
} from "../lib/conversion-handoff";
import { LeadHandoffForm } from "./lead-handoff-form";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type RequestDemoPageProps = {
  locale: Locale;
  searchParams: SearchParamRecord;
};

export function RequestDemoPage({ locale, searchParams }: RequestDemoPageProps) {
  const dictionary = getDictionary(locale);
  const content = getConversionHandoffContent(locale);
  const context = normalizeLeadHandoffParams(searchParams);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const homeHref = localeHref(locale);
  const intentLabel = getLeadIntentLabel(locale, context.intent);
  const contextLabel = context.context ?? content.contextFallback;

  const steps = locale === "es"
    ? [
        ["01", "Proceso", "Cuéntanos qué trabajo quieres mejorar y qué resultado buscas."],
        ["02", "Sistemas y límites", "Identificamos qué sistemas intervienen y qué debe seguir bajo control humano."],
        ["03", "Siguiente paso", "Preparamos una demo o conversación técnica acorde al alcance real."],
      ]
    : [
        ["01", "Process", "Tell us which work you want to improve and what outcome you need."],
        ["02", "Systems and boundaries", "We identify the systems involved and what must remain under human control."],
        ["03", "Next step", "We prepare a demo or technical conversation aligned with the real scope."],
      ];

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={requestDemoPath(otherLocale)} />
      <main id="contenido" className="conversion-handoff-page">
        <section className="conversion-handoff-hero section-shell" aria-labelledby="conversion-handoff-title">
          <div className="container conversion-handoff-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Solicitar demo" : "Request demo"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="conversion-handoff-title">{content.title}</h1>
              <p className="conversion-handoff-lead">{content.description}</p>
            </div>

            <aside className="lead-context-card" aria-labelledby="lead-context-title">
              <p className="eyebrow">{content.contextTitle}</p>
              <h2 id="lead-context-title">{intentLabel}</h2>
              <dl className="lead-context-list">
                <div>
                  <dt>{locale === "es" ? "Origen" : "Source"}</dt>
                  <dd data-lead-source>{context.source}</dd>
                </div>
                <div>
                  <dt>{locale === "es" ? "Contexto" : "Context"}</dt>
                  <dd data-lead-context>{contextLabel}</dd>
                </div>
              </dl>
            </aside>
          </div>
        </section>

        <section className="content-section conversion-handoff-main">
          <div className="container conversion-handoff-main-grid">
            <LeadHandoffForm locale={locale} context={context} labels={content} />

            <aside className="lead-next-step-card" aria-label={locale === "es" ? "Qué ocurre después" : "What happens next"}>
              <p className="eyebrow">{locale === "es" ? "QUÉ PREPARAMOS" : "WHAT WE PREPARE"}</p>
              <ol>
                {steps.map(([number, title, text]) => (
                  <li key={number}>
                    <span>{number}</span>
                    <div>
                      <h2>{title}</h2>
                      <p>{text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link className="button button-ghost" href={homeHref}>{content.back}</Link>
            </aside>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  );
}

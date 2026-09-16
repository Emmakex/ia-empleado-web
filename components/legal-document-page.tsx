import Link from "next/link";
import type { Locale } from "../lib/i18n";
import { getDictionary, localeHref } from "../lib/i18n";
import {
  getLegalDocumentContent,
  isLegalIdentityComplete,
  legalNoticePath,
  privacyPolicyPath,
  type LegalDocumentKind,
} from "../lib/legal-content";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type LegalDocumentPageProps = {
  locale: Locale;
  kind: LegalDocumentKind;
};

export function LegalDocumentPage({ locale, kind }: LegalDocumentPageProps) {
  const dictionary = getDictionary(locale);
  const document = getLegalDocumentContent(locale, kind);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const homeHref = localeHref(locale);
  const alternateHref = kind === "legal-notice"
    ? legalNoticePath(otherLocale)
    : privacyPolicyPath(otherLocale);
  const complete = isLegalIdentityComplete();

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternateHref} />
      <main id="contenido" className="legal-page">
        <section className="section-shell legal-hero" aria-labelledby="legal-title">
          <div className="container legal-shell">
            <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
              <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
              <span aria-hidden="true">/</span>
              <span>{document.title}</span>
            </nav>
            <p className="eyebrow">{document.eyebrow}</p>
            <h1 id="legal-title">{document.title}</h1>
            <p className="legal-lead">{document.description}</p>

            {!complete ? (
              <aside className="legal-readiness-note" aria-label={document.draftLabel} data-legal-identity-incomplete>
                <strong>{document.draftLabel}</strong>
                <p>{document.draftBody}</p>
              </aside>
            ) : null}
          </div>
        </section>

        <section className="content-section">
          <div className="container legal-shell legal-document">
            {document.sections.map((section) => (
              <section key={section.title} className="legal-section">
                <h2>{section.title}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
    </>
  );
}

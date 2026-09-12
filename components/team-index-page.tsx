import Link from "next/link";
import { getDictionary, localeHref, type Locale } from "../lib/i18n";
import {
  getLocalizedTeams,
  getTeamIndexContent,
  teamDetailPath,
  teamIndexPath,
} from "../lib/team-content-engine";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type TeamIndexPageProps = {
  locale: Locale;
};

export function TeamIndexPage({ locale }: TeamIndexPageProps) {
  const dictionary = getDictionary(locale);
  const content = getTeamIndexContent(locale);
  const teams = getLocalizedTeams(locale);
  const otherLocale: Locale = locale === "es" ? "en" : "es";
  const homeHref = localeHref(locale);

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.title,
    description: content.description,
    url: `https://iaempleado.com${teamIndexPath(locale)}`,
    inLanguage: locale === "es" ? "es-ES" : "en",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: teams.length,
      itemListElement: teams.map((team, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: team.name,
        url: `https://iaempleado.com${teamDetailPath(team.key, locale)}`,
      })),
    },
  };

  return (
    <>
      <a className="skip-link" href="#contenido">
        {locale === "es" ? "Saltar al contenido" : "Skip to content"}
      </a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={teamIndexPath(otherLocale)} />
      <main id="contenido">
        <section className="team-index-hero section-shell" aria-labelledby="team-index-title">
          <div className="container team-index-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}>
                <Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link>
                <span aria-hidden="true">/</span>
                <span>{locale === "es" ? "Equipos IA" : "AI Teams"}</span>
              </nav>
              <p className="eyebrow">{content.eyebrow}</p>
              <h1 id="team-index-title">{content.title}</h1>
              <p className="hero-description">{content.description}</p>
              <div className="hero-actions">
                <a className="button" href="#equipos-disponibles">{locale === "es" ? "Explorar equipos" : "Explore teams"}</a>
                <Link className="button button-ghost" href={`${homeHref}#disena-tu-equipo`}>{content.ctaPrimary}</Link>
              </div>
            </div>
            <aside className="team-definition-card" aria-labelledby="team-definition-title">
              <span className="team-definition-icon" aria-hidden="true">◎</span>
              <h2 id="team-definition-title">{content.definitionTitle}</h2>
              <p>{content.definitionBody}</p>
            </aside>
          </div>
        </section>

        <section className="content-section section-panel" id="equipos-disponibles" aria-labelledby="team-cards-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{content.modelNote}</p>
              <h2 id="team-cards-title">{content.cardsTitle}</h2>
              <p>{content.cardsIntro}</p>
            </div>
            <div className="team-directory-grid">
              {teams.map((team) => (
                <Link className="team-directory-card" href={teamDetailPath(team.key, locale)} key={team.key}>
                  <div className="team-directory-topline">
                    <span className="status-pill">{team.statusLabel}</span>
                    <span className="team-member-count">{team.members.length} {content.memberCountLabel}</span>
                  </div>
                  <h3>{team.name}</h3>
                  <p className="team-directory-outcome">{team.outcome}</p>
                  <div className="team-mini-members" aria-label={locale === "es" ? "Miembros del equipo" : "Team members"}>
                    {team.members.map((member) => <span key={member.name}>{member.name}</span>)}
                  </div>
                  <span className="team-card-cta">{content.viewLabel} <span aria-hidden="true">→</span></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section" aria-labelledby="team-principles-title">
          <div className="container">
            <div className="section-heading compact-heading">
              <p className="eyebrow">{locale === "es" ? "COORDINACIÓN, NO SOLO AUTOMATIZACIÓN" : "COORDINATION, NOT JUST AUTOMATION"}</p>
              <h2 id="team-principles-title">{content.principlesTitle}</h2>
            </div>
            <div className="team-principles-grid">
              {content.principles.map((principle, index) => (
                <article className="team-principle-card" key={principle.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="content-section final-cta" id="disena-tu-equipo" aria-labelledby="team-index-cta-title">
          <div className="container cta-panel">
            <div>
              <p className="eyebrow">{content.ctaEyebrow}</p>
              <h2 id="team-index-cta-title">{content.ctaTitle}</h2>
              <p>{content.ctaText}</p>
            </div>
            <div className="cta-actions">
              <Link className="button" href={`${homeHref}#disena-tu-equipo`}>{content.ctaPrimary}</Link>
              <Link className="button button-ghost" href={locale === "es" ? "/empleados-ia" : "/en/ai-employees"}>
                {locale === "es" ? "Explorar Empleados IA" : "Explore AI Employees"}
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }} />
    </>
  );
}

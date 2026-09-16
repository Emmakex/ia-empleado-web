import Link from "next/link";
import { employeeDetailPath } from "../lib/employee-content-engine";
import { getDictionary, localeHref, type Locale } from "../lib/i18n";
import { getBrandCharacterForProfileKey } from "../lib/brand-characters";
import { alternateTeamPath, getTeamRecords, teamIndexPath, type TeamKey } from "../lib/team-content-engine";
import { teamBuilderPath } from "../lib/team-builder";
import { BrandCharacterImage } from "./brand-character-image";
import { BrandCollaborationComposition } from "./brand-collaboration-composition";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type TeamDetailPageProps = { locale: Locale; teamKey: TeamKey };

export function TeamDetailPage({ locale, teamKey }: TeamDetailPageProps) {
  const dictionary = getDictionary(locale);
  const team = getTeamRecords().find((record) => record.key === teamKey);
  if (!team) return null;

  const detail = team.locales[locale];
  const homeHref = localeHref(locale);
  const indexHref = teamIndexPath(locale);
  const builderHref = teamBuilderPath(locale);
  const canonical = `https://iaempleado.com${indexHref}/${detail.slug}`;
  const brandedMembers = detail.members.map((member) => member.employeeKey ? getBrandCharacterForProfileKey(member.employeeKey, locale) : undefined);
  const collaborationParticipants = detail.members.map((member, index) => ({
    id: `${teamKey}-${index + 1}`,
    employeeKey: member.employeeKey,
    name: member.name,
    responsibility: member.responsibility,
  }));

  const schemas = [
    { "@context": "https://schema.org", "@type": "WebPage", name: detail.name, description: detail.seoDescription, url: canonical, inLanguage: locale === "es" ? "es-ES" : "en", isPartOf: { "@type": "WebSite", name: "IA Empleado", url: locale === "es" ? "https://iaempleado.com/" : "https://iaempleado.com/en" } },
    { "@context": "https://schema.org", "@type": "ItemList", name: detail.membersTitle, numberOfItems: detail.members.length, itemListElement: detail.members.map((member, index) => ({ "@type": "ListItem", position: index + 1, name: member.name, description: member.description })) },
    { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: detail.faq.map((item) => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) },
  ];

  return (
    <>
      <a className="skip-link" href="#contenido">{locale === "es" ? "Saltar al contenido" : "Skip to content"}</a>
      <SiteHeader locale={locale} dictionary={dictionary} alternateHref={alternateTeamPath(teamKey, locale)} />
      <main id="contenido" className="brand-team-detail-page">
        <section className="team-detail-hero section-shell brand-team-detail-hero" aria-labelledby="team-detail-title">
          <div className="container team-detail-hero-grid">
            <div>
              <nav className="breadcrumbs" aria-label={locale === "es" ? "Migas de pan" : "Breadcrumbs"}><Link href={homeHref}>{locale === "es" ? "Inicio" : "Home"}</Link><span aria-hidden="true">/</span><Link href={indexHref}>{locale === "es" ? "Equipos IA" : "AI Teams"}</Link><span aria-hidden="true">/</span><span>{detail.shortName}</span></nav>
              <p className="eyebrow">{detail.eyebrow}</p><span className="status-pill">{detail.statusLabel}</span><h1 id="team-detail-title">{detail.heroTitle}</h1><p className="hero-description">{detail.heroDescription}</p>
              <div className="hero-actions"><a className="button" href="#flujo-equipo">{locale === "es" ? "Ver el flujo" : "See the workflow"}</a><Link className="button button-ghost" href={builderHref}>{detail.ctaPrimary}</Link></div>
            </div>
            <aside className="team-outcome-card brand-team-outcome-card" aria-label={detail.outcomeLabel}>
              <BrandCollaborationComposition
                locale={locale}
                variant="team"
                contextKey={teamKey}
                eyebrow={detail.eyebrow}
                title={detail.shortName}
                participants={collaborationParticipants}
                systems={detail.systems}
                humanLabel={locale === "es" ? "Control humano en excepciones y acciones sensibles" : "Human control for exceptions and sensitive actions"}
                handoffLabel={locale === "es" ? "Handoffs del equipo" : "Team handoffs"}
              />
              <span className="team-outcome-kicker">{detail.outcomeLabel}</span><p>{detail.outcome}</p>
            </aside>
          </div>
        </section>

        <section className="content-section section-panel" aria-labelledby="team-problem-title"><div className="container two-column team-problem-grid"><div><p className="eyebrow">{locale === "es" ? "POR QUÉ UN EQUIPO" : "WHY A TEAM"}</p><h2 id="team-problem-title">{detail.problemTitle}</h2></div><p className="section-lead">{detail.problemBody}</p></div></section>

        <section className="content-section" aria-labelledby="team-members-title"><div className="container"><div className="section-heading"><p className="eyebrow">{locale === "es" ? "ROLES ESPECIALIZADOS" : "SPECIALIZED ROLES"}</p><h2 id="team-members-title">{detail.membersTitle}</h2><p>{detail.membersIntro}</p></div><div className="team-member-grid brand-team-member-grid">{detail.members.map((member, index) => {
          const character = brandedMembers[index];
          const content = <><div className="team-member-topline"><span className="team-member-index">{String(index + 1).padStart(2, "0")}</span><span className="team-member-role">{member.responsibility}</span></div>{character && <div className="brand-team-member-portrait" data-accent={character.accent} aria-hidden="true"><BrandCharacterImage character={character} sizes="(max-width: 760px) 112px, 150px" /><span>{character.name}</span></div>}<h3>{member.name}</h3><p>{member.description}</p>{member.employeeKey && <span className="team-member-link-label">{locale === "es" ? "Ver perfil profundo" : "View deep profile"} →</span>}</>;
          return member.employeeKey ? <Link className={`team-member-card linked${character ? " has-brand-character" : ""}`} href={employeeDetailPath(member.employeeKey, locale)} key={member.name}>{content}</Link> : <article className="team-member-card" key={member.name}>{content}</article>;
        })}</div><p className="disclaimer team-model-disclaimer">{locale === "es" ? "Los perfiles sin ficha profunda se muestran como oportunidades del catálogo. Su aparición en esta composición no implica una implantación lista para usar sin adaptación." : "Profiles without a deep page are shown as catalog opportunities. Their presence in this composition does not imply an out-of-the-box deployment without adaptation."}</p></div></section>

        <section className="content-section section-panel" id="flujo-equipo" aria-labelledby="team-workflow-title"><div className="container"><div className="section-heading"><p className="eyebrow">{locale === "es" ? "HANDOFFS EXPLÍCITOS" : "EXPLICIT HANDOFFS"}</p><h2 id="team-workflow-title">{detail.workflowTitle}</h2><p>{detail.workflowIntro}</p></div><ol className="team-workflow-list">{detail.workflow.map((step, index) => <li className="team-workflow-item" key={step.title}><span className="team-workflow-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.text}</p></div>{index < detail.workflow.length - 1 && <span className="team-workflow-connector" aria-hidden="true">↓</span>}</li>)}</ol></div></section>

        <section className="content-section" aria-labelledby="team-systems-title"><div className="container two-column"><div><p className="eyebrow">{locale === "es" ? "SISTEMAS Y CONTEXTO" : "SYSTEMS AND CONTEXT"}</p><h2 id="team-systems-title">{detail.systemsTitle}</h2><p className="section-lead">{detail.systemsIntro}</p></div><div className="integration-cloud" aria-label={detail.systemsTitle}>{detail.systems.map((system, index) => <span className={index % 3 === 0 ? "integration-chip chip-strong" : "integration-chip"} key={system}>{system}</span>)}</div></div></section>

        <section className="content-section section-panel" aria-labelledby="team-controls-title"><div className="container team-controls-grid"><div><p className="eyebrow">{locale === "es" ? "GOBERNANZA" : "GOVERNANCE"}</p><h2 id="team-controls-title">{detail.controlsTitle}</h2><p className="section-lead">{detail.controlsIntro}</p></div><ul className="team-check-list">{detail.controls.map((control) => <li key={control}>{control}</li>)}</ul></div></section>

        <section className="content-section" aria-labelledby="team-metrics-title"><div className="container"><div className="section-heading compact-heading"><p className="eyebrow">{locale === "es" ? "RESULTADOS MEDIBLES" : "MEASURABLE OUTCOMES"}</p><h2 id="team-metrics-title">{detail.metricsTitle}</h2><p>{detail.metricsIntro}</p></div><div className="team-metrics-grid">{detail.metrics.map((metric, index) => <article className="team-metric-card" key={metric}><span>{String(index + 1).padStart(2, "0")}</span><p>{metric}</p></article>)}</div></div></section>

        <section className="content-section section-panel" aria-labelledby="team-usecases-title"><div className="container"><div className="section-heading"><p className="eyebrow">{locale === "es" ? "SITUACIONES CONCRETAS" : "CONCRETE SITUATIONS"}</p><h2 id="team-usecases-title">{detail.useCasesTitle}</h2></div><div className="two-card-grid team-usecase-grid">{detail.useCases.map((useCase) => <article className="info-card" key={useCase.title}><h3>{useCase.title}</h3><p>{useCase.text}</p></article>)}</div></div></section>

        <section className="content-section" aria-labelledby="team-limits-title"><div className="container two-column team-limits-grid"><div><p className="eyebrow">{locale === "es" ? "LÍMITES" : "LIMITS"}</p><h2 id="team-limits-title">{detail.limitsTitle}</h2></div><ul className="team-limit-list">{detail.limits.map((limit) => <li key={limit}>{limit}</li>)}</ul></div></section>

        <section className="content-section section-panel" aria-labelledby="team-faq-title"><div className="container faq-layout"><div className="faq-heading"><p className="eyebrow">FAQ</p><h2 id="team-faq-title">{detail.faqTitle}</h2></div><div className="faq-list">{detail.faq.map((item, index) => <details className="faq-item" key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div></div></section>

        <section className="content-section final-cta" aria-labelledby="team-cta-title"><div className="container cta-panel"><div><p className="eyebrow">{detail.ctaEyebrow}</p><h2 id="team-cta-title">{detail.ctaTitle}</h2><p>{detail.ctaText}</p></div><div className="cta-actions"><Link className="button" href={builderHref}>{detail.ctaPrimary}</Link><Link className="button button-ghost" href={indexHref}>{detail.ctaSecondary}</Link></div></div></section>
      </main>
      <SiteFooter locale={locale} dictionary={dictionary} />
      {schemas.map((schema, index) => <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />)}
    </>
  );
}

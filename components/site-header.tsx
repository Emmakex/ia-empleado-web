import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import { alternateLocale, localeHref } from "../lib/i18n";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
};

export function SiteHeader({ locale, dictionary }: SiteHeaderProps) {
  const otherLocale = alternateLocale(locale);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href={localeHref(locale)} aria-label="IA Empleado">
          <span className="brand-mark" aria-hidden="true">IA</span>
          <span>IA Empleado</span>
        </Link>
        <nav className="main-nav" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
          <a href="#empleados">{dictionary.nav.employees}</a>
          <a href="#equipos">{dictionary.nav.teams}</a>
          <a href="#como-funciona">{dictionary.nav.how}</a>
          <a href="#seguridad">{dictionary.nav.security}</a>
        </nav>
        <div className="header-actions">
          <Link className="language-link" href={localeHref(otherLocale)} hrefLang={otherLocale}>
            {dictionary.nav.language}
          </Link>
          <a className="button button-small" href="#disena-tu-equipo">
            {dictionary.nav.cta}
          </a>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import type { Locale, SiteDictionary } from "../lib/i18n";
import { alternateLocale, localeHref } from "../lib/i18n";
import { employeeIndexPath } from "../lib/employee-catalog";

type SiteHeaderProps = {
  locale: Locale;
  dictionary: SiteDictionary;
  alternateHref?: string;
};

export function SiteHeader({ locale, dictionary, alternateHref }: SiteHeaderProps) {
  const otherLocale = alternateLocale(locale);
  const homeHref = localeHref(locale);
  const employeeHref = employeeIndexPath(locale);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href={homeHref} aria-label="IA Empleado">
          <span className="brand-mark" aria-hidden="true">IA</span>
          <span>IA Empleado</span>
        </Link>
        <nav className="main-nav" aria-label={locale === "es" ? "Navegación principal" : "Main navigation"}>
          <Link href={employeeHref}>{dictionary.nav.employees}</Link>
          <Link href={`${homeHref}#equipos`}>{dictionary.nav.teams}</Link>
          <Link href={`${homeHref}#como-funciona`}>{dictionary.nav.how}</Link>
          <Link href={`${homeHref}#seguridad`}>{dictionary.nav.security}</Link>
        </nav>
        <div className="header-actions">
          <Link className="language-link" href={alternateHref ?? localeHref(otherLocale)} hrefLang={otherLocale}>
            {dictionary.nav.language}
          </Link>
          <Link className="button button-small" href={`${homeHref}#disena-tu-equipo`}>
            {dictionary.nav.cta}
          </Link>
        </div>
      </div>
    </header>
  );
}

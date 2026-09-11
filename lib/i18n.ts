import es from "../content/es.json";
import en from "../content/en.json";

export type Locale = "es" | "en";
export type SiteDictionary = typeof es;

const dictionaries: Record<Locale, SiteDictionary> = {
  es,
  en,
};

export function getDictionary(locale: Locale): SiteDictionary {
  return dictionaries[locale];
}

export function localeHref(locale: Locale): string {
  return locale === "es" ? "/" : "/en";
}

export function alternateLocale(locale: Locale): Locale {
  return locale === "es" ? "en" : "es";
}

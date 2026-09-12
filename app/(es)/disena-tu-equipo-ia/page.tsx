import type { Metadata } from "next";
import { TeamBuilderPage } from "../../../components/team-builder-page";
import { getTeamBuilderPageContent, teamBuilderPath } from "../../../lib/team-builder";

const content = getTeamBuilderPageContent("es");
const canonical = teamBuilderPath("es");
const alternate = teamBuilderPath("en");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: {
      "es-ES": canonical,
      en: alternate,
      "x-default": canonical,
    },
  },
  openGraph: {
    type: "website",
    title: content.seoTitle,
    description: content.seoDescription,
    url: canonical,
    locale: "es_ES",
    alternateLocale: ["en_US"],
  },
};

export default function SpanishTeamBuilderRoute() {
  return <TeamBuilderPage locale="es" />;
}

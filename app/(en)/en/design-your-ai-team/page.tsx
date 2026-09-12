import type { Metadata } from "next";
import { TeamBuilderPage } from "../../../../components/team-builder-page";
import { getTeamBuilderPageContent, teamBuilderPath } from "../../../../lib/team-builder";

const content = getTeamBuilderPageContent("en");
const canonical = teamBuilderPath("en");
const alternate = teamBuilderPath("es");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical,
    languages: {
      "es-ES": alternate,
      en: canonical,
      "x-default": alternate,
    },
  },
  openGraph: {
    type: "website",
    title: content.seoTitle,
    description: content.seoDescription,
    url: canonical,
    locale: "en_US",
    alternateLocale: ["es_ES"],
  },
};

export default function EnglishTeamBuilderRoute() {
  return <TeamBuilderPage locale="en" />;
}

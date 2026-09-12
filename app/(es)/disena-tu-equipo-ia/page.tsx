import type { Metadata } from "next";
import { TeamBuilderPage } from "../../../components/team-builder-page";
import { getTeamBuilderPageContent, teamBuilderPath } from "../../../lib/team-builder";
import { brandPreviewUrl } from "../../../lib/brand-social-previews";

const content = getTeamBuilderPageContent("es");
const canonical = teamBuilderPath("es");
const alternate = teamBuilderPath("en");
const preview = brandPreviewUrl("es", "team-builder");

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
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function SpanishTeamBuilderRoute() {
  return <TeamBuilderPage locale="es" />;
}

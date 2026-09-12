import type { Metadata } from "next";
import { TeamBuilderPage } from "../../../../components/team-builder-page";
import { getTeamBuilderPageContent, teamBuilderPath } from "../../../../lib/team-builder";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = getTeamBuilderPageContent("en");
const canonical = teamBuilderPath("en");
const alternate = teamBuilderPath("es");
const preview = brandPreviewUrl("en", "team-builder");

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
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function EnglishTeamBuilderRoute() {
  return <TeamBuilderPage locale="en" />;
}

import type { Metadata } from "next";
import { TeamBuilderPage } from "../../../../components/team-builder-page";
import { getTeamBuilderPageContent, teamBuilderPath } from "../../../../lib/team-builder";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";
import { getPhase5SeoPolicy } from "../../../../lib/conversion-seo-policy";

const content = getTeamBuilderPageContent("en");
const policy = getPhase5SeoPolicy("team-builder");
const canonical = teamBuilderPath("en");
const alternate = teamBuilderPath("es");
const preview = brandPreviewUrl("en", "team-builder");
const seoTitle = policy.seoTitle?.en ?? content.seoTitle;
const seoDescription = policy.seoDescription?.en ?? content.seoDescription;

export const metadata: Metadata = {
  title: seoTitle,
  description: seoDescription,
  robots: { index: policy.index, follow: policy.follow },
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
    title: seoTitle,
    description: seoDescription,
    url: canonical,
    locale: "en_US",
    alternateLocale: ["es_ES"],
    images: [{ url: preview, width: 1200, height: 630, alt: seoTitle }],
  },
  twitter: { card: "summary_large_image", title: seoTitle, description: seoDescription, images: [preview] },
};

export default function EnglishTeamBuilderRoute() {
  return <TeamBuilderPage locale="en" />;
}

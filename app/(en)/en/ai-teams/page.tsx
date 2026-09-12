import type { Metadata } from "next";
import { TeamIndexPage } from "../../../../components/team-index-page";
import { getTeamIndexContent, teamIndexPath } from "../../../../lib/team-content-engine";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const content = getTeamIndexContent("en");
const preview = brandPreviewUrl("en", "teams");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical: teamIndexPath("en"),
    languages: {
      "es-ES": teamIndexPath("es"),
      en: teamIndexPath("en"),
      "x-default": teamIndexPath("es"),
    },
  },
  openGraph: {
    title: content.seoTitle,
    description: content.seoDescription,
    url: teamIndexPath("en"),
    type: "website",
    images: [{ url: preview, width: 1200, height: 630, alt: content.seoTitle }],
  },
  twitter: { card: "summary_large_image", title: content.seoTitle, description: content.seoDescription, images: [preview] },
};

export default function AiTeamsPage() {
  return <TeamIndexPage locale="en" />;
}

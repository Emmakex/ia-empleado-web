import type { Metadata } from "next";
import { TeamIndexPage } from "../../../../components/team-index-page";
import { getTeamIndexContent, teamIndexPath } from "../../../../lib/team-content-engine";

const content = getTeamIndexContent("en");

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
  },
};

export default function AiTeamsPage() {
  return <TeamIndexPage locale="en" />;
}

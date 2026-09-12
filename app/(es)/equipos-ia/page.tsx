import type { Metadata } from "next";
import { TeamIndexPage } from "../../../components/team-index-page";
import { getTeamIndexContent, teamIndexPath } from "../../../lib/team-content-engine";

const content = getTeamIndexContent("es");

export const metadata: Metadata = {
  title: content.seoTitle,
  description: content.seoDescription,
  alternates: {
    canonical: teamIndexPath("es"),
    languages: {
      "es-ES": teamIndexPath("es"),
      en: teamIndexPath("en"),
      "x-default": teamIndexPath("es"),
    },
  },
  openGraph: {
    title: content.seoTitle,
    description: content.seoDescription,
    url: teamIndexPath("es"),
    type: "website",
  },
};

export default function EquiposIaPage() {
  return <TeamIndexPage locale="es" />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamDetailPage } from "../../../../../components/team-detail-page";
import {
  alternateTeamPath,
  getTeamBySlug,
  getTeamRecords,
  teamDetailPath,
} from "../../../../../lib/team-content-engine";
import { buildRouteSocialMetadata } from "../../../../../lib/seo-social-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getTeamRecords().map((team) => ({ slug: team.locales.en.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlug("en", slug);
  if (!team) return {};

  const canonical = teamDetailPath(team.key, "en");
  const alternate = alternateTeamPath(team.key, "en");

  return {
    title: team.detail.seoTitle,
    description: team.detail.seoDescription,
    alternates: {
      canonical,
      languages: {
        "es-ES": alternate,
        en: canonical,
        "x-default": alternate,
      },
    },
    ...buildRouteSocialMetadata({
      locale: "en",
      surface: "teams",
      title: team.detail.seoTitle,
      description: team.detail.seoDescription,
      canonical,
    }),
  };
}

export default async function EnglishTeamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const team = getTeamBySlug("en", slug);
  if (!team) notFound();

  return <TeamDetailPage locale="en" teamKey={team.key} />;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TeamDetailPage } from "../../../../components/team-detail-page";
import {
  alternateTeamPath,
  getTeamBySlug,
  getTeamRecords,
  teamDetailPath,
} from "../../../../lib/team-content-engine";
import { buildRouteSocialMetadata } from "../../../../lib/seo-social-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getTeamRecords().map((team) => ({ slug: team.locales.es.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const team = getTeamBySlug("es", slug);
  if (!team) return {};

  const canonical = teamDetailPath(team.key, "es");
  const alternate = alternateTeamPath(team.key, "es");

  return {
    title: team.detail.seoTitle,
    description: team.detail.seoDescription,
    alternates: {
      canonical,
      languages: {
        "es-ES": canonical,
        en: alternate,
        "x-default": canonical,
      },
    },
    ...buildRouteSocialMetadata({
      locale: "es",
      surface: "teams",
      title: team.detail.seoTitle,
      description: team.detail.seoDescription,
      canonical,
    }),
  };
}

export default async function SpanishTeamDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const team = getTeamBySlug("es", slug);
  if (!team) notFound();

  return <TeamDetailPage locale="es" teamKey={team.key} />;
}

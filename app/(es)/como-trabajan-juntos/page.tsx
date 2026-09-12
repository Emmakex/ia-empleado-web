import type { Metadata } from "next";
import { CollaborationPage } from "../../../components/collaboration-page";
import { collaborationDemoPath, getCollaborationPageContent } from "../../../lib/collaboration-demo";
import { getDictionary } from "../../../lib/i18n";

const dictionary = getDictionary("es");
const content = getCollaborationPageContent("es");
const canonical = collaborationDemoPath("es");
const alternate = collaborationDemoPath("en");

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

export default function SpanishCollaborationPage() {
  return <CollaborationPage locale="es" dictionary={dictionary} />;
}

import type { Metadata } from "next";
import { CollaborationPage } from "../../../../components/collaboration-page";
import { collaborationDemoPath, getCollaborationPageContent } from "../../../../lib/collaboration-demo";
import { getDictionary } from "../../../../lib/i18n";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";

const dictionary = getDictionary("en");
const content = getCollaborationPageContent("en");
const canonical = collaborationDemoPath("en");
const alternate = collaborationDemoPath("es");
const preview = brandPreviewUrl("en", "collaboration");

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

export default function EnglishCollaborationPage() {
  return <CollaborationPage locale="en" dictionary={dictionary} />;
}

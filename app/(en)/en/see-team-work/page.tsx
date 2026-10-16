import type { Metadata } from "next";
import { CollaborationPage } from "../../../../components/collaboration-page";
import { collaborationDemoPath, getCollaborationPageContent } from "../../../../lib/collaboration-demo";
import { getDictionary } from "../../../../lib/i18n";
import { brandPreviewUrl } from "../../../../lib/brand-social-previews";
import { getPhase5SeoPolicy } from "../../../../lib/conversion-seo-policy";

const dictionary = getDictionary("en");
const content = getCollaborationPageContent("en");
const policy = getPhase5SeoPolicy("collaboration");
const canonical = collaborationDemoPath("en");
const alternate = collaborationDemoPath("es");
const preview = brandPreviewUrl("en", "collaboration");
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

export default function EnglishCollaborationPage() {
  return <CollaborationPage locale="en" dictionary={dictionary} />;
}

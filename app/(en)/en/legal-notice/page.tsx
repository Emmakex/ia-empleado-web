import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../../components/legal-document-page";
import { getLegalDocumentContent, legalNoticePath } from "../../../../lib/legal-content";
import { getPhase5SeoPolicy } from "../../../../lib/conversion-seo-policy";

const content = getLegalDocumentContent("en", "legal-notice");
const policy = getPhase5SeoPolicy("legal-notice");
const canonical = legalNoticePath("en");
const alternate = legalNoticePath("es");

export const metadata: Metadata = {
  title: `${content.title} | IA Empleado`,
  description: content.description,
  alternates: {
    canonical,
    languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
  },
  robots: { index: policy.index, follow: policy.follow },
};

export default function EnglishLegalNoticePage() {
  return <LegalDocumentPage locale="en" kind="legal-notice" />;
}

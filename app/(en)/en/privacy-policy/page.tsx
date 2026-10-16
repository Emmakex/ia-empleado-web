import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../../components/legal-document-page";
import { getLegalDocumentContent, privacyPolicyPath } from "../../../../lib/legal-content";
import { getPhase5SeoPolicy } from "../../../../lib/conversion-seo-policy";

const content = getLegalDocumentContent("en", "privacy-policy");
const policy = getPhase5SeoPolicy("privacy-policy");
const canonical = privacyPolicyPath("en");
const alternate = privacyPolicyPath("es");

export const metadata: Metadata = {
  title: `${content.title} | IA Empleado`,
  description: content.description,
  alternates: {
    canonical,
    languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
  },
  robots: { index: policy.index, follow: policy.follow },
};

export default function EnglishPrivacyPolicyPage() {
  return <LegalDocumentPage locale="en" kind="privacy-policy" />;
}

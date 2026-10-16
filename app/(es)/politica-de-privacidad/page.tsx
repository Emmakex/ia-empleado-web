import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../components/legal-document-page";
import { getLegalDocumentContent, privacyPolicyPath } from "../../../lib/legal-content";
import { getPhase5SeoPolicy } from "../../../lib/conversion-seo-policy";

const content = getLegalDocumentContent("es", "privacy-policy");
const policy = getPhase5SeoPolicy("privacy-policy");
const canonical = privacyPolicyPath("es");
const alternate = privacyPolicyPath("en");

export const metadata: Metadata = {
  title: `${content.title} | IA Empleado`,
  description: content.description,
  alternates: {
    canonical,
    languages: { "es-ES": canonical, en: alternate, "x-default": canonical },
  },
  robots: { index: policy.index, follow: policy.follow },
};

export default function SpanishPrivacyPolicyPage() {
  return <LegalDocumentPage locale="es" kind="privacy-policy" />;
}

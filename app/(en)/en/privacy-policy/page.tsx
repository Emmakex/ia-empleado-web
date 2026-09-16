import type { Metadata } from "next";
import { LegalDocumentPage } from "../../../../components/legal-document-page";
import {
  getLegalDocumentContent,
  isLegalIdentityComplete,
  privacyPolicyPath,
} from "../../../../lib/legal-content";

const content = getLegalDocumentContent("en", "privacy-policy");
const canonical = privacyPolicyPath("en");
const alternate = privacyPolicyPath("es");
const ready = isLegalIdentityComplete();

export const metadata: Metadata = {
  title: `${content.title} | IA Empleado`,
  description: content.description,
  alternates: {
    canonical,
    languages: { "es-ES": alternate, en: canonical, "x-default": alternate },
  },
  robots: { index: ready, follow: true },
};

export default function EnglishPrivacyPolicyPage() {
  return <LegalDocumentPage locale="en" kind="privacy-policy" />;
}

import type { Locale } from "./i18n";

export const LEGAL_OWNER_NAME = "Eduardo Jose Yauri Luna";
export const LEGAL_OWNER_TAX_ID = "60281451S";
export const LEGAL_CONTACT_EMAIL = "info@iaempleado.com";
export const LEGAL_OWNER_ADDRESS = "Reina Amalia 8, 4 2, Barcelona, España";
export const LEGAL_LAST_UPDATED = "2026-09-16";

export type LegalDocumentKind = "legal-notice" | "privacy-policy";

type LegalSection = {
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
};

type LegalDocumentContent = {
  eyebrow: string;
  title: string;
  description: string;
  sections: readonly LegalSection[];
  draftLabel: string;
  draftBody: string;
};

export function legalNoticePath(locale: Locale): string {
  return locale === "es" ? "/aviso-legal" : "/en/legal-notice";
}

export function privacyPolicyPath(locale: Locale): string {
  return locale === "es" ? "/politica-de-privacidad" : "/en/privacy-policy";
}

export function isLegalIdentityComplete(): boolean {
  return Boolean(
    LEGAL_OWNER_NAME.trim()
      && LEGAL_OWNER_TAX_ID.trim()
      && LEGAL_CONTACT_EMAIL.trim()
      && LEGAL_OWNER_ADDRESS.trim(),
  );
}

const identityEs = [
  `Titular: ${LEGAL_OWNER_NAME}`,
  `NIF: ${LEGAL_OWNER_TAX_ID}`,
  `Domicilio: ${LEGAL_OWNER_ADDRESS}`,
  `Correo de contacto: ${LEGAL_CONTACT_EMAIL}`,
];

const identityEn = [
  `Website owner: ${LEGAL_OWNER_NAME}`,
  `Tax identification number: ${LEGAL_OWNER_TAX_ID}`,
  `Address: ${LEGAL_OWNER_ADDRESS}`,
  `Contact email: ${LEGAL_CONTACT_EMAIL}`,
];

const content: Record<Locale, Record<LegalDocumentKind, LegalDocumentContent>> = {
  es: {
    "legal-notice": {
      eyebrow: "INFORMACIÓN LEGAL",
      title: "Aviso legal",
      description: "Información sobre el titular de iaempleado.com, las condiciones de acceso al sitio y el marco básico de responsabilidad aplicable.",
      draftLabel: "Identidad legal incompleta",
      draftBody: "Este documento no debe publicarse como definitivo mientras falte alguno de los datos obligatorios del titular.",
      sections: [
        {
          title: "1. Titular del sitio",
          bullets: identityEs,
        },
        {
          title: "2. Objeto",
          paragraphs: [
            "Este sitio presenta IA Empleado, sus casos de uso, herramientas de exploración y vías de contacto comercial. La información publicada tiene carácter general y puede evolucionar a medida que cambien el producto, los servicios o las integraciones disponibles.",
          ],
        },
        {
          title: "3. Uso del sitio",
          paragraphs: [
            "La persona usuaria se compromete a utilizar el sitio de forma lícita, sin interferir con su funcionamiento, intentar acceder a áreas no autorizadas ni emplear sus contenidos para actividades contrarias a la normativa aplicable.",
          ],
        },
        {
          title: "4. Propiedad intelectual e industrial",
          paragraphs: [
            "Salvo indicación expresa, los textos, identidad visual, interfaces, ilustraciones, diseños y demás materiales propios de IA Empleado están protegidos por la normativa aplicable. Las marcas, logotipos o nombres de terceros pertenecen a sus respectivos titulares.",
          ],
        },
        {
          title: "5. Información comercial y resultados",
          paragraphs: [
            "Las demostraciones, estimaciones de ROI, ejemplos de procesos y comparativas tienen finalidad informativa y de evaluación. No constituyen una garantía de ahorro, rendimiento, disponibilidad, cumplimiento regulatorio o resultado económico concreto.",
          ],
        },
        {
          title: "6. Enlaces y servicios de terceros",
          paragraphs: [
            "El sitio puede mencionar herramientas, plataformas o servicios de terceros. Su disponibilidad, condiciones y políticas dependen de sus respectivos proveedores. La inclusión de una referencia no implica control sobre esos servicios.",
          ],
        },
        {
          title: "7. Legislación aplicable",
          paragraphs: [
            "El sitio se opera desde España y se rige por la normativa española que resulte aplicable, sin perjuicio de las normas imperativas de protección de consumidores, usuarios o datos personales que puedan corresponder en cada caso.",
          ],
        },
        {
          title: "8. Contacto",
          paragraphs: [
            `Para consultas relacionadas con este aviso o con el sitio web puedes escribir a ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
    "privacy-policy": {
      eyebrow: "PRIVACIDAD",
      title: "Política de privacidad",
      description: "Explica qué datos personales puede tratar IA Empleado a través de iaempleado.com y cómo ejercer tus derechos.",
      draftLabel: "Identidad del responsable incompleta",
      draftBody: "Esta política no debe publicarse como definitiva mientras falte alguno de los datos obligatorios del responsable.",
      sections: [
        {
          title: "1. Responsable del tratamiento",
          bullets: identityEs,
        },
        {
          title: "2. Datos que podemos tratar",
          bullets: [
            "Nombre y correo electrónico.",
            "Empresa, cuando la indiques voluntariamente.",
            "Contenido de la solicitud, proceso o necesidad que quieras evaluar.",
            "Contexto técnico mínimo asociado al envío, como origen de la solicitud y datos necesarios para seguridad, prevención de abuso o diagnóstico del servicio.",
          ],
        },
        {
          title: "3. Finalidades",
          bullets: [
            "Responder a solicitudes de demo, contacto o información.",
            "Preparar una conversación comercial o técnica relacionada con la petición realizada.",
            "Mantener la seguridad del sitio, prevenir abuso y diagnosticar incidencias del canal de contacto.",
          ],
          paragraphs: [
            "No utilizaremos los datos enviados mediante una solicitud de contacto para fines incompatibles con esa petición ni para comunicaciones comerciales no relacionadas sin la base jurídica correspondiente.",
          ],
        },
        {
          title: "4. Base jurídica",
          paragraphs: [
            "El tratamiento de una solicitud de contacto se basa en tu petición y, cuando corresponda, en tu consentimiento al utilizar el canal directo. Si la conversación deriva en medidas precontractuales solicitadas por ti, el tratamiento necesario podrá apoyarse también en esa relación precontractual. La seguridad técnica del sitio puede apoyarse en el interés legítimo de proteger el servicio frente a abuso y accesos no autorizados.",
          ],
        },
        {
          title: "5. Destinatarios y proveedores",
          paragraphs: [
            "Los datos podrán ser tratados por proveedores técnicos estrictamente necesarios para alojar el sitio, gestionar infraestructura o entregar comunicaciones. Cuando se active el envío directo por correo, Hostinger podrá intervenir como proveedor técnico del servicio SMTP configurado para IA Empleado.",
            "No vendemos los datos personales de las personas que contactan con IA Empleado. Si un proveedor implicara una transferencia internacional de datos, se aplicarán las garantías exigibles antes de utilizarlo para ese tratamiento.",
          ],
        },
        {
          title: "6. Conservación",
          paragraphs: [
            "Conservaremos los datos durante el tiempo necesario para responder y gestionar la solicitud y, posteriormente, durante los periodos que resulten necesarios para atender obligaciones legales o posibles responsabilidades. Si una solicitud no continúa, los datos no se conservarán indefinidamente con fines comerciales por defecto.",
          ],
        },
        {
          title: "7. Derechos",
          paragraphs: [
            `Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad cuando corresponda escribiendo a ${LEGAL_CONTACT_EMAIL}. También puedes retirar un consentimiento previamente otorgado sin afectar a la licitud del tratamiento anterior a su retirada.`,
            "Si consideras que el tratamiento no se ajusta a la normativa, puedes presentar una reclamación ante la Agencia Española de Protección de Datos.",
          ],
        },
        {
          title: "8. Cookies y medición",
          paragraphs: [
            "La configuración base del sitio no depende de rastreadores publicitarios o de marketing no esenciales para funcionar. Si en el futuro se introducen tecnologías no esenciales que requieran consentimiento, se actualizarán la información y los controles correspondientes antes de activarlas para el público.",
          ],
        },
        {
          title: "9. Seguridad y minimización",
          paragraphs: [
            "El formulario solicita únicamente la información necesaria para entender y responder a la petición. No debes incluir categorías especiales de datos personales, credenciales, contraseñas ni información confidencial que no sea necesaria para evaluar tu solicitud.",
          ],
        },
        {
          title: "10. Actualizaciones",
          paragraphs: [
            `Última actualización documental: ${LEGAL_LAST_UPDATED}. Esta política se revisará cuando cambien el canal de contacto, los proveedores relevantes o las finalidades del tratamiento.`,
          ],
        },
      ],
    },
  },
  en: {
    "legal-notice": {
      eyebrow: "LEGAL INFORMATION",
      title: "Legal notice",
      description: "Information about the owner of iaempleado.com, the conditions of access to the website and the basic responsibility framework that applies.",
      draftLabel: "Legal identity incomplete",
      draftBody: "This document must not be treated as final while any required owner detail is missing.",
      sections: [
        {
          title: "1. Website owner",
          bullets: identityEn,
        },
        {
          title: "2. Purpose of the website",
          paragraphs: [
            "This website presents IA Empleado, its use cases, exploration tools and commercial contact channels. Published information is general and may evolve as the product, services or available integrations change.",
          ],
        },
        {
          title: "3. Acceptable use",
          paragraphs: [
            "Users must use the website lawfully and must not interfere with its operation, attempt to access unauthorized areas or use its content for activities contrary to applicable law.",
          ],
        },
        {
          title: "4. Intellectual and industrial property",
          paragraphs: [
            "Unless stated otherwise, IA Empleado's own text, visual identity, interfaces, illustrations, designs and other original materials are protected by applicable law. Third-party trademarks, logos and names remain the property of their respective owners.",
          ],
        },
        {
          title: "5. Commercial information and results",
          paragraphs: [
            "Demos, ROI estimates, process examples and comparisons are provided for information and evaluation. They are not guarantees of savings, performance, availability, regulatory compliance or a specific financial outcome.",
          ],
        },
        {
          title: "6. Third-party links and services",
          paragraphs: [
            "The website may mention third-party tools, platforms or services. Their availability, terms and policies are controlled by their respective providers. A reference does not mean IA Empleado controls those services.",
          ],
        },
        {
          title: "7. Applicable law",
          paragraphs: [
            "The website is operated from Spain and is subject to applicable Spanish law, without prejudice to mandatory consumer, user or data-protection rules that may apply in a specific case.",
          ],
        },
        {
          title: "8. Contact",
          paragraphs: [
            `For questions about this notice or the website, contact ${LEGAL_CONTACT_EMAIL}.`,
          ],
        },
      ],
    },
    "privacy-policy": {
      eyebrow: "PRIVACY",
      title: "Privacy policy",
      description: "Explains which personal data IA Empleado may process through iaempleado.com and how to exercise your rights.",
      draftLabel: "Controller identity incomplete",
      draftBody: "This policy must not be treated as final while any required controller detail is missing.",
      sections: [
        {
          title: "1. Data controller",
          bullets: identityEn,
        },
        {
          title: "2. Data we may process",
          bullets: [
            "Name and email address.",
            "Company, when you provide it voluntarily.",
            "The content of the request, process or need you want to evaluate.",
            "Minimum technical context associated with the submission, such as request origin and data required for security, abuse prevention or service diagnostics.",
          ],
        },
        {
          title: "3. Purposes",
          bullets: [
            "Respond to demo, contact or information requests.",
            "Prepare a commercial or technical conversation related to the request you made.",
            "Protect the website, prevent abuse and diagnose issues affecting the contact channel.",
          ],
          paragraphs: [
            "We do not use information submitted through a contact request for incompatible purposes or unrelated marketing without an appropriate legal basis.",
          ],
        },
        {
          title: "4. Legal basis",
          paragraphs: [
            "Processing a contact request is based on your request and, where applicable, your consent when using the direct submission channel. If the conversation leads to pre-contractual steps requested by you, processing needed for those steps may also rely on that pre-contractual relationship. Technical website security may rely on the legitimate interest in protecting the service from abuse and unauthorized access.",
          ],
        },
        {
          title: "5. Recipients and providers",
          paragraphs: [
            "Personal data may be processed by technical providers strictly required to host the website, operate infrastructure or deliver communications. When direct email submission is enabled, Hostinger may act as the technical SMTP service provider configured for IA Empleado.",
            "We do not sell the personal data of people who contact IA Empleado. If a provider involves an international data transfer, the safeguards required by applicable law will be put in place before that provider is used for the relevant processing.",
          ],
        },
        {
          title: "6. Retention",
          paragraphs: [
            "We retain data for as long as needed to respond to and manage the request and, afterwards, for periods required to meet legal obligations or address potential liabilities. Requests that do not progress are not kept indefinitely for marketing by default.",
          ],
        },
        {
          title: "7. Your rights",
          paragraphs: [
            `You may request access, rectification, erasure, objection, restriction or portability where applicable by writing to ${LEGAL_CONTACT_EMAIL}. You may also withdraw consent previously given without affecting the lawfulness of processing carried out before withdrawal.`,
            "If you believe processing does not comply with applicable rules, you may lodge a complaint with the Spanish Data Protection Agency (AEPD).",
          ],
        },
        {
          title: "8. Cookies and measurement",
          paragraphs: [
            "The baseline website configuration does not depend on non-essential advertising or marketing trackers to operate. If non-essential technologies that require consent are introduced later, the relevant information and controls will be updated before they are enabled for the public.",
          ],
        },
        {
          title: "9. Security and data minimization",
          paragraphs: [
            "The form requests only the information needed to understand and answer the request. Do not include special categories of personal data, credentials, passwords or confidential information that is not needed to evaluate your request.",
          ],
        },
        {
          title: "10. Updates",
          paragraphs: [
            `Document last updated: ${LEGAL_LAST_UPDATED}. This policy will be reviewed when the contact channel, relevant providers or processing purposes change.`,
          ],
        },
      ],
    },
  },
};

export function getLegalDocumentContent(locale: Locale, kind: LegalDocumentKind): LegalDocumentContent {
  return content[locale][kind];
}

# Web Phase 2B — Reference Employee Deep Content

Status: implemented in code pending PR/CI/production verification.

## Scope

Phase 2B completes deep public content for the four Reference Employees used by the commercial website:

1. Customer Support AI Employee / Atención al Cliente IA
2. Administrative AI Employee / Administrativo IA
3. Accounting & Billing AI Employee / Contabilidad y Facturación IA
4. Sales / SDR AI Employee / Comercial SDR IA

The Customer Support profile was delivered in Phase 2A. Phase 2B adds the remaining three profiles while preserving the same content and SEO/GEO contract.

## Public content contract

Every reference profile includes, in both Spanish and English:

- direct definition;
- business tasks;
- end-to-end workflow;
- systems and integrations;
- collaboration with other AI Employees;
- human-control and authority boundaries;
- realistic use cases;
- relevant sectors;
- explicit limitations;
- FAQ;
- conversion CTA;
- localized metadata;
- canonical and hreflang pairing;
- Service and FAQPage structured data;
- sitemap inclusion.

## Truthfulness boundaries

The website must distinguish operational support from unrestricted authority. In particular:

- Administrative AI does not gain signature, legal-representation or payment authority by default.
- Accounting & Billing AI does not move money or perform regulated credit/risk/eligibility decisions by default.
- Sales / SDR AI does not receive unlimited outreach permissions or authority to invent prospect facts, negotiate commitments or alter commercial terms.
- Optional capabilities such as OCR, browser research, voice and external data access remain deployment-specific.

## Content-engine structure

`lib/employee-content-engine.ts` acts as the public content facade. It combines the Phase 2A base employee catalog with the additional deep Reference Employee content in `lib/reference-employee-details.ts`.

All public employee index/detail pages, metadata generation and sitemap generation resolve through the unified facade so all four Reference Employees behave consistently.

## Exit criteria

Phase 2B is complete when:

- all four reference employees have deep ES/EN pages;
- all eight localized detail routes build successfully;
- employee-index cards link to all four profiles;
- language switching keeps the equivalent deep page;
- sitemap lists all localized profiles;
- structured data matches visible page content;
- TypeScript and production build pass;
- Hostinger production deployment is verified.

## Next phase

Phase 2C should expand discovery and internal linking rather than immediately publishing all 22 profiles. Primary targets:

- filters by department, problem, sector and task;
- explicit related-employee links between profiles;
- scalable catalog-status model for Reference, upcoming and restricted/high-impact profiles;
- first broader catalog profiles only after the discovery/navigation layer is ready.

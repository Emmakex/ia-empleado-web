# IA Empleado Web

Commercial website for **IA Empleado** at `iaempleado.com`.

This repository is intentionally separate from [`Emmakex/ia-empleado`](https://github.com/Emmakex/ia-empleado).

## Repository responsibility

`ia-empleado-web` owns the public commercial website only: marketing/product education, SEO/GEO, EN/ES content, Employee/Team/sector/integration/comparison/use-case pages, interactive explainers, lead journeys, analytics/experimentation, public media, branding assets and Hostinger website delivery.

It does **not** own the private IA Empleado runtime, customer production orchestration, product API/workers, Reference Lab runtime, customer data, secrets, memory or operational state.

## Canonical documentation

- [`docs/COMMERCIAL_WEBSITE.md`](docs/COMMERCIAL_WEBSITE.md) — public product/SEO contract.
- [`docs/WEB_ECOSYSTEM_VISION.md`](docs/WEB_ECOSYSTEM_VISION.md) — Empleado IA → Equipo IA → Empresa aumentada strategy and web roadmap.
- [`docs/ENGINEERING_RULES.md`](docs/ENGINEERING_RULES.md) — website engineering contract.
- [`docs/I18N_AND_MARKET_LOCALIZATION.md`](docs/I18N_AND_MARKET_LOCALIZATION.md) — EN/ES localization and SEO contract.
- [`docs/ANALYTICS_AND_CONSENT.md`](docs/ANALYTICS_AND_CONSENT.md) — privacy-safe analytics baseline.
- [`docs/PRODUCT_CONTEXT.md`](docs/PRODUCT_CONTEXT.md) — product facts constraining public claims.
- [`branding/README.md`](branding/README.md) — approved Concept 1 branding workspace and release rules.
- [`branding/BRAND_SYSTEM.md`](branding/BRAND_SYSTEM.md) — visual identity, humanized AI Employee, color, motion and asset rules.
- [`branding/PHASE_1_VALIDATION.md`](branding/PHASE_1_VALIDATION.md) — production verification evidence for Branding Phase 1.
- [`branding/PHASE_2_ROLE_VISUAL_FAMILIES.md`](branding/PHASE_2_ROLE_VISUAL_FAMILIES.md) — Branding Phase 2A role-family contract and production-verification evidence.
- [`branding/PHASE_2B_TEAM_DEPARTMENT_COMPOSITIONS.md`](branding/PHASE_2B_TEAM_DEPARTMENT_COMPOSITIONS.md) — Branding Phase 2B Team/Department composition contract and production-verification evidence.
- [`branding/PHASE_2C_SECTOR_HERO_ART.md`](branding/PHASE_2C_SECTOR_HERO_ART.md) — Branding Phase 2C sector-art contract, four operating signatures and production-verification evidence.
- [`branding/PHASE_2D_CAMPAIGN_SOCIAL_VARIANTS.md`](branding/PHASE_2D_CAMPAIGN_SOCIAL_VARIANTS.md) — Branding Phase 2D reusable campaign/social generation contract and production-verification evidence.
- [`branding/SOCIAL_MEDIA_SYSTEM.md`](branding/SOCIAL_MEDIA_SYSTEM.md) — share, campaign, reusable frame and export rules.
- [`docs/PHASE_2C_CATALOG_DISCOVERY.md`](docs/PHASE_2C_CATALOG_DISCOVERY.md) — 22-profile catalog discovery contract.
- [`docs/PHASE_3_AI_TEAMS.md`](docs/PHASE_3_AI_TEAMS.md) — AI Teams model and handoff/control rules.
- [`docs/PHASE_4_INTERACTIVE_COLLABORATION.md`](docs/PHASE_4_INTERACTIVE_COLLABORATION.md) — collaboration simulator contract.
- [`docs/PHASE_4B_TEAM_BUILDER.md`](docs/PHASE_4B_TEAM_BUILDER.md) — deterministic Team Builder contract.
- [`docs/PHASE_5A_PROCESS_ANALYZER.md`](docs/PHASE_5A_PROCESS_ANALYZER.md) — before/after process analysis contract.
- [`docs/PHASE_5B_ROI_ESTIMATOR.md`](docs/PHASE_5B_ROI_ESTIMATOR.md) — transparent ROI/value methodology.
- [`docs/PHASE_6A_COMPARISONS.md`](docs/PHASE_6A_COMPARISONS.md) — comparison-page methodology, truthfulness and SEO/GEO contract.
- [`docs/PHASE_6B_SECTORS_USE_CASES.md`](docs/PHASE_6B_SECTORS_USE_CASES.md) — sector/use-case content model, truthfulness, SEO/GEO and release contract.
- [`docs/PHASE_6C_INTEGRATIONS_DEPARTMENTS.md`](docs/PHASE_6C_INTEGRATIONS_DEPARTMENTS.md) — department/integration graph, authority boundaries, SEO/GEO and release contract.
- [`docs/PHASE_7A_CONVERSION_HANDOFF.md`](docs/PHASE_7A_CONVERSION_HANDOFF.md) — bilingual high-intent conversion route, context and truthful email-transport contract with production-verification evidence.
- [`docs/PHASE_7B_CONTEXTUAL_RESULT_HANDOFF.md`](docs/PHASE_7B_CONTEXTUAL_RESULT_HANDOFF.md) — bounded Team Builder / Process Analyzer result-to-conversion handoff contract with production-verification evidence.
- [`docs/PHASE_7C_LEAD_INTAKE_PIPELINE.md`](docs/PHASE_7C_LEAD_INTAKE_PIPELINE.md) — server-side lead-intake foundation, privacy-gated activation contract and 7C1 production-verification evidence.

## Strategic narrative

```text
Empleado IA
→ Equipo IA
→ Empresa aumentada por IA
```

The commercial website explains how specialized AI Employees can collaborate with people and company systems under explicit permissions, policies, approvals and supervision boundaries.

Approved visual proposition:

```text
Personas. IA. Sistemas. Un mismo equipo.
People. AI. Systems. One team.
```

## Separation of concerns

```text
iaempleado.com
= marketing + SEO/GEO + education + interactive explanation + lead capture

Kairoseth Reference Lab
= governed demo execution + proof assets

Customer deployment
= private production runtime
```

None of these surfaces may become an accidental runtime dependency of another.

## Technology baseline

- Next.js App Router
- React
- TypeScript
- server/static-first rendering for SEO-critical meaning
- progressive client interaction where useful
- structured EN/ES content and parity validation
- vector-first reusable branding assets
- GitHub Actions CI
- Hostinger Node.js/Next.js deployment
- Node.js `>=20.9.0`; production uses Node.js 22.x

## Delivery workflow

```text
feature/fix/chore branch
→ pull request
→ minimum sufficient CI
→ merge
→ Hostinger deployment
→ production verification
```

Production verification is automated by `.github/workflows/production-verify.yml`: after successful `Web CI` on `main`, it waits until Hostinger serves the expected release marker and then runs Playwright directly against `https://iaempleado.com`.

## Current state

### Web Phase 0 — Foundation
Complete.

### Web Phase 1 — Core commercial shell
Complete and production-verified.

### Web Phase 2A — Employee content engine
Complete and production-verified.

### Web Phase 2B — Reference Employee deep content
Complete and production-verified.

### Web Phase 2C — Employee catalog discovery
Complete and production-verified. Includes all **22 opportunity profiles**, search/filters, sixteen catalog summaries, four deep profiles and two restricted/high-impact areas.

### Web Phase 3 — AI Teams
Complete and production-verified. Includes Sales, Ecommerce, Administration and Travel reference compositions.

### Web Phase 4A — Interactive collaboration
Complete and production-verified.

### Web Phase 4B — Team Builder
Complete and production-verified.

### Web Phase 5A — Process Analyzer
Complete and production-verified.

### Web Phase 5B — Transparent ROI / Value Estimator
Complete and production-verified. The calculator is an educational commercial estimator, not a verified customer outcome, financial guarantee or binding proposal.

### Web Phase 6A — Comparison surfaces
Complete and production-verified.

### Web Phase 6B — Sectors and use cases
Complete and production-verified.

### Web Phase 6C — Departments and integrations
Complete and production-verified. Includes six deep bilingual department pages and seven deep bilingual integration-category pages with explicit read/write authority, least-privilege, fallback and audit boundaries.

The integration pages are architecture and evaluation guidance. Actual connector availability depends on the provider, API, authentication model, data model, permissions and customer environment.

### Web Phase 7A — Conversion Handoff

**Complete and production-verified — 2026-09-13.**

Phase 7A provides one bilingual high-intent conversion destination at `/solicitar-demo` and `/en/request-demo`. Header and homepage conversion CTAs preserve bounded `intent`, `source` and public `context`, while Team Builder remains a separate educational tool.

The handoff is deliberately truthful: contact details stay in the browser and the primary action prepares a structured message to `hola@iaempleado.com` in the visitor's email application. The website does not claim that it stored a lead, created a CRM record or delivered an email, and no CRM/webhook/backend transport is implied.

PR #53 was validated by Web CI #132 (`34746767088`) and squash-merged to `main` as `c84768217190688394728b7a0f41d63e4691dcc8`. Web CI #133 (`34747014123`) passed on `main`; Hostinger served `web-phase-7a-conversion-handoff`; Production Verification #11 (`34747171187`) passed directly against `iaempleado.com`, including the bilingual conversion handoff, responsive/mobile behavior, sanitization contract, campaign media and existing geometry/accessibility regressions. Full evidence is recorded in [`docs/PHASE_7A_CONVERSION_HANDOFF.md`](docs/PHASE_7A_CONVERSION_HANDOFF.md).

### Web Phase 7B — Contextual Result Handoff

**Complete and production-verified — 2026-09-13.**

Phase 7B connects Team Builder and Process Analyzer results to the shared bilingual request-demo route instead of letting those interactive tools bypass it with their own raw `mailto:` actions. The handoff keeps the Phase 7A URL model unchanged: only `intent`, `source` and a normalized `context` of at most 160 characters are used.

Team Builder transfers only product-controlled catalog context: selected sector when present, closest reference team when present and up to three recommended role labels. Process Analyzer transfers only the predefined process pattern, up to two predefined friction labels and the count of individually marked steps. No personal data, free text, full interactive state, storage, CRM submission or runtime dependency is introduced.

PR #55 was validated by Web CI #136 (`34749517271`) and squash-merged to `main` as `e7724d7a219caa37a20827bbe49dc05002e5e3bf`. Web CI #137 (`34749674757`) passed on `main`; Hostinger served `web-phase-7b-contextual-result-handoff`; Production Verification #13 (`34749824213`) passed directly against `iaempleado.com`, including the contextual result handoff in ES/EN and mobile plus the existing conversion, campaign, geometry and accessibility regressions. Full evidence is recorded in [`docs/PHASE_7B_CONTEXTUAL_RESULT_HANDOFF.md`](docs/PHASE_7B_CONTEXTUAL_RESULT_HANDOFF.md).

### Web Phase 7C — Lead Intake & Commercial Pipeline

**7C1 Lead Intake Foundation complete and production-verified — 2026-09-13. Full Phase 7C remains in progress.**

7C1 adds a production-deployed `/api/lead-intake` capability and delivery boundary with strict server-side validation, explicit consent versioning, honeypot and baseline rate limiting, bounded authenticated webhook delivery, no-PII error logging and truthful email fallback. The public form progressively switches to direct submission only when production confirms that both a real receiving destination and a public privacy notice are configured.

Production intentionally remains in **email mode** after 7C1. No CRM, webhook provider or data-controller identity is invented. Direct mode is not considered active until 7C2 provides the real destination, correct public privacy notice, production secrets, one verified synthetic end-to-end lead and documented downstream retention/deletion/SDR ownership.

PR #59 was validated by Web CI #145 (`34754040517`) and squash-merged to `main` as `b8196a53986a0d4d71458c539dd2fb08cb593fa0`. Web CI #146 (`34754252946`) passed on `main`; Hostinger served `web-phase-7c1-lead-intake-foundation`; Production Verification #16 (`34754443126`) passed directly against `iaempleado.com`, including the lead-intake foundation plus the existing conversion, contextual result handoff, campaign, geometry, responsive and accessibility regressions. Full evidence and 7C2 blockers are recorded in [`docs/PHASE_7C_LEAD_INTAKE_PIPELINE.md`](docs/PHASE_7C_LEAD_INTAKE_PIPELINE.md).

**Next milestone: Web Phase 7C2 — Direct Intake Activation.**

### Branding Phase 1 — Core visual system

**Complete and production-verified — 2026-09-12.**

Delivered scope:

- master three-node collaboration mark;
- monochrome mark;
- approved humanized AI Employee character family: Clara, Alex, Sofía and Javier;
- orbit/background pattern and people + AI + systems visual language;
- portable design tokens and production brand CSS;
- header/footer and homepage identity application;
- canonical character application across Employee, Team, sector, use-case, comparison, department, integration and interactive surfaces;
- responsive/DPR-aware canonical portrait delivery;
- CSS/SVG-first motion with reduced-motion support;
- reusable social/preview resources and branding CI contracts;
- desktop/mobile geometry, reflow, accessibility and production browser verification.

Production evidence is recorded in [`branding/PHASE_1_VALIDATION.md`](branding/PHASE_1_VALIDATION.md).

### Branding Phase 2A — Role visual families

**Complete and production-verified — 2026-09-12.**

The four canonical Reference Employees now have a reusable functional visual grammar without changing their approved identities:

- Clara — conversation/context;
- Alex — operations/documents;
- Sofía — validation/ledger;
- Javier — pipeline/follow-up.

Phase 2A applies these families to all four deep bilingual Employee pages and protects the mapping with static CI, responsive canonical image delivery, browser geometry tests and a production Playwright gate. Evidence is recorded in [`branding/PHASE_2_ROLE_VISUAL_FAMILIES.md`](branding/PHASE_2_ROLE_VISUAL_FAMILIES.md).

### Branding Phase 2B — Team and Department compositions

**Complete and production-verified — 2026-09-12.**

Phase 2B introduces one shared collaboration composition for all four deep AI Team pages and all six deep Department pages. It reuses the Phase 2A character families and makes role handoffs, shared systems and human-control boundaries visible without changing the underlying content/authority model. Integration detail pages keep their system-centric visual scene because they solve a different communication problem.

Coverage protects all 20 bilingual desktop Team/Department routes and all 10 Spanish mobile routes. PR #47 merged as `e9af3bad026b6b4809bc8fa913152dd130317bda`; Web CI #113 passed on `main`; Hostinger served `branding-phase-2b-team-department-compositions`; Production Verification #5 (`34719659316`) passed directly against `iaempleado.com`. Formal documentation closure was merged in PR #48 and revalidated by Web CI #115 plus Production Verification #6. Full evidence is recorded in [`branding/PHASE_2B_TEAM_DEPARTMENT_COMPOSITIONS.md`](branding/PHASE_2B_TEAM_DEPARTMENT_COMPOSITIONS.md).

### Branding Phase 2C — Sector-specific hero art

**Complete and production-verified — 2026-09-13.**

Phase 2C gives the four actual deep sector families — **Ecommerce, Travel, Professional Services and B2B Sales** — distinct operating-context hero art through one reusable renderer. The content model does not currently contain a standalone Retail sector, so the branding layer does not invent one.

Each sector retains the approved canonical character family and Phase 2A motifs while adding a sector-specific operating signature: connected order, booking route, traceable case file or context-rich sales pipeline. Shared system context and human-control boundaries remain explicit. Deep use-case pages keep their process-centric visual grammar rather than being forced into a sector identity.

PR #49 was validated by Web CI #118 and squash-merged to `main` as `3962ba00e5a8a0e7300a08ce6ce4d28bd94e2375`. Web CI #119 (`34734517951`) passed on `main`; Hostinger served `branding-phase-2c-sector-hero-art`; Production Verification #7 (`34734671808`) passed directly against `iaempleado.com`. Formal documentation closure was merged in PR #50 and revalidated by Web CI #121 plus Production Verification #8. Full evidence is recorded in [`branding/PHASE_2C_SECTOR_HERO_ART.md`](branding/PHASE_2C_SECTOR_HERO_ART.md).

### Branding Phase 2D — Reusable campaign/social variants

**Complete and production-verified — 2026-09-13.**

Phase 2D preserves the production-verified `1200 × 630` Open Graph/share renderer and adds a separate reusable campaign-media route for ES/EN. The same registered semantic surfaces can render as landscape `1600 × 900`, square `1080 × 1080`, portrait `1080 × 1350` and story `1080 × 1920` without rebuilding each piece manually.

The system uses canonical characters only where semantically relevant, keeps ROI campaign media character-neutral, validates unknown formats/surfaces with 404, and protects the generator with static contracts plus browser dimension tests. The route runs on Node.js and uses Sharp only to rasterize the approved canonical WebP/SVG sources in memory for `ImageResponse` compatibility; normal website portrait delivery remains unchanged.

PR #51 was validated by Web CI #128 and squash-merged to `main` as `745d3d1f6371cdb8200afd7a7aa98cb8ff8cc702`. Web CI #129 (`34744316003`) passed on `main`; Hostinger served `branding-phase-2d-campaign-social-variants`; Production Verification #9 (`34744481711`) passed directly against `iaempleado.com`, including campaign media, geometry, role families, collaboration compositions, sector hero art, responsive UX and accessibility. Full evidence is recorded in [`branding/PHASE_2D_CAMPAIGN_SOCIAL_VARIANTS.md`](branding/PHASE_2D_CAMPAIGN_SOCIAL_VARIANTS.md).

## License

IA Empleado Web is **proprietary software and commercial content**. Public repository visibility does not make this project open source and does not grant permission to reuse, modify, redistribute, deploy or commercially exploit the original code, documentation, SEO content, branding, characters, artwork or other project materials.

Copyright (c) 2026 **Eduardo Jose Yauri Luna** — NIF 60281451S. All rights reserved.

See [LICENSE](LICENSE) for the complete terms and [NOTICE](NOTICE) for the repository notice. Third-party dependencies remain subject to their respective licences and terms.

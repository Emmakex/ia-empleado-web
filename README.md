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
- [`docs/PHASE_2C_CATALOG_DISCOVERY.md`](docs/PHASE_2C_CATALOG_DISCOVERY.md) — 22-profile catalog discovery contract.
- [`docs/PHASE_3_AI_TEAMS.md`](docs/PHASE_3_AI_TEAMS.md) — AI Teams model and handoff/control rules.
- [`docs/PHASE_4_INTERACTIVE_COLLABORATION.md`](docs/PHASE_4_INTERACTIVE_COLLABORATION.md) — collaboration simulator contract.
- [`docs/PHASE_4B_TEAM_BUILDER.md`](docs/PHASE_4B_TEAM_BUILDER.md) — deterministic Team Builder contract.
- [`docs/PHASE_5A_PROCESS_ANALYZER.md`](docs/PHASE_5A_PROCESS_ANALYZER.md) — before/after process analysis contract.
- [`docs/PHASE_5B_ROI_ESTIMATOR.md`](docs/PHASE_5B_ROI_ESTIMATOR.md) — transparent ROI/value methodology.
- [`docs/PHASE_6A_COMPARISONS.md`](docs/PHASE_6A_COMPARISONS.md) — comparison-page methodology, truthfulness and SEO/GEO contract.
- [`docs/PHASE_6B_SECTORS_USE_CASES.md`](docs/PHASE_6B_SECTORS_USE_CASES.md) — sector/use-case content model, truthfulness, SEO/GEO and release contract.
- [`docs/PHASE_6C_INTEGRATIONS_DEPARTMENTS.md`](docs/PHASE_6C_INTEGRATIONS_DEPARTMENTS.md) — department/integration graph, authority boundaries, SEO/GEO and release contract.

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

### Next — Branding Phase 2

Role-specific visual families and reusable compositions for Clara, Alex, Sofía and Javier, followed by richer team/department motion scenes, sector-specific hero art and campaign/social resources. Lead-capture/CTA expansion follows after the visual system is complete and stable.

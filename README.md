# IA Empleado Web

Commercial website for **IA Empleado** at `iaempleado.com`.

This repository is intentionally separate from [`Emmakex/ia-empleado`](https://github.com/Emmakex/ia-empleado).

## Repository responsibility

`ia-empleado-web` owns the public commercial website only: marketing/product education, SEO/GEO, EN/ES content, Employee/Team/sector/integration/comparison/use-case pages, interactive explainers, lead journeys, analytics/experimentation, public media and Hostinger website delivery.

It does **not** own the private IA Empleado runtime, customer production orchestration, product API/workers, Reference Lab runtime, customer data, secrets, memory or operational state.

## Canonical documentation

- [`docs/COMMERCIAL_WEBSITE.md`](docs/COMMERCIAL_WEBSITE.md) — public product/SEO contract.
- [`docs/WEB_ECOSYSTEM_VISION.md`](docs/WEB_ECOSYSTEM_VISION.md) — Empleado IA → Equipo IA → Empresa aumentada strategy and web roadmap.
- [`docs/ENGINEERING_RULES.md`](docs/ENGINEERING_RULES.md) — website engineering contract.
- [`docs/I18N_AND_MARKET_LOCALIZATION.md`](docs/I18N_AND_MARKET_LOCALIZATION.md) — EN/ES localization and SEO contract.
- [`docs/ANALYTICS_AND_CONSENT.md`](docs/ANALYTICS_AND_CONSENT.md) — privacy-safe analytics baseline.
- [`docs/PRODUCT_CONTEXT.md`](docs/PRODUCT_CONTEXT.md) — product facts constraining public claims.
- [`docs/PHASE_2C_CATALOG_DISCOVERY.md`](docs/PHASE_2C_CATALOG_DISCOVERY.md) — 22-profile catalog discovery contract.
- [`docs/PHASE_3_AI_TEAMS.md`](docs/PHASE_3_AI_TEAMS.md) — AI Teams model and handoff/control rules.
- [`docs/PHASE_4_INTERACTIVE_COLLABORATION.md`](docs/PHASE_4_INTERACTIVE_COLLABORATION.md) — collaboration simulator contract.
- [`docs/PHASE_4B_TEAM_BUILDER.md`](docs/PHASE_4B_TEAM_BUILDER.md) — deterministic Team Builder contract.
- [`docs/PHASE_5A_PROCESS_ANALYZER.md`](docs/PHASE_5A_PROCESS_ANALYZER.md) — before/after process analysis contract.
- [`docs/PHASE_5B_ROI_ESTIMATOR.md`](docs/PHASE_5B_ROI_ESTIMATOR.md) — transparent ROI/value methodology.
- [`docs/PHASE_6A_COMPARISONS.md`](docs/PHASE_6A_COMPARISONS.md) — comparison-page methodology, truthfulness and SEO/GEO contract.

## Strategic narrative

```text
Empleado IA
→ Equipo IA
→ Empresa aumentada por IA
```

The commercial website explains how specialized AI Employees can collaborate with people and company systems under explicit permissions, policies, approvals and supervision boundaries.

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

## Current state

### Web Phase 0 — Foundation

Complete.

### Web Phase 1 — Core commercial shell

Complete and production-verified. Includes bilingual homepage, white-first visual system, global navigation/footer, semantic SEO baseline, responsive/mobile navigation and CI gates.

### Web Phase 2A — Employee content engine

Complete and production-verified. Reusable structured Employee content, bilingual indexes, deep Reference Employee pages, metadata, structured data and sitemap integration are in place.

### Web Phase 2B — Reference Employee deep content

Complete and production-verified. Deep ES/EN profiles exist for Customer Support, Administrative, Accounting & Billing and Sales / SDR.

### Web Phase 2C — Employee catalog discovery

Complete and production-verified. Includes all **22 opportunity profiles**, search/filters, sixteen catalog summaries, four deep profiles and two restricted/high-impact areas.

### Web Phase 3 — AI Teams

Complete and production-verified. Includes Sales, Ecommerce, Administration and Travel team compositions with roles, handoffs, systems, controls, metrics, use cases and limitations.

### Web Phase 4A — Interactive collaboration

Complete and production-verified. Includes `/como-trabajan-juntos` and `/en/see-team-work` with three synthetic step-by-step scenarios and crawlable HTML equivalents.

### Web Phase 4B — Team Builder

Complete and production-verified. Includes deterministic recommendations over the 22-profile taxonomy, reference-team matching, restricted-area warnings and local-browser calculation.

### Web Phase 5A — Process Analyzer

Complete and production-verified. Includes bilingual before/after process analysis, bottleneck marking, `automated / assisted / human` responsibility classification and local-browser state.

### Web Phase 5B — Transparent ROI / Value Estimator

Complete and production-verified.

Includes:

- `/calculadora-roi` and `/en/roi-calculator`;
- editable monthly volume, manual minutes/unit and hourly cost;
- user-controlled base time-reduction assumption;
- conservative/base/high scenarios;
- potential hours freed and economic-capacity calculations;
- optional implementation/monthly solution costs;
- first-year ROI only when a valid cost denominator exists;
- explicit distinction between estimates and guaranteed savings;
- EUR/USD/GBP display without FX conversion;
- local browser calculation;
- visible methodology, formulas and synthetic example;
- structured data, canonical/hreflang, sitemap and dedicated CI contract.

The calculator is an educational commercial estimator, not a verified customer outcome, financial guarantee or binding proposal.

### Web Phase 6A — Comparison surfaces

Current development phase. Release completion requires feature merge, green `main` CI and Hostinger production verification.

Phase 6A introduces:

- `/comparativas` and `/en/comparisons`;
- five bilingual high-intent comparisons: chatbot, AI agent, RPA, traditional automation and AI copilot;
- direct short answers for answer engines;
- semantic dimension-by-dimension comparison tables;
- explicit guidance for when AI Employee fits better;
- explicit guidance for when the alternative fits better;
- combination patterns instead of false either/or positioning;
- methodology stating that category boundaries are not universal rules;
- generic AI-copilot framing rather than unsourced vendor-specific product claims;
- WebPage / CollectionPage, BreadcrumbList, ItemList and FAQPage structured data where applicable;
- canonical, hreflang, sitemap and footer discoverability;
- dedicated Comparison surfaces CI contract.

After Phase 6A production verification, the next growth block can expand sector/use-case clusters and proof media while preserving evidence and thin-page controls.

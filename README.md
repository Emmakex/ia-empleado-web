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
- [`docs/PHASE_6B_SECTORS_USE_CASES.md`](docs/PHASE_6B_SECTORS_USE_CASES.md) — sector/use-case content model, truthfulness, SEO/GEO and release contract.
- [`docs/PHASE_6C_INTEGRATIONS_DEPARTMENTS.md`](docs/PHASE_6C_INTEGRATIONS_DEPARTMENTS.md) — department/integration graph, authority boundaries, SEO/GEO and release contract.

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

Complete and production-verified. Includes bilingual ROI/value routes, editable user assumptions, conservative/base/high scenarios, optional solution costs, local calculation, visible methodology and dedicated CI validation.

The calculator is an educational commercial estimator, not a verified customer outcome, financial guarantee or binding proposal.

### Web Phase 6A — Comparison surfaces

Complete and production-verified.

Includes `/comparativas` and `/en/comparisons` plus five bilingual high-intent comparisons: chatbot, AI agent, RPA, traditional automation and generic AI copilot. Pages provide direct answers, semantic comparison tables, trade-offs, combination patterns, FAQ, structured data, canonical/hreflang and dedicated CI validation.

### Web Phase 6B — Sectors and use cases

Complete and production-verified.

Phase 6B includes:

- `/sectores` and `/en/sectors`;
- four deep bilingual sector pages: Ecommerce, Travel/Turismo, Professional Services/Servicios profesionales and Sales/Ventas;
- `/casos-de-uso` and `/en/use-cases`;
- six deep bilingual use-case pages: customer issue, invoice validation, sales follow-up, order exception, travel booking and administrative documentation;
- reusable sector/use-case content models instead of duplicated landing pages;
- sector pages linking operational problems to cases, Employees, reference AI Teams, systems, controls, metrics and a bounded implementation path;
- use-case pages exposing step-by-step `automated / assisted / human` responsibility classification;
- explicit authority, escalation and limitation language;
- internal links across sectors, use cases, Employees, Teams, Process Analyzer, ROI and comparisons;
- CollectionPage / ItemList, WebPage, BreadcrumbList, HowTo and visible FAQ structured data where appropriate;
- canonical, hreflang, sitemap and footer discoverability;
- responsive sector/use-case layouts;
- dedicated Sector/use-case CI contract.

The sector and use-case pages are educational reference designs. They do not imply universal connector availability, production readiness or measured customer outcomes.

### Web Phase 6C — Departments and integrations

Implementation and repository validation complete through **PR #26**. Hostinger production verification remains the final release gate.

Phase 6C includes:

- `/departamentos` and `/en/departments`;
- six deep bilingual department pages: Customer Support, Administration, Accounting & Billing, Sales, Ecommerce Operations and Travel & Reservations;
- `/integraciones` and `/en/integrations`;
- seven deep bilingual integration categories: CRM, ERP, Email, Calendar, Ecommerce platform, Ticketing / case management and Document management;
- department pages connecting responsibilities, deep Employee profiles, catalog roles, AI Teams, use cases, systems, controls, metrics and operating models;
- integration pages separating typical read scope from write operations that may be evaluated;
- least-privilege, reliable identity/resource matching, fallback and audit principles;
- explicit wording that integration categories do not imply universal or vendor-certified connectors;
- cross-links between departments, integrations, use cases, Employees and AI Teams;
- CollectionPage / ItemList, WebPage, BreadcrumbList and FAQPage structured data;
- canonical, hreflang, sitemap and footer discoverability;
- responsive organization-map layouts;
- dedicated Organization map CI contract.

The integration pages are architecture and evaluation guidance. Actual connector availability depends on the provider, API, authentication model, data model, permissions and customer environment.

After Phase 6C production verification, the highest-value remaining work shifts from taxonomy expansion to **proof and conversion**: real lead capture, attribution/analytics under consent, proof media and Reference Lab evidence, followed by technical/CRO hardening and selective content expansion.

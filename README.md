# IA Empleado Web

Commercial website for **IA Empleado** at `iaempleado.com`.

This repository is intentionally separate from [`Emmakex/ia-empleado`](https://github.com/Emmakex/ia-empleado).

## Repository responsibility

`ia-empleado-web` owns only the public commercial website:

- marketing and product education;
- SEO and GEO / AI-search answer-engine readiness;
- employee, team, department, sector, integration, comparison and use-case landing pages;
- EN/ES public content;
- interactive product explainers and workflow simulations;
- public videos/images/diagrams;
- lead capture, demo/contact journeys and attribution;
- analytics and experimentation for the public website;
- Hostinger deployment and website-specific CI/CD.

It does **not** own:

- the IA Empleado private runtime;
- AI Employee orchestration;
- customer production deployments;
- product API/worker implementation;
- Reference Lab runtime;
- customer data, secrets, memory or operational state.

## Canonical website documentation

- [`docs/COMMERCIAL_WEBSITE.md`](docs/COMMERCIAL_WEBSITE.md) — commercial website product/SEO contract migrated from `ia-empleado`.
- [`docs/WEB_ECOSYSTEM_VISION.md`](docs/WEB_ECOSYSTEM_VISION.md) — collaborative ecosystem vision: Empleado IA → Equipo IA → Empresa aumentada, interactive experiences, SEO/GEO content system and website roadmap.
- [`docs/ENGINEERING_RULES.md`](docs/ENGINEERING_RULES.md) — engineering contract adapted specifically to this commercial website.
- [`docs/I18N_AND_MARKET_LOCALIZATION.md`](docs/I18N_AND_MARKET_LOCALIZATION.md) — EN/ES web localization and SEO contract.
- [`docs/ANALYTICS_AND_CONSENT.md`](docs/ANALYTICS_AND_CONSENT.md) — privacy-safe analytics and consent baseline.
- [`docs/PRODUCT_CONTEXT.md`](docs/PRODUCT_CONTEXT.md) — product facts and source documents that constrain public claims.
- [`docs/PHASE_2C_CATALOG_DISCOVERY.md`](docs/PHASE_2C_CATALOG_DISCOVERY.md) — 22-profile catalog discovery, filtering, relationship and restricted-profile contract.
- [`docs/PHASE_3_AI_TEAMS.md`](docs/PHASE_3_AI_TEAMS.md) — first-class AI Team model, four initial compositions, SEO/GEO routes, handoff/control rules and validation contract.
- [`docs/PHASE_4_INTERACTIVE_COLLABORATION.md`](docs/PHASE_4_INTERACTIVE_COLLABORATION.md) — interactive collaboration simulator, synthetic scenarios, SEO/GEO fallback content, accessibility and validation contract.
- [`docs/PHASE_4B_TEAM_BUILDER.md`](docs/PHASE_4B_TEAM_BUILDER.md) — deterministic Team Builder, restricted-area handling, local-processing privacy boundary and release contract.

## Strategic narrative

The website does not present AI Employees as isolated assistants. The public product story progresses through:

```text
Empleado IA
→ Equipo IA
→ Empresa aumentada por IA
```

The commercial experience should make visitors understand and see how specialized AI Employees can collaborate with each other, people and company systems to resolve end-to-end business processes under explicit policy and supervision boundaries.

## Separation of concerns

```text
iaempleado.com
= marketing + SEO/GEO + education + interactive explanation + lead capture

Kairoseth Reference Lab
= real governed demo execution + proof assets

Customer deployment
= private production runtime
```

None of these surfaces may become an accidental runtime dependency of another.

## Technology baseline

The commercial site uses:

- Next.js App Router;
- React;
- TypeScript;
- server/static-first rendering for SEO-critical content;
- progressive client-side interaction only where it materially improves explanation or conversion;
- structured EN/ES content with automated parity validation;
- GitHub Actions validation;
- Hostinger Node.js/Next.js deployment.

Current package contract requires Node.js `>=20.9.0`; production is configured on Hostinger with Node.js 22.x.

## Delivery workflow

All functional website changes follow:

```text
feature/fix/chore branch
→ pull request
→ minimum sufficient CI
→ merge
→ Hostinger deployment
→ production verification
```

Direct-to-`main` functional delivery is not the normal workflow.

## Current state

### Web Phase 0 — Foundation

Complete. Hostinger/Next.js, engineering rules, EN/ES architecture, SEO/GEO information architecture, design-system foundation, privacy-safe analytics/consent baseline and CI are in place.

### Web Phase 1 — Core commercial shell

Complete and production-verified.

Includes:

- global navigation and footer;
- bilingual Spanish `/` and English `/en` homepage;
- white-first visual system;
- lightweight collaborative ecosystem animation using HTML/SVG/CSS;
- Empleado IA → Equipo IA → Empresa aumentada narrative;
- collaborative workflow explanation;
- before/after process comparison;
- integrations and private-control narrative;
- localized metadata, canonical and hreflang;
- sitemap and robots baseline;
- visible FAQ plus matching structured data;
- responsive, keyboard-focus and reduced-motion behavior;
- accessible mobile/tablet navigation with a dedicated CI regression gate;
- automated EN/ES content-parity, TypeScript and production-build gates.

### Web Phase 2A — Employee content engine

Complete and production-verified.

Includes reusable structured Employee content, bilingual indexes, deep Reference Employee pages, SEO/GEO content structure, structured data and sitemap integration.

### Web Phase 2B — Reference Employee deep content

Complete and production-verified on `iaempleado.com`.

Deep ES/EN profiles exist for Customer Support, Administrative, Accounting & Billing and Sales / SDR, each with tasks, workflow, integrations, collaboration, control boundaries, use cases, sectors, limitations, FAQ and conversion CTA.

### Web Phase 2C — Employee catalog discovery

Complete and production-verified.

Includes all **22 opportunity profiles**, search and filters, four deep Reference Employee links, sixteen catalog-opportunity summaries, two restricted/high-impact areas, related-role ecosystem blocks, responsive ES/EN discovery and a dedicated CI contract.

### Web Phase 3 — AI Teams

Complete and production-verified.

Includes `/equipos-ia/` and `/en/ai-teams/` plus four bilingual reference compositions: Sales, Ecommerce, Administration and Travel. Each team explains participating roles, handoffs, systems, human-control boundaries, metrics, use cases, limitations and FAQ.

### Web Phase 4A — Interactive collaboration

Complete and production-verified.

Includes:

- `/como-trabajan-juntos` and `/en/see-team-work`;
- three bilingual synthetic business scenarios;
- scenario selection and step-by-step inspection;
- play, pause, previous, next and reset controls;
- visible handoffs between events, AI Employees, systems, people and results;
- explicit human-control points;
- crawlable HTML equivalents for SEO/GEO;
- WebPage, ItemList and FAQPage structured data;
- canonical, hreflang and sitemap coverage;
- global `Cómo funciona / How it works` navigation;
- dedicated Interactive collaboration CI contract.

The public simulator is educational only: it uses synthetic data and does not connect to customer production systems.

### Web Phase 4B — Team Builder

Implementation and repository validation complete through **PR #16**. Hostinger production verification remains the final release gate.

Phase 4B includes:

- `/disena-tu-equipo-ia` and `/en/design-your-ai-team`;
- deterministic recommendations using the canonical 22-profile Employee taxonomy;
- sector, business-problem, department and system context inputs;
- four quick presets based on the existing Sales, Ecommerce, Administration and Travel reference teams;
- up to six recommended roles with visible reasons for each recommendation;
- closest reference-team match when overlap is sufficient;
- natural handoff suggestions derived from the catalog relationship graph;
- explicit restricted/high-impact warnings instead of self-service recommendations;
- local browser calculation with no configuration POST in this phase;
- a user-controlled email handoff containing the selected context and suggested composition;
- canonical, hreflang, sitemap and WebPage / ItemList / FAQPage structured data;
- a dedicated Team Builder CI contract.

After Phase 4B production verification, the next web phases can expand conversion and evidence: richer process analysis, ROI modeling, comparison surfaces, sector/use-case clusters, videos and proof assets.

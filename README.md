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

Includes:

- reusable structured Employee content engine;
- `/empleados-ia/` and `/en/ai-employees/` indexes;
- first deep bilingual Reference Employee profile;
- server-rendered SEO/GEO content structure;
- canonical, hreflang, Service and FAQPage structured data;
- sitemap integration.

### Web Phase 2B — Reference Employee deep content

Complete and production-verified on `iaempleado.com`.

Deep ES/EN profiles now exist for:

1. Customer Support / Atención al Cliente;
2. Administrative / Administrativo;
3. Accounting & Billing / Contabilidad y Facturación;
4. Sales / SDR / Comercial SDR.

Each profile includes definition, tasks, workflow, integrations, collaboration, human-control boundaries, use cases, sectors, limitations, FAQ and conversion CTA.

### Web Phase 2C — Employee catalog discovery

Complete and production-verified.

Includes:

- all **22 opportunity profiles** discoverable from the canonical catalog index;
- plain-language search;
- filters by department, sector, business problem and task;
- four deep Reference Employee links;
- sixteen catalog-opportunity summaries without thin standalone SEO pages;
- two restricted/high-impact areas clearly gated: Recruitment Selection and Financial Decisions;
- related-role ecosystem blocks on every deep Reference Employee page;
- responsive catalog/discovery UI in ES and EN;
- ItemList structured data aligned with the visible 22-profile catalog;
- dedicated CI contract for profile count, taxonomy, restricted status, filter presence, EN/ES parity, TypeScript and production build.

### Web Phase 3 — AI Teams

Implementation in progress on the dedicated feature branch.

Phase 3 introduces `/equipos-ia/` and `/en/ai-teams/` as first-class SEO/GEO surfaces and publishes four reference team compositions:

1. Sales / Ventas;
2. Ecommerce;
3. Administration / Administración;
4. Travel / Turismo.

Each team model is designed to explain:

- the process-level problem;
- participating AI Employees and responsibilities;
- explicit handoffs between roles;
- systems and integrations;
- human approval and authority boundaries;
- measurable process indicators;
- realistic use cases and limitations;
- FAQ and customer-specific design CTA.

Team pages are reference commercial models, not claims that every composition or connector is available as an off-the-shelf deployment.

After Phase 3 production verification, the next major experience is **Web Phase 4 — Interactive collaboration**, beginning with `Ver cómo trabajan juntos / See the team work`, followed by the guided Team Builder.

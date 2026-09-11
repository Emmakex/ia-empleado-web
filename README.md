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
- [`docs/PRODUCT_CONTEXT.md`](docs/PRODUCT_CONTEXT.md) — product facts and source documents that constrain public claims.

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

The repository has completed its technical bootstrap:

- valid Next.js application baseline;
- TypeScript configuration;
- production build/start scripts;
- GitHub Actions typecheck + build validation;
- Hostinger deployment configuration;
- canonical commercial, engineering, localization and ecosystem documentation.

The next implementation stage is **Web Phase 1 — Core commercial shell** as defined in `docs/WEB_ECOSYSTEM_VISION.md`.

# IA Empleado Web

Commercial website for **IA Empleado** at `iaempleado.com`.

This repository is intentionally separate from [`Emmakex/ia-empleado`](https://github.com/Emmakex/ia-empleado).

## Repository responsibility

`ia-empleado-web` owns only the public commercial website:

- marketing and product education;
- SEO and AI-search/answer-engine readiness;
- employee, sector, integration and use-case landing pages;
- EN/ES public content;
- interactive product explainers;
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
- [`docs/ENGINEERING_RULES.md`](docs/ENGINEERING_RULES.md) — engineering contract adapted specifically to this commercial website.
- [`docs/I18N_AND_MARKET_LOCALIZATION.md`](docs/I18N_AND_MARKET_LOCALIZATION.md) — EN/ES web localization and SEO contract.
- [`docs/PRODUCT_CONTEXT.md`](docs/PRODUCT_CONTEXT.md) — product facts and source documents that constrain public claims.

## Separation of concerns

```text
iaempleado.com
= marketing + SEO + education + lead capture

Kairoseth Reference Lab
= real governed demo execution + proof assets

Customer deployment
= private production runtime
```

None of these surfaces may become an accidental runtime dependency of another.

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

## Current bootstrap

The repository currently contains a minimal static `index.html` so Hostinger can recognize and serve the project while the production web stack is introduced through reviewed changes.

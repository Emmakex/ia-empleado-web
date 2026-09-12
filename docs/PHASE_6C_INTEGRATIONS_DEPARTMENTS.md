# Web Phase 6C — Integrations + Departments

## Goal

Extend the IA Empleado commercial graph from sector/use-case pages into two organization-level dimensions:

```text
sector
→ use case
→ department
→ AI Employee / AI Team
→ integration
```

The purpose is to make the site useful for buyers who think in either organizational responsibilities (departments) or existing software (systems), without creating thin SEO landing pages or implying universal connector availability.

## Department surfaces

Phase 6C publishes six bilingual department models:

1. Customer Support / Atención al cliente
2. Administration / Administración
3. Accounting & Billing / Contabilidad y facturación
4. Sales / Ventas
5. Ecommerce Operations / Operaciones ecommerce
6. Travel & Reservations / Turismo y reservas

Each page exposes:

- explicit department responsibilities;
- deep AI Employee profiles where available;
- additional catalog roles clearly marked as requiring adaptation;
- related AI Teams;
- related use cases;
- integrations to evaluate;
- operating model;
- human-control boundaries;
- possible metrics, explicitly not guaranteed outcomes;
- FAQ and conversion paths.

## Integration surfaces

Phase 6C publishes seven bilingual integration categories:

1. CRM
2. ERP
3. Email
4. Calendar
5. Ecommerce platform
6. Ticketing / case management
7. Document management

These are **system categories**, not vendor-certified connectors.

Every integration page must distinguish:

- what the integration is for;
- typical read scope;
- write operations that may be evaluated;
- related departments and use cases;
- AI Employees and AI Teams that could use it;
- least-privilege and identity controls;
- implementation checklist;
- limits and fallback behavior;
- FAQ.

## Truthfulness contract

A system appearing on a page does not mean IA Empleado has a universal plug-and-play connector for every vendor.

Public content must preserve these rules:

- integration availability depends on the actual provider, API, authentication model, data model and customer environment;
- read, draft/propose, write and sensitive actions are separate authorities;
- browser/client/model output never grants permissions;
- authoritative business data remains in approved systems;
- uncertain identity or resource matching must not lead to consequential mutation;
- financial, contractual or regulated authority remains separately governed;
- fallback behavior must be explicit when systems are unavailable or contradictory;
- examples and metrics are educational, not verified customer outcomes.

## SEO / GEO contract

All department and integration surfaces are server-rendered semantic HTML and include:

- unique localized metadata;
- canonical and hreflang pairs;
- crawlable internal links;
- CollectionPage + ItemList on indexes;
- WebPage + BreadcrumbList + FAQPage on detail pages;
- sitemap coverage;
- footer discoverability;
- no critical meaning hidden behind client-only interaction.

## Responsive and accessibility

- content remains understandable on narrow screens;
- cards collapse to one column where necessary;
- no horizontal dependency for critical content;
- existing global mobile navigation remains unchanged;
- headings, lists, links and FAQ use semantic HTML.

## CI gate

`scripts/check-organization-map.mjs` verifies:

- six canonical departments;
- seven canonical integration categories;
- localized index paths;
- department links to employees, use cases and integrations;
- integration links to departments, employees and use cases;
- explicit read/write authority separation;
- anti-universal-connector wording;
- sitemap coverage;
- footer discoverability;
- locale CSS coverage.

Phase 6C is complete only after feature PR CI, merge, green `main` CI and Hostinger production verification.

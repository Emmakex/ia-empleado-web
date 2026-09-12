# Web Phase 6B — Sectors and Use Cases

## Purpose

Phase 6B expands the IA Empleado commercial website with industry and operational-intent content that reuses the product model already present in the site.

The goal is **not** to generate thin SEO landing pages. Every indexable sector or use-case page must connect a concrete operational intent to processes, AI Employees, reference AI Teams, systems, controls, metrics and realistic limits.

## Public routes

### Sectors

Spanish:

- `/sectores`
- `/sectores/ecommerce`
- `/sectores/turismo`
- `/sectores/servicios-profesionales`
- `/sectores/ventas`

English:

- `/en/sectors`
- `/en/sectors/ecommerce`
- `/en/sectors/travel`
- `/en/sectors/professional-services`
- `/en/sectors/sales`

### Use cases

Spanish:

- `/casos-de-uso`
- `/casos-de-uso/incidencia-cliente`
- `/casos-de-uso/validacion-facturas`
- `/casos-de-uso/seguimiento-comercial`
- `/casos-de-uso/incidencias-pedidos`
- `/casos-de-uso/reservas-viajes`
- `/casos-de-uso/documentacion-administrativa`

English:

- `/en/use-cases`
- `/en/use-cases/customer-issue`
- `/en/use-cases/invoice-validation`
- `/en/use-cases/sales-follow-up`
- `/en/use-cases/order-exception`
- `/en/use-cases/travel-booking`
- `/en/use-cases/administrative-documentation`

## Content contract

Each sector page must expose:

- the operational problems that make the sector relevant;
- related deep use cases;
- the roles that can participate;
- reference AI Teams where one exists;
- systems that would need evaluation;
- explicit human-control boundaries;
- metrics that can be measured against a real baseline;
- an implementation path that begins with one bounded workflow;
- FAQ and realistic claims.

Each use-case page must expose:

- a direct answer suitable for search and answer engines;
- the operational problem;
- a step-by-step workflow;
- explicit `automated`, `assisted` and `human` responsibility classification;
- participating roles and reference teams;
- systems to evaluate;
- escalation and approval points;
- related industries;
- metrics and limitations;
- FAQ and conversion links into the Process Analyzer / ROI estimator.

## Truthfulness rules

1. Sector pages do not imply that a connector exists merely because a system category is listed.
2. Use-case patterns are educational reference designs, not production-ready deployments.
3. `Automatable` means the step is a candidate for bounded automation when data, integration, permission and policy support it. It does not mean autonomous by default.
4. Financial, contractual, regulated or otherwise consequential authority remains separately configured.
5. Examples do not become measured customer outcomes.
6. AI does not invent availability, order state, invoice data, policy or prospect facts when an authoritative source does not confirm them.
7. Professional-services pages distinguish operational support from professional, legal or regulated judgment.

## SEO / GEO contract

Critical meaning is rendered as semantic server-side/static HTML. JavaScript is not required to understand the sector or use-case content.

Every deep page includes:

- unique localized title and description;
- canonical and EN/ES hreflang;
- internal links to relevant Employees, Teams, sectors and use cases;
- crawlable control and limitation language;
- structured data appropriate to the visible page;
- sitemap coverage.

The sector and use-case indexes use `CollectionPage` + `ItemList`. Deep sector pages use `WebPage`, `BreadcrumbList` and visible FAQ structured data. Deep use-case pages use `WebPage`, `HowTo` and visible FAQ structured data.

## Release gates

Phase 6B is repository-complete only when:

- four bilingual sector records exist;
- six bilingual deep use-case records exist;
- all ES/EN index/detail routes are present;
- sector/use-case internal links resolve at build time;
- sitemap contains indexes and deep routes;
- the global footer exposes both clusters;
- `check-sector-use-cases.mjs` passes;
- all previous website contracts remain green;
- TypeScript passes;
- Next.js production build passes.

Production completion additionally requires Hostinger verification on desktop and mobile.

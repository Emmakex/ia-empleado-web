# Web Phase 3 — AI Teams / Equipos IA

## Status

Implementation target for `iaempleado.com` after the Employee catalog foundation.

Phase 3 introduces **Equipo IA** as a first-class commercial and SEO/GEO object. It does not claim that every composition is an off-the-shelf production package. Team pages are reference models that explain how specialized AI Employees can coordinate an end-to-end process under customer-specific integrations, permissions and human controls.

## Product narrative

```text
Empleado IA
→ Equipo IA
→ Empresa aumentada por IA
```

An **Empleado IA** owns a defined job. An **Equipo IA** coordinates several specialized roles around a business process or outcome.

The website must make the difference explicit:

- employees keep separate roles, tools and authority;
- handoffs transfer a task plus minimum authorized context;
- company systems remain authoritative where required;
- consequential actions can stop for human approval;
- team composition is adapted per customer;
- reporting should measure the process, not invent ROI or automation percentages.

## Initial public team models

### Equipo Ventas / Sales AI Team

Reference composition:

```text
Marketing Operations
+ Sales / SDR
+ Email Manager
+ Reporting
```

Focus: commercial signals, research, follow-up, CRM hygiene, reply routing, meeting preparation and operating visibility.

### Equipo Ecommerce / Ecommerce AI Team

Reference composition:

```text
Customer Support
+ Order Management
+ Ecommerce Operations
+ Accounting & Billing
+ Reporting
```

Focus: customer/order incidents, fulfilment handoffs, billing discrepancies, post-purchase communication and repeated-cause visibility.

### Equipo Administración / Administration AI Team

Reference composition:

```text
Email Manager
+ Administrative
+ Documentation
+ Accounting & Billing
```

Focus: inbox-driven back office, document collection, record updates, administrative validation and billing coordination.

### Equipo Turismo / Travel AI Team

Reference composition:

```text
Travel Agent
+ Reservations
+ Customer Support
+ Administrative
+ Accounting & Billing
```

Focus: inquiry, availability, proposal, booking, traveler data, documentation, billing and support/change coordination.

## Public routes

Spanish:

```text
/equipos-ia/
/equipos-ia/ventas/
/equipos-ia/ecommerce/
/equipos-ia/administracion/
/equipos-ia/turismo/
```

English:

```text
/en/ai-teams/
/en/ai-teams/sales/
/en/ai-teams/ecommerce/
/en/ai-teams/administration/
/en/ai-teams/travel/
```

All indexable routes require:

- equivalent ES/EN content;
- canonical and hreflang;
- sitemap coverage;
- server-rendered critical copy;
- truthful structured data;
- visible limitations and approval boundaries;
- responsive and accessible behavior.

## Team page content contract

Each team page contains:

1. direct definition and business outcome;
2. problem the team coordinates;
3. participating roles and responsibilities;
4. explicit handoff workflow;
5. systems/integrations that may participate;
6. human-control points;
7. measurable process indicators;
8. realistic use cases;
9. explicit limitations;
10. FAQ;
11. CTA to design a customer-specific team.

Deep Employee links are used only where a validated deep Employee page already exists. Catalog-only roles remain clearly described as opportunities that require customer adaptation.

## SEO/GEO model

Team pages target process-level intent rather than duplicating Employee pages.

Examples:

- equipo IA para ventas;
- agentes IA para ecommerce;
- automatizar administración con IA;
- IA para agencias de viajes y reservas;
- AI sales team;
- ecommerce AI agents working together;
- AI back-office team;
- AI team for travel reservations.

Content should be easy for both search engines and answer engines to parse through explicit definitions, member lists, workflows, systems, controls, limits and FAQs.

## Structured data

Baseline:

- `CollectionPage` + `ItemList` on the team index;
- `WebPage` on a team detail;
- `ItemList` for visible team members;
- `FAQPage` matching visible questions and answers.

Do not use structured data to imply a product availability, price, review or performance claim that is not visible and verified.

## Validation contract

CI must verify at least:

- four required team keys;
- ES/EN localized slugs;
- index and detail routes;
- explicit reference-model status language;
- human-control and limitation copy;
- sitemap inclusion;
- global navigation to the team index;
- stylesheet loading in both locale layouts;
- EN/ES parity;
- TypeScript;
- production build.

## Phase completion

Phase 3 repository implementation is complete when all four team models, their index, SEO/GEO routes, internal links and CI contract pass on `main`.

Production completion additionally requires Hostinger verification of the team index and at least one deep route in each locale.

The next major experience after Phase 3 is the interactive collaboration layer: **See the team work / Ver cómo trabajan juntos**, followed by the guided Team Builder.

# IA Empleado — Phase 3 organizational and problem-cluster audit

**Status:** active  
**Started:** 2026-10-16  
**Scope:** sector hub + 4 sectors, use-case hub + 6 use cases, department hub + 6 departments, integration hub + 7 integrations  
**Total conceptual surfaces:** **27**  
**Canonical rules:** `SEO_GEO_CONTENT_OWNERSHIP.md` + `SEO_GEO_FULL_OPTIMIZATION_ROADMAP.md`

## Goal

Phase 3 validates that every sector, use-case, department and integration page owns a materially distinct evaluation/search job. A page is not kept merely because a template exists. Each surface must finish with a deliberate KEEP / EXPAND / REPOSITION / MERGE / NOINDEX decision, independent ES/EN rationale, a useful GEO direct answer and clear boundaries against role, Growth and conversion owners.

## Progress

- Total Phase 3 conceptual surfaces: **27**.
- Batch 01 — Integrations: **8** surfaces (hub + 7 details).
- Audited after Batch 01: **8 / 27**.
- Remaining after Batch 01: **19**.

## Batch 01 — integrations

### Hub

`/integraciones` and `/en/integrations` remain **KEEP** as system-category discovery hubs. They do **not** take the broad `integración de IA` / `enterprise AI integration` implementation query, because that job already belongs to the historical Growth owner audited in Phase 2.

Semrush evidence on 2026-10-16:

- ES `integración de ia`: 30 searches/month; `integracion ia`: 20/month;
- UK `ai integration`: 260/month, KD 69; `ai integrations`: 50/month; `ai agent integrations`: 10/month.

The hub therefore remains a navigational/category owner around `integraciones para Empleados IA` / `AI agent integrations`, while the Growth enterprise-integration landing owns the broader implementation/evaluation category.

### Detail decisions

| Integration | Decision | Primary ES query | Primary EN query | Search evidence |
| --- | --- | --- | --- | --- |
| CRM | REPOSITION | `integración crm` | `crm integration` | ES 70/month KD 22; UK 880/month KD 37 |
| ERP | REPOSITION | `integración erp` | `erp integration` | ES 50/month accented + 390/month unaccented; UK 590/month KD 33 |
| Email | REPOSITION | `integración email` | `email integration` | ES 50/month accented + 70/month unaccented; UK 50/month KD 24 |
| Calendar | REPOSITION | `integración calendario` | `calendar integration` | ES 10/month accented + 20/month unaccented; UK 390/month KD 29 |
| Ecommerce | REPOSITION | `integración ecommerce` | `ecommerce integration` | ES 30/month KD 12; UK 260/month KD 29 |
| Ticketing | REPOSITION | `integración ticketing` | `ticketing integration` | ES 20/month; UK 110/month KD 23 |
| Document management | REPOSITION | `integración gestión documental` | `document management integration` | ES 20/month plus `gestión documental ia` 30/month; UK 50/month plus `ai document management` 90/month |

### Ownership boundary

Every detail page now explicitly owns **system access and integration**:

- authoritative data sources;
- object/resource matching;
- read/write separation;
- least-privilege permissions;
- validation and idempotency where relevant;
- fallback and audit;
- sensitive-action approval.

It does not own the process-automation category simply because the same system appears in that workflow.

The clearest splits are:

- `/integraciones/crm` ↔ `/automatizacion-crm-ia`;
- `/integraciones/erp` ↔ `/automatizacion-erp-ia`;
- `/integraciones/correo-email` ↔ `/automatizacion-email-empresarial-ia`;
- `/integraciones/ecommerce` ↔ `/automatizacion-ecommerce-ia`.

For Calendar, Ticketing and Document Management there is no competing one-to-one Growth process owner. Their integration pages still remain constrained to system-access intent rather than becoming generic automation pages.

## Implementation contract

Batch 01 introduces `lib/integration-seo-intents.ts` as the researched Phase 3 ownership registry. It records per integration:

- decision;
- primary ES/EN query;
- supporting vocabulary;
- Semrush research basis;
- optimized title and description;
- extractable H1/direct-answer copy;
- optional related process owner.

The ES and EN dynamic integration routes apply this registry before rendering metadata and page content. Existing slugs, canonical URLs, hreflang, breadcrumbs, FAQ schema and the substantive integration contract content remain unchanged.

Regression coverage verifies hub canonicals plus all fourteen ES/EN detail URLs, researched titles/H1s, direct-answer blocks and structured-data presence.

## Next audit order

After Batch 01 merges green:

1. use cases — bounded problem/outcome ownership;
2. departments — organizational operating-model ownership;
3. sectors — industry-specific ownership and doorway/thin-page review.

The order may be adjusted if a cluster exposes a higher cannibalization risk, but Phase 3 will close only at **27 / 27** deliberate decisions.

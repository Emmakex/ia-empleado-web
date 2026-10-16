# IA Empleado — Phase 3 cluster audit

**Status:** active  
**Started:** 2026-10-16  
**Scope:** sectors + use cases + departments + integrations  
**Canonical rules:** `SEO_GEO_CONTENT_OWNERSHIP.md` + `SEO_GEO_FULL_OPTIMIZATION_ROADMAP.md`

## Goal

Phase 3 audits the organizational and problem-oriented cluster pages after the Growth backlog was closed at 56/56. The objective is not to create more URLs. It is to make every existing sector, use-case, department and integration surface own one materially distinct search/evaluation job or remove its ability to compete.

The phase contains **27 conceptual surfaces**:

- sectors: 1 hub + 4 detail pages = 5;
- use cases: 1 hub + 6 detail pages = 7;
- departments: 1 hub + 6 detail pages = 7;
- integrations: 1 hub + 7 detail pages = 8.

## Progress

- Audited in Batch 01 — sectors: **5 / 27**.
- Audited in Batch 02 — use cases: **+7 → 12 / 27**.
- Remaining after Batch 02: **15**.
- New indexable SEO URLs created in Phase 3: **0**.
- Same-intent conflicts introduced: **0**.

## Batch 01 — sectors

| Surface | Decision | ES owner | EN owner | Boundary |
| --- | --- | --- | --- | --- |
| Sector hub | REPOSITION | `IA por sectores` | `AI by industry` | navigational/evaluation hub; does not take broad `IA para empresas` intent from Home |
| Ecommerce | REPOSITION | `IA para ecommerce` | `AI for ecommerce` | Growth landing keeps ecommerce-automation intent; guide keeps ecommerce implementation intent |
| Turismo | REPOSITION | `IA para turismo` | `AI for travel` | booking-automation landing and implementation guide remain separate process owners |
| Servicios profesionales | KEEP | `IA para servicios profesionales` | `AI for professional services` | retained for distinct industry/evaluation value; ES exact tested variants currently show no reported Semrush volume |
| Ventas B2B | REPOSITION | `IA para ventas B2B` | `AI for B2B sales` | Growth landing keeps broad sales-automation intent; role/department keep agent and organizational intent |

## Search evidence — Batch 01

### Ecommerce

Semrush ES, 2026-10-16:

- `agentes ia ecommerce`: 70/month;
- `ia para ecommerce`: 50/month, KD 45;
- `inteligencia artificial ecommerce`: 50/month, KD 42;
- `ia ecommerce`: 40/month.

Semrush UK, 2026-10-16:

- `ai for ecommerce`: 140/month, KD 46;
- `ecommerce ai`: 140/month, KD 35;
- `ai agents ecommerce`: 10/month.

Decision: sector page owns ecommerce context/evaluation around `IA para ecommerce` / `AI for ecommerce`. `/automatizacion-ecommerce-ia` keeps the process-automation category; the related blog article keeps implementation guidance.

### Turismo

Semrush ES, 2026-10-16:

- `ia turismo`: 50/month, KD 31;
- `inteligencia artificial turismo`: 50/month, KD 48;
- `ia para turismo`: 20/month.

Semrush UK, 2026-10-16:

- `travel ai`: 390/month, KD 61;
- `ai for travel`: 110/month, KD 59;
- `ai agents travel`: 20/month.

Decision: sector page owns tourism context/evaluation around `IA para turismo` / `AI for travel`. Booking automation remains a separate process owner.

### Servicios profesionales

Semrush ES, 2026-10-16: tested exact variants such as `ia para servicios profesionales`, `ia para consultoras`, `automatización servicios profesionales` and `ia para despachos` returned no reported volume in the batch query.

Semrush UK, 2026-10-16:

- `ai for professional services`: 30/month, CPC 18.66;
- `ai for consulting firms`: 20/month;
- `professional services ai`: 10/month.

Decision: KEEP as a distinct evaluation surface instead of forcing it onto a broader keyword already owned elsewhere. The page explicitly separates operational coordination from professional judgment.

### Ventas B2B

Semrush ES, 2026-10-16:

- `ia para ventas b2b`: 40/month.

Semrush UK, 2026-10-16:

- `b2b sales automation`: 90/month;
- `ai for b2b sales`: 20/month;
- `b2b sales ai`: 20/month.

Decision: sector page targets B2B-specific context rather than the broad automation category. `/automatizacion-ventas-sdr-ia` remains the canonical owner for general sales automation.

## Implementation changes — Batch 01

- added `lib/sector-search-optimization.ts` as the Phase 3 search-ownership layer;
- routed sector hub and detail metadata/content through the optimized records without changing public slugs;
- preserved canonical, hreflang and existing route architecture;
- strengthened direct-answer copy so each sector explains its exact job and boundary with Growth/process pages;
- added ES/EN regression coverage for hub + four sector pages and the highest-risk overlap boundaries;
- created no new search URL, redirect or noindex rule.

## Batch 02 — use cases

| Surface | Decision | ES owner | EN owner | Boundary |
| --- | --- | --- | --- | --- |
| Use-case hub | REPOSITION | `casos de uso IA` | `AI use cases` | informational/evaluation directory; does not replace product/process landings |
| Incidencia de cliente | REPOSITION | `gestión de reclamaciones` | `customer issue resolution` | bounded resolution workflow; customer-service Growth landing keeps automation intent; support profile keeps role intent |
| Validación de facturas | REPOSITION | `validación de facturas` | `invoice validation` | bounded validation/control; Growth keeps broad invoice/accounting automation |
| Seguimiento comercial | REPOSITION | `seguimiento de leads` | `sales follow up` | continuity workflow; Growth keeps broad sales automation; Sales / SDR profile keeps role intent |
| Incidencias de pedidos | REPOSITION | `control de pedidos` | `order exception management` | exception/control path; broader order-processing and automation content remains outside this owner |
| Reservas de viajes | REPOSITION | `gestión de reservas` | `travel booking management` | concrete booking workflow; Growth keeps booking-automation intent; Travel sector keeps industry context |
| Documentación administrativa | REPOSITION | `automatización documental` | `document workflow automation` | document workflow; document-management integration keeps system-access intent; administrative automation stays broader |

## Search evidence — Batch 02

### Hub

Semrush ES, 2026-10-16:

- `casos de uso ia`: 50/month, KD 28;
- `casos de uso de ia`: 50/month, KD 28;
- `casos de uso inteligencia artificial`: 20/month.

Semrush UK, 2026-10-16:

- `ai use cases`: 480/month, KD 59;
- `artificial intelligence use cases`: 140/month, KD 61;
- `ai use cases for business`: 20/month.

### Incidencias y reclamaciones

Semrush ES, 2026-10-16:

- `gestión de incidencias`: 140/month, KD 20;
- `gestión de reclamaciones`: 70/month, KD 17;
- `reclamaciones clientes`: 40/month, KD 32;
- `resolución de incidencias`: 20/month.

Semrush UK, 2026-10-16:

- `customer complaint management`: 40/month;
- `customer issue resolution`: 20/month;
- `customer issue management`: 20/month.

Decision: own the bounded resolution pattern instead of duplicating the broader customer-service automation page.

### Validación de facturas

Semrush ES, 2026-10-16:

- `control de facturas`: 170/month, KD 24;
- `validación de facturas`: 10/month.

Semrush UK, 2026-10-16:

- `invoice validation`: 110/month, KD 41;
- `invoice control`: 20/month;
- `invoice automation`: 260/month, kept outside this owner because it is broader automation intent.

### Seguimiento comercial

Semrush ES, 2026-10-16:

- `seguimiento de leads`: 40/month, KD 26;
- `seguimiento comercial`: 20/month, KD 19;
- `seguimiento de ventas`: 10/month.

Semrush UK, 2026-10-16:

- `sales follow up`: 70/month, KD 42;
- `sales follow up process`: 50/month;
- `lead follow up`: 50/month.

### Control e incidencias de pedidos

Semrush ES exact-query recheck, 2026-10-16:

- `gestión de pedidos`: 390/month, KD 21;
- `control de pedidos`: 70/month, KD 12;
- `automatización de pedidos`: 70/month, KD 12.

Semrush UK, 2026-10-16:

- `order management`: 1,900/month, KD 58;
- `AI order management`: 110/month, KD 40;
- `order exception management`: 10/month.

Decision: use the narrower exception/control framing. The page is not positioned as a full order-management/OMS category owner.

### Gestión de reservas

Semrush ES, 2026-10-16:

- `gestión de reservas`: 140/month, KD 27;
- `reservas de viajes`: 90/month;
- `gestión de reservas turísticas`: 10/month.

Semrush UK, 2026-10-16:

- `booking management`: 90/month, KD 26;
- `travel booking management`: 30/month;
- `booking automation`: 20/month, retained by the automation owner.

### Automatización documental

Semrush ES, 2026-10-16:

- `gestión documental`: 1,300/month, KD 61;
- `gestión de documentos`: 210/month;
- `automatización documental`: 40/month.

Semrush UK, 2026-10-16:

- `document management`: 1,900/month, KD 66;
- `document workflow automation`: 320/month, KD 44;
- `document automation`: 50/month.

Decision: keep the use case on workflow automation while reserving document-management system/access intent for the integration family.

## Implementation changes — Batch 02

- added `lib/use-case-search-optimization.ts` as a view/ownership layer over the six canonical use-case records;
- routed use-case hub and detail metadata/content through audited records without changing any public slug;
- strengthened direct answers so every page states its problem/outcome job and its boundary with Growth, employee, sector or integration owners;
- preserved existing workflow steps, systems, controls, metrics, limits, FAQ and HowTo schema;
- extended the sector/use-case CI contract so the optimized layer must derive from canonical records and both ES/EN route families must use it;
- added ES/EN regression coverage for the hub, all six use cases and the highest-risk overlap boundaries;
- created no new indexable URL, redirect or noindex rule.

## Next batch

**Batch 03 — departments:** audit the department hub plus six existing department pages. The priority is to separate organizational operating-model intent from specialist employee roles and process automation landings. After departments, Batch 04 will close Phase 3 with integrations.

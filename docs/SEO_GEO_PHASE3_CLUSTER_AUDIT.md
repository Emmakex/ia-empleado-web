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
- Remaining after Batch 01: **22**.
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

## Next batch

**Batch 02 — use cases:** audit the use-case hub plus six existing process-pattern pages. Priority is to separate genuine problem/query intent from Growth process landings and from employee/department role intent before moving to departments and integrations.

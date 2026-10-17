# IA Empleado — Full SEO/GEO Optimization Roadmap

**Status:** one-time optimization cleanup **COMPLETE** — Phase 7 operating loop active  
**Baseline:** 2026-10-15  
**Cleanup closed:** 2026-10-17  
**Scope:** `iaempleado.com` commercial website (`Emmakex/ia-empleado-web`)  
**Canonical editorial guide:** `Emmakex/ia-empleado/docs/EDITORIAL_SEO_GEO_GUIDE.md`  
**Canonical ownership map:** `docs/SEO_GEO_CONTENT_OWNERSHIP.md`

## Purpose

This roadmap records the completed one-time SEO/GEO cleanup and the permanent operating loop that follows it. The cleanup required every reviewed indexable surface to have a clear intent owner, deliberate index policy, search vocabulary, internal discovery path, conversion role, GEO-ready meaning and validated technical SEO behavior without creating avoidable canonical or cannibalization debt.

As of 2026-10-17, Phases 0–6 are closed. Phase 7 is ongoing by design and is now the only active SEO/GEO program state.

## Current inventory and status

The public content model contains at least 101 conceptual SEO/content surfaces before conversion utilities and legal pages, with ES/EN parity where applicable.

| Family | Conceptual surfaces | Current status |
| --- | ---: | --- |
| Home | 1 | ✅ Baseline optimized |
| Empleados IA | 1 hub + 4 deep reference profiles | ✅ Phase 1 audited and aligned |
| Employee catalog | 22 profiles total | ✅ Catalog governed; 4 deep owners audited, non-deep entries are not automatic SEO pages |
| Equipos IA | 1 hub + 4 team pages | ✅ Phase 1 audited and aligned |
| Sectores | 1 hub + 4 sector pages | ✅ Phase 3: 5/5 audited |
| Casos de uso | 1 hub + 6 use-case pages | ✅ Phase 3: 7/7 audited |
| Departamentos | 1 hub + 6 department pages | ✅ Phase 3: 7/7 audited |
| Integraciones | 1 hub + 7 integration pages | ✅ Phase 3: 8/8 audited |
| Comparativas | 1 hub + 5 comparison pages | ✅ Phase 4: 6/6 audited |
| Growth commercial landings | 28 historical records | ✅ Phase 2: 28/28 audited |
| Blog Growth support | 28 historical records | ✅ Phase 2: 28/28 audited |
| Conversion / interactive utilities | 5 core ES surfaces plus EN parity | ✅ Phase 5 audited; deliberate index policy assigned |
| Legal | Legal notice + privacy policy, ES/EN | ✅ Phase 5 audited; deliberate index policy assigned |
| Technical SEO/GEO + internal graph | site-wide | ✅ Phase 6 closed and production-verified |

### Growth inventory closure

The Growth engine historically aggregated 4 original pairs, 1 incremental pair and Day 06 through Day 28, for **28 commercial Growth landings + 28 supporting blog articles = 56 historical records**. Phase 2 reviewed all **56/56** records individually. The authoritative closure record is `docs/SEO_GEO_PHASE2_GROWTH_AUDIT.md`.

## Completed phases

### Phase 0 — Governance and canonical foundation — ✅ COMPLETE

Editorial alignment established `existing-owner-first`, `one-primary-intent-one-canonical-url`, the ownership map, Home/hub baseline and CI governance for declared keyword, intent, cluster, canonical role, conversion role and research basis.

### Phase 1 — Core commercial owners and reference roles — ✅ COMPLETE

Home, `/empleados-ia`, four deep reference profiles and `/equipos-ia` plus four team pages were audited independently in ES/EN. Role intent is separated from process-automation Growth intent and Home's broad company/category intent.

### Phase 2 — Historical Growth audit and consolidation — ✅ COMPLETE — 56/56

All 28 commercial landings + 28 support articles were individually reviewed. Same-intent conflicts were consolidated or repositioned and all 56 records now have an explicit decision. Authoritative audit: `docs/SEO_GEO_PHASE2_GROWTH_AUDIT.md`.

### Phase 3 — Organizational and problem clusters — ✅ COMPLETE — 27/27

Sectors 5/5, use cases 7/7, departments 7/7 and integrations 8/8 were audited. Ownership boundaries are explicit: sector = industry/context/evaluation; use case = bounded problem/workflow; department = organizational operating model; integration = system access/data/permissions/validation/fallback/auditability. Authoritative audit: `docs/SEO_GEO_PHASE3_CLUSTER_AUDIT.md`.

### Phase 4 — Comparison and decision-stage content — ✅ COMPLETE — 6/6

Comparison hub plus five dedicated pairwise comparisons were audited. Generic definition remains with the AI-agent educational owner; process implementation remains with Growth. Authoritative audit: `docs/SEO_GEO_PHASE4_COMPARISON_AUDIT.md`.

### Phase 5 — Conversion, tools and indexability decisions — ✅ COMPLETE

Authoritative audit: `docs/SEO_GEO_PHASE5_CONVERSION_INDEXABILITY_AUDIT.md`.

The five conversion/interactive families plus legal/privacy ES/EN received deliberate `INDEX` or `INDEX AS DISTINCT SEARCH OWNER` decisions without taking an intent already owned by Home, employee/team hubs, Growth, sector/use-case/department/integration pages or comparisons.

### Phase 6 — Technical SEO/GEO and internal graph closure — ✅ COMPLETE

Authoritative audit: `docs/SEO_GEO_PHASE6_TECHNICAL_CLOSURE.md`.

Closed scope:

- canonical URLs, ES/EN hreflang and `x-default` behavior;
- main and Growth sitemap completeness/exclusions;
- robots/indexability and internal rendering/API safeguards;
- permanent redirect ownership and chain risk;
- structured data and breadcrumb truthfulness;
- server-rendered critical meaning;
- public internal discovery paths and orphan prevention;
- contextual linking between informational, evaluation, commercial and conversion surfaces;
- browser/runtime regression coverage and Lighthouse launch gate;
- machine-readable GEO/discovery closure through a governed `/llms.txt` aid.

PR #191 added reciprocal `es-ES` / `en` / `x-default` alternates to the Growth sitemap, added `/llms.txt` with `noindex, follow`, and added Phase 6 regression coverage. Runtime commit `0ae766272ee62a727bef0361d9922ed18c3a077b` passed Web CI run `39014441397`, Native Safari run `39014441363` and Production Verification run `39015066641` (#169), including exact Hostinger fingerprint verification and Lighthouse.

**Exit gate:** satisfied. No known unresolved P0/P1 technical SEO/GEO blocker remains in the reviewed scope, and the governed indexable inventory has deliberate public discovery paths.

## Phase 7 — Measurement, re-crawl and optimization loop — 🔁 ACTIVE / ONGOING

Phase 7 is the permanent operating state after cleanup. It does not have a final exit gate.

Operating loop:

- establish and refresh Search Console baseline by query and landing page when data is available;
- refresh Semrush domain/keyword evidence and add position tracking when the domain becomes measurable / a project is available;
- watch pages roughly in positions 4–50 for expansion, CTR and internal-link opportunities;
- detect query-level cannibalization and ownership drift;
- review impressions with weak CTR;
- review content decay and stale evidence monthly;
- prefer KEEP / EXPAND / REPOSITION / MERGE / REDIRECT / NOINDEX over creating a new URL when an existing owner can capture the intent;
- create a new URL only for a materially distinct, validated intent with defined cluster, links and conversion role;
- preserve ES/EN as independently researched markets rather than literal keyword translations.

### Measurement baseline at closure

A Semrush Spain domain snapshot for `iaempleado.com` on 2026-10-17 returned no domain data. This is an early/insufficient visibility baseline, not a zero-ranking claim, and no metric is invented from it.

Search Console data was not available to the Phase 6 closure run, so no impressions, CTR or average-position figures are claimed here. The Phase 7 loop should consume Search Console evidence as soon as that source is available.

The enabled `IA Empleado Daily SEO/GEO` automation already reads the canonical editorial guide, ownership map and this roadmap, applies existing-owner-first rules and must not publish merely to satisfy cadence.

## Execution order from here

There is no remaining one-time cleanup phase.

1. **Phase 7** — measure, re-crawl and optimize from evidence.
2. When evidence identifies a concrete issue or opportunity, modify the existing canonical owner first.
3. Create new content only when no existing owner can legitimately capture the validated intent.

## Progress board

| Phase | Status | Priority | Completion definition |
| --- | --- | --- | --- |
| 0. Governance + canonical foundation | ✅ Complete | P0 | Editorial guide, ownership, Home/hubs baseline and CI governance live |
| 1. Core commercial + reference roles | ✅ Complete | P0 | Core product/role owners individually audited and aligned |
| 2. Historical Growth 28 + 28 | ✅ Complete — 56/56 | P0 | All historical records classified and known Growth cannibalization resolved |
| 3. Sectors/use cases/departments/integrations | ✅ Complete — 27/27 | P1 | Every cluster page has distinct demand/ownership and explicit boundaries |
| 4. Comparisons | ✅ Complete — 6/6 | P1 | One canonical owner per comparison intent |
| 5. Conversion/indexability | ✅ Complete | P1 | Every utility/legal route has deliberate index policy and owner boundary |
| 6. Technical closure | ✅ Complete | P1 | Canonical/index/schema/sitemap/internal graph/browser/performance gates production-verified |
| 7. Measurement loop | 🔁 Active / ongoing | P2 | Search Console/Semrush evidence drives future changes; no permanent exit |

## Definition of “100% optimized” for this project

For the **one-time cleanup**, the completion definition is satisfied as of 2026-10-17:

1. the reviewed indexable inventory is governed;
2. reviewed URLs have a primary intent or deliberate indexability decision;
3. primary intents have canonical owners;
4. known same-intent conflicts in the reviewed scope were resolved;
5. ES and EN use independent search rationale;
6. internal paths connect informational → evaluation → commercial → conversion surfaces;
7. GEO-critical pages expose extractable definitions, workflows, systems, controls, limits and concise answers where relevant;
8. canonical/hreflang/schema/sitemap/indexability were validated through automated and production acceptance;
9. an ongoing measurement loop and daily automation are active, with empty/unavailable third-party datasets recorded honestly rather than invented;
10. future publishing is subordinate to evidence and canonical ownership rather than cadence.

“100% optimized” does **not** mean rankings can no longer improve. SEO/GEO remains an ongoing system, which is why Phase 7 stays active indefinitely.

## Reporting contract after cleanup

Each Phase 7 optimization batch should report `OPTIMIZADO`, `AMPLIADO`, `CREADO`, `FUSIONADO/REDIRIGIDO`, `NOINDEX` where applicable, `SIN CAMBIOS` when reviewed and intentionally retained, key `ANTES → DESPUÉS` examples, evidence source, final counts, PR, commit, CI and production verification when code/runtime changes are involved.

A page reviewed and intentionally retained is valid progress. A new URL is not progress unless it owns a genuinely new, validated intent.

# IA Empleado — Full SEO/GEO Optimization Roadmap

**Status:** active roadmap — **Phase 4 next**  
**Baseline:** 2026-10-15  
**Last reconciled:** 2026-10-16  
**Scope:** `iaempleado.com` commercial website (`Emmakex/ia-empleado-web`)  
**Canonical editorial guide:** `Emmakex/ia-empleado/docs/EDITORIAL_SEO_GEO_GUIDE.md`  
**Canonical ownership map:** `docs/SEO_GEO_CONTENT_OWNERSHIP.md`

## Purpose

This document answers one operational question: **what is already optimized, what still needs review, and in which order do we finish the whole website without creating SEO/GEO debt?**

The website is not considered fully optimized until every indexable surface has a clear intent owner, validated search vocabulary, adequate content depth, internal links, conversion role, GEO-ready direct answers, correct metadata/canonical/hreflang/schema behavior, and a deliberate KEEP / EXPAND / REPOSITION / MERGE / REDIRECT / NOINDEX decision.

## Current inventory and status

The public content model contains **at least 101 conceptual SEO/content surfaces before conversion utilities and legal pages**, with ES/EN parity where applicable.

| Family | Conceptual surfaces | Current status |
| --- | ---: | --- |
| Home | 1 | ✅ Baseline optimized |
| Empleados IA | 1 hub + 4 deep reference profiles | ✅ Phase 1 audited and aligned |
| Employee catalog | 22 profiles total | 4 deep owners audited; non-deep entries remain catalog opportunities, not automatic SEO pages |
| Equipos IA | 1 hub + 4 team pages | ✅ Phase 1 audited and aligned |
| Sectores | 1 hub + 4 sector pages | ✅ Phase 3: 5/5 audited |
| Casos de uso | 1 hub + 6 use-case pages | ✅ Phase 3: 7/7 audited |
| Departamentos | 1 hub + 6 department pages | ✅ Phase 3: 7/7 audited |
| Integraciones | 1 hub + 7 integration pages | ✅ Phase 3: 8/8 audited |
| Comparativas | 1 hub + 5 comparison pages | 🔄 Phase 4 next; duplicated Growth comparison owners already consolidated in Phase 2 |
| Growth commercial landings | 28 historical records | ✅ Phase 2: 28/28 audited |
| Blog Growth support | 28 historical records | ✅ Phase 2: 28/28 audited |
| Conversion / interactive utilities | 5 core ES surfaces plus EN parity where applicable | ⏳ Phase 5 pending |
| Legal | Legal notice + privacy policy | ⏳ Phase 5 indexability policy pending |

### Growth inventory closure

The Growth engine historically aggregated 4 original pairs, 1 incremental pair and Day 06 through Day 28, for **28 commercial Growth landings + 28 supporting blog articles = 56 historical records**. Phase 2 reviewed all **56/56** records individually. The authoritative closure record is `docs/SEO_GEO_PHASE2_GROWTH_AUDIT.md`.

## Completed phases

### Phase 0 — Governance and canonical foundation — ✅ COMPLETE

Completed in the editorial alignment workstream and PR #162. Home/hubs were aligned with market language, direct GEO definitions and contextual linking; `SEO_GEO_CONTENT_OWNERSHIP.md` was created; Growth governance became `existing-owner-first` and `one-primary-intent-one-canonical-url`; and CI now requires declared keyword, intent, cluster, canonical role, conversion role and research basis for new/updated Growth content.

### Phase 1 — Core commercial owners and reference roles — ✅ COMPLETE

Completed scope:

- Home and `/empleados-ia` ownership verified;
- four deep reference profiles audited independently in ES/EN;
- `/equipos-ia` hub + four team pages reviewed;
- role intent separated from process-automation Growth intent and Home's broad company/category intent.

Core ES examples: Home → `agentes IA para empresas`; Customer Support → `agentes ia atención al cliente`; Administrative → `agente ia administrativo`; Accounting/Billing → `ia para contabilidad`; Sales/SDR → `agente ia ventas`.

**Exit gate:** satisfied.

### Phase 2 — Historical Growth audit and consolidation — ✅ COMPLETE — 56/56

All 28 commercial landings + 28 support articles were individually reviewed. Comparison duplicates were consolidated, cost/ROI overlap was resolved, useful historical pages were repositioned around researched market language, CRM/ERP/email automation was separated from system integration, process pages were separated from role/sector/department intent, and the SME owner was aligned to `ia para pymes` / `ai for small business`.

**Exit gate:** satisfied. All **56/56** records have an explicit decision and no known same-intent Growth pair remains unresolved.

### Phase 3 — Organizational and problem clusters — ✅ COMPLETE — 27/27

Authoritative audit: `docs/SEO_GEO_PHASE3_CLUSTER_AUDIT.md`.

Completed scope:

- sectors: **5/5** — hub + Ecommerce, Travel, Professional Services and B2B Sales;
- use cases: **7/7** — hub + customer issue, invoice validation, sales follow-up, order exception, travel booking and administrative documentation;
- departments: **7/7** — hub + six organizational operating-model pages;
- integrations: **8/8** — hub + CRM, ERP, email, calendar, ecommerce, ticketing and document management.

Ownership rule established across the family:

- **sector** = industry/context/evaluation;
- **use case** = bounded problem/workflow;
- **department** = organizational operating model across people, agents, systems, metrics, handoffs and authority;
- **integration** = system access, authoritative data, matching, permissions, validation, fallback and auditability.

No new public SEO URL was required. Existing slugs, canonicals and locale architecture were preserved while metadata, direct answers and owner boundaries were strengthened.

**Exit gate:** satisfied. All **27/27** cluster surfaces have a materially distinct search/evaluation purpose and no unresolved same-intent conflict is known inside Phase 3.

## Remaining optimization phases

### Phase 4 — Comparison and decision-stage content — P1 — 🔄 NEXT

**Scope:** comparison hub + 5 comparisons:

- Empleado IA vs chatbot;
- Empleado IA vs agente IA;
- Empleado IA vs RPA;
- Empleado IA vs automatización tradicional;
- Empleado IA vs AI copilot.

**Objective:** own high-value evaluation queries without contradicting Home definitions or competing with informational content.

Phase 2 already removed the clearest historical Growth duplication around chatbot/RPA. Phase 4 now audits the dedicated comparison surfaces themselves for current ES/EN demand, SERP intent, neutral comparison quality, direct answers, decision matrices, internal links and CTA fit.

**Exit gate:** one canonical owner per comparison intent and every dedicated comparison has a justified search/evaluation job.

### Phase 5 — Conversion, tools and indexability decisions — P1

**Scope:**

- `/como-trabajan-juntos`;
- `/disena-tu-equipo-ia`;
- `/mejora-tu-proceso`;
- `/calculadora-roi`;
- `/solicitar-demo`;
- legal/privacy surfaces;
- any internal preview/campaign route that can be crawled.

For each page choose deliberately: `INDEX`, `NOINDEX`, or `INDEX AS A DISTINCT SEARCH OWNER`.

Check metadata, canonical, robots behavior, internal links, conversion tracking, form copy, trust language, SSR content and whether tools need explanatory text for search/answer engines.

**Exit gate:** no conversion/internal/legal URL accidentally competes with a commercial or informational owner.

### Phase 6 — Technical SEO/GEO and internal graph closure — P1

Run a site-wide final pass for canonical URLs, ES/EN hreflang and x-default, sitemap completeness/exclusions, robots/indexability, redirects/chains, structured data, breadcrumbs, server-rendered critical meaning, orphan detection, contextual internal linking, title/meta/H1 duplication, thin pages, media/social previews where useful, and performance/Core Web Vitals regressions caused by content/UI changes.

**Exit gate:** technical crawl has no unresolved P0/P1 SEO issue and every indexable URL is reachable through a deliberate internal path.

### Phase 7 — Measurement, re-crawl and optimization loop — P2 / ongoing

After the one-time cleanup:

- establish Search Console baseline by query and landing page;
- configure/refresh Semrush project and position tracking when available;
- watch pages roughly in positions 4–50 for expansion/CTR opportunities;
- detect cannibalization by query;
- review impressions with poor CTR;
- review content decay monthly;
- change ownership only when search evidence supports it.

**Exit gate:** no permanent exit; this becomes the operating loop after cleanup.

## Execution order from here

1. **Phase 4** — dedicated comparisons.
2. **Phase 5** — conversion/indexability decisions.
3. **Phase 6** — full technical closure.
4. **Phase 7** — measurement and continuous optimization.

Do not start a broad new content-expansion campaign while Phase 4 contains unresolved ownership issues. The daily SEO/GEO automation should preferentially consume this optimization backlog rather than create URLs for cadence.

## Progress board

| Phase | Status | Priority | Completion definition |
| --- | --- | --- | --- |
| 0. Governance + canonical foundation | ✅ Complete | P0 | Editorial guide, ownership, Home/hubs baseline and CI governance live |
| 1. Core commercial + reference roles | ✅ Complete | P0 | Core product/role owners individually audited and aligned |
| 2. Historical Growth 28 + 28 | ✅ Complete — 56/56 | P0 | All historical records classified and known Growth cannibalization resolved |
| 3. Sectors/use cases/departments/integrations | ✅ Complete — 27/27 | P1 | Every cluster page has distinct demand/ownership and explicit boundaries |
| 4. Comparisons | 🔄 Next | P1 | One canonical owner per comparison intent |
| 5. Conversion/indexability | ⏳ Pending | P1 | Every utility/legal/internal route has deliberate index policy |
| 6. Technical closure | ⏳ Pending | P1 | Crawl/index/schema/linking checks clean |
| 7. Measurement loop | 🔁 Ongoing after cleanup | P2 | Search Console/Semrush evidence drives future changes |

## Definition of “100% optimized” for this project

We may call the current cleanup **complete** only when:

1. every current indexable URL is inventoried;
2. every URL has a primary intent or deliberate non-index decision;
3. every primary intent has one canonical owner;
4. all same-intent conflicts are resolved;
5. ES and EN have independent keyword rationale;
6. internal links connect informational → evaluation → commercial → conversion paths;
7. GEO-critical pages provide extractable definitions, workflows, systems, controls, limits and concise answers;
8. canonical/hreflang/schema/sitemap/indexability are validated;
9. Search Console/Semrush monitoring is ready to measure impact;
10. the daily automation follows this roadmap instead of publishing merely for cadence.

## Reporting contract during the roadmap

Every optimization batch must report:

- `OPTIMIZADO`;
- `AMPLIADO`;
- `CREADO`;
- `FUSIONADO/REDIRIGIDO`;
- `NOINDEX` where applicable;
- `SIN CAMBIOS` when reviewed and intentionally retained;
- key `ANTES → DESPUÉS` examples;
- final counts;
- PR, commit, CI and production verification.

A page reviewed and intentionally retained is progress. A new URL is not progress unless it owns a new, validated intent.

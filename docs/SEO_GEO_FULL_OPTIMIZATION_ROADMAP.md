# IA Empleado — Full SEO/GEO Optimization Roadmap

**Status:** active roadmap  
**Baseline:** 2026-10-15  
**Scope:** `iaempleado.com` commercial website (`Emmakex/ia-empleado-web`)  
**Canonical editorial guide:** `Emmakex/ia-empleado/docs/EDITORIAL_SEO_GEO_GUIDE.md`  
**Canonical ownership map:** `docs/SEO_GEO_CONTENT_OWNERSHIP.md`

## Purpose

This document answers one operational question: **what is already optimized, what still needs review, and in which order do we finish the whole website without creating SEO/GEO debt?**

The website is not considered fully optimized until every indexable surface has a clear intent owner, validated search vocabulary, adequate content depth, internal links, conversion role, GEO-ready direct answers, correct metadata/canonical/hreflang/schema behavior, and a deliberate KEEP / EXPAND / REPOSITION / MERGE / REDIRECT / NOINDEX decision.

## Current inventory

The current public content model contains **at least 101 SEO/content surfaces before conversion utilities and legal pages**, with ES/EN parity where applicable.

| Family | Current conceptual surfaces | Current status |
| --- | ---: | --- |
| Home | 1 | **Optimized baseline** in PR #162 |
| Empleados IA | 1 hub + 4 deep reference profiles | Hub optimized; 4 detail pages still require individual keyword/intent audit |
| Employee catalog | 22 profiles total | 4 deep profiles, 16 catalog opportunities, 2 restricted-use entries; non-deep entries are not treated as standalone SEO pages by default |
| Equipos IA | 1 hub + 4 team pages | Pending full SEO/GEO audit |
| Sectores | 1 hub + 4 sector pages | Pending full SEO/GEO audit |
| Casos de uso | 1 hub + 6 use-case pages | Pending full SEO/GEO audit |
| Departamentos | 1 hub + 6 department pages | Pending full SEO/GEO audit |
| Integraciones | 1 hub + 7 integration pages | Pending full SEO/GEO audit |
| Comparativas | 1 hub + 5 comparison pages | Pending full SEO/GEO audit |
| Growth commercial landings | 28 | Global linking/governance improved; individual intent audit pending |
| Blog | 1 hub + 28 support articles | Hub optimized; 28 article-level audits pending |
| Conversion / interactive utilities | 5 core ES surfaces: collaboration demo, Team Builder, Process Analyzer, ROI calculator, request demo | Pending index/noindex + search/conversion-role review |
| Legal | Legal notice + privacy policy | Utility/legal; confirm intentional indexing policy |

### Growth inventory detail

The Growth engine currently aggregates:

- 4 original commercial landings + 4 original support articles;
- 1 incremental landing + 1 incremental article;
- Day 06 through Day 28: 23 additional landing/article pairs;
- **total: 28 commercial Growth landings + 28 supporting blog articles.**

These 56 historical Growth records predate the new `existing-owner-first` governance in different degrees. They must therefore be reviewed individually rather than assumed optimized merely because they pass the current content contract.

## What is already optimized

### Phase 0 — Governance and canonical foundation — COMPLETE

Completed in the editorial alignment workstream and PR #162:

- Home ES/EN repositioned toward `agentes IA para empresas`, `IA para empresas` and the corresponding EN search territory while preserving **IA Empleado / Empleado IA** as owned terminology.
- Direct GEO definition added to explain an Empleado IA as a specialized AI agent for a business role.
- `/empleados-ia` and `/en/ai-employees` strengthened as catalog/canonical hubs.
- Home links strengthened toward the four reference employee profiles.
- Blog hub ES/EN repositioned toward AI agents + business process automation informational demand.
- Blog surfaced in the main exploration graph.
- Growth landing template now links toward canonical employee, use-case, integration and guide hubs.
- `SEO_GEO_CONTENT_OWNERSHIP.md` created.
- Growth editorial policy upgraded to `existing-owner-first` and `one-primary-intent-one-canonical-url`.
- New/updated Growth content from 2026-10-16 must declare primary/supporting keywords, intent, cluster, canonical role, conversion role and research basis.
- CI checks prevent landing/support pairs from targeting the same primary keyword.

**Important:** Phase 0 makes future optimization safe. It does **not** mean every historical URL has already been individually optimized.

## Remaining optimization phases

### Phase 1 — Core commercial owners and reference roles — P0

**Scope:**

- `/` verification after deployment;
- `/empleados-ia` verification;
- four reference employee detail pages:
  - Atención al Cliente IA;
  - Administrativo IA;
  - Contabilidad y Facturación IA;
  - Comercial / SDR IA;
- `/equipos-ia` hub + 4 team pages.

**Work per page:**

- validate ES and EN keyword demand independently;
- assign one primary query and semantic variants;
- check title/meta/H1 alignment and CTR potential;
- add/strengthen direct-answer definition for GEO;
- verify systems, limits, human-control language and concrete workflows;
- strengthen contextual links to/from Home, employee hub, teams, use cases and relevant Growth owners;
- ensure CTA matches commercial/evaluation intent;
- record KEEP / EXPAND / REPOSITION / MERGE decision.

**Exit gate:** every core product-role page has a documented primary intent and no overlap with Home or Growth landings.

### Phase 2 — Historical Growth audit and consolidation — P0 / largest phase

**Scope:** **28 commercial landings + 28 support articles.**

This is the highest-risk area for cannibalization because the historical daily cadence created many closely related topics before the current ownership policy existed.

**Audit each pair for:**

- real search demand now;
- primary intent vs current canonical owners;
- landing keyword distinct from support-article keyword;
- overlap with employee, department, sector, integration or comparison pages;
- semantic depth and freshness;
- internal links in both directions;
- direct answers, FAQs and source/evidence quality;
- conversion role;
- potential merge, redirect or reposition opportunity.

**Decision framework:**

- `KEEP` — intent remains distinct and useful;
- `EXPAND` — right owner but weak coverage or links;
- `REPOSITION` — useful content targets the wrong query;
- `MERGE` — another URL already satisfies the same intent better;
- `REDIRECT` — obsolete/merged owner has a clear destination;
- `NOINDEX` — useful UX/support surface but not a search competitor.

**Exit gate:** all 56 historical Growth records have an explicit decision and no unresolved same-intent pair remains.

### Phase 3 — Organizational and problem clusters — P1

**Scope:**

- 4 sector pages + sector hub;
- 6 use-case pages + use-case hub;
- 6 department pages + department hub;
- 7 integration pages + integration hub.

**Objective:** make these pages own genuine evaluation/search intent instead of behaving like templated variants of the same product story.

**Checks:**

- demand exists for the specific sector/problem/department/integration framing;
- unique value and vocabulary on each page;
- no doorway/thin variants;
- clear entity and workflow explanation for GEO;
- links to the exact employee/team/Growth owner that solves the problem;
- unique primary intent and canonical ownership;
- schema/breadcrumbs/hreflang where relevant.

**Exit gate:** every cluster page demonstrates a materially distinct search/evaluation purpose or is merged/noindexed.

### Phase 4 — Comparison and decision-stage content — P1

**Scope:** comparison hub + 5 comparisons:

- Empleado IA vs chatbot;
- Empleado IA vs agente IA;
- Empleado IA vs RPA;
- Empleado IA vs automatización tradicional;
- Empleado IA vs AI copilot.

**Objective:** own high-value evaluation queries without contradicting the Home definition or competing with informational Growth articles.

**Checks:** search demand, SERP intent, neutral comparison quality, direct short answer, decision matrix, internal links, CTA and overlap with existing articles such as the historical chatbot/agent/RPA content.

**Exit gate:** one owner per comparison intent; redundant Growth comparison content merged/repositioned where necessary.

### Phase 5 — Conversion, tools and indexability decisions — P1

**Scope:**

- `/como-trabajan-juntos`;
- `/disena-tu-equipo-ia`;
- `/mejora-tu-proceso`;
- `/calculadora-roi`;
- `/solicitar-demo`;
- legal/privacy surfaces and any internal preview/campaign routes that can be crawled.

**Objective:** decide deliberately which surfaces should rank and which should exist only for users/conversion.

For each page choose: `INDEX`, `NOINDEX`, or `INDEX AS A DISTINCT SEARCH OWNER`.

Check metadata, canonical, robots behavior, internal links, conversion tracking, form copy, trust language, SSR content and whether tools need explanatory text to be understandable by search/answer engines.

**Exit gate:** no conversion/internal/legal URL is accidentally competing with a commercial or informational owner.

### Phase 6 — Technical SEO/GEO and internal graph closure — P1

Run a site-wide final pass for:

- canonical URLs;
- ES/EN hreflang and x-default;
- sitemap completeness and exclusion rules;
- robots/indexability;
- redirects and redirect-chain prevention;
- structured data validity;
- breadcrumb consistency;
- server-rendered critical meaning;
- orphan-page detection;
- contextual internal-link graph;
- title/meta duplication;
- H1 duplication/misalignment;
- thin pages;
- images/alt/social previews where useful;
- performance and Core Web Vitals regressions caused by content/UI changes.

**Exit gate:** technical crawl has no unresolved P0/P1 SEO issue and every indexable URL is reachable through a deliberate internal path.

### Phase 7 — Measurement, re-crawl and optimization loop — P2 / ongoing

After the site-wide cleanup:

- establish Search Console baseline by query and landing page;
- configure/refresh Semrush project and position tracking when available;
- watch pages ranking roughly positions 4–50 for expansion/CTR opportunities;
- detect cannibalization by query;
- review impressions with poor CTR;
- review content decay monthly;
- update ownership only when search evidence supports a change.

**Exit gate:** there is no permanent exit; this becomes the operating loop after the one-time cleanup is complete.

## Recommended execution order

1. **Phase 1** — core product and role owners.
2. **Phase 2** — all 56 Growth records; consolidate aggressively where evidence says so.
3. **Phase 3** — sectors, use cases, departments and integrations.
4. **Phase 4** — comparisons, coordinated with Phase 2 to eliminate duplicate comparison intent.
5. **Phase 5** — conversion/indexability decisions.
6. **Phase 6** — full technical closure.
7. **Phase 7** — measurement and continuous optimization.

Do not start a new broad content-expansion campaign while Phases 1–4 contain unresolved same-intent ownership issues. The daily SEO/GEO automation may continue running, but while this roadmap is open it should preferentially consume the backlog above rather than create new URLs.

## Progress board

| Phase | Status | Priority | Completion definition |
| --- | --- | --- | --- |
| 0. Governance + canonical foundation | ✅ Complete | P0 | Editorial guide, ownership, Home/hubs baseline and CI governance live |
| 1. Core commercial + reference roles | ⏳ Pending | P0 | Core product/role owners individually audited and aligned |
| 2. Historical Growth 28 + 28 | ⏳ Pending | P0 | All 56 records classified and cannibalization resolved |
| 3. Sectors/use cases/departments/integrations | ⏳ Pending | P1 | Every cluster page has distinct demand and ownership |
| 4. Comparisons | ⏳ Pending | P1 | One canonical owner per comparison intent |
| 5. Conversion/indexability | ⏳ Pending | P1 | Every utility/legal/internal route has deliberate index policy |
| 6. Technical closure | ⏳ Pending | P1 | Crawl/index/schema/linking checks clean |
| 7. Measurement loop | 🔁 Ongoing after cleanup | P2 | Search Console/Semrush evidence drives future changes |

## Definition of “100% optimized” for this project

We may call the current cleanup **complete** only when:

1. every current indexable URL is inventoried;
2. every URL has a primary intent or a deliberate non-index decision;
3. every primary intent has one canonical owner;
4. all same-intent conflicts are resolved;
5. ES and EN have independent keyword rationale;
6. internal links connect informational → evaluation → commercial → conversion paths;
7. GEO-critical pages provide extractable definitions, workflows, systems, controls, limits and concise answers;
8. canonical/hreflang/schema/sitemap/indexability are validated;
9. Search Console/Semrush monitoring is ready to measure impact;
10. the daily automation follows this roadmap instead of creating content merely to maintain cadence.

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

# IA Empleado — Full SEO/GEO Optimization Roadmap

**Status:** active roadmap — **Phase 3 next**  
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
| Sectores | 1 hub + 4 sector pages | 🔄 Phase 3 pending/next |
| Casos de uso | 1 hub + 6 use-case pages | 🔄 Phase 3 pending/next |
| Departamentos | 1 hub + 6 department pages | 🔄 Phase 3 pending/next |
| Integraciones | 1 hub + 7 integration pages | 🔄 Phase 3 pending/next |
| Comparativas | 1 hub + 5 comparison pages | ⏳ Phase 4 pending; duplicated Growth comparison owners already consolidated in Phase 2 |
| Growth commercial landings | 28 historical records | ✅ Phase 2: 28/28 audited |
| Blog Growth support | 28 historical records | ✅ Phase 2: 28/28 audited |
| Conversion / interactive utilities | 5 core ES surfaces plus EN parity where applicable | ⏳ Phase 5 pending |
| Legal | Legal notice + privacy policy | ⏳ Phase 5 indexability policy pending |

### Growth inventory closure

The Growth engine historically aggregated:

- 4 original commercial landings + 4 original support articles;
- 1 incremental landing + 1 incremental article;
- Day 06 through Day 28: 23 additional landing/article pairs;
- **total: 28 commercial Growth landings + 28 supporting blog articles = 56 historical records.**

Phase 2 reviewed all **56 / 56** records individually. The authoritative closure record is `docs/SEO_GEO_PHASE2_GROWTH_AUDIT.md`.

## Completed phases

### Phase 0 — Governance and canonical foundation — ✅ COMPLETE

Completed in the editorial alignment workstream and PR #162:

- Home ES/EN repositioned toward market-language `agentes IA para empresas`, `IA para empresas` and the corresponding EN search territory while preserving **IA Empleado / Empleado IA** as owned terminology.
- Direct GEO definition added to explain an Empleado IA as a specialized AI agent for a business role.
- `/empleados-ia` and `/en/ai-employees` strengthened as catalog/canonical hubs.
- Home links strengthened toward the four reference employee profiles.
- Blog hub ES/EN repositioned toward AI agents + business-process automation informational demand.
- Blog surfaced in the main exploration graph.
- Growth templates connected to canonical employee, use-case, integration and guide hubs.
- `SEO_GEO_CONTENT_OWNERSHIP.md` created.
- Growth editorial policy upgraded to `existing-owner-first` and `one-primary-intent-one-canonical-url`.
- New/updated Growth content from 2026-10-16 must declare primary/supporting keywords, intent, cluster, canonical role, conversion role and research basis.
- CI prevents landing/support pairs from targeting the same declared primary keyword.

### Phase 1 — Core commercial owners and reference roles — ✅ COMPLETE

Scope completed:

- Home and `/empleados-ia` ownership verified;
- four deep reference profiles audited and aligned independently in ES/EN:
  - Atención al Cliente IA;
  - Administrativo IA;
  - Contabilidad y Facturación IA;
  - Comercial / SDR IA;
- `/equipos-ia` hub + four team pages reviewed;
- role intent separated from process-automation Growth intent and from Home's broad company/category intent.

Core ES ownership examples:

- Home → `agentes IA para empresas` / broad company proposition;
- Customer Support profile → `agentes ia atención al cliente`;
- Administrative profile → `agente ia administrativo`;
- Accounting/Billing profile → `ia para contabilidad`;
- Sales/SDR profile → `agente ia ventas`.

**Exit gate:** satisfied. Core product-role pages have documented primary jobs and are not deliberately targeting the same primary intent as Home or their process Growth owners.

### Phase 2 — Historical Growth audit and consolidation — ✅ COMPLETE

**Scope:** 28 commercial landings + 28 support articles = **56 / 56 audited**.

The audit reviewed each historical record for:

- current search demand;
- primary intent vs canonical owners;
- landing keyword vs support-article keyword;
- overlap with employee, department, sector, integration, comparison and tool pages;
- semantic depth/freshness;
- internal linking;
- direct answers and GEO usefulness;
- conversion role;
- merge/redirect/reposition/noindex opportunity.

Outcomes include:

- comparison duplicates consolidated into dedicated comparison owners;
- redundant cost/ROI support content consolidated into stronger owners/tools;
- useful historical pages repositioned toward researched market language;
- CRM/ERP/email process automation separated from system-integration intent;
- ecommerce, booking, administrative and sales process automation separated from sector/department/role intent;
- SME landing repositioned around `ia para pymes` / `ai for small business` while the related guide owns AI-agent definition intent;
- layered SEO override registries and CI governance hardened throughout the audit.

**Exit gate:** satisfied. All **56 / 56** historical Growth records have an explicit decision and no known same-intent Growth pair remains unresolved.

## Remaining optimization phases

### Phase 3 — Organizational and problem clusters — P1 — 🔄 NEXT

**Scope:**

- sector hub + 4 sector pages;
- use-case hub + 6 use-case pages;
- department hub + 6 department pages;
- integration hub + 7 integration pages.

**Objective:** make every page own a genuine evaluation/search job instead of behaving like a templated variant of the same product story.

**Checks:**

- validate ES and EN demand independently;
- assign one primary intent or a deliberate non-index/merge decision;
- confirm unique value and vocabulary;
- prevent doorway/thin variants;
- add extractable entity/workflow definitions for GEO;
- link to the exact employee/team/Growth owner that solves the problem;
- keep sector, use-case, department and integration jobs distinct;
- validate canonical, breadcrumbs, schema and hreflang where relevant.

**Exit gate:** every cluster page demonstrates a materially distinct search/evaluation purpose or is merged/noindexed.

### Phase 4 — Comparison and decision-stage content — P1

**Scope:** comparison hub + 5 comparisons:

- Empleado IA vs chatbot;
- Empleado IA vs agente IA;
- Empleado IA vs RPA;
- Empleado IA vs automatización tradicional;
- Empleado IA vs AI copilot.

**Objective:** own high-value evaluation queries without contradicting Home definitions or competing with informational content.

Phase 2 already removed the clearest historical Growth duplication around chatbot/RPA; Phase 4 still needs the dedicated comparison surfaces themselves audited for current demand, neutral comparison quality, direct answers, decision matrices, internal links and CTA fit.

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

Check metadata, canonical, robots behavior, internal links, conversion tracking, form copy, trust language, SSR content and whether tools need explanatory content to be understandable by search/answer engines.

**Exit gate:** no conversion/internal/legal URL accidentally competes with a commercial or informational owner.

### Phase 6 — Technical SEO/GEO and internal graph closure — P1

Run a site-wide final pass for:

- canonical URLs;
- ES/EN hreflang and x-default;
- sitemap completeness/exclusions;
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

After the one-time cleanup:

- establish Search Console baseline by query and landing page;
- configure/refresh Semrush project and position tracking when available;
- watch pages roughly in positions 4–50 for expansion/CTR opportunities;
- detect cannibalization by query;
- review impressions with poor CTR;
- review content decay monthly;
- change ownership only when search evidence supports it.

**Exit gate:** no permanent exit; this becomes the operating loop after the cleanup.

## Execution order from here

1. **Phase 3** — sectors, use cases, departments and integrations.
2. **Phase 4** — dedicated comparisons.
3. **Phase 5** — conversion/indexability decisions.
4. **Phase 6** — technical closure.
5. **Phase 7** — measurement and continuous optimization.

Do not start a broad new content-expansion campaign while Phases 3–4 contain unresolved ownership issues. The daily SEO/GEO automation should preferentially consume this optimization backlog rather than create URLs for cadence.

## Progress board

| Phase | Status | Priority | Completion definition |
| --- | --- | --- | --- |
| 0. Governance + canonical foundation | ✅ Complete | P0 | Editorial guide, ownership, Home/hubs baseline and CI governance live |
| 1. Core commercial + reference roles | ✅ Complete | P0 | Core product/role owners individually audited and aligned |
| 2. Historical Growth 28 + 28 | ✅ Complete — 56/56 | P0 | All historical records classified and known Growth cannibalization resolved |
| 3. Sectors/use cases/departments/integrations | 🔄 Next | P1 | Every cluster page has distinct demand and ownership |
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

# IA Empleado — Phase 7 Measurement Baseline

**Status:** ACTIVE / ongoing  
**Baseline date:** 2026-10-17  
**Scope:** `iaempleado.com` commercial website  
**Parent roadmap:** `docs/SEO_GEO_FULL_OPTIMIZATION_ROADMAP.md`  
**Ownership map:** `docs/SEO_GEO_CONTENT_OWNERSHIP.md`

## Purpose

Phase 7 is the permanent measurement and optimization loop after the one-time SEO/GEO cleanup. This baseline establishes what can be measured today, which canonical owners must be watched first, and the rules for turning future Search Console / Semrush evidence into changes without reintroducing cannibalization.

## Source availability at baseline

### Semrush domain visibility

A current Spain (`es`) domain-rank request for `iaempleado.com` returned **no domain data** on 2026-10-17. This means Semrush does not yet expose a measurable domain-level ranking baseline for the site; it must not be interpreted as proof of zero Google rankings.

### Semrush projects

The connected Semrush account currently has projects for:

- `amueblateonline.com`
- `duermeteonline.com`
- `barcelonaconfort.cat`

There is **no Semrush project for `iaempleado.com` yet**, so Position Tracking and Site Audit project reports are not available for IA Empleado through the current Semrush connection.

### Search Console

Search Console query/page data is not available to this execution context at baseline. No impressions, clicks, CTR or average-position metrics are invented. Once Search Console data is connected, it becomes the primary source for real query-to-landing-page ownership and CTR decisions.

## Priority watchlist — Spain

These are existing canonical owners and their current Semrush keyword-demand signals. They are measurement targets, not instructions to repeat exact-match phrases mechanically.

| Priority | Keyword | Volume/mo | KD | Canonical owner / role |
| --- | --- | ---: | ---: | --- |
| P0 | automatización de procesos | 1,300 | 32 | `/automatizacion-procesos-empresariales-ia` |
| P0 | proceso de onboarding | 320 | 19 | onboarding informational guide |
| P0 | nota de gastos | 320 | 19 | expense informational guide |
| P0 | ia para contabilidad | 210 | 46 | `/empleados-ia/contabilidad-facturacion` |
| P0 | onboarding de empleados | 210 | 14 | `/automatizacion-onboarding-empleados-ia` |
| P0 | agentes ia para empresas | 170 | 30 | `/` |
| P0 | automatización de facturas | 170 | 25 | `/automatizacion-facturas-ia-empresas` |
| P1 | agentes ia atención al cliente | 140 | 11 | `/empleados-ia/atencion-cliente` |
| P1 | gestión de ausencias | 140 | 21 | leave-management commercial cluster support term |
| P1 | automatizar procesos con ia | 140 | 40 | business-process automation support guide |
| P1 | gestión de vacaciones | 110 | 12 | `/automatizacion-vacaciones-ausencias-ia` |
| P1 | gestión de gastos | 90 | 46 | `/automatizacion-gestion-gastos-ia` |
| P1 | automatización de pedidos | 70 | 12 | `/automatizacion-pedidos-ventas-ia-erp` |
| P1 | agente ia ventas | 50 | 19 | `/empleados-ia/comercial-sdr` |
| P1 | automatizar pedidos | 50 | 10 | sales-order informational guide |
| P2 | agente ia administrativo | 30 | 0 | `/empleados-ia/administrativo` |
| P2 | automatización contable | 30 | 0 | `/automatizacion-facturacion-contabilidad-ia` |
| P2 | equipo ia | 30 | 0 | `/equipos-ia` |
| P2 | validación de facturas | 10 | 0 | `/casos-de-uso/validacion-facturas` |

## Priority watchlist — UK / English

| Priority | Keyword | Volume/mo | KD | Canonical owner / role |
| --- | --- | ---: | ---: | --- |
| P0 | business process automation | 1,300 | 53 | EN business-process commercial owner |
| P0 | invoice automation | 720 | 39 | EN invoice-automation commercial owner |
| P0 | leave management | 720 | 11 | EN leave-management commercial owner |
| P0 | accounting automation | 590 | 34 | EN accounting-process commercial owner |
| P0 | ai for accounting | 390 | 63 | EN accounting employee role |
| P0 | ai sdr | 390 | 57 | EN sales/SDR employee role |
| P0 | employee onboarding process | 390 | 43 | EN onboarding informational owner |
| P1 | automate business processes | 210 | 32 | EN process-automation support guide |
| P1 | ai agents for business | 170 | 38 | EN Home |
| P1 | ai customer service agent | 140 | 47 | EN customer-service employee role |
| P1 | sales order automation | 140 | 13 | EN sales-order commercial owner |
| P1 | expense management automation | 140 | 22 | EN expense commercial owner |
| P1 | invoice validation | 110 | 14 | EN invoice-validation use case |
| P1 | employee onboarding automation | 70 | 0 | EN onboarding commercial owner |
| P1 | ai teams | 70 | 0 | EN team hub |
| P2 | expense management process | 40 | 0 | EN expense informational owner |
| P2 | automate order processing | 20 | 0 | EN sales-order informational owner |
| P2 | ai administrative assistant | 10 | 0 | EN administrative employee role |

## Operating thresholds

When Search Console / position data becomes available, use these default triggers:

1. **Positions 4–10 + meaningful impressions:** prioritize title/meta, answer completeness, internal links and SERP-fit improvements before creating content.
2. **Positions 11–30 + validated owner:** expand the existing canonical owner around missing subtopics/entities/questions and strengthen relevant internal links.
3. **Multiple URLs receiving impressions for the same primary query:** investigate cannibalization before any expansion; keep one canonical owner and merge/reposition supporting surfaces where needed.
4. **High impressions + weak CTR:** test title/meta/search-intent alignment without changing the canonical owner unless evidence proves intent mismatch.
5. **No impressions after sufficient crawl/index time:** verify indexability, internal discovery, intent match and competitive fit before concluding the topic lacks demand.
6. **New keyword opportunity:** create a new URL only if the intent is materially distinct and no existing owner can legitimately capture it.

## Reporting cadence

### Daily

- consume new Search Console/Semrush evidence when available;
- check for clear ownership drift or a high-impact optimization opportunity;
- improve an existing canonical owner first;
- do not create a URL merely to satisfy publishing cadence.

### Weekly

- review top gaining and losing queries/pages;
- review positions 4–30;
- review high-impression / low-CTR pages;
- check for new query-level cannibalization;
- refresh the priority backlog.

### Monthly

- re-run keyword-demand checks for the core watchlist;
- review content decay and stale examples/evidence;
- review internal-link graph changes;
- re-run technical crawl / project Site Audit when a Semrush project exists;
- record material ownership changes in `docs/SEO_GEO_CONTENT_OWNERSHIP.md`.

## Immediate Phase 7 backlog

1. Connect a Search Console-readable data source for `iaempleado.com` and establish query/page baseline.
2. Create a Semrush project for `iaempleado.com` with Position Tracking and Site Audit when account capacity allows.
3. Once first-party query data exists, map the top real queries to the canonical ownership table and flag positions 4–30.
4. Optimize only the highest-evidence existing owner per batch; preserve the one-intent / one-owner rule.
5. Keep this document as the dated baseline; later measurement snapshots should be appended or versioned rather than rewriting history.

## Baseline conclusion

The one-time SEO/GEO cleanup is complete. The website now has a governed canonical architecture and a measurable keyword watchlist. At this baseline, the limiting factor is **external visibility data availability**, not an unresolved content or technical-cleanup backlog.

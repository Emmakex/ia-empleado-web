# IA Empleado — SEO/GEO Content Ownership Map

**Status:** active implementation companion  
**Canonical editorial policy:** `Emmakex/ia-empleado/docs/EDITORIAL_SEO_GEO_GUIDE.md`  
**Scope:** `iaempleado.com` public content  
**Baseline:** 2026-10-15, Spain-first demand research with ES/EN parity

## Purpose

This file translates the master editorial guide into an implementation map for the commercial website. It exists to prevent keyword cannibalisation, thin daily publishing and disconnected content growth.

Every indexable URL must have one primary intent owner. Supporting pages may use semantic variants, but they must not compete for the same primary query with the same search intent.

## Current canonical ownership

| Surface | Primary ES intent | Primary EN intent | Role |
| --- | --- | --- | --- |
| `/` | `agentes IA para empresas`; `IA para empresas` | `ai agents for business` | commercial pillar + brand |
| `/empleados-ia` | `empleados IA para empresas`; catálogo de empleados IA | AI Employee catalog | catalog pillar |
| `/empleados-ia/atencion-cliente` | `agentes ia atención al cliente` | `ai customer service agent` | employee landing |
| `/empleados-ia/administrativo` | `agente ia administrativo` | `ai administrative assistant` | employee landing |
| `/empleados-ia/contabilidad-facturacion` | `ia para contabilidad` | `ai for accounting` | employee landing |
| `/empleados-ia/comercial-sdr` | `agente ia ventas` | `ai sdr` | employee landing |
| `/equipos-ia` | Equipo IA como composición coordinada | `ai teams` / AI Team composition | team catalog/evaluation |
| `/equipos-ia/ventas` | Equipo IA de Ventas como composición multirol | `ai sales team` | team evaluation |
| `/equipos-ia/ecommerce` | Equipo IA de Ecommerce | AI ecommerce team composition | team evaluation |
| `/equipos-ia/administracion` | Equipo IA de Administración | AI administration team composition | team evaluation |
| `/equipos-ia/turismo` | Equipo IA de Turismo | AI travel team composition | team evaluation |
| `/empleados-ia-para-pymes` | IA para pymes / empleados IA para pymes | AI Employees for small business | commercial landing |
| `/automatizacion-atencion-cliente-ia` | automatización de atención al cliente con IA | AI customer service automation | commercial landing |
| `/automatizacion-facturacion-contabilidad-ia` | `automatización contable` | `accounting automation` | broad accounting process landing |
| `/blog/como-automatizar-facturacion-contabilidad-con-ia-y-revision-humana` | `automatizar contabilidad` | `how to automate accounting` | broad accounting how-to guide |
| `/automatizacion-facturas-ia-empresas` | `automatización de facturas` | `invoice automation` | invoice-processing commercial landing |
| `/blog/como-automatizar-procesamiento-facturas-ia` | `cómo automatizar facturas con IA` | `how to automate invoice processing` | invoice-processing how-to guide |
| `/casos-de-uso/validacion-facturas` | `validación de facturas` | `invoice validation` | bounded use-case evaluation |
| `/blog/**` | informational support for a distinct commercial owner | informational support | support content |
| `/casos-de-uso/**` | specific business use-case intent | specific use-case intent | evaluation |
| `/sectores/**` | sector-specific AI automation intent | industry-specific AI automation intent | evaluation |
| `/integraciones/**` | system/integration intent | system/integration intent | evaluation |
| `/comparativas/**` | comparison/evaluation intent | comparison/evaluation intent | comparison |

### Phase 1 researched role vocabulary

Research captured on 2026-10-15 and implemented through `lib/core-seo-intents.ts`:

- Atención al cliente: ES `agentes ia atención al cliente` 140 searches/month, KD 11; EN/UK `ai customer service agent` 140, KD 47.
- Administrativo: ES `agente ia administrativo` 30; EN/UK `ai administrative assistant` 10.
- Contabilidad/facturación role: ES `ia para contabilidad` 210, KD 46 and `ia contable` 110, KD 50; EN/UK `ai for accounting` 390, KD 63 and `ai accountant` 1,000, KD 47.
- Ventas/SDR: ES `agente ia ventas` 50, KD 19 and `ia para ventas` 50, KD 37; EN/UK `ai sdr` 390, KD 57 and `ai sales agent` 210, KD 47.
- Home: ES `agentes ia para empresas` 170, KD 30; EN/UK `ai agents for business` 170, KD 38.

These terms are acquisition vocabulary, not permission to repeat exact-match phrases mechanically in every heading or link.

### Phase 2 accounting and invoice ownership

The accounting cluster is deliberately split by intent instead of forcing accounting, invoices and validation into one URL:

- **Role owner:** `/empleados-ia/contabilidad-facturacion` keeps `ia para contabilidad` / `ai for accounting`. It explains the specialised role, authority boundaries and responsibilities.
- **Broad accounting commercial owner:** `/automatizacion-facturacion-contabilidad-ia` keeps `automatización contable` / `accounting automation`. Semrush reports ES `automatizacion contable` 110/month, KD 25; UK `accounting automation` 590/month, KD 34 and `automated accounting` 170/month, KD 19.
- **Broad accounting informational owner:** `/blog/como-automatizar-facturacion-contabilidad-con-ia-y-revision-humana` keeps `automatizar contabilidad` / `how to automate accounting`. Semrush reports ES 30/month for `automatizar contabilidad`; UK 30/month for `how to automate accounting` and 70/month for `automate accounting`.
- **Invoice-processing commercial owner:** `/automatizacion-facturas-ia-empresas` keeps `automatización de facturas` / `invoice automation`. Supporting demand includes ES `automatización de facturas` 170/month, `automatización de cuentas por pagar` 90/month and `procesamiento de facturas` 50/month; UK `invoice automation` 720/month, `automated invoice processing` 1,000/month, `invoice processing automation` 320/month and `accounts payable automation` 1,300/month.
- **Invoice-processing informational owner:** `/blog/como-automatizar-procesamiento-facturas-ia` keeps the invoice implementation/how-to intent. Exact Spanish how-to variants had no meaningful reported volume, while UK `how to automate invoice processing` reports 110/month, KD 46 and `automate invoice processing` 210/month, KD 49.
- **Use-case owner:** `/casos-de-uso/validacion-facturas` stays narrow around invoice validation instead of competing for broad accounting or invoice-automation demand. Semrush ES reports 10–20/month for accented/unaccented `validación de facturas`; UK reports 110/month for `invoice validation`, KD 14.

These owners must link contextually across role → broad process → invoice process → bounded validation where relevant. Supporting vocabulary cannot silently reassign exact category ownership to another page.

## High-value demand vocabulary

The homepage and major pillars should naturally explain the product using the language the market uses, while preserving **IA Empleado / Empleado IA** as owned product terminology.

Current ES research priorities include:

- `agentes IA`
- `agentes IA para empresas`
- `IA para empresas`
- `inteligencia artificial para empresas`
- `automatización con IA`
- `automatización de procesos`
- `automatizar procesos con IA`
- `IA para pymes`
- function-specific queries such as customer support, administration, accounting, billing and sales

Do not force all of these terms onto every page. The ownership table determines which page is allowed to lead with which intent.

## Existing-content optimization rules

Existing content should be handled in this order:

1. **KEEP** — useful, differentiated and already owns a clear intent.
2. **EXPAND** — good intent but missing semantic coverage, direct answers, internal links or conversion context.
3. **REPOSITION** — useful content is aimed at the wrong primary query or page type.
4. **MERGE** — two URLs substantially satisfy the same intent; consolidate into the stronger owner.
5. **REDIRECT** — obsolete or merged URL with a clear replacement.
6. **NOINDEX** — useful for users but not intended to compete in organic search.

A new URL is the last option, not the default.

## Internal-link contract

Every commercial landing must link to:

- its supporting informational article where one exists;
- the relevant Employee/Team/use-case/integration surface;
- a contextual conversion action.

Every informational article must link back to its commercial intent owner and at least one relevant product or process surface.

Core role pages and Team pages must remain mutually connected through navigation, breadcrumbs, role membership and contextual related content. Anchor text should describe the destination naturally. Avoid repeating an exact-match keyword mechanically across the site.

## GEO / answer-engine contract

Important pages should make the core answer extractable without interaction:

- direct definition near the top;
- explicit job/process scope;
- systems and integrations;
- human-control boundary;
- steps/workflow;
- limitations/exceptions;
- measurable outcomes;
- concise FAQ where useful.

Critical meaning must exist in server-rendered text, not only in animation or interactive UI.

## Daily publishing gate from 2026-10-16

Daily Growth content must no longer be created simply because a day slot exists. Before publication, the work must record:

- one primary keyword per locale;
- search intent;
- content cluster;
- canonical role (`landing` or `support`);
- conversion role;
- semantic/supporting keywords;
- evidence basis (Semrush/Search Console when available plus current SERP validation);
- check against all current content for duplicate intent;
- required internal links.

If the best opportunity overlaps an existing canonical owner, **update the existing owner instead of creating a new landing/article pair**.

## Review cadence

- **Daily:** check current repository state and duplicate intent before writing.
- **Weekly:** review new pages, internal links and query movement.
- **Monthly:** Semrush/Search Console review, consolidation candidates, CTR opportunities and content decay.
- **Quarterly:** revisit the ownership map and topic architecture using new demand evidence.

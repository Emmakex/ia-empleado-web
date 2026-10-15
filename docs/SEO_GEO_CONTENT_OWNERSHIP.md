# IA Empleado — SEO/GEO Content Ownership Map

**Status:** active implementation companion  
**Canonical editorial policy:** `Emmakex/ia-empleado/docs/EDITORIAL_SEO_GEO_GUIDE.md`  
**Scope:** `iaempleado.com` public content  
**Baseline:** 2026-10-15, Spain-first demand research with ES/EN parity

## Purpose

This file translates the master editorial guide into an implementation map for the commercial website. It exists to prevent keyword cannibalisation, thin daily publishing and disconnected content growth.

Every indexable URL must have one primary intent owner. Supporting pages may use semantic variants, but they must not compete for the same primary query with the same search intent.

## Current canonical ownership

| Surface | Primary ES intent | Role |
| --- | --- | --- |
| `/` | agentes IA para empresas; IA para empresas | commercial pillar + brand |
| `/empleados-ia` | empleados IA para empresas; catálogo de empleados IA | catalog pillar |
| `/empleados-ia/atencion-cliente` | empleado/agente IA de atención al cliente | employee landing |
| `/empleados-ia/administrativo` | empleado/agente IA administrativo | employee landing |
| `/empleados-ia/contabilidad-facturacion` | IA para contabilidad y facturación | employee landing |
| `/empleados-ia/comercial-sdr` | agente IA de ventas / comercial | employee landing |
| `/empleados-ia-para-pymes` | IA para pymes / empleados IA para pymes | commercial landing |
| `/automatizacion-atencion-cliente-ia` | automatización de atención al cliente con IA | commercial landing |
| `/blog/**` | informational support for a distinct commercial owner | support content |
| `/casos-de-uso/**` | specific business use-case intent | evaluation |
| `/sectores/**` | sector-specific AI automation intent | evaluation |
| `/integraciones/**` | system/integration intent | evaluation |
| `/comparativas/**` | comparison/evaluation intent | comparison |

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

Anchor text should describe the destination naturally. Avoid repeating an exact-match keyword mechanically across the site.

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

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
| `/automatizacion-pedidos-ventas-ia-erp` | `automatización de pedidos` | `sales order automation` | sales-order commercial process landing |
| `/blog/como-automatizar-procesamiento-pedidos-b2b-ia` | `automatizar pedidos` | `how to automate order processing` | sales-order informational support guide |
| `/casos-de-uso/incidencias-pedidos` | `incidencias de pedidos` | `order exceptions` | bounded post-order use-case evaluation |
| `/automatizacion-onboarding-empleados-ia` | `onboarding de empleados` | `employee onboarding automation` | employee-onboarding commercial process landing |
| `/blog/como-automatizar-onboarding-empleados-ia` | `proceso de onboarding` | `employee onboarding process` | employee-onboarding informational support guide |
| `/automatizacion-vacaciones-ausencias-ia` | `gestión de vacaciones` | `leave management` | leave-management commercial process landing |
| `/blog/como-automatizar-vacaciones-ausencias-ia` | `planificar vacaciones empleados` | `how to manage employee absence` | leave-management informational support guide |
| `/automatizacion-gestion-gastos-ia` | `gestión de gastos` | `expense management automation` | employee-expense commercial process landing |
| `/blog/como-automatizar-gestion-gastos-ia` | `nota de gastos` | `expense management process` | employee-expense informational support guide |
| `/automatizacion-procesos-empresariales-ia` | `automatización de procesos` | `business process automation` | business-process automation commercial landing |
| `/blog/como-elegir-primer-proceso-automatizar-ia` | `automatizar procesos con ia` | `automate business processes` | business-process automation support guide |
| `/casos-de-uso/documentacion-administrativa` | `documentación administrativa` | `administrative documentation` | bounded document-processing use case |
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

### Phase 2 sales-order ownership

The sales-order cluster is split between the employee role, the process category, the implementation guide and post-order exceptions:

- **Sales/SDR role owner:** `/empleados-ia/comercial-sdr` keeps `agente ia ventas` / `ai sdr`. Its scope is prospecting, account research, qualification, CRM and follow-up. It does not own order-processing automation.
- **Sales-order commercial owner:** `/automatizacion-pedidos-ventas-ia-erp` keeps `automatización de pedidos` / `sales order automation`. Semrush reports ES 70/month, KD 12 for `automatización de pedidos`, plus 40/month, KD 10 for the unaccented variant; UK `sales order automation` reports 140/month, KD 13.
- **Sales-order informational owner:** `/blog/como-automatizar-procesamiento-pedidos-b2b-ia` keeps `automatizar pedidos` / `how to automate order processing`. Semrush reports ES `automatizar pedidos` 50/month, KD 10; UK `how to automate order processing` 10/month and `automate order processing` 20/month.
- **Post-order use-case owner:** `/casos-de-uso/incidencias-pedidos` remains narrow around `incidencias de pedidos` / `order exceptions`: stock, shipping, changes, refunds or other cases after a normal order path breaks.

The commercial landing owns intake, extraction, customer identification, SKU matching, pricing, stock, credit controls and bounded ERP creation. The role page must not absorb process-category terms, and the exception page must not compete for end-to-end order automation. The landing, guide, sales role and exception use case must link contextually to one another.

### Phase 2 employee-onboarding ownership

The onboarding cluster is split between process evaluation, process education and the administrative surfaces that support only part of the workflow:

- **Employee-onboarding commercial owner:** `/automatizacion-onboarding-empleados-ia` keeps `onboarding de empleados` / `employee onboarding automation`. Semrush reports ES `onboarding de empleados` 210/month, KD 14; `onboarding empleados` 70/month, KD 13; `onboarding automatizado` 70/month, KD 10. UK reports `employee onboarding automation` 70/month, `onboarding automation` 170/month, KD 25 and `automated employee onboarding` 110/month, KD 28.
- **Employee-onboarding informational owner:** `/blog/como-automatizar-onboarding-empleados-ia` keeps `proceso de onboarding` / `employee onboarding process`. Semrush reports ES `proceso de onboarding` 320/month, KD 19 and `proceso onboarding` 70/month, KD 21. UK reports `employee onboarding process` 390/month, KD 43, plus `how to automate employee onboarding` 20/month.
- **Administrative role:** `/empleados-ia/administrativo` remains the owner for `agente ia administrativo` / `ai administrative assistant`. It supports documentation, records and follow-up but does not own the HR/IT onboarding process.
- **Administrative-documentation use case:** `/casos-de-uso/documentacion-administrativa` stays narrow around document classification, extraction, completeness and record updates. It can support onboarding without competing for end-to-end onboarding demand.

The commercial onboarding owner must explain the complete journey from approved hire through identity, documents, equipment, access, training and day-one readiness. The guide owns process design and how-to intent. Administrative surfaces are supporting nodes only. Contextual links should make that division explicit rather than allowing `IA para recursos humanos` or generic administration language to drift between pages.

### Phase 2 leave-management ownership

The leave cluster is split between commercial process evaluation, informational planning and the administrative surfaces that support only a bounded part of the workflow:

- **Leave-management commercial owner:** `/automatizacion-vacaciones-ausencias-ia` keeps `gestión de vacaciones` / `leave management`. Semrush reports ES `gestión de vacaciones` 110/month, KD 10 and the unaccented variant 260/month, KD 12; `gestión de ausencias` remains supporting vocabulary at 140/month, KD 21. UK reports `leave management` 720/month, KD 11, `employee leave management` 210/month, KD 9 and `leave management system` 1,000/month, KD 24.
- **Leave-management informational owner:** `/blog/como-automatizar-vacaciones-ausencias-ia` keeps `planificar vacaciones empleados` / `how to manage employee absence`. Semrush reports ES `planificar vacaciones empleados` 20/month, KD 11 and `gestionar vacaciones empleados` 10/month. UK reports `how to manage employee absence` 70/month, KD 23 and `absence management process` 70/month, KD 15.
- **Administrative role:** `/empleados-ia/administrativo` can support request intake, records and follow-up but does not own leave balances, HR policy, employee rights or medical information.
- **Administrative-documentation use case:** `/casos-de-uso/documentacion-administrativa` can support forms and evidence but does not own leave policy, coverage or approval intent.

The commercial landing must own the end-to-end operational process: request, balance, policy, team coverage, approval, HRIS/payroll update and audit trail. The guide owns planning/how-to intent. Sensitive employment-rights, medical and exceptional cases remain under human responsibility. This separation prevents broad `absence management` vocabulary from turning a support role or generic document workflow into a competing HR page.

### Phase 2 expense-management ownership

The expense cluster is deliberately separated from both the broad accounting role and supplier-invoice/accounts-payable automation:

- **Expense-management commercial owner:** `/automatizacion-gestion-gastos-ia` keeps `gestión de gastos` / `expense management automation`. Semrush reports ES `gestión de gastos` 90/month, KD 46 and unaccented `gestion de gastos` 170/month, KD 36; `gestion gastos empresa` reports 110/month, KD 32. UK reports `expense management automation` 140/month, KD 22, `employee expense management` 320/month, KD 22, `expense automation` 210/month, KD 19 and `automated expense management` 90/month, KD 23.
- **Expense informational owner:** `/blog/como-automatizar-gestion-gastos-ia` keeps `nota de gastos` / `expense management process`. Semrush reports ES `nota de gastos` 320/month, KD 19 and `notas de gastos` 140/month, KD 23. UK reports `expense management process` 40/month, `automate expense management` 50/month and `expense claim process` 20/month.
- **Accounting role:** `/empleados-ia/contabilidad-facturacion` continues to own `ia para contabilidad` / `ai for accounting`. It can perform parts of the expense workflow but does not own the employee-expense category.
- **Supplier invoices:** `/automatizacion-facturas-ia-empresas` and its support guide retain invoice automation/accounts-payable intent. Employee receipts, card transactions, claims, advances and reimbursements must not silently migrate into that owner.

The expense landing owns the operational evaluation flow from receipt or card transaction through extraction, policy, approval, reconciliation and accounting handoff. The guide owns the explanatory implementation path around a note/claim. Reimbursement execution, exception approval and policy changes remain under financial authority. Contextual links should connect the expense cluster to Accounting without confusing employee expenses with supplier invoices.

### Phase 2 business-process automation ownership

The broad process-automation cluster is separated from both the Home category owner and the interactive Process Analyzer:

- **Process-automation commercial owner:** `/automatizacion-procesos-empresariales-ia` keeps `automatización de procesos` / `business process automation`. Semrush reports ES `automatización de procesos` 1,300/month, KD 32; `automatización de procesos empresariales` 210/month, KD 26; `automatización de procesos con ia` 320/month, KD 48. UK reports `business process automation` 1,300/month, KD 53; `ai business process automation` 110/month, KD 50; `process automation` 1,300/month, KD 41 and `business automation` 720/month, KD 32.
- **Process-automation informational owner:** `/blog/como-elegir-primer-proceso-automatizar-ia` keeps `automatizar procesos con ia` / `automate business processes`. Semrush reports ES `automatizar procesos con ia` 140/month, KD 40. UK reports `automate business processes` 210/month, KD 32 and `automating business processes` 170/month, KD 34.
- **Home:** `/` continues to own `agentes IA para empresas` / `IA para empresas` and the product-category proposition. It can introduce process automation as an outcome, but it must not absorb the exact process-automation category intent.
- **Process Analyzer:** `/mejora-tu-proceso` remains an interactive educational utility for inspecting a workflow. It supports evaluation but is not the canonical SEO owner for `automatización de procesos`.

The landing owns the category, solution architecture and commercial evaluation. The guide owns prioritisation and how-to implementation. The Process Analyzer is the interactive next step. This separation lets the site capture high-value process-automation demand without turning Home or the tool into competing pages.

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

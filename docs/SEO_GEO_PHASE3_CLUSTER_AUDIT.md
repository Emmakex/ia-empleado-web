# IA Empleado — Phase 3 cluster audit

**Status:** complete  
**Started:** 2026-10-16  
**Completed:** 2026-10-16  
**Scope:** sectors + use cases + departments + integrations  
**Canonical rules:** `SEO_GEO_CONTENT_OWNERSHIP.md` + `SEO_GEO_FULL_OPTIMIZATION_ROADMAP.md`

## Goal

Phase 3 audits the organizational and problem-oriented cluster pages after the Growth backlog was closed at 56/56. The objective is not to create more URLs. Every existing sector, use-case, department and integration surface must own one materially distinct search/evaluation job and must state its boundary with adjacent role, process, industry or system pages.

## Final progress

The phase contains **27 conceptual surfaces** and all are audited:

- sectors: 1 hub + 4 detail pages = **5/5**;
- use cases: 1 hub + 6 detail pages = **7/7**;
- departments: 1 hub + 6 detail pages = **7/7**;
- integrations: 1 hub + 7 detail pages = **8/8**;
- **total: 27/27 complete**;
- new indexable SEO URLs created in Phase 3: **0**;
- unresolved same-intent conflicts introduced: **0**.

## Batch 01 — sectors — 5/5

| Surface | Decision | ES owner | EN owner | Boundary |
| --- | --- | --- | --- | --- |
| Sector hub | REPOSITION | `IA por sectores` | `AI by industry` | evaluation/navigation; Home keeps broad business-AI intent |
| Ecommerce | REPOSITION | `IA para ecommerce` | `AI for ecommerce` | Growth keeps ecommerce automation; integration keeps system access |
| Turismo | REPOSITION | `IA para turismo` | `AI for travel` | Growth keeps booking automation; use case keeps bounded booking workflow |
| Servicios profesionales | KEEP | `IA para servicios profesionales` | `AI for professional services` | distinct industry evaluation; no forced broad keyword in ES |
| Ventas B2B | REPOSITION | `IA para ventas B2B` | `AI for B2B sales` | Growth keeps broad sales automation; role/department keep their jobs |

Representative Semrush evidence, 2026-10-16: ES `IA para ecommerce` 50/month, `IA turismo` 50/month, `IA para ventas B2B` 40/month; UK `AI for ecommerce` 140/month, `AI for travel` 110/month and `AI for professional services` 30/month. Exact ES professional-services variants reported no volume, so that page remains a deliberate evaluation owner rather than being forced onto a broader query.

Implementation: `lib/sector-search-optimization.ts` provides the audited view layer and both locale route families render it without changing public slugs.

## Batch 02 — use cases — 7/7

| Surface | Decision | ES owner | EN owner | Boundary |
| --- | --- | --- | --- | --- |
| Use-case hub | REPOSITION | `casos de uso IA` | `AI use cases` | bounded workflow directory, not a product/process landing |
| Incidencia de cliente | REPOSITION | `gestión de reclamaciones` | `customer issue resolution` | customer-service Growth keeps broad automation; profile keeps role intent |
| Validación de facturas | REPOSITION | `validación de facturas` | `invoice validation` | Growth keeps broad invoice/accounting automation |
| Seguimiento comercial | REPOSITION | `seguimiento de leads` | `sales follow up` | Growth keeps sales automation; Sales/SDR keeps role intent |
| Incidencias de pedidos | REPOSITION | `control de pedidos` | `order exception management` | owns exception path, not full order-management category |
| Reservas de viajes | REPOSITION | `gestión de reservas` | `travel booking management` | Growth keeps booking automation; sector keeps travel context |
| Documentación administrativa | REPOSITION | `automatización documental` | `document workflow automation` | document integration keeps system access; admin Growth remains broader |

Representative Semrush evidence: ES `gestión de incidencias` 140/month, `validación de facturas` 10–20/month, `seguimiento de leads` 40/month, `gestión de pedidos` 390/month, `gestión de reservas` 140/month and `automatización documental` 40/month. UK `invoice validation` 110/month, `sales follow up` 70/month and `document workflow automation` 320/month.

Implementation: `lib/use-case-search-optimization.ts` preserves canonical use-case records while applying audited metadata, direct answers and ownership boundaries.

## Batch 03 — departments — 7/7

Department pages own **organizational operating-model intent**: how people, agents, systems, metrics, handoffs and authority are arranged inside an area. They do not take role, process, sector or bounded-use-case queries.

| Surface | Decision | ES owner | EN owner |
| --- | --- | --- | --- |
| Department hub | REPOSITION | `IA por departamentos` | `AI by department` |
| Atención al cliente | REPOSITION | `equipo de atención al cliente con IA` | `AI-augmented customer service team` |
| Administración | REPOSITION | `departamento de administración con IA` | `AI-augmented administration team` |
| Contabilidad y facturación | REPOSITION | `departamento de contabilidad con IA` | `AI-augmented accounting team` |
| Ventas | REPOSITION | `equipo de ventas con IA` | `AI for sales teams` |
| Operaciones ecommerce | REPOSITION | `operaciones ecommerce con IA` | `AI ecommerce operations` |
| Turismo y reservas | REPOSITION | `operaciones de reservas con IA` | `AI travel operations` |

Implementation: `lib/department-search-optimization.ts` is the audited department view layer. ES/EN routes, metadata and direct answers use it while canonical slugs remain unchanged.

## Batch 04 — integrations — 8/8

Integration pages own the **system-access contract**: authoritative data, entity matching, least privilege, read/write separation, validation, fallback and auditability. A system appearing in a workflow does not make its integration page the owner of that process automation query.

| Surface | Decision | ES owner | EN owner | Boundary |
| --- | --- | --- | --- | --- |
| Integration hub | KEEP | `integraciones para empleados IA` | `AI agent integrations` | category/navigation; Growth keeps broad enterprise AI integration |
| CRM | REPOSITION | `integración CRM` | `CRM integration` | `/automatizacion-crm-ia` keeps CRM workflow automation |
| ERP | REPOSITION | `integración ERP` | `ERP integration` | `/automatizacion-erp-ia` keeps ERP workflow automation |
| Email | REPOSITION | `integración email` | `email integration` | email Growth owner keeps inbox/workflow automation |
| Calendario | REPOSITION | `integración calendario` | `calendar integration` | system availability/actions, not scheduling-process ownership |
| Ecommerce | REPOSITION | `integración ecommerce` | `ecommerce integration` | ecommerce Growth keeps operational automation |
| Ticketing | REPOSITION | `integración ticketing` | `ticketing integration` | owns case-system lifecycle and permissions |
| Gestión documental | REPOSITION | `integración gestión documental` | `document management integration` | document use case keeps workflow automation |

Representative Semrush evidence, 2026-10-16:

- CRM: ES `integración CRM` 70/month, KD 22; UK `CRM integration` 880/month, KD 37.
- ERP: ES `integración ERP` 50/month plus `integracion ERP` 390/month; UK `ERP integration` 590/month, KD 33.
- Email: ES `integración email` 50/month; UK `email integration` 50/month.
- Calendar: ES 10–20/month; UK `calendar integration` 390/month, KD 29.
- Ecommerce: ES 20–30/month; UK `ecommerce integration` 260/month, KD 29.
- Ticketing: ES `integración ticketing` 20/month; UK `ticketing integration` 110/month, KD 23.
- Document management: ES `integración gestión documental` 20/month; UK `document management integration` 50/month, KD 21.

Implementation: `lib/integration-seo-intents.ts` derives optimized integration records from the canonical organization map. Both detail route families and the integration hub render the audited layer; canonical, hreflang, breadcrumbs, schema and public URLs are preserved.

## Phase 3 exit gate

Phase 3 is complete because every one of the 27 cluster surfaces now has a deliberate owner or retained category job, each family states its boundary with adjacent content, ES and EN rationale is recorded, and no new search URL was required.

**Next:** Phase 4 — comparison and decision-stage content. The historical chatbot/RPA duplicates were already consolidated in Phase 2; Phase 4 now audits the dedicated comparison hub + five comparison pages themselves.

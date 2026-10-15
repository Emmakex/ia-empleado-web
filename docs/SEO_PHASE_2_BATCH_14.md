# Phase 2 — Batch 14: Human in the loop and AI approval workflows

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the historical Day 20 pair. It keeps the existing URLs and separates three related but different jobs: broad AI governance, the human-in-the-loop operational control pattern, and implementation of approval workflows.

## Intent ownership

- Broad governance: `/gobernanza-ia-empresas` / `/en/enterprise-ai-governance` → `gobernanza de ia` / `ai governance`.
- Operational control pattern: `/automatizacion-ia-supervision-humana-empresas` / `/en/human-in-the-loop-ai-automation-business` → `human in the loop` / `human in the loop ai`.
- Implementation guide: `/blog/como-disenar-flujos-aprobacion-empleados-ia` / `/en/blog/how-to-design-approval-workflows-for-ai-employees` → `flujo de aprobación` / `approval workflow`.

The HITL landing does not become another governance page. It owns the bounded pattern of when and how a person intervenes in an automated workflow. The guide does not compete for the HITL category query; it owns how to design the approval mechanism itself.

## Demand evidence

Semrush ES, 2026-10-15:

- `human in the loop`: 480/month, KD 64.
- `HITL`: 480/month, KD 33.
- `human-in-the-loop`: 210/month, KD 49.
- `human in loop`: 70/month, KD 42.
- `supervision humana ia`: 20/month.
- `humano en el bucle`: 10/month.
- `flujo de aprobación`: 10/month.
- `flujo de aprobacion`: 20/month.
- `flujos de aprobacion`: 10/month.
- `proceso de aprobación`: 20/month.
- `proceso de aprobacion`: 10/month.

The Spanish market clearly searches the English HITL terminology more than literal translations, so the landing uses `Human in the loop (HITL)` visibly while explaining it in Spanish.

Semrush UK, 2026-10-15:

- `human in the loop`: 880/month, KD 64.
- `human in the loop ai`: 170/month, KD 53.
- `human-in-the-loop ai`: 30/month, KD 53.
- `HITL AI`: 70/month.
- `human oversight ai`: 20/month.
- `human oversight of ai`: 20/month.
- `human review ai`: 20/month.
- `approval workflow`: 110/month, KD 27.
- `approval workflows`: 70/month.
- `workflow approval`: 40/month.
- `approval process`: 110/month, KD 30.
- `automated approval workflow`: 20/month.

## Before → After

### Human-in-the-loop landing

**Before**

- The Spanish framing focused on `IA con supervisión humana`, a natural phrase but one with little measurable demand.
- The page explained approvals and autonomy well, but did not explicitly define HITL for answer engines.
- Its boundary versus the broader AI-governance page was implicit.

**After**

- Primary ownership is ES `human in the loop` and EN `human in the loop ai`.
- Title, H1 and eyebrow expose the established `Human in the loop (HITL)` vocabulary while retaining Spanish explanation.
- The lead opens with an extractable GEO definition: HITL is an automation pattern where a person intervenes at defined points when risk, impact, uncertainty or reversibility cross explicit thresholds.
- The copy states that HITL is an operational control inside AI governance, not a replacement for governance.
- Existing URL and ES/EN canonical parity are preserved.

### Approval-workflow guide

**Before**

- The guide was branded around approval flows for `Empleados IA` and already contained strong practical implementation material.
- Search ownership versus the HITL landing and governance page was not explicit.

**After**

- Primary ownership is ES `flujo de aprobación` and EN `approval workflow`.
- Metadata, H1, excerpt and intro are repositioned around the implementation task rather than the broad oversight pattern.
- The intro explicitly separates preparation, approval and execution and identifies the three canonical jobs: approval-workflow implementation, HITL pattern and broad governance.
- Existing landing ↔ guide relationship and URLs remain unchanged.

## Decision

| Historical record | Decision | Canonical job |
| --- | --- | --- |
| `human-in-the-loop-ai-automation` | **REPOSITION** | operational/evaluation owner for HITL and human oversight in AI automation |
| `design-ai-approval-workflows` | **REPOSITION** | informational implementation owner for AI approval workflows |

No new indexable URL, redirect, merge or noindex action is introduced.

## Audit progress

The reconciled historical Growth audit moves from **33 / 56** to **35 / 56** explicit decisions. **21** historical records remain. New search-intent URLs created in this batch: **0**.

## Verification contract

Playwright regression coverage checks ES/EN status, optimized titles and H1s, canonical preservation, direct-answer language and reciprocal landing ↔ guide links. Runtime loading is covered by the Web build because the new Phase 4 override registry is imported by `lib/growth-content.ts`.

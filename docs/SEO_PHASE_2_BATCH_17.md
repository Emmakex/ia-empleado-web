# Phase 2 — Batch 17: AI pilot and pilot project

Date: 2026-10-16

This batch audits the historical Day 23 AI-pilot pair. The existing URLs remain indexable and keep their accumulated history; the search framing moves from the owned phrase `Empleado IA` toward market-language `AI pilot` / `piloto IA` demand.

## Intent ownership

- Commercial/evaluation owner: `/piloto-empleado-ia-empresa` → `piloto ia` / `ai pilot`.
- Informational/implementation owner: `/blog/como-lanzar-piloto-empleado-ia-empresa` → `proyecto piloto de ia` / `ai pilot project`.
- Business-process automation remains the owner for the broader question of which processes can be automated with AI.
- The pilot cluster owns the controlled validation stage: baseline, bounded scope, integrations, oversight, metrics and the decision to scale, adjust or stop.

The English URLs remain:

- `/en/ai-employee-pilot-business`.
- `/en/blog/how-to-run-ai-employee-pilot-business`.

## Demand evidence

Semrush ES, 2026-10-16:

- `piloto ia`: 20 searches/month, CPC 0.77.
- `piloto inteligencia artificial`: 20/month.
- `implementación ia empresa`: 50/month, KD 34.
- `escalar ia`: 20/month.
- `escalado ia`: 20/month.
- More specific `proyecto piloto IA` and `prueba de concepto IA` variants did not return reported Spanish volume in the queried database.

Semrush UK, 2026-10-16:

- `ai pilot`: 880/month, KD 64.
- `artificial intelligence pilot`: 480/month, KD 56.
- `ai pilot project`: 10/month.
- `ai proof of concept`: 30/month.
- `ai poc`: 30/month.
- `scaling ai`: 30/month.
- `ai rollout`: 20/month.

The very broad `scale ai` result was not adopted as a target because its intent is ambiguous and does not by itself prove demand for the pilot-to-production decision.

## Before → After

### Landing

Before:

- SEO title and H1 centered `Piloto de Empleado IA`.
- The content already had a strong bounded-pilot methodology but did not clearly own the broader AI-pilot category.

After:

- ES H1: `Piloto de IA para empresas: valida valor, seguridad y encaje operativo antes de escalar.`
- EN H1: `AI pilot for business: validate value, safety and operational fit before scaling.`
- The lead now gives an extractable definition: a controlled test on a real workflow, between an isolated demo and full deployment, with baseline, scope, permissions, oversight, metrics and exit criteria.
- Existing canonical URLs are preserved.

### Guide

Before:

- The article was framed as `Cómo lanzar un piloto de Empleado IA`.
- It already described a practical sequence but did not explicitly separate project/how-to intent from the category landing.

After:

- ES H1: `Cómo lanzar un proyecto piloto de IA y decidir si merece escalar`.
- EN H1: `How to run an AI pilot project and decide whether it should scale`.
- The intro explicitly assigns implementation intent to the guide and category/evaluation intent to the landing.
- It also distinguishes the pilot from the broader process-automation category.
- Existing canonical URLs and reciprocal landing ↔ guide links are preserved.

## Editorial metadata and runtime

Both records are updated on 2026-10-16, so they include the mandatory editorial metadata: primary keywords, supporting keywords, search intent, cluster, canonical role, conversion role and research basis.

A new `seo-overrides-phase6.json` layer contains the researched Day 23 overrides. The Growth runtime and checker both load this layer, preserving the same validation contract used by previous historical optimization batches.

## Audit decision

| Historical record | Decision | Canonical job |
| --- | --- | --- |
| Day 23 landing `ai-employee-pilot` | **REPOSITION** | AI-pilot category/evaluation |
| Day 23 article `how-to-run-ai-employee-pilot` | **REPOSITION** | AI-pilot project implementation/how-to |

No new indexable SEO URL, merge, redirect or noindex action is introduced.

## Progress

Batch 16 brings the reconciled audit to **39 / 56** historical records. Batch 17 adds two more, reaching **41 / 56**, with **15 remaining**.

The remaining work is now concentrated in earlier role, integration and sector/process pairs. These should be audited by overlap risk against the dedicated product architecture rather than by publication date alone.

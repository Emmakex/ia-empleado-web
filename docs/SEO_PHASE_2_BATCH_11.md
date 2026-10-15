# Phase 2 — Batch 11: Data readiness and data quality for AI

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the historical Day 17 data-readiness pair. It keeps both public URLs and separates evaluation/category intent from implementation/how-to intent.

## Decision

| Existing owner | Decision | ES primary intent | EN primary intent |
| --- | --- | --- | --- |
| `/preparacion-datos-empresa-ia` | **REPOSITION** | `calidad de datos para IA` | `data readiness for ai` |
| `/blog/checklist-preparacion-datos-antes-conectar-ia` | **REPOSITION** | `mejorar la calidad de los datos` | `prepare data for ai` |

No new indexable URL, merge, redirect or noindex action is introduced.

## Why the old framing needed repositioning

The Day 17 pair was written around the owned wording `preparación de datos para IA`. In Spain, that exact category has little measurable demand, while the market uses broader data-quality language. The content itself is useful, so deleting it or creating another landing would waste an existing owner and create unnecessary cannibalisation.

The landing is therefore the commercial/evaluation owner for whether company data is sufficiently reliable and governed for an AI-enabled workflow. The article owns the practical job of improving and checking the dataset before connecting an AI agent to business systems.

`gobierno del dato` / `data governance` remains supporting context, not the primary owner of either URL. Governance is broader than readiness for one operational AI workflow and should not be silently absorbed into this pair.

## Semrush evidence — Spain

Research captured on 2026-10-15:

- `calidad de datos`: **110 searches/month**, KD **22**;
- `calidad del dato`: **70**, KD **19**;
- `calidad de los datos`: **40**, KD **19**;
- `mejorar la calidad de los datos`: **90**, KD **13**;
- `estrategia de calidad de datos`: **40**, KD **11**;
- `métodos de prueba de calidad de datos`: **70**, KD **16**;
- `preparacion de datos`: **20**;
- `gobierno del dato`: **320**, KD **27**;
- `gobierno de datos`: **70**, KD **26**;
- `gestión de datos`: **140**, KD **17**.

Semrush returned no reported volume for the exact phrase `calidad de datos para IA`. The landing uses that precise modifier because it describes the product job accurately, while its supporting vocabulary is grounded in measured category demand. No exact-volume claim is invented.

## Semrush evidence — UK/English

Research captured on 2026-10-15:

- `data readiness for ai`: **70 searches/month**, CPC **30.74**;
- `ai data readiness`: **50**, CPC **21.77**;
- `data quality`: **1,300**, KD **40**;
- `data quality for ai`: **20**;
- `ai data quality`: **50**;
- `prepare data for ai`: **20**, CPC **17.67**;
- `ai readiness`: **210**, KD **46**;
- `data governance`: **2,400**, KD **47**;
- `enterprise data`: **110**, KD **22**;
- `data quality metrics`: **260**, KD **29**;
- `data quality standards`: **90**, KD **26**.

## Before → after

### Commercial landing

**Before**
- title/H1 centered on generic `preparación de datos`;
- useful operational content but weak alignment with how the market describes the problem;
- category boundary against generic data governance was implicit.

**After**
- title/H1 lead with `calidad de datos para IA` / `data readiness for AI`;
- the lead gives an extractable GEO answer: required data, source of truth, reliability, permissions, missing/conflicting values, traceability and human review;
- the page explicitly says the goal is the minimum reliable dataset for the chosen workflow, not an enterprise-wide cleanup;
- existing slugs and canonical URLs are preserved.

### Supporting guide

**Before**
- checklist wording centered on preparation but without a researched primary how-to query;
- informational intent was close to the landing's framing.

**After**
- ES owner becomes `mejorar la calidad de los datos`;
- EN owner becomes `prepare data for ai`;
- title, description, H1, excerpt and intro explicitly own preparation/testing methodology;
- the intro states that the landing retains evaluation intent while the article owns implementation guidance;
- landing ↔ guide reciprocal links remain intact.

## Implementation

- Added `content/growth/seo-overrides-phase3.json` for the Day 17 pair.
- Updated `lib/growth-content.ts` so runtime loads base, Phase 2 and Phase 3 SEO override registries together.
- Fixed a governance gap in `scripts/check-growth-content.mjs`: the checker previously validated only `seo-overrides.json` even though runtime also consumed `seo-overrides-phase2.json`. It now validates all three registries as one effective override set.
- Added Playwright coverage for ES/EN titles, H1s, canonical URLs, direct-answer text and reciprocal landing/guide ownership.

## Audit progress

Historical Growth inventory remains **56 records**. Reconciled progress after the completed batches is:

- Batches 01–04: **15** records;
- Batch 05: **+4** historical Growth records;
- Batch 06: **+2**;
- Batch 07: **+2**;
- Batch 08: **+2**;
- Batch 09: **+2**;
- Batch 10: refinement of the already-audited Day 16 pair, **+0 new audited records**;
- Batch 11: Day 17 landing + guide, **+2**.

Total after Batch 11: **29 / 56 audited**, **27 remaining**. New search-intent URLs created in Phase 2 remain **0**.

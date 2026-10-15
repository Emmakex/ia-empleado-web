# Phase 2 — Batch 12: AI governance

Date: 2026-10-15

This batch applies the existing-content-first SEO/GEO policy to the historical Day 18 AI-governance pair. Both public URLs remain useful, but they are split more explicitly between category/evaluation intent and implementation/framework intent.

## Intent ownership

- Commercial/evaluation landing: `/gobernanza-ia-empresas` → `gobernanza de ia` / `ai governance`.
- Informational implementation guide: `/blog/checklist-gobernanza-ia-empresas` → `implementación de gobernanza de ia` / `ai governance framework`.
- `ia responsable` / `responsible ai` and `ai risk management` remain supporting concepts rather than replacement owners.
- Data governance remains distinct from AI governance. The Day 17 data-readiness cluster owns data quality/readiness for a workflow; this Day 18 cluster owns authority, permissions, policy, controls, risk and accountability for AI operation.

## Demand evidence

Semrush ES, 2026-10-15:

- `gobernanza de ia`: **50 searches/month**;
- `gobernanza de la ia`: **30**;
- `gobernanza ia`: **20**;
- `gobierno de ia`: **20**;
- `gobierno de la inteligencia artificial`: **10**;
- `gobernanza de inteligencia artificial`: **10**;
- `gobernanza de la inteligencia artificial empresas`: **40**;
- `implementación de gobernanza de ia`: **50**, KD **17**;
- `política ia`: **40**, KD **10**; unaccented `politica ia`: **50**, KD **14**;
- `ia responsable`: **170**, KD **37**;
- `inteligencia artificial responsable`: **40**.

Semrush UK, 2026-10-15:

- `ai governance`: **1,600/month**, KD **34**;
- `artificial intelligence governance`: **390**, KD **43**;
- `enterprise ai governance`: **70**;
- `ai governance framework`: **390**, KD **28**;
- `ai governance policy`: **110**, KD **37**;
- `responsible ai governance`: **110**, KD **59**;
- `responsible ai`: **720**, KD **68**;
- `ai risk management`: **320**, KD **57**;
- `ai governance checklist`: **40**;
- `ai governance framework template`: **20**.

## Before → after

### Governance landing

**Before:** the page already described enterprise governance well, but its H1 and metadata were more product-specific and did not give the category a concise extractable definition near the top.

**After:** the landing explicitly owns `gobernanza de ia` / `ai governance`. The direct answer defines governance as responsibilities, permissions, policies, controls and evidence; it explains data access, action authority, approval, stop conditions, traceability and human accountability. The existing URL and canonical are preserved.

### Governance guide

**Before:** the checklist was strong operationally but shared almost the same category framing as the landing.

**After:** the guide owns implementation/framework intent. ES leads with `implementación de gobernanza de ia`; EN leads with `ai governance framework`. The introduction explicitly states that the guide translates principles into verifiable controls while the landing remains the category/evaluation owner.

## Implementation

- Extended `content/growth/seo-overrides-phase3.json` with the Day 18 landing and article.
- Preserved the existing ES/EN slugs, canonical URLs and landing ↔ guide relationship.
- Added Playwright regression coverage for ES/EN title, H1, canonical, direct-answer text and reciprocal links.
- No new indexable URL, merge, redirect or noindex action is introduced.

## Audit progress

- Previous reconciled progress after Batch 11: **29 / 56** historical Growth records.
- Batch 12 audits the Day 18 landing + guide: **+2**.
- Total after Batch 12: **31 / 56 audited**.
- Remaining: **25**.
- New search-intent URLs created in Phase 2: **0**.

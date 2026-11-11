# IA Empleado — Phase 7 evidence checkpoint (2026-11-11)

**Scope:** commercial `iaempleado.com` only (`Emmakex/ia-empleado-web`).

## Operational state

- SEO/GEO existing-content optimization has its own daily scheduler at 08:00 Europe/Madrid. It must not create Growth URLs.
- Proactive Growth discovery/publishing has a separate daily scheduler at 15:00 Europe/Madrid. New ES/EN URLs require distinct intent, product truth, editorial metadata, owner uniqueness and a green PR.
- A successful task execution does **not** prove that a publication was deployed. Every release has to be checked against the new/changed records, not only the latest editorial date.

## External evidence checked on 2026-11-11

1. The existing Kairoseth-hosted Search Console bridge context in [issue #532](https://github.com/Emmakex/kairoseth-platform/issues/532), generated **2026-11-10T13:04:38Z**, reports `https://iaempleado.com/` with `status: success`, `activeHighCount: 1` and `activeCount: 1`. This is a **bridge processing status**, not a published GSC clicks/impressions/CTR/position table.
2. The IA Empleado opportunity in that bridge has `seoRunId: SEO-20261020-E75E6EB2`, `key: ai order processing`, `executionPolicy: REVIEW`, `action: expand_existing_owner` and `targetRepository: Emmakex/ia-empleado-web`. Do **not** promote it to AUTO, create a new URL or change a canonical merely because it is marked accepted.
3. Semrush domain-rank and organic-keyword queries for `iaempleado.com`, market `es`, returned **no_data** on 2026-11-11. This does **not** imply zero rankings or traffic. Existing historical Semrush watchlist demand is discovery evidence, not current site-performance evidence.
4. The bridge has cached demand observations for `ai order management` and `automated purchase orders`, but their relevance to Spanish purchase-order vs sales-order intent must be reviewed against the existing owners. No rankings/CTR are claimed.

## Next measurement acceptance gates

- Obtain **query × landing page** performance records from Search Console for `iaempleado.com` (date range, clicks, impressions, CTR, average position). Use primary owner mapping from `docs/SEO_GEO_CONTENT_OWNERSHIP.md` and preserve the source snapshot date.
- Segment Spain/English queries by intent and canonical owner; inspect positions 4–10 and 11–30, high-impression/low-CTR, and multiple-owner overlap before editing.
- Track leads and relevant on-site CRO events separately from SEO exposure; do not report traffic or business conversions by inference.
- Use Semrush only for market/category enrichment while there is no measurable `iaempleado.com` domain report. Do not create or assume a paid Semrush project.

## Production release-specific certification

`scripts/verify-growth-production.mjs` now reads the exact prior/current Git commit diff to identify new or modified Growth records, including a backdated daily file. For each resulting **ES/EN** URL it must check:

1. the exact `<loc>` in the public `growth-sitemap.xml`;
2. the three `hreflang` alternate entries for that URL;
3. a successful HTTP response with server-rendered HTML, `<h1>` and expected visible editorial text;
4. the exact canonical URL in HTML.

If the Git release diff cannot be inspected, the verifier labels its latest-record check **fallback** and never calls that release-specific certification. This verifies deploy visibility, **not Google indexation**. Any network-restricted local environment must report production as unverified rather than marking it green.

## Decision log

- **KEEP/REVIEW** existing `ai order processing` owner pending current Search Console query/page evidence and intent review; do not add a conflicting purchase-order or sales-order page.
- **Fix technical verification** in one scoped PR with regression tests. After CI exact-head and merge, confirm Production Verification/Hostinger before claiming production certification.

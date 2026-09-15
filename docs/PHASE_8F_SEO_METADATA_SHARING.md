# Phase 8F — SEO, Metadata & Sharing

## Status

**COMPLETE — closed on 2026-09-15 after exact-marker Production Verification #49. Phase 8G is the next gate.**

Phase 8F finalizes how the public IA Empleado website is discovered, indexed, canonicalized, translated and shared. It preserves the bilingual commercial architecture while making SEO behavior explicit and testable rather than relying on inherited Next.js defaults.

## Entry state

The repository entered Phase 8F with a useful SEO foundation:

- ES and EN root layouts define `metadataBase` for `https://iaempleado.com`;
- Home metadata includes title, description, canonical URL, ES/EN/x-default alternates, Open Graph, Twitter card and index/follow policy;
- representative commercial routes such as Team Builder define route-specific title, description, canonical, alternates and social preview metadata;
- `app/sitemap.ts` generates the bilingual public route inventory, including dynamic employee, team, comparison, sector, use-case, department and integration detail routes;
- `app/robots.ts` declares the sitemap and canonical host;
- social previews are generated through the existing `brandPreviewUrl` system;
- structured data is audited only where it is actually emitted; Phase 8F does not add schema merely to satisfy a checklist.

Phase 8F converted that foundation into permanent static, runtime and exact-production acceptance contracts.

## Phase 8F acceptance contract

Phase 8F closes only when all of the following are verified in ES and EN where applicable:

1. **Titles and descriptions**
   - every indexable HTML route has an intentional title and description;
   - commercial route titles are unique enough to identify the page;
   - no route accidentally inherits Home copy where route-specific metadata is required;
   - no placeholder or development-only wording is emitted.

2. **Canonical URLs and language alternates**
   - every indexable route resolves to its own absolute canonical URL;
   - ES/EN paired routes expose reciprocal `hreflang` links;
   - `x-default` is intentional and consistent;
   - alternate URLs match real routes and do not redirect to unrelated pages;
   - canonical and hreflang values never include query-state from interactive tools.

3. **Sitemap**
   - all intended indexable public routes are present exactly once;
   - every bilingual pair is represented correctly;
   - no API or internal rendering endpoint appears in the sitemap;
   - dynamic detail families are complete;
   - sitemap URLs return successful public responses.

4. **Robots and index policy**
   - public commercial routes remain indexable;
   - internal utility/rendering endpoints have an explicit crawl/index policy;
   - `/api/*`, `/brand-preview/*` and `/brand-campaign/*` are treated as implementation endpoints rather than public landing pages;
   - the sitemap and canonical host remain declared correctly.

5. **Open Graph and Twitter sharing**
   - indexable commercial routes expose suitable Open Graph and Twitter metadata;
   - shared title/description reflect the current route, not generic Home copy where route-specific copy exists;
   - preview images resolve successfully and use the approved IA Empleado branding system;
   - expected preview geometry remains 1200×630 where the surface uses the standard social card.

6. **Structured data**
   - JSON-LD is emitted only where its schema is semantically valid for the rendered content;
   - URLs, language and page identity inside structured data match canonical metadata;
   - FAQ structured data is present only on pages that render the corresponding FAQ content;
   - no fake organization, review, rating, product or live-service claims are introduced.

7. **Navigation, breadcrumbs and errors**
   - internal links resolve without broken destinations;
   - breadcrumbs point to valid canonical routes;
   - not-found behavior returns the correct status and does not masquerade as an indexable success page;
   - utility/internal rendering routes are not discoverable from normal customer navigation unless intentionally exposed.

## Tranche 1 — SEO foundation contract

The first tranche established static CI protection for the bilingual metadata, sitemap/robots, social-preview and internal-renderer foundations before route-by-route remediation.

It protects:

- both root metadata definitions;
- canonical + ES/EN/x-default alternate foundations;
- Open Graph + Twitter foundations;
- sitemap and robots generation;
- the social-preview helper;
- the two internal rendering route-handler families;
- Phase 8E closure evidence and Phase 8F activation documentation.

The static contract lives in `scripts/check-phase8f-seo-foundation.mjs` and runs in ordinary Web CI.

## Tranche 2 — browser/runtime SEO matrix

The browser/runtime SEO matrix lives in `tests/phase8f-seo-runtime.spec.ts`. It verifies the critical ES/EN route set plus representative commercial index/detail families for:

- title and description;
- canonical URL;
- reciprocal `es-ES`, `en` and `x-default` alternates;
- public indexability;
- route-appropriate Open Graph and Twitter metadata;
- governed social-preview delivery;
- sitemap and robots behavior;
- explicit `X-Robots-Tag: noindex, nofollow` on implementation endpoints;
- real 404 + noindex behavior.

### Tranche 2 production acceptance

Production Verification #48 (`34954576538`) accepted exact `main` SHA `17d3c3b6a37ea8c874a1a88ebf834f9c4bf8497e` after Web CI #244 passed:

- Hostinger served release marker `web-phase-8f-runtime-seo` immediately;
- the complete production browser matrix finished **196/196 green**;
- all **16 critical ES/EN routes** emitted intentional metadata, canonical URLs, reciprocal language alternates and governed social previews;
- all **7 commercial families in both languages** passed index + representative-detail SEO checks;
- `/brand-preview/es/home`, `/brand-campaign/es/landscape/home` and `/api/lead-intake` returned `X-Robots-Tag: noindex, nofollow`;
- sitemap, robots and intentional 404 behavior passed;
- real-production Phase 8E budgets remained green: CLS 0 on all six performance routes, no third-party requests, no broken images and canonical static media caching unchanged;
- Lighthouse 13.4.1 remained green at the unchanged 90/95/95/95 thresholds;
- Home ES had one noisy first sample at Performance 0.80 and stabilized to **0.80 / 0.96 / 0.96 → median 0.96**;
- the other five Lighthouse routes passed on their first sample;
- Lighthouse reports were uploaded as `phase8e-lighthouse-reports` (artifact ID `10391900933`).

This closed the runtime metadata/indexing/sharing tranche without yet claiming all of Phase 8F complete.

## Tranche 3 — structured data and navigation closure

The final Phase 8F tranche is evidence-first. `tests/phase8f-structured-navigation.spec.ts` audits:

- every JSON-LD block on critical routes and representative commercial details parses successfully;
- unsupported review/rating/product claims are absent;
- Organization schema, if present, identifies the actual IA Empleado brand;
- WebPage structured-data URLs, if present, agree with canonical identity;
- `inLanguage`, if present, agrees with the rendered locale;
- FAQPage questions, if present, also exist as visible page content;
- structured data never identifies `/api/*`, `/brand-preview/*` or `/brand-campaign/*` as public entities;
- internal public links discovered from the main ES/EN navigation surfaces resolve without HTTP errors;
- internal implementation endpoints are not exposed as customer navigation links;
- breadcrumb links are validated wherever breadcrumb navigation is actually rendered.

This tranche does **not** require adding JSON-LD or breadcrumbs to pages that do not semantically need them. The contract must not manufacture schema merely to make a test pass.

### Tranche 3 production acceptance and Phase 8F closure

PR #93 (`test: audit Phase 8F structured data and navigation`) passed Web CI #250 and merged to `main` as exact release SHA `3ad2abc9e86bfaa0ff94d5b753198942194865ca`. Main Web CI #251 then repeated all contracts, TypeScript, Chromium browser QA and build successfully.

Production Verification #49 (`34960212929`) accepted that exact SHA on 2026-09-15:

- Hostinger exposed `web-phase-8f-structured-navigation` on the first marker check;
- the production Playwright matrix executed **228 cases** across geometry, branding, conversion, accessibility, motion, canonical fidelity, performance, runtime SEO and structured-navigation coverage;
- **227 cases passed in the main run and 1 responsive Home 768 px case was recorded as flaky after the automatic retry recovered it**; the workflow conclusion remained `success`;
- every audited structured-data block parsed and remained aligned with route canonical identity and rendered locale;
- unsupported Review/AggregateRating/Rating/Product structured claims remained absent;
- the public navigation audit discovered **100 unique same-origin public links from 16 seed routes** and found no broken or implementation-only destinations;
- breadcrumb targets passed across the representative ES/EN employee, team, comparison, sector, use-case, department and integration detail routes;
- the internal renderer/API `noindex, nofollow` policy and real 404 behavior remained green;
- the exact release generated **103/103 static pages** successfully before the Lighthouse lab;
- the real-production Phase 8E budget regression remained green with CLS 0 on all six representative routes, no third-party requests and no broken images;
- Lighthouse 13.4.1 passed all **6 routes** at the unchanged **Performance 0.90 / Accessibility 0.95 / Best Practices 0.95 / SEO 0.95** thresholds;
- Home ES stabilized from Performance **0.83 / 0.95 / 0.96 → median 0.95**, with 1.00 Accessibility / Best Practices / SEO;
- ROI ES stabilized from Performance **0.88 / 0.97 / 0.96 → median 0.96**, with Accessibility 0.97 and Best Practices / SEO 1.00;
- the remaining four Lighthouse routes passed their threshold decision without a persistent miss;
- Lighthouse reports were uploaded as `phase8e-lighthouse-reports` (artifact ID `10393543463`).

The single recovered 768 px Home geometry retry is **not an SEO/metadata/link blocker** and does not invalidate Phase 8F acceptance. It is carried forward explicitly into Phase 8G because Phase 8G owns cross-browser/device and responsive acceptance. Phase 8G must reproduce the 768 px state across the new browser matrix and either prove the event transient or remediate a real layout regression before cross-browser/device acceptance can close.

## Final accepted technical state

- ES Home canonical: `/`;
- EN Home canonical: `/en`;
- reciprocal ES/EN alternates and consistent Spanish `x-default` policy;
- route-specific title/description across the runtime matrix;
- Open Graph and Twitter large-card metadata across audited public routes;
- dynamic sitemap generation across the commercial content families;
- global robots sitemap/host declaration;
- explicit `noindex, nofollow` response policy for API and internal rendering surfaces;
- real 404 + noindex behavior;
- browser/runtime SEO matrix protected in CI and Production Verification;
- structured-data validity and canonical consistency protected where JSON-LD exists;
- unsupported structured-data claims blocked by the Phase 8F contract;
- same-origin public navigation link integrity protected;
- representative breadcrumb targets protected;
- implementation endpoints absent from customer-facing navigation.

## Engineering rules retained as permanent regression protection

- EN/ES ship together for every customer-facing metadata change.
- Canonical and hreflang mappings are server-authoritative; client state never determines index identity.
- Internal renderer/API endpoints must not become public landing pages accidentally.
- Social-preview assets must use approved IA Empleado branding and canonical character fidelity rules.
- A failing SEO contract produces the exact route, field and received value where possible.
- Do not hide failures by removing routes from the audit matrix unless the route is explicitly documented as non-indexable.
- Do not add structured data solely to satisfy an audit; schema must describe content actually rendered on the route.

## Next gate

**Phase 8F is complete. Phase 8G — Production browser/device acceptance — is now the next permitted implementation gate.**

Phase 8G must extend the current Chromium-only Playwright coverage to a controlled automated browser-engine/device-profile matrix and keep real Safari/iOS/Android device evidence distinct from emulation. The recovered Home 768 px retry from Production Verification #49 is an explicit entry risk and must be reproduced or resolved inside Phase 8G rather than hidden.
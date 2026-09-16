# Web Phase 8 — Public Web Finalization & Launch Readiness

## Objective

Finish `iaempleado.com` as a polished public commercial product before beginning implementation work for `kairoseth.iaempleado.com`.

The reference/demo environment remains explicitly blocked until Phase 8H and the final Phase 8 release gate are complete.

## Current status

**ACTIVE — Phase 8H final content, commercial and legal readiness review is the current gate.**

Completed phases:

- Phase 8A — full UX and responsive acceptance: **COMPLETE**;
- Phase 8B — accessibility closure: **COMPLETE**;
- Phase 8C — motion and animation finalization: **COMPLETE**;
- Phase 8D — canonical visual fidelity closure: **COMPLETE**;
- Phase 8E — performance and Core Web Vitals: **COMPLETE**;
- Phase 8F — SEO, metadata and sharing: **COMPLETE**;
- Phase 8G — production browser/device acceptance: **COMPLETE**;
- Phase 8H — final content/commercial/legal review: **ACTIVE**.

The public web currently has:

- bilingual ES/EN routes;
- canonical IA Empleado branding and character system;
- CSS/SVG motion with `prefers-reduced-motion` support;
- responsive navigation and reflow hardening;
- browser-level UX/accessibility regression coverage;
- lead capture and Hostinger SMTP delivery verified in production;
- sitemap, robots, metadata and structured-data governance;
- performance budgets and Lighthouse launch gates;
- Chromium, Firefox, Edge, WebKit and mobile-emulation CI coverage;
- native Safari acceptance on macOS;
- manual physical-device validation on iPhone and Android.

## Finish-before-advance rule

No implementation work for `kairoseth.iaempleado.com` starts until every Phase 8 gate below is green and the final production verification has completed successfully.

## Phase 8A — Full UX and responsive acceptance

**Status: COMPLETE — closed on 2026-09-13.**

Accepted coverage includes:

- 320px, 360px, 390/393px, 430px, 768px, 1024px and representative desktop widths;
- no blocking horizontal overflow or clipped content;
- sticky-header offsets;
- readable typography and line lengths;
- touch-target sizing;
- keyboard navigation and focus order;
- form usability;
- loading/success/error states;
- 200% text zoom/reflow on critical conversion routes;
- ES/EN responsive parity.

The ROI hydration synchronization regression was fixed by disabling controlled interactions until client hydration and remains protected by permanent browser tests.

Closure evidence includes PR #72, Web CI #178/#179 and Production Verification #28 with **108/108 tests passed**.

## Phase 8B — Accessibility closure

**Status: COMPLETE — closed on 2026-09-14 after exact-marker production verification.**

Accepted coverage includes:

- WCAG-oriented Axe audits across the critical ES/EN commercial matrix;
- keyboard-only navigation;
- visible focus and focus restoration;
- landmarks, headings, labels and name/role/value semantics;
- contrast preferences and forced-colors sanity checks;
- reduced-motion behavior;
- zoom/reflow;
- accessible form validation;
- bilingual language/navigation semantics;
- meaningful/decorative image treatment.

The Team Builder / Process Analyzer pre-hydration lost-click regression was fixed by explicit hydration guards and remains permanently protected.

Closure evidence includes PR #76, main SHA `fd787292d400c999fdb95b7d554ff2c584e9269e` and Production Verification #32 with **148/148 tests passed**.

## Phase 8C — Motion and animation finalization

**Status: COMPLETE — closed on 2026-09-14 after exact-marker production verification.**

Accepted principles:

- motion explains coordination, handoff and system activity rather than decorating content;
- animation does not cause layout shift or delay core content;
- transforms/opacity/SVG stroke are preferred;
- mobile continuous motion is simplified;
- non-essential animation is disabled under reduced motion;
- no motion implies fake live customer/system activity.

Closure evidence includes PR #79, main SHA `2ba2086cfa43057608c9be97e7fb79403c9a2078` and Production Verification #35 with **152/152 tests passed**.

## Phase 8D — Canonical visual fidelity closure

**Status: COMPLETE — closed on 2026-09-14 after exact-marker production verification.**

The generated homepage-video experiment was intentionally removed because it did not preserve the approved Clara, Alex, Sofía and Javier identities with sufficient fidelity.

Accepted state:

- no generated public website video runtime;
- canonical WebP identity assets remain authoritative;
- CSS/SVG motion remains available around approved assets;
- ES/EN Home contains no `<video>` element;
- CI prevents accidental reintroduction of the rejected video path.

Closure evidence includes PR #83, main SHA `8fd438b90bcfa9ea7e76d81c7eaf78f754491b02` and Production Verification #39 with **156/156 tests passed**.

Detailed policy: `docs/PHASE_8D_CANONICAL_VISUAL_FIDELITY.md`.

## Phase 8E — Performance & Core Web Vitals

**Status: COMPLETE — closed on 2026-09-15 after exact-SHA Production Verification #46.**

Accepted launch gates include:

- real-production LCP/CLS/TTFB and transfer-size budgets;
- long-task responsiveness proxy;
- image loading and cache policy;
- zero unexpected third-party requests in the measured route load;
- pinned Lighthouse 13.4.1 mobile audits;
- thresholds of Performance 0.90, Accessibility 0.95, Best Practices 0.95 and SEO 0.95.

Production Verification #46 accepted exact main SHA `783cbf5888f26056fc808a7c1fba4bdf2049c6ee`; the complete production matrix finished **163/163 green** and all Lighthouse route decisions passed the launch thresholds.

Detailed evidence:

- `docs/PHASE_8E_PERFORMANCE_BASELINE.md`;
- `docs/PHASE_8E_CLOSURE.md`;
- `docs/PHASE_8E_LIGHTHOUSE_STABILITY.md`.

## Phase 8F — SEO, metadata and sharing

**Status: COMPLETE — closed on 2026-09-15 after exact-marker Production Verification #49.**

Accepted coverage includes:

- route-specific title/description behavior;
- canonical URLs;
- reciprocal ES/EN and x-default language alternates;
- sitemap completeness;
- robots and index/noindex policy;
- Open Graph/Twitter sharing metadata;
- governed social-preview rendering;
- structured-data validity only where semantically justified;
- navigation and breadcrumb integrity;
- real 404 + noindex behavior;
- implementation endpoints excluded from customer navigation.

Production Verification #49 accepted exact main SHA `3ad2abc9e86bfaa0ff94d5b753198942194865ca`. The production Playwright matrix executed **228 cases**; 227 passed in the main run and one responsive 768px case recovered on automatic retry. The event was carried into Phase 8G and subsequently covered by the dedicated 768px no-retry stability gate.

Detailed evidence: `docs/PHASE_8F_SEO_METADATA_SHARING.md`.

## Phase 8G — Production browser/device acceptance

**Status: COMPLETE — closed on 2026-09-16.**

Accepted automated/native coverage:

- Chrome/Chromium desktop;
- Firefox desktop;
- Microsoft Edge desktop binary gate;
- WebKit regression coverage;
- iPhone/WebKit emulation;
- Android/Chromium emulation;
- dedicated 768×1024 stability stress gate;
- native Safari on macOS through `safaridriver`;
- three-shard Chromium browser QA without reduced assertions.

Accepted physical-device evidence reported by the project owner on 2026-09-16:

- **iPhone 17 + Safari — PASS** against the production website;
- **Samsung Galaxy 10 + Chrome — PASS** against the production website.

The exact mobile OS/browser version numbers were not recorded during those manual sessions and are intentionally not inferred. The physical-device result is recorded separately from emulation evidence.

Detailed evidence: `docs/PHASE_8G_BROWSER_DEVICE_ACCEPTANCE.md`.

## Phase 8H — Final content/commercial/legal review

**Status: ACTIVE — opened on 2026-09-16 after Phase 8G closure.**

Before launch-ready status, verify:

- all CTAs point to intentional destinations;
- claims are supportable and not misleading;
- no demo visual implies a live customer integration unless one actually exists;
- ES/EN customer-facing content remains commercially equivalent;
- employee/team/use-case naming is consistent;
- ROI wording is clearly presented as an estimate, not a guaranteed result;
- Request Demo copy accurately describes the conversion flow;
- privacy/consent wording matches the data actually collected;
- footer/legal/navigation coverage is production-ready;
- no placeholder, staging or internal implementation route is customer-visible;
- there are no orphaned or visibly unfinished sections;
- final desktop, iPhone and Android manual visual acceptance is green for the release candidate.

Detailed working checklist: `docs/PHASE_8H_FINAL_COMMERCIAL_READINESS.md`.

## Final release gate

Phase 8 closes only when all are true:

- [x] full route responsive matrix green;
- [x] site-wide critical accessibility audit green;
- [x] keyboard/reflow/reduced-motion acceptance green;
- [x] final animation/motion polish green;
- [x] canonical visual rollback deployed and production verified;
- [x] generated website video absent and canonical character fidelity green;
- [x] performance/Core Web Vitals budget measured and accepted;
- [x] SEO/metadata/link audit green;
- [x] cross-browser/device acceptance green;
- [ ] Phase 8H commercial/content/legal audit green;
- [ ] final ES/EN content/commercial parity green;
- [ ] final conversion/SMTP regression green;
- [ ] final candidate CI green;
- [ ] final production verification green;
- [ ] final manual visual acceptance green.

## Current next action

Execute Phase 8H against the production-facing ES/EN route set, remediate any commercial/legal/content findings, then bind the final accepted candidate to the final Phase 8 Production Verification.

Only after every remaining checkbox above is green may `iaempleado.com` be declared launch-ready and implementation begin for `kairoseth.iaempleado.com`.
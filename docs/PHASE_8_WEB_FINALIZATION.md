# Web Phase 8 — Public Web Finalization & Launch Readiness

## Objective

Finish `iaempleado.com` as a polished public commercial product before beginning work on `kairoseth.iaempleado.com`.

The reference/demo environment is explicitly blocked until this phase is closed.

## Current baseline

The web already has a substantial foundation:

- bilingual ES/EN public routes;
- canonical IA Empleado branding and character system;
- CSS/SVG motion system with `prefers-reduced-motion` support;
- responsive navigation and reflow hardening;
- full Phase 8A responsive/interaction browser matrix;
- Phase 8B accessibility closure completed in CI and exact-marker production verification;
- Playwright browser QA;
- lead capture and Hostinger SMTP delivery verified in production;
- sitemap and robots generation;
- production verification workflow.

The repository also exposes important remaining gaps that prevent declaring the public web finished:

1. **No finished website video assets are present.** `public/branding/media` currently contains framing SVGs, not production MP4/WebM/video deliverables.
2. **Performance is not a release gate yet.** There is no Lighthouse/Core Web Vitals budget in the package scripts or CI.
3. **Motion is contract-tested but still needs final production UX acceptance** on real devices/preferences, including reduced motion and mobile simplification.
4. **Final SEO/metadata/canonical/hreflang/schema review is still required** before launch readiness can be claimed.
5. **Cross-browser and real-device acceptance remains required** even where source contracts and Playwright are green.

## Finish-before-advance rule

No implementation work for `kairoseth.iaempleado.com` starts until every Phase 8 gate below is green and production verification has completed.

## Phase 8A — Full UX and responsive acceptance

Audit the complete commercial route matrix in both ES and EN.

Required widths:

- 320px
- 360px
- 390/393px
- 430px
- 768px
- 1024px
- 1280px+
- 1440/1648px representative desktop

Acceptance:

- no horizontal overflow;
- no clipped/overlapping content;
- correct sticky-header offsets;
- readable typography and line lengths;
- touch targets >= 44px where applicable;
- correct keyboard navigation and focus order;
- no hover-only required interaction;
- forms usable with keyboard and touch;
- loading/success/error states are understandable;
- 200% text zoom/reflow on critical conversion routes;
- no visual regression in ES or EN.

### Phase 8A production regression — ROI hydration synchronization

Production Verification #27 exposed a real browser-timing defect after the initial Phase 8A release: 107 of 108 production tests passed, but keyboard interaction on the ROI range control could move the native slider from `30` to `31` before React hydration completed while the synchronized numeric control remained at `30`.

Root cause: production timing allowed interaction after `DOMContentLoaded` but before React had attached the controlled-component event handling. The browser changed the native range value, while React state remained unchanged.

Fix and regression protection:

- ROI controls remain disabled until client hydration completes;
- the calculator exposes `data-roi-hydrated` and an explicit hydration release marker;
- Playwright waits for the hydrated state before keyboard interaction and verifies both controls stay synchronized;
- the ROI source contract requires the hydration guard to remain present;
- the active production marker used for the Phase 8A closure was `web-phase-8a-roi-hydration-sync`, preventing verification against the previous deployment.

### Phase 8A closure evidence

Phase 8A closed on 2026-09-13 after the hydration correction completed the full delivery chain:

- PR #72 merged to `main` as `66ae61f6c269ec98c7ceb552db377b957bceb1f2`;
- Web CI #178 green on the PR;
- Web CI #179 green on `main`;
- Hostinger served `web-phase-8a-roi-hydration-sync`;
- Production Verification #28 executed the corrected release against `https://iaempleado.com`;
- the previously failing ROI keyboard synchronization test passed;
- final production result: **108/108 tests passed**.

Phase 8A is complete. Phase 8B is also complete; Phase 8C is now the active phase.

## Phase 8B — Accessibility closure

**Status: COMPLETE — closed on 2026-09-14 after exact-marker production verification.**

Target public-web WCAG 2.2 AA behavior where applicable.

Required checks:

- Axe on the full critical commercial route matrix, not only homepage/tool samples;
- keyboard-only end-to-end navigation;
- visible focus and focus restoration;
- landmarks/headings/labels/name-role-value review;
- contrast verification for normal and interactive text;
- `prefers-reduced-motion` verification;
- `prefers-contrast: more` and forced-colors sanity checks;
- zoom/text resizing and reflow;
- accessible error messaging and form validation;
- language attributes and bilingual navigation semantics;
- decorative imagery excluded appropriately from accessibility tree;
- meaningful images have suitable alternatives.

### Phase 8B tranche 1 — bilingual Axe and semantic matrix

The first Phase 8B gate reuses the already accepted Phase 8A commercial route model instead of creating a parallel route definition:

- 16 critical ES/EN routes covering home, employee/team indexes, collaboration, Team Builder, Process Analyzer, ROI and lead conversion;
- 7 commercial families in both ES and EN;
- each commercial family audits its index plus one representative detail route discovered from the rendered index;
- Axe blocks critical/serious violations using WCAG 2.x A/AA tags including WCAG 2.2 AA where supported;
- each audited page must return successfully, expose the expected document language, render a main landmark and expose exactly one visible H1.

Closure evidence:

- PR #73 merged into `main` as `0574344a1e1dbb96c2fbad755aeb630700268d38`;
- PR Web CI #185 green;
- main Web CI #186 green;
- browser QA result: **138/138 tests passed**;
- Production Verification #29 later remained green as regression evidence, while still using the Phase 8A release marker.

### Phase 8B tranche 2 — interaction, preferences, form errors and imagery

The second gate adds browser-level acceptance beyond static semantics:

- ES/EN desktop Explore navigation works keyboard-only;
- mobile navigation focus trap, Escape handling and focus restoration remain covered by the existing UX suite;
- reduced motion keeps branded content complete while disabling non-essential animation;
- `prefers-contrast: more` activates stronger readable text treatment;
- forced-colors preserves an explicit system-color keyboard focus indicator;
- lead-form validation exposes persistent localized errors with `aria-invalid` and associated descriptions, while retaining native constraint validation;
- meaningful composite imagery is labelled while decorative child portraits remain silent;
- SMTP/email/direct transport behavior remains unchanged.

Closure evidence:

- PR #74 merged into `main` as `d3eef02489b650fb24cced18340e41c3c2050cab`;
- PR Web CI #187 green with **146/146 tests passed** and build green;
- main Web CI #188 green with **146/146 tests passed in 6.5 minutes** and build green;
- all contracts and TypeScript remained green.

### Phase 8B final production closure gate

Phase 8B does not close on integration evidence alone. The final gate binds the exact deployed runtime to the accessibility acceptance suite:

- the initial final-gate marker advanced to `web-phase-8b-accessibility-closure`;
- browser acceptance explicitly verifies ES→EN and EN→ES language switching, `hreflang` semantics and resulting document language;
- Production Verification executes both `tests/phase8b-accessibility.spec.ts` and `tests/phase8b-interaction-accessibility.spec.ts` in addition to the permanent Phase 8A regressions;
- the release-gate contract fails if either Phase 8B suite or the exact release marker is removed;
- the Phase 8A ROI hydration regression remains permanently protected after later markers advance.

PR #75 bound this gate to production and merged to `main` as `998f19b1a9e9ab54eaea52eb0bc2e865abe9540e`. Web CI #189 passed **148/148** on the PR and Web CI #190 repeated **148/148** on `main`, both with build green. Hostinger then published `web-phase-8b-accessibility-closure`.

### Phase 8B production regression — Team Builder / Process Analyzer hydration synchronization

Production Verification #31 (`34834177878`) ran against the exact `main` SHA `998f19b1a9e9ab54eaea52eb0bc2e865abe9540e` after Hostinger had already exposed `web-phase-8b-accessibility-closure`. The expanded production suite completed **147/148 tests** and failed only `tests/phase8-interaction-ux.spec.ts:86` (`pressed states, keyboard focus and ROI feedback remain explicit`).

Actionable failure evidence:

- first attempt: `.process-pain-chip`.first() was clicked, but `aria-pressed` remained `false` instead of the expected `true` for the full 10-second assertion window;
- retry: the same test failed earlier on `.builder-choice`.first(), which likewise remained `aria-pressed="false"` after click;
- the retry reproducing the lost interaction in a different React-controlled tool rules out a selector-specific Process Analyzer defect;
- the exact production marker had already passed, so the failure was not stale deployment;
- all 147 other production cases passed, including the full Phase 8B Axe/semantic and interaction/preference suites.

Confirmed root cause: Team Builder and Process Analyzer were client components that server-rendered state-changing buttons as enabled before React hydration. Their state transitions existed only in React `onClick` handlers, so production timing could allow a browser click after `DOMContentLoaded` but before React owned the interaction. The click was accepted by the native button but no React state transition occurred. This is the same defect class previously exposed by the ROI range control, now affecting button-driven tools.

Hotfix and regression protection:

- Team Builder and Process Analyzer now expose explicit hydration state and set it only from a client `useEffect`;
- all state-mutating controls remain disabled until hydration completes, including presets/choices/clear and process template/pain/bottleneck/reset controls;
- each tool exposes a `data-*-hydrated` state, `aria-busy` and `phase8b-hydration-sync` component release marker;
- Playwright waits for those hydration markers and enabled state before any state-changing click;
- Team Builder, Process Analyzer and the global Phase 8 release gate statically require the hydration guards so they cannot be silently removed;
- the active global production marker advanced again to `web-phase-8b-hydration-sync`, preventing a rerun from approving the already-failed `web-phase-8b-accessibility-closure` deployment.

### Phase 8B closure evidence

The hydration hotfix completed the full release chain on 2026-09-14:

- PR #76 (`fix: synchronize interactive tools after hydration`) passed Web CI #191 with **148/148 tests** and build green;
- PR #76 merged to `main` as `fd787292d400c999fdb95b7d554ff2c584e9269e`;
- main Web CI #192 repeated **148/148 tests in 6.7 minutes** and generated **103/103 static pages** successfully;
- Hostinger served the exact release marker `web-phase-8b-hydration-sync` before production acceptance began;
- Production Verification #32 (`34838329376`) checked out the exact `main` SHA `fd787292d400c999fdb95b7d554ff2c584e9269e`;
- the previously failing Team Builder / Process Analyzer interaction regression passed without retry or weakened assertions;
- both Phase 8B accessibility suites, the permanent Phase 8A regressions, conversion/lead checks, responsive matrix and production visual geometry remained green;
- final production result: **148/148 tests passed in 7.7 minutes**;
- no production diagnostic artifact was required because the verification job completed successfully.

**Phase 8B is complete. Phase 8C — Motion and animation finalization — is now the active phase.**

## Phase 8C — Motion and animation finalization

Keep the approved principle: motion explains coordination, handoff, system activity and human control; it is not decoration for its own sake.

Acceptance:

- homepage choreography polished at desktop/tablet/mobile;
- employee/team/department/sector scenes use consistent motion vocabulary;
- no animation causes layout shift;
- transforms/opacity/SVG stroke remain preferred;
- continuous animation is reduced on mobile;
- all non-essential animation is disabled under reduced motion;
- no fake live status or misleading runtime implication;
- animation does not delay access to core content or CTA;
- motion performance remains smooth on representative mid-range mobile hardware.

## Phase 8D — Website video system

Website videos are a required deliverable and are not considered complete yet.

Planned video set:

1. **Homepage explainer / brand story** — short, silent-capable, demonstrates people + IA coordination.
2. **How teams work** — shows handoff, human approval and system coordination.
3. **Team Builder / Process Analyzer product walkthrough** — concise product proof.
4. Optional short role/use-case loops where they materially improve comprehension.

Video acceptance:

- WebM + MP4 fallback where required;
- optimized dimensions/bitrate and file size budget;
- poster image for every video;
- no audio-dependent meaning;
- captions/subtitles for spoken content;
- transcript for meaningful narrated content;
- user controls for any long-form video;
- no forced autoplay with sound;
- autoplay loops, if used, are muted, short and non-essential;
- reduced-motion preference replaces non-essential autoplay with poster/static state;
- mobile network/performance behavior validated;
- video does not become LCP unless deliberately budgeted and measured.

## Phase 8E — Performance & Core Web Vitals

Add measurable launch budgets rather than relying only on visual QA.

Required production measurements for representative ES/EN routes:

- LCP;
- CLS;
- INP/lab responsiveness proxy;
- TTFB/server response;
- JS/CSS/image/video transfer size;
- image sizing and lazy loading;
- font loading behavior;
- third-party requests;
- caching headers/static media strategy.

Initial target: Lighthouse performance/accessibility/best-practices/SEO scores suitable for a production commercial site, with explicit exceptions documented rather than hidden.

Core Web Vitals regressions must become actionable diagnostics in CI/production verification where technically stable.

## Phase 8F — SEO, metadata and sharing

Verify:

- title/description uniqueness;
- canonical URLs;
- ES/EN alternates/hreflang;
- sitemap completeness;
- robots behavior;
- Open Graph/Twitter assets;
- index/noindex policy for utility/internal rendering endpoints;
- structured data only where semantically valid;
- breadcrumb/navigation consistency;
- 404/not-found behavior;
- no broken internal links;
- no placeholder copy or development-only routes discoverable from public navigation.

## Phase 8G — Production browser/device acceptance

Minimum acceptance browsers:

- current Chrome/Chromium desktop;
- Safari desktop;
- iOS Safari;
- Android Chrome;
- Firefox desktop;
- Edge desktop.

Validate:

- navigation;
- hero/art geometry;
- forms and SMTP conversion flow;
- interactive tools;
- video playback/fallback;
- motion preferences;
- keyboard/focus behavior;
- responsive layouts;
- no console/runtime errors affecting user flows.

## Phase 8H — Final content/commercial review

Before launch-ready status:

- all CTAs point to intentional destinations;
- claims are supportable and not misleading;
- no demo visuals imply live customer integrations;
- all ES/EN customer-facing content ships together;
- employee/team/use-case naming is consistent;
- privacy language and contact flow are production-ready;
- footer/legal/navigation coverage is complete;
- there are no orphaned or visibly unfinished sections.

## Final release gate

Phase 8 closes only when all are true:

- [x] full route responsive matrix green;
- [x] site-wide critical accessibility audit green;
- [x] keyboard/reflow/reduced-motion acceptance green;
- [ ] final animation/motion polish green;
- [ ] production website videos delivered and integrated;
- [ ] video accessibility and fallback behavior green;
- [ ] performance/Core Web Vitals budget measured and accepted;
- [ ] SEO/metadata/link audit green;
- [ ] cross-browser/device acceptance green;
- [ ] ES/EN content parity green;
- [ ] conversion/SMTP regression green;
- [ ] CI green;
- [ ] production verification green;
- [ ] final manual visual acceptance green.

Only then may the project advance to the Kairoseth reference/demo-company implementation.

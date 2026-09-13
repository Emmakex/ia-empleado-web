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
- Playwright browser QA;
- Axe WCAG checks on critical routes;
- lead capture and Hostinger SMTP delivery verified in production;
- sitemap and robots generation;
- production verification workflow.

The repository also exposes important remaining gaps that prevent declaring the public web finished:

1. **No finished website video assets are present.** `public/branding/media` currently contains framing SVGs, not production MP4/WebM/video deliverables.
2. **Accessibility automation is not yet site-wide.** Axe currently blocks critical/serious issues on a small critical-route subset rather than the full commercial route matrix.
3. **Responsive browser QA is strongest on the homepage and 390px smoke checks.** The full route matrix is not yet exercised at all acceptance widths.
4. **Performance is not a release gate yet.** There is no Lighthouse/Core Web Vitals budget in the package scripts or CI.
5. **Motion is contract-tested but still needs final production UX acceptance** on real devices/preferences, including reduced motion and mobile simplification.
6. **Final SEO/metadata/canonical/hreflang/schema review is still required** before launch readiness can be claimed.
7. **Cross-browser and real-device acceptance remains required** even where source contracts and Playwright are green.

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

## Phase 8B — Accessibility closure

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

- [ ] full route responsive matrix green;
- [ ] site-wide critical accessibility audit green;
- [ ] keyboard/reflow/reduced-motion acceptance green;
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

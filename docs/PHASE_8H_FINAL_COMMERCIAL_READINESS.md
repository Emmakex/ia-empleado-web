# Phase 8H — Final content, commercial and legal readiness

## Status

**ACTIVE — opened on 2026-09-16 after Phase 8G browser/device acceptance closed.**

Phase 8H is the last substantive public-web review before the final Phase 8 release gate. It must verify that `https://iaempleado.com` is not only technically correct, but commercially coherent, truthful, bilingual and ready for real lead generation.

Implementation work for `kairoseth.iaempleado.com` remains blocked until this phase and the final Phase 8 release gate are green.

## Scope

Phase 8H reviews the complete customer-facing ES/EN public experience across:

- Home;
- AI Employees;
- AI Teams;
- collaboration/how-they-work-together;
- Team Builder;
- Process Analyzer;
- ROI calculator;
- comparisons;
- sectors;
- use cases;
- departments;
- integrations;
- Request Demo / conversion flow;
- footer, privacy and legal/navigation surfaces.

## Acceptance areas

### 1. Commercial claims and positioning

- [ ] every headline and commercial claim is supportable;
- [ ] no page implies capabilities that are not actually delivered by the product or service model;
- [ ] no visual suggests a live customer integration where only a conceptual/demo state exists;
- [ ] AI employee/team descriptions remain concrete and outcome-oriented without becoming misleading;
- [ ] ROI language is framed as an estimate rather than a guaranteed financial result;
- [ ] comparison pages distinguish factual product differences from marketing interpretation;
- [ ] sector/use-case language avoids unsupported compliance, performance or automation guarantees.

### 2. CTA and conversion coherence

- [ ] every primary CTA points to an intentional destination;
- [ ] secondary CTAs do not create dead ends or contradictory conversion paths;
- [ ] contextual Team Builder and Process Analyzer handoff remains meaningful on the demo form;
- [ ] ES and EN CTA labels describe equivalent intent;
- [ ] Request Demo copy accurately describes what happens after submission;
- [ ] SMTP success/failure/fallback behavior remains truthful to the user;
- [ ] no development, staging or internal-renderer route appears in customer navigation.

### 3. ES/EN content parity

- [ ] all customer-facing ES routes have the intended EN counterpart where applicable;
- [ ] no language exposes materially different commercial promises without an explicit reason;
- [ ] employee/team/use-case/department/integration naming remains consistent across languages;
- [ ] navigation, breadcrumbs and CTA destinations remain equivalent between locales;
- [ ] no untranslated placeholder or mixed-language block remains visible.

### 4. Legal/privacy readiness

- [ ] privacy information is reachable from the public conversion flow;
- [ ] lead-form consent wording is understandable and accurately scoped;
- [ ] footer legal/privacy links point to real production-ready destinations;
- [ ] no legal link points to a placeholder, draft-only or missing page;
- [ ] contact identity and responsible-party wording are internally consistent;
- [ ] analytics/cookie behavior and wording are reviewed against the actual implemented tracking state;
- [ ] no unnecessary sensitive data is requested in the lead form.

### 5. Content quality and final manual review

- [ ] no orphaned or visibly unfinished section remains;
- [ ] no placeholder copy, test data or internal implementation wording remains;
- [ ] canonical Clara, Alex, Sofía and Javier identity usage remains consistent;
- [ ] page hierarchy and CTA density remain commercially understandable;
- [ ] final desktop manual visual review is green;
- [ ] final iPhone manual visual review is green;
- [ ] final Android manual visual review is green.

## Technical regressions that remain mandatory

Phase 8H does not replace earlier technical gates. Before closure the current candidate must still keep green:

- contracts and TypeScript;
- production build;
- Chromium browser QA shards;
- Firefox, WebKit/iPhone emulation and Edge gates;
- Chromium Phase 8G Android/tablet gate;
- native Safari macOS workflow;
- Phase 8A–8F permanent regressions;
- production lead delivery/SMTP verification;
- performance budgets and Lighthouse launch thresholds;
- SEO metadata, sitemap, robots, structured-data and navigation integrity.

## Closure evidence required

Phase 8H closes only when:

1. this checklist has no unresolved blocker;
2. any copy/legal/navigation corrections are merged with green Web CI;
3. ES/EN parity remains green;
4. conversion/SMTP regression is green;
5. final manual visual acceptance is recorded;
6. the final release candidate completes Production Verification successfully.

## Next step after closure

After Phase 8H passes, update the master Phase 8 document, run the final Phase 8 release gate and declare `iaempleado.com` launch-ready. Only then may implementation begin for `kairoseth.iaempleado.com`.
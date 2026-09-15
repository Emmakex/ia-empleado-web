# Phase 8G — Production Browser & Device Acceptance

## Status

**ACTIVE — opened on 2026-09-15 after Phase 8F exact-production closure.**

Phase 8G validates that the public IA Empleado website behaves consistently across the browser engines, viewport classes and real devices required for launch readiness. It does not replace the permanent deep Chromium regression suite; it adds a focused transversal acceptance layer across browser families and device profiles.

## Entry evidence

Phase 8F closed through Production Verification #49 (`34960212929`) on exact release SHA `3ad2abc9e86bfaa0ff94d5b753198942194865ca`, followed by the Phase 8F closure merge into `main` as `f9e347af4c7258f58799351d81d9740ee886aa53`.

One entry risk is intentionally carried forward: Production Verification #49 recorded the Home 768 px geometry case as flaky after the first attempt observed horizontal overflow from character cards and the configured retry recovered. Phase 8G owns reproduction or remediation of that breakpoint behavior.

## Required acceptance browsers and devices

The Phase 8 roadmap requires acceptance for:

- current Chrome/Chromium desktop;
- Safari desktop;
- iOS Safari;
- Android Chrome;
- Firefox desktop;
- Edge desktop.

## Evidence model

Automated engine/profile evidence and real-browser/device evidence are deliberately separated.

### Automated CI evidence

The first Phase 8G tranche uses Playwright projects for:

- Chromium desktop;
- Firefox desktop;
- WebKit desktop as a Safari-engine proxy;
- Chromium with a Pixel mobile profile as an Android Chrome behavior proxy;
- WebKit with an iPhone mobile profile as an iOS Safari behavior proxy.

These automated projects are useful regression evidence, but **WebKit is not claimed as real Safari**, and mobile emulation is not claimed as physical iOS or Android device evidence.

### Real-browser/device evidence required before closure

Phase 8G cannot close until the agreed launch flows have also been accepted on actual representative environments for:

- Safari desktop on macOS;
- iOS Safari on a physical iPhone/iPad representative of the supported viewport class;
- Android Chrome on a physical Android device representative of the supported viewport class;
- Microsoft Edge desktop;
- branded Chrome desktop where final launch evidence requires differentiation from bundled Chromium.

Manual evidence must identify browser/device, viewport or device model where practical, date, routes/flows checked and any issue discovered. Automated emulation must never be relabelled as physical-device acceptance.

## Automated cross-browser foundation

The initial suite lives in `tests/phase8g-cross-browser.spec.ts` and uses `playwright.phase8g.config.ts`.

It intentionally stays small and transversal instead of multiplying the complete Chromium suite by every browser project. Across every automated project it verifies:

- ES and EN public shells load successfully without uncaught page runtime errors;
- no horizontal document overflow on the bilingual shell;
- Home at the 768 px boundary does not overflow and character cards remain inside the viewport;
- Team Builder and Process Analyzer are hydrated before accepting state mutations;
- ROI keyboard state remains synchronized after hydration;
- the Spanish conversion form remains visible and usable;
- the canonical Clara, Alex, Sofía and Javier static WebP identities remain delivered;
- generated website video remains absent;
- reduced-motion is the default acceptance preference for this first cross-browser foundation.

The existing deep Chromium suites remain authoritative for complete accessibility, content-family, motion, performance, SEO and visual-regression coverage.

## Browser-installation policy

Ordinary Web CI installs the three Playwright browser engines required for this first tranche:

- Chromium;
- Firefox;
- WebKit.

Branded Edge/Safari/Chrome and physical-device acceptance are separate Phase 8G gates. Adding a branded browser to CI is allowed later if it is stable and materially improves evidence, but it must not be used to erase the real-device/browser acceptance requirement.

## Acceptance gates

Phase 8G closes only when all of the following are true:

- automated cross-browser foundation green in PR and `main` CI;
- 768 px Home boundary reproduced as stable or remediated across the automated engine matrix;
- navigation and bilingual shell green across required environments;
- hero/art geometry and canonical identities green;
- lead/conversion form usable;
- Team Builder, Process Analyzer and ROI interactions usable;
- keyboard/focus behavior accepted on desktop browsers;
- reduced-motion behavior accepted;
- no user-impacting console/runtime errors observed in accepted flows;
- Safari desktop real-browser evidence recorded;
- iOS Safari physical-device evidence recorded;
- Android Chrome physical-device evidence recorded;
- Edge desktop evidence recorded;
- final exact-release production verification green after the Phase 8G release marker is introduced.

## Non-goals of tranche 1

The first tranche does not:

- declare Phase 8G complete;
- change the public release marker;
- replace the existing Chromium regression suite;
- claim WebKit equals Safari acceptance;
- claim emulated Pixel/iPhone profiles equal physical-device acceptance;
- start work on `kairoseth.iaempleado.com`;
- begin Phase 8H commercial/content closure.

## Next gate

Run the new automated matrix in ordinary Web CI. Any reproducible 768 px or cross-engine defect becomes the immediate remediation backlog. After the automated foundation is stable, promote a bounded Phase 8G acceptance suite into exact-marker Production Verification and gather the remaining real-browser/device evidence before closure.

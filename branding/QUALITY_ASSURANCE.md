# IA Empleado — Browser visual QA

This document defines the minimum browser QA gates for the public IA Empleado website. It complements `UX_ACCESSIBILITY.md` and the static content/branding contracts.

## Required viewport matrix

The homepage must be checked at these CSS viewport widths on every pull request:

- 320 px
- 360 px
- 390 px
- 430 px
- 768 px

The automated browser suite also exercises the primary commercial route family at 390 px.

## Mobile hero geometry

At widths up to 760 px the canonical order is structural, not decorative:

1. Clara + Alex
2. IA Empleado core
3. Sofía + Javier
4. Human approval
5. CRM / ERP / Email

The browser suite verifies that each row has positive separation and that no content box escapes the hero stage. Decorative SVG paths, mist and orbit layers are excluded from layout assertions.

## Reflow and text scaling

A 390 px viewport is tested with the root text size increased to 200%. Acceptance requires:

- no horizontal page overflow;
- no overlap between the IA core and character rows;
- controls remain reachable;
- the layout grows vertically rather than clipping content.

## Accessibility automation

Axe runs against the homepage, Team Builder, collaboration demo and English homepage. Critical and serious WCAG A/AA findings fail CI.

The mobile menu receives a separate keyboard test for:

- initial focus placement;
- Tab wrap;
- Shift+Tab wrap;
- Escape close;
- focus restoration to the menu trigger.

## Route overflow smoke test

The 390 px route matrix covers the main acquisition surfaces: home, employees, employee detail, teams, team detail, collaboration, Team Builder, Process Analyzer, ROI, sectors, use cases, departments, integrations, comparisons and English home.

Any page-wide horizontal overflow fails CI.

## Visual diagnostics

Playwright runs with reduced motion to remove non-semantic animation noise. On failure CI keeps:

- an HTML report;
- failure screenshots;
- Playwright traces.

These artifacts are diagnostic evidence and should be used before changing CSS heuristically.

## Image / CLS discipline

Character images must declare intrinsic width and height using the canonical 4:5 portrait ratio. Above-the-fold hero portraits are eager-loaded and asynchronously decoded. Non-critical portrait surfaces should remain lazy where possible.

High-density portrait derivatives should be introduced when a surface needs to render a canonical portrait materially larger than the current source can support without upscaling. Character identity must never be replaced by a simplified vector to solve a performance problem.

## Engineering rule

A visual fix is not complete when it only matches one screenshot. It is complete when the changed contract passes the relevant viewport, reflow, keyboard, accessibility, build and content gates.

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

Character images must keep the canonical 4:5 intrinsic ratio. Critical public portrait surfaces render the approved WebP identity through `BrandCharacterImage`, which centralizes `next/image`, explicit `sizes`, async decoding and eager/lazy loading policy. Above-the-fold portraits may be eager; high fetch priority is reserved for portraits that are actually expected in the first visible row. Non-critical surfaces remain lazy.

Responsive image delivery is not the same as inventing source resolution. `next/image` can provide viewport/DPR-appropriate derivatives from the approved canonical source, but it cannot restore detail that does not exist in that source. If a future surface needs more source pixels than the current canonical WebP provides, create a genuine higher-resolution master from the approved artwork rather than upscaling, redrawing or replacing the character identity.

Small decorative portrait slots that already render far below the canonical source dimensions do not require a new high-density master merely for DPR support. Character identity must never be replaced by a simplified vector to solve a performance problem.

The static `Canonical character image delivery contract` in CI protects the critical responsive portrait surfaces from regressing to raw, one-size image delivery.

## Engineering rule

A visual fix is not complete when it only matches one screenshot. It is complete when the changed contract passes the relevant viewport, reflow, keyboard, accessibility, image-delivery, build and content gates.

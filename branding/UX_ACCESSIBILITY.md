# IA Empleado — UX & Accessibility Acceptance

This document defines the public web acceptance criteria for responsive UX and accessibility. It complements the visual brand system: visual fidelity is not considered complete if content overlaps, clips, becomes unreadable or cannot be operated without a pointer.

## Core rules

1. **Content owns layout; decoration does not.** On narrow screens, primary content must participate in normal/grid flow. Absolute positioning is reserved for decorative orbit, glow and connector layers.
2. **No overlap or clipping from 320px upward.** Text, character cards, IA core, human approval and system chips must not collide at supported widths.
3. **User zoom remains enabled.** The viewport must not set `maximum-scale` or disable scaling. Layout must tolerate text enlargement/reflow.
4. **Readable quiet text.** Informational text targets WCAG AA contrast (4.5:1 for normal text). Low-contrast styling is decorative only.
5. **Touch targets are at least 44 CSS px** for primary controls on coarse-pointer/mobile layouts.
6. **Keyboard access is complete.** Visible focus, Escape behavior and focus containment are required for modal-style navigation.
7. **Sticky navigation must not cover anchors.** Header height is represented by one shared token and used by `scroll-padding` / `scroll-margin`.
8. **Motion is optional.** Product meaning cannot depend on motion. Character drift is removed on mobile and decorative motion is disabled under `prefers-reduced-motion`.
9. **No fake runtime status.** Character dots are role accents, not green online/activity telemetry.
10. **Safe areas are respected** in mobile overlays on devices with display cutouts/home indicators.

## Home hero mobile structure

The canonical narrow-screen order is:

1. Clara + Alex
2. IA Empleado coordination core
3. Sofía + Javier
4. Human approval
5. CRM / ERP / Email

The first five are grid-flow content. Orbit paths, glows and connector SVG are decorative layers behind them.

At <= 360px, the two-column employee composition remains, but each employee card may switch its internal portrait/copy layout vertically to preserve readable role labels.

## Typography floor

For the compact visual system:

- employee names: approximately 14–15px minimum;
- employee role / secondary operational text: 13px minimum;
- core/approval labels: approximately 14–15px;
- system chips: approximately 13px;
- primary mobile CTA: approximately 14–15px or larger.

Metadata smaller than this may be used only when it is decorative/non-essential.

## Mobile navigation dialog

When open:

- `aria-expanded` and `aria-controls` reflect state;
- the panel exposes dialog/modal semantics;
- focus moves into the menu;
- Tab / Shift+Tab remain inside the menu;
- Escape closes the menu and restores focus to the toggle;
- main/footer content is inert while the modal navigation is active;
- body scrolling is locked and restored on close;
- overlay positioning respects safe-area insets.

## Contrast and system preferences

- normal informational text aims at WCAG AA contrast;
- `prefers-contrast: more` strengthens quiet text and boundaries;
- `forced-colors: active` keeps controls/focus discoverable;
- `prefers-reduced-motion: reduce` removes decorative animation;
- `-webkit-text-size-adjust` / `text-size-adjust` remain at 100% rather than suppressing text scaling.

## Regression contract

`scripts/check-ux-accessibility.mjs` protects the structural requirements above and runs in Web CI as **UX accessibility contract**.

Browser-level visual/accessibility automation can build on this contract, but the source-level gate must remain fast and deterministic so spacing, focus and zoom fundamentals cannot silently regress.

## Manual acceptance matrix

Before considering a major public-web visual phase complete, inspect at least:

- 320px phone
- 360px phone
- 390/393px iPhone-class phone
- 430px large phone
- 768px tablet portrait
- 1024px tablet/desktop transition
- desktop >= 1280px

For the home hero, verify zero content collisions, no horizontal scrolling, readable text, reachable controls, sticky-anchor offsets, menu focus behavior, reduced-motion behavior and layout resilience with enlarged browser text.

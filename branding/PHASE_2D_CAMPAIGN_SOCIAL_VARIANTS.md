# IA Empleado — Branding Phase 2D: reusable campaign/social variants

Status: **Complete and production-verified — 2026-09-13**

## Goal

Branding Phase 2D turns the production-verified IA Empleado identity into reusable campaign and social outputs without creating a second visual system or rebuilding each piece manually.

The phase reuses the stable website grammars established by Phases 1, 2A, 2B and 2C:

- canonical Clara / Alex / Sofía / Javier identities;
- role-family semantics;
- Team/Department collaboration language;
- sector operating-context language;
- explicit system and human-control boundaries;
- light-first IA Empleado visual identity.

Campaign media remains explanatory marketing material. It does not grant product authority, imply universal integrations or turn indicative calculations into verified customer outcomes.

## Existing foundation

The repository already includes:

- generated Open Graph / share cards at `/brand-preview/{locale}/{surface}`;
- `1200 × 630` OG rendering through `lib/brand-social-previews.tsx`;
- reusable `1600 × 900`, `1080 × 1080` and `1080 × 1920` SVG masters;
- canonical media rules in `branding/SOCIAL_MEDIA_SYSTEM.md`.

Phase 2D keeps that verified OG path unchanged and adds a separate multi-format campaign renderer.

## Generated campaign route

Reusable campaign outputs are generated at:

`/brand-campaign/{locale}/{format}/{surface}`

Supported locales:

- `es`
- `en`

Supported formats:

| Format | Dimensions | Primary use |
| --- | --- | --- |
| `landscape` | `1600 × 900` | campaign banners, demo/video stills, deck imagery |
| `square` | `1080 × 1080` | LinkedIn/Instagram square posts |
| `portrait` | `1080 × 1350` | portrait social feed posts |
| `story` | `1080 × 1920` | Stories, Reels/TikTok covers and vertical campaigns |

The route validates both the format and the registered content surface. Unknown values return 404 rather than silently rendering a generic fallback.

## Shared surface registry

Phase 2D uses the same semantic surface vocabulary already established for branded previews:

- `home`
- `employees`
- `teams`
- `collaboration`
- `team-builder`
- `process-analyzer`
- `roi`
- `sectors`
- `use-cases`
- `departments`
- `integrations`

This keeps website metadata and campaign media aligned around the same public product concepts.

## Composition rules

Each generated asset must contain:

1. IA Empleado identity;
2. one clear commercial idea;
3. localized supporting copy;
4. canonical characters only when semantically relevant;
5. a restrained CTA suitable for the surface;
6. enough negative space to survive the target channel crop/safety area.

Character placement is contextual, not decorative. The smallest truthful character set should be used for each surface.

## ROI boundary

`roi` deliberately renders **without a named canonical character**.

A financial/capacity scenario belongs to visible assumptions and deterministic calculations, not to Clara, Alex, Sofía or Javier as if one character personally guaranteed the estimate.

The renderer therefore uses a neutral scenario visualization for ROI campaign media.

## Reusable frame masters

Phase 2D uses one master per generated format:

- `public/branding/media/demo-frame.svg` — landscape `1600 × 900`;
- `public/branding/media/social-square-frame.svg` — square `1080 × 1080`;
- `public/branding/media/portrait-frame.svg` — portrait `1080 × 1350`;
- `public/branding/media/story-frame.svg` — story `1080 × 1920`.

The portrait frame was added in Phase 2D so portrait output does not stretch the square system.

## Implementation contract

- `lib/brand-campaign-media.tsx` — localized multi-format campaign renderer.
- `app/brand-campaign/[locale]/[format]/[surface]/route.tsx` — validated **Node.js** image route.
- `sharp` — in-memory rasterization layer for canonical WebP/SVG assets before they enter `ImageResponse`.
- `public/branding/media/portrait-frame.svg` — dedicated portrait master.
- `scripts/check-campaign-media.mjs` — static Phase 2D contract.
- `tests/campaign-media.spec.ts` — generated image status/dimension and invalid-route browser contract.
- `branding/SOCIAL_MEDIA_SYSTEM.md` — canonical distribution/export guidance.
- production release marker: `branding-phase-2d-campaign-social-variants`.

The website continues serving the approved canonical portraits as WebP. Sharp is used only by the generated campaign route to preserve those same source pixels while converting them to PNG in memory for `ImageResponse` compatibility. Campaign rendering must not reintroduce Satori-incompatible `translate(calc(...))`, unsupported external image formats or `z-index` assumptions.

## Truthfulness and identity boundaries

1. Canonical portraits are reused, not redrawn or reassigned.
2. Campaign copy ships in ES and EN together.
3. ROI and value media remain estimates, not guaranteed outcomes.
4. Integration visuals do not imply universal connector availability.
5. Human-control semantics remain intact when consequential actions are referenced.
6. Restricted/high-impact use cases are not reframed as unrestricted self-service automation.
7. Campaign routes are reusable media resources, not a new product/runtime dependency.
8. OG/share rendering remains independently stable.

## Validation contract

Static CI verifies:

- all four campaign formats and exact dimensions;
- all four frame masters exist and remain valid SVGs;
- the campaign renderer uses the canonical character registry;
- ROI has no named canonical character assignment;
- the route validates both format and surface;
- the campaign route runs on Node.js and uses Sharp for ImageResponse-compatible canonical asset rasterization;
- the renderer does not use the Satori-incompatible `translate(calc(...))` positioning pattern or `zIndex`;
- ES/EN layouts carry the Phase 2D release marker;
- browser QA and production verification include the campaign media suite.

Browser QA verifies representative ES/EN outputs across all four formats:

- HTTP 200;
- `image/png` content type;
- exact intrinsic width/height;
- invalid format returns 404;
- invalid surface returns 404.

The browser suite does not duplicate all 11 surfaces × 4 formats because copy/surface membership is protected statically and the renderer path is shared. It covers every format in both locales and multiple surface families, including ROI.

## Production evidence

Branding Phase 2D is closed with the following evidence:

- PR **#51** — `feat: add reusable campaign and social media variants`;
- PR Web CI **#128** — run `34743974890` — success;
- squash merge to `main`: `745d3d1f6371cdb8200afd7a7aa98cb8ff8cc702`;
- `main` Web CI **#129** — run `34744316003` — success;
- Hostinger confirmed serving release marker `branding-phase-2d-campaign-social-variants`;
- Production Verification **#9** — run `34744481711` — success directly against `https://iaempleado.com`;
- production checks passed for campaign media, internal hero geometry, role families, Team/Department compositions, sector hero art, responsive UX and accessibility;
- no production diagnostic artifact was uploaded because the verification suite had no failures.

## Release criteria

All Phase 2D release criteria are satisfied:

1. four reusable generated formats exist with exact dimensions;
2. both locales use the same registered surface model;
3. portrait has a dedicated reusable master;
4. OG/share metadata remains unchanged and its existing contract still passes;
5. ROI remains character-neutral;
6. static branding/media/campaign contracts pass;
7. TypeScript and production build pass;
8. browser QA validates generated campaign resources;
9. `main` CI passes after merge;
10. Hostinger serves `branding-phase-2d-campaign-social-variants`;
11. Production Verification passes campaign media directly against `https://iaempleado.com`;
12. production evidence is recorded here.

Branding Phase 2D is therefore **complete and production-verified**.

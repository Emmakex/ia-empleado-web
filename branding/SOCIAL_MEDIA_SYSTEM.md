# IA Empleado — Social, share and demo media system

This document defines how the approved visual identity is reused outside the page body: Open Graph cards, social sharing, demo/video frames, campaign exports and presentation captures.

## Core rule

Every public media asset must remain recognizably part of the same IA Empleado universe used on the website:

> Personas. IA. Sistemas. Un mismo equipo.  
> People. AI. Systems. One team.

The public identity of Clara, Alex, Sofía and Javier is canonical. Their approved portraits must not be redrawn, substituted with generic avatars or assigned to unrelated catalog roles.

## Generated social previews

Production previews are generated at:

`/brand-preview/{locale}/{surface}`

Supported locales:

- `es`
- `en`

Supported surfaces:

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

The renderer outputs `1200 × 630` social cards and uses the production canonical character registry.

### Distribution rules

- Home uses the four Reference Employees because the proposition is company/team level.
- Employee and team surfaces use canonical characters only for approved Reference Employees.
- Collaboration, Team Builder and Process Analyzer use characters as participants in a visible process, not as decorative mascots.
- ROI deliberately uses the IA Empleado core and scenario visualization instead of attributing a financial estimate to a named employee.
- Integrations keep systems, permissions and human control semantically separate from employee identity.
- Copy must remain localized. Do not bake Spanish copy into English cards or vice versa.

## Generated campaign variants

Branding Phase 2D adds reusable campaign outputs without changing the verified Open Graph renderer.

Production campaign resources are generated at:

`/brand-campaign/{locale}/{format}/{surface}`

They reuse the same registered semantic surfaces listed above and support the same `es` / `en` localization model.

Supported formats:

- `landscape` — `1600 × 900` for campaign banners, demo/video stills and sales-deck imagery;
- `square` — `1080 × 1080` for LinkedIn/Instagram square posts;
- `portrait` — `1080 × 1350` for portrait social-feed posts;
- `story` — `1080 × 1920` for Stories, Reels/TikTok covers and vertical campaign media.

The campaign route validates both `format` and `surface`. Unknown values return 404 rather than rendering a misleading generic fallback.

Campaign pieces follow one-idea composition: identity, one commercial proposition, localized support copy, only the characters needed by the surface, and a restrained CTA. ROI campaign variants deliberately remain character-neutral because an indicative financial/capacity scenario must not look like a promise made by a named AI Employee.

## Reusable production frames

### Demo/video / landscape frame

`/branding/media/demo-frame.svg`

Canvas: `1600 × 900` (16:9).

Use as a transparent overlay around product captures, short demo recordings, webinar clips, campaign stills and sales-deck imagery. Keep the central content area unobstructed.

### Square social frame

`/branding/media/social-square-frame.svg`

Canvas: `1080 × 1080`.

Use for LinkedIn/Instagram square compositions, employee introductions and campaign quote cards. Add localized copy in the composition layer rather than editing the master frame.

### Portrait feed frame

`/branding/media/portrait-frame.svg`

Canvas: `1080 × 1350`.

Use for portrait LinkedIn/Instagram feed compositions. This is a dedicated master; do not stretch the square frame to create portrait output.

### Story / vertical frame

`/branding/media/story-frame.svg`

Canvas: `1080 × 1920` (9:16).

Use for Stories, Reels/TikTok covers and vertical product walkthroughs. Keep critical content away from the top/bottom platform UI safety zones.

## Composition hierarchy

1. IA Empleado mark / identity.
2. One clear commercial idea.
3. Canonical people when the surface is about employees or teams.
4. Process/system context when the surface is about workflow or integrations.
5. Human-control semantics when decisions, permissions or consequential actions are shown.
6. URL or CTA only when the export format actually needs it.

Do not fill every composition with all four characters. Use the smallest truthful set that communicates the role of the surface.

## Claim safety

Marketing media must preserve the same truthfulness rules as the website:

- simulations are labelled as demos or indicative experiences when applicable;
- ROI is an estimate based on visible assumptions, never a guaranteed saving;
- integration visuals do not imply universal connector availability;
- a character portrait does not imply autonomous authority or a human/legal identity;
- restricted/high-impact use cases are not promoted as unrestricted self-service automation.

## Export workflow

Use the SVG frames as masters. Generated campaign endpoints compose localized raster outputs from the canonical renderer and frame masters; manual campaign-specific edits must still start from these same sources rather than fork the visual system.

Keep copy outside reusable SVG masters so ES/EN can ship together.

Canonical outputs:

- Open Graph / LinkedIn share: `1200 × 630` through `/brand-preview/{locale}/{surface}`;
- landscape campaign/demo: `1600 × 900` through `/brand-campaign/{locale}/landscape/{surface}`;
- square social: `1080 × 1080` through `/brand-campaign/{locale}/square/{surface}`;
- portrait feed: `1080 × 1350` through `/brand-campaign/{locale}/portrait/{surface}`;
- story/reel cover: `1080 × 1920` through `/brand-campaign/{locale}/story/{surface}`.

## Regression requirements

CI must verify that:

- the social preview renderer and route exist;
- the campaign renderer and validated multi-format route exist;
- ES and EN home metadata expose a `summary_large_image` preview;
- the four interactive experiences and the main commercial hubs reference their branded preview surface;
- the four reusable SVG frame masters exist and remain valid SVG files with the expected dimensions;
- canonical character asset paths remain the source used by generated media;
- ROI generated media stays character-neutral;
- campaign browser QA validates exact generated dimensions and invalid-route behavior;
- Production Verification exercises campaign media against `iaempleado.com` before Phase 2D closes.

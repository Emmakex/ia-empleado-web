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

## Reusable production frames

### Demo/video frame

`/branding/media/demo-frame.svg`

Canvas: `1600 × 900` (16:9).

Use as a transparent overlay around product captures, short demo recordings, webinar clips and sales-deck video stills. Keep the central content area unobstructed.

### Square social frame

`/branding/media/social-square-frame.svg`

Canvas: `1080 × 1080`.

Use for LinkedIn/Instagram square compositions, employee introductions and campaign quote cards. Add localized copy in the composition layer rather than editing the master frame.

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

Use the SVG frames as masters. Create campaign-specific raster/video exports from them, not the other way around. Keep source copy outside the reusable frame when possible so ES/EN can ship together.

Recommended derived outputs:

- Open Graph / LinkedIn share: `1200 × 630`;
- square social: `1080 × 1080`;
- portrait feed: `1080 × 1350` derived from the square system;
- story/reel cover: `1080 × 1920`;
- demo/video: `1920 × 1080` or `1600 × 900` using the 16:9 master frame.

## Regression requirements

CI must verify that:

- the social preview renderer and route exist;
- ES and EN home metadata expose a `summary_large_image` preview;
- the four interactive experiences and the main commercial hubs reference their branded preview surface;
- the three reusable SVG frame masters exist and remain valid SVG files;
- canonical character asset paths are still the source used by the social renderer.

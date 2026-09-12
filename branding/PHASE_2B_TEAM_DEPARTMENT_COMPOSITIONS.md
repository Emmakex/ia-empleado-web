# IA Empleado — Branding Phase 2B: Team and Department compositions

Status: **implementation in progress**

## Goal

Branding Phase 2B reuses the approved Phase 2A role families inside richer multi-role compositions for **AI Teams** and **Departments**.

The objective is not to add decorative complexity. The scene must make four operational ideas understandable at a glance:

1. which roles participate;
2. how work and context move through explicit handoffs;
3. which business systems are shared by the process;
4. where human approval, exceptions or sensitive authority remain visible.

## Shared visual contract

Teams and Departments now use one reusable composition renderer rather than maintaining separate visual languages.

`BrandCollaborationComposition` combines:

- canonical Clara / Alex / Sofía / Javier portraits through `BrandCharacterImage`;
- the Phase 2A role motifs: conversation, operations, ledger and pipeline;
- a central handoff hub representing coordinated work, rules and traceability;
- representative shared-system labels;
- an explicit human-control boundary;
- generic catalog-role treatment when a composition includes a role without a canonical deep-profile character.

The underlying content and authority model remains owned by the existing Team and Department content engines. The visual layer does not grant new capabilities or imply that every displayed connector is available in every deployment.

## Surfaces

### AI Team deep pages

All four reference Team compositions use the shared renderer:

- Sales;
- Ecommerce;
- Administration;
- Travel.

The hero composition receives the real Team members and system categories already defined by `lib/team-content-engine.ts`.

### Department deep pages

All six Department pages use the same collaboration language:

- Customer Support;
- Administration;
- Accounting & Billing;
- Sales;
- Ecommerce Operations;
- Travel & Reservations.

Deep Reference Employees preserve their canonical visual family. When a department needs additional catalog roles, the scene can show a neutral catalog participant without inventing a new named character.

### Integrations

Integration detail pages continue using `BrandOrganizationScene` in this phase. Phase 2B intentionally does **not** collapse system-centric integration diagrams into the Team/Department composition because their visual purpose is different: they explain authorized system access rather than multi-role collaboration.

## Implementation contract

- `components/brand-collaboration-composition.tsx` — shared renderer.
- `app/brand-collaboration-compositions.css` — responsive geometry, role motifs and motion.
- `components/team-detail-page.tsx` — Team integration.
- `components/department-detail-page.tsx` — Department integration.
- `scripts/check-team-department-compositions.mjs` — static CI contract.
- `tests/team-department-compositions.spec.ts` — browser geometry and reflow contract.
- `scripts/check-character-image-delivery.mjs` — canonical responsive portrait delivery also covers the shared renderer.
- production release marker: `branding-phase-2b-team-department-compositions`.

## Identity and truthfulness boundaries

1. Canonical characters are reused, not redrawn or renamed.
2. Role-specific motifs come from Phase 2A; Team/Department scenes do not invent a second role grammar.
3. A displayed system is representative context from the page model, not a universal connector-availability claim.
4. Generic catalog roles remain visibly generic rather than being assigned a fabricated canonical employee identity.
5. Human approval and sensitive authority remain visually separate from autonomous workflow execution.
6. EN and ES ship together.
7. Responsive reflow must preserve meaning and avoid horizontal overflow.
8. Motion must respect `prefers-reduced-motion`.

## Validation contract

Browser QA covers every deep Team and Department route in both languages on desktop:

- 4 Teams × 2 locales = 8 routes;
- 6 Departments × 2 locales = 12 routes;
- total desktop coverage = 20 routes.

Spanish routes are additionally exercised at a 390px mobile viewport to stress the longer labels and reflow behavior.

The browser gate verifies:

- correct Team/Department variant and context mapping;
- participant containment;
- known role motifs;
- collision-free central handoff hub on desktop;
- systems and human-control blocks remain inside the scene;
- mobile composition preserves all functional blocks;
- no horizontal page overflow.

## Release criteria

Phase 2B is complete only when:

- all four Team deep pages and all six Department deep pages use the shared collaboration renderer in ES and EN;
- Phase 2A character/motif mapping is preserved;
- canonical portraits still use responsive `BrandCharacterImage` delivery;
- static contracts, TypeScript, browser QA and production build pass;
- Hostinger serves `branding-phase-2b-team-department-compositions`;
- production Playwright passes Team/Department composition tests against `iaempleado.com`;
- production evidence is recorded before advancing.

## Next after 2B

Branding Phase 2C should apply the stable visual grammar to **sector-specific hero art**. Campaign and social variants follow after the website surfaces are stable so those resources can be generated from a proven system rather than from one-off creative treatments.

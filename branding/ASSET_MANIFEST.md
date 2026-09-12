# IA Empleado — Asset manifest

All paths below are production public paths relative to the site root.

| Asset | Public path | Purpose |
| --- | --- | --- |
| Master mark | `/branding/ia-empleado-mark.svg` | Header, footer, favicon source, compact brand identifier |
| Monochrome mark | `/branding/ia-empleado-mark-mono.svg` | Single-color print, dark/light constrained contexts |
| Humanized AI Employee | `/branding/ia-employee-human.svg` | Generic UI avatar, diagrams and employee-coordination prototypes |
| Clara — Customer Support | `/branding/characters/clara-customer-support.svg` | Reference Employee portrait for customer support surfaces |
| Alex — Administrative | `/branding/characters/alex-administrative.svg` | Reference Employee portrait for administration surfaces |
| Sofía — Accounting & Billing | `/branding/characters/sofia-accounting.svg` | Reference Employee portrait for accounting/billing surfaces |
| Javier — Sales / SDR | `/branding/characters/javier-sales.svg` | Reference Employee portrait for commercial/sales surfaces |
| Orbit pattern | `/branding/orbit-pattern.svg` | Low-contrast background texture and animation reference |
| People + AI + systems diagram | `/branding/people-ai-systems.svg` | Explainers, decks, landing sections, social/campaign composition source |

## Usage guidance

### Master mark

Minimum recommended digital size: `28 × 28px`.

Clear space: at least 25% of the mark width around all sides.

Do not:

- rotate the mark;
- recolor individual nodes randomly;
- place text inside the mark;
- stretch non-proportionally;
- add extra nodes to represent specific employees.

### Humanized AI Employee

Use the generic portrait for the **concept of an AI Employee**, not as the literal identity of every role.

For the four Reference Employees, use the role-specific canonical assets:

- Clara — Customer Support / Atención al Cliente;
- Alex — Administrative / Administrativo;
- Sofía — Accounting & Billing / Contabilidad y Facturación;
- Javier — Sales / SDR / Comercial.

These names and portraits are a visual identity layer for the public commercial website. They do not imply a human employee, legal identity or independent product availability beyond the documented Reference Employee scope.

### Role color accents

Role accent colors support recognition but do not replace the master IA Empleado palette:

- Clara: blue — communication/customer context;
- Alex: violet — organization/coordination;
- Sofía: teal — validation/financial operations;
- Javier: amber — commercial opportunity/action.

Success green remains semantic. Do not recolor role cards green simply because a role is active.

### Orbit pattern

Keep opacity low (`0.04–0.16`) in ordinary product UI. Larger hero compositions may use up to roughly `0.20–0.26` when contrast remains quiet. It is atmosphere, not content.

### People + AI + systems

Use when explaining the system-level proposition. Embedded labels are intentionally minimal; localized explanatory copy should remain outside the SVG in HTML.

## Production application status

### Branding Phase 1

Implemented: master mark, generic humanized AI Employee, core palette/tokens, pattern, favicon source and brand contract.

### Branding application — Homepage

The public homepage uses:

- the master mark in header/footer;
- the four canonical Reference Employee characters in the hero collaboration scene;
- meaningful task-transfer motion;
- visible human-approval state;
- system chips around the team;
- the same four characters in the Reference Employee cards;
- responsive and reduced-motion fallbacks.

## Next reusable asset phases

- employee-detail hero/callout application;
- AI Team compositions using the same four canonical characters where relevant;
- department and sector scene families;
- proof/demo media frames and video package;
- social/Open Graph exports derived from the canonical system.

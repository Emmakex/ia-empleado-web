# IA Empleado — Asset manifest

All paths below are production public paths relative to the site root.

| Asset | Public path | Purpose |
| --- | --- | --- |
| Master mark | `/branding/ia-empleado-mark.svg` | Header, footer, favicon source, compact brand identifier |
| Monochrome mark | `/branding/ia-empleado-mark-mono.svg` | Single-color print, dark/light constrained contexts |
| Humanized AI Employee | `/branding/ia-employee-human.svg` | Generic UI avatar, diagrams and employee-coordination prototypes |
| Clara — Customer Support | `/branding/characters/clara-canonical.webp` | Canonical approved Reference Employee portrait for customer support surfaces |
| Alex — Administrative | `/branding/characters/alex-canonical.webp` | Canonical approved Reference Employee portrait for administration surfaces |
| Sofía — Accounting & Billing | `/branding/characters/sofia-canonical.webp` | Canonical approved Reference Employee portrait for accounting/billing surfaces |
| Javier — Sales / SDR | `/branding/characters/javier-canonical.webp` | Canonical approved Reference Employee portrait for commercial/sales surfaces |
| Orbit pattern | `/branding/orbit-pattern.svg` | Low-contrast background texture and animation reference |
| People + AI + systems diagram | `/branding/people-ai-systems.svg` | Explainers, decks, landing sections, social/campaign composition source |

## Usage guidance

### Master mark

Minimum recommended digital size: `28 × 28px`.

Clear space: at least 25% of the mark width around all sides.

Do not rotate the mark, recolor individual nodes randomly, place text inside the mark, stretch it non-proportionally or add extra nodes to represent specific employees.

### Humanized AI Employee

Use the generic portrait for the **concept of an AI Employee**, not as the literal identity of every role.

For the four Reference Employees, the approved WebP portraits above are the **canonical visual identity**:

- Clara — Customer Support / Atención al Cliente;
- Alex — Administrative / Administrativo;
- Sofía — Accounting & Billing / Contabilidad y Facturación;
- Javier — Sales / SDR / Comercial.

Older simplified SVG role portraits may remain only as legacy/prototype material. They must not replace the approved canonical portraits on public surfaces.

The names and portraits are a visual identity layer for the public commercial website. They do not imply a human employee, legal identity or independent product availability beyond the documented Reference Employee scope.

### Role color accents

- Clara: blue — communication/customer context;
- Alex: violet — organization/coordination;
- Sofía: teal — validation/financial operations;
- Javier: amber — commercial opportunity/action.

Success green remains semantic and must not become a decorative role color.

### Orbit pattern

Keep opacity low (`0.04–0.16`) in ordinary product UI. Larger hero compositions may use up to roughly `0.20–0.26` when contrast remains quiet. It is atmosphere, not content.

### People + AI + systems

Use when explaining the system-level proposition. Embedded labels remain minimal; localized explanatory copy stays in HTML.

## Production application status

### Branding Phase 1

Implemented: master mark, generic humanized AI Employee, core palette/tokens, pattern, favicon source and brand contract.

### Canonical character fidelity correction

The homepage uses the approved Clara, Alex, Sofía and Javier artwork. The mobile collaboration scene uses a deliberate composition instead of a scaled-down desktop diagram.

### Employee surfaces

The employee catalog, the four deep Reference Employee pages and their public catalog cards reuse the same canonical character registry. No page is allowed to invent a different public identity for Clara, Alex, Sofía or Javier.

### AI Team surfaces

The AI Team index and team detail pages reuse the canonical Reference Employee portraits when those roles participate in a composition. Catalog-only roles remain visually neutral and are not given invented faces. Team scenes retain explicit systems/process context and visible human-control semantics.

### Sector surfaces

The Ecommerce, Travel, Professional Services and Sales sector pages reuse the same canonical characters wherever a Reference Employee participates. Each sector gets a contextual visual treatment while preserving the master IA Empleado system. Catalog-only roles remain neutral, system context stays explicit and human approval remains visible.

### Use-case surfaces

The six public use-case patterns reuse the same visual grammar: canonical Reference Employees, neutral catalog roles, process core, system context and explicit human escalation. The workflow visuals distinguish automatable, assisted and human responsibility without implying unrestricted autonomy.

## Next reusable asset phases

- department and integration visual families;
- simulator/interactive surface skinning;
- proof/demo media frames and video package;
- social/Open Graph exports derived from the canonical system.

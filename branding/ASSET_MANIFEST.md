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
| Demo/video frame | `/branding/media/demo-frame.svg` | 16:9 transparent overlay for demos, recordings and sales-deck stills |
| Square social frame | `/branding/media/social-square-frame.svg` | 1080 × 1080 master overlay for square campaign compositions |
| Story frame | `/branding/media/story-frame.svg` | 1080 × 1920 master overlay for vertical stories/reels/covers |

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

### Department surfaces

The six department pages now use a shared organizational scene: participating Reference Employees surround a coordinated-work core, connected system categories remain visible and human approval is a separate semantic layer. Deep employee cards reuse the canonical portrait and approved role accent; catalog-only roles remain neutral.

### Integration surfaces

The seven integration categories use the same brand grammar while emphasizing **source of truth, READ, WRITE, audit and human approval**. A system category is never presented as a universal connector. Employee identity is reused only for the approved Reference Employees that are actually related to that integration.

### Interactive experience surfaces

The four interactive experiences use a shared motion and state language while preserving the meaning of each tool:

- **Cómo trabajan juntos / See the team work** maps the active simulator actor to Clara, Alex, Sofía or Javier only when the step actually belongs to that approved Reference Employee. Event, system, human-control and outcome states remain visually distinct.
- **Team Builder** converts a recommendation into a visible team composition. Approved Reference Employees use canonical portraits; catalog-only roles stay neutral; restricted areas and human/permission validation remain explicit.
- **Process Analyzer** reuses canonical portraits in the proposed workflow and summary when those roles participate, while preserving the separate `automated`, `assisted` and `human` responsibility semantics.
- **ROI Estimator** uses the master IA Empleado core and a workload → potential-capacity visual. Financial estimates are deliberately **not attributed to a specific character or team** and remain scenario-based estimates, not promised outcomes.

Interactive visuals have dedicated tablet/mobile compositions instead of scaling desktop scenes down. Motion is progressive enhancement and respects `prefers-reduced-motion`.

### Commercial media and social previews

A central `1200 × 630` renderer now produces localized Open Graph/Twitter cards from the canonical brand registry. Home, the four interactive experiences and the main commercial hubs use branded share previews instead of generic metadata-only cards.

Reusable transparent SVG masters are available for 16:9 demo/video, square social and vertical story compositions. Campaign copy remains outside the frame masters so EN/ES can be produced from the same source system.

See `branding/SOCIAL_MEDIA_SYSTEM.md` for surface keys, export sizes, composition hierarchy and claim-safety rules.

## Next reusable asset phases

- comparison/proof surfaces where additional visual evidence improves evaluation;
- campaign-specific content packs derived from the reusable masters;
- future canonical characters for catalog roles only after explicit visual approval.

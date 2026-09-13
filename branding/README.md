# IA Empleado — Branding workspace

This folder is the canonical source of truth for the public visual identity of **IA Empleado**.

## Approved direction

**Concept 1 — Personas. IA. Sistemas. Un mismo equipo.**

The brand should feel human, intelligent, collaborative, trustworthy and operational. The AI Employee is represented as a **humanized digital colleague**, not as a toy robot, mascot or anonymous chatbot.

Core visual metaphor:

```text
People ↔ AI Employees ↔ Business systems
              ↓
        governed outcomes
```

## Phase status

**Branding Phase 1 — Core visual system: Complete and production-verified (2026-09-12).**

**Branding Phase 2A — Role visual families: Complete and production-verified (2026-09-12).**

Phase 2A deepens the existing identity with reusable role-specific visual grammars for Clara, Alex, Sofía and Javier without replacing or redrawing the approved canonical character identities.

**Branding Phase 2B — Team and Department compositions: Complete and production-verified (2026-09-12).**

Phase 2B reuses the same role grammars inside one shared multi-role composition for deep Team and Department pages. The composition makes handoffs, shared systems and human-control boundaries visible while preserving the canonical character identities and existing product authority model. Hostinger release `branding-phase-2b-team-department-compositions` passed Production Verification #5.

**Next: Branding Phase 2C — sector-specific hero art.** Reuse the stable identity, role and collaboration grammars to make Ecommerce, Travel, B2B Services and Retail visually distinct without creating one-off illustration systems.

## Folder contract

- `BRAND_SYSTEM.md` — strategy, visual language and usage rules.
- `ASSET_MANIFEST.md` — reusable asset inventory and where each asset belongs.
- `PHASE_1_VALIDATION.md` — CI and production-browser evidence closing Branding Phase 1.
- `PHASE_2_ROLE_VISUAL_FAMILIES.md` — role-family mapping, implementation rules and Phase 2A production-verification evidence.
- `PHASE_2B_TEAM_DEPARTMENT_COMPOSITIONS.md` — shared Team/Department composition contract and Phase 2B production-verification evidence.
- `tokens.json` — portable design tokens for web, product, decks and future apps.
- `../public/branding/` — production-ready SVG/assets served by the website.
- `../app/brand-system.css` — active web implementation of the brand tokens and visual rules.
- `../app/brand-role-families.css` — role-specific visual grammar for the four Reference Employees.
- `../app/brand-collaboration-compositions.css` — shared Team/Department multi-role composition geometry.

## Primary message

ES: **Personas. IA. Sistemas. Un mismo equipo.**

EN: **People. AI. Systems. One team.**

Supporting narrative remains:

```text
Empleado IA → Equipo IA → Empresa aumentada por IA
```

## Release rule

Branding is a product contract. New visual assets must preserve:

1. humanized AI representation;
2. light-first premium presentation;
3. indigo/violet intelligence layer;
4. green only for positive/approved/completed states;
5. real workflow meaning over decorative sci-fi;
6. EN/ES parity when text is embedded;
7. reduced-motion and accessibility compatibility;
8. reusable vector-first assets where possible.

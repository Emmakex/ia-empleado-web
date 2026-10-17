# IA Empleado — Phase 5 Conversion & Indexability Audit

**Status:** complete
**Reviewed:** 2026-10-17
**Scope:** conversion utilities and legal surfaces on `iaempleado.com`
**Policy:** `Emmakex/ia-empleado/docs/EDITORIAL_SEO_GEO_GUIDE.md`

## Decision rule

Phase 5 does not create acquisition URLs. Each existing utility/legal route receives an explicit indexability decision and a boundary against the canonical commercial owners. `INDEX` means the route is useful, crawlable and non-competitive but is not promoted as a head-term owner. `INDEX AS DISTINCT SEARCH OWNER` is reserved for a tool/query intent that is materially different from the commercial owner. No route in this audit is allowed to inherit the primary intent of Home, `/empleados-ia`, `/equipos-ia`, Growth, sectors, use cases, departments, integrations or comparisons.

## Current-state verification

Before this audit, `main` was `56b2ee68233c5529042bf04b11b75430717e91eb` (Phase 4 closure), there were no open PRs, and Production Verification run 168 for that commit completed successfully. Phase 1–4 were therefore green before Phase 5 started.

## Search evidence

Semrush snapshots captured 2026-10-17, ES and UK researched separately:

- ES `equipo ia`: 30 searches/month, CPC €0 reported, competition 0.20, KD 0 (insufficient competition data; not interpreted as easy). This term remains owned by `/equipos-ia`, not the builder.
- ES `automatizar procesos con ia`: 140/month, CPC 2.87, competition 0.41, KD 40. This remains owned by the process-automation Growth pillar, not the analyzer.
- ES `analizar procesos`: 10/month, CPC 0, competition 0, KD 0. Useful only as weak supporting evidence for the analyzer.
- UK `ai team`: 110/month, CPC 5.60, competition 0.43, KD 44. This remains owned by `/en/ai-teams`, not the builder.
- UK `ai agents working together`: 20/month, CPC 0, competition 0.46, KD 0. This supports a narrow collaboration/explainer intent.
- UK `process analysis`: 140/month, CPC 4.09, competition 0.06, KD 26. The phrase is broad; the analyzer may use it as supporting vocabulary but must not claim generic process-analysis category ownership.
- UK `ai roi calculator`: 30/month, CPC 7.93, competition 0.65, KD 0. This is the clearest distinct tool-intent signal in Phase 5.
- UK `artificial intelligence roi`: 10/month, CPC 12.68, competition 0.54, KD 0.
- `solicitar demo ia` / `request ai demo` returned no meaningful quantitative volume in the checked datasets. The demo route is therefore conversion/navigational, not an acquisition keyword owner.

No Search Console dataset was available in this run, so no ranking/impression metric is invented.

## Surface decisions

| Surface | ES/EN role | Decision | Canonical boundary | Reason |
| --- | --- | --- | --- | --- |
| `/como-trabajan-juntos` / EN counterpart | collaboration explainer/simulator | **INDEX AS DISTINCT SEARCH OWNER** | does not own `equipo IA` / `ai team` | Crawlable scenario content explains multi-agent handoffs, systems and human controls; UK has narrow evidence for `ai agents working together` (20/month). |
| `/disena-tu-equipo-ia` / `/en/design-your-ai-team` | team composition configurator | **INDEX** | `/equipos-ia` owns team-category demand | Useful conversion utility with SSR methodology/FAQ, but `equipo IA` / `ai team` demand belongs to the team hub. Keep indexable without repositioning it as a category landing. |
| `/mejora-tu-proceso` / `/en/improve-your-process` | process analyzer | **INDEX** | Growth process-automation owner keeps `automatizar procesos con IA` / business process automation | The tool is an interactive diagnostic with crawlable methodology. It must not compete for process-automation head terms. |
| `/calculadora-roi` / `/en/roi-calculator` | ROI calculator | **INDEX AS DISTINCT SEARCH OWNER** | cost/ROI Growth content keeps educational/commercial ROI explanation | Tool intent is distinct. UK `ai roi calculator` has 30/month, CPC 7.93; the calculator answers calculation intent rather than the broader ROI education intent. |
| `/solicitar-demo` / `/en/request-demo` | conversion endpoint | **INDEX** | no acquisition keyword ownership | Branded/navigational conversion surface. No meaningful checked keyword volume; retain for trust, navigation and conversion, not SEO expansion. |
| legal notice ES/EN | legal/trust | **INDEX** | no commercial ownership | Legal identity is complete in code; route already indexes only when identity is complete. |
| privacy policy ES/EN | privacy/trust | **INDEX** | no commercial ownership | Privacy information supports consent and trust and does not compete with acquisition content. |

## Technical checks

- All five conversion utilities already have dedicated ES/EN canonicals and hreflang alternates.
- Collaboration, Team Builder, Process Analyzer and ROI Calculator expose explanatory server-rendered content in addition to client interaction; they are not JS-only thin tools.
- The demo route preserves source/intent context and privacy language; it is a conversion endpoint, not a search landing.
- Legal routes use conditional robots metadata tied to legal identity completeness. The current legal identity fields are complete, so indexing is deliberate rather than accidental.
- All reviewed surfaces are currently represented in the sitemap. Because this audit deliberately retains them as indexable, no sitemap exclusion is required.
- No redirect, merge or new public URL is justified in Phase 5.

## Internal-link and conversion boundaries

1. Team Builder should route discovery toward `/equipos-ia` and employee profiles; category terms remain owned there.
2. Process Analyzer should route toward the relevant process/use-case/employee owner and demo handoff; it must not absorb broad automation ownership.
3. ROI Calculator remains a decision-support tool and should be linked from ROI/cost education and commercial evaluation contexts without replacing those owners.
4. Collaboration simulator supports the team/employee architecture story and may link toward `/equipos-ia` and `/solicitar-demo`.
5. Demo and legal/privacy routes are terminal conversion/trust surfaces and must not be used as keyword-rich acquisition pages.

## Exit gate

**PASS.** Every Phase 5 utility/legal route has a deliberate indexability decision and an explicit ownership boundary. No conversion/internal/legal URL is known to compete with a commercial or informational owner. Phase 6 technical closure is next.
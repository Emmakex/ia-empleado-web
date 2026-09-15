# Phase 8F — SEO, Metadata & Sharing

## Status

**ACTIVE — opened on 2026-09-15 after Phase 8E closed in Production Verification #46.**

Phase 8F finalizes how the public IA Empleado website is discovered, indexed, canonicalized, translated and shared. It must preserve the existing bilingual commercial architecture while making SEO behavior explicit and testable rather than relying on inherited Next.js defaults.

## Entry state

The repository already has a useful SEO foundation:

- ES and EN root layouts define `metadataBase` for `https://iaempleado.com`;
- Home metadata includes title, description, canonical URL, ES/EN/x-default alternates, Open Graph, Twitter card and index/follow policy;
- representative commercial routes such as Team Builder define route-specific title, description, canonical, alternates and social preview metadata;
- `app/sitemap.ts` generates the bilingual public route inventory, including dynamic employee, team, comparison, sector, use-case, department and integration detail routes;
- `app/robots.ts` declares the sitemap and canonical host;
- social previews are generated through the existing `brandPreviewUrl` system;
- Home and product surfaces already expose semantically scoped JSON-LD where implemented.

This foundation is not yet sufficient to close Phase 8F. The remaining work is to prove correctness and consistency across the complete public route matrix.

## Phase 8F acceptance contract

Phase 8F closes only when all of the following are verified in ES and EN where applicable:

1. **Titles and descriptions**
   - every indexable HTML route has an intentional title and description;
   - commercial route titles are unique enough to identify the page;
   - no route accidentally inherits Home copy where route-specific metadata is required;
   - no placeholder or development-only wording is emitted.

2. **Canonical URLs and language alternates**
   - every indexable route resolves to its own absolute canonical URL;
   - ES/EN paired routes expose reciprocal `hreflang` links;
   - `x-default` is intentional and consistent;
   - alternate URLs match real routes and do not redirect to unrelated pages;
   - canonical and hreflang values never include query-state from interactive tools.

3. **Sitemap**
   - all intended indexable public routes are present exactly once;
   - every bilingual pair is represented correctly;
   - no API or internal rendering endpoint appears in the sitemap;
   - dynamic detail families are complete;
   - sitemap URLs return successful public responses.

4. **Robots and index policy**
   - public commercial routes remain indexable;
   - internal utility/rendering endpoints have an explicit crawl/index policy;
   - `/api/*`, `/brand-preview/*` and `/brand-campaign/*` are treated as implementation endpoints rather than public landing pages;
   - the sitemap and canonical host remain declared correctly.

5. **Open Graph and Twitter sharing**
   - indexable commercial routes expose suitable Open Graph and Twitter metadata;
   - shared title/description reflect the current route, not generic Home copy where route-specific copy exists;
   - preview images resolve successfully and use the approved IA Empleado branding system;
   - expected preview geometry remains 1200×630 where the surface uses the standard social card.

6. **Structured data**
   - JSON-LD is emitted only where its schema is semantically valid for the rendered content;
   - URLs, language and page identity inside structured data match canonical metadata;
   - FAQ structured data is present only on pages that render the corresponding FAQ content;
   - no fake organization, review, rating, product or live-service claims are introduced.

7. **Navigation, breadcrumbs and errors**
   - internal links resolve without broken destinations;
   - breadcrumbs point to valid canonical routes;
   - not-found behavior returns the correct status and does not masquerade as an indexable success page;
   - utility/internal rendering routes are not discoverable from normal customer navigation unless intentionally exposed.

## Tranche 1 — SEO foundation contract

The first tranche is intentionally static and non-destructive. It establishes CI protection for the existing foundation before route-by-route remediation begins.

It protects:

- both root metadata definitions;
- canonical + ES/EN/x-default alternate foundations;
- Open Graph + Twitter foundations;
- sitemap and robots generation;
- the social-preview helper;
- the two internal rendering route-handler families;
- Phase 8E closure evidence and Phase 8F activation documentation.

The static contract lives in `scripts/check-phase8f-seo-foundation.mjs` and runs in ordinary Web CI.

This first tranche does **not** claim the entire route matrix is already correct. It creates a stable baseline so the next tranche can add browser-level route auditing and then remediate exact failures rather than changing metadata speculatively.

## Initial technical inventory

### Already present

- ES Home canonical: `/`;
- EN Home canonical: `/en`;
- reciprocal ES/EN Home alternates;
- `x-default` pointing to the Spanish root;
- Home Open Graph and Twitter large-card metadata;
- route-specific Team Builder metadata in both languages;
- dynamic sitemap generation across the commercial content families;
- global robots sitemap/host declaration;
- internal brand preview/campaign rendering implemented as route handlers rather than customer-facing `page.tsx` routes.

### Must still be audited before closure

- complete route-by-route title/description uniqueness;
- canonical and reciprocal hreflang coverage for every commercial detail family;
- final `x-default` policy outside Home;
- sitemap parity against the actual built route matrix;
- explicit crawl policy for implementation endpoints;
- OG/Twitter presence and preview resolution across all indexable commercial routes;
- structured-data validity and canonical consistency;
- broken internal links and breadcrumb targets;
- real 404 status behavior;
- absence of development-only discoverable routes.

## Engineering rules

- EN/ES ship together for every customer-facing metadata change.
- Canonical and hreflang mappings are server-authoritative; client state never determines index identity.
- Internal renderer/API endpoints must not become public landing pages accidentally.
- Social-preview assets must use approved IA Empleado branding and canonical character fidelity rules.
- A failing SEO contract produces the exact route, field and received value where possible.
- Do not hide failures by removing routes from the audit matrix unless the route is explicitly documented as non-indexable.
- Phase 8G cannot begin until Phase 8F implementation, required gates, acceptance, blockers and documentation are complete.

## Next tranche

Add a browser/runtime SEO matrix that visits the built ES/EN commercial route set and verifies canonical, hreflang, title, description, index policy, OG/Twitter metadata, sitemap membership, internal links and 404 behavior. Exact failures from that audit become the remediation backlog for Phase 8F.
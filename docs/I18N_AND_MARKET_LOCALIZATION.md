# EN/ES Web & Market Localization Contract

## Purpose / Propósito

English and Spanish are first-class public languages for `iaempleado.com`. EN/ES parity is a release contract, not a translation backlog.

Inglés y español son idiomas públicos de primera clase para `iaempleado.com`. La paridad EN/ES es un contrato de entrega, no una tarea posterior.

## Mandatory public scope / Alcance público obligatorio

Any prospect-facing surface must ship in EN and ES in the same change, including when applicable:

- navigation, labels, buttons and CTA;
- landing-page copy and FAQs;
- validation, loading, empty, error and recovery states;
- employee names/descriptions and capability explanations;
- help and public documentation;
- SEO titles/descriptions;
- Open Graph/social metadata;
- structured data where localized;
- alt text and accessibility labels;
- video captions/transcripts and interactive-demo explanations;
- pricing/value explanations and methodology disclosures;
- contact/demo forms, consent and confirmation text.

## No hard-coded reusable public copy

Reusable website copy must live behind localization/content keys or structured content data rather than scattered duplicated literals in components.

Temporary prototypes may use literals only while clearly non-production and must be migrated before public acceptance.

## URL and locale authority

Locale should resolve from explicit routing/user choice with a documented browser fallback when appropriate. The visible language, URL, canonical and `hreflang` graph must agree.

The application must not silently mix EN and ES content inside one public page except where the content itself explicitly compares languages.

## Locale-sensitive formatting

Dates, times, numbers, percentages and currencies use locale-aware formatting. Business values remain structured values and must not depend on translated strings.

## SEO localization

Localized pages must provide substantive localized content, not thin machine-generated duplicates.

For localized URLs:

- titles/descriptions match the visible locale;
- canonicals point to the intended localized canonical;
- `hreflang` relationships are reciprocal and valid;
- sitemap entries remain coherent;
- structured data and media descriptions match visible content;
- CTA copy and form journeys remain in the selected locale.

## Employee catalog localization

The employee catalog may expand progressively, but any employee page that is public in one supported locale must have equivalent public coverage in the other language for the same released scope.

A partially translated page must not be published as if it had parity.

## Accessibility and media

Localization includes:

- alt text;
- accessible names/labels;
- captions/subtitles where applicable;
- transcript/summary content for important videos;
- interactive explainer instructions;
- validation and recovery messages.

## CI and acceptance gates

The minimum automated localization gate should fail when:

- an EN key has no ES counterpart;
- an ES key has no EN counterpart;
- a required value is empty;
- localized structures diverge incompatibly.

As the site grows, add checks for hard-coded reusable public copy where practical.

Critical public flows require acceptance evidence in both locales, including responsive behavior.

## Definition of EN/ES complete

A public change is EN/ES complete only when both locales have:

1. equivalent functional coverage;
2. equivalent factual/product meaning;
3. localized copy and states;
4. correct locale formatting;
5. coherent SEO/canonical/`hreflang` behavior;
6. relevant accessibility/media localization;
7. tests/acceptance proportional to the changed contract.

A missing translation in released public scope is a release blocker.

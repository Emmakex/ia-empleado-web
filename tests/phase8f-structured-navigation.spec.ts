import { expect, test, type APIRequestContext } from "@playwright/test";

const publicOrigin = "https://iaempleado.com";
const internalPrefixes = ["/api/", "/brand-preview/", "/brand-campaign/"] as const;
const forbiddenClaimTypes = new Set(["Review", "AggregateRating", "Rating", "Product"]);

const criticalRoutes = [
  "/",
  "/en",
  "/empleados-ia",
  "/en/ai-employees",
  "/equipos-ia",
  "/en/ai-teams",
  "/como-trabajan-juntos",
  "/en/see-team-work",
  "/disena-tu-equipo-ia",
  "/en/design-your-ai-team",
  "/mejora-tu-proceso",
  "/en/improve-your-process",
  "/calculadora-roi",
  "/en/roi-calculator",
  "/solicitar-demo",
  "/en/request-demo",
] as const;

const representativeDetails = [
  "/empleados-ia/atencion-cliente",
  "/en/ai-employees/customer-support",
  "/equipos-ia/ventas",
  "/en/ai-teams/sales",
  "/comparativas/chatbot",
  "/en/comparisons/chatbot",
  "/sectores/ecommerce",
  "/en/sectors/ecommerce",
  "/casos-de-uso/incidencia-cliente",
  "/en/use-cases/customer-issue",
  "/departamentos/atencion-cliente",
  "/en/departments/customer-support",
  "/integraciones/crm",
  "/en/integrations/crm",
] as const;

const navigationSeeds = [
  "/",
  "/en",
  "/empleados-ia",
  "/en/ai-employees",
  "/equipos-ia",
  "/en/ai-teams",
  "/comparativas",
  "/en/comparisons",
  "/sectores",
  "/en/sectors",
  "/casos-de-uso",
  "/en/use-cases",
  "/departamentos",
  "/en/departments",
  "/integraciones",
  "/en/integrations",
] as const;

function parseAttributes(tag: string) {
  const attributes = new Map<string, string>();
  const pattern = /([:\w-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g;
  for (const match of tag.matchAll(pattern)) {
    attributes.set(match[1].toLowerCase(), match[2] ?? match[3] ?? "");
  }
  return attributes;
}

function extractTags(html: string, tagName: string) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, "gi"))].map((match) => match[0]);
}

function extractCanonical(html: string, route: string) {
  const canonical = extractTags(html, "link")
    .map((tag) => parseAttributes(tag))
    .find((attributes) => (attributes.get("rel") ?? "").toLowerCase().split(/\s+/).includes("canonical"))
    ?.get("href");
  expect(canonical, `${route}: canonical must exist before structured-data validation`).toBeTruthy();
  return canonical as string;
}

function normalizeUrl(raw: string, base = publicOrigin) {
  const url = new URL(raw, base);
  url.hash = "";
  if (url.pathname === "/") url.pathname = "";
  return url.toString().replace(/\/$/, "");
}

function routeLocale(route: string) {
  return route === "/en" || route.startsWith("/en/") ? "en" : "es";
}

function decodeBasicEntities(value: string) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&#x27;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function visibleText(html: string) {
  return decodeBasicEntities(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function jsonLdBlocks(html: string) {
  return [...html.matchAll(/<script\b[^>]*type=(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => decodeBasicEntities(match[1].trim()))
    .filter(Boolean);
}

function flattenJsonLd(value: unknown): Record<string, unknown>[] {
  if (Array.isArray(value)) return value.flatMap(flattenJsonLd);
  if (!value || typeof value !== "object") return [];
  const object = value as Record<string, unknown>;
  const graph = Array.isArray(object["@graph"]) ? object["@graph"].flatMap(flattenJsonLd) : [];
  return [object, ...graph];
}

function nodeTypes(node: Record<string, unknown>) {
  const raw = node["@type"];
  return Array.isArray(raw) ? raw.filter((value): value is string => typeof value === "string") : typeof raw === "string" ? [raw] : [];
}

function sameOriginPublicPath(rawHref: string, baseRoute: string) {
  if (!rawHref || rawHref.startsWith("#") || /^(mailto:|tel:|javascript:)/i.test(rawHref)) return null;
  const url = new URL(rawHref, new URL(baseRoute, publicOrigin));
  if (url.origin !== publicOrigin) return null;
  url.hash = "";
  return `${url.pathname}${url.search}` || "/";
}

function extractPublicLinks(html: string, baseRoute: string) {
  const links = new Set<string>();
  for (const tag of extractTags(html, "a")) {
    const href = parseAttributes(tag).get("href");
    if (!href) continue;
    const route = sameOriginPublicPath(href, baseRoute);
    if (route) links.add(route);
  }
  return links;
}

function breadcrumbLinks(html: string, baseRoute: string) {
  const links = new Set<string>();
  const navPattern = /<nav\b([^>]*)>([\s\S]*?)<\/nav>/gi;
  for (const match of html.matchAll(navPattern)) {
    const attributes = parseAttributes(`<nav ${match[1]}>`);
    const label = attributes.get("aria-label") ?? "";
    if (!/breadcrumb|migas/i.test(label)) continue;
    for (const route of extractPublicLinks(match[2], baseRoute)) links.add(route);
  }
  return links;
}

async function fetchHtml(request: APIRequestContext, route: string) {
  const response = await request.get(route);
  expect(response.ok(), `${route}: HTML route must remain reachable`).toBeTruthy();
  return response.text();
}

async function assertRoutesResolve(request: APIRequestContext, routes: string[], label: string) {
  for (let index = 0; index < routes.length; index += 8) {
    const chunk = routes.slice(index, index + 8);
    await Promise.all(chunk.map(async (route) => {
      const response = await request.get(route);
      expect(response.status(), `${label}: ${route} must not resolve to an error`).toBeLessThan(400);
    }));
  }
}

test.describe("Phase 8F structured data and navigation acceptance", () => {
  for (const route of [...criticalRoutes, ...representativeDetails]) {
    test(`structured data stays truthful on ${route}`, async ({ request }) => {
      const html = await fetchHtml(request, route);
      const canonical = normalizeUrl(extractCanonical(html, route));
      const locale = routeLocale(route);
      const documentText = visibleText(html);
      const blocks = jsonLdBlocks(html);
      const types = new Set<string>();

      for (const [blockIndex, raw] of blocks.entries()) {
        let parsed: unknown;
        expect(() => { parsed = JSON.parse(raw); }, `${route}: JSON-LD block ${blockIndex + 1} must parse`).not.toThrow();
        for (const node of flattenJsonLd(parsed)) {
          const currentTypes = nodeTypes(node);
          currentTypes.forEach((type) => types.add(type));

          for (const type of currentTypes) {
            expect(forbiddenClaimTypes.has(type), `${route}: unsupported claim schema ${type} must not be published`).toBeFalsy();
          }

          if (currentTypes.includes("Organization")) {
            expect(node.name, `${route}: Organization schema must identify the actual IA Empleado brand`).toBe("IA Empleado");
            if (typeof node.url === "string") expect(new URL(node.url, publicOrigin).origin).toBe(publicOrigin);
          }

          if (currentTypes.includes("WebPage") && typeof node.url === "string") {
            expect(normalizeUrl(node.url), `${route}: WebPage JSON-LD URL must match canonical`).toBe(canonical);
          }

          if (typeof node.inLanguage === "string") {
            expect(node.inLanguage.toLowerCase(), `${route}: JSON-LD language must match the rendered route`).toMatch(locale === "es" ? /^es(?:-|$)/ : /^en(?:-|$)/);
          }

          if (currentTypes.includes("FAQPage") && Array.isArray(node.mainEntity)) {
            for (const entity of node.mainEntity) {
              if (!entity || typeof entity !== "object") continue;
              const question = (entity as Record<string, unknown>).name;
              if (typeof question === "string" && question.trim()) {
                expect(documentText, `${route}: every FAQPage question must also be visible content`).toContain(question.trim().toLowerCase());
              }
            }
          }

          for (const field of ["url", "@id"] as const) {
            const rawUrl = node[field];
            if (typeof rawUrl !== "string" || !/^https?:/i.test(rawUrl)) continue;
            const url = new URL(rawUrl);
            if (url.origin === publicOrigin) {
              expect(internalPrefixes.some((prefix) => url.pathname.startsWith(prefix)), `${route}: structured data must not identify internal implementation endpoints`).toBeFalsy();
            }
          }
        }
      }

      console.log("PHASE8F_STRUCTURED_DATA", JSON.stringify({ route, locale, canonical, blocks: blocks.length, types: [...types].sort() }));
    });
  }

  test("public navigation exposes no broken or internal implementation links", async ({ request }) => {
    const discovered = new Set<string>();

    for (const seed of navigationSeeds) {
      const html = await fetchHtml(request, seed);
      for (const route of extractPublicLinks(html, seed)) {
        expect(internalPrefixes.some((prefix) => route.startsWith(prefix)), `${seed}: customer navigation must not expose ${route}`).toBeFalsy();
        discovered.add(route);
      }
    }

    const routes = [...discovered].sort();
    await assertRoutesResolve(request, routes, "public internal link");
    console.log("PHASE8F_INTERNAL_LINK_AUDIT", JSON.stringify({ seeds: navigationSeeds.length, uniqueInternalLinks: routes.length, routes }));
  });

  test("breadcrumbs, when rendered, point only to resolvable public routes", async ({ request }) => {
    const audited: Array<{ route: string; links: string[] }> = [];

    for (const route of representativeDetails) {
      const html = await fetchHtml(request, route);
      const links = [...breadcrumbLinks(html, route)].sort();
      for (const link of links) {
        expect(internalPrefixes.some((prefix) => link.startsWith(prefix)), `${route}: breadcrumb must not expose internal endpoints`).toBeFalsy();
      }
      await assertRoutesResolve(request, links, `${route} breadcrumb`);
      audited.push({ route, links });
    }

    console.log("PHASE8F_BREADCRUMB_AUDIT", JSON.stringify({ audited }));
  });
});

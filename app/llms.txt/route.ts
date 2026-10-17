const body = `# IA Empleado

> IA Empleado provides AI employees and AI agents for companies, focused on defined business roles, controlled workflows, system integrations, human approval and measurable outcomes.

## Canonical discovery

- [Primary sitemap](https://iaempleado.com/sitemap.xml): product, employee, team, sector, use-case, department, integration, comparison, conversion and legal routes.
- [Growth sitemap](https://iaempleado.com/growth-sitemap.xml): commercial process pages and supporting educational articles with ES/EN alternates.
- [Spanish home](https://iaempleado.com/): canonical Spanish/x-default entry point for IA Empleado and AI agents for companies.
- [English home](https://iaempleado.com/en): canonical English entry point.
- [Empleados IA](https://iaempleado.com/empleados-ia): Spanish AI employee catalogue and reference roles.
- [AI employees](https://iaempleado.com/en/ai-employees): English AI employee catalogue and reference roles.
- [Equipos IA](https://iaempleado.com/equipos-ia): Spanish AI team catalogue.
- [AI teams](https://iaempleado.com/en/ai-teams): English AI team catalogue.
- [Comparativas](https://iaempleado.com/comparativas): Spanish decision-stage comparisons.
- [Comparisons](https://iaempleado.com/en/comparisons): English decision-stage comparisons.
- [Blog](https://iaempleado.com/blog): Spanish educational content.
- [Blog EN](https://iaempleado.com/en/blog): English educational content.

## Search and content policy

Spanish and English are maintained as separate search markets rather than literal keyword translations. Each primary search intent has one canonical owner. Informational pages support, rather than duplicate, commercial owners. Product claims must reflect real capabilities, permissions, controls and human escalation boundaries.

## Conversion and tools

- [Cómo trabajan juntos](https://iaempleado.com/como-trabajan-juntos): multi-agent collaboration explainer.
- [Diseña tu equipo IA](https://iaempleado.com/disena-tu-equipo-ia): team composition tool.
- [Mejora tu proceso](https://iaempleado.com/mejora-tu-proceso): process analysis tool.
- [Calculadora ROI](https://iaempleado.com/calculadora-roi): ROI calculator.
- [Solicitar demo](https://iaempleado.com/solicitar-demo): demo request and conversion endpoint.

## Language policy

Spanish is the x-default locale. Use hreflang alternates from each page or sitemap to resolve the corresponding English route. Prefer canonical public URLs from the sitemaps over internal rendering or API endpoints.
`;

export function GET() {
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=86400, stale-while-revalidate=604800",
      "X-Robots-Tag": "noindex, follow",
    },
  });
}

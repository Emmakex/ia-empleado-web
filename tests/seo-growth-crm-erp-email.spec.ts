import { expect, test } from "@playwright/test";

const surfaces = [
  {
    path: "/automatizacion-crm-ia",
    title: /CRM con IA: automatización de leads, datos y pipeline/i,
    h1: /CRM con IA: automatiza leads, seguimiento y datos/i,
  },
  {
    path: "/en/ai-crm-automation",
    title: /CRM automation with AI: leads, data and pipeline/i,
    h1: /CRM automation with AI: automate leads, follow-up and data/i,
  },
  {
    path: "/automatizacion-erp-ia",
    title: /ERP con IA: automatización de pedidos, facturas y operaciones/i,
    h1: /ERP con IA: automatiza trabajo operativo/i,
  },
  {
    path: "/en/ai-erp-automation",
    title: /ERP automation with AI: orders, invoices and operations/i,
    h1: /ERP automation with AI: automate operational work/i,
  },
  {
    path: "/automatizacion-email-empresarial-ia",
    title: /Automatización de correo electrónico con IA/i,
    h1: /Automatización de correo electrónico con IA/i,
  },
  {
    path: "/en/ai-enterprise-email-automation",
    title: /Email automation with AI for business workflows/i,
    h1: /Email automation with AI: turn messages into traceable work/i,
  },
  {
    path: "/blog/como-automatizar-crm-con-ia-sin-perder-control",
    title: /Automatización CRM: cómo usar IA sin perder control/i,
    h1: /Cómo diseñar automatización CRM con IA/i,
  },
  {
    path: "/en/blog/how-to-automate-crm-with-ai-without-losing-control",
    title: /CRM with AI: how to automate workflows safely/i,
    h1: /How to use AI in CRM workflows/i,
  },
  {
    path: "/blog/como-automatizar-erp-con-ia-sin-perder-control",
    title: /Automatización ERP: cómo aplicar IA con control/i,
    h1: /Cómo diseñar automatización ERP con IA/i,
  },
  {
    path: "/en/blog/how-to-automate-erp-with-ai-without-losing-control",
    title: /ERP with AI: how to automate operational workflows/i,
    h1: /How to use AI in ERP workflows/i,
  },
  {
    path: "/blog/como-automatizar-email-empresarial-con-ia-sin-perder-control",
    title: /Cómo automatizar emails con IA y control humano/i,
    h1: /Cómo automatizar emails con IA/i,
  },
  {
    path: "/en/blog/how-to-automate-enterprise-email-with-ai-without-losing-control",
    title: /Email workflow automation with AI: practical guide/i,
    h1: /How to design email workflow automation with AI/i,
  },
] as const;

test.describe("Phase 2 Batch 18 CRM ERP and email ownership", () => {
  for (const surface of surfaces) {
    test(`${surface.path} keeps its canonical and optimized intent`, async ({ page }) => {
      const response = await page.goto(surface.path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(surface.title);
      await expect(page.locator("h1")).toContainText(surface.h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
        "href",
        `https://iaempleado.com${surface.path}`,
      );
    });
  }

  test("Spanish CRM ERP and email clusters separate automation from integration", async ({ page }) => {
    await page.goto("/automatizacion-crm-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta página posee la intención de automatización del proceso/i);
    await expect(page.locator('a[href="/blog/como-automatizar-crm-con-ia-sin-perder-control"]')).toBeVisible();

    await page.goto("/automatizacion-erp-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta página posee la intención de automatización del proceso/i);
    await expect(page.locator('a[href="/blog/como-automatizar-erp-con-ia-sin-perder-control"]')).toBeVisible();

    await page.goto("/automatizacion-email-empresarial-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta página posee la intención de automatización del flujo de correo/i);
    await expect(page.locator('a[href="/blog/como-automatizar-email-empresarial-con-ia-sin-perder-control"]')).toBeVisible();
  });

  test("English CRM ERP and email guides keep implementation intent", async ({ page }) => {
    await page.goto("/en/blog/how-to-automate-crm-with-ai-without-losing-control", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/This guide owns implementation intent/i);
    await expect(page.locator('a[href="/en/ai-crm-automation"]')).toBeVisible();

    await page.goto("/en/blog/how-to-automate-erp-with-ai-without-losing-control", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/This guide owns implementation intent/i);
    await expect(page.locator('a[href="/en/ai-erp-automation"]')).toBeVisible();

    await page.goto("/en/blog/how-to-automate-enterprise-email-with-ai-without-losing-control", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/This guide owns implementation intent/i);
    await expect(page.locator('a[href="/en/ai-enterprise-email-automation"]')).toBeVisible();
  });
});

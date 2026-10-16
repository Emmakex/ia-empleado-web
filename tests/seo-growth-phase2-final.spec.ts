import { expect, test } from "@playwright/test";

const surfaces = [
  ["/automatizacion-ecommerce-empleado-ia", /Automatización ecommerce con IA/, /Automatización ecommerce con IA/],
  ["/en/ai-ecommerce-automation", /Ecommerce automation with AI/, /Ecommerce automation with AI/],
  ["/blog/como-automatizar-ecommerce-con-empleado-ia", /Ecommerce con IA: cómo automatizar operaciones/, /Cómo usar IA en ecommerce/],
  ["/en/blog/how-to-automate-ecommerce-with-ai", /Ecommerce with AI: how to automate operations safely/, /How to use AI in ecommerce/],
  ["/automatizacion-turismo-reservas-empleado-ia", /Automatización de reservas con IA para turismo/, /Automatización de reservas con IA/],
  ["/en/ai-tourism-reservations-automation", /Booking automation with AI for travel operations/, /Booking automation with AI/],
  ["/blog/como-automatizar-turismo-reservas-con-empleado-ia", /Cómo automatizar reservas con IA en turismo/, /Cómo automatizar reservas con IA/],
  ["/en/blog/how-to-automate-tourism-reservations-with-ai", /How to automate travel bookings with AI/, /How to automate travel bookings with AI/],
  ["/automatizacion-administrativa-ia", /Automatización administrativa con IA/, /Automatización administrativa con IA/],
  ["/en/ai-administrative-automation", /Administrative automation with AI/, /Administrative automation with AI/],
  ["/blog/automatizar-tareas-administrativas-sin-perder-control", /Cómo automatizar tareas administrativas con IA/, /Cómo automatizar tareas administrativas con IA/],
  ["/en/blog/automate-administrative-tasks-with-human-approval", /AI administration: how to automate administrative tasks/, /How to automate administrative tasks with AI/],
  ["/automatizacion-ventas-sdr-ia", /Automatización de ventas con IA/, /Automatización de ventas con IA/],
  ["/en/ai-sales-sdr-automation", /Sales automation with AI/, /Sales automation with AI/],
  ["/blog/automatizar-ventas-sdr-sin-perder-control", /Cómo automatizar ventas con IA/, /Cómo automatizar ventas con IA/],
  ["/en/blog/automate-sales-sdr-with-human-approval", /AI for sales: how to automate workflows with control/, /How to use AI for sales/],
  ["/empleados-ia-para-pymes", /IA para pymes: agentes y automatización empresarial/, /IA para pymes/],
  ["/en/ai-employees-for-small-business", /AI for small business: agents and automation/, /AI for small business/],
] as const;

test.describe("Phase 2 Batch 19 final Growth ownership", () => {
  for (const [path, title, h1] of surfaces) {
    test(`${path} exposes the audited intent and canonical`, async ({ page }) => {
      const response = await page.goto(path, { waitUntil: "domcontentloaded" });
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(title);
      await expect(page.locator("h1")).toContainText(h1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `https://iaempleado.com${path}`);
    });
  }

  test("ecommerce and travel pairs preserve reciprocal intent-aware links", async ({ page }) => {
    await page.goto("/automatizacion-ecommerce-empleado-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta página posee la intención de automatización del proceso ecommerce/i);
    await expect(page.locator('a[href="/blog/como-automatizar-ecommerce-con-empleado-ia"]')).toBeVisible();

    await page.goto("/automatizacion-turismo-reservas-empleado-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta página posee la intención de automatización del proceso de reserva/i);
    await expect(page.locator('a[href="/blog/como-automatizar-turismo-reservas-con-empleado-ia"]')).toBeVisible();
  });

  test("administration and sales split process intent from role intent", async ({ page }) => {
    await page.goto("/automatizacion-administrativa-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/El perfil Administrativo IA conserva la intención de agente\/rol/i);
    await expect(page.locator('a[href="/blog/automatizar-tareas-administrativas-sin-perder-control"]')).toBeVisible();

    await page.goto("/automatizacion-ventas-sdr-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/El perfil Comercial \/ SDR IA conserva la intención de agente de ventas/i);
    await expect(page.locator('a[href="/blog/automatizar-ventas-sdr-sin-perder-control"]')).toBeVisible();
  });

  test("SME landing owns audience intent while the related guide owns definition intent", async ({ page }) => {
    await page.goto("/empleados-ia-para-pymes", { waitUntil: "domcontentloaded" });
    await expect(page.locator("main")).toContainText(/Esta página posee la intención comercial específica de IA para pymes/i);
    await expect(page.locator('a[href="/blog/que-es-un-agente-ia"]')).toBeVisible();

    await page.goto("/blog/que-es-un-agente-ia", { waitUntil: "domcontentloaded" });
    await expect(page.locator("h1")).toContainText(/Qué es un agente IA/i);
    await expect(page.locator('a[href="/empleados-ia-para-pymes"]')).toBeVisible();
  });
});

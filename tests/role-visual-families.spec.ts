import { expect, test, type Locator } from "@playwright/test";

type Box = { x: number; y: number; width: number; height: number };

async function box(locator: Locator, label: string): Promise<Box> {
  const value = await locator.boundingBox();
  expect(value, `${label} must render`).not.toBeNull();
  return value as Box;
}

const spanishFamilies = [
  { route: "/empleados-ia/atencion-cliente", id: "clara", motif: "conversation" },
  { route: "/empleados-ia/administrativo", id: "alex", motif: "operations" },
  { route: "/empleados-ia/contabilidad-facturacion", id: "sofia", motif: "ledger" },
  { route: "/empleados-ia/comercial-sdr", id: "javier", motif: "pipeline" },
] as const;

const englishFamilies = [
  { route: "/en/ai-employees/customer-support", id: "clara", motif: "conversation" },
  { route: "/en/ai-employees/administrative", id: "alex", motif: "operations" },
  { route: "/en/ai-employees/accounting-billing", id: "sofia", motif: "ledger" },
  { route: "/en/ai-employees/sales-sdr", id: "javier", motif: "pipeline" },
] as const;

async function assertFamilyScene(page: import("@playwright/test").Page, item: (typeof spanishFamilies)[number] | (typeof englishFamilies)[number]) {
  await page.goto(item.route, { waitUntil: "networkidle" });

  const scene = page.locator(`[data-role-family="${item.id}"]`);
  await expect(scene, `${item.route}: canonical role family must render`).toHaveCount(1);
  await expect(scene).toHaveAttribute("data-role-motif", item.motif);
  await expect(scene.locator(".brand-role-family-flow > span")).toHaveCount(3);
  await expect(scene.locator(".brand-role-family-systems > span")).toHaveCount(3);
  await expect(scene.locator(".brand-role-family-control")).toHaveCount(1);
  await expect(scene.locator(".brand-role-family-portrait img")).toHaveCount(1);

  const stage = await box(scene, `${item.route}: role family scene`);
  const flow = await box(scene.locator(".brand-role-family-flow"), `${item.route}: role flow`);
  const control = await box(scene.locator(".brand-role-family-control"), `${item.route}: human control`);
  const systems = await box(scene.locator(".brand-role-family-systems"), `${item.route}: systems`);

  expect(flow.x).toBeGreaterThanOrEqual(stage.x - 1);
  expect(flow.x + flow.width).toBeLessThanOrEqual(stage.x + stage.width + 1);
  expect(control.x).toBeGreaterThanOrEqual(stage.x - 1);
  expect(control.x + control.width).toBeLessThanOrEqual(stage.x + stage.width + 1);
  expect(systems.x).toBeGreaterThanOrEqual(stage.x - 1);
  expect(systems.x + systems.width).toBeLessThanOrEqual(stage.x + stage.width + 1);
  expect(flow.y + flow.height, `${item.route}: top workflow must finish before human-control band`).toBeLessThan(control.y);
  expect(control.y + control.height, `${item.route}: human-control band must finish before systems row`).toBeLessThanOrEqual(systems.y + 1);

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, `${item.route}: role family must not create horizontal page overflow`).toBeLessThanOrEqual(1);
}

test("four Spanish deep employee profiles expose distinct role visual families", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  const motifs = new Set<string>();

  for (const item of spanishFamilies) {
    await test.step(item.id, async () => {
      await assertFamilyScene(page, item);
      motifs.add(item.motif);
    });
  }

  expect(motifs.size, "Clara, Alex, Sofia and Javier must keep four distinct visual grammars").toBe(4);
});

test("role visual families remain contained on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });

  for (const item of spanishFamilies) {
    await test.step(item.id, async () => {
      await assertFamilyScene(page, item);
      const scene = await box(page.locator(`[data-role-family="${item.id}"]`), `${item.route}: mobile scene`);
      expect(scene.width, `${item.route}: mobile family scene must fit the viewport`).toBeLessThanOrEqual(390);
      expect(scene.height, `${item.route}: mobile family scene must retain enough vertical room`).toBeGreaterThanOrEqual(340);
    });
  }
});

test("English deep profiles preserve the same canonical role-family mapping", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  for (const item of englishFamilies) {
    await test.step(item.id, async () => {
      await page.goto(item.route, { waitUntil: "networkidle" });
      const scene = page.locator(`[data-role-family="${item.id}"]`);
      await expect(scene).toHaveCount(1);
      await expect(scene).toHaveAttribute("data-role-motif", item.motif);
      await expect(scene.locator(".brand-role-family-flow > span")).toHaveCount(3);
      await expect(scene.locator(".brand-role-family-systems > span")).toHaveCount(3);
    });
  }
});

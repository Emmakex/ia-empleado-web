import { expect, test } from "@playwright/test";
import { getBookingDateBounds, isBookingDateAllowed } from "../lib/booking-preference";
import { buildLeadMailto } from "../lib/conversion-handoff";

function nextBookableDate(): string {
  const { min } = getBookingDateBounds();
  const date = new Date(`${min}T12:00:00Z`);
  let value = min;
  while (!isBookingDateAllowed(value)) {
    date.setUTCDate(date.getUTCDate() + 1);
    value = date.toISOString().slice(0, 10);
  }
  return value;
}

test.describe("Web Phase 7A conversion handoff", () => {
  test("Spanish route preserves bounded team context and exposes truthful local form", async ({ page }) => {
    await page.goto("/solicitar-demo?intent=team&source=header&context=Equipo%20Ventas");

    const form = page.locator("[data-lead-handoff-form]");
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("data-intent", "team");
    await expect(form).toHaveAttribute("data-source", "header");
    await expect(page.locator("[data-lead-context]")).toContainText("Equipo Ventas");
    await expect(page.getByLabel("Nombre")).toBeVisible();
    await expect(page.getByLabel("Email de contacto")).toHaveAttribute("type", "email");
    await expect(page.getByLabel("¿Qué proceso, equipo o necesidad quieres evaluar?")).toBeVisible();
    await expect(page.getByLabel("Fecha preferida")).toHaveAttribute("type", "date");
    await expect(page.locator("[data-booking-time-grid]")).toBeVisible();
    await expect(page.getByText(/no almacena ni transmite estos datos a un CRM/i)).toBeVisible();
    await expect(page.getByText(/pendiente de confirmación/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Preparar solicitud de cita" })).toBeVisible();

    const date = nextBookableDate();
    const mailto = buildLeadMailto(
      "es",
      { intent: "team", source: "header", context: "Equipo Ventas" },
      {
        name: "Ana Pérez",
        email: "ana@example.com",
        company: "Acme",
        need: "Seguimiento comercial con aprobación humana",
        preferredDate: date,
        preferredTime: "09:00",
        preferredTimeZone: "Europe/Madrid",
      },
    );
    const decoded = decodeURIComponent(mailto);
    expect(mailto).toContain("mailto:hola@iaempleado.com?");
    expect(decoded).toContain("Interés: Diseño de Equipo IA");
    expect(decoded).toContain("Origen: header");
    expect(decoded).toContain("Contexto: Equipo Ventas");
    expect(decoded).toContain("Ana Pérez");
    expect(decoded).toContain(`Fecha preferida: ${date}`);
    expect(decoded).toContain("Hora preferida: 09:00");
    expect(decoded).toContain("Estado de cita: pendiente de confirmación");
  });

  test("English route preserves process context and meeting preference controls", async ({ page }) => {
    await page.goto("/en/request-demo?intent=process&source=home-final&context=Order%20operations");

    const form = page.locator("[data-lead-handoff-form]");
    await expect(form).toBeVisible();
    await expect(form).toHaveAttribute("data-intent", "process");
    await expect(form).toHaveAttribute("data-source", "home-final");
    await expect(page.locator("[data-lead-context]")).toContainText("Order operations");
    await expect(page.getByLabel("Name")).toBeVisible();
    await expect(page.getByLabel("Contact email")).toHaveAttribute("type", "email");
    await expect(page.getByLabel("Preferred date")).toHaveAttribute("type", "date");
    await expect(page.getByRole("radio", { name: "Preferred time 09:00" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Prepare meeting request" })).toBeVisible();
    await expect(page.getByText(/does not currently store or transmit these details to a CRM/i)).toBeVisible();
  });

  test("invalid intent falls back to demo and source line breaks are normalized", async ({ page }) => {
    await page.goto("/solicitar-demo?intent=not-allowed&source=campaign%0D%0Ainjected&context=Demo%20context");

    const form = page.locator("[data-lead-handoff-form]");
    await expect(form).toHaveAttribute("data-intent", "demo");
    await expect(form).toHaveAttribute("data-source", "campaign injected");
    await expect(page.locator("[data-lead-source]")).toHaveText("campaign injected");
    await expect(page.locator("[data-lead-context]")).toHaveText("Demo context");
  });

  test("conversion handoff reflows at 390px without horizontal overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/solicitar-demo?intent=demo&source=mobile-test");

    await expect(page.locator("[data-lead-handoff-form]")).toBeVisible();
    await expect(page.getByRole("button", { name: "Preparar solicitud de cita" })).toBeVisible();
    await expect(page.locator("[data-booking-time-grid]")).toBeVisible();

    const naturalOverflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(naturalOverflow.scrollWidth).toBeLessThanOrEqual(naturalOverflow.clientWidth + 1);
  });
});

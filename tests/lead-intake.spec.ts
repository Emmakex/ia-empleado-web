import { expect, test } from "@playwright/test";
import { BOOKING_TIME_ZONE, getBookingDateBounds, isBookingDateAllowed } from "../lib/booking-preference";
import { LEAD_CONSENT_VERSION } from "../lib/lead-intake";

const directCapability = {
  mode: "direct",
  configured: true,
  transport: "smtp",
  privacyNoticeUrl: "https://example.com/privacy",
};

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

function validPayload(locale: "es" | "en" = "es") {
  return {
    locale,
    name: "Ana Pérez",
    email: "ana@example.com",
    company: "Acme",
    need: "Evaluar seguimiento comercial con aprobación humana",
    intent: "team",
    source: "team-builder-result",
    context: "Ventas: SDR + Reporting",
    preferredDate: nextBookableDate(),
    preferredTime: "09:00",
    preferredTimeZone: BOOKING_TIME_ZONE,
    consent: true,
    consentVersion: LEAD_CONSENT_VERSION,
    website: "",
  };
}

test.describe("Web Phase 7C lead intake", () => {
  test("server exposes the truthful transport capability without leaking configuration", async ({ request }) => {
    const capability = await request.get("/api/lead-intake");
    expect(capability.status()).toBe(200);
    const publicState = await capability.json();
    const serialized = JSON.stringify(publicState);

    expect(serialized).not.toContain("SMTP_PASSWORD");
    expect(serialized).not.toContain("SMTP_USER");
    expect(serialized).not.toContain("LEAD_NOTIFICATION_TO");
    expect(serialized).not.toContain("WEBHOOK_URL");
    expect(serialized).not.toContain("TOKEN");

    if (process.env.PRODUCTION_BASE_URL) {
      expect(publicState.mode).toBe("direct");
      expect(publicState.configured).toBe(true);
      expect(publicState.transport).toBe("smtp");
      expect(publicState.privacyNoticeUrl).toMatch(/^https?:\/\//);
      return;
    }

    expect(publicState).toEqual({ mode: "email", configured: false });

    const invalid = await request.post("/api/lead-intake", {
      data: { ...validPayload(), consent: false },
    });
    expect(invalid.status()).toBe(400);
    expect(await invalid.json()).toEqual({ ok: false, code: "validation_error" });

    const invalidBooking = await request.post("/api/lead-intake", {
      data: { ...validPayload(), preferredTime: "23:45" },
    });
    expect(invalidBooking.status()).toBe(400);
    expect(await invalidBooking.json()).toEqual({ ok: false, code: "validation_error" });

    const unconfigured = await request.post("/api/lead-intake", { data: validPayload() });
    expect(unconfigured.status()).toBe(503);
    expect(await unconfigured.json()).toEqual({
      ok: false,
      code: "transport_unconfigured",
      fallback: "email",
    });
  });

  test("Spanish direct mode requires consent and sends only the bounded lead contract", async ({ page }) => {
    let deliveredPayload: Record<string, unknown> | undefined;

    await page.route("**/api/lead-intake", async (route) => {
      const request = route.request();
      if (request.method() === "GET") {
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(directCapability) });
        return;
      }

      deliveredPayload = JSON.parse(request.postData() || "{}") as Record<string, unknown>;
      await route.fulfill({
        status: 202,
        contentType: "application/json",
        body: JSON.stringify({ ok: true, status: "accepted", leadId: "lead_test" }),
      });
    });

    await page.goto("/solicitar-demo?intent=team&source=team-builder-result&context=Ventas%3A%20SDR%20%2B%20Reporting");

    const form = page.locator("[data-lead-handoff-form]");
    await expect(form).toHaveAttribute("data-lead-intake-mode", "direct");
    await expect(page.getByText(/fecha y hora preferidas/i)).toBeVisible();
    await expect(page.getByRole("link", { name: "Ver información de privacidad" })).toHaveAttribute("href", directCapability.privacyNoticeUrl);

    const date = nextBookableDate();
    await page.getByLabel("Nombre").fill("Ana Pérez");
    await page.getByLabel("Email de contacto").fill("ana@example.com");
    await page.getByLabel("Empresa (opcional)").fill("Acme");
    await page.getByLabel("¿Qué proceso, equipo o necesidad quieres evaluar?").fill("Evaluar seguimiento comercial con aprobación humana");
    await page.getByLabel("Fecha preferida").fill(date);
    await page.getByRole("radio", { name: "Hora preferida 09:00" }).check();
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Enviar y solicitar cita" }).click();

    await expect(page.locator("[data-lead-intake-success]")).toContainText("Solicitud recibida");
    await expect(page.locator("[data-lead-intake-success]")).toContainText("confirmaremos por email");
    expect(deliveredPayload).toMatchObject({
      locale: "es",
      name: "Ana Pérez",
      email: "ana@example.com",
      company: "Acme",
      need: "Evaluar seguimiento comercial con aprobación humana",
      intent: "team",
      source: "team-builder-result",
      context: "Ventas: SDR + Reporting",
      preferredDate: date,
      preferredTime: "09:00",
      preferredTimeZone: BOOKING_TIME_ZONE,
      consent: true,
      consentVersion: LEAD_CONSENT_VERSION,
      website: "",
    });
    expect(Object.keys(deliveredPayload || {}).sort()).toEqual([
      "company",
      "consent",
      "consentVersion",
      "context",
      "email",
      "intent",
      "locale",
      "name",
      "need",
      "preferredDate",
      "preferredTime",
      "preferredTimeZone",
      "source",
      "website",
    ].sort());
  });

  test("English direct mode keeps the prepared email fallback with meeting preference", async ({ page }) => {
    await page.route("**/api/lead-intake", async (route) => {
      if (route.request().method() === "GET") {
        await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(directCapability) });
        return;
      }
      await route.fulfill({
        status: 502,
        contentType: "application/json",
        body: JSON.stringify({ ok: false, code: "delivery_failed", fallback: "email" }),
      });
    });

    const date = nextBookableDate();
    await page.goto("/en/request-demo?intent=process&source=process-analyzer-result&context=Order%20operations");
    await expect(page.locator("[data-lead-handoff-form]")).toHaveAttribute("data-lead-intake-mode", "direct");

    await page.getByLabel("Name").fill("Alex Doe");
    await page.getByLabel("Contact email").fill("alex@example.com");
    await page.getByLabel("Which process, team or need do you want to evaluate?").fill("Order operations and exception handling");
    await page.getByLabel("Preferred date").fill(date);
    await page.getByRole("radio", { name: "Preferred time 10:00" }).check();
    await page.getByRole("checkbox").check();
    await page.getByRole("button", { name: "Send and request meeting" }).click();

    const fallback = page.locator("[data-lead-intake-fallback]");
    await expect(fallback).toContainText("could not deliver");
    const mailto = fallback.getByRole("link", { name: "Prepare fallback email" });
    await expect(mailto).toHaveAttribute("href", /mailto:hola@iaempleado\.com/);
    await expect(mailto).toHaveAttribute("href", /alex%40example\.com/);
    await expect(mailto).toHaveAttribute("href", new RegExp(encodeURIComponent(date)));
    await expect(mailto).toHaveAttribute("href", /10%3A00/);
  });

  test("direct mode reflows at 390px without horizontal overflow", async ({ page }) => {
    await page.route("**/api/lead-intake", async (route) => {
      await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify(directCapability) });
    });

    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/solicitar-demo?intent=demo&source=mobile-7c2");
    await expect(page.locator("[data-lead-handoff-form]")).toHaveAttribute("data-lead-intake-mode", "direct");
    await expect(page.getByRole("button", { name: "Enviar y solicitar cita" })).toBeVisible();
    await expect(page.locator("[data-booking-time-grid]")).toBeVisible();

    const geometry = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(geometry.scrollWidth).toBeLessThanOrEqual(geometry.clientWidth + 1);
  });
});

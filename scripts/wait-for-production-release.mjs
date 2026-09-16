import { chromium } from "@playwright/test";

const baseUrl = process.env.PRODUCTION_BASE_URL?.replace(/\/$/, "");
const expectedRelease = process.env.EXPECTED_RELEASE;
const attempts = Number(process.env.RELEASE_CHECK_ATTEMPTS || 30);
const delayMs = Number(process.env.RELEASE_CHECK_DELAY_MS || 10000);

if (!baseUrl) {
  throw new Error("PRODUCTION_BASE_URL is required");
}

if (!expectedRelease) {
  throw new Error("EXPECTED_RELEASE is required");
}

if (!Number.isInteger(attempts) || attempts < 1) {
  throw new Error("RELEASE_CHECK_ATTEMPTS must be a positive integer");
}

if (!Number.isFinite(delayMs) || delayMs < 0) {
  throw new Error("RELEASE_CHECK_DELAY_MS must be a non-negative number");
}

const sleep = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

const browser = await chromium.launch({ headless: true });

try {
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    viewport: { width: 1365, height: 768 },
    locale: "es-ES",
    extraHTTPHeaders: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
      "Accept-Language": "es-ES,es;q=0.9,en;q=0.8",
    },
  });

  const page = await context.newPage();

  console.log(`Waiting for production release fingerprint: ${expectedRelease}`);

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const checkUrl = new URL(`${baseUrl}/`);
    checkUrl.searchParams.set("release_check", expectedRelease);
    checkUrl.searchParams.set("attempt", String(attempt));

    try {
      const response = await page.goto(checkUrl.toString(), {
        waitUntil: "domcontentloaded",
        timeout: 20000,
      });

      const status = response?.status() ?? 0;
      const actualRelease = await page
        .locator('meta[name="ia-web-release"]')
        .first()
        .getAttribute("content")
        .catch(() => null);

      console.log(
        `Attempt ${attempt}/${attempts}: status=${status} release=${actualRelease ?? "missing"}`,
      );

      if (status >= 200 && status < 400 && actualRelease === expectedRelease) {
        console.log(
          `Production is serving exact release fingerprint: ${expectedRelease}`,
        );
        process.exitCode = 0;
        break;
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.log(
        `Attempt ${attempt}/${attempts}: browser check failed: ${message}`,
      );
    }

    if (attempt < attempts) {
      await sleep(delayMs);
    } else {
      console.error(
        `Exact production release fingerprint ${expectedRelease} did not appear within the verification window`,
      );
      process.exitCode = 1;
    }
  }

  await context.close();
} finally {
  await browser.close();
}

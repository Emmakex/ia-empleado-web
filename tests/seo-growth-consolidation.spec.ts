import { expect, test } from "@playwright/test";

const redirects = [
  ["/empleado-ia-vs-chatbot", "/comparativas/chatbot"],
  ["/blog/cuando-elegir-empleado-ia-o-chatbot", "/comparativas/chatbot"],
  ["/en/ai-employee-vs-chatbot", "/en/comparisons/chatbot"],
  ["/en/blog/when-to-choose-ai-employee-or-chatbot", "/en/comparisons/chatbot"],
  ["/agente-ia-vs-rpa", "/comparativas/rpa"],
  ["/blog/cuando-usar-agente-ia-rpa-o-ambos", "/comparativas/rpa"],
  ["/en/ai-agent-vs-rpa", "/en/comparisons/rpa"],
  ["/en/blog/when-to-use-ai-agent-rpa-or-both", "/en/comparisons/rpa"],
] as const;

test.describe("Phase 2 Growth consolidation redirects", () => {
  for (const [source, destination] of redirects) {
    test(`${source} permanently redirects to its canonical comparison owner`, async ({ request }) => {
      const response = await request.get(source, { maxRedirects: 0 });
      expect(response.status()).toBe(308);
      expect(response.headers().location).toBe(destination);
    });
  }

  test("consolidated duplicate Growth URLs are removed from the Growth sitemap", async ({ request }) => {
    const response = await request.get("/growth-sitemap.xml");
    expect(response.ok()).toBeTruthy();
    const xml = await response.text();

    for (const [source] of redirects) {
      expect(xml).not.toContain(source);
    }
  });
});

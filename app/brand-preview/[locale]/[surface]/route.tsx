import type { Locale } from "../../../../lib/i18n";
import { isBrandPreviewSurface, renderBrandSocialPreview } from "../../../../lib/brand-social-previews";

export const runtime = "edge";

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string; surface: string }> },
) {
  const { locale: rawLocale, surface } = await context.params;
  const locale: Locale = rawLocale === "en" ? "en" : "es";

  if (!isBrandPreviewSurface(surface)) {
    return new Response("Unknown preview surface", { status: 404 });
  }

  return renderBrandSocialPreview(locale, surface);
}

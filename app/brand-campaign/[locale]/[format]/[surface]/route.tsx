import type { Locale } from "../../../../../lib/i18n";
import { isBrandPreviewSurface } from "../../../../../lib/brand-social-previews";
import { isBrandCampaignFormat, renderBrandCampaignMedia } from "../../../../../lib/brand-campaign-media";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  context: { params: Promise<{ locale: string; format: string; surface: string }> },
) {
  const { locale: rawLocale, format, surface } = await context.params;
  const locale: Locale = rawLocale === "en" ? "en" : "es";

  if (!isBrandCampaignFormat(format)) {
    return new Response("Unknown campaign format", { status: 404 });
  }

  if (!isBrandPreviewSurface(surface)) {
    return new Response("Unknown campaign surface", { status: 404 });
  }

  return await renderBrandCampaignMedia(locale, format, surface);
}

"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "../lib/i18n";
import {
  GROWTH_ANALYTICS_ENDPOINT,
  GROWTH_DATA_LAYER_EVENT,
  parseGrowthLandingSource,
  type GrowthAnalyticsEventName,
  type GrowthAnalyticsPayload,
  type GrowthAttribution,
  type GrowthFunnelStage,
  type GrowthFunnelTarget,
} from "../lib/growth-analytics";

type GrowthAnalyticsBridgeProps = {
  locale: Locale;
  processPath: string;
  roiPath: string;
  demoPath: string;
};

type StoredAttribution = {
  version: 1;
  capturedAt: number;
  attribution: GrowthAttribution;
};

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

const ATTRIBUTION_STORAGE_KEY = "iaempleado:growth-attribution:v1";
const ATTRIBUTION_TTL_MS = 60 * 60 * 1000;
const emittedOnce = new Set<string>();

function pathOf(value: string): string {
  try {
    return new URL(value, window.location.origin).pathname;
  } catch {
    return value.split("?")[0] || value;
  }
}

function emitGrowthEvent(payload: GrowthAnalyticsPayload) {
  const dataLayerPayload = {
    event: GROWTH_DATA_LAYER_EVENT,
    event_name: payload.eventName,
    growth_landing_key: payload.landingKey,
    growth_locale: payload.locale,
    growth_canonical_path: payload.canonicalPath,
    growth_stage: payload.stage,
    growth_target: payload.target,
    growth_source: payload.source,
    page_path: window.location.pathname,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(dataLayerPayload);
  window.dispatchEvent(new CustomEvent("iaempleado:analytics", { detail: dataLayerPayload }));

  const body = JSON.stringify(payload);
  if (typeof navigator.sendBeacon === "function") {
    const sent = navigator.sendBeacon(
      GROWTH_ANALYTICS_ENDPOINT,
      new Blob([body], { type: "application/json" }),
    );
    if (sent) return;
  }

  void fetch(GROWTH_ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body,
    credentials: "same-origin",
    keepalive: true,
  }).catch(() => {
    // Analytics must never interfere with navigation or conversion.
  });
}

function emitGrowthEventOnce(key: string, payload: GrowthAnalyticsPayload) {
  if (emittedOnce.has(key)) return;
  emittedOnce.add(key);
  emitGrowthEvent(payload);
}

function rememberAttribution(attribution: GrowthAttribution) {
  try {
    const value: StoredAttribution = { version: 1, capturedAt: Date.now(), attribution };
    window.sessionStorage.setItem(ATTRIBUTION_STORAGE_KEY, JSON.stringify(value));
  } catch {
    // Session storage can be unavailable in hardened browsers; tracking remains best-effort.
  }
}

function readAttribution(): GrowthAttribution | undefined {
  try {
    const raw = window.sessionStorage.getItem(ATTRIBUTION_STORAGE_KEY);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw) as Partial<StoredAttribution>;
    if (
      parsed.version !== 1
      || typeof parsed.capturedAt !== "number"
      || Date.now() - parsed.capturedAt > ATTRIBUTION_TTL_MS
      || !parsed.attribution
    ) {
      window.sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
      return undefined;
    }
    return parsed.attribution;
  } catch {
    return undefined;
  }
}

function clearAttribution() {
  try {
    window.sessionStorage.removeItem(ATTRIBUTION_STORAGE_KEY);
  } catch {
    // Nothing to clear when storage is unavailable.
  }
}

function sourceFromAnchor(anchor: HTMLAnchorElement): string | undefined {
  try {
    return new URL(anchor.href, window.location.origin).searchParams.get("source") || undefined;
  } catch {
    return undefined;
  }
}

function findGrowthIdentity(main: HTMLElement) {
  const anchors = Array.from(main.querySelectorAll<HTMLAnchorElement>(".sector-hero a[href]"));
  for (const anchor of anchors) {
    const source = sourceFromAnchor(anchor);
    const parsed = parseGrowthLandingSource(source);
    if (parsed) return { ...parsed, source };
  }
  return undefined;
}

function currentLeadSource(main: HTMLElement): string | undefined {
  const renderedSource = main.querySelector<HTMLElement>("[data-lead-source]")?.textContent?.trim();
  if (renderedSource) return renderedSource;
  return new URLSearchParams(window.location.search).get("source") || undefined;
}

export function GrowthAnalyticsBridge({ locale, processPath, roiPath, demoPath }: GrowthAnalyticsBridgeProps) {
  const pathname = usePathname();

  useEffect(() => {
    const growthMain = document.querySelector<HTMLElement>("main.editorial-landing-page");
    const processTargetPath = pathOf(processPath);
    const roiTargetPath = pathOf(roiPath);
    const demoTargetPath = pathOf(demoPath);

    if (growthMain) {
      const identity = findGrowthIdentity(growthMain);
      if (!identity) return;

      const base: Omit<GrowthAttribution, "stage" | "target"> = {
        landingKey: identity.landingKey,
        locale,
        canonicalPath: window.location.pathname,
        source: identity.source,
      };

      emitGrowthEventOnce(`landing:${pathname}:${identity.landingKey}`, {
        eventName: "growth_landing_view",
        ...base,
        stage: "hero",
        target: "landing",
      });

      const stageElements: Array<{ element: Element; stage: GrowthFunnelStage }> = [];
      const stagedSections = Array.from(growthMain.querySelectorAll(".growth-conversion-stage"));
      const stageOrder: GrowthFunnelStage[] = ["diagnosis", "roi", "pilot"];
      stagedSections.forEach((element, index) => {
        const stage = stageOrder[index];
        if (stage) stageElements.push({ element, stage });
      });
      const finalSection = growthMain.querySelector(".final-cta");
      if (finalSection) stageElements.push({ element: finalSection, stage: "final" });

      let observer: IntersectionObserver | undefined;
      if (typeof IntersectionObserver !== "undefined") {
        observer = new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || entry.intersectionRatio < 0.45) continue;
            const stage = stageElements.find(({ element }) => element === entry.target)?.stage;
            if (!stage) continue;
            emitGrowthEventOnce(`stage:${pathname}:${identity.landingKey}:${stage}`, {
              eventName: "growth_stage_view",
              ...base,
              stage,
              target: "landing",
            });
            observer?.unobserve(entry.target);
          }
        }, { threshold: [0.45] });
        stageElements.forEach(({ element }) => observer?.observe(element));
      }

      const handleClick = (event: MouseEvent) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        const anchor = target.closest<HTMLAnchorElement>("a[href]");
        if (!anchor || !growthMain.contains(anchor)) return;

        const hrefPath = pathOf(anchor.href);
        let funnelTarget: GrowthFunnelTarget | undefined;
        if (hrefPath === demoTargetPath) funnelTarget = "demo";
        else if (hrefPath === processTargetPath) funnelTarget = "process";
        else if (hrefPath === roiTargetPath) funnelTarget = "roi";
        if (!funnelTarget) return;

        let stage: GrowthFunnelStage | undefined;
        if (anchor.closest(".sector-hero")) stage = "hero";
        else if (anchor.closest(".final-cta")) stage = "final";
        else {
          const stageSection = anchor.closest(".growth-conversion-stage");
          if (stageSection) {
            const index = stagedSections.indexOf(stageSection);
            stage = stageOrder[index];
          }
        }
        if (!stage) return;

        const source = sourceFromAnchor(anchor) || `seo-landing:${identity.landingKey}:${stage}:${funnelTarget}`;
        const attribution: GrowthAttribution = {
          landingKey: identity.landingKey,
          locale,
          canonicalPath: window.location.pathname,
          stage,
          target: funnelTarget,
          source,
        };
        rememberAttribution(attribution);
        emitGrowthEvent({ eventName: "growth_cta_click", ...attribution });
      };

      growthMain.addEventListener("click", handleClick);
      return () => {
        observer?.disconnect();
        growthMain.removeEventListener("click", handleClick);
      };
    }

    const demoMain = document.querySelector<HTMLElement>("main.conversion-handoff-page");
    if (!demoMain) return;

    const leadSource = currentLeadSource(demoMain);
    const parsedSource = parseGrowthLandingSource(leadSource);
    const stored = readAttribution();
    const attribution: GrowthAttribution | undefined = parsedSource
      ? {
          landingKey: parsedSource.landingKey,
          locale,
          canonicalPath: stored?.landingKey === parsedSource.landingKey ? stored.canonicalPath : undefined,
          stage: parsedSource.stage,
          target: "demo",
          source: leadSource,
        }
      : stored;

    if (!attribution) return;

    emitGrowthEventOnce(`demo-view:${pathname}:${attribution.landingKey}:${leadSource || attribution.source || "stored"}`, {
      eventName: "growth_demo_form_view",
      ...attribution,
      stage: "demo",
      target: "demo",
      source: leadSource || attribution.source,
    });

    let successEmitted = false;
    let fallbackEmitted = false;
    const inspectLeadState = () => {
      if (!successEmitted && demoMain.querySelector("[data-lead-intake-success]")) {
        successEmitted = true;
        emitGrowthEvent({
          eventName: "growth_lead_submit_success",
          ...attribution,
          stage: "demo",
          target: "demo",
          source: leadSource || attribution.source,
        });
        clearAttribution();
      }
      if (!fallbackEmitted && demoMain.querySelector("[data-lead-intake-fallback]")) {
        fallbackEmitted = true;
        emitGrowthEvent({
          eventName: "growth_lead_fallback",
          ...attribution,
          stage: "demo",
          target: "email",
          source: leadSource || attribution.source,
        });
      }
    };

    const mutationObserver = new MutationObserver(inspectLeadState);
    mutationObserver.observe(demoMain, { childList: true, subtree: true });
    inspectLeadState();

    const handleDemoClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const submit = target.closest<HTMLElement>("[data-lead-submit]");
      if (submit) {
        emitGrowthEvent({
          eventName: "growth_demo_submit",
          ...attribution,
          stage: "demo",
          target: "demo",
          source: leadSource || attribution.source,
        });
        if (submit.dataset.leadSubmit === "email") {
          emitGrowthEvent({
            eventName: "growth_email_handoff",
            ...attribution,
            stage: "demo",
            target: "email",
            source: leadSource || attribution.source,
          });
        }
        return;
      }

      const fallbackMailto = target.closest<HTMLAnchorElement>("[data-lead-intake-fallback] a[href^='mailto:']");
      if (fallbackMailto) {
        emitGrowthEvent({
          eventName: "growth_email_handoff",
          ...attribution,
          stage: "demo",
          target: "email",
          source: leadSource || attribution.source,
        });
      }
    };

    demoMain.addEventListener("click", handleDemoClick);
    return () => {
      mutationObserver.disconnect();
      demoMain.removeEventListener("click", handleDemoClick);
    };
  }, [pathname, locale, processPath, roiPath, demoPath]);

  return null;
}

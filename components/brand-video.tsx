"use client";

import { useEffect, useRef, useState } from "react";

type BrandVideoMode = "ambient-loop" | "explainer";

type BrandVideoProps = {
  label: string;
  poster: string;
  webmSrc: string;
  mp4Src: string;
  mode?: BrandVideoMode;
  captionsSrc?: string;
  captionsLabel?: string;
  transcriptHref?: string;
  transcriptLabel?: string;
  className?: string;
  width?: number;
  height?: number;
  decorative?: boolean;
};

export function BrandVideo({
  label,
  poster,
  webmSrc,
  mp4Src,
  mode = "explainer",
  captionsSrc,
  captionsLabel = "Captions",
  transcriptHref,
  transcriptLabel = "Transcript",
  className = "",
  width = 1600,
  height = 900,
  decorative = false,
}: BrandVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);
  const isAmbientLoop = mode === "ambient-loop";

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(query.matches);

    syncPreference();
    query.addEventListener("change", syncPreference);
    return () => query.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    if (!isAmbientLoop || !videoRef.current) return;

    const video = videoRef.current;
    if (prefersReducedMotion) {
      video.pause();
      video.currentTime = 0;
      return;
    }

    void video.play().catch(() => {
      // Autoplay can still be blocked by the browser. The poster remains a complete fallback.
    });
  }, [isAmbientLoop, prefersReducedMotion]);

  const shouldPlayAmbientLoop = isAmbientLoop && !prefersReducedMotion;
  const figureClassName = ["brand-video", `brand-video-${mode}`, className].filter(Boolean).join(" ");

  return (
    <figure
      className={figureClassName}
      data-video-mode={mode}
      data-reduced-motion={prefersReducedMotion ? "true" : "false"}
    >
      <div className="brand-video-frame">
        {isAmbientLoop ? (
          <img
            className="brand-video-poster"
            src={poster}
            alt=""
            width={width}
            height={height}
            aria-hidden="true"
          />
        ) : null}

        <video
          ref={videoRef}
          className="brand-video-element"
          width={width}
          height={height}
          poster={poster}
          preload={isAmbientLoop ? "metadata" : "none"}
          muted={isAmbientLoop}
          loop={isAmbientLoop}
          playsInline
          controls={!isAmbientLoop}
          autoPlay={shouldPlayAmbientLoop}
          aria-hidden={decorative ? true : undefined}
          aria-label={decorative ? undefined : label}
          tabIndex={decorative ? -1 : undefined}
        >
          <source src={webmSrc} type="video/webm" />
          <source src={mp4Src} type="video/mp4" />
          {captionsSrc ? (
            <track
              kind="captions"
              src={captionsSrc}
              srcLang={captionsLabel.toLowerCase().startsWith("subt") ? "es" : "en"}
              label={captionsLabel}
              default
            />
          ) : null}
        </video>
      </div>

      {transcriptHref ? (
        <figcaption className="brand-video-caption">
          <a href={transcriptHref}>{transcriptLabel}</a>
        </figcaption>
      ) : null}
    </figure>
  );
}

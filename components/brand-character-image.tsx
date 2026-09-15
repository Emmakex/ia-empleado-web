import Image from "next/image";
import type { BrandCharacter } from "../lib/brand-characters";

type BrandCharacterImageProps = {
  character: BrandCharacter;
  alt?: string;
  className?: string;
  sizes: string;
  eager?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

/**
 * Canonical character renderer for the public IA Empleado website.
 *
 * The approved WebP remains the single identity source. The browser receives
 * the content-hashed build URL produced by the static import, while server-side
 * rasterization can keep using the stable source path. next/image generates
 * responsive srcsets from the hashed delivery URL and width/height preserve the
 * canonical 4:5 intrinsic ratio for CLS safety.
 */
export function BrandCharacterImage({
  character,
  alt = "",
  className,
  sizes,
  eager = false,
  fetchPriority = "auto",
}: BrandCharacterImageProps) {
  return (
    <Image
      src={character.deliveryAsset}
      alt={alt}
      className={className}
      width={420}
      height={525}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={fetchPriority}
      decoding="async"
    />
  );
}

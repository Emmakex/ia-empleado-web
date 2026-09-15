import Image, { type StaticImageData } from "next/image";
import type { BrandCharacter } from "../lib/brand-characters";
import claraCanonical from "../public/branding/characters/clara-canonical.webp";
import alexCanonical from "../public/branding/characters/alex-canonical.webp";
import sofiaCanonical from "../public/branding/characters/sofia-canonical.webp";
import javierCanonical from "../public/branding/characters/javier-canonical.webp";

type BrandCharacterImageProps = {
  character: BrandCharacter;
  alt?: string;
  className?: string;
  sizes: string;
  eager?: boolean;
  fetchPriority?: "high" | "low" | "auto";
};

const deliveryAssets: Record<BrandCharacter["id"], StaticImageData> = {
  clara: claraCanonical,
  alex: alexCanonical,
  sofia: sofiaCanonical,
  javier: javierCanonical,
};

/**
 * Canonical character renderer for the public IA Empleado website.
 *
 * The data model keeps the stable approved source path for server-side media
 * generation. This Next-owned renderer maps the same identity to a static image
 * import so the browser receives content-hashed build media and responsive
 * derivatives. Width/height keep the canonical 4:5 intrinsic ratio for CLS safety.
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
      src={deliveryAssets[character.id]}
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

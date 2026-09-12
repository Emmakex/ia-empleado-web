import type { BrandCharacter } from "../lib/brand-characters";
import { BrandCharacterImage } from "./brand-character-image";

type BrandRoleFamilySceneProps = {
  character: BrandCharacter;
};

export function BrandRoleFamilyScene({ character }: BrandRoleFamilySceneProps) {
  const family = character.visualFamily;

  return (
    <div
      className={`brand-role-family-scene motif-${family.motif}`}
      data-role-family={character.id}
      data-role-motif={family.motif}
    >
      <span className="brand-role-family-aura" />
      <span className="brand-role-family-motif motif-a" />
      <span className="brand-role-family-motif motif-b" />
      <span className="brand-role-family-motif motif-c" />

      <div className="brand-role-family-flow">
        {family.flow.map((step, index) => (
          <span key={step}>
            <i>{String(index + 1).padStart(2, "0")}</i>
            <b>{step}</b>
          </span>
        ))}
      </div>

      <div className="brand-role-family-portrait">
        <BrandCharacterImage
          character={character}
          sizes="(max-width: 760px) 250px, 300px"
          eager
          fetchPriority="high"
        />
      </div>

      <div className="brand-role-family-control">
        <i>✓</i>
        <span>{family.humanControl}</span>
      </div>

      <div className="brand-role-family-systems">
        {family.systems.map((system) => <span key={system}>{system}</span>)}
      </div>
    </div>
  );
}

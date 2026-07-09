import { memo } from "react";
import FeatureCard from "./Featurecard";
import type { Feature } from "../../interfaces";

export interface FeatureListProps {
  features: Feature[];
  /** Marks this lane as hidden from assistive tech (used for the duplicate marquee copy). */
  ariaHidden?: boolean;
}

/**
 * One horizontal lane of feature cards. `FeaturesMarquee` renders two of
 * these side by side and animates the pair together, which is what
 * produces a seamless infinite loop.
 */
function FeatureListBase({ features, ariaHidden = false }: FeatureListProps) {
  return (
    <ul
      className="flex  shrink-0 list-none items-stretch gap-5"
      aria-hidden={ariaHidden}
    >
      {features.map((feature) => (
        <li key={feature.id}>
          <FeatureCard feature={feature} />
        </li>
      ))}
    </ul>
  );
}

const FeatureList = memo(FeatureListBase);
export default FeatureList;

import { memo } from "react";
import type { Feature } from "../../interfaces";
import { FEATURE_MARQUEE_TOKENS } from "../../data";
import IconeofAnimatSection from "../icons/IconeofAnimatSection";

export interface FeatureCardProps {
  feature: Feature;
  /** Optional className passthrough for outer sizing overrides (e.g. responsive variants). */
  className?: string;
}

const { colors } = FEATURE_MARQUEE_TOKENS;

/**
 * A single feature card: white rounded card with a curved light-blue
 * accent shape bleeding off the right edge, an icon centered on the
 * accent shape, and a title on the left.
 */
function FeatureCardBase({ feature, className = "" }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <div
      className={[
        "relative flex shrink-0 items-center overflow-hidden",
        "w-[190px] h-[100px]",
        "sm:w-[240px] sm:h-[112px]",
        "lg:w-[280px] lg:h-[132px]",
        "rounded-md",
        
        className,
      ].join(" ")}
      style={{
        backgroundColor: colors.cardBg,
      }}
    >
      {/* Title — capped width so long labels never run into the icon shape */}
      <p
        className="relative z-10 max-w-[52%] break-words pl-6 pr-2 text-[15px] font-semibold leading-tight sm:pl-7 sm:text-[17px] lg:pl-8 lg:text-[19px]"
        style={{ color: colors.title }}
      >
        {feature.title}
      </p>

      {/* Accent shape + icon, pinned to the right edge */}
      <div className="absolute inset-y-0 right-0 flex aspect-[137/113] h-full items-center justify-center">
        <IconeofAnimatSection
          className="absolute inset-0 h-full w-full text-secondary"
         
        />
        <Icon
          className="relative z-10 h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8"
          color={colors.title}
        />
      </div>
    </div>
  );
}

/** Memoized: only re-renders when the `feature` reference changes. */
const FeatureCard = memo(FeatureCardBase);
export default FeatureCard;

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
        "relative flex shrink-0 items-center overflow-hidden bg-white",
        "w-[210px] sm:w-[250px] lg:w-[281px]",
        "h-[100px] sm:h-[112px] lg:h-[113px]",
        "border border-border rounded-[12px]",
        "transition-all duration-300 hover:border-primary group cursor-default",
        className,
      ].join(" ")}
      style={{
        backgroundColor: colors.cardBg,
      }}
    >
      {/* Title — capped width so long labels wrap nicely exactly like Figma */}
      <p className="relative z-10 font-medium text-text-secondary leading-snug break-normal pl-4 pr-2 text-[13px] sm:text-[16px] lg:text-[19px] max-w-[75px] sm:max-w-[95px] lg:max-w-[125px]">
        {feature.title}
      </p>

      {/* Accent shape + icon, pinned to the right edge with proportional aspect ratio */}
      <div className="absolute inset-y-0 right-0 flex aspect-[137/113] h-full items-center justify-center overflow-hidden pointer-events-none">
        <IconeofAnimatSection
          className="absolute inset-0 h-full w-full text-secondary transition-colors duration-300 group-hover:text-[#A7D1DE]"
        />
        <Icon
          className="relative z-10 h-6 w-6 sm:h-7 sm:w-7 lg:h-9 lg:w-9 text-text-secondary shrink-0 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  );
}

/** Memoized: only re-renders when the `feature` reference changes. */
const FeatureCard = memo(FeatureCardBase);
export default FeatureCard;

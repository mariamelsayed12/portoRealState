"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import FeatureList from "./Featurelist ";
import { FEATURE_MARQUEE_TOKENS } from "../../data";
import type { Feature } from "../../interfaces";
import { useTranslation } from "react-i18next";

export interface FeaturesMarqueeProps {
  features: Feature[];
  /** px/sec. Defaults to the design token. Higher = faster. */
  speed?: number;
  /** Optional heading rendered above the marquee (e.g. "Amenities"). */
  title?: string;
  className?: string;
}

export default function FeaturesMarquee({
  features,
  speed = FEATURE_MARQUEE_TOKENS.marquee.speedPxPerSecond,
  title,
  className = "",
}: FeaturesMarqueeProps) {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const laneRef = useRef<HTMLDivElement | null>(null);
  const [laneWidth, setLaneWidth] = useState(0);
  const isHovered = useRef(false);
  const x = useMotionValue(0);

  // Measure a single lane's width and keep it up to date across
  // breakpoints/content changes so speed stays constant and the loop
  // point stays exact.
  useEffect(() => {
    const node = laneRef.current;
    if (!node) return;

    const measure = () => {
      const width = node.scrollWidth;
      setLaneWidth(width);
      x.set(0);
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [features, isRtl]);

  useAnimationFrame((_, delta) => {
    if (isHovered.current || laneWidth === 0) return;

    const deltaSeconds = delta / 1000;
    
    if (isRtl) {
      // Scroll from left to right (positive x direction)
      let next = x.get() + speed * deltaSeconds;
      if (next >= laneWidth) {
        next -= laneWidth;
      }
      x.set(next);
    } else {
      // Scroll from right to left (negative x direction)
      let next = x.get() - speed * deltaSeconds;
      if (next <= -laneWidth) {
        next += laneWidth;
      }
      x.set(next);
    }
  });

  const handleHoverStart = useCallback(() => {
    isHovered.current = true;
  }, []);

  const handleHoverEnd = useCallback(() => {
    isHovered.current = false;
  }, []);

  // Guard against an empty feature list.
  const hasFeatures = features.length > 0;
  const secondLaneFeatures = useMemo(() => features, [features]);

  return (
    <section className={className}>
      {title ? (
        <h2 className="mb-6 text-3xl font-semibold text-black sm:mb-8 sm:text-4xl">
          {title}
        </h2>
      ) : null}

      {hasFeatures ? (
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={handleHoverStart}
          onMouseLeave={handleHoverEnd}
          role="region"
          aria-label={title ?? "Features"}
        >
          <motion.div className="flex w-max" style={{ x }}>
            <div ref={laneRef} className="flex shrink-0">
              <FeatureList features={features} />
            </div>
            {/* Duplicate lane: purely visual, creates the seamless loop. */}
            <div
              className="flex shrink-0"
              style={isRtl ? { marginRight: 24 } : { marginLeft: 24 }}
            >
              <FeatureList features={secondLaneFeatures} ariaHidden />
            </div>
          </motion.div>
        </div>
      ) : null}
    </section>
  );
}

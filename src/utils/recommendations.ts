import type { PropertyUnitCardData } from "../interfaces";

/**
 * Helper to parse property type from location string (e.g. "Porto Golf • Chalet")
 */
const getPropertyType = (u: PropertyUnitCardData): string => {
  const parts = u.location.split("•");
  return parts.length > 1 ? parts[1].trim().toLowerCase() : "";
};

/**
 * Helper to parse price as a numeric value
 */
const getPrice = (u: PropertyUnitCardData): number => {
  return parseFloat(u.price.replace(/[^0-9.]/g, "")) || 0;
};

/**
 * Helper to get bedroom count from stats
 */
const getBedrooms = (u: PropertyUnitCardData): number => {
  const bedStat = u.stats.find((s) => s.icon === "bed");
  return bedStat ? parseInt(bedStat.value, 10) || 0 : 0;
};

/**
 * Helper to parse area as a numeric value
 */
const getArea = (u: PropertyUnitCardData): number => {
  const areaStat = u.stats.find((s) => s.icon === "area");
  return areaStat ? parseFloat(areaStat.value.replace(/[^0-9.]/g, "")) || 0 : 0;
};

/**
 * Computes recommended properties dynamically using rule-based criteria:
 * 1. Same Destination (highest priority)
 * 2. Same Property Type
 * 3. Similar Price Range (within 25% or 50%)
 * 4. Similar Number of Bedrooms
 * 5. Similar Area
 * 
 * Returns between 4 to 6 properties, falling back to same-destination properties, 
 * and then other available properties if there are not enough close matches.
 */
export const getRecommendedProperties = (
  currentProperty: PropertyUnitCardData,
  allProperties: PropertyUnitCardData[],
  excludeIds: string[] = []
): PropertyUnitCardData[] => {
  // Exclude the current property and any other specified IDs (e.g. other saved favorites)
  const candidates = allProperties.filter(
    (u) => u.id !== currentProperty.id && !excludeIds.includes(u.id)
  );

  const currentType = getPropertyType(currentProperty);
  const currentPrice = getPrice(currentProperty);
  const currentBeds = getBedrooms(currentProperty);
  const currentArea = getArea(currentProperty);

  // Score candidates
  const scoredCandidates = candidates.map((candidate) => {
    let score = 0;

    // 1. Same Destination (base score of 1000 to ensure destination takes absolute priority)
    const isSameDestination = candidate.destination.slug === currentProperty.destination.slug;
    if (isSameDestination) {
      score += 1000;
    }

    // 2. Same Property Type
    const candidateType = getPropertyType(candidate);
    if (currentType && candidateType && candidateType === currentType) {
      score += 100;
    }

    // 3. Similar Price Range
    const candidatePrice = getPrice(candidate);
    if (currentPrice > 0 && candidatePrice > 0) {
      const priceDiffRatio = Math.abs(candidatePrice - currentPrice) / currentPrice;
      if (priceDiffRatio <= 0.25) {
        score += 50;
      } else if (priceDiffRatio <= 0.50) {
        score += 20;
      }
    }

    // 4. Similar Number of Bedrooms
    const candidateBeds = getBedrooms(candidate);
    if (currentBeds > 0 && candidateBeds > 0) {
      if (candidateBeds === currentBeds) {
        score += 30;
      } else if (Math.abs(candidateBeds - currentBeds) === 1) {
        score += 10;
      }
    }

    // 5. Similar Area
    const candidateArea = getArea(candidate);
    if (currentArea > 0 && candidateArea > 0) {
      const areaDiffRatio = Math.abs(candidateArea - currentArea) / currentArea;
      if (areaDiffRatio <= 0.20) {
        score += 10;
      } else if (areaDiffRatio <= 0.40) {
        score += 5;
      }
    }

    return { candidate, score };
  });

  // Sort candidates by score descending
  scoredCandidates.sort((a, b) => b.score - a.score);

  // Return the top recommended properties (slice between 4 and 6, we use 6)
  return scoredCandidates.slice(0, 6).map((item) => item.candidate);
};

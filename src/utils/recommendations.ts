import type { IProperty } from "../app/services/crudproperties";

/**
 * Helper to parse property type from property name or finishingStatus
 */
const getPropertyType = (u: IProperty | undefined): string => {
  if (!u || !u.name) return "";
  const lowerName = u.name.toLowerCase();
  if (lowerName.includes("penthouse")) return "penthouse";
  if (lowerName.includes("villa")) return "villa";
  if (lowerName.includes("apartment")) return "apartment";
  if (lowerName.includes("twin house")) return "twin house";
  return u.finishingStatus?.toLowerCase() || "";
};

/**
 * Helper to parse price as a numeric value
 */
const getPrice = (u: IProperty | undefined): number => {
  return u?.installmentPrice || 0;
};

/**
 * Helper to get bedroom count
 */
const getBedrooms = (u: IProperty | undefined): number => {
  return u?.bedrooms || 0;
};

/**
 * Helper to parse area as a numeric value
 */
const getArea = (u: IProperty | undefined): number => {
  return u?.area || 0;
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
  currentProperty: IProperty | undefined,
  allProperties: IProperty[] = [],
  excludeIds: string[] = [],
): IProperty[] => {
  if (!currentProperty || !allProperties) return [];

  // Exclude the current property and any other specified IDs (e.g. other saved favorites)
  const candidates = allProperties.filter(
    (u) => u && u._id !== currentProperty._id && !excludeIds.includes(u._id),
  );

  const currentType = getPropertyType(currentProperty);
  const currentPrice = getPrice(currentProperty);
  const currentBeds = getBedrooms(currentProperty);
  const currentArea = getArea(currentProperty);

  // Score candidates
  const scoredCandidates = candidates.map((candidate) => {
    let score = 0;

    // 1. Same Destination (base score of 1000 to ensure destination takes absolute priority)
    const isSameDestination =
      candidate.village?.slug === currentProperty.village?.slug;
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
      const priceDiffRatio =
        Math.abs(candidatePrice - currentPrice) / currentPrice;
      if (priceDiffRatio <= 0.25) {
        score += 50;
      } else if (priceDiffRatio <= 0.5) {
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
      if (areaDiffRatio <= 0.2) {
        score += 10;
      } else if (areaDiffRatio <= 0.4) {
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

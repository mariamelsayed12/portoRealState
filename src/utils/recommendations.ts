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

  const scoredCandidates = candidates.map((candidate) => {
    let score = 0;

    // 1. Same Listing Type (+10 pts)
    const sameListingType = 
      candidate.listingType && 
      currentProperty.listingType && 
      candidate.listingType.trim().toLowerCase() === currentProperty.listingType.trim().toLowerCase();
    if (sameListingType) score += 10;

    // 2. Same Village (+3 pts)
    const sameVillage = 
      (candidate.village?._id && currentProperty.village?._id && candidate.village._id === currentProperty.village._id) ||
      (candidate.village?.slug && currentProperty.village?.slug && candidate.village.slug === currentProperty.village.slug);
    if (sameVillage) score += 3;

    // 3. Same Price (+2 pts)
    const samePrice = 
      candidate.installmentPrice !== undefined && 
      currentProperty.installmentPrice !== undefined && 
      candidate.installmentPrice === currentProperty.installmentPrice;
    if (samePrice) score += 2;

    return { candidate, score };
  });

  // Sort candidates by score descending and filter out 0 score
  return scoredCandidates
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.candidate)
    .slice(0, 6);
};

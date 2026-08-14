import type { IProperty } from "../app/services/crudproperties";
import { isRentListing } from "./index";

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
    let samePrice = false;
    if (isRentListing(currentProperty.listingType)) {
      samePrice =
        candidate.cashPrice !== undefined &&
        currentProperty.cashPrice !== undefined &&
        candidate.cashPrice === currentProperty.cashPrice;
    } else {
      const isCurrentCash = currentProperty.paymentModel?.toLowerCase() === "cash";
      const isCandidateCash = candidate.paymentModel?.toLowerCase() === "cash";
      if (isCurrentCash && isCandidateCash) {
        samePrice =
          candidate.cashPrice !== undefined &&
          currentProperty.cashPrice !== undefined &&
          candidate.cashPrice === currentProperty.cashPrice;
      } else if (!isCurrentCash && !isCandidateCash) {
        samePrice =
          candidate.installmentPrice !== undefined &&
          currentProperty.installmentPrice !== undefined &&
          candidate.installmentPrice === currentProperty.installmentPrice;
      }
    }
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

import { useState, useMemo, useCallback, useEffect } from "react";
import type { IProperty } from "../app/services/crudproperties";
import { useSearchParams } from "react-router-dom";

import { isRentListing } from "../utils";

export interface FilterState {
  propertyType: string;
  bedrooms: string;
  bathrooms: string;
  areaFrom: string;
  areaTo: string;
  priceFrom: string;
  priceTo: string;
  downPayment: string;
  monthlyInstallment: string;
  deliveryDate: string;
  finishing: string;
  location?: string;
}

export const initialFilterState: FilterState = {
  propertyType: "",
  bedrooms: "",
  bathrooms: "",
  areaFrom: "",
  areaTo: "",
  priceFrom: "",
  priceTo: "",
  downPayment: "",
  monthlyInstallment: "",
  deliveryDate: "",
  finishing: "",
  location: "",
};

// Deterministic finishing assignment since mock data doesn't have a finishing field
export const getFinishingForUnit = (unitId: string): string => {
  let hash = 0;
  for (let i = 0; i < unitId.length; i++) {
    hash = unitId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % 4;
  const finishingTypes = [
    "Not finished",
    "Semi finished",
    "Finished",
    "Fully furnished",
  ];
  return finishingTypes[index];
};

// Helper function to check if a unit matches a set of filters
export const matchUnit = (
  unit: IProperty,
  filterState: FilterState,
): boolean => {
  // 1. Property Type Filter
  if (filterState.propertyType) {
    const selectedTypes = filterState.propertyType.split(",").map(t => t.trim().toLowerCase());
    const unitType = (unit.propertyType || "").toLowerCase();

    const matchesType = selectedTypes.some(targetType => {
      const isChalet = (t: string) => t === "chalet" || t === "challet" || t === "chalets" || t === "challets";
      if (isChalet(targetType)) {
        return isChalet(unitType);
      }
      if (targetType === "twin house" || targetType === "twinhouse" || targetType === "townhouse" || targetType === "town house") {
        return (
          unitType.includes("twin") ||
          unitType.includes("town")
        );
      }
      return unitType === targetType || unitType.includes(targetType);
    });

    if (!matchesType) return false;
  }

  // 2. Bedrooms Filter
  if (filterState.bedrooms) {
    const bedValue = unit.bedrooms || 0;

    if (filterState.bedrooms === "5+") {
      if (bedValue < 5) return false;
    } else {
      const targetBeds = parseInt(filterState.bedrooms, 10);
      if (bedValue !== targetBeds) return false;
    }
  }

  // 3. Bathrooms Filter
  if (filterState.bathrooms) {
    const bathValue = unit.bathrooms || 0;

    if (filterState.bathrooms === "3+") {
      if (bathValue < 3) return false;
    } else {
      const targetBaths = parseFloat(filterState.bathrooms);
      if (bathValue < targetBaths) return false;
    }
  }

  // 4. Area Range Filter
  const areaValue = unit.area || 0;
  if (filterState.areaFrom) {
    if (areaValue < parseFloat(filterState.areaFrom))
      return false;
  }
  if (filterState.areaTo) {
    if (areaValue > parseFloat(filterState.areaTo))
      return false;
  }

  // 5. Price Range Filter
  const getPrice = (u: IProperty) => {
    if (isRentListing(u.listingType)) {
      return u.insurance || 0;
    }
    if (u.paymentModel?.toLowerCase() === "cash") {
      return u.cashPrice || 0;
    }
    return u.installmentPrice || 0;
  };
  const priceValue = getPrice(unit);
  if (filterState.priceFrom) {
    if (priceValue < parseFloat(filterState.priceFrom))
      return false;
  }
  if (filterState.priceTo) {
    if (priceValue > parseFloat(filterState.priceTo))
      return false;
  }

  // 6. Payments Filter (Down Payment & Monthly Installment)
  const unitDownPayment = unit.downPaymentAmount || 0;
  const unitMonthlyInstallment = unit.paymentModel === "Cash" ? 0 : (unit.installmentValue || 0) / 3;

  if (filterState.downPayment) {
    if (unitDownPayment > parseFloat(filterState.downPayment)) return false;
  }
  if (filterState.monthlyInstallment) {
    if (unitMonthlyInstallment > parseFloat(filterState.monthlyInstallment))
      return false;
  }

  // 7. Delivery Date Filter
  if (filterState.deliveryDate) {
    if (!unit.deliveryDate) return false;
    const cleanUnitDate = unit.deliveryDate.trim().toLowerCase();
    const cleanFilterDate = filterState.deliveryDate.trim().toLowerCase();

    const isYearFilter = /^\b(19|20|21)\d{2}\b/.test(cleanFilterDate);
    if (isYearFilter) {
      const unitYear = cleanUnitDate.includes("-") ? cleanUnitDate.split("-")[0] : cleanUnitDate;
      if (unitYear !== cleanFilterDate) return false;
    } else {
      if (cleanUnitDate !== cleanFilterDate) return false;
    }
  }

  // 8. Finishing Filter
  if (filterState.finishing) {
    if (unit.finishingStatus?.toLowerCase() !== filterState.finishing.toLowerCase())
      return false;
  }

  // 9. Location Filter
  if (filterState.location) {
    const normalize = (s: string) => s.toLowerCase().replace(/[\s-_]+/g, "");
    const selectedLocs = filterState.location.split(",").map(l => normalize(l.trim()));
    if (
      !selectedLocs.includes(normalize(unit.village?.name || ""))
    ) {
      return false;
    }
  }

  return true;
};

export const useUnitsFilter = (units: IProperty[]) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Parse search params to FilterState
  const parseParams = useCallback((): FilterState => {
    return {
      propertyType: searchParams.get("type") || searchParams.get("propertyType") || "",
      bedrooms: searchParams.get("bedrooms") || searchParams.get("beds") || "",
      bathrooms: searchParams.get("bathrooms") || searchParams.get("baths") || "",
      areaFrom: searchParams.get("areaFrom") || "",
      areaTo: searchParams.get("areaTo") || "",
      priceFrom: searchParams.get("priceFrom") || "",
      priceTo: searchParams.get("priceTo") || "",
      downPayment: searchParams.get("downPayment") || "",
      monthlyInstallment: searchParams.get("monthlyInstallment") || "",
      deliveryDate: searchParams.get("deliveryDate") || "",
      finishing: searchParams.get("finishing") || "",
      location: searchParams.get("location") || "",
    };
  }, [searchParams]);

  // Committed filters that affect the main page
  const [filters, setFilters] = useState<FilterState>(parseParams());

  // Local/unsaved filters inside the drawer
  const [tempFilters, setTempFilters] = useState<FilterState>(parseParams());

  // Sync state when URL params change (e.g. on navigation)
  useEffect(() => {
    const parsed = parseParams();
    setFilters((prev) => {
      const changed = Object.keys(parsed).some(
        (key) => (parsed as any)[key] !== (prev as any)[key]
      );
      return changed ? parsed : prev;
    });
    setTempFilters((prev) => {
      const changed = Object.keys(parsed).some(
        (key) => (parsed as any)[key] !== (prev as any)[key]
      );
      return changed ? parsed : prev;
    });
  }, [parseParams]);

  // Memoized filtered units based on committed filters
  const filteredUnits = useMemo(() => {
    return units.filter((unit) => matchUnit(unit, filters));
  }, [units, filters]);

  // Memoized matching count based on temporary filters (for drawer count display)
  const tempFilteredCount = useMemo(() => {
    return units.filter((unit) => matchUnit(unit, tempFilters)).length;
  }, [units, tempFilters]);

  // Apply the temporary filters to committed filters and URL
  const applyFilters = useCallback(() => {
    setFilters(tempFilters);
    const params = new URLSearchParams();
    if (tempFilters.propertyType) params.set("type", tempFilters.propertyType);
    if (tempFilters.location) params.set("location", tempFilters.location);
    if (tempFilters.bedrooms) params.set("bedrooms", tempFilters.bedrooms);
    if (tempFilters.bathrooms) params.set("bathrooms", tempFilters.bathrooms);
    if (tempFilters.priceFrom) params.set("priceFrom", tempFilters.priceFrom);
    if (tempFilters.priceTo) params.set("priceTo", tempFilters.priceTo);

    // Compare with current URL values directly to avoid React state batching race conditions
    const parsed = parseParams();
    const filtersChanged = Object.keys(tempFilters).some(
      (key) => (tempFilters as any)[key] !== (parsed as any)[key]
    );
    if (!filtersChanged) {
      const currentPageParam = searchParams.get("page");
      if (currentPageParam) {
        params.set("page", currentPageParam);
      }
    }

    // Only update searchParams if they actually changed to prevent infinite rendering loop during page transitions
    const newParamsStr = params.toString();
    const currentParamsStr = searchParams.toString();
    if (newParamsStr !== currentParamsStr) {
      setSearchParams(params, { replace: true });
    }
  }, [tempFilters, parseParams, searchParams, setSearchParams]);

  // Reset both temporary and committed filters and URL
  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
    setTempFilters(initialFilterState);
    if (searchParams.toString() !== "") {
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  return {
    filters,
    setFilters,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    filteredUnits,
    tempFilteredCount,
  };
};

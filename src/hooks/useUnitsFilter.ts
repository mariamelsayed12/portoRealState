import { useState, useMemo, useCallback } from "react";
import type { PropertyUnitCardData } from "../interfaces";

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
};

// Deterministic finishing assignment since mock data doesn't have a finishing field
export const getFinishingForUnit = (unitId: string): string => {
  let hash = 0;
  for (let i = 0; i < unitId.length; i++) {
    hash = unitId.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % 4;
  const finishingTypes = ["Not finished", "Semi finished", "Finished", "Fully furnished"];
  return finishingTypes[index];
};

// Helper function to check if a unit matches a set of filters
export const matchUnit = (unit: PropertyUnitCardData, filterState: FilterState): boolean => {
  // 1. Property Type Filter
  if (filterState.propertyType) {
    const parts = unit.location.split("•");
    const unitType = parts.length > 1 ? parts[1].trim().toLowerCase() : "";
    const targetType = filterState.propertyType.trim().toLowerCase();

    const isChalet = (t: string) => t === "chalet" || t === "challet" || t === "chalets" || t === "challets";

    let matchesType = false;
    if (isChalet(targetType)) {
      matchesType = isChalet(unitType);
    } else if (targetType === "twin house" || targetType === "twinhouse") {
      matchesType = unitType === "twin house" || unitType === "townhouse" || unitType === "town house";
    } else if (targetType === "apartment") {
      matchesType = unitType === "apartment" || unitType === "studio" || unitType === "penthouse";
    } else {
      matchesType = unitType === targetType;
    }

    if (!matchesType) return false;
  }

  // 2. Bedrooms Filter
  if (filterState.bedrooms) {
    const bedStat = unit.stats.find((s) => s.icon === "bed");
    if (!bedStat) return false;
    const bedValue = parseInt(bedStat.value, 10);
    
    if (filterState.bedrooms === "5+") {
      if (bedValue < 5) return false;
    } else {
      const targetBeds = parseInt(filterState.bedrooms, 10);
      if (bedValue !== targetBeds) return false;
    }
  }

  // 3. Bathrooms Filter
  if (filterState.bathrooms) {
    const bathStat = unit.stats.find((s) => s.icon === "bath");
    if (!bathStat) return false;
    const bathValue = parseFloat(bathStat.value);

    if (filterState.bathrooms === "3+") {
      if (bathValue < 3) return false;
    } else {
      const targetBaths = parseFloat(filterState.bathrooms);
      if (bathValue < targetBaths) return false;
    }
  }

  // 4. Area Range Filter
  const areaStat = unit.stats.find((s) => s.icon === "area");
  const areaValue = areaStat ? parseFloat(areaStat.value) : NaN;
  if (filterState.areaFrom) {
    if (isNaN(areaValue) || areaValue < parseFloat(filterState.areaFrom)) return false;
  }
  if (filterState.areaTo) {
    if (isNaN(areaValue) || areaValue > parseFloat(filterState.areaTo)) return false;
  }

  // 5. Price Range Filter
  const priceValue = parseFloat(unit.price.replace(/[^0-9.]/g, ""));
  if (filterState.priceFrom) {
    if (isNaN(priceValue) || priceValue < parseFloat(filterState.priceFrom)) return false;
  }
  if (filterState.priceTo) {
    if (isNaN(priceValue) || priceValue > parseFloat(filterState.priceTo)) return false;
  }

  // 6. Payments Filter (Down Payment & Monthly Installment)
  let unitDownPayment = 0;
  let unitMonthlyInstallment = 0;

  if (!isNaN(priceValue)) {
    const note = unit.paymentNote.toLowerCase();
    if (note.includes("full cash payment")) {
      unitDownPayment = priceValue;
      unitMonthlyInstallment = 0;
    } else {
      // Down payment percent match
      const pctMatch = note.match(/(\d+(?:\.\d+)?)\s*%\s*down/i);
      if (pctMatch) {
        const pct = parseFloat(pctMatch[1]);
        unitDownPayment = priceValue * (pct / 100);
      }
      
      // Installment quarterly match
      const qtMatch = note.match(/([\d,]+)\s*quarterly/i);
      if (qtMatch) {
        const qtVal = parseFloat(qtMatch[1].replace(/,/g, ""));
        unitMonthlyInstallment = qtVal / 3;
      }
    }
  }

  if (filterState.downPayment) {
    if (unitDownPayment > parseFloat(filterState.downPayment)) return false;
  }
  if (filterState.monthlyInstallment) {
    if (unitMonthlyInstallment > parseFloat(filterState.monthlyInstallment)) return false;
  }

  // 7. Delivery Date Filter
  if (filterState.deliveryDate) {
    // Find delivery badge
    const deliveryBadge = unit.badges.find((b) => b.toLowerCase().includes("delivery"));
    let deliveryYear: number | null = null;
    if (deliveryBadge) {
      const match = deliveryBadge.match(/delivery in (\d+)/i);
      if (match) {
        deliveryYear = parseInt(match[1], 10);
      }
    }

    if (filterState.deliveryDate.toLowerCase() === "ready") {
      // If there's a delivery badge and the year is in the future
      if (deliveryYear && deliveryYear > 2026) return false;
    } else {
      const targetYear = parseInt(filterState.deliveryDate, 10);
      if (deliveryYear !== targetYear) return false;
    }
  }

  // 8. Finishing Filter
  if (filterState.finishing) {
    const unitFinishing = getFinishingForUnit(unit.id);
    if (unitFinishing.toLowerCase() !== filterState.finishing.toLowerCase()) return false;
  }

  return true;
};

export const useUnitsFilter = (units: PropertyUnitCardData[]) => {
  // Committed filters that affect the main page
  const [filters, setFilters] = useState<FilterState>(initialFilterState);

  // Local/unsaved filters inside the drawer
  const [tempFilters, setTempFilters] = useState<FilterState>(initialFilterState);

  // Memoized filtered units based on committed filters
  const filteredUnits = useMemo(() => {
    return units.filter((unit) => matchUnit(unit, filters));
  }, [units, filters]);

  // Memoized matching count based on temporary filters (for drawer count display)
  const tempFilteredCount = useMemo(() => {
    return units.filter((unit) => matchUnit(unit, tempFilters)).length;
  }, [units, tempFilters]);

  // Apply the temporary filters to committed filters
  const applyFilters = useCallback(() => {
    setFilters(tempFilters);
  }, [tempFilters]);

  // Reset both temporary and committed filters
  const resetFilters = useCallback(() => {
    setFilters(initialFilterState);
    setTempFilters(initialFilterState);
  }, []);

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

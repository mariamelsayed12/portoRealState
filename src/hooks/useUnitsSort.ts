import { useState, useMemo } from "react";
import type { IProperty } from "../app/services/crudproperties";

import { isRentListing } from "../utils";

export type SortOption =
  | "max-price"
  | "min-price"
  | "ready-by"
  | "min-installments"
  | "max-installments"
  | "";

export const useUnitsSort = (units: IProperty[]) => {
  const [activeSort, setActiveSort] = useState<SortOption>("");

  const sortedUnits = useMemo(() => {
    if (!activeSort) return units;

    const sorted = [...units];

    const getPrice = (unit: IProperty) => {
      if (isRentListing(unit.listingType)) {
        return unit.insurance || 0;
      }
      if (unit.paymentModel?.toLowerCase() === "cash") {
        return unit.cashPrice || 0;
      }
      return unit.installmentPrice || 0;
    };

    const getDeliveryYear = (unit: IProperty) => {
      if (!unit.deliveryDate) return 0;
      if (unit.deliveryDate.includes("-")) {
        return parseInt(unit.deliveryDate.split("-")[0], 10) || 0;
      }
      return parseInt(unit.deliveryDate, 10) || 0;
    };

    const getMonthlyInstallment = (unit: IProperty) => {
      if (unit.paymentModel === "Cash") return 0;
      return (unit.installmentValue || 0) / 3;
    };

    sorted.sort((a, b) => {
      switch (activeSort) {
        case "max-price":
          return getPrice(b) - getPrice(a);
        case "min-price":
          return getPrice(a) - getPrice(b);
        case "ready-by":
          return getDeliveryYear(a) - getDeliveryYear(b);
        case "min-installments":
          return getMonthlyInstallment(a) - getMonthlyInstallment(b);
        case "max-installments":
          return getMonthlyInstallment(b) - getMonthlyInstallment(a);
        default:
          return 0;
      }
    });

    return sorted;
  }, [units, activeSort]);

  return {
    activeSort,
    setActiveSort,
    sortedUnits,
  };
};

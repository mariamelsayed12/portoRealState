import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useUnitsFilter, type FilterState } from "./useUnitsFilter";
import { useGetPaginatedPropertiesQuery } from "../app/services/crudproperties";
import { useGetVillageQuery } from "../app/services/crudVillage";
import { useTranslation } from "react-i18next";

const mapFiltersToBackend = (filters: FilterState, destinations: any[] = []) => {
  const params: Record<string, string> = {};

  if (filters.propertyType) {
    params["propertyType[in]"] = filters.propertyType;
  }
  if (filters.bedrooms) {
    if (filters.bedrooms === "5+") {
      params["bedrooms[gte]"] = "5";
    } else {
      params["bedrooms"] = filters.bedrooms;
    }
  }
  if (filters.bathrooms) {
    if (filters.bathrooms === "3+") {
      params["bathrooms[gte]"] = "3";
    } else {
      params["bathrooms"] = filters.bathrooms;
    }
  }
  if (filters.priceFrom) {
    params["installmentPrice[gte]"] = filters.priceFrom;
  }
  if (filters.priceTo) {
    params["installmentPrice[lte]"] = filters.priceTo;
  }
  if (filters.areaFrom) {
    params["area[gte]"] = filters.areaFrom;
  }
  if (filters.areaTo) {
    params["area[lte]"] = filters.areaTo;
  }
  if (filters.downPayment) {
    params["downPaymentAmount[lte]"] = filters.downPayment;
  }
  if (filters.monthlyInstallment) {
    params["installmentValue[lte]"] = (parseFloat(filters.monthlyInstallment) * 3).toString();
  }
  if (filters.deliveryDate) {
    const isYear = /^\b(19|20|21)\d{2}\b/.test(filters.deliveryDate);
    if (isYear) {
      params["deliveryDate[gte]"] = `${filters.deliveryDate}-01-01`;
      params["deliveryDate[lte]"] = `${filters.deliveryDate}-12-31`;
    } else {
      params["deliveryDate"] = filters.deliveryDate;
    }
  }
  if (filters.finishing) {
    params["finishingStatus"] = filters.finishing;
  }
  if (filters.location) {
    const names = filters.location.split(",").map((n) => n.trim().toLowerCase());
    const ids = destinations
      .filter((d) => names.includes(d.name.toLowerCase()))
      .map((d) => d._id);
    if (ids.length > 0) {
      params["village[in]"] = ids.join(",");
    } else {
      params["village"] = "000000000000000000000000";
    }
  }

  return params;
};

export const useBuyProperties = () => {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  // Fetch villages/destinations for mapping location names to IDs
  const { data: destinations = [] } = useGetVillageQuery({ lang: i18n.language });

  // Get active filters and URL synchronization
  const {
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    filters,
  } = useUnitsFilter([]);

  const [properties, setProperties] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [lastAppendedPage, setLastAppendedPage] = useState(0);

  // Track if the user has scrolled since the last data append
  const userScrolledRef = useRef(true);

  useEffect(() => {
    const handleScroll = () => {
      userScrolledRef.current = true;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Reset pagination on filter changes
  const filterKey = useMemo(() => {
    return JSON.stringify(filters) + searchParams.get("sort");
  }, [filters, searchParams]);

  useEffect(() => {
    setPage(1);
    setLastAppendedPage(0);
    setProperties([]);
    userScrolledRef.current = true;
  }, [filterKey]);

  // Main properties page query parameters
  const backendFilters = useMemo(() => {
    const params = mapFiltersToBackend(filters, destinations);
    const sort = searchParams.get("sort") || "";
    return {
      page,
      limit: 6,
      "listingType[in]": "Developer,Resale",
      ...(sort ? { sort } : {}),
      ...params,
    };
  }, [page, filters, destinations, searchParams]);

  // Main list fetch
  const { data, isFetching, isLoading } = useGetPaginatedPropertiesQuery(backendFilters, {
    skip: destinations.length === 0,
  });

  // Query backend with tempFilters to get the matching count for the drawer apply button
  const tempBackendFilters = useMemo(() => {
    const params = mapFiltersToBackend(tempFilters, destinations);
    return {
      page: 1,
      limit: 1,
      "listingType[in]": "Developer,Resale",
      ...params,
    };
  }, [tempFilters, destinations]);

  const { data: tempCountData } = useGetPaginatedPropertiesQuery(tempBackendFilters, {
    skip: destinations.length === 0,
  });
  const tempFilteredCount = tempCountData?.results ?? 0;

  // Append new page items to local state list
  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setProperties(data.data);
        setLastAppendedPage(1);
        userScrolledRef.current = false;
      } else {
        setProperties((prev) => {
          const existingIds = new Set(prev.map((item) => item._id));
          const newItems = data.data.filter((item) => !existingIds.has(item._id));
          return [...prev, ...newItems];
        });
        setLastAppendedPage(page);
        userScrolledRef.current = false;
      }
    }
  }, [data, page]);

  const hasNextPage = !!(
    data?.paginationResult &&
    page < data.paginationResult.numberOfPages &&
      page === lastAppendedPage
  );

  return {
    properties,
    isFetching,
    isLoading,
    hasNextPage,
    page,
    setPage,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    tempFilteredCount,
    checkCanTrigger: () => userScrolledRef.current,
  };
};

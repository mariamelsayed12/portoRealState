import { useState, useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useUnitsFilter } from "./useUnitsFilter";
import { useUnitsSort, type SortOption } from "./useUnitsSort";
import { useGetPropertyQuery } from "../app/services/crudproperties";
import { useTranslation } from "react-i18next";
import { isRentListing } from "../utils";

export const useBuyProperties = () => {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  // Fetch all properties from backend (cached and shared)
  const { data: allProperties = [], isLoading: isPropertiesLoading, isFetching: isPropertiesFetching } = useGetPropertyQuery({ lang: i18n.language });

  // Filter properties by buy page listing types (Developer, Resale)
  const buyProperties = useMemo(() => {
    return allProperties.filter((u) => !isRentListing(u.listingType));
  }, [allProperties]);

  // Use the active units filter on the buy properties
  const {
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    filters,
    filteredUnits,
    tempFilteredCount,
  } = useUnitsFilter(buyProperties);

  // Sync sorting from URL params using useUnitsSort hook
  const { setActiveSort, sortedUnits } = useUnitsSort(filteredUnits);

  useEffect(() => {
    const sortParam = searchParams.get("sort") || "";
    setActiveSort(sortParam as SortOption);
  }, [searchParams, setActiveSort]);

  // Pagination page state
  const [page, setPage] = useState(1);

  // Reset page when filters or sorting changes
  const filterKey = useMemo(() => {
    return JSON.stringify(filters) + searchParams.get("sort");
  }, [filters, searchParams]);

  useEffect(() => {
    setPage(1);
  }, [filterKey]);

  // Paginated properties to display
  const itemsPerPage = 6;
  const properties = useMemo(() => {
    return sortedUnits.slice(0, page * itemsPerPage);
  }, [sortedUnits, page]);

  const hasNextPage = properties.length < sortedUnits.length;

  const showInitialLoading = isPropertiesLoading;

  const showEmptyState = !showInitialLoading && !isPropertiesFetching && sortedUnits.length === 0;

  // Track if the user has scrolled since the last page increment to throttle double triggers
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

  useEffect(() => {
    userScrolledRef.current = false;
  }, [page]);

  return {
    properties,
    isFetching: isPropertiesFetching,
    isLoading: isPropertiesLoading,
    hasNextPage,
    page,
    setPage,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    tempFilteredCount,
    checkCanTrigger: () => userScrolledRef.current,
    showInitialLoading,
    showEmptyState,
  };
};

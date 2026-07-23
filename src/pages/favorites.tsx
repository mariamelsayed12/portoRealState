import { useState, useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTranslation } from "react-i18next";

import type { RootState } from "../app/store";
import UnitCard from "../components/UnitCard";
import { useUnitsFilter } from "../hooks/useUnitsFilter";
import { useUnitsSort, type SortOption } from "../hooks/useUnitsSort";
import AmenitiesSection from "../components/Ui/AmenitiesSection";
import { units } from "../data";
import { getRecommendedProperties } from "../utils/recommendations";
import FilterDrawer from "../components/filterCcomponents/FilterDrawer";
import FilterIcon from "../components/icons/Filter";
import SortIcon from "../components/icons/SortIcon";

const FavoritesPage = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { favUnite } = useSelector((state: RootState) => state.favUnit);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const SORT_OPTIONS: { label: string; value: SortOption }[] = useMemo(() => [
    { label: t("rent.sort.maxPrice"), value: "max-price" },
    { label: t("rent.sort.minPrice"), value: "min-price" },
    { label: t("rent.sort.readyBy"), value: "ready-by" },
    { label: t("rent.sort.minInstallments"), value: "min-installments" },
    { label: t("rent.sort.maxInstallments"), value: "max-installments" },
  ], [t]);

  // Apply sidebar filters on top of favorite properties
  const {
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    filteredUnits,
    tempFilteredCount,
  } = useUnitsFilter(favUnite);

  // Sort the currently filtered properties
  const { activeSort, setActiveSort, sortedUnits } =
    useUnitsSort(filteredUnits);

  // Generate recommendations based on the latest saved property
  const recommendedProperties = useMemo(() => {
    if (favUnite.length === 0) return [];
    const latestFav = favUnite[favUnite.length - 1];
    const excludeIds = favUnite.map((u) => u.id);
    return getRecommendedProperties(latestFav, units, excludeIds);
  }, [favUnite]);

  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const canScroll = useMemo(
    () => recommendedProperties.length > 3,
    [recommendedProperties],
  );

  const scrollByCards = (direction: "left" | "right") => {
    const container = scrollerRef.current;
    if (!container) return;
    const cardWidth = 286 + 16;
    const amount = direction === "left" ? -cardWidth * 1.15 : cardWidth * 1.15;
    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  if (favUnite.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart className="h-16 w-16 text-[#7D8D93] mb-4 opacity-50" />
        <h2 className="text-2xl font-semibold text-text-secondary mb-2">
          {t("favorites.noSavedTitle")}
        </h2>
        <p className="text-sm text-[#7D8D93] max-w-sm">
          {t("favorites.noSavedDescription")}
        </p>
      </div>
    );
  }

  return (
    <section className="bg-background pb-14 sm:pb-16 overflow-x-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-text-secondary sm:text-[40px]">
              {t("favorites.title")}
            </h1>
            <p className="mt-2 text-sm text-[#7D8D93]">
              {sortedUnits.length === 1 ? t("favorites.resultCountOne") : t("favorites.resultCountOther", { count: sortedUnits.length })}
            </p>
          </div>

          {/* Action Buttons: Filter & Sort */}
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 z-20">
            <motion.button
              type="button"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 rounded-md border border-[#747474] bg-white px-[16px] py-[8px] text-xs font-semibold text-primary shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <FilterIcon className="h-4 w-4 text-primary" />
              <span>{t("favorites.filterBtn")}</span>
            </motion.button>

            <div className="relative">
              <motion.button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 rounded-md border border-[#747474] bg-white px-[16px] py-[8px] text-xs font-semibold text-primary shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>
                  {t("favorites.sortBtn")}{activeSort ? `: ${SORT_OPTIONS.find((o) => o.value === activeSort)?.label}` : ""}
                </span>
                <SortIcon className="w-[18px] h-[18px] text-primary" />
              </motion.button>
              {isSortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 rtl:right-auto rtl:left-0 top-full mt-2 z-20 w-52 bg-white rounded-xl shadow-xl border border-[#E8EFF1] py-1 overflow-hidden">
                    {SORT_OPTIONS.map((opt) => {
                      const isSelected = activeSort === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          type="button"
                          onClick={() => {
                            setActiveSort(isSelected ? "" : opt.value);
                            setIsSortOpen(false);
                          }}
                          whileHover={{ x: 4, backgroundColor: "#E9F4F7" }}
                          className={`w-full text-left rtl:text-right px-4 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#E9F4F7] text-primary"
                              : "text-[#58696F]"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && (
                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Layout container: Sidebar & Grid */}
        <div className="flex flex-col lg:flex-row gap-8 items-start relative">
          {/* Units Grid */}
          <div className="flex-1 w-full overflow-hidden pb-3">
            {sortedUnits.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-stretch transition-all duration-300"
              >
                <AnimatePresence mode="popLayout">
                  {sortedUnits.map((unit) => (
                    <motion.div
                      key={unit.id}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 220,
                      }}
                      className="w-full"
                    >
                      <UnitCard card={unit} className="w-full" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-base text-[#7D8D93]">
                  {t("favorites.noProperties")}
                </p>
              </div>
            )}
          </div>

          {/* Sidebar drawer */}
          <FilterDrawer
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            tempFilters={tempFilters}
            setTempFilters={setTempFilters}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            tempFilteredCount={tempFilteredCount}
          />
        </div>

        <div className="lg:py-16 py-8 md:py-12">
          <AmenitiesSection />
        </div>

        {/* Recommended Properties Slider Section */}
        {recommendedProperties.length > 0 && (
          <div className="  w-full pt-12 ">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-secondary">
                {t("favorites.recommendedTitle")}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollByCards(isRtl ? "right" : "left")}
                  disabled={!canScroll}
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-[12px] border border-[#747474] text-primary hover:border-primary transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Scroll properties left"
                >
                  {isRtl ? (
                    <ChevronRight className="w-5 h-5 text-primary hover:text-inherit" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-primary hover:text-inherit" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => scrollByCards(isRtl ? "left" : "right")}
                  disabled={!canScroll}
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-[12px] border border-[#747474] text-primary hover:border-primary transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                  aria-label="Scroll properties right"
                >
                  {isRtl ? (
                    <ChevronLeft className="w-5 h-5 text-primary hover:text-inherit" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-primary hover:text-inherit" />
                  )}
                </button>
              </div>
            </div>
            <div
              ref={scrollerRef}
              className="flex gap-4 overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {recommendedProperties.map((unit) => (
                <UnitCard key={unit.id} card={unit} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesPage;

import { useState, useEffect, useMemo } from "react";
import UnitCard from "../components/UnitCard";
import UnitCardSkeleton from "../components/UnitCardSkeleton";
import { AnimatePresence, motion } from "framer-motion";
import { useUnitsFilter } from "../hooks/useUnitsFilter";
import { useGetPropertyQuery } from "../app/services/crudproperties";
import FilterDrawer from "../components/filterCcomponents/FilterDrawer";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import EmptyState from "../components/Ui/EmptyState";

const ITEMS_PER_PAGE = 6;

const BuyPage = () => {
  const { i18n } = useTranslation();
  const { data: units = [] ,isLoading} = useGetPropertyQuery({ lang: i18n.language });
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t } = useTranslation();

  // Apply sidebar filters on top of destination and tab filtered units
  const {
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    filteredUnits,
    tempFilteredCount,
  } = useUnitsFilter(units);

  const [visiblePages, setVisiblePages] = useState(1);
  const [isMoreLoading, setIsMoreLoading] = useState(false);

  const totalPages = Math.ceil(filteredUnits.length / ITEMS_PER_PAGE);

  const paginatedUnits = useMemo(() => {
    return filteredUnits.slice(0, visiblePages * ITEMS_PER_PAGE);
  }, [filteredUnits, visiblePages]);

  // Reset pagination when filters are applied (i.e. filtered units update)
  useEffect(() => {
    setVisiblePages(1);
  }, [filteredUnits]);

  const handleLoadMore = () => {
    if (visiblePages < totalPages && !isMoreLoading) {
      setIsMoreLoading(true);
      setTimeout(() => {
        setVisiblePages((prev) => prev + 1);
        setIsMoreLoading(false);
      }, 600);
    }
  };

  return (
    <div className="">
      <div className="pb-10">
        <h3 className="text-text-darker text-3xl font-semibold">
          {t("buy.title")}
        </h3>
      </div>
      {/* Tabs Navigation */}

      <div className="flex py-4 lg:hidden items-center justify-end gap-3 self-start sm:self-auto shrink-0 z-20">
        <motion.button
          type="button"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 rounded-lg border border-[#D9E1E4] bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <SlidersHorizontal className="h-4 w-4 text-primary" />
          <span>Filter</span>
        </motion.button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        {/* Sidebar (Overlay on mobile/tablet, sticky inline on desktop) */}
        {/* Desktop: static sidebar always visible */}
        <FilterDrawer
          units={units}
          displayMode="static"
          className="hidden lg:flex w-[370px]"
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          tempFilteredCount={tempFilteredCount}
        />

        {/* Units Grid */}
        <div className="flex-1 w-full overflow-hidden lg:pb-7 md:pb-5 pb-3">
          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-stretch transition-all duration-300 lg:grid-cols-2 xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <UnitCardSkeleton key={idx} className="w-full" />
              ))}
            </div>
          ) : paginatedUnits.length > 0 ? (
            <>
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-stretch transition-all duration-300 lg:grid-cols-2 xl:grid-cols-2"
              >
                <AnimatePresence mode="popLayout">
                  {paginatedUnits.map((unit) => (
                    <motion.div
                      key={unit._id}
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

              {/* Load More Button */}
              {visiblePages < totalPages && (
                <div className="flex justify-center mt-12 py-4">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    disabled={isMoreLoading}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-white shadow-md hover:bg-[#156d85] transition-all active:scale-95 disabled:opacity-75 disabled:pointer-events-none cursor-pointer select-none"
                  >
                    {isMoreLoading ? t("common.loading", "Loading...") : t("common.loadMore", "Load More")}
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyState
              title={t("destinationDetails.noProperties")}
              actionLabel={t("filterDrawer.resetAll")}
              onAction={resetFilters}
            />
          )}
        </div>

        {/* Mobile/Tablet: drawer that opens on button click */}
        <FilterDrawer
          units={units}
          displayMode="drawer"
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          tempFilteredCount={tempFilteredCount}
        />
      </div>
    </div>
  );
};

export default BuyPage;

import { useState } from "react";
import UnitCard from "../components/UnitCard";
import UnitCardSkeleton from "../components/UnitCardSkeleton";
import { motion } from "framer-motion";
import { useBuyProperties } from "../hooks/useBuyProperties";
import FilterDrawer from "../components/filterCcomponents/FilterDrawer";
import { SlidersHorizontal } from "lucide-react";
import { useTranslation } from "react-i18next";
import EmptyState from "../components/Ui/EmptyState";
import InfiniteScrollObserver from "../components/Ui/InfiniteScrollObserver";

const BuyPage = () => {
  const { t } = useTranslation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Separate data fetching, filters, and state management into custom hook
  const {
    properties,
    isFetching,
    hasNextPage,
    page,
    setPage,
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    tempFilteredCount,
    checkCanTrigger,
    showInitialLoading,
    showEmptyState,
  } = useBuyProperties();

  // Contract variables: the filter drawer receives 'units' (mapped to the loaded properties)
  const units = properties;

  return (
    <div className="">
      <div className="pb-10">
        <h3 className="text-text-darker text-3xl font-semibold">
          {t("buy.title")}
        </h3>
      </div>

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
        {/* Sidebar (Desktop inline) */}
        <FilterDrawer
          units={units}
          displayMode="static"
          className="hidden lg:flex w-[370px]"
          tempFilters={tempFilters}
          setTempFilters={setTempFilters}
          applyFilters={applyFilters}
          resetFilters={resetFilters}
          tempFilteredCount={tempFilteredCount}
          isLoading={isFetching}
        />

        {/* Units Grid */}
        <div className="flex-1 w-full overflow-hidden lg:pb-7 md:pb-5 pb-3">
          {showInitialLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-stretch transition-all duration-300 lg:grid-cols-2 xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <UnitCardSkeleton key={idx} className="w-full" />
              ))}
            </div>
          ) : properties.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-stretch lg:grid-cols-2 xl:grid-cols-2">
                {properties.map((unit) => (
                  <motion.div
                    key={unit._id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                    className="w-full"
                  >
                    <UnitCard card={unit} className="w-full" />
                  </motion.div>
                ))}
              </div>

              {/* Skeleton/Loading for next page */}
              {isFetching && page > 1 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-stretch transition-all duration-300 lg:grid-cols-2 xl:grid-cols-2 mt-6">
                  {Array.from({ length: 2 }).map((_, idx) => (
                    <UnitCardSkeleton key={idx} className="w-full" />
                  ))}
                </div>
              )}

              {/* Decoupled reusable observer component */}
              <InfiniteScrollObserver
                hasNextPage={hasNextPage}
                isFetching={isFetching}
                onLoadMore={() => setPage((prev) => prev + 1)}
                checkCanTrigger={checkCanTrigger}
              />
            </>
          ) : showEmptyState ? (
            <EmptyState
              title={t("destinationDetails.noProperties")}
              actionLabel={t("filterDrawer.resetAll")}
              onAction={resetFilters}
            />
          ) : (
            // Fallback skeleton during the single tick before state updates
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-stretch transition-all duration-300 lg:grid-cols-2 xl:grid-cols-2">
              {Array.from({ length: 4 }).map((_, idx) => (
                <UnitCardSkeleton key={idx} className="w-full" />
              ))}
            </div>
          )}
        </div>

        {/* Mobile/Tablet drawer */}
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
          isLoading={isFetching}
        />
      </div>
    </div>
  );
};

export default BuyPage;

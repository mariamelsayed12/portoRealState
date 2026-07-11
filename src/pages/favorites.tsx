import { useState } from "react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { SlidersHorizontal, ArrowUpDown, Heart } from "lucide-react";
import type { RootState } from "../app/store";
import UnitCard from "../components/UnitCard";
import FilterDrawer from "../components/FilterDrawer";
import { useUnitsFilter } from "../hooks/useUnitsFilter";
import { useUnitsSort, type SortOption } from "../hooks/useUnitsSort";
import AmenitiesSection from "../components/Ui/AmenitiesSection";

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
  { label: "Maximum Price", value: "max-price" },
  { label: "Minimum Price", value: "min-price" },
  { label: "Ready By", value: "ready-by" },
  { label: "Minimum Installments", value: "min-installments" },
  { label: "Maximum Installments", value: "max-installments" },
];

const FavoritesPage = () => {
  const { favUnite } = useSelector((state: RootState) => state.favUnit);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

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
  const {
    activeSort,
    setActiveSort,
    sortedUnits,
  } = useUnitsSort(filteredUnits);

  if (favUnite.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Heart className="h-16 w-16 text-[#7D8D93] mb-4 opacity-50" />
        <h2 className="text-2xl font-semibold text-text-secondary mb-2">No Saved Properties</h2>
        <p className="text-sm text-[#7D8D93] max-w-sm">
          Tap the heart icon on any property card to save it here for quick access later.
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
              Saved Properties
            </h1>
            <p className="mt-2 text-sm text-[#7D8D93]">
              {sortedUnits.length} {sortedUnits.length === 1 ? "property" : "properties"} found
            </p>
          </div>

          {/* Action Buttons: Filter & Sort */}
          <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 z-20">
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
            
            <div className="relative">
              <motion.button
                type="button"
                onClick={() => setIsSortOpen(!isSortOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-lg border border-[#D9E1E4] bg-white px-4 py-2 text-xs font-semibold text-primary shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <span>
                  Sort{activeSort ? `: ${SORT_OPTIONS.find((o) => o.value === activeSort)?.label}` : ""}
                </span>
                <ArrowUpDown className="h-4 w-4 text-primary" />
              </motion.button>
              {isSortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
                  <div className="absolute right-0 top-full mt-2 z-20 w-52 bg-white rounded-xl shadow-xl border border-[#E8EFF1] py-1 overflow-hidden">
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
                          className={`w-full text-left px-4 py-2 text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                            isSelected
                              ? "bg-[#E9F4F7] text-primary"
                              : "text-[#58696F]"
                          }`}
                        >
                          <span>{opt.label}</span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary" />}
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
          <div className="flex-1 w-full overflow-hidden">
            {sortedUnits.length > 0 ? (
              <motion.div
                layout
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center sm:justify-items-stretch transition-all duration-300"
              >
                <AnimatePresence mode="popLayout">
                  {sortedUnits.map((unit) => (
                    <motion.div
                      key={unit.id}
                      layout
                      initial={{ opacity: 0, scale: 0.92 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ type: "spring", damping: 25, stiffness: 220 }}
                      className="w-full"
                    >
                      <UnitCard card={unit} className="w-full" />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-base text-[#7D8D93]">No properties found matching your criteria.</p>
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

        <div className="lg:py-12 py-6 md:py-8">
                  
                      <AmenitiesSection/>
                </div>
        
       
      </div>
    </section>
  );
};

export default FavoritesPage;
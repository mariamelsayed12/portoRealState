import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import UnitCard from "../components/UnitCard";
import { useUnitsFilter } from "../hooks/useUnitsFilter";
import { useUnitsSort, type SortOption } from "../hooks/useUnitsSort";
import { units } from "../data";
import FilterDrawer from "../components/filterCcomponents/FilterDrawer";
import FilterIcon from "../components/icons/Filter";
import SortIcon from "../components/icons/SortIcon";
import { useTranslation } from "react-i18next";

const RentPage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"All" | "Available" | "Available soon">("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);

  const SORT_OPTIONS: { label: string; value: SortOption }[] = useMemo(() => [
    { label: t("rent.sort.maxPrice"), value: "max-price" },
    { label: t("rent.sort.minPrice"), value: "min-price" },
    { label: t("rent.sort.readyBy"), value: "ready-by" },
    { label: t("rent.sort.minInstallments"), value: "min-installments" },
    { label: t("rent.sort.maxInstallments"), value: "max-installments" },
  ], [t]);

  // Filter units by rental type and active tab/availability status
  const activeTabUnits = useMemo(() => {
    return units.filter((unit) => {
      const isRent = unit.badges.some((b) => b.toLowerCase() === "rent");
      if (!isRent) return false;

      if (activeTab === "All") return true;
      return unit.badges.some((b) => b.toLowerCase() === activeTab.toLowerCase());
    });
  }, [activeTab]);

  // Apply sidebar filters on top of rental and tab filtered units
  const {
    tempFilters,
    setTempFilters,
    applyFilters,
    resetFilters,
    filteredUnits,
    tempFilteredCount,
  } = useUnitsFilter(activeTabUnits);

  // Sort the filtered units
  const {
    activeSort,
    setActiveSort,
    sortedUnits,
  } = useUnitsSort(filteredUnits);

  const getTabLabel = (tab: "All" | "Available" | "Available soon") => {
    switch (tab) {
      case "All":
        return t("rent.tabs.all");
      case "Available":
        return t("rent.tabs.available");
      case "Available soon":
        return t("rent.tabs.availableSoon");
      default:
        return tab;
    }
  };

  return (
    <div className="w-full pb-16">
      {/* Header Section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-semibold text-text-secondary tracking-tight md:text-4xl">
          {t("rent.title")}
        </h1>

        {/* Filter and Sort buttons */}
        <div className="flex items-center gap-3 self-start sm:self-auto shrink-0 z-20">
          <motion.button
            type="button"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 rounded-md border border-[#747474] bg-white px-[16px] py-[8px] text-xs font-semibold text-primary shadow-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <FilterIcon className="h-4 w-4 text-primary" />
            <span>{t("rent.filterBtn")}</span>
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
                {t("rent.sortBtn")}{activeSort ? `: ${SORT_OPTIONS.find((o) => o.value === activeSort)?.label}` : ""}
              </span>
              <SortIcon className="w-[18px] h-[18px] text-primary" />
            </motion.button>

            {isSortOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsSortOpen(false)} />
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

      {/* Tabs Navigation */}
      <div className="mb-8 border-b border-[#E8EFF1]">
        <nav className="-mb-px flex gap-8" aria-label="Tabs">
          {(["All", "Available", "Available soon"] as const).map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap pb-4 text-sm font-semibold border-b-2 transition-colors capitalize cursor-pointer ${
                  isActive
                    ? "border-primary border-b-primary text-primary"
                    : "border-transparent text-[#7D8D93] hover:text-[#58696F] hover:border-gray-300"
                }`}
              >
                {getTabLabel(tab)}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Units Grid & Filter Sidebar */}
      <div className="flex flex-col lg:flex-row gap-8 items-start relative">
        <div className="flex-1 w-full overflow-hidden pb-4">
          {sortedUnits.length > 0 ? (
            <motion.div
              layout
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-items-center sm:justify-items-stretch transition-all duration-300"
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
              <p className="text-base text-[#7D8D93]">{t("rent.noProperties")}</p>
            </div>
          )}
        </div>

        {/* Sidebar Drawer */}
        <FilterDrawer
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

export default RentPage;
import { useState } from "react";
import UnitCard from "../components/UnitCard";
import { AnimatePresence, motion } from "framer-motion";
import { useUnitsFilter } from "../hooks/useUnitsFilter";
import { units } from "../data";
import FilterDrawer from "../components/filterCcomponents/FilterDrawer";
import { SlidersHorizontal } from "lucide-react";

const BuyPage = () => {


    const [isFilterOpen, setIsFilterOpen] = useState(false);

  

    // Apply sidebar filters on top of destination and tab filtered units
      const {
        tempFilters,
        setTempFilters,
        applyFilters,
        resetFilters,
        filteredUnits,
        tempFilteredCount,
      } = useUnitsFilter(units);
    
  
  return (
    <div className="">
      <div className="pb-10">
        <h3 className="text-text-darker text-3xl font-semibold">North Coast Properties</h3>
      </div>
      {/* Tabs Navigation */}
			

        <div className="flex py-4 lg:hidden items-center  justify-end gap-3 self-start sm:self-auto shrink-0 z-20">
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
            displayMode="static"
            className="hidden lg:flex w-[370px]"
            tempFilters={tempFilters}
            setTempFilters={setTempFilters}
            applyFilters={applyFilters}
            resetFilters={resetFilters}
            tempFilteredCount={tempFilteredCount}
          />

					{/* Units Grid */}
					<div className="flex-1 w-full overflow-hidden">
						{filteredUnits.length > 0 ? (
							<motion.div
								layout
								className={`grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-center sm:justify-items-stretch transition-all duration-300 ${
									"lg:grid-cols-3"
								}`}
							>
								<AnimatePresence mode="popLayout">
									{filteredUnits.map((unit) => (
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
								<p className="text-base text-[#7D8D93]">No properties found in this category.</p>
							</div>
						)}
					</div>

          {/* Mobile/Tablet: drawer that opens on button click */}
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
  )
}

export default BuyPage
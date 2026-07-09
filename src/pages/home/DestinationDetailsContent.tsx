import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { DestinationData } from "../../interfaces";
import { destinations, units } from "../../data";
import UnitCard from "../../components/UnitCard";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import FilterDrawer from "../../components/FilterDrawer";
import { useUnitsFilter } from "../../hooks/useUnitsFilter";
import { useUnitsSort, type SortOption } from "../../hooks/useUnitsSort";

interface DestinationDetailsContentProps {
	destinationSlug: string;
}

const SORT_OPTIONS: { label: string; value: SortOption }[] = [
	{ label: "Maximum Price", value: "max-price" },
	{ label: "Minimum Price", value: "min-price" },
	{ label: "Ready By", value: "ready-by" },
	{ label: "Minimum Installments", value: "min-installments" },
	{ label: "Maximum Installments", value: "max-installments" },
];

const DestinationDetailsContent = ({ destinationSlug }: DestinationDetailsContentProps) => {
	const destination = destinations.find((item) => item.slug === destinationSlug) as DestinationData | undefined;
	const [activeTab, setActiveTab] = useState("All");
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [isSortOpen, setIsSortOpen] = useState(false);

	// First filter units by destination and active tab
	const activeTabUnits = useMemo(() => {
		return units.filter((unit) => {
			const matchesDestination = unit.destination.slug === destinationSlug;
			if (!matchesDestination) return false;

			if (activeTab === "All") return true;
			return unit.badges.some((badge) => badge.toLowerCase() === activeTab.toLowerCase());
		});
	}, [destinationSlug, activeTab]);

	// Apply sidebar filters on top of destination and tab filtered units
	const {
		tempFilters,
		setTempFilters,
		applyFilters,
		resetFilters,
		filteredUnits,
		tempFilteredCount,
	} = useUnitsFilter(activeTabUnits);

	// Sort the currently filtered units
	const {
		activeSort,
		setActiveSort,
		sortedUnits,
	} = useUnitsSort(filteredUnits);

	if (!destination) {
		return null;
	}

	return (
		<section className="bg-background py-14 sm:py-16 overflow-x-hidden">
			<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
				{/* Section Header */}
				<div className="mb-6 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h2 className="text-3xl font-semibold tracking-tight text-text-secondary sm:text-[40px]">
							Explore {destination.title} Properties
						</h2>
						<p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-darker sm:text-base">
							{destination.description}
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

				{/* Tabs Navigation */}
				<div className="mb-8 border-b border-[#E8EFF1]">
					<nav className="-mb-px flex gap-8" aria-label="Tabs">
						{["All", "Developer", "Resale", "Rent"].map((tab) => {
							const isActive = activeTab === tab;
							return (
								<button
									key={tab}
									type="button"
									onClick={() => setActiveTab(tab)}
									className={`whitespace-nowrap pb-4 text-sm font-semibold border-b-2 transition-colors ${
										isActive
											? "border-primary border-b-primary text-primary"
											: "border-transparent text-[#7D8D93] hover:text-[#58696F] hover:border-gray-300"
									}`}
								>
									{tab}
								</button>
							);
						})}
					</nav>
				</div>

				{/* Layout container: Sidebar & Grid inline on desktop */}
				<div className="flex flex-col lg:flex-row gap-8 items-start relative">
					{/* Units Grid */}
					<div className="flex-1 w-full overflow-hidden">
						{sortedUnits.length > 0 ? (
							<motion.div
								layout
								className={`grid grid-cols-1 gap-6 sm:grid-cols-2 justify-items-center sm:justify-items-stretch transition-all duration-300 ${
									isFilterOpen ? "lg:grid-cols-2" : "lg:grid-cols-3"
								}`}
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
								<p className="text-base text-[#7D8D93]">No properties found in this category.</p>
							</div>
						)}
					</div>

					{/* Sidebar (Overlay on mobile/tablet, sticky inline on desktop) */}
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
			</div>
		</section>
	);
};

export default DestinationDetailsContent;

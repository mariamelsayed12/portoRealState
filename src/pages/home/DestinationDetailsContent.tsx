import { useState } from "react";
import type { DestinationData } from "../../interfaces";
import { destinations, units } from "../../data";
import UnitCard from "../../components/UnitCard";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import FilterDrawer from "../../components/FilterDrawer";

interface DestinationDetailsContentProps {
	destinationSlug: string;
}

const DestinationDetailsContent = ({ destinationSlug }: DestinationDetailsContentProps) => {
	const destination = destinations.find((item) => item.slug === destinationSlug) as DestinationData | undefined;
	const [activeTab, setActiveTab] = useState("All");
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	if (!destination) {
		return null;
	}

	const filteredUnits = units.filter((unit) => {
		const matchesDestination = unit.destination.slug === destinationSlug;
		if (!matchesDestination) return false;

		if (activeTab === "All") return true;
		return unit.badges.some((badge) => badge.toLowerCase() === activeTab.toLowerCase());
	});

	return (
		<section className="bg-background py-14 sm:py-16">
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
					<div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
						<button
							type="button"
							onClick={() => setIsFilterOpen(true)}
							className="inline-flex items-center gap-2 rounded-lg border border-[#D9E1E4] bg-white px-4 py-2 text-xs font-semibold text-[#58696F] shadow-sm hover:bg-gray-50 transition-colors"
						>
							<SlidersHorizontal className="h-4 w-4 text-[#58696F]" />
							<span>Filter</span>
						</button>
						<button
							type="button"
							className="inline-flex items-center gap-2 rounded-lg border border-[#D9E1E4] bg-white px-4 py-2 text-xs font-semibold text-[#58696F] shadow-sm hover:bg-gray-50 transition-colors"
						>
							<span>Sort</span>
							<ArrowUpDown className="h-4 w-4 text-[#58696F]" />
						</button>
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

				{/* Units Grid */}
				{filteredUnits.length > 0 ? (
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center sm:justify-items-stretch">
						{filteredUnits.map((unit) => (
							<UnitCard key={unit.id} card={unit} className="w-full" />
						))}
					</div>
				) : (
					<div className="flex flex-col items-center justify-center py-16 text-center">
						<p className="text-base text-[#7D8D93]">No properties found in this category.</p>
					</div>
				)}
			</div>
			<FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
		</section>
	);
};

export default DestinationDetailsContent;

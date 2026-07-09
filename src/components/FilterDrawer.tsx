import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Button from "./Ui/Button";
import Input from "./Ui/Input";
import type { FilterState } from "../hooks/useUnitsFilter";

interface FilterDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	tempFilters: FilterState;
	setTempFilters: React.Dispatch<React.SetStateAction<FilterState>>;
	applyFilters: () => void;
	resetFilters: () => void;
	tempFilteredCount: number;
}

const FilterDrawer = ({
	isOpen,
	onClose,
	tempFilters,
	setTempFilters,
	applyFilters,
	resetFilters,
	tempFilteredCount,
}: FilterDrawerProps) => {
	const drawerRef = useRef<HTMLDivElement>(null);

	// Handle Escape key to close the drawer
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};
		if (isOpen) {
			window.addEventListener("keydown", handleKeyDown);
			// Prevent background scrolling when drawer is open
			document.body.style.overflow = "hidden";
		}
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [isOpen, onClose]);

	const handleReset = () => {
		resetFilters();
	};

	const handleApply = () => {
		applyFilters();
		onClose();
	};

	const handleTogglePropertyType = (type: string) => {
		setTempFilters((prev) => ({
			...prev,
			propertyType: prev.propertyType === type ? "" : type,
		}));
	};

	const handleToggleBedrooms = (num: string) => {
		setTempFilters((prev) => ({
			...prev,
			bedrooms: prev.bedrooms === num ? "" : num,
		}));
	};

	const handleToggleBathrooms = (num: string) => {
		setTempFilters((prev) => ({
			...prev,
			bathrooms: prev.bathrooms === num ? "" : num,
		}));
	};

	const handleToggleDeliveryDate = (date: string) => {
		setTempFilters((prev) => ({
			...prev,
			deliveryDate: prev.deliveryDate === date ? "" : date,
		}));
	};

	const handleToggleFinishing = (finish: string) => {
		setTempFilters((prev) => ({
			...prev,
			finishing: prev.finishing === finish ? "" : finish,
		}));
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop Overlay */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
					/>

					{/* Drawer Panel */}
					<motion.div
						ref={drawerRef}
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 220 }}
						className="fixed right-0 top-0 z-50 h-full w-full sm:w-[450px] bg-[#F5F9FA] shadow-2xl flex flex-col"
					>
						{/* Header */}
						<div className="flex items-center justify-between px-6 py-4 border-b border-[#E8EFF1] bg-white">
							<h2 className="text-xl font-bold text-text-secondary">Filters</h2>
							<button
								type="button"
								onClick={onClose}
								className="rounded-full p-2 text-[#7D8D93] hover:bg-gray-100 hover:text-text-secondary transition-colors"
								aria-label="Close filters"
							>
								<X className="h-5 w-5" />
							</button>
						</div>

						{/* Scrollable Content */}
						<div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 pb-28">
							{/* Property Type Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-3">Property type</h3>
								<div className="flex flex-wrap gap-2">
									{["Chalet", "Villa", "Apartment", "Twin house"].map((type) => {
										const isSelected = (tempFilters.propertyType || "").toLowerCase() === type.toLowerCase();
										return (
											<button
												key={type}
												type="button"
												onClick={() => handleTogglePropertyType(type)}
												className={`rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
													isSelected
														? "bg-[#E9F4F7] border-primary text-[#141414]"
														: "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
												}`}
											>
												{type}
											</button>
										);
									})}
								</div>
							</div>

							{/* Bedrooms Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-3">Bedrooms</h3>
								<div className="flex flex-wrap gap-2">
									{["1", "2", "3", "4", "5+"].map((num) => {
										const isSelected = tempFilters.bedrooms === num;
										return (
											<button
												key={num}
												type="button"
												onClick={() => handleToggleBedrooms(num)}
												className={`h-10 min-w-10 rounded-full flex items-center justify-center text-xs font-semibold border transition-all ${
													isSelected
														? "bg-[#E9F4F7] border-primary text-[#141414]"
														: "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
												}`}
											>
												{num}
											</button>
										);
									})}
								</div>
							</div>

							{/* Bathrooms Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-3">Bathrooms</h3>
								<div className="flex flex-wrap gap-2">
									{["1", "2", "3+"].map((num) => {
										const isSelected = tempFilters.bathrooms === num;
										return (
											<button
												key={num}
												type="button"
												onClick={() => handleToggleBathrooms(num)}
												className={`h-10 min-w-10 rounded-full flex items-center justify-center text-xs font-semibold border transition-all ${
													isSelected
														? "bg-[#E9F4F7] border-primary text-[#141414]"
														: "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
												}`}
											>
												{num}
											</button>
										);
									})}
								</div>
							</div>

							{/* Area Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-4">Area <span className="text-xs font-normal text-[#7D8D93]">(m2)</span></h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">From</label>
										<Input
											type="number"
											value={tempFilters.areaFrom}
											onChange={(e) => setTempFilters(prev => ({ ...prev, areaFrom: e.target.value }))}
											className="h-10 text-xs border-[#D9E1E4]"
											placeholder="0"
										/>
									</div>
									<div>
										<label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">To</label>
										<Input
											type="number"
											value={tempFilters.areaTo}
											onChange={(e) => setTempFilters(prev => ({ ...prev, areaTo: e.target.value }))}
											className="h-10 text-xs border-[#D9E1E4]"
											placeholder="Any"
										/>
									</div>
								</div>

								{/* Mock Range Slider */}
								<div className="mt-6 px-1">
									<div className="relative h-1 bg-[#E8EFF1] rounded-full">
										<div className="absolute left-[15%] right-[55%] h-full bg-[#0A2540] rounded-full" />
										<div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
										<div className="absolute right-[55%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
									</div>
									<div className="mt-3 flex justify-between text-[10px] font-semibold text-[#7D8D93]">
										<span>0 m2</span>
										<span>100 m2</span>
									</div>
								</div>
							</div>

							{/* Price Range Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-4">Price range <span className="text-xs font-normal text-[#7D8D93]">(EGP)</span></h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">From</label>
										<Input
											type="number"
											value={tempFilters.priceFrom}
											onChange={(e) => setTempFilters(prev => ({ ...prev, priceFrom: e.target.value }))}
											className="h-10 text-xs border-[#D9E1E4]"
											placeholder="Min"
										/>
									</div>
									<div>
										<label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">To</label>
										<Input
											type="number"
											value={tempFilters.priceTo}
											onChange={(e) => setTempFilters(prev => ({ ...prev, priceTo: e.target.value }))}
											className="h-10 text-xs border-[#D9E1E4]"
											placeholder="Max"
										/>
									</div>
								</div>

								{/* Mock Range Slider */}
								<div className="mt-6 px-1">
									<div className="relative h-1 bg-[#E8EFF1] rounded-full">
										<div className="absolute left-[10%] right-[60%] h-full bg-[#0A2540] rounded-full" />
										<div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
										<div className="absolute right-[60%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
									</div>
									<div className="mt-3 flex justify-between text-[10px] font-semibold text-[#7D8D93]">
										<span>0 EGP</span>
										<span>100 EGP</span>
									</div>
								</div>
							</div>

							{/* Payments Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-4">Payments <span className="text-xs font-normal text-[#7D8D93]">(EGP)</span></h3>
								<div className="grid grid-cols-2 gap-4">
									<div>
										<label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">Down Payment</label>
										<Input
											type="number"
											value={tempFilters.downPayment}
											onChange={(e) => setTempFilters(prev => ({ ...prev, downPayment: e.target.value }))}
											className="h-10 text-xs border-[#D9E1E4]"
											placeholder="0"
										/>
									</div>
									<div>
										<label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">Monthly Installments</label>
										<Input
											type="number"
											value={tempFilters.monthlyInstallment}
											onChange={(e) => setTempFilters(prev => ({ ...prev, monthlyInstallment: e.target.value }))}
											className="h-10 text-xs border-[#D9E1E4]"
											placeholder="0"
										/>
									</div>
								</div>
							</div>

							{/* Delivery Date Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-3">Delivery Date</h3>
								<div className="flex flex-wrap gap-2">
									{["Ready", "2027", "2028", "2029", "2030", "2031", "2032"].map((date) => {
										const isSelected = (tempFilters.deliveryDate || "").toLowerCase() === date.toLowerCase();
										return (
											<button
												key={date}
												type="button"
												onClick={() => handleToggleDeliveryDate(date)}
												className={`rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
													isSelected
														? "bg-[#E9F4F7] border-primary text-[#141414]"
														: "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
												}`}
											>
												{date}
											</button>
										);
									})}
								</div>
							</div>

							{/* Finishing Card */}
							<div className="bg-white rounded-2xl border border-[#E8EFF1] p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
								<h3 className="text-[15px] font-bold text-text-secondary mb-3">Finishing</h3>
								<div className="flex flex-wrap gap-2">
									{["Not finished", "Semi finished", "Finished", "Fully furnished"].map((finish) => {
										const isSelected = (tempFilters.finishing || "").toLowerCase() === finish.toLowerCase();
										return (
											<button
												key={finish}
												type="button"
												onClick={() => handleToggleFinishing(finish)}
												className={`rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
													isSelected
														? "bg-[#E9F4F7] border-primary text-[#141414]"
														: "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
												}`}
											>
												{finish}
											</button>
										);
									})}
								</div>
							</div>
						</div>

						{/* Sticky Footer */}
						<div className="absolute bottom-0 inset-x-0 bg-white border-t border-[#E8EFF1] p-4 flex gap-4">
							<Button
								type="button"
								onClick={handleReset}
								className="w-1/2 rounded-xl border border-[#D9E1E4] bg-white text-primary font-bold hover:bg-gray-50 h-12 text-sm"
							>
								Reset All
							</Button>
							<Button
								type="button"
								onClick={handleApply}
								className="w-1/2 rounded-xl bg-primary text-white font-bold hover:opacity-95 h-12 text-sm"
							>
								Apply Filter ({tempFilteredCount})
							</Button>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
};

export default FilterDrawer;

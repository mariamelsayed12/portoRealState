import { useState, useMemo } from "react";
import { useGetVillageQuery } from "../../app/services/crudVillage";
import type { FilterState } from "../../hooks/useUnitsFilter";
import { useGetPropertyQuery, type IProperty } from "../../app/services/crudproperties";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import { useTranslation } from "react-i18next";
import { formatDeliveryStatus, getTranslatedBadge, isRentListing } from "../../utils";

interface FilterContentProps {
  units?: IProperty[];
  tempFilters: FilterState;
  setTempFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  handleReset: () => void;
  handleApply: () => void;
  tempFilteredCount: number;
  /** Whether the footer buttons should be visually "sticky" (drawer) or in normal flow (static). */
  stickyFooter?: boolean;
  displayMode?: "drawer" | "static";
  hideLocation?: boolean;
  isLoading?: boolean;
}
 
const FilterContent = ({
  units = [],
  tempFilters,
  setTempFilters,
  handleReset,
  handleApply,
  tempFilteredCount,
  stickyFooter = true,
  displayMode = "drawer",
  hideLocation = false,
  isLoading = false,
}: FilterContentProps) => {
    const { t ,i18n} = useTranslation();

  const { data: destinations, isLoading: isLocationsLoading } = useGetVillageQuery({ lang: i18n.language });
  const { data: allProperties = [] } = useGetPropertyQuery({ lang: i18n.language });

  const [visibleLocationsCount, setVisibleLocationsCount] = useState(6);

  const visibleDestinations = useMemo(() => {
    if (!destinations) return [];
    
    // Parse selected locations from tempFilters to ensure they always stay visible
    const selectedNames = tempFilters.location
      ? tempFilters.location.split(",").map(name => name.trim().toLowerCase())
      : [];
      
    return destinations.filter((dest, index) => {
      const isSelected = selectedNames.includes(dest.name.toLowerCase());
      return index < visibleLocationsCount || isSelected;
    });
  }, [destinations, visibleLocationsCount, tempFilters.location]);

  const [activeAreaThumb, setActiveAreaThumb] = useState<"min" | "max">("min");
  const [activePriceThumb, setActivePriceThumb] = useState<"min" | "max">("min");

  // Determine the correct list of properties for computing stable filter metadata
  const sourceProperties = useMemo(() => {
    const isRentPage = units.some(u => isRentListing(u.listingType));
    const targetProperties = isRentPage
      ? allProperties.filter(u => isRentListing(u.listingType))
      : allProperties.filter(u => !isRentListing(u.listingType));
    return targetProperties.length > 0 ? targetProperties : units;
  }, [allProperties, units]);

  const { minArea, maxArea, minPrice, maxPrice } = useMemo(() => {
    if (!sourceProperties || sourceProperties.length === 0) {
      return { minArea: 0, maxArea: 1000, minPrice: 0, maxPrice: 60000000 };
    }
    const areas = sourceProperties.map(u => u.area).filter((a): a is number => typeof a === 'number' && !isNaN(a));
    const prices = sourceProperties.map(u => {
      if (isRentListing(u.listingType)) {
        return u.insurance;
      }
      if (u.paymentModel?.toLowerCase() === "cash") {
        return u.cashPrice;
      }
      return u.installmentPrice;
    }).filter((p): p is number => typeof p === 'number' && !isNaN(p));
    
    const minA = 0;
    const maxA = areas.length ? Math.max(...areas) : 1000;
    const minP = prices.length ? Math.min(...prices) : 0;
    const maxP = prices.length ? Math.max(...prices) : 60000000;
    
    return { minArea: minA, maxArea: maxA, minPrice: minP, maxPrice: maxP };
  }, [sourceProperties]);

  const deliveryDateOptions = useMemo(() => {
    if (!sourceProperties || sourceProperties.length === 0) {
      return ["Ready to Move", "2026", "2027", "2028", "2029"];
    }
    const dates = sourceProperties
      .map(u => u.deliveryDate)
      .filter((date): date is string => typeof date === 'string' && date.trim() !== "");
    
    const mapped = dates.map(date => {
      const trimmed = date.trim();
      const hasYear = /\b(19|20|21)\d{2}\b/.test(trimmed);
      if (hasYear) {
        return trimmed.includes("-") ? trimmed.split("-")[0] : trimmed;
      }
      return trimmed;
    });

    const uniqueDates = Array.from(new Set(mapped));
    
    uniqueDates.sort((a, b) => {
      const getYear = (s: string) => {
        const match = /\b(19|20|21)\d{2}\b/.exec(s);
        return match ? parseInt(match[0], 10) : null;
      };
      const yearA = getYear(a);
      const yearB = getYear(b);
      if (yearA !== null && yearB !== null) {
        return yearA - yearB;
      }
      if (yearA !== null) return 1;
      if (yearB !== null) return -1;
      return a.localeCompare(b);
    });
    
    return uniqueDates;
  }, [sourceProperties]);

  const getDisplayLabel = (date: string) => {
    const trimmed = date.trim();
    const isYear = /^\b(19|20|21)\d{2}\b/.test(trimmed);
    if (isYear) {
      return trimmed;
    }
    const formatted = formatDeliveryStatus(trimmed);
    return getTranslatedBadge(formatted, t);
  };

  const currentAreaFrom = tempFilters.areaFrom !== "" ? Number(tempFilters.areaFrom) : minArea;
  const currentAreaTo = tempFilters.areaTo !== "" ? Number(tempFilters.areaTo) : maxArea;

  const currentPriceFrom = tempFilters.priceFrom !== "" ? Number(tempFilters.priceFrom) : minPrice;
  const currentPriceTo = tempFilters.priceTo !== "" ? Number(tempFilters.priceTo) : maxPrice;

  const handleAreaMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), currentAreaTo);
    setTempFilters(prev => ({
      ...prev,
      areaFrom: val === minArea ? "" : String(val)
    }));
  };

  const handleAreaMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), currentAreaFrom);
    setTempFilters(prev => ({
      ...prev,
      areaTo: val === maxArea ? "" : String(val)
    }));
  };

  const handlePriceMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.min(Number(e.target.value), currentPriceTo);
    setTempFilters(prev => ({
      ...prev,
      priceFrom: val === minPrice ? "" : String(val)
    }));
  };

  const handlePriceMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Math.max(Number(e.target.value), currentPriceFrom);
    setTempFilters(prev => ({
      ...prev,
      priceTo: val === maxPrice ? "" : String(val)
    }));
  };

  const areaDenom = maxArea - minArea || 1;
  const areaMinPct = Math.min(Math.max(((currentAreaFrom - minArea) / areaDenom) * 100, 0), 100);
  const areaMaxPct = Math.min(Math.max(((currentAreaTo - minArea) / areaDenom) * 100, 0), 100);

  const priceDenom = maxPrice - minPrice || 1;
  const priceMinPct = Math.min(Math.max(((currentPriceFrom - minPrice) / priceDenom) * 100, 0), 100);
  const priceMaxPct = Math.min(Math.max(((currentPriceTo - minPrice) / priceDenom) * 100, 0), 100);

  const handleTogglePropertyType = (type: string) => {
  setTempFilters((prev) => {
    const currentTypes = prev.propertyType
      ? prev.propertyType.split(",")
      : [];

    const exists = currentTypes.includes(type);

    const updatedTypes = exists
      ? currentTypes.filter((item) => item !== type)
      : [...currentTypes, type];

    return {
      ...prev,
      propertyType: updatedTypes.join(","),
    };
  });
};

  const handleToggleLocation = (loc: string) => {
  setTempFilters((prev) => {
    const currentLocations = prev.location
      ? prev.location.split(",")
      : [];

    const exists = currentLocations.includes(loc);

    const updatedLocations = exists
      ? currentLocations.filter((item) => item !== loc)
      : [...currentLocations, loc];

    return {
      ...prev,
      location: updatedLocations.join(","),
    };
  });
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
    <>
      {displayMode === "static" && (
        <div className="flex justify-between items-center px-6 py-4 border-b border-[#E8EFF1] bg-[#F5F9FA]">
          <span className="text-sm font-semibold text-[#141414]">
            {t("filterDrawer.title")} <span className="text-xs font-normal text-[#7D8D93]">{t("filterDrawer.resultCount", { count: tempFilteredCount })}</span>
          </span>
          <button
            type="button"
            onClick={handleReset}
            className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
          >
            {t("filterDrawer.resetAll")}
          </button>
        </div>
      )}

      {/* Scrollable Content */}
      <div
        className={`flex-1 overflow-y-auto px-6 py-5 space-y-4 ${
          stickyFooter ? "pb-28" : ""
        }`}
      >
        {/* Property Type Card */}
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.propertyType")}
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, propertyType: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "Chalet", labelKey: "search.propertyTypes.chalet" },
              { id: "Villa", labelKey: "search.propertyTypes.villa" },
              { id: "Apartment", labelKey: "search.propertyTypes.apartment" },
              { id: "Twin house", labelKey: "search.propertyTypes.twinHouse" }
            ].map((type) => {
              const isSelected =
                (tempFilters.propertyType || "")
                  .toLowerCase()
                  .split(",")
                  .includes(type.id.toLowerCase());
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => handleTogglePropertyType(type.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
                    isSelected
                      ? "bg-[#E9F4F7] border-primary text-[#141414]"
                      : "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
                  }`}
                >
                  {t(type.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
 

        {/* location */}
        {!hideLocation && (
          <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-[15px] font-bold text-text-secondary">
               {t("filterDrawer.location")}
              </h3>
              {displayMode === "static" && (
                <button
                  type="button"
                  onClick={() => setTempFilters((prev) => ({ ...prev, location: "" }))}
                  className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
                >
                  {t("filterDrawer.reset")}
                </button>
              )}
            </div>
            {isLocationsLoading ? (
              <div className="flex flex-wrap gap-2 animate-pulse">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="h-8 bg-[#E8EFF1] rounded-full w-24 sm:w-28 border border-[#E8EFF1]"
                  />
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {visibleDestinations.map(({ name }) => {
                    const isSelected =
                      (tempFilters.location || "")
                        .toLowerCase()
                        .split(",")
                        .includes(name.toLowerCase());
                    return (
                      <button
                        key={name}
                        type="button"
                        onClick={() => handleToggleLocation(name)}
                        className={`rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
                          isSelected
                            ? "bg-[#E9F4F7] border-primary text-[#141414]"
                            : "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
                        }`}
                      >
                        {name}
                      </button>
                    );
                  })}
                </div>
                {destinations && destinations.length > 6 && (
                  <div className="mt-3 flex justify-start">
                    <button
                      type="button"
                      onClick={() => {
                        if (visibleLocationsCount < destinations.length) {
                          setVisibleLocationsCount((prev) => prev + 6);
                        } else {
                          setVisibleLocationsCount(6);
                        }
                      }}
                      className="text-xs font-semibold text-primary hover:underline flex items-center gap-1 cursor-pointer animate-fade-in"
                    >
                      {visibleLocationsCount < destinations.length
                        ? t("filterDrawer.showMore")
                        : t("filterDrawer.showLess")}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}


        {/* Bedrooms Card */}
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.bedrooms")}
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, bedrooms: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
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
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.bathrooms")}
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, bathrooms: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
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
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.area")}
              <span className="text-xs font-normal text-[#7D8D93]">{t("filterDrawer.m2")}</span>
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, areaFrom: "", areaTo: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">
                {t("filterDrawer.from")}
              </label>
              <Input
                type="number"
                value={tempFilters.areaFrom}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    areaFrom: e.target.value,
                  }))
                }
                className="h-10 text-xs border-[#D9E1E4]"
                placeholder={t("filterDrawer.placeholder.zero")}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">
                {t("filterDrawer.to")}
              </label>
              <Input
                type="number"
                value={tempFilters.areaTo}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    areaTo: e.target.value,
                  }))
                }
                className="h-10 text-xs border-[#D9E1E4]"
                placeholder={t("filterDrawer.placeholder.any")}
              />
            </div>
          </div>
 
          {/* Real Area Range Slider */}
          <div className="mt-6 px-1">
            <div className="relative w-full h-4 flex items-center double-range-slider">
              <div className="absolute inset-x-0 h-1 bg-[#E8EFF1] rounded-full" />
              <div
                className="absolute h-1 bg-[#0A2540] rounded-full"
                style={{
                  left: `${areaMinPct}%`,
                  right: `${100 - areaMaxPct}%`
                }}
              />
              <input
                type="range"
                min={minArea}
                max={maxArea}
                value={Math.min(Math.max(currentAreaFrom, minArea), maxArea)}
                onChange={handleAreaMinChange}
                onMouseDown={() => setActiveAreaThumb("min")}
                onTouchStart={() => setActiveAreaThumb("min")}
                style={{ zIndex: activeAreaThumb === "min" ? 40 : 30 }}
                className="w-full"
              />
              <input
                type="range"
                min={minArea}
                max={maxArea}
                value={Math.min(Math.max(currentAreaTo, minArea), maxArea)}
                onChange={handleAreaMaxChange}
                onMouseDown={() => setActiveAreaThumb("max")}
                onTouchStart={() => setActiveAreaThumb("max")}
                style={{ zIndex: activeAreaThumb === "max" ? 40 : 30 }}
                className="w-full"
              />
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-semibold text-[#7D8D93]">
              <span>{t("filterDrawer.m2Value", { val: currentAreaFrom })}</span>
              <span>{t("filterDrawer.m2Value", { val: currentAreaTo })}</span>
            </div>
          </div>
        </div>
 
        {/* Price Range Card */}
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.priceRange")}
              <span className="text-xs font-normal text-[#7D8D93]">{t("filterDrawer.currencyUnit")}</span>
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, priceFrom: "", priceTo: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">
                {t("filterDrawer.from")}
              </label>
              <Input
                type="number"
                value={tempFilters.priceFrom}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    priceFrom: e.target.value,
                  }))
                }
                className="h-10 text-xs border-[#D9E1E4]"
                placeholder={t("filterDrawer.placeholder.min")}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">
                {t("filterDrawer.to")}
              </label>
              <Input
                type="number"
                value={tempFilters.priceTo}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    priceTo: e.target.value,
                  }))
                }
                className="h-10 text-xs border-[#D9E1E4]"
                placeholder={t("filterDrawer.placeholder.max")}
              />
            </div>
          </div>
 
          {/* Real Price Range Slider */}
          <div className="mt-6 px-1">
            <div className="relative w-full h-4 flex items-center double-range-slider">
              <div className="absolute inset-x-0 h-1 bg-[#E8EFF1] rounded-full" />
              <div
                className="absolute h-1 bg-[#0A2540] rounded-full"
                style={{
                  left: `${priceMinPct}%`,
                  right: `${100 - priceMaxPct}%`
                }}
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={Math.min(Math.max(currentPriceFrom, minPrice), maxPrice)}
                onChange={handlePriceMinChange}
                onMouseDown={() => setActivePriceThumb("min")}
                onTouchStart={() => setActivePriceThumb("min")}
                style={{ zIndex: activePriceThumb === "min" ? 40 : 30 }}
                className="w-full"
              />
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={Math.min(Math.max(currentPriceTo, minPrice), maxPrice)}
                onChange={handlePriceMaxChange}
                onMouseDown={() => setActivePriceThumb("max")}
                onTouchStart={() => setActivePriceThumb("max")}
                style={{ zIndex: activePriceThumb === "max" ? 40 : 30 }}
                className="w-full"
              />
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-semibold text-[#7D8D93]">
              <span>{t("filterDrawer.egpValue", { val: currentPriceFrom.toLocaleString() })}</span>
              <span>{t("filterDrawer.egpValue", { val: currentPriceTo.toLocaleString() })}</span>
            </div>
          </div>
        </div>
 
        {/* Payments Card */}
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.payments")}
              <span className="text-xs font-normal text-[#7D8D93]">{t("filterDrawer.currencyUnit")}</span>
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, downPayment: "", monthlyInstallment: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">
                {t("filterDrawer.downPayment")}
              </label>
              <Input
                type="number"
                value={tempFilters.downPayment}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    downPayment: e.target.value,
                  }))
                }
                className="h-10 text-xs border-[#D9E1E4]"
                placeholder={t("filterDrawer.placeholder.zero")}
              />
            </div>
            <div>
              <label className="block text-[11px] font-semibold text-[#7D8D93] mb-1.5">
                {t("filterDrawer.monthlyInstallment")}
              </label>
              <Input
                type="number"
                value={tempFilters.monthlyInstallment}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    monthlyInstallment: e.target.value,
                  }))
                }
                className="h-10 text-xs border-[#D9E1E4]"
                placeholder={t("filterDrawer.placeholder.zero")}
              />
            </div>
          </div>
        </div>
 
        {/* Delivery Date Card */}
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.deliveryDate")}
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, deliveryDate: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
          {isLoading ? (
            <div className="flex flex-wrap gap-2 animate-pulse">
              {Array.from({ length: 5 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-8 bg-[#E8EFF1] rounded-full w-16 sm:w-20 border border-[#E8EFF1]"
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {deliveryDateOptions.map(
                (date) => {
                  const isSelected =
                    (tempFilters.deliveryDate || "").toLowerCase() ===
                    date.toLowerCase();
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
                      {getDisplayLabel(date)}
                    </button>
                  );
                },
              )}
            </div>
          )}
        </div>
 
        {/* Finishing Card */}
        <div className="bg-white rounded-md border border-border p-5 shadow-[0_2px_8px_rgba(73,95,104,0.04)]">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-[15px] font-bold text-text-secondary">
              {t("filterDrawer.finishing")}
            </h3>
            {displayMode === "static" && (
              <button
                type="button"
                onClick={() => setTempFilters((prev) => ({ ...prev, finishing: "" }))}
                className="text-xs font-semibold text-[#1E8CAB] hover:underline cursor-pointer"
              >
                {t("filterDrawer.reset")}
              </button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              { id: "Not finished", labelKey: "filterDrawer.finishing.notFinished" },
              { id: "Semi finished", labelKey: "filterDrawer.finishing.semiFinished" },
              { id: "Finished", labelKey: "filterDrawer.finishing.finished" },
              { id: "Fully furnished", labelKey: "filterDrawer.finishing.fullyFurnished" }
            ].map((finish) => {
              const isSelected =
                (tempFilters.finishing || "").toLowerCase() ===
                finish.id.toLowerCase();
              return (
                <button
                  key={finish.id}
                  type="button"
                  onClick={() => handleToggleFinishing(finish.id)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
                    isSelected
                      ? "bg-[#E9F4F7] border-primary text-[#141414]"
                      : "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
                  }`}
                >
                  {t(finish.labelKey)}
                </button>
              );
            })}
          </div>
        </div>
      </div>
 
      {/* Footer (Reset / Apply) */}
      {displayMode !== "static" && (
        <div
          className={`${
            stickyFooter ? "absolute bottom-0 inset-x-0" : "relative mt-4"
          } bg-white border-t border-[#E8EFF1] p-4 flex gap-4`}
        >
          <Button
            type="button"
            onClick={handleReset}
            className="w-1/2 rounded-md border border-border bg-white text-primary font-bold hover:bg-gray-50 h-12 text-sm"
          >
            {t("filterDrawer.resetAll")}
          </Button>
          <Button
            type="button"
            onClick={handleApply}
            className="w-1/2 rounded-xl bg-primary text-white font-bold hover:opacity-95 h-12 text-sm"
          >
            {t("filterDrawer.applyFilter", { count: tempFilteredCount })}
          </Button>
        </div>
      )}

      <style>{`
        .double-range-slider input[type="range"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 4px;
          background: transparent;
          outline: none;
          margin: 0;
          left: 0;
        }
        .double-range-slider input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #1E8CAB;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .double-range-slider input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .double-range-slider input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #1E8CAB;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .double-range-slider input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.15);
        }
      `}</style>
    </>
  );
};
 
export default FilterContent;
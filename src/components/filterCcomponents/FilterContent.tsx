import { destinations } from "../../data";
import type { FilterState } from "../../hooks/useUnitsFilter";
import Button from "../Ui/Button";
import Input from "../Ui/Input";
import { useTranslation } from "react-i18next";

interface FilterContentProps {
  tempFilters: FilterState;
  setTempFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  handleReset: () => void;
  handleApply: () => void;
  tempFilteredCount: number;
  /** Whether the footer buttons should be visually "sticky" (drawer) or in normal flow (static). */
  stickyFooter?: boolean;
  displayMode?: "drawer" | "static";
}
 
const FilterContent = ({
  tempFilters,
  setTempFilters,
  handleReset,
  handleApply,
  tempFilteredCount,
  stickyFooter = true,
  displayMode = "drawer",
}: FilterContentProps) => {
  const { t } = useTranslation();

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
          <div className="flex flex-wrap gap-2">
            {destinations.map(({title, titleKey}) => {
             const isSelected =
              (tempFilters.location || "")
                .toLowerCase()
                .split(",")
                .includes(title.toLowerCase());
              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => handleToggleLocation(title)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold border transition-all ${
                    isSelected
                      ? "bg-[#E9F4F7] border-primary text-[#141414]"
                      : "bg-white border-[#D9E1E4] text-[#58696F] hover:border-gray-300"
                  }`}
                >
                  {titleKey ? t(titleKey) : title}
                </button>
              );
            })}
          </div>
        </div>


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
 
          {/* Mock Range Slider */}
          <div className="mt-6 px-1">
            <div className="relative h-1 bg-[#E8EFF1] rounded-full">
              <div className="absolute left-[15%] right-[55%] h-full bg-[#0A2540] rounded-full" />
              <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
              <div className="absolute right-[55%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-semibold text-[#7D8D93]">
              <span>{t("filterDrawer.m2Value", { val: 0 })}</span>
              <span>{t("filterDrawer.m2Value", { val: 100 })}</span>
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
 
          {/* Mock Range Slider */}
          <div className="mt-6 px-1">
            <div className="relative h-1 bg-[#E8EFF1] rounded-full">
              <div className="absolute left-[10%] right-[60%] h-full bg-[#0A2540] rounded-full" />
              <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
              <div className="absolute right-[60%] top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-primary rounded-full shadow cursor-pointer hover:scale-110 transition-transform" />
            </div>
            <div className="mt-3 flex justify-between text-[10px] font-semibold text-[#7D8D93]">
              <span>{t("filterDrawer.egpValue", { val: 0 })}</span>
              <span>{t("filterDrawer.egpValue", { val: 100 })}</span>
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
          <div className="flex flex-wrap gap-2">
            {["Ready", "2027", "2028", "2029", "2030", "2031", "2032"].map(
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
                    {date.toLowerCase() === "ready" ? t("filterDrawer.ready") : date}
                  </button>
                );
              },
            )}
          </div>
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
    </>
  );
};
 
export default FilterContent;
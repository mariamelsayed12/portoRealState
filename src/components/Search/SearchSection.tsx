import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Home, Briefcase, Banknote } from "lucide-react";
import { useTranslation } from "react-i18next";
import SearchFilterDropdown from "./SearchFilterDropdown";
import SearchButton from "./SearchButton";
import LocationPanel from "./LocationPanel";
import PropertyTypePanel from "./PropertyTypePanel";
import BedsAndBathsPanel from "./BedsAndBathsPanel";
import PriceRangePanel from "./PriceRangePanel";

const SearchSection = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Local filter states before applying search
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [priceFrom, setPriceFrom] = useState<number | null>(null);
  const [priceTo, setPriceTo] = useState<number | null>(null);

  // Navigate to Properties page (/buy) with filters applied to URL query params
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (location) params.set("location", location);
    if (propertyType) params.set("type", propertyType);
    if (beds) params.set("bedrooms", beds);
    if (baths) params.set("bathrooms", baths);
    if (priceFrom !== null) params.set("priceFrom", priceFrom.toString());
    if (priceTo !== null) params.set("priceTo", priceTo.toString());

    navigate(`/buy?${params.toString()}`);
  };

  // Helper labels for selected values
  const getBedsBathsLabel = () => {
    if (!beds && !baths) return t("search.any");
    if (beds && baths) return `${beds} ${t("search.beds")}, ${baths} ${t("search.baths")}`;
    if (beds) return `${beds} ${t("search.beds")}`;
    return `${baths} ${t("search.baths")}`;
  };

  const getPriceLabel = () => {
    const fromVal = priceFrom ?? 1_000_000;
    const toVal = priceTo ?? 2_000_000;
    return t("search.priceFormatted", {
      from: (fromVal / 1_000_000).toFixed(0),
      to: (toVal / 1_000_000).toFixed(0),
    });
  };

  return (
    <div className="w-full bg-white rounded-[12px] shadow-[0px_2px_3.15px_rgba(0,0,0,0.14)] p-[12px] lg:p-[16px] flex flex-col gap-[16px] lg:gap-[20px] items-start">
      {/* Title */}
      <h3 className="text-[19px] font-normal text-[#464646] font-['Poppins'] leading-[normal]">
        {t("search.title")}
      </h3>

      {/* Filter Outer Layout */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-[12px] lg:gap-[16px] w-full min-w-0">
        {/* Bordered Filters Container */}
        <div className="flex flex-col sm:flex-row flex-1 min-w-0 border border-[#d4d5d8] rounded-[12px] bg-white">
          {/* Location Dropdown */}
          <div className="flex-1 min-w-0">
            <SearchFilterDropdown
              icon={<MapPin className="size-[20px] sm:size-[16px] lg:size-[24px]" />}
              label={t("search.location")}
              value={location || t("search.any")}
              className="rounded-t-[12px] sm:rounded-t-none sm:rounded-l-[12px]"
              panelContent={(onClose) => (
                <LocationPanel
                  selected={location}
                  onSelect={setLocation}
                  onCancel={onClose}
                  onApply={onClose}
                />
              )}
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-[48px] lg:h-[56px] w-[1px] bg-[#d4d5d8] shrink-0" />
          <div className="block sm:hidden w-full h-[1px] bg-[#d4d5d8]" />

          {/* Property Type Dropdown */}
          <div className="flex-1 min-w-0">
            <SearchFilterDropdown
              icon={<Home className="size-[20px] sm:size-[16px] lg:size-[24px]" />}
              label={t("search.propertyType")}
              value={propertyType || t("search.all")}
              panelContent={(onClose) => (
                <PropertyTypePanel
                  selected={propertyType}
                  onSelect={setPropertyType}
                  onCancel={onClose}
                  onApply={onClose}
                />
              )}
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-[48px] lg:h-[56px] w-[1px] bg-[#d4d5d8] shrink-0" />
          <div className="block sm:hidden w-full h-[1px] bg-[#d4d5d8]" />

          {/* Beds & Baths Dropdown */}
          <div className="flex-1 min-w-0">
            <SearchFilterDropdown
              icon={<Briefcase className="size-[20px] sm:size-[16px] lg:size-[24px]" />}
              label={t("search.bedsAndBaths")}
              value={getBedsBathsLabel()}
              panelContent={(onClose) => (
                <BedsAndBathsPanel
                  beds={beds}
                  baths={baths}
                  onBedsChange={setBeds}
                  onBathsChange={setBaths}
                  onCancel={onClose}
                  onApply={onClose}
                />
              )}
            />
          </div>

          {/* Divider */}
          <div className="hidden sm:block h-[48px] lg:h-[56px] w-[1px] bg-[#d4d5d8] shrink-0" />
          <div className="block sm:hidden w-full h-[1px] bg-[#d4d5d8]" />

          {/* Price Range Dropdown */}
          <div className="flex-1 min-w-0">
            <SearchFilterDropdown
              icon={<Banknote className="size-[20px] sm:size-[16px] lg:size-[24px]" />}
              label={t("search.priceRange")}
              value={getPriceLabel()}
              className="rounded-b-[12px] sm:rounded-b-none sm:rounded-r-[12px]"
              panelContent={(onClose) => (
                <PriceRangePanel
                  from={priceFrom ?? 1_000_000}
                  to={priceTo ?? 2_000_000}
                  onFromChange={setPriceFrom}
                  onToChange={setPriceTo}
                  onCancel={onClose}
                  onApply={onClose}
                />
              )}
            />
          </div>
        </div>

        {/* Desktop inline Search Button */}
        <div className="hidden sm:block shrink-0">
          <SearchButton onClick={handleSearch} mobile={false} />
        </div>
      </div>

      {/* Mobile full-width Search Button at bottom */}
      <div className="block sm:hidden w-full mt-[4px]">
        <SearchButton onClick={handleSearch} mobile={true} />
      </div>
    </div>
  );
};

export default SearchSection;


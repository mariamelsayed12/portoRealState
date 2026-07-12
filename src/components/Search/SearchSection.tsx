import SearchFilterDropdown from "./SearchFilterDropdown";
import SearchButton from "./SearchButton";
import LocationPanel from "./LocationPanel";
import PropertyTypePanel from "./PropertyTypePanel";
import BedsAndBathsPanel from "./BedsAndBathsPanel";
import PriceRangePanel from "./PriceRangePanel";
import LocationPinIcon from "../icons/LocationIcon";
import BuildingIcon from "../icons/BuildingIcon";
import WalletIcon from "../icons/WalletIcon";
import BankNoteIcon from "../icons/BankNote";

/**
 * SearchSection
 * Full white card containing the "Search properties" label and
 * 4 filter dropdowns, each with its own interactive panel.
 *
 * Usage: place this wherever you need the search bar
 * (e.g. floating below the hero or inside a standalone page).
 */
const SearchSection = () => {
  return (
    <div className="bg-white rounded-2xl sm:rounded-[28px] shadow-2xl border border-gray-100/60 p-5 sm:p-6 md:p-6">
      {/* Label row */}
      <h3 className="text-text-darker font-semi text-sm md:text-base mb-5 tracking-wide">
        Search properties
      </h3>

      {/* Filter row */}
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* ── Location ── */}
        <SearchFilterDropdown
          icon={<LocationPinIcon className="w-5 h-5 text-primary" />}
          label="Location"
          value="Any"
          panelContent={(onClose) => (
          <LocationPanel onClose={onClose} />
          )}
          isfirst={true}
        />

        {/* ── Property Type ── */}
        <SearchFilterDropdown
  icon={<BuildingIcon className="w-5 h-5 text-primary" />}
  label="Property Type"
  value="All"
  panelContent={(onClose) => (
    <PropertyTypePanel onClose={onClose} />
  )}
/>

<SearchFilterDropdown
  icon={<BankNoteIcon className="w-5 h-5 text-primary" />}
  label="Beds & Baths"
  value="Any"
  panelContent={(onClose) => (
    <BedsAndBathsPanel onClose={onClose} />
  )}
/>

<SearchFilterDropdown
  icon={<WalletIcon className="w-5 h-5 text-primary" />}
  label="Price Range"
  value="1M – 2M EGP"
  islast={true}
  panelContent={(onClose) => (
    <PriceRangePanel onClose={onClose} />
  )}
/>

        {/* ── Search Button ── */}
        <div className="pl-0 sm:pl-2 pt-1 sm:pt-0 flex flex-col items-center justify-center">
            <SearchButton />
        </div> 
      </div>
    </div>
  );
};

export default SearchSection;

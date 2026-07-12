import SearchFilterDropdown from "./SearchFilterDropdown";
import SearchButton from "./SearchButton";
import LocationPanel from "./LocationPanel";
import PropertyTypePanel from "./PropertyTypePanel";
import BedsAndBathsPanel from "./BedsAndBathsPanel";
import PriceRangePanel from "./PriceRangePanel";
import WalletIcon from "../icons/WalletIcon";
import BankNoteIcon from "../icons/BankNote";
import { House, MapPin } from "lucide-react";

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
    <div className="bg-background rounded-md  shadow-2xl border border-border p-[16px]">
      {/* Label row */}
      <h3 className="text-text-darker font-normal text-sm md:text-lg  mb-5 tracking-wide">
        Search properties
      </h3>

      {/* Filter row */}
      <div className="flex flex-col sm:flex-row items-stretch">
        {/* ── Location ── */}
        <SearchFilterDropdown
          icon={  <MapPin className="w-6 h-6 text-primary" />}
          label="Location"
          value="Any"
          panelContent={(onClose) => (
          <LocationPanel onClose={onClose} />
          )}
          isfirst={true}
        />

        {/* ── Property Type ── */}
        <SearchFilterDropdown
  icon={    <House className="w-6 h-6 text-primary" />}
  label="Property Type"
  value="All"
  panelContent={(onClose) => (
    <PropertyTypePanel onClose={onClose} />
  )}
/>

<SearchFilterDropdown
  icon={<WalletIcon className="w-5 h-5 text-primary" />}
  label="Beds & Baths"
  value="Any"
  panelContent={(onClose) => (
    <BedsAndBathsPanel onClose={onClose} />
  )}
/>

<SearchFilterDropdown
  icon={
    <BankNoteIcon className="w-5 h-5 text-primary" />
  }
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

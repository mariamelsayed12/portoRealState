import { Search } from "lucide-react";

/** Teal magnifier search button */
interface SearchButtonProps {
  onClick?: () => void;
}

const SearchButton = ({ onClick }: SearchButtonProps) => (
  <button
    type="submit"
    onClick={onClick}
    aria-label="Search"
    className="w-full lg:w-auto h-12 sm:h-full lg:h-14 flex items-center justify-center rounded-md px-5 text-white transition-all duration-300 hover:opacity-90 hover:scale-[1.04] "
    style={{ backgroundColor: "var(--primary)", boxShadow: "0 4px 20px color-mix(in srgb, var(--primary) 30%, transparent)" }}
  >
        <Search  className="w-5 h-5" />
  </button>
);

export default SearchButton;

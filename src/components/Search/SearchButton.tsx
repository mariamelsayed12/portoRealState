import { Search } from "lucide-react";

interface SearchButtonProps {
  onClick?: () => void;
  mobile?: boolean;
}

const SearchButton = ({ onClick, mobile = false }: SearchButtonProps) => {
  if (mobile) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="w-full h-[48px] bg-[#1e8cab] hover:bg-[#1a7a96] text-[#f5f6fa] rounded-[12px] flex items-center justify-center gap-[8px] px-[24px] py-[8px] text-[16px] font-medium font-['Poppins'] cursor-pointer transition-colors duration-200"
      >
        <Search className="size-[24px] text-[#f5f6fa]" />
        <span>Search</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search"
      className="size-[48px] lg:size-[56px] bg-[#1e8cab] hover:bg-[#1a7a96] rounded-[12px] flex items-center justify-center cursor-pointer transition-colors duration-200 shrink-0"
    >
      <Search className="size-[20px] lg:size-[24px] text-white" />
    </button>
  );
};

export default SearchButton;

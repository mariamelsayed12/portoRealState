import { useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { truncateText } from "../../utils";

interface SearchFilterDropdownProps {
  icon: ReactNode;
  label: string;
  value: string;
  panelContent: (onClose: () => void) => ReactNode;
  className?: string;
}

const SearchFilterDropdown = ({
  icon,
  label,
  value,
  panelContent,
  className = "",
}: SearchFilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-1 min-w-0">
      {/* Trigger Button - Figma style (h-[48px] lg:h-[56px], px-[12px] sm:px-[8px] lg:px-[20px], py-8, text-left) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full h-[48px] lg:h-[56px] flex items-center justify-between px-[12px] sm:px-[8px] lg:px-[20px] py-[8px] bg-white hover:bg-[#f5f9fa]/50 transition-colors cursor-pointer select-none text-left outline-none border-none ${className}`}
      >
        <div className="flex items-center gap-[6px] sm:gap-[4px] lg:gap-[12px] min-w-0">
          {/* Icon - Figma size 20 to 32 */}
          <div className="size-[24px] sm:size-[20px] lg:size-[32px] flex items-center justify-center text-[#1e8cab] shrink-0">
            {icon}
          </div>
          {/* Text block */}
          <div className="flex flex-col justify-center leading-[normal] font-['Poppins'] min-w-0">
            <span className="text-[14px] sm:text-[12px] lg:text-[16px] font-normal text-[#747474]">
              {label}
            </span>
            <span className="text-[14px] sm:text-[12px] lg:text-[16px] font-normal text-[#464646] truncate">
             {truncateText(value,20)}
            </span>
          </div>
        </div>

        {/* Chevron Down - Figma size 12 to 24 */}
        <ChevronDown className="size-[16px] sm:size-[12px] lg:size-[24px] text-[#747474] shrink-0" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 lg:left-auto lg:right-0 top-full mt-[8px] z-50 bg-white rounded-[12px] shadow-[0px_1px_4px_rgba(0,0,0,0.17)] overflow-hidden border border-[#d4d5d8]/40">
            {panelContent(() => setOpen(false))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchFilterDropdown;

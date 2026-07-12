import { useState, type ReactNode } from "react";
import Button from "../Ui/Button";

/** Generic dropdown wrapper — handles open/close state and the panel */
interface SearchFilterDropdownProps {
  icon: ReactNode;
  label: string;
  value: string;
  panelContent: (onClose: () => void) => ReactNode;
  islast?:boolean;
  isfirst?:boolean ;

}

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-6 h-6 text-text-secondary flex-shrink-0"
  >
    <path
      fillRule="evenodd"
      d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
      clipRule="evenodd"
    />
  </svg>
);

const SearchFilterDropdown = ({
  icon,
  label,
  value,
  panelContent,
 islast,
 isfirst,

}: SearchFilterDropdownProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex-1 min-w-0">
      {/* Trigger */}
      <Button
        type="button"
        onClick={() => setOpen((o) => !o)}
    className={`w-full flex items-center gap-3 bg-gray-50 hover:bg-gray-100/70 transition-colors duration-200 lg:px-[20px] lg:py-[8px]  px-[10px] py-[4px]
  rounded-xl sm:rounded-none
  ${isfirst ? "sm:rounded-l-md" : ""}
  ${islast ? "sm:rounded-r-md" : ""}
  border border-border cursor-pointer text-left`}
      >
        <div className="text-primary bg-primary/10 p-2 rounded-lg flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <span className="block text-[16px] font-normal text-text-naturalGray  ">
            {label}
          </span>
          <span className="block font-normal text-text-darker truncate text-[16px] mt-0.5">
            {value}
          </span>
        </div>
        <ChevronDown  />
      </Button>

      {/* Panel */}
      {open && (
        <>
          {/* Backdrop to close on outside click */}
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-full mt-2 z-20 min-w-[220px] w-full bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              {panelContent(() => setOpen(false))}

          </div>
        </>
      )}
    </div>
  );
};

export default SearchFilterDropdown;

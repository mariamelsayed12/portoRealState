import { useState, useMemo } from "react";
import { PanelFooter } from "./PanelFooter";
import type { IProperty } from "../../app/services/crudproperties";
import { useTranslation } from "react-i18next";
import Spinner from "../Ui/LoadingSpinner";

interface LocationPanelProps {
  units?: IProperty[];
  isLoading?: boolean;
  isError?: boolean;
  selected: string; // Comma-separated string
  onSelect: (location: string) => void;
  onCancel: () => void;
  onApply: () => void;
}

const LocationPanel = ({
  units = [],
  isLoading = false,
  isError = false,
  selected,
  onSelect,
  onCancel,
  onApply,
}: LocationPanelProps) => {
  const { t } = useTranslation();

  // Extract unique village names from properties dynamically
  const locationOptions = useMemo(() => {
    const names = units
      .map((u) => u.village?.name)
      .filter((name): name is string => typeof name === "string" && name.trim() !== "");
    return Array.from(new Set(names)).sort();
  }, [units]);

  // Parse initial selected values
  const initialSet = new Set(
    selected
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean)
  );
  const [tempSelected, setTempSelected] = useState<Set<string>>(initialSet);

  const toggle = (opt: string) => {
    setTempSelected((prev) => {
      const next = new Set(prev);
      if (next.has(opt)) {
        next.delete(opt);
      } else {
        next.add(opt);
      }
      return next;
    });
  };

  const handleApply = () => {
    onSelect(Array.from(tempSelected).join(","));
    onApply();
  };

  return (
    <div className="flex flex-col gap-[24px] p-[12px] min-w-[240px] bg-white rounded-[12px]">
      {isLoading ? (
        <div className="flex items-center justify-center py-[24px]">
          <Spinner />
        </div>
      ) : isError ? (
        <div className="text-center py-[24px] text-[14px] font-normal font-['Poppins'] text-red-500">
          {t("search.errorLoading", "Failed to load locations")}
        </div>
      ) : locationOptions.length === 0 ? (
        <div className="text-center py-[24px] text-[14px] font-normal font-['Poppins'] text-[#747474]">
          {t("search.noOptions", "No locations available")}
        </div>
      ) : (
        <ul className="flex flex-col gap-[4px] max-h-[240px] overflow-y-auto scrollbar-none">
          {locationOptions.map((opt) => {
            const isChecked = tempSelected.has(opt);
            return (
              <li key={opt}>
                <button
                  type="button"
                  onClick={() => toggle(opt)}
                  className={`w-full flex items-center gap-[12px] px-[12px] py-[8px] rounded-[8px] text-[16px] font-normal font-['Poppins'] transition-colors cursor-pointer text-left ${
                    isChecked ? "bg-[#f5f9fa] text-[#1e8cab]" : "text-[#464646] hover:bg-[#f5f9fa]"
                  }`}
                >
                  {/* Custom Checkbox */}
                  <div
                    className={`size-[20px] rounded-[4px] border flex items-center justify-center transition-colors shrink-0 ${
                      isChecked
                        ? "bg-[#1e8cab] border-[#1e8cab]"
                        : "bg-white border-[#d4d5d8]"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        className="size-[12px] text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span>{opt}</span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <PanelFooter onCancel={onCancel} onApply={handleApply} />
    </div>
  );
};

export default LocationPanel;

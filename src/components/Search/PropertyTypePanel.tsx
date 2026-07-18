import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PanelFooter } from "./PanelFooter";

const PROPERTY_TYPES = ["Chalet", "Villa", "Apartment", "Twin House"];

const PROPERTY_TYPE_KEYS: Record<string, string> = {
  Chalet: "search.propertyTypes.chalet",
  Villa: "search.propertyTypes.villa",
  Apartment: "search.propertyTypes.apartment",
  "Twin House": "search.propertyTypes.twinHouse",
};

interface PropertyTypePanelProps {
  selected: string; // Comma-separated string
  onSelect: (type: string) => void;
  onCancel: () => void;
  onApply: () => void;
}

const PropertyTypePanel = ({ selected, onSelect, onCancel, onApply }: PropertyTypePanelProps) => {
  const { t } = useTranslation();

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
      <ul className="flex flex-col gap-[4px]">
        {PROPERTY_TYPES.map((opt) => {
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
                <span>{t(PROPERTY_TYPE_KEYS[opt])}</span>
              </button>
            </li>
          );
        })}
      </ul>
      <PanelFooter onCancel={onCancel} onApply={handleApply} />
    </div>
  );
};

export default PropertyTypePanel;


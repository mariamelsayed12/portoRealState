import { useTranslation } from "react-i18next";
import { PanelFooter } from "./PanelFooter";

const BED_OPTIONS = ["Any", "1", "2", "3", "4", "5+"];
const BATH_OPTIONS = ["Any", "1", "2", "3"];

interface BedsAndBathsPanelProps {
  beds: string;
  baths: string;
  onBedsChange: (v: string) => void;
  onBathsChange: (v: string) => void;
  onCancel: () => void;
  onApply: () => void;
}

/** Single pill/option button */
const OptionBtn = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`h-[36px] min-w-[48px] px-[12px] rounded-[8px] text-[16px] font-normal font-['Poppins'] border transition-colors cursor-pointer ${
      active
        ? "bg-[#1e8cab] border-[#1e8cab] text-white"
        : "bg-white border-[#d4d5d8] text-[#464646] hover:border-[#1e8cab] hover:text-[#1e8cab]"
    }`}
  >
    {children}
  </button>
);

const BedsAndBathsPanel = ({
  beds,
  baths,
  onBedsChange,
  onBathsChange,
  onCancel,
  onApply,
}: BedsAndBathsPanelProps) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-[16px] p-[12px] min-w-[280px]">
      <div className="flex flex-col gap-[12px]">
        <p className="text-[14px] font-medium text-[#141414] font-['Poppins']">{t("search.beds")}</p>
        <div className="flex items-center gap-[8px] flex-wrap">
          {BED_OPTIONS.map((n) => (
            <OptionBtn
              key={n}
              active={beds === n || (n === "Any" && beds === "")}
              onClick={() => onBedsChange(n === "Any" ? "" : n)}
            >
              {n === "Any" ? t("search.any") : n}
            </OptionBtn>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-[12px]">
        <p className="text-[14px] font-medium text-[#141414] font-['Poppins']">{t("search.baths")}</p>
        <div className="flex items-center gap-[8px] flex-wrap">
          {BATH_OPTIONS.map((n) => (
            <OptionBtn
              key={n}
              active={baths === n || (n === "Any" && baths === "")}
              onClick={() => onBathsChange(n === "Any" ? "" : n)}
            >
              {n === "Any" ? t("search.any") : n}
            </OptionBtn>
          ))}
        </div>
      </div>

      <PanelFooter onCancel={onCancel} onApply={onApply} />
    </div>
  );
};

export default BedsAndBathsPanel;


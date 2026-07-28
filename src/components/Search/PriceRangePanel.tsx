import { useState } from "react";
import { useTranslation } from "react-i18next";
import { PanelFooter } from "./PanelFooter";

interface PriceRangePanelProps {
  from: number;
  to: number;
  onFromChange: (v: number) => void;
  onToChange: (v: number) => void;
  onCancel: () => void;
  onApply: () => void;
}

const MIN = 0;
const MAX = 10_000_000;

const PriceRangePanel = ({
  from,
  to,
  onFromChange,
  onToChange,
  onCancel,
  onApply,
}: PriceRangePanelProps) => {
  const { t } = useTranslation();
  const [tempFrom, setTempFrom] = useState(from);
  const [tempTo, setTempTo] = useState(to);

  // Percentage positions for slider fill
  const fromPct = ((tempFrom - MIN) / (MAX - MIN)) * 100;
  const toPct = ((tempTo - MIN) / (MAX - MIN)) * 100;

  const handleApply = () => {
    onFromChange(tempFrom);
    onToChange(tempTo);
    onApply();
  };

  return (
    <div className="flex flex-col gap-[24px] p-[12px] w-[320px]">
      {/* From / To inputs */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex gap-[12px] items-end">
          {/* From */}
          <div className="flex flex-1 flex-col gap-[8px]">
            <p className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal]">
              {t("search.from")}
            </p>
            <div className="flex items-center h-[36px] bg-white border border-[#d4d5d8] rounded-[8px] px-[12px] overflow-hidden">
              <input
                type="number"
                value={tempFrom}
                min={MIN}
                max={tempTo}
                onChange={(e) =>
                  setTempFrom(Math.min(Number(e.target.value), tempTo))
                }
                className="w-full text-[14px] font-normal text-[#747474] font-['Poppins'] bg-transparent outline-none"
              />
            </div>
          </div>
          {/* To */}
          <div className="flex flex-1 flex-col gap-[8px]">
            <p className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal]">
              {t("search.to")}
            </p>
            <div className="flex items-center h-[36px] bg-white border border-[#d4d5d8] rounded-[8px] px-[12px] overflow-hidden">
              <input
                type="number"
                value={tempTo}
                min={tempFrom}
                max={MAX}
                onChange={(e) =>
                  setTempTo(Math.max(Number(e.target.value), tempFrom))
                }
                className="w-full text-[14px] font-normal text-[#747474] font-['Poppins'] bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Dual-thumb range slider */}
        <div className="flex flex-col gap-[0px]">
          {/* Track + thumb handles layer */}
          <div className="relative h-[28px]">
            {/* Track background */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[8px] bg-[#edeff2] rounded-[4px]" />
            {/* Active fill between thumbs */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[8px] bg-[#00236f] rounded-[4px]"
              style={{ left: `${fromPct}%`, width: `${toPct - fromPct}%` }}
            />
            {/* From thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={tempFrom}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v <= tempTo) setTempFrom(v);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* From thumb handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-[20px] bg-white rounded-full shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)] pointer-events-none"
              style={{ left: `${fromPct}%` }}
            />
            {/* To thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={tempTo}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= tempFrom) setTempTo(v);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* To thumb handle */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 size-[20px] bg-white rounded-full shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)] pointer-events-none"
              style={{ left: `${toPct}%` }}
            />
          </div>

          {/* Labels row — separate from the track layer to avoid clipping */}
          <div className="relative h-[18px] mt-[4px]">
            {/* Min label — always at far left */}
            <span className="absolute left-0 top-0 text-[12px] font-normal text-[#464646] font-['Inter'] whitespace-nowrap">
              0 {t("search.egp")}
            </span>
            {/* Max label — follows the "to" thumb */}
            <span
              className="absolute top-0 text-[12px] font-normal text-[#464646] font-['Inter'] -translate-x-1/2 whitespace-nowrap"
              style={{ left: `${toPct}%` }}
            >
              {(tempTo / 1_000_000).toFixed(0)}M {t("search.egp")}
            </span>
          </div>
        </div>
      </div>

      <PanelFooter onCancel={onCancel} onApply={handleApply} />
    </div>
  );
};

export default PriceRangePanel;

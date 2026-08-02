import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { PanelFooter } from "./PanelFooter";

interface PriceRangePanelProps {
  from: number;
  to: number;
  maxPrice?: number;
  onFromChange: (v: number) => void;
  onToChange: (v: number) => void;
  onCancel: () => void;
  onApply: () => void;
}

const formatPriceMillions = (val: number) => {
  if (val >= 1_000_000) {
    return `${(val / 1_000_000).toFixed(1).replace(".0", "")}M`;
  }
  if (val >= 1_000) {
    return `${(val / 1_000).toFixed(0)}k`;
  }
  return String(val);
};

const PriceRangePanel = ({
  from,
  to,
  maxPrice = 10_000_000,
  onFromChange,
  onToChange,
  onCancel,
  onApply,
}: PriceRangePanelProps) => {
  const { t, i18n } = useTranslation();
  const MIN = 0;
  const MAX = maxPrice;

  const [tempFrom, setTempFrom] = useState(from);
  const [tempTo, setTempTo] = useState(to);
  const [activeThumb, setActiveThumb] = useState<"min" | "max">("min");

  const isRtl = i18n.language === "ar";

  // Sync state with props when they change (critical for dynamic loading updates)
  useEffect(() => {
    setTempFrom(from);
  }, [from]);

  useEffect(() => {
    setTempTo(to);
  }, [to]);

  // Percentage positions for slider fill
  const fromPct = ((tempFrom - MIN) / (MAX - MIN || 1)) * 100;
  const toPct = ((tempTo - MIN) / (MAX - MIN || 1)) * 100;

  // LTR / RTL style mapping for track highlight
  const fillStyle = isRtl
    ? { right: `${fromPct}%`, width: `${toPct - fromPct}%` }
    : { left: `${fromPct}%`, width: `${toPct - fromPct}%` };

  const fromHandleStyle = isRtl
    ? { right: `${fromPct}%`, transform: "translate(50%, -50%)" }
    : { left: `${fromPct}%`, transform: "translate(-50%, -50%)" };

  const toHandleStyle = isRtl
    ? { right: `${toPct}%`, transform: "translate(50%, -50%)" }
    : { left: `${toPct}%`, transform: "translate(-50%, -50%)" };

  const toLabelStyle = isRtl
    ? { right: `${toPct}%`, transform: "translateX(50%)" }
    : { left: `${toPct}%`, transform: "translateX(-50%)" };

  const handleApply = () => {
    onFromChange(tempFrom);
    onToChange(tempTo);
    onApply();
  };

  return (
    <div className="flex flex-col gap-[24px] p-[12px] w-[320px]" dir={isRtl ? "rtl" : "ltr"}>
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
                  setTempFrom(Math.max(MIN, Math.min(Number(e.target.value), tempTo)))
                }
                className="w-full text-[14px] font-normal text-[#747474] font-['Poppins'] bg-transparent outline-none text-left rtl:text-right"
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
                  setTempTo(Math.min(MAX, Math.max(Number(e.target.value), tempFrom)))
                }
                className="w-full text-[14px] font-normal text-[#747474] font-['Poppins'] bg-transparent outline-none text-left rtl:text-right"
              />
            </div>
          </div>
        </div>

        {/* Dual-thumb range slider */}
        <div className="flex flex-col gap-[0px]">
          {/* Track + thumb handles layer */}
          <div className="relative h-[28px] price-range-slider">
            {/* Track background */}
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-[8px] bg-[#edeff2] rounded-[4px]" />
            {/* Active fill between thumbs */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-[8px] bg-[#00236f] rounded-[4px]"
              style={fillStyle}
            />
            {/* From thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={tempFrom}
              dir={isRtl ? "rtl" : "ltr"}
              onMouseDown={() => setActiveThumb("min")}
              onTouchStart={() => setActiveThumb("min")}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v <= tempTo) setTempFrom(v);
              }}
              style={{ zIndex: activeThumb === "min" ? 40 : 30 }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* From thumb handle (custom design) */}
            <div
              className="absolute top-1/2 size-[20px] bg-white rounded-full shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)] pointer-events-none"
              style={fromHandleStyle}
            />
            {/* To thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={tempTo}
              dir={isRtl ? "rtl" : "ltr"}
              onMouseDown={() => setActiveThumb("max")}
              onTouchStart={() => setActiveThumb("max")}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= tempFrom) setTempTo(v);
              }}
              style={{ zIndex: activeThumb === "max" ? 40 : 30 }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {/* To thumb handle (custom design) */}
            <div
              className="absolute top-1/2 size-[20px] bg-white rounded-full shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)] pointer-events-none"
              style={toHandleStyle}
            />
          </div>

          {/* Labels row — separate from the track layer to avoid clipping */}
          <div className="relative h-[18px] mt-[4px]">
            {/* Min label — always at far left/right */}
            <span className={`absolute top-0 text-[12px] font-normal text-[#464646] font-['Inter'] whitespace-nowrap ${isRtl ? "right-0" : "left-0"}`}>
              0 {t("search.egp")}
            </span>
            {/* Max label — follows the "to" thumb */}
            <span
              className="absolute top-0 text-[12px] font-normal text-[#464646] font-['Inter'] whitespace-nowrap"
              style={toLabelStyle}
            >
              {formatPriceMillions(tempTo)} {t("search.egp")}
            </span>
          </div>
        </div>
      </div>

      <PanelFooter onCancel={onCancel} onApply={handleApply} />

      <style>{`
        .price-range-slider input[type="range"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          pointer-events: none;
          position: absolute;
          width: 100%;
          height: 28px;
          background: transparent;
          outline: none;
          margin: 0;
          left: 0;
          top: 0;
        }
        .price-range-slider input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
        }
        .price-range-slider input[type="range"]::-moz-range-thumb {
          pointer-events: auto;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};

export default PriceRangePanel;

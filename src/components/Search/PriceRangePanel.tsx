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
  // Percentage positions for slider fill
  const fromPct = ((from - MIN) / (MAX - MIN)) * 100;
  const toPct = ((to - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="flex flex-col gap-[24px] p-[12px] w-[320px]">
      {/* From / To inputs */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex gap-[12px] items-end">
          {/* From */}
          <div className="flex flex-1 flex-col gap-[8px]">
            <p className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal]">
              From
            </p>
            <div className="flex items-center h-[36px] bg-white border border-[#d4d5d8] rounded-[8px] px-[12px] overflow-hidden">
              <input
                type="number"
                value={from}
                min={MIN}
                max={to}
                onChange={(e) => onFromChange(Math.min(Number(e.target.value), to))}
                className="w-full text-[14px] font-normal text-[#747474] font-['Poppins'] bg-transparent outline-none"
              />
            </div>
          </div>
          {/* To */}
          <div className="flex flex-1 flex-col gap-[8px]">
            <p className="text-[16px] font-normal text-[#141414] font-['Poppins'] leading-[normal]">
              To
            </p>
            <div className="flex items-center h-[36px] bg-white border border-[#d4d5d8] rounded-[8px] px-[12px] overflow-hidden">
              <input
                type="number"
                value={to}
                min={from}
                max={MAX}
                onChange={(e) => onToChange(Math.max(Number(e.target.value), from))}
                className="w-full text-[14px] font-normal text-[#747474] font-['Poppins'] bg-transparent outline-none"
              />
            </div>
          </div>
        </div>

        {/* Dual-thumb range slider */}
        <div className="flex flex-col gap-[4px]">
          <div className="relative h-[43px]">
            {/* Track background */}
            <div className="absolute left-0 right-0 top-[calc(50%+4px)] h-[8px] bg-[#edeff2] rounded-[4px]" />
            {/* Active fill between thumbs */}
            <div
              className="absolute top-[calc(50%+4px)] h-[8px] bg-[#00236f] rounded-[4px]"
              style={{ left: `${fromPct}%`, width: `${toPct - fromPct}%` }}
            />
            {/* Min label */}
            <span className="absolute left-0 bottom-0 text-[12px] font-normal text-[#464646] font-['Inter']">
              0 EGP
            </span>
            {/* Max label - positioned at to thumb */}
            <span
              className="absolute bottom-0 text-[12px] font-normal text-[#464646] font-['Inter'] -translate-x-1/2"
              style={{ left: `${toPct}%` }}
            >
              {(to / 1_000_000).toFixed(0)}M EGP
            </span>
            {/* From thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={from}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v <= to) onFromChange(v);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* From thumb handle */}
            <div
              className="absolute top-[calc(50%+4px)] -translate-y-1/2 -translate-x-1/2 size-[20px] bg-white rounded-full shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)] pointer-events-none"
              style={{ left: `${fromPct}%` }}
            />
            {/* To thumb */}
            <input
              type="range"
              min={MIN}
              max={MAX}
              value={to}
              onChange={(e) => {
                const v = Number(e.target.value);
                if (v >= from) onToChange(v);
              }}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
            />
            {/* To thumb handle */}
            <div
              className="absolute top-[calc(50%+4px)] -translate-y-1/2 -translate-x-1/2 size-[20px] bg-white rounded-full shadow-[0px_2px_5px_0px_rgba(103,110,118,0.08),0px_0px_0px_1px_rgba(103,110,118,0.16),0px_1px_1px_0px_rgba(0,0,0,0.12)] pointer-events-none"
              style={{ left: `${toPct}%` }}
            />
          </div>
        </div>
      </div>

      <PanelFooter onCancel={onCancel} onApply={onApply} />
    </div>
  );
};

export default PriceRangePanel;

import { useState } from "react";
import { PanelFooter } from "./PanelFooter";

interface PriceRangePanelProps {
  onClose: () => void;
}

const PriceRangePanel = ({ onClose }: PriceRangePanelProps) => {
  const [from, setFrom] = useState(1_000_000);
  const [to, setTo] = useState(2_000_000);

  const MIN = 0;
  const MAX = 10_000_000;


  
  return (
    <div className="p-4  min-w-[320px] max-w-[360px]">
      <div className="grid grid-cols-2 gap-3 mb-4 ">
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            From
          </label>
          <input
            type="number"
            value={from}
            onChange={(e) => setFrom(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-2 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">
            To
          </label>
          <input
            type="number"
            value={to}
            onChange={(e) => setTo(Number(e.target.value))}
            className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm font-semibold text-gray-800 focus:outline-none focus:border-primary transition-colors"
          />
        </div>
      </div>

      {/* Range labels */}
      <div className="flex justify-between text-[10px] text-gray-400 font-semibold mb-1">
        <span>0 EGP</span>
        <span>100 EGP</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min={MIN}
        max={MAX}
        value={from}
        onChange={(e) => setFrom(Number(e.target.value))}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer mb-4"
        style={{ accentColor: "var(--primary)" }}
      />

      <PanelFooter onCancel={onClose} onApply={onClose} />
    </div>
  );
};

export default PriceRangePanel;

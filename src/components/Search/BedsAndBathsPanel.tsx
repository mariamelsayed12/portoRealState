import { useState } from "react";
import { PanelFooter } from "./PanelFooter";

const BED_OPTIONS = [1, 2, 3, 4, "5+"];
const BATH_OPTIONS = [1, 2, 3];

interface BedsAndBathsPanelProps {
  onClose: () => void;
}

/** Pill selector button */
const PillBtn = ({
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
    className={`w-10 h-10 rounded-full text-sm font-bold border transition-all duration-200 ${
      active
        ? "text-white border-primary"
        : "text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
    }`}
    style={active ? { backgroundColor: "var(--primary)" } : {}}
  >
    {children}
  </button>
);

const BedsAndBathsPanel = ({ onClose }: BedsAndBathsPanelProps) => {
  const [beds, setBeds] = useState<number | string | null>(null);
  const [baths, setBaths] = useState<number | null>(null);

  return (
    <div className="p-4 min-w-[260px]">
      <p className="text-sm font-bold text-gray-800 mb-3">Beds</p>
      <div className="flex items-center gap-2 flex-wrap mb-5">
        {BED_OPTIONS.map((n) => (
          <PillBtn key={n} active={beds === n} onClick={() => setBeds(n)}>
            {n}
          </PillBtn>
        ))}
      </div>

      <p className="text-sm font-bold text-gray-800 mb-3">Baths</p>
      <div className="flex items-center gap-2 flex-wrap mb-2">
        {BATH_OPTIONS.map((n) => (
          <PillBtn
            key={n}
            active={baths === n}
            onClick={() => setBaths(n as number)}
          >
            {n}
          </PillBtn>
        ))}
      </div>

      <PanelFooter onCancel={onClose} onApply={onClose} />
    </div>
  );
};

export default BedsAndBathsPanel;

import { useState } from "react";
import { PanelFooter } from "./PanelFooter";
import { LOCATION_OPTIONS } from "../../data";


interface LocationPanelProps {
  onClose: () => void;
}

const LocationPanel = ({ onClose }: LocationPanelProps) => {
  const [selected, setSelected] = useState<Set<number>>(new Set([0]));

 const toggle = (idx: number) =>
  setSelected((prev) => {
    const next = new Set(prev);

    if (next.has(idx)) {
      next.delete(idx);
    } else {
      next.add(idx);
    }

    return next;
  });

  return (
    <div className="p-4">
      <ul className="space-y-3">
        {LOCATION_OPTIONS.map((opt, idx) => (
          <li key={idx}>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selected.has(idx)}
                onChange={() => toggle(idx)}
                className="w-4 h-4 rounded accent-primary cursor-pointer"
                style={{ accentColor: "var(--primary)" }}
              />
              <span className="text-sm font-medium text-gray-700">{opt}</span>
            </label>
          </li>
        ))}
      </ul>
      <PanelFooter onCancel={onClose} onApply={onClose} />
    </div>
  );
};

export default LocationPanel;

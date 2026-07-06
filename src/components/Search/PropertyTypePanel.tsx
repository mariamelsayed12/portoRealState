import { useState } from "react";
import { PanelFooter } from "./PanelFooter";

const PROPERTY_TYPES = ["Challet", "Villa", "Apartment", "Twin House"];

interface PropertyTypePanelProps {
  onClose: () => void;
}

const PropertyTypePanel = ({ onClose }: PropertyTypePanelProps) => {
  const [selected, setSelected] = useState<Set<string>>(new Set(["Challet"]));

  const toggle = (opt: string) =>
  setSelected((prev) => {
    const next = new Set(prev);

    if (next.has(opt)) {
      next.delete(opt);
    } else {
      next.add(opt);
    }

    return next;
  });

  return (
    <div className="p-4">
      <ul className="space-y-3">
        {PROPERTY_TYPES.map((opt) => (
          <li key={opt}>
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={selected.has(opt)}
                onChange={() => toggle(opt)}
                className="w-4 h-4 rounded cursor-pointer"
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

export default PropertyTypePanel;

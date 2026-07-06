import Button from "../Ui/Button";

/** Reusable panel footer with Cancel / Apply buttons */
interface PanelFooterProps {
  onCancel: () => void;
  onApply: () => void;
}

export const PanelFooter = ({ onCancel, onApply }: PanelFooterProps) => (
  <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-gray-100">
    <Button
      type="button"
      onClick={onCancel}
      className="flex-1 py-2.5  rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors duration-200"
    >
      Cancel
    </Button>
    <button
      type="button"
      onClick={onApply}
      className="flex-1 py-2.5 rounded-full text-sm font-bold text-white transition-colors duration-200"
      style={{ backgroundColor: "var(--primary)" }}
    >
      Apply
    </button>
  </div>
);

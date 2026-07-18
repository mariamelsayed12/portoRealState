import { useTranslation } from "react-i18next";

/** Reusable panel footer with Cancel / Apply buttons — matches Figma 125:4045 */
interface PanelFooterProps {
  onCancel: () => void;
  onApply: () => void;
}

export const PanelFooter = ({ onCancel, onApply }: PanelFooterProps) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center gap-[24px] w-full">
      {/* Cancel — text-only, primary color */}
      <button
        type="button"
        onClick={onCancel}
        className="flex flex-1 h-[36px] items-center justify-center rounded-[12px] p-[8px] text-[16px] font-medium text-[#1e8cab] font-['Poppins'] cursor-pointer"
      >
        {t("common.cancel")}
      </button>
      {/* Apply — filled primary */}
      <button
        type="button"
        onClick={onApply}
        className="flex flex-1 h-[36px] items-center justify-center bg-[#1e8cab] rounded-[12px] px-[16px] py-[8px] text-[16px] font-medium text-[#f5f6fa] font-['Poppins'] cursor-pointer hover:bg-[#1a7a96] transition-colors"
      >
        {t("common.apply")}
      </button>
    </div>
  );
};

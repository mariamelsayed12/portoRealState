import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show page 1
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      pages.push(totalPages);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // Render previous/next arrow icons respecting LTR/RTL direction
  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="flex items-center justify-center gap-[6px] sm:gap-[8px] py-[24px] lg:py-[32px] w-full select-none" dir={isRtl ? "rtl" : "ltr"}>
      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`h-[36px] sm:h-[40px] px-[12px] sm:px-[16px] flex items-center justify-center gap-[4px] sm:gap-[6px] rounded-[8px] text-[14px] sm:text-[15px] font-medium font-['Poppins'] border transition-colors cursor-pointer outline-none ${
          currentPage === 1
            ? "bg-[#f5f9fa] border-[#e2e8f0] text-[#a0aec0] cursor-not-allowed"
            : "bg-white border-[#d4d5d8] text-[#464646] hover:border-[#1e8cab] hover:text-[#1e8cab]"
        }`}
      >
        <PrevIcon className="size-[16px] sm:size-[18px]" />
        <span className="hidden sm:inline">{t("common.previous")}</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-[4px] sm:gap-[8px]">
        {pageNumbers.map((page, idx) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="w-[32px] sm:w-[40px] text-center text-[#747474] font-medium text-[14px] sm:text-[16px]"
              >
                ...
              </span>
            );
          }

          const pageNum = page as number;
          const isActive = pageNum === currentPage;

          return (
            <button
              key={`page-${pageNum}`}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`size-[36px] sm:size-[40px] flex items-center justify-center rounded-[8px] text-[14px] sm:text-[16px] font-medium font-['Poppins'] border transition-colors cursor-pointer outline-none ${
                isActive
                  ? "bg-[#1e8cab] border-[#1e8cab] text-white"
                  : "bg-white border-[#d4d5d8] text-[#464646] hover:border-[#1e8cab] hover:text-[#1e8cab]"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`h-[36px] sm:h-[40px] px-[12px] sm:px-[16px] flex items-center justify-center gap-[4px] sm:gap-[6px] rounded-[8px] text-[14px] sm:text-[15px] font-medium font-['Poppins'] border transition-colors cursor-pointer outline-none ${
          currentPage === totalPages
            ? "bg-[#f5f9fa] border-[#e2e8f0] text-[#a0aec0] cursor-not-allowed"
            : "bg-white border-[#d4d5d8] text-[#464646] hover:border-[#1e8cab] hover:text-[#1e8cab]"
        }`}
      >
        <span className="hidden sm:inline">{t("common.next")}</span>
        <NextIcon className="size-[16px] sm:size-[18px]" />
      </button>
    </div>
  );
};

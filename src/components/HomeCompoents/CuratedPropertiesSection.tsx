import { useMemo, useRef } from "react";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import {  units } from "../../data";
import UnitCard from "../UnitCard";
import {  useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const CuratedPropertiesSection = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();


  const canScroll = useMemo(() => units.length > 3, []);
 
  const scrollByCards = (direction: "left" | "right") => {
    const container = scrollerRef.current;

    if (!container) {
      return;
    }

    const cardWidth = 384 + 24; // Card width + gap
    const amount = direction === "left" ? -cardWidth : cardWidth;

    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-background py-[60px]">
      <div className="w-full mx-auto flex flex-col gap-[24px]">
        <div className="flex items-center justify-between w-full px-6 sm:px-12 lg:px-[120px]">
          <h2 className="text-[28px] lg:text-[40px] font-medium text-[#141414] font-['Poppins'] leading-[normal]">
            {t("curatedProperties.title")}
          </h2>

          <button
            className="flex items-center justify-center lg:h-[36px] lg:px-[16px] h-[24px] px-[10px] lg:rounded-md rounded-[8px]  border border-[#747474] lg:text-[16px] text-[13px] font-medium text-primary font-['Poppins'] transition-colors hover:bg-[#edeff2]"
            onClick={()=>{
              navigate("/buy");
            }}
          >
            {t("curatedProperties.viewAll")}
          </button>
        </div>
        <div className="pl-6 sm:pl-12 lg:pl-[120px] pr-0 rtl:pl-0 rtl:pr-6 rtl:sm:pr-12 rtl:lg:pr-[120px]">
           <div
          ref={scrollerRef}
          className="flex gap-[24px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full pb-2"
        >
          {units.map((card) => (
            <UnitCard key={card.id} card={card} />
          ))}
        </div>
        </div>

       
        <div className="flex items-center gap-[24px] w-full px-6 sm:px-12 lg:px-[120px]">
          <button
            type="button"
            onClick={() => scrollByCards(isRtl ? "right" : "left")}
            disabled={!canScroll}
            className="flex items-center justify-center size-[48px] rounded-[12px] border border-[#747474] text-[#141414] transition-colors hover:bg-[#edeff2] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isRtl ? t("curatedProperties.scrollRight") : t("curatedProperties.scrollLeft")}
          >
            {isRtl ? <ChevronRight className="h-[20px] w-[20px] text-primary" /> : <ChevronLeft className="h-[20px] w-[20px] text-primary" />}
          </button>
          <button
            type="button"
            onClick={() => scrollByCards(isRtl ? "left" : "right")}
            disabled={!canScroll}
            className="flex items-center justify-center size-[48px] rounded-[12px] border border-[#747474] text-[#141414] transition-colors hover:bg-[#edeff2] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label={isRtl ? t("curatedProperties.scrollLeft") : t("curatedProperties.scrollRight")}
          >
            {isRtl ? <ChevronLeft className="h-[20px] w-[20px] text-primary" /> : <ChevronRight className="h-[20px] w-[20px] text-primary" />}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CuratedPropertiesSection;

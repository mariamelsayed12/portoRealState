import { useMemo, useRef } from "react";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import {  curatedPropertiesHeading, units } from "../../data";
import UnitCard from "../UnitCard";
import {  useNavigate } from "react-router-dom";

const CuratedPropertiesSection = () => {
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
    <section className="w-full bg-background py-[60px] px-6 sm:px-12 lg:px-[120px]">
      <div className="w-full mx-auto flex flex-col gap-[24px]">
        <div className="flex items-center justify-between w-full">
          <h2 className="text-[28px] lg:text-[40px] font-medium text-[#141414] font-['Poppins'] leading-[normal]">
            {curatedPropertiesHeading.title}
          </h2>

          <button
            type="button"
            className="flex items-center justify-center h-[36px] px-[16px] rounded-[12px] border border-[#747474] text-[16px] font-medium text-[#141414] font-['Poppins'] transition-colors hover:bg-[#edeff2]"
            onClick={()=>{
              navigate("/buy");
            }}
          >
            {curatedPropertiesHeading.actionLabel}
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="flex gap-[24px] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden w-full pb-2"
        >
          {units.map((card) => (
            <UnitCard key={card.id} card={card} />
          ))}
        </div>
        
        <div className="flex items-center gap-[8px] w-full">
          <button
            type="button"
            onClick={() => scrollByCards("left")}
            disabled={!canScroll}
            className="flex items-center justify-center size-[48px] rounded-[12px] border border-[#747474] text-[#141414] transition-colors hover:bg-[#edeff2] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Scroll properties left"
          >
            <ChevronLeft className="h-[20px] w-[20px]" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCards("right")}
            disabled={!canScroll}
            className="flex items-center justify-center size-[48px] rounded-[12px] border border-[#747474] text-[#141414] transition-colors hover:bg-[#edeff2] disabled:cursor-not-allowed disabled:opacity-50"
            aria-label="Scroll properties right"
          >
            <ChevronRight className="h-[20px] w-[20px]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CuratedPropertiesSection;

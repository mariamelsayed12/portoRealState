import { useMemo, useRef } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { curatedProperties, curatedPropertiesHeading } from "../../data";
import UnitCard from "../UnitCard";

const CuratedPropertiesSection = () => {
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  const canScroll = useMemo(() => curatedProperties.length > 3, []);

  const scrollByCards = (direction: "left" | "right") => {
    const container = scrollerRef.current;

    if (!container) {
      return;
    }

    const cardWidth = 286 + 16;
    const amount = direction === "left" ? -cardWidth * 1.15 : cardWidth * 1.15;

    container.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section className="bg-background py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4">
          <h2 className="lg:text-[40px] font-semibold tracking-tight text-text-secondary text-[24px]">
            {curatedPropertiesHeading.title}
          </h2>

          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#D9E1E4] bg-white px-3 py-1.5 text-[11px] font-medium text-[#6E7D84] shadow-sm transition-colors hover:border-primary/30 hover:text-primary"
          >
            <span>{curatedPropertiesHeading.actionLabel}</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="mt-3 flex gap-4 overflow-x-auto pb-2 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {curatedProperties.map((card) => (
            <UnitCard key={card.id} card={card} />
          ))}
        </div>
        <div className="mt-4 flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByCards("left")}
              disabled={!canScroll}
              className="grid p-2 place-items-center rounded-md border border-[#D9E1E4] bg-white text-[#6E7D84] shadow-sm transition-colors hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Scroll properties left"
            >
              <ChevronLeft className="h-4 w-4 text-primary" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCards("right")}
              disabled={!canScroll}
              className="grid p-2 place-items-center rounded-md border border-[#D9E1E4] bg-white text-[#6E7D84] shadow-sm transition-colors hover:border-primary/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              aria-label="Scroll properties right"
            >
              <ChevronRight className="h-4 w-4 text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CuratedPropertiesSection;

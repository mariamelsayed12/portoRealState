import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "../../data";
import DestinationCard from "./DestinationCard";
import { useTranslation } from "react-i18next";

const PrestigiousDestinations = () => {
	const { t, i18n } = useTranslation();
	const isRtl = i18n.language === "ar";
	const scrollerRef = useRef<HTMLDivElement | null>(null);

	const scrollByCards = (direction: "left" | "right") => {
		const container = scrollerRef.current;
		if (!container) return;

		// Card width (384px on desktop, smaller on mobile) + gap (24px)
		// We get the clientWidth of the first child if it exists, or fallback to 384
		const firstCard = container.firstElementChild as HTMLElement | null;
		const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 384 + 24;
		const amount = direction === "left" ? -cardWidth * 1.15 : cardWidth * 1.15;

		container.scrollBy({ left: amount, behavior: "smooth" });
	};

	return (
		<section className="w-full bg-light-primary py-[60px] ">
			<div className=" w-full flex flex-col gap-[24px] ">
				{/* Section Title */}
				<div className="px-6 sm:px-12 md:px-16 lg:px-[120px]">
				<h2 className="text-[#141414] font-medium text-[28px] md:text-[40px] tracking-tight leading-[normal] font-['Poppins']">
				{t("prestigiousDestinations.heading")}
				</h2>
				</div>
				

				{/* Cards Container with horizontal scrolling */}
				<div className="pl-6 sm:pl-12 md:pl-16 lg:pl-[120px] pr-0 rtl:pl-0 rtl:pr-6 rtl:sm:pr-12 rtl:md:pr-16 rtl:lg:pr-[120px]">
                   <div
					ref={scrollerRef}
					className="flex gap-[24px] overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
				>
					{destinations.map((dest) => (
						<DestinationCard key={dest.id} destination={dest} />
					))}
				</div>
				</div>
				

				{/* Navigation Arrows */}
				<div className="flex gap-[24px] items-center mt-2 px-6 sm:px-12 md:px-16 lg:px-[120px]">
					<button
						type="button"
						onClick={() => scrollByCards(isRtl ? "right" : "left")}
						className="border border-[#747474] flex items-center justify-center rounded-[12px] shrink-0 w-[48px] h-[48px] text-[#747474] transition-all hover:border-primary hover:text-primary active:scale-95 bg-transparent cursor-pointer"
						aria-label={isRtl ? t("prestigiousDestinations.scrollRight") : t("prestigiousDestinations.scrollLeft")}
					>
						{isRtl ? <ChevronRight className="h-6 w-6 text-primary" /> : <ChevronLeft className="h-6 w-6 text-primary" />}
					</button>
					<button
						type="button"
						onClick={() => scrollByCards(isRtl ? "left" : "right")}
						className="border border-[#747474] flex items-center justify-center rounded-[12px] shrink-0 w-[48px] h-[48px] text-[#747474] transition-all hover:border-primary hover:text-primary active:scale-95 bg-transparent cursor-pointer"
						aria-label={isRtl ? t("prestigiousDestinations.scrollLeft") : t("prestigiousDestinations.scrollRight")}
					>
						{isRtl ? <ChevronLeft className="h-6 w-6 text-primary" /> : <ChevronRight className="h-6 w-6 text-primary" />}
					</button>
				</div>
			</div>
		</section>
	);
};

export default PrestigiousDestinations;


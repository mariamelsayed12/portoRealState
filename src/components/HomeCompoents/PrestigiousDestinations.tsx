import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { destinations } from "../../data";
import DestinationCard from "./DestinationCard";

const PrestigiousDestinations = () => {
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
		<section className="w-full bg-light-primary py-[60px] px-6 sm:px-12 md:px-16 lg:px-[120px]">
			<div className="mx-auto w-full flex flex-col gap-[24px]">
				{/* Section Title */}
				<h2 className="text-[#141414] font-medium text-[28px] md:text-[40px] tracking-tight leading-[normal] font-['Poppins']">
					Prestigious Destinations
				</h2>

				{/* Cards Container with horizontal scrolling */}
				<div
					ref={scrollerRef}
					className="flex gap-[24px] overflow-x-auto pb-4 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden scroll-smooth"
				>
					{destinations.map((dest) => (
						<DestinationCard key={dest.id} destination={dest} />
					))}
				</div>

				{/* Navigation Arrows */}
				<div className="flex gap-[24px] items-center mt-2">
					<button
						type="button"
						onClick={() => scrollByCards("left")}
						className="border border-[#747474] flex items-center justify-center rounded-[12px] shrink-0 w-[48px] h-[48px] text-[#747474] transition-all hover:border-primary hover:text-primary active:scale-95 bg-transparent cursor-pointer"
						aria-label="Scroll destinations left"
					>
						<ChevronLeft className="h-6 w-6" />
					</button>
					<button
						type="button"
						onClick={() => scrollByCards("right")}
						className="border border-[#747474] flex items-center justify-center rounded-[12px] shrink-0 w-[48px] h-[48px] text-[#747474] transition-all hover:border-primary hover:text-primary active:scale-95 bg-transparent cursor-pointer"
						aria-label="Scroll destinations right"
					>
						<ChevronRight className="h-6 w-6" />
					</button>
				</div>
			</div>
		</section>
	);
};

export default PrestigiousDestinations;


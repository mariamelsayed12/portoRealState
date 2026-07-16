import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { DestinationData } from "../../interfaces";

interface DestinationCardProps {
	destination: DestinationData;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
	const priceStr = destination.price || "";
	const spaceIndex = priceStr.indexOf(" ");
	let priceVal = priceStr;
	let priceUnit = "";
	if (spaceIndex !== -1) {
		priceVal = priceStr.slice(0, spaceIndex);
		priceUnit = priceStr.slice(spaceIndex + 1);
	}

	return (
		<Link
			to={`/home/${destination.slug}`}
			className="group relative flex flex-col justify-end p-6 rounded-[12px] overflow-hidden shrink-0 w-[280px] sm:w-[384px] h-[320px] sm:h-[443px] transition-all duration-300 "
		>
			<img
				src={destination.image}
				alt={destination.title}
				loading="lazy"
				decoding="async"
				sizes="(min-width: 768px) 33vw, 100vw"
				className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none"
			/>
			{/* Gradient overlay for readability */}
			<div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

			{/* Hover Arrow Badge */}
			<div className="absolute right-6 top-6 z-10 flex h-12 w-12 items-center justify-center rounded-[12px] bg-primary text-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-105">
				<ArrowUpRight className="h-6 w-6" />
			</div>

			{/* Badges container at the bottom */}
			<div className="relative z-10 flex items-start justify-between gap-4 w-full">
				{/* Left Glass Badge */}
				<div className="bg-white/10 backdrop-blur-md rounded-[12px] p-2 flex flex-col items-start min-w-[120px] border border-white/15">
					<h3 className="text-[#edeff2] text-[16px] sm:text-[19px] font-medium font-['Poppins'] leading-tight">
						{destination.title}
					</h3>
					<p className="text-[#edeff2] text-[13px] sm:text-[16px] font-normal font-['Poppins'] mt-0.5 opacity-90">
						{destination.developer}
					</p>
				</div>

				{/* Right Glass Badge */}
				<div className="bg-white/10 backdrop-blur-md rounded-[12px] p-2 flex flex-col items-start border border-white/15">
					<span className="text-[#d4d5d8] text-[13px] sm:text-[16px] font-normal font-['Poppins'] leading-tight">
						Starts from
					</span>
					<span className="text-[#edeff2] text-[16px] sm:text-[19px] font-medium font-['Poppins'] mt-0.5 whitespace-nowrap">
						{priceVal}
						{priceUnit && (
							<span className="text-[13px] sm:text-[16px] font-normal font-['Poppins'] ml-1">
								{priceUnit}
							</span>
						)}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default DestinationCard;

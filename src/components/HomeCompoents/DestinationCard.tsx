import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import type { IVillage } from "../../app/services/crudVillage";

interface DestinationCardProps {
	destination: IVillage;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
	const { t, i18n } = useTranslation();
	const startingPrice = destination.startingPrice || 0;
	const millionPrice = startingPrice / 1000000;
	
	const priceVal = millionPrice.toLocaleString(i18n.language, {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	});
	const priceUnit = "EGP";

	const displayPriceVal = `${priceVal} ${t("prestigiousDestinations.million")}`;

	return (
		<Link
			to={`/home/${destination.slug}`}
			className="group relative flex flex-col justify-end p-4 sm:p-6 rounded-[12px] overflow-hidden shrink-0 w-[280px] sm:w-[384px] h-[320px] sm:h-[443px] transition-all duration-300 "
		>
			<img
				src={destination.coverImage}
				alt={destination.name}
				loading="lazy"
				decoding="async"
				sizes="(min-width: 768px) 33vw, 100vw"
				className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none"
			/>
			{/* Gradient overlay for readability */}
			<div className="absolute inset-0 z-[1] bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

			{/* Hover Arrow Badge */}
			<div className="absolute right-4 top-4 sm:right-6 sm:top-6 z-10 flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-[12px] bg-primary text-white shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:scale-105">
				<ArrowUpRight className="h-5 w-5 sm:h-6 sm:w-6" />
			</div>

			{/* Badges container at the bottom */}
			<div className="relative z-10 flex items-start justify-between gap-2 sm:gap-4 w-full">
				{/* Left Glass Badge */}
				<div className="bg-white/10 backdrop-blur-md rounded-[12px] p-2 flex flex-col items-start min-w-[90px] sm:min-w-[120px]  border border-white/15">
					<h3 className="text-[#edeff2] text-[13px] sm:text-[19px] font-medium font-['Poppins'] leading-tight break-words w-full">
						{destination.name}
					</h3>
					<p className="text-[#edeff2] text-[11px] sm:text-[16px] font-normal font-['Poppins'] mt-0.5 opacity-90 line-clamp-1">
						{destination.developerName}
					</p>
				</div>

				{/* Right Glass Badge */}
				<div className="bg-white/10 backdrop-blur-md rounded-[12px] p-2 flex flex-col items-start border border-white/15 shrink-0">
					<span className="text-[#d4d5d8] text-[11px] sm:text-[16px] font-normal font-['Poppins'] leading-tight">
						{t("prestigiousDestinations.startsFrom")}
					</span>
					<span className="text-[#edeff2] text-[13px] sm:text-[19px] font-medium font-['Poppins'] mt-0.5 whitespace-nowrap">
						{displayPriceVal}
						{priceUnit && (
							<span className="text-[10px] sm:text-[16px]  font-normal font-['Poppins']  ml-1 rtl:mr-1 rtl:ml-0">
								{priceUnit === "EGP" ? t("search.egp") : priceUnit}
							</span>
						)}
					</span>
				</div>
			</div>
		</Link>
	);
};

export default DestinationCard;

import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { DestinationData } from "../../interfaces";

interface DestinationCardProps {
	destination: DestinationData;
}

const DestinationCard = ({ destination }: DestinationCardProps) => {
	return (
		<Link
			to={`/home/${destination.slug}`}
className="group relative w-full max-w-[384px] aspect-[384/443] overflow-hidden rounded-md shadow-lg transition-all duration-500 hover:shadow-2xl"		>
			<img
				src={destination.image}
				alt={destination.title}
				loading="lazy"
				decoding="async"
				sizes="(min-width: 768px) 33vw, 100vw"
				className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 select-none"
			/>
			<div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

			{destination.hasArrowBadge && (
				<div className="absolute right-6 top-6 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-300 group-hover:scale-110">
					<ArrowUpRight className="h-5 w-5" />
				</div>
			)}

			<div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between gap-3 text-text-primary shadow-md">
				<div className="rounded-2xl border border-white/10 bg-black/40 p-4 backdrop-blur-md">
					<h3 className="text-lg font-bold tracking-wide">{destination.title}</h3>
					<p className="mt-0.5 text-xs font-medium text-text-primary">{destination.developer}</p>
				</div>
				<div className="rounded-2xl border border-white/10 bg-black/40 p-4 text-right backdrop-blur-md">
					<span className="block text-lg font-medium text-text-primary">Starts from</span>
					<span className="mt-0.5 block text-sm text-text-primary">{destination.price}</span>
				</div>
			</div>
		</Link>
	);
};

export default DestinationCard;

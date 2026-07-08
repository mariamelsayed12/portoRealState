import { motion } from "framer-motion";
import type { DestinationData } from "../../interfaces";
import DestinationStats from "../DestinationStats";
import Breadcrumb from "./DestinationBreadcrumb";

interface DestinationHeroProps {
	destination: DestinationData;
}


const DestinationHero = ({ destination }: DestinationHeroProps) => {
	return (
		<section className="relative isolate overflow-hidden rounded-b-[60px] md:rounded-b-[80px] lg:rounded-b-[100px] bg-[#0c1618] shadow-xl">
			<img
				src={destination.image}
				alt={destination.title}
				loading="eager"
				fetchPriority="high"
				decoding="async"
				sizes="100vw"
				className="absolute inset-0 h-full w-full object-cover object-center"
			/>
			<div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/65" />

			<div className="relative z-10 mx-auto flex min-h-[430px] max-w-7xl flex-col justify-end px-6 pb-10 pt-28 sm:px-8 lg:px-12 lg:pb-12">
				<motion.div
					initial={{ opacity: 0, y: 12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.3 }}
					className="max-w-3xl"
				>
					<Breadcrumb title={destination.breadcrumbLabel ?? destination.title} />

					<h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-[68px] leading-[1.1]">
						{destination.title}
					</h1>

					<div className="mt-10">
						<DestinationStats
							startingPrice={destination.startingPrice}
							rentalYield={destination.rentalYield}
							availableListings={destination.availableListings}
							developer={destination.developer}
						/>
					</div>
				</motion.div>
			</div>
		</section>
	);
};

export default DestinationHero;

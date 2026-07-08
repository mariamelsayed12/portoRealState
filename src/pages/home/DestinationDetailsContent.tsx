import type { DestinationData } from "../../interfaces";
import { destinations } from "../../data/destinations";
import DestinationCard from "../../components/HomeCompoents/DestinationCard";

interface DestinationDetailsContentProps {
	destinationSlug: string;
}

const DestinationDetailsContent = ({ destinationSlug }: DestinationDetailsContentProps) => {
	const destination = destinations.find((item) => item.slug === destinationSlug) as DestinationData | undefined;

	if (!destination) {
		return null;
	}

	const relatedDestinations = destinations.filter((item) => item.slug !== destination.slug).slice(0, 6);

	return (
		<section className="bg-background py-14 sm:py-16">
			<div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
				<div className="mb-8 flex items-end justify-between gap-4">
					<div>
						<h2 className="text-3xl font-semibold tracking-tight text-text-secondary sm:text-[40px]">
							Explore {destination.title} Properties
						</h2>
						<p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-darker sm:text-base">
							{destination.description}
						</p>
					</div>
				</div>

				<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{relatedDestinations.map((item) => (
						<DestinationCard key={item.id} destination={item} />
					))}
				</div>
			</div>
		</section>
	);
};

export default DestinationDetailsContent;

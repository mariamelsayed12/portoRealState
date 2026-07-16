// import { lazy, Suspense, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import DestinationHero from "../../components/HomeCompoents/DestinationHero";
// import DestinationNotFound from "../../components/HomeCompoents/DestinationNotFound";
// import { destinations } from "../../data";

// const DestinationDetailsContent = lazy(() => import("./DestinationDetailsContent"));

// const DestinationDetailsPage = () => {
// 	const { slug } = useParams<{ slug: string }>();
// 	const destination = destinations.find((item) => item.slug === slug);

// 	useEffect(() => {
// 		window.scrollTo({ top: 0, behavior: "smooth" });
// 	}, [slug]);

// 	if (!destination) {
// 		return <DestinationNotFound />;
// 	}

	
// 	return (
// 		<div>
// 			<DestinationHero destination={destination} />
// 			<Suspense
// 				fallback={
// 					<div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-12 text-center text-text-darker">
// 						Loading destination...
// 					</div>
// 				}
// 			>
// 				<DestinationDetailsContent destinationSlug={destination.slug} />
// 			</Suspense>
// 		</div>
// 	);
// };

// export default DestinationDetailsPage;

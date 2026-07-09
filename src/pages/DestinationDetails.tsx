import { useParams } from "react-router-dom";
import { destinations } from "../data";
import DestinationStats from "../components/DestinationStats";
import DestinationDetailsContent from "./home/DestinationDetailsContent";
import DestinationNotFound from "../components/HomeCompoents/DestinationNotFound";
import DestinationBreadcrumb from "../components/HomeCompoents/DestinationBreadcrumb";
import AmenitiesSection from "../components/Ui/AmenitiesSection";
import Image from "../components/Ui/Image";
import northcost from "../assets/HomePage/northcost.jpg";


const DestinationDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return <DestinationNotFound />;
  }

  return (
    <div className="w-full flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full h-[600px] sm:h-[700px] lg:h-[80vh] flex items-end justify-center rounded-b-[40px] overflow-hidden">
        {/* Background Image */}
        <img
          src={destination.image}
          alt={destination.title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-full flex flex-col justify-end pb-12 pt-32">
          {/* Breadcrumbs - using absolute positioning if needed, or flex layout */}
          <div className="absolute top-32 left-6 sm:left-8 lg:left-12">
             <DestinationBreadcrumb title={destination.title} />
          </div>

          <div className="flex flex-col gap-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              {destination.title}
            </h1>
            
            <DestinationStats 
              startingPrice={destination.startingPrice}
              rentalYield={destination.rentalYield}
              availableListings={destination.availableListings}
              developer={destination.developer}
            />
          </div>
        </div>
      </div>

      {/* Main Content - (Other sections can be placed here) */}
      <div className="flex-1">
          {/* You could render destination specific content here, or reuse existing home sections */}
          <DestinationDetailsContent destinationSlug={destination.slug} />
      </div>
     
      <AmenitiesSection/>

       {/* AmenitiesSection */}
      
      <section className="container py-10 ">
  <div className="overflow-hidden">
    <Image
      alt="village image"
      imageurl={northcost}
      className="h-[250px] w-full  md:h-[400px] object-cover lg:h-[526px]"
    />
  </div>
</section>
    </div>
  );
};

export default DestinationDetails;

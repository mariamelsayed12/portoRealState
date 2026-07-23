import { useParams } from "react-router-dom";
import { destinations } from "../data";
import DestinationStats from "../components/DestinationStats";
import DestinationDetailsContent from "./home/DestinationDetailsContent";
import DestinationNotFound from "../components/HomeCompoents/DestinationNotFound";
import DestinationBreadcrumb from "../components/HomeCompoents/DestinationBreadcrumb";
import AmenitiesSection from "../components/Ui/AmenitiesSection";
import LocationSection from "../components/Location/LocationSection";
import Image from "../components/Ui/Image";
import northcost from "../assets/HomePage/northcost.jpg";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";


const DestinationDetails = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return <DestinationNotFound />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full flex flex-col min-h-screen"
    >
      {/* Hero Section */}
      <div className="relative w-full h-auto min-h-[440px] sm:min-h-[460px] lg:h-[450px] flex items-end justify-center rounded-bl-[30px] rounded-br-[30px] sm:rounded-bl-[60px] sm:rounded-br-[60px] lg:rounded-bl-[99px] lg:rounded-br-[99px] overflow-hidden">
        {/* Background Image */}
        <img
          src={destination.image}
          alt={destination.titleKey ? t(destination.titleKey) : destination.title}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35 z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[120px] pt-[120px] pb-[48px] lg:h-full flex flex-col justify-end">
          {/* Breadcrumbs */}
          <div className="mb-[24px]">
             <DestinationBreadcrumb title={destination.breadcrumbLabelKey ? t(destination.breadcrumbLabelKey) : (destination.breadcrumbLabel || destination.title)} />
          </div>

          <div className="flex flex-col gap-[24px] items-start w-full">
            <h1 className="text-[32px] sm:text-[40px] font-medium text-[#f5f9fa] font-['Poppins'] leading-[normal]">
              {destination.titleKey ? t(destination.titleKey) : destination.title}
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
        {/* AmenitiesSection */}
        <div className="container py-12 px-6 sm:px-12 lg:px-[120px]">
          
              <AmenitiesSection/>
        </div>

      <section className="container max lg:pt-10 md:pt-8 pt-5">
        <div className="overflow-hidden">
          <Image
            alt={t("northCoastInvestment.landscape.alt")}
            imageurl={northcost}
            className="h-[250px] w-full  md:h-[400px] object-cover lg:h-[526px]"
          />
  </div>
</section>

      {/* Location Section */}
      <LocationSection destination={destination} />
      
      
    </motion.div>
  );
};

export default DestinationDetails;

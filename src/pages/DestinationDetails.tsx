import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { mapAmenitiesToFeatures } from "../utils";
import DestinationStats from "../components/DestinationStats";
import DestinationDetailsContent from "./home/DestinationDetailsContent";
import DestinationNotFound from "../components/HomeCompoents/DestinationNotFound";
import DestinationBreadcrumb from "../components/HomeCompoents/DestinationBreadcrumb";
import AmenitiesSection from "../components/Ui/AmenitiesSection";
import LocationSection from "../components/Location/LocationSection";
import { motion } from "framer-motion";
import ImageGallery from "../components/Ui/ImageGallery";
import { useGetVillageByIdQuery } from "../app/services/crudVillage";
import Loading from "../components/Ui/loading/loading";
import { useTranslation } from "react-i18next";


const DestinationDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();

    const { data: village, isLoading } = useGetVillageByIdQuery({ id: slug || "", lang: i18n.language });

  const mappedAmenities = useMemo(() => {
    return village?.amenities ? mapAmenitiesToFeatures(village.amenities) : [];
  }, [village?.amenities]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-[100vh]">
             <Loading />    
       </div>
    );
  }

  if (!village) {
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
          src={village.coverImage}
          alt={village.name}
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/35 z-10" />

        {/* Content Container */}
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-6 sm:px-12 lg:px-[120px] pt-[120px] pb-[48px] lg:h-full flex flex-col justify-end">
          {/* Breadcrumbs */}
          <div className="mb-[24px]">
             <DestinationBreadcrumb title={village.slug} />
          </div>

          <div className="flex flex-col gap-[24px] items-start w-full">
            <h1 className="text-[32px] sm:text-[40px] font-medium text-[#f5f9fa] font-['Poppins'] leading-[normal]">
              {village.name}
            </h1>
            
            <DestinationStats 
              startingPrice={village.startingPrice}
              rentalYield={village.rentalYield}
              developerName={village.developerName}
            />
          </div>
        </div>
      </div>

      {/* Main Content - (Other sections can be placed here) */}
      <div className="flex-1">
          {/* You could render destination specific content here, or reuse existing home sections */}
          <DestinationDetailsContent village={village} />
      </div>
      {/* AmenitiesSection */}
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        <AmenitiesSection features={mappedAmenities} />
      </div>

      <section className="w-full lg:pt-10 md:pt-8 pt-5">
        <ImageGallery
          images={village.galleryImages || [village.coverImage]}
          alt={village.name}
        />
      </section>

      {/* Location Section */}
      <LocationSection destination={village} />
      
      
    </motion.div>
  );
};

export default DestinationDetails;


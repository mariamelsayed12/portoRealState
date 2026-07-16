import React, { useState, useMemo, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { destinations, units } from "../data";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../app/store";
import { addToFavAction, removeFromFavAction } from "../app/feature/favoriteUnitSlice";
import UnitCard from "../components/UnitCard";
import Image from "../components/Ui/Image";
import {
  Bath,
  BedDouble,
  MapPin,
  Ruler,
  ChevronUp,
  ChevronDown,
  Phone,
  Home,
  Compass,
  Layers,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";
import { FaHeart, FaRegHeart, FaWhatsapp } from "react-icons/fa6";
import AmenitiesSection from "../components/Ui/AmenitiesSection";
import DestinationBreadcrumb from "../components/HomeCompoents/DestinationBreadcrumb";
import { motion } from "framer-motion";

const PropertyDetails: React.FC = () => {
  const { destinationSlug, propertySlug } = useParams<{
    destinationSlug: string;
    propertySlug: string;
  }>();

  const dispatch = useAppDispatch();
  const { favUnite } = useSelector((state: RootState) => state.favUnit);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: "smooth" });
    }
  };

  // Find destination and property unit dynamically
  const destination = useMemo(() => {
    return destinations.find((d) => d.slug === destinationSlug);
  }, [destinationSlug]);

  const property = useMemo(() => {
    return units.find((u) => u.id === propertySlug);
  }, [propertySlug]);

  // Pricing tab selector state ("Installment" | "Cash")
  const [pricingMode, setPricingMode] = useState<"Installment" | "Cash">("Installment");

  // Fallback gallery images if none exist on property
  const galleryImages = useMemo(() => {
    if (property?.images && property.images.length > 0) {
      return property.images;
    }
    // Generate beautiful visual gallery defaults
    return [
      property?.image || "",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80",
    ].filter(Boolean);
  }, [property]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Redux Favorites sync
  const isFavorite = useMemo(() => {
    if (!property) return false;
    return favUnite.some((item) => item.id === property.id);
  }, [property, favUnite]);

  const handleFavoriteToggle = () => {
    if (!property) return;
    if (isFavorite) {
      dispatch(removeFromFavAction(property.id));
    } else {
      dispatch(addToFavAction(property));
    }
  };

  // Gallery Navigation
  const scrollThumbnails = (direction: "up" | "down") => {
    if (direction === "up") {
      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
    } else {
      setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
    }
  };

  // Find related units (other units from same destination, cap at 4)
  const relatedProperties = useMemo(() => {
    if (!property) return [];
    return units
      .filter((u) => u.destination.slug === destinationSlug && u.id !== property.id)
      .slice(0, 4);
  }, [destinationSlug, property]);

  if (!destination || !property) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 text-center">
        <h2 className="text-2xl font-bold text-text-secondary">Property not found</h2>
        <p className="mt-2 text-sm text-[#7D8D93]">
          The property you are looking for does not exist or has been removed.
        </p>
        <Link
          to="/home"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-95 transition-colors cursor-pointer"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  // Extract specs details, leveraging actual unit data with standard defaults
  const areaSpec = property.stats.find((s) => s.icon === "area")?.value || "145 sq.m";
  const bedSpec = property.stats.find((s) => s.icon === "bed")?.value || "3";
  const bathSpec = property.stats.find((s) => s.icon === "bath")?.value || "3";
  const finishingSpec = property.finishing || "Fully furnished";
  const deliverySpec = property.delivery || property.badges.find((b) => b.includes("202"))?.replace("Delivery in ", "") || "2030";
  const orientationSpec = property.orientation || "Sea view";

  // Derived or default pricing fields
  const downPayment = property.downPayment || "200,000 EGP";
  const monthlyInstallment = property.monthlyInstallment || "125,000 EGP";
  const installmentYears = property.installmentYears || "4 year installment";

  // Description copy
  const descriptionText =
    property.description ||
    `A serene ${bedSpec}-bedroom chalet framed by uninterrupted Mediterranean views, set within ${destination.title}'s most private beachfront enclave. Designed for the discerning buyer, this residence balances daily liveability with the architectural restraint that defines Porto's most desirable addresses.`;

  // Specs Cards config for clean mapping
  const specsConfig = [
    { value: areaSpec, label: "Area", icon: Ruler },
    { value: bedSpec, label: "Bedrooms", icon: BedDouble },
    { value: bathSpec, label: "Bathrooms", icon: Bath },
    { value: finishingSpec, label: "Finishing", icon: Layers },
    { value: deliverySpec, label: "Delivery", icon: Home },
    { value: orientationSpec, label: "Orientation", icon: Compass },
  ];



  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="w-full flex flex-col min-h-screen bg-background lg:pt-36 pt-24 md:pt-36 pb-0"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full flex-1">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <DestinationBreadcrumb
            title={destination.title}
            propertyTitle={property.title}
            destinationSlug={destination.slug}
            variant="light"
          />
        </div>

        {/* Gallery Section */}
        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[24px] items-start w-full">
          {/* Main Large Hero Image */}
          <div className="relative w-full lg:flex-1 h-[240px] sm:h-[350px] lg:h-[365px] rounded-[12px] overflow-hidden bg-[#dfeef1] group shrink-0 lg:shrink">
            <Image
              imageurl={galleryImages[activeImageIndex]}
              alt={property.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
            {/* Gallery Top Badges */}
            <div className="absolute top-[16px] left-[16px] flex flex-wrap gap-[8px] z-10">
              {property.badges.map((badge) => (
                <span
                  key={badge}
                  className="bg-[rgba(9,1,1,0.25)] backdrop-blur-sm px-[16px] py-[8px] rounded-[99px] text-[#edeff2] font-['Poppins'] font-medium text-[14px] leading-none"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* Favorite Toggler Button */}
            <button
              onClick={handleFavoriteToggle}
              type="button"
              className="absolute top-[16px] right-[16px] size-[36px] flex items-center justify-center rounded-[12px] bg-[#1e8cab] text-[#f5f6fa] hover:bg-[#1a7a96] transition-colors cursor-pointer z-10"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <FaHeart className="size-[20px] text-white" />
              ) : (
                <FaRegHeart className="size-[20px] text-white" />
              )}
            </button>
          </div>

          {/* Vertical Thumbnail Sidebar Container (Horizontal on Mobile/Tablet) */}
          <div className="w-full lg:w-[78px] flex flex-row lg:flex-col gap-[8px] items-center justify-center shrink-0">
            {/* Scroll Up / Left Button */}
            <button
              onClick={() => scrollThumbnails("up")}
              className="flex w-[36px] h-[36px] items-center justify-center rounded-[12px] border border-[#747474] bg-white text-[#747474] hover:text-[#1e8cab] hover:border-[#1e8cab] transition-colors cursor-pointer shrink-0"
              aria-label="Previous image"
            >
              <ChevronUp className="hidden lg:block size-[16px]" />
              <ArrowLeft className="block lg:hidden size-[16px] text-[#747474]" />
            </button>

            {/* Thumbnails Row/Column */}
            <div className="flex flex-row lg:flex-col gap-[8px] overflow-x-auto lg:overflow-x-visible scrollbar-none py-1 w-full justify-center lg:justify-start items-center">
              {galleryImages.map((img, idx) => {
                const isActive = idx === activeImageIndex;
                if (isActive) {
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className="border border-[#1e8cab] p-[4px] rounded-[8px] h-[52px] w-[68px] lg:h-[60px] lg:w-[78px] shrink-0 overflow-hidden bg-white cursor-pointer"
                    >
                      <div className="rounded-[4px] overflow-hidden w-full h-full">
                        <Image
                          imageurl={img}
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </button>
                  );
                }
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className="h-[44px] w-[58px] lg:h-[52px] lg:w-[78px] rounded-[4px] overflow-hidden shrink-0 bg-white cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      imageurl={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                );
              })}
            </div>

            {/* Scroll Down / Right Button */}
            <button
              onClick={() => scrollThumbnails("down")}
              className="flex w-[36px] h-[36px] items-center justify-center rounded-[12px] border border-[#747474] bg-white text-[#747474] hover:text-[#1e8cab] hover:border-[#1e8cab] transition-colors cursor-pointer shrink-0"
              aria-label="Next image"
            >
              <ChevronDown className="hidden lg:block size-[16px]" />
              <ArrowRight className="block lg:hidden size-[16px] text-[#747474]" />
            </button>
          </div>
        </div>

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* Left Block: Description and Specs Grid */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Location Tag */}
            <div className="flex items-center gap-1 text-sm font-semibold text-primary mb-2">
              <MapPin className="w-4 h-4" />
              <span>{destination.title}</span>
            </div>

            {/* Property Title */}
            <h1 className="text-[28px] sm:text-[32px] font-bold text-text-secondary leading-tight mb-5">
              {property.title} in {destination.title}
            </h1>

            {/* Description Paragraph */}
            <p className="text-[#58696F] text-[15px] sm:text-base leading-relaxed mb-8">
              {descriptionText}
            </p>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-5">
              {specsConfig.map((spec, index) => {
                const Icon = spec.icon;
                return (
                  <div
                    key={index}
                    className="bg-white border border-[#E8EFF1] rounded-md p-5 flex flex-col justify-between h-[100px] shadow-[0_4px_12px_rgba(73,95,104,0.02)]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[15px] sm:text-base font-semibold text-text-secondary">
                        {spec.value}
                      </span>
                      <Icon className="w-4 h-4 text-primary opacity-80" />
                    </div>
                    <span className="text-xs font-semibold text-[#7D8D93] tracking-wide">
                      {spec.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Pricing Actions Widget */}
          <div className="lg:col-span-5 bg-white border border-[#E8EFF1] rounded-[28px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
            {/* Tabs & Period indicator */}
            <div className="flex items-center justify-between mb-6 border-b border-[#F2F5F6] pb-4">
              <div className="flex bg-light-primary p-1 rounded-full">
                <button
                  onClick={() => setPricingMode("Installment")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    pricingMode === "Installment"
                      ? "bg-white text-text-secondary shadow-sm"
                      : "text-[#58696F] hover:text-text-secondary"
                  }`}
                >
                  Installment
                </button>
                <button
                  onClick={() => setPricingMode("Cash")}
                  className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all ${
                    pricingMode === "Cash"
                      ? "bg-white text-text-secondary shadow-sm"
                      : "text-[#58696F] hover:text-text-secondary"
                  }`}
                >
                  Cash
                </button>
              </div>
              <span className="text-xs font-semibold text-[#58696F]">
                {pricingMode === "Installment" ? installmentYears : "Immediate payment"}
              </span>
            </div>

            {/* Pricing Details Display Container */}
            <div className="bg-[#F5F9FA] rounded-[20px] p-4 flex justify-between items-center mb-6">
              {pricingMode === "Installment" ? (
                <>
                  {/* Price */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-xs font-semibold text-[#7D8D93] mb-1">Price</span>
                    <span className="text-[13px] sm:text-sm font-bold text-text-secondary">
                      {property.price}
                    </span>
                  </div>
                  {/* Separator */}
                  <div className="w-[1px] h-10 bg-[#D4D5D8]" />
                  {/* Down Payment */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-xs font-semibold text-[#7D8D93] mb-1">Down Payment</span>
                    <span className="text-[13px] sm:text-sm font-bold text-text-secondary">
                      {downPayment}
                    </span>
                  </div>
                  {/* Separator */}
                  <div className="w-[1px] h-10 bg-[#D4D5D8]" />
                  {/* Monthly Installment */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="text-xs font-semibold text-[#7D8D93] mb-1">Monthly</span>
                    <span className="text-[13px] sm:text-sm font-bold text-text-secondary">
                      {monthlyInstallment}
                    </span>
                  </div>
                </>
              ) : (
                <div className="w-full flex flex-col items-center text-center py-2">
                  <span className="text-xs font-semibold text-[#7D8D93] mb-1">Cash Price</span>
                  <span className="text-lg font-bold text-text-secondary">{property.price}</span>
                  <span className="text-[11px] text-[#7D8D93] mt-1">
                    (Standard cash discount may apply, inquire details)
                  </span>
                </div>
              )}
            </div>

            {/* Call Actions Row */}
            <div className="grid grid-cols-2 gap-3">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/20113333333?text=Hi,%20I'm%20interested%20in%20${encodeURIComponent(
                  property.title
                )}%20at%20${encodeURIComponent(destination.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 border-[#25D366] text-[#25D366] text-sm font-semibold hover:bg-[#25D366]/5 transition-all active:scale-[0.98] cursor-pointer"
              >
                <FaWhatsapp className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Call Us Button */}
              <a
                href="tel:+20113333333"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-white text-sm font-semibold hover:bg-opacity-95 transition-all active:scale-[0.98] cursor-pointer"
              >
                <Phone className="w-4 h-4 fill-current" />
                <span>Call Us</span>
              </a>
            </div>
          </div>
        </div>

        {/* Amenities Section */}

        <div className=" px-6 py-12 ">
        <AmenitiesSection/>
        </div>

        {/* Related Properties Carousel/Grid Section */}
        {relatedProperties.length > 0 && (
          <div className="mt-16 sm:mt-20 pb-16 ">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-text-secondary">
                You may also like
              </h2>
              <div className="flex gap-2">
                <button 
                  onClick={scrollLeft}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-border bg-white text-[#7D8D93] hover:text-primary hover:border-primary transition-all shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-primary" />
                </button>
                <button 
                  onClick={scrollRight}
                  className="w-8 h-8 flex items-center justify-center rounded-md border border-border bg-white text-[#7D8D93] hover:text-primary hover:border-primary transition-all shadow-sm cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4 text-primary" />
                </button>
              </div>
            </div>
            <div
              ref={scrollContainerRef}
              className="flex w-full overflow-x-auto gap-6 scrollbar-none pb-4 scroll-smooth"
            >
              {relatedProperties.map((unit) => (
                <UnitCard key={unit.id} card={unit} className="w-[282px] sm:w-[382px] shrink-0" />
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PropertyDetails;

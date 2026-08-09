import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { useGetPropertyByIdQuery, useGetPropertyQuery } from "../app/services/crudproperties";
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
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { FaHeart, FaRegHeart, FaWhatsapp } from "react-icons/fa6";
import AmenitiesSection from "../components/Ui/AmenitiesSection";
import { mapAmenitiesToFeatures, formatDeliveryStatus, getTranslatedBadge, isRentListing } from "../utils";
import DestinationBreadcrumb from "../components/HomeCompoents/DestinationBreadcrumb";
import PropertyDetailsSkeleton from "../components/PropertyDetailsSkeleton";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useGetVillageByIdQuery } from "../app/services/crudVillage";
import EmptyState from "../components/Ui/EmptyState";

const PropertyDetails: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const navigate = useNavigate();
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


  const { data: property, isLoading: isUnitLoading } = useGetPropertyByIdQuery({id:propertySlug || "",lang:i18n.language});
  const { data: allProperties = [] } = useGetPropertyQuery({lang:i18n.language});
  const {data:destination, isLoading: isDestinationLoading} =useGetVillageByIdQuery({id:destinationSlug || "",lang:i18n.language});

  const mappedAmenities = useMemo(() => {
    return property?.amenities ? mapAmenitiesToFeatures(property.amenities) : [];
  }, [property?.amenities]);

  // Pricing tab selector state ("Installment" | "Cash")
  const [pricingMode, setPricingMode] = useState<"Installment" | "Cash">("Installment");

  // Sync pricingMode with backend property data
  useEffect(() => {
    if (property) {
      if (property.paymentModel?.toLowerCase() === "cash") {
        setPricingMode("Cash");
      } else {
        setPricingMode("Installment");
      }
    }
  }, [property]);

  const hasInstallment = property ? property.paymentModel?.toLowerCase() !== "cash" : true;
  const hasCash = property ? property.paymentModel?.toLowerCase() !== "installment" : true;

  // Combine coverImage and gallery images, avoiding duplicates, with fallback to coverImage
  const galleryImages = useMemo(() => {
    const list: string[] = [];
    if (property?.coverImage) {
      list.push(property.coverImage);
    }
    if (property?.images && Array.isArray(property.images)) {
      property.images.forEach((img) => {
        if (img && typeof img === "string" && !list.includes(img)) {
          list.push(img);
        }
      });
    }
    return list;
  }, [property]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Redux Favorites sync
  const isFavorite = useMemo(() => {
    if (!property) return false;
    return favUnite.some((item) => item._id === property._id);
  }, [property, favUnite]);

  const detailBadges = useMemo(() => {
    if (!property) return [];
    const rawDelivery = formatDeliveryStatus(property.deliveryDate);
    return [
      property.listingType ? getTranslatedBadge(property.listingType, t) : "",
      rawDelivery ? getTranslatedBadge(rawDelivery, t) : "",
    ].filter(Boolean);
  }, [property, t]);

  const displayCashPrice = useMemo(() => {
    if (!property) return "";
    return property.cashPrice ? `${property.cashPrice.toLocaleString()} EGP` : "Contact for Price";
  }, [property]);

  const handleFavoriteToggle = () => {
    if (!property) return;
    if (isFavorite) {
      dispatch(removeFromFavAction(property._id));
    } else {
      dispatch(addToFavAction(property));
    }
  };

  // Gallery Navigation
  const scrollThumbnails = (direction: "up" | "down") => {
    if (galleryImages.length === 0) return;
    if (direction === "up") {
      setActiveImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
    } else {
      setActiveImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
    }
  };

  // Find related units based on hierarchical similarity scoring:
  // Same Listing Type: +10 pts (Primary)
  // Same Village: +3 pts (Secondary)
  // Same Price: +2 pts (Tertiary)
  const relatedProperties = useMemo(() => {
    if (!property) return [];
    return allProperties
      .map((u) => {
        // Exclude the current property itself
        if (u._id === property._id) return { property: u, score: 0 };

        let score = 0;

        // 1. Same Listing Type (+10 pts)
        const sameListingType = 
          u.listingType && 
          property.listingType && 
          u.listingType.trim().toLowerCase() === property.listingType.trim().toLowerCase();
        if (sameListingType) score += 10;

        // 2. Same Village (+3 pts)
        const sameVillage = 
          (u.village?._id && property.village?._id && u.village._id === property.village._id) ||
          (u.village?.slug && property.village?.slug && u.village.slug === property.village.slug) ||
          (u.village?.slug && u.village.slug === destinationSlug);
        if (sameVillage) score += 3;

        // 3. Same Price (+2 pts)
        let samePrice = false;
        if (isRentListing(property.listingType)) {
          samePrice = u.insurance !== undefined && property.insurance !== undefined && u.insurance === property.insurance;
        } else {
          const isCurrentCash = property.paymentModel?.toLowerCase() === "cash";
          const isCandidateCash = u.paymentModel?.toLowerCase() === "cash";
          if (isCurrentCash && isCandidateCash) {
            samePrice = u.cashPrice !== undefined && property.cashPrice !== undefined && u.cashPrice === property.cashPrice;
          } else if (!isCurrentCash && !isCandidateCash) {
            samePrice = u.installmentPrice !== undefined && property.installmentPrice !== undefined && u.installmentPrice === property.installmentPrice;
          }
        }
        if (samePrice) score += 2;

        return { property: u, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((item) => item.property)
      .slice(0, 4);
  }, [destinationSlug, property, allProperties]);

  if (isUnitLoading || isDestinationLoading) {
    return <PropertyDetailsSkeleton />;
  }

  if (!destination || !property) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8 lg:px-12 text-center">
        <EmptyState
          title={t("propertyDetails.notFound.description")}
          actionLabel={t("propertyDetails.notFound.backBtn")}
          onAction={() => navigate("/home")}
        />
      </div>
    );
  }

  const getDeliveryYear = (dateStr?: string) => {
    if (!dateStr) return "";
    if (dateStr.includes("-")) {
      return dateStr.split("-")[0];
    }
    return dateStr;
  };

  // Extract specs details, leveraging actual unit data with NO static defaults
  const areaSpec = property.area ? `${property.area} sqm` : "";
  const bedSpec = property.bedrooms ? `${property.bedrooms}` : "";
  const bathSpec = property.bathrooms ? `${property.bathrooms}` : "";
  const finishingSpec = property.finishingStatus || "";
  const deliverySpec = getDeliveryYear(property.deliveryDate) || "";
  const orientationSpec = property.orientation || "";

  // Derived pricing fields with NO static defaults
  const downPayment = property.downPaymentAmount ? `${property.downPaymentAmount.toLocaleString()} EGP` : "";
  const monthlyInstallment = property.installmentValue ? `${property.installmentValue.toLocaleString()} EGP` : "";
  const installmentYears = property.installmentPeriod || "";

  // Description copy (NO static fallback template)
  const descriptionText = property.description || "";

  // Specs Cards config for clean mapping, filtering out empty values
  const specsConfig = [
    { value: areaSpec, label: t("propertyDetails.specs.labels.area"), icon: Ruler },
    { value: bedSpec, label: t("propertyDetails.specs.labels.bedrooms"), icon: BedDouble },
    { value: bathSpec, label: t("propertyDetails.specs.labels.bathrooms"), icon: Bath },
    { value: finishingSpec, label: t("propertyDetails.specs.labels.finishing"), icon: Layers },
    { value: deliverySpec, label: t("propertyDetails.specs.labels.delivery"), icon: Home },
    { value: orientationSpec, label: t("propertyDetails.specs.labels.orientation"), icon: Compass },
  ].filter((spec) => Boolean(spec.value));

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
            title={destination.name}
            propertyTitle={property.name}
            destinationSlug={destination.slug}
            variant="light"
          />
        </div>

        {/* Gallery Section */}
        <div className="flex flex-col lg:flex-row gap-[16px] lg:gap-[24px] items-start w-full">
          {/* Main Large Hero Image */}
          <div className="relative w-full lg:flex-1 h-[240px] sm:h-[350px] lg:h-[456px] rounded-[12px] overflow-hidden bg-[#dfeef1] group shrink-0 lg:shrink">
            <Image
              imageurl={galleryImages[activeImageIndex]}
              alt={property.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
            {/* Gallery Top Badges */}
            <div className="absolute top-[16px] left-[16px] flex flex-wrap gap-[8px] z-10">
              {detailBadges.map((badge) => (
                <span
                  key={badge}
                  className="bg-[rgba(9,1,1,0.45)] backdrop-blur-sm px-[16px] py-[8px] rounded-[99px] text-[#edeff2] font-['Poppins'] font-medium text-[14px] leading-none"
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
              aria-label={isFavorite ? t("propertyDetails.gallery.removeFromFav") : t("propertyDetails.gallery.addToFav")}
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
              aria-label={t("propertyDetails.gallery.prevImage")}
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
                          alt={t("propertyDetails.gallery.thumbnailAlt", { index: idx + 1 })}
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
                      alt={t("propertyDetails.gallery.thumbnailAlt", { index: idx + 1 })}
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
              aria-label={t("propertyDetails.gallery.nextImage")}
            >
              <ChevronDown className="hidden lg:block size-[16px]" />
              <ArrowRight className="block lg:hidden size-[16px] text-[#747474]" />
            </button>
          </div>
        </div>

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-start">
          {/* Left Block: Description and Specs Grid */}
          <div className="lg:col-span-7 flex flex-col gap-[24px]">
            {/* Location and Title Block */}
            <div className="flex flex-col gap-[12px]">
              {/* Location Tag */}
              <div className="flex items-center gap-[8px]">
                <MapPin className="w-[20px] h-[20px] text-[#464646]" />
                <span className="font-['Poppins'] font-normal text-[14px] text-[#464646]">
                  {destination.name}
                </span>
              </div>

              {/* Property Title */}
              <h1 className="font-['Poppins'] font-medium text-[19px] text-[#141414] leading-tight">
                {property.name} - {destination.name}
              </h1>
            </div>

            {/* Description Paragraph */}
            {descriptionText && (
              <p className="font-['Poppins'] font-normal text-[16px] text-[#464646] leading-relaxed w-full">
                {descriptionText}
              </p>
            )}

            {/* Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-[16px] w-full">
              {specsConfig.map((spec, index) => {
                return (
                  <div
                    key={index}
                    className="bg-white border border-[#d4d5d8] rounded-[12px] px-[16px] py-[8px] flex flex-col gap-[8px] items-start justify-center min-h-[76px]"
                  >
                    <p className="font-['Poppins'] font-normal text-[16px] text-[#141414] truncate w-full">
                      {spec.value}
                    </p>
                    <p className="font-['Poppins'] font-medium text-[16px] text-[#464646] truncate w-full">
                      {spec.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Block: Pricing Actions Widget */}
          <div className="lg:col-span-5 bg-white border border-[#EDEFF2] rounded-[12px] p-[16px] shadow-[0px_2px_6.3px_1px_rgba(0,0,0,0.14)] lg:top-36 flex flex-col gap-[40px]">
            {/* Header / Switcher row */}
            <div className="flex flex-col gap-[32px] w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-[16px]">
                  <span className="font-['Poppins'] font-medium text-[16px] text-[#141414]">
                    {t("propertyDetails.pricing.pricingHeader", "Pricing")}
                  </span>
                  {/* Switcher: only show if Buy property AND has both payment models */}
                  {!isRentListing(property.listingType) && hasInstallment && hasCash && (
                    <div className="border border-[#d4d5d8] flex h-[32px] items-center rounded-[12px] bg-white overflow-hidden p-0.5">
                      <button
                        onClick={() => setPricingMode("Installment")}
                        className={`h-[28px] flex items-center justify-center px-[8px] rounded-[10px] font-['Poppins'] font-medium text-[14px] md:text-[16px] transition-all cursor-pointer ${
                          pricingMode === "Installment"
                            ? "bg-[#edeff2] text-[#141414]"
                            : "text-[#141414] hover:text-primary"
                        }`}
                      >
                        {t("propertyDetails.pricing.installmentTab")}
                      </button>
                      <button
                        onClick={() => setPricingMode("Cash")}
                        className={`h-[28px] flex items-center justify-center px-[8px] rounded-[10px] font-['Poppins'] font-medium text-[14px] md:text-[16px] transition-all cursor-pointer ${
                          pricingMode === "Cash"
                            ? "bg-[#edeff2] text-[#141414]"
                            : "text-[#141414] hover:text-primary"
                        }`}
                      >
                        {t("propertyDetails.pricing.cashTab")}
                      </button>
                    </div>
                  )}
                </div>
                {/* Right side tag/label */}
                {isRentListing(property.listingType) ? (
                  null
                ) : pricingMode === "Cash" ? (
                  <div className="bg-[#edf6eb] flex items-center px-[8px] py-[4px] rounded-[12px] shrink-0">
                    <span className="font-['Poppins'] font-medium text-[14px] text-[#141414]">
                      {t("propertyDetails.pricing.higherProfit", "Higher profit")}
                    </span>
                  </div>
                ) : (
                  <span className="font-['Poppins'] font-medium text-[16px] text-[#464646]">
                    {installmentYears}
                  </span>
                )}
              </div>

              {/* Pricing Details Display Container */}
              {isRentListing(property.listingType) ? (
                /* Rent Property Layout */
                <div className="bg-[#f5f9fa] border border-[#d4d5d8] rounded-[12px] p-[12px] flex gap-[12px] items-center justify-center w-full">
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <span className="font-['Poppins'] font-medium text-[16px] text-[#464646] mb-2">
                      {t("propertyDetails.pricing.monthlyRent", "Monthly Rent")}
                    </span>
                    <span className="font-['Poppins'] font-medium text-[19px] text-[#141414]">
                      Contact for Price
                    </span>
                  </div>
                  {/* Vertical separator */}
                  <div className="w-[1px] h-[69px] bg-[#d4d5d8] shrink-0" />
                  <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <span className="font-['Poppins'] font-medium text-[16px] text-[#464646] mb-2">
                      {t("propertyDetails.pricing.insurance", "Insurance")}
                    </span>
                    <span className="font-['Poppins'] font-medium text-[19px] text-[#141414]">
                      {property.insurance ? `${property.insurance.toLocaleString()} EGP` : "Contact for Price"}
                    </span>
                  </div>
                </div>
              ) : pricingMode === "Installment" ? (
                /* Installment Layout */
                <div className="bg-[#f5f9fa] border border-[#d4d5d8] rounded-[12px] p-[12px] flex justify-between items-center w-full">
                  {/* Price */}
                  <div className="flex-1 flex flex-col items-center text-center">
                    <span className="font-['Poppins'] font-medium text-[16px] text-[#464646] mb-2">
                      {t("propertyDetails.pricing.price")}
                    </span>
                    <span className="font-['Poppins'] font-medium text-[16px] text-[#141414]">
                      {property.installmentPrice ? `${property.installmentPrice.toLocaleString()} EGP` : "Contact for Price"}
                    </span>
                  </div>
                  {/* Down Payment */}
                  {downPayment && (
                    <>
                      {/* Separator */}
                      <div className="w-[1px] h-[40px] bg-[#d4d5d8]" />
                      <div className="flex-1 flex flex-col items-center text-center">
                        <span className="font-['Poppins'] font-medium text-[16px] text-[#464646] mb-2">
                          {t("propertyDetails.pricing.downPayment")}
                        </span>
                        <span className="font-['Poppins'] font-medium text-[16px] text-[#141414]">
                          {downPayment}
                        </span>
                      </div>
                    </>
                  )}
                  {/* Monthly Installment */}
                  {monthlyInstallment && (
                    <>
                      {/* Separator */}
                      <div className="w-[1px] h-[40px] bg-[#d4d5d8]" />
                      <div className="flex-1 flex flex-col items-center text-center">
                        <span className="font-['Poppins'] font-medium text-[16px] text-[#464646] mb-2">
                          {t("propertyDetails.pricing.monthly")}
                        </span>
                        <span className="font-['Poppins'] font-medium text-[16px] text-[#141414]">
                          {monthlyInstallment}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                /* Cash Only / Cash Mode Layout */
                <div className="bg-[#f5f9fa] border border-[#d4d5d8] rounded-[12px] p-[12px] flex flex-col gap-2 w-full">
                  <div className="flex justify-between items-center w-full">
                    <span className="font-['Poppins'] font-medium text-[16px] text-[#464646]">
                      {t("propertyDetails.pricing.totalPrice", "Total Price")}
                    </span>
                    <span className="font-['Poppins'] font-medium text-[19px] text-[#141414]">
                      {displayCashPrice}
                    </span>
                  </div>
                  <div className="text-[12px] text-[#464646] text-center mt-2 w-full">
                    {t("propertyDetails.pricing.cashNote")}
                  </div>
                </div>
              )}
            </div>

            {/* Call Actions Row */}
            <div className="flex gap-[15px] items-center w-full">
              {/* WhatsApp Button */}
              <a
                href={`https://wa.me/20113333333?text=${encodeURIComponent(
                  t("propertyDetails.whatsappMsg", { propertyTitle:  property.name, destinationTitle: destination.name })
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#747474] flex-1 flex gap-[8px] h-[48px] items-center justify-center px-[24px] py-[8px] rounded-[12px] text-[#44992e] text-[16px] font-['Poppins'] font-medium hover:bg-[#44992e]/5 hover:border-[#44992e] transition-all cursor-pointer text-center whitespace-nowrap"
              >
                <FaWhatsapp className="w-[24px] h-[24px] text-[#44992e]" />
                <span>{t("propertyDetails.actions.whatsapp")}</span>
              </a>

              {/* Call Us Button */}
              <a
                href="tel:+20113333333"
                className="bg-[#1e8cab] flex-1 flex gap-[8px] h-[48px] items-center justify-center px-[24px] py-[8px] rounded-[12px] text-[#f5f6fa] text-[16px] font-['Poppins'] font-medium hover:bg-[#1a7a96] transition-all cursor-pointer text-center whitespace-nowrap"
              >
                <Phone className="w-[24px] h-[24px] text-[#f5f6fa] fill-current" />
                <span>{t("propertyDetails.actions.callUs")}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className="px-6 py-12">
          <AmenitiesSection features={mappedAmenities} />
        </div>
      </div> {/* Close main constrained container */}

      {/* Related Properties Carousel/Grid Section */}
      {relatedProperties.length > 0 && (
        <div className="w-full bg-[#E9F4F7] py-[60px] mt-16 sm:mt-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 w-full">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h2 className="font-['Poppins'] font-medium text-[24px] sm:text-[32px] text-[#141414]">
                {t("propertyDetails.relatedTitle")}
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={isRtl ? scrollRight : scrollLeft}
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-[12px] border border-[#747474] text-primary hover:border-primary transition-all shadow-sm cursor-pointer"
                >
                  {isRtl ? (
                    <ChevronRight className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  )}
                </button>
                <button
                  onClick={isRtl ? scrollLeft : scrollRight}
                  className="w-[40px] h-[40px] flex items-center justify-center rounded-[12px] border border-[#747474] text-primary hover:border-primary transition-all shadow-sm cursor-pointer"
                >
                  {isRtl ? (
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-primary" />
                  )}
                </button>
              </div>
            </div>
            <div
              ref={scrollContainerRef}
              className="flex w-full overflow-x-auto gap-6 scrollbar-none pb-4 scroll-smooth"
            >
              {relatedProperties.map((unit) => (
                <UnitCard key={unit._id} card={unit} className="w-[282px] sm:w-[382px] shrink-0" />
              ))}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default PropertyDetails;

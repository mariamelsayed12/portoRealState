import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import type { PropertyCardData } from "../interfaces";
import Image from "./Ui/Image";
import { useAppDispatch, type RootState } from "../app/store";
import { useSelector } from "react-redux";
import {
  addToFavAction,
  removeFromFavAction,
} from "../app/feature/favoriteUnitSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const statIconMap = {
  location: MapPin,
  bed: BedDouble,
  bath: Bath,
  area: Ruler,
} as const;

const UnitCard = ({
  card,
  className = "w-[282px] sm:w-[382px] shrink-0",
}: {
  card: PropertyCardData;
  className?: string;
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const dispatch = useAppDispatch();
  const { favUnite } = useSelector((state: RootState) => state.favUnit);
  const [paymentMode, setPaymentMode] = useState<"installment" | "cash">(
    "installment"
  );

  const isFavorite = favUnite.some((item) => item.id === card.id);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavAction(card.id));
    } else {
      dispatch(addToFavAction(card));
    }
  };

  // Helper to calculate fallback cash price (15% discount) if not explicitly provided
  const getCashPrice = () => {
    if (card.cashPrice) return card.cashPrice;

    // Fallback: parse price and calculate 15% discount for EGP prices (excluding rent)
    const isEgp = card.price.includes("EGP");
    const isRent = card.price.toLowerCase().includes("month") || card.price.toLowerCase().includes("day");
    if (isEgp && !isRent) {
      const numericPrice = parseFloat(card.price.replace(/,/g, ""));
      if (!isNaN(numericPrice)) {
        return `${Math.round(numericPrice * 0.85).toLocaleString()} EGP`;
      }
    }
    return card.price;
  };

  const currentPrice = paymentMode === "cash" 
    ? getCashPrice() 
    : (card.installmentPrice || card.price);

  const showPaymentNote = paymentMode === "installment" && card.paymentNote;

  const hasBothModes = card.paymentModes && 
    card.paymentModes.includes("Installment") && 
    card.paymentModes.includes("Cash");

  const formatLocation = (loc: string) => {
    if (!loc) return "";
    const parts = loc.split(" • ");
    if (parts.length === 2) {
      const destName = parts[0];
      const typeName = parts[1];
      
      let translatedDest = destName;
      if (destName === "Porto Golf") translatedDest = t("destinations.portoGolf");
      else if (destName === "Porto Marina") translatedDest = t("destinations.portoMarina");
      else if (destName === "Porto Beach") translatedDest = t("destinations.portoBeach");
      else if (destName === "Porto Lagoon") translatedDest = t("destinations.portoLagoon");
      else if (destName === "Porto Coast") translatedDest = t("destinations.portoCoast");
      
      let translatedType = typeName;
      if (typeName.toLowerCase() === "chalet") translatedType = t("search.propertyTypes.chalet");
      else if (typeName.toLowerCase() === "penthouse") translatedType = t("search.propertyTypes.penthouse") || "بنتهاوس";
      else if (typeName.toLowerCase() === "villa") translatedType = t("search.propertyTypes.villa");
      else if (typeName.toLowerCase() === "apartment") translatedType = t("search.propertyTypes.apartment");
      else if (typeName.toLowerCase() === "twin house") translatedType = t("search.propertyTypes.twinHouse");

      return `${translatedDest} • ${translatedType}`;
    }
    return loc;
  };

  const getTranslatedTitle = (title: string) => {
    switch (title.toLowerCase()) {
      case "sea view challet":
      case "sea view chalet":
        return t("unitCard.title.seaViewChalet");
      case "luxury beachfront chalet":
        return t("unitCard.title.luxuryBeachfrontChalet");
      case "marina view penthouse":
        return t("unitCard.title.marinaViewPenthouse");
      case "sea shore chalet":
        return t("unitCard.title.seaShoreChalet");
      case "front row chalet":
        return t("unitCard.title.frontRowChalet");
      case "lagoon side chalet":
        return t("unitCard.title.lagoonSideChalet");
      case "crystal lagoon chalet":
        return t("unitCard.title.crystalLagoonChalet");
      case "yacht harbour chalet":
        return t("unitCard.title.yachtHarbourChalet");
      case "panoramic promenade chalet":
        return t("unitCard.title.panoramicPromenadeChalet");
      case "premium sea-breeze chalet":
        return t("unitCard.title.premiumSeaBreezeChalet");
      case "infinity view chalet":
        return t("unitCard.title.infinityViewChalet");
      default:
        return title;
    }
  };

  const getTranslatedBadge = (badge: string) => {
    if (badge.startsWith("Delivery in ")) {
      const year = badge.replace("Delivery in ", "");
      return t("unitCard.badge.deliveryIn", { year });
    }
    switch (badge.toLowerCase()) {
      case "resale":
        return t("unitCard.badge.resale");
      case "developer":
        return t("unitCard.badge.developer");
      case "rent":
        return t("unitCard.badge.rent");
      case "available":
        return t("unitCard.badge.available");
      case "available soon":
        return t("unitCard.badge.availableSoon");
      default:
        return badge;
    }
  };

  const formatPrice = (price: string) => {
    if (!price) return "";
    let formatted = price.replace("EGP", t("search.egp"));
    formatted = formatted.replace("/month", t("unitCard.perMonth"));
    formatted = formatted.replace("/day", t("unitCard.perDay"));
    return formatted;
  };

  const formatPaymentNote = (note: string) => {
    if (!note) return "";
    if (note.includes("month insurance")) {
      const match = note.match(/(\d+)\s+month insurance/);
      if (match) {
        return t("unitCard.paymentNote.insurance", { months: match[1] });
      }
      return t("unitCard.paymentNote.insurance", { months: 1 });
    }

    const lines = note.split("\n");
    const translatedLines = lines.map(line => {
      if (line.toLowerCase().includes("down payment")) {
        const pctMatch = line.match(/(\d+)%/);
        if (pctMatch) {
          return t("unitCard.paymentNote.downPayment", { percent: pctMatch[1] });
        }
      }
      if (line.toLowerCase().includes("quarterly")) {
        const amtMatch = line.match(/([\d,]+)\s+Quarterly\s*\/(\d+)\s*y/i);
        if (amtMatch) {
          return t("unitCard.paymentNote.quarterly", { amount: amtMatch[1], years: amtMatch[2] });
        }
      }
      return line;
    });

    return translatedLines.join(isRtl ? " و " : " \n ");
  };

  return (
    <div className={`${className} block text-left rtl:text-right group`}>
      <article className="w-full flex flex-col bg-[#F5F9FA] border border-white rounded-[12px] shadow-[0px_2px_3.15px_rgba(0,0,0,0.14)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.15)]">

        {/* Image Section — uses aspect ratio so height scales with width */}
        <div className="relative w-full aspect-[343/276] overflow-hidden rounded-t-[12px] shrink-0">
          <Link
            to={`/home/${card.destination.slug}/properties/${card.id}`}
            className="absolute inset-0 block h-full w-full"
          >
            <Image
              imageurl={card.image}
              alt={getTranslatedTitle(card.title)}
              className="h-full w-full object-cover object-center"
            />
          </Link>
          {/* Badges + Favorite */}
          <div className="absolute inset-0 p-[16px] sm:p-[24px] flex items-start justify-between z-10 pointer-events-none">
            <div className="flex flex-wrap gap-[8px] sm:gap-[16px] max-w-[75%] pointer-events-auto">
              {card.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-[99px] bg-black/25 px-[8px] py-[6px] text-[12px] sm:text-[14px] font-medium text-[#edeff2] leading-[normal] font-['Poppins'] backdrop-blur-sm"
                >
                  {getTranslatedBadge(badge)}
                </span>
              ))}
            </div>
            <button
              onClick={handleFavorite}
              type="button"
              className="relative z-20 flex items-center justify-center bg-primary rounded-[12px] size-[36px] shrink-0 transition-transform hover:scale-110 cursor-pointer pointer-events-auto"
            >
              {isFavorite ? (
                <FaHeart className="text-white h-[20px] w-[20px]" />
              ) : (
                <FaRegHeart className="text-white h-[20px] w-[20px]" />
              )}
            </button>
          </div>
        </div>

        {/* Body Section */}
        <div className="flex flex-col gap-[14px] sm:gap-[16px] p-[16px] sm:p-[24px] w-full">

          {/* Location */}
          <div className="flex items-center gap-[6px] sm:gap-[8px] text-[13px] sm:text-[14px] text-[#464646] font-['Poppins']">
            <MapPin className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] shrink-0" />
            <span className="truncate">{formatLocation(card.location)}</span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] sm:text-[16px] font-medium text-[#141414] font-['Poppins'] group-hover:text-primary transition-colors leading-tight line-clamp-2">
            <Link to={`/home/${card.destination.slug}/properties/${card.id}`}>
              {getTranslatedTitle(card.title)}
            </Link>
          </h3>

          {/* Stats Row */}
          <div className="flex items-center gap-[8px] sm:gap-[12px] flex-wrap text-[13px] sm:text-[14px] text-[#464646] font-['Poppins']">
            {card.stats.map((stat, index) => {
              const Icon = statIconMap[stat.icon];
              return (
                <div key={`${card.id}-${stat.icon}`} className="flex items-center gap-[8px] sm:gap-[12px]">
                  <div className="flex items-center gap-[6px] sm:gap-[8px] shrink-0">
                    <Icon className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] shrink-0" />
                    <span className="whitespace-nowrap">
                      {stat.icon === "area" ? stat.value.replace("sqm", t("unitCard.stat.sqm")) : stat.value}
                    </span>
                  </div>
                  {index < card.stats.length - 1 && (
                    <div className="h-[18px] w-[1px] bg-[#d4d5d8] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[#d4d5d8]" />

          {/* Price + Payment Modes */}
          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex items-center justify-between gap-[8px] w-full flex-wrap">
              <p className="text-[15px] sm:text-[16px] font-medium text-[#141414] font-['Poppins'] whitespace-nowrap">
                {formatPrice(currentPrice)}
              </p>
             {hasBothModes && (
                 <div className="flex items-center border border-[#d4d5d8] rounded-[12px] overflow-hidden h-[28px] sm:h-[32px] shrink-0 font-['Poppins']">

                      <button
                        type="button"
                        onClick={() => setPaymentMode("installment")}
                        className={`h-full px-[8px] sm:px-[12px] text-[12px] sm:text-[14px] font-medium font-['Poppins'] transition-colors whitespace-nowrap ${
                        paymentMode === "installment"
                        ? "bg-[#edeff2] text-[#141414]"
                        : "bg-white text-[#141414] hover:bg-[#edeff2]"
                      }`}
                      >
                        {t("unitCard.installment")}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMode("cash")}
                        className={`h-full px-[8px] sm:px-[12px] text-[12px] sm:text-[14px] font-medium font-['Poppins'] transition-colors whitespace-nowrap ${
                        paymentMode === "cash"
                        ? "bg-[#edeff2] text-[#141414]"
                        : "bg-white text-[#141414] hover:bg-[#edeff2]"
                      }`}
                      >
                        {t("unitCard.cash")}
                      </button>

                 </div>
             )}
            </div>

            {/* Payment Note */}
            {showPaymentNote && (
              <p className="text-[12px] sm:text-[14px] text-[#464646] font-['Poppins'] leading-relaxed">
                {formatPaymentNote(card.paymentNote)}
              </p>
            )}
          </div>
        </div>
      </article>
    </div>
  );
};

export default UnitCard;

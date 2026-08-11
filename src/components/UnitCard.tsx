import { Bath, BedDouble, MapPin, Ruler } from "lucide-react";
import Image from "./Ui/Image";
import { useAppDispatch, type RootState } from "../app/store";
import { useSelector } from "react-redux";
import {
  addToFavAction,
  removeFromFavAction,
} from "../app/feature/favoriteUnitSlice";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import type { IProperty } from "../app/services/crudproperties";
import {
  truncateText,
  formatDeliveryStatus,
  getTranslatedBadge,
  isRentListing,
} from "../utils";

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
  card: IProperty;
  className?: string;
}) => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const dispatch = useAppDispatch();
  const { favUnite } = useSelector((state: RootState) => state.favUnit);
  const defaultMode =
    card.paymentModel?.toLowerCase() === "cash" ? "cash" : "installment";
  const [paymentMode, setPaymentMode] = useState<"installment" | "cash">(
    defaultMode,
  );

  const isFavorite = favUnite.some((item) => item._id === card._id);
  const isRent = isRentListing(card.listingType);

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      dispatch(removeFromFavAction(card._id));
    } else {
      dispatch(addToFavAction(card));
    }
  };

  // Helper to get the cash price
  const getCashPrice = () => {
    return card.cashPrice
      ? `${card.cashPrice.toLocaleString()} EGP`
      : "Contact for Price";
  };

  const currentPrice = isRent
    ? "Contact for Price"
    : paymentMode === "cash"
      ? getCashPrice()
      : card.installmentPrice
        ? `${card.installmentPrice.toLocaleString()} EGP`
        : "Contact for Price";

  const dpPct = card.downPaymentPercentage ?? 2;
  const period = card.installmentPeriod || "2";
  const yearsVal = parseInt(period.replace(/[a-zA-Z\s]/g, "")) || 5;
  const instValue =
    card.installmentValue ||
    (card.installmentPrice
      ? Math.round((card.installmentPrice * (1 - dpPct / 100)) / (yearsVal * 4))
      : 0);

  const paymentNoteRaw =
    !isRent && (card.installmentPrice || 0) > 0
      ? `${dpPct}% Down payment\n${instValue.toLocaleString()} Quarterly /${period}${period.toLowerCase().includes("year") || period.toLowerCase().includes("y") ? "" : " y"}`
      : "";

  const showPaymentNote = paymentMode === "installment" && !!paymentNoteRaw;

  const hasBothModes =
    !isRent &&
    (card.paymentModel?.toLowerCase() === "both" || !card.paymentModel);

  const badges = useMemo(() => {
    const rawDelivery = formatDeliveryStatus(card.deliveryDate);
    return [
      card.listingType ? getTranslatedBadge(card.listingType, t) : "",
      rawDelivery ? getTranslatedBadge(rawDelivery, t) : "",
    ].filter(Boolean);
  }, [card.listingType, card.deliveryDate, t]);

  const locationText = card.village
    ? `${card.village.name} • ${card.propertyType}`
    : "";

  const formatPrice = (price: string) => {
    if (!price) return "";
    let formatted = price.replace("EGP", t("search.egp"));
    formatted = formatted.replace("/month", t("unitCard.perMonth"));
    formatted = formatted.replace("/day", t("unitCard.perDay"));
    return formatted;
  };

  const translatePaymentNote = (note: string) => {
    if (!note) return "";
    if (note.includes("month insurance")) {
      const match = note.match(/(\d+)\s+month insurance/);
      if (match) {
        return t("unitCard.paymentNote.insurance", { months: match[1] });
      }
      return t("unitCard.paymentNote.insurance", { months: 1 });
    }

    const lines = note.split("\n");
    const translatedLines = lines.map((line) => {
      if (line.toLowerCase().includes("down payment")) {
        const pctMatch = line.match(/(\d+)%/);
        if (pctMatch) {
          return t("unitCard.paymentNote.downPayment", {
            percent: pctMatch[1],
          });
        }
      }
      if (line.toLowerCase().includes("quarterly")) {
        const amtMatch = line.match(/([\d,]+)\s+Quarterly\s*\/([^\n]+)/i);
        if (amtMatch) {
          const yearsRaw = amtMatch[2].replace(/[a-zA-Z\s]/g, "");
          return t("unitCard.paymentNote.quarterly", {
            amount: amtMatch[1],
            years: yearsRaw,
          });
        }
      }
      return line;
    });

    return translatedLines.join(isRtl ? " و " : " \n ");
  };

  const stats = [
    { icon: "area" as const, value: `${card.area} sqm` },
    { icon: "bed" as const, value: `${card.bedrooms}` },
    { icon: "bath" as const, value: `${card.bathrooms}` },
  ];

  return (
    <div className={`${className} block text-left rtl:text-right group`}>
      <article className="w-full flex flex-col bg-[#F5F9FA] border border-white rounded-[12px] shadow-[0px_2px_3.15px_rgba(0,0,0,0.14)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.15)]">
        {/* Image Section — uses aspect ratio so height scales with width */}
        <div className="relative w-full aspect-[343/276] overflow-hidden rounded-t-[12px] shrink-0">
          <Link
            to={`/home/${card.village?.slug || ""}/properties/${card._id}`}
            className="absolute inset-0 block h-full w-full"
          >
            <Image
              imageurl={card.coverImage || card.images?.[0] || ""}
              alt={card.name}
              className="h-full w-full object-cover object-center"
            />
          </Link>
          {/* Badges + Favorite */}
          <div className="absolute inset-0 p-[16px] sm:p-[24px] flex items-start justify-between z-10 pointer-events-none">
            <div className="flex flex-wrap gap-[8px] sm:gap-[16px] max-w-[75%] pointer-events-auto">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-[99px] bg-black/45 px-[8px] py-[6px] text-[12px] sm:text-[14px] font-medium text-[#edeff2] leading-[normal] font-['Poppins'] backdrop-blur-sm"
                >
                  {badge}
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
            <span className="truncate">{locationText}</span>
          </div>

          {/* Title */}
          <h3 className="text-[13px] sm:text-[16px] font-medium text-[#141414] font-['Poppins'] group-hover:text-primary transition-colors leading-tight line-clamp-2 sm:line-clamp-none sm:truncate sm:whitespace-nowrap lg:line-clamp-2 lg:whitespace-normal">
            <Link
              to={`/home/${card.village?.slug || ""}/properties/${card._id}`}
            >
              {truncateText(card.name, 35)}
            </Link>
          </h3>

          {/* Stats Row */}
          <div className="flex items-center gap-[8px] sm:gap-[12px] flex-wrap text-[13px] sm:text-[14px] text-[#464646] font-['Poppins']">
            {stats.map((stat, index) => {
              const Icon = statIconMap[stat.icon];
              return (
                <div
                  key={`${card._id}-${stat.icon}`}
                  className="flex items-center gap-[8px] sm:gap-[12px]"
                >
                  <div className="flex items-center gap-[6px] sm:gap-[8px] shrink-0">
                    <Icon className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] shrink-0" />
                    <span className="whitespace-nowrap">
                      {stat.icon === "area"
                        ? stat.value.replace("sqm", t("unitCard.stat.sqm"))
                        : stat.value}
                    </span>
                  </div>
                  {index < stats.length - 1 && (
                    <div className="h-[18px] w-[1px] bg-[#d4d5d8] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="w-full h-[1px] bg-[#d4d5d8]" />

          {/* Price + Payment Modes */}
          <div className="flex flex-col h-[88px] gap-[8px] w-full">
            <div className="flex items-center justify-between gap-[8px] w-full flex-wrap sm:flex-nowrap lg:flex-wrap">
              <p className="text-[13px] sm:text-[16px] font-medium text-[#141414] font-['Poppins'] whitespace-nowrap sm:truncate sm:min-w-0 lg:overflow-visible">
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
                  <div className="w-[1px] h-full bg-[#d4d5d8]" />
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

            {/* Supporting details with a consistent min-height for uniform card height */}
            <div className="min-h-[40px] sm:min-h-[48px] flex items-center w-full">
              {isRent ? (
                <p className="text-[12px] sm:text-[14px] text-[#464646] font-['Poppins'] leading-relaxed">
                  {card.insurance
                    ? `${t("propertyDetails.pricing.insurance")}: ${card.insurance.toLocaleString()} EGP`
                    : t("unitCard.paymentNote.insurance", { months: 1 })}
                </p>
              ) : paymentMode === "cash" ? (
                <div className="flex flex-wrap gap-[8px] w-full">
                  <span className="rounded-[99px] bg-[#EAF7EC] text-[#2B7A1C] px-[12px] py-[4px] text-[12px] sm:text-[14px] font-medium font-['Poppins'] leading-none">
                    {t("unitCard.saveMore", "Save more")}
                  </span>
                  <span className="rounded-[99px] bg-[#E9F4F7] text-[#141414] px-[12px] py-[4px] text-[12px] sm:text-[14px] font-medium font-['Poppins'] leading-none">
                    {t("unitCard.higherInvestment", "Higher investment")}
                  </span>
                </div>
              ) : (
                showPaymentNote && (
                  <p className="text-[12px] sm:text-[14px] text-[#464646] font-['Poppins'] leading-relaxed whitespace-pre-line">
                    {translatePaymentNote(paymentNoteRaw)}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default UnitCard;

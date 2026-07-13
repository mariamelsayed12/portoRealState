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
  const dispatch = useAppDispatch();
  const { favUnite } = useSelector((state: RootState) => state.favUnit);

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

  return (
    <Link
      to={`/home/${card.destination.slug}/properties/${card.id}`}
      className={`${className} block text-left group`}
    >
      <article className="w-full flex flex-col bg-[#F5F9FA] border border-white rounded-[12px] shadow-[0px_2px_3.15px_rgba(0,0,0,0.14)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.15)]">

        {/* Image Section — uses aspect ratio so height scales with width */}
        <div className="relative w-full aspect-[343/276] overflow-hidden rounded-t-[12px] shrink-0">
          <Image
            imageurl={card.image}
            alt={card.title}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          {/* Badges + Favorite */}
          <div className="absolute inset-0 p-[16px] sm:p-[24px] flex items-start justify-between z-10">
            <div className="flex flex-wrap gap-[8px] sm:gap-[16px] max-w-[75%]">
              {card.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-[99px] bg-black/25 px-[8px] py-[6px] text-[12px] sm:text-[14px] font-medium text-[#edeff2] leading-[normal] font-['Poppins'] backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>
            <button
              onClick={handleFavorite}
              type="button"
              className="relative z-20 flex items-center justify-center bg-primary rounded-[12px] size-[36px] shrink-0 transition-transform hover:scale-110 cursor-pointer"
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
            <span className="truncate">{card.location}</span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] sm:text-[16px] font-medium text-[#141414] font-['Poppins'] group-hover:text-primary transition-colors leading-tight line-clamp-2">
            {card.title}
          </h3>

          {/* Stats Row */}
          <div className="flex items-center gap-[8px] sm:gap-[12px] flex-wrap text-[13px] sm:text-[14px] text-[#464646] font-['Poppins']">
            {card.stats.map((stat, index) => {
              const Icon = statIconMap[stat.icon];
              return (
                <div key={`${card.id}-${stat.icon}`} className="flex items-center gap-[8px] sm:gap-[12px]">
                  <div className="flex items-center gap-[6px] sm:gap-[8px] shrink-0">
                    <Icon className="h-[18px] w-[18px] sm:h-[20px] sm:w-[20px] shrink-0" />
                    <span className="whitespace-nowrap">{stat.value}</span>
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
                {card.price}
              </p>
              {card.paymentModes && card.paymentModes.length > 0 && (
                <div className="flex h-[28px] sm:h-[32px] items-center border border-[#d4d5d8] rounded-[12px] overflow-hidden shrink-0">
                  {card.paymentModes.map((mode, index) => (
                    <div
                      key={mode}
                      className={`flex h-full items-center justify-center px-[6px] sm:px-[8px] ${
                        index === 0 ? "bg-[#edeff2]" : ""
                      }`}
                    >
                      <span className="text-[12px] sm:text-[14px] font-medium text-[#141414] font-['Poppins'] whitespace-nowrap">
                        {mode}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Note */}
            {card.paymentNote && (
              <p className="text-[12px] sm:text-[14px] text-[#464646] font-['Poppins'] leading-relaxed">
                {card.paymentNote}
              </p>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default UnitCard;

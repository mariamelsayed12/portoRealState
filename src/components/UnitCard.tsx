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
  className = "w-full max-w-[282px] sm:max-w-none shrink-0",
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
      <article className="w-full h-full flex flex-col bg-[#F5F9FA] border border-white rounded-[12px] shadow-[0px_2px_3.15px_rgba(0,0,0,0.14)] overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.15)]">
        <div className="relative h-[276px] w-full p-[24px] flex flex-col justify-start rounded-t-[12px]">
          <Image
            imageurl={card.image}
            alt={card.title}
            className="absolute inset-0 h-full w-full object-cover object-center rounded-t-[12px]"
          />

          <div className="relative z-10 flex items-start justify-between w-full">
            <div className="flex flex-wrap gap-[16px]">
              {card.badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-[99px] bg-black/25 px-[8px] py-[8px] text-[14px] font-medium text-[#edeff2] leading-[normal] font-['Poppins'] backdrop-blur-sm"
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

        <div className="flex flex-col gap-[16px] p-[24px] w-full rounded-b-[12px]">
          <div className="flex items-center gap-[8px] text-[14px] text-[#464646] font-['Poppins']">
            <MapPin className="h-[20px] w-[20px]" />
            <span>{card.location}</span>
          </div>

          <h3 className="text-[16px] sm:text-[19px] font-medium text-[#141414] font-['Poppins'] group-hover:text-primary transition-colors">
            {card.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-[16px] gap-y-[8px] text-[14px] text-[#464646] font-['Poppins']">
            {card.stats.map((stat, index) => {
              const Icon = statIconMap[stat.icon];

              return (
                <div
                  key={`${card.id}-${stat.icon}`}
                  className="flex items-center gap-[16px]"
                >
                  <div className="flex items-center gap-[8px]">
                    <Icon className="h-[20px] w-[20px]" />
                    <span>{stat.value}</span>
                  </div>
                  {index < card.stats.length - 1 && (
                    <div className="h-[21px] w-[1px] bg-[#d4d5d8]" />
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full h-[1px] bg-[#d4d5d8]" />

          <div className="flex flex-col gap-[8px] w-full">
            <div className="flex flex-wrap items-center justify-between gap-2 w-full">
              <p className="text-[16px] sm:text-[19px] font-medium text-[#141414] font-['Poppins']">
                {card.price}
              </p>
              {card.paymentModes && card.paymentModes.length > 0 && (
                <div className="flex h-[32px] items-center border border-[#d4d5d8] rounded-[12px] overflow-hidden shrink-0">
                  {card.paymentModes.map((mode, index) => (
                    <div
                      key={mode}
                      className={`flex h-[32px] items-center justify-center px-[8px] ${
                        index === 0 ? "bg-[#edeff2]" : ""
                      }`}
                    >
                      <span className="text-[16px] font-medium text-[#141414] font-['Poppins']">
                        {mode}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-[14px] sm:text-[16px] text-[#464646] font-['Poppins'] whitespace-pre-line">
              {card.paymentNote}
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default UnitCard;

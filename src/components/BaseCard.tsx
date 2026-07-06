import { Bath, BedDouble, Heart, MapPin, Ruler } from "lucide-react";
import type { PropertyCardData } from "../interfaces";
import Image from "./Ui/Image";

const statIconMap = {
  location: MapPin,
  bed: BedDouble,
  bath: Bath,
  area: Ruler,
} as const;




const BaseCard = ({ card }: { card: PropertyCardData }) => {
  return (
    <article className="w-[286px] sm:w-[296px] shrink-0 rounded-[12px] border border-border bg-white shadow-[0_2px_10px_rgba(73,95,104,0.06)] overflow-hidden">
      <div className="relative h-[198px] overflow-hidden bg-[#dfeef1]">
        <Image
          imageurl={card.image}
          alt={card.title}
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-3">
          <div className="flex flex-wrap gap-1.5">
            {card.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full bg-white/70 px-2.5 py-1 text-[10px] font-medium text-text-darker shadow-sm backdrop-blur-sm"
              >
                {badge}
              </span>
            ))}
          </div>

          <button
            type="button"
            aria-label="Save property"
            className="grid h-7 w-7 place-items-center rounded-full bg-white/85 text-primary shadow-sm backdrop-blur-sm transition-transform hover:scale-105"
          >
            <Heart className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      <div className="p-3.5">
        <div className="mb-1.5 flex items-center gap-1.5 text-[11px] font-medium text-[#7D8D93]">
          <MapPin className="h-3.5 w-3.5 text-primary" />
          <span>{card.location}</span>
        </div>

        <h3 className="text-[13px] font-semibold leading-tight text-text-darker">{card.title}</h3>

        <div className="mt-2 flex items-center gap-2 text-[11px] text-[#7D8D93]">
          {card.stats.map((stat, index) => {
            const Icon = statIconMap[stat.icon];

            return (
              <div key={`${card.id}-${stat.icon}`} className="flex items-center gap-1">
                <Icon className="h-3.5 w-3.5 text-primary" />
                <span>{stat.value}</span>
                {index < card.stats.length - 1 ? <span className="text-[#C3CCCF]">•</span> : null}
              </div>
            );
          })}
        </div>

        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-[12px] font-semibold text-text-darker">{card.price}</p>
          <div className="flex flex-wrap items-center gap-1.5">
            {card.paymentModes.map((mode) => (
              <span
                key={mode}
                className="rounded-md bg-[#F2F5F6] px-2 py-1 text-[10px] font-medium text-[#58696F]"
              >
                {mode}
              </span>
            ))}
          </div>
        </div>

        <p className="mt-2 text-[10px] font-medium text-[#7D8D93]">{card.paymentNote}</p>
      </div>
    </article>
  );
};

export default BaseCard;


import type { ComponentType } from "react";
import type { IconBaseProps } from "react-icons/lib";

export interface PropertyStat {
  icon: "location" | "bed" | "bath" | "area";
  value: string;
}



/**
 * A single village/village-amenity feature shown in the marquee.
 */
export interface Feature {
  /** Stable unique id — used as the React key and for add/remove/reorder. */
  id: string;
  /** Card label. Can wrap to two lines (e.g. "Medical Service"). */
  title: string;
  /** Icon component rendered inside the card's accent shape. */
  icon: ComponentType<IconBaseProps>;
}

export interface PropertyUnitCardData {
  id: string;
  image: string;
  badges: string[];
  location: string;
  title: string;
  stats: PropertyStat[];
  price: string;
  paymentModes: string[];
  paymentNote: string;
  destination: {
    slug: string;
  };
}

export interface InvestmentCardData {
  id: string;
  title: string;
  description: string;
  variant: "text" | "image";
  image?: string;
  alt?: string;
}

export interface SectionHeadingData {
  title: string;
  actionLabel?: string;
}

export interface ContactUsFormValues {
  fullName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  description: string;
}

export interface DestinationData {
  id: number;
  slug: string;
  title: string;
  breadcrumbLabel?: string;
  image: string;
  description: string;
  developer: string;
  price: string;
  startingPrice: string;
  rentalYield: string;
  availableListings: string;
  hasArrowBadge: boolean;
}

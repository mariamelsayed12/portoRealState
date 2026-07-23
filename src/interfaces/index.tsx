import type { ComponentType } from "react";

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
  icon: ComponentType<any>;
}

export interface PropertyCardData {
  id: string;
  image: string;
  badges: string[];
  location: string;
  title: string;
  stats: PropertyStat[];
  price: string;
  paymentModes: string[];
  paymentNote: string;
  cashPrice?: string;
  installmentPrice?: string;
  destination: {
    slug: string;
    name: string;
  };
  description?: string;
  finishing?: string;
  delivery?: string;
  orientation?: string;
  downPayment?: string;
  monthlyInstallment?: string;
  installmentYears?: string;
  images?: string[];
  amenities?: string[];
}

export interface InvestmentCardData {
  id: string;
  title: string;
  titleKey?: string;
  description: string;
  descriptionKey?: string;
  variant: "text" | "image";
  image?: string;
  alt?: string;
  altKey?: string;
}

export interface SectionHeadingData {
  title: string;
  titleKey?: string;
  actionLabel?: string;
  actionLabelKey?: string;
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
  titleKey?: string;
  breadcrumbLabel?: string;
  image: string;
  description: string;
  developer: string;
  developerKey?: string;
  price: string;
  startingPrice: string;
  rentalYield: string;
  availableListings: string;
  hasArrowBadge: boolean;
  address?: string;
  phone?: string;
  email?: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  googleMapsUrl?: string;
}

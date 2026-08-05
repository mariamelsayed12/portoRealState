import BuyProperty from "../assets/BuyProperty.svg";
import type {
  Feature,
  InvestmentCardData,
} from "../interfaces";
import northcost from "../assets/HomePage/northcost.jpg";

import { Baby, Building2, Car, Coffee, Dumbbell, Mail, Phone, Sparkles, Store, Trees, UtensilsCrossed, Waves, DoorOpen, Route, Smartphone, Snowflake, CookingPot, Shirt, Bed, PawPrint, Flame } from "lucide-react";
import HotelsIcon from "../components/icons/hotels";
import PoolIcon from "../components/icons/pools";
import Security from "../components/icons/security";
import MediacalServiceIcon from "../components/icons/MedicalService";
import Marina from "../components/icons/marina";
import BeachIcon from "../components/icons/beach";



export const LOCATION_OPTIONS = ["Item 1", "Item 1", "Item 1", "Item 1"];

export const offerItems = [
  {
    title: "Property Sales",
    titleKey: "whatWeOffer.sales.title",
    description:
      "Direct access to launches across the most coveted North Coast developments before they reach the market.",
    descriptionKey: "whatWeOffer.sales.description",
    icon: <img src={BuyProperty} alt="buyProperty" />,
    link: "/buy",
  },
  {
    title: "Sell Your Property",
    titleKey: "whatWeOffer.sell.title",
    description:
      "List discreetly with PORTO expert valuation, qualified buyers, and quiet negotiation that protects your price.",
    descriptionKey: "whatWeOffer.sell.description",
    icon:<img src={BuyProperty} alt="buyProperty" /> ,
    link: "/sell",
  },
  {
    title: "Special Rentals",
    titleKey: "whatWeOffer.rent.title",
    description:
      "Hand picked special residences for rent, vetted for service, comfort, and privacy.",
    descriptionKey: "whatWeOffer.rent.description",
    icon:<img src={BuyProperty} alt="buyProperty" />,
    link: "/rent",
  },
  {
    title: "Property Management",
    titleKey: "whatWeOffer.management.title",
    description:
      "End to end management of your asset yield optimization, guest screening, and concierge upkeep.",
    descriptionKey: "whatWeOffer.management.description",
    icon:<img src={BuyProperty} alt="buyProperty" />,
    link: "/management",
  },
];

export const curatedPropertiesHeading = {
  title: "Curated Properties",
  titleKey: "curatedProperties.title",
  actionLabel: "View All",
  actionLabelKey: "curatedProperties.viewAll",
};



export const northCoastHeading = {
  title: "Why to Invest in the North Coast ?",
  titleKey: "northCoastInvestment.heading",
};

export const northCoastInvestmentCards: InvestmentCardData[] = [
  {
    id: "capital-appreciation",
    title: "Strong Capital Appreciation",
    titleKey: "northCoastInvestment.capitalAppreciation.title",
    description:
      "North Coast values have grown across premium compounds, creating resilient long-term upside.",
    descriptionKey: "northCoastInvestment.capitalAppreciation.description",
    variant: "text",
  },
  {
    id: "coastal-location",
    title: "Prime Coastal Location",
    titleKey: "northCoastInvestment.coastalLocation.title",
    description:
      "Curated addresses in Egypt's most coveted Mediterranean shoreline and lifestyle corridor.",
    descriptionKey: "northCoastInvestment.coastalLocation.description",
    variant: "text",
  },
  {
    id: "north-coast-hero",
    title: "North Coast Landscape",
    titleKey: "northCoastInvestment.landscape.title",
    description: "",
    variant: "image",
    image: northcost,
    alt: "North Coast landscape",
    altKey: "northCoastInvestment.landscape.alt",
  },
  {
    id: "rental-yields",
    title: "Attractive Rental Yields",
    titleKey: "northCoastInvestment.rentalYields.title",
    description:
      "Seasonal demand keeps occupancy strong and short-term returns resilient year after year.",
    descriptionKey: "northCoastInvestment.rentalYields.description",
    variant: "text",
  },
  {
    id: "partnerships",
    title: "Strategic Partnerships",
    titleKey: "northCoastInvestment.partnerships.title",
    description:
      "Developer relationships unlock priority launches, preferred terms, and better allocation.",
    descriptionKey: "northCoastInvestment.partnerships.description",
    variant: "text",
  },
];
export type ContactFieldConfig =
  | {
      name: "fullName";
      label: string;
      placeholder: string;
      type: "text";
      isTextarea?: false;
    }
  | {
      name: "phoneNumber";
      label: string;
      placeholder: string;
      type: "tel";
      isTextarea?: false;
    }
  | {
      name: "description";
      label: string;
      placeholder: string;
      type: "text";
      isTextarea: true;
    };

export const contactItems = [
  {
    icon: Phone,
    label: "+20113333333",
    href: "tel:+20113333333",
  },
  {
    icon: Mail,
    label: "elahdd@email.com",
    href: "mailto:elahdd@email.com",
  },
];

export const contactFields: ContactFieldConfig[] = [
  {
    name: "fullName",
    label: "Full Name*",
    placeholder: "Input text",
    type: "text",
  },
  {
    name: "phoneNumber",
    label: "Phone Number*",
    placeholder: "Input text",
    type: "tel",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Tell us more about your request..",
    type: "text",
    isTextarea: true,
  },
];

/**
 * Design tokens for the Village Features marquee.
 * Centralised so the visual design can be tuned in one place without
 * touching component logic.
 */
export const FEATURE_MARQUEE_TOKENS = {
  colors: {
    cardBg: "#FFFFFF",
    accent: "#B9DBE5",
    title: "#141414",
    pageBg: "#F4F8FA",
  },
  card: {
    // Desktop
    width: 300,
    height: 132,
    // Tablet
    widthTablet: 240,
    heightTablet: 112,
    // Mobile
    widthMobile: 190,
    heightMobile: 100,
    radius: 28,
    gap: 4,
  },
  marquee: {
    /** px per second — constant speed regardless of item count. */
    speedPxPerSecond: 60,
  },
} as const;



export const amenityConfig: Record<
  string,
  Omit<Feature, "id">
> = {
  Pools: {
    title: "Pools",
    titleKey: "amenities.pools",
    icon: PoolIcon,
  },

  Marina: {
    title: "Marina",
    titleKey: "amenities.marina",
    icon: Marina,
  },

  Cafes: {
    title: "Cafes",
    titleKey: "amenities.cafes",
    icon: Coffee,
  },

  Beaches: {
    title: "Private Beach",
    titleKey: "amenities.privateBeach",
    icon: BeachIcon,
  },

  Restaurants: {
    title: "Restaurants",
    titleKey: "amenities.restaurants",
    icon: UtensilsCrossed,
  },

  "Hotel Services": {
    title: "Hotel Services",
    titleKey: "amenities.hotelServices",
    icon: HotelsIcon,
  },

  Security: {
    title: "24/7 Security",
    titleKey: "amenities.security",
    icon: Security,
  },

  "Medical Services": {
    title: "Medical Services",
    titleKey: "amenities.medicalServices",
    icon: MediacalServiceIcon,
  },

  "Sports Facilities": {
    title: "Sports Facilities",
    titleKey: "amenities.sportsFacilities",
    icon: Dumbbell,
  },

  Gyms: {
    title: "Gyms",
    titleKey: "amenities.gyms",
    icon: Dumbbell,
  },

  Spas: {
    title: "Spas",
    titleKey: "amenities.spas",
    icon: Sparkles,
  },

  Clubhouse: {
    title: "Clubhouse",
    titleKey: "amenities.clubhouse",
    icon: Building2,
  },

  "Commercial Area": {
    title: "Commercial Area",
    titleKey: "amenities.commercialArea",
    icon: Store,
  },

  "Green Areas": {
    title: "Green Areas",
    titleKey: "amenities.greenAreas",
    icon: Trees,
  },

  "Kids Area": {
    title: "Kids Area",
    titleKey: "amenities.kidsArea",
    icon: Baby,
  },

  "Underground Parking": {
    title: "Underground Parking",
    titleKey: "amenities.undergroundParking",
    icon: Car,
  },

  "Lagoon View": {
    title: "Lagoon View",
    titleKey: "amenities.lagoonView",
    icon: Waves,
  },

  "Private Garden": {
    title: "Private Garden",
    titleKey: "amenities.privateGarden",
    icon: Trees,
  },

  "Private Pool": {
    title: "Private Pool",
    titleKey: "amenities.privatePool",
    icon: Waves,
  },

  "Balcony": {
    title: "Balcony",
    titleKey: "amenities.balcony",
    icon: DoorOpen,
  },

  "Sea View": {
    title: "Sea View",
    titleKey: "amenities.seaView",
    icon: Waves,
  },

  "Lake View": {
    title: "Lake View",
    titleKey: "amenities.lakeView",
    icon: Waves,
  },

  "Main Street View": {
    title: "Main Street View",
    titleKey: "amenities.mainStreetView",
    icon: Route,
  },

  "Smart Home": {
    title: "Smart Home",
    titleKey: "amenities.smartHome",
    icon: Smartphone,
  },

  "Central A/C": {
    title: "Central A/C",
    titleKey: "amenities.centralAc",
    icon: Snowflake,
  },

  "Kitchen Appliances": {
    title: "Kitchen Appliances",
    titleKey: "amenities.kitchenAppliances",
    icon: CookingPot,
  },

  "Walk-in Closet": {
    title: "Walk-in Closet",
    titleKey: "amenities.walkInCloset",
    icon: Shirt,
  },

  "Covered Parking": {
    title: "Covered Parking",
    titleKey: "amenities.coveredParking",
    icon: Car,
  },

  "Maids Room": {
    title: "Maids Room",
    titleKey: "amenities.maidsRoom",
    icon: Bed,
  },

  "Pets Allowed": {
    title: "Pets Allowed",
    titleKey: "amenities.petsAllowed",
    icon: PawPrint,
  },

  "Barbecue Area": {
    title: "Barbecue Area",
    titleKey: "amenities.barbecueArea",
    icon: Flame,
  },
};

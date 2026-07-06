import BuildingIcon from "../components/icons/BuildingIcon";
import CartIcon from "../components/icons/CartIcon";
import HomeInvestmentIcon from "../components/icons/HomeInvestmentIcon";
import defualtImage from "../assets/HomePage/default.png";
import type { InvestmentCardData, PropertyCardData } from "../interfaces";


 export const destinations = [
  {
    title: "Porto Golf",
    developer: "Amer Group",
    price: "2M EGP",
    hasArrowBadge: false,
  },
  {
    title: "Porto Golf",
    developer: "Amer Group",
    price: "2M EGP",
    hasArrowBadge: true,
  },
  {
    title: "Porto Golf",
    developer: "Amer Group",
    price: "2M EGP",
    hasArrowBadge: false,
  },
   {
    title: "Porto Golf",
    developer: "Amer Group",
    price: "2M EGP",
    hasArrowBadge: false,
  },
   {
    title: "Porto Golf",
    developer: "Amer Group",
    price: "2M EGP",
    hasArrowBadge: false,
  },
   {
    title: "Porto Golf",
    developer: "Amer Group",
    price: "2M EGP",
    hasArrowBadge: false,
  },
];

export const LOCATION_OPTIONS = ["Item 1", "Item 1", "Item 1", "Item 1"];


export const offerItems = [
  {
    title: "Property Sales",
    description:
      "Direct access to launches across the most coveted North Coast developments before they reach the market.",
    icon: <CartIcon className="w-8 h-8 text-gray-500" />,
  },
  {
    title: "Sell Your Property",
    description:
      "List discreetly with PORTO expert valuation, qualified buyers, and quiet negotiation that protects your price.",
    icon: <BuildingIcon className="w-8 h-8 text-gray-500" />,
  },
  {
    title: "Special Rentals",
    description:
      "Hand picked special residences for rent, vetted for service, comfort, and privacy.",
    icon: <HomeInvestmentIcon className="w-8 h-8 text-gray-500" />,
  },
  {
    title: "Property Management",
    description:
      "End to end management of your asset yield optimization, guest screening, and concierge upkeep.",
    icon: <BuildingIcon className="w-8 h-8 text-gray-500" />,
  },
];

export const curatedPropertiesHeading = {
  title: "Curated Properties",
  actionLabel: "View All",
};

export const curatedProperties: PropertyCardData[] = [
  {
    id: "sea-view-chalet-1",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2023"],
    location: "Porto Golf • Chalet",
    title: "Sea view Chalet",
    stats: [
      { icon: "location", value: "6.5 km" },
      { icon: "bed", value: "5" },
      { icon: "bath", value: "3" },
    ],
    price: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment",
  },
  {
    id: "sea-view-chalet-2",
    image: defualtImage,
    badges: ["Developer", "Delivery in 2023"],
    location: "Porto Golf • Chalet",
    title: "Sea view Chalet",
    stats: [
      { icon: "location", value: "6.5 km" },
      { icon: "bed", value: "5" },
      { icon: "bath", value: "3" },
    ],
    price: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment",
  },
  {
    id: "sea-view-chalet-3",
    image: defualtImage,
    badges: ["Rent", "Delivery in 2023"],
    location: "Porto Golf • Chalet",
    title: "Sea view Chalet",
    stats: [
      { icon: "location", value: "6.5 km" },
      { icon: "bed", value: "5" },
      { icon: "bath", value: "3" },
    ],
    price: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment",
  },
  {
    id: "sea-view-chalet-4",
    image: defualtImage,
    badges: ["Resale", "Delivery in 2023"],
    location: "Porto Golf • Chalet",
    title: "Sea view Chalet",
    stats: [
      { icon: "location", value: "6.5 km" },
      { icon: "bed", value: "5" },
      { icon: "bath", value: "3" },
    ],
    price: "3,000,000 EGP",
    paymentModes: ["Installment", "Cash"],
    paymentNote: "5% Down payment",
  },
];

export const northCoastHeading = {
  title: "Why to Invest in the North Coast ?",
};

export const northCoastInvestmentCards: InvestmentCardData[] = [
  {
    id: "capital-appreciation",
    title: "Strong Capital Appreciation",
    description:
      "North Coast values have grown across premium compounds, creating resilient long-term upside.",
    variant: "text",
  },
  {
    id: "coastal-location",
    title: "Prime Coastal Location",
    description:
      "Curated addresses in Egypt's most coveted Mediterranean shoreline and lifestyle corridor.",
    variant: "text",
  },
  {
    id: "north-coast-hero",
    title: "North Coast Landscape",
    description: "",
    variant: "image",
    image: defualtImage,
    alt: "North Coast landscape",
  },
  {
    id: "rental-yields",
    title: "Attractive Rental Yields",
    description:
      "Seasonal demand keeps occupancy strong and short-term returns resilient year after year.",
    variant: "text",
  },
  {
    id: "partnerships",
    title: "Strategic Partnerships",
    description:
      "Developer relationships unlock priority launches, preferred terms, and better allocation.",
    variant: "text",
  },
];

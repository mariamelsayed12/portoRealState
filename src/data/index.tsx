import BuildingIcon from "../components/icons/BuildingIcon";
import CartIcon from "../components/icons/CartIcon";
import HomeInvestmentIcon from "../components/icons/HomeInvestmentIcon";


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

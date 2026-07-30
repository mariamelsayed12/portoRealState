import type { IProperty } from "../app/services/crudproperties";
import { toast } from "react-hot-toast";
import { Building2 } from "lucide-react";
import { amenityConfig } from "../data";
import type { Feature } from "../interfaces";

// Define the function to accept a `toast` function as a parameter
export const addUnitofav = (
  favUnit: IProperty,
  ShoppingFavorite: IProperty[] = [],
) => {
  const existsItem = ShoppingFavorite.find((item) => item._id === favUnit._id);

  if (existsItem) {
    toast.error("This unit already exists", {
      duration: 2000,
    });
    return ShoppingFavorite;
  }
  toast.success("Added to your favourites", {
    duration: 2000,
  });

  return [...ShoppingFavorite, { ...favUnit }];
};

export const truncateText = (text: string | undefined, maxLength: number = 10) => {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.slice(0, maxLength)}...`;
};

const DefaultAmenityIcon = Building2;

const normalizeAmenityKey = (amenity: string): string => {
  const normalized = amenity.trim().toLowerCase();
  
  if (normalized.includes("security")) return "Security";
  if (normalized.includes("garden") || normalized.includes("green")) return "Private Garden";
  if (normalized.includes("parking")) return "Underground Parking";
  if (normalized.includes("lagoon") || normalized.includes("lake") || normalized.includes("sea")) return "Lagoon View";
  if (normalized.includes("clubhouse")) return "Clubhouse";
  if (normalized.includes("pools") || normalized.includes("pool")) return "Pools";
  if (normalized.includes("marina")) return "Marina";
  if (normalized.includes("cafe")) return "Cafes";
  if (normalized.includes("beach")) return "Beaches";
  if (normalized.includes("restaurant")) return "Restaurants";
  if (normalized.includes("hotel")) return "Hotel Services";
  if (normalized.includes("medical") || normalized.includes("clinic") || normalized.includes("hospital")) return "Medical Services";
  if (normalized.includes("sport") || normalized.includes("playground")) return "Sports Facilities";
  if (normalized.includes("gym")) return "Gyms";
  if (normalized.includes("spa")) return "Spas";
  if (normalized.includes("commercial") || normalized.includes("shop") || normalized.includes("mall")) return "Commercial Area";
  if (normalized.includes("kid") || normalized.includes("child")) return "Kids Area";

  return amenity;
};

export const mapAmenitiesToFeatures = (amenities: string[] = []): Feature[] => {
  return (amenities || []).map((amenity, index) => {
    const normalizedKey = normalizeAmenityKey(amenity);
    const config = amenityConfig[normalizedKey] || amenityConfig[amenity];

    return {
      id: `${amenity}-${index}`,
      title: config?.title ?? amenity,
      titleKey: config?.titleKey,
      icon: config?.icon ?? DefaultAmenityIcon,
    };
  });
};

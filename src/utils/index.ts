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
  
  // Flexible substring match for the 15 property amenities
  if (normalized.includes("pool")) return "Private Pool";
  if (normalized.includes("garden") || normalized.includes("green")) return "Private Garden";
  if (normalized.includes("balcony") || normalized.includes("terrace")) return "Balcony";
  if (normalized.includes("sea")) return "Sea View";
  if (normalized.includes("lake")) return "Lake View";
  if (normalized.includes("street")) return "Main Street View";
  if (normalized.includes("smart")) return "Smart Home";
  if (normalized.includes("air conditioning") || normalized.includes("a/c") || normalized.includes("ac")) return "Central A/C";
  if (normalized.includes("kitchen") || normalized.includes("appliance")) return "Kitchen Appliances";
  if (normalized.includes("closet") || normalized.includes("wardrobe")) return "Walk-in Closet";
  if (normalized.includes("security")) return "Security";
  if (normalized.includes("parking")) return "Covered Parking";
  if (normalized.includes("maid")) return "Maids Room";
  if (normalized.includes("pet")) return "Pets Allowed";  
  if (normalized.includes("barbecue") || normalized.includes("bbq")) return "Barbecue Area";

  // Substring matching fallbacks for community/village level amenities
  if (normalized.includes("lagoon")) return "Lagoon View";
  if (normalized.includes("clubhouse")) return "Clubhouse";
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

/**
 * Formats the delivery status/badge text.
 * - Date/period values containing a 4-digit year (e.g. "2027", "Q4 2026") are returned as "Delivery in {date}".
 * - Text/status values (e.g. "Ready to Move", "Delivered") are returned as-is.
 */
export const formatDeliveryStatus = (deliveryDate?: string): string => {
  if (!deliveryDate) return "";
  
  const trimmed = deliveryDate.trim();
  
  // Checks if the string contains a 4-digit year starting with 19, 20, or 21
  const hasYear = /\b(19|20|21)\d{2}\b/.test(trimmed);
  
  if (hasYear) {
    let displayDate = trimmed;
    // Extract year part if it is a full date string like "2027-12-01"
    if (trimmed.includes("-")) {
      displayDate = trimmed.split("-")[0];
    }
    return `Delivery in ${displayDate}`;
  }
  
  return trimmed;
};

/**
 * Translates unit card badges cleanly using i18n instance.
 */
export const getTranslatedBadge = (badge: string, t: (key: string, options?: any) => string): string => {
  if (badge.startsWith("Delivery in ")) {
    const year = badge.replace("Delivery in ", "");
    return t("unitCard.badge.deliveryIn", { year });
  }
  switch (badge.toLowerCase()) {
    case "resale":
      return t("unitCard.badge.resale");
    case "developer":
      return t("unitCard.badge.developer");
    case "rent":
      return t("unitCard.badge.rent");
    case "sale":
      return t("unitCard.badge.sale");
    case "available":
      return t("unitCard.badge.available");
    case "available soon":
      return t("unitCard.badge.availableSoon");
    case "ready to move":
      return t("unitCard.badge.readyToMove");
    case "delivered":
      return t("unitCard.badge.delivered");
    default:
      return badge;
  }
};

/**
 * Helper to check if a listing type represents Rent in both English and Arabic.
 */
export const isRentListing = (listingType?: string): boolean => {
  if (!listingType) return false;
  const clean = listingType.trim().toLowerCase();
  return clean === "rent" || clean === "إيجار" || clean === "للإيجار";
};

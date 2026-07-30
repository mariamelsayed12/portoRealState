import type { IProperty } from "../app/services/crudproperties";
import { toast } from "react-hot-toast";

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

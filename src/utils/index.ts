import type { PropertyUnitCardData } from "../interfaces";
import { toast } from "react-hot-toast";

// Define the function to accept a `toast` function as a parameter
export const addUnitofav = (favUnit: PropertyUnitCardData,ShoppingFavorite: PropertyUnitCardData[] = [])=> {
    const existsItem = ShoppingFavorite.find(item => item.id === favUnit.id);
    
    if (existsItem) {
        toast.error('This unit already exists', {
            duration: 2000,
        });
       return ShoppingFavorite;
    }
    toast.success('Added to your favourites', {
        duration: 2000,
    });

    return [...ShoppingFavorite, { ...favUnit }];
};

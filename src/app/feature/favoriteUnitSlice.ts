import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { PropertyUnitCardData } from "../../interfaces";
import { addUnitofav } from "../../utils";
import toast from "react-hot-toast";

interface IFavunit {
  favUnite: PropertyUnitCardData[];
}

const initialState: IFavunit = {
  favUnite: [],
};


const favoriteUniteSlice = createSlice({
  name: "favoriteUnite",
  initialState,
  reducers: {
    addToFavAction: (state, action: PayloadAction<PropertyUnitCardData>) => {
      state.favUnite = addUnitofav(action.payload, state.favUnite);
    },
    removeFromFavAction: (state, action: PayloadAction<string>) => {
      state.favUnite = state.favUnite.filter(
        (item) => item.id !== action.payload,
      );
    toast.success('Removed from your favourites', {
            duration: 2000,
        })
    },
    ClearFavAction: (state) => {
      state.favUnite = [];
    },
  },
});

export const { addToFavAction, removeFromFavAction, ClearFavAction } =
  favoriteUniteSlice.actions;
export default favoriteUniteSlice.reducer;

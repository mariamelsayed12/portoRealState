import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { addUnitofav } from "../../utils";
import toast from "react-hot-toast";
import type { IProperty } from "../services/crudproperties";

interface IFavunit {
  favUnite: IProperty[];
}

const initialState: IFavunit = {
  favUnite: [],
};

const favoriteUniteSlice = createSlice({
  name: "favoriteUnite",
  initialState,
  reducers: {
    addToFavAction: (state, action: PayloadAction<IProperty>) => {
      state.favUnite = addUnitofav(action.payload, state.favUnite);
    },
    removeFromFavAction: (state, action: PayloadAction<string>) => {
      state.favUnite = state.favUnite.filter(
        (item) => item._id !== action.payload,
      );
      toast.success("Removed from your favourites", {
        duration: 2000,
      });
    },
    ClearFavAction: (state) => {
      state.favUnite = [];
    },
    sanitizeFavoritesAction: (state) => {
      state.favUnite = state.favUnite.filter(
        (item) => item && item._id && item.name,
      );
    },
    syncFavoritesAction: (state, action: PayloadAction<string[]>) => {
      const validIds = new Set(action.payload);
      state.favUnite = state.favUnite.filter(
        (item) => item && item._id && validIds.has(item._id),
      );
    },
  },
});

export const {
  addToFavAction,
  removeFromFavAction,
  ClearFavAction,
  sanitizeFavoritesAction,
  syncFavoritesAction,
} = favoriteUniteSlice.actions;
export default favoriteUniteSlice.reducer;

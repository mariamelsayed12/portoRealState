import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { persistStore, persistReducer } from "redux-persist";

import favoriteUnitReducer from "./feature/favoriteUnitSlice";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

const storage = createWebStorage("local");



const persistFavUnitConfig = {
  key: "favoriteUnite",
  storage,
};


const persistedFavUnitReducer = persistReducer(
  persistFavUnitConfig,
  favoriteUnitReducer
);


export const store = configureStore({
  reducer: {
    favUnit: persistedFavUnitReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


export const persister = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
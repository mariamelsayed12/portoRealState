import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import { useDispatch } from "react-redux";
import favoriteUnitReducer from "./feature/favoriteUnitSlice";
import createWebStorage from "redux-persist/es/storage/createWebStorage";
import { VillageApiSlice } from "./services/crudVillage";


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
    [VillageApiSlice.reducerPath]: VillageApiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
     .concat(VillageApiSlice.middleware),
});


export const persister = persistStore(store);


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
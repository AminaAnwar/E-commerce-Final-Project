import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import orebiReducer from "./orebiSlice";
import productReducer from "../components/home/Products/productSlice"
import userReducer from "../pages/Account/userSlice"
import wishlistReducer from "../components/home/Products/wishListSlice"
import categoriesReducer from "../components/home/Header/categorySlice"

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, orebiReducer);

export const store = configureStore({
  reducer: { 
    orebiReducer: persistedReducer,
    product: productReducer,
    user: userReducer,
    wishlist: wishlistReducer,
    categories: categoriesReducer
   },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

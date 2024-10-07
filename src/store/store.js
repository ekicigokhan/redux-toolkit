import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./product-store/ProductSlice";
import appSlice from "./app-store/appSlice";
import basketSlice from "./basket/basketSlice";

export const store = configureStore({
  reducer: {
    appStore: appSlice,
    productStore: productSlice,
    basketStore: basketSlice,
  },
});

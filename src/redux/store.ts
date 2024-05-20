import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cartCounterSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
  },
});

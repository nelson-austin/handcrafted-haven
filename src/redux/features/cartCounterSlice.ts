import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartCount: 0,
};

export const cartCounterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    incrementCartCount: (state) => {
      state.cartCount += 1;
    },

    increment: (state) => {
      state.cartCount += 1;
    },

    decrement: (state) => {
      if (state.cartCount > 0) {
        state.cartCount -= 1;
      }
    },

    reset: (state) => {},

    addToCart: (state, action) => {},
  },
});

export const { increment, decrement, incrementCartCount } = cartCounterSlice.actions;
export default cartCounterSlice.reducer;

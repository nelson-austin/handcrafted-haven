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

    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },

    reset: (state) => {
      state.cartCount = 0;
    },

    addToCart: (state, action) => {}, //Items are stored in localStorage... * TODO *
  },
});

export const { increment, decrement, incrementCartCount, setCartCount, reset } =
  cartCounterSlice.actions;

export default cartCounterSlice.reducer;

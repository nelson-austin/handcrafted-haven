"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/lib/interface";
interface CartItem extends Product {
  quantity: number;
}
interface CartState {
  items: CartItem[];
  totalItems: number;
}

const initialState: CartState = (() => {
  // Load state from local storage if available
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    return JSON.parse(savedCart);
  }

  return {
    items: [],
    totalItems: 0,
  };
})();

const saveState = (state: CartState) => {
  localStorage.setItem("cart", JSON.stringify(state));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        if (
          existingItem.quantity <
          existingItem.quantity_available + existingItem.quantity
        ) {
          existingItem.quantity += 1;
          existingItem.quantity_available -= 1;
        }
      } else {
        if (action.payload.quantity_available > 0) {
          state.items.push({
            ...action.payload,
            quantity: 1,
            quantity_available: action.payload.quantity_available - 1,
          });
        }
      }
      state.totalItems = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
      saveState(state);
    },
    incrementItemQuantity(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item && item.quantity < item.quantity_available + item.quantity) {
        item.quantity += 1;
        item.quantity_available -= 1;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        saveState(state);
      }
    },
    decrementItemQuantity(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.quantity_available += 1;
        state.totalItems = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
        saveState(state);
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        item.quantity_available += item.quantity;
        state.totalItems -= item.quantity;
        state.items.splice(itemIndex, 1);
        saveState(state);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalItems = 0;
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addItemToCart,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

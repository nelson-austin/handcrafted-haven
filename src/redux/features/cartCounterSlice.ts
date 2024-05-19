import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "@/app/lib/interface";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<CartItem[]>) {
      state.items = action.payload;
      state.totalItems = action.payload.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    addItemToCart(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.totalItems += 1;
    },
    incrementItemQuantity(state) {
      state.totalItems += 1;
    },
    decrementItemQuantity(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const item = state.items.find((item) => item.id === itemId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        state.totalItems -= 1;
        localStorage.setItem("cart-items", JSON.stringify(state.items));
      }
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      const itemId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        state.totalItems -= state.items[itemIndex].quantity;
        state.items.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  setCartItems,
  addItemToCart,
  incrementItemQuantity,
  decrementItemQuantity,
  removeItemFromCart,
} = cartSlice.actions;
export default cartSlice.reducer;

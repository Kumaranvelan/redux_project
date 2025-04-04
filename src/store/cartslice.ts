import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define cart item type
interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

// Load cart data from Local Storage (if available)
const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

// Initial state
const initialState: CartItem[] = loadCartFromStorage();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    removeItem: (state, action: PayloadAction<number>) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      localStorage.setItem("cart", JSON.stringify(state));
    },
    clearCart: () => {
      localStorage.removeItem("cart");
      return [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  savedForLaterItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    addToCart: (state, action) => {
      const newItem = {
        ...action.payload,
        quantity: action.payload.quantity || 1,
      };

      return {
        ...state,
        items: [...state.items, newItem],
      };
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
    saveForLater: (state, action) => {
      state.savedForLaterItems = state.savedForLaterItems || [];
      state.savedForLaterItems.push(action.payload);
    },
    moveItemToCart: (state, action) => {
      const movedItem = action.payload;
      state.savedForLaterItems = state.savedForLaterItems.filter(
        (item) => item._id !== movedItem._id
      );
      state.items.push(movedItem);
    },
    removeFromSavedForLater: (state, action) => {
      state.savedForLaterItems = state.savedForLaterItems.filter(
        (item) => item._id !== action.payload
      );
    },
    setSavedForLaterItems: (state, action) => {
      state.savedForLaterItems = action.payload;
    },
  },
});

export const {
  setItems,
  addToCart,
  removeFromCart,
  saveForLater,
  moveItemToCart,
  removeFromSavedForLater,
  setSavedForLaterItems,
} = cartSlice.actions;

export default cartSlice.reducer;

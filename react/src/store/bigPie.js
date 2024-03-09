import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./counterSlice";
import authSlice from "./authSlice";
import darkThemeSlice from "./darkThemeSlice";
import cartReducer, { setItems, setSavedForLaterItems } from "./cartSlice";

const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
const savedForLaterItems =
  JSON.parse(localStorage.getItem("savedForLaterItems")) || [];

const preloadedState = {
  cart: {
    items: cartItems,
    savedForLaterItems: savedForLaterItems,
  },
};

const store = configureStore({
  reducer: {
    counterSlice,
    authSlice,
    darkThemeSlice,
    cart: cartReducer,
  },
  preloadedState,
});
store.dispatch(setItems(cartItems));
store.dispatch(setSavedForLaterItems(savedForLaterItems));

export default store;

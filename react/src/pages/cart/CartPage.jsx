import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import SavedItems from "./SavedItems";
import {
  addToCart,
  removeFromCart,
  setItems,
  saveForLater,
  moveItemToCart,
  removeFromSavedForLater,
  setSavedForLaterItems,
} from "../../store/cartSlice";
import CartItemsDisplay from "./CartItemsDisplay";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.items) ?? [];
  const savedForLaterItems =
    useSelector((state) => state.cart.savedForLaterItems) ?? [];
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleEmptyCart = () => {
    dispatch(setItems([]));
    setSuccessMessage("Cart emptied successfully!");
    setErrorMessage("");
  };

  const handleEmptySavedItems = () => {
    dispatch(setSavedForLaterItems([]));
    setSuccessMessage("Saved items emptied successfully!");
    setErrorMessage("");
  };

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      dispatch(setItems(JSON.parse(storedCartItems)));
    }

    const storedSavedForLaterItems = localStorage.getItem("savedForLaterItems");
    if (storedSavedForLaterItems) {
      dispatch(setSavedForLaterItems(JSON.parse(storedSavedForLaterItems)));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem(
      "savedForLaterItems",
      JSON.stringify(savedForLaterItems)
    );
  }, [savedForLaterItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleMoveToCart = (itemId) => {
    const itemToMove = savedForLaterItems.find((item) => item._id === itemId);

    if (itemToMove) {
      const existingCartItemIndex = cartItems.findIndex(
        (item) => item._id === itemId
      );

      if (existingCartItemIndex !== -1) {
        const updatedCartItems = cartItems.map((item) =>
          item._id === itemId
            ? { ...item, quantity: item.quantity + itemToMove.quantity }
            : item
        );
        dispatch(setItems(updatedCartItems));
      } else {
        dispatch(moveItemToCart(itemToMove));
      }

      const updatedSavedItems = savedForLaterItems.filter(
        (item) => item._id !== itemId
      );
      dispatch(setSavedForLaterItems(updatedSavedItems));
    }
  };

  const addToCartHandler = (item) => {
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      handleUpdateCartItem(item._id, existingItem.quantity + 1);
    } else {
      dispatch(addToCart({ ...item, quantity: 1 }));
      setSuccessMessage("Card added to cart successfully!");
      setErrorMessage("");
    }
  };

  const handleUpdateCartItem = (itemId, newQuantity, isSavedForLater) => {
    newQuantity = isNaN(newQuantity) ? 1 : Math.max(1, newQuantity);

    if (isSavedForLater) {
      const updatedSavedItems = savedForLaterItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      dispatch(setSavedForLaterItems(updatedSavedItems));
    } else {
      const updatedCartItems = cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      dispatch(setItems(updatedCartItems));
    }
  };

  const handleDeleteCartItem = (itemId, isSavedForLater) => {
    if (isSavedForLater) {
      dispatch(removeFromSavedForLater(itemId));
    } else {
      dispatch(removeFromCart(itemId));
    }
    setSuccessMessage("Card removed successfully!");
    setErrorMessage("");
  };

  const handleSaveForLater = (itemId) => {
    const itemToSave = cartItems.find((item) => item._id === itemId);
    const existingSavedItem = savedForLaterItems.find(
      (item) => item._id === itemId
    );

    if (itemToSave) {
      dispatch(removeFromCart(itemId));
      if (existingSavedItem) {
        const updatedSavedItems = savedForLaterItems.map((item) =>
          item._id === itemId
            ? { ...item, quantity: item.quantity + itemToSave.quantity }
            : item
        );
        dispatch(setSavedForLaterItems(updatedSavedItems));
      } else {
        dispatch(saveForLater(itemToSave));
      }
    }
  };

  const handleCheckout = () => {
    setSuccessMessage("Checkout functionality coming soon!");
    setErrorMessage("");
  };

  const totalCartPrice = cartItems.reduce((total, item) => {
    const itemPrice = parseFloat(item.price.replace("$", "").replace(/,/g, ""));
    let itemShippingCost = 0;

    if (item.shipping && item.shipping.toLowerCase().includes("free")) {
      itemShippingCost = 0;
    } else if (item.shipping) {
      itemShippingCost = parseFloat(
        item.shipping.replace("$", "").replace(/,/g, "")
      );
    }

    const itemTotal = itemPrice * item.quantity + itemShippingCost;

    return total + itemTotal;
  }, 0);

  return (
    <Container>
      <Typography
        sx={{
          fontFamily: "serif",
          textAlign: "center",
          py: 5,
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#333",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
        variant="h1"
      >
        MY CART
      </Typography>
      <Divider
        sx={{
          mt: 4,
          mb: 10,
          mx: "auto",
          width: "50%",
          backgroundColor: "linear-gradient(to right, #ccc, #999, #ccc)",
          height: "4px",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />

      {cartItems.length === 0 ? (
        <Typography variant="h5" sx={{ textAlign: "center" }}>
          Your shopping cart is empty.
        </Typography>
      ) : (
        <CartItemsDisplay
          cartItems={cartItems}
          totalCartPrice={totalCartPrice}
          handleDeleteCartItem={handleDeleteCartItem}
          handleUpdateCartItem={handleUpdateCartItem}
          handleSaveForLater={handleSaveForLater}
          handleEmptyCart={handleEmptyCart}
          navigate={navigate}
        />
      )}

      {successMessage && <div>{successMessage}</div>}
      {errorMessage && <div>{errorMessage}</div>}

      {savedForLaterItems.length > 0 && (
        <SavedItems
          savedForLaterItems={savedForLaterItems}
          handleDeleteCartItem={handleDeleteCartItem}
          handleMoveToCart={handleMoveToCart}
          handleEmptySavedItems={handleEmptySavedItems}
        />
      )}
    </Container>
  );
};

export default CartPage;

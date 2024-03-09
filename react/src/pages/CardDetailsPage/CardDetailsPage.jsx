import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  useMediaQuery,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { addToCart, setItems } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import CardDetailsContent from "./CardDetailsContent";
import CardDetailsAside from "./CardDetailsAside";

const CardDetailsPage = () => {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const [cardDetails, setCardDetails] = useState(null);
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/cards/${cardId}`
        );

        if (response.data) {
          setCardDetails(response.data);

          if (response.data.images && response.data.images.length > 0) {
            setSelectedImage(response.data.images[0]);
          }
        } else {
          setErrorMessage("Invalid response structure. Please check the API.");
        }
      } catch (error) {
        setErrorMessage("Error fetching card details. Please try again.");
      }
    };

    fetchCardDetails();
  }, [cardId]);

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    if (!cardDetails) {
      setErrorMessage("Unable to add item to cart. Card details are missing.");
      return;
    }

    const existingCartItem = cartItems.find(
      (item) => item._id === cardDetails._id
    );

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === cardDetails._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      dispatch(setItems(updatedCartItems));
    } else {
      const newItem = {
        _id: cardDetails._id,
        title: cardDetails.title || "No Title",
        price: cardDetails.price || "No Price",
        shipping: cardDetails.shipping || "No Shipping",
        imgs: selectedImage || { url: "", alt: "No Alt Text" },
        quantity: 1,
      };

      dispatch(addToCart(newItem));
    }

    setSuccessMessage("Card added to cart successfully!");
    setErrorMessage("");
  };

  const handleLikeCard = async () => {
    setIsLiked(!isLiked);

    try {
      const response = await axios.patch(
        `http://localhost:8080/cards/${cardDetails._id}`,
        {
          like: !isLiked,
          shipping: cardDetails.shipping,
          brand: cardDetails.brand,
          price: cardDetails.price,
          bizNumber: cardDetails.cardNumber,
        },
        {
          headers: {
            Authorization: "Bearer YOUR_AUTH_TOKEN",
          },
        }
      );


      localStorage.setItem(`like_${cardDetails._id}`, (!isLiked).toString());

      setErrorMessage("");
    } catch (error) {

      setIsLiked(!isLiked);
      setErrorMessage("Error updating like status. Please try again.");
      setSuccessMessage("");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: isSmallScreen ? "10px" : "20px",
      }}
    >
      <Snackbar
        open={!!successMessage}
        autoHideDuration={6000}
        onClose={() => setSuccessMessage("")}
      >
        <Alert severity="success">{successMessage}</Alert>
      </Snackbar>
      <Snackbar
        open={!!errorMessage}
        autoHideDuration={6000}
        onClose={() => setErrorMessage("")}
      >
        <Alert severity="error">{errorMessage}</Alert>
      </Snackbar>
      <CardDetailsAside />
      <CardDetailsContent
        cardDetails={cardDetails}
        selectedImage={selectedImage}
        handleAddToCart={handleAddToCart}
        handleLikeCard={handleLikeCard}
        isLiked={isLiked}
        loggedIn={loggedIn}
        handleThumbnailClick={handleThumbnailClick}
      />
    </Box>
  );
};

export default CardDetailsPage;

import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { addToCart, removeFromCart, setItems } from "../store/cartSlice";
import { useMediaQuery } from "@mui/material";

const CardComponent = ({
  _id,
  title,
  subTitle,
  brand,
  price,
  shipping,
  imgs,
  alt,
  like,
  cardNumber,
  onDeleteCard,
  onToggleFavorite,
  onEditCard,
}) => {
  const location = useLocation();
  const currentPage = location.pathname;
  const [isLiked, setIsLiked] = useState(like);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const loggedIn = useSelector((bigPie) => bigPie.authSlice.loggedIn);
  const userData = useSelector((state) => state.authSlice.userData) || {};
  const isAdmin = useSelector((bigPie) => bigPie.authSlice.isAdmin);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  useEffect(() => {
    const storedLikeStatus = localStorage.getItem(`like_${_id}`);
    if (storedLikeStatus !== null && !like) {
      setIsLiked(JSON.parse(storedLikeStatus));
    }
  }, [_id, isLiked, currentPage]);

  useEffect(() => {
    setIsClicked(false);
  }, []);

  const handleDeleteCardClick = async () => {
    try {
      setSuccessMessage("Card deleted successfully!");
      setErrorMessage("");

      await onDeleteCard(_id);

      dispatch(removeFromCart(_id));
    } catch (error) {
      setErrorMessage("Error deleting card. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleClickEditCard = () => {
    if (userData.isAdmin || userData.isBusiness) {
      onEditCard(_id);
    }
  };

  const handleAddToCart = () => {
    const existingCartItem = cartItems.find((item) => item._id === _id);

    if (existingCartItem) {
      const updatedCartItems = cartItems.map((item) =>
        item._id === _id ? { ...item, quantity: item.quantity + 1 } : item
      );
      dispatch(setItems(updatedCartItems));
    } else {
      dispatch(
        addToCart({
          _id,
          title,
          price,
          brand,
          shipping,
          imgs,
          alt,
          quantity: 1,
        })
      );
    }

    setIsClicked(true);
    setErrorMessage("");
  };

  const handleLikeCard = async () => {
    setIsLiked(!isLiked);
    if (onToggleFavorite) onToggleFavorite();
    try {
      const response = await axios.patch(
        `http://localhost:8080/cards/${_id}`,
        { like: !isLiked, shipping, brand, price, bizNumber: cardNumber },
        {
          headers: {
            Authorization: "Bearer YOUR_AUTH_TOKEN",
          },
        }
      );
      console.log("Response after updating like status:", response);
      localStorage.setItem(`like_${_id}`, (!isLiked).toString());

      setIsLiked((prevIsLiked) => !prevIsLiked);
      setErrorMessage("");
    } catch (error) {
      setIsLiked(!isLiked);
      setErrorMessage("Error updating like status. Please try again.");
      setSuccessMessage("");
    }
  };

  const handleCardClick = () => {
    navigate(`/card-details/${_id}`);
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid gray",
        boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
      }}
    >
      <CardActionArea
        sx={{
          backgroundColor: "#FFFFFF",
          "&:hover": { backgroundColor: "#FFFFFF" },
        }}
      >
        <CardMedia
          onClick={handleCardClick}
          sx={{
            width: "100%",
            height: isSmallScreen ? "auto" : "200px",
            objectFit: "contain",
          }}
          component="img"
          src={imgs.url}
          alt={imgs.alt}
          onLoad={() => console.log("Image loaded:", imgs.url)}
          onError={() => console.error("Error loading image:", imgs.url)}
        />
      </CardActionArea>
      <CardContent>
        <CardHeader
          onClick={handleCardClick}
          title={title}
          subheader={subTitle}
          sx={{ p: 0, mb: 1 }}
        />{" "}
        <Divider />
        <Box sx={{ mt: 1 }} onClick={handleCardClick}>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              Price:{" "}
            </Typography>
            {price}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              brand:{" "}
            </Typography>
            {brand}
          </Typography>
          <Typography variant="body2">
            <Typography fontWeight="700" variant="subtitle1" component="span">
              shipping:{" "}
            </Typography>
            {shipping}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {loggedIn && userData.isAdmin ? (
              <IconButton
                style={{ color: "darkOrange" }}
                onClick={handleClickEditCard}
              >
                <CreateIcon />
              </IconButton>
            ) : loggedIn &&
              userData.isBusiness &&
              currentPage === "/MyCardsPage" ? (
              <IconButton
                style={{ color: "black" }}
                onClick={handleClickEditCard}
              >
                <CreateIcon />
              </IconButton>
            ) : null}
          </Box>

          <Box>
            {isAdmin ? (
              <IconButton color="error" onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            ) : userData.isBusiness && currentPage === "/MyCardsPage" ? (
              <IconButton onClick={handleDeleteCardClick}>
                <DeleteIcon />
              </IconButton>
            ) : null}

            {loggedIn && (
              <IconButton sx={{ color: "gold" }} onClick={handleLikeCard}>
                <StarIcon color={isLiked ? "gold" : "action"} />
              </IconButton>
            )}
            <IconButton
              aria-label="add to shopping cart"
              onClick={handleAddToCart}
              color={
                cartItems.find((item) => item._id === _id)
                  ? "primary"
                  : "default"
              }
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
      {successMessage && (
        <Typography style={{ color: "green" }}>{successMessage}</Typography>
      )}
      {errorMessage && (
        <Typography style={{ color: "red" }}>{errorMessage}</Typography>
      )}
    </Card>
  );
};

CardComponent.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  brand: PropTypes.string,
  price: PropTypes.string,
  shipping: PropTypes.string,
  imgs: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  like: PropTypes.bool,
  cardNumber: PropTypes.number,
  onDeleteCard: PropTypes.func.isRequired,
  onEditCard: PropTypes.func,
};

CardComponent.defaultProps = {
  imgs: "https://images.squarespace-cdn.com/content/v1/54fc8146e4b02a22841f4df7/1576109959614-JQLPDAFVBOOMM1MRIPOD/Cover3.jpg",
  alt: "overlord",
};

export default CardComponent;

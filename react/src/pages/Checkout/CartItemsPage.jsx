import React, { useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Snackbar,
  useMediaQuery,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setItems } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";

const CartItemsPage = ({ handlePrevStep, formData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const isSmallScreen = useMediaQuery("(max-width: 850px)");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calculateItemTotal = (item) => {
    return (
      parseFloat(item.price.replace("$", "").replace(/,/g, "")) *
      Math.max(1, item.quantity)
    );
  };

  const calculateTotalCartPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(
        item.price.replace("$", "").replace(/,/g, "")
      );
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
  };

  const handleOrderConfirmation = async () => {
    setLoading(true);

    const orderedCardDetails = cartItems.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));

    const deliveryInformationData = {
      userEmail: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      phone: formData.phone,
      shippingMethod: formData.shippingMethod,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/users/order-confirmation",
        {
          userEmail: formData.email,
          orderedCardDetails: orderedCardDetails,
          formData: {
            DeliveryInformation: deliveryInformationData,
          },
        }
      );

      console.log(response.data);

      dispatch(setItems([]));
      navigate("/THANKYOUPAGE");
    } catch (error) {
      setError("Failed to confirm the order. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Cart Items
      </Typography>
      <Divider style={{ margin: "16px 0" }} />
      <div>
        {cartItems.map((item) => (
          <div
            key={item._id}
            style={{ marginBottom: isSmallScreen ? "10px" : "20px" }}
          >
            <Card style={{ marginBottom: isSmallScreen ? "5px" : "15px" }}>
              <CardContent
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: isSmallScreen ? "column" : "row",
                }}
              >
                {item.imgs && item.imgs.url && (
                  <img
                    src={item.imgs.url}
                    alt={item.imgs.alt || ""}
                    style={{
                      width: isSmallScreen ? "100px" : "100px",
                      height: isSmallScreen ? "100px" : "100px",
                      marginTop: isSmallScreen ? "10px" : 0,
                    }}
                  />
                )}
                <Typography
                  variant="h6"
                  sx={{ flex: 1, textAlign: isSmallScreen ? "center" : "left" }}
                >
                  {item.title}
                </Typography>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  Price: {item.price}
                </Typography>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  Quantity: {item.quantity}
                </Typography>
                <Typography variant="body1" sx={{ flex: 1 }}>
                  Shipping: {item.shipping}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      <Typography variant="h6" align="right" gutterBottom>
        Total Price: ${calculateTotalCartPrice().toFixed(2)}
      </Typography>

      <Button
        sx={{
          mr: 1,
          width: "10vw",
          height: "3vh",
          bgcolor: "darkblue",
          color: "white",
          borderRadius: "999px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "bold",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
        color="primary"
        variant="contained"
        onClick={handlePrevStep}
      >
        Previous
      </Button>
      <Button
        sx={{
          width: "10vw",
          height: "3vh",
          bgcolor: "darkGreen",
          color: "white",
          borderRadius: "999px",
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
          textTransform: "uppercase",
          letterSpacing: "1px",
          fontWeight: "bold",
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.05)",
            bgcolor: "green",
            boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.3)",
          },
        }}
        variant="contained"
        onClick={handleOrderConfirmation}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : "Confirm Order"}
      </Button>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError(null)}
        message={error}
      />
    </Box>
  );
};

export default CartItemsPage;

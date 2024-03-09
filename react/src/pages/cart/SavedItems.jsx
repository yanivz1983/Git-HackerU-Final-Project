import React from "react";
import { Typography, Divider, Button } from "@mui/material";
import CartItem from "../cart/CartItem";

const SavedItems = ({
  savedForLaterItems,
  handleDeleteCartItem,
  handleMoveToCart,
  handleEmptySavedItems,
}) => {
  return (
    <div>
      <Typography
        sx={{
          mt: 5,
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
        SAVED ITEMS
      </Typography>
      <Divider
        sx={{
          mt: 4,
          mb: 7,
          mx: "auto",
          width: "50%",
          backgroundColor: "linear-gradient(to right, #ccc, #999, #ccc)",
          height: "4px",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />
      {savedForLaterItems.map((item) => (
        <CartItem
          key={item._id}
          _id={item._id}
          title={item.title}
          price={item.price}
          shipping={item.shipping}
          imgs={{
            url: item.imgs.url || "",
            alt: item.imgs.alt || "",
          }}
          quantity={item.quantity}
          onDeleteCartItem={() => handleDeleteCartItem(item._id, true)}
          onUpdateCartItem={() => console.log("Update saved item")}
          onSaveForLater={() => handleMoveToCart(item._id)}
          isSavedForLater={true}
        />
      ))}
      <Button
        sx={{
          height: "3vh",
          mt: 3,
          mb: 2,
          mr: 2,
          bgcolor: "red",
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
        color="error"
        variant="contained"
        className="cart__btn-empty"
        onClick={handleEmptySavedItems}
      >
        Empty items
      </Button>
    </div>
  );
};

export default SavedItems;

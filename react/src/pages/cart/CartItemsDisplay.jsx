import React from "react";
import { Typography, Button } from "@mui/material";
import CartItem from "../cart/CartItem";
import ROUTES from "../../routes/ROUTES";

const CartItemsDisplay = ({
  cartItems,
  totalCartPrice,
  handleDeleteCartItem,
  handleUpdateCartItem,
  handleSaveForLater,
  handleEmptyCart,
  navigate,
}) => {
  return (
    <div>
      {cartItems.map((item) => (
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
          onDeleteCartItem={handleDeleteCartItem}
          onUpdateCartItem={handleUpdateCartItem}
          onSaveForLater={handleSaveForLater}
        />
      ))}
      <Typography variant="h6" sx={{ mt: 2, textAlign: "right" }}>
        Total Price: $
        {isNaN(totalCartPrice) ? "0.00" : totalCartPrice.toFixed(2).toString()}
      </Typography>

      <div
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mt: 2,
          py: 2,
        }}
      >
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
          onClick={handleEmptyCart}
        >
          Empty cart
        </Button>

        <Button
          sx={{
            height: "3vh",
            mt: 3,
            mb: 2,
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
          variant="contained"
          className="cart__btn-checkout"
          onClick={() =>
            navigate(ROUTES.CHECKOUTPAGE, {
              state: {
                cartItems: cartItems,
                totalCartPrice: totalCartPrice,
              },
            })
          }
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartItemsDisplay;

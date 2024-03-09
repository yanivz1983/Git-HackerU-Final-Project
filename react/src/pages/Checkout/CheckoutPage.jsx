import React, { useState } from "react";
import DeliveryInformationPage from "./DeliveryInformationPage";
import PaymentInformationPage from "./PaymentInformationPage";
import CartItemsPage from "./CartItemsPage";
import { Typography, Divider } from "@mui/material";

const CheckoutPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    phone: "",
    shippingMethod: "",
    paymentMethod: "creditCard",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    useShippingAsBilling: true,
    billingAddress: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      zipCode: "",
    },
  });

  const calculateTotalCartPrice = () => {
    return 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBillingInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      billingAddress: {
        ...prevData.billingAddress,
        [name]: value,
      },
    }));
  };

  const handleNextStep = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const steps = [
    <DeliveryInformationPage
      formData={formData}
      handleInputChange={handleInputChange}
      handleNextStep={handleNextStep}
    />,
    <PaymentInformationPage
      formData={formData}
      handleInputChange={handleInputChange}
      handleBillingInputChange={handleBillingInputChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <CartItemsPage
      totalCartPrice={calculateTotalCartPrice()}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
      formData={formData}
    />,
  ];

  return (
    <div>
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
        CHECKOUT
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
      {steps[activeStep]}
    </div>
  );
};

export default CheckoutPage;

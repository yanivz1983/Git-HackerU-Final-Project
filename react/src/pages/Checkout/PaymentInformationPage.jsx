import React from "react";
import {
  Typography,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  TextField,
  Checkbox,
  Box,
  Button,
} from "@mui/material";

const PaymentInformationPage = ({
  formData,
  handleInputChange,
  handleBillingInputChange,
  handleNextStep,
  handlePrevStep,
}) => {
  const inputSchema = {
    cardNumber: { minLength: 16, maxLength: 16 },
    expiryDate: { minLength: 5, maxLength: 5 },
    cvv: { minLength: 3, maxLength: 4 },
    billingAddress: {
      firstName: { minLength: 2, maxLength: 15 },
      lastName: { minLength: 2, maxLength: 15 },
      address: { minLength: 2, maxLength: 15 },
      city: { minLength: 2, maxLength: 15 },
      zipCode: { minLength: 5, maxLength: 10 },
    },
    paymentMethod: { minLength: 1, maxLength: 10 }, 
  };

  const isFormValid = () => {
    if (formData.paymentMethod === "creditCard") {
      const { cardNumber, expiryDate, cvv } = formData;
      if (!cardNumber || !expiryDate || !cvv) {
        return false; 
      }
      if (
        cardNumber.length !== inputSchema.cardNumber.maxLength ||
        expiryDate.length !== inputSchema.expiryDate.maxLength ||
        cvv.length < inputSchema.cvv.minLength ||
        cvv.length > inputSchema.cvv.maxLength
      ) {
        return false; 
      }
    } else if (formData.paymentMethod === "paypal") {
      return false; 
    }

    if (!formData.useShippingAsBilling) {
      const { firstName, lastName, address, city, zipCode } =
        formData.billingAddress;
      if (!firstName || !lastName || !address || !city || !zipCode) {
        return false; 
      }
      if (
        firstName.length < inputSchema.billingAddress.firstName.minLength ||
        firstName.length > inputSchema.billingAddress.firstName.maxLength ||
        lastName.length < inputSchema.billingAddress.lastName.minLength ||
        lastName.length > inputSchema.billingAddress.lastName.maxLength ||
        address.length < inputSchema.billingAddress.address.minLength ||
        address.length > inputSchema.billingAddress.address.maxLength ||
        city.length < inputSchema.billingAddress.city.minLength ||
        city.length > inputSchema.billingAddress.city.maxLength ||
        zipCode.length < inputSchema.billingAddress.zipCode.minLength ||
        zipCode.length > inputSchema.billingAddress.zipCode.maxLength
      ) {
        return false;
      }
    }

    return true; 
  };

  const handleNextStepWithValidation = () => {
    if (formData.paymentMethod === "creditCard") {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvv) {
        return;
      }
    }

    handleNextStep();
  };

  const handleInputChangeWithValidation = (event) => {
    const { name, value } = event.target;
    const { minLength, maxLength, type } = inputSchema[name];

    if (type === "number" && isNaN(value)) {
      return;
    }

    let formattedValue = value;

    if (name === "expiryDate" && value.length === 4 && !value.includes("/")) {
      formattedValue = value.replace(/(\d{2})(\d{2})/, "$1/$2");
    }

    if (formattedValue.length <= maxLength || name === "expiryDate") {
      handleInputChange({ target: { name, value: formattedValue } });
    }
  };

  const handleBillingInputChangeWithValidation = (event) => {
    const { name, value } = event.target;
    const { minLength, maxLength, type } = inputSchema.billingAddress[name];

    if (type === "number" && isNaN(value)) {
      return;
    }

    if (value.length <= maxLength) {
      handleBillingInputChange(event);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Payment Information
      </Typography>
      <Divider style={{ margin: "16px 0" }} />
      <RadioGroup
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleInputChange}
      >
        <FormControlLabel
          value="creditCard"
          control={<Radio />}
          label="Credit Card"
        />
        <FormControlLabel value="paypal" control={<Radio />} label="PayPal" />
      </RadioGroup>
      {formData.paymentMethod === "creditCard" && (
        <>
          <Typography variant="h6" gutterBottom>
            Credit Card Details
          </Typography>
          <Divider style={{ margin: "16px 0" }} />
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Card Number"
                name="cardNumber"
                type="number"
                value={formData.cardNumber}
                onChange={handleInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.cardNumber.minLength,
                  maxLength: inputSchema.cardNumber.maxLength,
                }}
                placeholder="Minimum 16 Numbers Max 16"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expiration Date"
                name="expiryDate"
                value={formData.expiryDate}
                onChange={handleInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.expiryDate.minLength,
                  maxLength: inputSchema.expiryDate.maxLength,
                  pattern: "(0[1-9]|1[0-2])/(\\d{2})",
                }}
                placeholder="Minimum 4  Characters or Numbers Max 5 "
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="CVV"
                name="cvv"
                value={formData.cvv}
                onChange={handleInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.cvv.minLength,
                  maxLength: inputSchema.cvv.maxLength,
                }}
                placeholder="Minimum 3 Numbers Max 4"
              />
            </Grid>
          </Grid>
        </>
      )}
      {formData.paymentMethod === "paypal" && (
        <>
          <Typography variant="h6" gutterBottom>
            PayPal
          </Typography>
          <Divider style={{ margin: "16px 0" }} />
          <Typography variant="body1" gutterBottom>
            Coming soon 😉
          </Typography>
        </>
      )}
      <FormControlLabel
        sx={{ mt: 2 }}
        control={
          <Checkbox
            checked={formData.useShippingAsBilling}
            onChange={() =>
              handleInputChange({
                target: {
                  name: "useShippingAsBilling",
                  value: !formData.useShippingAsBilling,
                },
              })
            }
            name="useShippingAsBilling"
          />
        }
        label="Use shipping address as billing address"
      />

      {!formData.useShippingAsBilling && (
        <>
          <Typography variant="h6" gutterBottom>
            Billing Address
          </Typography>
          <Divider style={{ margin: "16px 0" }} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Billing First Name"
                name="firstName"
                value={formData.billingAddress.firstName}
                onChange={handleBillingInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.billingAddress.firstName.minLength,
                  maxLength: inputSchema.billingAddress.firstName.maxLength,
                }}
                placeholder="Minimum 2 Characters Max 15"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Billing Last Name"
                name="lastName"
                value={formData.billingAddress.lastName}
                onChange={handleBillingInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.billingAddress.lastName.minLength,
                  maxLength: inputSchema.billingAddress.lastName.maxLength,
                }}
                placeholder="Minimum 2 Characters Max 15"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Billing Address"
                name="address"
                value={formData.billingAddress.address}
                onChange={handleBillingInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.billingAddress.address.minLength,
                  maxLength: inputSchema.billingAddress.address.maxLength,
                }}
                placeholder="Minimum 5 Characters Max 15"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Billing City"
                name="city"
                value={formData.billingAddress.city}
                onChange={handleBillingInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.billingAddress.city.minLength,
                  maxLength: inputSchema.billingAddress.city.maxLength,
                }}
                placeholder="Minimum 2 Characters Max 15"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Billing ZIP Code"
                name="zipCode"
                value={formData.billingAddress.zipCode}
                onChange={handleBillingInputChangeWithValidation}
                fullWidth
                required
                inputProps={{
                  minLength: inputSchema.billingAddress.zipCode.minLength,
                  maxLength: inputSchema.billingAddress.zipCode.maxLength,
                  type: "number",
                }}
                placeholder="Minimum 5 Numbers Max 10"
              />
            </Grid>
          </Grid>
        </>
      )}
      <Box mt={2}>
        <Button
          sx={{
            width: "10vw",
            height: "3vh",
            mr: 1,
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
          disabled={!isFormValid()}
          color="primary"
          variant="contained"
          onClick={handleNextStepWithValidation}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentInformationPage;

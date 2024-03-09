import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Divider,
  Grid,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
} from "@mui/material";

const DeliveryInformationPage = ({
  formData,
  handleNextStep,
  handleInputChange,
}) => {
  const validShippingMethods = [
    "Standard Shipping",
    "Expedited Shipping (1-7 days)",
    "Express Shipping (3 days)",
  ];

  const [shippingMethod, setShippingMethod] = useState(
    validShippingMethods.includes(formData?.shippingMethod)
      ? formData.shippingMethod
      : "disabled"
  );

  useEffect(() => {
    setShippingMethod(
      validShippingMethods.includes(formData?.shippingMethod)
        ? formData.shippingMethod
        : "disabled"
    );
  }, [formData, validShippingMethods]);

  const isFormValid = () => {
    const requiredFields = [
      { name: "firstName", minLength: 2, maxLength: 15 },
      { name: "lastName", minLength: 2, maxLength: 15 },
      { name: "email", minLength: 10, maxLength: 50 },
      { name: "address", minLength: 2, maxLength: 15 },
      { name: "city", minLength: 2, maxLength: 15 },
      { name: "zipCode", minLength: 5, maxLength: 11 },
      { name: "phone", minLength: 10, maxLength: 15 },
    ];

    const allFieldsValid = requiredFields.every((field) => {
      const value = formData[field.name]?.trim();
      return (
        value &&
        value.length >= field.minLength &&
        value.length <= field.maxLength
      );
    });

    const shippingMethodSelected = validShippingMethods.includes(
      formData.shippingMethod
    );

    return allFieldsValid && shippingMethodSelected;
  };

  const handleNext = () => {
    if (isFormValid()) {
      const selectedShippingMethod = validShippingMethods.find(
        (method) => method === shippingMethod
      );

      if (!selectedShippingMethod) {
        return;
      }

      handleNextStep({
        ...formData,
        shippingMethod: {
          value: selectedShippingMethod,
          label: selectedShippingMethod,
        },
      });
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Delivery Information
      </Typography>
      <Divider style={{ margin: "16px 0" }} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name"
            placeholder="Minimum 2 Characters Max 15"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Last Name"
            placeholder="Minimum 2 Characters Max 15"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            placeholder="Minimum 10 Characters Max 50"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Address"
            placeholder="Minimum 2 Characters Max 15"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Apartment, Suite, etc."
            name="apartment"
            type="text"
            value={formData.apartment}
            onChange={handleInputChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="City"
            placeholder="Minimum 2 Characters Max 15"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="ZIP Code"
            placeholder="Minimum 5 Numbers Max 11"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Phone"
            placeholder="Minimum 10 Numbers or Characters Max 15"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            fullWidth
            required
          />
        </Grid>
      </Grid>
      <Typography mt={5} variant="h6" gutterBottom>
        Shipping Method
      </Typography>
      <Divider style={{ margin: "16px 0" }} />
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <Select
              labelId="shippingMethodLabel"
              name="shippingMethod"
              value={shippingMethod}
              onChange={(e) => handleInputChange(e)}
              required
            >
              <MenuItem value="disabled" disabled>
                Select a Shipping Method
              </MenuItem>
              {validShippingMethods.map((method) => (
                <MenuItem key={method} value={method}>
                  {method}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Box mt={2}>
        <Button
          sx={{
            width: "10vw",
            height: "3vh",
            mt: 3,
            mb: 2,
            bgcolor: "darkblue",
            color: "white",
            borderRadius: "999px",
            boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
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
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default DeliveryInformationPage;

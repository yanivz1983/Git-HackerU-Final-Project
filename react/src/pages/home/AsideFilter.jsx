import React, { useState, useEffect } from "react";
import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const AsideFilter = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState("all");
  const [brandFilter, setBrandFilter] = useState("all");
  const [shippingFilter, setShippingFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [showBrandFilter, setShowBrandFilter] = useState(false);
  const [showShippingFilter, setShowShippingFilter] = useState(false);

  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const filters = {
      price: {
        min: 0,
        max: Infinity,
      },
      brand: brandFilter !== "all" ? brandFilter : undefined,
      shipping: shippingFilter !== "all" ? shippingFilter : undefined,
    };

    if (priceRange === "0-125") {
      filters.price = { min: 0, max: 125 };
    } else if (priceRange === "125-250") {
      filters.price = { min: 125, max: 250 };
    } else if (priceRange === "250-500") {
      filters.price = { min: 250, max: 500 };
    } else if (priceRange === "500-1000") {
      filters.price = { min: 500, max: 1000 };
    } else if (priceRange === "1000-2500") {
      filters.price = { min: 1000, max: 2500 };
    } else if (priceRange === "2500-5000") {
      filters.price = { min: 2500, max: 5000 };
    } else if (priceRange === "5000-10000") {
      filters.price = { min: 5000, max: 10000 };
    }

    onFilterChange(filters);
  }, [priceRange, brandFilter, shippingFilter, onFilterChange]);

  const handlePriceRangeChange = (event) => {
    setPriceRange(event.target.value);
  };

  const handleBrandFilterChange = (event) => {
    setBrandFilter(event.target.value);
  };

  const handleShippingFilterChange = (event) => {
    setShippingFilter(event.target.value);
  };

  const handleToggleFilter = (filter) => {
    switch (filter) {
      case "price":
        setShowPriceRange((prev) => !prev);
        break;
      case "brand":
        setShowBrandFilter((prev) => !prev);
        break;
      case "shipping":
        setShowShippingFilter((prev) => !prev);
        break;
      default:
        break;
    }
  };

  const handleResetFilters = () => {
    setPriceRange("all");
    setBrandFilter("all");
    setShippingFilter("all");
  };

  return (
    <div
      className={`aside-filter-container ${showFilters ? "open" : ""}`}
      style={{
        height: "60vh",
        width: isScreenSmaller ? "53%" : "9%",
        marginTop: 150,
        overflowY: "scroll",
        marginBottom: 70,
        border: "none",
        position: "fixed",
        backgroundColor: "",
        color: "black",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "serif",
          fontSize: "2rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
          color: "#333",
          py: 5,
          mb: 2,
          display: "block",
          width: "100%",
          padding: "10px",
          textAlign: "left",
        }}
      >
        Filters
      </Typography>
      <Button
        onClick={() => handleToggleFilter("price")}
        sx={{
          mb: 2,
          display: "block",
          color: "blue",
          fontFamily: "serif",
          fontSize: "1rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Price
      </Button>
      {showPriceRange && (
        <RadioGroup
          aria-label="price-range"
          name="price-range"
          value={priceRange}
          onChange={handlePriceRangeChange}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="0-125" control={<Radio />} label="0-125" />
          <FormControlLabel
            value="125-250"
            control={<Radio />}
            label="125-250"
          />
          <FormControlLabel
            value="250-500"
            control={<Radio />}
            label="250-500"
          />
          <FormControlLabel
            value="500-1000"
            control={<Radio />}
            label="500-1000"
          />
          <FormControlLabel
            value="1000-2500"
            control={<Radio />}
            label="1000-2500"
          />
          <FormControlLabel
            value="2500-5000"
            control={<Radio />}
            label="2500-5000"
          />
          <FormControlLabel
            value="5000-10000"
            control={<Radio />}
            label="5000-10000"
          />
        </RadioGroup>
      )}

      <Button
        onClick={() => handleToggleFilter("brand")}
        sx={{
          mb: 2,
          display: "block",
          color: "blue",
          fontFamily: "serif",
          fontSize: "1rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Brand
      </Button>
      {showBrandFilter && (
        <RadioGroup
          aria-label="brand"
          name="brand"
          value={brandFilter}
          onChange={handleBrandFilterChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All Brands"
          />
          <FormControlLabel value="Apple" control={<Radio />} label="Apple" />
          <FormControlLabel
            value="Microsoft"
            control={<Radio />}
            label="Microsoft"
          />
          <FormControlLabel
            value="Samsung"
            control={<Radio />}
            label="Samsung"
          />
          <FormControlLabel value="LG" control={<Radio />} label="LG" />
        </RadioGroup>
      )}

      <Button
        onClick={() => handleToggleFilter("shipping")}
        sx={{
          mb: 2,
          display: "block",
          color: "blue",
          fontFamily: "serif",
          fontSize: "1rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Shipping
      </Button>
      {showShippingFilter && (
        <RadioGroup
          aria-label="shipping"
          name="shipping"
          value={shippingFilter}
          onChange={handleShippingFilterChange}
        >
          <FormControlLabel
            value="all"
            control={<Radio />}
            label="All Shipping"
          />
          <FormControlLabel value="Free" control={<Radio />} label="Free" />
          <FormControlLabel value="0-100" control={<Radio />} label="0-100$" />
        </RadioGroup>
      )}

      <Button
        onClick={handleResetFilters}
        sx={{
          mb: 2,
          display: "block",
          color: "red",
          fontFamily: "serif",
          fontSize: "1rem",
          fontWeight: "bold",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Reset
      </Button>
    </div>
  );
};

export default AsideFilter;

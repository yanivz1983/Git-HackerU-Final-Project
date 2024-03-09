import React from "react";
import {
  TextField,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import { brandOptions } from "./constants";

const EditCardForm = ({
  inputsValue,
  handleInputChange,
  handleImageChange,
  handleAddImage,
  handleRemoveImage,
}) => {
  return (
    <Grid container flexDirection={"column"}>
      <TextField
        id="title"
        label="Title"
        variant="outlined"
        sx={{ mt: "10px" }}
        onChange={handleInputChange}
        placeholder="Enter the Title of the item (min 5 max 20 characters)"
        value={inputsValue.title}
        required
      />
      <TextField
        id="subtitle"
        label="SubTitle"
        variant="outlined"
        sx={{ mt: "10px" }}
        onChange={handleInputChange}
        placeholder="Enter the subtitle of the item (min 5 max 20 characters)"
        value={inputsValue.subtitle}
        required
      />
      <TextField
        id="description"
        label="Description"
        variant="outlined"
        sx={{ mt: "10px" }}
        onChange={handleInputChange}
        placeholder="Enter the Description of the item"
        value={inputsValue.description}
        required
      />
      <TextField
        id="price"
        label="price"
        variant="outlined"
        sx={{ mt: "10px" }}
        onChange={handleInputChange}
        placeholder="Enter the Price of the item"
        value={inputsValue.price}
        required
        
      />
      <TextField
        id="shipping"
        label="shipping"
        variant="outlined"
        sx={{ mt: "10px" }}
        onChange={handleInputChange}
        placeholder="Leave it free or Enter Shipping Price"
        value={inputsValue.shipping}
      />
      <FormControl
        variant="outlined"
        sx={{ mt: "10px", width: "100%" }}
        required
      >
        <InputLabel id="brand-label">Brand</InputLabel>
        <Select
          labelId="brand-label"
          id="brand"
          value={inputsValue.brand}
          onChange={(e) =>
            handleInputChange({
              target: { id: "brand", value: e.target.value },
            })
          }
          placeholder="Choose the Brand of the item"
          label="Brand"
        >
          {brandOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {inputsValue.images.map((image, index) => (
        <div key={index}>
          <TextField
            name={`url-${index}`}
            label={`URL ${index + 1}`}
            variant="outlined"
            sx={{ width: "50%", marginTop: 1 }}
            onChange={(e) => handleImageChange(e, index)}
            value={image.url}
            placeholder="Put Url with a jpg"
            required
          />
          <TextField
            name={`alt-${index}`}
            label={`Alt ${index + 1}`}
            variant="outlined"
            sx={{ width: "50%", marginTop: 1 }}
            onChange={(e) => handleImageChange(e, index)}
            value={image.alt}
            placeholder="the name of the Url"
            required
          />
          {index > 0 && (
            <Button
              variant="contained"
              color="error"
              sx={{
                mt: 2,
                width: "100%",
                height: "3vh",
                mb: 2,
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
              onClick={() => handleRemoveImage(index)}
            >
              Remove Image
            </Button>
          )}
        </div>
      ))}
      <Button
        variant="contained"
        sx={{
          mt: 4,
          width: "100%",
          height: "3vh",
          mb: 2,
          bgcolor: "gray",
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
            bgcolor: "darkgray",
          },
        }}
        onClick={handleAddImage}
      >
        Add Image
      </Button>
    </Grid>
  );
};

export default EditCardForm;

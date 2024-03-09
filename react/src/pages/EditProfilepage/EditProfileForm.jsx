import React from "react";
import { Grid, TextField, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const EditProfileForm = ({
  inputsValue,
  handleInputChange,
  showPassword,
  handleTogglePasswordVisibility,
}) => {
  return (
    <Grid container flexDirection={"column"}>
      {Object.keys(inputsValue).map((key) => (
        <TextField
          key={key}
          id={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue[key]}
          required={!["middleName", "state", "zip"].includes(key)}
          type={
            key === "password" ? (showPassword ? "text" : "password") : "text"
          }
          InputProps={
            key === "password" && {
              endAdornment: (
                <IconButton
                  size="small"
                  onClick={handleTogglePasswordVisibility}
                  sx={{ p: 0 }}
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              ),
            }
          }
        />
      ))}
    </Grid>
  );
};

export default EditProfileForm;

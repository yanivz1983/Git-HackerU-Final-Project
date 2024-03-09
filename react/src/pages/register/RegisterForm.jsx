import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ROUTES from "../../routes/ROUTES";
import { Link } from "react-router-dom";

const RegisterForm = ({
  inputsValue,
  validationErrors,
  checkboxChecked,
  handleInputsChange,
  handleCheckboxChange,
  togglePasswordVisibility,
  toggleConfirmPasswordVisibility,
  handleSubmit,
  showPassword,
  showConfirmPassword,
}) => {
  return (
    <form noValidate onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="given-name"
            name="first"
            required
            fullWidth
            id="first"
            label="First Name"
            autoFocus
            value={inputsValue.first}
            onChange={handleInputsChange}
            placeholder="your First Name (min 2 max 50 characters)"
            error={!!validationErrors.first}
            helperText={validationErrors.first}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            autoComplete="given-name"
            name="middle"
            fullWidth
            id="middle"
            label="Middle Name"
            autoFocus
            value={inputsValue.middle}
            onChange={handleInputsChange}
            placeholder="your Middle Name (min 2 max 50 characters)"
            error={!!validationErrors.middle}
            helperText={validationErrors.middle}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            fullWidth
            id="last"
            label="Last Name"
            name="last"
            autoComplete="family-name"
            value={inputsValue.last}
            onChange={handleInputsChange}
            placeholder="your Last Name (min 2 max 50 characters)"
            error={!!validationErrors.last}
            helperText={validationErrors.last}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={inputsValue.email}
            placeholder="example@gmail.com"
            onChange={handleInputsChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="new-password"
            value={inputsValue.password}
            onChange={handleInputsChange}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            placeholder="1-8 characters, letter & numbers, and 1 special"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            autoComplete="new-confirmPassword"
            value={inputsValue.confirmPassword}
            onChange={handleInputsChange}
            error={!!validationErrors.confirmPassword}
            helperText={validationErrors.confirmPassword}
            placeholder="1-8 characters, letter & numbers, and 1 special"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={toggleConfirmPasswordVisibility}>
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="phone"
            label="Phone"
            id="phone"
            autoComplete="new-phone"
            value={inputsValue.phone}
            placeholder="Need 10 Numbers "
            onChange={handleInputsChange}
            error={!!validationErrors.phone}
            helperText={validationErrors.phone}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name="url"
            label="Url"
            id="url"
            autoComplete="new-url"
            value={inputsValue.url}
            placeholder="Put Url with a jpg"
            onChange={handleInputsChange}
            error={!!validationErrors.url}
            helperText={validationErrors.url}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            required
            name="alt"
            label="Alt"
            id="alt"
            autoComplete="new-alt"
            value={inputsValue.alt}
            onChange={handleInputsChange}
            placeholder="the name of the Url"
            error={!!validationErrors.alt}
            helperText={validationErrors.alt}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="state"
            label="State"
            id="state"
            autoComplete="new-state"
            value={inputsValue.state}
            onChange={handleInputsChange}
            placeholder="Minimum 2 letter"
            error={!!validationErrors.state}
            helperText={validationErrors.state}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="country"
            label="Country"
            id="country"
            autoComplete="new-country"
            value={inputsValue.country}
            onChange={handleInputsChange}
            placeholder="Minimum 1 letter"
            error={!!validationErrors.country}
            helperText={validationErrors.country}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="city"
            label="City"
            id="city"
            autoComplete="new-city"
            value={inputsValue.city}
            onChange={handleInputsChange}
            placeholder="Minimum 1 letter"
            error={!!validationErrors.city}
            helperText={validationErrors.city}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="street"
            label="Street"
            id="street"
            autoComplete="new-street"
            value={inputsValue.street}
            onChange={handleInputsChange}
            placeholder="Minimum 1 letter"
            error={!!validationErrors.street}
            helperText={validationErrors.street}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="houseNumber"
            label="House Number"
            id="houseNumber"
            autoComplete="new-houseNumber"
            value={inputsValue.houseNumber}
            onChange={handleInputsChange}
            placeholder="Minimum 1 Number"
            error={!!validationErrors.houseNumber}
            helperText={validationErrors.houseNumber}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            name="zip"
            label="Zip"
            id="zip"
            autoComplete="new-zip"
            value={inputsValue.zip}
            onChange={handleInputsChange}
            placeholder="Minimum 1 Number"
            error={!!validationErrors.zip}
            helperText={validationErrors.zip}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkboxChecked}
                onChange={handleCheckboxChange}
                color="primary"
              />
            }
            label="Business Account"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, marginBottom: 5 }}
          >
            Sign Up
          </Button>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link to={ROUTES.LOGIN} variant="body2">
              Already have an account? Login
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default RegisterForm;

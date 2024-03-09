// RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RegisterForm from "./RegisterForm";
import axios from "axios";
import { normalizeData } from "./normalizeData";
import { validateRegister } from "../../validation/registerValidation";
import ROUTES from "../../routes/ROUTES";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [inputsValue, setInputsValue] = useState({
    first: "",
    middle: "",
    last: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCheckboxChange = () => {
    setCheckboxChecked(!checkboxChecked);
  };

  const handleInputsChange = (e) => {
    const { id, value } = e.target;
    setInputsValue((prevInputsValue) => ({
      ...prevInputsValue,
      [id]: value,
    }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const errors = validateRegister(inputsValue);
    if (errors) {
      setValidationErrors(errors);
      toast.error("Registration failed. Please fix the errors.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const requestData = {
        ...normalizeData(inputsValue),
        isBusiness: checkboxChecked,
      };
      const { data } = await axios.post(
        "http://localhost:8080/users",
        requestData,
        {
          headers: {
            Authorization: `Bearer `,
          },
        }
      );

      const userId = data.user._id;

      toast.success("Registration successful! Redirecting to login...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate(ROUTES.VERIFICATIONPAGE);
    } catch (err) {
      toast.error("Registration failed. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <RegisterForm
        inputsValue={inputsValue}
        validationErrors={validationErrors}
        checkboxChecked={checkboxChecked}
        handleInputsChange={handleInputsChange}
        handleCheckboxChange={handleCheckboxChange}
        togglePasswordVisibility={togglePasswordVisibility}
        toggleConfirmPasswordVisibility={toggleConfirmPasswordVisibility}
        handleSubmit={handleSubmit}
        showPassword={showPassword}
        showConfirmPassword={showConfirmPassword}
      />
    </Box>
  );
};

export default RegisterPage;

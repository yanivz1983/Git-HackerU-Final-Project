import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../../css/ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/users/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.ok) {
        toast.success("Reset password email sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate("/reset-password");
      } else {
        toast.error("Failed to send reset password email. Please try again.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="forgot-password-container">
      <h2 className="header">Forgot Password</h2>
      <div className="input-container">
        <TextField
          type="email"
          label="Enter your email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="button-container">
        <Button
          onClick={handleForgotPassword}
          variant="contained"
          color="primary"
        >
          Send reset password
        </Button>
      </div>
    </div>
  );
};

export default ForgotPassword;

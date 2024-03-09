import React, { useState, useEffect } from "react";
import { Container, Typography, Divider } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/authSlice";
import { useParams, useNavigate } from "react-router-dom";
import EditProfileForm from "./EditProfileForm";
import EditProfileButtons from "./EditProfileButtons";
import ROUTES from "../../routes/ROUTES";

const hashFunction = (password) => {
  return password;
};

const EditProfile = () => {
  const [userData, setUserData] = useState({});
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputsValue, setInputValue] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    alt: "",
    url: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!id) {
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/users/${id}?includePassword=true`
        );

        const userData = response.data;

        if (!userData || !userData.user) {
          return;
        }

        setUserData(userData.user);

        setInputValue((currentState) => ({
          ...currentState,
          firstName: userData.user.name?.first || "",
          middleName: userData.user.name?.middle || "",
          lastName: userData.user.name?.last || "",
          email: userData.user.email || "",
          password: userData.user.password || "",
          phone: userData.user.phone || "",
          alt: userData.user.image?.alt || "",
          url: userData.user.image?.url || "",
          state: userData.user.address?.state || "",
          country: userData.user.address?.country || "",
          city: userData.user.address?.city || "",
          street: userData.user.address?.street || "",
          houseNumber: userData.user.address?.houseNumber || "",
          zip: userData.user.address?.zip || "",
        }));
      } catch (error) {
        toast.error(
          `Error fetching user data: ${error.message || "Unknown error"}`,
          toastStyle
        );
      }
    };

    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputValue((currentState) => ({
      ...currentState,
      [id]: value,
    }));

    if (["middleName", "state", "zip"].includes(id) && !value.trim()) {
      setInputValue((currentState) => ({
        ...currentState,
        [id]: undefined,
      }));
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleUpdateChangesClick = async () => {
    try {
      if (!id) {
        return;
      }

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        "Content-Type": "application/json",
      };

      if (!inputsValue.password) {
        toast.error("Password is required for updating the user", toastStyle);
        return;
      }

      const hashedPassword = hashFunction(inputsValue.password);

      const { data } = await axios.put(
        `http://localhost:8080/users/${id}`,
        {
          name: {
            first: inputsValue.firstName,
            middle: inputsValue.middleName,
            last: inputsValue.lastName,
          },
          address: {
            street: inputsValue.street,
            city: inputsValue.city,
            country: inputsValue.country,
            houseNumber: inputsValue.houseNumber,
            zip: inputsValue.zip,
          },
          image: {
            alt: inputsValue.alt,
            url: inputsValue.url,
          },
          phone: inputsValue.phone,
          email: inputsValue.email,
          password: hashedPassword,
        },
        { headers }
      );

      dispatch(authActions.updateUserProfile(data));

      toast.success("User has been edited successfully!", toastStyle);

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error(
        `Error updating User: ${err.message || "Unknown error"}`,
        toastStyle
      );
    }
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  };

  return (
    <Container sx={{ padding: "50px" }}>
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
        EDIT PROFILE
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
      <EditProfileForm
        inputsValue={inputsValue}
        handleInputChange={handleInputChange}
        showPassword={showPassword}
        handleTogglePasswordVisibility={handleTogglePasswordVisibility}
      />
      <EditProfileButtons
        handleUpdateChangesClick={handleUpdateChangesClick}
        id={id}
      />
    </Container>
  );
};

export default EditProfile;

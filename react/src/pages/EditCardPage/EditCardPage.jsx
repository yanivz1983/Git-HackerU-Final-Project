import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";
import EditCardActions from "./EditCardActions";
import EditCardHeader from "./EditCardHeader";
import EditCardForm from "./EditCardForm";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCardPage = () => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    brand: "",
    price: "",
    shipping: "",
    description: "",
    images: [{ url: "", alt: "" }],
  });
  const { id: _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/cards/${_id}`);
        const cardData = response.data;

        setInputValue({
          title: cardData.title || "",
          subtitle: cardData.subtitle || "",
          price: cardData.price || "",
          brand: cardData.brand || "",
          shipping: cardData.shipping || "",
          description: cardData.description || "",
          images: cardData.images || [{ url: "", alt: "" }],
        });
      } catch (error) {
        console.error("Error fetching card data:", error);
      }
    };

    fetchCardData();
  }, [_id]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "title" || id === "subtitle") {
      if (value.length < 0 || value.length > 20) {
        console.error(`${id} must be between 5 and 20 characters.`);
        return;
      }
    }

    setInputValue((currentState) => ({
      ...currentState,
      [id]: value,
    }));
  };

  const handleImageChange = (e, index) => {
    const { name, value } = e.target;
    const updatedImages = [...inputsValue.images];
    updatedImages[index][name.split("-")[0]] = value;

    setInputValue((currentState) => ({
      ...currentState,
      images: updatedImages,
    }));
  };

  const handleAddImage = () => {
    if (inputsValue.images.length < 5) {
      setInputValue((currentState) => ({
        ...currentState,
        images: [...currentState.images, { url: "", alt: "" }],
      }));
    } else {
      toast.warn("You can add up to 6 images.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...inputsValue.images];
    updatedImages.splice(index, 1);

    setInputValue((currentState) => ({
      ...currentState,
      images: updatedImages,
    }));
  };

  const handleUpdateChangesClick = async () => {
    try {
      const headers = {
        Authorization: "Bearer ",
      };

      const { data } = await axios.put(
        `http://localhost:8080/cards/${_id}`,
        {
          title: inputsValue.title,
          subtitle: inputsValue.subtitle,
          description: inputsValue.description,
          brand: inputsValue.brand,
          price: inputsValue.price,
          shipping: inputsValue.shipping,
          images: inputsValue.images,
        },
        { headers }
      );

      toast.success("Card has been edited successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate(-1);
    } catch (err) {
      toast.error(
        "Error updating card. Please fix the mistake and try again.",
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
  };

  const handleDiscardChanges = () => {
    navigate(-1);
  };

  return (
    <Container>
      <EditCardHeader />
      <EditCardForm
        inputsValue={inputsValue}
        handleInputChange={handleInputChange}
        handleImageChange={handleImageChange}
        handleAddImage={handleAddImage}
        handleRemoveImage={handleRemoveImage}
      />
      <EditCardActions
        handleUpdateChangesClick={handleUpdateChangesClick}
        handleDiscardChanges={handleDiscardChanges}
      />
    </Container>
  );
};

export default EditCardPage;

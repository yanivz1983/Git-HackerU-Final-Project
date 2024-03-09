import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CardForm from "../CreateCardPage/CardForm";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";

const CreateCardPage = () => {
  const navigate = useNavigate();

  const [inputsValue, setInputsValue] = useState({
    title: "",
    subtitle: "",
    description: "",
    brand: "",
    price: "",
    shipping: " Free",
    images: [{ url: "", alt: "" }],
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    title: "",
    subtitle: "",
    description: "",
    brand: "",
    price: "",
    shipping: "",
    url: "",
    alt: "",
  });

  const brandOptions = [
    { label: "Select Brand", value: "" },
    { label: "Apple", value: "Apple" },
    { label: "LG", value: "LG" },
    { label: "Microsoft", value: "Microsoft" },
    { label: "Samsung", value: "Samsung" },
  ];

  const maxImages = 6;
  const fields = [
    {
      id: "title",
      label: "Title",
      required: true,
      placeholder: "Enter the Title of the item (min 5 max 20 characters)",
    },
    {
      id: "subtitle",
      label: "SubTitle",
      required: true,
      placeholder: "Enter the subtitle of the item (min 5 max 20 characters)",
    },
    {
      id: "description",
      label: "Description",
      required: true,
      placeholder: "Enter the Description of the item",
    },
    {
      id: "brand",
      label: "Choose Brand",
      required: true,
      options: brandOptions,
      placeholder: "Choose the Brand of the item",
    },
    {
      id: "price",
      label: "Price",
      required: true,
      placeholder: "Enter the Price of the item",
    },
    {
      id: "shipping",
      label: "Shipping",
      required: true,
      placeholder: "Enter the leave it free or Shipping Price of the item",
    },
    { id: "images", label: "Images", required: true },
  ];

  const handleInputChange = (e, index, fieldId) => {
    const { id, value } = e.target;

    setInputsValue((currentState) => {
      if (id && (id.startsWith("url-") || id.startsWith("alt-"))) {
        const [field, idx] = id.split("-");
        const i = parseInt(idx, 10);

        return {
          ...currentState,
          images: currentState.images.map((img, imgIndex) =>
            imgIndex === index ? { ...img, [field]: value } : img
          ),
        };
      } else if (fieldId) {
        return {
          ...currentState,
          [fieldId]: value,
        };
      } else {
        return {
          ...currentState,
          [id]: value,
        };
      }
    });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: validateField(id, value),
    }));
  };

  const validateField = (fieldName, value) => {
    switch (fieldName) {
      case "title":
      case "subtitle":
        if (value.length < 5) {
          return `${fieldName} should be at least 5 characters`;
        } else if (value.length > 20) {
          return `${fieldName} should be at most 20 characters`;
        } else {
          return "";
        }
      default:
        return value.trim() === "" ? `${fieldName} is required` : "";
    }
  };

  const handleAddField = () => {
    if (inputsValue.images.length < maxImages) {
      setInputsValue((prevState) => ({
        ...prevState,
        images: [...prevState.images, { url: "", alt: "" }],
      }));
    }
  };

  const handleRemoveField = (indexToRemove) => {
    setInputsValue((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (Object.values(errors).some((error) => error !== "")) {
      toast.error("Please fill in all required fields correctly.", {
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

    setLoading(true);

    try {
      const { data } = await axios.post("http://localhost:8080/cards", {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        brand: inputsValue.brand,
        price: inputsValue.price,
        shipping: inputsValue.shipping,
        images: inputsValue.images.map((image) => ({
          url: image.url,
          alt: image.alt || undefined,
        })),
      });

      toast.success("You've created a New Itam!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      navigate(ROUTES.MYCARDS);
    } catch (err) {
      console.error("You Faills To Creating New Itam:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CardForm
      fields={fields}
      inputsValue={inputsValue}
      errors={errors}
      loading={loading}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      handleAddField={handleAddField}
      handleRemoveField={handleRemoveField}
    />
  );
};

export default CreateCardPage;

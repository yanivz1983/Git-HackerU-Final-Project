import React, { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/users/contact-us",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        toast.success(data.message || "Message sent successfully!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Contact Us
      </Typography>

      <Typography paragraph>
        We're here to assist you! If you have any questions, concerns, or
        feedback, please don't hesitate to get in touch with us.
      </Typography>

      <Typography variant="h5" gutterBottom>
        Contact Information
      </Typography>

      <Typography>
        <strong>Email:</strong> info@onlinemall.com
      </Typography>
      <Typography>
        <strong>Phone:</strong> +1 (123) 456-7890
      </Typography>

      <Typography variant="h5" gutterBottom>
        Visit Us
      </Typography>

      <Typography>
        Online Mall
        <br />
        123 Main Street
        <br />
        City, Country
      </Typography>

      <Typography variant="h5" gutterBottom>
        Send Us a Message
      </Typography>

      <Typography paragraph>
        Use the form below to send us a message, and we'll get back to you as
        soon as possible:
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          margin="normal"
          required
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          margin="normal"
          required
          name="message"
          value={formData.message}
          onChange={handleChange}
        />

        <Button
          sx={{
            mt: 2,
            width: "100%",
            height: "3vh",
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
          variant="contained"
          color="primary"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default ContactUs;

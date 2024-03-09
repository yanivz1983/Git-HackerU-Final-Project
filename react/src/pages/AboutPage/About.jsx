import React from "react";
import {
  Typography,
  Container,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import "../../css/stylesResponsive.css";

const AboutContainer = styled(Container)({
  marginTop: "2rem",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "65vh",
});

const AboutPaper = styled(Paper)({
  padding: "2rem",
  textAlign: "left",
  "& > *": {
    marginBottom: "1.5rem",
  },
});

const AboutPage = () => {
  return (
    <AboutContainer>
      <AboutPaper elevation={3}>
        <Typography variant="h3" component="h1">
          About Our Shop - Online Mall{" "}
        </Typography>

        <Typography variant="body1">
          Welcome to Online Mall, your one-stop destination for a diverse range
          of high-quality products. At Online Mall, we believe in providing an
          exceptional shopping experience, offering a wide selection of items to
          cater to various needs and preferences.
        </Typography>

        <Typography variant="h3" component="h1">
          Our Mission{" "}
        </Typography>

        <Typography variant="body1">
          Our mission is to connect people with the products they love. We
          strive to create a convenient and enjoyable online shopping
          environment where customers can discover new and exciting products
          while enjoying top-notch customer service.
        </Typography>

        <Typography variant="h3" component="h1">
          Why Choose Online Mall?{" "}
        </Typography>

        <List>
          <ListItem>
            <ListItemText
              primary="Diverse Selection"
              secondary="We curate a diverse selection of products, ranging from fashion and electronics to home goods and beyond."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Quality Assurance"
              secondary="We prioritize quality, ensuring that each item in our collection meets high standards."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Customer Satisfaction"
              secondary="Our dedicated customer support team is here to assist you throughout your shopping journey, making sure you're satisfied with your experience."
            />
          </ListItem>
        </List>
        <br />

        <Typography variant="h3" component="h1">
          Contact Information{" "}
        </Typography>
        <br />
        <Typography variant="body1">
          Have questions or suggestions? We'd love to hear from you!
          <br />
          <strong>Email:</strong> hackerufullstack@gmail.com
          <br />
          <strong>Phone:</strong> +1 (123) 456-7890
        </Typography>
        <br />
        <Typography variant="h3" component="h1">
          Join Us on Social Media{" "}
        </Typography>
        <br />
        <Typography variant="body1">
          Stay connected with us on social media for the latest updates, special
          offers, and more.
          <br />
          <strong>Facebook:</strong> @OnlineMall
          <br />
          <strong>Instagram:</strong> @OnlineMallOfficial
          <br />
          <strong>Twitter:</strong> @OnlineMallTweets
        </Typography>
      </AboutPaper>
    </AboutContainer>
  );
};

export default AboutPage;

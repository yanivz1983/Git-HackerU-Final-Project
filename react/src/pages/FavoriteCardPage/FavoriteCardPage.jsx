import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Typography, Divider } from "@mui/material";
import ROUTES from "../../routes/ROUTES";

const FavoriteCardPage = () => {
  const navigate = useNavigate();

  const [likedCards, setLikedCards] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchLikedCards = async () => {
      try {
        setLoading(true);
        const userId = userData.id;
        const dataFromServer = await axios.get("http://localhost:8080/cards");
        const cards = dataFromServer.data.filter((card) =>
          card.likes.includes(userId)
        );
        setLikedCards(cards);
        setLoading(false);
      } catch (error) {
        setError("Error fetching liked card IDs");
        setLoading(false);
      }
    };

    fetchLikedCards();
  }, [userData]);

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleDeleteCard = async (_id) => {
    try {
      const config = {
        headers: {
          "x-auth-token": process.env.REACT_APP_API_TOKEN,
        },
      };

      await axios.delete(`http://localhost:8080/cards/${_id}`, config);

      setLikedCards((prevCards) =>
        prevCards.filter((card) => card._id !== _id)
      );
    } catch (error) {
      setError("Error deleting card. Please try again.");
    }
  };

  const handleLikeRemove = (_id) => {
    const updatedLikedCards = likedCards.filter((card) => card._id !== _id);
    setLikedCards(updatedLikedCards);
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <Container
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
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
        FAVORITE{" "}
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
      <Grid container spacing={2} className="grid-container">
        {likedCards
          .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
          .map((card) => (
            <Grid item key={card._id} xs={12} sm={6} md={4} lg={3}>
              <CardComponent
                _id={card._id}
                title={card.title}
                subTitle={card.subtitle}
                brand={card.brand}
                price={card.price}
                shipping={card.shipping}
                imgs={{
                  url: card.images.length > 0 ? card.images[0].url : "",
                  alt: card.images.length > 0 ? card.images[0].alt : "",
                }}
                alt={card.image && card.image.alt}
                like={true}
                onEditCard={() => handleEditCard(card._id)}
                onToggleFavorite={() => {
                  handleLikeRemove(card._id);
                }}
                onDeleteCard={() => handleDeleteCard(card._id)}
              />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default FavoriteCardPage;

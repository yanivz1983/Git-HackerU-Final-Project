import React, { useEffect, useState } from "react";
import CardComponent from "../../components/CardComponent";
import axios from "axios";
import { useSelector } from "react-redux";
import { Container, Grid, Button, Typography, Divider } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const MyCardsPage = () => {
  const [myUserCards, setMyUserCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const userData = useSelector((state) => state.authSlice.userData);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyCards = async () => {
      try {
        setLoading(true);

        if (!userData) {
          setLoading(false);
          return;
        }

        const userId = userData._id;
        const config = {
          headers: {
            bearer: process.env.REACT_APP_API_TOKEN,
          },
        };

        const response = await axios.get(
          `http://localhost:8080/cards/my-cards`,
          config
        );

        const userCards = response.data.filter(
          (card) => card.user_id === userId
        );
        setMyUserCards(userCards);
        setLoading(false);
      } catch (error) {
        setError("Error fetching user's cards. Please try again.");
        setLoading(false);
      }
    };

    fetchMyCards();
  }, [userData, location.pathname]);

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleDeleteCard = async (_id) => {
    try {
      const config = {
        headers: {
          bearer: process.env.REACT_APP_API_TOKEN,
        },
      };

      await axios.delete(`http://localhost:8080/cards/${_id}`, config);

      setMyUserCards((prevCards) =>
        prevCards.filter((card) => card._id !== _id)
      );
    } catch (error) {
      setError("Error deleting card. Please try again.");
    }
  };

  const handleLikeChange = (_id, newLikeStatus) => {
    setMyUserCards((prevCards) =>
      prevCards.map((card) =>
        card._id === _id ? { ...card, like: newLikeStatus } : card
      )
    );
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
        MY ITEMS
      </Typography>
      <Divider
        sx={{
          mt: 4,
          mb: 7,
          mx: "auto",
          width: "50%",
          backgroundColor: "linear-gradient(to right, #ccc, #999, #ccc)",
          height: "4px",
          borderRadius: "4px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      />

      <Button
        variant="contained"
        sx={{
          width: "10vw",
          height: "3vh",
          mt: 3,
          mb: 2,
          bgcolor: "darkblue",
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
        onClick={() => {
          if (userData && (userData.isBusiness || userData.isAdmin)) {
            navigate(ROUTES.CREATECARD);
          } else {
            console.log("Only business users or admins can create cards.");
          }
        }}
      >
        Create Item
      </Button>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        {myUserCards.length === 0 ? (
          <Grid item>
            <div>No cards found.</div>
          </Grid>
        ) : (
          myUserCards.map(
            ({
              _id,
              title,
              subtitle,
              brand,
              price,
              shipping,
              images,
              like,
              alt,
            }) => (
              <Grid item key={_id} xs={12} sm={6} md={4} lg={3}>
                <CardComponent
                  _id={_id}
                  title={title}
                  subTitle={subtitle}
                  brand={brand}
                  price={price}
                  shipping={shipping}
                  imgs={{
                    url: images.length > 0 ? images[0].url : "",
                    alt: images.length > 0 ? images[0].alt : "",
                  }}
                  like={like}
                  onDeleteCard={() => handleDeleteCard(_id)}
                  onEditCard={() => handleEditCard(_id)}
                  handleLikeCardClick={(newLikeStatus) =>
                    handleLikeChange(_id, newLikeStatus)
                  }
                />
              </Grid>
            )
          )
        )}
      </Grid>
    </Container>
  );
};

export default MyCardsPage;

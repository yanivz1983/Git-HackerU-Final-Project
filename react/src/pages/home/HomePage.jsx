import React, { useCallback, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Divider,
  Button,
  useMediaQuery,
} from "@mui/material";
import CardComponent from "../../components/CardComponent";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";
import homePageNormalization from "./homePageNormalization";
import { useSelector } from "react-redux";
import useQueryParams from "../../hooks/useQueryParams";
import AsideFilter from "./AsideFilter";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseIcon from "@mui/icons-material/Close";
import AdvertisementSlider from "./AdvertisementSlider";
import LeftCommercialAside from "./LeftCommercialAside";
import RightCommercialAside from "./RightCommercialAside";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [initialDataFromServer, setInitialDataFromServer] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [error, setError] = useState(null);
  const [myCards, setMyCards] = useState([]);
  const navigate = useNavigate();
  const userData = useSelector((bigPie) => bigPie.authSlice.userData);
  const query = useQueryParams();
  const [appliedFilters, setAppliedFilters] = useState({});
  const [asideFilterVisible, setAsideFilterVisible] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [filtersApplied, setFiltersApplied] = useState(false); // Track if filters have been applied
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.up("xl"));

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        if (userData) data = homePageNormalization(data, userData._id);
        setInitialDataFromServer(data);
        setDataFromServer(data);
        setFilteredData(data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [userData]);

  const handleFilterChange = useCallback(
    (filters) => {
      setAppliedFilters(filters);
      setFiltersApplied(true); // Filters have been applied

      const newData = initialDataFromServer.filter((card) => {
        const cardPrice = parseFloat(card.price.replace(/[^0-9.-]+/g, ""));
        const meetsPriceCriteria =
          cardPrice >= filters.price.min && cardPrice <= filters.price.max;

        const meetsBrandCriteria =
          !filters.brand || card.brand === filters.brand;

        let meetsShippingCriteria = true;
        if (filters.shipping === "Free") {
          meetsShippingCriteria =
            card.shipping.toLowerCase().includes("free") ||
            parseFloat(card.shipping.replace(/[^0-9.-]+/g, "")) === 0;
        } else if (filters.shipping === "0-100") {
          meetsShippingCriteria =
            parseFloat(card.shipping.replace(/[^0-9.-]+/g, "")) <= 100;
        } else {
          meetsShippingCriteria =
            !filters.shipping || card.shipping === filters.shipping;
        }

        return (
          meetsPriceCriteria && meetsBrandCriteria && meetsShippingCriteria
        );
      });

      setFilteredData(newData);
    },
    [initialDataFromServer]
  );

  const handleDeleteCard = async (_id) => {
    try {
      const config = {
        headers: {
          "x-auth-token": process.env.REACT_APP_API_TOKEN,
        },
      };

      await axios.delete(`http://localhost:8080/cards/${_id}`, config);

      setMyCards((prevCards) => prevCards.filter((card) => card._id !== _id));

      setDataFromServer((prevData) =>
        prevData.filter((card) => card._id !== _id)
      );
      setInitialDataFromServer((prevData) =>
        prevData.filter((card) => card._id !== _id)
      );
    } catch (error) {
      setError("Error deleting card. Please try again.");
    }
  };

  const handleEditCard = (_id) => {
    navigate(`${ROUTES.EDITCARD}/${_id}`);
  };

  const handleLikeCardClick = (_id, isLiked) => {
    setDataFromServer((dataFromServerCopy) =>
      dataFromServerCopy.map((card) => {
        if (card._id === _id) {
          card.like = isLiked;
          if (isLiked) {
            const likedCards =
              JSON.parse(localStorage.getItem("likedCards")) || [];
            likedCards.push(card);
            localStorage.setItem("likedCards", JSON.stringify(likedCards));
          }
        }
        return card;
      })
    );

    setInitialDataFromServer((initialDataCopy) =>
      initialDataCopy.map((card) => {
        if (card._id === _id) {
          card.like = isLiked;
        }
        return card;
      })
    );
  };

  const handleToggleFilters = () => {
    setFiltersVisible(!filtersVisible);
    setAsideFilterVisible(!asideFilterVisible);
  };

  const handleResetFilters = () => {
    setAppliedFilters({});
    setFiltersApplied(false); // Reset filters applied state
    setAsideFilterVisible(false);
    setFiltersVisible(false);
  };

  return (
    <Container>
      {isLargeScreen && <LeftCommercialAside />}
      {isLargeScreen && <RightCommercialAside />}
      <Container
        sx={{
          position: "fixed",
          top: 0,
          left: asideFilterVisible ? 0 : -9999,
          zIndex: 999,
          width: "200px",
          height: "100%",
          minHeight: "100vh",
          backgroundColor: "white",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          overflowY: "auto",
          transition: "left 0.4s ease-in-out",
        }}
      >
        <AsideFilter onFilterChange={handleFilterChange} />
      </Container>

      <AdvertisementSlider />
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        onClick={handleToggleFilters}
        sx={{
          paddingBottom: 3.5,
          height: "3vh",
          width: "10vw",
          display: "block",
          margin: "0 auto",
          marginBottom: "35px",
          mb: 7,
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
      >
        {filtersVisible ? <CloseIcon /> : <FilterListIcon />}
      </Button>
      <Grid container spacing={2}>
        {filteredData.map((card) => (
          <Grid
            item
            key={card._id}
            xs={12}
            sm={filtersVisible ? 6 : 4}
            md={filtersVisible ? 4 : 3}
            lg={3}
          >
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
              like={card.likes}
              cardNumber={card.cardNumber}
              onDeleteCard={handleDeleteCard}
              onEditCard={handleEditCard}
              handleLikeCardClick={handleLikeCardClick}
              isAdmin={userData && userData.isAdmin}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;

import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import SearchIconWrapper from "./SearchIconWrapper";
import StyledInputBase from "./StyledInputBase";
import { Container, Box, List, ListItem, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import ROUTES from "../../../routes/ROUTES";
import Search from "../ui/Search";

const allowedPages = {
  HOME: "Home",
  ABOUT: "About",
  FAVCARD: "Favorite Card",
  MYCARDS: "My Cards",
  CARTPAGE: "Cart Page",
  PRIVACYPOLICY: "Privacy Policy",
  FAQ: "FAQ",
  CONTACTUS: "Contact Us",
};

const getMatchingPages = (input) => {
  const lowercasedInput = input.toLowerCase();
  const matchingKeys = Object.keys(allowedPages).filter((page) =>
    page.toLowerCase().includes(lowercasedInput)
  );
  return matchingKeys.map((key) => allowedPages[key]);
};

const FilterComponent = ({ _id }) => {
  const [txt, setTxt] = useState("");
  const [matchingPages, setMatchingPages] = useState([]);
  const [matchingCards, setMatchingCards] = useState([]);
  const [isSearchClicked, setIsSearchClicked] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isScreenSmallerThan470 = useMediaQuery((theme) =>
    theme.breakpoints.down(470)
  );

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setTxt(inputValue);
    setIsSearchClicked(true);
  };

  const handleClickOutside = (e) => {
    if (containerRef.current && !containerRef.current.contains(e.target)) {
      setIsSearchClicked(false);
    }
  };

  useEffect(() => {
    setMatchingPages(getMatchingPages(txt));

    const fetchMatchingCards = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/cards?search=${txt}`
        );

        if (!response.ok) {
          throw new Error(`Server error! Status: ${response.status}`);
        }

        const data = await response.json();
        const filteredCards = data.filter(
          (card) =>
            card.title.toLowerCase().includes(txt.toLowerCase()) ||
            card.brand.toLowerCase().includes(txt.toLowerCase())
        );
        setMatchingCards(filteredCards);
      } catch (error) {
        console.error("Error fetching matching cards:", error.message);
      }
    };

    if (txt.length >= 2) {
      fetchMatchingCards();
    } else {
      setMatchingCards([]);
    }
  }, [txt]);

  const handleListItemClick = (item) => {
    setIsSearchClicked(false);
    setTxt("");

    if (typeof item === "string") {
      const selectedPageKey = Object.keys(allowedPages).find(
        (key) => allowedPages[key] === item
      );

      if (selectedPageKey) {
        navigate(ROUTES[selectedPageKey]);
      }
    } else if (typeof item === "object" && (item.id || item._id)) {
      const cardId = item.id || item._id;
      handleCardClick(cardId);
    } else {
      console.error("Invalid item:", item);
    }
  };

  const handleCardClick = (card) => {
    const cardId = card.id || card._id;

    if (cardId) {
      navigate(`/card-details/${cardId}`);
    } else {
      console.error("Invalid card object:", card);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <Container>
      <Box
        ref={containerRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: isScreenSmallerThan470 ? "80%" : "25%",
          marginTop: 2,
          marginLeft: "10%",
          position: "relative",
        }}
      >
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            value={txt}
            onChange={handleInputChange}
            onClick={() => setIsSearchClicked(true)}
          />
        </Search>
        {isSearchClicked &&
          (matchingPages.length > 0 || matchingCards.length > 0) && (
            <List
              sx={{
                position: "absolute",
                color: "black",
                top: "100%",
                left: 0,
                width: isScreenSmallerThan470 ? "200%" : "100%",
                maxHeight: "400px",
                overflowY: "auto",
                marginTop: 2,
                borderRadius: 4,
                zIndex: 1,
                boxShadow: 2,
                backgroundColor: "white",
              }}
            >
              {matchingPages.map((page) => (
                <ListItem
                  key={page}
                  onClick={() => handleListItemClick(page)}
                  sx={{
                    padding: 2,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <Typography>{page}</Typography>
                </ListItem>
              ))}
              {matchingCards.map((card) => (
                <ListItem
                  key={card._id}
                  onClick={() => handleCardClick(card)}
                  sx={{
                    padding: 2,
                    cursor: "pointer",
                    "&:hover": {
                      backgroundColor: "#f0f0f0",
                    },
                  }}
                >
                  <Typography>{card.title}</Typography>
                </ListItem>
              ))}
            </List>
          )}
      </Box>
    </Container>
  );
};

export default FilterComponent;

// CardDetailsContent.jsx
import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  Typography,
  Tooltip,
  IconButton,
  CircularProgress,
} from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import StarIcon from "@mui/icons-material/Star";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { addToCart, setItems } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";

const CardDetailsContent = ({
  cardDetails,
  selectedImage,
  handleAddToCart,
  handleLikeCard,
  isLiked,
  loggedIn,
  handleThumbnailClick,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.items);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        maxWidth: "800px",
        width: "100%",
        margin: isSmallScreen ? "0" : "0 20px",
      }}
    >
      {cardDetails ? (
        <Card
          sx={{
            width: "100%",
            maxWidth: "800px",
            borderRadius: "16px",
            boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.15)",
            overflow: "hidden",
            background: "#ffffff",
            position: "relative",
            height: "auto",
            marginBottom: "20px",
          }}
        >
          <CardMedia
            component="img"
            src={selectedImage?.url}
            alt={selectedImage?.alt || "No Alt Text"}
            sx={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              borderRadius: "16px 16px 0 0",
            }}
          />

          <CardContent>
            <CardHeader
              title={
                <Typography variant="h5" color="primary">
                  {cardDetails.title || "No Title"}
                </Typography>
              }
              subheader={
                <Typography variant="subtitle1" color="textSecondary">
                  {cardDetails.subtitle || "No Subtitle"}
                </Typography>
              }
              sx={{ p: 0, mb: 1 }}
            />
            <Divider />
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" fontWeight="bold" color="#333">
                Price: {cardDetails.price || "No Price"}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="#333">
                Shipping: {cardDetails.shipping || "No Shipping"}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="#333">
                Brand: {cardDetails.brand || "No Brand"}
              </Typography>
              <Typography variant="body1" fontWeight="bold" color="#333">
                Description: {cardDetails.description || "No Description"}
              </Typography>
              <Grid container justifyContent="center"></Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: isSmallScreen ? 3 : 0,
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddToCart}
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#1976d2",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                    mr: 2,
                  }}
                >
                  <AddShoppingCartIcon sx={{ mr: 1 }} />
                  Add to Cart
                </Button>

                {loggedIn && (
                  <Tooltip
                    title={isLiked ? "Unlike" : "Like"}
                    arrow
                    placement="top"
                  >
                    <IconButton
                      onClick={handleLikeCard}
                      sx={{
                        borderRadius: "8px",
                        color: isLiked ? "#ffd700" : "#bdbdbd",
                        backgroundColor: "transparent",
                        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                        "&:hover": {
                          color: "#ffd700",
                          backgroundColor: "transparent",
                        },
                      }}
                    >
                      <StarIcon />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </Box>
          </CardContent>

          {cardDetails.images && cardDetails.images.length > 1 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              {cardDetails.images.map((image, index) => (
                <Tooltip key={index} title={image.alt || "No Alt Text"} arrow>
                  <IconButton
                    onClick={() => handleThumbnailClick(image)}
                    sx={{ mr: 1 }}
                  >
                    {image.url && (
                      <CardMedia
                        component="img"
                        src={image.url}
                        alt={image.alt || "No Alt Text"}
                        sx={{
                          height: "60px",
                          width: "60px",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    )}
                  </IconButton>
                </Tooltip>
              ))}
            </Box>
          )}
        </Card>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress />
        </Box>
      )}

      {/* Back Button */}
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CardDetailsContent;

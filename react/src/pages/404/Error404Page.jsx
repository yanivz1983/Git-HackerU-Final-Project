import { Box, Button, Container, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import "../../css/stylesResponsive.css";
import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} textAlign="center">
            <img
              src={
                process.env.PUBLIC_URL + "/assets/imgs/404-removebg-preview.png"
              }
              alt=""
              width={500}
              height={250}
            />
            <Typography variant="h6" mt={4} mb={2}>
              Oops! The page you’re looking for doesn’t exist.
            </Typography>

            <Button
              variant="contained"
              component={Link}
              to="/"
              sx={{
                height: "3vh",
                mt: 3,
                mb: 2,
                mr: 2,
                bgcolor: "red",
                color: "white",
                borderRadius: "999px",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                fontWeight: "bold",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                  bgcolor: "darkRed",
                },
              }}
            >
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Error404Page;

import React from "react";
import { Box, Typography } from "@mui/material";

const RightCommercialAside = () => {
  return (
    <a href="https://www.starbucks.com/" target="blank">
      <Box
        sx={{
          marginTop: 5,
          position: "fixed",
          zIndex: 500,
          top: 0,
          right: 0,
          width: "200px",
          height: "100%",
          minHeight: "100vh",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
          padding: "20px",
        }}
      >
        <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
          Advertisement 2
        </Typography>
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNGR2NXFnMm1yYWh6bGU3aG9za3g3eXUzYWt1eHVhZTY3bWR2bzRqZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/nl2CW9fl9XycU/giphy.gif"
          alt="Advertisement 2"
          style={{ maxWidth: "100%", height: "68vh" }}
        />
      </Box>
    </a>
  );
};

export default RightCommercialAside;

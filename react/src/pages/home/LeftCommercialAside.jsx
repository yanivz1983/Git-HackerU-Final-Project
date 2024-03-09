import React from "react";
import { Box, Typography } from "@mui/material";

const LeftCommercialAside = () => {
  return (
    <Box
      sx={{
        marginTop: 5,
        position: "fixed",
        zIndex: -1,
        top: 0,
        left: 0,
        width: "200px",
        height: "100%",
        minHeight: "100vh",
        boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
        padding: "20px",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", mb: 2 }}>
        Advertisement 1
      </Typography>
      <img
        src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExdHJwYWV1d2RkZWk1eW9sZ2ljYnhiNGJwb3hrMmMyYjJuMXNwN2FnZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zhMFWEYXtur0k/giphy.gif"
        alt="Advertisement 1"
        style={{ maxWidth: "100%", height: "68vh" }}
      />
    </Box>
  );
};

export default LeftCommercialAside;

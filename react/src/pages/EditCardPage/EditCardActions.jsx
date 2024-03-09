import React from "react";
import { Button, Grid } from "@mui/material";

const EditCardActions = ({
  handleUpdateChangesClick,
  handleDiscardChanges,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={6} xs>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
            height: "3vh",
            mb: 2,
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
            bgcolor: "Darkblue",
          }}
          onClick={handleUpdateChangesClick}
        >
          Update Changes
        </Button>
      </Grid>
      <Grid item lg={6} md={6} sm={6} xs>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            width: "100%",
            height: "3vh",
            mb: 2,
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
              boxShadow: "0px 12px 20px rgba(0, 0, 0, 0.3)",
            },
          }}
          color="error"
          onClick={handleDiscardChanges}
        >
          Discard Changes
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditCardActions;

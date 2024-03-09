import React from "react";
import { Link, Button, Grid } from "@mui/material";
import ROUTES from "../../routes/ROUTES";

const EditProfileButtons = ({ handleUpdateChangesClick, id }) => {
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} sm={6} xs>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 2,
            width: "100%",
            height: "3vh",
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
          onClick={handleUpdateChangesClick}
        >
          Update Changes
        </Button>
      </Grid>
      <Grid item xs>
        <Link to={`${ROUTES.EDITPROFILE}/${id}`}>
          <Button
            variant="contained"
            color="error"
            sx={{
              mt: 2,
              width: "100%",
              height: "3vh",
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
            Discard Changes
          </Button>
        </Link>
      </Grid>
    </Grid>
  );
};

export default EditProfileButtons;

import React from "react";
import {
  Container,
  Grid,
  Typography,
  Divider,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { Link } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";

const CardForm = ({
  fields,
  inputsValue,
  errors,
  loading,
  handleInputChange,
  handleSubmit,
  handleAddField,
  handleRemoveField,
}) => {
  const maxImages = 6;

  return (
    <Container sx={{ padding: "50px" }}>
      <Typography
        variant="h2"
        sx={{
          fontFamily: "serif",
          textAlign: "center",
          py: 5,
          fontSize: "3rem",
          fontWeight: "bold",
          color: "#333",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
        }}
      >
        Create - Cards
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
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put new values in the correct input
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container flexDirection="column">
          {fields.map((field) => (
            <div key={field.id} style={{ width: "100%" }}>
              {field.id === "images" ? (
                <div>
                  {inputsValue.images.map((image, index) => (
                    <React.Fragment key={index}>
                      <div style={{ display: "flex", width: "100%" }}>
                        <TextField
                          id={`url-${index}`}
                          label={`URL ${index + 1}`}
                          variant="outlined"
                          sx={{ width: "50%" }}
                          onChange={(e) => handleInputChange(e, index)}
                          placeholder="Put Url with a jpg"
                          value={image.url}
                          required
                        />
                        <TextField
                          id={`alt-${index}`}
                          label={`Alt ${index + 1}`}
                          variant="outlined"
                          sx={{ width: "50%" }}
                          onChange={(e) => handleInputChange(e, index)}
                          placeholder="the name of the Url"
                          value={image.alt}
                          required
                        />
                      </div>
                      {index > 0 && (
                        <Button
                          variant="outlined"
                          color="error"
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
                          onClick={() => handleRemoveField(index)}
                        >
                          Remove Image
                        </Button>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              ) : field.id === "brand" ? (
                <TextField
                  select
                  id={field.id}
                  label={field.label}
                  variant="outlined"
                  sx={{ mt: "10px", width: "100%" }}
                  placeholder={`Choose ${field.label}`}
                  onChange={(e) => {
                    handleInputChange(e, null, field.id);
                  }}
                  value={inputsValue[field.id]}
                  required={field.required}
                  error={Boolean(errors[field.id])}
                >
                  {field.options.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              ) : (
                <TextField
                  id={field.id}
                  label={field.label}
                  variant="outlined"
                  sx={{ mt: "10px", width: "100%" }}
                  onChange={(e) => {
                    console.log(`${field.label} Change:`, e.target.value);
                    handleInputChange(e, null, field.id);
                  }}
                  value={inputsValue[field.id]}
                  placeholder={field.placeholder || ""}
                  required={field.required}
                  error={Boolean(errors[field.id])}
                />
              )}
            </div>
          ))}
          <Button
            variant="outlined"
            onClick={handleAddField}
            sx={{
              mt: 4,
              width: "100%",
              height: "3vh",
              mb: 2,
              bgcolor: "gray",
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
                bgcolor: "darkgray",
              },
            }}
          >
            Add Image
          </Button>
        </Grid>
        <Grid container spacing={2}>
          <Grid item lg={8} md={8} sm={8} xs>
            <Button
              type="submit"
              variant="outlined"
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
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Card"}
            </Button>
          </Grid>
          <Grid item xs>
            <Link to={ROUTES.HOME}>
              <Button
                variant="outlined"
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
              >
                Discard
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default CardForm;

import { styled, alpha, useMediaQuery } from "@mui/material";

const Search = styled("div")(({ theme }) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    width: isSmallScreen ? "100%" : "auto",
    marginBottom: theme.spacing(2),
    marginLeft: isSmallScreen ? 0 : "20px",
  };
});

export default Search;

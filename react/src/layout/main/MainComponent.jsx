import { Container } from "@mui/material";

const MainComponent = ({ children }) => {
  return (
    <Container sx={{ mb: 15, mt: 20, minHeight: "65vh" }}>{children}</Container>
  );
};

export default MainComponent;

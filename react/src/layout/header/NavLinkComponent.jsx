import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavLinkComponent = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      style={{
        textDecoration: "none",
        display: "inline-block",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {({ isActive }) => (
        <Typography
          style={{
            color: isActive ? "#fff" : "#fff",
            padding: "16px",
            fontSize: "1.2rem",
            textAlign: "center",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
          variant="h6"
        >
          {children}
        </Typography>
      )}
    </NavLink>
  );
};

export default NavLinkComponent;

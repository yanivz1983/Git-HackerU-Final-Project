import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import ROUTES from "../../routes/ROUTES";
import Links from "./ui/Links";
import LeftDrawerComponent from "./ui/LeftDrawerComponent";
import FilterComponent from "./ui/FilterComponent";
import MenuIcon from "@mui/icons-material/Menu";
import Hidden from "@mui/material/Hidden";

const HeaderComponent = ({ isDarkTheme, onThemeChange }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.authSlice.loggedIn);
  const cartItemsCount = useSelector((state) => state.cart.items.length);
  const userData = useSelector((state) => state.authSlice.userData);
  const [imageUrl, setImageUrl] = useState("");

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event) => {
    if (event && event.target.textContent === "Logout") {
      setTimeout(() => {
        setAnchorEl(null);

        if (isLoggedIn) {
          localStorage.removeItem("token");
          localStorage.setItem("showLogoutToast", "true");
          navigate(ROUTES.HOME);
          window.location.reload();
        } else {
          navigate(ROUTES.LOGIN);
        }
      }, 100);
    } else {
      setAnchorEl(null);
    }
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleEditProfileOpen = (event) => {
    if (event) {
      event.preventDefault();
    }
    handleMenuClose(event);
    navigate(`/editprofile/${userData?.id ?? userData?._id}`);
  };

  const handleFavoritePage = () => {
    navigate("/favoriteCardPage");
    handleMenuClose();
  };

  const handleThemeChange = (event) => {
    onThemeChange(event.target.checked);
  };

  const menuId = "primary-search-account-menu";

  useEffect(() => {
    const showLogoutToast = localStorage.getItem("showLogoutToast");

    if (showLogoutToast === "true") {
      toast.success("You've logged out successfully 🌊", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("showLogoutToast");
    }
  }, []);

  const fetchUserData = async () => {
    try {
      if (!userData?.id && !userData?._id) {
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/users/${
          userData.id ?? userData._id
        }?includePassword=true`
      );

      const userDataResponse = response.data;

      if (!userDataResponse || !userDataResponse.user) {
        return;
      }

      const newImageUrl = userDataResponse.user.image?.url || "";
      setImageUrl(newImageUrl);

      localStorage.setItem("userImageUrl", newImageUrl);
    } catch (error) {
      toast.error(
        `Error fetching user data: ${error.message || "Unknown error"}`
      );
    }
  };

  useEffect(() => {
    const fetchDataAndLocalStorage = async () => {
      await fetchUserData();
    };

    fetchDataAndLocalStorage();
  }, [userData]);

  useEffect(() => {
    const showLogoutToast = localStorage.getItem("showLogoutToast");

    const storedImageUrl = localStorage.getItem("userImageUrl");
    if (storedImageUrl) {
      setImageUrl(storedImageUrl);
    }

    if (showLogoutToast === "true") {
      toast.success("You've logged out successfully 🌊", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.removeItem("showLogoutToast");
    }
  }, []);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
    >
      {isLoggedIn && [
        <MenuItem key="editProfile" onClick={handleEditProfileOpen}>
          Edit Profile
        </MenuItem>,
        <MenuItem key="favoritePage" onClick={handleFavoritePage}>
          Favorite Page
        </MenuItem>,
        <MenuItem key="logout" onClick={handleMenuClose}>
          Logout
        </MenuItem>,
      ]}
      {!isLoggedIn && (
        <MenuItem onClick={handleMenuClose}>
          <Link to={ROUTES.LOGIN}>Login</Link>
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="primary" sx={{ backgroundColor: "#333" }}>
        <Toolbar sx={{ justifyContent: "center" }}>
          <Link
            to={ROUTES.HOME}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <img
              src={process.env.PUBLIC_URL + "/assets/imgs/logo4.png"}
              alt="Gadget Shop Logo"
              style={{
                marginRight: "10px",
                marginTop: "15px",
                width: "75px",
                height: "75px",
                cursor: "pointer",
              }}
            />
          </Link>
          <Hidden mdUp>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="open drawer"
              sx={{ mr: 2 }}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Arial, sans-serif",
              fontWeight: 600,
              display: "flex",
              justifyContent: "center",
            }}
          />
          <Links />
          <FilterComponent />
          <IconButton
            sx={{ marginTop: 1 }}
            color="inherit"
            onClick={handleThemeChange}
          >
            <Typography>
              {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
            </Typography>
          </IconButton>
          <IconButton onClick={() => navigate(ROUTES.CARTPAGE)}>
            <Badge
              badgeContent={cartItemsCount}
              color="secondary"
              sx={{ color: "white" }}
            >
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            {isLoggedIn ? (
              <img
                src={
                  imageUrl ||
                  process.env.PUBLIC_URL + "/assets/imgs/default-image.png"
                }
                style={{
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                }}
                alt="User Avatar"
              />
            ) : (
              <AccountCircle />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <LeftDrawerComponent
        isOpen={isDrawerOpen}
        onCloseDrawer={() => setDrawerOpen(false)}
      />
      <ToastContainer />
    </Box>
  );
};

export default HeaderComponent;

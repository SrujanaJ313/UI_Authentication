import React, { useState, useEffect } from "react";
import MuiAppBar from "@mui/material/AppBar";
import { Box, IconButton, Toolbar, Typography, styled } from "@mui/material";

import { AccountCircle } from "@mui/icons-material";
import Notifications from "../Notifications";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, MenuItem } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  boxShadow: "none",
  borderBottomWidth: 1,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
    const handleOpenMenu = (event) => {
      setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAnchorEl(null);
    if(!location?.state?.remember){
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  useEffect(() => {
    toast("Logged in Successfully!");
  },[])
  return (
    <>
      <AppBar position="absolute">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <Typography
            component="h1"
            variant="h6"
            className="!tracking-wider"
            fontWeight={600}
            noWrap
          >
            ADJ Dashboard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}
          >
            <Notifications />
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={handleOpenMenu}
            >
              <AccountCircle />
            </IconButton>
            <span className="pl-2 text-white font-medium">
              Welcome, Srujana
            </span>
          </Box>
        </Toolbar>
      </AppBar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        // transformOrigin={{
        //     vertical: 'top',
        //     horizontal: 'right',
        // }}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
      <ToastContainer />
    </>
  );
}


export default Header;

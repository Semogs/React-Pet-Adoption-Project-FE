import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import PetsRoundedIcon from "@mui/icons-material/PetsRounded";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AdoptContext } from "../Context/Context";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";

export default function AdminDrawer() {
  const { setIsClicked } = useContext(AdoptContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.clear();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/" style={{ textDecoration: "none" }}>
        <MenuItem onClick={handleMenuCloseLogout} sx={{ color: "#581845" }}>
          Sign Out
        </MenuItem>
      </Link>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen} sx={{ color: "#581845" }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <Avatar />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          background: "#581845",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 8, ml: 2, display: { xs: "none", md: "flex" } }}
            >
              Tales of Tails
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <Link to="/home" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Home
                </Button>
              </Link>
              <Link to="/search" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "white", display: "block" }}>
                  Search
                </Button>
              </Link>
            </Box>
            <Box sx={{ display: { xs: "none", md: "flex", flexGrow: 0 } }}>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar sx={{ background: "orange" }}>A</Avatar>
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <Drawer
        variant="permanent"
        sx={{
          width: 200,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: 200,
            boxSizing: "border-box",
            background: "#581845",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto", mt: 2, ml: 2, color: "white" }}>
          <List>
            <IconButton onClick={() => setIsClicked(true)}>
              <ListItem>
                <ListItemIcon>
                  <GroupRoundedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ color: "white" }} />
              </ListItem>
            </IconButton>
            <IconButton onClick={() => setIsClicked(false)}>
              <ListItem>
                <ListItemIcon>
                  <PetsRoundedIcon sx={{ color: "white" }} />
                </ListItemIcon>
                <ListItemText primary="Pets" sx={{ color: "white" }} />
              </ListItem>
            </IconButton>
            <Link to={"/add-pet"} style={{ textDecoration: "none" }}>
              <IconButton>
                <ListItem>
                  <ListItemIcon>
                    <AddCircleSharpIcon sx={{ color: "white" }} />
                  </ListItemIcon>
                  <ListItemText primary="Add Pet" sx={{ color: "white" }} />
                </ListItem>
              </IconButton>
            </Link>
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

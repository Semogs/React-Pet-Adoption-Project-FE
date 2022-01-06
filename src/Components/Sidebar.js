import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import { ListItemIcon } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [direction, setDirection] = useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDirection({ ...direction, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link to="/home" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon sx={{ color: "#581845" }}>
              <HomeIcon sx={{ mt: 0.2, mr: 1 }} />
              <ListItemText>Home</ListItemText>
            </ListItemIcon>
          </ListItem>
        </Link>
        <Link to="/search" style={{ textDecoration: "none" }}>
          <ListItem button>
            <ListItemIcon sx={{ color: "#581845" }}>
              <SearchIcon sx={{ mt: 0.3, mr: 1 }} />
              <ListItemText>Search</ListItemText>
            </ListItemIcon>
          </ListItem>
        </Link>
      </List>
      <Divider />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"left"}>
        <MenuIcon onClick={toggleDrawer("left", true)} className="menu-icon" />
        <Drawer
          anchor={"left"}
          open={direction["left"]}
          onClose={toggleDrawer("left", false)}
        >
          {list("left")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}

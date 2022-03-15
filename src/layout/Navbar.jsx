import React from "react";
import { AppBar, Typography, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LanguageSelector from "../languages/LanguageSelector";
import ToggleDarkMode from "../theme/ToggleDarkMode";
import Text from "../languages/Text";

const Navbar = ({ drawerWidth, handleDrawerToggle, title }) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flex: 1 }}>
          {title || Text({ tid: "home" })}
        </Typography>
        <ToggleDarkMode />
        <LanguageSelector />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

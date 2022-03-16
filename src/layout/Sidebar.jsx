import React, { useEffect, useContext, useState } from "react";
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FeedIcon from "@mui/icons-material/Feed";
import Text from "../languages/Text";
import { languageContext, colorModeContext } from "../context/ContextProvider";
import DrawerComp from "./DrawerComp";

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth, window }) => {
  const language = useContext(languageContext);
  const { colorMode } = useContext(colorModeContext);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "background.grey3",
          },
        }}
      >
        <DrawerComp />
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            bgcolor: "background.grey3",
          },
        }}
        open
      >
        <DrawerComp />
      </Drawer>
    </>
  );
};

export default Sidebar;

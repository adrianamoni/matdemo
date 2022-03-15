import React, { useEffect, useContext, useState } from "react";
import { Drawer } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import FeedIcon from "@mui/icons-material/Feed";
import Text from "../languages/Text";
import { languageContext, colorModeContext } from "../context/ContextProvider";
import DrawerComp from "./Drawer";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth, window }) => {
  const language = useContext(languageContext);
  const { colorMode } = useContext(colorModeContext);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    if (!links) {
      setlinks([
        {
          id: 1,
          name: <Text tid={"home"} />,
          icon: <HomeIcon />,
          path: "/",
        },
        {
          id: 2,
          name: <Text tid={"table"} />,
          icon: <TableChartIcon />,
          path: "/table",
        },
        {
          id: 3,
          name: <Text tid={"charts"} />,
          icon: <BarChartIcon />,
          path: "/charts",
        },
        {
          id: 4,
          name: <Text tid={"dashboard"} />,
          icon: <DashboardIcon />,
          path: "/dashboard",
        },
        {
          id: 5,
          name: <Text tid={"assignment"} />,
          icon: <PersonAddAlt1Icon />,
          path: "/asignacion",
        },
        {
          id: 6,
          name: <Text tid={"deassignment"} />,
          icon: <PersonRemoveAlt1Icon />,
          path: "/desasignacion",
        },
        /*  {
          id: 4,
          name: <Text tid={"detail"} />,
          icon: <FeedIcon />,
          path: "/frit-dashboard",
        }, */
      ]);
    }
  }, []);

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
            bgcolor: colorMode === "dark" ? "grey.900" : "grey.200",
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
            bgcolor: colorMode === "dark" ? "grey.900" : "grey.200",
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

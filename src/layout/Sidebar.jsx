import React, { useEffect, useContext, useState } from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import { Link } from "react-router-dom";

import Text from "../languages/Text";
import { languageContext } from "../context/ContextProvider";
import DrawerComp from "./Drawer";

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth, window }) => {
  const language = useContext(languageContext);
  const [links, setlinks] = useState(undefined);

  const StyledLink = styled(Link)({
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
  });

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
          id: 4,
          name: <Text tid={"fritDashboard"} />,
          icon: <DashboardIcon />,
          path: "/frit-dashboard",
        },
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
            backgroundColor: "#ededed",
          },
        }}
      >
        {links && <DrawerComp navLinks={links} />}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
            backgroundColor: "#eee",
          },
        }}
        open
      >
        {links && <DrawerComp navLinks={links} />}
      </Drawer>
    </>
  );
};

export default Sidebar;

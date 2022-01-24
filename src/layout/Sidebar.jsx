import React from "react";
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

const navLinks = [
  {
    id: 1,
    name: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    id: 2,
    name: "Table",
    icon: <TableChartIcon />,
    path: "/table",
  },
  {
    id: 3,
    name: "Charts",
    icon: <BarChartIcon />,
    path: "/charts",
  },
  {
    id: 4,
    name: "Dashboard",
    icon: <DashboardIcon />,
    path: "/dashboard",
  },
  {
    id: 4,
    name: "FritDashboard",
    icon: <DashboardIcon />,
    path: "/frit-dashboard",
  },
];

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const Sidebar = ({ mobileOpen, handleDrawerToggle, drawerWidth, window }) => {
  const drawer = (
    <div>
      <Toolbar sx={{ backgroundColor: "#0f59a3", color: "whitesmoke" }}>
        <Typography variant="h5" noWrap>
          APP LOGO
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navLinks.map((link) => (
          <StyledLink key={link.id} to={link.path} classes>
            <ListItem button>
              <ListItemIcon sx={{ color: "#0f59a3" }}>{link.icon}</ListItemIcon>
              <ListItemText primary={link.name} />
            </ListItem>
          </StyledLink>
        ))}
      </List>
    </div>
  );
  /* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav> */
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
            backgroundColor: "#ededed",
          },
        }}
      >
        {drawer}
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
        {drawer}
      </Drawer>
    </>
  );
};

export default Sidebar;

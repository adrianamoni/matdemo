import React, { useContext, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/system";
import LoginModal from "../components/modals/LoginModal";
import LogoutModal from "../components/modals/LogoutModal";
import { globalDataContext, loginContext } from "../context/ContextProvider";
import HomeIcon from "@mui/icons-material/Home";
import DashboardIcon from "@mui/icons-material/Dashboard";
import TableChartIcon from "@mui/icons-material/TableChart";
import BarChartIcon from "@mui/icons-material/BarChart";
import Text from "../languages/Text";

const sidebarItems = [
  {
    id: 1,
    name: "home",
    icon: <HomeIcon />,
    path: "/dashboard",
  },
  /*  {
          id: 2,
          name: "table",
          icon: <TableChartIcon />,
          path: "/table",
        },
        {
          id: 3,
          name: "charts",
          icon: <BarChartIcon />,
          path: "/charts",
        }, */
  /* {
          id: 4,
          name: "dashboard",
          icon: <DashboardIcon />,
          path: "/dashboard",
        }, */
  /*  {
          id: 4,
          name: "detail",
          icon: <FeedIcon />,
          path: "/frit-dashboard",
        }, */
];

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const DrawerComp = () => {
  const { loggedUser } = useContext(loginContext);
  const { extras } = useContext(globalDataContext);
  const [loginModal, setLoginModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

  if (loggedUser.isLogged) {
    const perms = loggedUser.permissions;
    console.log("111 perms", perms);
  }

  console.log("111 extras", extras);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <div>
          <Toolbar
            sx={{
              backgroundColor: "primary.main",
              /* color: "text", */
              height: 65,
            }}
          >
            <Typography variant="h6" noWrap sx={{ color: "text.main" }}>
              APP LOGO
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {sidebarItems.map((link) => (
              <StyledLink key={link.id} to={link.path} classes>
                <ListItem button>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={Text({ tid: link.name })} />
                </ListItem>
              </StyledLink>
            ))}
          </List>
        </div>

        <List>
          <ListItem
            button
            onClick={() => setLoginModal(true)}
            disabled={loggedUser.isLogged}
          >
            <ListItemIcon sx={{ color: "secondary.main" }}>
              <LoginIcon />
            </ListItemIcon>

            <ListItemText primary="Login" />
          </ListItem>
          <ListItem
            button
            onClick={() => setLogoutModal(true)}
            disabled={!loggedUser.isLogged}
          >
            <ListItemIcon sx={{ color: "secondary.main" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </div>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
    </>
  );
};
export default DrawerComp;

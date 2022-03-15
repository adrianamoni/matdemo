import React, { useState } from "react";
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

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const DrawerComp = ({ navLinks }) => {
  const [loginModal, setLoginModal] = useState(false);
  const [logoutModal, setLogoutModal] = useState(false);

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
            {navLinks.map((link) => (
              <StyledLink key={link.id} to={link.path} classes>
                <ListItem button>
                  <ListItemIcon sx={{ color: "secondary.main" }}>
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText primary={link.name} />
                </ListItem>
              </StyledLink>
            ))}
          </List>
        </div>

        <List>
          <ListItem button onClick={() => setLoginModal(true)}>
            <ListItemIcon sx={{ color: "secondary.main" }}>
              <LoginIcon />
            </ListItemIcon>

            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => setLogoutModal(true)}>
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

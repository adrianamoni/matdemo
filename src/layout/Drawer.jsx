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
import LoginModal from "./../components/screens/Login/LoginModal";
import LogoutModal from "./../components/screens/Login/LogoutModal";

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
            sx={{ backgroundColor: "#0f59a3", color: "whitesmoke", height: 65 }}
          >
            <Typography variant="h5" noWrap>
              APP LOGO
            </Typography>
          </Toolbar>
          <Divider />
          <List>
            {navLinks.map((link) => (
              <StyledLink key={link.id} to={link.path} classes>
                <ListItem button>
                  <ListItemIcon sx={{ color: "#0f59a3" }}>
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
            <ListItemIcon sx={{ color: "#0f59a3" }}>
              <LoginIcon />
            </ListItemIcon>

            <ListItemText primary="Login" />
          </ListItem>
          <ListItem button onClick={() => setLogoutModal(true)}>
            <ListItemIcon sx={{ color: "#0f59a3" }}>
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

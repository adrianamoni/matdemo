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
import ModalContainer from "../components/modal/ModalContainer";
import { Box } from "@mui/system";
const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const DrawerComp = ({ navLinks }) => {
  const [loginModal, setLoginModal] = useState(false);

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
          <ListItem>
            <ListItemButton
              sx={{ color: "#0f59a3" }}
              onClick={() => setLoginModal(true)}
            >
              <LoginIcon />
              <ListItemText primary="Login" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton
              sx={{ color: "#0f59a3" }}
              /*    onClick={() => setLoginModal(true)} */
            >
              <LogoutIcon />
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </div>
      <ModalContainer opened={loginModal} closed={setLoginModal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Text in a modal
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </ModalContainer>
    </>
  );
};
export default DrawerComp;

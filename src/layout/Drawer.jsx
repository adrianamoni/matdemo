import React from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";

const StyledLink = styled(Link)({
  textDecoration: "none",
  color: "inherit",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
});

const DrawerComp = ({ navLinks }) => {
  return (
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
};
export default DrawerComp;

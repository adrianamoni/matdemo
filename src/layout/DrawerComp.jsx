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
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import { globalDataContext, loginContext } from "../context/ContextProvider";
import HomeIcon from "@mui/icons-material/Home";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PersonRemoveAlt1Icon from "@mui/icons-material/PersonRemoveAlt1";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ViewListIcon from "@mui/icons-material/ViewList";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import Text from "../languages/Text";
import LoginModal from "../components/screens/Login/LoginModal";
import LogoutModal from "../components/screens/Login/LogoutModal";
import LanguageSelector from "../languages/LanguageSelector";
import ToggleDarkMode from "../theme/ToggleDarkMode";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const sidebarItems = [
  {
    id: 1,
    name: "home",
    icon: <HomeIcon />,
    path: "/",
  },

  {
    id: 2,
    name: "assignment",
    icon: <PersonAddAlt1Icon />,
    path: "/asignacion",
    extra: "asignacion",
  },
  {
    id: 3,
    name: "deassignment",
    icon: <PersonRemoveAlt1Icon />,
    path: "/desasignacion",
    extra: "asignacion",
  },
  /*  {
    id: 4,
    name: "hoppers",
    icon: <AllInboxIcon />,
    path: "/tolvas",
    extra: "tolvas",
  }, */
  //UNDO THIS ABOVE
  /*  {
    id: 6,
    name: "sequencing",
    icon: <ViewTimelineIcon />,
    path: "/secuenciacion",
    permission: "Secuenciacion",
  },
  {
    id: 7,
    name: "interruptionManager",
    icon: <HistoryToggleOffIcon />,
    path: "/gestor-paros",
    permission: "GestionParos",
  },
  {
    id: 8,
    name: "orders",
    icon: <ViewListIcon />,
    path: "/ordenes",
    permission: "GestorOrdenes",
  }, */
  /*   {
    id: 5,
    name: "cleaning",
    icon: <CleaningServicesIcon />,
    path: "/limpieza",
    extra: "limpieza",
  }, */
];

const protectedItems = [
  {
    id: 6,
    name: "sequencing",
    icon: <ViewTimelineIcon />,
    path: "/secuenciacion",
    permission: "Secuenciacion",
  },
  {
    id: 7,
    name: "interruptionManager",
    icon: <HistoryToggleOffIcon />,
    path: "/gestor-paros",
    permission: "GestionParos",
  },
  {
    id: 8,
    name: "orders",
    icon: <ViewListIcon />,
    path: "/ordenes",
    permission: "GestorOrdenes",
  },
];

const extrasItems = [];

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
  let filteredItems;
  if (loggedUser.isLogged) {
    const perms = loggedUser.permissions;

    const filteredProtectedItems = protectedItems.filter((item) =>
      perms.find((el) => el.desc.split(".")[0] === item.permission)
    );
    filteredItems = [...sidebarItems, ...filteredProtectedItems];
  } else {
    filteredItems = [...sidebarItems];
  }

  const handleRedirect = () => {
    const externalUrl =
      "http://192.168.9.128:8000/en-US/account/insecurelogin?loginType=splunk&username=admin&password=Aeiou1234&return_to=%2Fapp%2FMES%2Fparos";
    window.open(externalUrl, "_blank");
  };

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
              backgroundColor: "background.grey3",
              /* color: "text", */
              /*         height: 52, */
              textAlign: "center",
              border: "none",
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            }}
          >
            <StyledLink to={"/"}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  color: "#111",
                  fontWeight: 700,
                  marginBottom: "-20px",
                }}
              >
                <img
                  style={{ width: "80%" }}
                  src="images/oasys_logo2.png"
                  alt="Oasys"
                />
                {/*  APP LOGO */}
              </Typography>
            </StyledLink>
          </Toolbar>
          {/*  <Divider /> */}
          <List id="sidebar-list">
            {filteredItems.map((link) => (
              <StyledLink key={link.id} to={link.path} /* classes */>
                <ListItem button>
                  <ListItemIcon
                    sx={{
                      color: "secondary.main",
                    }}
                  >
                    {link.icon}
                  </ListItemIcon>
                  <ListItemText disableTypography={true}>
                    <Typography variant="h6">
                      {Text({ tid: link.name })}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </StyledLink>
            ))}
            <Button
              sx={{ paddingLeft: 2.2, textTransform: "none" }}
              startIcon={
                <OpenInNewIcon
                  sx={{
                    color: "secondary.main",
                  }}
                />
              }
              onClick={handleRedirect}
            >
              <Typography
                variant="h6"
                sx={{ color: "#111", paddingLeft: 1, textAlign: "left" }}
              >
                {Text({ tid: "operatingData" })}
              </Typography>
            </Button>
          </List>
        </div>

        <List>
          {/* <ListItem sx={{ justifyContent: "center" }}>
            <ToggleDarkMode />
          </ListItem> */}

          <LanguageSelector />
          <ListItem
            button
            onClick={() => setLoginModal(true)}
            disabled={loggedUser.isLogged}
          >
            <ListItemIcon sx={{ color: "secondary.main" }}>
              <LoginIcon />
            </ListItemIcon>

            <ListItemText disableTypography={true}>
              <Typography variant="h6">{"Login"}</Typography>
            </ListItemText>
          </ListItem>
          <ListItem
            button
            onClick={() => setLogoutModal(true)}
            disabled={!loggedUser.isLogged}
          >
            <ListItemIcon sx={{ color: "secondary.main" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText disableTypography={true}>
              <Typography variant="h6">{"Logout"}</Typography>
            </ListItemText>
          </ListItem>
        </List>
      </div>
      <LoginModal loginModal={loginModal} setLoginModal={setLoginModal} />
      <LogoutModal logoutModal={logoutModal} setLogoutModal={setLogoutModal} />
    </>
  );
};
export default DrawerComp;

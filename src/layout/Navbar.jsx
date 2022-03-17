import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  AppBar,
  Typography,
  IconButton,
  Toolbar,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import {
  formContext,
  selectedRowsIdsContext,
  selectedRowsContext,
  loginContext,
  globalDataContext,
  lineUsersContext,
} from "../context/ContextProvider";
import Text from "../languages/Text";
import useWindowSize from "../components/customHooks/UseWindowsSize";
import moment from "moment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { MemoryDatabaseCall } from "../services/Service";
import { logged_users } from "../services/serviceHelper";
const titles = {
  "/": "home",
  "/asignacion": "assignment",
  "/desasignacion": "deassignment",
  "/tolvas": "hoppers",
  "/secuenciacion": "sequencing",
  "/detalle-orden": "orderDetail",
  "/ordenes": "orderManagement",
  "/gestor-paros": "interruptionManagement",
};

const Navbar = ({ drawerWidth, handleDrawerToggle }) => {
  const PROJECT_NAME = import.meta.env.VITE_APP_PROJECT_NAME;
  let location = useLocation();
  const { pathname } = location;
  const { width } = useWindowSize();
  const [currentTime, setCurrentTime] = useState(
    moment().format("DD/MM/YYYY, HH:mm")
  );
  const { globalData, setGlobalData } = useContext(globalDataContext);
  const { lineData } = globalData;
  const { lineUsers, setLineUsers } = useContext(lineUsersContext);
  const { loggedUser } = useContext(loginContext);
  const { setformWidget } = useContext(formContext);
  const { setSelectedRowsIds } = useContext(selectedRowsIdsContext);
  const { setSelectedRows } = useContext(selectedRowsContext);

  useEffect(() => {
    let clearIntervalKey;

    const fetchUsersData = async () => {
      const filter_arr = [
        {
          filterExpression: null,
          filterItem: {
            column: "ent_name",
            dataType: "STRING",
            value: pathname === "/limpieza" ? "LIM01" : lineData.entName,
            filterItemType: "Equal",
            checkDBNull: false,
          },
        },
      ];
      const response = await MemoryDatabaseCall({
        params: logged_users({ filter_arr }),
        url: "queryDataFrameDataAsync",
      });
      if (response) {
        setLineUsers(response);
        localStorage.setItem(
          `AssignedUsers_${PROJECT_NAME}`,
          JSON.stringify(response)
        );
      }
    };

    if (
      lineData &&
      pathname !== "/secuenciacion" &&
      /* pathname !== "/contenedor" && */
      pathname !== "/pdf" &&
      pathname !== "/impresoras-config" &&
      pathname !== "/gestor-paros"
    ) {
      fetchUsersData();
      clearIntervalKey = setInterval(fetchUsersData, 30000);
    }

    return () => {
      clearInterval(clearIntervalKey);
      setLineUsers([]);
      localStorage.removeItem("lineUsers");
    };
    //eslint-disable-next-line
  }, [lineData, pathname]);

  useEffect(() => {
    setformWidget({});
    setSelectedRowsIds([]);
    setSelectedRows([]);
  }, [location]);
  const title = titles[pathname];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(moment().format("DD/MM/YYYY, HH:mm"));
    }, 60000);
    return () => clearInterval(interval);
  }, [currentTime]); ///<--- this right here

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        ml: { md: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <Grid container spacing={1} alignItems="center">
          {width < 900 && (
            <Grid item xs={1}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { md: "none" } }}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          )}

          <Grid item xs={3} textAlign="left">
            <Typography variant="h6" noWrap component="div" sx={{ flex: 1 }}>
              {Text({ tid: title })}
            </Typography>
          </Grid>
          <Grid
            item
            xs={width < 900 ? 5 : 6}
            textAlign="center"
            alignItems="center"
          >
            <div sx={{ justifyContent: "space-between" }}>
              {(pathname === "/detalle-orden" ||
                pathname === "/limpieza-mensual" ||
                pathname === "/limpieza") &&
                lineUsers &&
                lineUsers.length > 0 &&
                lineUsers.map((item, i) => <AssignedUser user={item} />)}
            </div>
          </Grid>

          <Grid item xs={3} textAlign="right">
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="body2">{currentTime}</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ color: "rgb(230,255,160)" }}
                textAlign="right"
              >
                {loggedUser && loggedUser.isLogged && (
                  <>
                    <Grid
                      container
                      sx={{ display: "inline-flex", justifyContent: "right" }}
                    >
                      <AccountBoxIcon />

                      <Typography variant="body">
                        {loggedUser.userId}
                      </Typography>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
const AssignedUser = ({ user }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  return (
    <div
      style={{
        textAlign: "center",
        padding: "0px 10px",
        display: "inline-block",
        color: "whitesmoke",
      }}
      aria-owns={open ? "mouse-over-popover" : undefined}
      aria-haspopup="true"
      onMouseEnter={handlePopoverOpen}
      onMouseLeave={handlePopoverClose}
    >
      <div style={{ marginBottom: "-5px" }}>
        <AccountCircleIcon />
      </div>
      <div style={{ marginTop: "-5px" }}>
        <Typography>{user.user_id}</Typography>
      </div>

      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: "none",
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <Typography sx={{ p: 2 }}>{user.user_desc}</Typography>
      </Popover>
    </div>
  );
};

export default Navbar;

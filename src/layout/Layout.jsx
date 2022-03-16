import React, { useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Outlet, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { createTheme, ThemeProvider, useTheme } from "@mui/material";
import { colorModeContext } from "../context/ContextProvider";
import { getPalette } from "./palettes";

const drawerWidth = 200;

function Layout(props) {
  const { window } = props;
  let { slug } = useParams();

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const { colorMode } = useContext(colorModeContext);
  /* palettes: 'green-orange', 'darkblue-lightblue','pink-purple','purple-green' */
  const palette = getPalette("darkblue-lightblue", colorMode);

  const theme = createTheme({
    palette: {
      mode: colorMode,
      ...palette,
      error: {
        main: colorMode === "dark" ? "#DC143C" : "#7a0a20",
        contrastText: "#fff",
        text: "#fff",
      },
      success: {
        main: colorMode === "dark" ? "#00FA9A" : "#058554",
        contrastText: "#fff",
        text: "#fff",
      },
      warning: {
        main: colorMode === "dark" ? "#d1a35e" : "#8c5400",
        contrastText: "#fff",
        text: "#fff",
      },
      info: {
        main: colorMode === "dark" ? "#36b1f5" : "#0288D1",
        contrastText: "#fff",
        text: "#fff",
      },
      background: {
        error: "#DC143C10",
        success: "#00FA9A10",
        warning: "#d1a35e10",
        info: "#0288D110",
      },
      text: {
        main: colorMode === "light" ? "#111" : "#eee",
      },
    },
    typography: {
      fontSize: 16,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
          title={slug}
        />
        <Box
          component="nav"
          sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Sidebar
            mobileOpen={mobileOpen}
            handleDrawerToggle={handleDrawerToggle}
            drawerWidth={drawerWidth}
            window={window}
          />
        </Box>
        <Box
          component="main"
          sx={{
            m: 0,
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

Layout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Layout;

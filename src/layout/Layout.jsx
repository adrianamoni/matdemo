import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
  useTheme,
} from "@mui/material";
import { userPreferencesContext } from "../context/ContextProvider";
import { getPalette } from "./palettes";
import { grey } from "@mui/material/colors";
import useWindowSize from "../components/customHooks/UseWindowsSize";

const drawerWidth = 220;

function Layout(props) {
  const { window } = props;
  const userPreferencesCtxt = useContext(userPreferencesContext);
  const colorMode = userPreferencesCtxt?.userPreferences?.colorMode || "light";

  /*   const [height, setHeight] = useState();
  const containerComp = useRef(null); */

  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /* palettes: 'oasys', 'grey-orange','green-orange', 'darkblue-lightblue','pink-purple','purple-green' */
  const palette = getPalette("grey-orange", colorMode);
  const { primary, secondary } = palette;

  let theme = createTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 300,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    palette: {
      mode: colorMode,
      primary,
      secondary,
      error: {
        main: colorMode === "dark" ? "#DC143C" : "#c41034",
        contrastText: "#fff",
        text: "#fff",
      },
      success: {
        main: colorMode === "dark" ? "#08c97f" : "#2aad76", //"#0bd689",
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
        primary: colorMode === "dark" ? "#1e1e1e" : "#fff",
        error: colorMode === "dark" ? "#2e090d" : "#fff2f2",
        success: "#00FA9A20",
        warning: "#d1a35e20",
        info: "#0288D110",
        grey1: colorMode === "dark" ? "#141414" : grey[600],
        grey2: colorMode === "dark" ? "#141414" : grey[300], //grey[800] : grey[300],
        grey3: colorMode === "dark" ? grey[900] : grey[200],
        grey4: colorMode === "dark" ? grey[900] : grey[50],
      },
      text: {
        main: colorMode === "dark" ? "#eee" : "#050505",
      },
      /*   action: {
        disabledBackground: colorMode === "dark" ? "#141414" : grey[300],
        disabled: colorMode === "dark" ? "#141414" : grey[300],
      }, */
    },
    typography: {
      h1: {
        fontSize: "6rem",
      },
      h2: {
        fontSize: "3.75rem",
      },
      h3: {
        fontSize: "3rem",
      },
      h4: {
        fontSize: "2.125rem",
      },
      h5: {
        fontSize: "1.5rem",
      },
      h6: {
        fontSize: "1.2rem",
      },
      body1: {
        fontSize: "1.05rem",
      },
      body2: {
        fontSize: "1rem",
      },
      body3: {
        fontSize: "0.875rem",
      },
    },
    /*  spacing: (factor) => `${0.25 * factor}rem`, // (Bootstrap strategy) */
  });
  theme = responsiveFontSizes(theme);

  /* theme.typography.h3 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  };
  theme.typography.h6 = {
    fontSize: "1.2rem",
    "@media (min-width:600px)": {
      fontSize: "1.5rem",
    },
    [theme.breakpoints.up("md")]: {
      fontSize: "2.4rem",
    },
  }; */

  /*   useEffect(() => {
    const color = colorMode === "isDark" ? "rgb(20,20,20)" : "#e0e0e0";
    document.body.style.backgroundColor = color; //"#e0e0e0";
  }, [colorMode]); */

  return (
    <ThemeProvider theme={theme}>
      <Box
        /*    ref={containerComp} */
        sx={{
          display: "flex",
          backgroundColor: "background.grey2",
          /*           height: "calc(100vh)", */
          /* height: height, */
        }}
      >
        <CssBaseline />
        <Navbar
          handleDrawerToggle={handleDrawerToggle}
          drawerWidth={drawerWidth}
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
            p: 2,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            minHeight: "100vh",
            backgroundColor: "background.grey2",
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

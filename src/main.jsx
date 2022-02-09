import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

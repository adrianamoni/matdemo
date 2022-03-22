import { CssBaseline, ThemeProvider } from "@mui/material";
import React from "react";
import ReactDOM from "react-dom";
import AppRouter from "./AppRouter";
import { ContextProvider } from "./context/ContextProvider";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <AppRouter />
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

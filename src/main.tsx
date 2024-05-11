import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";

import 'react-phone-number-input/style.css'
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto", "Arial", "sans-serif"].join(", "),
  },
  palette: {
    primary: {
      main: "#2EAB8D",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      main: "#2A2A2A",
      dark: "#ba000d",
      contrastText: "#000",
    },
    grey: {
      300: "#A0A0A0",
      600: "#595959",
      800: "#2A2A2A",
    },
    background: {
      default: "#F2F2F2",
    },
    info: {
      500: "#252657",
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

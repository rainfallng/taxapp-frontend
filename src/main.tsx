import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "react-phone-number-input/style.css";
import "./index.css";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto", "Arial", "sans-serif"].join(", "),
    fontSize: 18,
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
      50: "#E7E7E7",
      100: "#D0D0D0",
      300: "#A0A0A0",
      600: "#595959",
      800: "#2A2A2A",
      200: "#B8B8B8",
    },
    background: {
      default: "#F2F2F2",
    },
    info: {
      500: "#252657",
    },
  },
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <App />
            <Toaster
              containerClassName="toaster-wrapper"
              position="top-center"
              toastOptions={{ style: { fontSize: "1.2rem", fontWeight: 500 } }}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);

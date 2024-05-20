import { Box, Typography, useTheme } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Button from "../ui/button";

const Auth = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const getHeaderContent = () => {
    switch (location.pathname) {
      case "/auth/login":
        return {
          text: "I am a new user.",
          link: "/auth/register",
          linkText: "Create Account",
        };
      case "/auth/register":
        return {
          text: "I am a returning user.",
          link: "/auth/login",
          linkText: "Sign In",
        };

      default:
        return null;
    }
  };

  const headerContent = getHeaderContent();

  return (
    <Box component="main" sx={{ padding: "1.6rem 6.4rem" }}>
      {headerContent && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.8rem",
          }}
        >
          <Typography color="#2D2D43" sx={{ fontSize: "1.6rem" }}>
            {headerContent.text}
          </Typography>
          <Button
            onClick={() => navigate(headerContent.link)}
            sx={{
              borderRadius: "5rem",
              fontSize: "1.4rem",
              textTransform: "capitalize",
              px: "2.4rem",
            }}
          >
            <HttpsOutlinedIcon
              sx={{ mr: "0.8rem", width: "1.6rem", height: "1.6rem" }}
            />
            {headerContent.linkText}
          </Button>
        </Box>
      )}
      <Box
        component="section"
        sx={{
          mx: "auto",
          maxWidth: "40.9rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "1.9rem",
          gap: "3.2rem",
        }}
      >
        <Box
          component="img"
          src="/assets/svgs/logo.svg"
          sx={{ width: "18.9rem", height: "4.32rem" }}
        />
        <Box
          bgcolor={theme.palette.primary.contrastText}
          width="100%"
          sx={{ padding: "3.93rem 3.2rem", borderRadius: "1rem" }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Auth;

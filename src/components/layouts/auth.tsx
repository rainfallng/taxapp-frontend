import { Box, Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <main>
      <Box>
        <Typography>I am a returning user.</Typography>
        <Button>Sign In</Button>
      </Box>
      <Outlet />
    </main>
  );
};

export default Auth;

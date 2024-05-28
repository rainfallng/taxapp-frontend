import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Typography } from "@mui/material";
import Button from "../ui/button";
import { useNavigate } from "react-router-dom";

const AuthSuccess = ({ title, detail }: { title: string; detail: string }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="section"
      display="flex"
      flexDirection="column"
      alignItems="center"
      textAlign="center"
      sx={{ pt: "13rem" }}
    >
      <Box
        sx={{
          bgcolor: "#E3F3F0",
          width: "9.6rem",
          height: "9.6rem",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CheckCircleIcon
          color="success"
          sx={{ width: "5rem", height: "5rem" }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: "3.2rem",
          fontWeight: 600,
          color: (theme) => theme.palette.grey[800],
          mt: "3.2rem",
          mb: "1.6rem",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: "1.8rem",
          color: (theme) => theme.palette.grey[800],
          mb: "4rem",
          maxWidth: "56rem",
          mx: "auto",
        }}
      >
        {detail}
      </Typography>
      <Button
        sx={{
          py: "1rem",
          px: "2.4rem",
          borderRadius: "5rem",
          fontSize: "1.8rem",
          textTransform: "capitalize",
        }}
        onClick={() => navigate("/auth/login")}
      >
        Proceed to Login
      </Button>
    </Box>
  );
};

export default AuthSuccess;

import Button from "@/components/ui/button";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const SuccessPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        py: "9.6rem",
        width: { lg: "88.9rem" },
      }}
    >
      <Box
        component="img"
        src="/assets/svgs/smiley.svg"
        alt=""
        sx={{ width: "11.2rem", height: "11.2rem" }}
      />
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.grey[800],
          fontSize: "3.2rem",
          fontWeight: 600,
          my: "1.6rem",
        }}
      >
        Congratulation!
      </Typography>
      <Typography sx={{ fontSize: "1.8rem", mb: "4rem" }}>
        Your details have been successfully verified.
      </Typography>
      <Button
        onClick={() => navigate("/app")}
        sx={{ fontSize: "1.8rem", borderRadius: "5rem", px: "2.4rem" }}
      >
        Proceed to dashboard
      </Button>
    </Box>
  );
};

export default SuccessPage;

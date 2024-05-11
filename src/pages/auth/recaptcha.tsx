import Protected from "@/components/layouts/protected";
import Button from "@/components/ui/button";
import { Box, Typography } from "@mui/material";

const Recaptcha = () => {
  return (
    <Protected>
      <Typography
        sx={{
          maxWidth: "30rem",
          mx: "auto",
          mb: "2.2rem",
          textAlign: "center",
          fontSize: "2.2rem",
          fontWeight: 500,
          color: "#2D2D43",
        }}
      >
        We need to make sure you’re not a robot
      </Typography>
      <Box sx={{ mb: "1.6rem", mt: "3.2rem" }}>....</Box>
      <Button
        disabled
        sx={{
          py: "1.45rem",
          borderRadius: "5rem",
          width: "100%",
          fontSize: "1.6rem",
          textTransform: "capitalize",
        }}
      >
        Continue
      </Button>
    </Protected>
  );
};

export default Recaptcha;

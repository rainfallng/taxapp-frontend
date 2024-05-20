import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import { Box, Typography, useTheme } from "@mui/material";

const Success = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: "8.8rem",
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
        <Button sx={{ fontSize: "1.8rem", borderRadius: "5rem", px: "2.4rem" }}>
          Proceed to dashboard
        </Button>
      </Box>
    </Layout>
  );
};

export default Success;

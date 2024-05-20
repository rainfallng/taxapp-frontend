import { Box, Typography } from "@mui/material";
import { Fragment } from "react";
import Input from "../ui/input";
import Button from "../ui/button";

const VerifyCode = () => {
  return (
    <Fragment>
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
        A verification code has been sent to you
      </Typography>
      <Box display="flex" justifyContent="center">
        <Box
          component="img"
          src="/assets/svgs/mobile-check.svg"
          sx={{ width: "4rem", height: "4rem" }}
        />
      </Box>
      <Typography
        textAlign="center"
        color="#4A4A68"
        sx={{ fontSize: "1.8rem", my: "2.4rem" }}
      >
        Enter the verification code we sent you to verify your identity
      </Typography>
      <Typography
        textAlign="center"
        color="#4A4A68"
        sx={{ fontSize: "1.8rem", mb: "0.8rem" }}
      >
        We sent a code to:
      </Typography>
      <Typography
        textAlign="center"
        color="#4A4A68"
        sx={{ fontSize: "1.8rem" }}
        fontWeight={500}
      >
        080123456789
      </Typography>
      <Box sx={{ mt: "4rem", mb: "3.2rem" }}>
        <Typography
          sx={{
            mb: "0.8rem",
            fontSize: "1.6rem",
            color: "#4A4A68",
          }}
        >
          Enter the 6-digit code
        </Typography>
        <Input />
      </Box>
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
      <Button
        variant="text"
        sx={{
          width: "100%",
          fontSize: "1.6rem",
          textTransform: "capitalize",
          mt: "2.8rem",
          color: "#2C2EC6",
        }}
      >
        I didn't get a text message
      </Button>
    </Fragment>
  );
};

export default VerifyCode;

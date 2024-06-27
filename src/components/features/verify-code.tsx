import { Box, Typography } from "@mui/material";
import { FC, Fragment, useLayoutEffect, useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const VerifyCode: FC<{
  phone: string;
  send?: () => Promise<unknown>;
  verify?: (code: string) => Promise<unknown>;
  verifying?: boolean;
}> = ({ phone, send, verify, verifying }) => {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const onSend = async (loading: string) => {
    if (!send) return;
    try {
      setLoading(true);
      await toast.promise(send(), {
        loading,
        error: "Request failed",
        success: "OTP has been sent",
      });
    } finally {
      setLoading(false);
    }
  };

  const onVerify = async () => {
    if (!verify) return;
    try {
      setLoading(true);
      await toast.promise(verify(otp), {
        loading: "Verifying",
        error: (error: AxiosError<{ message: string }>) =>
          error?.response?.data?.message || "Verification failed",
        success: "Verification successful",
      });
    } finally {
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    onSend("Please wait...");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        We sent a code to your phone number:
      </Typography>
      <Typography
        textAlign="center"
        color="#4A4A68"
        sx={{ fontSize: "1.8rem" }}
        fontWeight={500}
      >
        {phone}
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
        <Input
          value={otp}
          onChange={({ target: { value } }) => setOtp(value)}
        />
      </Box>
      <Button
        disabled={!otp || loading || verifying}
        onClick={onVerify}
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
        disabled={loading || verifying}
        onClick={() => onSend("Resending...")}
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

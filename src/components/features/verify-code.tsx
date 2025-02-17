import { Box, Typography } from "@mui/material";
import { FC, useLayoutEffect, useState } from "react";
import Input from "../ui/input";
import Button from "../ui/button";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

const VerifyCode: FC<{
  phone?: string;
  email?: string;
  send?: () => Promise<unknown>;
  verify?: (code: string) => Promise<unknown>;
  verifying?: boolean;
  initiateOnLoad?: boolean;
  shortText?: string;
}> = ({
  phone,
  email,
  send,
  verify,
  verifying,
  initiateOnLoad = true,
  shortText = "identity",
}) => {
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
    if (initiateOnLoad) onSend("Please wait...");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      sx={{
        maxWidth: "40.9rem",
      }}
    >
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
        Enter the verification code sent to your {shortText}
      </Typography>
      {phone && (
        <>
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
            sx={{ fontSize: "1.8rem", mb: "4rem" }}
            fontWeight={500}
          >
            {phone}
          </Typography>
        </>
      )}
      {!phone && email && (
        <>
          <Typography
            textAlign="center"
            color="#4A4A68"
            sx={{ fontSize: "1.8rem", mb: "0.8rem" }}
          >
            We sent a code to your email address:
          </Typography>
          <Typography
            textAlign="center"
            color="#4A4A68"
            sx={{ fontSize: "1.8rem", mb: "4rem" }}
            fontWeight={500}
          >
            {email}
          </Typography>
        </>
      )}
      {email && phone && (
        <>
          <Typography
            textAlign="center"
            color="#4A4A68"
            sx={{ fontSize: "1.8rem", mb: "0.8rem" }}
          >
            also to your email address:
          </Typography>
          <Typography
            textAlign="center"
            color="#4A4A68"
            sx={{ fontSize: "1.8rem", mb: "4rem" }}
            fontWeight={500}
          >
            {email}
          </Typography>
        </>
      )}
      <Box sx={{ mb: "3.2rem" }}>
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
        I didn't get an OTP
      </Button>
    </Box>
  );
};

export default VerifyCode;

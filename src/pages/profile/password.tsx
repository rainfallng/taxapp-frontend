import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";

const ChangePassword = () => {
  const theme = useTheme();
  const [status, setStatus] = useState("id");

  return (
    <>
      <Box
        sx={{
          mb: "1.8rem",
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            color: theme.palette.grey[900],
          }}
        >
          Change Password
        </Typography>
      </Box>
      <Box
        sx={{
          border: "1px solid",
          borderColor: theme.palette.grey[50],
          px: "1.45rem",
          py: "3.2rem",
          borderRadius: "1rem",
          minHeight: "52.9rem",
          pt: "8rem",
        }}
      >
        <Box sx={{ maxWidth: "47.9rem", mx: "auto", textAlign: "center" }}>
          {status !== "success" && (
            <Typography
              component="h4"
              sx={{
                fontSize: "2.2rem",
                fontWeight: 500,
                color: theme.palette.grey[900],
                mb: "1.6rem",
              }}
            >
              Change Password
            </Typography>
          )}
          {status === "id" ? (
            <>
              <Typography
                sx={{
                  fontSize: "1.4rem",
                  color: "#252657",
                  mb: "2.4rem",
                }}
              >
                In order to enforce authorization, your account will be verified
                using the phone number or email registered with your Tax ID
              </Typography>
              <Box sx={{ maxWidth: "34.5rem", mx: "auto" }}>
                <Input label="Enter Your Taxpayer ID" />
                <Button
                  fullWidth
                  rounded
                  sx={{ mt: "4rem", fontSize: "1.8rem", py: "1.45rem" }}
                  onClick={() => setStatus("otp")}
                >
                  Proceed
                </Button>
              </Box>
            </>
          ) : status === "otp" ? (
            <Box component="form" sx={{ maxWidth: "34.5rem", mx: "auto" }}>
              <Input label="OTP*" />
              <Input
                type="password"
                sx={{ my: "2.4rem" }}
                label="Enter New Password"
              />
              <Input type="password" label="Confirm New Password" />
              <Button
                fullWidth
                rounded
                sx={{ mt: "4rem", fontSize: "1.8rem", py: "1.45rem" }}
                onClick={() => setStatus("success")}
              >
                Proceed
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
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
                  sx={{ width: "5.3rem", height: "5.3rem" }}
                />
              </Box>
              <Typography
                variant="h4"
                sx={{
                  color: theme.palette.grey[800],
                  fontSize: "3.2rem",
                  fontWeight: 600,
                  my: "1.6rem",
                }}
              >
                Password Updated!
              </Typography>
              <Typography
                sx={{
                  fontSize: "1.8rem",
                  color: theme.palette.grey[500],
                }}
              >
                Your password has been changed successfully
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;

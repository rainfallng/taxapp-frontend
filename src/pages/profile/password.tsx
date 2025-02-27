import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Box, Typography, useTheme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAPI } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import { useStore } from "@/store";
import { IResetPassword } from "@/types";
import { AxiosError } from "axios";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import toast from "react-hot-toast";
import { useLoader } from "@/hooks/useLoader";

const ChangePassword = () => {
  const theme = useTheme();
  const [status, setStatus] = useState("otp");
  const { access } = useStore();

  const schema = yup.object({
    password1: yup
      .string()
      .required("Password is a required field")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?&])[A-Za-z\d@$!%_*?&]{8,}$/,
        "Password must contain 8 characters, one Uppercase, one Lowercase, one number and one special case character"
      ),
    password2: yup
      .string()
      .required("Password is a required field")
      .when("password1", ([password1], schema) => {
        return password1
          ? schema.oneOf([yup.ref("password1")], "Passwords do not match")
          : schema;
      }),
  });

  const form = useForm({
    defaultValues: {
      password1: "",
      password2: "",
    },
    resolver: yupResolver(schema),
  });
  const { api } = useAPI();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.resetPassword,
    onSuccess() {
      setStatus("success");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (data: Omit<IResetPassword, "token">) => {
    toast.promise(mutateAsync({ ...data, token: access as string }), {
      success: "Change password successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Request failed"),
    });
  };

  useLoader(isPending, "Please wait...");

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
            <Box
              component="form"
              onSubmit={form.handleSubmit(onSubmit)}
              sx={{
                maxWidth: "34.5rem",
                mx: "auto",
                display: "flex",
                flexDirection: "column",
                gap: "2.4rem",
              }}
            >
              {/* <form onSubmit={form.handleSubmit(onSubmit)}> */}
                {/* <Input label="OTP*" /> */}
                <div>
                  <Input
                    type="password"
                    label="Enter New Password"
                    name="password1"
                    form={form}
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    name="password2"
                    form={form}
                    label="Confirm New Password"
                  />
                </div>
                <Button
                  fullWidth
                  rounded
                  type="submit"
                  disabled={isPending}
                  sx={{ mt: "1.6rem", fontSize: "1.8rem", py: "1.45rem" }}
                >
                  Proceed
                </Button>
              {/* </form> */}
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

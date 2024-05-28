import { Box, Typography, useTheme } from "@mui/material";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Link } from "react-router-dom";
import { ILogin } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schemas/login";
// import { useMutation } from "@tanstack/react-query";
// import toast from "react-hot-toast";
// import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
// import { AxiosError } from "axios";
// import { useAPI } from "@/hooks/useApi";
// import { useStore } from "@/store";
import { useState } from "react";

const ForgotPassword = () => {
  const theme = useTheme();
  //   const { api } = useAPI();
  //   const navigate = useNavigate();
  const initForm = useForm<ILogin>(loginSchema);
  const form = useForm<ILogin>(loginSchema);
  const [isIDVerified, setIDVerified] = useState(true);

  const { handleSubmit: initHandleSubmit } = initForm;
  const { handleSubmit } = form;

  const initOnSubmit: SubmitHandler<ILogin> = (values) => {
    // toast.promise(onLogin(values), {
    //   success: "Login successful",
    //   loading: "Please wait...",
    //   error: (error) => handleFormToastErrors(error, "Login failed"),
    // });

    console.log(values);
    setIDVerified(true);
  };

  const onSubmit = () => {};

  if (!isIDVerified)
    return (
      <form onSubmit={initHandleSubmit(initOnSubmit)}>
        <Box
          sx={{
            mx: "auto",
            maxWidth: "34.3rem",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontSize: "2.2rem",
              color: theme.palette.info.main,
              fontWeight: 500,
            }}
          >
            Reset Password
          </Typography>
          <Typography
            sx={{
              fontSize: "1.4rem",
              color: theme.palette.info.main,
              mt: "1.6rem",
              mb: "2.4rem",
            }}
          >
            In order to enforce authorization, your account will be verified
            using the phone number or email registered with your Tax ID
          </Typography>
        </Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          sx={{ gap: "2.4rem" }}
        >
          <Input
            name="email"
            form={initForm}
            sx={{ height: "5.6rem" }}
            label="Enter Your Tax Payer ID"
          />
          <Button
            disabled={initForm.formState.isDirty}
            type="submit"
            sx={{
              py: "1.75rem",
              borderRadius: "5rem",
              fontSize: "1.8rem",
              textTransform: "capitalize",
            }}
          >
            Proceed
          </Button>
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            gap="1.6rem"
          >
            <Box
              component={Link}
              to="/auth/login"
              sx={{
                fontSize: "1.6rem",
                color: "#7879C5",
                textDecoration: "none",
              }}
            >
              Already have an account? Log in here
            </Box>
          </Box>
        </Box>
      </form>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "34.3rem",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "2.2rem",
            color: theme.palette.info.main,
            fontWeight: 500,
          }}
        >
          Reset Password
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
            mb: "2.4rem",
          }}
        >
          In order to enforce authorization, your account will be verified using
          the phone number or email registered with your Tax ID
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <Input
          name="email"
          form={form}
          sx={{ height: "5.6rem" }}
          label="OTP*"
        />
        <Input
          type="password"
          name="email"
          form={form}
          sx={{ height: "5.6rem" }}
          label="Enter New Password"
        />
        <Input
          type="password"
          name="email"
          form={form}
          sx={{ height: "5.6rem" }}
          label="Confirm New Password"
        />
        <Button
          disabled={form.formState.isDirty}
          type="submit"
          sx={{
            py: "1.75rem",
            borderRadius: "5rem",
            fontSize: "1.8rem",
            textTransform: "capitalize",
          }}
        >
          Proceed
        </Button>
      </Box>
    </form>
  );
};

export default ForgotPassword;

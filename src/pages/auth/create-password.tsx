import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAPI } from "@/hooks/useApi";
import { resetPasswordSchema } from "@/lib/schemas/reset-password";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { IResetPassword } from "@/types";
import { Box, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const CreatePassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const form = useForm(resetPasswordSchema);
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();

  const { handleSubmit } = form;

  const { mutateAsync, isPending } = useMutation({
    mutationFn: api.resetPassword,
    onSuccess() {
      navigate("/auth/login");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (data: Omit<IResetPassword, "token">) => {
    toast.promise(mutateAsync({ ...data, token: token as string }), {
      success: "Change password successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Request failed"),
    });
  };

  if (!token) return <Navigate to="/auth/login" replace />;

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
            mb: "2.4rem",
          }}
        >
          Create New Password
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <Input
          type="password"
          name="password1"
          form={form}
          sx={{ height: "5.6rem" }}
          label="Enter New Password"
        />
        <Input
          type="password"
          name="password2"
          form={form}
          sx={{ height: "5.6rem" }}
          label="Confirm New Password"
        />
        <Button
          disabled={isPending}
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

export default CreatePassword;

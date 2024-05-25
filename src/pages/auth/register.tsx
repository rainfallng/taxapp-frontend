import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { Box, Typography, useTheme } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import { SubmitHandler, useForm } from "react-hook-form";
import { registerSchema } from "@/lib/schemas/register";
import { IRegister, UserType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { useAPI } from "@/hooks/useApi";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";

const Register = () => {
  const { api } = useAPI();
  const theme = useTheme();
  const { setToken, setUser } = useStore();
  const navigate = useNavigate();
  const form = useForm<IRegister>({
    defaultValues: registerSchema.defaultValues,
    resolver: registerSchema.resolver,
  });

  const {
    setValue,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
  } = form;

  const { mutateAsync: onRegister, isPending } = useMutation({
    mutationFn: api.register,
    onSuccess(data) {
      const { user, ...token } = data;
      setUser({
        ...user,
        phone: watch("phone"),
        user_type: watch("user_type"),
      });
      setToken(token?.access, token?.refresh);
      navigate("/auth/verify-phone");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, setError),
  });

  const onSubmit: SubmitHandler<IRegister> = (values) => {
    toast.promise(onRegister(values), {
      success: "Registration successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Registration failed"),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "30rem",
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
          Create a Taxapp Account
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
            mb: "2.35rem",
          }}
        >
          New to Taxapp? Enter your details below to start your Taxapp journey
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem", maxHeight: "56.5rem", overflow: "auto" }}
      >
        <Input
          type="email"
          sx={{ height: "5.6rem" }}
          placeholder="Email"
          name="email"
          form={form}
        />
        <Input
          type="password"
          sx={{ height: "5.6rem" }}
          placeholder="Password"
          name="password1"
          form={form}
        />
        <Input
          type="password"
          sx={{ height: "5.6rem" }}
          placeholder="Confirm Password"
          name="password2"
          form={form}
        />
        <Box>
          <Typography
            sx={{
              mb: "1.6rem",
              fontSize: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Phone
          </Typography>
          <PhoneInput
            value={watch("phone")}
            onChange={(value) => setValue("phone", value)}
            errorMessage={errors.phone?.message}
          />
        </Box>
        <Box>
          <Typography
            sx={{
              mb: "1.6rem",
              fontSize: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Type of Taxpayer
          </Typography>
          <Select
            value={watch("user_type")}
            {...register("user_type")}
            errorMessage={errors.user_type?.message}
          >
            {Object.entries(UserType).map(([key, val]) => (
              <MenuItem key={key} value={key}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Button
          type="submit"
          disabled={isPending}
          sx={{
            py: "1.75rem",
            borderRadius: "5rem",
            fontSize: "1.8rem",
            textTransform: "capitalize",
          }}
        >
          <HttpsOutlinedIcon
            sx={{ mr: "0.8rem", width: "1.6rem", height: "1.6rem" }}
          />
          Create Account
        </Button>
      </Box>
    </form>
  );
};

export default Register;

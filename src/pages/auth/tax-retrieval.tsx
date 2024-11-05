import { Box, Typography, useTheme } from "@mui/material";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { ILogin, UserType } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schemas/login";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { AxiosError } from "axios";
import { useAPI } from "@/hooks/useApi";
import { useStore } from "@/store";
import DatePicker from "@/components/ui/date-picker";
import Select, { MenuItem } from "@/components/ui/select";

const TaxRetrieval = () => {
  const theme = useTheme();
  const { api } = useAPI();
  const navigate = useNavigate();
  const { setUser, setToken } = useStore();
  const form = useForm<ILogin>(loginSchema);

  const { INDIVIDUAL, COMPANY } = UserType;

  const { handleSubmit, setError } = form;

  const { mutateAsync: onLogin, isPending } = useMutation({
    mutationFn: api.login,
    onSuccess(data) {
      const { user, ...token } = data;
      setUser(user);
      setToken(token?.access, token?.refresh);
      navigate("/app");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, setError),
  });

  const onSubmit: SubmitHandler<ILogin> = (values) => {
    toast.promise(onLogin(values), {
      success: "Login successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Login failed"),
    });
  };

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
          Find Your Tax Payer ID
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
            mb: "2.4rem",
          }}
        >
          Please provide your Identification number and date of birth to
          retrieve your Tax Payer ID. Your retrieved Tax Payer ID will be sent
          to the phone number or email registered with your profile.
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <Select sx={{ height: "5.6rem" }} placeholder="Select Tax Payer Type">
          {Object.entries({ INDIVIDUAL, COMPANY }).map(([key, val]) => (
            <MenuItem key={key} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
        <Select
          sx={{ height: "5.6rem" }}
          placeholder="Select Identification Type"
        >
          {Object.entries({ INDIVIDUAL, COMPANY }).map(([key, val]) => (
            <MenuItem key={key} value={val}>
              {val}
            </MenuItem>
          ))}
        </Select>
        <Input
          sx={{ height: "5.6rem" }}
          label="Enter Identification Number"
          name="password"
          form={form}
        />
        <DatePicker />
        <Button
          disabled={form.formState.isDirty || isPending}
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
};

export default TaxRetrieval;

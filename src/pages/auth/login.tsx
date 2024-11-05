import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ILogin, UserType } from "@/types";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schemas/login";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { AxiosError } from "axios";
import { useAPI } from "@/hooks/useApi";
import { useStore } from "@/store";
import { useEffect, useState } from "react";
import { QueryKeys } from "@/lib/queryKeys";
import { useLoader } from "@/hooks/useLoader";

const Login = () => {
  const theme = useTheme();
  const { api } = useAPI();
  const navigate = useNavigate();
  const { setUser, setToken, setOnboarded, user } = useStore();
  const form = useForm<ILogin>(loginSchema);
  const [fetchProfile, setFetchProfile] = useState(false);
  const location = useLocation();

  const isInstitutionAdmin = location.pathname === "/auth/admin";

  const { handleSubmit, setError } = form;

  const profileServiceMapper: Record<string, { key: string[] }> = {
    [UserType.COMPANY]: { key: [QueryKeys.COMPANY] },
    [UserType.INDIVIDUAL]: {
      key: [QueryKeys.INDIVIDUAL],
    },
  };

  const profileService = profileServiceMapper[user.user_type];

  const {
    isLoading: fetchingData,
    data,
    error,
  } = useQuery({
    queryKey: [profileService?.key],
    queryFn: api.getProfile,
    enabled: fetchProfile,
  });

  const { mutateAsync: onLogin, isPending } = useMutation({
    mutationFn: api.login,
    onSuccess(data) {
      const { user, ...token } = data;
      const isTaxConsultant = user.user_type === UserType.TAX_CONSULTANT;
      setUser({
        ...user,
        user_type: isInstitutionAdmin ? UserType.ADMIN : user.user_type,
      });
      setToken(token?.access, token?.refresh);
      if (!isInstitutionAdmin)
        setOnboarded({
          [user.user_type]: {
            cac_verified: user.cac_verified,
            id_verified: user.identity_verified,
          },
        });
      if (!isInstitutionAdmin && !isTaxConsultant) {
        setFetchProfile(true);
      } else {
        navigate("/app");
      }
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

  useEffect(() => {
    if (data) {
      setFetchProfile(false)
      setUser(data);
      navigate("/app");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      toast.error(
        handleFormToastErrors(
          error as AxiosError<{
            [message: string]: string | string[];
          }>,
          "Could not fetch user data"
        )
      );
    }
  }, [error]);

  useLoader(fetchingData, "Fetching profile data...", undefined, fetchProfile);

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
          Sign in
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
          }}
        >
          I am a returning user.
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mb: "2.35rem",
          }}
        >
          Please enter your login details below
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <Input
          type="email"
          name="email"
          form={form}
          sx={{ height: "5.6rem" }}
          placeholder="Email"
        />
        <Input
          type="password"
          sx={{ height: "5.6rem" }}
          placeholder="Password"
          name="password"
          form={form}
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me next time"
            sx={{
              "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
              "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
            }}
          />
        </FormGroup>
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
          <HttpsOutlinedIcon
            sx={{ mr: "0.8rem", width: "1.6rem", height: "1.6rem" }}
          />
          Sign In
        </Button>
        {!isInstitutionAdmin && (
          <Box
            textAlign="center"
            display="flex"
            flexDirection="column"
            gap="1.6rem"
          >
            <Box
              component={Link}
              to="/forgot-password"
              sx={{
                fontSize: "1.6rem",
                color: "#7879C5",
                textDecoration: "none",
              }}
            >
              Forgot your pasword?
            </Box>
            <Box
              component={Link}
              to="/auth/tax-retrieval"
              sx={{
                fontSize: "1.6rem",
                color: "#7879C5",
                textDecoration: "none",
              }}
            >
              Forgot Tax ID?
            </Box>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default Login;

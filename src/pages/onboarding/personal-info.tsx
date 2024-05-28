import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import {
  Box,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import DatePicker from "@/components/ui/date-picker";
import {
  GenderType,
  IIndividualOnboarding,
  MaritalStatusType,
  TitleType,
} from "@/types";
import { useForm } from "react-hook-form";
import { personalInfoSchema } from "@/lib/schemas/onboarding/personal-info";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@/lib/queryKeys";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";

const PersonalInfo = () => {
  const theme = useTheme();
  const form = useForm(personalInfoSchema);
  const { setIndividualOnboarding } = useStore();
  const navigate = useNavigate();
  const { api } = useAPI();

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = form;

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const { data: lgas, isLoading: isLoadingLgas } = useQuery({
    queryKey: [QueryKeys.LGA, form.watch('state_of_residence')],
    queryFn: () => api.getLGAs(Number(form.watch('state_of_residence'))),
    enabled: Boolean(form.watch('state_of_residence'))
  });

  const onSubmit = (values: Partial<IIndividualOnboarding>) => {
    setIndividualOnboarding(values);
    navigate("/app/onboarding/contact-info");
  };

  useLoader(isLoadingStates || isLoadingLgas, "Please wait...");

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Layout>
        <OnboardingHeader
          title="Fill this form to get your details"
          titleSx={{ maxWidth: "56rem" }}
        />
        <Box sx={{ mt: "2.4rem", maxWidth: "75.2rem" }}>
          <Typography
            variant="h5"
            sx={{ fontSize: "2.4rem", mb: "4rem", fontWeight: 500 }}
          >
            Personal Information
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            <FormGroup>
              <FormLabel
                sx={{
                  fontSize: "2rem",
                  display: "block",
                  fontWeight: 500,
                  mb: "1.6rem",
                  color: theme.palette.grey[800],
                }}
              >
                What's your name?
              </FormLabel>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Input
                    form={form}
                    name="last_name"
                    label="Last Name/Surname"
                  />
                </Grid>
                <Grid item xs={4}>
                  <Input form={form} name="middle_name" label="Middle Name" />
                </Grid>
                <Grid item xs={4}>
                  <Input form={form} name="first_name" label="First Name" />
                </Grid>
              </Grid>
            </FormGroup>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Title
                  </FormLabel>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select title"
                    value={watch("title")}
                    onChange={({ target: { value } }) =>
                      setValue("title", value as string)
                    }
                    errorMessage={errors?.title?.message}
                  >
                    {Object.entries(TitleType).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Marital Status
                  </FormLabel>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select Status"
                    value={watch("marital_status")}
                    onChange={({ target: { value } }) =>
                      setValue("marital_status", value as string)
                    }
                    errorMessage={errors?.marital_status?.message}
                  >
                    {Object.entries(MaritalStatusType).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Date of Birth
                  </FormLabel>
                  <DatePicker
                    form={form}
                    name="date_of_birth"
                    format="YYYY-MM-DD"
                  />
                </Grid>
              </Grid>
            </FormGroup>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Place of Birth
                  </FormLabel>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select State"
                    value={watch("place_of_birth")}
                    onChange={({ target: { value } }) =>
                      setValue("place_of_birth", value as string)
                    }
                    errorMessage={errors?.place_of_birth?.message}
                  >
                    {states?.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Select Your Gender
                  </FormLabel>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select Gender"
                    value={watch("gender")}
                    onChange={({ target: { value } }) =>
                      setValue("gender", value as string)
                    }
                    errorMessage={errors?.gender?.message}
                  >
                    {Object.entries(GenderType).map(([key, value]) => (
                      <MenuItem key={key} value={key}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    State of Origin
                  </FormLabel>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select State"
                    value={watch("state_of_origin")}
                    onChange={({ target: { value } }) =>
                      setValue("state_of_origin", value as string)
                    }
                    errorMessage={errors?.state_of_origin?.message}
                  >
                    {states?.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </FormGroup>
            <FormGroup>
              <FormLabel
                sx={{
                  fontSize: "2rem",
                  display: "block",
                  fontWeight: 500,
                  mb: "1.6rem",
                  color: theme.palette.grey[800],
                }}
              >
                Current Residential Address
              </FormLabel>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Input form={form} name="house_number" label="House No" />
                </Grid>
                <Grid item xs={4}>
                  <Input form={form} name="street" label="Street" />
                </Grid>
                <Grid item xs={4}>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select State"
                    value={watch("state_of_residence")}
                    onChange={({ target: { value } }) =>
                      setValue("state_of_residence", value as string)
                    }
                    errorMessage={errors?.state_of_residence?.message}
                  >
                    {states?.map((state) => (
                      <MenuItem key={state.id} value={state.id}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid item xs={4}>
                  <Select
                    sx={{ height: "5.6rem" }}
                    placeholder="Select City"
                    value={watch("lga_of_residence")}
                    onChange={({ target: { value } }) =>
                      setValue("lga_of_residence", value as string)
                    }
                    errorMessage={errors?.lga_of_residence?.message}
                  >
                    {lgas?.map((lga) => (
                      <MenuItem key={lga.id} value={lga.id}>
                        {lga.name}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mt: "3.9rem" }}
        >
          <Button
            sx={{
              fontSize: "1.8rem",
              p: "1rem 2.4rem",
              borderRadius: "5rem",
              borderColor: "#E1E1E1",
              color: "#898989",
            }}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            <ArrowBackIosNewOutlinedIcon sx={{ mr: "1.6rem" }} /> Back
          </Button>
          <Button
            type="submit"
            sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          >
            Next <ArrowForwardIosOutlinedIcon sx={{ ml: "1.6rem" }} />
          </Button>
        </Box>
      </Layout>
    </form>
  );
};

export default PersonalInfo;

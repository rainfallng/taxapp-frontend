import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { personalInfoSchema } from "@/lib/schemas/onboarding/personal-info";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import {
  EmploymentStatusType,
  GenderType,
  IIndividualOnboarding,
  MaritalStatusType,
  TitleType,
} from "@/types";
import { IPersonalInfo } from "@/types/form";
import {
  Box,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  capitalize,
  useTheme,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Personalinformation = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, setUser } = useStore();
  const { api } = useAPI();
  const form = useForm(personalInfoSchema);
  const {
    handleSubmit,
    setValue,
    getValues,
    watch,
    formState: { errors },
    reset,
  } = form;

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const { data: lgas } = useQuery({
    queryKey: [QueryKeys.LGA, watch("state_of_origin")],
    queryFn: () => api.getLGAs(Number(watch("state_of_origin"))),
    enabled: Boolean(watch("state_of_origin")),
  });

  const { mutateAsync: updateIndividual, isPending } = useMutation({
    mutationFn: (variables: IPersonalInfo) =>
      api.updateIndividual(variables as Partial<IIndividualOnboarding>),
    onSuccess(data) {
      setUser({ tin_profile: data?.data });
      navigate("/auth/onboarding/tin");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: IPersonalInfo) => {
    toast.promise(updateIndividual(values), {
      success: "Update successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Update failed"),
    });
  };

  useLoader(isLoadingStates, "Please wait...");

  useEffect(() => {
    reset({
      ...getValues(),
      email_address: user.email,
      phone_number_1: user.phone,
    });
  }, [getValues, reset, user]);

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: { md: "79.8rem" } }}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: "2.4rem",
          fontWeight: 500,
          color: theme.palette.grey[800],
        }}
      >
        Personal Information
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          mt: "4rem",
        }}
      >
        <Box>
          <Typography
            component="h4"
            sx={{
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
            }}
          >
            What’s your name?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: "1.6rem",
              mt: "2.2rem",
            }}
          >
            <Input
              label="First Name"
              name="names"
              value={user?.tin_profile?.first_name}
              disabled
            />
            <Input
              label="Surname"
              name="names"
              value={user?.tin_profile?.last_name}
              disabled
            />
            <Input
              label="Other Names"
              name="names"
              value={user?.tin_profile?.middle_name}
              disabled
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
          }}
        >
          <Box>
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
              name="date_of_birth"
              format="YYYY-MM-DD"
              value={dayjs(user?.tin_profile?.date_of_birth)}
              disabled
            />
          </Box>

          <Box>
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
              {Object.entries(TitleType).map(([key, val]) => (
                <MenuItem key={key} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
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
              {Object.entries(MaritalStatusType).map(([key, val]) => (
                <MenuItem key={key} value={val.toUpperCase()}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
          }}
        >
          <Box>
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
                <MenuItem key={state.id} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
            <FormLabel
              sx={{
                fontSize: "2rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Gender
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
              {Object.entries(GenderType).map(([key, val]) => (
                <MenuItem key={key} value={val.toUpperCase()}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>

          <Box>
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
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
          }}
        >
          <Box>
            <FormLabel
              sx={{
                fontSize: "2rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Phone Number
            </FormLabel>
            <PhoneInput
              value={user?.phone}
              onChange={(value) => form.setValue("phone_number_1", value)}
              label="Enter Number"
              errorMessage={form.formState.errors.phone_number_1?.message?.toString()}
              sx={{ height: "5.6rem" }}
            />
          </Box>

          <Box>
            <FormLabel
              sx={{
                fontSize: "2rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Email Address
            </FormLabel>
            <Input
              type="email"
              label="Enter Email Address"
              name="email_address"
              form={form}
            />
          </Box>
          <Box>
            <FormLabel
              sx={{
                fontSize: "2rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              LASSRA No
            </FormLabel>
            <Input label="Enter Number" name="lasra" form={form} />
          </Box>
        </Box>
        <Box>
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
            <Grid item xs={6}>
              <Input
                label="Enter House Number"
                name="house_number"
                form={form}
              />
            </Grid>
            <Grid item xs={6}>
              <Input label="Enter Street Name" name="street" form={form} />
            </Grid>
          </Grid>
        </Box>
        <Grid container columnSpacing={2} rowSpacing="4rem">
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
              State
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
              LGA
            </FormLabel>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Select LGA"
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
              LCDA
            </FormLabel>
            <Input label="Enter LCDA" name="lcda" form={form} />
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
              Employment Status
            </FormLabel>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Select status"
              value={watch("employment_status")}
              onChange={({ target: { value } }) =>
                setValue("employment_status", value as string)
              }
              errorMessage={errors?.employment_status?.message}
            >
              {Object.entries(EmploymentStatusType).map(([key, val]) => (
                <MenuItem key={key} value={capitalize(key)}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{
                mb: "1.6rem",
                display: "flex",
                alignItems: "center",
                gap: "2.4rem",
              }}
            >
              <FormLabel
                sx={{
                  fontSize: "2rem",
                  display: "block",
                  fontWeight: 500,
                  color: theme.palette.grey[800],
                }}
              >
                Are you a public servant?
              </FormLabel>
              <RadioGroup
                sx={{ flexDirection: "row" }}
                name="is_public_servant"
                value={watch("is_public_servant")}
              >
                <FormControlLabel
                  value={true}
                  control={
                    <Radio
                      onClick={() => setValue("is_public_servant", true)}
                    />
                  }
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "1.8rem" },
                  }}
                  label="Yes"
                />
                <FormControlLabel
                  value={false}
                  control={
                    <Radio
                      onClick={() => setValue("is_public_servant", false)}
                    />
                  }
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "1.8rem" },
                  }}
                  label="No"
                />
              </RadioGroup>
            </Box>
            <Grid container spacing={1}>
              <Grid item pt="0.4rem !important" xs={8}>
                <Select
                  sx={{ height: "5.6rem" }}
                  placeholder="Select business sector"
                  value={watch("business_sector")}
                  onChange={({ target: { value } }) =>
                    setValue("business_sector", value as string)
                  }
                  errorMessage={errors?.business_sector?.message}
                >
                  {[
                    "Trading",
                    "Agriculture",
                    "Information and Communication",
                    "Media and Entertainment",
                    "Others",
                  ].map((val) => (
                    <MenuItem key={val} value={val}>
                      {val}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item pt="0.4rem !important" xs={4}>
                <Input label="Occupation" name="occupation" form={form} />
              </Grid>
            </Grid>
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
              Nationality
            </FormLabel>
            <Input label="Nationality" name="nationality" form={form} />
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
              Business Type
            </FormLabel>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Business Type"
              value={watch("business_type")}
              onChange={({ target: { value } }) =>
                setValue("business_type", value as string)
              }
              errorMessage={errors?.business_type?.message}
            >
              {[
                "NGO",
                "Cooperative",
                "Sole proprietorship",
                "Limited Liability Company",
              ].map((val) => (
                <MenuItem key={val} value={val}>
                  {val}
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
              Tax Station
            </FormLabel>
            <Input label="Tax Station" name="tax_station" form={form} />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "3.6rem",
        }}
      >
        {/* <Button
          onClick={() => navigate("/auth/login")}
          variant="outlined"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Back
        </Button> */}
        <Button
          type="submit"
          disabled={isPending}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Save and Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Personalinformation;

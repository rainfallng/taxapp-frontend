import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { companyInfoSchema } from "@/lib/schemas/onboarding/company-info";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { ICompanyOnboarding } from "@/types";
import { ICompanyInfo } from "@/types/form";
import { Box, FormLabel, Grid, Typography, useTheme } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CompanyProfile = () => {
  const theme = useTheme();
  const form = useForm(companyInfoSchema);
  const { api } = useAPI();
  const { setUser, user } = useStore();
  const navigate = useNavigate();
  const {
    setValue,
    watch,
    formState: { errors },
  } = form;

  const tinProfile = user?.company_profile;

  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  const { data: lgas } = useQuery({
    queryKey: [QueryKeys.LGA, watch("state")],
    queryFn: () => api.getLGAs(Number(watch("state"))),
    enabled: Boolean(watch("state")),
  });

  const { mutateAsync: updateCompany, isPending } = useMutation({
    mutationFn: (variables: ICompanyInfo) =>
      api.updateCompany(variables as Partial<ICompanyOnboarding>),
    onSuccess(data) {
      setUser(data?.data);
      navigate("/auth/onboarding/tin");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: ICompanyInfo) => {
    toast.promise(updateCompany(values), {
      success: "Update successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Update failed"),
    });
  };

  useLoader(isLoadingStates, "Please wait...");

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{ width: { lg: "78.3rem" } }}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: "2.4rem",
          fontWeight: 500,
          color: theme.palette.grey[800],
        }}
      >
        Company Profile
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
          <Box
            sx={{
              display: "flex",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: "1.6rem",
            }}
          >
            <Input
              sx={{ height: "5.6rem" }}
              label="Company Reg No"
              name="names"
              // value={tinProfile?.company_verification?.id_number}
              value={tinProfile?.icode}
              disabled
            />
            <Input
              sx={{ height: "5.6rem" }}
              label="Company Name"
              name="names"
              value={tinProfile?.name}
              disabled
            />
          </Box>
        </Box>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <Input
              type="email"
              label="Email Address"
              name="email_address"
              form={form}
            />
          </Grid>
          <Grid item xs={6}>
            <PhoneInput
              value={form.watch("phone_number")}
              onChange={(value) => form.setValue("phone_number", value)}
              errorMessage={form.formState.errors.phone_number?.message}
              label="Enter Number"
              sx={{
                height: "5.6rem",
              }}
            />
          </Grid>
        </Grid>

        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Principal Place of Business"
              value={watch("place_of_business")}
              onChange={({ target: { value } }) =>
                setValue("place_of_business", value as string)
              }
              errorMessage={errors?.place_of_business?.message}
            >
              {states?.map((state) => (
                <MenuItem key={state.id} value={state.name}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <Grid item xs={6}>
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
        </Grid>

        <Box>
          <Typography
            component="h4"
            sx={{
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
            }}
          >
            Company Address
          </Typography>
          <Box
            sx={{
              display: "flex",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: "1.6rem",
              mt: "2.2rem",
            }}
          >
            <Input
              isNumber
              sx={{ height: "5.6rem" }}
              label="Enter Street Number"
              name="street_number"
              form={form}
            />
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Street Name"
              name="street_name"
              form={form}
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
              State
            </FormLabel>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Select State"
              value={watch("state")}
              onChange={({ target: { value } }) =>
                setValue("state", value as string)
              }
              errorMessage={errors?.state?.message}
            >
              {states?.map((state) => (
                <MenuItem key={state.id} value={state.id}>
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
              LGA
            </FormLabel>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Select LGA"
              value={watch("lga")}
              onChange={({ target: { value } }) =>
                setValue("lga", value as string)
              }
              errorMessage={errors?.lga?.message}
            >
              {lgas?.map((lga) => (
                <MenuItem key={lga.id} value={lga.id}>
                  {lga.name}
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
              LCDA
            </FormLabel>
            <Input name="lcda" placeholder="Enter LCDA" form={form} />
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
          }}
        >
          <Input
            sx={{ height: "5.6rem" }}
            label="Tax Station"
            name="tax_station"
            form={form}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "2.2rem",
        }}
      >
        {/* <Button
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

export default CompanyProfile;

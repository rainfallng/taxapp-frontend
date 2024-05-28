import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { taxHistorySchema } from "@/lib/schemas/onboarding/tax-history";
import { ICompanyOnboarding, IIndividualOnboarding, UserType } from "@/types";
import Input from "@/components/ui/input";
import { useStore } from "@/store";
import HelperText from "@/components/ui/helper-text";
import { useAPI } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const TaxHistory = () => {
  const theme = useTheme();
  const {
    setIndividualOnboarding,
    individualOnboarding,
    user,
    onboardingMode,
    setCompanyOnboarding,
    companyOnboarding,
  } = useStore();
  const form = useForm(taxHistorySchema);
  const navigate = useNavigate();
  const { api } = useAPI();

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;

  const {
    mutateAsync: completeIndividualOnboarding,
    isPending: completingIndividualOnboarding,
  } = useMutation({
    mutationFn: api.completeIndividualOnboarding,
    onSuccess() {
      navigate("/app/onboarding/success");
    },
  });

  const {
    mutateAsync: completeCompanyOnboarding,
    isPending: completingCompanyOnboarding,
  } = useMutation({
    mutationFn: api.completeCompanyOnboarding,
    onSuccess() {
      navigate("/app/onboarding/success");
    },
  });

  const onSubmit = (
    values: Partial<IIndividualOnboarding | ICompanyOnboarding>
  ) => {
    if (UserType.COMPANY === user.user_type) {
      setCompanyOnboarding(values);
      toast.promise(
        completeCompanyOnboarding({
          ...companyOnboarding,
          ...values,
          city: Number(companyOnboarding.city),
          submission_mode: onboardingMode,
        }),
        {
          loading: "Submitting data",
          success: "Data has been submitted",
          error: "Data submission failed",
        }
      );
      return
    }
    setIndividualOnboarding(values);
    toast.promise(
      completeIndividualOnboarding({
        ...individualOnboarding,
        ...values,
        tin_type: user.user_type.toUpperCase(),
        submission_mode: onboardingMode,
        state_of_origin: Number(individualOnboarding.state_of_origin),
        house_number: Number(individualOnboarding.house_number),
        state_of_residence: Number(individualOnboarding.state_of_residence),
        place_of_birth: Number(individualOnboarding.place_of_birth),
      }),
      {
        loading: "Submitting data",
        success: "Data has been submitted",
        error: "Data submission failed",
      }
    );
  };

  const isPending =
    completingIndividualOnboarding || completingCompanyOnboarding;

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
            Tax Filing History
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
                Have you filed taxes before?
              </FormLabel>
              <Box display="flex">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={watch("first_time_filling") === true}
                      onChange={() =>
                        setValue(
                          "first_time_filling",
                          (watch("first_time_filling") === true
                            ? null
                            : true) as unknown as never
                        )
                      }
                    />
                  }
                  label="Yes"
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
                    "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
                  }}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={watch("first_time_filling") === false}
                      onChange={() =>
                        setValue(
                          "first_time_filling",
                          (watch("first_time_filling") === false
                            ? null
                            : false) as unknown as never
                        )
                      }
                    />
                  }
                  label="No"
                  sx={{
                    "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
                    "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
                  }}
                />
              </Box>
              <HelperText
                error={Boolean(errors?.first_time_filling?.message)}
                message={errors?.first_time_filling?.message}
              />
            </FormGroup>
            {watch("first_time_filling") === true && (
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
                  Which tax types have you filed in the past?
                </FormLabel>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} lg={4}>
                    <Input form={form} name="past_tax_filling" />
                  </Grid>
                </Grid>
              </FormGroup>
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mt: "31.2rem" }}
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
            disabled={isPending}
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

export default TaxHistory;

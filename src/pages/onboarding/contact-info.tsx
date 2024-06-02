import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
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
import Select, { MenuItem } from "@/components/ui/select";
import { useStore } from "@/store";
import { IIndividualOnboarding, SubmissionModeType, UserType } from "@/types";
import { contactInfoSchema } from "@/lib/schemas/onboarding/contact-info";
import {
  FieldValues,
  Path,
  PathValue,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import PhoneInput from "@/components/ui/phone-input";

interface SubContactInfoProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

const IndividualContactInfo = <T extends FieldValues>({
  form,
}: SubContactInfoProps<T>) => {
  const theme = useTheme();

  return (
    <>
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
              Phone Number 1
            </FormLabel>
            <PhoneInput
              value={form.watch("phone_number_1" as Path<T>)}
              onChange={(value) =>
                form.setValue(
                  "phone_number_1" as Path<T>,
                  value as PathValue<T, Path<T>>
                )
              }
              label="Enter Number"
              errorMessage={form.formState.errors.phone_number_1?.message?.toString()}
            />
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
              Phone Number 2
            </FormLabel>
            <PhoneInput
              value={form.watch("phone_number_2" as Path<T>)}
              onChange={(value) =>
                form.setValue(
                  "phone_number_2" as Path<T>,
                  value as PathValue<T, Path<T>>
                )
              }
              label="Enter Number"
              errorMessage={form.formState.errors.phone_number_2?.message?.toString()}
            />
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
          Email Address
        </FormLabel>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Input
              type="email"
              form={form}
              name={"email_address" as Path<T>}
              label="Enter Email Address"
            />
          </Grid>
        </Grid>
      </FormGroup>
    </>
  );
};

const CompanyContactInfo = <T extends FieldValues>({
  form,
}: SubContactInfoProps<T>) => {
  const theme = useTheme();

  return (
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
            Designation
          </FormLabel>
          <Input form={form} label="Enter Number" />
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
            Location
          </FormLabel>
          <Select sx={{ height: "5.6rem" }} placeholder="Mr">
            <MenuItem>Mr</MenuItem>
            <MenuItem>Mrs</MenuItem>
          </Select>
        </Grid>
      </Grid>
    </FormGroup>
  );
};

const ContactInfo = () => {
  const { user, setIndividualOnboarding, onboardingMode } = useStore();
  const form = useForm(contactInfoSchema);
  const navigate = useNavigate();

  const { handleSubmit } = form;

  const onSubmit = (values: Partial<IIndividualOnboarding>) => {
    setIndividualOnboarding(values);
    navigate(
      `/app/onboarding/${
        onboardingMode === SubmissionModeType["TIN-MANUAL"]
          ? "tax-identification"
          : "employment-details"
      }`
    );
  };

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
            Contact Information
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {user.user_type === UserType.COMPANY && (
              <CompanyContactInfo form={form} />
            )}
            {(!user.user_type || user.user_type === UserType.INDIVIDUAL) && (
              <IndividualContactInfo form={form} />
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

export default ContactInfo;

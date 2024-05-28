import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import {
  Box,
  // Checkbox,
  // FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useStore } from "@/store";
import { ICompanyOnboarding, IIndividualOnboarding, UserType } from "@/types";
import { useNavigate } from "react-router-dom";
import {
  FieldValues,
  Path,
  // PathValue,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import {
  individualTaxIdentificationSchema,
  companyTaxIdentificationSchema,
} from "@/lib/schemas/onboarding/tax-identification";

interface SubTaxIdentificationProps<T extends FieldValues> {
  form: UseFormReturn<T>;
}

type CompanyForm = UseFormReturn<{
  tin?: string | undefined;
  hasTin: boolean | null;
}>;

type IndividualForm = UseFormReturn<{
  last_name: string;
  middle_name: string;
  first_name: string;
  tin: string;
}>;

const IndividualTaxIdentification = <T extends FieldValues>({
  form,
}: SubTaxIdentificationProps<T>) => {
  const theme = useTheme();

  return (
    <>
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
          Tax Payer ID/Tax Identification Number (TIN)
        </FormLabel>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Input
              form={form}
              name={"tin" as Path<T>}
              label="Enter ID Number"
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
            mb: "0.8rem",
            color: theme.palette.grey[800],
          }}
        >
          Name associated with Tax Payer ID/Tax Identification Number (TIN)
        </FormLabel>
        <Typography
          component="small"
          sx={{
            fontSize: "1.4rem",
            display: "block",
            mb: "1.6rem",
            color: theme.palette.grey[800],
          }}
        >
          Please confirm your full legal name as it appears on your tax
          identification documents
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Input
              form={form}
              name={"last_name" as Path<T>}
              label="Last Name/Surname"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              form={form}
              name={"middle_name" as Path<T>}
              label="Middle Name"
            />
          </Grid>
          <Grid item xs={4}>
            <Input
              form={form}
              name={"first_name" as Path<T>}
              label="First Name"
            />
          </Grid>
        </Grid>
      </FormGroup>
    </>
  );
};

const CompanyTaxIdentification = <T extends FieldValues>({
  form,
}: SubTaxIdentificationProps<T>) => {
  const theme = useTheme();

  const hasTin = form.watch("hasTin" as Path<T>);

  return (
    <>
      {/* <FormGroup>
        <FormLabel
          sx={{
            fontSize: "2rem",
            display: "block",
            fontWeight: 500,
            mb: "1.6rem",
            maxWidth: "42rem",
            color: theme.palette.grey[800],
          }}
        >
          Does your company have a Tax Payer ID/ Tax Identification Number
          (TIN)?
        </FormLabel>
        <Box display="flex">
          <FormControlLabel
            control={
              <Checkbox
                checked={hasTin === true}
                onChange={() =>
                  form.setValue(
                    "hasTin" as Path<T>,
                    (hasTin === true ? null : true) as PathValue<T, Path<T>>
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
                checked={hasTin === false}
                onChange={() =>
                  form.setValue(
                    "hasTin" as Path<T>,
                    (hasTin === false ? null : false) as PathValue<T, Path<T>>
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
      </FormGroup> */}
      {hasTin === true && (
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
            Please provide the company's TIN
          </FormLabel>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} lg={4}>
              <Input form={form} name={"tin" as Path<T>} label="Enter Number" />
            </Grid>
          </Grid>
        </FormGroup>
      )}
    </>
  );
};

const TaxIdentification = () => {
  const { user, setIndividualOnboarding, setCompanyOnboarding } = useStore();
  const individualForm = useForm(individualTaxIdentificationSchema);
  const companyForm = useForm(companyTaxIdentificationSchema);
  const navigate = useNavigate();

  const mapper: {
    [type: string]:
      | {
          form: IndividualForm;
          setState: (value: Partial<IIndividualOnboarding>) => void;
          returnUrl: string;
        }
      | {
          form: CompanyForm;
          setState: (value: Partial<ICompanyOnboarding>) => void;
          returnUrl: string;
        };
  } = {
    [UserType.INDIVIDUAL]: {
      form: individualForm,
      setState: setIndividualOnboarding,
      returnUrl: "/app/onboarding/employment-details",
    },
    [UserType.COMPANY]: {
      form: companyForm,
      setState: setCompanyOnboarding,
      returnUrl: "/app/onboarding/tax-history",
    },
  };

  const { form, setState, returnUrl } = mapper[user.user_type];

  const { handleSubmit } = form;

  const onSubmit = (
    values: Partial<IIndividualOnboarding | ICompanyOnboarding>
  ) => {
    const state = user.user_type === UserType.COMPANY ? { tin: values.tin } : values
    setState(state);
    navigate(returnUrl);
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
            Tax Identification
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {user.user_type === UserType.COMPANY && (
              <CompanyTaxIdentification form={form as CompanyForm} />
            )}
            {(!user.user_type || user.user_type === UserType.INDIVIDUAL) && (
              <IndividualTaxIdentification form={form as IndividualForm} />
            )}
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mt: "28.3rem" }}
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

export default TaxIdentification;

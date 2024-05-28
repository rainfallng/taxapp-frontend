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
import { IIndividualOnboarding } from "@/types";
import { useStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { employmentDetailsSchema } from "@/lib/schemas/onboarding/employment-details";

const EmploymentDetails = () => {
  const theme = useTheme();
  const form = useForm(employmentDetailsSchema);
  const { setIndividualOnboarding } = useStore();
  const navigate = useNavigate();

  const { handleSubmit } = form;

  const onSubmit = (values: Partial<IIndividualOnboarding>) => {
    setIndividualOnboarding(values);
    navigate("/app/onboarding/tax-history");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Layout sx={{ maxWidth: "92rem" }}>
        <OnboardingHeader
          title="Fill this form to get your details"
          titleSx={{ maxWidth: "56rem" }}
        />
        <Box sx={{ mt: "2.4rem" }}>
          <Typography
            variant="h5"
            sx={{ fontSize: "2.4rem", mb: "4rem", fontWeight: 500 }}
          >
            Employment & Income Details
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Occupation
                  </FormLabel>
                  <Input
                    form={form}
                    name="occupation"
                    label="Enter Occupation"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Basic Salary
                  </FormLabel>
                  <Input
                    form={form}
                    name="basic_salary"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Gross Income
                  </FormLabel>
                  <Input
                    form={form}
                    name="gross_income"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Annual Tax Paid
                  </FormLabel>
                  <Input
                    form={form}
                    name="annual_tax_paid"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Annual Total Income
                  </FormLabel>
                  <Input
                    form={form}
                    name="annual_total_income"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Pension
                  </FormLabel>
                  <Input
                    form={form}
                    name="pension"
                    label="Enter Amount"
                  />
                </Grid>
              </Grid>
            </FormGroup>

            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={6}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    National Health Insurance Scheme (NHIS)
                  </FormLabel>
                  <Input form={form} name="nhis" label="Enter Amount" />
                </Grid>
                <Grid item xs={12} lg={6}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Nigeria Social Insurance Trust Fund (NSITF)
                  </FormLabel>
                  <Input form={form} name="nsitf" label="Enter Amount" />
                </Grid>
              </Grid>
            </FormGroup>

            <FormGroup>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    National Housing Fund (NHF)
                  </FormLabel>
                  <Input form={form} name="nhf" label="Enter Amount" />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Utility Allowance
                  </FormLabel>
                  <Input
                    form={form}
                    name="utitlity_allowance"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Arrears
                  </FormLabel>
                  <Input
                    form={form}
                    name="arrears"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Life Assurance
                  </FormLabel>
                  <Input
                    form={form}
                    name="life_assurance"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    13th Month Salary
                  </FormLabel>
                  <Input
                    form={form}
                    name="thirteenth_month_salary"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Gratuity
                  </FormLabel>
                  <Input
                    form={form}
                    name="gratuity"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Medical Allowance
                  </FormLabel>
                  <Input
                    form={form}
                    name="medical_allowance"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Housing Allowance
                  </FormLabel>
                  <Input
                    form={form}
                    name="housing_allowance"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Transport Allowance
                  </FormLabel>
                  <Input
                    form={form}
                    name="transport_allowance"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Leave Allowance
                  </FormLabel>
                  <Input
                    form={form}
                    name="leave_allowance"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    One-Off Allowance
                  </FormLabel>
                  <Input
                    form={form}
                    name="one_off_allowance"
                    label="Enter Amount"
                  />
                </Grid>
                <Grid item xs={12} sm={6} lg={4}>
                  <FormLabel
                    sx={{
                      fontSize: "2rem",
                      display: "block",
                      fontWeight: 500,
                      mb: "1.6rem",
                      color: theme.palette.grey[800],
                    }}
                  >
                    Consolidated&nbsp;Relief&nbsp;Allowance
                  </FormLabel>
                  <Input
                    form={form}
                    name="consolidated_relief_allowance"
                    label="Enter Amount"
                  />
                </Grid>
              </Grid>
            </FormGroup>
          </Box>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ mt: "5.4rem" }}
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

export default EmploymentDetails;

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

const EmploymentDetails = () => {
  const theme = useTheme();

  return (
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
                  Occupation
                </FormLabel>
                <Input placeholder="Enter Occupation" />
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
                  Basic Salary
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Gross Income
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Annual Tax Paid
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Annual Total Income
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Pension
                </FormLabel>
                <Input placeholder="Enter Amount" />
              </Grid>
            </Grid>
          </FormGroup>

          <FormGroup>
            <Grid container spacing={2}>
              <Grid item xs={6}>
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
                <Input placeholder="Enter Amount" />
              </Grid>
              <Grid item xs={6}>
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
                <Input placeholder="Enter Amount" />
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
                  National Housing Fund (NHF)
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Utility Allowance
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Arrears
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Life Assurance
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  13th Month Salary
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Gratuity
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Medical Allowance
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Housing Allowance
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Transport Allowance
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Leave Allowance
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  One-Off Allowance
                </FormLabel>
                <Input placeholder="Enter Amount" />
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
                  Consolidated&nbsp;Relief&nbsp;Allowance
                </FormLabel>
                <Input placeholder="Enter Amount" />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: "5.4rem" }}>
        <Button
          sx={{
            fontSize: "1.8rem",
            p: "1rem 2.4rem",
            borderRadius: "5rem",
            borderColor: "#E1E1E1",
            color: "#898989",
          }}
          variant="outlined"
        >
          <ArrowBackIosNewOutlinedIcon sx={{ mr: "1.6rem" }} /> Back
        </Button>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
        >
          Next <ArrowForwardIosOutlinedIcon sx={{ ml: "1.6rem" }} />
        </Button>
      </Box>
    </Layout>
  );
};

export default EmploymentDetails;

import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
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
import { useState } from "react";

const IndividualTaxIdentification = () => {
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
            <Input placeholder="Enter ID Number" />
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
            <Input placeholder="Last Name/Surname" />
          </Grid>
          <Grid item xs={4}>
            <Input placeholder="Middle Name" />
          </Grid>
          <Grid item xs={4}>
            <Input placeholder="First Name" />
          </Grid>
        </Grid>
      </FormGroup>
    </>
  );
};

const CompanyTaxIdentification = () => {
  const theme = useTheme();

  return (
    <FormGroup>
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
       Does your company have a Tax Payer ID/ Tax Identification Number (TIN)?
      </FormLabel>
      <Box display="flex">
        <FormControlLabel
          control={<Checkbox />}
          label="Yes"
          sx={{
            "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
            "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
          }}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="No"
          sx={{
            "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
            "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
          }}
        />
      </Box>
    </FormGroup>
  );
};

const TaxIdentification = () => {
  const [type] = useState<string | null>("company");

  return (
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
          {type === "company" && <CompanyTaxIdentification />}
          {type === "individual" && <IndividualTaxIdentification />}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: "28.3rem" }}>
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

export default TaxIdentification;

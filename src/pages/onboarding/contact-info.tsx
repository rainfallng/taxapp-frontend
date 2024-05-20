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
import { useState } from "react";

const IndividualContactInfo = () => {
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
            <Input placeholder="Enter Number" />
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
            <Input placeholder="Enter Number" />
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
            <Input type="email" placeholder="Enter Email Address" />
          </Grid>
        </Grid>
      </FormGroup>
    </>
  );
};

const CompanyContactInfo = () => {
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
          <Input placeholder="Enter Number" />
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
  const [type] = useState<string | null>('company');

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
          Contact Information
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {type === "company" && <CompanyContactInfo />}
          {type === "individual" && <IndividualContactInfo />}
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: "31.2rem" }}>
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

export default ContactInfo;

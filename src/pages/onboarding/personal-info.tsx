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

const PersonalInfo = () => {
  const theme = useTheme();

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
                <Select sx={{ height: "5.6rem" }} placeholder="Mr">
                  <MenuItem>Mr</MenuItem>
                  <MenuItem>Mrs</MenuItem>
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
                <Select sx={{ height: "5.6rem" }} placeholder="Select Status">
                  <MenuItem>Single</MenuItem>
                  <MenuItem>Married</MenuItem>
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
                <DatePicker />
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
                <Input placeholder="Place of Birth" />
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
                <Select sx={{ height: "5.6rem" }} placeholder="Select Gender">
                  <MenuItem>Male</MenuItem>
                  <MenuItem>Female</MenuItem>
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
                <Select sx={{ height: "5.6rem" }} placeholder="Select State">
                  <MenuItem>Abia</MenuItem>
                  <MenuItem>Adamawa</MenuItem>
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
                <Input placeholder="House No" />
              </Grid>
              <Grid item xs={4}>
                <Input placeholder="Street" />
              </Grid>
              <Grid item xs={4}>
                <Input placeholder="City" />
              </Grid>
            </Grid>
          </FormGroup>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: "3.9rem" }}>
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

export default PersonalInfo;

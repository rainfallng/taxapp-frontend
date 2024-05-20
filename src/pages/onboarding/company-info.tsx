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
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";

const CompanyInfo = () => {
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
          Company Information
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
                  Company Name*
                </FormLabel>
                <Input placeholder="Enter Name" />
              </Grid>
              <Grid item xs={8}>
                <FormLabel
                  sx={{
                    fontSize: "2rem",
                    display: "block",
                    fontWeight: 500,
                    mb: "1.6rem",
                    color: theme.palette.grey[800],
                  }}
                >
                  Company Address
                </FormLabel>
                <Input placeholder="Enter Address" />
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
                maxWidth: "56.7rem",
                color: theme.palette.grey[800],
              }}
            >
              Is your company registered with the Corporate Affairs Commission
              (CAC)?
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
              What is the sector/industry in which your company operates
            </FormLabel>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Input placeholder="Enter Here" />
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
                  Company City
                </FormLabel>
                <Select sx={{ height: "5.6rem" }} placeholder="Select Status">
                  <MenuItem>Single</MenuItem>
                  <MenuItem>Married</MenuItem>
                </Select>
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

export default CompanyInfo;

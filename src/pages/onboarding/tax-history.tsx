import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import { Box, Checkbox, FormControlLabel, FormGroup, FormLabel, Typography, useTheme } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const TaxHistory = () => {
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
          Tax Filing History
        </Typography>
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

export default TaxHistory;

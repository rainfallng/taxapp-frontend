import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const OnboardingInitial = () => {
  const [firstCheck, setFirstCheck] = useState<number | null>(null);
  const [secondCheck, setSecondCheck] = useState<number | null>(null);

  console.log({ firstCheck, secondCheck });

  const onCheck = (value: number, level = 0) => {
    if (level === 0) {
      if (value === 1) setSecondCheck(null);
      if (value === firstCheck) return setFirstCheck(null);
      return setFirstCheck(value);
    }
    if (value === secondCheck) return setSecondCheck(null);
    setSecondCheck(value);
  };

  const isValid =
    (firstCheck === 0 && !Number.isNaN(secondCheck)) || firstCheck === 1;

  return (
    <Layout>
      <OnboardingHeader
        title="Welcome on board!"
        description="Let's get you set up with these few steps."
      />
      <Box sx={{ mt: "2.4rem" }}>
        <FormGroup>
          <FormControlLabel
            sx={{
              "& .MuiFormControlLabel-label": { fontSize: "1.8rem" },
              "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
            }}
            control={
              <Checkbox
                checked={firstCheck === 0}
                onChange={() => onCheck(0)}
              />
            }
            label="I already have a Payer ID/Tax Identification Number (TIN)"
          />
          {firstCheck === 0 && (
            <FormGroup sx={{ ml: "3.2rem", mt: "0.8rem" }}>
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": { fontSize: "1.4rem" },
                  "& .MuiSvgIcon-root": { fontSize: "2rem" },
                }}
                control={
                  <Checkbox
                    checked={secondCheck === 0}
                    onChange={() => onCheck(0, 1)}
                  />
                }
                label="I'll type my details manually"
              />
              <FormControlLabel
                sx={{
                  "& .MuiFormControlLabel-label": { fontSize: "1.4rem" },
                  "& .MuiSvgIcon-root": { fontSize: "2rem" },
                }}
                control={
                  <Checkbox
                    checked={secondCheck === 1}
                    onChange={() => onCheck(1, 1)}
                  />
                }
                label="Fetch my details from my Payer ID/Tax Identification Number (TIN)"
              />
            </FormGroup>
          )}
          <FormControlLabel
            sx={{
              mt: "3.2rem",
              "& .MuiFormControlLabel-label": { fontSize: "1.8rem" },
              "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
            }}
            control={
              <Checkbox
                checked={firstCheck === 1}
                onChange={() => onCheck(1)}
              />
            }
            label="I don't have a Payer ID/Tax Identification Number (TIN)"
          />
        </FormGroup>
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: "18rem" }}>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          variant="outlined"
        >
          <ArrowBackIosNewOutlinedIcon sx={{ mr: "1.6rem" }} /> Back
        </Button>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          disabled={!isValid}
        >
          Continue <ArrowForwardIosOutlinedIcon sx={{ ml: "1.6rem" }} />
        </Button>
      </Box>
    </Layout>
  );
};

export default OnboardingInitial;

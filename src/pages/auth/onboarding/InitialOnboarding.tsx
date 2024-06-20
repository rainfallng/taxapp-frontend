import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { useNavigate } from "react-router-dom";
import { SubmissionModeType, UserType } from "@/types";
import { useStore } from "@/store";
import Input from "@/components/ui/input";

const InitialOnboarding = () => {
  const [firstCheck, setFirstCheck] = useState<number | null>(null);
  const [secondCheck, setSecondCheck] = useState<number | null>(null);
  const navigate = useNavigate();
  const { setOnboardingMode, user } = useStore();

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

  const linkTo = () => {
    let value: string = SubmissionModeType.MANUAL;
    if (firstCheck === 0) {
      if (secondCheck === 0) value = SubmissionModeType["TIN-MANUAL"];
      if (secondCheck === 1) value = SubmissionModeType.TIN;
    }
    setOnboardingMode(value);
    if (firstCheck === 0 && secondCheck === 1) return "/verify-tin";
    if (user.user_type === UserType.COMPANY) return "/company-info";
    return "/personal-info";
  };

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
            label="I already have a Taxpayer ID/Tax Identification Number (TIN)"
          />
          {firstCheck === 0 && (
            <FormGroup sx={{ ml: "3.2rem", mt: "0.8rem" }}>
              <Input
                sx={{ height: "5.6rem" }}
                label="Enter Taxpayer ID/Tax Identification Number"
                name="names"
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
            label="I don’t have a Taxpayer ID/Tax Identification Number (TIN)"
          />
        </FormGroup>
      </Box>
      <Box display="flex" justifyContent="flex-end" sx={{ mt: "18rem" }}>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          disabled={!isValid}
          onClick={() => navigate(`/app/onboarding${linkTo()}`)}
        >
          Continue <ArrowForwardIosOutlinedIcon sx={{ ml: "1.6rem" }} />
        </Button>
      </Box>
    </Layout>
  );
};

export default InitialOnboarding;

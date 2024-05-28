import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import { Box } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Input from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store";
import { SubmissionModeType, UserType } from "@/types";
import toast from "react-hot-toast";
import { useAPI } from "@/hooks/useApi";
import { useMutation } from "@tanstack/react-query";

const VerifyTIN = () => {
  const [tin, setTin] = useState("");
  const navigate = useNavigate();
  const {
    onboardingMode,
    user,
    setCompanyOnboarding,
    setIndividualOnboarding,
  } = useStore();
  const { api } = useAPI();

  const {
    mutateAsync: completeIndividualOnboarding,
    isPending: completingIndividualOnboarding,
  } = useMutation({
    mutationFn: api.completeIndividualOnboarding,
    onSuccess() {
      navigate("/app/onboarding/success");
    },
  });

  const {
    mutateAsync: completeCompanyOnboarding,
    isPending: completingCompanyOnboarding,
  } = useMutation({
    mutationFn: api.completeCompanyOnboarding,
    onSuccess() {
      navigate("/app/onboarding/success");
    },
  });

  const onSubmit = () => {
    if (onboardingMode !== SubmissionModeType.TIN)
      return toast.error("Bad request");
    if (UserType.COMPANY === user.user_type) {
      setCompanyOnboarding({ tin });
      toast.promise(
        completeCompanyOnboarding({
          tin,
          submission_mode: onboardingMode,
        }),
        {
          loading: "Submitting data",
          success: "Data has been submitted",
          error: "Data submission failed",
        }
      );
      return;
    }
    setIndividualOnboarding({ tin });
    toast.promise(
      completeIndividualOnboarding({
        tin,
        tin_type: user.user_type,
        submission_mode: onboardingMode,
      }),
      {
        loading: "Submitting data",
        success: "Data has been submitted",
        error: "Data submission failed",
      }
    );
  };
  const isPending =
    completingIndividualOnboarding || completingCompanyOnboarding;

  return (
    <Layout>
      <OnboardingHeader title="Enter your Payer ID/ Tax Identification Number (TIN) to fetch your details" />
      <Box sx={{ mt: "4.8rem", mx: "auto", maxWidth: "45rem" }}>
        <Input
          label="Enter your TIN"
          value={tin}
          onChange={({ target: { value } }) => setTin(value)}
        />
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: "12rem" }}>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          <ArrowBackIosNewOutlinedIcon sx={{ mr: "1.6rem" }} /> Back
        </Button>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          disabled={!tin || isPending}
          onClick={onSubmit}
        >
          Continue <ArrowForwardIosOutlinedIcon sx={{ ml: "1.6rem" }} />
        </Button>
      </Box>
    </Layout>
  );
};

export default VerifyTIN;

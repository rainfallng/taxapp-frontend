import OnboardingHeader from "@/components/features/onboarding/header";
import Layout from "@/components/features/onboarding/layout";
import Button from "@/components/ui/button";
import { Box } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import Input from "@/components/ui/input";
import { useState } from "react";

const VerifyTIN = () => {
  const [tin, setTin] = useState("");

  return (
    <Layout>
      <OnboardingHeader title="Enter your Payer ID/ Tax Identification Number (TIN) to fetch your details" />
      <Box sx={{ mt: "4.8rem", mx: "auto", maxWidth: "45rem" }}>
        <Input label="Enter your TIN" value={tin} onChange={({ target: { value }}) => setTin(value)} variant="outlined" />
      </Box>
      <Box display="flex" justifyContent="space-between" sx={{ mt: "12rem" }}>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          variant="outlined"
        >
          <ArrowBackIosNewOutlinedIcon sx={{ mr: "1.6rem" }} /> Back
        </Button>
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          disabled={!tin}
        >
          Continue <ArrowForwardIosOutlinedIcon sx={{ ml: "1.6rem" }} />
        </Button>
      </Box>
    </Layout>
  );
};

export default VerifyTIN;

import OnboardingHeader from "@/components/features/onboarding/header";
import Button from "@/components/ui/button";
import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { useAPI } from "@/hooks/useApi";
import { handleFormToastErrors, setLS } from "@/lib/utils";
import toast from "react-hot-toast";

const InitialOnboarding = () => {
  const [firstCheck, setFirstCheck] = useState<number | null>(null);
  const [tin, setTIN] = useState("");
  const navigate = useNavigate();
  const { api } = useAPI();

  const onCheck = (value: number, level = 0) => {
    if (level === 0) {
      if (value === 1) setTIN("");
      if (value === firstCheck) return setFirstCheck(null);
      return setFirstCheck(value);
    }
  };

  const isValid = (firstCheck === 0 && !!tin) || firstCheck === 1;

  const { mutateAsync: verifyTIN, isPending } = useMutation({
    mutationFn: api.profileIdentification,
    onSuccess() {
      setLS("tin", { tin });
      navigate("/auth/onboarding/tin/verify");
    },
  });

  const onSubmit = () => {
    if (firstCheck === 1) return navigate("/auth/onboarding/success");
    toast.promise(
      verifyTIN({
        id_type: "TIN",
        id_number: tin,
      }),
      {
        success: "Update successful",
        loading: "Please wait...",
        error: (error) => handleFormToastErrors(error, "Update failed"),
      }
    );
  };

  return (
    <Box>
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
                value={tin}
                onChange={({ target: { value } }) => {
                  setTIN(value);
                }}
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
      <Box
        display="flex"
        justifyContent="flex-end"
        sx={{ mt: "5.6rem", gap: "1.6rem" }}
      >
        {/* <Button
          onClick={() => navigate("/auth/login")}
          variant="outlined"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Back
        </Button> */}
        <Button
          sx={{ fontSize: "1.8rem", p: "1rem 2.4rem", borderRadius: "5rem" }}
          disabled={!isValid || isPending}
          onClick={onSubmit}
        >
          Save and Continue
        </Button>
      </Box>
    </Box>
  );
};

export default InitialOnboarding;

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { useAPI } from "@/hooks/useApi";
import { identificationSchema } from "@/lib/schemas/onboarding/company-identification";
import { handleFormErrors, handleFormToastErrors, setLS } from "@/lib/utils";
import { IVerifyCAC } from "@/types/form";
import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CompanyIdentification = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const form = useForm(identificationSchema);
  const { mutateAsync: verifyCAC, isPending } = useMutation({
    mutationFn: api.verifyCAC,
    onSuccess() {
      setLS("company-info", form.getValues());
      navigate("/auth/onboarding/company-info/verify");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: IVerifyCAC) => {
    toast.promise(verifyCAC(values), {
      success: "Identification successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Identification failed"),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(onSubmit)}
      sx={{ width: { lg: "54.5rem" } }}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: "2.4rem",
          fontWeight: 500,
          color: theme.palette.grey[800],
        }}
      >
        Identification
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          mt: "4rem",
        }}
      >
        <Box>
          <FormLabel
            sx={{
              display: "block",
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
              mb: "1.6rem",
            }}
          >
            Company Name
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter Company Name"
            name="company_name"
            form={form}
          />
        </Box>
        <Box>
          <FormLabel
            sx={{
              display: "block",
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
              mb: "1.6rem",
            }}
          >
            Corporate Affairs Commission (CAC)
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter CAC ID Number"
            name="rc_number"
            form={form}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "4rem",
        }}
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
          type="submit"
          disabled={isPending}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Save and Continue
        </Button>
      </Box>
    </Box>
  );
};

export default CompanyIdentification;

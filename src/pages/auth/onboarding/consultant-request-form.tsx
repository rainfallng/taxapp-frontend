import { FileUpload } from "@/components/ui/file-upload";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import { Box, Grid, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import Button from "@/components/ui/button";
import { consultantRequestFormSchema } from "@/lib/schemas/onboarding/consultant-request-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import toast from "react-hot-toast";
import { useAPI } from "@/hooks/useApi";
import { useNavigate } from "react-router-dom";
import { useStore } from "@/store";
import { UserType } from "@/types";
import { useEffect, useMemo, useState } from "react";
import { CancelOutlined } from "@mui/icons-material";

type Values = {
  id_type?: string;
  id_number?: string;
  otp?: string;
  email?: string;
  tax_id?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
};

const ConsultantRequestForm = () => {
  const { api } = useAPI();
  const navigate = useNavigate();
  const { user } = useStore();
  const [file, setFile] = useState<File | null>(null);
  const isTaxConsultant = useMemo(
    () => user.user_type === UserType.TAX_CONSULTANT,
    [user.user_type]
  );
  const form = useForm(consultantRequestFormSchema);

  const { mutateAsync: consultantRequest, isPending } = useMutation({
    mutationFn: api[isTaxConsultant ? "consultantSignup" : "consultantRequest"],
    onSuccess() {
      navigate(
        `/auth/onboarding/consultant/${
          isTaxConsultant ? "" : "request-"
        }success`
      );
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (inputs: Values) => {
    const formData = new FormData();
    if (!file) return;
    const {
      id_number = "",
      id_type = "",
      otp = "",
      email = "",
      tax_id = "",
    } = inputs;
    formData.append("credential", file);
    formData.append("tax_id", tax_id);
    if (!isTaxConsultant) {
      formData.append("id_number", id_number);
      formData.append("id_type", id_type);
      formData.append("otp", otp);
      formData.append("email", email);
    }
    toast.promise(
      consultantRequest(formData),
      {
        success: "Request successful",
        loading: "Please wait...",
        error: (error) => handleFormToastErrors(error, "Request failed"),
      }
    );
  };

  useEffect(() => {
    form.reset({
      ...form.getValues(),
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone,
      ...(isTaxConsultant ? { email: user.email } : {}),
    });
  }, [
    form,
    isTaxConsultant,
    user.email,
    user.first_name,
    user.last_name,
    user.phone,
  ]);

  return (
    <Box
      component="form"
      sx={{ width: { lg: "62.9rem" } }}
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <Typography
        component="h4"
        sx={{
          fontSize: "2.2rem",
          fontWeight: 500,
          color: "#252657",
          textAlign: "center",
          mb: "4rem",
        }}
      >
        Tax Consultant Request Form
      </Typography>
      <Grid container spacing={2.4}>
        <Grid item xs={6}>
          <Input label="First Name" name="first_name" form={form} />
        </Grid>
        <Grid item xs={6}>
          <Input label="Last Name" name="last_name" form={form} />
        </Grid>
        <Grid item xs={6}>
          <PhoneInput
            value={form.watch("phone_number")}
            onChange={(value) => form.setValue("phone_number", value)}
            errorMessage={form.formState.errors.phone_number?.message}
            label="Enter Number"
            sx={{ height: "5.6rem" }}
          />
        </Grid>
        <Grid item xs={6}>
          <Input
            label="Email Address"
            name="email"
            form={form}
            disabled={isTaxConsultant}
          />
        </Grid>
        <Grid item xs={6}>
          <Input label="Unique Tax ID" name="tax_id" form={form} />
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
          {file ? (
            <Box
              sx={{
                width: "100%",
                color: "#278F76",
                fontSize: "1.8rem",
                fontWeight: 500,
                display: "flex",
                alignItems: "center",
              }}
            >
              {file.name}
              <CancelOutlined
                onClick={() => setFile(null)}
                sx={{
                  ml: "1.6rem",
                  width: "1.6rem",
                  height: "1.6rem",
                  cursor: "pointer",
                }}
              />
            </Box>
          ) : (
            <FileUpload
              multiple={false}
              onChange={({ target }) => {
                if (target.files?.item?.(0)) setFile(target.files?.item?.(0));
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  color: "#278F76",
                  fontSize: "1.8rem",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <UploadOutlinedIcon
                  sx={{ mr: "1.6rem", width: "1.6rem", height: "1.6rem" }}
                />{" "}
                Upload Credentials
              </Box>
            </FileUpload>
          )}
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: "3.2rem",
        }}
      >
        <Button
          type="submit"
          disabled={isPending}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
            width: "100%",
          }}
        >
          Save and Continue
        </Button>
      </Box>
    </Box>
  );
};

export default ConsultantRequestForm;

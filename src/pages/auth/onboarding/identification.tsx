import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { identificationSchema } from "@/lib/schemas/onboarding/identification";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { useStore } from "@/store";
import { IIndividualOnboarding } from "@/types/form";
import { Box, FormLabel, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Identification = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const { setUser } = useStore();
  const form = useForm({
    defaultValues: identificationSchema.defaultValues,
    resolver: identificationSchema.resolver,
  });
  const { mutateAsync: individualIdentification, isPending } = useMutation({
    mutationFn: api.individualIdentification,
    onSuccess(data) {
      setUser({ tin_profile: data?.data });
      navigate("/auth/onboarding/personal-info");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: IIndividualOnboarding) => {
    toast.promise(individualIdentification(values), {
      success: "Identification successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Identification failed"),
    });
  };

  return (
    <Box
      component="form"
      sx={{ width: { lg: "51.2rem" } }}
      onSubmit={form.handleSubmit(onSubmit)}
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
            Identification Type
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Identification Type"
            value={form.watch("id_type")}
            {...form.register("id_type")}
            errorMessage={form.formState.errors.id_type?.message}
          >
            {["BVN", "NIN"].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
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
            Identification Number
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter Identification Number"
            name="id_number"
            form={form}
          />
        </Box>
        <Box>
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
          <DatePicker form={form} name="date_of_birth" format="YYYY-MM-DD" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "2.2rem",
        }}
      >
        {/* <Button
          variant="outlined"
          onClick={() => navigate("/auth/login")}
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

export default Identification;

import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { postReturnSchema } from "@/lib/schemas/returns/post-return";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { IIndividualReturn } from "@/types/form";
import { IAnnualReturnStage } from "@/types/returns";
import { Box, FormLabel, Grid } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const IDStage: FC<{ setStage: (stage: IAnnualReturnStage) => void }> = ({
  setStage,
}) => {
  const navigate = useNavigate();
  const { api } = useAPI();
  const form = useForm(postReturnSchema);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.postIndividualReturns,
    onSuccess() {
      setStage("income");
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) =>
      handleFormErrors(error, form.setError),
  });

  const onSubmit = (values: IIndividualReturn) => {
    toast.promise(mutateAsync(values), {
      success: "Successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Your Tax Payer ID/Tax Identification Number (TIN)
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter Number"
            name="tin"
            form={form}
          />
        </Grid>
        <Grid item xs={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Year in View
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Year"
            value={form.watch("year_in_view")}
            {...form.register("year_in_view")}
            errorMessage={form.formState.errors.year_in_view?.message}
          >
            {["2023", "2022"].map((val) => (
              <MenuItem key={val} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "4rem",
        }}
      >
        <Button
          variant="outlined"
          rounded
          onClick={() => navigate("/app/returns")}
        >
          Cancel
        </Button>
        <Button type="submit" rounded disabled={isPending}>
          Proceed
        </Button>
      </Box>
    </form>
  );
};

export default IDStage;

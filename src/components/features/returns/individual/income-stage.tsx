import { FileUpload } from "@/components/ui/file-upload";
import { Box, FormLabel, Grid, Typography, useTheme } from "@mui/material";
import { FC, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import UploadOutlinedIcon from "@mui/icons-material/UploadOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useForm } from "react-hook-form";
import { individualIncomeSchema } from "@/lib/schemas/returns/individual/income";
import { useMutation } from "@tanstack/react-query";
import { useAPI } from "@/hooks/useApi";
import { IIndividualAnnualIncome } from "@/types/form";
import { useLoader } from "@/hooks/useLoader";
import toast from "react-hot-toast";
import { handleFormToastErrors } from "@/lib/utils";
import { IAnnualReturnStage } from "@/types/returns";
import CrossCheckModal from "../../modals/cross-check";
import { useReducerState } from "@/hooks/useReducerState";

const IncomeStage: FC<{ setStage: (stage: IAnnualReturnStage) => void }> = ({
  setStage,
}) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { api } = useAPI();
  const { year = "" } = useParams();
  const { id: returnId = "" } = useParams();
  const [file, setFile] = useState<File | null>(null);
  const form = useForm(individualIncomeSchema);
  const otherIncomes = form.watch("other_incomes") ?? [];
  const [modalState, setModalState] = useReducerState({
    open: false,
    values: {} as IIndividualAnnualIncome,
  });

  const removeAdditionalIncome = (index: number) => {
    const format = otherIncomes?.filter((_, key) => key !== index);

    form.setValue("other_incomes", format);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (variables: IIndividualAnnualIncome) =>
      api.postIndividualIncome({
        ...variables,
        statement_of_income: file || "",
        year_in_view: Number(year),
        returnId,
      }),
    onSuccess() {
      setStage("accomodation");
    },
    onSettled() {
      setModalState({ open: false, values: {} as IIndividualAnnualIncome });
    },
  });

  const onSubmit = (values: IIndividualAnnualIncome) => {
    setModalState({ open: true, values });
  };

  const onProceed = () => {
    toast.promise(mutateAsync(modalState.values), {
      success: "Successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  useLoader(isPending, "Please wait...");

  if (!year || Number.isNaN(Number(year)))
    return <Navigate to="/app/returns" />;

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Typography sx={{ mb: "4rem", fontSize: "2rem", fontWeight: 500 }}>
        Statement of Income (Gross Annual Income)
      </Typography>
      <FileUpload onChange={(e) => setFile(e.target.files?.[0] ?? null)}>
        <Box sx={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <Box
            width="100%"
            sx={{
              maxWidth: "23rem",
              p: "1rem 2.4rem",
              color: "#278F76",
              borderRadius: "5rem",
              border: "1px solid",
              borderColor: "#278F76",
              fontSize: "1.4rem",
              fontWeight: 500,
              display: "flex",
              alignItems: "center",
            }}
          >
            <UploadOutlinedIcon sx={{ mr: "0.3rem" }} /> Choose file to upload
          </Box>
          <Typography sx={{ color: "#717171", fontSize: "1.4rem" }}>
            {file?.name ?? " No file chosen"}
          </Typography>
          {file && (
            <Button
              type="button"
              variant="text"
              onClick={() => setFile(null)}
              sx={{
                color: "#717171",
                fontSize: "1.4rem",
                bgcolor: "transparent",
                height: "fit-content",
              }}
            >
              <CloseOutlinedIcon />
            </Button>
          )}
        </Box>
      </FileUpload>
      <Grid
        container
        rowSpacing={3.2}
        columnSpacing={2.4}
        sx={{ mt: "2.4rem" }}
      >
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Salary
          </FormLabel>
          <Input name="salary" label="Enter Amount" form={form} isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Commission
          </FormLabel>
          <Input name="commission" label="Enter Amount" form={form} isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Trade Income
          </FormLabel>
          <Input
            name="trade_income"
            form={form}
            label="Enter Amount"
            isNumber
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Allowance
          </FormLabel>
          <Input name="allowance" form={form} label="Enter Amount" isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Pension
          </FormLabel>
          <Input name="pension" form={form} label="Enter Amount" isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Annuity
          </FormLabel>
          <Input name="annuity" form={form} label="Enter Amount" isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Gratuities
          </FormLabel>
          <Input name="gratuities" form={form} label="Enter Amount" isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Foreign Income
          </FormLabel>
          <Input
            name="foreign_income"
            form={form}
            label="Enter Amount"
            isNumber
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Dividend
          </FormLabel>
          <Input name="dividend" form={form} label="Enter Amount" isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Interest
          </FormLabel>
          <Input name="interest" form={form} label="Enter Amount" isNumber />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Rent
          </FormLabel>
          <Input name="rent" form={form} label="Enter Amount" isNumber />
        </Grid>
      </Grid>
      <Box
        sx={{
          mt: "2.4rem",
          display: "flex",
          alignItems: "center",
          gap: "1.4rem",
        }}
      >
        <Typography sx={{ fontSize: "2rem" }}>Other Income(s)</Typography>
        <Button
          type="button"
          variant="text"
          onClick={() =>
            form.setValue("other_incomes", [
              ...otherIncomes,
              { name: "", value: "" },
            ])
          }
        >
          <AddCircleOutlineOutlinedIcon sx={{ mr: "1.5rem" }} /> Add Income
        </Button>
      </Box>
      <Box
        sx={{
          mt: "1.6rem",
          display: "flex",
          flexDirection: "column",
          gap: "1.6rem",
        }}
      >
        {form.watch("other_incomes")?.map((_, key) => (
          <Grid container key={key} spacing={1.6}>
            <Grid item xs={4}>
              <Input
                name={`other_incomes.${key}.name`}
                label="Name"
                form={form}
              />
            </Grid>
            <Grid item xs={4}>
              <Input
                name={`other_incomes.${key}.value`}
                label="Enter Amount"
                form={form}
                isNumber
              />
            </Grid>
            <Grid item xs={4} sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="text"
                type="button"
                onClick={() => removeAdditionalIncome(key)}
              >
                <CloseOutlinedIcon color="error" />
              </Button>
            </Grid>
          </Grid>
        ))}
      </Box>
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
        <Button rounded type="submit" disabled={isPending}>
          Next
        </Button>
      </Box>

      <CrossCheckModal
        open={modalState.open}
        isLoading={isPending}
        toggle={() =>
          setModalState({ open: false, values: {} as IIndividualAnnualIncome })
        }
        onProceed={onProceed}
      />
    </form>
  );
};

export default IncomeStage;

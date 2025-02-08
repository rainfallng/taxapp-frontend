import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useReducerState } from "@/hooks/useReducerState";
import { MONTH_INDEX_MAPPER, WITHOLDING_TAX_TYPE } from "@/lib/constants";
import { withholdingTaxSchema } from "@/lib/schemas/returns/company/witholding-tax";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { WitholdingTaxType } from "@/types";
import { Box, capitalize, FormLabel, Grid, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CrossCheckModal from "../../modals/cross-check";

const WitholdingTaxForm = () => {
  const theme = useTheme();
  const form = useForm(withholdingTaxSchema);
  const { api } = useAPI();
  const { year = "" } = useParams();
  const navigate = useNavigate();
  const [modalState, setModalState] = useReducerState({
    open: false,
    values: {} as WitholdingTaxType,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.postCompanyWitholdingTax,
    onSuccess() {
      navigate(`/app/returns/success`);
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) => {
      setModalState({ open: false, values: {} as WitholdingTaxType });
      handleFormErrors(error, form.setError);
    },
  });

  const onSubmit = (values: WitholdingTaxType) => {
    setModalState({ open: true, values });
  };

  const onProceed = () => {
    toast.promise(mutateAsync({ ...modalState.values, year: Number(year) }), {
      success: "Successful",
      loading: "Submitting...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Date End
          </FormLabel>
          <DatePicker
            name="date_of_payment"
            format="YYYY-MM-DD"
            form={form}
            maxDate={dayjs()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Amount Paid
          </FormLabel>
          <Input
            isNumber
            sx={{ height: "5.6rem" }}
            label="Enter Amount"
            name="amount_paid"
            form={form}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Start Period of Payment
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select"
            value={form.watch("start_period_of_payment")}
            {...form.register("start_period_of_payment")}
            errorMessage={
              form.formState.errors.start_period_of_payment?.message
            }
          >
            {Object.values(MONTH_INDEX_MAPPER).map((val) => (
              <MenuItem key={val} value={val.toUpperCase()}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            End Period of Payment
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select"
            value={form.watch("end_period_of_payment")}
            {...form.register("end_period_of_payment")}
            errorMessage={form.formState.errors.end_period_of_payment?.message}
          >
            {Object.values(MONTH_INDEX_MAPPER).map((val) => (
              <MenuItem key={val} value={val.toUpperCase()}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Type of Withholding
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select"
            value={form.watch("type_of_witholding")}
            {...form.register("type_of_witholding")}
            errorMessage={form.formState.errors.type_of_witholding?.message}
          >
            {WITHOLDING_TAX_TYPE.map((val) => (
              <MenuItem key={val} value={val.toUpperCase()}>
                {capitalize(val.toLowerCase().replace("_", " "))}
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
        <Button rounded type="submit" disabled={isPending}>
          Next
        </Button>
      </Box>

      <CrossCheckModal
        open={modalState.open}
        toggle={() =>
          setModalState({ open: false, values: {} as WitholdingTaxType })
        }
        onProceed={onProceed}
      />
    </form>
  );
};

export default WitholdingTaxForm;

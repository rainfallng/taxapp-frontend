import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { MONTH_INDEX_MAPPER } from "@/lib/constants";
import { scheduleReturnSchema } from "@/lib/schemas/returns/company/schedule-returns";
import { handleFormErrors, handleFormToastErrors } from "@/lib/utils";
import { ScheduleReturnTaxType } from "@/types";
import { Box, FormLabel, Grid, Typography, useTheme } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useForm, UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import CrossCheckModal from "../../modals/cross-check";
import { useReducerState } from "@/hooks/useReducerState";
import { AxiosError } from "axios";

const Form = ({
  form,
  type,
}: {
  form: UseFormReturn<ScheduleReturnTaxType>;
  type: "development_levy" | "business_premises";
}) => {
  const theme = useTheme();

  return (
    <Grid container spacing={2}>
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
          Revenue Item
        </FormLabel>
        <Input
          sx={{ height: "5.6rem" }}
          label="Enter Item"
          name={`${type}_revenue_item`}
          form={form}
          disabled
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
          Date of Payment
        </FormLabel>
        <DatePicker
          name={`${type}_date_of_payment`}
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
          name={`${type}_amount_paid`}
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
            color: (theme) => theme.palette.grey[800],
          }}
        >
          Receipt Number
        </FormLabel>
        <Input
          sx={{ height: "5.6rem" }}
          label="Enter Number"
          name={`${type}_receipt_number`}
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
          value={form.watch(`${type}_start_period_of_payment`)}
          {...form.register(`${type}_start_period_of_payment`)}
          errorMessage={
            form.formState.errors.development_levy_start_period_of_payment
              ?.message
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
          value={form.watch(`${type}_end_period_of_payment`)}
          {...form.register(`${type}_end_period_of_payment`)}
          errorMessage={
            form.formState.errors.development_levy_end_period_of_payment
              ?.message
          }
        >
          {Object.values(MONTH_INDEX_MAPPER).map((val) => (
            <MenuItem key={val} value={val.toUpperCase()}>
              {val}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

const ScheduleReturnsForm = () => {
  const theme = useTheme();
  const form = useForm(scheduleReturnSchema);
  const navigate = useNavigate();
  const { year = "" } = useParams();
  const { api } = useAPI();
  const [modalState, setModalState] = useReducerState({
    open: false,
    values: {} as ScheduleReturnTaxType,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: api.postCompanyScheduleReturns,
    onSuccess() {
      navigate(`/app/returns/success`);
    },
    onError: (error: AxiosError<{ [message: string]: string | string[] }>) => {
      setModalState({ open: false, values: {} as ScheduleReturnTaxType });
      handleFormErrors(error, form.setError);
    },
  });

  const onSubmit = (values: ScheduleReturnTaxType) => {
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
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: 500,
          color: theme.palette.grey[800],
          mb: "2.4rem",
        }}
      >
        Development Levy
      </Typography>
      <Form form={form} type="development_levy" />
      <Box component="hr" sx={{ my: "2.4rem" }} />
      <Typography
        sx={{
          fontSize: "2rem",
          fontWeight: 500,
          color: theme.palette.grey[800],
          mb: "2.4rem",
        }}
      >
        Business Premises
      </Typography>
      <Form form={form} type="business_premises" />
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
          setModalState({ open: false, values: {} as ScheduleReturnTaxType })
        }
        onProceed={onProceed}
      />
    </form>
  );
};

export default ScheduleReturnsForm;

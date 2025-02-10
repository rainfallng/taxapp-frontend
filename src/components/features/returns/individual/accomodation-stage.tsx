import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { individualAccomodationSchema } from "@/lib/schemas/returns/individual/accomodation";
import { handleFormToastErrors } from "@/lib/utils";
import { IIndividualAnnualAccomodationInput } from "@/types/form";
import {
  Box,
  FormLabel,
  Grid,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import CalculateReturnsModal from "../../modals/calculate-returns";
import CrossCheckModal from "../../modals/cross-check";
import { useReducerState } from "@/hooks/useReducerState";

const AccomodationStage: FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const { id: returnId = "", year = "" } = useParams();
  const [startCalculating, setStartCalculating] = useState(false);
  const [modalState, setModalState] = useReducerState({
    open: false,
    values: {} as IIndividualAnnualAccomodationInput,
  });

  const start_date = dayjs(year).startOf("year").format();
  const end_date = dayjs(year).endOf("year").format();

  const form = useForm(individualAccomodationSchema);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (variables: IIndividualAnnualAccomodationInput) =>
      api.postIndividualAccomodation(returnId, variables),
    onError() {
      setStartCalculating(false);
    },
  });

  const onSubmit = (values: IIndividualAnnualAccomodationInput) => {
    setModalState({ open: true, values });
  };

  const onProceed = () => {
    setModalState({ open: false, values: {} as IIndividualAnnualAccomodationInput });
    setStartCalculating(true);
    toast.promise(mutateAsync(modalState.values), {
      success: "Successful",
      loading: "Please wait...",
      error: (error) => handleFormToastErrors(error, "Failed"),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Typography sx={{ mb: "4rem", fontSize: "2rem", fontWeight: 500 }}>
        Mandatory Disclosure of Accommodation
      </Typography>
      <Grid container columnSpacing={3.2} rowSpacing={2.4}>
        <Grid item xs={12}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Address
          </FormLabel>
          <Input name="address" label="Enter Address" form={form} />
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
            Accommodation Type
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Type"
            value={form.watch("accommodation_type")}
            {...form.register("accommodation_type")}
            errorMessage={form.formState.errors.accommodation_type?.message}
          >
            {[
              "Apartment",
              "Hotel",
              "Hostel",
              " Office Suite",
              "Business Center",
              "Corporate Tower",
              "Government Office Space",
            ].map((val) => (
              <MenuItem key={val} value={val}>
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
            Ownership Type
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Type"
            value={form.watch("ownership_type")}
            {...form.register("ownership_type")}
            errorMessage={form.formState.errors.ownership_type?.message}
          >
            {["Tenant", "Owner", "Others"].map((val) => (
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
            Owner Name
          </FormLabel>
          <Input name="owner_name" label="Enter Name" form={form} />
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
            Owner Taxpayer ID
          </FormLabel>
          <Input
            name="owner_tax_payer_number"
            label="Enter Taxpayer ID"
            form={form}
          />
        </Grid>
        <Grid item xs={12}>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Owner Address
          </FormLabel>
          <Input name="owner_address" label="Enter Address" form={form} />
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
            Rent Paid
          </FormLabel>
          <Input name="rent_paid" label="Enter Amount" isNumber form={form} />
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
            Rent Paid By Employer
          </FormLabel>
          <Input
            name="rent_paid_by_employer"
            label="Enter Amount"
            isNumber
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
            Date Started
          </FormLabel>
          <DatePicker
            name="start_date"
            format="YYYY-MM-DD"
            form={form}
            maxDate={dayjs(end_date)}
            minDate={dayjs(start_date)}
            defaultValue={dayjs(start_date)}
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
            Date End
          </FormLabel>
          <DatePicker
            name="end_date"
            format="YYYY-MM-DD"
            form={form}
            minDate={dayjs(form.watch("start_date") || start_date)}
            maxDate={dayjs(end_date)}
          />
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
        <Button rounded type="submit">
          Next
        </Button>
      </Box>

      <CrossCheckModal
        open={modalState.open}
        toggle={() =>
          setModalState({
            open: false,
            values: {} as IIndividualAnnualAccomodationInput,
          })
        }
        onProceed={onProceed}
      />
      <CalculateReturnsModal
        isLoading={isPending}
        open={startCalculating}
        onClose={() => navigate(`/app/returns/success`)}
      />
    </form>
  );
};

export default AccomodationStage;

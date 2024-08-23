import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { useAPI } from "@/hooks/useApi";
import { useLoader } from "@/hooks/useLoader";
import { QueryKeys } from "@/lib/queryKeys";
import { Box, FormLabel, Grid, useTheme } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Single = () => {
  const form = useForm();
  const theme = useTheme();
  const navigate = useNavigate();
  const { api } = useAPI();
  const { data: states, isLoading: isLoadingStates } = useQuery({
    queryKey: [QueryKeys.STATES],
    queryFn: api.getStates,
  });

  useLoader(isLoadingStates, "Please wait...");

  const onSubmit = () => {};

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Grid
        container
        rowSpacing={3.2}
        columnSpacing={2.4}
        sx={{ mt: "2.4rem" }}
      >
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
            Payer ID/Tax Identification Number (TIN)
          </FormLabel>
          <Input name="tin" label="Enter Number" form={form} isNumber />
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
            Month in View
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select month"
            value={form.watch("month_in_view")}
            {...form.register("month_in_view")}
            // errorMessage={form.formState.errors.marital_status?.message}
          >
            {["January", "February"].map((value) => (
              <MenuItem key={value} value={value}>
                {value}
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
            State of Residence
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select state"
            value={form.watch("state_of_residence")}
            {...form.register("state_of_residence")}
            //   errorMessage={form.formState.errors.state_of_residence?.message}
          >
            {states?.map((state) => (
              <MenuItem key={state.id} value={state.id}>
                {state.name}
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
            Basic
          </FormLabel>
          <Input name="basic" label="Enter Amount" form={form} isNumber />
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
            Transport
          </FormLabel>
          <Input name="transport" label="Enter Amount" form={form} isNumber />
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
            Housing
          </FormLabel>
          <Input name="housing" label="Enter Amount" form={form} isNumber />
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
            Bonus
          </FormLabel>
          <Input name="bonus" label="Enter Amount" form={form} isNumber />
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
            Others
          </FormLabel>
          <Input name="others" label="Enter Amount" form={form} isNumber />
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
            Gross Emolument for Calculation of CRA
          </FormLabel>
          <Input
            name="cra_gross_emolument"
            label="Enter Amount"
            form={form}
            isNumber
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
            Gross Emolument
          </FormLabel>
          <Input
            name="gross_emolument"
            label="Enter Amount"
            form={form}
            isNumber
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
            Chargable Income
          </FormLabel>
          <Input
            name="chargable_income"
            label="Enter Amount"
            form={form}
            isNumber
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
            Consolidated Relief
          </FormLabel>
          <Input
            name="consolidated_relief"
            label="Enter Amount"
            form={form}
            isNumber
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
          onClick={() => navigate(-1)}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          <ArrowBackIosNewIcon sx={{ mr: "0.8rem" }} />
          Back
        </Button>
        <Button
          type="submit"
          //   disabled={!file}
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Next
          <ArrowForwardIosIcon sx={{ ml: "0.8rem" }} />
        </Button>
      </Box>
    </form>
  );
};

export default Single;

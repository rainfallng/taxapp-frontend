import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { IState } from "@/types";
import { AddCompanyStaffReturn } from "@/types/returns";
import { Box, capitalize, FormLabel, Grid, useTheme } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Button from "@/components/ui/button";
import { useState } from "react";
import { payeStaffInput } from "@/lib/schemas/returns/company/paye";
import { useParams } from "react-router-dom";

const StaffForm = ({
  form,
  index,
  states,
}: {
  index: number;
  form: UseFormReturn<{ returns: AddCompanyStaffReturn[] }>;
  states?: IState[];
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { month = "" } = useParams();
  const returns = form.watch("returns");
  const isOnly = index === 0 && returns.length === 1;
  const isLast = index === returns.length - 1;

  const CaretIcon = open
    ? KeyboardArrowUpOutlinedIcon
    : KeyboardArrowDownOutlinedIcon;

  const onAdd = () => form.setValue("returns", [...returns, payeStaffInput]);

  const onRemove = () => {
    if (isOnly) return;
    const format = returns.filter((_, key) => key !== index);
    form.reset({ returns: format });
  };

  return (
    <Box sx={{ py: "1.6rem", borderTop: "1px solid #D0D0D0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          variant="text"
          sx={{ fontSize: "1.8rem" }}
          onClick={() => setOpen(!open)}
        >
          <CaretIcon sx={{ mr: "1.6rem", fontSize: "1.6rem" }} />
          PAYE Filing {index + 1}
        </Button>
        {!isOnly && (
          <Button onClick={onRemove} variant="text">
            <DeleteOutlineIcon />
          </Button>
        )}
      </Box>
      {open && (
        <Grid
          container
          rowSpacing={3.2}
          columnSpacing={2.4}
          sx={{ mt: "2.4rem", width: "100%", mx: "auto" }}
        >
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Payer ID/Tax Identification Number (TIN)
            </FormLabel>
            <Input
              name={`returns.${index}.tin`}
              label="Enter Number"
              form={form}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Month in View
            </FormLabel>
            <Input
              value={capitalize(month)}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Name
            </FormLabel>
            <Input
              name={`returns.${index}.name`}
              label="Enter Name"
              form={form}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Designation
            </FormLabel>
            <Input
              name={`returns.${index}.designation`}
              label="Enter Designation"
              form={form}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
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
              value={form.watch(`returns.${index}.state_of_residence`)}
              {...form.register(`returns.${index}.state_of_residence`)}
              errorMessage={
                form.formState.errors.returns?.[index]?.state_of_residence
                  ?.message
              }
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
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Basic
            </FormLabel>
            <Input
              name={`returns.${index}.basic`}
              label="Enter Amount"
              form={form}
              isNumber
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Transport
            </FormLabel>
            <Input
              name={`returns.${index}.transport`}
              label="Enter Amount"
              form={form}
              isNumber
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Housing
            </FormLabel>
            <Input
              name={`returns.${index}.housing`}
              label="Enter Amount"
              form={form}
              isNumber
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Bonus
            </FormLabel>
            <Input
              name={`returns.${index}.bonus`}
              label="Enter Amount"
              form={form}
              isNumber
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Others
            </FormLabel>
            <Input
              name={`returns.${index}.others`}
              label="Enter Amount"
              form={form}
              isNumber
            />
          </Grid>
        </Grid>
      )}
      {isLast && (
        <Button
          variant="text"
          sx={{
            color: theme.palette.grey[200],
            fontSize: "1.8rem",
            mt: "3.2rem",
          }}
          onClick={onAdd}
        >
          <AddCircleIcon sx={{ mr: "0.8rem" }} />
          Add another employee&apos;s PAYE
        </Button>
      )}
    </Box>
  );
};

export default StaffForm;

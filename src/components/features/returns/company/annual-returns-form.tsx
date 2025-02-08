import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { AnnualReturnType, Nationality } from "@/types";
import { Box, FormLabel, Grid, useTheme } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { useEffect, useMemo, useState } from "react";
import { annualReturnInput } from "@/lib/schemas/returns/company/annual-returns";

const AnnualReturnsForm = ({
  form,
  index,
  countries,
}: {
  form: UseFormReturn<AnnualReturnType>;
  index: number;
  countries: Nationality[];
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const annualReturns = form.watch("annual_returns");
  const isFirst = useMemo(() => index === 0, [index]);
  const isOnly = useMemo(
    () => isFirst && annualReturns.length === 1,
    [isFirst, annualReturns]
  );
  const isLast = useMemo(
    () => index === annualReturns.length - 1,
    [index, annualReturns]
  );

  const CaretIcon = open
    ? KeyboardArrowUpOutlinedIcon
    : KeyboardArrowDownOutlinedIcon;

  const onAdd = () =>
    form.setValue("annual_returns", [...annualReturns, annualReturnInput]);

  const onRemove = () => {
    if (isOnly) return;
    const format = annualReturns.filter((_, key) => key !== index);
    form.reset({ annual_returns: format });
  };

  useEffect(() => {
    if (isOnly) setOpen(true);
  }, [isOnly]);

  return (
    <Box sx={{ py: "1.6rem", borderTop: "1px solid #D0D0D0" }}>
      {!isOnly && (
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
            Annual Returns Filing {index + 1}
          </Button>
          <Button onClick={onRemove} variant="text">
            <DeleteOutlineIcon />
          </Button>
        </Box>
      )}
      {open && (
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
              Surname
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Surname"
              name={`annual_returns.${index}.surname`}
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
              First Name
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter First Name"
              name={`annual_returns.${index}.first_name`}
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
              Middle Name
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Middle Name"
              name={`annual_returns.${index}.middle_name`}
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
              Designation
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Designation"
              name={`annual_returns.${index}.designation`}
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
              Nationality
            </FormLabel>
            <Select
              sx={{ height: "5.6rem" }}
              placeholder="Select Nationality"
              value={form.watch(`annual_returns.${index}.nationality`)}
              {...form.register(`annual_returns.${index}.nationality`)}
              errorMessage={
                form.formState.errors.annual_returns?.[index]?.nationality
                  ?.message
              }
            >
              {countries?.map((n) => (
                <MenuItem key={n.id} value={n.id}>
                  {n.name}
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
                color: (theme) => theme.palette.grey[800],
              }}
            >
              Number of Months
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              isNumber
              label="Enter Number"
              name={`annual_returns.${index}.number_of_months`}
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
              Development Levy
            </FormLabel>
            <Input
              isNumber
              sx={{ height: "5.6rem" }}
              label="Enter Amount"
              name={`annual_returns.${index}.development_levy`}
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
              Gross Income
            </FormLabel>
            <Input
              isNumber
              sx={{ height: "5.6rem" }}
              label="Enter Amount"
              name={`annual_returns.${index}.gross_income`}
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
              Chargeable Income
            </FormLabel>
            <Input
              isNumber
              sx={{ height: "5.6rem" }}
              label="Enter Amount"
              name={`annual_returns.${index}.chargeable_income`}
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
              Annual Tax Paid
            </FormLabel>
            <Input
              isNumber
              sx={{ height: "5.6rem" }}
              label="Enter Amount"
              name={`annual_returns.${index}.annual_tax_paid`}
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
              Staff Email Address
            </FormLabel>
            <Input
              type="email"
              sx={{ height: "5.6rem" }}
              label="Enter Email Address"
              name={`annual_returns.${index}.staff_email_address`}
              form={form}
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
          Add another employee&apos;s annual return
        </Button>
      )}
    </Box>
  );
};

export default AnnualReturnsForm;

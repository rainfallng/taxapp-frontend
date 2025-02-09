import { Box, FormLabel, Grid, useTheme } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Nationality, ProjectionReturnType } from "@/types";
import Select, { MenuItem } from "@/components/ui/select";
import { projectionReturnInput } from "@/lib/schemas/returns/company/projection-returns";
import PhoneInput from "@/components/ui/phone-input";

const ProjectionReturnsForm = ({
  form,
  index,
  countries,
}: {
  form: UseFormReturn<ProjectionReturnType>;
  index: number;
  countries: Nationality[];
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const projectionReturns = form.watch("projection_returns");
  const isFirst = useMemo(() => index === 0, [index]);
  const isOnly = useMemo(
    () => isFirst && projectionReturns.length === 1,
    [isFirst, projectionReturns]
  );
  const isLast = useMemo(
    () => index === projectionReturns.length - 1,
    [index, projectionReturns]
  );

  const CaretIcon = open
    ? KeyboardArrowUpOutlinedIcon
    : KeyboardArrowDownOutlinedIcon;

  const onAdd = () =>
    form.setValue("projection_returns", [
      ...projectionReturns,
      projectionReturnInput,
    ]);

  const onRemove = () => {
    if (isOnly) return;
    const format = projectionReturns.filter((_, key) => key !== index);
    form.reset({ projection_returns: format });
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
            Projection Returns Filing {index + 1}
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
              name={`projection_returns.${index}.surname`}
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
              name={`projection_returns.${index}.first_name`}
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
              name={`projection_returns.${index}.middle_name`}
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
              name={`projection_returns.${index}.designation`}
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
              value={form.watch(`projection_returns.${index}.nationality`)}
              {...form.register(`projection_returns.${index}.nationality`)}
              errorMessage={
                form.formState.errors.projection_returns?.[index]?.nationality
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
              Gross Income
            </FormLabel>
            <Input
              isNumber
              sx={{ height: "5.6rem" }}
              label="Enter Amount"
              name={`projection_returns.${index}.gross_income`}
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
              name={`projection_returns.${index}.staff_email_address`}
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
              Taxpayer ID
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Taxpayer ID"
              name={`projection_returns.${index}.tax_payer_id`}
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
              Staff Phone Number
            </FormLabel>
            <PhoneInput
              value={form.watch(`projection_returns.${index}.staff_phone_number`)}
              onChange={(value) =>
                form.setValue(
                  `projection_returns.${index}.staff_phone_number`,
                  value
                )
              }
              errorMessage={
                form.formState.errors.projection_returns?.[index]
                  ?.staff_phone_number?.message
              }
              label="Enter Number"
              sx={{
                height: "5.6rem",
              }}
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
          Add another employee&apos;s projection return
        </Button>
      )}
    </Box>
  );
};

export default ProjectionReturnsForm;

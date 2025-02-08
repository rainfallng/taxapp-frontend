import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { IState } from "@/types";
import { AddCompanyStaffReturn } from "@/types/returns";
import {
  Box,
  capitalize,
  FormLabel,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import Button from "@/components/ui/button";
import { useEffect, useMemo, useState } from "react";
import { payeStaffInput } from "@/lib/schemas/returns/company/paye";
import { useParams } from "react-router-dom";

const StaffForm = ({
  form,
  index,
  states,
}: {
  index: number;
  form: UseFormReturn<AddCompanyStaffReturn>;
  states?: IState[];
}) => {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const { month = "" } = useParams();
  const monthly_payees = form.watch("monthly_payees");
  const isFirst = useMemo(() => index === 0, [index]);
  const isOnly = useMemo(
    () => isFirst && monthly_payees.length === 1,
    [isFirst, monthly_payees]
  );
  const isLast = useMemo(
    () => index === monthly_payees.length - 1,
    [index, monthly_payees]
  );

  const CaretIcon = open
    ? KeyboardArrowUpOutlinedIcon
    : KeyboardArrowDownOutlinedIcon;

  const onAdd = () =>
    form.setValue("monthly_payees", [...monthly_payees, payeStaffInput]);

  const onRemove = () => {
    if (isOnly) return;
    const format = monthly_payees.filter((_, key) => key !== index);
    form.reset({ monthly_payees: format });
  };

  useEffect(() => {
    if (isOnly) setOpen(true);
  }, [isOnly]);

  const basic = Number(form.watch(`monthly_payees.${index}.basic`) || 0);
  const housing = Number(form.watch(`monthly_payees.${index}.housing`) || 0);
  const transport = Number(
    form.watch(`monthly_payees.${index}.transport`) || 0
  );
  const others = Number(form.watch(`monthly_payees.${index}.others`) || 0);
  const bonus = Number(form.watch(`monthly_payees.${index}.bonus`) || 0);
  const npf = Number(form.watch(`monthly_payees.${index}.npf`) || 0);
  const nhf = Number(form.watch(`monthly_payees.${index}.nhf`) || 0);

  const grossEmolument = basic + housing + transport + others + bonus;

  const consolidatedRelief =
    grossEmolument <= 300000 ? 0 : 0.2 * grossEmolument + 200000;

  const chargeableIncome =
    grossEmolument <= 300000
      ? grossEmolument
      : grossEmolument - (npf + nhf + consolidatedRelief);

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
            PAYE Filing {index + 1}
          </Button>
          <Button onClick={onRemove} variant="text">
            <DeleteOutlineIcon />
          </Button>
        </Box>
      )}
      {open && (
        <Grid
          container
          rowSpacing={3.2}
          columnSpacing={2.4}
          sx={{ mt: "2.4rem", width: "100%", mx: "auto" }}
        >
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.2rem",
              }}
            >
              <Box
                component="img"
                src="/assets/svgs/info-gold.svg"
                alt=""
                sx={{ width: "2rem", height: "2rem" }}
              />
              <Typography
                sx={{ fontSize: "1.4rem", color: theme.palette.grey[500] }}
              >
                Convert all amounts to yearly amount
              </Typography>
            </Box>
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
              Payer ID
            </FormLabel>
            <Input
              name={`monthly_payees.${index}.staff_tax_payer_id`}
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
            <Input value={capitalize(month)} disabled />
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
              value={form.watch(`monthly_payees.${index}.state_of_residence`)}
              {...form.register(`monthly_payees.${index}.state_of_residence`)}
              errorMessage={
                form.formState.errors.monthly_payees?.[index]
                  ?.state_of_residence?.message
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
              name={`monthly_payees.${index}.basic`}
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
              name={`monthly_payees.${index}.transport`}
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
              name={`monthly_payees.${index}.housing`}
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
              NHF
            </FormLabel>
            <Input
              name={`monthly_payees.${index}.nhf`}
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
              NPF
            </FormLabel>
            <Input
              name={`monthly_payees.${index}.npf`}
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
              name={`monthly_payees.${index}.bonus`}
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
              name={`monthly_payees.${index}.others`}
              label="Enter Amount"
              form={form}
              isNumber
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel
              sx={{
                fontSize: "1.6rem",
                display: "block",
                fontWeight: 500,
                mb: "1.6rem",
                color: theme.palette.grey[800],
              }}
            >
              Gross Emolument
            </FormLabel>
            <Input
              label="Enter Amount"
              isNumber
              value={grossEmolument}
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
              Chargeable Income
            </FormLabel>
            <Input
              value={chargeableIncome}
              label="Enter Amount"
              isNumber
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
              Consolidated Relief
            </FormLabel>
            <Input
              value={consolidatedRelief}
              label="Enter Amount"
              isNumber
              disabled
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

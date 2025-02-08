import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const withholdingTaxDefaultValues = {
  date_of_payment: "",
  amount_paid: "",
  start_period_of_payment: "",
  end_period_of_payment: "",
  type_of_witholding: "",
};

export const withholdingTaxSchemaObject = yup.object({
  date_of_payment: yup.string().required("Date of payment is a required field"),
  amount_paid: yup.string().required("Amount paid is a required field"),
  start_period_of_payment: yup.string().required("Start period of payment is a required field"),
  end_period_of_payment: yup.string().required("End period of payment is a required field"),
  type_of_witholding: yup.string().required("Type of witholding is a required field"),
});

export const withholdingTaxSchema = resolveSchema({
  defaultValues: withholdingTaxDefaultValues,
  schema: withholdingTaxSchemaObject,
});

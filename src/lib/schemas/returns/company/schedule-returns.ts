import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const defaultValues = {
  development_levy_revenue_item: "Development Levy",
  development_levy_date_of_payment: "",
  development_levy_amount_paid: "",
  development_levy_receipt_number: "",
  development_levy_start_period_of_payment: "",
  development_levy_end_period_of_payment: "",
  business_premises_revenue_item: "Business Premises",
  business_premises_date_of_payment: "",
  business_premises_amount_paid: "",
  business_premises_receipt_number: "",
  business_premises_start_period_of_payment: "",
  business_premises_end_period_of_payment: "",
};

export const scheduleReturnSchemaObject = yup.object({
  development_levy_revenue_item: yup.string().required("Provide revenue item"),
  development_levy_date_of_payment: yup.string().required("Provide date of payment"),
  development_levy_amount_paid: yup.string().required("Provide amount paid"),
  development_levy_receipt_number: yup.string().required("Provide receipt number"),
  development_levy_start_period_of_payment: yup.string().required("Provide start period of payment"),
  development_levy_end_period_of_payment: yup.string().required("Provide end period of payment"),
  business_premises_revenue_item: yup.string().required("Provide revenue item"),
  business_premises_date_of_payment: yup.string().required("Provide date of payment"),
  business_premises_amount_paid: yup.string().required("Provide amount paid"),
  business_premises_receipt_number: yup.string().required("Provide receipt number"),
  business_premises_start_period_of_payment: yup.string().required("Provide start period of payment"),
  business_premises_end_period_of_payment: yup.string().required("Provide end period of payment"),
});

export const scheduleReturnSchema = resolveSchema({
  defaultValues,
  schema: scheduleReturnSchemaObject,
});

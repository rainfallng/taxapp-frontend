import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const individualAccomodationSchemaObject = yup.object({
  accommodation_type: yup
    .string()
    .required("Accommodation type is a required field"),
  ownership_type: yup.string().required("Ownership type is a required field"),
  owner_name: yup.string().required("Owner's name is a required field"),
  owner_address: yup.string().required("Owner's address is a required field"),
  owner_tax_payer_number: yup
    .string()
    .required("Owner tax payer number is a required field"),
  rent_paid: yup.string().required("Rent paid is a required field"),
  rent_paid_by_employer: yup.string().required("Rent paid by employer is a required field"),
  start_date: yup.string().required("Start date is a required field"),
  end_date: yup.string().required("End date is a required field"),
});

const individualAccomodationDefaultValues = {
  accommodation_type: "",
  ownership_type: "",
  owner_name: "",
  owner_address: "",
  owner_tax_payer_number: "",
  rent_paid: "",
  rent_paid_by_employer: "",
  start_date: "",
  end_date: "",
};

export const individualAccomodationSchema = resolveSchema({
  defaultValues: individualAccomodationDefaultValues,
  schema: individualAccomodationSchemaObject,
});

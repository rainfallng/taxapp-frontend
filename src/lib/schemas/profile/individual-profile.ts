import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

export const personalInfoSchemaObject = yup.object({
  title: yup.string(),
  marital_status: yup.string(),
  employment_status: yup.string(),
  nationality: yup.string(),
  gender: yup.string(),
  state_of_origin: yup.string(),
  lga_of_residence: yup.number().nullable(),
  state_of_residence: yup.number().nullable(),
  business_type: yup.string(),
  lcda: yup.string(),
  occupation: yup.string(),
  phone_number_1: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters"),
  email_address: yup.string().email(),
  street_number: yup.string(),
  street_name: yup.string(),
});

const personalInfoDefaultValues = {
  title: "",
  marital_status: "",
  employment_status: "",
  nationality: "",
  gender: "",
  state_of_origin: "",
  lga_of_residence: null,
  business_type: "",
  lcda: "",
  occupation: "",
  phone_number_1: "",
  email_address: "",
  street_number: "",
  street_name: "",
  state_of_residence: null,
};

export const individualProfileSchema = resolveSchema({
  defaultValues: personalInfoDefaultValues,
  schema: personalInfoSchemaObject,
});

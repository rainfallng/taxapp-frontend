import { resolveSchema } from "@/lib/utils";
import { IIndividualProfile } from "@/types/form";
import * as yup from "yup";

export const personalInfoSchemaObject = yup.object({
  first_name: yup.string(),
  last_name: yup.string(),
  middle_name: yup.string(),
  title: yup.string(),
  marital_status: yup.string(),
  employment_status: yup.string(),
  nationality: yup.string(),
  date_of_birth: yup.string(),
  gender: yup.string(),
  state_of_origin: yup.string(),
  lga: yup.number().nullable(),
  state: yup.number().nullable(),
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

const personalInfoDefaultValues: Partial<IIndividualProfile> = {
  first_name: "",
  last_name: "",
  middle_name: "",
  title: "",
  marital_status: "",
  employment_status: "",
  nationality: "",
  date_of_birth: "",
  gender: "",
  state_of_origin: "",
  lga: null,
  business_type: "",
  lcda: "",
  occupation: "",
  phone_number_1: "",
  email_address: "",
  street_number: "",
  street_name: "",
  state: null,
};

export const individualProfileSchema = resolveSchema({
  defaultValues: personalInfoDefaultValues,
  schema: personalInfoSchemaObject,
});

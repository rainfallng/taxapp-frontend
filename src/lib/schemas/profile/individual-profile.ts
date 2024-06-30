import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const personalInfoSchemaObject = yup.object({
  first_name: yup.string(),
  last_name: yup.string(),
  middle_name: yup.string(),
  title: yup.string(),
  marital_status: yup.string(),
  employment_status: yup.string(),
  nationality: yup.string(),
  place_of_birth: yup.string(),
  gender: yup.string(),
  state_of_origin: yup.string(),
  lga_of_residence: yup.string(),
  business_type: yup.string(),
  lcda: yup.string(),
  occupation: yup.string(),
  phone_number_1: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters"),
  email_address: yup.string().email(),
  house_number: yup.number(),
  street: yup.string()
  });
  
  const personalInfoDefaultValues = {
    first_name: "",
    last_name: "",
    middle_name: "",
    title: "",
    marital_status: "",
    employment_status: "",
    nationality: "",
    place_of_birth: "",
    gender: "",
    state_of_origin: "",
    lga_of_residence: "",
    business_type: "",
    lcda: "",
    occupation: "",
    phone_number_1: "",
    email_address: "",
    house_number: 0,
    street: ""
  };
  
  export const individualProfileSchema = resolveSchema({
    defaultValues: personalInfoDefaultValues,
    schema: personalInfoSchemaObject,
  });
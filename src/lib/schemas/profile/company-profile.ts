import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const defaultValues = {
  name: "",
  email: '',
  phone_number: "",
  number_of_employees: 0,
  number_of_directors: 0,
  place_of_business: "",
  street_number: "",
  street_name: "",
  lcda: "",
  state: 0,
  lga: null,
  business_type: ""
};

export const schema = yup.object({
  name: yup.string().required("Provide company name"),
  email: yup.string().email("Provide a valid email address"),
  phone_number: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters").optional(),
  number_of_employees: yup.number().default(0),
  number_of_directors: yup.number().default(0),
  place_of_business: yup.string(),
  street_number: yup.string(),
  street_name: yup.string(),
  lga: yup.number().nullable(),
  state: yup.number().nullable(),
  lcda: yup.string(),
  business_type: yup.string(),
});

export const companyProfileSchema = resolveSchema({
  defaultValues,
  schema,
});

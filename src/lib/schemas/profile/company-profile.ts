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
  lga: 0,
  business_type: ""
};

export const schema = yup.object({
  name: yup.string().required("Provide company name"),
  email: yup.string().email("Provide a valid email address"),
  phone_number: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters").optional(),
  number_of_employees: yup.number().optional().default(0),
  number_of_directors: yup.number().optional().default(0),
  place_of_business: yup.string().optional(),
  street_number: yup.string().optional(),
  street_name: yup.string().optional(),
  lga: yup.number().optional(),
  state: yup.number().optional(),
  lcda: yup.string().optional(),
  business_type: yup.string().optional(),
});

export const companyProfileSchema = resolveSchema({
  defaultValues,
  schema,
});

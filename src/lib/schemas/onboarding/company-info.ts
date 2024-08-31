import * as yup from "yup";
import { resolveSchema } from "../../utils";
import { useStore } from "@/store";

const companyInfoSchemaObject = yup.object({
  state: yup.string().required("Select a state"),
  lga: yup.string().required("Select a LGA"),
  street_number: yup.number().required("Street number is a required field"),
  street_name: yup.string().required("Street name is a required field"),
  lcda: yup.string().required("LCDA is required"),
  tax_station: yup.string().required("Tax station is a required field"),
  business_type: yup.string().required("Business type is a required field"),
  email_address: yup.string().email().required("Email is a required field"),
  phone_number: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters")
    .required("Phone number is a required field"),
  place_of_business: yup
    .string()
    .required("Place of business is a required field"),
});

const { user } = useStore.getState()

const companyInfoDefaultValues = {
  state: "",
  lga: "",
  street_number: 0,
  street_name: "",
  lcda: "",
  tax_station: "",
  business_type: "",
  place_of_business: "",
  email_address: user.email,
  phone_number: user.phone
};

export const companyInfoSchema = resolveSchema({
  defaultValues: companyInfoDefaultValues,
  schema: companyInfoSchemaObject,
});

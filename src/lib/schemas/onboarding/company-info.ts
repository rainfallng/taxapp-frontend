import * as yup from "yup";
import { resolveSchema } from "../../utils";

const companyInfoSchemaObject = yup.object({
  name: yup.string().required("Name is a required field"),
  state: yup.string().required("Select a state"),
  lga: yup.string().required("Select a LGA"),
  house_number: yup.number().required("House number is a required field"),
  street: yup.string().required("Street is a required field"),
  lcda: yup.string().required("LCDA is required"),
  tax_station: yup.string().required("Tax station is a required field"),
  business_type: yup.string().required("Business type is a required field"),
  place_of_business: yup
    .string()
    .required("Place of business is a required field"),
});

const companyInfoDefaultValues = {
  state: "",
  lga: "",
  house_number: 0,
  street: "",
  lcda: "",
  tax_station: "",
  business_type: "",
  place_of_business: "",
};

export const companyInfoSchema = resolveSchema({
  defaultValues: companyInfoDefaultValues,
  schema: companyInfoSchemaObject,
});

import * as yup from "yup";
import { getStore, resolveSchema } from "../../utils";
import { capitalize } from "@mui/material";
import { SliceType } from "@/store";

const { tenantName } = getStore() as SliceType

const personalInfoSchemaObject = yup.object({
  title: yup.string().required("Select a title"),
  marital_status: yup.string().required("Select marital status"),
  employment_status: yup.string().required("Select employment status"),
  business_sector: yup.string().required("Select business sector"),
  nationality: yup.string().required("Nationality is a required field"),
  place_of_birth: yup.string().required("Select a state"),
  gender: yup.string().required("Select a gender"),
  state_of_origin: yup.string().required("Select a state"),
  state_of_residence: yup.string().required("Select a state"),
  lga_of_residence: yup.string().required("Select a LGA"),
  tax_station: yup.string().optional(),
  business_type: yup
    .string()
    .when("employment_status", ([employmentStatus], schema) =>
      employmentStatus === capitalize("SELFEMPLOYED")
        ? schema.optional()
        : schema.required("Select a business type")
    ),
  lcda:
    tenantName === "fct"
      ? yup.string()
      : yup.string().required("LCDA is required"),
  occupation: yup.string().required("Occupation is required"),
  phone_number_1: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters")
    .required("Phone number is a required field"),
  email_address: yup.string().email().required("Email is a required field"),
  is_public_servant: yup.boolean(),
  lasra: yup.string().optional(),
  house_number: yup.number().required("House number is a required field"),
  street: yup.string().required("Street is a required field"),
});

const personalInfoDefaultValues = {
  title: "",
  marital_status: "",
  gender: "",
  state_of_origin: "",
  place_of_birth: "",
  phone_number_1: "",
  email_address: "",
  lga_of_residence: "",
  lcda: "",
  employment_status: "",
  business_sector: "",
  occupation: "",
  nationality: "",
  business_type: "",
  tax_station: "",
  is_public_servant: false,
  lasra: "",
  house_number: 0,
  street: "",
  state_of_residence: "",
};

export const personalInfoSchema = resolveSchema({
  defaultValues: personalInfoDefaultValues,
  schema: personalInfoSchemaObject,
});

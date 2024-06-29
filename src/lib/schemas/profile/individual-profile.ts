import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const personalInfoSchemaObject = yup.object({
    name: yup.string().required("Name is a required field"),
    sector: yup.string().required("Sector is a required field"),
    city: yup.string().required("City is a required field"),
    address: yup.string().required("Address is a required field"),
    has_cac: yup.boolean().nullable().required("Choose an option"),
  });
  
  const personalInfoDefaultValues = {
  };
  
  export const companyInfoSchema = resolveSchema({
    defaultValues: personalInfoDefaultValues,
    schema: personalInfoSchemaObject,
  });
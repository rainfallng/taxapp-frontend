import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const identificationSchemaObject = yup.object({
  company_name: yup.string().required("Provide company name"),
  rc_number: yup.string().required("Provide cac id number"),
});

const identificationDefaultValues = {
  company_name: "",
  rc_number: "",
};

export const identificationSchema = resolveSchema({
  defaultValues: identificationDefaultValues,
  schema: identificationSchemaObject,
});

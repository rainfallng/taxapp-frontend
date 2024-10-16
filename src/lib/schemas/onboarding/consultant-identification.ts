import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const identificationSchemaObject = yup.object({
  id_type: yup.string().required("Select identification type"),
  id_number: yup.string().required("Provide identification number"),
});

const identificationDefaultValues = {
  id_type: "",
  id_number: "",
};

export const identificationSchema = resolveSchema({
  defaultValues: identificationDefaultValues,
  schema: identificationSchemaObject,
});

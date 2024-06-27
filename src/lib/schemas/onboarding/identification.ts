import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const identificationSchemaObject = yup.object({
  id_type: yup.string().required("Select identification type"),
  id_number: yup.string().required("Provide identification number"),
  date_of_birth: yup.string().required("Select date of birth"),
});

const identificationDefaultValues = {
  id_type: "",
  id_number: "",
  date_of_birth: "",
};

export const identificationSchema = resolveSchema({
  defaultValues: identificationDefaultValues,
  schema: identificationSchemaObject,
});

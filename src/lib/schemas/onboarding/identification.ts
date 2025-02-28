import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const identificationSchemaObject = yup.object({
  id_type: yup.string().required("Select identification type"),
  id_number: yup
    .string()
    .required("Provide identification number")
    .when("id_type", ([id_type], schema) => {
      return id_type !== "CAC"
        ? schema
            .min(11, "Identification number should be 11 characters long")
            .max(11, "Identification number should be 11 characters long")
        : schema
            .min(7, "Identification number should be 7 characters long")
            .max(7, "Identification number should be 7 characters long");
    }),
  date_of_birth: yup
    .string()
    .required("Provide date of birth")
    .test(
      "date-of-birth",
      "You must be at least 18 years old",
      (value) => new Date().getFullYear() - new Date(value).getFullYear() > 18
    ),
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

import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const consultantRequestFormSchemaObject = yup.object({
  id_type: yup.string(),
  id_number: yup.string(),
  otp: yup.string(),
  email: yup.string(),
  tax_id: yup.string(),
  first_name: yup.string(),
  last_name: yup.string(),
  phone_number: yup.string(),
});

const consultantRequestFormDefaultValues = {
  id_type: "",
  id_number: "",
  otp: "",
  email: "",
  tax_id: "",
  first_name: "",
  last_name: "",
  phone_number: "",
};

export const consultantRequestFormSchema = resolveSchema({
  defaultValues: consultantRequestFormDefaultValues,
  schema: consultantRequestFormSchemaObject,
});

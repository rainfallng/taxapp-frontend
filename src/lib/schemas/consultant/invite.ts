import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const inviteConsultantSchemaObject = yup.object({
    email: yup.string().email().required('Email is required'),
    phone: yup
      .string()
      .max(15, "Phone number cannot be more than 15 characters")
      .required("Phone number is a required field"),
})

const inviteConsultantDefaultValues = { email: '', phone: '+234' }

export const inviteConsultantSchema = resolveSchema({
    defaultValues: inviteConsultantDefaultValues,
    schema: inviteConsultantSchemaObject,
  });
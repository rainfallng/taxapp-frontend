import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

export const projectionReturnInput = {
  tax_payer_id: "",
  surname: "",
  first_name: "",
  middle_name: "",
  designation: "",
  gross_income: "",
  staff_phone_number: "",
  staff_email_address: "",
  nationality: 0,
};

export const projectionReturnSchemaObject = yup.object({
  projection_returns: yup
    .array()
    .of(
      yup.object({
        tax_payer_id: yup.string().required("Provide identification"),
        surname: yup.string().required("Provide surname"),
        first_name: yup.string().required("Provide first name"),
        middle_name: yup.string().required("Provide middle name"),
        designation: yup.string().required("Provide designation"),
        gross_income: yup.string().required("Provide gross income"),
        staff_phone_number: yup.string().required("Provide phone number"),
        staff_email_address: yup.string().required("Provide email address"),
        nationality: yup
          .number()
          .typeError("Field must be a number")
          .required("Provide nationality"),
      })
    )
    .required("At least one staff entry is required"),
});

const projectionReturnDefaultValues = {
  projection_returns: [projectionReturnInput],
};

export const projectionReturnSchema = resolveSchema({
  defaultValues: projectionReturnDefaultValues,
  schema: projectionReturnSchemaObject,
});

import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

export const annualReturnInput = {
  tax_payer_id: "",
  surname: "",
  first_name: "",
  middle_name: "",
  designation: "",
  gross_income: "",
  staff_phone_number: "",
  staff_email_address: "",
  number_of_months: 0,
  development_levy: "",
  chargeable_income: "",
  annual_tax_paid: "",
  nationality: 0,
};

export const annualReturnSchemaObject = yup.object({
  annual_returns: yup
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
        number_of_months: yup
          .number()
          .typeError("Field must be a number")
          .required("Provide number of months"),
        development_levy: yup.string().required("Provide development levy"),
        chargeable_income: yup.string().required("Provide chargeable income"),
        annual_tax_paid: yup.string().required("Provide annual tax paid"),
        nationality: yup
          .number()
          .typeError("Field must be a number")
          .required("Provide nationality"),
      })
    )
    .required("At least one staff entry is required"),
});

const annualReturnDefaultValues = {
  annual_returns: [annualReturnInput],
};

export const annualReturnSchema = resolveSchema({
  defaultValues: annualReturnDefaultValues,
  schema: annualReturnSchemaObject,
});

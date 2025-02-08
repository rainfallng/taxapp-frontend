import { resolveSchema } from "@/lib/utils";
import { AddCompanyStaffReturn } from "@/types/returns";
import * as yup from "yup";

export const payeStaffInput = {
  staff_tax_payer_id: "",
  basic: 0,
  transport: 0,
  housing: 0,
  others: 0,
  bonus: 0,
  npf: 0,
  nhf: 0,
  state_of_residence: 0,
};

export const payeSchemaObject = yup.object({
  monthly_payees: yup
    .array()
    .of(
      yup.object({
        staff_tax_payer_id: yup
          .string()
          .required("Staff tax payer ID is a required field"),
        basic: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
        housing: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
        transport: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
        others: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
        bonus: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
        state_of_residence: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
        npf: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
        nhf: yup
          .number()
          .typeError("Field must be a number")
          .required("Field is required"),
      })
    )
    .required("At least one staff entry is required"),
});

const payeDefaultValues: AddCompanyStaffReturn = {
  monthly_payees: [payeStaffInput],
};

export const payeSchema = resolveSchema({
  defaultValues: payeDefaultValues,
  schema: payeSchemaObject,
});

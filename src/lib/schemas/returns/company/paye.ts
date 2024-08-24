import { resolveSchema } from "@/lib/utils";
import { AddCompanyStaffReturn } from "@/types/returns";
import * as yup from "yup";

export const payeStaffInput = {
  tin: "",
  name: "",
  designation: "",
  basic: null,
  housing: null,
  transport: null,
  others: null,
  bonus: null,
  state_of_residence: null,
};

const payeSchemaObject = yup.object({
  returns: yup
    .array()
    .of(
      yup.object({
        tin: yup.string().required("TIN is a required field"),
        name: yup.string().required("Name is a required field"),
        designation: yup.string().required("Designation is a required field"),
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
      })
    )
    .required("At least one staff entry is required"),
});

const payeDefaultValues: { returns: AddCompanyStaffReturn[] } = {
  returns: [payeStaffInput],
};

export const payeSchema = resolveSchema({
  defaultValues: payeDefaultValues,
  schema: payeSchemaObject,
});

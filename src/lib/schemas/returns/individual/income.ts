import { resolveSchema } from "@/lib/utils";
import * as yup from "yup";

const individualIncomeSchemaObject = yup.object({
  salary: yup.string().required("Salary is a required field"),
  commission: yup.string().required("Commission is a required field"),
  trade_income: yup.string().required("Trade income is a required field"),
  allowance: yup.string().required("Allowance is a required field"),
  pension: yup.string().required("Pension is a required field"),
  annuity: yup.string().required("Annuity is a required field"),
  gratuities: yup.string().required("Gratuities is a required field"),
  foreign_income: yup.string().required("Foreign income is a required field"),
  dividend: yup.string().required("Dividend is a required field"),
  interest: yup.string().required("Interest is a required field"),
  rent: yup.string().required("Rent is a required field"),
  statement_of_income: yup
    .string()
    .required("Statement of income is a required field"),
  other_incomes: yup.array().of(
    yup.object({
      name: yup.string().required("Provide income name"),
      details: yup.string().optional(),
      value: yup.string().required("Provide income value"),
    })
  ),
});

const individualIncomeDefaultValues = {
  salary: "",
  commission: "",
  trade_income: "",
  allowance: "",
  pension: "",
  annuity: "",
  gratuities: "",
  foreign_income: "",
  dividend: "",
  interest: "",
  rent: "",
  statement_of_income: "test",
  other_incomes: [],
};

export const individualIncomeSchema = resolveSchema({
  defaultValues: individualIncomeDefaultValues,
  schema: individualIncomeSchemaObject,
});

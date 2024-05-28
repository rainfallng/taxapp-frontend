import * as yup from "yup";
import { getStore, resolveSchema } from "../../utils";
import { IIndividualOnboarding } from "@/types";

const store = getStore() as { individualOnboarding: IIndividualOnboarding };

const employmentDetailsSchemaObject = yup.object({
  occupation: yup.string().required("Occupation is a required field"),
  basic_salary: yup.number().typeError('Field must be a number').required("Basic salary is a required field"),
  gross_income: yup.number().typeError('Field must be a number').required("Gross income is a required field"),
  annual_tax_paid: yup.number().typeError('Field must be a number').required("Annual tax paid is a required field"),
  pension: yup.number().typeError('Field must be a number').required("Pension is a required field"),
  annual_total_income: yup.number().typeError('Field must be a number').required("Annual total income is a required field"),
  nhis: yup.number().typeError('Field must be a number').required("NHIS is a required field"),
  nsitf: yup.number().typeError('Field must be a number').required("NSITF is a required field"),
  nhf: yup.number().typeError('Field must be a number').required("NHF is a required field"),
  utitlity_allowance: yup.number().typeError('Field must be a number').required("Utility allowance is a required field"),
  arrears: yup.number().typeError('Field must be a number').required("Arrears is a required field"),
  life_assurance: yup.number().typeError('Field must be a number').required("Life assurance is a required field"),
  thirteenth_month_salary: yup.number().typeError('Field must be a number').required("13th month salary is a required field"),
  gratuity: yup.number().typeError('Field must be a number').required("Gratuity is a required field"),
  medical_allowance: yup.number().typeError('Field must be a number').required("Medical allowance is a required field"),
  housing_allowance: yup.number().typeError('Field must be a number').required("Housing allowance is a required field"),
  transport_allowance: yup.number().typeError('Field must be a number').required("Transport allowance is a required field"),
  leave_allowance: yup.number().typeError('Field must be a number').required("Leave allowance is a required field"),
  one_off_allowance: yup.number().typeError('Field must be a number').required("One-Off allowance is a required field"),
  consolidated_relief_allowance: yup.number().typeError('Field must be a number').required("Consolidated relief allowance is a required field"),
});

const employmentDetailsDefaultValues = {
  occupation: store?.individualOnboarding?.occupation ?? "",
  basic_salary: store?.individualOnboarding?.basic_salary ?? null,
  gross_income: store?.individualOnboarding?.gross_income ?? null,
  annual_tax_paid: store?.individualOnboarding?.annual_tax_paid ?? null,
  annual_total_income: store?.individualOnboarding?.annual_total_income ?? null,
  pension: store?.individualOnboarding?.pension ?? null,
  nhis: store?.individualOnboarding?.nhis ?? null,
  nsitf: store?.individualOnboarding?.nsitf ?? null,
  nhf: store?.individualOnboarding?.nhf ?? null,
  utitlity_allowance: store?.individualOnboarding?.utitlity_allowance ?? null,
  arrears: store?.individualOnboarding?.arrears ?? null,
  life_assurance: store?.individualOnboarding?.life_assurance ?? null,
  thirteenth_month_salary: store?.individualOnboarding?.thirteenth_month_salary ?? null,
  gratuity: store?.individualOnboarding?.gratuity ?? null,
  medical_allowance: store?.individualOnboarding?.medical_allowance ?? null,
  housing_allowance: store?.individualOnboarding?.housing_allowance ?? null,
  transport_allowance: store?.individualOnboarding?.transport_allowance ?? null,
  leave_allowance: store?.individualOnboarding?.leave_allowance ?? null,
  one_off_allowance: store?.individualOnboarding?.one_off_allowance ?? null,
  consolidated_relief_allowance: store?.individualOnboarding?.consolidated_relief_allowance ?? null,
};

export const employmentDetailsSchema = resolveSchema({
  defaultValues: employmentDetailsDefaultValues,
  schema: employmentDetailsSchemaObject,
});

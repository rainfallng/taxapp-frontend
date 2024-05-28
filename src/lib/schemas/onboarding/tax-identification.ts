import * as yup from "yup";
import { getStore, resolveSchema } from "../../utils";
import { IIndividualOnboarding } from "@/types";

const store = getStore() as { individualOnboarding: IIndividualOnboarding };

const individualTaxIdentificationSchemaObject = yup.object({
  last_name: yup.string().required("Last name is a required field"),
  middle_name: yup.string().required("Middle name is a required field"),
  first_name: yup.string().required("First name is a required field"),
  tin: yup.string().required("TIN is a required field"),
});

const individualTaxIdentificationDefaultValues = {
  last_name: store?.individualOnboarding?.last_name ?? "",
  middle_name: store?.individualOnboarding?.middle_name ?? "",
  first_name: store?.individualOnboarding?.first_name ?? "",
  tin: store?.individualOnboarding?.tin ?? "",
};

export const individualTaxIdentificationSchema = resolveSchema({
  defaultValues: individualTaxIdentificationDefaultValues,
  schema: individualTaxIdentificationSchemaObject,
});

const companyTaxIdentificationSchemaObject = yup.object({
  hasTin: yup.boolean().nullable().required("Choose an option"),
  tin: yup.string().when("hasTin", {
    is: true,
    then: () => yup.string().required("TIN is a required field"),
  }),
});

const companyTaxIdentificationDefaultValues: {
    hasTin: null | boolean;
    tin?: string;
} = {
  hasTin: true,
  tin: store?.individualOnboarding?.tin ?? "",
};

export const companyTaxIdentificationSchema = resolveSchema({
  defaultValues: companyTaxIdentificationDefaultValues,
  schema: companyTaxIdentificationSchemaObject,
});

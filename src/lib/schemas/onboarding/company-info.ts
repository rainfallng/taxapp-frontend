import * as yup from "yup";
import { getStore, resolveSchema } from "../../utils";
import { ICompanyOnboarding } from "@/types";

const store = getStore() as { companyOnboarding: ICompanyOnboarding };

const companyInfoSchemaObject = yup.object({
  name: yup.string().required("Name is a required field"),
  sector: yup.string().required("Sector is a required field"),
  city: yup.string().required("City is a required field"),
  address: yup.string().required("Address is a required field"),
  has_cac: yup.boolean().nullable().required("Choose an option"),
});

const companyInfoDefaultValues = {
  name: store?.companyOnboarding?.name ?? "",
  sector: store?.companyOnboarding?.sector ?? "",
  city: store?.companyOnboarding?.city ?? "",
  address: store?.companyOnboarding?.address ?? "",
  has_cac: store?.companyOnboarding?.has_cac ?? null,
};

export const companyInfoSchema = resolveSchema({
  defaultValues: companyInfoDefaultValues,
  schema: companyInfoSchemaObject,
});

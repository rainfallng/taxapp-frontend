import * as yup from "yup";
import { getStore, resolveSchema } from "../../utils";
import { IIndividualOnboarding } from "@/types";

const store = getStore() as { individualOnboarding: IIndividualOnboarding };

const contactInfoSchemaObject = yup.object({
  phone_number_1: yup.string().required("Phone number is a required field"),
  phone_number_2: yup.string(),
  email_address: yup
    .string()
    .email()
    .required("First name is a required field"),
});

const contactInfoDefaultValues = {
  email_address: store?.individualOnboarding?.email_address ?? "",
  phone_number_1: store?.individualOnboarding?.phone_number_1 ?? "",
  phone_number_2: store?.individualOnboarding?.phone_number_2 ?? "",
};

export const contactInfoSchema = resolveSchema({
  defaultValues: contactInfoDefaultValues,
  schema: contactInfoSchemaObject,
});

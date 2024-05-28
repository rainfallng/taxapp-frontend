import * as yup from "yup";
import { getStore, resolveSchema } from "../../utils";
import { IIndividualOnboarding } from "@/types";

const store = getStore() as { individualOnboarding: IIndividualOnboarding };

const taxHistorySchemaObject = yup.object({
  first_time_filling: yup.boolean().nullable().required("Choose an option"),
  past_tax_filling: yup.string().when("first_time_filling", {
    is: true,
    then: () => yup.string().required("Field is required"),
    otherwise: () => yup.string(),
  }),
});

const taxHistoryDefaultValues: {
  first_time_filling: boolean | null;
  past_tax_filling?: string;
} = {
  first_time_filling: store?.individualOnboarding?.first_time_filling ?? null,
  past_tax_filling: store?.individualOnboarding?.past_tax_filling ?? "",
};

export const taxHistorySchema = resolveSchema({
  defaultValues: taxHistoryDefaultValues,
  schema: taxHistorySchemaObject,
});

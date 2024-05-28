import * as yup from "yup";
import { getStore, resolveSchema } from "../../utils";
import { IIndividualOnboarding } from "@/types";

const store = getStore() as { individualOnboarding: IIndividualOnboarding };

const personalInfoSchemaObject = yup.object({
  last_name: yup.string().required("Last name is a required field"),
  middle_name: yup.string().required("Middle name is a required field"),
  first_name: yup.string().required("First name is a required field"),
  title: yup.string().required("Select a title"),
  marital_status: yup.string().required("Select marital status"),
  date_of_birth: yup.string().required("Select date of birth"),
  place_of_birth: yup.string().required("Select a state"),
  gender: yup.string().required("Select a gender"),
  state_of_origin: yup.string().required("Select a state"),
  house_number: yup.number().typeError('Field must be a number').required("House number is a required field"),
  street: yup.string().required("Street is a required field"),
  state_of_residence: yup.string().required("Select state of residence"),
  lga_of_residence: yup.string().required("Select local government"),
});

const personalInfoDefaultValues = {
  last_name: store?.individualOnboarding?.last_name ?? "",
  middle_name: store?.individualOnboarding?.middle_name ?? "",
  first_name: store?.individualOnboarding?.first_name ?? "",
  title: store?.individualOnboarding?.title ?? "",
  marital_status: store?.individualOnboarding?.marital_status ?? "",
  date_of_birth: store?.individualOnboarding?.date_of_birth ?? "",
  gender: store?.individualOnboarding?.gender ?? "",
  state_of_origin: store?.individualOnboarding?.state_of_origin ?? "",
  house_number: store?.individualOnboarding?.house_number ?? null,
  street: store?.individualOnboarding?.street ?? "",
  state_of_residence: store?.individualOnboarding?.state_of_residence ?? "",
  place_of_birth: store?.individualOnboarding?.place_of_birth ?? "",
  lga_of_residence: store?.individualOnboarding?.lga_of_residence ?? "",
};

export const personalInfoSchema = resolveSchema({
  defaultValues: personalInfoDefaultValues,
  schema: personalInfoSchemaObject,
});

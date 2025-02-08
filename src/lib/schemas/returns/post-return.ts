import * as yup from "yup";
import { resolveSchema } from "../../utils";

export const postReturnSchemaObject = yup.object({
  tin: yup.string().required("Provide identification"),
  year_in_view: yup.string().required("Select a year"),
});

const postReturnDefaultValues = {
  tin: "",
  year_in_view: "",
};

export const postReturnSchema = resolveSchema({
  defaultValues: postReturnDefaultValues,
  schema: postReturnSchemaObject,
});

import * as yup from "yup";
import { resolveSchema } from "../../utils";

export const postReturnSchemaObject = yup.object({
  year_in_view: yup.string().required("Select a year"),
});

const postReturnDefaultValues = {
  year_in_view: "",
};

export const postReturnSchema = resolveSchema({
  defaultValues: postReturnDefaultValues,
  schema: postReturnSchemaObject,
});

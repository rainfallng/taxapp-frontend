import * as yup from "yup";
import { resolveSchema } from "../utils";
import { IRegister, UserType } from "@/types";

const schema = yup.object({
  email: yup.string().email().required("Email is a required field"),
  password1: yup
    .string()
    .required("Password is a required field")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%_*?&])[A-Za-z\d@$!%_*?&]{8,}$/,
      "Password must contain 8 characters, one Uppercase, one Lowercase, one number and one special case character"
    ),
  password2: yup
    .string()
    .required("Password is a required field")
    .when("password1", ([password1], schema) => {
      return password1
        ? schema.oneOf([yup.ref("password")], "Passwords do not match")
        : schema;
    }),
  phone: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters")
    .required("Phone number is a required field"),
  user_type: yup
    .string()
    .oneOf(
      [UserType.INDIVIDUAL, UserType.COMPANY],
      "Taxpayer must be one of the following values: Individual, Company"
    )
    .required("This field is required"),
});

const defaultValues: IRegister = {
  email: "",
  password1: "",
  password2: "",
  phone: "",
  user_type: "individual",
};

export const registerSchema = resolveSchema({ defaultValues, schema });

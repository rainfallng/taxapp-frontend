import * as yup from "yup";
import { resolveSchema } from "../utils";
import { IRegister, UserType } from "@/types";

const schema = yup.object({
  email: yup.string().email().required("Email is a required field"),
  password1: yup.string().required("Password is a required field"),
  password2: yup.string().required("Password is a required field"),
  phone: yup
    .string()
    .max(15, "Phone number cannot be more than 15 characters")
    .required("Phone number is a required field"),
  user_type: yup
    .string()
    .oneOf(Object.values(UserType))
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

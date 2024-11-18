import * as yup from "yup";
import { resolveSchema } from "../utils";
import { IRegister, UserType } from "@/types";

const schema = yup.object({
  email: yup.string().email().required("Email is a required field"),
  password1: yup
    .string()
    .required("Password is a required field")
    .matches(
      /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}$/,
      "Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  password2: yup
    .string()
    .required("Password is a required field")
    .oneOf([yup.ref("password")], "Passwords do not match"),
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

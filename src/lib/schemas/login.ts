import * as yup from "yup";
import { resolveSchema } from "../utils";
import { ILogin } from "@/types";

const schema = yup.object({
  email: yup.string().email().required("Email is a required field"),
  password: yup.string().required("Password is a required field"),
});

const defaultValues: ILogin = {
  email: "",
  password: "",
};

export const loginSchema = resolveSchema({ defaultValues, schema });

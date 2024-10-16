import * as yup from "yup";
import { resolveSchema } from "../utils";
import { IResetPassword } from "@/types";

const schema = yup.object({
  password1: yup.string().required("Password is a required field"),
  password2: yup.string().required("Password is a required field"),
});

const defaultValues: Omit<IResetPassword, "token"> = {
  password1: "",
  password2: "",
};

export const resetPasswordSchema = resolveSchema({ defaultValues, schema });

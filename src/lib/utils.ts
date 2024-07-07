import { STORAGE_NAME, SliceType } from "@/store";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import ls from "localstorage-slim";
import { FieldValues, Path, UseFormSetError } from "react-hook-form";
import { AnyObject, ObjectSchema } from "yup";

ls.config.storage = sessionStorage;

export const setLS = (key: string, value: unknown) => {
  return ls.set(key, value, { encrypt: true });
};

export const getLS = <T>(key: string): T => {
  return ls.get(key, { decrypt: true }) as T;
};

export const removeLS = (key: string) => {
  return ls.remove(key);
};

export const clearLS = () => {
  return ls.clear();
};

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const getStore = (): unknown => {
  const storage: { state: SliceType } = getLS(STORAGE_NAME);

  return storage?.state || {};
};

export const resolveSchema = <DefaultValues extends AnyObject>({
  defaultValues,
  schema,
}: {
  defaultValues: DefaultValues;
  schema: ObjectSchema<DefaultValues>;
}) => ({ defaultValues, resolver: yupResolver(schema) });

export const handleFormErrors = <T extends FieldValues>(
  error: AxiosError<{ [message: string]: string | string[] }>,
  setError: UseFormSetError<T>
) => {
  const errorData = error.response?.data;
  if (error.response?.status === 400 && errorData) {
    const errorsObj = errorData?.errors ?? errorData;
    Object.entries(errorsObj).forEach(([key, val]) => {
      const errMsg = Array.isArray(val) ? val[0] : val;
      if (Object.keys(errorsObj).includes(key))
        setError(key as Path<T>, {
          type: "manual",
          message: errMsg,
        });
    });
  }
};

export const handleFormToastErrors = (
  error: AxiosError<{ [message: string]: string | string[] }>,
  message: string = ""
) =>
  error.response?.data?.non_field_errors?.[0] ||
  (error.response?.data?.message as string) ||
  typeof error.response?.data === "object"
    ? Object.values(error.response?.data ?? {})?.[0]?.[0]
    : message;

export const getValue = (value?: string | number) => value || "--";

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

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
) => {
  console.log({ error })
  const errorData = error.response?.data;
  if (errorData?.message) return errorData?.message as string;
  if (error?.response?.status === 400 && errorData?.errors)
    return Object.values(errorData.errors)?.[0][0];
  const err = Object.values(errorData ?? {})?.[0];
  if (err) {
    return Array.isArray(err) ? err?.[0] : err;
  }
  return message;
};

export const getValue = (value?: string | number) => value || "--";

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const onDownloadBlob = (blob: Blob, filename: string) => {
  const blobURL =
    window.URL && window.URL.createObjectURL
      ? window.URL.createObjectURL(blob)
      : window.webkitURL.createObjectURL(blob);
  const tempLink = document.createElement("a");
  tempLink.style.display = "none";
  tempLink.href = blobURL;
  tempLink.setAttribute("download", filename);

  if (typeof tempLink.download === "undefined") {
    tempLink.setAttribute("target", "_blank");
  }

  document.body.appendChild(tempLink);
  tempLink.click();

  setTimeout(function () {
    document.body.removeChild(tempLink);
    window.URL.revokeObjectURL(blobURL);
  }, 200);
};

export const onDowload = async (url: string, filename: string) => {
  const response = await fetch(url);
  const blob = await response.blob();
  onDownloadBlob(blob, filename);
};

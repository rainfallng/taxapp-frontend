import { SxProps, Theme } from "@mui/material";
import {
  DatePickerProps as MuiDatePickerProps,
  DatePicker as MuiDatePicker,
  PickerValidDate,
  DateValidationError,
} from "@mui/x-date-pickers";
import HelperText from "./helper-text";
import { UseFormReturn, Path, FieldValues, PathValue } from "react-hook-form";
import dayjs from "dayjs";

export interface DatePickerProps<T extends FieldValues>
  extends MuiDatePickerProps<PickerValidDate> {
  error?: boolean;
  helperText?: string;
  errorMessage?: string;
  form?: UseFormReturn<T>;
  name?: Path<T>;
  validationError?: DateValidationError;
}

const createStyles: <T extends FieldValues>(
  props: DatePickerProps<T>
) => SxProps<Theme> = (props) => ({
  width: "100%",
  fontSize: "1.6rem",
  "& .MuiOutlinedInput-root, & .MuiInputLabel-root": { fontSize: "1.6rem" },
  "& > div": { height: "100%" },
  "& fieldset": {
    borderColor: (theme) => props?.form?.formState?.errors?.[props?.name]?.message ? theme.palette.error.main : theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

const DatePicker = <T extends FieldValues>({
  sx,
  errorMessage,
  helperText,
  form,
  error,
  name,
  value,
  onChange,
  format,
  validationError,
  ...props
}: DatePickerProps<T>) => {
  const styles = createStyles<T>({ sx, form, name, ...props });

  const formValue = name && form?.watch(name) ? dayjs(form?.watch(name)) : null;
  const formError = name
    ? (form?.formState?.errors?.[name]?.message as string)
    : undefined;

  const hasError = error || Boolean(errorMessage) || Boolean(formError);

  return (
    <>
      <MuiDatePicker
        sx={styles}
        value={value ?? formValue}
        onChange={(fieldValue) => {
          const value = format ? fieldValue?.format?.(format) : fieldValue;
          if (onChange)
            return onChange(fieldValue, {
              validationError: validationError ?? null,
            });
          if (name) form?.setValue?.(name, value as PathValue<T, Path<T>>);
        }}
        {...props}
      />
      <HelperText error={hasError} message={helperText || errorMessage || formError} />
    </>
  );
};

export default DatePicker;

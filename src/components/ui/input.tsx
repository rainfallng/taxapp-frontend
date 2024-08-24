import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import { useState } from "react";
import { FieldValues, UseFormReturn, Path, PathValue } from "react-hook-form";

export interface InputProps<T extends FieldValues>
  extends StandardTextFieldProps {
  errorMessage?: string;
  form?: UseFormReturn<T>;
  name?: Path<T>;
  isNumber?: boolean;
}

const createStyles: (props: TextFieldProps) => SxProps<Theme> = (props) => ({
  width: "100%",
  fontSize: "1.6rem",
  "& .MuiOutlinedInput-root": { fontSize: "1.6rem" },
  "& > div": { height: "100%" },
  "& fieldset": {
    borderColor: (theme) => theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

const Input = <T extends FieldValues>({
  sx,
  type: defaultType,
  errorMessage,
  form,
  onChange,
  name,
  value: propValue,
  isNumber,
  ...props
}: InputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = createStyles({ sx, ...props });
  const type =
    defaultType === "password" && showPassword ? "text" : defaultType;

  const formValue = name ? form?.watch(name) : undefined;
  const formError = name
    ? (form?.getFieldState?.(name)?.error?.message as string)
    : undefined;

  const value =
    (propValue as string | undefined) ?? (formValue as string | undefined);

  return (
    <TextField
      type={type}
      sx={styles}
      InputLabelProps={{
        ...props?.InputLabelProps,
        sx: {
          ...props?.InputLabelProps?.sx,
          fontSize: "1.6rem",
        },
      }}
      error={Boolean(errorMessage) || Boolean(formError) || props.error}
      helperText={errorMessage || formError || props.helperText}
      FormHelperTextProps={{
        ...props?.FormHelperTextProps,
        sx: {
          ...props?.FormHelperTextProps?.sx,
          fontSize: "1rem",
        },
      }}
      InputProps={{
        ...(defaultType === "password" && {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }),
      }}
      name={name}
      value={isNumber && value ? Number(value).toLocaleString() : value}
      onChange={(e) => {
        const formattedValue = isNumber
          ? e.target.value.replace(/,/g, "")
          : e.target.value;
        if (isNumber && Number.isNaN(Number(formattedValue))) return;
        if (onChange) return onChange(e);
        if (name)
          form?.setValue?.(name, formattedValue as PathValue<T, Path<T>>);
      }}
      {...props}
    />
  );
};

export default Input;

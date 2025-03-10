import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  IconButton,
  InputAdornment,
  StandardTextFieldProps,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import { useState } from "react";
import {
  FieldValues,
  UseFormReturn,
  Path,
  PathValue,
  get,
} from "react-hook-form";
import HelperText from "./helper-text";

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
    ? get(form?.formState?.errors, name)?.message
    : undefined;

  const value =
    (propValue as string | undefined) ?? (formValue as string | undefined);

  const hasError = Boolean(errorMessage) || Boolean(formError) || props.error;

  return (
    <Box width="100%">
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
        error={hasError}
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
      <HelperText error={hasError} message={errorMessage || formError || props.helperText} />
    </Box>
  );
};

export default Input;

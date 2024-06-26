import { Box, FormHelperText, SxProps, useTheme } from "@mui/material";
import { forwardRef, useState } from "react";
import { UseFormReturn, Path, FieldValues, PathValue } from "react-hook-form";
import ReactPhoneInput, {
  DefaultInputComponentProps,
  Value,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

export interface PhoneInputProps<T extends FieldValues>
  extends DefaultInputComponentProps {
  onChange?: (value: Value) => void;
  errorMessage?: string;
  helperText?: string;
  error?: boolean;
  form?: UseFormReturn<T>;
  name?: Path<T>;
  sx?: SxProps;
}

const InputCompoment = forwardRef((props, ref) => (
  <Box
    component="input"
    ref={ref}
    sx={{ border: "none", outline: "none", width: "100%" }}
    {...props}
  />
));

const PhoneInput = <T extends FieldValues>({
  onChange,
  errorMessage,
  helperText,
  error,
  onFocus,
  onBlur,
  name,
  form,
  value,
  sx,
  ...rest
}: PhoneInputProps<T>) => {
  const theme = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const formValue = name ? form?.watch(name) : undefined;
  const formError = name
    ? (form?.formState?.errors?.[name]?.message as string)
    : undefined;
  const fieldError = helperText || formError || errorMessage;

  const hasError = error || Boolean(formError) || Boolean(errorMessage);

  const handleChange = (val: Value) => {
    if (onChange) return onChange(val);
    if (name) form?.setValue?.(name, val as PathValue<T, Path<T>>);
  };

  return (
    <Box>
      <Box
        component={ReactPhoneInput}
        international
        flags={flags}
        countryCallingCodeEditable={false}
        defaultCountry="NG"
        sx={{
          padding: "0 1.6rem",
          height: "4.8rem",
          border: isFocused ? "0.2rem solid" : "0.1rem solid",
          borderColor: hasError
            ? theme.palette.error.main
            : isFocused
            ? theme.palette.success.main
            : theme.palette.grey[300],
          borderRadius: "0.5rem",
          "& input": {
            fontSize: "1.6rem",
          },
          ...(sx ?? {}),
          ...(rest?.disabled ? { opacity: 0.7 } : {}),
        }}
        inputComponent={InputCompoment}
        country="NG"
        value={value || formValue}
        onChange={handleChange}
        onFocus={() => {
          setIsFocused(true);
          onFocus?.();
        }}
        onBlur={() => {
          setIsFocused(false);
          onBlur?.();
        }}
        {...rest}
      />
      {fieldError && (
        <FormHelperText
          sx={{
            fontSize: "1rem",
            ml: "1.4rem",
            mt: "0.3rem",
            color: hasError ? theme.palette.error.main : "initial",
          }}
        >
          {fieldError}
        </FormHelperText>
      )}
    </Box>
  );
};

export default PhoneInput;

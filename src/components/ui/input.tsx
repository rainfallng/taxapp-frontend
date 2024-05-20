import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import React, { useState } from "react";

const createStyles: (
  props: OutlinedInputProps | TextFieldProps
) => SxProps<Theme> = (props) => ({
  width: "100%",
  fontSize: "1.6rem",
  "& .MuiOutlinedInput-root": { fontSize: "1.6rem" },
  "& > div": { height: "100%" },
  "& fieldset": {
    borderColor: (theme) => theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

const Input: React.FC<OutlinedInputProps | TextFieldProps> = ({
  sx,
  type: defaultType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = createStyles({ sx, ...props });
  const type =
    defaultType === "password" && showPassword ? "text" : defaultType;

  if (defaultType === "password")
    return (
      <OutlinedInput
        type={type}
        sx={styles}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => setShowPassword(!showPassword)}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        {...(props as OutlinedInputProps)}
      />
    );

  const textFieldProps = props as TextFieldProps;

  return (
    <TextField
      type={type}
      sx={styles}
      InputLabelProps={{
        ...textFieldProps?.InputLabelProps,
        sx: {
          ...textFieldProps?.InputLabelProps?.sx,
          fontSize: "1.6rem",
        },
      }}
      {...textFieldProps}
    />
  );
};

export default Input;

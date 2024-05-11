import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  OutlinedInput,
  OutlinedInputProps,
  SxProps,
  Theme,
} from "@mui/material";
import React, { useState } from "react";

const createStyles: (props: OutlinedInputProps) => SxProps<Theme> = (
  props
) => ({
  width: "100%",
  fontSize: "1.6rem",
  "& > div": { height: "100%" },
  "& fieldset": {
    borderColor: (theme) => theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

const Input: React.FC<OutlinedInputProps> = ({
  sx,
  type: defaultType,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const styles = createStyles({ sx, ...props });
  const type =
    defaultType === "password" && showPassword ? "text" : defaultType;

  return (
    <OutlinedInput
      type={type}
      sx={styles}
      {...(defaultType === "password"
        ? {
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
          }
        : {})}
      {...props}
    />
  );
};

export default Input;

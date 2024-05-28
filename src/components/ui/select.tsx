import {
  SxProps,
  Select as MuiSelect,
  Theme,
  MenuItem as MuiMenuItem,
  MenuItemProps,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import { FC, forwardRef } from "react";
import HelperText from "./helper-text";

export type SelectProps = MuiSelectProps & {
  errorMessage?: string;
  helperText?: string;
};

const createStyles: (props: SelectProps) => SxProps<Theme> = (props) => ({
  width: "100%",
  fontSize: "1.6rem",
  height: "4.8rem",
  ...(!props.value && { color: (theme) => theme.palette.grey[300] }),
  "& fieldset": {
    borderColor: (theme) => theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

export const MenuItem: FC<MenuItemProps> = ({ sx, ...props }) => (
  <MuiMenuItem sx={{ fontSize: "1.6rem", ...sx }} {...props} />
);

const Select = forwardRef(
  (
    {
      sx,
      placeholder,
      errorMessage,
      helperText,
      children,
      value,
      ...props
    }: SelectProps,
    ref
  ) => {
    const styles = createStyles({ sx, value, ...props });

    const hasError = Boolean(errorMessage) || props.error;

    return (
      <>
        <MuiSelect
          sx={styles}
          error={hasError}
          ref={ref}
          value={value || placeholder}
          {...props}
        >
          {placeholder && (
            <MenuItem hidden disabled value={placeholder}>
              {placeholder}
            </MenuItem>
          )}
          {children}
        </MuiSelect>
        <HelperText error={hasError} message={helperText || errorMessage} />
      </>
    );
  }
);

export default Select;

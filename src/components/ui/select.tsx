import {
  SxProps,
  Select as MuiSelect,
  Theme,
  MenuItem as MuiMenuItem,
  MenuItemProps,
  InputLabel,
  SelectProps as MuiSelectProps,
  FormHelperText,
  useTheme,
} from "@mui/material";
import { FC, forwardRef, useState } from "react";

export type SelectProps = MuiSelectProps & {
  errorMessage?: string;
  helperText?: string;
};

const createStyles: (props: SelectProps) => SxProps<Theme> = (props) => ({
  width: "100%",
  fontSize: "1.6rem",
  height: "4.8rem",
  "& fieldset": {
    borderColor: (theme) => theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

export const MenuItem: FC<MenuItemProps> = ({ sx, ...props }) => (
  <MuiMenuItem sx={{ fontSize: "1.6rem", ...sx }} {...props} />
);

const Select = forwardRef(
  ({ sx, placeholder, errorMessage, helperText, ...props }: SelectProps, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const styles = createStyles({ sx, ...props });
    const theme = useTheme();

    const hasError = Boolean(errorMessage) || props.error;

    return (
      <>
        {placeholder && !isOpen && (
          <InputLabel sx={{ fontSize: "1.2rem" }}>{placeholder}</InputLabel>
        )}
        <MuiSelect
          onBlur={() => setIsOpen(false)}
          onOpen={() => setIsOpen(true)}
          sx={styles}
          error={hasError}
          ref={ref}
          {...props}
        />
        {(helperText || errorMessage) && (
          <FormHelperText
            sx={{
              fontSize: "1rem",
              ml: "1.4rem",
              mt: "0.3rem",
              color: hasError ? theme.palette.error.main : "initial",
            }}
          >
            {helperText || errorMessage}
          </FormHelperText>
        )}
      </>
    );
  }
);

export default Select;

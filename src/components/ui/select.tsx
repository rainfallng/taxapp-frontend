import { SxProps, Select as MuiSelect, Theme, SelectProps, MenuItem as MuiMenuItem, MenuItemProps } from "@mui/material";
import { FC } from "react";

const createStyles: (props: SelectProps) => SxProps<Theme> = (props) => ({
  width: "100%",
  fontSize: "1.6rem",
  height: "4.8rem",
  "& fieldset": {
    borderColor: (theme) => theme.palette.grey[300],
  },
  ...(props?.sx ?? {}),
});

export const MenuItem: FC<MenuItemProps> = (props) => <MuiMenuItem sx={{ fontSize: "1.6rem" }} {...props} />

const Select: FC<SelectProps> = ({ sx, ...props }) => {
  const styles = createStyles({ sx, ...props });
  return <MuiSelect sx={styles} {...props} />;
};

export default Select;

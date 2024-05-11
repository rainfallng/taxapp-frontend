import {
  ButtonProps,
  Button as MuiButton,
  SxProps,
  Theme,
} from "@mui/material";
import { FC } from "react";

const createStyles: (props: ButtonProps) => SxProps<Theme> = (props) => ({
  boxShadow: "none",
  fontWeight: 500,
  ...(props?.sx ?? {}),
  "&:hover": {
    opacity: 0.8,
    boxShadow: "none",
    bgcolor: (theme) =>
      (!props.variant || props.variant === "contained") ? theme.palette.primary.main : "auto",
  },
});

const Button: FC<ButtonProps> = ({ variant, sx, ...rest }) => {
  const styles = createStyles({ variant, sx, ...rest });

  return <MuiButton variant={variant ?? "contained"} sx={styles} {...rest} />;
};

export default Button;

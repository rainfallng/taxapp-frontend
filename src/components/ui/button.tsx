import {
  ButtonProps,
  Button as MuiButton,
  SxProps,
  Theme,
} from "@mui/material";
import { FC } from "react";

export interface IButtonProps extends ButtonProps {
  rounded?: boolean;
}

const createStyles: (props: IButtonProps) => SxProps<Theme> = (props) => ({
  boxShadow: "none",
  fontWeight: 500,
  textTransform: "capitalize",
  fontSize: "1.4rem",
  px: "2.4rem",
  ...(props?.rounded ? { borderRadius: "5rem" } : {}),
  ...(props?.sx ?? {}),
  "&:hover": {
    opacity: 0.8,
    boxShadow: "none",
    bgcolor: (theme) =>
      !props.variant || props.variant === "contained"
        ? theme.palette.primary.main
        : "auto",
  },
});

const Button: FC<IButtonProps> = ({ variant, rounded, sx, ...rest }) => {
  const styles = createStyles({ variant, sx, rounded, ...rest });

  return <MuiButton variant={variant ?? "contained"} sx={styles} {...rest} />;
};

export default Button;

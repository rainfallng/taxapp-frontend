import { Box, useTheme } from "@mui/material";
import { FC, forwardRef } from "react";
import ReactPhoneInput, {
  DefaultInputComponentProps,
  Value,
} from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

export interface PhoneInputProps extends DefaultInputComponentProps {
  onChange: (value: Value) => void;
}

const InputCompoment = forwardRef((props, ref) => (
  <Box
    component="input"
    ref={ref}
    sx={{ border: "none", outline: "none", width: "100%" }}
    {...props}
  />
));

const PhoneInput: FC<PhoneInputProps> = ({ onChange, ...rest }) => {
  const theme = useTheme();

  return (
    <Box
      component={ReactPhoneInput}
      international
      flags={flags}
      sx={{
        padding: "0 1.6rem",
        height: "4.8rem",
        border: "0.1rem solid",
        borderColor: theme.palette.grey[300],
        borderRadius: "0.5rem",
        '& input': {
          fontSize: "1.6rem",
        },
      }}
      inputComponent={InputCompoment}
      country="NG"
      onChange={onChange}
      {...rest}
    />
  );
};

export default PhoneInput;

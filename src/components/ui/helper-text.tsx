import { FormHelperText } from "@mui/material";
import { FC } from "react";

const HelperText: FC<{ error?: boolean; message?: string }> = ({
  error,
  message,
}) => {
  if (!message) return;
  return (
    <FormHelperText
      sx={{
        fontSize: "1rem",
        ml: "1.4rem",
        mt: "0.3rem",
        color: error ? (theme) => theme.palette.error.main : "initial",
      }}
    >
      {message}
    </FormHelperText>
  );
};

export default HelperText;

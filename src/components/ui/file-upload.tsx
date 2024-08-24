import { Box } from "@mui/material";
import { DetailedHTMLProps, FC, InputHTMLAttributes, ReactNode } from "react";

interface IFileUpload
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  children?: ReactNode;
  multiple?: boolean;
}

export const FileUpload: FC<IFileUpload> = ({
  children,
  onChange,
  multiple = true,
}) => {
  return (
    <Box
      component="label"
      id="file"
      display="block"
      width="100%"
      sx={{ cursor: "pointer" }}
    >
      <input
        type="file"
        name="file"
        multiple={multiple}
        style={{ display: "none" }}
        onChange={onChange}
      />
      {children}
    </Box>
  );
};

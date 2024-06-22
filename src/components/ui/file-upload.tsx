import { Box } from "@mui/material";
import { FC, ReactNode } from "react";

interface IFileUpload {
  children?: ReactNode;
}

export const FileUpload: FC<IFileUpload> = ({ children }) => {
  return (
    <Box component="label" id="file" display="block" width="100%" sx={{ cursor: "pointer" }}>
      <input type="file" name="file" multiple style={{ display: "none" }} />
      {children}
    </Box>
  );
};

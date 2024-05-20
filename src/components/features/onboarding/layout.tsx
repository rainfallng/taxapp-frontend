import { Box, SxProps, Theme } from "@mui/material";
import { ReactNode } from "react";

const Layout = ({
  children,
  sx,
}: {
  children: ReactNode;
  sx?: SxProps<Theme>;
}) => {
  return (
    <Box sx={{ padding: "4.8rem 1.6rem 6.9rem 1.6rem", height: "100%" }}>
      <Box
        sx={{
          maxWidth: "82.2rem",
          mx: "auto",
          ...(sx ?? {}),
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;

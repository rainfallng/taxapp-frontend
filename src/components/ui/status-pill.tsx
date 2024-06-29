import { Box, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

const StatusPill: FC<{ children?: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box
      component="span"
      sx={{
        color: theme.palette.success.main,
        fontSize: "1.2rem",
        p: "0.2rem 1rem",
        bgcolor: "#E3F3F0",
        borderRadius: "2rem",
      }}
    >
      {children}
    </Box>
  );
};

export default StatusPill;

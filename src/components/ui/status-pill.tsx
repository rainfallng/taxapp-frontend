import { Box, SxProps, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";

const StatusPill: FC<{ children?: ReactNode; sx?: SxProps }> = ({ children, sx }) => {
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
        ...sx
      }}
    >
      {children}
    </Box>
  );
};

export default StatusPill;

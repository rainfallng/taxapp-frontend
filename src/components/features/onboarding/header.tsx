import { Box, SxProps, Theme, Typography, useTheme } from "@mui/material";
import { FC } from "react";

const OnboardingHeader: FC<{
  title: string;
  description?: string;
  titleSx?: SxProps<Theme>;
}> = ({ title, description, titleSx }) => {
  const theme = useTheme();

  return (
    <Box
      component="header"
      sx={{
        borderBottom: "0.1rem solid",
        borderBottomColor: theme.palette.grey[200],
        pb: "2.4rem",
        textAlign: "center",
      }}
    >
      <Typography
        sx={{
          fontSize: "1.8rem",
          color: theme.palette.grey[500],
          mx: "auto",
          maxWidth: "45rem",
          ...titleSx,
        }}
      >
        {title}
      </Typography>
      {description && (
        <Typography
          sx={{
            color: theme.palette.grey[800],
            fontSize: "2.2rem",
            mt: "2rem",
            fontWeight: 500,
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default OnboardingHeader;

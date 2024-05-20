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
        variant="h4"
        sx={{
          fontSize: "3.2rem",
          fontWeight: 600,
          color: theme.palette.grey[800],
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
            fontSize: "1.6rem",
            mt: "1.6rem",
          }}
        >
          {description}
        </Typography>
      )}
    </Box>
  );
};

export default OnboardingHeader;

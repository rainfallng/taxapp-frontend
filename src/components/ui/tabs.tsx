import { Box, Button, SxProps, useTheme } from "@mui/material";
import { FC } from "react";

const Tabs: FC<{
  options: Array<{
    label: string;
    value: string;
  }>;
  activeTab: string;
  onChange: (value: { label: string; value: string }) => void;
  sx?: SxProps;
}> = ({ options, activeTab, onChange, sx }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        gap: "9.6rem",
        flexWrap: "wrap",
        alignItems: "center",
        borderBottom: "1px solid",
        borderColor: theme.palette.grey[50],
        ...sx,
      }}
    >
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => onChange(option)}
          sx={{
            color: theme.palette.grey[300],
            textTransform: "capitalize",
            fontSize: "1.6rem",
            borderRadius: 0,
            fontWeight: 400,
            ...(option.value === activeTab && {
              borderBottom: "0.4rem solid #52D0B2",
              color: "#278F76",
            }),
          }}
        >
          {option.label}
        </Button>
      ))}
    </Box>
  );
};

export default Tabs;

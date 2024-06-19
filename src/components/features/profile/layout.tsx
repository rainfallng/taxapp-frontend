import { Box, Typography, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import { ProfileLinks } from "./constants";
import MenuItem from "./menu-item";

export const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();

  return (
    <Box sx={{ p: "2.4rem", minHeight: "100%" }}>
      <Typography
        component="h3"
        sx={{ fontWeight: 600, fontSize: "2.4rem", mb: "1rem" }}
      >
        User Profile
      </Typography>
      <Box
        sx={{
          borderRadius: "2rem",
          py: "2rem",
          px: "1rem",
          border: "1px solid",
          borderColor: theme.palette.grey[100],
          minHeight: "100%"
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            color: theme.palette.grey[900],
            mb: "1.8rem",
            ml: "22.4rem",
          }}
        >
          My Profile
        </Typography>
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: "20.4rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.2rem",
            }}
          >
            {ProfileLinks.map((linkItem) => (
              <MenuItem linkItem={linkItem} key={linkItem.title} />
            ))}
          </Box>
          <Box width="100%">{children}</Box>
        </Box>
      </Box>
    </Box>
  );
};

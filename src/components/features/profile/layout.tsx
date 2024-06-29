import { Box, Typography, useTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import { ProfileLinks } from "./constants";
import MenuItem from "./menu-item";
import { useStore } from "@/store";
import { UserType } from "@/types";

export const ProfileLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const theme = useTheme();
  const { user } = useStore();

  return (
    <Box sx={{ p: "2.4rem", minHeight: "100%" }}>
      <Typography
        component="h3"
        sx={{ fontWeight: 600, fontSize: "2.4rem", mb: "1rem" }}
      >
        {user.user_type === UserType.INDIVIDUAL ? 'User Profile' : 'Company Profile'}
      </Typography>
      <Box
        sx={{
          borderRadius: "2rem",
          py: "2rem",
          px: "1rem",
          border: "1px solid",
          borderColor: theme.palette.grey[100],
          minHeight: "100%",
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
            pt: "4.5rem"
          }}
        >
          {ProfileLinks?.[user?.user_type]?.map((linkItem) => (
            <MenuItem linkItem={linkItem} key={linkItem.title} />
          ))}
        </Box>
        <Box width="100%">{children}</Box>
      </Box>
    </Box>
  );
};

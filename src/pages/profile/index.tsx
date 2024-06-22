import AddressInfo from "@/components/features/profile/address-info";
import CompanyInfo from "@/components/features/profile/company-info";
import PersonalInfo from "@/components/features/profile/personal-info";
import Button from "@/components/ui/button";
import { useStore } from "@/store";
import { UserType } from "@/types";
import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";

type EditMode = "personal" | "address" | null;

const MyProfile = () => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState<EditMode>(null);
  const { user } = useStore();

  const onSave = () => {
    setEditMode(null);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: "1.8rem",
        }}
      >
        <Typography
          component="h4"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            color: theme.palette.grey[900],
          }}
        >
          {user.user_type === UserType.INDIVIDUAL
            ? "My Profile"
            : "Business Profile"}
        </Typography>
        {Boolean(editMode) && (
          <Button rounded onClick={onSave}>
            Save Changes
          </Button>
        )}
      </Box>
      {user.user_type === UserType.INDIVIDUAL ? (
        <PersonalInfo
          editMode={editMode === "personal"}
          setEditMode={() => setEditMode("personal")}
        />
      ) : (
        <CompanyInfo
          editMode={editMode === "personal"}
          setEditMode={() => setEditMode("personal")}
        />
      )}
      <AddressInfo
        editMode={editMode === "address"}
        setEditMode={() => setEditMode("address")}
      />
    </>
  );
};

export default MyProfile;

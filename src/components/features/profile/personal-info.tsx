import Button from "@/components/ui/button";
import { Box, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DetailsMode from "./details-personal-info";
import EditMode from "./edit-personal-info";
import { FC } from "react";

const PersonalInfo: FC<{ editMode: boolean; setEditMode: () => void }> = ({ editMode, setEditMode }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        border: "1px solid",
        borderColor: theme.palette.grey[50],
        px: "1.45rem",
        py: "3.2rem",
        borderRadius: "1rem",
        minHeight: "52.9rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "2.4rem",
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
          Personal Information
        </Typography>
        {!editMode && (
          <Button
            variant="text"
            sx={{ fontSize: "1.4rem", color: theme.palette.grey[600] }}
            onClick={setEditMode}
          >
            <EditOutlinedIcon sx={{ fontSize: "1.4rem", mr: "0.8rem" }} /> Edit
          </Button>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: "6.4rem" }}>
        <Box position="relative" height="fit-content">
          <Box
            sx={{
              width: "9.6rem",
              height: "9.6rem",
              borderRadius: "50%",
              border: "2px solid",
              borderColor: theme.palette.grey[400],
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <PersonIcon
              sx={{ fontSize: "9.6rem", color: theme.palette.grey[400] }}
            />
            {editMode && (
              <Box
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: "3.2rem",
                  height: "3.2rem",
                  borderRadius: "50%",
                  border: "2px solid",
                  borderColor: theme.palette.grey[400],
                  bottom: "0",
                  right: "-0.4rem",
                  bgcolor: theme.palette.grey[100],
                  cursor: "pointer",
                }}
              >
                <CameraAltIcon
                  sx={{ fontSize: "1.9rem", color: theme.palette.grey[500] }}
                />
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ width: "calc(100% - 9.6rem - 6.4rem)" }}>
          {editMode ? <EditMode /> : <DetailsMode />}
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;

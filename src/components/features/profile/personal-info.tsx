import Button from "@/components/ui/button";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PersonIcon from "@mui/icons-material/Person";
// import { useState } from "react";

const PersonalInfo = () => {
  const theme = useTheme();
  //   const [editMode, setEditMode] = useState(false);

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
        <Button
          variant="text"
          sx={{ fontSize: "1.4rem", color: theme.palette.grey[600] }}
        >
          <EditOutlinedIcon sx={{ fontSize: "1.4rem", mr: "0.8rem" }} /> Edit
        </Button>
      </Box>
      <Box sx={{ display: "flex", gap: "6.4rem" }}>
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
        </Box>
        <Box sx={{ width: "calc(100% - 9.6rem)" }}>
          <Grid container spacing={2}>
            <Grid item md={4}>
              <Typography
                sx={{
                  color: theme.palette.grey[400],
                  fontSize: "1.8rem",
                  mb: "0.8rem",
                }}
              >
                First Name
              </Typography>
              <Typography
                sx={{ fontSize: "1.8rem", color: theme.palette.grey[800], fontWeight: 500 }}
              >
                John
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography
                sx={{
                  color: theme.palette.grey[400],
                  fontSize: "1.8rem",
                  mb: "0.8rem",
                }}
              >
                Surname
              </Typography>
              <Typography
                sx={{ fontSize: "1.8rem", color: theme.palette.grey[800], fontWeight: 500 }}
              >
                Doe
              </Typography>
            </Grid>
            <Grid item md={4}>
              <Typography
                sx={{
                  color: theme.palette.grey[400],
                  fontSize: "1.8rem",
                  mb: "0.8rem",
                }}
              >
                Other Names
              </Typography>
              <Typography
                sx={{ fontSize: "1.8rem", color: theme.palette.grey[800], fontWeight: 500 }}
              >
                Ebuka
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default PersonalInfo;

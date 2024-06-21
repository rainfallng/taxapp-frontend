import Button from "@/components/ui/button";
import { Box, Typography, useTheme } from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";

const Corporation = () => {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
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
          Linked Corporation
        </Typography>
      </Box>
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
          display="flex"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Box display="flex" sx={{ gap: "2.4rem", alignItems: "center" }}>
            <Box
              sx={{
                width: "9.6rem",
                height: "9.6rem",
                borderRadius: "50%",
                bgcolor: theme.palette.grey[100],
              }}
            ></Box>
            <Typography
              sx={{
                color: theme.palette.grey[800],
                fontWeight: 600,
                fontSize: "1.8rem",
              }}
            >
              Smallvile Enterprise
            </Typography>
          </Box>
          <Button rounded>
            <DownloadOutlinedIcon sx={{ mr: "0.8rem" }} /> Download TCC
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Corporation;

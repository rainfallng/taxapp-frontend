import { Box, Typography, useTheme } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Button from "@/components/ui/button";
import Select, { MenuItem } from "@/components/ui/select";

const GetStarted = () => {
  const theme = useTheme();

  return (
    <div>
      <Box
        sx={{
          mx: "auto",
          maxWidth: "30rem",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontSize: "2.2rem",
            color: theme.palette.info.main,
            fontWeight: 500,
          }}
        >
          Select Institution
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
            mb: "2.35rem",
          }}
        >
          Please select the State you reside or operate your business in
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <Select sx={{ height: "5.6rem" }} placeholder="Select Status">
          <MenuItem>Single</MenuItem>
          <MenuItem>Married</MenuItem>
        </Select>
        <Button
          disabled
          sx={{
            py: "1.75rem",
            borderRadius: "5rem",
            fontSize: "1.8rem",
            textTransform: "capitalize",
          }}
        >
          <HttpsOutlinedIcon
            sx={{ mr: "0.8rem", width: "1.6rem", height: "1.6rem" }}
          />
          Continue
        </Button>
      </Box>
    </div>
  );
};

export default GetStarted;

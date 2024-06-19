import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { IndentificationType } from "@/types";
import { Box, FormLabel, Typography, useTheme } from "@mui/material";

const Identification = () => {
  const theme = useTheme();

  return (
    <Box component="form">
      <Typography
        component="h4"
        sx={{
          fontSize: "2.4rem",
          fontWeight: 500,
          color: theme.palette.grey[800],
        }}
      >
        Identification
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "4rem",
          mt: "4rem",
        }}
      >
        <Box>
          <FormLabel
            sx={{
              display: "block",
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
              mb: "1.6rem",
            }}
          >
            Identification Type
          </FormLabel>
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Select Identification Type"
          >
            {Object.entries(IndentificationType).map(([key, val]) => (
              <MenuItem key={key} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Box>
          <FormLabel
            sx={{
              display: "block",
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
              mb: "1.6rem",
            }}
          >
            Identification Number
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter Identification Number"
            name="password"
          />
        </Box>
        <Box>
          <FormLabel
            sx={{
              fontSize: "2rem",
              display: "block",
              fontWeight: 500,
              mb: "1.6rem",
              color: theme.palette.grey[800],
            }}
          >
            Date of Birth
          </FormLabel>
          <DatePicker name="date_of_birth" format="YYYY-MM-DD" />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1.6rem",
          justifyContent: "flex-end",
          mt: "2.2rem",
        }}
      >
        <Button
          variant="outlined"
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Back
        </Button>
        <Button
          sx={{
            fontSize: "1.8rem",
            fontWeight: 500,
            borderRadius: "5rem",
            py: "1rem",
            px: "2.4rem",
          }}
        >
          Save and Continue
        </Button>
      </Box>
    </Box>
  );
};

export default Identification;

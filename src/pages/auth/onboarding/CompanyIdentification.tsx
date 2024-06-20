import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Box, FormLabel, Typography, useTheme } from "@mui/material";

const CompanyIdentification = () => {
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
            Corporate Affairs Commission (CAC)
          </FormLabel>
          <Input
            sx={{ height: "5.6rem" }}
            label="Enter CAC ID Number"
            name="password"
          />
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

export default CompanyIdentification;

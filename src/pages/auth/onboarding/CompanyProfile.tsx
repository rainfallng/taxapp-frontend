import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { BusinessType } from "@/types";
import { Box, FormLabel, Typography, useTheme } from "@mui/material";

const CompanyProfile = () => {
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
        Company Profile
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
          <Box
            sx={{
              display: "flex",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: "1.6rem",
            }}
          >
            <Input
              sx={{ height: "5.6rem" }}
              label="Company Reg No"
              name="names"
            />
            <Input
              sx={{ height: "5.6rem" }}
              label="Company Name"
              name="names"
            />
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
            width: "100%",
          }}
        >
          <Input sx={{ height: "5.6rem" }} label="Email Address" name="names" />
          <Input sx={{ height: "5.6rem" }} label="Phone Number" name="names" />
        </Box>

        <Box
          sx={{
            display: "flex",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
            width: "100%",
          }}
        >
          <Select
            sx={{ height: "5.6rem" }}
            placeholder="Principal Place of Business"
          >
            {Object.entries(BusinessType).map(([key, val]) => (
              <MenuItem key={key} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>

          <Select sx={{ height: "5.6rem" }} placeholder="Business Type">
            {Object.entries(BusinessType).map(([key, val]) => (
              <MenuItem key={key} value={val}>
                {val}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box>
          <Typography
            component="h4"
            sx={{
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
            }}
          >
            Company Address
          </Typography>
          <Box
            sx={{
              display: "flex",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: "1.6rem",
              mt: "2.2rem",
            }}
          >
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Street Number"
              name="names"
            />
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Street Name"
              name="names"
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
          }}
        >
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
              State*
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select State">
              {Object.entries(BusinessType).map(([key, val]) => (
                <MenuItem key={key} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
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
              LGA*
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select LGA">
              {Object.entries(BusinessType).map(([key, val]) => (
                <MenuItem key={key} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
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
              LCDA
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select LCDA">
              {Object.entries(BusinessType).map(([key, val]) => (
                <MenuItem key={key} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>
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

export default CompanyProfile;

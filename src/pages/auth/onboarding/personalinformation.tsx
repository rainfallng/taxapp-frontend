import Button from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import Input from "@/components/ui/input";
import Select, { MenuItem } from "@/components/ui/select";
import { GenderType, MaritalStatusType, TitleType } from "@/types";
import { Box, FormLabel, Typography, useTheme } from "@mui/material";

const Personalinformation = () => {
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
        Personal Information
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
          <Typography
            component="h4"
            sx={{
              fontSize: "2rem",
              fontWeight: 500,
              color: theme.palette.grey[800],
            }}
          >
            What’s your name?
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
              gap: "1.6rem",
              mt: "2.2rem",
            }}
          >
            <Input sx={{ height: "5.6rem" }} label="First Name" name="names" />
            <Input sx={{ height: "5.6rem" }} label="Surname" name="names" />
            <Input sx={{ height: "5.6rem" }} label="Other Names" name="names" />
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
            mt: "2.2rem",
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
              Date of Birth
            </FormLabel>
            <DatePicker name="date_of_birth" format="YYYY-MM-DD" />
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
              Title
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select Status">
              {Object.entries(TitleType).map(([key, val]) => (
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
              Marital Status
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select Status">
              {Object.entries(MaritalStatusType).map(([key, val]) => (
                <MenuItem key={key} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
            mt: "2.2rem",
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
              Place of Birth
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select State">
              {Object.entries(TitleType).map(([key, val]) => (
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
              Gender
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select Gender">
              {Object.entries(GenderType).map(([key, val]) => (
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
              State of Origin
            </FormLabel>
            <Select sx={{ height: "5.6rem" }} placeholder="Select State">
              {Object.entries(MaritalStatusType).map(([key, val]) => (
                <MenuItem key={key} value={val}>
                  {val}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(20rem, 1fr))",
            gap: "1.6rem",
            mt: "2.2rem",
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
              Phone Number
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Phone Number"
              name="phone"
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
              Email Address
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Email Address"
              name="email"
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
              LASSRA No
            </FormLabel>
            <Input
              sx={{ height: "5.6rem" }}
              label="Enter Number"
              name="names"
            />
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

export default Personalinformation;

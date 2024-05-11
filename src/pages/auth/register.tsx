import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import PhoneInput from "@/components/ui/phone-input";
import Select, { MenuItem } from "@/components/ui/select";
import { Box, Typography, useTheme } from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";

const Register = () => {
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
          sx={{ fontSize: "2.2rem", color: theme.palette.info.main, fontWeight: 500 }}
        >
          Create a Taxapp Account
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
            mb: "2.35rem",
          }}
        >
          New to Taxapp? Enter your details below to start your Taxapp journey
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem", maxHeight: "56.5rem", overflow: "auto" }}
      >
        <Input
          type="email"
          sx={{ height: "5.6rem" }}
          placeholder="Email (e.g. johndoe@gmail.com)"
        />
        <Input
          type="password"
          sx={{ height: "5.6rem" }}
          placeholder="Password"
        />
        <Input
          type="password"
          sx={{ height: "5.6rem" }}
          placeholder="Confirm Password"
        />
        <Box>
          <Typography
            sx={{
              mb: "1.6rem",
              fontSize: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Phone
          </Typography>
          <PhoneInput onChange={(value) => console.log({ phone: value })} />
        </Box>
        <Box>
          <Typography
            sx={{
              mb: "1.6rem",
              fontSize: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Type of Taxpayer
          </Typography>
          <Select>
            <MenuItem value="individual">Individual</MenuItem>
            <MenuItem value="company">Company</MenuItem>
            <MenuItem value="freelancer">Freelancer</MenuItem>
          </Select>
        </Box>
        <Box>
          <Typography
            sx={{
              mb: "1.6rem",
              fontSize: "1.6rem",
              color: (theme) => theme.palette.grey[800],
            }}
          >
            Place of Residence
          </Typography>
          <Select>
            <MenuItem value="abia">Abia</MenuItem>
            <MenuItem value="anambra">Anambra</MenuItem>
          </Select>
        </Box>
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
          Create Account
        </Button>
      </Box>
    </div>
  );
};

export default Register;

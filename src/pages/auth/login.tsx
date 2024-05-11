import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  useTheme,
} from "@mui/material";
import HttpsOutlinedIcon from "@mui/icons-material/HttpsOutlined";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { Link } from "react-router-dom";

const Login = () => {
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
          Sign in
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mt: "1.6rem",
          }}
        >
          I am a returning user.
        </Typography>
        <Typography
          sx={{
            fontSize: "1.4rem",
            color: theme.palette.info.main,
            mb: "2.35rem",
          }}
        >
          Please enter your login details below
        </Typography>
      </Box>
      <Box
        width="100%"
        display="flex"
        flexDirection="column"
        sx={{ gap: "2.4rem" }}
      >
        <Input type="email" sx={{ height: "5.6rem" }} placeholder="Email" />
        <Input
          type="password"
          sx={{ height: "5.6rem" }}
          placeholder="Password"
        />
        <FormGroup>
          <FormControlLabel
            control={<Checkbox />}
            label="Remember me next time"
            sx={{
              "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
              "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
            }}
          />
        </FormGroup>
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
          Sign In
        </Button>
        <Box
          component={Link}
          to="/"
          sx={{ fontSize: "1.6rem", color: "#7879C5", textDecoration: "none" }}
        >
          Forgot your pasword?
        </Box>
      </Box>
    </div>
  );
};

export default Login;

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@/components/ui/button";
import { useReducerState } from "@/hooks/useReducerState";

const TermsOfUse = () => {
  const navigate = useNavigate();
  const [state, setState] = useReducerState({
    acceptTerms: false,
    acceptPrivacy: false,
  });

  return (
    <Box
      sx={{
        textAlign: "left",
        maxWidth: "41.7rem",
        margin: "auto",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontSize: "2.2rem",
          color: "#414141",
          fontWeight: 500,
        }}
      >
        Term of Use
      </Typography>
      <Typography
        sx={{
          fontSize: "1.4rem",
          color: "#414141",
          mt: "2.4rem",
        }}
      >
        You must agree to the{" "}
        <Box component="a" href="/terms" sx={{ color: "#AE111C", textDecoration: "underline" }}>
          terms of use
        </Box>{" "}
        to create a Taxapp account
      </Typography>

      <Typography
        sx={{
          fontSize: "1.4rem",
          color: "#414141",
          mt: "2.4rem",
          lineHeight: "2.9rem",
        }}
      >
        The terms set out your responsibilities as a Taxapp account holder and
        Services Nigeria’s responsibilities as the service provider of Taxapp.
      </Typography>

      <Typography
        sx={{
          fontSize: "1.4rem",
          color: "#414141",
          mt: "2.4rem",
          lineHeight: "2.9rem",
        }}
      >
        Rainfall collects, uses and discloses your personal information as set
        out in the{" "}
        <Box component="a" href="/privacy" sx={{ color: "#AE111C", textDecoration: "underline" }}>
          Taxapp privacy notice.
        </Box>
      </Typography>

      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={state.acceptTerms}
              onChange={() => setState({ acceptTerms: !state.acceptTerms })}
            />
          }
          label="I have read and agree to the terms."
          sx={{
            "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
            "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={state.acceptPrivacy}
              onChange={() => setState({ acceptPrivacy: !state.acceptPrivacy })}
            />
          }
          label="I have read and understand the privacy notice."
          sx={{
            "& .MuiFormControlLabel-label": { fontSize: "1.6rem" },
            "& .MuiSvgIcon-root": { fontSize: "2.4rem" },
          }}
        />
      </FormGroup>

      <Box display="flex" justifyContent="center" sx={{ mt: "3.9rem" }}>
        <Button
          sx={{
            width: "100%",
            fontSize: "1.8rem",
            p: "1rem 2.4rem",
            borderRadius: "5rem",
            borderColor: "#278F76",
            color: "#278F76",
            mr: "1rem",
          }}
          variant="outlined"
          onClick={() => navigate(-1)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!state.acceptPrivacy || !state.acceptTerms}
          onClick={() => navigate("/auth/register")}
          sx={{
            width: "100%",
            fontSize: "1.8rem",
            p: "1rem 2.4rem",
            borderRadius: "5rem",
          }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default TermsOfUse;

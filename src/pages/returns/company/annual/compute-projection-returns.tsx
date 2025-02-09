import MultipleProjectionReturnsUpload from "@/components/features/returns/company/multiple-projection-returns-upload";
import SingleProjectionReturnCompute from "@/components/features/returns/company/single-projection-returns";
import GoBack from "@/components/ui/go-back";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ComputeProjectionReturns = () => {
  const navigate = useNavigate();
  const [isSingle, setIsSingle] = useState<boolean | null>(null);

  return (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns/paye")}>
        Projection Returns
      </GoBack>
      <Box sx={{ maxWidth: "84.4rem", mx: "auto", mt: "2rem" }}>
        <Typography
          sx={{
            fontWeight: 500,
            color: (theme) => theme.palette.grey[800],
            fontSize: "2rem",
          }}
        >
          How many employees do you intend filing for?
        </Typography>
        <RadioGroup
          sx={{ flexDirection: "row", mt: "2.5rem", mb: "4rem", gap: "4rem" }}
          name="is_public_servant"
          value={isSingle}
        >
          <FormControlLabel
            value={true}
            control={<Radio onClick={() => setIsSingle(true)} />}
            sx={{
              "& .MuiFormControlLabel-label": { fontSize: "2rem" },
            }}
            label="Single"
          />
          <FormControlLabel
            value={false}
            control={<Radio onClick={() => setIsSingle(false)} />}
            sx={{
              "& .MuiFormControlLabel-label": { fontSize: "2rem" },
            }}
            label="Multiple"
          />
        </RadioGroup>
        {isSingle && <SingleProjectionReturnCompute />}
        {isSingle === false && <MultipleProjectionReturnsUpload />}
      </Box>
    </Box>
  );
};

export default ComputeProjectionReturns;

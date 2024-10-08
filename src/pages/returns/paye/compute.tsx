import Modal from "@/components/features/modals";
import Multiple from "@/components/features/returns/paye/multiple";
import Single from "@/components/features/returns/paye/single";
import GoBack from "@/components/ui/go-back";
import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ComputePayeReturns = () => {
  const navigate = useNavigate();
  const { month = "" } = useParams();
  const [isSingle, setIsSingle] = useState<boolean | null>(null);

  return (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns/paye")}>
        PAYE Returns - {month}
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
        {isSingle && <Single />}
        {isSingle === false && <Multiple />}
      </Box>
      <Modal sx={{ py: "11.4rem" }} open={false}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2.4rem",
          }}
        >
          <Box
            component="img"
            src="/assets/svgs/calculate.svg"
            alt=""
            sx={{ width: "9.6rem", height: "9.6rem" }}
          />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "2.2rem",
              color: (theme) => theme.palette.grey[800],
              textAlign: "center",
            }}
          >
            Calculating Tax Implication...
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

export default ComputePayeReturns;

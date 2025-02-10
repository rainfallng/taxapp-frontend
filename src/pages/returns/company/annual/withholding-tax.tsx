import WithholdingTaxForm from "@/components/features/returns/company/witholding-tax";
import GoBack from "@/components/ui/go-back";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WithholdingTax = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>
        Withholding Tax
      </GoBack>
      <Box sx={{ maxWidth: "84.4rem", mx: "auto", mt: "2rem" }}>
        <WithholdingTaxForm />
      </Box>
    </Box>
  );
};

export default WithholdingTax;

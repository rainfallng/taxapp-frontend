import AccomodationStage from "@/components/features/returns/annual/accomodation-stage";
import IDStage from "@/components/features/returns/annual/id-stage";
import IncomeStage from "@/components/features/returns/annual/income-stage";
import TaxImplicationBill from "@/components/features/returns/annual/tax-implication-bill";
import GoBack from "@/components/ui/go-back";
import { IAnnualReturnStage } from "@/types/returns";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AnnualReturn = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState<IAnnualReturnStage>("id");
  const [showTaxImplicationSummary, setShowTaxImplicationSummary] =
    useState(false);

  return showTaxImplicationSummary ? (
    <TaxImplicationBill />
  ) : (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>Annual Return</GoBack>
      <Box sx={{ maxWidth: "76.5rem", mx: "auto", mt: "3.2rem" }}>
        {stage === "id" && <IDStage setStage={(value) => setStage(value)} />}
        {stage === "income" && (
          <IncomeStage setStage={(value) => setStage(value)} />
        )}
        {stage === "accomodation" && (
          <AccomodationStage checkSummary={() => setShowTaxImplicationSummary(true)} />
        )}
      </Box>
    </Box>
  );
};

export default AnnualReturn;

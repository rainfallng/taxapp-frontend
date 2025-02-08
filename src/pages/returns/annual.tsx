import AccomodationStage from "@/components/features/returns/individual/accomodation-stage";
import IDStage from "@/components/features/returns/individual/id-stage";
import IncomeStage from "@/components/features/returns/individual/income-stage";
import TaxImplicationBill from "@/components/features/returns/individual/tax-implication-bill";
import GoBack from "@/components/ui/go-back";
import { IAnnualReturnStage } from "@/types/returns";
import { Box } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const AnnualReturn = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const incomeId = searchParams.get("id");
  const billId = searchParams.get("billId") ?? '';
  const showBill = searchParams.get("showBill");
  const [stage, setStage] = useState<IAnnualReturnStage>(
    incomeId ? "accomodation" : "income"
  );

  return billId && showBill === "true" ? (
    <TaxImplicationBill billId={billId} />
  ) : (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>Annual Return</GoBack>
      <Box sx={{ maxWidth: "76.5rem", mx: "auto", mt: "3.2rem" }}>
        {stage === "id" && <IDStage setStage={(value) => setStage(value)} />}
        {stage === "income" && <IncomeStage setStage={(value) => setStage(value)} />}
        {stage === "accomodation" && incomeId && (
          <AccomodationStage incomeId={incomeId} billId={billId} />
        )}
      </Box>
    </Box>
  );
};

export default AnnualReturn;

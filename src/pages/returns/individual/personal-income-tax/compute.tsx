import AccomodationStage from "@/components/features/returns/individual/accomodation-stage";
import IncomeStage from "@/components/features/returns/individual/income-stage";
import TaxImplicationBill from "@/components/features/returns/individual/tax-implication-bill";
import GoBack from "@/components/ui/go-back";
import { IAnnualReturnStage } from "@/types/returns";
import { Box } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

const PersonalIncomeTaxCompute = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const billId = searchParams.get("billId") ?? '';
  const showBill = searchParams.get("showBill");
  const stage = searchParams.get("stage") || "income" as IAnnualReturnStage;

  const handleStage = (value: IAnnualReturnStage) => {
    setSearchParams({ stage: value });
  };

  return billId && showBill === "true" ? (
    <TaxImplicationBill billId={billId} />
  ) : (
    <Box sx={{ py: "4.6rem", px: "3.2rem" }}>
      <GoBack onClick={() => navigate("/app/returns")}>Personal Income Tax</GoBack>
      <Box sx={{ maxWidth: "76.5rem", mx: "auto", mt: "3.2rem" }}>
        {stage === "income" && <IncomeStage setStage={(value) => handleStage(value)} />}
        {stage === "accomodation" && (
          <AccomodationStage />
        )}
      </Box>
    </Box>
  );
};

export default PersonalIncomeTaxCompute;
